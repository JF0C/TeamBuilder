using TeamBuilder.Core.Dtos;

namespace TeamBuilder.Data.Interfaces;

public interface IPlayersRepository
{
    Task<long> CreateAsync(string name);   
    Task RenameAsync(long id, string name);
    Task<PagedResult<PlayerDto>> ListAsync(int page, int count, long? groupId = null, string? name = null);
    Task DeleteAsync(long id);
}
