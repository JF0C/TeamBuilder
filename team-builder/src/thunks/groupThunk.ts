import { ApiUrls } from "../constants/ApiUrls";
import { GroupDto } from "../dtos/GroupDto";
import { GroupPlayersRequestDto } from "../dtos/GroupPlayersRequestDto";
import { GroupsRequestDto } from "../dtos/GroupsRequestDto";
import { PagedResult } from "../dtos/PagedResult";
import { PlayerDto } from "../dtos/PlayerDto";
import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "./thunkBase";

export const loadGroupsRequest = createGetThunk<PagedResult<GroupDto>, GroupsRequestDto>(
    'load-groups',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.GroupsEndpoint}?page=${request.page}&count=${request.count}`,
    (response) => response.json()
)

export const loadGroupPlayersRequest = createGetThunk<PagedResult<PlayerDto>, GroupPlayersRequestDto>(
    'load-group-players',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}?page=${request.page}&count=${request.count}${
        request.group === null ? '' : '&group=' + request.group
    }`,
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
