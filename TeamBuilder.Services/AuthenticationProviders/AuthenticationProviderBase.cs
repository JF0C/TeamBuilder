using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Options;
using TeamBuilder.Core.Configuration;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Services.Interfaces;

namespace TeamBuilder.Services.AuthenticationProviders;

internal abstract class AuthenticationProviderBase(IOptions<IdentityProviderConfiguration> options) : IAuthenticationProvider
{
    protected abstract string AuthenticationProviderName { get; }
    public async Task<AccessTokenResponseDto> GetAccessToken(string code)
    {
        var configuration = options.Value;
        var client = new HttpClient()
        {
            BaseAddress = new Uri(configuration.AuthenticationEndpoint)
        };
        var request = new HttpRequestMessage(HttpMethod.Post, (string?)null);
        request.Headers.Accept.Add(MediaTypeWithQualityHeaderValue.Parse("application/json"));
        request.Content = JsonContent.Create(new AccessTokenRequestDto
        {
            ClientId = configuration.ClientId,
            ClientSecret = configuration.ClientSecret,
            Code = code,
            RedirectUri = configuration.RedirectUri
        });
        var response = await client.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();

        var error = JsonSerializer.Deserialize<FailedTokenResponseDto>(responseContent);
        if (!string.IsNullOrEmpty(error?.Error))
        {
            throw new FailedAuthenticationException(error.Error);
        }

        return JsonSerializer.Deserialize<AccessTokenResponseDto>(responseContent)
            ?? throw new FailedAuthenticationException(AuthenticationProviderName, configuration.ClientId);
    }

    public abstract Task<string> GetUserEmail(string accessToken);
}