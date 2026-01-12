"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F2C94C] rounded-full mb-6">
            <Heart className="w-8 h-8 text-[#3D5A6C] fill-current" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Ready to Begin This Journey Together?
          </h2>

          {/* Subheading */}
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Every great journey starts with a single step. Whether you're exploring stories,
            meeting our characters, or joining our community—we're honored to walk alongside
            your family.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#3D5A6C] font-semibold px-8 py-4 rounded-full hover:bg-[#F5EFD4] transition-colors"
            >
              <span>Explore the Stories</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#newsletter"
              className="inline-flex items-center justify-center gap-2 bg-[#F2C94C] text-[#3D5A6C] font-semibold px-8 py-4 rounded-full hover:bg-[#E0B63A] transition-colors"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust Note */}
          <p className="text-white/70 text-sm mt-8">
            Created with love by Muslim parents who understand what your family needs.
          </p>
        </div>
      </div>
    </section>
  );
}
