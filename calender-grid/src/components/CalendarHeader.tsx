type CalendarHeaderProps = {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
};

export const CalendarHeader = ({ year, month, onPrev, onNext }: CalendarHeaderProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
      <button onClick={onPrev} style={btnStyle}>&lt; 前月</button>
      <h2 style={{ margin: 0 }}>{year}年 {month + 1}月</h2>
      <button onClick={onNext} style={btnStyle}>次月 &gt;</button>
    </div>
  );
};

const btnStyle = {
  padding: "8px 12px",
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  borderRadius: "4px",
}