namespace TeamBuilder.Core.Constants;

public static class Authentication
{
    public const string Github = "github";
    public static readonly TimeSpan SessionTimeout = TimeSpan.FromDays(7);
    public static List<string> All { get; } = [Github];
}