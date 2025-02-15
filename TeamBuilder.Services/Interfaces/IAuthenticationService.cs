using TeamBuilder.Core.Dtos.Authentication;

namespace TeamBuilder.Services.Interfaces;

public interface IAuthenticationService
{
    Task<LoginResponseDto> AuthenticateAsync(CodeAuthorizationDto authorizationDto);

    Task IsAuthorized(string token, IEnumerable<string> roles);
}