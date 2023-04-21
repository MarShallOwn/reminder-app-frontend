"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { priority } from "../constants/priority";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addEventAction, updateEventAction } from "../redux/actions/eventActions";

type Props = {
  selectedEvent: any;
  handleModalDisplay: (display: boolean, type: string | null) => () => void;
};

type NewEvent = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  priority: string;
};

type ReturnType = {
  newEvent: NewEvent;
  handleNewEvent: (
    attr: string
  ) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSelectSlot: (props: any) => void;
  handleAddEvent: () => void;
};

const initalNewEvent = {
  id: "",
  title: "",
  description: "",
  start: new Date(),
  end: new Date(),
  priority: priority.LOW,
};

const useCalendar = ({
  selectedEvent,
  handleModalDisplay,
}: Props): ReturnType => {
  const dispatch = useDispatch<AppDispatch>()
  const [newEvent, setNewEvent] = useState<NewEvent>(
    selectedEvent ? selectedEvent : initalNewEvent
  );

  useEffect(() => {
    setNewEvent(selectedEvent ? selectedEvent : initalNewEvent)
  }, [selectedEvent])

  const handleNewEvent =
    (attr: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        attr === "start" || attr === "end"
          ? new Date(e.target?.value)
          : e.target?.value;
      setNewEvent((prevState) => ({
        ...prevState,
        [attr]: value,
      }));
    };

  const handleSelectSlot = (props: any) => {
    setNewEvent((prevState) => ({
      ...prevState,
      start: props.start,
      end: props.end,
    }));
    handleModalDisplay(true, "form")();
  };

  const handleAddEvent = () => {
    if(newEvent.id) {
      dispatch(updateEventAction(newEvent));
    }else {
      const newEventReturn = { ...newEvent, id: uuidv4() };
      dispatch(addEventAction(newEventReturn));
    }
    setNewEvent(initalNewEvent);
    handleModalDisplay(false, null)();
  };

  return {
    newEvent,
    handleNewEvent:
      (attr: string) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        handleNewEvent(attr)(e),
    handleSelectSlot: (props) => handleSelectSlot(props),
    handleAddEvent: () => handleAddEvent(),
  };
};

export default useCalendar;

/*
      const handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')

        if (title) {
            let newEvent = {} as CalendarEvent;
            newEvent.start = moment(start).toDate();
            newEvent.end = moment(end).toDate();
            newEvent.title = title;

            // Erroneous code
            // events.push(newEvent)
            // setEvents(events)
            setEvents([
              ...events,
              newEvent
            ])
        }
      }
*/
