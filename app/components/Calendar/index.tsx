"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Calendar as BigCalendar,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import classes from "./Calendar.module.css";
import { Modal } from "@mui/material";
import CalendarModal from "../CalendarModal";
import useCalendar from "@/app/hooks/useCalendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { priority } from "@/app/constants/priority";
import ViewCalendarModal from "../ViewCalendarModal";
import CalendarForm from "../CalendarForm";

//moment.locale("ar-SA")

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

type CalendarEvent = {
  id: string;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  priority: string;
  description?: string;
  resourceId?: string;
  tooltip?: string;
};

type PriorityColor = {
  low: string;
  medium: string;
  high: string;
  urgent: string;
};

const priorityColor: PriorityColor = {
  low: "#008000",
  medium: "#D1D100",
  high: "#FFB266",
  urgent: "#FF0000",
};

const Calendar = () => {
  const [modalDisplay, setModalDisplay] = useState<{
    open: boolean;
    type: string | null;
  }>({ open: false, type: null });
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: uuidv4(),
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "test",
      priority: priority.LOW,
      description: "Testing description",
    },
  ]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleSelectedEventId = (id: string | null) => setSelectedEventId(id);

  const handleModalDisplay = (display: boolean, type: string | null) => () => {
    setModalDisplay({ open: display, type });
  };

  const handleInsertEvent = (event: CalendarEvent) => {
    setEvents((prevState) => [...prevState, event]);
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(prevState => prevState.map((event) => {
      if(event.id !== updatedEvent.id) return event;

      return updatedEvent;
    }))
  }

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId),
    [selectedEventId, events]
  );

  useEffect(() => {
    if (modalDisplay.open === false) {
      console.log(selectedEvent)
      handleSelectedEventId(null);
    }
  }, [modalDisplay.open]);

  const { newEvent, handleNewEvent, handleSelectSlot, handleAddEvent } =
    useCalendar({ selectedEvent, handleModalDisplay, handleInsertEvent, handleUpdateEvent });

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      isAllDay: droppedOnAllDaySlot = false,
    }: {
      event: CalendarEvent;
      start: Date;
      end: Date;
    }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({
      event,
      start,
      end,
    }: {
      event: CalendarEvent;
      start: Date;
      end: Date;
    }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents]
  );

  const handleSelectEvent = (event: CalendarEvent) => {
    handleModalDisplay(true, "view")();
    handleSelectedEventId(event.id);
  };

  return (
    <div className={classes.calendarContainer}>
      <Modal open={modalDisplay.open}>
        <CalendarModal>
          {modalDisplay.type === "form" && (
            <CalendarForm
              newEvent={newEvent}
              handleNewEvent={handleNewEvent}
              handleAddEvent={handleAddEvent}
              handleModalDisplay={handleModalDisplay}
            />
          )}
          {modalDisplay.type === "view" && (
            <ViewCalendarModal
              handleModalDisplay={handleModalDisplay}
              event={selectedEvent}
            />
          )}
        </CalendarModal>
      </Modal>

      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="month"
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        views={[Views.MONTH]}
        components={{
          event: ({ event }: { event: CalendarEvent }) => {
            return (
              <span
                className={classes.calendarEvent}
                style={{
                  backgroundColor:
                    priorityColor[event.priority as keyof PriorityColor],
                }}
              >
                <em>{event.title}</em>
              </span>
            );
          },
        }}
        dayPropGetter={(date) =>
          date.getDate() === new Date().getDate()
            ? {
                className: `${classes.currentDate}`,
              }
            : {}
        }
        popup
        resizable
      />
    </div>
  );
};

export default Calendar;
