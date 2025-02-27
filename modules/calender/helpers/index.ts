import { CalendarEvent, CalendarEventMap, DayCalender } from "../types";
import { generateTimeIntervals } from "./generateTime";

export { generateTimeIntervals };

export const getMonthData = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: DayCalender[] = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevMonthDays = firstDay.getDay();

  for (let i = prevMonthDays - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  const nextMonthDays = 42 - days.length; // 42 = 6 rows * 7 days
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
};

export const getEventsForDate = (
  events: CalendarEventMap,
  date: string
): CalendarEvent[] => {
  return events[date] || [];
};

export const formatDate = (date: Date) => {
  if (!date) return "";
  return date.getDate();
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
