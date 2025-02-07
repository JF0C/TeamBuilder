using TeamBuilder.Core.Dtos.Groups;

namespace TeamBuilder.Core.Dtos;

public class PlayerDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<GroupDto> Groups { get; set; } = [];
}