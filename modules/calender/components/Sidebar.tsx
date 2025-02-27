import { Category, Event } from "@prisma/client";
import { CalenderOverview } from "./CalenderOverview";
import Image from "next/image";
import { TimeBreakdown } from "./TimeBreakdown";

type SidebarProps = {
  events: Event[];
  categories: Category[];
  year: string;
  month: string;
};

export const Sidebar = (props: SidebarProps) => {
  const { events, year, month, categories } = props;
  const eventsUpcoming = events.filter(
    (el) =>
      el.day === new Date().getDate() && el.month === new Date().getMonth()
  );
  return (
    <div className="w-[20%] bg-white rounded-2xl">
      <div className="flex items-center gap-4 p-4">
        <div className="w-12 h-12 rounded-full bg-neutral-200"></div>
        <div>
          <p className="font-medium text-base text-neutral-900">
            Wolfie Nguyen
          </p>
          <p className="text-xs text-neutral-700">Frontend Developer</p>
        </div>
      </div>

      <div className="p-4">
        <CalenderOverview month={month} year={year} />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <p className="font-medium text-sm text-neutral-900">Upcoming event</p>
        <div className="flex flex-col gap-3">
          {eventsUpcoming.map((event, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: event.category?.color ?? "#eee",
              }}
              className=" rounded-md px-3 py-2 "
            >
              <p className="flex gap-1 text-xs text-neutral-900">
                <span>{event.startAt}</span>
                <span>-</span>
                <span>{event.endAt}</span>
              </p>
              <p className="mt-1 font-medium">{event.title}</p>

              <div className="mt-2 flex">
                {event.participants.map((el, elIdx) => (
                  <div
                    key={el.user.id}
                    className={`w-7 h-7 overflow-hidden border-2 border-green-50 rounded-full bg-neutral-600 ${elIdx !== 0 ? '-ml-2' : ''}`}
                  >
                    <Image
                      width={28}
                      height={28}
                      src={el.user.avatar}
                      alt={el.user.username}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TimeBreakdown categories={categories} events={events} />
    </div>
  );
};
