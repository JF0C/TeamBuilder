using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TeamBuilder.Data.Interfaces;
using TeamBuilder.Data.Repositories;

namespace TeamBuilder.Data.Extensions;

public static class DatabaseExtensions
{
    public static void AddTeamBuilderDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton((services) => TeamBuilderDbContextFactory.CreateDbContextMethod(configuration));
        services.AddSingleton<TeamBuilderDbContextFactory>();
        services.AddSingleton<IDbInitializer, DbInitializer>();
        services.AddScoped<IPlayersRepository, PlayersRepository>();
        services.AddScoped<IGroupsRepository, GroupsRepository>();
        services.AddScoped<IMatchRepository, MatchRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
    }
    public static async Task EnsureMigration(this IApplicationBuilder app)
    {
        var initializer = app.ApplicationServices.GetService<IDbInitializer>()
            ?? throw new NullReferenceException($"Class \"{typeof(DbInitializer).FullName}\" not added to service collection");
        await initializer.InitializeDatabase();
    }
}
