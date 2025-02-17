using System.Net;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Constants;

namespace TeamBuilder.Tests.Users;

public class AddRole(): UsersTestBase(nameof(AddRole))
{
    [Fact]
    public async Task AddRole_Success()
    {
        var userId = Context.Players.First(p => p.Name == RegisteredUser.Name).Id;
        var request = new HttpRequestMessage(HttpMethod.Put, $"/Users/{userId}/Roles/{Roles.Admin}");
        AuthenticateMessage(request);
        var response = await Client.SendAsync(request);
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        Context.Players
            .Include(p => p.User)
            .First(p => p.Id == userId)
            .User!.Roles
            .Should().Contain(Roles.Admin);
    }

    [Fact]
    public async Task AddRole_Fails_InvalidRole()
    {
        var userId = Context.Players.First(p => p.Name == RegisteredUser.Name).Id;
        var request = new HttpRequestMessage(HttpMethod.Put, $"/Users/{userId}/Roles/invalid_role");
        AuthenticateMessage(request);
        var response = await Client.SendAsync(request);
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task AddRole_Fails_Forbidden()
    {
        var userId = Context.Players.First(p => p.Name == RegisteredUser.Name).Id;
        var request = new HttpRequestMessage(HttpMethod.Put, $"/Users/{userId}/Roles/{Roles.Admin}");
        request.Headers.Add("Authorization", $"Bearer {RegisteredUser.User!.Token}");
        var response = await Client.SendAsync(request);
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }
}