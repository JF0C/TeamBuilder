namespace TeamBuilder.Core.Exceptions;
public class InvalidPaginationException(): Exception("Invalid pagination parameters. " +
    "Page and Number must be greater than or equal to 0.")
{
}