"use client";

import Link from "next/link";
import { Book, Heart, Users, Sparkles } from "lucide-react";

export default function BookFeature() {
  const features = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "12 Beautiful Chapters",
      description:
        "From birth in Makkah to leadership in Madinah, told through the eyes of children asking real questions.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Warm & Relatable",
      description:
        "Noor's gentle storytelling makes history feel personal, not distant. Your child will feel like they know the Prophet.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "For Western Muslim Kids",
      description:
        "Addresses identity, belonging, and being Muslim in diverse schools. Your child's reality, connected to Islamic history.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Stunning Illustrations",
      description:
        "Full-color artwork on every page brings the story to life while respecting Islamic guidelines.",
    },
  ];

  return (
    <section id="book-preview" className="section-padding bg-[#FDFBF7]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#3D5A6C] mb-6">
            A Seerah Book Like No Other
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            This is not just another history book. It is a conversation between
            Noor and three curious children—Adam, Hana, and Mansour—who ask the
            questions your child might be thinking.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F2C94C] rounded-full flex items-center justify-center text-[#3D5A6C] group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Details */}
        <div className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-3xl p-8 lg:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Specs */}
            <div>
              <h3 className="text-3xl font-heading font-bold text-[#3D5A6C] mb-6">
                Book Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#F2C94C] text-xl">📖</span>
                  <div>
                    <p className="font-semibold text-[#3D5A6C]">Format</p>
                    <p className="text-gray-600">Hardcover & Paperback</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#F2C94C] text-xl">📏</span>
                  <div>
                    <p className="font-semibold text-[#3D5A6C]">Size</p>
                    <p className="text-gray-600">
                      8.5&quot; × 8.5&quot; • 64 Full-Color Pages
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#F2C94C] text-xl">👶</span>
                  <div>
                    <p className="font-semibold text-[#3D5A6C]">Age Range</p>
                    <p className="text-gray-600">
                      8-12 years (5-7 with parent)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#F2C94C] text-xl">🗣️</span>
                  <div>
                    <p className="font-semibold text-[#3D5A6C]">Language</p>
                    <p className="text-gray-600">
                      English with gentle Arabic phrases
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-[#5C7A4B] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Launching February 1, 2026</span>
                </div>

                <h4 className="text-2xl font-heading font-bold text-[#3D5A6C] mb-4">
                  Pre-Order Now
                </h4>

                <p className="text-gray-600 mb-6">
                  Be among the first to receive this beautiful book. Perfect
                  timing for Ramadan 2026!
                </p>

                <div className="space-y-3">
                  <Link
                    href="/routes/book"
                    className="btn-primary w-full inline-block text-center"
                  >
                    View Full Details
                  </Link>
                  <Link
                    href="#newsletter"
                    className="btn-secondary w-full inline-block text-center"
                  >
                    Join Waitlist
                  </Link>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  💰 Paperback: $16.99 • Hardcover: $24.99
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
