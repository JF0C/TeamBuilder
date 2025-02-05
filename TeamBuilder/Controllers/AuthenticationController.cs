using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController(IAuthenticationService authenticationService): BaseController
{
    [HttpPost]
    public async Task<ActionResult<LoginResponseDto>> Authenticate(CodeAuthorizationDto authorizationDto)
    {
        return Ok(await authenticationService.AuthenticateAsync(authorizationDto));
    }
}
