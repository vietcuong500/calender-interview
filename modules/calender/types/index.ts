export interface CalendarEvent {
  id: string;
  title: string;
  thumbnail?: string;
  startTime: string;
  endTime: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export type CalendarEventMap = {
  [date: string]: CalendarEvent[]; // date format: YYYY-MM-DD
};