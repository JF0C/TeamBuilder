using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Core.Extensions;
using TeamBuilder.Data.Interfaces;
using TourViewer.Database.Extensions;

namespace TeamBuilder.Data.Repositories;

internal class GroupsRepository(TeamBuilderDbContext context, IMapper mapper) : IGroupsRepository
{
    public async Task AddPlayerAsync(long groupId, long playerId)
    {
        var player = await context.Players.FirstOrDefaultAsync(p => p.Id == playerId)
            ?? throw new ItemNotFoundException(playerId.ToString(), typeof(PlayerEntity));

        var group = await context.Groups
            .Include(g => g.Players)
            .FirstOrDefaultAsync(g => g.Id == groupId)
            ?? throw new ItemNotFoundException(groupId.ToString(), typeof(GroupEntity));

        if (group.Players.Any(p => p.Id == playerId))
        {
            return;
        }
        group.Players.Add(player);
        await context.SaveChangesAsync();
    }

    public async Task<long> CreateAsync(string name)
    {
        var group = new GroupEntity
        {
            Name = name
        };
        context.Groups.Add(group);
        await context.SaveChangesAsync();
        return group.Id;
    }

    public async Task DeleteAsync(long id)
    {
        var group = await context.Groups.FirstOrDefaultAsync(g => g.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(GroupEntity));
        context.Groups.Remove(group);
        await context.SaveChangesAsync();
    }

    public async Task<PagedResult<GroupDto>> ListAsync(int page, int count)
    {
        var groupsPage = await context.Groups.ToPagedResult(page, count);
        return groupsPage.MapTo<GroupDto, GroupEntity>(mapper);
    }

    public async Task RemovePlayerAsync(long groupId, long playerId)
    {
        var group = await context.Groups
            .Include(g => g.Players)
            .FirstOrDefaultAsync(g => g.Id == groupId)
            ?? throw new ItemNotFoundException(groupId.ToString(), typeof(GroupEntity));
        var player = group.Players.FirstOrDefault(p => p.Id == playerId);
        if (player is null)
        {
            return;
        }
        group.Players.Remove(player);
        await context.SaveChangesAsync();
    }
}