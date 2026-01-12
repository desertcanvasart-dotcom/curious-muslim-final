import Link from "next/link";
import FaqForm from "@/app/components/admin/FaqForm";
import { ArrowLeft } from "lucide-react";

export default function NewFaqPage() {
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
          Create New FAQ
        </h1>
        <p className="text-gray-600 mt-1">Add a new frequently asked question</p>
      </div>

      <FaqForm />
    </div>
  );
}
