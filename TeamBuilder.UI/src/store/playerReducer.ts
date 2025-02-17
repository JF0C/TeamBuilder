import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerDto } from "../dtos/players/PlayerDto";
import { createPlayerRequest, deletePlayerRequest, loadPlayersRequest, renamePlayerRequest } from "../thunks/playerThunk";
import { PagedResult } from "../dtos/base/PagedResult";
import { GroupDto } from "../dtos/groups/GroupDto";
import { enqueueSnackbar } from "notistack";
import { PlayersRequestDto } from "../dtos/players/PlayersRequestDto";
import { PaginationDefaults } from "../constants/PaginationDefaults";
import { RequestState } from "../data/RequestState";

export interface PlayerState {
    requestState: RequestState;
    group: GroupDto | null
    players: PagedResult<PlayerDto> | null
    queryFilter: PlayersRequestDto
    selected: PlayerDto[]
    editingPlayer: PlayerDto | null
}

export const initialPlayerState: PlayerState = {
    requestState: 'required',
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
    initialState: initialPlayerState,
    reducers: {
        selectPlayer(state, action: PayloadAction<PlayerDto>) {
            if (state.selected.find(x => x.id === action.payload.id)) {
                return;
            }
            state.selected.push(action.payload);
            state.queryFilter.exclude = state.selected.map(s => s.id);
        },
        deselectPlayer(state, action: PayloadAction<number>) {
            state.selected = state.selected.filter(x => x.id !== action.payload);
            state.queryFilter.exclude = state.selected.map(s => s.id);
        },
        clearSelectedPlayers(state) {
            state.selected = [];
            state.queryFilter.exclude = state.selected.map(s => s.id);
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
            state.requestState = 'required';
            state.players = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadPlayersRequest.pending, (state) => {
            state.requestState = 'loading';
        })
        builder.addCase(loadPlayersRequest.fulfilled, (state, action) => {
            state.players = action.payload;
            const editingPlayerId = state.editingPlayer?.id
            if (editingPlayerId) {
                state.editingPlayer = action.payload.items.find(p => p.id === editingPlayerId) ?? null
            }
            state.requestState = 'ok';
        })
        builder.addCase(loadPlayersRequest.rejected, (state, action) => {
            state.requestState = 'error';
            state.players = null;
            enqueueSnackbar(`failed to load players ${action.error.message}`, { variant: 'error' });
        })

        builder.addCase(createPlayerRequest.pending, (state) => {
            state.requestState = 'loading';
        })
        builder.addCase(createPlayerRequest.fulfilled, (state) => {
            state.requestState = 'required';
            state.queryFilter.group = undefined;
        })
        builder.addCase(createPlayerRequest.rejected, (state) => {
            state.requestState = 'error';
            enqueueSnackbar(`failed to create player`, { variant: 'error' });
        })

        builder.addCase(renamePlayerRequest.pending, (state) => {
            state.requestState = 'loading';
        })
        builder.addCase(renamePlayerRequest.fulfilled, (state) => {
            state.requestState = 'required';
        })
        builder.addCase(renamePlayerRequest.rejected, (state, action) => {
            state.requestState = 'error';
            enqueueSnackbar(`failed to rename player: ${action.error.message}`, {variant: 'error'});
        })

        builder.addCase(deletePlayerRequest.pending, (state) => {
            state.requestState = 'loading';
        })
        builder.addCase(deletePlayerRequest.fulfilled, (state) => {
            state.requestState = 'required';
            state.editingPlayer = null;
        })
        builder.addCase(deletePlayerRequest.rejected, (state, action) => {
            state.requestState = 'error';
            enqueueSnackbar(`failed to delete player: ${action.error.message}`, {variant: 'error'});
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
