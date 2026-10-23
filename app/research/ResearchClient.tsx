"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ExternalLink, BookText, FileText } from "lucide-react";
import { motion } from "framer-motion";

type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: string;
  link: string;
};

export default function ResearchClient({ publications }: { publications: Publication[] }) {
  return (
    <>
      <Header />
      
      <main className="flex-grow pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-charcoal-500 hover:text-primary-700 transition-colors mb-8 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="mb-12 border-l-4 border-primary-700 pl-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-charcoal-900">
              Research & Publications
            </h1>
            <p className="text-sm font-semibold text-charcoal-500 uppercase tracking-widest mt-2 max-w-3xl leading-relaxed">
              Explore our latest peer-reviewed contributions to robotics, cybersecurity, and artificial intelligence.
            </p>
          </div>

          <div className="space-y-6">
            {publications.length === 0 ? (
              <div className="text-center py-16 bg-charcoal-50/50 rounded-2xl border border-charcoal-100">
                <p className="text-charcoal-500 font-medium">No publications found.</p>
              </div>
            ) : (
              publications.map((pub, idx) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-charcoal-200/60 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-primary-200 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-charcoal-100 text-charcoal-700 px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                          {pub.type === "Journal" ? <BookText size={12} /> : <FileText size={12} />}
                          {pub.type}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-700">
                          {pub.year}
                        </span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-black text-charcoal-900 leading-tight group-hover:text-primary-700 transition-colors">
                        {pub.title}
                      </h3>
                      
                      <p className="text-sm font-bold text-accent-700 mt-2">
                        {pub.authors}
                      </p>
                      <p className="text-xs text-charcoal-500 font-medium mt-1 uppercase tracking-wider">
                        {pub.venue}
                      </p>
                    </div>
                    
                    <div className="sm:pl-6 sm:border-l border-charcoal-100 flex items-center sm:items-start sm:flex-col justify-end gap-3 flex-shrink-0">
                      <a
                        href={pub.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-primary-50 text-primary-700 hover:bg-primary-700 hover:text-white border border-primary-200 hover:border-primary-700 text-[10px] font-black uppercase tracking-widest rounded transition-all w-full sm:w-auto"
                      >
                        View PDF <ExternalLink size={12} className="ml-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
