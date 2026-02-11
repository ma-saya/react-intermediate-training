import { useState } from "react";
import type { CalendarDay } from "./types/calendar";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarGrid } from "./components/CalendarGrid";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.unshift({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
      });
    }
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
      });
    }
    return days;
  };

  const handlePrev = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  const handleNext = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px" }}>
      <CalendarHeader
      year={year}
      month={month}
      onPrev={handlePrev}
      onNext={handleNext}
      />
      <CalendarGrid days={generateCalendarDays()}/>
    </div>
  )
}
