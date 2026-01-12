"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { characters } from "@/app/lib/constants/characters";

export default function CharactersPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-[#F5EFD4] text-[#5C7A4B] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Your Child's New Friends
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#3D5A6C] mb-6">
            Meet the Characters
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            These aren't just characters in a book—they're friends your child will relate to.
            Each one asks the questions your child might be thinking, making every story feel personal.
          </p>
        </div>

        {/* Characters Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {characters.map((character) => (
            <div
              key={character.id}
              className="group bg-gradient-to-br from-[#F5EFD4] to-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Character Avatar */}
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg"
                style={{ backgroundColor: character.color }}
              >
                {character.id === "noor" && "👨‍🏫"}
                {character.id === "adam" && "👦"}
                {character.id === "hana" && "👧"}
                {character.id === "mansour" && "🧒"}
              </div>

              {/* Name */}
              <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mb-1">
                {character.name}
              </h3>
              <p className="text-sm text-[#5C7A4B] font-medium mb-3">
                {character.arabicName}
              </p>

              {/* Short Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {character.personality.split(".")[0]}.
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/characters"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>Meet All the Characters</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
