using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Core.Extensions;
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

    public async Task<PagedResult<MatchDto>> ListAsync(int page, int count, MatchFilterDto filter)
    {
        IQueryable<MatchEntity> query = context.Matches
            .Include(m => m.Teams)
            .ThenInclude(t => t.Players);
        if (filter.PlayerId is not null)
        {
            query = query.Where(m => m.Teams.Any(t => t.Players.Any(p => p.Id == filter.PlayerId)));
        }
        if (filter.Type is not null)
        {
            query = query.Where(m => m.Type == filter.Type);
        }
        if (filter.FromDate is not null)
        {
            query = query.Where(m => m.Created > filter.FromDate);
        }
        if (filter.ToDate is not null)
        {
            query = query.Where(m => m.Created < filter.ToDate);
        }
        return (await query.ToPagedResult(page, count)).MapTo<MatchDto, MatchEntity>(mapper);
    }

    public async Task SetScoresAsync(long id, List<TeamScoreDto> scores)
    {
        var match = await GetMatchById(scores.First().TeamId);
        foreach (var score in scores)
        {
            var team = match.Teams.FirstOrDefault(t => t.Id == score.TeamId)
                ?? throw new ItemNotFoundException($"team {score.TeamId} in match {match.Id}", typeof(TeamEntity));
            team.Score = score.Score;
        }
        await context.SaveChangesAsync();
    }

    private async Task<MatchEntity> GetMatchById(long id)
    {
        return await context.Matches
            .Include(m => m.Teams)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new ItemNotFoundException(string.Join(", ", id), typeof(MatchEntity));
    }
}