using AutoMapper;
using TeamBuilder.Core.Dtos;
using TeamBuilder.Core.Entities;

namespace TeamBuilder.Core.Mappers;

public class GroupMapper: Profile
{
    public GroupMapper()
    {
        CreateMap<GroupEntity, GroupDto>();
    }
}