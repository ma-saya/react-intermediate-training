import { formatTime } from "../types/timer";

type Props = {
  time: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onRecord: () => void;
};

export const TimerDisplay = ({ time, isRunning, onToggle, onReset, onRecord }: Props) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <h1 style={{ fontSize: "60px", fontFamily: "monospace", margin: "20px 0" }}>
        {formatTime(time)}
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={onToggle}
        style={{...btnStyle,
            background: isRunning ? "#dc3545" : "#28a745", color: "white",
          }}>
          {isRunning ? "ストップ" : "スタート"}
        </button>
        <button 
        onClick={onRecord}
        disabled={!isRunning}
        style={{...btnStyle, background: "#17a2b8", color: "white", opacity: isRunning ? 1 : 0.5}}
        >
          記録
        </button>
        <button 
          onClick={onReset}
        disabled={isRunning}
          style={{ ...btnStyle, background: "#6c757d", color: "white", opacity: !isRunning ? 1 : 0.5 }}>
          リセット
        </button>
      </div>
    </div>
  )
}
const btnStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};