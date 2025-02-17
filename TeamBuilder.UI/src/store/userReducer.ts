import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationDefaults } from "../constants/PaginationDefaults";
import { RequestState } from "../data/RequestState";
import { PagedResult } from "../dtos/base/PagedResult";
import { UserDto } from "../dtos/users/UserDto";
import { UsersRequestDto } from "../dtos/users/UsersRequestDto";
import { addRoleRequest, loadUsersRequest, removeRoleRequest } from "../thunks/adminThunk";
import { GroupDto } from "../dtos/groups/GroupDto";

export interface UsersState {
    requestState: RequestState
    group: GroupDto | null
    users: PagedResult<UserDto> | null
    queryFilter: UsersRequestDto
    selected: UserDto | null
}

export const initialUsersState: UsersState = {
    requestState: 'required',
    users: null,
    group: null,
    queryFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count,
    },
    selected: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers: {
        setSelectedUser(state, action: PayloadAction<UserDto | null>) {
            state.selected = action.payload
        },
        reloadUsers(state, action: PayloadAction<{group?: GroupDto | null, name?: string, page?: number}>) {
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadUsersRequest.pending, (state) => { state.requestState = 'loading'; });
        builder.addCase(loadUsersRequest.fulfilled, (state, action) => {
            state.users = action.payload
            state.requestState = 'ok'
            const selectedUser = action.payload.items.find(u => u.id === state.selected?.id);
            if (selectedUser) {
                state.selected = selectedUser;
            }
        })
        builder.addCase(loadUsersRequest.rejected, (state) => { state.requestState = 'error' })

        for (const request of [addRoleRequest, removeRoleRequest]) {
            builder.addCase(request.pending, state => { state.requestState = 'loading'; });
            builder.addCase(request.fulfilled, state => { state.requestState = 'required'; });
            builder.addCase(request.rejected, state => { state.requestState = 'error'; });
        }
    }
})

export const userReducer = usersSlice.reducer
export const {
    setSelectedUser,
    reloadUsers
} = usersSlice.actions
