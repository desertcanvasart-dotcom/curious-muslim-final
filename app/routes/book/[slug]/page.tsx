"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Star,
  Sparkles,
  Gift,
  ChevronLeft,
  ChevronRight,
  Check,
  ShoppingCart,
  Package,
  Globe,
  Award,
  Users,
  Clock,
  BookMarked,
  ArrowLeft,
  Heart,
  Bell,
} from "lucide-react";
import { books, getBookBySlug } from "@/app/lib/constants/books";
import { characters } from "@/app/lib/constants/characters";

export default function BookDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const book = getBookBySlug(slug);

  const [currentChapter, setCurrentChapter] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!book) {
    notFound();
  }

  const nextChapter = () => {
    setCurrentChapter((prev) => (prev + 1) % book.chapters.length);
  };

  const prevChapter = () => {
    setCurrentChapter(
      (prev) => (prev - 1 + book.chapters.length) % book.chapters.length
    );
  };

  const isPreOrder = book.releaseStatus === "pre-order";
  const isComingSoon = book.releaseStatus === "coming-soon";
  const hasDiscount = book.originalPrice > book.price;
  const discountPercent = hasDiscount
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden min-h-[550px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20" />
        </div>

        <div className="container-custom py-16 relative z-10 w-full">
          {/* Back Link */}
          <Link
            href="/routes/book"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Books</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Book Preview */}
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative max-w-md mx-auto">
                {/* Main Image */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-white">
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${book.coverColor}30, white)`,
                    }}
                  >
                    <div className="text-center p-8">
                      <span className="text-7xl mb-4 block">
                        {book.coverEmoji}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-[#3D5A6C]">
                        {book.title}
                      </h3>
                      <p className="text-lg font-medium mt-2" style={{ color: book.coverColor }}>
                        {book.subtitle}
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        {book.arabicName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Preview */}
                <div className="flex gap-2 mt-4 justify-center">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? "border-[#F2C94C] scale-105"
                          : "border-white/30 hover:border-white/50"
                      }`}
                    >
                      <div className="w-full h-full bg-white/20 flex items-center justify-center">
                        <span className="text-xs">
                          {idx === 0 ? "Cover" : `Page ${idx}`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Book Info */}
            <motion.div
              className="order-1 md:order-2 text-center md:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-2 rounded-full font-semibold text-sm mb-6">
                {isPreOrder && (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Now Available for Pre-Order</span>
                  </>
                )}
                {isComingSoon && (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>Coming {book.releaseDate}</span>
                  </>
                )}
                {!isPreOrder && !isComingSoon && (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Available Now</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-2">
                {book.title}
              </h1>
              <p className="text-2xl text-[#F2C94C] font-heading font-semibold mb-6">
                {book.subtitle}
              </p>

              <p className="text-xl text-white leading-relaxed mb-6">
                {book.description}
              </p>

              {/* Rating */}
              {book.reviewCount > 0 && (
                <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(book.rating)
                            ? "fill-[#F2C94C] text-[#F2C94C]"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/80">
                    {book.rating}/5 ({book.reviewCount}+ reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-8">
                {isComingSoon ? (
                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <span className="text-2xl font-semibold text-white/80">
                      Price to be announced
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <span className="text-4xl font-bold">${book.price}</span>
                    {hasDiscount && (
                      <>
                        <span className="text-lg text-white/60 line-through">
                          ${book.originalPrice}
                        </span>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {discountPercent}% OFF
                        </span>
                      </>
                    )}
                  </div>
                )}
                {isPreOrder && (
                  <p className="text-white/70 text-sm mt-2">
                    Pre-order price - Ships {book.releaseDate}
                  </p>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {isComingSoon ? (
                  <button className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
                    <Bell className="w-5 h-5" />
                    Notify Me When Available
                  </button>
                ) : (
                  <button className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
                    <ShoppingCart className="w-5 h-5" />
                    {isPreOrder ? "Pre-Order Now" : "Buy Now"}
                  </button>
                )}
                <Link
                  href="#chapters"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Preview Chapters
                </Link>
              </div>

              {/* Trust Badges */}
              {!isComingSoon && (
                <div className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>Free shipping over $50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Ships worldwide</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
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

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-4">
              What Makes This Book Special
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Crafted with love and care to inspire the next generation of
              Muslims
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {book.features.map((feature, index) => (
              <motion.div
                key={feature}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-shadow flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-[#F2C94C] rounded-xl flex items-center justify-center text-[#3D5A6C] flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-gray-700 font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Preview */}
      {book.chapters.length > 0 && (
        <section id="chapters" className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-4">
                Explore the {book.chapters.length} Chapters
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Each chapter brings a piece of {book.prophet}&apos;s life to
                life through engaging storytelling and valuable lessons
              </p>
            </motion.div>

            {/* Chapter Carousel */}
            <div className="max-w-4xl mx-auto">
              <div
                className="relative rounded-3xl p-8 md:p-12 shadow-soft"
                style={{
                  background: `linear-gradient(135deg, ${book.coverColor}10, white)`,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChapter}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-white px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ backgroundColor: book.coverColor }}
                      >
                        Chapter {book.chapters[currentChapter].id}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#3D5A6C] mb-4">
                      {book.chapters[currentChapter].title}
                    </h3>

                    <p className="text-gray-600 text-lg mb-6">
                      {book.chapters[currentChapter].description}
                    </p>

                    <div
                      className="rounded-xl p-4 border"
                      style={{
                        backgroundColor: `${book.coverColor}10`,
                        borderColor: `${book.coverColor}30`,
                      }}
                    >
                      <p className="text-sm font-medium" style={{ color: book.coverColor }}>
                        <span className="font-bold">Lesson:</span>{" "}
                        {book.chapters[currentChapter].lesson}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={prevChapter}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#3D5A6C] hover:bg-[#3D5A6C] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-2">
                    {book.chapters.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentChapter(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentChapter
                            ? "w-6"
                            : "hover:opacity-70"
                        }`}
                        style={{
                          backgroundColor:
                            idx === currentChapter
                              ? book.coverColor
                              : `${book.coverColor}40`,
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextChapter}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#3D5A6C] hover:bg-[#3D5A6C] hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Meet the Characters - Only for Prophet Muhammad book */}
      {book.slug === "prophet-muhammad" && (
        <section className="section-padding bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Meet Your Guides
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Four lovable characters who make learning about the Prophet fun
                and relatable
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {characters.map((character, index) => (
                <motion.div
                  key={character.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                    style={{ backgroundColor: character.color + "40" }}
                  >
                    {character.id === "noor" && "🌟"}
                    {character.id === "adam" && "👦"}
                    {character.id === "hana" && "👧"}
                    {character.id === "mansour" && "😄"}
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-1">
                    {character.name}
                  </h3>
                  <p className="text-[#F2C94C] text-sm mb-3">
                    {character.arabicName}
                  </p>
                  <p className="text-white/80 text-sm line-clamp-3">
                    {character.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/routes/characters"
                className="inline-flex items-center gap-2 text-[#F2C94C] font-semibold hover:underline"
              >
                Learn more about the characters
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {book.reviews.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-4">
                What Parents Are Saying
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? "fill-[#F2C94C] text-[#F2C94C]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {book.rating} out of 5 stars
                </span>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {book.reviews.map((review, index) => (
                <motion.div
                  key={review.name}
                  className="bg-white rounded-2xl p-6 shadow-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#F2C94C] text-[#F2C94C]"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: book.coverColor }}
                    >
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[#3D5A6C]">
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl font-heading font-bold text-[#3D5A6C] mb-6">
                  Book Details
                </h2>
                <div className="space-y-4">
                  {book.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between py-3 border-b border-gray-100"
                    >
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium text-[#3D5A6C]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-8"
                style={{
                  background: `linear-gradient(135deg, ${book.coverColor}10, white)`,
                }}
              >
                <h3 className="font-heading font-bold text-[#3D5A6C] text-xl mb-4">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3">
                  {book.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: book.coverColor }}
                      />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="section-padding"
        style={{
          background: `linear-gradient(90deg, ${book.coverColor}, ${book.coverColor}CC)`,
        }}
      >
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {isPreOrder && (
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full font-semibold text-sm mb-6 text-white">
                <Clock className="w-4 h-4" />
                <span>Limited Time Pre-Order Price</span>
              </div>
            )}

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {isComingSoon
                ? "Be the First to Know"
                : "Start Your Family's Journey Today"}
            </h2>

            <p className="text-white/80 text-lg mb-8">
              {isComingSoon
                ? `Sign up to be notified when "${book.subtitle}" becomes available for pre-order.`
                : `Give your children the gift of knowing and loving ${book.prophet}. ${
                    isPreOrder
                      ? `Pre-order now and save ${discountPercent}% off the retail price.`
                      : "Order your copy today!"
                  }`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isComingSoon ? (
                <button className="bg-white text-[#3D5A6C] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notify Me
                </button>
              ) : (
                <button className="bg-white text-[#3D5A6C] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {isPreOrder
                    ? `Pre-Order for $${book.price}`
                    : `Buy for $${book.price}`}
                </button>
              )}
              <Link
                href="/routes/contact"
                className="bg-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors"
              >
                Bulk Orders for Schools
              </Link>
            </div>

            {!isComingSoon && (
              <p className="text-sm text-white/60 mt-6">
                Free shipping on orders over $50 - Ships worldwide - 30-day
                money-back guarantee
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* More Books */}
      <section className="section-padding bg-[#FDFBF7]">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold text-[#3D5A6C] mb-4">
              More Books in the Series
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books
              .filter((b) => b.slug !== book.slug)
              .slice(0, 4)
              .map((otherBook, index) => (
                <motion.div
                  key={otherBook.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/routes/book/${otherBook.slug}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all group">
                      <div
                        className="aspect-[4/3] flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${otherBook.coverColor}20, ${otherBook.coverColor}40)`,
                        }}
                      >
                        <div
                          className="w-20 h-28 rounded-lg shadow-lg flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: otherBook.coverColor }}
                        >
                          <span className="text-3xl">{otherBook.coverEmoji}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-[#3D5A6C] text-sm mb-1 group-hover:text-[#5C7A4B]">
                          {otherBook.subtitle}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {otherBook.releaseStatus === "coming-soon"
                            ? `Coming ${otherBook.releaseDate}`
                            : `$${otherBook.price}`}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/routes/book"
              className="inline-flex items-center gap-2 text-[#3D5A6C] font-semibold hover:underline"
            >
              View All Books
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
