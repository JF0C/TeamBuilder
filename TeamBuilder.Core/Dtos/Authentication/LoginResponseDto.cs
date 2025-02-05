namespace TeamBuilder.Core.Dtos.Authentication;
public class LoginResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string Scope { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public long PlayerId { get; set; }
    public string PlayerName { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = [];
}