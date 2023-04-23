import { createSlice } from "@reduxjs/toolkit";
import {
  addEventAction,
  deleteEventAction,
  getAllEventsAction,
  moveEventAction,
  resizeEventAction,
  updateEventAction,
} from "../actions/eventActions";

export type EventType = {
  _id: string;
  start: Date;
  end: Date;
  title: string;
  priority: string;
  description: string;
  allDay?: boolean;
};

const initialState: EventType[] = [
];

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEventAction.fulfilled, (state, action) => {

        state.push(action.payload);
      })
      .addCase(updateEventAction.fulfilled, (state, action) => {

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
        const { eventId, start, end, allDay } = action.payload;
        const existing = state.find((event) => event._id === eventId);
        if (existing) {
          existing.start = start;
          existing.end = end;
          existing.allDay = allDay;
        }
      })
      .addCase(resizeEventAction.fulfilled, (state, action) => {
        const { eventId, start, end } = action.payload;
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
