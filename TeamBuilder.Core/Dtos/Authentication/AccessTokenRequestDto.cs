using System.Text.Json.Serialization;

namespace TeamBuilder.Core.Dtos.Authentication;

public class AccessTokenRequestDto
{
    [JsonPropertyName("client_id")]
    public string ClientId { get; set; } = string.Empty;

    [JsonPropertyName("client_secret")]
    public string ClientSecret { get; set; } = string.Empty;

    [JsonPropertyName("code")]
    public string Code { get; set; } = string.Empty;
    
    [JsonPropertyName("redirect_uri")]
    public string RedirectUri { get; set; } = string.Empty;
}