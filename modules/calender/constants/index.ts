import { CalendarEventMap } from "../types";

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const sampleEvents: CalendarEventMap = {
  "2025-02-03": [
    {
      id: "0001",
      title: "Daily standup",
      thumbnail: "https://example.com/meeting.jpg",
      startTime: "09:15",
      endTime: "09:30",
      description: "Lên kế hoạch sprint mới cho team",
      color: "#4CAF50",
      createdAt: "2025-02-23T15:00:00Z",
      updatedAt: "2025-02-23T15:00:00Z",
    },
  ],
  "2025-02-04": [
    {
      id: "0001",
      title: "Daily standup",
      thumbnail: "https://example.com/meeting.jpg",
      startTime: "09:15",
      endTime: "09:30",
      description: "Lên kế hoạch sprint mới cho team",
      color: "#4CAF50",
      createdAt: "2025-02-23T15:00:00Z",
      updatedAt: "2025-02-23T15:00:00Z",
    },
  ],
  "2025-02-05": [
    {
      id: "0001",
      title: "Daily standup",
      thumbnail: "https://example.com/meeting.jpg",
      startTime: "09:15",
      endTime: "09:30",
      description: "Lên kế hoạch sprint mới cho team",
      color: "#4CAF50",
      createdAt: "2025-02-23T15:00:00Z",
      updatedAt: "2025-02-23T15:00:00Z",
    },
  ],
  "2025-02-24": [
    {
      id: "evt_1",
      title: "Họp Sprint Planning",
      thumbnail: "https://example.com/meeting.jpg",
      startTime: "09:00",
      endTime: "10:30",
      description: "Lên kế hoạch sprint mới cho team",
      color: "#4CAF50",
      createdAt: "2025-02-23T15:00:00Z",
      updatedAt: "2025-02-23T15:00:00Z",
    },
    {
      id: "evt_2",
      title: "Review Code",
      startTime: "11:00",
      endTime: "12:00",
      description: "Code review cho feature mới",
      color: "#2196F3",
      createdAt: "2025-02-23T15:30:00Z",
      updatedAt: "2025-02-23T15:30:00Z",
    },
  ],
  "2025-02-25": [
    {
      id: "evt_3",
      title: "Demo Product",
      thumbnail: "https://example.com/demo.jpg",
      startTime: "14:00",
      endTime: "15:00",
      description: "Demo sản phẩm cho khách hàng",
      color: "#FFC107",
      createdAt: "2025-02-24T08:00:00Z",
      updatedAt: "2025-02-24T08:00:00Z",
    },
  ],
};
