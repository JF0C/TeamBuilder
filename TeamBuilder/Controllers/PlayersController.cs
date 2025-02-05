using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayersController(IPlayersRepository playersRepository, IUserRepository userRepository, IMemoryCache cache): BaseController(cache)
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<PlayerDto>>> ListPlayers(int page, int count, int? group = null, string? name = null)
    {
        return Ok(await playersRepository.ListAsync(page, count, group, name));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePlayer(long id)
    {
        await playersRepository.DeleteAsync(id);
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<long>> CreatePlayer([FromBody] string name)
    {
        return Ok(await playersRepository.CreateAsync(name));
    }

    [HttpPut("{id}/User/{email}")]
    public async Task<ActionResult> AssignUser(long id, string email)
    {
        await userRepository.CreateAsync(email, id);
        return Ok();
    }

    [HttpPut("{id}/Name/{name}")]
    public async Task<ActionResult> RenamePlayer(long id, string name)
    {
        await playersRepository.RenameAsync(id, name);
        return Ok();
    }

    [HttpPut("{id}/Roles/{role}")]
    public async Task<ActionResult> AddRole(long id, string role)
    {
        await userRepository.AddRoleAsync(id, role);
        return Ok();
    }

    [HttpDelete("{id}/Roles/{role}")]
    public async Task<ActionResult> RemoveRole(long id, string role)
    {
        await userRepository.RemoveRoleAsync(id, role);
        return Ok();
    }
}
