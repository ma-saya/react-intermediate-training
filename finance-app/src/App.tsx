import { useState } from "react";
import { TransactionForm } from "./components/TransactionForm";
import type { Transaction } from "./types/finance";
import { TransactionList } from "./components/TransactionList";
import "./App.css";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAdd = (newData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      ...newData,
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return (
    <main className="app-shell">
      <section className="app-card">
        <header className="app-header">
          <h1>簡易家計簿</h1>
        </header>

        <div className="summary-grid">
          <div className="summary-item income">
            <h3 className="summary-label">収入</h3>
            <p className="summary-value">+{income}円</p>
          </div>
          <div className="summary-item expense">
            <h3 className="summary-label">支出</h3>
            <p className="summary-value">-{expense}円</p>
          </div>
          <div className="summary-item balance">
            <h3 className="summary-label">残高</h3>
            <p className="summary-value">{balance}円</p>
          </div>
        </div>

        <TransactionForm onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </section>
    </main>
  );
}
