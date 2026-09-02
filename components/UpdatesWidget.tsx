"use client";

import React, { useState } from "react";
import { Bell, X, ExternalLink, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Update {
  id: string | number;
  date: string;
  title: string;
  description: string;
  link: string;
}

export default function UpdatesWidget({ updates = [] }: { updates?: Update[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary-700 hover:bg-primary-600 text-white rounded-full p-4 shadow-2xl hover:shadow-primary-700/50 transition-all duration-300 group flex items-center justify-center"
        aria-label="Toggle Updates"
      >
        {isOpen ? (
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <div className="relative">
            <Bell size={24} className="group-hover:animate-wiggle" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500 border border-primary-700"></span>
            </span>
          </div>
        )}
      </button>

      {/* Updates Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-charcoal-200/50 z-50 overflow-hidden flex flex-col max-h-[60vh]"
          >
            {/* Header */}
            <div className="bg-charcoal-900 px-5 py-4 flex items-center justify-between shadow-md relative z-10">
              <div>
                <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                  <Bell size={16} className="text-accent-400" />
                  Live Updates
                </h3>
                <p className="text-charcoal-300 text-[10px] font-medium tracking-wider mt-0.5">
                  LATEST NEWS & ANNOUNCEMENTS
                </p>
              </div>
            </div>

            {/* Scrolling Content - Well-mannered vertically floating list */}
            <div className="flex-1 overflow-hidden relative bg-charcoal-50/30">
              {/* Fade masks for smooth scroll effect */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              
              <div className="overflow-y-auto h-full p-2 custom-scrollbar">
                <div className="flex flex-col space-y-2 p-2">
                  {updates.map((update, idx) => (
                    <motion.a
                      href={update.link}
                      key={update.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group block bg-white border border-charcoal-100 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[9px] font-bold text-accent-700 uppercase tracking-widest bg-accent-50 px-2 py-0.5 rounded">
                          {update.date}
                        </span>
                        <ExternalLink size={12} className="text-charcoal-300 group-hover:text-primary-600 transition-colors" />
                      </div>
                      <h4 className="text-xs font-black text-charcoal-900 uppercase tracking-wider mt-2 group-hover:text-primary-700 transition-colors">
                        {update.title}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 leading-relaxed mt-1.5 font-medium line-clamp-2">
                        {update.description}
                      </p>
                      <div className="mt-3 flex items-center text-[10px] font-bold text-primary-600 uppercase tracking-wider group-hover:gap-1 transition-all">
                        Read More <ChevronRight size={12} />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-charcoal-50 p-3 border-t border-charcoal-100 text-center">
              <Link href="/updates" className="text-[10px] font-black uppercase tracking-widest text-charcoal-500 hover:text-primary-700 transition-colors" onClick={() => setIsOpen(false)}>
                View All Announcements
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
