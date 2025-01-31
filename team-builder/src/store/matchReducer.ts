import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MatchDto } from "../dtos/MatchDto";
import { PagedResult } from "../dtos/PagedResult";
import { MatchEntity } from "../data/MatchEntity";
import { TeamEntity } from "../data/TeamEntity";
import { PlayerDto } from "../dtos/PlayerDto";
import { createMatchRequest } from "../thunks/matchThunk";
import { enqueueSnackbar } from "notistack";

export interface MatchState {
    loading: boolean
    current: MatchEntity
    matches: PagedResult<MatchDto> | null
}

const emptyTeam = (): TeamEntity => {
    return {
        name: '',
        players: [],
        score: 0
    }
}

const initialState: MatchState = {
    loading: false,
    current: {
        teams: [
            emptyTeam(),
            emptyTeam()
        ],
        type: 0
    },
    matches: null,
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createMatchRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createMatchRequest.fulfilled, (state) => {
            enqueueSnackbar('Saved match!', {variant: 'success'})
            state.loading = false;
        })
        builder.addCase(createMatchRequest.rejected, (state) => {
            enqueueSnackbar('Could not save match', {variant: 'error'})
            state.loading = false;
        })
    }
})

export const matchReducer = matchSlice.reducer;
export const {
    setMatchType,
    setTeamCount,
    setTeamName,
    setTeamPlayers,
    resetTeamPlayers,
    setTeamScore
} = matchSlice.actions;
