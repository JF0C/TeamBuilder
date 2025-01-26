import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerDto } from "../dtos/PlayerDto";
import { createPlayerRequest, loadPlayersRequest } from "../thunks/playerThunk";
import { PagedResult } from "../dtos/PagedResult";
import { GroupDto } from "../dtos/GroupDto";
import { enqueueSnackbar } from "notistack";

export interface PlayerState {
    loading: boolean;
    group: GroupDto | null
    players: PagedResult<PlayerDto> | null
    selected: number[]
    editingPlayer: PlayerDto | null
}

export const initialState: PlayerState = {
    loading: false,
    group: null,
    players: null,
    selected: [],
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
        },
        setGroup(state, action: PayloadAction<GroupDto | null>) {
            state.group = action.payload;
        },
        resetPlayers(state) {
            state.players = null;
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
        builder.addCase(loadPlayersRequest.rejected, (state, action) => {
            state.loading = false;
            state.players = {
                page: action.meta.arg.page,
                totalItems: 0,
                totalPages: 0,
                items: []
            }
            enqueueSnackbar(`failed to load players ${action.error.message}`, { variant: 'error' });
        })

        builder.addCase(createPlayerRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createPlayerRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(createPlayerRequest.rejected, (state) => {
            state.loading = false;
            enqueueSnackbar(`failed to create player`, { variant: 'error' });
        })
    }
})

export const playerReducer = playerSlice.reducer;
export const {
    selectPlayer,
    deselectPlayer,
    clearSelectedPlayers,
    setEditingPlayer,
    setGroup,
    resetPlayers
} = playerSlice.actions;
