using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Exceptions;

namespace TourViewer.Database.Extensions;

public static class QueryableToPagedResultExtension
{
    public static async Task<PagedResult<T>> ToPagedResult<T>(this IQueryable<T> queryable, int page, int itemCount)
    {
        if (page < 1 || itemCount < 1)
        {
            throw new InvalidPaginationException();
        }
        var count = queryable.Count();
        var pageInternal = page - 1;
        var items = pageInternal * itemCount > count ? [] : await queryable.Skip(pageInternal * itemCount).Take(itemCount).ToListAsync();
        return new PagedResult<T>
        {
            TotalItems = count,
            TotalPages = (int)Math.Ceiling(count / (double)itemCount),
            Page = page,
            Items = items
        };
    }
}