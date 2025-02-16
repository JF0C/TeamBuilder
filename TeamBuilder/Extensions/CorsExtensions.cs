using System.Net.NetworkInformation;
using System.Net.Sockets;

namespace TeamBuilder.Extensions;

public static class CorsExtensions
{
    private const string DevelopmentCorsPolicy = "developmentPolicy";
    private const string ProductionCorsPolicy = "productionPolicy";
    public static IServiceCollection AddCorsPolicies(this IServiceCollection services)
    {
        var applicationNetworkAddresses = NetworkInterface.GetAllNetworkInterfaces()
            .Select(i => i.GetIPProperties().UnicastAddresses)
            .SelectMany(u => u)
            .Where(u => u.Address.AddressFamily == AddressFamily.InterNetwork)
            .Select(i => i.Address.ToString())
            .Where(a => a != "127.0.0.1")
            .ToList();
        applicationNetworkAddresses.Add("localhost");
        applicationNetworkAddresses.Add("0.0.0.0");

        services.AddCors(options => {
            options.AddPolicy(name: DevelopmentCorsPolicy,
                policy =>
                {
                    foreach (var address in applicationNetworkAddresses)
                    {
                        policy.WithOrigins($"http://{address}:5173")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                        policy.WithOrigins($"http://{address}:5032")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    }
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