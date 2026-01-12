import Link from "next/link";
import PostForm from "@/app/components/admin/PostForm";
import { ArrowLeft } from "lucide-react";

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Posts
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 font-heading">
          Create New Post
        </h1>
        <p className="text-gray-600 mt-1">Write and publish a new blog post</p>
      </div>

      <PostForm />
    </div>
  );
}
