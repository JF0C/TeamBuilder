using System.Text.Json.Serialization;

namespace TeamBuilder.Core.Dtos.Authentication;

public class FailedTokenRequestDto
{
    [JsonPropertyName("error")]
    public string Error { get; set; } = string.Empty;

    [JsonPropertyName("error_description")]
    public string ErrorDescription { get; set; } = string.Empty;

    [JsonPropertyName("error_uri")]
    public string ErrorUri { get; set; } = string.Empty;
}