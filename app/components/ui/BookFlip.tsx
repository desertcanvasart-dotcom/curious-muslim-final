"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  ShoppingCart,
  BookOpen,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Book } from "@/app/lib/constants/books";

interface BookFlipProps {
  books: Book[];
}

const statusLabels: Record<Book["releaseStatus"], string> = {
  available: "Available Now",
  "pre-order": "Pre-Order",
  "coming-soon": "Coming Soon",
};

export default function BookFlip({ books }: BookFlipProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward">("forward");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Play page turn sound
  const playPageSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const audioContext = new AudioContext();
      const duration = 0.5;
      const sampleRate = audioContext.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;
        const progress = i / bufferSize;
        const envelope = Math.sin(progress * Math.PI) * Math.exp(-progress * 3);
        const noise = (Math.random() * 2 - 1) * 0.3;
        const swoosh = Math.sin(t * 200 * (1 - progress)) * 0.15;
        const crinkle = Math.sin(t * 800 + Math.random() * 6.28) * 0.05 * (1 - progress);
        data[i] = (noise + swoosh + crinkle) * envelope * 0.4;
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      const filter = audioContext.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 200;
      const lowpass = audioContext.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 3000;
      const gain = audioContext.createGain();
      gain.gain.value = 0.3;
      source.connect(filter);
      filter.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(audioContext.destination);
      source.start();
    } catch {
      // Audio not supported
    }
  }, [soundEnabled]);

  const turnPage = useCallback(
    (direction: "forward" | "backward") => {
      if (isFlipping) return;
      const newPage = direction === "forward" ? currentPage + 1 : currentPage - 1;
      if (newPage < 0 || newPage >= books.length) return;

      setIsFlipping(true);
      setFlipDirection(direction);
      playPageSound();

      // Animate flip progress
      const duration = 700;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function for more realistic motion
        const eased = 1 - Math.pow(1 - progress, 3);
        setFlipProgress(eased);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCurrentPage(newPage);
          setFlipProgress(0);
          setIsFlipping(false);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [isFlipping, currentPage, books.length, playPageSound]
  );

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0 || e.deltaX > 0) {
        turnPage("forward");
      } else {
        turnPage("backward");
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [turnPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        turnPage("forward");
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        turnPage("backward");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turnPage]);

  const currentBook = books[currentPage];
  const nextBook = currentPage < books.length - 1 ? books[currentPage + 1] : null;
  const prevBook = currentPage > 0 ? books[currentPage - 1] : null;

  // Calculate the book currently being shown during flip
  const displayBook = isFlipping
    ? flipDirection === "forward"
      ? currentBook
      : prevBook || currentBook
    : currentBook;

  const targetBook = isFlipping
    ? flipDirection === "forward"
      ? nextBook
      : currentBook
    : null;

  return (
    <div ref={containerRef} className="relative w-full py-12 select-none">
      {/* Sound Toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-0 right-4 z-30 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        title={soundEnabled ? "Mute sound" : "Enable sound"}
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-[#3D5A6C]" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Book Container */}
      <div className="relative max-w-5xl mx-auto px-16">
        {/* Navigation Arrows */}
        <button
          onClick={() => turnPage("backward")}
          disabled={currentPage === 0 || isFlipping}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all ${
            currentPage === 0 || isFlipping
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-[#F2C94C] hover:scale-110"
          }`}
        >
          <ChevronLeft className="w-7 h-7 text-[#3D5A6C]" />
        </button>

        <button
          onClick={() => turnPage("forward")}
          disabled={currentPage === books.length - 1 || isFlipping}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all ${
            currentPage === books.length - 1 || isFlipping
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-[#F2C94C] hover:scale-110"
          }`}
        >
          <ChevronRight className="w-7 h-7 text-[#3D5A6C]" />
        </button>

        {/* The Book */}
        <div
          className="relative mx-auto"
          style={{
            perspective: "2000px",
            perspectiveOrigin: "50% 50%"
          }}
        >
          {/* Book Base with 3D effect */}
          <div
            className="relative mx-auto"
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "580px",
              transformStyle: "preserve-3d",
              transform: "rotateX(5deg)",
            }}
          >
            {/* Book Shadow on Table */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-16 rounded-full blur-2xl opacity-40"
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
              }}
            />

            {/* Back Cover - Dark Hardcover */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)",
                transform: "translateZ(-20px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            />

            {/* Page Stack - Right Side (visible pages) */}
            <div
              className="absolute top-3 bottom-3 right-3"
              style={{
                width: "15px",
                background: "linear-gradient(90deg, #d4d0c8 0%, #f5f2eb 30%, #ffffff 50%, #f5f2eb 70%, #d4d0c8 100%)",
                transform: "translateZ(-10px)",
                borderRadius: "0 3px 3px 0",
                boxShadow: "inset 0 0 3px rgba(0,0,0,0.1)",
              }}
            >
              {/* Page lines */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full"
                  style={{
                    height: "1px",
                    background: "rgba(0,0,0,0.05)",
                    top: `${12 + i * 11}%`,
                  }}
                />
              ))}
            </div>

            {/* Spine */}
            <div
              className="absolute left-0 top-0 bottom-0 w-14 rounded-l-lg overflow-hidden"
              style={{
                background: "linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 30%, #3a3a3a 50%, #2d2d2d 70%, #1a1a1a 100%)",
                transform: "translateZ(-10px) rotateY(-3deg)",
                transformOrigin: "left center",
                boxShadow: "inset -5px 0 15px rgba(0,0,0,0.4)",
              }}
            >
              {/* Gold decorative elements on spine */}
              <div className="h-full flex flex-col items-center justify-between py-6">
                <div className="w-8 h-1 bg-gradient-to-r from-transparent via-[#F2C94C] to-transparent rounded opacity-60" />
                <div className="flex-1 flex items-center">
                  <div
                    className="text-[#F2C94C]/80 text-[10px] font-bold tracking-wider"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    STORIES OF THE PROPHETS
                  </div>
                </div>
                <div className="w-8 h-1 bg-gradient-to-r from-transparent via-[#F2C94C] to-transparent rounded opacity-60" />
              </div>
            </div>

            {/* Front Cover / Open Book Area */}
            <div
              className="absolute inset-0 rounded-lg overflow-hidden bg-[#fdfbf7]"
              style={{
                marginLeft: "56px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15), inset 0 0 100px rgba(0,0,0,0.03)",
              }}
            >
              {/* Page texture overlay */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Center fold line / binding */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 pointer-events-none z-10">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              </div>

              {/* Two-page spread layout */}
              <div className="relative h-full grid grid-cols-2">
                {/* Left Page - Book Cover Art */}
                <div className="relative p-8 flex flex-col items-center justify-center border-r border-gray-200/50 overflow-hidden">
                  {/* Decorative corner flourishes */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#F2C94C]/30 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#F2C94C]/30 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#F2C94C]/30 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#F2C94C]/30 rounded-br-lg" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`cover-${currentPage}-${isFlipping}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      {/* Book Cover Illustration */}
                      <div
                        className="relative w-52 h-72 rounded-xl overflow-hidden"
                        style={{
                          backgroundColor: displayBook.coverColor,
                          boxShadow: `
                            0 25px 50px ${displayBook.coverColor}50,
                            0 10px 20px rgba(0,0,0,0.2),
                            inset 0 2px 0 rgba(255,255,255,0.2),
                            inset 0 -2px 0 rgba(0,0,0,0.1)
                          `,
                        }}
                      >
                        {/* Book cover shine effect */}
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%)",
                          }}
                        />

                        {/* Spine shadow on cover */}
                        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/25 to-transparent" />

                        {/* Cover content */}
                        <div className="relative h-full flex flex-col items-center justify-center p-6">
                          {/* Decorative frame */}
                          <div className="absolute inset-4 border-2 border-white/20 rounded-lg" />

                          {/* Prophet emoji */}
                          <span className="text-8xl mb-4 drop-shadow-xl">{displayBook.coverEmoji}</span>

                          {/* Arabic name */}
                          <p className="text-white text-2xl font-bold text-center drop-shadow-lg font-heading">
                            {displayBook.arabicName}
                          </p>

                          {/* Subtitle */}
                          <p className="text-white/70 text-sm text-center mt-2">
                            {displayBook.prophet}
                          </p>
                        </div>
                      </div>

                      {/* Book number */}
                      <div className="mt-8 flex items-center gap-3">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#3D5A6C]/30 to-transparent" />
                        <span className="text-[#3D5A6C]/60 text-sm font-medium">
                          Book {currentPage + 1} of {books.length}
                        </span>
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#3D5A6C]/30 to-transparent" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Page - Book Details */}
                <div className="relative p-8 flex flex-col overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`details-${currentPage}-${isFlipping}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="flex-1 flex flex-col"
                    >
                      {/* Status Badge */}
                      <span
                        className={`self-start px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
                          displayBook.releaseStatus === "pre-order"
                            ? "bg-[#F2C94C] text-[#3D5A6C]"
                            : displayBook.releaseStatus === "coming-soon"
                            ? "bg-[#3D5A6C] text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {statusLabels[displayBook.releaseStatus]}
                      </span>

                      {/* Title */}
                      <h2 className="text-2xl lg:text-3xl font-heading font-bold text-[#3D5A6C] mb-1">
                        {displayBook.title}
                      </h2>
                      <p
                        className="text-xl lg:text-2xl font-heading font-semibold mb-4"
                        style={{ color: displayBook.coverColor }}
                      >
                        {displayBook.subtitle}
                      </p>

                      {/* Divider */}
                      <div className="w-16 h-1 rounded-full mb-4" style={{ backgroundColor: displayBook.coverColor + "40" }} />

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm lg:text-base line-clamp-3">
                        {displayBook.description}
                      </p>

                      {/* Rating */}
                      {displayBook.reviewCount > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(displayBook.rating)
                                    ? "fill-[#F2C94C] text-[#F2C94C]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            ({displayBook.reviewCount} reviews)
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="mb-6">
                        {displayBook.releaseStatus === "coming-soon" ? (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-5 h-5" />
                            <span>Coming {displayBook.releaseDate}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="text-2xl lg:text-3xl font-bold text-[#3D5A6C]">
                              ${displayBook.price}
                            </span>
                            {displayBook.originalPrice > displayBook.price && (
                              <>
                                <span className="text-gray-400 line-through">
                                  ${displayBook.originalPrice}
                                </span>
                                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                                  SAVE {Math.round(((displayBook.originalPrice - displayBook.price) / displayBook.originalPrice) * 100)}%
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <Link
                          href={`/routes/book/${displayBook.slug}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#3D5A6C] text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-[#2C4555] transition-colors"
                        >
                          <BookOpen className="w-4 h-4" />
                          View Details
                        </Link>
                        {displayBook.releaseStatus !== "coming-soon" && (
                          <button className="flex items-center justify-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-5 py-3 rounded-full font-semibold text-sm hover:bg-[#E0B63A] transition-colors">
                            <ShoppingCart className="w-4 h-4" />
                            {displayBook.releaseStatus === "pre-order" ? "Pre-Order" : "Buy"}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Page number */}
                  <div className="absolute bottom-4 right-6 text-gray-300 text-sm italic">
                    — {currentPage + 1} —
                  </div>
                </div>
              </div>

              {/* PAGE TURN ANIMATION */}
              {isFlipping && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    marginLeft: "0",
                    perspective: "1500px",
                    perspectiveOrigin: "left center",
                  }}
                >
                  {/* The turning page */}
                  <div
                    className="absolute top-0 bottom-0 bg-[#fdfbf7] origin-left overflow-hidden"
                    style={{
                      left: "50%",
                      right: 0,
                      transform: flipDirection === "forward"
                        ? `rotateY(${-180 * flipProgress}deg)`
                        : `rotateY(${-180 + 180 * flipProgress}deg)`,
                      transformStyle: "preserve-3d",
                      boxShadow: flipProgress > 0.1 && flipProgress < 0.9
                        ? `${flipDirection === "forward" ? "-" : ""}10px 0 30px rgba(0,0,0,${0.2 * Math.sin(flipProgress * Math.PI)})`
                        : "none",
                    }}
                  >
                    {/* Front of page (current content) */}
                    <div
                      className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-[#fdfbf7]"
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {/* Current book cover */}
                      <div
                        className="w-40 h-56 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: displayBook.coverColor,
                          boxShadow: `0 10px 30px ${displayBook.coverColor}40`,
                        }}
                      >
                        <div className="text-center">
                          <span className="text-6xl">{displayBook.coverEmoji}</span>
                          <p className="text-white/80 text-sm mt-2">{displayBook.arabicName}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-500 text-sm">{displayBook.subtitle}</p>

                      {/* Page curl shadow */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(to left, rgba(0,0,0,${0.15 * flipProgress}) 0%, transparent 30%)`,
                        }}
                      />
                    </div>

                    {/* Back of page (next content) */}
                    <div
                      className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-[#f8f5ef]"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {targetBook && (
                        <>
                          {/* Next book cover */}
                          <div
                            className="w-40 h-56 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: targetBook.coverColor,
                              boxShadow: `0 10px 30px ${targetBook.coverColor}40`,
                            }}
                          >
                            <div className="text-center">
                              <span className="text-6xl">{targetBook.coverEmoji}</span>
                              <p className="text-white/80 text-sm mt-2">{targetBook.arabicName}</p>
                            </div>
                          </div>
                          <p className="mt-4 text-gray-500 text-sm">{targetBook.subtitle}</p>
                        </>
                      )}

                      {/* Page curl shadow on back */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(to right, rgba(0,0,0,${0.1 * (1 - flipProgress)}) 0%, transparent 30%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center gap-3 mt-12">
        {books.map((book, idx) => (
          <button
            key={book.id}
            onClick={() => {
              if (!isFlipping && idx !== currentPage) {
                if (idx > currentPage) {
                  turnPage("forward");
                } else {
                  turnPage("backward");
                }
              }
            }}
            disabled={isFlipping}
            className="group relative"
            title={book.subtitle}
          >
            <div
              className={`transition-all duration-300 rounded-full ${
                idx === currentPage
                  ? "w-12 h-4 shadow-lg"
                  : "w-4 h-4 hover:scale-125 opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: book.coverColor }}
            />
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {book.prophet}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Instructions */}
      <motion.p
        className="text-center mt-6 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Scroll, use arrow keys, or click to browse books
      </motion.p>
    </div>
  );
}
