using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TeamBuilder.Data;

public class MigrationContextFactory : IDesignTimeDbContextFactory<TeamBuilderDbContext>
{
    public TeamBuilderDbContext CreateDbContext(string[] args)
    {
        var appsettingsPath = Directory.GetCurrentDirectory();
        appsettingsPath = appsettingsPath[0..appsettingsPath.LastIndexOf('/')];
        appsettingsPath += "/TeamBuilder/appsettings.Development.json";

        var configuration = new ConfigurationBuilder()
            .AddJsonFile(appsettingsPath)
            .Build();
        
        var options = new DbContextOptionsBuilder<TeamBuilderDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"),
                builder => builder.MigrationsAssembly("TeamBuilder.Data")
            ).Options;
        return new TeamBuilderDbContext(options);
    }
}

