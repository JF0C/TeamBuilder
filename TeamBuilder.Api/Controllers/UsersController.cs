using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos.Authentication;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Api.Shared;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Validators;

namespace TeamBuilder.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController(IAuthenticationService auth, IUserRepository userRepository): BaseController(auth)
{
    [TokenAuthentication(Roles.Admin)]
    [HttpGet]
    public async Task<ActionResult<PagedResult<UserDto>>> ListUsers(int page, int count, int? group, string? name)
    {
        return Ok(await userRepository.ListAsync(page, count, group, name));
    }
    
    [HttpPut("{id}/Email/{email}")]
    public async Task<ActionResult> RegisterUser(long id, string email)
    {
        await userRepository.RegisterAsync(email, id);
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<long>> CreateUser(CreateUserDto user)
    {
        return Ok(await userRepository.CreateAsync(user.Email, user.PlayerName));
    }

    [TokenAuthentication(Roles.Admin)]
    [HttpPut("{id}/Roles/{role}")]
    public async Task<ActionResult> AddRole(long id, string role)
    {
        RoleValidator.Validate(role);
        await userRepository.AddRoleAsync(id, role);
        return Ok();
    }

    [TokenAuthentication(Roles.Admin)]
    [HttpDelete("{id}/Roles/{role}")]
    public async Task<ActionResult> RemoveRole(long id, string role)
    {
        RoleValidator.Validate(role);
        await userRepository.RemoveRoleAsync(id, role);
        return Ok();
    }
}
