import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TeamConfigurationState {
    teamsCount: number
    teamNames: string[]
}

const initialState: TeamConfigurationState = {
    teamsCount: 2,
    teamNames: ['', '']
}

export const teamConfigurationSlice = createSlice({
    name: 'team-configuration',
    initialState: initialState,
    reducers: {
        setTeamCount(state, action: PayloadAction<number>) {
            state.teamsCount = action.payload
            while (state.teamNames.length < state.teamsCount) {
                state.teamNames.push('')
            }
            if (state.teamNames.length > state.teamsCount) {
                state.teamNames = state.teamNames.slice(0, state.teamsCount)
            }
        },
        setTeamName(state, action: PayloadAction<{index: number, name: string}>) {
            state.teamNames[action.payload.index] = action.payload.name;
        }
    }
})

export const teamConfigurationReducer = teamConfigurationSlice.reducer;
export const {
    setTeamCount,
    setTeamName
} = teamConfigurationSlice.actions;
