namespace TeamBuilder.Core.Dtos;

public class MatchFilterDto
{
    public long? PlayerId { get; set; }
    public Entities.MatchType? Type { get; set; }
    public long? FromDate { get; set; }
    public long? ToDate { get; set; }
}