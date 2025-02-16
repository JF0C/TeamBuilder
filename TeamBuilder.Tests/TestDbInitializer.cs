using TeamBuilder.Data.Interfaces;

namespace TeamBuilder.Tests;

internal class TestDbInitializer : IDbInitializer
{
    public Task InitializeDatabase()
    {
        return Task.Run(() => {});
    }
}