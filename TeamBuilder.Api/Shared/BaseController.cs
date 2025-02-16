using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Services.Interfaces;

namespace TeamBuilder.Api.Shared;
public class BaseController(IAuthenticationService authenticationService) : ControllerBase
{
    public IAuthenticationService AuthenticationService { get; } = authenticationService;
}