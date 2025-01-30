namespace TeamBuilder.Core.Dtos;

public class MatchFilterDto
{
    public long? PlayerId { get; set; }
    public Core.Entities.MatchType? Type { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
}