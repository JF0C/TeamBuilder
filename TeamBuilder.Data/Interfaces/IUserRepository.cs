using TeamBuilder.Core.Entities;

namespace TeamBuilder.Data.Interfaces;

public interface IUserRepository
{
    Task<UserEntity> GetAsync(string email);
    Task<long> CreateAsync(string email, string playerName);
    Task RegisterAsync(string email, long playerId);
    Task DeleteAsynd(long id);
    Task AddRoleAsync(long id, string role);
    Task RemoveRoleAsync(long id, string role);
}