import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import eventsReducer from "./slices/eventsSlice"
import eventsNotificationReducer from "./slices/eventsNotificationSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// configureStore is the new replacement for createStore which contains thunk
export const store = configureStore({
    /**
     * this will automatically tells configureStore to use combineReducers
     */
    reducer: {
        authReducer,
        eventsReducer,
        eventsNotificationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector