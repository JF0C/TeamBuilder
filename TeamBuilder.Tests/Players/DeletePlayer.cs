using System.Net;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;

namespace TeamBuilder.Tests.Players;

public class DeletePlayer() : PlayersTestBase("DeletePlayer")
{
    [Fact]
    public async Task DeletePlayer_Success()
    {
        var playerId = Context.Players.First(p => p.Name == TestPlayerName).Id;
        var message = new HttpRequestMessage(HttpMethod.Delete, $"/Players/{playerId}");
        AuthenticateMessage(message);
        var response = await Client.SendAsync(message);
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var player = await Context.Players.FirstOrDefaultAsync(p => p.Name == TestPlayerName);
        player.Should().BeNull();
    }
}