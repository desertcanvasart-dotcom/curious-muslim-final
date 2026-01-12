"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import FaqForm from "@/app/components/admin/FaqForm";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
}

export default function EditFaqPage() {
  const params = useParams();
  const [faq, setFaq] = useState<Faq | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await fetch(`/api/admin/faqs/${params.id}`);
        if (!response.ok) {
          throw new Error("FAQ not found");
        }
        const data = await response.json();
        setFaq(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load FAQ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaq();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !faq) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || "FAQ not found"}</p>
        <Link href="/admin/faqs" className="text-primary hover:underline">
          Back to FAQs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/faqs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={18} />
          Back to FAQs
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 font-heading">
          Edit FAQ
        </h1>
        <p className="text-gray-600 mt-1">Update the frequently asked question</p>
      </div>

      <FaqForm
        initialData={{
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          order: faq.order,
          isPublished: faq.isPublished,
        }}
        isEditing
      />
    </div>
  );
}
