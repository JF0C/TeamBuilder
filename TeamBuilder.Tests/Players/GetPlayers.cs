using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using TeamBuilder.Core.Dtos;

namespace TeamBuilder.Tests.Players;

public class GetPlayers(): PlayersTestBase("Get")
{
    [Fact]
    public async Task Get_Success()
    {
        var response = await Client.GetAsync("/Players?page=1&count=10");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var players = await response.Content.ReadFromJsonAsync<PagedResult<PlayerDto>>();
        players!.Items.Count.Should().BeGreaterOrEqualTo(1);
    }
}