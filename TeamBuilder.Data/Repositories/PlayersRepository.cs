using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Core.Extensions;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Database.Extensions;

namespace TeamBuilder.Data.Repositories;

internal class PlayersRepository(TeamBuilderDbContext context, IMapper mapper) : IPlayersRepository
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
        var player = await context.Players.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id)
            ?? await context.Players.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(PlayerEntity));
        context.Players.Remove(player);
        await context.SaveChangesAsync();
    }

    public async Task<PagedResult<PlayerDto>> ListAsync(int page, int count, long? groupId = null, string? name = null, List<long>? exclude = null)
    {
        IQueryable<PlayerEntity> query = context.Players
            .Include(p => p.Groups);
        if (groupId is not null)
        {
            query = query.Where(p => p.Groups.Any(g => g.Id == groupId));
        }
        if (name is not null)
        {
            query = query.Where(p => p.Name.ToLower().Contains(name.ToLower()));
        }
        if (exclude is not null && exclude.Count > 0)
        {
            query = query.Where(p => !exclude.Contains(p.Id));
        }
        return (await query
            .OrderByDescending(p => p.Created)
            .ToPagedResult(page, count))
            .MapTo<PlayerDto, PlayerEntity>(mapper);
    }

    public async Task RenameAsync(long id, string name)
    {
        var player = await context.Players.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(PlayerEntity));
        player.Name = name;
        await context.SaveChangesAsync();
    }
}
