"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UniversityLogo from "./UniversityLogo";
import LogoCAR from "./LogoCAR";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if preloader has already run during this session
    const hasLoaded = typeof window !== "undefined" && sessionStorage.getItem("car_lab_preloader_run");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Fake loading progress on first site visit or hard refresh
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("car_lab_preloader_run", "true");
            }
          }, 500);
          return 100;
        }
        const diff = Math.random() * 20 + 5;
        return Math.min(prev + diff, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6"
        >
          {/* Decorative grid overlay for technical look */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Central content container */}
          <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
            {/* Container holding DTU Seal & CAR Lab Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center gap-5 sm:gap-7 px-8 py-5 mb-8 rounded-3xl bg-charcoal-50 ring-1 ring-primary-100 glow-maroon shadow-sm"
            >
              <UniversityLogo size={105} />
              <div className="h-14 w-[1.5px] bg-charcoal-300/60" />
              <LogoCAR size={120} />
            </motion.div>

            {/* Typography Section */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs md:text-sm font-bold tracking-widest text-primary-700 uppercase"
            >
              Welcome to CAR | Delhi Technological University
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-2 text-xl md:text-2xl font-black text-charcoal-900 tracking-wide"
            >
              Computer Automation and Research Laboratory
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-1 text-xs md:text-sm font-bold uppercase tracking-wider text-charcoal-600"
            >
              Department of Computer Science and Engineering
            </motion.p>

            {/* Sleek linear progress bar container */}
            <div className="relative w-64 md:w-80 h-[3px] bg-charcoal-100 rounded-full overflow-hidden mt-6">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-primary-700 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            {/* Progress Percentage */}
            <motion.span 
              className="text-[10px] font-mono text-charcoal-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
            >
              {Math.round(progress)}% Loaded
            </motion.span>

            {/* Vision statement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 text-xs md:text-sm font-medium italic text-charcoal-500 leading-relaxed border-t border-charcoal-100 pt-4"
            >
              "Connecting Research, Shaping Humanity... Fostering Global Collaboration"
            </motion.p>
          </div>

          {/* Tiny CAR Monogram at absolute bottom */}
          <div className="absolute bottom-8 flex flex-col items-center">
            <LogoCAR size={60} />
            <span className="text-[9px] uppercase tracking-widest text-charcoal-500 mt-1 font-semibold">
              CAR Lab DTU
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
