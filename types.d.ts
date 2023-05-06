type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type CalendarEvent = {
  _id?: string;
  title: string;
  priority: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resourceId?: string;
  tooltip?: string;
};

type CalendarEventWithId = WithRequiredProperty<CalendarEvent, "_id">;

type HandleModalDisplayType = (
  display: boolean,
  type: "form" | "view" | null
) => () => void;

type PriorityColor = {
  low: string;
  medium: string;
  high: string;
  urgent: string;
};

type HandleNewEventType = (
  attr: keyof CalendarEvent
) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

type HandleSelectSlotType = (slotInfo: SlotInfo) => void;

type ThemesTypes = "dark" | "light";

type EventActionsPayload = {eventId: string, start: Date, end: Date, allDay?: boolean}