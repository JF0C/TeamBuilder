import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagedResult } from "../dtos/PagedResult";
import { GroupDto } from "../dtos/GroupDto";
import { enqueueSnackbar } from "notistack";
import { loadGroupsRequest } from "../thunks/groupThunk";

export interface GroupState {
    loading: boolean;
    groups: PagedResult<GroupDto> | null
    editingGroup: GroupDto | null
}

export const initialState: GroupState = {
    loading: false,
    groups: null,
    editingGroup: null
}

export const groupSlice = createSlice({
    name: 'groups',
    initialState: initialState,
    reducers: {
        setEditingGroup(state, action: PayloadAction<GroupDto | null>) {
            state.editingGroup = action.payload;
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
            enqueueSnackbar(`failed to load players ${action.error.message}`, { variant: 'error' });
        })

    }
})

export const groupReducer = groupSlice.reducer;
export const {
    setEditingGroup
} = groupSlice.actions;
