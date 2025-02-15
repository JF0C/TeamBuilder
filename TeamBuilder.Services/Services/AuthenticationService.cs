using Microsoft.Extensions.DependencyInjection;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Core.Exceptions;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Services.Interfaces;
using AuthenticationConstants = TeamBuilder.Core.Constants.Authentication;

namespace TeamBuilder.Services.Services;

internal class AuthenticationService(
    [FromKeyedServices(AuthenticationConstants.Github)] IAuthenticationProvider githubProvider, 
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

        var user = await userRepository.AuthorizeAsync(
            userEmail,
            accessCodeResponse.AccessToken,
            AuthenticationConstants.SessionTimeout
        );
        
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

    public async Task IsAuthorized(string token, IEnumerable<string> roles)
    {
        var user = await userRepository.GetByTokenAsync(token)
            ?? throw new UnauthorizedAccessException();
        if (user.ValidUntil < DateTime.UtcNow)
        {
            throw new SessionExpiredException();
        }
        if (roles.Any() && !user.Roles.Split(' ').Any(roles.Contains))
        {
            throw new UnauthorizedAccessException();
        }
    }

    private IAuthenticationProvider SelectAuthenticationProvider(string name)
    {
        return name switch
        {
            AuthenticationConstants.Github => githubProvider,
            _ => throw new NotSupportedException($"Authentication provider {name} not supported")
        };
    }
}