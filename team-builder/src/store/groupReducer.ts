import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagedResult } from "../dtos/base/PagedResult";
import { GroupDto } from "../dtos/groups/GroupDto";
import { enqueueSnackbar } from "notistack";
import { createGroupRequest, deleteGroupRequest, loadGroupsRequest, renameGroupRequest } from "../thunks/groupThunk";
import { GroupsRequestDto } from "../dtos/groups/GroupsRequestDto";
import { PaginationDefaults } from "../constants/PaginationDefaults";
import { RequestState } from "../data/RequestState";

export interface GroupState {
    requestState: RequestState;

    groups: PagedResult<GroupDto> | null
    queryFilter: GroupsRequestDto

    editingGroup: GroupDto | null
}

const initialState: GroupState = {
    requestState: 'required',

    groups: null,
    queryFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count
    },

    editingGroup: null
}

export const groupSlice = createSlice({
    name: 'groups',
    initialState: initialState,
    reducers: {
        setEditingGroup(state, action: PayloadAction<GroupDto | null>) {
            state.editingGroup = action.payload;
        },
        reloadGroups(state, action: PayloadAction<{page?: number}>) {
            if (action.payload.page !== undefined) {
                state.queryFilter.page = action.payload.page
            }
            state.groups = null;
            state.requestState = 'required';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadGroupsRequest.pending, (state) => { state.requestState = 'loading'; });
        builder.addCase(loadGroupsRequest.fulfilled, (state, action) => {
            state.groups = action.payload;
            const changedEditingGroup = state.groups.items.find(x => x.id === state.editingGroup?.id);
            if (changedEditingGroup && state.editingGroup) {
                state.editingGroup = changedEditingGroup;
            }
            state.requestState = 'ok';
        })
        builder.addCase(loadGroupsRequest.rejected, (state, action) => {
            state.requestState = 'error';
            state.groups = null;
            enqueueSnackbar(`failed to load groups ${action.error.message}`, { variant: 'error' });
        })

        for (const request of [renameGroupRequest, createGroupRequest]) {
            builder.addCase(request.pending, (state) => { state.requestState = 'loading'; })
            builder.addCase(request.fulfilled, (state) => { state.requestState = 'required'; })
            builder.addCase(request.rejected, (state) => { state.requestState = 'error'; })
        }

        builder.addCase(deleteGroupRequest.pending, (state) => { state.requestState = 'loading'; })
        builder.addCase(deleteGroupRequest.fulfilled, (state) => { state.requestState = 'required'; state.editingGroup = null; })
        builder.addCase(deleteGroupRequest.rejected, (state) => { state.requestState = 'error'; })
    }
})

export const groupReducer = groupSlice.reducer;
export const {
    setEditingGroup,
    reloadGroups
} = groupSlice.actions;
