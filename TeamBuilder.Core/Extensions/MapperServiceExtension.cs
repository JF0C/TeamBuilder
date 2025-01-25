
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace TeamBuilder.Core.Extensions;

public static class MapperServiceExtensions
{
    public static IServiceCollection AddMapper(this IServiceCollection services)
    {
        services.AddAutoMapper((builder) => {
            builder.AddMaps(Assembly.GetExecutingAssembly());
        });
        return services;
    }
}