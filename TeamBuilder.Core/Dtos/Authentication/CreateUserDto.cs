namespace TeamBuilder.Core.Dtos.Authentication;

public class CreateUserDto
{
    public string Email { get; set; } = string.Empty;
    public string PlayerName { get; set; } = string.Empty;
}