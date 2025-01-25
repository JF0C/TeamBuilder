using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Data.EntityConfiguration;

public static class PlayerEntityConfiguration
{
    public static void ConfigurePlayerEntitiy(this ModelBuilder builder)
    {
        builder.Entity<PlayerEntity>()
            .HasIndex(c => c.Name)
            .IsUnique();
    }
}