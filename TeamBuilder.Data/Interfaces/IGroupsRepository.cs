using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Data.Interfaces;

public interface IGroupsRepository
{
    Task<PagedResult<GroupEntity>> ListAsync(int page, int count);
    Task<long> CreateAsync(string name);
    Task DeleteAsync(long id);
    Task AddPlayerAsync(long groupId, long playerId);
    Task RemovePlayerAsync(long groupId, long playerId);
}
