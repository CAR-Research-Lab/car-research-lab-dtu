"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Update {
  id: string | number;
  date: string;
  title: string;
  description: string;
  link: string;
}

export default function UpdatesClient({ updates }: { updates: Update[] }) {
  return (
    <>
      <Header />
      
      <main className="flex-grow pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-charcoal-500 hover:text-primary-700 transition-colors mb-8 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="mb-12 border-l-4 border-primary-700 pl-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-charcoal-900">
              News & Announcements
            </h1>
            <p className="text-sm font-semibold text-charcoal-500 uppercase tracking-widest mt-2 max-w-3xl leading-relaxed">
              Stay up-to-date with the latest research breakthroughs, lab updates, and global collaborations.
            </p>
          </div>

          <div className="space-y-6">
            {updates.length === 0 ? (
              <div className="text-center py-20 bg-charcoal-50/50 rounded-2xl border border-charcoal-100">
                <p className="text-charcoal-500 font-medium">No announcements published yet.</p>
              </div>
            ) : (
              updates.map((update, idx) => (
                <motion.a
                  href={update.link || "#"}
                  key={update.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="block bg-white border border-charcoal-200/60 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-primary-200 transition-all group relative overflow-hidden"
                >
                  {/* Subtle accent line on hover */}
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-accent-50 text-accent-700 px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                          <Calendar size={12} />
                          {update.date}
                        </span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-black text-charcoal-900 leading-tight group-hover:text-primary-700 transition-colors">
                        {update.title}
                      </h3>
                      
                      <p className="text-sm text-charcoal-500 font-medium mt-3 leading-relaxed">
                        {update.description}
                      </p>
                    </div>
                    
                    {update.link && update.link !== "#" && update.link !== "" && (
                      <div className="sm:pl-6 sm:border-l border-charcoal-100 flex items-center sm:items-start sm:flex-col justify-end gap-3 flex-shrink-0 mt-4 sm:mt-0">
                        <span className="inline-flex items-center justify-center px-4 py-2 bg-charcoal-50 text-charcoal-700 group-hover:bg-primary-700 group-hover:text-white border border-charcoal-200 group-hover:border-primary-700 text-[10px] font-black uppercase tracking-widest rounded transition-all w-full sm:w-auto">
                          Read More <ExternalLink size={12} className="ml-2" />
                        </span>
                      </div>
                    )}
                  </div>
                </motion.a>
              ))
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
