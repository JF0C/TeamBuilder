using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Data.EntityConfiguration;

public static class TeamEntityConfiguration
{
    public static void ConfigureTeamEntity(this ModelBuilder builder)
    {
        builder.Entity<TeamEntity>()
            .Property(x => x.Score)
            .HasPrecision(20, 10);
    }
}