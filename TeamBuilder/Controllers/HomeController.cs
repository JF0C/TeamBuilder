using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController: BaseController
{
    [HttpGet("/")]
    public ActionResult Get()
    {
        return File(System.IO.File.ReadAllBytes("./wwwroot/index.html"), "text/html");
    }
}