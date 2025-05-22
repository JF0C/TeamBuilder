using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Players;

namespace TeamBuilder.Tests.Players;

public class GetPlayers() : PlayersTestBase(nameof(GetPlayers))
{
    [Fact]
    public async Task Get_Success()
    {
        var response = await Client.GetAsync("/Players?page=1&count=10");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var players = await response.Content.ReadFromJsonAsync<PagedResult<PlayerDto>>();
        players!.Items.Count.Should().BeGreaterOrEqualTo(2);
    }

    [Fact]
    public async Task Get_FilterForGroup_Success()
    {
        var groupId = Context.Groups.First(g => g.Name == TestGroupName).Id;
        var response = await Client.GetAsync($"/Players?page=1&count=10&group={groupId}");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var players = await response.Content.ReadFromJsonAsync<PagedResult<PlayerDto>>();
        players!.Items.Count.Should().BeGreaterOrEqualTo(1);
    }
}