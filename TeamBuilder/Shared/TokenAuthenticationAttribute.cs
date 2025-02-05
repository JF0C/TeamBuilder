using Microsoft.AspNetCore.Mvc.Filters;

namespace TeamBuilder.Shared;

public class TokenAuthenticationAttribute(string roles): ActionFilterAttribute
{
    private const string AuthHeaderPrefix = "Bearer ";
    private readonly List<string> rolesToValidate = [.. roles.Split(' ')];
    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        var authHeader = filterContext.HttpContext.Request.Headers.Authorization
            .FirstOrDefault(x => x?.Contains(AuthHeaderPrefix) ?? false)
            ?? throw new UnauthorizedAccessException();
        var token = authHeader[AuthHeaderPrefix.Length..];
        if (filterContext.Controller is BaseController baseController)
        {
            if (baseController.Cache.TryGetValue(token, out var roleCollection))
            {
                var userRoles = roleCollection?.ToString()?.Split(' ') ?? [];
                if (!userRoles.Any(role => rolesToValidate.Contains(role)))
                {
                    throw new UnauthorizedAccessException("user does not have sufficient permissions");
                }
            }
            else
            {
                throw new UnauthorizedAccessException("user not logged in");
            }
        }
        else
        {
            throw new Exception($"{filterContext.Controller.GetType().Name} is not a BaseController and cannot be used with authorization");
        }
    }
}