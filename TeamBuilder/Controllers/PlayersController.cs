using Microsoft.AspNetCore.Mvc;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Shared;

namespace TeamBuilder.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayersController: BaseController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlayerDto>>> GetPlayers()
    {
        var players = new List<PlayerDto>
        {
            new()
            {
                Id = 1,
                Name = "Jan"
            },
            new()
            {
                Id = 2,
                Name = "Alex"
            },
            new()
            {
                Id = 3,
                Name = "Maxi"
            },
            new()
            {
                Id = 4,
                Name = "Dora"
            },
            new()
            {
                Id = 5,
                Name = "Aileen"
            },
            new()
            {
                Id = 6,
                Name = "Phil"
            },
            new()
            {
                Id = 7,
                Name = "Michi"
            },
            new()
            {
                Id = 8,
                Name = "Georg"
            },
            new()
            {
                Id = 9,
                Name = "Marina"
            },
            new()
            {
                Id = 10,
                Name = "Ari"
            }
        };

        return Ok(players);
    }
}