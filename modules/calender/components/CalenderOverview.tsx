import { monthNames } from "../constants";
import { formatDate, getMonthData, isToday } from "../helpers";

export const CalenderOverview = (props: any) => {
  const { month, year } = props;
  const date = new Date(Number(year), Number(month), 1);
  const days = getMonthData(date);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-900">
        {monthNames[date.getMonth()]} {date.getFullYear()}
      </p>
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div
            key={index}
            className="text-center text-sm py-1 font-medium text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`cursor-pointer font-medium rounded-full h-8 w-8 flex items-center justify-center ${
              isToday(day?.date) ? "bg-blue-800 text-white" : "bg-transparent"
            } ${day.isCurrentMonth ? " " : "text-neutral-400"} `}
          >
            <p className="text-xs text-center">{formatDate(day.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
