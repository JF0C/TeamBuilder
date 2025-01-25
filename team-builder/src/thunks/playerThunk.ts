import { ApiUrls } from "../constants/ApiUrls";
import { Player } from "../data/player";
import { PagedResult } from "../dtos/PagedResult";
import { PlayersRequestDto } from "../dtos/PlayersRequestDto";
import { createGetThunk } from "./thunkBase";

export const loadPlayersRequest = createGetThunk<PagedResult<Player>, PlayersRequestDto>(
    'load-players',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint}?page=${request.page}&count=${request.count}${
        request.group === null ? '' : '&group=' + request.group
    }`,
    (response) => response.json()
)