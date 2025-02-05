using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Data.Interfaces;

namespace TeamBuilder.Data.Repositories;

internal class UserRepository(TeamBuilderDbContext context) : IUserRepository
{
    public async Task<UserEntity> GetAsync(string email)
    {
        return await context.Users.Include(u => u.Player).FirstOrDefaultAsync(u => u.Email == email)
            ?? throw new ItemNotFoundException(email, typeof(UserEntity));
    }

    public async Task AddRoleAsync(long id, string role)
    {
        var player = await context.Players.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(PlayerEntity));

        var user = player.User ?? throw new ItemNotFoundException($"Player {id} is not set up as a user", typeof(UserEntity));
        
        if (Roles.Exists(role) && !user.HasRole(role))
        {
            user.Roles += $" {role}";
            await context.SaveChangesAsync();
        }
    }

    public async Task<long> CreateAsync(string email, string playerName)
    {
        var player = new PlayerEntity
        {
            Name = playerName,
            User = new()
            {
                Email = email
            }
        };
        context.Players.Add(player);
        await context.SaveChangesAsync();
        return player.Id;
    }

    public async Task RegisterAsync(string email, long playerId)
    {
        var player = await context.Players.FirstOrDefaultAsync(p => p.Id == playerId)
            ?? throw new ItemNotFoundException(playerId.ToString(), typeof(PlayerEntity));
        var existingUser = await context.Players.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == playerId);
        if (existingUser?.User is not null)
        {
            throw new ItemExistsException(existingUser.User!.Email, typeof(UserEntity));
        }
        player.User = new UserEntity
        {
            Email = email
        };
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsynd(long id)
    {
        var player = await context.Players.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(PlayerEntity));

        context.Players.Remove(player);
        await context.SaveChangesAsync();
    }

    public async Task RemoveRoleAsync(long id, string role)
    {
        var player = await context.Players.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(PlayerEntity));

        var user = player.User ?? throw new ItemNotFoundException($"Player {id} is not set up as a user", typeof(UserEntity));
        
        if (Roles.Exists(role) && user.HasRole(role))
        {
            user.Roles = string.Join(' ', user.Roles.Split(' ').Where(r => r != role));
            await context.SaveChangesAsync();
        }
    }
}