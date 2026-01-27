"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Instagram,
  Facebook,
  Youtube,
  HelpCircle,
  BookOpen,
  Users,
  Package,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, you'd send this to your API
    console.log("Form submitted:", data);

    setStatus("success");
    reset();
  };

  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden min-h-[550px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20" />
        </div>

        <div className="container-custom py-16 relative z-10 w-full">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <MessageSquare className="w-4 h-4" />
              <span>Get in Touch</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              We&apos;d Love to Hear From You
            </h1>

            <p className="text-xl text-white leading-relaxed">
              Have a question about the book? Want to collaborate? Or just want
              to say Salaam? We&apos;re here for you.
            </p>
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

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10">
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mb-6">
                  Send Us a Message
                </h2>

                {status === "success" ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 bg-[#5C7A4B] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      JazakAllah Khair for reaching out. We&apos;ll get back to you
                      within 24-48 hours, insha&apos;Allah.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-[#3D5A6C] font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Your Name *
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          id="name"
                          placeholder="Enter your name"
                          className={`input-field ${
                            errors.name ? "border-red-500" : ""
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          id="email"
                          placeholder="your@email.com"
                          className={`input-field ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Subject *
                      </label>
                      <select
                        {...register("subject")}
                        id="subject"
                        className={`input-field ${
                          errors.subject ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="book">About the Book</option>
                        <option value="order">Order & Shipping</option>
                        <option value="bulk">Bulk Orders (Schools/Masjids)</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="press">Press & Media</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Your Message *
                      </label>
                      <textarea
                        {...register("message")}
                        id="message"
                        rows={5}
                        placeholder="How can we help you?"
                        className={`input-field resize-y ${
                          errors.message ? "border-red-500" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Error message */}
                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>Something went wrong. Please try again.</p>
                      </div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Email Card */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F2C94C] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#3D5A6C]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#3D5A6C] mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      We typically respond within 24-48 hours
                    </p>
                    <a
                      href="mailto:hello@curiousmuslim.com"
                      className="text-[#3D5A6C] font-medium hover:underline"
                    >
                      hello@curiousmuslim.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-heading font-bold text-[#3D5A6C] mb-4">
                  Follow Us
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay updated with behind-the-scenes content and announcements
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/curiousmuslim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-[#F2C94C] hover:text-[#3D5A6C] rounded-full flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com/curiousmuslim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-[#F2C94C] hover:text-[#3D5A6C] rounded-full flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com/@curiousmuslim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-[#F2C94C] hover:text-[#3D5A6C] rounded-full flex items-center justify-center transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-2xl shadow-soft p-6">
                <h3 className="font-heading font-bold text-[#3D5A6C] mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/faq"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#3D5A6C] transition-colors"
                  >
                    <HelpCircle className="w-5 h-5 text-[#F2C94C]" />
                    <span>Frequently Asked Questions</span>
                  </Link>
                  <Link
                    href="/book"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#3D5A6C] transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-[#F2C94C]" />
                    <span>About the Book</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#3D5A6C] transition-colors"
                  >
                    <Users className="w-5 h-5 text-[#F2C94C]" />
                    <span>About Us</span>
                  </Link>
                </div>
              </div>

              {/* Bulk Orders Card */}
              <div className="bg-[#3D5A6C] rounded-2xl shadow-soft p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F2C94C] rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-[#3D5A6C]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold mb-1">
                      Bulk Orders
                    </h3>
                    <p className="text-white/80 text-sm mb-3">
                      Special pricing for Islamic schools, masjids, and
                      educational institutions.
                    </p>
                    <a
                      href="mailto:hello@curiousmuslim.com?subject=Bulk Order Inquiry"
                      className="text-[#F2C94C] font-medium hover:underline text-sm"
                    >
                      Request a Quote →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#3D5A6C] mb-4">
              Looking for Quick Answers?
            </h2>
            <p className="text-gray-600 mb-8">
              Check out our FAQ page for answers to common questions about the
              book, shipping, and more.
            </p>
            <Link
              href="/faq"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <HelpCircle className="w-5 h-5" />
              <span>View FAQ</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
