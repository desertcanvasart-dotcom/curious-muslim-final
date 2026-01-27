"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EntranceAnimationProps {
  children: React.ReactNode;
}

export default function EntranceAnimation({ children }: EntranceAnimationProps) {
  const [phase, setPhase] = useState<"entrance" | "transition" | "complete">("entrance");

  useEffect(() => {
    // Check if animation was already shown this session
    const hasSeenAnimation = sessionStorage.getItem("hasSeenEntrance");
    if (hasSeenAnimation) {
      setPhase("complete");
      return;
    }

    // Faster timings - entrance for 2s, then quick transition
    const transitionTimer = setTimeout(() => setPhase("transition"), 2000);
    const completeTimer = setTimeout(() => {
      setPhase("complete");
      sessionStorage.setItem("hasSeenEntrance", "true");
    }, 2800); // Reduced from 4000 to 2800

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase !== "complete" && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#3D5A6C] via-[#2A3F4D] to-[#1a2830]"
              animate={
                phase === "transition"
                  ? { opacity: 0 }
                  : { opacity: 1 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Animated stars */}
            <Stars phase={phase} />

            {/* Logo container - animates from center to header position */}
            <motion.div
              className="absolute z-10 flex items-center gap-3"
              initial={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={
                phase === "entrance"
                  ? {
                      top: "50%",
                      left: "50%",
                      x: "-50%",
                      y: "-50%",
                      scale: 1,
                    }
                  : {
                      top: "16px",
                      left: "16px",
                      x: "0%",
                      y: "0%",
                      scale: 1,
                    }
              }
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Moon emoji with glow */}
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Glow effect - fades during transition */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#F2C94C] blur-2xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: phase === "entrance" ? 0.5 : 0,
                    scale: phase === "entrance" ? 1.5 : 0.5,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Moon - shrinks during transition */}
                <motion.span
                  className="relative block select-none"
                  animate={{
                    fontSize: phase === "entrance" ? "100px" : "36px",
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  🌙
                </motion.span>
              </motion.div>

              {/* Brand text - appears then transforms */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.h1
                  className="font-heading font-bold text-white leading-tight"
                  animate={{
                    fontSize: phase === "entrance" ? "2.5rem" : "1.5rem",
                    textShadow:
                      phase === "entrance"
                        ? "0 0 30px rgba(242,201,76,0.4)"
                        : "none",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  Curious Muslim
                </motion.h1>
                <motion.p
                  className="font-medium leading-tight"
                  animate={{
                    fontSize: phase === "entrance" ? "1.125rem" : "0.75rem",
                    color: phase === "entrance" ? "#F2C94C" : "#5C7A4B",
                    marginTop: phase === "entrance" ? "4px" : "-2px",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  Stories of the Prophets
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Decorative elements that fade out */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-16 flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: phase === "entrance" ? 1 : 0,
                y: phase === "entrance" ? 0 : -20,
              }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {/* Decorative line */}
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-[#F2C94C] to-transparent"
                initial={{ width: 0 }}
                animate={{ width: phase === "entrance" ? 150 : 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              />

              {/* Loading indicator */}
              <motion.div
                className="flex gap-2 mt-6"
                animate={{ opacity: phase === "entrance" ? 1 : 0 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#F2C94C]"
                    animate={{
                      y: [0, -6, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* White overlay that sweeps up */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ y: "100%" }}
              animate={{
                y: phase === "transition" ? "0%" : "100%",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - visible immediately but behind entrance */}
      <div
        style={{
          opacity: phase === "complete" ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}

// Stars component
type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
};

function Stars({ phase }: { phase: string }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 1,
        duration: Math.random() * 1.5 + 0.5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            phase === "entrance"
              ? {
                  opacity: [0, 0.8, 0.4, 0.8],
                  scale: 1,
                }
              : {
                  opacity: 0,
                  scale: 0,
                }
          }
          transition={{
            duration: star.duration,
            delay: star.delay * 0.2,
            repeat: phase === "entrance" ? Infinity : 0,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Single shooting star */}
      {phase === "entrance" && <ShootingStar />}
    </div>
  );
}

function ShootingStar() {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        top: "15%",
        left: "75%",
        boxShadow: "0 0 4px 1px rgba(255,255,255,0.6)",
      }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [0, -150],
        y: [0, 100],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 0.8,
        delay: 0.8,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div
        className="absolute top-0 right-0 w-16 h-[1px] origin-right"
        style={{
          background: "linear-gradient(to left, rgba(255,255,255,0.6), transparent)",
          transform: "rotate(-35deg)",
        }}
      />
    </motion.div>
  );
}
