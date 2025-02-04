using TeamBuilder.Core.Dtos.Teams;

namespace TeamBuilder.Core.Dtos.Matches;

public class MatchDto
{
    public long Id { get; set; }
    public Entities.MatchType Type { get; set; }
    public List<TeamDto> Teams { get; set; } = [];
    public DateTime Created { get; set; }
}