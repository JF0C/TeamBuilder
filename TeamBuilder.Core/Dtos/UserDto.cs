namespace TeamBuilder.Core.Dtos;

public class UserDto: PlayerDto
{
    public List<string> Roles { get; set; } = [];
    public string Email { get; set; } = string.Empty;
}