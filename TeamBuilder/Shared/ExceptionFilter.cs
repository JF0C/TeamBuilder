using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TeamBuilder.Core.Exceptions;

namespace TeamBuilder.Shared;

public class ExceptionFilter(ILogger<ExceptionFilter> logger) : IActionFilter, IOrderedFilter
{
    public int Order => int.MaxValue - 10;

    public void OnActionExecuting(ActionExecutingContext context) { }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if ((context.HttpContext.Request.Path.ToString().Contains("Authentication") && context.Exception is not null)
            || context.Exception is UnauthorizedAccessException)
        {
            context.Result = new ObjectResult(null)
            {
                StatusCode = (int)HttpStatusCode.Unauthorized
            };
            context.ExceptionHandled = true;
            return;
        }

        if (context.Exception is ItemNotFoundException)
        {
            context.Result = new ObjectResult(context.Exception.Message)
            {
                StatusCode = (int)HttpStatusCode.NotFound
            };
            context.ExceptionHandled = true;
        }

        if (context.Exception is InvalidPaginationException
            or IndexOutOfRangeException
            or JsonException)
        {
            context.Result = new ObjectResult(context.Exception.Message)
            {
                StatusCode = (int)HttpStatusCode.BadRequest
            };

            context.ExceptionHandled = true;
        }

        if (context.Exception is not null)
        {
            logger.LogError("Exception: {message}", context.Exception.Message);
        }
    }
}