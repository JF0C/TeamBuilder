import { ApiUrls } from "../constants/ApiUrls";
import { PagedResult } from "../dtos/base/PagedResult";
import { ChangeRoleDto } from "../dtos/users/ChangeRoleDto";
import { UserDto } from "../dtos/users/UserDto";
import { UsersRequestDto } from "../dtos/users/UsersRequestDto";
import { createDeleteThunk, createGetThunk, createPutThunk } from "./thunkBase";

export const loadUsersRequest = createGetThunk<PagedResult<UserDto>, UsersRequestDto>(
    'load-users',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.UsersEndpoint}` +
        `?page=${request.page}&count=${request.count}` +
        `${request.group ? `&group=${request.group}` : ''}` +
        `${request.name ? `&name=${request.name}` : ''}`,
    (response) => response.json()
)

export const addRoleRequest = createPutThunk<ChangeRoleDto>(
    'add-role',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.UsersEndpoint}/${request.playerId}/Roles/${request.role}`
)

export const removeRoleRequest = createDeleteThunk<ChangeRoleDto>(
    'remove-role',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.UsersEndpoint}/${request.playerId}/Roles/${request.role}`
)
