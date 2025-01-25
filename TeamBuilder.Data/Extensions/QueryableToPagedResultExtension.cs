using Microsoft.EntityFrameworkCore;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Exceptions;

namespace TourViewer.Database.Extensions;

public static class QueryableToPagedResultExtension
{
    public static async Task<PagedResult<T>> ToPagedResult<T>(this IQueryable<T> queryable, int page, int number)
    {
        if (page < 1 || number < 1)
        {
            throw new InvalidPaginationException();
        }
        var count = queryable.Count();
        var pageInternal = page - 1;
        var items = pageInternal * number > count ? [] : await queryable.Skip(pageInternal * number).Take(number).ToListAsync();
        return new PagedResult<T>
        {
            TotalItems = count,
            TotalPages = (int)Math.Ceiling(count / (double)number),
            Page = page,
            Items = items
        };
    }
}