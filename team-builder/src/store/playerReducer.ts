import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerDto } from "../dtos/PlayerDto";
import { createPlayerRequest, loadPlayersRequest } from "../thunks/playerThunk";
import { PagedResult } from "../dtos/PagedResult";
import { GroupDto } from "../dtos/GroupDto";

export interface PlayerState {
    loading: boolean;
    group: GroupDto | null
    players: PagedResult<PlayerDto> | null
    selected: number[]
    teamCount: number
    editingPlayer: PlayerDto | null
}

export const initialState: PlayerState = {
    loading: false,
    group: null,
    players: null,
    selected: [],
    teamCount: 2,
    editingPlayer: null
}

export const playerSlice = createSlice({
    name: 'players',
    initialState: initialState,
    reducers: {
        selectPlayer(state, action: PayloadAction<PlayerDto>) {
            if (state.selected.find(x => x === action.payload.id)) {
                return;
            }
            state.selected.push(action.payload.id);
        },
        deselectPlayer(state, action: PayloadAction<number>) {
            state.selected = state.selected.filter(x => x !== action.payload);
        },
        clearSelectedPlayers(state) {
            state.selected = [];
        },
        setEditingPlayer(state, action: PayloadAction<PlayerDto|null>) {
            state.editingPlayer = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadPlayersRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadPlayersRequest.fulfilled, (state, action) => {
            state.players = action.payload;
            state.players.count = action.meta.arg.count;
            state.loading = false;
        })
        builder.addCase(loadPlayersRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(createPlayerRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createPlayerRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(createPlayerRequest.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const playerReducer = playerSlice.reducer;
export const {
    selectPlayer,
    deselectPlayer,
    clearSelectedPlayers,
    setEditingPlayer
} = playerSlice.actions;
