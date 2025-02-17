using System.Reflection;
using AutoMapper;

namespace TeamBuilder.Tests;

public class MapperTests
{
    [Fact]
    public void CreateValidMappingConfiguration()
    {
        IMapper mapper = new MapperConfiguration(config => 
            config.AddMaps(Assembly.GetExecutingAssembly()))
            .CreateMapper();

        mapper.ConfigurationProvider.AssertConfigurationIsValid();
    }
}