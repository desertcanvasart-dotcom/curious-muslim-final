"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  Sparkles,
  Clock,
  ShoppingCart,
  ChevronRight,
  Users,
  Heart,
  Award,
  Grid3X3,
  BookMarked,
} from "lucide-react";
import { books, Book } from "@/app/lib/constants/books";
import BookFlip from "@/app/components/ui/BookFlip";

type ViewMode = "book" | "grid";

const statusLabels: Record<Book["releaseStatus"], string> = {
  available: "Available Now",
  "pre-order": "Pre-Order",
  "coming-soon": "Coming Soon",
};

const statusColors: Record<Book["releaseStatus"], string> = {
  available: "bg-green-500",
  "pre-order": "bg-[#F2C94C] text-[#3D5A6C]",
  "coming-soon": "bg-[#3D5A6C]",
};

export default function BooksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("book");

  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden min-h-[550px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20" />
        </div>

        <div className="container-custom py-16 relative z-10 w-full">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              <span>A Growing Series</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Stories of the Prophets
            </h1>

            <p className="text-xl text-white leading-relaxed mb-8">
              A beautifully illustrated book series bringing the lives of the
              Prophets to Muslim children ages 8-12. Each book is a journey of
              faith, courage, and timeless lessons.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-[#F2C94C]" />
                <span>Ages 8-12</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-[#F2C94C]" />
                <span>Beautifully Illustrated</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-[#F2C94C]" />
                <span>Scholarly Reviewed</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#FDFBF7"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* View Toggle */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-500">View as:</span>
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setViewMode("book")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  viewMode === "book"
                    ? "bg-[#3D5A6C] text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <BookMarked className="w-4 h-4" />
                Interactive Book
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#3D5A6C] text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Grid View
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Book Flip View */}
      {viewMode === "book" && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BookFlip books={books} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/routes/book/${book.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group h-full flex flex-col">
                      {/* Book Cover */}
                      <div
                        className="relative aspect-[4/3] flex items-center justify-center p-8"
                        style={{
                          background: `linear-gradient(135deg, ${book.coverColor}20, ${book.coverColor}40)`,
                        }}
                      >
                        {/* Status Badge */}
                        <div
                          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            statusColors[book.releaseStatus]
                          }`}
                        >
                          {statusLabels[book.releaseStatus]}
                        </div>

                        {/* Book Cover Visual */}
                        <div className="relative">
                          <div
                            className="w-32 h-44 rounded-lg shadow-xl flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-300"
                            style={{ backgroundColor: book.coverColor }}
                          >
                            <span className="text-5xl mb-2">
                              {book.coverEmoji}
                            </span>
                            <p className="text-white/80 text-xs text-center px-2">
                              {book.arabicName}
                            </p>
                          </div>
                          {/* Book Shadow */}
                          <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full blur-lg opacity-30"
                            style={{ backgroundColor: book.coverColor }}
                          />
                        </div>
                      </div>

                      {/* Book Info */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-[#5C7A4B] font-medium">
                            {book.prophet}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-xl text-[#3D5A6C] mb-2 group-hover:text-[#5C7A4B] transition-colors">
                          {book.title}: {book.subtitle}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                          {book.description}
                        </p>

                        {/* Rating & Reviews */}
                        {book.reviewCount > 0 && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(book.rating)
                                      ? "fill-[#F2C94C] text-[#F2C94C]"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {book.rating} ({book.reviewCount} reviews)
                            </span>
                          </div>
                        )}

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            {book.releaseStatus === "coming-soon" ? (
                              <div className="flex items-center gap-2 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{book.releaseDate}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-[#3D5A6C]">
                                  ${book.price}
                                </span>
                                {book.originalPrice > book.price && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ${book.originalPrice}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-[#3D5A6C] font-semibold group-hover:text-[#5C7A4B]">
                            <span className="text-sm">View Details</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Series Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-4">
              Why Parents Love This Series
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Crafted with love to inspire the next generation of Muslims
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Beautiful Illustrations",
                description:
                  "Hand-painted artwork brings each story to vibrant life",
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Scholarly Reviewed",
                description:
                  "Content verified for accuracy by Islamic scholars",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Relatable Characters",
                description:
                  "Four young guides who ask the questions kids really have",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Family Bonding",
                description:
                  "Discussion questions bring families together",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-[#F2C94C] rounded-2xl flex items-center justify-center text-[#3D5A6C] mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-bold text-[#3D5A6C] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-r from-[#3D5A6C] to-[#5C7A4B] text-white">
        <div className="container-custom">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-10 h-10 text-[#F2C94C] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Be the First to Know
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join our newsletter to get updates on new book releases, exclusive
              previews, and special pre-order offers.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-8 py-4 rounded-full font-semibold hover:bg-[#E0B63A] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Join the Newsletter
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
