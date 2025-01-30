using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayersController(IPlayersRepository playersRepository): BaseController
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<PlayerDto>>> ListPlayers(int page, int count, int? group = null)
    {
        return Ok(await playersRepository.ListAsync(page, count, group));
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

    [HttpPut("{id}/Name/{name}")]
    public async Task<ActionResult> RenamePlayer(long id, string name)
    {
        await playersRepository.RenameAsync(id, name);
        return Ok();
    }
}
