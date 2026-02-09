import type { Todo } from "./types/todo";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return <p style={{ color: "#888", textAlign: "center"}}>タスクはありません</p>
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
        key={todo.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #eee",
            background: todo.isDone ? "#f9f9f9" : "white",
          }}
        >
          <span
            onClick={() => onToggle(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.isDone ? "line-through" : "none",
                color: todo.isDone ? "#aaa" : "black",
                flex: 1,
            }}
          >
          {todo.isDone ? "✅ " : "⬜ "} {todo.text}
          </span>
          <button
          onClick={() => onDelete(todo.id)}
            style={{
              background: "#ff4d4d",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  )
}