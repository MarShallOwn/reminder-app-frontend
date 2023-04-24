import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addEventAction,
  deleteEventAction,
  getAllEventsAction,
  moveEventAction,
  resizeEventAction,
  updateEventAction,
} from "../actions/eventActions";
import { CalendarEventWithId } from "@/app/types";

export type EventActionsPayload = {eventId: string, start: Date, end: Date, allDay?: boolean}

const initialState: CalendarEventWithId[] = []

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEventAction.fulfilled, (state, action) => {

        state.push(action.payload as CalendarEventWithId);
      })
      .addCase(updateEventAction.fulfilled, (state, action: PayloadAction<CalendarEventWithId>) => {

        const index = state.findIndex(event => event._id === action.payload._id);

        if(index !== -1) {
          state[index] = action.payload
        }
      })
      .addCase(deleteEventAction.fulfilled, (state, action) => {
        const newEvents = state.filter(
          (event) => event._id !== action.payload?.id
        );

        return newEvents;
      })
      .addCase(getAllEventsAction.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(moveEventAction.fulfilled, (state, action) => {
        const { eventId, start, end, allDay } = action.payload as EventActionsPayload;
        const existing = state.find((event) => event._id === eventId);
        if (existing) {
          existing.start = start;
          existing.end = end;
          existing.allDay = allDay;
        }
      })
      .addCase(resizeEventAction.fulfilled, (state, action) => {
        const { eventId, start, end } = action.payload as EventActionsPayload;
        const existing = state.find((event) => event._id === eventId);
        if (existing) {
          existing.start = start;
          existing.end = end;
        }
      })
      .addDefaultCase((state, action) => {})
  },
});

export default eventsSlice.reducer;
