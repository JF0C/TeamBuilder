using TeamBuilder.Core.Dtos.Authentication;

namespace TeamBuilder.Services.Interfaces;

public interface IAuthenticationProvider
{
    Task<AccessTokenResponseDto> GetAccessToken(string code);
    Task<string> GetUserEmail(string accessToken);
}