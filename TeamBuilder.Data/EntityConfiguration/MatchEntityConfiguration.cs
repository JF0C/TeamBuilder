using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Data.EntityConfiguration;

public static class MatchEntityConfiguration
{
    public static void ConfigureMatchEntity(this ModelBuilder builder)
    {
        builder.Entity<MatchEntity>()
            .Property(x => x.Type)
            .HasConversion<string>()
            .HasMaxLength(20);
    }
}