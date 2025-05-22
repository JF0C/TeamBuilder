using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Players;

namespace TeamBuilder.Data.Interfaces;

public interface IPlayersRepository
{
    Task<long> CreateAsync(string name);
    Task RenameAsync(long id, string name);
    Task<PagedResult<PlayerDto>> ListAsync(PlayersRequestDto request);
    Task DeleteAsync(long id);
}
