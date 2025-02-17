import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { playerReducer } from './playerReducer';
import { groupReducer } from './groupReducer';
import { matchReducer } from './matchReducer';
import { authReducer } from './authReducer';
import { groupMembersReducer } from './groupMembersReducer';
import { userReducer } from './userReducer';

const reducers = {
    players: playerReducer,
    groups: groupReducer,
    groupMembers: groupMembersReducer,
    match: matchReducer,
    auth: authReducer,
    users: userReducer
}

export const store = configureStore({
    reducer: reducers
});

export const setupStore = (preloadedState: RootState) => {
    return configureStore({
        reducer: reducers,
        preloadedState: preloadedState
    })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
