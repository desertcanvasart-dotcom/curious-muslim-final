"use client";

import Link from "next/link";
import { ArrowRight, Heart, Shield, BookOpen } from "lucide-react";
import { getRecentPosts } from "@/app/lib/constants/blog-posts";

export default function StoriesPreview() {
  const recentPosts = getRecentPosts(3);

  return (
    <section className="section-padding bg-[#F5EFD4]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-block bg-[#5C7A4B] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Gentle Stories for Growing Hearts
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#3D5A6C] mb-6">
            Stories Your Child Will Love
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Age-appropriate, gentle stories that nurture your child's connection to Islam.
            No pressure, no fear—just warmth, wonder, and wisdom.
          </p>
        </div>

        {/* Reassurance Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Heart className="w-5 h-5 text-[#F2C94C]" />
            <span className="text-sm text-gray-700">Written with love</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Shield className="w-5 h-5 text-[#5C7A4B]" />
            <span className="text-sm text-gray-700">Safe for young minds</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <BookOpen className="w-5 h-5 text-[#3D5A6C]" />
            <span className="text-sm text-gray-700">Reviewed by educators</span>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] flex items-center justify-center">
                <span className="text-5xl">
                  {post.tags.includes("Parenting") && "👨‍👩‍👧‍👦"}
                  {post.tags.includes("Book Preview") && "📖"}
                  {post.tags.includes("Ramadan") && "🌙"}
                  {!post.tags.includes("Parenting") && !post.tags.includes("Book Preview") && !post.tags.includes("Ramadan") && "✨"}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#F5EFD4] text-[#5C7A4B] px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-heading font-bold text-[#3D5A6C] mb-2 group-hover:text-[#5C7A4B] transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/blog"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>Browse All Stories</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
