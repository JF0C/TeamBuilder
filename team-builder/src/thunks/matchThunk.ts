import { ApiUrls } from "../constants/ApiUrls";
import { MatchEntity } from "../data/MatchEntity";
import { MatchDto } from "../dtos/matches/MatchDto";
import { MatchesRequestDto } from "../dtos/matches/MatchesRequestDto";
import { PagedResult } from "../dtos/base/PagedResult";
import { TeamScoreDto } from "../dtos/teams/TeamScoreDto";
import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "./thunkBase";

export const createMatchRequest = createPostThunk<number, MatchEntity>(
    'create-match',
    () => `${ApiUrls.BaseUrl + ApiUrls.MatchesEndpoint}`,
    (response) => response.json()
)

export const loadMatchesRequest = createGetThunk<PagedResult<MatchDto>, MatchesRequestDto>(
    'load-matches',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.MatchesEndpoint}?page=${request.page}&count=${request.count}` +
        `${request.player ? `&player=${request.player}` : ''}` +
        `${request.type !== undefined ? `&type=${request.type}` : ''}` +
        `${request.from !== undefined ? `&to=${request.from}` : ''}` +
        `${request.to !== undefined ? `&to=${request.to}` : ''}`,
    (response) => response.json()
)

export const loadMatchRequest = createGetThunk<MatchDto, number>(
    'load-match',
    (id) => `${ApiUrls.BaseUrl + ApiUrls.MatchesEndpoint}/${id}`,
    (response) => response.json()
)

export const setMatchScoresRequest = createPutThunk<{matchId: number, scores: TeamScoreDto[]}>(
    'set-match-scores',
    ({matchId}) => `${ApiUrls.BaseUrl + ApiUrls.MatchesEndpoint}/${matchId}/Scores`,
    (request) => JSON.stringify(request.scores)
)

export const deleteMatchRequest = createDeleteThunk<number>(
    'delete-match',
    (id) => `${ApiUrls.BaseUrl + ApiUrls.MatchesEndpoint}/${id}`
)
