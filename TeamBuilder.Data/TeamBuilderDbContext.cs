using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Entities;
using TeamBuilder.Data.EntityConfiguration;

namespace TeamBuilder.Data;

public class TeamBuilderDbContext(DbContextOptions<TeamBuilderDbContext> options): DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ConfigurePlayerEntitiy();
        builder.ConfigureGroupEntitiy();
        builder.ConfigureTeamEntity();
        builder.ConfigureMatchEntity();
    }

    public DbSet<PlayerEntity> Players { get; set; }
    public DbSet<GroupEntity> Groups { get; set; }
    public DbSet<MatchEntity> Matches { get; set; }

    public override Task<int> SaveChangesAsync(
        bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = default)
    {
        var addedEntities = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added && e.Entity is EntityBase)
            .ToList();

        addedEntities.ForEach(e =>
        {
            e.Property("Created").CurrentValue = DateTime.UtcNow;
        });

        var editedEntities = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Modified && e.Entity is EntityBase)
            .ToList();

        editedEntities.ForEach(e =>
        {
            e.Property("Modified").CurrentValue = DateTime.Now;
        });

        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
}