using System.ComponentModel.DataAnnotations;

namespace TeamBuilder.Core.Entities;

public class UserEntity: EntityBase
{
    [MaxLength(30)]
    public string Email { get; set; } = string.Empty;

    public string Roles { get; set; } = string.Empty;

    public PlayerEntity Player { get; set; } = null!;

    [MaxLength(100)]
    public string? Token { get; set; }
    public DateTime ValidUntil { get; set; }
}