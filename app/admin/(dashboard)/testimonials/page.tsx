"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { Plus, Edit, Trash2, Check, X, Star } from "lucide-react";
import { cn, formatDate } from "@/app/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  email?: string;
  content: string;
  rating: number;
  location?: string;
  status: string;
  createdAt: string;
}

export default function TestimonialsListPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        ...(statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/testimonials?${params}`);
      const data = await response.json();
      setTestimonials(data.testimonials);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [statusFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setDeleteId(id);
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage customer testimonials</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button leftIcon={<Plus size={18} />}>New Testimonial</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No testimonials found.{" "}
            <Link href="/admin/testimonials/new" className="text-primary hover:underline">
              Create your first testimonial
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      {testimonial.location && (
                        <span className="text-sm text-gray-500">• {testimonial.location}</span>
                      )}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full font-medium",
                          testimonial.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : testimonial.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {testimonial.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{testimonial.content}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(testimonial.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {testimonial.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(testimonial.id, "approved")}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(testimonial.id, "rejected")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                    <Link
                      href={`/admin/testimonials/${testimonial.id}/edit`}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      disabled={deleteId === testimonial.id}
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
