using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Api.Shared;
using TeamBuilder.Core.Validators;

namespace TeamBuilder.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayersController(IPlayersRepository playersRepository, IAuthenticationService auth): BaseController(auth)
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<PlayerDto>>> ListPlayers(int page, int count, int? group = null, string? name = null, string? exclude = null)
    {
        var excludeList = JsonSerializer.Deserialize<List<long>>(exclude ?? "[]");
        return Ok(await playersRepository.ListAsync(page, count, group, name, excludeList));
    }

    [TokenAuthentication(Roles.Admin)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePlayer(long id)
    {
        await playersRepository.DeleteAsync(id);
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<long>> CreatePlayer([FromBody] string name)
    {
        PlayerNameValidator.Validate(name);
        return Ok(await playersRepository.CreateAsync(name));
    }

    [TokenAuthentication()]
    [HttpPut("{id}/Name/{name}")]
    public async Task<ActionResult> RenamePlayer(long id, string name)
    {
        PlayerNameValidator.Validate(name);
        await playersRepository.RenameAsync(id, name);
        return Ok();
    }
}
