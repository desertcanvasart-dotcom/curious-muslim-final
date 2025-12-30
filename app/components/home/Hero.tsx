"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="pattern-bg w-full h-full"></div>
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>Launching Ramadan 2026</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
              Stories That Bring the Prophets Life to Your Home
            </h1>

            <p className="text-xl text-white mb-8 leading-relaxed">
              A beautifully illustrated Seerah for Muslim children ages 8-12.
              Learn about Prophet Muhammad ﷺ through warm storytelling that
              feels like sitting with a friend.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/routes/book"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <span>Get the Book</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#book-preview"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <span>Read Sample Chapter</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap gap-8 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F2C94C] fill-current" />
                <span className="text-white/80">Authentic Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F2C94C] fill-current" />
                <span className="text-white/80">Age-Appropriate</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F2C94C] fill-current" />
                <span className="text-white/80">Beautifully Illustrated</span>
              </div>
            </div>
          </div>

          {/* Right Content - Book Mockup Placeholder */}
          <div className="relative animate-fade-in">
            <div className="relative mx-auto max-w-md">
              {/* Book Cover Placeholder */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-[3/4] bg-gradient-to-br from-[#F5EFD4] to-[#A4C997] rounded-xl flex flex-col items-center justify-center p-8">
                  <div className="text-7xl mb-4">🌙</div>
                  <h3 className="text-2xl font-heading font-bold text-[#3D5A6C] text-center mb-2">
                    Stories of the Prophets
                  </h3>
                  <p className="text-lg text-[#5C7A4B] text-center mb-4">
                    Prophet Muhammad ﷺ
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    Told by Noor · Illustrated by Laila
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-[#F2C94C] text-[#3D5A6C] rounded-full p-4 shadow-lg animate-bounce">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-[#3D5A6C] rounded-full p-4 shadow-lg">
                <span className="text-2xl">📖</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="#FDFBF7"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
