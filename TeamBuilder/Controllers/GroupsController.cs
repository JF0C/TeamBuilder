using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Extensions;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class GroupsController(IGroupsRepository groupsRepository, IMapper mapper): BaseController
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<GroupDto>>> ListGroups(int page, int count)
    {
        var groupsResult = await groupsRepository.ListAsync(page, count);
        return Ok(groupsResult.MapTo<GroupDto, GroupEntity>(mapper));
    }

    [HttpPost]
    public async Task<ActionResult<long>> CreateGroup(string name)
    {
        return Ok(await groupsRepository.CreateAsync(name));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteGroup(long id)
    {
        await groupsRepository.DeleteAsync(id);
        return Ok();
    }

    [HttpPut("{groupId}/Players/{playerId}")]
    public async Task<ActionResult> AddPlayerToGroup(long groupId, long playerId)
    {
        await groupsRepository.AddPlayerAsync(groupId, playerId);
        return Ok();
    }

    [HttpDelete("{groupId}/Players/{playerId}")]
    public async Task<ActionResult> RemovePlayerFromGroup(long groupId, long playerId)
    {
        await groupsRepository.RemovePlayerAsync(groupId, playerId);
        return Ok();
    }
}