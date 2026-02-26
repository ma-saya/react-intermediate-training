import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchKeyword = params.search || "";
  const perPage = 5;

  const whereCondition = searchKeyword
    ? {
        OR: [
          { title: { contains: searchKeyword } },
          { content: { contains: searchKeyword } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: whereCondition,
    skip: (currentPage - 1) * perPage,
    take: perPage,
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true } },
    },
  });

  const totalPosts = await prisma.post.count({ where: whereCondition });
  const totalPages = Math.ceil(totalPosts / perPage);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">記事管理</h1>
          <Link href="/admin" className="text-sm text-gray-500 hover:underline">
            ダッシュボードに戻る
          </Link>
        </div>

        <form action="/admin/posts" method="GET" className="mb-6 flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={searchKeyword}
            placeholder="タイトルや本文で検索..."
            className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            検索
          </button>
          {searchKeyword && (
            <Link
              href="/admin/posts"
              className="px-4 py-2 text-blue-600 hover:underline"
            >
              クリア
            </Link>
          )}
        </form>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-3">タイトル</th>
                <th className="p-3">作成者</th>
                <th className="p-3">作成日時</th>
                <th className="p-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    記事が見つかりません
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">{post.title}</td>
                    <td className="p-3 text-sm text-gray-600">
                      {post.author.name}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button className="text-sm text-red-500 hover:underline">
                        削除
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            {currentPage > 1 ? (
              <Link
                href={`/admin/posts?page=${currentPage - 1}${searchKeyword ? `&search=${searchKeyword}` : ""}`}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                前へ
              </Link>
            ) : (
              <button
                disabled
                className="px-4 py-2 border rounded-md text-gray-300 cursor-not-allowed"
              >
                前へ
              </button>
            )}

            <span className="text-sm text-gray-600">
              {currentPage} / {totalPages} ページ
            </span>
            {currentPage < totalPages ? (
              <Link
                href={`/admin/posts?page=${currentPage + 1}${searchKeyword ? `&search=${searchKeyword}` : ""}`}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                次へ
              </Link>
            ) : (
              <button
                disabled
                className="px-4 py-2 border rounded-md text-gray-300 cursor-not-allowed"
              >
                次へ
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
