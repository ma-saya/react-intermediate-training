"use client";

import { useState } from "react";
import { User } from "../types/user";

type Props = {
  initialUsers: User[];
};

export const UserTable = ({ initialUsers }: Props) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDelete = (id: number) => {
    if (confirm("このユーザーを削除しますか？")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.55)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                ID
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                名前
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                メールアドレス
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-500">{user.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
