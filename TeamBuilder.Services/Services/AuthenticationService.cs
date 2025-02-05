using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Services.Interfaces;
using ProviderNames = TeamBuilder.Core.Constants.AuthenticationProviders;

namespace TeamBuilder.Services.Services;

internal class AuthenticationService([FromKeyedServices(ProviderNames.Github)] IAuthenticationProvider githubProvider, 
    IMemoryCache memoryCache,
    IUserRepository userRepository) : IAuthenticationService
{
    public async Task<LoginResponseDto> AuthenticateAsync(CodeAuthorizationDto authorizationDto)
    {
        var authProvider = SelectAuthenticationProvider(authorizationDto.AuthProvider);

        var accessCodeResponse = await authProvider.GetAccessToken(authorizationDto.Code);

        var userEmail = await authProvider.GetUserEmail(accessCodeResponse.AccessToken);

        if (string.IsNullOrEmpty(userEmail))
        {
            throw new FailedAuthenticationException("could not retrieve user email");
        }

        var user = await userRepository.GetAsync(userEmail);

        memoryCache.Set(accessCodeResponse.AccessToken, user.Roles, TimeSpan.FromMinutes(120));
        
        return new LoginResponseDto
        {
            AccessToken = accessCodeResponse.AccessToken,
            Scope = accessCodeResponse.Scope,
            Email = userEmail,
            PlayerId = user.Player.Id,
            PlayerName = user.Player.Name,
            Roles = [.. user.Roles.Split(' ')]
        };
    }

    private IAuthenticationProvider SelectAuthenticationProvider(string name)
    {
        return name switch
        {
            ProviderNames.Github => githubProvider,
            _ => throw new NotSupportedException($"Authentication provider {name} not supported")
        };
    }
}