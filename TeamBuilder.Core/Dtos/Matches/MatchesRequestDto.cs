using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Dtos.Shared;

namespace TeamBuilder.Core.Dtos.Matches;

public class MatchesRequestDto : PagedRequestDto
{
    [FromQuery] public long? Player { get; set; }
    [FromQuery] public Entities.MatchType? Type { get; set; }
    [FromQuery] public long? From { get; set; }
    [FromQuery] public long? To { get; set; }
    [FromQuery] public bool? Resumable { get; set; }
}