using System.Net;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Tests.Players;

public class DeletePlayer() : PlayersTestBase("DeletePlayer")
{
    [Fact]
    public async Task DeletePlayer_Success()
    {
        var playerToDelete = new PlayerEntity
        {
            Name = "Test Player 2"
        };
        Context.Players.Add(playerToDelete);
        Context.SaveChanges();
        var message = new HttpRequestMessage(HttpMethod.Delete, $"/Players/{playerToDelete.Id}");
        AuthenticateMessage(message);
        var response = await Client.SendAsync(message);
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var player = await Context.Players.FirstOrDefaultAsync(p => p.Name == playerToDelete.Name);
        player.Should().BeNull();
    }

    [Fact]
    public async Task DeletePlayer_Fails_Forbidden()
    {
        var playerId = Context.Players.First(p => p.Name == TestPlayerName).Id;
        var response = await Client.DeleteAsync($"/Players/{playerId}");
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

    [Fact]
    public async Task DeletePlayer_Fails_NotFound()
    {
        var message = new HttpRequestMessage(HttpMethod.Delete, "/Players/123123");
        AuthenticateMessage(message);
        var response = await Client.SendAsync(message);
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}