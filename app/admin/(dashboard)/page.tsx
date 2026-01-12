import { prisma } from "@/app/lib/db";
import Link from "next/link";
import { FileText, Eye, FilePlus, Tags } from "lucide-react";

async function getStats() {
  const [totalPosts, publishedPosts, draftPosts, totalTags] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "published" } }),
    prisma.post.count({ where: { status: "draft" } }),
    prisma.tag.count(),
  ]);

  return { totalPosts, publishedPosts, draftPosts, totalTags };
}

async function getRecentPosts() {
  return prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
    },
  });
}

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const recentPosts = await getRecentPosts();

  const statCards = [
    {
      label: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Published",
      value: stats.publishedPosts,
      icon: Eye,
      color: "bg-green-500",
    },
    {
      label: "Drafts",
      value: stats.draftPosts,
      icon: FilePlus,
      color: "bg-yellow-500",
    },
    {
      label: "Tags",
      value: stats.totalTags,
      icon: Tags,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your blog admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
          </div>
          <div className="p-6">
            {recentPosts.length > 0 ? (
              <ul className="space-y-4">
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                    >
                      <span className="text-gray-900 font-medium truncate">
                        {post.title}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No posts yet. Create your first post!
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="bg-primary/10 p-2 rounded-lg">
                <FilePlus className="text-primary" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Create New Post</p>
                <p className="text-sm text-gray-500">
                  Write and publish a new blog post
                </p>
              </div>
            </Link>
            <Link
              href="/admin/posts"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="text-primary" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Posts</p>
                <p className="text-sm text-gray-500">
                  View and edit all your blog posts
                </p>
              </div>
            </Link>
            <Link
              href="/admin/tags"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="bg-primary/10 p-2 rounded-lg">
                <Tags className="text-primary" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Tags</p>
                <p className="text-sm text-gray-500">
                  Organize your content with tags
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
