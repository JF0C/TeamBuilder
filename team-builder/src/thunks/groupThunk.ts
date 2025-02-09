import { ApiUrls } from "../constants/ApiUrls";
import { GroupDto } from "../dtos/groups/GroupDto";
import { GroupPlayersRequestDto } from "../dtos/groups/GroupPlayersRequestDto";
import { GroupsRequestDto } from "../dtos/groups/GroupsRequestDto";
import { PagedResult } from "../dtos/base/PagedResult";
import { PlayerDto } from "../dtos/players/PlayerDto";
import { playerRequestToQuery } from "./playerThunk";
import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "./thunkBase";
import { RenameGroupDto } from "../dtos/groups/RenameGroupDto";

export const loadGroupsRequest = createGetThunk<PagedResult<GroupDto>, GroupsRequestDto>(
    'load-groups',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.GroupsEndpoint}?page=${request.page}&count=${request.count}`,
    (response) => response.json()
)

export const loadGroupMembersRequest = createGetThunk<PagedResult<PlayerDto>, GroupPlayersRequestDto>(
    'load-group-members',
    (request) => playerRequestToQuery(request),
    async (response) => {
        const result = await response.json();
        return result;
    }
)

export const createGroupRequest = createPostThunk<number, {name: string}>(
    'create-group',
    () => `${ApiUrls.BaseUrl + ApiUrls.GroupsEndpoint}`,
    (response) => response.json(),
    ({name}) => JSON.stringify(name)
)

export const deleteGroupRequest = createDeleteThunk<{id: number}>(
    'delete-group',
    ({id}) => `${ApiUrls.BaseUrl + ApiUrls.GroupsEndpoint}/${id}`
)

export const addPlayerToGroupRequest = createPutThunk<{groupId: number, playerId: number}>(
    'add-player-to-group',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.GroupsEndpoint}/${request.groupId}/Players/${request.playerId}`
)

export const removePlayerFromGroupRequest = createDeleteThunk<{groupId: number, playerId: number}>(
    'remove-player-from-group',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.GroupsEndpoint}/${request.groupId}/Players/${request.playerId}`
)

export const renameGroupRequest = createPutThunk<RenameGroupDto>(
    'rename-group',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.GroupsEndpoint}/${request.id}/Name/${request.name}`
)
