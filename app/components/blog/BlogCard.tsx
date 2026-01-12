"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn, formatDate, getReadingTime } from "@/app/lib/utils";
import { BlogPost } from "@/app/types/blog";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export default function BlogCard({
  post,
  variant = "default",
  className,
}: BlogCardProps) {
  const { slug, title, excerpt, author, publishedAt, featuredImage, tags, content } = post;
  const readingTime = getReadingTime(content);

  if (variant === "featured") {
    return (
      <Link
        href={`/blog/${slug}`}
        className={cn(
          "group block bg-white rounded-2xl shadow-soft overflow-hidden",
          "hover:shadow-xl transition-all duration-300",
          className
        )}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-full overflow-hidden">
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <span className="text-6xl">📖</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              {tags[0] && (
                <span className="px-3 py-1 bg-accent text-primary text-sm font-semibold rounded-full">
                  {tags[0]}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </span>
            </div>

            <h2 className="text-2xl font-heading font-bold text-primary mb-3 group-hover:text-primary-light transition-colors">
              {title}
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
              {excerpt}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">By {author}</span>
              <span className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Read More
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${slug}`}
        className={cn(
          "group flex gap-4 p-4 bg-white rounded-xl shadow-card hover:shadow-soft transition-all",
          className
        )}
      >
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-primary mb-1 line-clamp-2 group-hover:text-primary-light transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(publishedAt)} · {readingTime} min
          </p>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group block bg-white rounded-xl shadow-card overflow-hidden",
        "hover:shadow-soft hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center">
            <span className="text-5xl">📖</span>
          </div>
        )}
        {tags[0] && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
              {tags[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readingTime} min
          </span>
        </div>

        <h3 className="text-lg font-heading font-bold text-primary mb-2 line-clamp-2 group-hover:text-primary-light transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">By {author}</span>
          <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Read
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
