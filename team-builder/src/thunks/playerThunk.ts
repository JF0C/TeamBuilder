import { ApiUrls } from "../constants/ApiUrls";
import { PlayerDto } from "../dtos/PlayerDto";
import { PagedResult } from "../dtos/PagedResult";
import { PlayersRequestDto } from "../dtos/PlayersRequestDto";
import { createGetThunk, createPostThunk } from "./thunkBase";

export const loadPlayersRequest = createGetThunk<PagedResult<PlayerDto>, PlayersRequestDto>(
    'load-players',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}?page=${request.page}&count=${request.count}${
        request.group === null ? '' : '&group=' + request.group
    }`,
    (response) => response.json()
)

export const createPlayerRequest = createPostThunk<number, {name: string}>(
    'create-player',
    () => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}`,
    (response) => response.json(),
    ({name}) => JSON.stringify(name)
)
