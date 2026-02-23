"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Todo = {
  id: number;
  text: string;
};

export default function TodoPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const hasAlerted = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      if (!hasAlerted.current) {
        alert("ログインが必要です");
        hasAlerted.current = true;
      }
      router.replace("/login");
      return;
    }

    setIsCheckingAuth(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.replace("/login");
  };

  const handleAdd = () => {
    if (!text.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: text.trim() }]);
    setText("");
  };

  if (isCheckingAuth) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">My Todo</h1>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
              ダッシュボードへ
            </Link>
            <button
              onClick={handleLogout}
              className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-600"
            >
              ログアウト
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded border p-2"
            placeholder="新しいタスクを追加"
          />
          <button onClick={handleAdd} className="rounded bg-green-500 px-4 py-2 text-white">
            追加
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="rounded border bg-gray-50 p-3">
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
