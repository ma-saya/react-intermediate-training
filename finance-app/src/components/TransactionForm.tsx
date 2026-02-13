import { useState } from "react";
import type { Transaction } from "../types/finance";

type Props = {
  onAdd: (transaction: Omit<Transaction, "id">) => void;
};

export const TransactionForm = ({ onAdd }: Props) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || amount === 0) return;
    onAdd({ date, content, amount, type });

    setContent("");
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="panel transaction-form">
      <div className="panel-heading">
        <h2>取引を追加</h2>
      </div>

      <div className="type-toggle" role="radiogroup" aria-label="取引タイプ">
        <label className={type === "income" ? "active income" : "income"}>
          <input
            type="radio"
            checked={type === "income"}
            onChange={() => setType("income")}
          />
          収入
        </label>
        <label className={type === "expense" ? "active expense" : "expense"}>
          <input
            type="radio"
            checked={type === "expense"}
            onChange={() => setType("expense")}
          />
          支出
        </label>
      </div>

      <div className="form-grid">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input
          type="text"
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="金額"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <button type="submit" className="primary-btn">
        追加
      </button>
    </form>
  );
};
