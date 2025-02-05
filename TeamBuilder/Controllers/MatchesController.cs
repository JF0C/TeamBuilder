using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Matches;
using TeamBuilder.Core.Dtos.Teams;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class MatchesController(IMatchRepository matchRepository, IMemoryCache cache): BaseController(cache)
{
    [HttpGet("{id}")]
    public async Task<ActionResult<MatchDto>> Get(long id)
    {
        return Ok(await matchRepository.GetAsync(id));
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<MatchDto>>> ListMatches(int page, int count, long? player, Core.Entities.MatchType? type, long? from, long? to)
    {
        var filter = new MatchFilterDto
        {
            PlayerId = player,
            Type = type,
            FromDate = from,
            ToDate = to
        };
        return Ok(await matchRepository.ListAsync(page, count, filter));
    }

    [HttpPost]
    public async Task<ActionResult<long>> CreateMatch(CreateMatchDto match)
    {
        return Ok(await matchRepository.CreateAsync(match));
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