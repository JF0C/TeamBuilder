import { ApiUrls } from "../constants/ApiUrls";
import { PlayerDto } from "../dtos/PlayerDto";
import { PagedResult } from "../dtos/PagedResult";
import { PlayersRequestDto } from "../dtos/PlayersRequestDto";
import { createDeleteThunk, createGetThunk, createPostThunk } from "./thunkBase";

export const loadPlayersRequest = createGetThunk<PagedResult<PlayerDto>, PlayersRequestDto>(
    'load-players',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}?page=${request.page}&count=${request.count}${
        request.group === null ? '' : '&group=' + request.group
    }`,
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

export const deletePlayerRequest = createDeleteThunk<{id: number}>(
    'delete-player',
    ({id}) => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}/${id}`
)