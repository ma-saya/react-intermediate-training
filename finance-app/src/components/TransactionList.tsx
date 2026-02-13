import type { Transaction } from "../types/finance";

type Props = {
  transactions: Transaction[];
  onDelete: (id: number) => void;
};

export const TransactionList = ({ transactions, onDelete }: Props) => {
  return (
    <section className="panel transaction-list">
      <div className="panel-heading">
        <h2>取引履歴</h2>
      </div>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} className="transaction-row">
            <span className="tx-date">{t.date}</span>
            <span className="tx-content">{t.content}</span>

            <span className={t.type === "income" ? "tx-amount income" : "tx-amount expense"}>
              {t.type === "income" ? "+" : "-"} {t.amount}円
            </span>
            <button onClick={() => onDelete(t.id)} className="delete-btn">
              削除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
