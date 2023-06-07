import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifyEvent: true,
    eventsToBeNotified: []
}

const eventsNotificationSlice = createSlice({
    name: "eventsNotification",
    initialState: initialState,
    reducers: {
        notifyWithEvents(state, action) {
            state.notifyEvent = true;
            state.eventsToBeNotified = action.payload 
        },
        closeNotification(state) {
            state.notifyEvent = false
            state.eventsToBeNotified = []
        }
    }
})

export const eventsNotificationActions = eventsNotificationSlice.actions;

export default eventsNotificationSlice.reducer;