"use client";
import { formatDate, isToday } from "../helpers";
import { useState } from "react";
import moment from "moment";
import { X, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Popover } from "@/components/core/Popover";

type DayItemProps = {
  date: {
    date: Date;
    isCurrentMonth: boolean;
  };
  events: any;
  onClick: (e: any) => void;
};

export const DayItem = (props: DayItemProps) => {
  const { date, events, onClick } = props;
  const eventsByDate = events.filter(
    (el) => el.day == date.date.getDate() && el.month === date.date.getMonth()
  );

  const [isOpen, setIsOpen] = useState(false);
  const [eventActive, setEventActive] = useState<any>(null);
  const [referenceElement, setReferenceElement] = useState(null);

  const router = useRouter();

  const handleEventClick = (event, e) => {
    setReferenceElement(e.currentTarget);
    setEventActive(event);
    setIsOpen(true);
  };

  const handleDeleteEvent = async (event) => {
    try {
      const response = await fetch("/api/events", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: event.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tạo người dùng");
      }

      toast("Event deleted");
      setEventActive(null);
      setIsOpen(false);

      router.refresh();
    } finally {
      //
    }
  };

  console.log(eventActive);

  return (
    <div
      className={`
    aspect-square flex flex-col gap-3 p-2 text-sm calender-grid-item
    ${date.date ? "hover:bg-gray-100 cursor-pointer" : ""}
    ${!date.isCurrentMonth ? "" : ""}
  `}
      onClick={onClick}
    >
      <p className="text-end">
        <span
          className={`${
            isToday(date.date) ? "bg-blue-600 rounded-full p-2 text-white" : ""
          }`}
        >
          {formatDate(date.date)}
        </span>
      </p>
      <div className="flex flex-col gap-1 w-full">
        {eventsByDate.map((event, eventIdx) => (
          <div
            onClick={(e) => {
              handleEventClick(event, e);
              e.stopPropagation();
            }}
            key={eventIdx}
            className="py-1 px-2 rounded bg-blue-200"
            style={{
              backgroundColor: event.category?.color ?? "#eee",
            }}
          >
            <div>
              <p>{event.title}</p>
            </div>
          </div>
        ))}
      </div>

      {isOpen && eventActive && (
        <Popover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          referenceElement={referenceElement}
          placement="right-start"
          className="rounded-3xl bg-white border border-neutral-50 p-4 max-w-96 min-w-96 z-10"
          style={{
            backgroundColor: eventActive.category.color,
          }}
        >
          <div className="flex h-10 items-center justify-end gap-2">
            <button
              onClick={(e) => {
                handleDeleteEvent(eventActive);
                e.stopPropagation();
              }}
              className="rounded-full h-9 w-9 hover:bg-neutral-100 text-neutral-900 flex items-center justify-center"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={(e) => {
                setIsOpen(false);
                e.stopPropagation();
              }}
              className="rounded-full h-9 w-9 hover:bg-neutral-100 text-neutral-900 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl">{eventActive.title}</p>
            <div>
              <p>{moment(eventActive.date).format("LL")}</p>
              <p className="text-xs text-neutral-600 flex flex-row gap-1">
                <span>{eventActive.startAt}</span>
                <span>-</span>
                <span>{eventActive.endAt}</span>
              </p>
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
};
