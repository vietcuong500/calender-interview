"use client";

import { useState } from "react";
import { monthNames, weekDays } from "../constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getMonthData } from "../helpers";
import { DayItem } from "./DayItem";
import { useRouter } from "next/navigation";
import { AddEvent } from "./AddEvent";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/core/Popover";

type CalenderWrapperProps = {
  events: any;
  categories: any;
  users: any;
  year: string;
  month: string;
};

export const CalenderWrapper = (props: CalenderWrapperProps) => {
  const { events, categories, month, year, users } = props;

  const currentDate = new Date(Number(year), Number(month));

  const router = useRouter();

  const prevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    router.push(`/month/${newDate.getFullYear()}/${newDate.getMonth()}`);
  };

  const nextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    router.push(`/month/${newDate.getFullYear()}/${newDate.getMonth()}`);
  };

  const days = getMonthData(currentDate);

  const [isOpen, setIsOpen] = useState(false);
  const [dateEvent, setDateEvent] = useState<Date>(currentDate);
  const [referenceElement, setReferenceElement] = useState(null);

  const handleEventClick = (event: Date, e) => {
    setReferenceElement(e.currentTarget);
    setDateEvent(event);
    setIsOpen(true);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-2xl overflow-hidden">
      <div className="flex bg-slate-50 items-center justify-between px-4 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold ">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="bg-neutral-100 text-neutral-900 p-2 rounded-xl flex gap-2">
          <p className="px-6 py-2 font-medium text-sm bg-white rounded-md shadow-sm">
            Month
          </p>
          <p className="px-6 py-2 font-medium text-sm rounded-md">Week</p>
          <p className="px-6 py-2 font-medium text-sm rounded-md">Day</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 text-neutral-800 bg-white rounded-xl shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <button className="py-2 px-6 font-medium text-sm hover:bg-gray-100 bg-white rounded-xl shadow-lg">
            Today
          </button>
          <Button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 text-neutral-800 bg-white rounded-xl shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 px-4">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-900 py-2 bg-slate-100 rounded uppercase"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 calender-grid">
          {days.map((date, index) => (
            <DayItem
              key={index}
              date={date}
              events={events}
              onClick={(e) => handleEventClick(date.date, e)}
            />
          ))}
        </div>
      </div>

      {isOpen && dateEvent && (
        <Popover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          referenceElement={referenceElement}
          placement="right-start"
          className="rounded-3xl bg-white border border-neutral-50 p-4 max-w-96 z-10"
        >
          <AddEvent
            dateDefault={dateEvent}
            users={users.map((el) => ({
              value: el.id.toString(),
              avatar: el.avatar,
              username: el.username,
              email: el.email,
            }))}
            categories={categories.map((el) => ({
              value: el.id.toString(),
              label: el.title,
            }))}
            handleClose={() => {
              setIsOpen(false);
            }}
          />
        </Popover>
      )}
    </div>
  );
};
