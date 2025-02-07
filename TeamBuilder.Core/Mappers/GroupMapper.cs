using AutoMapper;
using TeamBuilder.Core.Entities;
using TeamBuilder.Core.Dtos.Groups;

namespace TeamBuilder.Core.Mappers;

public class GroupMapper: Profile
{
    public GroupMapper()
    {
        CreateMap<GroupEntity, GroupDto>();
    }
}