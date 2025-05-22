using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Matches;
using TeamBuilder.Core.Dtos.Teams;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Api.Shared;

namespace TeamBuilder.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class MatchesController(IMatchRepository matchRepository, IAuthenticationService auth) : BaseController(auth)
{
    [HttpGet("{id}")]
    public async Task<ActionResult<MatchDto>> Get(long id)
    {
        return Ok(await matchRepository.GetAsync(id));
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<MatchDto>>> ListMatches(MatchesRequestDto request)
    {
        return Ok(await matchRepository.ListAsync(request));
    }

    [HttpPost]
    public async Task<ActionResult<long>> CreateMatch(CreateMatchDto match)
    {
        return Ok(await matchRepository.CreateAsync(match));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MatchDto>> UpdateMatch(long id, UpdateMatchDto match)
    {
        match.Id = id;
        return Ok(await matchRepository.UpdateAsync(match));
    }

    [TokenAuthentication(Roles.Admin)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(long id)
    {
        await matchRepository.DeleteAsync(id);
        return Ok();
    }

    [TokenAuthentication()]
    [HttpPut("{id}/Scores")]
    public async Task<ActionResult> SetScores(long id, List<TeamScoreDto> scores)
    {
        await matchRepository.SetScoresAsync(id, scores);
        return Ok();
    }
}