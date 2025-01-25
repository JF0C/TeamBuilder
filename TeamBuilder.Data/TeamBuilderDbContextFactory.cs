using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TeamBuilder.Data;
internal class TeamBuilderDbContextFactory(IConfiguration configuration) : 
    IDbContextFactory<TeamBuilderDbContext>
{
    public TeamBuilderDbContext CreateDbContext()
    {
        return CreateDbContextMethod(configuration);
    }

    public static TeamBuilderDbContext CreateDbContextMethod(IConfiguration configurationExt)
    {
        var options = new DbContextOptionsBuilder<TeamBuilderDbContext>()
            .UseSqlServer(configurationExt.GetConnectionString("Default"),
                builder => builder.MigrationsAssembly("TeamBuilder.Data")
            ).Options;
        return new TeamBuilderDbContext(options);
    }
}