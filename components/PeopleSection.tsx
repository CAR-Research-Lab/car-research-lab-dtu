"use client";

import React from "react";
import { User, Award, Mail, BookOpen, GraduationCap, MapPin, Globe, X, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Profile {
  name: string;
  role: string;
  focus: string;
  email: string;
  initials: string;
  bio: string;
  category: string;
  image?: { url: string };
}

export default function PeopleSection({ people = [] }: { people?: Profile[] }) {
  // Helper to assign a random color gradient to people if not provided
  const gradients = [
    "from-primary-600 to-primary-800",
    "from-accent-600 to-accent-800",
    "from-charcoal-700 to-charcoal-900",
    "from-primary-700 to-accent-600",
    "from-emerald-600 to-emerald-800",
    "from-blue-600 to-blue-800",
  ];

  const collaborations = [
    { name: "Stanford SAIL", type: "Academic", location: "USA" },
    { name: "MIT CSAIL", type: "Academic", location: "USA" },
    { name: "UC Berkeley BAIR", type: "Academic", location: "USA" },
    { name: "IIT Delhi", type: "Academic", location: "India" },
    { name: "IISc Bangalore", type: "Academic", location: "India" },
    { name: "Tsinghua University", type: "Academic", location: "China" },
    { name: "Google Research", type: "Industry", location: "Global" },
    { name: "Microsoft Research", type: "Industry", location: "Global" },
    { name: "ISRO", type: "Space Agency", location: "India" },
  ];

  const router = useRouter();
  const generateSlug = (name: string) => name.toLowerCase().replace(/[\s.]+/g, '-');

  return (
    <section id="people" className="w-full bg-white py-24 border-b border-charcoal-200/50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 border-l-4 border-primary-700 pl-4 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-wider text-charcoal-900">
              Our Research Community
            </h2>
            <p className="text-xs font-semibold text-charcoal-500 uppercase tracking-widest mt-1">
              Faculty, Scholars, and Institutional Network
            </p>
          </div>
          <button 
            onClick={() => router.push('/people')}
            className="hidden sm:inline-flex items-center text-[10px] font-black uppercase tracking-widest text-primary-700 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded transition-colors"
          >
            View Full Directory <LinkIcon size={12} className="ml-2" />
          </button>
        </div>

        {/* Stanford SAIL Format Honeycomb Hexagon Grid */}
        <div className="relative py-12 mb-24 flex flex-col items-center">
          
          <span className="text-[10px] font-black tracking-widest uppercase text-primary-700 mb-10 text-center block">
            Click on any profile to view the full directory
          </span>

          {/* Staggered Honeycomb Grid Container */}
          <div className="flex flex-col space-y-[-18px] md:space-y-[-24px] items-center">
            
            {/* Row 1 (Odd Row - 3 Hexagons) */}
            <div className="flex items-center gap-4 md:gap-8">
              {people.slice(0, 3).map((person) => (
                <div
                  key={person.name}
                  onClick={() => router.push(`/people`)}
                  className="relative cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:z-10 group"
                >
                  <div
                    className="w-32 h-36 md:w-40 md:h-44 bg-gradient-to-br fill-current overflow-hidden transition-all duration-300 filter grayscale contrast-125 group-hover:filter-none shadow-md"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    {/* Hexagon background pattern */}
                    {person.image?.url ? (
                      <img
                        src={person.image.url}
                        alt={person.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${gradients[idx % gradients.length]} flex flex-col items-center justify-center text-white p-4 relative`}>
                        <span className="text-lg md:text-xl font-bold font-mono tracking-wider text-accent-100/90 group-hover:scale-110 transition-transform duration-300">
                          {person.initials || person.name.split(" ").map(n => n[0]).join("").substring(0,2)}
                        </span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center mt-3 leading-tight max-w-[80%]">
                          {person.name.split(" ").slice(-1)[0]}
                        </span>
                        {/* Interactive glowing border inside */}
                        <div className="absolute inset-1 border border-white/10 group-hover:border-accent-200/30 transition-colors pointer-events-none" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                      </div>
                    )}
                  </div>
                  
                  {/* Subtle Name Tag below hexagon */}
                  <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-charcoal-900/95 text-white px-2 py-0.5 rounded shadow">
                      {person.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 (Even Row - 3 Hexagons, staggered offset) */}
            <div className="flex items-center gap-4 md:gap-8">
              {people.slice(3, 6).map((person) => (
                <div
                  key={person.name}
                  onClick={() => router.push(`/people`)}
                  className="relative cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:z-10 group"
                >
                  <div
                    className="w-32 h-36 md:w-40 md:h-44 bg-gradient-to-br fill-current overflow-hidden transition-all duration-300 filter grayscale contrast-125 group-hover:filter-none shadow-md"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    {person.image?.url ? (
                      <img
                        src={person.image.url}
                        alt={person.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${gradients[(idx + 3) % gradients.length]} flex flex-col items-center justify-center text-white p-4 relative`}>
                        <span className="text-lg md:text-xl font-bold font-mono tracking-wider text-accent-100/90 group-hover:scale-110 transition-transform duration-300">
                          {person.initials || person.name.split(" ").map(n => n[0]).join("").substring(0,2)}
                        </span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center mt-3 leading-tight max-w-[80%]">
                          {person.name.split(" ").slice(-1)[0]}
                        </span>
                        <div className="absolute inset-1 border border-white/10 group-hover:border-accent-200/30 transition-colors pointer-events-none" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-charcoal-900/95 text-white px-2 py-0.5 rounded shadow">
                      {person.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
          
          <button 
            onClick={() => router.push('/people')}
            className="sm:hidden mt-12 items-center text-[10px] font-black uppercase tracking-widest text-primary-700 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded transition-colors inline-flex"
          >
            View Full Directory <LinkIcon size={12} className="ml-2" />
          </button>
        </div>

        {/* 3. Strategic Global Collaborations Track */}
        <div id="collaboration" className="scroll-mt-24 pt-8 border-t border-charcoal-200/50">
          <h3 className="text-sm font-black tracking-widest uppercase text-charcoal-400 text-center mb-10">
            A Culture of Collaboration
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {collaborations.map((collab) => (
              <div
                key={collab.name}
                className="bg-charcoal-50/50 hover:bg-white border border-charcoal-200/60 hover:border-primary-100 rounded-xl p-4 text-center transition-all group flex flex-col justify-center items-center shadow-sm"
              >
                <span className="text-xs font-black text-charcoal-900 group-hover:text-primary-700 uppercase tracking-widest">
                  {collab.name}
                </span>
                <span className="text-[9px] font-bold text-charcoal-400 group-hover:text-accent-700 uppercase tracking-wider mt-1.5">
                  {collab.type} ({collab.location})
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
