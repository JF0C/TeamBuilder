using AutoMapper;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Core.Mappers;

public class TeamMapper: Profile
{
    public TeamMapper()
    {
        CreateMap<TeamDto, TeamEntity>().ReverseMap();
    }
}