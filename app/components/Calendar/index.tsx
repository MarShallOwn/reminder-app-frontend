"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Calendar as BigCalendar,
  Components,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import classes from "./Calendar.module.css";
import { Modal } from "@mui/material";
import CalendarModal from "../CalendarModal";
import useCalendar from "@/app/hooks/useCalendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
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
import { CalendarEvent, CalendarEventWithId } from "@/app/types";

//moment.locale("ar-SA")

// AGENDA DISPLAY FIRST DAY IN MONTH TILL FIRST DAY IN LATER MONTH ****************

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

type ActionsEventProps = {
  event: CalendarEventWithId;
  start: Date;
  end: Date;
  isAllDay?: boolean;
};

export type HandleModalDisplayType = (
  display: boolean,
  type: "form" | "view" | null
) => () => void;

const Calendar = () => {
  const [modalDisplay, setModalDisplay] = useState<{
    open: boolean;
    type: string | null;
  }>({ open: false, type: null });
  const events = useSelector((state: RootState) => state.eventsReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllEventsAction());
  }, [dispatch]);

  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();

  const handleSelectedEventId = (id: string | undefined) =>
    setSelectedEventId(id);

  const handleModalDisplay: HandleModalDisplayType = (display, type) => () => {
    setModalDisplay({ open: display, type });
  };

  const selectedEvent: CalendarEventWithId | undefined = useMemo(
    () =>
      events.find((event) => event._id === selectedEventId) as
        | CalendarEventWithId
        | undefined,
    [selectedEventId, events]
  );

  useEffect(() => {
    if (modalDisplay.open === false) {
      handleSelectedEventId(undefined);
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
    }: ActionsEventProps) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      dispatch(moveEventAction({ event, start, end, allDay }));
    },
    [dispatch]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: ActionsEventProps) => {
      dispatch(resizeEventAction({ event, start, end }));
    },
    [dispatch]
  );

  const handleSelectEvent: (
    calendarEvent: object,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => void = (calendarEvent) => {
    handleModalDisplay(true, "view")();
    const calEvent = calendarEvent as CalendarEvent;
    handleSelectedEventId(calEvent._id);
  };

  const calendarComp = {
    agenda: {
      event: ({ event }: { event: CalendarEventWithId }) => (
        <span
          className={classes.agendaEvent}
          style={{
            backgroundColor:
              priorityColor[event.priority as keyof PriorityColor],
          }}
        >
          <em>{event.title}</em>
          <p>{event.description}</p>
        </span>
      ),
    },
    event: ({ event }: { event: CalendarEventWithId }) => (
      <span
        className={classes.calendarEvent}
        style={{
          backgroundColor: priorityColor[event.priority as keyof PriorityColor],
        }}
      >
        <em>{event.title}</em>
      </span>
    ),
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
            {modalDisplay.type === "view" && selectedEvent !== undefined && (
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
        onEventDrop={moveEvent as (args: EventInteractionArgs<object>) => void}
        onEventResize={
          resizeEvent as (args: EventInteractionArgs<object>) => void
        }
        views={[Views.MONTH, Views.AGENDA]}
        components={calendarComp as Components<object, object>}
        dayPropGetter={datePropHandler}
        popup
        resizable
      />
    </div>
  );
};

export default Calendar;
