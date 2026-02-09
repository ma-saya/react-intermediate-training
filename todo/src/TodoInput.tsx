import { useState } from "react";

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if (!inputText) return;

    onAdd(inputText);
    setInputText("");
  };

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="タスクを入力"
        style={{ padding: "8px", flex: 1 }}
      />
      <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>
        追加
      </button>
    </div>
  );
};