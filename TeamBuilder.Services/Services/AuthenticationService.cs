using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.Options;
using TeamBuilder.Core.Configuration;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Services.Interfaces;

namespace TeamBuilder.Services.Services;

internal class AuthenticationService(IOptions<GithubAuthenticationConfiguration> githubConfig) : IAuthenticationService
{
    public async Task<AccessTokenResponseDto> AuthenticateAsync(CodeAuthorizationDto authorizationDto)
    {
        var client = new HttpClient
        {
            BaseAddress = new Uri(githubConfig.Value.AuthenticationEndpoint)
        };
        var request = new HttpRequestMessage(HttpMethod.Post, "access_token");
        request.Headers.Accept.Add(MediaTypeWithQualityHeaderValue.Parse("application/json"));
        request.Content = JsonContent.Create(new AccessTokenRequestDto
        {
            ClientId = githubConfig.Value.ClientId,
            ClientSecret = githubConfig.Value.ClientSecret,
            Code = authorizationDto.Code,
            RedirectUri = githubConfig.Value.RedirectUri
        });
        var response = await client.SendAsync(request);
        

        return await response.Content.ReadFromJsonAsync<AccessTokenResponseDto>()
            ?? throw new FailedAuthenticationException(authorizationDto.AuthProvider, githubConfig.Value.ClientId);
    }
}