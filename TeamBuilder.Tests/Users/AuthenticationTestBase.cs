using TeamBuilder.Core.Entities;

namespace TeamBuilder.Tests.Users;

public abstract class UsersTestBase : TestBaseFixture
{
    protected static readonly PlayerEntity RegisteredUser = new()
    {
        Name = "Registered User",
        User = new()
        {
            Email = "registered.user@c11g.net"
        }
    };

    protected static readonly PlayerEntity UnregisteredPlayer = new()
    {
        Name = "Player 1"
    };

    public UsersTestBase(string databaseName) : base($"Authentication.{databaseName}")
    {
        foreach (var player in new List<PlayerEntity> { RegisteredUser, UnregisteredPlayer })
        {
            if (Context.Players.FirstOrDefault(p => p.Name == player.Name) is null)
            {
                try
                {
                    Context.Players.Add(player);
                    Context.SaveChanges();
                }
                catch (ArgumentException)
                { }
            }
        }
    }
}