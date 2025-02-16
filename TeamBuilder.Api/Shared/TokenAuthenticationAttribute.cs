using Microsoft.AspNetCore.Mvc.Filters;

namespace TeamBuilder.Api.Shared;

public class TokenAuthenticationAttribute(string roles = ""): ActionFilterAttribute
{
    private const string AuthHeaderPrefix = "Bearer ";
    private readonly List<string> rolesToValidate = [.. roles.Split(' ').Where((r) => !string.IsNullOrEmpty(r))];
    public override async Task OnActionExecutionAsync(ActionExecutingContext filterContext, ActionExecutionDelegate next)
    {
        var authHeader = filterContext.HttpContext.Request.Headers.Authorization
            .FirstOrDefault(x => x?.Contains(AuthHeaderPrefix) ?? false)
            ?? throw new UnauthorizedAccessException();
        var token = authHeader[AuthHeaderPrefix.Length..];
        if (filterContext.Controller is BaseController baseController)
        {
            await baseController.AuthenticationService.IsAuthorized(token, rolesToValidate);
        }
        else
        {
            throw new Exception($"{filterContext.Controller.GetType().Name} is not a BaseController and cannot be used with authorization");
        }
        await base.OnActionExecutionAsync(filterContext, next);
    }
}