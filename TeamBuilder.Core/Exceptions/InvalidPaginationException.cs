namespace TeamBuilder.Core.Exceptions;
public class InvalidPaginationException(): Exception("Invalid pagination parameters. " +
    "Page and Count must be greater than or equal to 1.")
{
}