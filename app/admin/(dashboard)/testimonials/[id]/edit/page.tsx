"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import TestimonialForm from "@/app/components/admin/TestimonialForm";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  email?: string;
  content: string;
  rating: number;
  location?: string;
  status: string;
}

export default function EditTestimonialPage() {
  const params = useParams();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`/api/admin/testimonials/${params.id}`);
        if (!response.ok) {
          throw new Error("Testimonial not found");
        }
        const data = await response.json();
        setTestimonial(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load testimonial");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonial();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !testimonial) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || "Testimonial not found"}</p>
        <Link href="/admin/testimonials" className="text-primary hover:underline">
          Back to Testimonials
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Testimonials
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 font-heading">
          Edit Testimonial
        </h1>
        <p className="text-gray-600 mt-1">Update the testimonial</p>
      </div>

      <TestimonialForm initialData={testimonial} isEditing />
    </div>
  );
}
