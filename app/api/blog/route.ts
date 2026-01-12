import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET all published posts
export async function GET() {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // Get all unique tags
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
    posts: posts.map((post) => ({
      ...post,
      tags: post.tags.map((pt) => pt.tag.name),
    })),
    allTags: allTags.map((t) => t.name),
  });
}
