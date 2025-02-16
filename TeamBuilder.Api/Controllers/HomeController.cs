using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Api.Shared;

namespace TeamBuilder.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController(IAuthenticationService auth): BaseController(auth)
{
    [HttpGet("/")]
    public ActionResult Get()
    {
        return File(System.IO.File.ReadAllBytes("./wwwroot/index.html"), "text/html");
    }
}