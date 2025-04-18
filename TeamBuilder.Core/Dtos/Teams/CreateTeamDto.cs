namespace TeamBuilder.Core.Dtos.Teams;

public class CreateTeamDto
{
    public string Name { get; set; } = string.Empty;
    public List<TeamPlayerDto> Players { get; set; } = [];
    public decimal Score { get; set; }
}