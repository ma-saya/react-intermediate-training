import { useState } from "react";

type HabitFormProps = {
  onAdd: (name: string) => void;
}

export const HabitForm = ({ onAdd }: HabitFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text) return;
    onAdd(text);
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しい習慣"
        style={{ padding: "8px", flex: 1 }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>追加</button>
    </form>
  );
};