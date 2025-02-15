using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

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