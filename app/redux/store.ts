import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"

// configureStore is the new replacement for createStore which contains thunk
export const store = configureStore({
    /**
     * this will automatically tells configureStore to use combineReducers
     */
    reducer: {
        authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;