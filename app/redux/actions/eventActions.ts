import { addEventAPI, deleteEventAPI, updateEventAPI } from "@/app/services";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const addEventAction = createAsyncThunk(
  "events/addEventAction",
  async (newEvent, thunkAPI) => {
    try {
      const response = await addEventAPI(newEvent);

      console.log(response);
      return thunkAPI.fulfillWithValue(newEvent);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);

        const message = err.message;

        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue(`Unexpected Error: ${err}`);
      }
    }
  }
);

export const updateEventAction = createAsyncThunk(
  "events/updateEventAction",
  async (updatedEvent, thunkAPI) => {
    try {
      const response = await updateEventAPI(updatedEvent);
      console.log(response);
      return thunkAPI.fulfillWithValue(updatedEvent);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);

        const message = err.message;

        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue(`Unexpected Error: ${err}`);
      }
    }
  }
);

export const deleteEventAction = createAsyncThunk(
  "events/deleteEventAction",
  async (eventId: string, thunkAPI) => {
    try {
      const response = await deleteEventAPI(eventId);

      return thunkAPI.fulfillWithValue({id: eventId});
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);

        const message = err.message;

        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue(`Unexpected Error: ${err}`);
      }
    }
  }
);

export const moveEventAction = createAction(
  "events/moveEventAction",
  ({ event, start, end, allDay }: {event: any, start: Date, end: Date, allDay: boolean | undefined}) => {
    return {
      payload: {
        event,
        start,
        end,
        allDay,
      },
    };
  }
);

export const resizeEventAction = createAction(
    "events/resizeEventAction",
    ({ event, start, end }) => {
      return {
        payload: {
          event,
          start,
          end,
        },
      };
    }
  );