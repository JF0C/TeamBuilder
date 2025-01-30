using TeamBuilder.Core.Dtos;

namespace TeamBuilder.Data.Interfaces;

public interface IGroupsRepository
{
    Task<PagedResult<GroupDto>> ListAsync(int page, int count);
    Task<long> CreateAsync(string name);
    Task DeleteAsync(long id);
    Task AddPlayerAsync(long groupId, long playerId);
    Task RemovePlayerAsync(long groupId, long playerId);
}
