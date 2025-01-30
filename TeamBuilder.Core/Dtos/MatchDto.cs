namespace TeamBuilder.Core.Dtos;

public class MatchDto
{
    public long Id { get; set; }
    public Entities.MatchType Type { get; set; }
    public List<TeamDto> Teams { get; set; } = [];
    public DateTime Created { get; set; }
}