import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagedResult } from "../dtos/PagedResult";
import { GroupDto } from "../dtos/GroupDto";
import { enqueueSnackbar } from "notistack";
import { addPlayerToGroupRequest, loadGroupPlayersRequest, loadGroupsRequest, removePlayerFromGroupRequest } from "../thunks/groupThunk";
import { PlayerDto } from "../dtos/PlayerDto";
import { GroupsRequestDto } from "../dtos/GroupsRequestDto";
import { PaginationDefaults } from "../constants/DefaultPagination";
import { GroupPlayersRequestDto } from "../dtos/GroupPlayersRequestDto";

export interface GroupState {
    loading: boolean;

    groups: PagedResult<GroupDto> | null
    queryFilter: GroupsRequestDto

    editingGroup: GroupDto | null
    editingGroupPlayers: PagedResult<PlayerDto> | null
    groupPlayersFilter: GroupPlayersRequestDto
}

export const initialState: GroupState = {
    loading: false,

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadGroupsRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadGroupsRequest.fulfilled, (state, action) => {
            state.groups = action.payload;
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
    reloadGroups,
    reloadEditingGroupPlayers
} = groupSlice.actions;
