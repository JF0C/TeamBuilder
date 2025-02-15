using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Text.Json;
using TeamBuilder.Core.Configuration;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Services.Interfaces;
using ProviderNames = TeamBuilder.Core.Constants.Authentication;

namespace TeamBuilder.Services.AuthenticationProviders;

internal class GithubAuthenticationProvider(IOptions<GithubAuthenticationConfiguration> options)
    : AuthenticationProviderBase(options), IAuthenticationProvider
{
    private readonly GithubAuthenticationConfiguration configuration = options.Value;
    protected override string AuthenticationProviderName => ProviderNames.Github;

    public override async Task<string> GetUserEmail(string accessToken)
    {
        var client = new HttpClient()
        {
            BaseAddress = new Uri(configuration.UserInfoEndpoint)
        };
        client.DefaultRequestHeaders.Add("User-Agent", "TeamBuilderApp");
        var request = new HttpRequestMessage(HttpMethod.Get, (string?)null);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        var userInfoResponse = await client.SendAsync(request);
        var userInfoContent = await userInfoResponse.Content.ReadAsStringAsync();
        var emails = JsonSerializer.Deserialize<List<GithubUserEmailDto>>(userInfoContent);
        return emails?.FirstOrDefault()?.Email ?? throw new FailedAuthenticationException(ProviderNames.Github, "", userInfoContent);
    }
}