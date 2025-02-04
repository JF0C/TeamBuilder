using TeamBuilder.Core.Dtos.Authentication;

namespace TeamBuilder.Services.Interfaces;

public interface IAuthenticationService
{
    Task<AccessTokenResponseDto> AuthenticateAsync(CodeAuthorizationDto authorizationDto);
}