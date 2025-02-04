using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TeamBuilder.Core.Configuration;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Services.Services;

namespace TeamBuilder.Services.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<GithubAuthenticationConfiguration>((cfg) => configuration.GetSection(nameof(GithubAuthenticationConfiguration)));

        services.AddScoped<IAuthenticationService, AuthenticationService>();
        return services;
    }
}