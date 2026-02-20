import type { TimerRecord } from "../types/timer";

type Props = {
  records: TimerRecord[];
  onClear: () => void;
};

export const HistoryList = ({ records, onClear }: Props) => {
  if (records.length === 0) return <p style={{textAlign: "center", color: "#888"}}>履歴はありません</p>
  
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h3>記録履歴 ({records.length}件)</h3>
      <button onClick={onClear} style={{ background: "transparent", border: "1px solid #ccc", padding: "5px 10px", cursor: "pointer" }}>
        履歴をクリア
      </button>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {records.map((record, index) => (
          <li
          key={record.id}
            style={{
            padding: "10px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "monospace",
              fontSize: "18px"
            }}
          >
            <span style={{ color: "#888" }}>Lap {index + 1}</span>
            <span>{record.timeText}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}