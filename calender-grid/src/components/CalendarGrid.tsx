import type { CalendarDay } from "../types/calendar";

type CalenderGridProps = {
  days: CalendarDay[];
};

export const CalendarGrid = ({ days }: CalenderGridProps) => {
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div style={{ width: "100%", maxWidth: "400px", border: "1px solid #ddd" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {weekDays.map((day, index) => (
          <div key={index} style={cellStyle(index === 0 ? "red" : index === 6 ? "blue" : "black")}>
            {day}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {days.map((days, index) => (
          <div key={index} style={{ ...cellStyle("black"), color: days.isCurrentMonth ? "black" : "#ccc", backgroundColor: days.isCurrentMonth ? "white" : "#fafafa", }}>
            {days.date}
          </div>
        ))}
      </div>
    </div>
  )
}

const cellStyle = (color: string) => ({
  padding: "15px 0",
  textAlign: "center" as const,
  borderRight: "1px solid #eee",
  borderBottom: "1px solid #eee",
  color: color,
});
