import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = session.user as any;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">管理ダッシュボード</h1>
          <a href="/api/auth/signout" className="text-sm text-red-500 hover:underline">ログアウト</a>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border rounded-lg hover:bg-gray-50 cursor-pointer transition"></div>
            <h2 className="text-xl font-bold mb-2">新記事作成</h2>
            <p className="text-sm text-gray-500">新しいブログ記事を作成・公開します。</p>
          </div>
          <div className="p-6 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <h2 className="text-xl font-bold mb-2">記事一覧・編集</h2>
            <p className="text-sm text-gray-500">既存の記事を管理・編集します。</p>
          </div>
        </div>
      </div>
    </div>
  );
}