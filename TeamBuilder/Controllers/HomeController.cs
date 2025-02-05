using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController(IMemoryCache cache): BaseController(cache)
{
    [HttpGet("/")]
    public ActionResult Get()
    {
        return File(System.IO.File.ReadAllBytes("./wwwroot/index.html"), "text/html");
    }
}