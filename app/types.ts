export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
  };

export type CalendarEvent = {
    _id?: string,
    title: string,
    priority: string,
    description?: string,
    start: Date,
    end: Date
    allDay?: boolean;
    resourceId?: string;
    tooltip?: string;
}

export type CalendarEventWithId = WithRequiredProperty<CalendarEvent, "_id">