import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { codeAuthorizationRequest } from "../thunks/authThunk"

export interface AuthState {
    loading: boolean
    access_token: string | null
}

const initialState: AuthState = {
    loading: false,
    access_token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string | null>) {
            state.access_token = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(codeAuthorizationRequest.pending, (state) => { state.loading = true; })
        builder.addCase(codeAuthorizationRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.access_token = action.payload;
        })
    }
})

export const authReducer = authSlice.reducer;
export const {
    setAccessToken
} = authSlice.actions;
