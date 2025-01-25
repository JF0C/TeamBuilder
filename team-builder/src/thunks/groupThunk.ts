import { ApiUrls } from "../constants/ApiUrls";
import { GroupDto } from "../dtos/GroupDto";
import { GroupsRequestDto } from "../dtos/GroupsRequestDto";
import { PagedResult } from "../dtos/PagedResult";
import { createDeleteThunk, createGetThunk, createPostThunk } from "./thunkBase";

export const loadGroupsRequest = createGetThunk<PagedResult<GroupDto>, GroupsRequestDto>(
    'load-groups',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.GroupsEndpoint}?page=${request.page}&count=${request.count}`,
    (response) => response.json()
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
