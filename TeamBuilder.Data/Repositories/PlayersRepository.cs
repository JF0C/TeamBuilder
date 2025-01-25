using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Data.Interfaces;
using TourViewer.Database.Extensions;

namespace TeamBuilder.Data.Repositories;

internal class PlayersRepository(TeamBuilderDbContext context) : IPlayersRepository
{
    public async Task<long> CreateAsync(string name)
    {
        var player = new PlayerEntity
        {
            Name = name
        };
        context.Players.Add(player);
        await context.SaveChangesAsync();
        return player.Id;
    }

    public async Task DeleteAsync(long id)
    {
        var player = await context.Players.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(PlayerEntity));
        context.Players.Remove(player);
        await context.SaveChangesAsync();
    }

    public async Task<PagedResult<PlayerEntity>> ListAsync(int page, int count, long? groupId = null)
    {
        if (groupId is null)
        {
            return await context.Players.ToPagedResult(page, count);
        }
        else
        {
            return await context.Players
                .Include(p => p.Groups)
                .Where(p => p.Groups.Any(g => g.Id == groupId))
                .ToPagedResult(page, count);
        }
    }

    public async Task RenameAsync(long id, string name)
    {
        var player = await context.Players.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(PlayerEntity));
        player.Name = name;
        await context.SaveChangesAsync();
    }
}
