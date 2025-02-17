using System.Net;
using FluentAssertions;

namespace TeamBuilder.Tests.Players;

public class RenamePlayer(): PlayersTestBase("RenamePlayer")
{
    [Fact]
    public async Task RenamePlayer_Success()
    {
        var playerId = Context.Players.First(p => p.Name == TestPlayerName).Id;
        var newName = "RenamedTestPlayer";
        var message = new HttpRequestMessage(HttpMethod.Put, $"/Players/{playerId}/Name/{newName}");
        AuthenticateMessage(message);
        var response = await Client.SendAsync(message);
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var player = Context.Players.First(p => p.Id == playerId);
        player!.Name.Should().Be(newName);
    }

    [Fact]
    public async Task RenamePlayer_Fails_Forbidden()
    {
        var playerId = Context.Players.First(p => p.Name == TestPlayerName).Id;
        var response = await Client.PutAsync($"/Players/{playerId}/Name/some_other_name", null);
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

    [Theory]
    [InlineData("x")]
    [InlineData("`asdf")]
    [InlineData("too_long_1213123123123")]
    [InlineData("abc()")]
    public async Task RenamePlayer_Fails_InvalidName(string newName)
    {
        var playerId = Context.Players.First(p => p.Name == TestPlayerName).Id;
        var message = new HttpRequestMessage(HttpMethod.Put, $"/Players/{playerId}/Name/{newName}");
        AuthenticateMessage(message);
        var response = await Client.SendAsync(message);
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}