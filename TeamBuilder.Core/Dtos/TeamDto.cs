namespace TeamBuilder.Core.Dtos;

public class TeamDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<PlayerDto> Players { get; set; } = [];
    public decimal Score { get; set; }
}