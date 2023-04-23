import {
  addEventAPI,
  deleteEventAPI,
  getAllEventsAPI,
  updateEventAPI,
} from "@/app/services";
import { EventType } from "@/app/types";
import { handleAPICatch } from "@/app/utils/handleCatchError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addEventAction = createAsyncThunk(
  "events/addEventAction",
  async (newEvent: EventType, thunkAPI) => {
    try {
      const response = await addEventAPI(newEvent);

      if (response.status !== 201) {
        return thunkAPI.rejectWithValue(
          "Event Creation Failed: Not the Expected Status Code!"
        );
      }

      const result = await response.json();

      return thunkAPI.fulfillWithValue({
        ...newEvent,
        _id: result.response.data.eventId,
      });
    } catch (err) {
      thunkAPI.fulfillWithValue(handleAPICatch(err));
    }
  }
);

export const updateEventAction = createAsyncThunk(
  "events/updateEventAction",
  async (updatedEvent: EventType, thunkAPI) => {
    try {
      const response = await updateEventAPI(updatedEvent);

      if (response.status !== 204) {
        return thunkAPI.rejectWithValue(
          "Event Update Failed: Not the Expected Status Code!"
        );
      }
      return thunkAPI.fulfillWithValue(updatedEvent);
    } catch (err) {
      thunkAPI.fulfillWithValue(handleAPICatch(err));
    }
  }
);

export const deleteEventAction = createAsyncThunk(
  "events/deleteEventAction",
  async (eventId: string, thunkAPI) => {
    try {
      const response = await deleteEventAPI(eventId);

      if (response.status !== 204) {
        return thunkAPI.rejectWithValue(
          "Event Deletion Failed: Not the Expected Status Code!"
        );
      }

      return thunkAPI.fulfillWithValue({ id: eventId });
    } catch (err) {
      thunkAPI.fulfillWithValue(handleAPICatch(err));
    }
  }
);

export const getAllEventsAction = createAsyncThunk(
  "events/getAllEventsAction",
  async (_, thunkAPI) => {
    try {
      const response = await getAllEventsAPI();

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          "Event Retrieval Failed: Not the Expected Status Code!"
        );
      }

      const result = await response.json();

      return thunkAPI.fulfillWithValue(result.response.data.events);
    } catch (err) {
      return thunkAPI.fulfillWithValue(handleAPICatch(err));
    }
  }
);

export const moveEventAction = createAsyncThunk(
  "events/moveEventAction",
  async ({
    event,
    start,
    end,
    allDay,
  }: {
    event: any;
    start: Date;
    end: Date;
    allDay: boolean | undefined;
  }, thunkAPI) => {
    try {
      const updatedEvent = {...event, start, end}

      const response = await updateEventAPI(updatedEvent);

      if (response.status !== 204) {
        return thunkAPI.rejectWithValue(
          "Event Update Failed: Not the Expected Status Code!"
        );
      }
      return thunkAPI.fulfillWithValue({eventId: event._id, start, end, allDay});
    } catch (err) {
      thunkAPI.fulfillWithValue(handleAPICatch(err));
    }
  }
);

export const resizeEventAction = createAsyncThunk(
  "events/resizeEventAction",
  async ({ event, start, end }: {
    event: any;
    start: Date;
    end: Date;
  }, thunkAPI) => {
    try {
      const updatedEvent = {...event, start, end}

      const response = await updateEventAPI(updatedEvent);

      if (response.status !== 204) {
        return thunkAPI.rejectWithValue(
          "Event Update Failed: Not the Expected Status Code!"
        );
      }
      return thunkAPI.fulfillWithValue({eventId: event._id, start, end});
    } catch (err) {
      thunkAPI.fulfillWithValue(handleAPICatch(err));
    }
  }
);
