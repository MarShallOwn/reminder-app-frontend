"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { priority } from "../constants/priority";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  addEventAction,
  updateEventAction,
} from "../redux/actions/eventActions";
import { CalendarEvent, CalendarEventWithId } from "../types";
import { HandleModalDisplayType } from "../components/Calendar";
import { SlotInfo } from "react-big-calendar";

type UseCalendarProps = {
  selectedEvent: CalendarEventWithId | undefined;
  handleModalDisplay: HandleModalDisplayType;
};

export type HandleNewEventType = (
  attr: keyof CalendarEvent
) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

export type HandleSelectSlotType = (slotInfo: SlotInfo) => void;

type UseCalendarReturn = {
  newEvent: CalendarEvent | CalendarEventWithId;
  handleNewEvent: HandleNewEventType;
  handleSelectSlot: HandleSelectSlotType;
  handleAddEvent: () => void;
};

const initalNewEvent: CalendarEvent = {
  title: "",
  description: "",
  start: new Date(),
  end: new Date(),
  priority: priority.LOW,
  notificationDate: new Date()
};

const useCalendar = ({
  selectedEvent,
  handleModalDisplay,
}: UseCalendarProps): UseCalendarReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const [newEvent, setNewEvent] = useState<CalendarEvent | CalendarEventWithId>(
    selectedEvent ? selectedEvent : initalNewEvent
  );

  useEffect(() => {
    setNewEvent(selectedEvent ? selectedEvent : initalNewEvent);
  }, [selectedEvent]);

  const handleNewEvent: HandleNewEventType = (attr) => (e) => {
    let value: string | Date = e.target.value;
    if (attr === "start" || attr === "end") {
      if (!e.target?.value) return;

      value = new Date(e.target?.value);
    }

    setNewEvent((prevState) => ({
      ...prevState,
      [attr]: value,
    }));
  };

  const handleSelectSlot: HandleSelectSlotType = (props) => {
    const currentDate = new Date();
    const conditionStartDate = new Date(props.start); // we did this just to allow the creation of event for todays date
    conditionStartDate.setDate(conditionStartDate.getDate() + 1);
    if(conditionStartDate.getTime() < currentDate.getTime()) return;
    const oneHour = 1 * 60 * 60 * 1000;
    const endDate = new Date(props.start.getTime() + oneHour);
    const notificationDate = new Date(props.start);
    notificationDate.setDate(notificationDate.getDate() - 1);
    setNewEvent((prevState) => ({
      ...prevState,
      start: props.start,
      end: endDate,
      notificationDate
    }));
    handleModalDisplay(true, "form")();
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;

    if (newEvent._id) {
      dispatch(updateEventAction(newEvent as CalendarEventWithId));
    } else {
      dispatch(addEventAction(newEvent));
    }
    setNewEvent(initalNewEvent);
    handleModalDisplay(false, null)();
  };

  return {
    newEvent,
    handleNewEvent: (attr) => (e) => handleNewEvent(attr)(e),
    handleSelectSlot: (props) => handleSelectSlot(props),
    handleAddEvent: () => handleAddEvent(),
  };
};

export default useCalendar;
