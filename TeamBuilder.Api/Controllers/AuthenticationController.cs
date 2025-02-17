using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Api.Shared;

namespace TeamBuilder.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController(IAuthenticationService auth): BaseController(auth)
{
    [HttpPost]
    public async Task<ActionResult<LoginResponseDto>> Authenticate(CodeAuthorizationDto authorizationDto)
    {
        return Ok(await AuthenticationService.AuthenticateAsync(authorizationDto));
    }
}
