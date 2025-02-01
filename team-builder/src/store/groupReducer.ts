import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagedResult } from "../dtos/PagedResult";
import { GroupDto } from "../dtos/GroupDto";
import { enqueueSnackbar } from "notistack";
import { addPlayerToGroupRequest, loadGroupPlayersRequest, loadGroupsRequest, removePlayerFromGroupRequest } from "../thunks/groupThunk";
import { PlayerDto } from "../dtos/PlayerDto";
import { MatchesRequestDto } from "../dtos/MatchesRequestDto";

export interface GroupState {
    loading: boolean;
    groups: PagedResult<GroupDto> | null
    editingGroup: GroupDto | null
    editingGroupPlayers: PagedResult<PlayerDto> | null
    queryFilter: MatchesRequestDto | null
}

export const initialState: GroupState = {
    loading: false,
    groups: null,
    editingGroup: null,
    editingGroupPlayers: null,
    queryFilter: null
}

export const groupSlice = createSlice({
    name: 'groups',
    initialState: initialState,
    reducers: {
        setEditingGroup(state, action: PayloadAction<GroupDto | null>) {
            state.editingGroup = action.payload;
        },
        resetGroups(state) {
            state.groups = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadGroupsRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadGroupsRequest.fulfilled, (state, action) => {
            state.groups = action.payload;
            state.groups.count = action.meta.arg.count;
            state.loading = false;
        })
        builder.addCase(loadGroupsRequest.rejected, (state, action) => {
            state.loading = false;
            state.groups = {
                page: action.meta.arg.page,
                totalItems: 0,
                totalPages: 0,
                items: []
            }
            enqueueSnackbar(`failed to load groups ${action.error.message}`, { variant: 'error' });
        })

        builder.addCase(loadGroupPlayersRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadGroupPlayersRequest.fulfilled, (state, action) => {
            state.editingGroupPlayers = action.payload;
            state.loading = false;
        })
        builder.addCase(loadGroupPlayersRequest.rejected, (state, action) => {
            state.loading = false;
            enqueueSnackbar(`failed to load players for group ${action.meta.arg.group}: ${action.error.message}`);
            state.editingGroupPlayers = {
                page: action.meta.arg.page,
                totalItems: 0,
                totalPages: 0,
                items: []
            }
        })

        builder.addCase(addPlayerToGroupRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addPlayerToGroupRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(addPlayerToGroupRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(removePlayerFromGroupRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removePlayerFromGroupRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(removePlayerFromGroupRequest.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const groupReducer = groupSlice.reducer;
export const {
    setEditingGroup,
    resetGroups
} = groupSlice.actions;
