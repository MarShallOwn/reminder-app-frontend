import React, { useMemo, useState } from "react";
import classes from "./ViewCalendarModal.module.css";

import { useDispatch } from "react-redux";
import { deleteEventAction } from "@/app/redux/actions/eventActions";
import { AppDispatch } from "@/app/redux/store";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { Button } from "@mui/material";
import { PriorityColor, priorityColor } from "@/app/constants/priorityColor";
import { HandleModalDisplayType } from "../Calendar";
import { CalendarEventWithId } from "@/app/types";
import moment from "moment";

type ViewCalendarProps = {
  event: CalendarEventWithId;
  handleModalDisplay: HandleModalDisplayType;
};

const ViewCalendarModal = ({ event, handleModalDisplay }: ViewCalendarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const displayDeleteModal = (value: boolean) => () => {
    setOpenDeleteModal(value);
  };
  const closeViewModal = () => {
    handleModalDisplay(false, null)();
  };

  const deleteEvent = () => {
    // delete from database using API
    dispatch(deleteEventAction(event._id))
      .then(() => {
        displayDeleteModal(false)();
        closeViewModal();
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.log(err);

          const message = err.message;

          console.log(message);
        } else {
          console.log(`something went wrong: ${err}`);
        }
      });
  };

  const startDate = useMemo(() => moment.utc(event?.end).local().format('DD-MM-YYYY'), [event?.end])
  const endDate = useMemo(() => moment(event?.start).local().format('DD-MM-YYYY'), [event?.start])
  const notificationDate = useMemo(() => moment(event?.notificationDate).local().format('DD-MM-YYYY'), [event?.notificationDate])

  return (
    <div className={classes.container}>
      <ConfirmDeleteDialog
        title={event?.title}
        handleConfirmFunc={deleteEvent}
        openDeleteModal={openDeleteModal}
        displayDeleteModal={displayDeleteModal}
      />
      <div data-name="event-attr">
        <h3 data-name="label">Title: </h3>
        <h3>{event?.title}</h3>
      </div>
      <div data-name="event-attr">
        <h3 data-name="label">priority: </h3>
        <h3 style={{color: priorityColor[event?.priority as keyof PriorityColor]}}>{event?.priority}</h3>
      </div>
      <div data-name="event-attr">
        <h3 data-name="label">description: </h3>
        <h3>{event?.description}</h3>
      </div>
      <div data-name="event-attr">
        <h3 data-name="label">Start Date: </h3>
        <h3>{startDate}</h3>
      </div>
      <div data-name="event-attr">
        <h3 data-name="label">End Date: </h3>
        <h3>{endDate}</h3>
      </div>

      <div data-name="event-attr">
        <h3 data-name="label">Notification Date: </h3>
        <h3>{notificationDate}</h3>
      </div>

      <div className={classes.controlBtnContainer}>
        <Button className={classes.controlBtn} onClick={closeViewModal}>
          Close
        </Button>
        <Button
          className={classes.controlBtn}
          onClick={displayDeleteModal(true)}
        >
          Delete Event
        </Button>
        <Button
          className={classes.controlBtn}
          onClick={handleModalDisplay(true, "form")}
          autoFocus
        >
          Update Event
        </Button>
      </div>
    </div>
  );
};

export default ViewCalendarModal;
