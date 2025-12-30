"use client";

import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Fatima Ahmed",
      location: "New Jersey, USA",
      role: "Mother of 3",
      text: "My daughter asked me last night, 'Was the Prophet really that kind to everyone?' This book opened a conversation we have never had before. She is reading it every night now.",
      rating: 5,
    },
    {
      name: "Omar Hassan",
      location: "Toronto, Canada",
      role: "Father of 2",
      text: "As a parent raising kids in the West, I have been looking for something like this. It does not just teach—it helps my son understand who he is as a Muslim in today's world.",
      rating: 5,
    },
    {
      name: "Amina Yusuf",
      location: "London, UK",
      role: "Islamic School Teacher",
      text: "I use this book with my class. The way Noor explains things—it is exactly how kids need to hear it. Not preachy, just honest and warm. My students love Adam, Hana, and Mansour!",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-[#F5EFD4] to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#5C7A4B] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            What Parents Are Saying
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#3D5A6C] mb-6">
            Stories That Spark Conversations
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Families across the US, Canada, and UK are already sharing this book
            with their children. Here is what they are experiencing.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card group hover:scale-105 transition-transform duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-10 h-10 text-[#F2C94C] fill-current opacity-50" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#F2C94C] fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold text-[#3D5A6C]">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.role} • {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-[#3D5A6C] to-[#5C7A4B] rounded-3xl p-8 lg:p-12 text-center text-white shadow-xl">
          <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Join 500+ Families on the Waitlist
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be the first to know when the book launches. Plus, get exclusive
            Ramadan activities and resources for your family.
          </p>

          {/* Newsletter Form Placeholder */}
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
              />
              <button
                type="submit"
                className="bg-[#F2C94C] hover:bg-[#E0B63A] text-[#3D5A6C] font-semibold px-8 py-4 rounded-full transition-colors whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </form>
            <p className="text-sm text-white/70 mt-4">
              No spam. Just occasional updates about the book launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
