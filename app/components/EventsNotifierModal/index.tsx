import React, { useMemo, useState } from 'react'
import { PriorityColor, priorityColor } from "@/app/constants/priorityColor";
import { CalendarEventWithId } from "@/app/types";
import NotificationBell from "../../assets/images/animated-notification.svg";
import classes from "./EventsNotifierModal.module.css"
import Image from 'next/image';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import expandMoreIcon from "../../assets/images/expand-more.svg"
import expandLessIcon from "../../assets/images/expand-less.svg"
import { useDispatch } from 'react-redux';
import { eventsNotificationActions } from '@/app/redux/slices/eventsNotificationSlice';

type EventsNotifierModalProps = {
    events: CalendarEventWithId[]
}

const EventsNotifierModal = ({ events }: EventsNotifierModalProps) => {

    const dispatch = useDispatch()

    const [selectedEvent, SetSelectedEvent] = useState<string | null>(null)

    const handleSelectedEvent = (eventId: string) => () => {
        SetSelectedEvent(prevState => prevState === eventId ? null : eventId)
    }

    const handleClose = () => {
        dispatch(eventsNotificationActions.closeNotification())
    }

    return (
        <div className={classes.modalContainer}>
            <div style={{ height: "fit-content" }} className={"dp02"}>
                <div className={classes.modalTitleContainer}>
                    <h2 >Notifications</h2>
                    <Image className={classes.notificationBell} style={{filter: "brightness(0) invert(1)"}} alt="notification-bell-icon" src={NotificationBell} />
                </div>

                {
                    events.map((event) => <div
                        onClick={handleSelectedEvent(event._id)}
                        className={`${selectedEvent === event._id ? classes.expandedCalendarEvent : classes.calendarEvent}`}
                    >
                        <div className={classes.titleContainer}>
                            <div className={classes.rightTitleContainer}>
                                <Tooltip title={event.priority} placement="top">
                                    <div className={classes.priorityCircle} style={{
                                        backgroundColor: priorityColor[event.priority as keyof PriorityColor],
                                    }}></div>
                                </Tooltip>
                                <h3>{event.title}</h3>
                            </div>
                            <Image alt="expand-more-less-icon" src={expandMoreIcon} className={`${selectedEvent === event._id && classes.expandLessIcon}`} />
                        </div>
                        <div className={classes.infoContainer}>
                            <p>Description: {event.description}</p>
                            <p>Event Start: {moment.utc(event?.end).local().format('DD-MM-YYYY')}</p>
                            <p>Event End: {moment(event?.start).local().format('DD-MM-YYYY')}</p>
                        </div>
                    </div>)
                }
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default EventsNotifierModal