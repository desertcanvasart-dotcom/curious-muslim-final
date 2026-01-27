"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  BookOpen,
  Star,
  Quote,
  Users,
  MessageCircle,
} from "lucide-react";
import { characters, getCharacterById } from "@/app/lib/constants/characters";
import { chapters, getChaptersByCharacter } from "@/app/lib/constants/chapters";

const characterImages: Record<string, string> = {
  noor: "/images/characters/noor-head.png",
  adam: "/images/characters/adam-head.png",
  hana: "/images/characters/hana-head.png",
  mansour: "/images/characters/mansour-head.png",
};

const characterRoles: Record<string, string> = {
  noor: "The Storyteller",
  adam: "The Questioner",
  hana: "The Thinker",
  mansour: "The Heart",
};

const characterBestFor: Record<string, string> = {
  noor: "children who love listening to stories and learning new things",
  adam: "children who ask deep questions and want to understand why",
  hana: "children who care about fairness and speaking up for what's right",
  mansour: "children who learn best through laughter and joy",
};

const characterQuotes: Record<string, string> = {
  noor: "Every story has a lesson, and every lesson brings us closer to understanding the beautiful character of our beloved Prophet.",
  adam: "Sometimes I wonder if the Prophet ever felt different from everyone else, just like I do at school.",
  hana: "Why did people hurt the Prophet when all he wanted was to share Allah's message? That doesn't seem fair!",
  mansour: "You know what's cool? The Prophet had a great sense of humor too! He used to smile a lot.",
};

// Playful offsets for children cards
const childrenOffsets = [
  { rotate: -2, translateY: 0 },
  { rotate: 1, translateY: 12 },
  { rotate: -1, translateY: -8 },
];

const childrenColors = {
  adam: { bg: "from-blue-50 to-indigo-50", accent: "#4A90A4" },
  hana: { bg: "from-pink-50 to-rose-50", accent: "#E88B8C" },
  mansour: { bg: "from-amber-50 to-yellow-50", accent: "#F2C94C" },
};

export default function CharactersPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const activeCharacter = selectedCharacter
    ? getCharacterById(selectedCharacter)
    : null;

  const activeCharacterChapters = selectedCharacter
    ? getChaptersByCharacter(selectedCharacter)
    : [];

  const noor = characters.find(c => c.id === "noor");
  const childrenCharacters = characters.filter(c => c.id !== "noor");

  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Section with Character Avatars */}
      <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden min-h-[550px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20" />
        </div>

        {/* Floating Character Avatars - Left Side */}
        <motion.div
          className="absolute left-[5%] top-[20%] hidden lg:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm p-1 shadow-lg"
          >
            <Image
              src={characterImages.noor}
              alt="Noor"
              width={80}
              height={80}
              className="w-full h-full object-contain rounded-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute left-[12%] bottom-[25%] hidden lg:block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm p-1 shadow-lg"
          >
            <Image
              src={characterImages.adam}
              alt="Adam"
              width={64}
              height={64}
              className="w-full h-full object-contain rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Floating Character Avatars - Right Side */}
        <motion.div
          className="absolute right-[8%] top-[25%] hidden lg:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-18 h-18 rounded-full bg-white/20 backdrop-blur-sm p-1 shadow-lg"
          >
            <Image
              src={characterImages.hana}
              alt="Hana"
              width={72}
              height={72}
              className="w-[72px] h-[72px] object-contain rounded-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute right-[15%] bottom-[20%] hidden lg:block"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm p-1 shadow-lg"
          >
            <Image
              src={characterImages.mansour}
              alt="Mansour"
              width={56}
              height={56}
              className="w-full h-full object-contain rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Decorative stars/sparkles */}
        <motion.div
          className="absolute left-[20%] top-[15%] text-[#F2C94C] hidden md:block"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="absolute right-[25%] top-[20%] text-[#F2C94C] hidden md:block"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <Star className="w-5 h-5" />
        </motion.div>
        <motion.div
          className="absolute right-[10%] bottom-[40%] text-[#F2C94C] hidden md:block"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

        <div className="container-custom relative z-10 py-12">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Users className="w-4 h-4" />
              <span>Meet Our Friends</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Meet the Characters
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              A wise storyteller and three curious children explore the
              beautiful life of Prophet Muhammad ﷺ together.
            </p>

            {/* Mobile character row */}
            <div className="flex justify-center gap-3 lg:hidden">
              {characters.map((char, index) => (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm p-1"
                >
                  <Image
                    src={characterImages[char.id]}
                    alt={char.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain rounded-full"
                  />
                </motion.div>
              ))}
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

      {/* NOOR - The Storyteller - Large Featured Card */}
      {noor && (
        <section className="section-padding pb-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="relative bg-gradient-to-br from-[#3D5A6C] to-[#2A4A5C] rounded-[2rem] overflow-hidden shadow-xl">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#5C7A4B]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F2C94C]/10 rounded-full blur-2xl" />

                <div className="relative z-10 p-8 md:p-12">
                  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Noor's Image - Large */}
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-[#F2C94C]/30 to-[#5C7A4B]/30 p-2">
                        <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Image
                            src={characterImages.noor}
                            alt="Noor"
                            width={200}
                            height={200}
                            className="w-40 h-40 md:w-48 md:h-48 object-contain"
                          />
                        </div>
                      </div>
                      {/* Storyteller badge */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-1.5 rounded-full font-bold text-sm whitespace-nowrap shadow-lg">
                        ✨ The Storyteller
                      </div>
                    </motion.div>

                    {/* Noor's Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                          Noor
                        </h2>
                        <span className="text-2xl font-arabic text-[#F2C94C]">
                          {noor.arabicName}
                        </span>
                      </div>

                      <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
                        {noor.description}
                      </p>

                      {/* Quote */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                        <Quote className="w-8 h-8 text-[#F2C94C] mb-3" />
                        <p className="text-white text-lg italic leading-relaxed">
                          &quot;{characterQuotes.noor}&quot;
                        </p>
                      </div>

                      {/* Stats/Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-xl p-4">
                          <Heart className="w-5 h-5 text-[#E88B8C] mb-2" />
                          <p className="text-white/80 text-sm font-medium">Personality</p>
                          <p className="text-white text-sm">{noor.personality}</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                          <Sparkles className="w-5 h-5 text-[#F2C94C] mb-2" />
                          <p className="text-white/80 text-sm font-medium">Fun Fact</p>
                          <p className="text-white text-sm">{noor.funFact}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <button
                          onClick={() => {
                            setSelectedCharacter("noor");
                            document.getElementById("chapters-section")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-[#F2C94C] hover:bg-[#E5BC3F] text-[#3D5A6C] px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <BookOpen className="w-5 h-5" />
                          Explore Noor&apos;s Stories
                        </button>
                        <Link
                          href="/ask-noor"
                          className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Ask Noor AI
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* The Children - Playful Scattered Layout */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-[#5C7A4B] uppercase tracking-wider mb-3">
              Noor&apos;s curious students
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-4">
              The Three Young Learners
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each child brings their unique perspective and questions to Noor&apos;s stories,
              making every lesson an adventure.
            </p>
          </motion.div>

          {/* Playful scattered cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {childrenCharacters.map((character, index) => {
              const offset = childrenOffsets[index];
              const colors = childrenColors[character.id as keyof typeof childrenColors];

              return (
                <motion.div
                  key={character.id}
                  className="relative"
                  initial={{ opacity: 0, y: 30, rotate: offset.rotate }}
                  whileInView={{ opacity: 1, y: offset.translateY, rotate: offset.rotate }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{
                    y: offset.translateY - 8,
                    rotate: 0,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div
                    className={`bg-gradient-to-br ${colors.bg} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white h-full`}
                  >
                    {/* Character header */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: colors.accent + "20" }}
                      >
                        <Image
                          src={characterImages[character.id]}
                          alt={character.name}
                          width={72}
                          height={72}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-[#3D5A6C]">
                          {character.name}
                        </h3>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: colors.accent }}
                        >
                          {characterRoles[character.id]}
                        </p>
                        <p className="text-xs font-arabic text-gray-500">
                          {character.arabicName}
                        </p>
                      </div>
                    </div>

                    {/* Best for badge */}
                    <div
                      className="rounded-xl p-3 mb-4 border-l-4"
                      style={{
                        backgroundColor: colors.accent + "10",
                        borderColor: colors.accent
                      }}
                    >
                      <p className="text-sm text-[#3D5A6C]">
                        <span className="font-semibold">Best for </span>
                        {characterBestFor[character.id]}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {character.description}
                    </p>

                    {/* Quote bubble */}
                    <div className="relative bg-white rounded-2xl p-4 shadow-sm">
                      <div
                        className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45"
                      />
                      <p className="text-gray-600 text-sm italic relative z-10">
                        &quot;{characterQuotes[character.id]}&quot;
                      </p>
                    </div>

                    {/* View chapters button */}
                    <button
                      onClick={() => {
                        setSelectedCharacter(character.id);
                        document.getElementById("chapters-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-5 w-full py-2.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 text-sm"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <BookOpen className="w-4 h-4" />
                      See {character.name}&apos;s Chapters
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Character Chapters Section */}
      <section id="chapters-section" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-[#5C7A4B] uppercase tracking-wider mb-3">
              {selectedCharacter ? "Filter by character" : "Discover the journey"}
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#3D5A6C] mb-4">
              {selectedCharacter && activeCharacter
                ? `${activeCharacter.name}'s Story Appearances`
                : "Explore Their Stories"}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {selectedCharacter
                ? `See the chapters where ${activeCharacter?.name} appears and learns alongside you`
                : "Select a character to see which chapters they appear in"}
            </p>
          </motion.div>

          {/* Character Filter Pills */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            <button
              onClick={() => setSelectedCharacter(null)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                !selectedCharacter
                  ? "bg-[#3D5A6C] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Characters
            </button>
            {characters.map((char) => (
              <button
                key={char.id}
                onClick={() => setSelectedCharacter(char.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCharacter === char.id
                    ? "text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor:
                    selectedCharacter === char.id ? char.color : undefined,
                }}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <Image
                    src={characterImages[char.id]}
                    alt={char.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full object-contain"
                  />
                </span>
                {char.name}
              </button>
            ))}
          </div>

          {/* Chapters Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCharacter || "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {(selectedCharacter ? activeCharacterChapters : chapters).map(
                (chapter) => (
                  <div
                    key={chapter.id}
                    className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#3D5A6C] text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm">
                        {chapter.id}
                      </span>
                      <div className="flex gap-1.5">
                        {chapter.characters.map((charId) => (
                          <span
                            key={charId}
                            className="opacity-80"
                            title={getCharacterById(charId)?.name}
                          >
                            <Image
                              src={characterImages[charId]}
                              alt={getCharacterById(charId)?.name ?? "Character"}
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full object-contain"
                            />
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-[#3D5A6C] text-xl mb-3">
                      {chapter.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {chapter.description}
                    </p>

                    <div className="bg-white/50 rounded-lg p-3 border border-[#3D5A6C]/10">
                      <p className="text-xs text-[#5C7A4B]">
                        <span className="font-semibold">Lesson:</span>{" "}
                        {chapter.lesson.substring(0, 80)}...
                      </p>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Character Relationships */}
      <section className="section-padding bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white drop-shadow-sm">
              A Special Bond
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto">
              Four friends learning and growing in faith — together.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-heading font-bold text-2xl mb-5 text-[#F2C94C]">
                    How They Learn
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Noor shares stories from the Seerah",
                      "Adam asks thoughtful questions",
                      "Hana speaks up for what's right",
                      "Mansour adds joy and laughter",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-[#F2C94C] flex-shrink-0 mt-0.5" />
                        <span className="text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-2xl mb-5 text-[#F2C94C]">
                    Why It Works
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Each character reflects a different way children explore their faith.
                    Together, they show that all questions are welcome — and learning
                    about Islam can be an adventure.
                  </p>
                </div>
              </div>

              {/* Character Mosaic */}
              <div className="flex justify-center gap-4 mt-8 pt-8 border-t border-white/20">
                {characters.map((char, index) => (
                  <motion.div
                    key={char.id}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-2 bg-white/10"
                      style={{ backgroundColor: char.color + "40" }}
                    >
                      <Image
                      src={characterImages[char.id]}
                      alt={char.name}
                      width={72}
                      height={72}
                      className="h-12 w-12 md:h-14 md:w-14 rounded-full object-contain"
                    />
                    </div>
                    <p className="text-sm font-medium">{char.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-3xl p-8 md:p-12 shadow-soft">
              <div className="flex justify-center gap-2 mb-6">
                {characters.map((char) => (
                  <span key={char.id} className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                    <Image
                      src={characterImages[char.id]}
                      alt={char.name}
                      width={72}
                      height={72}
                      className="h-12 w-12 md:h-14 md:w-14 rounded-full object-contain"
                    />
                  </span>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#3D5A6C] mb-4">
                Join Noor, Adam, Hana & Mansour
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                Start the journey today and let these four friends guide your
                family through the beautiful stories of Prophet Muhammad.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Get the Book
                </Link>
                <Link
                  href="/ask-noor"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Try Ask Noor AI
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
