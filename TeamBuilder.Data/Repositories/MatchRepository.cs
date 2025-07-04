using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Matches;
using TeamBuilder.Core.Dtos.Teams;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Core.Extensions;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Database.Extensions;

namespace TeamBuilder.Data.Repositories;

internal class MatchRepository(TeamBuilderDbContext context, IMapper mapper) : IMatchRepository
{
    public async Task<MatchDto> GetAsync(long id)
    {
        var match = await context.Matches
            .Include(m => m.Teams)
            .ThenInclude(t => t.Players)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(MatchEntity));
        return mapper.Map<MatchDto>(match);
    }
    public async Task<long> CreateAsync(CreateMatchDto match)
    {
        var matchEntity = mapper.Map<MatchEntity>(match);
        foreach (var team in matchEntity.Teams)
        {
            var players = new List<PlayerEntity>();
            foreach (var player in team.Players)
            {
                players.Add(await context.Players.FirstAsync(p => p.Id == player.Id));
            }
            team.Players = players;
        }
        context.Matches.Add(matchEntity);
        await context.SaveChangesAsync();
        return matchEntity.Id;
    }

    public async Task DeleteAsync(long id)
    {
        var match = await context.Matches.Include(m => m.Teams).FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new ItemNotFoundException(id.ToString(), typeof(MatchEntity));
        context.Matches.Remove(match);
        await context.SaveChangesAsync();
    }

    public async Task<PagedResult<MatchDto>> ListAsync(MatchesRequestDto request)
    {
        IQueryable<MatchEntity> query = context.Matches
            .Include(m => m.Teams)
            .ThenInclude(t => t.Players);
        if (request.Player is not null)
        {
            query = query.Where(m => m.Teams.Any(t => t.Players.Any(p => p.Id == request.Player)));
        }
        if (request.Type is not null)
        {
            query = query.Where(m => m.Type == request.Type);
        }
        if (request.From is not null)
        {
            var fromDate = DateTime.UnixEpoch.AddMilliseconds((double)request.From);
            query = query.Where(m => m.Created > fromDate);
        }
        if (request.To is not null)
        {
            var toDate = DateTime.UnixEpoch.AddMilliseconds((double)request.To);
            query = query.Where(m => m.Created < toDate);
        }
        if (request.Resumable is true)
        {
            query = query.Where(m => m.Teams.All(t => t.Score == 0));
        }
        else
        {
            query = query.Where(m => !m.Teams.All(t => t.Score == 0));
        }
        return (await query
                    .OrderByDescending(m => m.Created)
                    .ToPagedResult(request.Page, request.Count))
                    .MapTo<MatchDto, MatchEntity>(mapper);
    }

    public async Task SetScoresAsync(long id, List<TeamScoreDto> scores)
    {
        var match = await GetMatchById(id);
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

    public async Task<MatchDto> UpdateAsync(UpdateMatchDto match)
    {
        var matchEntity = await context.Matches
            .Include(x => x.Teams)
            .FirstOrDefaultAsync(x => x.Id == match.Id)
            ?? throw new ItemNotFoundException(match.Id.ToString(), typeof(MatchEntity));

        if (matchEntity.Teams.Any(t => t.Score != 0))
        {
            throw new MatchCompletedException();
        }

        await DeleteAsync(match.Id);
        var id = await CreateAsync(match);
        return await GetAsync(id);
    }
}