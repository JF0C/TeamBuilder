namespace TourViewer.Extensions;

public static class CorsExtensions
{
    private const string DevelopmentCorsPolicy = "developmentPolicy";
    private const string ProductionCorsPolicy = "productionPolicy";
    public static IServiceCollection AddCorsPolicies(this IServiceCollection services)
    {
        services.AddCors(options => {
            options.AddPolicy(name: DevelopmentCorsPolicy,
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();

                    policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                }
            );
            options.AddPolicy(name: ProductionCorsPolicy,
                policy =>
                {
                    policy.WithOrigins("https://teambuilder.c11g.net")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                }
            );
        });
        return services;
    }

    public static void ActivateCorsPolicy(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseCors(DevelopmentCorsPolicy);
        }
        else
        {
            app.UseCors(ProductionCorsPolicy);
        }
    }
}