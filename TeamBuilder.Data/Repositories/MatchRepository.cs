using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Core.Mappers;
using TeamBuilder.Data.Interfaces;
using TourViewer.Database.Extensions;

namespace TeamBuilder.Data.Repositories;

internal class MatchRepository(TeamBuilderDbContext context, IMapper mapper) : IMatchRepository
{
    public async Task<long> CreateAsync(MatchDto match)
    {
        var matchEntity = mapper.Map<MatchEntity>(match);
        context.Matches.Add(matchEntity);
        await context.SaveChangesAsync();
        return matchEntity.Id;
    }

    public async Task DeleteAsync(long id)
    {
        var match = await context.Matches.FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(MatchEntity));
        context.Matches.Remove(match);
        await context.SaveChangesAsync();
    }

    public async Task<PagedResult<MatchDto>> ListAsync(int page, int count)
    {
        return await context.Matches
            .Include(m => m.Teams)
            .ThenInclude(t => t.Players)
            .OrderByDescending(m => m.Created)
            .ProjectTo<MatchDto>(MatchMapper.Configuration())
            .ToPagedResult(page, count);
    }

    public async Task SetScoresAsync(List<TeamScoreDto> scores)
    {
        var match = await GetMatchByTeamId(scores.First().TeamId);
        foreach (var score in scores)
        {
            var team = match.Teams.FirstOrDefault(t => t.Id == score.TeamId);
            if (team is null)
            {
                match = await GetMatchByTeamId(score.TeamId);
                team = match.Teams.FirstOrDefault(t => t.Id == score.TeamId)
                    ?? throw new ItemNotFoundException(score.TeamId.ToString(), typeof(TeamEntity));
            }
            team.Score = score.Score;
        }
        await context.SaveChangesAsync();
    }

    private async Task<MatchEntity> GetMatchByTeamId(long teamId)
    {
        return await context.Matches
            .Include(m => m.Teams)
            .FirstOrDefaultAsync(m => m.Teams.Any(t => teamId == t.Id))
            ?? throw new ItemNotFoundException(string.Join(", ", teamId), typeof(TeamEntity));
    }
}