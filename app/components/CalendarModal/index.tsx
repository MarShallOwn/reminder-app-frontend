import React, { ReactNode } from "react";
import classes from "./CalendarModal.module.css";

type Props = {
  children: ReactNode;
};

const CalendarModal = ({ children }: Props) => {
  return (
    <div className={classes.modalContainer}>
      <div className={"dp02"}>{children}</div>
    </div>
  );
};

export default CalendarModal;
