import { UserTable } from "../src/components/UserTable";
import { User } from "../src/types/user";

export default async function AdminDashboard() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#e0f2fe_0%,_#f8fafc_40%,_#f1f5f9_100%)] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ユーザーダッシュボード
        </h1>
        <UserTable initialUsers={users} />
      </div>
    </main>
  );
}
