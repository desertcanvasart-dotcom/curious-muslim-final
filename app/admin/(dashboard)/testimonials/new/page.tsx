import Link from "next/link";
import TestimonialForm from "@/app/components/admin/TestimonialForm";
import { ArrowLeft } from "lucide-react";

export default function NewTestimonialPage() {
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
          Create New Testimonial
        </h1>
        <p className="text-gray-600 mt-1">Add a new customer testimonial</p>
      </div>

      <TestimonialForm />
    </div>
  );
}
