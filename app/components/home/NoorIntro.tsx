"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NoorIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Noor Image Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative text-center">
              <div className="mx-auto w-[22rem] max-w-full rounded-3xl bg-white p-5 shadow-xl">
                <Image
                  src="/images/characters/noor-portrait.png"
                  alt="Noor"
                  width={512}
                  height={512}
                  className="mx-auto h-auto w-full rounded-2xl object-contain"
                  priority
                />
              </div>
              <h3 className="mt-6 text-3xl font-heading font-bold text-[#3D5A6C]">
                Noor
              </h3>
              <p className="text-[#5C7A4B] text-lg">The Storyteller</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block bg-[#F5EFD4] text-[#5C7A4B] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Meet Your Narrator
            </div>

            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#3D5A6C] mb-6">
              Who is Noor?
            </h2>

            <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-8">
              <p>
                Noor is that trusted family friend who always knows how to
                explain things in a way that makes sense. He is warm, patient,
                and has a gift for making history feel alive.
              </p>

              <p>
                When he sits down with Adam, Hana, and Mansour to tell them
                about the Prophet Muhammad, it is not a lecture—it is a
                conversation. The kids interrupt with questions, make jokes, and
                react emotionally, just like your child would.
              </p>

              <p className="font-semibold text-[#3D5A6C]">
                Through Noor&apos;s voice, the Prophet&apos;s story becomes
                personal, relatable, and unforgettable.
              </p>
            </div>

            {/* Features */}
            <div className="bg-[#F5EFD4] rounded-2xl p-6 mb-8">
              <h4 className="font-heading font-bold text-[#3D5A6C] mb-4">
                What Makes Noor Special:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#F2C94C] text-xl flex-shrink-0">
                    ✦
                  </span>
                  <span className="text-gray-700">
                    Speaks in simple, modern English kids actually understand
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F2C94C] text-xl flex-shrink-0">
                    ✦
                  </span>
                  <span className="text-gray-700">
                    Breaks down big ideas into kid-friendly explanations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F2C94C] text-xl flex-shrink-0">
                    ✦
                  </span>
                  <span className="text-gray-700">
                    Connects the Prophet&apos;s life to challenges kids face
                    today
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F2C94C] text-xl flex-shrink-0">
                    ✦
                  </span>
                  <span className="text-gray-700">
                    Never talks down to children—respects their curiosity
                  </span>
                </li>
              </ul>
            </div>

            <Link
              href="/characters"
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>Meet All the Characters</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
