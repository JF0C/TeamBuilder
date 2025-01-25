import { ApiUrls } from "../constants/ApiUrls";
import { Player } from "../data/player";
import { PlayersRequestDto } from "../dtos/PlayersRequestDto";
import { createGetThunk } from "./thunkBase";

export const loadPlayersRequest = createGetThunk<Player[], PlayersRequestDto>(
    'load-players',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.PlayersEndpoint + (request.group === null ? '' : '/' + request.group)}`,
    (response) => response.json()
)