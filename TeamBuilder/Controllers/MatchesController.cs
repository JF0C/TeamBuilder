using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class MatchesController(IMatchRepository matchRepository): BaseController
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

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(long id)
    {
        await matchRepository.DeleteAsync(id);
        return Ok();
    }

    [HttpPut("{id}/Scores")]
    public async Task<ActionResult> SetScores(long id, List<TeamScoreDto> scores)
    {
        await matchRepository.SetScoresAsync(id, scores);
        return Ok();
    }
}