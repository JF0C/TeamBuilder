namespace TeamBuilder.Core.Dtos;

public class CreateMatchDto
{
    public Entities.MatchType Type { get; set; }
    public List<CreateTeamDto> Teams { get; set; } = [];
}