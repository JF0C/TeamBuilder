namespace TeamBuilder.Core.Constants;

public static class Authentication
{
    public const string Github = "github";
    public static readonly TimeSpan SessionTimeout = TimeSpan.FromMinutes(1);
    public static List<string> All { get; } = [Github];
}