using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using TeamBuilder.Data;
using Moq;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Constants;
using TeamBuilder.Data.Interfaces;

namespace TeamBuilder.Tests;

public abstract class TestBaseFixture
{
    protected readonly TeamBuilderDbContext Context;
    protected readonly HttpClient Client;
    protected readonly PlayerEntity Admin = new()
    {
        Name = "Admin",
        User = new()
        {
            Email = "admin@example.com",
            Roles = Roles.Admin,
            Token = "test-token",
            ValidUntil = DateTime.Now + TimeSpan.FromDays(1)
        }
    };
    protected readonly Mock<IAuthenticationService> AuthService = new();
    protected TestBaseFixture(string databaseName)
    {
        Context = TestDatabaseFactory.CreateInMemoryDatabase($"TeamBuilder.{databaseName}");
        AddAdmin();
        var factory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton((serviceProvider) => Context);
                // services.AddScoped((services) => AuthService.Object);
                services.AddSingleton<IDbInitializer, TestDbInitializer>();
            });
        });
        Client = factory.CreateClient();
    }

    private void AddAdmin()
    {
        Context.Players.Add(Admin);
        Context.SaveChanges();
    }

    protected void AuthenticateMessage(HttpRequestMessage message)
    {
        message.Headers.Add("Authorization", $"Bearer {Admin.User!.Token}");
    }
}