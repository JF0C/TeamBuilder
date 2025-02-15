using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TeamBuilder.Core.Configuration;
using TeamBuilder.Services.AuthenticationProviders;
using TeamBuilder.Services.Interfaces;
using TeamBuilder.Services.Services;
using AuthProviderNames = TeamBuilder.Core.Constants.Authentication;

namespace TeamBuilder.Services.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddTeamBuilderServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<GithubAuthenticationConfiguration>(configuration.GetSection(nameof(GithubAuthenticationConfiguration)));

        services.AddKeyedScoped<IAuthenticationProvider, GithubAuthenticationProvider>(AuthProviderNames.Github);
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        return services;
    }
}