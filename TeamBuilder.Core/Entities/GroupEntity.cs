namespace TeamBuilder.Core.Entities;

public class GroupEntity: EntityBase
{
    public string Name { get; set; } = string.Empty;
    public List<PlayerEntity> Players { get; set; } = [];
}