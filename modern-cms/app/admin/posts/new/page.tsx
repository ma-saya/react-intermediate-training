import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) redirect("/api/auth/signin");

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content || !currentUser) return;

    await prisma.post.create({
      data: {
        title,
        content,
        authorId: currentUser.id,
        published: true,
      },
    });
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">新しい記事を作成</h1>
          <Link href="/admin" className="text-sm text-gray-500 hover:underline">
            ダッシュボードに戻る
          </Link>
        </div>
        <form action={createPost} className="space-y-6">
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
          type="text"
          name="title"
            required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Next.jsで本格CMSを作ってみた"
          />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              本文
            </label>
            <textarea
              name="content"
              required
              rows={10}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="ここに記事の本文を書きます..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition"
          >
            記事を公開
          </button>
        </form>
      </div>
    </div>
  )
}