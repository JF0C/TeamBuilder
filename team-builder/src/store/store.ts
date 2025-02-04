import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { playerReducer } from './playerReducer';
import { groupReducer } from './groupReducer';
import { matchReducer } from './matchReducer';
import { authReducer } from './authReducer';

export const store = configureStore({
    reducer: {
        players: playerReducer,
        groups: groupReducer,
        match: matchReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
