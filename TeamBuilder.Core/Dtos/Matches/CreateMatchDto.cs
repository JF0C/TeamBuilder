using TeamBuilder.Core.Dtos.Teams;

namespace TeamBuilder.Core.Dtos.Matches;

public class CreateMatchDto
{
    public Entities.MatchType Type { get; set; }
    public List<CreateTeamDto> Teams { get; set; } = [];
}