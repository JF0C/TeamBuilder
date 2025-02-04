namespace TeamBuilder.Core.Exceptions;
public class FailedAuthenticationException(string authProvider, string clientId):
    Exception(GetMessage(authProvider, clientId))
{
    private static string GetMessage(string authProvider, string clientId)
    {
        return $"Failed to authenticate with {authProvider} as client {clientId}";
    }
}