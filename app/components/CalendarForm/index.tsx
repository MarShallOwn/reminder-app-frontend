"use client";
import React, { ChangeEvent, useMemo } from "react";
import classes from "./CalendarForm.module.css";
import { priority } from "@/app/constants/priority";
import { Button } from "@mui/material";
import moment from "moment"

type Props = {
  newEvent: any;
  handleNewEvent: (
    attr: string
  ) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleModalDisplay: (display: boolean, type: string | null) => () => void;
  handleAddEvent: () => void;
};

const CalendarForm = ({
  newEvent,
  handleNewEvent,
  handleModalDisplay,
  handleAddEvent,
}: Props) => {

  const endDate = useMemo(() => moment(newEvent.end).format("YYYY-MM-DDTHH:mm"), [newEvent.end])
  const minDate = useMemo(() => moment(newEvent.start).format("YYYY-MM-DDTHH:mm"), [newEvent.start])

  return (
    <div className={classes.container}>
      <h2>{newEvent?._id ? "Update" : "Create"} Event</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={newEvent.title}
          onChange={handleNewEvent("title")}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={newEvent.description}
          onChange={handleNewEvent("description")}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="end-date">End Date</label>
        <input
          id="end-date"
          value={endDate}
          onChange={handleNewEvent("end")}
          min={minDate}
          type="datetime-local"
        />
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={newEvent.priority}
          onChange={handleNewEvent("priority")}
        >
          <option value={priority.LOW}>Low</option>
          <option value={priority.MEDIUM}>Medium</option>
          <option value={priority.HIGH}>High</option>
          <option value={priority.URGENT}>Urgent</option>
        </select>
      </div>

      <div className={classes.controlBtnContainer}>
        <Button
          className={classes.controlBtn}
          onClick={handleModalDisplay(false, null)}
        >
          Cancel
        </Button>
        <Button className={classes.controlBtn} onClick={handleAddEvent}>
          {newEvent?._id ? "Update" : "Add"} Event
        </Button>
      </div>
    </div>
  );
};

export default CalendarForm;
