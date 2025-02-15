using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController(IAuthenticationService authenticationService, IUserRepository userRepository): BaseController(authenticationService)
{
    [HttpPost]
    public async Task<ActionResult<LoginResponseDto>> Authenticate(CodeAuthorizationDto authorizationDto)
    {
        return Ok(await authenticationService.AuthenticateAsync(authorizationDto));
    }
    
    [HttpPut("{id}/User/{email}")]
    public async Task<ActionResult> RegisterUser(long id, string email)
    {
        await userRepository.RegisterAsync(email, id);
        return Ok();
    }

    [HttpPost("User")]
    public async Task<ActionResult<long>> CreateUser(CreateUserDto user)
    {
        return Ok(await userRepository.CreateAsync(user.Email, user.PlayerName));
    }

    [TokenAuthentication(Roles.Admin)]
    [HttpPut("{id}/Roles/{role}")]
    public async Task<ActionResult> AddRole(long id, string role)
    {
        await userRepository.AddRoleAsync(id, role);
        return Ok();
    }

    [TokenAuthentication(Roles.Admin)]
    [HttpDelete("{id}/Roles/{role}")]
    public async Task<ActionResult> RemoveRole(long id, string role)
    {
        await userRepository.RemoveRoleAsync(id, role);
        return Ok();
    }
}
