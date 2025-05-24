import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationDefaults } from "../constants/PaginationDefaults";
import { RequestState } from "../data/RequestState";
import { PagedResult } from "../dtos/base/PagedResult";
import { MatchDto } from "../dtos/matches/MatchDto";
import { MatchesRequestDto } from "../dtos/matches/MatchesRequestDto";
import { loadResumableMatchesRequest } from "../thunks/matchThunk";

export interface MatchResumeState {
    requestState: RequestState
    queryFilter: MatchesRequestDto
    matches: PagedResult<MatchDto> | null
}

export const initialMatchResumeState: MatchResumeState = {
    requestState: 'required',
    matches: null,
    queryFilter: {
        page: PaginationDefaults.Page,
        count: PaginationDefaults.Count
    }
}

export const matchResumeSlice = createSlice({
    name: 'match-resume',
    initialState: initialMatchResumeState,
    reducers: {
        reloadResumableMatches(state, action: PayloadAction<{page?: number}>) {
            if (action.payload.page) {
                state.queryFilter.page = action.payload.page
            }
            state.matches = null
            state.requestState = 'required'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadResumableMatchesRequest.pending, (state) => {
            state.requestState = 'loading'
        })
        builder.addCase(loadResumableMatchesRequest.fulfilled, (state, action) => {
            state.requestState = 'ok'
            state.matches = action.payload
        })
        builder.addCase(loadResumableMatchesRequest.rejected, (state) => {
            state.requestState = 'error'
        })
    }
})

export const matchResumeReducer = matchResumeSlice.reducer;
export const {
    reloadResumableMatches
} = matchResumeSlice.actions;
