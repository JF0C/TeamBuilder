using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Matches;
using TeamBuilder.Core.Dtos.Teams;

namespace TeamBuilder.Data.Interfaces;

public interface IMatchRepository
{
    Task<MatchDto> GetAsync(long id);
    Task<long> CreateAsync(CreateMatchDto match);
    Task<MatchDto> UpdateAsync(UpdateMatchDto match);
    Task DeleteAsync(long id);
    Task SetScoresAsync(long id, List<TeamScoreDto> scores);
    Task<PagedResult<MatchDto>> ListAsync(int page, int count, MatchFilterDto filter);
}