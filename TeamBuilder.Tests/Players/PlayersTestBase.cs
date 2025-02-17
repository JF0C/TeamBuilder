using TeamBuilder.Core.Entities;

namespace TeamBuilder.Tests.Players;

public abstract class PlayersTestBase : TestBaseFixture
{
    protected const string TestPlayerName = "Test Player";
    protected const string TestGroupName = "Group1";
    public PlayersTestBase(string databaseName) : base($"Players.{databaseName}")
    {
        if (Context.Players.FirstOrDefault(p => p.Name == TestPlayerName) is null)
        {
            Context.Players.Add(new PlayerEntity
            {
                Name = TestPlayerName,
                Groups = [ new() { Name = TestGroupName }]
            });
            Context.SaveChanges();
        }
    }
}