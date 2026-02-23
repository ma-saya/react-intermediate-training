"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password123") {
      localStorage.setItem("authToken", "secret-token-123");
      router.replace("/todo");
      return;
    }

    alert("メールアドレスまたはパスワードが正しくありません。");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">ログイン</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="メールアドレス"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="パスワード"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 font-bold text-white hover:bg-blue-700"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
