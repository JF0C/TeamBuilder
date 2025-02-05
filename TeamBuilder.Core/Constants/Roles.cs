using TeamBuilder.Core.Entities;

namespace TeamBuilder.Core.Constants;

public static class Roles
{
    public const string Admin = "admin";
    public static readonly IReadOnlyList<string> All = [Admin];
    public static bool HasRole(this UserEntity user, string role)
    {
        return user.Roles.Contains(role);
    }
    public static bool Exists(string role)
    {
        return All.Any(r => r == role);
    }
}