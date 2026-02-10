import type { Habit } from './types/habit';

type HabitListProps = {
  habits: Habit[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onDelete: (id: number) => void;
};

export const HabitList = ({ habits, onIncrement, onDecrement, onDelete }: HabitListProps) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {habits.map((habit) => (
        <li
          key={habit.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #eee",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "bold", flex: 1 }}>
            {habit.name}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px", width: "30px", textAlign: "center" }}>
              {habit.count}
            </span>
            <button onClick={() => onIncrement(habit.id)} style={btnStyle}>+</button>
            <button onClick={() => onDecrement(habit.id)} style={btnStyle}>-</button>
            <button onClick={() => onDelete(habit.id)}
              style={{ ...btnStyle, backgroundColor: "#ff4d4d", color: "white" }}>
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const btnStyle = {
  padding: "5px 10px",
  cursor: "pointer",
  fontSize: "16px",
};