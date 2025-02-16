using TeamBuilder.Core.Entities;

namespace TeamBuilder.Tests.Players;

public abstract class PlayersTestBase : TestBaseFixture
{
    protected const string TestPlayerName = "Test Player";
    public PlayersTestBase(string databaseName) : base($"Players.{databaseName}")
    {
        Context.Players.Add(new PlayerEntity
        {
            Name = TestPlayerName
        });
        Context.SaveChanges();
    }
}