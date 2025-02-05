using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController(IAuthenticationService authenticationService, IMemoryCache cache): BaseController(cache)
{
    [HttpPost]
    public async Task<ActionResult<LoginResponseDto>> Authenticate(CodeAuthorizationDto authorizationDto)
    {
        return Ok(await authenticationService.AuthenticateAsync(authorizationDto));
    }
}
