export function generateTimeIntervals(
  start: string,
  end: string,
  step: number
): string[] {
  const times: string[] = [];
  const startDate = new Date(`1970-01-01T${convertTo24HourFormat(start)}:00`);
  const endDate = new Date(`1970-01-01T${convertTo24HourFormat(end)}:00`);

  const current = new Date(startDate);

  while (current <= endDate) {
    times.push(formatTime(current));
    current.setMinutes(current.getMinutes() + step);
  }

  return times;
}

function convertTo24HourFormat(time: string): string {
  const [timePart, period] = time.split(/(AM|PM)/);
  let [hours, minutes] = timePart.trim().split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
}

export function mergeDateAndTime(
  date: Date | string,
  timeStart: string,
  timeEnd: string
): { dateStart: Date; dateEnd: Date } {
  // Chuyển đổi date thành đối tượng Date nếu nó là string
  const baseDate = typeof date === 'string' ? new Date(date) : new Date(date);
  
  // Tạo các đối tượng Date mới để tránh thay đổi tham chiếu ban đầu
  const dateStart = new Date(baseDate);
  const dateEnd = new Date(baseDate);
  
  // Regex để tách giờ, phút và AM/PM từ chuỗi thời gian
  const timeRegex = /(\d{1,2}):(\d{2})(AM|PM)/i;
  
  // Xử lý thời gian bắt đầu
  const startMatches = timeStart.match(timeRegex);
  if (startMatches) {
    let hours = parseInt(startMatches[1], 10);
    const minutes = parseInt(startMatches[2], 10);
    const isPM = startMatches[3].toUpperCase() === 'PM';
    
    // Chuyển đổi sang định dạng 24 giờ
    if (isPM && hours < 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
    
    // Thiết lập giờ và phút cho dateStart
    dateStart.setHours(hours, minutes, 0, 0);
  }
  
  // Xử lý thời gian kết thúc
  const endMatches = timeEnd.match(timeRegex);
  if (endMatches) {
    let hours = parseInt(endMatches[1], 10);
    const minutes = parseInt(endMatches[2], 10);
    const isPM = endMatches[3].toUpperCase() === 'PM';
    
    // Chuyển đổi sang định dạng 24 giờ
    if (isPM && hours < 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
    
    // Thiết lập giờ và phút cho dateEnd
    dateEnd.setHours(hours, minutes, 0, 0);
    
    // Kiểm tra nếu thời gian kết thúc là ngày hôm sau
    if (dateEnd < dateStart) {
      dateEnd.setDate(dateEnd.getDate() + 1);
    }
  }
  
  return { dateStart, dateEnd };
}
