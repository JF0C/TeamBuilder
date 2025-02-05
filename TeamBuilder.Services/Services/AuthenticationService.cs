using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Options;
using TeamBuilder.Core.Configuration;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Services.Interfaces;

namespace TeamBuilder.Services.Services;

internal class AuthenticationService(IOptions<GithubAuthenticationConfiguration> githubConfig) : IAuthenticationService
{
    public async Task<LoginResponseDto> AuthenticateAsync(CodeAuthorizationDto authorizationDto)
    {
        var response = await AccessTokenForAuthProvider(authorizationDto);
        var responseContent = await response.Content.ReadAsStringAsync();

        var error = JsonSerializer.Deserialize<FailedTokenResponseDto>(responseContent);
        if (!string.IsNullOrEmpty(error?.Error))
        {
            throw new FailedAuthenticationException(error.Error);
        }

        var accessCodeResponse = JsonSerializer.Deserialize<AccessTokenResponseDto>(responseContent)
            ?? throw new FailedAuthenticationException(authorizationDto.AuthProvider, githubConfig.Value.ClientId);

        var userEmail = await UserInfoForAuthProvider(authorizationDto.AuthProvider, accessCodeResponse.AccessToken);
        
        return new LoginResponseDto
        {
            AccessToken = accessCodeResponse.AccessToken,
            Scope = accessCodeResponse.Scope,
            Email = userEmail
        };
    }

    private Task<HttpResponseMessage> AccessTokenForAuthProvider(CodeAuthorizationDto authorizationDto)
    {
        return authorizationDto.AuthProvider switch
        {
            AuthenticationProviders.Github => AccessTokenRequest(githubConfig.Value, authorizationDto.Code),
            _ => throw new NotSupportedException($"{authorizationDto.AuthProvider} is not supported"),
        };
    }

    private async Task<string> UserInfoForAuthProvider(string authProvider, string token)
    {
        return authProvider switch
        {
            AuthenticationProviders.Github => await EmailFromGithubUserInfo(await UserInfoRequest(githubConfig.Value.UserInfoEndpoint, token)),
            _ => throw new NotSupportedException($"{authProvider} is not supported")
        };
    }

    private static async Task<string> EmailFromGithubUserInfo(HttpResponseMessage message)
    {
        var userInfoContent = await message.Content.ReadAsStringAsync();
        var emails = JsonSerializer.Deserialize<List<GithubUserEmailDto>>(userInfoContent);
        return emails?.First().Email ?? throw new FailedAuthenticationException(AuthenticationProviders.Github, "", userInfoContent);
    }

    private static Task<HttpResponseMessage> UserInfoRequest(string userInfoEndpoint, string token)
    {
        var client = new HttpClient()
        {
            BaseAddress = new Uri(userInfoEndpoint)
        };
        var request = new HttpRequestMessage(HttpMethod.Get, (string?)null);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return client.SendAsync(request);
    }

    private static Task<HttpResponseMessage> AccessTokenRequest(IdentityProviderConfiguration configuration, string code)
    {
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
        return client.SendAsync(request);
    }
}