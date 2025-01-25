using Microsoft.EntityFrameworkCore;
using TeamBuilder.Data.Interfaces;

namespace TeamBuilder.Data.Extensions;

internal class DbInitializer (TeamBuilderDbContextFactory contextFactory) : IDbInitializer
{
    public async Task InitializeDatabase()
    {
        using var context = contextFactory.CreateDbContext();
        var timeout = context.Database.GetCommandTimeout();
        context.Database.SetCommandTimeout(60);
        await context.Database.MigrateAsync();
        context.Database.SetCommandTimeout(timeout);
    }
}