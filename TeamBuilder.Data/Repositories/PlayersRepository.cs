using System.Text.Json;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Players;
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

    public async Task<PagedResult<PlayerDto>> ListAsync(PlayersRequestDto request)
    {
        var excludeList = JsonSerializer.Deserialize<List<long>>(request.Exclude ?? "[]");
        IQueryable<PlayerEntity> query = context.Players
            .Include(p => p.Groups);
        if (request.Group is not null)
        {
            query = query.Where(p => p.Groups.Any(g => g.Id == request.Group));
        }
        if (request.Name is not null)
        {
            query = query.Where(p => p.Name.ToLower().Contains(request.Name.ToLower()));
        }
        if (excludeList is not null && excludeList.Count > 0)
        {
            query = query.Where(p => !excludeList.Contains(p.Id));
        }
        if (request.OrderBy is not null)
        {
            query = request.OrderBy.ToLower() switch
            {
                "name" => query.OrderBy(x => x.Name),
                "created" => query.OrderBy(x => x.Created),
                _ => query.OrderByDescending(p => p.Created)
            };
        }
        return (await query
                .ToPagedResult(request.Page, request.Count))
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
