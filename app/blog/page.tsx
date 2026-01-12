"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Heart,
  Sparkles,
  Quote,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { formatDate, getReadingTime } from "@/app/lib/utils";
import { useHeaderStore } from "@/app/lib/stores/header-store";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  publishedAt: string;
  tags: string[];
}

// Parent-friendly filter names
const filterLabels: Record<string, string> = {
  "Parenting": "For Parents",
  "Seerah": "Prophet's Story",
  "Islamic Education": "Teaching Islam",
  "Tips": "Practical Tips",
  "Book Preview": "From the Book",
  "Characters": "Meet the Characters",
  "Ramadan": "Ramadan Resources",
  "Book Recommendations": "Reading Lists",
  "Faith": "Faith at Home",
  "Behind the Scenes": "From Our Experience",
};

// Curated "Start Here" articles for first-time parents
const startHereArticles = [
  "why-seerah-matters-for-kids",
  "5-ways-to-make-islamic-learning-fun",
  "how-to-answer-tough-questions-about-islam",
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { isVisible: isHeaderVisible } = useHeaderStore();
  const filterRef = useRef<HTMLDivElement>(null);

  // Fetch posts from API
  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setAllTags(data.allTags);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

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
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Separate featured post (first/newest) from the rest
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden min-h-[650px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
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
              <span>Guidance for Parents</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Thoughtful Guidance for Raising Curious Muslim Children
            </h1>

            <p className="text-lg text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              Gentle, practical articles written by Muslim parents—for Muslim parents.
            </p>

            {/* Primary CTA */}
            <a
              href="#start-here"
              className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start with Our Most Loved Articles</span>
            </a>

            {/* Search Bar - Secondary */}
            <div className="max-w-sm mx-auto relative mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/90 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2C94C] focus:bg-white"
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

      {/* Filter Bar */}
      <section
        className={`bg-white shadow-sm sticky z-40 transition-all duration-300 ${
          isHeaderVisible ? "top-[81px]" : "top-0"
        }`}
      >
        <div className="container-custom py-4">
          <p className="text-xs text-gray-400 text-center mb-3">Browse by topic or parenting moment</p>
          <div className="flex items-center gap-3">
            {/* Left Arrow */}
            <button
              onClick={() => scrollFilter("left")}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-50 hover:bg-[#3D5A6C] hover:text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable Filter Tags */}
            <div
              ref={filterRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 py-1"
            >
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                  !selectedTag
                    ? "bg-[#3D5A6C] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                    selectedTag === tag
                      ? "bg-[#3D5A6C] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filterLabels[tag] || tag}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollFilter("right")}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-50 hover:bg-[#3D5A6C] hover:text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Start Here Section */}
      <section id="start-here" className="section-padding bg-[#F5EFD4]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-[#5C7A4B] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4" />
              <span>New Here? Start Here</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#3D5A6C] mb-4">
              Essential Reads for Muslim Parents
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you're just beginning your journey of teaching Islam at home, these
              foundational articles will give you the confidence and tools you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {startHereArticles.map((slug) => {
              const post = posts.find((p) => p.slug === slug);
              if (!post) return null;
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-[#F2C94C] rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-[#3D5A6C]" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-[#3D5A6C] mb-2 group-hover:text-[#5C7A4B] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-[#3D5A6C] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Reassurance line */}
          <p className="text-center text-sm text-gray-500 mb-6">
            All articles are age-appropriate and designed to support real conversations at home.
          </p>

          <div className="text-center">
            <Link
              href="/blog?tag=Parenting"
              className="inline-flex items-center gap-2 text-[#3D5A6C] font-semibold hover:text-[#5C7A4B] transition-colors"
            >
              <span>Explore All Parent Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-[#FDFBF7]">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#3D5A6C]">
              {selectedTag ? `Articles about ${filterLabels[selectedTag] || selectedTag}` : "Latest Guidance & Inspiration"}
            </h2>
            <p className="text-gray-600 mt-2">
              Thoughtful reads to support your family's journey
            </p>
          </div>

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
                  {/* Orientation line */}
                  <p className="text-sm text-gray-500 text-center mb-4">Editor's Pick for Parents</p>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group block bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-48 md:h-full min-h-[240px] overflow-hidden">
                        {featuredPost.featuredImage ? (
                          <Image
                            src={featuredPost.featuredImage}
                            alt={featuredPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] flex items-center justify-center">
                            <span className="text-6xl opacity-50">📖</span>
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

              {/* Visual Rhythm Break - Quote Section */}
              {remainingPosts.length > 0 && !selectedTag && !searchQuery && (
                <motion.div
                  className="my-10 py-8 px-6 bg-gradient-to-r from-[#F5EFD4] to-white rounded-2xl text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">A Gentle Reminder</p>
                  <Quote className="w-8 h-8 text-[#F2C94C] mx-auto mb-3 opacity-60" />
                  <blockquote className="text-lg md:text-xl font-heading text-[#3D5A6C] italic max-w-2xl mx-auto mb-3">
                    "The best of you are those who learn the Quran and teach it."
                  </blockquote>
                  <p className="text-gray-500 text-sm">
                    — Prophet Muhammad ﷺ (Sahih al-Bukhari)
                  </p>
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
                      className="flex"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col bg-white rounded-xl shadow-card overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all duration-300 w-full"
                      >
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden flex-shrink-0">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#3D5A6C]/20 to-[#5C7A4B]/20 flex items-center justify-center">
                              <span className="text-4xl opacity-50">📖</span>
                            </div>
                          )}
                          {post.tags[0] && (
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 bg-[#F2C94C] text-[#3D5A6C] text-xs font-semibold rounded-full">
                                {filterLabels[post.tags[0]] || post.tags[0]}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getReadingTime(post.content)} min
                            </span>
                          </div>

                          <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mb-2 line-clamp-2 group-hover:text-[#5C7A4B] transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                            {post.excerpt}
                          </p>

                          <span className="text-[#3D5A6C] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                            Read Article
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
            <Heart className="w-10 h-10 text-[#F2C94C] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Join a Community of Thoughtful Parents
            </h2>
            <p className="text-xl text-white/90 mb-8">
              You're not in this alone. Join hundreds of Muslim parents who receive
              gentle guidance, practical tips, and encouragement delivered with care—not pressure.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
              />
              <button
                type="submit"
                className="bg-[#F2C94C] hover:bg-[#E0B63A] text-[#3D5A6C] font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Join the Curious Parents List
              </button>
            </form>

            <p className="text-sm text-white/70 mt-4">
              Thoughtful updates only. No spam.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
