namespace TeamBuilder.Api.Extensions;

public static class SpaExtensions
{
    public static IServiceCollection AddSpaRoot(this IServiceCollection services)
    {
        services.AddSpaStaticFiles(cfg =>
        {
            cfg.RootPath = "./wwwroot";
        });
        return services;
    }

    public static void UseSpa(this WebApplication app)
    {
        app.UseSpaStaticFiles();

        app.UseSpa(cfg => { });
    }
}