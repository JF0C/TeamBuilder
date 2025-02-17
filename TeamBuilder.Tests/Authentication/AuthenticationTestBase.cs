using TeamBuilder.Core.Entities;

namespace TeamBuilder.Tests.Authentication;

public abstract class AuthenticationTestBase: TestBaseFixture
{
    protected static readonly PlayerEntity RegisteredUser = new()
    {
        Name = "Registered User",
        User = new()
        {
            Email = "registered.user@c11g.net"
        }
    };

    public AuthenticationTestBase(string databaseName): base($"Authentication.{databaseName}")
    {
        if (Context.Players.FirstOrDefault(p => p.Name == RegisteredUser.Name) is null)
        {
            try
            {
                Context.Players.Add(RegisteredUser);
                Context.SaveChanges();
            }
            catch (ArgumentException)
            {}
        }
    }
}