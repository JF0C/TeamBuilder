using Microsoft.EntityFrameworkCore;
using TeamBuilder.Data;

namespace TeamBuilder.Tests;

public class TestDatabaseFactory
{
    public static TeamBuilderDbContext CreateInMemoryDatabase(string databaseName)
    {
        var options = new DbContextOptionsBuilder<TeamBuilderDbContext>()
            .UseInMemoryDatabase(databaseName)
            .Options;

        var context = new TeamBuilderDbContext(options);
        context.Database.EnsureCreated();
        return context;
    }
}