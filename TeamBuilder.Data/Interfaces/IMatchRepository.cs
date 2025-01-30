using TeamBuilder.Core.Dtos;

namespace TeamBuilder.Data.Interfaces;

public interface IMatchRepository
{
    Task<long> CreateAsync(MatchDto match);
    Task DeleteAsync(long id);
    Task SetScoresAsync(List<TeamScoreDto> scores);
    Task<PagedResult<MatchDto>> ListAsync(int page, int count);
}