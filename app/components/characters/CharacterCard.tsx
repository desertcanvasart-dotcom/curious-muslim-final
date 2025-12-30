"use client";

import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { Character } from "@/app/types/character";

interface CharacterCardProps {
  character: Character;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export default function CharacterCard({
  character,
  variant = "default",
  className,
}: CharacterCardProps) {
  const { name, arabicName, description, personality, funFact, imagePath, color } = character;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-4 p-4 bg-white rounded-xl shadow-card hover:shadow-soft transition-all",
          className
        )}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
          style={{ backgroundColor: `${color}20` }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {imagePath ? (
              <Image
                src={imagePath}
                alt={name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-xl font-bold">
                {name.charAt(0)}
              </span>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-heading font-bold text-primary">{name}</h3>
          {arabicName && (
            <p className="text-sm text-gray-500 font-arabic">{arabicName}</p>
          )}
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className={cn(
          "bg-white rounded-2xl shadow-soft overflow-hidden",
          className
        )}
      >
        <div
          className="h-48 flex items-center justify-center"
          style={{ backgroundColor: `${color}30` }}
        >
          {imagePath ? (
            <Image
              src={imagePath}
              alt={name}
              width={150}
              height={150}
              className="object-contain"
            />
          ) : (
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <span className="text-white text-5xl font-bold">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl font-heading font-bold text-primary">
              {name}
            </h3>
            {arabicName && (
              <span className="text-xl text-gray-400 font-arabic">
                {arabicName}
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
          <div className="space-y-3">
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${color}10` }}
            >
              <p className="text-sm font-medium text-gray-700">
                <span className="font-semibold">Personality:</span> {personality}
              </p>
            </div>
            {funFact && (
              <div className="p-3 bg-accent/10 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Fun Fact:</span> {funFact}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-card hover:shadow-soft transition-all duration-300 overflow-hidden group",
        className
      )}
    >
      <div
        className="h-40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
        style={{ backgroundColor: `${color}20` }}
      >
        {imagePath ? (
          <Image
            src={imagePath}
            alt={name}
            width={120}
            height={120}
            className="object-contain"
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: color }}
          >
            <span className="text-white text-4xl font-bold">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-heading font-bold text-primary">{name}</h3>
          {arabicName && (
            <span className="text-gray-400 font-arabic">{arabicName}</span>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
