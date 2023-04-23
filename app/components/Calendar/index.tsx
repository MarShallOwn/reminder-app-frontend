"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Calendar as BigCalendar,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import classes from "./Calendar.module.css";
import { Modal } from "@mui/material";
import CalendarModal from "../CalendarModal";
import useCalendar from "@/app/hooks/useCalendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import ViewCalendarModal from "../ViewCalendarModal";
import CalendarForm from "../CalendarForm";
import { AppDispatch, RootState } from "@/app/redux/store";
import {
  getAllEventsAction,
  moveEventAction,
  resizeEventAction,
} from "@/app/redux/actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import { isToday } from "@/app/utils/isToday";
import { PriorityColor, priorityColor } from "@/app/constants/priorityColor";

//moment.locale("ar-SA")

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

type CalendarEvent = {
  _id: string;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  priority: string;
  description?: string;
  resourceId?: string;
  tooltip?: string;
};

const Calendar = () => {
  const [modalDisplay, setModalDisplay] = useState<{
    open: boolean;
    type: string | null;
  }>({ open: false, type: null });
  const events = useSelector((state: RootState) => state.eventsReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllEventsAction())
  }, [])

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleSelectedEventId = (id: string | null) => setSelectedEventId(id);

  const handleModalDisplay = (display: boolean, type: string | null) => () => {
    setModalDisplay({ open: display, type });
  };

  const selectedEvent = useMemo(
    () => events.find((event) => event._id === selectedEventId),
    [selectedEventId, events]
  );

  useEffect(() => {
    if (modalDisplay.open === false) {
      handleSelectedEventId(null);
    }
  }, [modalDisplay.open]);

  const { newEvent, handleNewEvent, handleSelectSlot, handleAddEvent } =
    useCalendar({ selectedEvent, handleModalDisplay });

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

      dispatch(moveEventAction({ event, start, end, allDay }));
    },
    [dispatch]
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
      dispatch(resizeEventAction({ event, start, end }));
    },
    [dispatch]
  );

  const handleSelectEvent = (event: CalendarEvent) => {
    handleModalDisplay(true, "view")();
    handleSelectedEventId(event._id);
  };

  const calendarComp = {
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
  };

  const datePropHandler = (date: Date) => {
    if (isToday(date))
      return {
        className: `${classes.currentDate}`,
      };
    else if (date.getTime() - new Date().getTime() < 0) {
      return {
        className: `${classes.pastDate}`,
      };
    } else return {};
  };

  return (
    <div className={classes.calendarContainer}>
      <Modal open={modalDisplay.open}>
        <>
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
        </>
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
        views={[Views.MONTH, Views.AGENDA]}
        components={calendarComp}
        dayPropGetter={datePropHandler}
        popup
        resizable
      />
    </div>
  );
};

export default Calendar;
