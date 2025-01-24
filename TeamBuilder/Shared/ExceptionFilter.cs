using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TeamBuilder.Shared;

public class ExceptionFilter(ILogger<ExceptionFilter> logger) : IActionFilter, IOrderedFilter
{
    public int Order => int.MaxValue - 10;

    public void OnActionExecuting(ActionExecutingContext context) { }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.HttpContext.Request.Path.ToString().Contains("Authentication"))
        {
            if (context.Exception is not null) {
                context.Result = new ObjectResult(null)
                {
                    StatusCode = (int)HttpStatusCode.Unauthorized
                };
                context.ExceptionHandled = true;
                return;
            }
        }

        if (context.Exception is not null)
        {
            logger.LogError("Exception: {message}", context.Exception.Message);
        }
    }
}