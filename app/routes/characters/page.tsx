"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  BookOpen,
  Star,
  ChevronRight,
  Quote,
  Users,
} from "lucide-react";
import { characters, getCharacterById } from "@/app/lib/constants/characters";
import { chapters, getChaptersByCharacter } from "@/app/lib/constants/chapters";

const characterEmojis: Record<string, string> = {
  noor: "🌟",
  adam: "👦",
  hana: "👧",
  mansour: "😄",
};

const characterQuotes: Record<string, string> = {
  noor: "Every story has a lesson, and every lesson brings us closer to understanding the beautiful character of our beloved Prophet.",
  adam: "Sometimes I wonder if the Prophet ever felt different from everyone else, just like I do at school.",
  hana: "Why did people hurt the Prophet when all he wanted was to share Allah's message? That doesn't seem fair!",
  mansour: "You know what's cool? The Prophet had a great sense of humor too! He used to smile a lot.",
};

export default function CharactersPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const activeCharacter = selectedCharacter
    ? getCharacterById(selectedCharacter)
    : null;

  const activeCharacterChapters = selectedCharacter
    ? getChaptersByCharacter(selectedCharacter)
    : [];

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
              <Users className="w-4 h-4" />
              <span>Meet Our Friends</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Meet the Characters
            </h1>

            <p className="text-xl text-white leading-relaxed mb-8">
              Four lovable characters who will guide you through the incredible
              life of Prophet Muhammad. Each one brings their own curiosity,
              questions, and perspective.
            </p>

            {/* Character Quick Select */}
            <div className="flex justify-center gap-4 flex-wrap">
              {characters.map((char) => (
                <motion.button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char.id)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{characterEmojis[char.id]}</span>
                  <span>{char.name}</span>
                </motion.button>
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

      {/* Character Cards Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="bg-white rounded-3xl shadow-card hover:shadow-soft transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() =>
                    setSelectedCharacter(
                      selectedCharacter === character.id ? null : character.id
                    )
                  }
                >
                  {/* Character Header */}
                  <div
                    className="p-8 relative overflow-hidden"
                    style={{ backgroundColor: character.color + "15" }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                      style={{ backgroundColor: character.color, transform: "translate(30%, -30%)" }}
                    />

                    <div className="flex items-start gap-6">
                      <div
                        className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0"
                        style={{ backgroundColor: character.color + "30" }}
                      >
                        {characterEmojis[character.id]}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-heading font-bold text-[#3D5A6C]">
                            {character.name}
                          </h2>
                          <span
                            className="text-lg font-arabic"
                            style={{ color: character.color }}
                          >
                            {character.arabicName}
                          </span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">
                          {character.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Character Details */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Personality */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-4 h-4" style={{ color: character.color }} />
                          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Personality
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{character.personality}</p>
                      </div>

                      {/* Fun Fact */}
                      <div className="bg-[#F5EFD4] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-[#F2C94C]" />
                          <span className="text-sm font-semibold text-[#3D5A6C]">
                            Fun Fact
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{character.funFact}</p>
                      </div>

                      {/* Quote */}
                      <div className="border-l-4 pl-4" style={{ borderColor: character.color }}>
                        <Quote className="w-5 h-5 mb-2" style={{ color: character.color }} />
                        <p className="text-gray-600 text-sm italic">
                          &quot;{characterQuotes[character.id]}&quot;
                        </p>
                      </div>
                    </div>

                    {/* View Chapters Button */}
                    <button
                      className="mt-6 w-full py-3 rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: character.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCharacter(character.id);
                        document.getElementById("chapters-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <BookOpen className="w-4 h-4" />
                      See {character.name}&apos;s Chapters
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D5A6C] mb-4">
              {selectedCharacter && activeCharacter
                ? `${activeCharacter.name}'s Story Appearances`
                : "Explore Their Stories"}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {selectedCharacter
                ? `See the chapters where ${activeCharacter?.name} appears and learns alongside you`
                : "Select a character above to see which chapters they appear in"}
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
                <span>{characterEmojis[char.id]}</span>
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
                    className="bg-gradient-to-br from-[#F5EFD4] to-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#3D5A6C] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {chapter.id}
                      </span>
                      <div className="flex gap-1">
                        {chapter.characters.map((charId) => (
                          <span
                            key={charId}
                            className="text-lg"
                            title={getCharacterById(charId)?.name}
                          >
                            {characterEmojis[charId]}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-[#3D5A6C] text-lg mb-2">
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              A Special Bond
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              These four friends learn together, question together, and grow in
              their love for the Prophet together
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-4 text-[#F2C94C]">
                    How They Learn
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Noor shares stories from the Seerah",
                      "Adam asks thoughtful, deep questions",
                      "Hana speaks up when something seems unfair",
                      "Mansour adds humor and light-hearted moments",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-[#F2C94C] flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl mb-4 text-[#F2C94C]">
                    Why It Works
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Each character represents different aspects of a child&apos;s
                    curiosity. Some children are reflective like Adam, others are
                    outspoken like Hana, and many love to laugh like Mansour.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Together, they create a safe space where all questions are
                    welcome and learning about Islam becomes an adventure.
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
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-2"
                      style={{ backgroundColor: char.color + "40" }}
                    >
                      {characterEmojis[char.id]}
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
                  <span key={char.id} className="text-3xl">
                    {characterEmojis[char.id]}
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
                  href="/routes/book"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Get the Book
                </Link>
                <Link
                  href="/routes/ask-noor"
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
