import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { codeAuthorizationRequest } from "../thunks/authThunk"
import { enqueueSnackbar } from "notistack"

export interface AuthState {
    loading: boolean
    accessToken: string | null
}

const initialState: AuthState = {
    loading: false,
    accessToken: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string | null>) {
            state.accessToken = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(codeAuthorizationRequest.pending, (state) => { state.loading = true; })
        builder.addCase(codeAuthorizationRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.accessToken;
        })
        builder.addCase(codeAuthorizationRequest.rejected, (state, action) => {
            state.loading = false;
            const message = `Error retrieving access token ${action.error.message}`;
            enqueueSnackbar(message, {variant: 'error'})
            state.accessToken = message;
        })
    }
})

export const authReducer = authSlice.reducer;
export const {
    setAccessToken
} = authSlice.actions;
