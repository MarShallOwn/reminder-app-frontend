import { EventType } from "../types";
import { serviceProvider } from "./serviceProvider";

export const addEventAPI = (event: EventType) =>
  serviceProvider("/event", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

export const updateEventAPI = (event: EventType) =>
  serviceProvider("/event", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

export const deleteEventAPI = (id: string) =>
  serviceProvider(`/event/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const getAllEventsAPI = () =>
  serviceProvider("/event", {
    headers: {
      Accept: "application/json",
    },
  });
