"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  BookOpen,
  Users,
  Target,
  Sparkles,
  Star,
  ArrowRight,
  Quote,
} from "lucide-react";

export default function AboutPage() {
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
              <Heart className="w-4 h-4" />
              <span>Our Story</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Nurturing Curious Muslim Hearts
            </h1>

            <p className="text-xl text-white leading-relaxed">
              We believe every Muslim child deserves to fall in love with their faith
              through stories that speak to their hearts and answer the questions
              in their minds.
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

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-6">
                Why We Started Curious Muslim
              </h2>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  As Muslim parents raising children in the West, we noticed something
                  missing. Our kids were surrounded by engaging content about everything
                  <em> except</em> their own faith and heritage.
                </p>

                <p>
                  Islamic books often felt dry, distant, or disconnected from the
                  reality our children live in. We wanted something different—something
                  that would make our kids <strong>excited</strong> to learn about
                  Prophet Muhammad, not because they had to, but because they
                  genuinely wanted to.
                </p>

                <p>
                  So we created the book we wished we had: warm, beautiful, and real.
                  A book where children see themselves in the questions being asked.
                  A book that treats them as the intelligent, curious souls they are.
                </p>
              </div>

              <div className="mt-8 p-6 bg-[#F5EFD4] rounded-2xl">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-[#F2C94C] flex-shrink-0" />
                  <div>
                    <p className="text-[#3D5A6C] font-medium italic">
                      &quot;The best stories are the ones that help children discover
                      who they are and who they can become.&quot;
                    </p>
                    <p className="text-sm text-gray-500 mt-2">— The Curious Muslim Team</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-[#6A8E9E] to-[#3D5A6C] rounded-3xl p-8 md:p-12 text-center shadow-xl">
                <div className="text-8xl mb-6">📚</div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  To create Islamic content that sparks curiosity, builds identity,
                  and helps Muslim children feel proud of who they are.
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 bg-[#F2C94C] rounded-full p-4 shadow-lg">
                <Star className="w-6 h-6 text-[#3D5A6C]" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#A4C997] rounded-full p-4 shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-4">
              What We Believe In
            </h2>
            <p className="text-xl text-gray-600">
              These principles guide everything we create at Curious Muslim.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Heart className="w-7 h-7" />,
                title: "Love First",
                description:
                  "Children learn best when they feel loved and safe. We lead with warmth, not fear.",
                color: "#F2C94C",
              },
              {
                icon: <BookOpen className="w-7 h-7" />,
                title: "Authentic Stories",
                description:
                  "Every story is rooted in authentic Islamic sources, presented in accessible ways.",
                color: "#5C7A4B",
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: "Representation",
                description:
                  "Muslim children deserve to see themselves reflected in the media they consume.",
                color: "#3D5A6C",
              },
              {
                icon: <Target className="w-7 h-7" />,
                title: "Real Questions",
                description:
                  "We don&apos;t shy away from the questions kids actually ask. We embrace curiosity.",
                color: "#6A8E9E",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="card text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: value.color }}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-to-br from-[#F5EFD4] to-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-4">
              The Team Behind Curious Muslim
            </h2>
            <p className="text-xl text-gray-600">
              We&apos;re a small team of Muslim parents, educators, writers, and artists
              united by a shared vision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                role: "Story & Content",
                emoji: "✍️",
                description:
                  "Writers with backgrounds in Islamic studies and children's literature who craft every word with care.",
                color: "#3D5A6C",
              },
              {
                role: "Art & Design",
                emoji: "🎨",
                description:
                  "Talented illustrators who bring the stories to life with beautiful, respectful artwork.",
                color: "#5C7A4B",
              },
              {
                role: "Education & Review",
                emoji: "📖",
                description:
                  "Islamic educators and scholars who ensure accuracy and age-appropriateness.",
                color: "#6A8E9E",
              },
            ].map((member, index) => (
              <motion.div
                key={member.role}
                className="bg-white rounded-2xl p-8 shadow-soft text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl"
                  style={{ backgroundColor: `${member.color}20` }}
                >
                  {member.emoji}
                </div>
                <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mb-2">
                  {member.role}
                </h3>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-gray-500 mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            We&apos;re based across the US, Canada, and UK—a truly global team
            working together to serve Muslim families everywhere.
          </motion.p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "500+", label: "Families on Waitlist" },
                  { number: "12", label: "Chapters of Seerah" },
                  { number: "64", label: "Full-Color Pages" },
                  { number: "3", label: "Curious Children Characters" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-2xl p-6 text-center shadow-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-6">
                The Impact We&apos;re Making
              </h2>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Every pre-order, every newsletter signup, every share on social media
                  brings us closer to our goal: putting this book in the hands of
                  Muslim families who need it.
                </p>

                <p>
                  But we&apos;re not just creating a book—we&apos;re building a movement.
                  A community of parents who believe their children deserve better
                  Islamic content. A generation of kids who will grow up proud of
                  their faith.
                </p>

                <p className="font-semibold text-[#3D5A6C]">
                  This is just the beginning. Prophet Muhammad&apos;s story is the first
                  of many we plan to tell.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[#3D5A6C] to-[#5C7A4B] text-white">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Join Us on This Journey
            </h2>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Whether you&apos;re a parent, teacher, or someone who cares about
              the next generation of Muslims—we&apos;d love to have you with us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/routes/book"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <span>Pre-Order the Book</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/routes/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Get in Touch</span>
              </Link>
            </div>

            <p className="text-white/70 text-sm mt-8">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            <p className="text-white/60 text-xs mt-2">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
