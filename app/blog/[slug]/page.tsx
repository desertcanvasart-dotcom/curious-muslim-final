"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Mail,
  Loader2,
} from "lucide-react";
import { formatDate, getReadingTime } from "@/app/lib/utils";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage: string | null;
  publishedAt: string;
  tags: string[];
}

interface RecentPost {
  slug: string;
  title: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
        setRecentPosts(data.recentPosts);
        setAllTags(data.allTags);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-heading font-bold text-[#3D5A6C] mb-2">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = getReadingTime(post.content);

  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20" />
        </div>

        <div className="container-custom py-12 md:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#F2C94C] text-[#3D5A6C] text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 max-w-4xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#F2C94C] rounded-full flex items-center justify-center text-[#3D5A6C] font-bold">
                  {post.author.charAt(0)}
                </div>
                <span>{post.author}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </span>
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

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.article
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Featured Image */}
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-[#3D5A6C]/20 to-[#5C7A4B]/20 flex items-center justify-center">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-8xl opacity-30">📖</span>
                )}
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-[#3D5A6C] prose-headings:font-heading prose-a:text-primary prose-strong:text-[#3D5A6C]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Share Section */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">Share this article:</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                        <Facebook className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-[#3D5A6C] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] rounded-2xl p-6 text-white">
                <h3 className="font-heading font-bold text-xl mb-3">
                  Enjoying our articles?
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Get the latest parenting tips and Islamic education insights
                  delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
                />
                <button className="w-full bg-[#F2C94C] text-[#3D5A6C] font-semibold py-2 rounded-lg hover:bg-[#E0B63A] transition-colors">
                  Subscribe
                </button>
              </div>

              {/* Recent Posts */}
              {recentPosts.length > 0 && (
                <div className="bg-white rounded-2xl shadow-soft p-6">
                  <h3 className="font-heading font-bold text-[#3D5A6C] text-xl mb-4">
                    Recent Articles
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.slice(0, 3).map((recentPost) => (
                      <Link
                        key={recentPost.slug}
                        href={`/blog/${recentPost.slug}`}
                        className="group flex gap-4"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#3D5A6C]/20 to-[#5C7A4B]/20 flex items-center justify-center">
                          <span className="text-2xl">📖</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[#3D5A6C] text-sm line-clamp-2 group-hover:text-[#5C7A4B] transition-colors">
                            {recentPost.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-heading font-bold text-[#3D5A6C] text-xl mb-4">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Link
                      key={tag}
                      href="/blog"
                      className="px-3 py-1.5 bg-[#F5EFD4] text-[#5C7A4B] text-sm font-medium rounded-full hover:bg-[#3D5A6C] hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}
