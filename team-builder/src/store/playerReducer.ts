import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerDto } from "../dtos/PlayerDto";
import { createPlayerRequest, loadPlayersRequest, renamePlayerRequest } from "../thunks/playerThunk";
import { PagedResult } from "../dtos/PagedResult";
import { GroupDto } from "../dtos/GroupDto";
import { enqueueSnackbar } from "notistack";
import { PlayersRequestDto } from "../dtos/PlayersRequestDto";
import { PaginationDefaults } from "../constants/PaginationDefaults";

export interface PlayerState {
    loading: boolean;
    group: GroupDto | null
    players: PagedResult<PlayerDto> | null
    queryFilter: PlayersRequestDto
    selected: PlayerDto[]
    editingPlayer: PlayerDto | null
}

export const initialState: PlayerState = {
    loading: false,
    group: null,
    players: null,
    queryFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count
    },
    selected: [],
    editingPlayer: null
}

export const playerSlice = createSlice({
    name: 'players',
    initialState: initialState,
    reducers: {
        selectPlayer(state, action: PayloadAction<PlayerDto>) {
            if (state.selected.find(x => x.id === action.payload.id)) {
                return;
            }
            state.selected.push(action.payload);
        },
        deselectPlayer(state, action: PayloadAction<number>) {
            state.selected = state.selected.filter(x => x.id !== action.payload);
        },
        clearSelectedPlayers(state) {
            state.selected = [];
        },
        setEditingPlayer(state, action: PayloadAction<PlayerDto|null>) {
            state.editingPlayer = action.payload;
        },
        reloadPlayers(state, action: PayloadAction<{group?: GroupDto | null, name?: string, page?: number}>) {
            if (action.payload.group !== undefined) {
                state.group = action.payload.group;
                state.queryFilter.group = action.payload.group?.id
            }
            if (action.payload.page !== undefined) {
                state.queryFilter.page = action.payload.page;
            }
            if (action.payload.name !== undefined) {
                state.queryFilter.name = action.payload.name
            }
            state.players = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadPlayersRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadPlayersRequest.fulfilled, (state, action) => {
            state.players = action.payload;
            const editingPlayerId = state.editingPlayer?.id
            if (editingPlayerId) {
                state.editingPlayer = action.payload.items.find(p => p.id === editingPlayerId) ?? null
            }
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

        builder.addCase(renamePlayerRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(renamePlayerRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(renamePlayerRequest.rejected, (state, action) => {
            state.loading = false;
            enqueueSnackbar(`failed to rename player: ${action.error.message}`, {variant: 'error'});
        })
    }
})

export const playerReducer = playerSlice.reducer;
export const {
    selectPlayer,
    deselectPlayer,
    clearSelectedPlayers,
    setEditingPlayer,
    reloadPlayers
} = playerSlice.actions;
