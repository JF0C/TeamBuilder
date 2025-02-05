import { createSlice } from "@reduxjs/toolkit"
import { codeAuthorizationRequest } from "../thunks/authThunk"
import { enqueueSnackbar } from "notistack"
import { LoginResponseDto } from "../dtos/auth/LoginResponseDto"

export interface AuthState {
    loading: boolean
    user: LoginResponseDto | null
    loginFailed: boolean
}

const initialState: AuthState = {
    loading: false,
    user: null,
    loginFailed: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout(state) {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(codeAuthorizationRequest.pending, (state) => { state.loading = true; })
        builder.addCase(codeAuthorizationRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(codeAuthorizationRequest.rejected, (state, action) => {
            state.loading = false;
            const message = `Error retrieving access token ${action.error.message}`;
            enqueueSnackbar(message, {variant: 'error'})
            state.user = {
                playerId: '',
                playerName: 'error logging in',
                email: '',
                scope: '',
                accessToken: message,
                roles: []
            };
            state.loginFailed = true;
        })
    }
})

export const authReducer = authSlice.reducer;
export const {
    logout
} = authSlice.actions;
