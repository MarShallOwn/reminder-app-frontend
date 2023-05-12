import { serviceProvider } from "./serviceProvider";

export const addEventAPI = (event: CalendarEvent) =>
  serviceProvider("/event", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

export const updateEventAPI = (event: CalendarEventWithId) =>
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

export const loginAPI = ({email, password}: {email: string, password: string}) => serviceProvider("/auth/signin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
})

export const RefreshAccessTokenAPI = ({token}: {token: string}) => serviceProvider("/auth/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({token})
})