using AutoMapper;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Core.Mappers;

public class MatchMapper: Profile
{
    public MatchMapper()
    {
        CreateMap<CreateMatchDto, MatchEntity>();
        CreateMap<MatchEntity, MatchDto>();
    }
}