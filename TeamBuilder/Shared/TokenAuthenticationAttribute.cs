using Microsoft.AspNetCore.Mvc.Filters;

namespace TeamBuilder.Shared;

public class TokenAuthenticationAttribute: ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        
    }
}