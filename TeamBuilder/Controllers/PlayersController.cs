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
public class PlayersController(IPlayersRepository playersRepository, IMapper mapper): BaseController
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<PlayerDto>>> ListPlayers(int page, int count, int? group = null)
    {
        var playerResult = await playersRepository.ListAsync(page, count, group);
        return Ok(playerResult.MapTo<PlayerDto, PlayerEntity>(mapper));
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
