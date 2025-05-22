using AutoMapper;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Dtos.Players;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Core.Mappers;

public class PlayerMapper : Profile
{
    public PlayerMapper()
    {
        CreateMap<PlayerEntity, PlayerDto>().ReverseMap();

        CreateMap<PlayerEntity, UserDto>()
            .ForMember(dst => dst.Email, opt => opt.MapFrom(src => src.User!.Email))
            .ForMember(dst => dst.Roles, opt => opt.MapFrom(src => RolesToList(src.User!.Roles)));
    }

    private static List<string> RolesToList(string roles) => [.. roles.Split(' ')];
}