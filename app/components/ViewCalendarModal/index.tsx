import React from "react";
import classes from "./ViewCalendarModal.module.css";

type Props = {
  event: any;
  handleModalDisplay: () => () => void
};

const ViewCalendarModal = ({ event, handleModalDisplay }: Props) => {
const closeViewModal = () => {
    handleModalDisplay(false, null)()
}
  return (
    <div className={classes.container}>
      <div name="event-attr">
        <h3 name="label">Title: </h3>
        <h3>{event.title}</h3>
      </div>
      <div name="event-attr">
        <h3 name="label">priority: </h3>
        <h3>{event.priority}</h3>
      </div>
      <div name="event-attr">
        <h3 name="label">description: </h3>
        <h3>{event.description}</h3>
      </div>
      <div name="event-attr">
        <h3 name="label">Start Date: </h3>
        <h3>{event.start.toLocaleDateString()}</h3>
      </div>
      <div name="event-attr">
        <h3 name="label">End Date: </h3>
        <h3>{event.end.toLocaleDateString()}</h3>
      </div>

      <button onClick={closeViewModal}>cancel</button>
      <button onClick={handleModalDisplay(true, "form")}>update event</button>
    </div>
  );
};

export default ViewCalendarModal;
