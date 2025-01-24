import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../data/player";

export interface PlayerState {
    players: Player[]
    selected: number[]
    teamCount: number
}

export const initialState: PlayerState = {
    players: [
        {
            id: 1,
            name: 'Jan'
        },
        {
            id: 2,
            name: 'Alex'
        },
        {
            id: 3,
            name: 'Maxi'
        },
        {
            id: 4,
            name: 'Dora'
        },
        {
            id: 5,
            name: 'Aileen'
        },
        {
            id: 6,
            name: 'Phil'
        },
        {
            id: 7,
            name: 'Michi'
        },
        {
            id: 8,
            name: 'Georg'
        },
        {
            id: 9,
            name: 'Marina'
        },
        {
            id: 10,
            name: 'Ari'
        }
    ],
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
        }
    }
})

export const playerReducer = playerSlice.reducer;
export const {
    selectPlayer,
    deselectPlayer
} = playerSlice.actions;
