namespace TeamBuilder.Core.Exceptions;
public class FailedAuthenticationException: Exception
{
    public FailedAuthenticationException(string authProvider, string clientId, string? error = null): base(GetMessage(authProvider, clientId, error))
    {

    }
    public FailedAuthenticationException(string message): base(message)
    {
        
    }
    private static string GetMessage(string authProvider, string clientId, string? error)
    {
        return $"Failed to authenticate with {authProvider} as client {clientId}{(error is not null ? (": " + error) : string.Empty)}";
    }

}