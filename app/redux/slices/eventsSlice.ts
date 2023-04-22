import { createSlice } from "@reduxjs/toolkit";
import {
  addEventAction,
  deleteEventAction,
  moveEventAction,
  resizeEventAction,
  updateEventAction,
} from "../actions/eventActions";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { priority } from "@/app/constants/priority";

export type EventType = {
  id: string;
  start: Date;
  end: Date;
  title: string;
  priority: string;
  description: string;
  allDay?: boolean;
};

const initialState: EventType[] = [
  {
    id: uuidv4(),
    start: moment().toDate(),
    end: moment().add(1, "hours").toDate(),
    title: "test",
    priority: priority.LOW,
    description: "Testing description",
  },
];

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEventAction.fulfilled, (state, action) => {
        console.log("Testing: ", action.payload)
        state.push(action.payload);
      })
      .addCase(updateEventAction.fulfilled, (state, action) => {

        const index = state.findIndex(event => event.id === action.payload.id);

        if(index !== -1) {
          state[index] = action.payload
        }
      })
      .addCase(deleteEventAction.fulfilled, (state, action) => {
        const newEvents = state.filter(
          (event) => event.id !== action.payload.id
        );

        return newEvents;
      })
      .addCase(moveEventAction, (state, action) => {
        const { event, start, end, allDay } = action.payload;
        const existing = state.find((ev) => ev.id === event.id);
        if (existing) {
          existing.start = start;
          existing.end = end;
          existing.allDay = allDay;
        }
      })
      .addCase(resizeEventAction, (state, action) => {
        const { event, start, end } = action.payload;
        const existing = state.find((ev) => ev.id === event.id);
        if (existing) {
          existing.start = start;
          existing.end = end;
        }
      });
  },
});

export default eventsSlice.reducer;
