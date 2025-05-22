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
    matchesRequestState: RequestState
    current: MatchEntity
    queryFilter: MatchesRequestDto
    matches: PagedResult<MatchDto> | null

    selectedRequestState: RequestState
    detailedMatchId: number | null
    selected: MatchDto | null
    changedScores: TeamScoreDto[]
}

const emptyTeam = (): TeamEntity => {
    return {
        name: '',
        players: [],
        score: 0
    }
}

export const initialMatchState: MatchState = {
    matchesRequestState: 'required',
    current: {
        id: 0,
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
    selectedRequestState: 'ok',
    selected: null,
    changedScores: [],
    detailedMatchId: null
}

export const matchSlice = createSlice({
    name: 'match',
    initialState: initialMatchState,
    reducers: {
        setTeamCount(state, action: PayloadAction<number>) {
            while (state.current.teams.length < action.payload) {
                state.current.teams.push(emptyTeam())
            }
            if (state.current.teams.length > action.payload) {
                state.current.teams = state.current.teams.slice(0, action.payload)
            }
        },
        setTeamName(state, action: PayloadAction<{ index: number, name: string }>) {
            state.current.teams[action.payload.index].name = action.payload.name;
        },
        setTeamPlayers(state, action: PayloadAction<{ index: number, players: PlayerDto[] }>) {
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
        setTeamScore(state, action: PayloadAction<{ index: number, score: number }>) {
            state.current.teams[action.payload.index].score = action.payload.score;
        },
        reloadMatches(state, action: PayloadAction<{ page?: number, player?: number | null, type?: number | null }>) {
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
            state.matchesRequestState = 'required';
        },
        selectMatch(state, action: PayloadAction<MatchDto | null>) {
            state.selected = action.payload;
            state.changedScores = state.selected?.teams.map(t => { return { teamId: t.id, score: t.score } }) ?? [];
        },
        changeTeamScore(state, action: PayloadAction<TeamScoreDto>) {
            const score = state.changedScores.find(t => t.teamId === action.payload.teamId);
            if (score) {
                score.score = action.payload.score;
            }
        },
        setDetailedMatch(state, action: PayloadAction<number | null>) {
            state.detailedMatchId = action.payload;
            console.log('selected match: ', state.detailedMatchId)
            if (state.detailedMatchId !== null) {
                state.selectedRequestState = 'required';
            }
            else {
                state.selectedRequestState = 'ok';
                state.selected = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createMatchRequest.pending, (state) => { state.matchesRequestState = 'loading'; });
        builder.addCase(createMatchRequest.fulfilled, (state) => {
            enqueueSnackbar('Saved match!', { variant: 'success' })
            state.matchesRequestState = 'required';
        })
        builder.addCase(createMatchRequest.rejected, (state) => {
            enqueueSnackbar('Could not save match', { variant: 'error' })
            state.matchesRequestState = 'error';
        })

        builder.addCase(loadMatchesRequest.pending, (state) => {
            state.matchesRequestState = 'loading';
        })
        builder.addCase(loadMatchesRequest.fulfilled, (state, action) => {
            state.matches = action.payload;
            for (const match of state.matches.items) {
                match.created = new Date(match.created).valueOf();
            }
            state.matchesRequestState = 'ok';
        })
        builder.addCase(loadMatchesRequest.rejected, (state, action) => {
            state.matchesRequestState = 'error';
            state.matches = null;
            enqueueSnackbar(`failed to load matches ${action.error.message}`, { variant: 'error' });
        })

        builder.addCase(loadMatchRequest.pending, (state) => {
            state.selectedRequestState = 'loading';
        })
        builder.addCase(loadMatchRequest.fulfilled, (state, action) => {
            state.selected = action.payload;
            state.changedScores = state.selected?.teams.map(t => { return { teamId: t.id, score: t.score } }) ?? []
            state.selectedRequestState = 'ok';
        })
        builder.addCase(loadMatchRequest.rejected, (state, action) => {
            state.selectedRequestState = 'error';
            state.selected = null;
            enqueueSnackbar(`failed to load match ${action.meta.arg}: ${action.error.message}`, { variant: 'error' });
        })

        builder.addCase(setMatchScoresRequest.pending, (state) => { state.selectedRequestState = 'loading'; });
        builder.addCase(setMatchScoresRequest.fulfilled, (state) => { 
            state.selectedRequestState = 'required';
        });
        builder.addCase(setMatchScoresRequest.rejected, (state, action) => {
            state.selectedRequestState = 'error';
            enqueueSnackbar(`failed to set scores for match ${action.meta.arg.matchId}: ${action.error.message}`, { variant: 'error' });
        });

        builder.addCase(deleteMatchRequest.pending, (state) => { state.matchesRequestState = 'loading'; });
        builder.addCase(deleteMatchRequest.fulfilled, (state, action) => {
            state.matchesRequestState = 'required';
            if (state.selected?.id === action.meta.arg) {
                state.selected = null;
            }
        });
        builder.addCase(deleteMatchRequest.rejected, (state) => { state.matchesRequestState = 'error'; });
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
    changeTeamScore,
    setDetailedMatch
} = matchSlice.actions;
