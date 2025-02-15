import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { codeAuthorizationRequest } from "../thunks/authThunk"
import { enqueueSnackbar } from "notistack"
import { LoginResponseDto } from "../dtos/auth/LoginResponseDto"
import { RequestState } from "../data/RequestState"
import { AuthProperties } from "../constants/AuthProperties"

export interface AuthState {
    requestState: RequestState
    user: LoginResponseDto | null
    loginFailed: boolean
    userRestored: boolean
}

const initialState: AuthState = {
    requestState: 'initial',
    user: null,
    loginFailed: false,
    userRestored: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem(AuthProperties.LocalStorageUserKey);
        },
        restoreUser(state, action: PayloadAction<LoginResponseDto | null>) {
            state.user = action.payload;
            state.userRestored = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(codeAuthorizationRequest.pending, (state) => { state.requestState = 'loading'; })
        builder.addCase(codeAuthorizationRequest.fulfilled, (state, action) => {
            state.requestState = 'ok';
            state.user = action.payload;
        })
        builder.addCase(codeAuthorizationRequest.rejected, (state, action) => {
            state.requestState = 'error';
            const message = `Error retrieving access token ${action.error.message}`;
            enqueueSnackbar(message, {variant: 'error'})
            state.user = null;
            state.loginFailed = true;
        })
    }
})

export const authReducer = authSlice.reducer;
export const {
    logout,
    restoreUser
} = authSlice.actions;
