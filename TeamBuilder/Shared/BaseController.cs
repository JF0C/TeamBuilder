using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace TeamBuilder.Shared;
public class BaseController(IMemoryCache memoryCache) : ControllerBase
{
    public IMemoryCache Cache { get; } = memoryCache;
}