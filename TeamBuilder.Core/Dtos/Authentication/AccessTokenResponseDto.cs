using System.Text.Json.Serialization;

namespace TeamBuilder.Core.Dtos.Authentication;

public class AccessTokenResponseDto
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; } = string.Empty;

    [JsonPropertyName("scope")]
    public string Scope { get; set; } = string.Empty;
}