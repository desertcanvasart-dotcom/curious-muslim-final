"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { blogPosts, getAllTags } from "@/app/lib/constants/blog-posts";
import { formatDate, getReadingTime } from "@/app/lib/utils";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const allTags = getAllTags();

  const scrollFilter = useCallback((direction: "left" | "right") => {
    if (filterRef.current) {
      const scrollAmount = 200;
      filterRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // Separate featured post (first/newest) from the rest
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

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
              <span>Our Blog</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Stories, Tips & Inspiration
            </h1>

            <p className="text-xl text-white leading-relaxed mb-8">
              Insights for Muslim parents on raising curious, confident children
              who love their faith.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
              />
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

      {/* Tags Filter */}
      <section className="py-6 border-b border-gray-200 bg-white sticky top-[73px] z-40">
        <div className="container-custom">
          <div className="flex items-center gap-2">
            {/* Left Arrow */}
            <button
              onClick={() => scrollFilter("left")}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-[#3D5A6C] hover:text-white flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Filter Tags */}
            <div
              ref={filterRef}
              className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none flex-1"
            >
              <span className="text-sm font-medium text-gray-500 flex-shrink-0">
                <Tag className="w-4 h-4 inline mr-1" />
                Filter:
              </span>
              <motion.button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  !selectedTag
                    ? "bg-[#3D5A6C] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                All Posts
              </motion.button>
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                    selectedTag === tag
                      ? "bg-[#3D5A6C] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollFilter("right")}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-[#3D5A6C] hover:text-white flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredPosts.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="text-[#3D5A6C] font-semibold hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link
                    href={`/routes/blog/${featuredPost.slug}`}
                    className="group block bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                        {featuredPost.featuredImage ? (
                          <Image
                            src={featuredPost.featuredImage}
                            alt={featuredPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] flex items-center justify-center">
                            <span className="text-8xl opacity-50">📖</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#F2C94C] text-[#3D5A6C] text-sm font-semibold rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredPost.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-[#F5EFD4] text-[#5C7A4B] text-xs font-medium rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#3D5A6C] mb-4 group-hover:text-[#5C7A4B] transition-colors">
                          {featuredPost.title}
                        </h2>

                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(featuredPost.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {getReadingTime(featuredPost.content)} min read
                            </span>
                          </div>

                          <span className="flex items-center gap-2 text-[#3D5A6C] font-semibold group-hover:gap-3 transition-all">
                            Read Article
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Posts Grid */}
              {remainingPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/routes/blog/${post.slug}`}
                        className="group block bg-white rounded-xl shadow-card overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all duration-300 h-full"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#3D5A6C]/20 to-[#5C7A4B]/20 flex items-center justify-center">
                              <span className="text-5xl opacity-50">📖</span>
                            </div>
                          )}
                          {post.tags[0] && (
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 bg-[#F2C94C] text-[#3D5A6C] text-xs font-semibold rounded-full">
                                {post.tags[0]}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getReadingTime(post.content)} min
                            </span>
                          </div>

                          <h3 className="text-lg font-heading font-bold text-[#3D5A6C] mb-2 line-clamp-2 group-hover:text-[#5C7A4B] transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>

                          <span className="text-[#3D5A6C] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Get New Articles in Your Inbox
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our newsletter for parenting tips, Islamic education insights,
              and updates on Curious Muslim.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
              />
              <button
                type="submit"
                className="bg-[#F2C94C] hover:bg-[#E0B63A] text-[#3D5A6C] font-semibold px-8 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm text-white/60 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
