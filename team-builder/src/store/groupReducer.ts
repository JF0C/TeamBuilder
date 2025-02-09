import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagedResult } from "../dtos/base/PagedResult";
import { GroupDto } from "../dtos/groups/GroupDto";
import { enqueueSnackbar } from "notistack";
import { addPlayerToGroupRequest, loadGroupPlayersRequest, loadGroupsRequest, removePlayerFromGroupRequest, renameGroupRequest } from "../thunks/groupThunk";
import { PlayerDto } from "../dtos/players/PlayerDto";
import { GroupsRequestDto } from "../dtos/groups/GroupsRequestDto";
import { PaginationDefaults } from "../constants/PaginationDefaults";
import { GroupPlayersRequestDto } from "../dtos/groups/GroupPlayersRequestDto";
import { RequestState } from "../data/RequestState";

export interface GroupState {
    requestState: RequestState;

    groups: PagedResult<GroupDto> | null
    queryFilter: GroupsRequestDto

    editingGroup: GroupDto | null
    editingGroupPlayers: PagedResult<PlayerDto> | null
    groupPlayersFilter: GroupPlayersRequestDto
}

export const initialState: GroupState = {
    requestState: 'initial',

    groups: null,
    queryFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count
    },

    editingGroup: null,
    editingGroupPlayers: null,
    groupPlayersFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count,
        group: 0
    }
}

export const groupSlice = createSlice({
    name: 'groups',
    initialState: initialState,
    reducers: {
        setEditingGroup(state, action: PayloadAction<GroupDto | null>) {
            state.editingGroup = action.payload;
            if (action.payload) {
                state.groupPlayersFilter.group = action.payload.id;
                state.editingGroupPlayers = null;
            }
        },
        reloadEditingGroupPlayers(state, action: PayloadAction<{page?: number}>) {
            if (action.payload.page !== undefined) {
                state.groupPlayersFilter.page = action.payload.page
            }
            state.editingGroupPlayers = null;
        },
        reloadGroups(state, action: PayloadAction<{page?: number}>) {
            if (action.payload.page !== undefined) {
                state.queryFilter.page = action.payload.page
            }
            state.groups = null;
            state.requestState = 'initial';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadGroupsRequest.pending, (state) => { state.requestState = 'loading'; });
        builder.addCase(loadGroupsRequest.fulfilled, (state, action) => {
            state.groups = action.payload;
            state.requestState = 'ok';
        })
        builder.addCase(loadGroupsRequest.rejected, (state, action) => {
            state.requestState = 'error';
            state.groups = null;
            enqueueSnackbar(`failed to load groups ${action.error.message}`, { variant: 'error' });
        })

        builder.addCase(loadGroupPlayersRequest.pending, (state) => { state.requestState = 'loading'; });
        builder.addCase(loadGroupPlayersRequest.fulfilled, (state, action) => {
            state.editingGroupPlayers = action.payload;
            state.requestState = 'ok';
        })
        builder.addCase(loadGroupPlayersRequest.rejected, (state, action) => {
            state.requestState = 'error';
            enqueueSnackbar(`failed to load players for group ${action.meta.arg.group}: ${action.error.message}`);
            state.editingGroupPlayers = null;
        })

        builder.addCase(addPlayerToGroupRequest.pending, (state) => { state.requestState = 'loading'; })
        builder.addCase(addPlayerToGroupRequest.fulfilled, (state) => { state.requestState = 'ok'; })
        builder.addCase(addPlayerToGroupRequest.rejected, (state) => { state.requestState = 'error'; })

        builder.addCase(removePlayerFromGroupRequest.pending, (state) => { state.requestState = 'loading'; })
        builder.addCase(removePlayerFromGroupRequest.fulfilled, (state) => { state.requestState = 'ok'; })
        builder.addCase(removePlayerFromGroupRequest.rejected, (state) => { state.requestState = 'error'; })

        builder.addCase(renameGroupRequest.pending, (state) => { state.requestState = 'loading'; })
        builder.addCase(renameGroupRequest.fulfilled, (state) => { state.requestState = 'ok'; })
        builder.addCase(renameGroupRequest.rejected, (state) => { state.requestState = 'error'; })
    }
})

export const groupReducer = groupSlice.reducer;
export const {
    setEditingGroup,
    reloadGroups,
    reloadEditingGroupPlayers
} = groupSlice.actions;
