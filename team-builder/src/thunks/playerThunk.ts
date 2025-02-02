import { ApiUrls } from "../constants/ApiUrls";
import { PlayerDto } from "../dtos/PlayerDto";
import { PagedResult } from "../dtos/PagedResult";
import { PlayersRequestDto } from "../dtos/PlayersRequestDto";
import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "./thunkBase";

export const playerRequestToQuery = (request: PlayersRequestDto) => 
    `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}?page=${request.page}&count=${request.count}` +
        `${request.group ? `&group=${request.group}` : ''}` +
        `${request.name ? `&name=${request.name}` : ''}`

export const loadPlayersRequest = createGetThunk<PagedResult<PlayerDto>, PlayersRequestDto>(
    'load-players',
    (request) => playerRequestToQuery(request),
    async (response) => {
        const result = await response.json();
        return result;
    }
)

export const createPlayerRequest = createPostThunk<number, {name: string}>(
    'create-player',
    () => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}`,
    (response) => response.json(),
    ({name}) => JSON.stringify(name)
)

export const renamePlayerRequest = createPutThunk<{id: number, name: string}>(
    'rename-player',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}/${request.id}/Name/${request.name}`
)

export const deletePlayerRequest = createDeleteThunk<{id: number}>(
    'delete-player',
    ({id}) => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}/${id}`
)