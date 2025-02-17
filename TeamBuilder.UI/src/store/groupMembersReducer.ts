import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationDefaults } from "../constants/PaginationDefaults";
import { RequestState } from "../data/RequestState";
import { PagedResult } from "../dtos/base/PagedResult";
import { GroupPlayersRequestDto } from "../dtos/groups/GroupPlayersRequestDto";
import { PlayerDto } from "../dtos/players/PlayerDto";
import { addPlayerToGroupRequest, loadAvailableMembersRequest, loadGroupMembersRequest, removePlayerFromGroupRequest } from "../thunks/groupThunk";
import { enqueueSnackbar } from "notistack";
import { AvailableMembersRequestDto } from "../dtos/groups/AvailableMembersRequestDto";

export interface GroupMembersState {
    availableRequestState: RequestState
    availableFilter: AvailableMembersRequestDto
    available: PagedResult<PlayerDto> | null

    memberRequestState: RequestState
    memberFilter: GroupPlayersRequestDto
    members: PagedResult<PlayerDto> | null
}

export const initialGroupMembersState: GroupMembersState = {
    availableRequestState: 'required',
    availableFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count,
        exclude: []
    },
    available: null,

    memberRequestState: 'required',
    memberFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count,
        group: 0
    },
    members: null
}

export const groupMembersSlice= createSlice({
    name: 'group-members',
    initialState: initialGroupMembersState,
    reducers: {
        reloadGroupMembers(state, action: PayloadAction<{group?: number, page?: number}>) {
            if (action.payload.page !== undefined) {
                state.memberFilter.page = action.payload.page;
            }
            if (action.payload.group !== undefined) {
                state.memberFilter.group = action.payload.group;
            }
            state.memberRequestState = 'required'
        },
        reloadAvailableMembers(state, action: PayloadAction<{page?: number, name?: string}>) {
            if (action.payload.page !== undefined) {
                state.availableFilter.page = action.payload.page;
            }
            if (action.payload.name !== undefined) {
                state.availableFilter.name = action.payload.name;
            }
            state.availableRequestState = 'required'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadGroupMembersRequest.pending, (state) => { state.memberRequestState = 'loading'; });
        builder.addCase(loadGroupMembersRequest.fulfilled, (state, action) => {
            state.members = action.payload;
            state.availableFilter.exclude = state.members.items.map(p => p.id);
            state.memberRequestState = 'ok';
        })
        builder.addCase(loadGroupMembersRequest.rejected, (state, action) => {
            state.memberRequestState = 'error';
            enqueueSnackbar(`failed to load members of group ${action.meta.arg.group}: ${action.error.message}`);
            state.members = null;
        })

        builder.addCase(loadAvailableMembersRequest.pending, (state) => { state.availableRequestState = 'loading' });
        builder.addCase(loadAvailableMembersRequest.fulfilled, (state, action) => {
            state.available = action.payload;
            state.availableRequestState = 'ok';
        })
        builder.addCase(loadAvailableMembersRequest.rejected, (state, action) => {
            state.availableRequestState = 'error';
            enqueueSnackbar(`failed to load members available for group ${state.memberFilter.group}: ${action.error.message}`);
            state.available = null;
        })

        for (const request of [addPlayerToGroupRequest, removePlayerFromGroupRequest]) {
            builder.addCase(request.pending, (state) => {
                state.memberRequestState = 'loading';
                state.availableRequestState = 'loading';
            })
            builder.addCase(request.fulfilled, (state) => {
                state.memberRequestState = 'required';
                state.availableRequestState = 'required';
            })
            builder.addCase(request.rejected, (state) => {
                state.memberRequestState = 'error';
                state.availableRequestState = 'error';
            })
        }
    }
})

export const groupMembersReducer = groupMembersSlice.reducer;
export const {
    reloadGroupMembers,
    reloadAvailableMembers
} = groupMembersSlice.actions
