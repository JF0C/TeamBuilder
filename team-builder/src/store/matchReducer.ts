import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MatchDto } from "../dtos/matches/MatchDto";
import { PagedResult } from "../dtos/base/PagedResult";
import { MatchEntity } from "../data/MatchEntity";
import { TeamEntity } from "../data/TeamEntity";
import { PlayerDto } from "../dtos/players/PlayerDto";
import { createMatchRequest, deleteMatchRequest, loadMatchesRequest, loadMatchRequest, setMatchScoresRequest } from "../thunks/matchThunk";
import { enqueueSnackbar } from "notistack";
import { MatchesRequestDto } from "../dtos/matches/MatchesRequestDto";
import { PaginationDefaults } from "../constants/PaginationDefaults";
import { TeamScoreDto } from "../dtos/teams/TeamScoreDto";
import { RequestState } from "../data/RequestState";

export interface MatchState {
    requestState: RequestState
    current: MatchEntity
    matches: PagedResult<MatchDto> | null
    selected: MatchDto | null
    queryFilter: MatchesRequestDto
    changedScores: TeamScoreDto[]
}

const emptyTeam = (): TeamEntity => {
    return {
        name: '',
        players: [],
        score: 0
    }
}

const initialState: MatchState = {
    requestState: 'initial',
    current: {
        teams: [
            emptyTeam(),
            emptyTeam()
        ],
        type: 0
    },
    matches: null,
    queryFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count
    },
    selected: null,
    changedScores: []
}

export const matchSlice = createSlice({
    name: 'match',
    initialState: initialState,
    reducers: {
        setTeamCount(state, action: PayloadAction<number>) {
            while (state.current.teams.length < action.payload) {
                state.current.teams.push(emptyTeam())
            }
            if (state.current.teams.length > action.payload) {
                state.current.teams = state.current.teams.slice(0, action.payload)
            }
        },
        setTeamName(state, action: PayloadAction<{index: number, name: string}>) {
            state.current.teams[action.payload.index].name = action.payload.name;
        },
        setTeamPlayers(state, action: PayloadAction<{index: number, players: PlayerDto[]}>) {
            state.current.teams[action.payload.index].players = action.payload.players;
        },
        setMatchType(state, action: PayloadAction<number>) {
            state.current.type = action.payload;
        },
        resetTeamPlayers(state) {
            for (const team of state.current.teams) {
                team.players = [];
            }
        },
        setTeamScore(state, action: PayloadAction<{index: number, score: number}>) {
            state.current.teams[action.payload.index].score = action.payload.score;
        },
        reloadMatches(state, action: PayloadAction<{page?: number, player?: number | null, type?: number | null}>) {
            if (action.payload.page) {
                state.queryFilter.page = action.payload.page;
            }
            if (action.payload.player !== undefined) {
                state.queryFilter.player = action.payload.player ?? undefined;
            }
            if (action.payload.type !== undefined) {
                state.queryFilter.type = action.payload.type ?? undefined;
            }
            state.matches = null;
            state.requestState = 'initial';
        },
        selectMatch(state, action: PayloadAction<MatchDto | null>) {
            state.selected = action.payload;
            state.changedScores = state.selected?.teams.map(t => { return {teamId: t.id, score: t.score}}) ?? [];
        },
        changeTeamScore(state, action: PayloadAction<TeamScoreDto>) {
            const score = state.changedScores.find(t => t.teamId === action.payload.teamId);
            if (score) {
                score.score = action.payload.score;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createMatchRequest.pending, (state) => { state.requestState = 'loading'; });
        builder.addCase(createMatchRequest.fulfilled, (state) => {
            enqueueSnackbar('Saved match!', {variant: 'success'})
            state.requestState = 'ok';
        })
        builder.addCase(createMatchRequest.rejected, (state) => {
            enqueueSnackbar('Could not save match', {variant: 'error'})
            state.requestState = 'error';
        })

        builder.addCase(loadMatchesRequest.pending, (state) => {
            state.requestState = 'loading';
        })
        builder.addCase(loadMatchesRequest.fulfilled, (state, action) => {
            state.matches = action.payload;
            for (const match of state.matches.items) {
                match.created = new Date(match.created).valueOf();
            }
            state.requestState = 'ok';
        })
        builder.addCase(loadMatchesRequest.rejected, (state, action) => {
            state.requestState = 'error';
            state.matches = null;
            enqueueSnackbar(`failed to load matches ${action.error.message}`, { variant: 'error' });
        })

        builder.addCase(loadMatchRequest.pending, (state) => {
            state.requestState = 'loading';
        })
        builder.addCase(loadMatchRequest.fulfilled, (state, action) => {
            state.selected = action.payload;
            state.changedScores = state.selected?.teams.map(t => { return {teamId: t.id, score: t.score}}) ?? []
            state.requestState = 'ok';
        })
        builder.addCase(loadMatchRequest.rejected, (state, action) => {
            state.requestState = 'error';
            state.selected = null;
            enqueueSnackbar(`failed to load match ${action.meta.arg}: ${action.error.message}`, { variant: 'error' });
        })

        builder.addCase(setMatchScoresRequest.pending, (state) => {state.requestState = 'loading';});
        builder.addCase(setMatchScoresRequest.fulfilled, (state) => {state.requestState = 'ok';});
        builder.addCase(setMatchScoresRequest.rejected, (state, action) => {
            state.requestState = 'error';
            enqueueSnackbar(`failed to set scores for match ${action.meta.arg.matchId}: ${action.error.message}`, { variant: 'error' });
        });

        builder.addCase(deleteMatchRequest.pending, (state) => {state.requestState = 'loading';});
        builder.addCase(deleteMatchRequest.fulfilled, (state) => {state.requestState = 'ok';});
        builder.addCase(deleteMatchRequest.rejected, (state) => {state.requestState = 'error';});
    }
})

export const matchReducer = matchSlice.reducer;
export const {
    setMatchType,
    setTeamCount,
    setTeamName,
    setTeamPlayers,
    resetTeamPlayers,
    setTeamScore,
    reloadMatches,
    selectMatch,
    changeTeamScore
} = matchSlice.actions;
