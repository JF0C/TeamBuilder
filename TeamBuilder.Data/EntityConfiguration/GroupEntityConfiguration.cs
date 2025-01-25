using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Data.EntityConfiguration;

public static class GroupEntityConfiguration
{
    public static void ConfigureGroupEntitiy(this ModelBuilder builder)
    {
        builder.Entity<GroupEntity>()
            .HasIndex(c => c.Name)
            .IsUnique();
    }
}