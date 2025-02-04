using AutoMapper;
using TeamBuilder.Core.Dtos.Teams;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Core.Mappers;

public class TeamMapper: Profile
{
    public TeamMapper()
    {
        CreateMap<CreateTeamDto, TeamEntity>();
        CreateMap<TeamEntity, TeamDto>();
        CreateMap<TeamPlayerDto, PlayerEntity>();
    }
}