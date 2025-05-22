
using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Dtos.Shared;

namespace TeamBuilder.Core.Dtos.Players;

public class PlayersRequestDto : PagedRequestDto
{
    public PlayersRequestDto()
    {
        OrderBy = "name";
    }
    [FromQuery] public int? Group { get; set; }
    [FromQuery] public string? Name { get; set; }
    [FromQuery] public string? Exclude { get; set; }
}