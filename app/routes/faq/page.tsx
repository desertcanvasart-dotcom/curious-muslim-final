"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  BookOpen,
  Package,
  Sparkles,
  Bot,
  MessageCircle,
  Mail,
} from "lucide-react";
import { faqs, faqCategories, getFAQsByCategory } from "@/app/lib/constants/faq";

const categoryIcons: Record<string, React.ReactNode> = {
  book: <BookOpen className="w-5 h-5" />,
  shipping: <Package className="w-5 h-5" />,
  content: <Sparkles className="w-5 h-5" />,
  "ask-noor": <Bot className="w-5 h-5" />,
  general: <HelpCircle className="w-5 h-5" />,
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleQuestion = (id: string) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !activeCategory || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Group FAQs by category for display
  const groupedFAQs = faqCategories.reduce((acc, category) => {
    const categoryFAQs = filteredFAQs.filter((faq) => faq.category === category.id);
    if (categoryFAQs.length > 0) {
      acc[category.id] = categoryFAQs;
    }
    return acc;
  }, {} as Record<string, typeof faqs>);

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
              <HelpCircle className="w-4 h-4" />
              <span>Help Center</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>

            <p className="text-xl text-white leading-relaxed mb-8">
              Find answers to common questions about Curious Muslim, our book,
              shipping, and more.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
              />
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

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="container-custom">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                !activeCategory
                  ? "bg-[#3D5A6C] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              All Questions
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setActiveCategory(
                    category.id === activeCategory ? null : category.id
                  )
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  activeCategory === category.id
                    ? "bg-[#3D5A6C] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {categoryIcons[category.id]}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {filteredFAQs.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="text-[#3D5A6C] font-semibold hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedFAQs).map(([categoryId, categoryFAQs]) => {
                const category = faqCategories.find((c) => c.id === categoryId);
                if (!category) return null;

                return (
                  <motion.div
                    key={categoryId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Category Header */}
                    {!activeCategory && (
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#F2C94C] rounded-full flex items-center justify-center text-[#3D5A6C]">
                          {categoryIcons[categoryId]}
                        </div>
                        <h2 className="text-xl font-heading font-bold text-[#3D5A6C]">
                          {category.label}
                        </h2>
                      </div>
                    )}

                    {/* Questions */}
                    <div className="space-y-3">
                      {categoryFAQs.map((faq, index) => (
                        <motion.div
                          key={faq.id}
                          className="bg-white rounded-xl shadow-card overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => toggleQuestion(faq.id)}
                            className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-[#3D5A6C] pr-4">
                              {faq.question}
                            </span>
                            <motion.div
                              animate={{
                                rotate: openQuestions.has(faq.id) ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0 mt-1"
                            >
                              <ChevronDown className="w-5 h-5 text-[#3D5A6C]" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {openQuestions.has(faq.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-3xl p-8 md:p-12 text-center shadow-soft">
              <div className="w-16 h-16 bg-[#3D5A6C] rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#3D5A6C] mb-4">
                Still Have Questions?
              </h2>

              <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
                Reach out to us and we&apos;ll get back to you as soon as possible.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/routes/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </Link>
                <Link
                  href="/routes/ask-noor"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  Ask Noor AI
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-gradient-to-r from-[#3D5A6C] to-[#5C7A4B] text-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Helpful Resources
            </h2>
            <p className="text-white/80">
              Explore more about Curious Muslim
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "About the Book",
                description: "Learn about our beautifully illustrated Seerah",
                href: "/routes/book",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Meet the Characters",
                description: "Get to know Noor, Adam, Hana, and Mansour",
                href: "/routes/characters",
              },
              {
                icon: <Package className="w-6 h-6" />,
                title: "Shipping Info",
                description: "Delivery times and international shipping",
                href: "/routes/contact",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="block bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#F2C94C] rounded-full flex items-center justify-center text-[#3D5A6C] mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
