"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Person = {
  id: string;
  name: string;
  role: string;
  focus: string;
  email: string;
  bio: string;
  category: string;
  initials: string;
  image?: { url: string };
  avatarBg?: string;
};

export default function PeopleClient({ people }: { people: Person[] }) {
  const generateSlug = (name: string) => name.toLowerCase().replace(/[\s.]+/g, '-');

  // Define categories layout
  const categories = [
    { id: "heads", title: "Current Heads & Faculty" },
    { id: "phd", title: "PhD Scholars" },
    { id: "postgrad", title: "Postgraduate Scholars" },
    { id: "undergrad", title: "Undergraduate Researchers" },
    { id: "alumni", title: "Notable Alumni" }
  ];

  // Helper to assign a random color gradient to people if not provided
  const gradients = [
    "from-primary-600 to-primary-800",
    "from-accent-600 to-accent-800",
    "from-charcoal-700 to-charcoal-900",
    "from-primary-700 to-accent-600",
    "from-emerald-600 to-emerald-800",
    "from-blue-600 to-blue-800",
  ];

  return (
    <>
      <Preloader />
      <Header />
      
      <main className="flex-grow pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/#people" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-charcoal-500 hover:text-primary-700 transition-colors mb-8 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="mb-16 border-l-4 border-primary-700 pl-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-charcoal-900">
              Our Community
            </h1>
            <p className="text-sm font-semibold text-charcoal-500 uppercase tracking-widest mt-2 max-w-3xl leading-relaxed">
              Meet the brilliant minds driving innovation at the Computer Automation and Research Laboratory.
            </p>
          </div>

          <div className="space-y-24">
            {categories.map((category) => {
              const categoryMembers = people.filter(p => p.category === category.id);
              
              if (categoryMembers.length === 0) return null;

              return (
                <section key={category.id} id={category.id}>
                  <div className="flex items-center mb-10">
                    <h2 className="text-2xl font-black uppercase tracking-widest text-charcoal-900 mr-6">
                      {category.title}
                    </h2>
                    <div className="flex-grow h-[1px] bg-charcoal-200" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {categoryMembers.map((member, idx) => {
                      const avatarBg = member.avatarBg || gradients[idx % gradients.length];
                      return (
                        <Link
                          key={member.name}
                          href={`/people/${generateSlug(member.name)}`}
                          className="group flex flex-col items-center"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="relative cursor-pointer transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1"
                          >
                            <div
                              className="w-32 h-36 bg-gradient-to-br fill-current overflow-hidden transition-all duration-300 filter grayscale contrast-125 group-hover:filter-none shadow-md"
                              style={{
                                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                              }}
                            >
                              {member.image?.url ? (
                                  <img
                                    src={member.image.url}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                ) : (
                                  <div className={`w-full h-full bg-gradient-to-br ${avatarBg} flex flex-col items-center justify-center text-white p-4 relative`}>
                                    <span className="text-xl font-bold font-mono tracking-wider text-accent-100/90 group-hover:scale-110 transition-transform duration-300">
                                      {member.initials || member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                                    </span>
                                    <div className="absolute inset-1 border border-white/10 group-hover:border-accent-200/30 transition-colors pointer-events-none" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                                  </div>
                                )}
                            </div>
                          </motion.div>
                          
                          <div className="mt-4 text-center">
                            <h3 className="text-xs font-black text-charcoal-900 uppercase tracking-widest group-hover:text-primary-700 transition-colors">
                              {member.name}
                            </h3>
                            <p className="text-[10px] font-bold text-charcoal-500 uppercase tracking-wider mt-1">
                              {member.role}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
