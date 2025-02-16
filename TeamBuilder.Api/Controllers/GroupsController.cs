using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Groups;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Api.Shared;

namespace TeamBuilder.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class GroupsController(IGroupsRepository groupsRepository, IAuthenticationService auth): BaseController(auth)
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<GroupDto>>> ListGroups(int page, int count)
    {
        return Ok(await groupsRepository.ListAsync(page, count));
    }

    [TokenAuthentication()]
    [HttpPost]
    public async Task<ActionResult<long>> CreateGroup([FromBody] string name)
    {
        return Ok(await groupsRepository.CreateAsync(name));
    }

    [TokenAuthentication(Roles.Admin)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteGroup(long id)
    {
        await groupsRepository.DeleteAsync(id);
        return Ok();
    }

    [TokenAuthentication()]
    [HttpPut("{groupId}/Players/{playerId}")]
    public async Task<ActionResult> AddPlayerToGroup(long groupId, long playerId)
    {
        await groupsRepository.AddPlayerAsync(groupId, playerId);
        return Ok();
    }

    [TokenAuthentication()]
    [HttpDelete("{groupId}/Players/{playerId}")]
    public async Task<ActionResult> RemovePlayerFromGroup(long groupId, long playerId)
    {
        await groupsRepository.RemovePlayerAsync(groupId, playerId);
        return Ok();
    }

    [TokenAuthentication(Roles.Admin)]
    [HttpPut("{groupId}/Name/{name}")]
    public async Task<ActionResult> RenameGroup(long groupId, string name)
    {
        await groupsRepository.RenameAsync(new() { Id = groupId, Name = name });
        return Ok();
    }
}