using System.ComponentModel.DataAnnotations;

namespace TeamBuilder.Core.Entities;

public class PlayerEntity: EntityBase
{
    [MaxLength(20)]
    public string Name { get; set; } = string.Empty;

    public List<GroupEntity> Groups { get; set; } = [];

    public List<TeamEntity> Teams { get; set; } = [];
}
