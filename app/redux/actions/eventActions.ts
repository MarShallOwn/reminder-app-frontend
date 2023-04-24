import {
  addEventAPI,
  deleteEventAPI,
  getAllEventsAPI,
  updateEventAPI,
} from "@/app/services";
import { CalendarEvent, CalendarEventWithId } from "@/app/types";
import { handleAPICatch } from "@/app/utils/handleCatchError";
import { createAsyncThunk } from "@reduxjs/toolkit";

type ActionsEventProps = {
  event: CalendarEventWithId;
  start: Date;
  end: Date;
  allDay?: boolean;
};

export const addEventAction = createAsyncThunk(
  "events/addEventAction",
  async (newEvent: CalendarEvent, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(handleAPICatch(err));
    }
  }
);

export const updateEventAction = createAsyncThunk(
  "events/updateEventAction",
  async (updatedEvent: CalendarEventWithId, thunkAPI) => {
    try {
      const response = await updateEventAPI(updatedEvent);

      if (response.status !== 204) {
        return thunkAPI.rejectWithValue(
          "Event Update Failed: Not the Expected Status Code!"
        );
      }
      return thunkAPI.fulfillWithValue(updatedEvent);
    } catch (err) {
      return thunkAPI.rejectWithValue(handleAPICatch(err));
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
      return thunkAPI.rejectWithValue(handleAPICatch(err));
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
      return thunkAPI.rejectWithValue(handleAPICatch(err));
    }
  }
);

export const moveEventAction = createAsyncThunk(
  "events/moveEventAction",
  async ({ event, start, end, allDay }: ActionsEventProps, thunkAPI) => {
    try {
      const updatedEvent = { ...event, start, end };

      const response = await updateEventAPI(updatedEvent);

      if (response.status !== 204) {
        return thunkAPI.rejectWithValue(
          "Event Update Failed: Not the Expected Status Code!"
        );
      }
      return thunkAPI.fulfillWithValue({
        eventId: event._id,
        start,
        end,
        allDay,
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(handleAPICatch(err));
    }
  }
);

export const resizeEventAction = createAsyncThunk(
  "events/resizeEventAction",
  async ({ event, start, end }: ActionsEventProps, thunkAPI) => {
    try {
      const updatedEvent = { ...event, start, end };

      const response = await updateEventAPI(updatedEvent);

      if (response.status !== 204) {
        return thunkAPI.rejectWithValue(
          "Event Update Failed: Not the Expected Status Code!"
        );
      }
      return thunkAPI.fulfillWithValue({ eventId: event._id, start, end });
    } catch (err) {
      return thunkAPI.rejectWithValue(handleAPICatch(err));
    }
  }
);
