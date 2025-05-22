using Microsoft.AspNetCore.Mvc;

namespace TeamBuilder.Core.Dtos.Shared;

public class PagedRequestDto
{
    [FromQuery] public int Page { get; set; }
    [FromQuery] public int Count { get; set; }
    [FromQuery] public string? OrderBy { get; set; }
}