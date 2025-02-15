using TeamBuilder.Core.Entities;

namespace TeamBuilder.Data.Interfaces;

public interface IUserRepository
{
    Task<UserEntity?> GetByTokenAsync(string token);
    Task<long> CreateAsync(string email, string playerName);
    Task RegisterAsync(string email, long playerId);
    Task<UserEntity> AuthorizeAsync(string email, string token, TimeSpan timeSpan);
    Task DeleteAsynd(long id);
    Task AddRoleAsync(long id, string role);
    Task RemoveRoleAsync(long id, string role);
}