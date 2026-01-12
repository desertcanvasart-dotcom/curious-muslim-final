"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function FaqsListPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [publishFilter, setPublishFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        ...(categoryFilter !== "all" && { category: categoryFilter }),
        ...(publishFilter !== "all" && { isPublished: publishFilter }),
      });

      const response = await fetch(`/api/admin/faqs?${params}`);
      const data = await response.json();
      setFaqs(data.faqs);
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [categoryFilter, publishFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    setDeleteId(id);
    try {
      const response = await fetch(`/api/admin/faqs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchFaqs();
      }
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">FAQs</h1>
          <p className="text-gray-600 mt-1">Manage your frequently asked questions</p>
        </div>
        <Link href="/admin/faqs/new">
          <Button leftIcon={<Plus size={18} />}>New FAQ</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Publish status filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={publishFilter}
              onChange={(e) => setPublishFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="true">Published</option>
              <option value="false">Unpublished</option>
            </select>
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : faqs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No FAQs found.{" "}
            <Link href="/admin/faqs/new" className="text-primary hover:underline">
              Create your first FAQ
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {faq.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        Order: {faq.order}
                      </span>
                      {faq.isPublished ? (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <Eye size={12} />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <EyeOff size={12} />
                          Unpublished
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/faqs/${faq.id}/edit`}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      disabled={deleteId === faq.id}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
