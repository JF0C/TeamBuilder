using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Constants;

namespace TeamBuilder.Data.Seed;

public static class DefaultUsers
{
    public static async Task EnsureAdminUserCreated(this TeamBuilderDbContext context)
    {
        const string adminName = "Jan c11g";
        const string adminMail = "jan_201@hotmail.de";
        var player = await context.Players.FirstOrDefaultAsync(x => x.Name == adminName);
        if (player is null)
        {
            player = new ()
            {
                Name = adminName
            };
            context.Players.Add(player);
            await context.SaveChangesAsync();
        }
        var user = await context.Users.FirstOrDefaultAsync(x => x.Email == adminMail);
        if (user is null)
        {
            user = new()
            {
                Email = adminMail,
                Roles = string.Join(' ', Roles.All),
                Player = player
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
        }
        if (player.User?.Id != user.Id)
        {
            player.User = user;
            await context.SaveChangesAsync();
        }
    }
}