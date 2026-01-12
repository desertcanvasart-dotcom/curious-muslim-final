import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET single published post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, status: "published" },
    include: {
      author: {
        select: { name: true },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Get recent posts for sidebar
  const recentPosts = await prisma.post.findMany({
    where: {
      status: "published",
      NOT: { slug },
    },
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: {
      slug: true,
      title: true,
    },
  });

  // Get all tags for sidebar
  const allTags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          post: {
            status: "published",
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({
    post: {
      ...post,
      author: post.author.name || "Curious Muslim Team",
      tags: post.tags.map((pt) => pt.tag.name),
    },
    recentPosts,
    allTags: allTags.map((t) => t.name),
  });
}
