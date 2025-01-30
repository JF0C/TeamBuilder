using AutoMapper;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Core.Mappers;

public class MatchMapper: Profile
{
    public MatchMapper()
    {
        CreateMap<MatchDto, MatchEntity>().ReverseMap();
    }
}