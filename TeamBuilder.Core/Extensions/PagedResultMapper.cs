using AutoMapper;
using TeamBuilder.Core.Dtos;

namespace TeamBuilder.Core.Extensions;

public static class PagedResultMapper
{
    public static PagedResult<T> MapTo<T, U>(this PagedResult<U> pagedResult, IMapper mapper)
    {
        return new PagedResult<T>
        {
            Items = mapper.Map<List<T>>(pagedResult.Items),
            Page = pagedResult.Page,
            TotalItems = pagedResult.TotalItems,
            TotalPages = pagedResult.TotalPages
        };
    }
}