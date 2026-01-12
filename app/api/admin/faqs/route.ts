import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";

// GET all FAQs
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const isPublished = searchParams.get("isPublished");

  const where: any = {};
  if (category && category !== "all") {
    where.category = category;
  }
  if (isPublished !== null && isPublished !== "all") {
    where.isPublished = isPublished === "true";
  }

  const faqs = await prisma.faq.findMany({
    where,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  // Get unique categories
  const categories = await prisma.faq.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  return NextResponse.json({
    faqs,
    categories: categories.map((c) => c.category),
  });
}

// POST create new FAQ
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { question, answer, category, order, isPublished } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        category: category || "General",
        order: order ?? 0,
        isPublished: isPublished ?? true,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
