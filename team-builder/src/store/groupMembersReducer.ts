import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationDefaults } from "../constants/PaginationDefaults";
import { RequestState } from "../data/RequestState";
import { PagedResult } from "../dtos/base/PagedResult";
import { GroupPlayersRequestDto } from "../dtos/groups/GroupPlayersRequestDto";
import { PlayerDto } from "../dtos/players/PlayerDto";
import { addPlayerToGroupRequest, loadGroupMembersRequest, removePlayerFromGroupRequest } from "../thunks/groupThunk";
import { enqueueSnackbar } from "notistack";

export interface GroupMembersState {
    requestState: RequestState

    queryFilter: GroupPlayersRequestDto
    members: PagedResult<PlayerDto> | null
}

const initialState: GroupMembersState = {
    requestState: 'initial',
    queryFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count,
        group: 0
    },
    members: null
}

export const groupMembersSlice= createSlice({
    name: 'group-members',
    initialState: initialState,
    reducers: {
        reloadGroupMembers(state, action: PayloadAction<{group?: number, page?: number}>) {
            if (action.payload.page !== undefined) {
                state.queryFilter.page = action.payload.page;
            }
            if (action.payload.group !== undefined) {
                state.queryFilter.group = action.payload.group;
            }
            state.requestState = 'initial'
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadGroupMembersRequest.pending, (state) => { state.requestState = 'loading'; });
        builder.addCase(loadGroupMembersRequest.fulfilled, (state, action) => {
            state.members = action.payload;
            state.requestState = 'ok';
        })
        builder.addCase(loadGroupMembersRequest.rejected, (state, action) => {
            state.requestState = 'error';
            enqueueSnackbar(`failed to load members of group ${action.meta.arg.group}: ${action.error.message}`);
            state.members = null;
        })

        builder.addCase(addPlayerToGroupRequest.pending, (state) => { state.requestState = 'loading'; })
        builder.addCase(addPlayerToGroupRequest.fulfilled, (state) => { state.requestState = 'ok'; })
        builder.addCase(addPlayerToGroupRequest.rejected, (state) => { state.requestState = 'error'; })

        builder.addCase(removePlayerFromGroupRequest.pending, (state) => { state.requestState = 'loading'; })
        builder.addCase(removePlayerFromGroupRequest.fulfilled, (state) => { state.requestState = 'ok'; })
        builder.addCase(removePlayerFromGroupRequest.rejected, (state) => { state.requestState = 'error'; })
    }
})

export const groupMembersReducer = groupMembersSlice.reducer;
export const {
    reloadGroupMembers
} = groupMembersSlice.actions
