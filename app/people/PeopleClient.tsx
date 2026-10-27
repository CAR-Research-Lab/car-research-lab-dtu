"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Users, GraduationCap, Sparkles, BookOpen, UserCheck } from "lucide-react";

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
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const generateSlug = (name: string) => name.toLowerCase().replace(/[\s.]+/g, "-");

  // 5 Defined Hierarchy Levels strictly following Lab specifications
  const categories = [
    {
      id: "leads",
      aliases: ["leads", "heads"],
      title: "Lab Leads / PI",
      badge: "Principal Investigators & Faculty",
      description: "Directing strategic research, institutional initiatives, and fundamental lab directions.",
      icon: Sparkles,
    },
    {
      id: "phd",
      aliases: ["phd"],
      title: "PhD Scholars",
      badge: "Doctoral Researchers",
      description: "Pioneering deep fundamental research, algorithmic breakthroughs, and conference publications.",
      icon: BookOpen,
    },
    {
      id: "postgrad",
      aliases: ["postgrad", "mtech"],
      title: "MTech Students / Post Graduate",
      badge: "Postgraduate Researchers",
      description: "Driving applied intelligent systems, architecture design, and specialized research projects.",
      icon: GraduationCap,
    },
    {
      id: "undergrad",
      aliases: ["undergrad", "btech"],
      title: "Undergrad Students",
      badge: "Undergraduate Researchers",
      description: "Contributing to prototypes, software engineering, experiments, and research initiatives.",
      icon: Users,
    },
    {
      id: "alumni",
      aliases: ["alumni"],
      title: "Alumni",
      badge: "Former Lab Members",
      description: "Graduates and former researchers leading advancements across academia and industry globally.",
      icon: UserCheck,
    },
  ];

  // Helper to assign a random color gradient to people if no photo is provided
  const gradients = [
    "from-primary-600 to-primary-800",
    "from-accent-600 to-accent-800",
    "from-charcoal-700 to-charcoal-900",
    "from-primary-700 to-accent-600",
    "from-emerald-600 to-emerald-800",
    "from-blue-600 to-blue-800",
  ];

  const getCategoryMembers = (category: (typeof categories)[0]) => {
    return people.filter((p) =>
      category.aliases.includes(p.category?.toLowerCase() || "")
    );
  };

  const filteredCategories =
    selectedFilter === "all"
      ? categories
      : categories.filter((c) => c.id === selectedFilter);

  return (
    <>
      <Header />

      <main className="flex-grow pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#people"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-charcoal-500 hover:text-primary-700 transition-colors mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>

          {/* Page Heading */}
          <div className="mb-12 border-l-4 border-primary-700 pl-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-charcoal-900">
              Our Research Community
            </h1>
            <p className="text-sm font-semibold text-charcoal-500 uppercase tracking-widest mt-2 max-w-3xl leading-relaxed">
              Meet the brilliant minds driving innovation at the Computing
              Automation and Research Laboratory.
            </p>
          </div>

          {/* Hierarchy Filter Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-16 pb-4 border-b border-charcoal-100">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-primary-700 text-white shadow-sm"
                  : "bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100"
              }`}
            >
              All Members ({people.length})
            </button>

            {categories.map((cat) => {
              const count = getCategoryMembers(cat).length;
              const isSelected = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-primary-700 text-white shadow-sm"
                      : "bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100"
                  }`}
                >
                  <span>{cat.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-charcoal-200/60 text-charcoal-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hierarchy Sections Stack */}
          <div className="space-y-24">
            {filteredCategories.map((category) => {
              const categoryMembers = getCategoryMembers(category);

              if (categoryMembers.length === 0 && selectedFilter === "all") {
                return null;
              }

              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-28"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-charcoal-200 gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black uppercase tracking-widest text-charcoal-900">
                          {category.title}
                        </h2>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-primary-50 text-primary-700 border border-primary-200/50 rounded-full">
                          {categoryMembers.length}{" "}
                          {categoryMembers.length === 1 ? "Member" : "Members"}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-500 font-medium mt-1">
                        {category.description}
                      </p>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-700 bg-accent-50/60 px-3 py-1 rounded border border-accent-200/40 self-start sm:self-auto">
                      {category.badge}
                    </span>
                  </div>

                  {/* Empty state if filtered category has no members */}
                  {categoryMembers.length === 0 ? (
                    <div className="py-12 px-6 bg-charcoal-50/50 rounded-xl text-center border border-dashed border-charcoal-200">
                      <p className="text-xs text-charcoal-400 font-bold uppercase tracking-wider">
                        No members currently listed under this tier. Profiles added in DatoCMS will appear here automatically.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                      {categoryMembers.map((member, idx) => {
                        const avatarBg =
                          member.avatarBg || gradients[idx % gradients.length];
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
                                  clipPath:
                                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                }}
                              >
                                {member.image?.url ? (
                                  <img
                                    src={member.image.url}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                ) : (
                                  <div
                                    className={`w-full h-full bg-gradient-to-br ${avatarBg} flex flex-col items-center justify-center text-white p-4 relative`}
                                  >
                                    <span className="text-xl font-bold font-mono tracking-wider text-accent-100/90 group-hover:scale-110 transition-transform duration-300">
                                      {member.initials ||
                                        member.name
                                          .split(" ")
                                          .map((n: string) => n[0])
                                          .join("")
                                          .substring(0, 2)}
                                    </span>
                                    <div
                                      className="absolute inset-1 border border-white/10 group-hover:border-accent-200/30 transition-colors pointer-events-none"
                                      style={{
                                        clipPath:
                                          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                      }}
                                    />
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
                              {member.focus && (
                                <p className="text-[9px] text-accent-700 font-medium tracking-wide mt-0.5 truncate max-w-[150px]">
                                  {member.focus}
                                </p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
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
