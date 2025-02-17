using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos;

namespace TeamBuilder.Tests.Users;

public class GetUsers(): UsersTestBase("GetUsers")
{
    [Fact]
    public async Task GetUsers_Success()
    {
        var request = new HttpRequestMessage(HttpMethod.Get, "/Users?page=1&count=10");
        AuthenticateMessage(request);
        var response = await Client.SendAsync(request);
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var players = await response.Content.ReadFromJsonAsync<PagedResult<UserDto>>();
        players!.Items.Should().Contain(x => x.Name == RegisteredUser.Name);
        players.Items.Should().NotContain(x => x.Name == UnregisteredPlayer.Name);
        var admin = players.Items.First(p => p.Name == Admin.Name);
        admin.Roles.Should().Contain(Roles.Admin);
    }

    [Fact]
    public async Task GetUsers_Fails_NotAllowed()
    {
        var response = await Client.GetAsync("/Users?page=1&count=10");
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }
}