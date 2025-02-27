"use client";

import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon, PenLine, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Autocomplete from "@/components/core/Autocomplete";
import { generateTimeIntervals } from "../helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Combobox } from "@/components/core/Combobox";
import { AddGuests } from "./AddGuests";

type AddEventProps = {
  dateDefault: Date;
  categories: any;
  users: any;
  handleClose: () => void;
};

export const AddEvent = (props: AddEventProps) => {
  const { dateDefault, categories, handleClose, users } = props;
  const [date, setDate] = useState<Date>(dateDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(null);

  const [guests, setGuests] = useState<string[]>([]);

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [timeStart, setTimeStart] = useState("12:00AM");
  const [timeEnd, setTimeEnd] = useState("12:30AM");

  const optionsForTimeStart = generateTimeIntervals(
    "12:00AM",
    "9:00PM",
    60
  ).map((el) => ({ value: el, label: el }));

  const optionsForTimeEnd = generateTimeIntervals(timeStart, "12:00PM", 60).map(
    (el) => ({ value: el, label: el })
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date,
          timeStart,
          timeEnd,
          categoryId: category,
          userIds: guests,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Có lỗi xảy ra khi tạo người dùng"
        );
      }
      toast("Event saved");
      handleClose();
      router.refresh();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="mb-4 flex items-center justify-between">
          <input
            placeholder="Add title and time"
            value={title}
            id="title"
            className="h-10 text-xl font-medium text-neutral-900 outline-none w-full border-b border-transparent focus-within:border-neutral-500"
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="title" className="cursor-pointer">
            <PenLine className="text-neutral-600" />
          </label>
        </div>
        <div className="flex flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                size="lg"
                className={cn(
                  "w-full justify-start text-left font-normal px-3",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-row gap-3">
          <Autocomplete
            value={timeStart}
            onChange={setTimeStart}
            options={optionsForTimeStart}
            onSelect={(option) => setTimeStart(option.value)}
            allowClear={false}
          />
          <Autocomplete
            value={timeEnd}
            onChange={setTimeEnd}
            options={optionsForTimeEnd}
            onSelect={(option) => setTimeEnd(option.value)}
            allowClear={false}
          />
        </div>
        <div className="relative">
          <Image
            src="/google-meets.svg"
            height={40}
            width={40}
            alt="Goggle-Meets-Icon"
            className="absolute top-0 left-0"
          />
          <Input
            placeholder="Add Google Meet"
            className="w-full h-10 pl-10 border-none bg-secondary focus-within:bg-white"
          />
        </div>

        <Combobox
          options={categories}
          value={category}
          onChange={setCategory}
        />

        <div className="flex flex-col gap-3">
          <AddGuests
            placeholder="Add guests"
            selected={guests}
            onSelect={(value) => {
              setGuests([...guests, value]);
            }}
            options={users}
          />
          <div className="flex flex-col gap-1 max-h-40 overflow-y-scroll">
            {guests.map((el, idx) => {
              const detail = users.find((user) => user.value == el);
              return (
                <div key={idx} className="flex items-center px-4 py-2 text-sm">
                  <div className="w-7 h-7 rounded-full bg-neutral-700 mr-3 overflow-hidden">
                    <Image
                      alt={detail?.username}
                      src={detail?.avatar}
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{detail?.username}</p>
                    <p className="text-xs text-neutral-600">{detail?.email}</p>
                  </div>
                  <button
                    onClick={() =>
                      setGuests((guests) =>
                        guests.filter((el) => el != detail.value)
                      )
                    }
                    className="ml-auto text-neutral-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" disabled={isLoading} onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};
