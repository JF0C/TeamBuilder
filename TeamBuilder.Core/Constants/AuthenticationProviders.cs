namespace TeamBuilder.Core.Constants;

public static class AuthenticationProviders
{
    public const string Github = "github";

    public static List<string> All { get; } = [Github];
}