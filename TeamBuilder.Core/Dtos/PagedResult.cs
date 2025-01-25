namespace TeamBuilder.Core.Dtos;
public class PagedResult<T>
{
    public List<T> Items { get; set; } = [];
    public int Page { get; set; }
    public int TotalPages { get; set; }
    public long TotalItems { get; set; }
}