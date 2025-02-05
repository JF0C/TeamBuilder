using System.Text.Json.Serialization;

namespace TeamBuilder.Core.Dtos.Authentication;

public class GithubUserEmailDto
{
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;
}