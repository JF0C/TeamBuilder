using System.ComponentModel.DataAnnotations;

namespace TeamBuilder.Core.Entities;

public class GroupEntity: EntityBase
{
    [MaxLength(20)]
    public string Name { get; set; } = string.Empty;
    public List<PlayerEntity> Players { get; set; } = [];
}