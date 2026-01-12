import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET approved testimonials (public)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        content: true,
        rating: true,
        location: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST submit new testimonial (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, content, rating, location } = body;

    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and testimonial content are required" },
        { status: 400 }
      );
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        email: email || null,
        content,
        rating: rating ?? 5,
        location: location || null,
        status: "pending", // All public submissions start as pending
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your testimonial! It will be reviewed and published soon.",
        id: testimonial.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
