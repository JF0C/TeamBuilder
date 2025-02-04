namespace TeamBuilder.Core.Dtos.Authentication;

public class CodeAuthorizationDto
{
    public string Code { get; set; } = string.Empty;
    public string AuthProvider { get; set; } = string.Empty;
}