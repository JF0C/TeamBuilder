import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../data/player";
import { loadPlayersRequest } from "../thunks/playerThunk";

export interface PlayerState {
    players: Player[] | null
    selected: number[]
    teamCount: number
}

export const initialState: PlayerState = {
    players: null,
    selected: [],
    teamCount: 2
}

export const playerSlice = createSlice({
    name: 'players',
    initialState: initialState,
    reducers: {
        selectPlayer(state, action: PayloadAction<Player>) {
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadPlayersRequest.fulfilled, (state, action) => {
            state.players = action.payload;
        })
    }
})

export const playerReducer = playerSlice.reducer;
export const {
    selectPlayer,
    deselectPlayer,
    clearSelectedPlayers
} = playerSlice.actions;
