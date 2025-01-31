using AutoMapper;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Core.Mappers;

public class PlayerMapper: Profile
{
    public PlayerMapper()
    {
        CreateMap<PlayerEntity, PlayerDto>().ReverseMap();
    }
}