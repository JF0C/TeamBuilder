using Microsoft.AspNetCore.Mvc;

namespace TeamBuilder.Core.Dtos.Shared;

public class PagedRequestDto
{
    [FromQuery] public int Page { get; set; } = 1;
    [FromQuery] public int Count { get; set; } = 20;
    [FromQuery] public string? OrderBy { get; set; }
}