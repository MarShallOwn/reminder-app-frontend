import { serviceProvider } from "./serviceProvider";

export const addEventAPI = (event) =>
  serviceProvider("/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event)
  });

export const updateEventAPI = (event) =>   serviceProvider("/event", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event)
  });

export const deleteEventAPI = (id: string) =>
  serviceProvider(`/event/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
