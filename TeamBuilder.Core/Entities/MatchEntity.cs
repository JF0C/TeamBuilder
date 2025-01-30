namespace TeamBuilder.Core.Entities;

public class MatchEntity: EntityBase
{
    public MatchType Type { get; set; }
    public List<TeamEntity> Teams { get; set; } = [];
}