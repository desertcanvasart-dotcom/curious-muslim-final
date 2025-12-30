"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Search,
  BookOpen,
  Package,
  CreditCard,
  Mail,
  MessageCircle,
  ChevronRight,
  ExternalLink,
  Bot,
  Users,
  FileText,
  Shield,
} from "lucide-react";

const helpCategories = [
  {
    id: "getting-started",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Getting Started",
    description: "New to Curious Muslim? Start here.",
    articles: [
      { title: "What is Curious Muslim?", href: "/routes/about" },
      { title: "Who is the book for?", href: "/routes/faq" },
      { title: "Meet the characters", href: "/routes/characters" },
      { title: "How to pre-order", href: "/routes/book" },
    ],
  },
  {
    id: "orders-shipping",
    icon: <Package className="w-6 h-6" />,
    title: "Orders & Shipping",
    description: "Track orders, shipping info, and delivery.",
    articles: [
      { title: "How long does shipping take?", href: "/routes/faq" },
      { title: "Do you ship internationally?", href: "/routes/faq" },
      { title: "Bulk orders for schools", href: "/routes/contact" },
      { title: "Track my order", href: "/routes/contact" },
    ],
  },
  {
    id: "payments",
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payments & Billing",
    description: "Payment methods, refunds, and invoices.",
    articles: [
      { title: "Accepted payment methods", href: "/routes/faq" },
      { title: "Refund policy", href: "/routes/terms" },
      { title: "Request an invoice", href: "/routes/contact" },
      { title: "Payment security", href: "/routes/privacy" },
    ],
  },
  {
    id: "ask-noor",
    icon: <Bot className="w-6 h-6" />,
    title: "Ask Noor AI",
    description: "Learn about our AI companion feature.",
    articles: [
      { title: "What is Ask Noor?", href: "/routes/faq" },
      { title: "Is it safe for children?", href: "/routes/faq" },
      { title: "How accurate are the answers?", href: "/routes/faq" },
      { title: "Try Ask Noor", href: "/routes/ask-noor" },
    ],
  },
  {
    id: "account",
    icon: <Users className="w-6 h-6" />,
    title: "Account & Newsletter",
    description: "Manage your subscription and preferences.",
    articles: [
      { title: "Join our newsletter", href: "/#newsletter" },
      { title: "Update email preferences", href: "/routes/contact" },
      { title: "Unsubscribe from emails", href: "/routes/contact" },
      { title: "Privacy settings", href: "/routes/privacy" },
    ],
  },
  {
    id: "legal",
    icon: <FileText className="w-6 h-6" />,
    title: "Legal & Policies",
    description: "Terms, privacy, and other policies.",
    articles: [
      { title: "Terms of Service", href: "/routes/terms" },
      { title: "Privacy Policy", href: "/routes/privacy" },
      { title: "Cookie Policy", href: "/routes/privacy" },
      { title: "Copyright information", href: "/routes/terms" },
    ],
  },
];

const popularArticles = [
  { title: "What age is the book suitable for?", href: "/routes/faq" },
  { title: "When will the book be released?", href: "/routes/book" },
  { title: "Do you ship to my country?", href: "/routes/faq" },
  { title: "Is Ask Noor safe for my child?", href: "/routes/faq" },
  { title: "How can I contact you?", href: "/routes/contact" },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
              How Can We Help You?
            </h1>

            <p className="text-xl text-white leading-relaxed mb-8">
              Find answers, get support, and learn everything about Curious Muslim.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F2C94C] text-lg"
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

      {/* Popular Articles */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm font-medium text-gray-500 flex-shrink-0">
              Popular:
            </span>
            {popularArticles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="text-sm text-[#3D5A6C] hover:text-[#5C7A4B] whitespace-nowrap transition-colors"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#3D5A6C] mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600">
              Select a category to find what you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#F2C94C] rounded-xl flex items-center justify-center text-[#3D5A6C] flex-shrink-0">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-[#3D5A6C] text-lg">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article.title}>
                        <Link
                          href={article.href}
                          className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg text-gray-600 hover:bg-[#F5EFD4] hover:text-[#3D5A6C] transition-colors group"
                        >
                          <span className="text-sm">{article.title}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] rounded-2xl p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageCircle className="w-10 h-10 mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">
                Contact Support
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Can&apos;t find what you need? Our team is here to help.
              </p>
              <Link
                href="/routes/contact"
                className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#E0B63A] transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </Link>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-2xl p-8 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <HelpCircle className="w-10 h-10 text-[#3D5A6C] mb-4" />
              <h3 className="font-heading font-bold text-xl text-[#3D5A6C] mb-2">
                FAQ
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Quick answers to the most common questions.
              </p>
              <Link
                href="/routes/faq"
                className="inline-flex items-center gap-2 text-[#3D5A6C] font-semibold text-sm hover:underline"
              >
                View FAQ
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-2xl p-8 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="w-10 h-10 text-[#3D5A6C] mb-4" />
              <h3 className="font-heading font-bold text-xl text-[#3D5A6C] mb-2">
                Trust & Safety
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn how we protect your data and privacy.
              </p>
              <Link
                href="/routes/privacy"
                className="inline-flex items-center gap-2 text-[#3D5A6C] font-semibold text-sm hover:underline"
              >
                Privacy Policy
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[#3D5A6C] to-[#5C7A4B] text-white">
        <div className="container-custom">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-white/80 mb-8">
              Our team typically responds within 24-48 hours. We&apos;re here to make
              your Curious Muslim experience wonderful.
            </p>
            <Link
              href="/routes/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
