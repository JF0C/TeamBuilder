using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using TeamBuilder.Core.Constants;
using TeamBuilder.Core.Dtos;

namespace TeamBuilder.Tests.Authentication;

public class GetUsers(): AuthenticationTestBase("GetUsers")
{
    [Fact]
    public async Task GetUsers_Success()
    {
        var request = new HttpRequestMessage(HttpMethod.Get, "/Authentication/Users?page=1&count=10");
        AuthenticateMessage(request);
        var response = await Client.SendAsync(request);
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var players = await response.Content.ReadFromJsonAsync<PagedResult<UserDto>>();
        players!.Items.Should().Contain(x => x.Name == RegisteredUser.Name);
        var admin = players.Items.First(p => p.Name == Admin.Name);
        admin.Roles.Should().Contain(Roles.Admin);
    }
}