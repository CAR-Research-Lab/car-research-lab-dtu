"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Heart,
  Network,
  Cpu,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Calendar,
  BookText,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface DashboardSectionProps {
  publications?: any[];
  updates?: any[];
}

export default function DashboardSection({
  publications = [],
  updates = [],
}: DashboardSectionProps) {
  const [activeTab, setActiveTab] = useState("research");

  const router = useRouter();
  const pathname = usePathname();

  const sidebarLinks = [
    { label: "Home", href: "/#hero", id: "home" },
    { label: "Research", href: "/research", id: "research" },
    { label: "People", href: "/#people", id: "people" },
    { label: "Collaboration", href: "/#collaboration", id: "collaboration" },
    { label: "Projects & Updates", href: "/#projects", id: "projects" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Only do section active detection if on homepage
      if (pathname !== "/") return;

      const scrollPos = window.scrollY + 200;

      // Check which section is in view
      const sections = [
        "hero",
        "research",
        "people",
        "collaboration",
        "projects",
        "contact",
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(section === "hero" ? "home" : section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleSidebarClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string,
  ) => {
    e.preventDefault();

    // If not on homepage and trying to access an anchor, navigate to home first
    if (href.startsWith("/#") && pathname !== "/") {
       router.push(href);
       return;
    }
    
    // If it's a direct page link
    if (!href.startsWith("/#")) {
      router.push(href);
      return;
    }

    // Scroll behavior for anchors on the same page
    const targetId = href.replace("/#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(id);
    }
  };

  return (
    <section
      id="research"
      className="w-full bg-charcoal-50/50 py-20 border-b border-charcoal-200/50 scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 border-l-4 border-primary-700 pl-4">
          <h2 className="text-3xl font-black uppercase tracking-wider text-charcoal-900">
            Research Dashboard
          </h2>
          <p className="text-xs font-semibold text-charcoal-500 uppercase tracking-widest mt-1">
            Pioneering Safe, Autonomous & Human-Centric Technologies
          </p>
        </div>

        {/* Split-Pane Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Pane: Sticky Sidebar Navigation (matching lower-left pane of blueprint) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white border border-charcoal-200/60 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] font-black tracking-widest uppercase text-primary-700 block px-3 mb-4">
                CAR Registry
              </span>
              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSidebarClick(e, link.href, link.id)}
                    className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-all duration-200 ${
                      activeTab === link.id
                        ? "bg-primary-50 text-primary-700 border-l-4 border-l-primary-700 shadow-sm"
                        : "text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-800"
                    }`}
                  >
                    {link.label}
                    {activeTab === link.id && (
                      <Zap
                        size={12}
                        className="text-primary-700 animate-pulse"
                      />
                    )}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-4 border-t border-charcoal-100 px-3">
                <div className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider">
                  Lab PI
                </div>
                <div className="text-[11px] font-black text-charcoal-800 uppercase mt-1 leading-tight">
                  Prof. Rahul Kataria
                </div>
                <div className="text-[9px] text-charcoal-500 mt-0.5">
                  Computer Science, DTU
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area: Research Pillars & Projects */}
          <div className="lg:col-span-3 space-y-16">
            {/* 1. Research Pillars Grid */}
            <div>
              <h3 className="text-sm font-black tracking-widest uppercase text-charcoal-400 mb-6">
                Research Pillars
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pillar 1: Robotics & Automation */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-charcoal-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -z-10 opacity-60 group-hover:bg-primary-100 transition-colors" />

                  {/* Vector Graphic: Robotic Arm */}
                  <div className="w-full h-40 bg-charcoal-50/50 rounded-lg flex items-center justify-center mb-5 border border-charcoal-100 group-hover:border-primary-100 transition-colors relative overflow-hidden">
                    <svg
                      viewBox="0 0 160 120"
                      className="w-32 h-24 stroke-primary-700 fill-none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Grid background */}
                      <path
                        d="M 10 100 L 150 100 M 10 80 L 150 80 M 10 60 L 150 60 M 30 110 L 30 10 M 80 110 L 80 10 M 130 110 L 130 10"
                        stroke="#f1f1f1"
                        strokeWidth="1"
                      />

                      {/* Robotic Base */}
                      <path
                        d="M 60 100 L 100 100 L 90 90 L 70 90 Z"
                        fill="#7A1C1C"
                        className="opacity-80"
                      />
                      <circle cx="80" cy="90" r="6" fill="#A3704C" />

                      {/* Arm segment 1 */}
                      <line x1="80" y1="90" x2="60" y2="50" strokeWidth="3.5" />
                      <circle cx="60" cy="50" r="5" fill="#7A1C1C" />

                      {/* Arm segment 2 */}
                      <line
                        x1="60"
                        y1="50"
                        x2="100"
                        y2="30"
                        strokeWidth="3"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                      <circle cx="100" cy="30" r="4.5" fill="#A3704C" />

                      {/* Gripper/Tool */}
                      <path
                        d="M 100 30 L 115 30 L 115 22 M 115 30 L 115 38"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M 115 22 L 125 22 M 115 38 L 125 38"
                        strokeWidth="2"
                      />

                      {/* Target object */}
                      <circle
                        cx="132"
                        cy="30"
                        r="3"
                        fill="#A3704C"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>

                  <h4 className="text-sm font-black uppercase text-charcoal-900 tracking-wider">
                    1. Robotics & Automation
                  </h4>
                  <p className="text-xs text-charcoal-500 leading-relaxed mt-2">
                    Multi-axis industrial arms, mobile co-bots, and secure
                    autonomous architectures. Pioneering decentralized
                    automation and path safety protocols.
                  </p>
                </motion.div>

                {/* Pillar 2: Secure AI & Cybersecurity */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-charcoal-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -z-10 opacity-60 group-hover:bg-primary-100 transition-colors" />

                  {/* Vector Graphic: Cryptographic Network */}
                  <div className="w-full h-40 bg-charcoal-50/50 rounded-lg flex items-center justify-center mb-5 border border-charcoal-100 group-hover:border-primary-100 transition-colors relative overflow-hidden">
                    <svg
                      viewBox="0 0 160 120"
                      className="w-32 h-24 stroke-primary-700 fill-none"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {/* Network nodes */}
                      <circle
                        cx="80"
                        cy="40"
                        r="14"
                        stroke="#7A1C1C"
                        strokeWidth="3"
                      />
                      <circle
                        cx="40"
                        cy="80"
                        r="8"
                        stroke="#A3704C"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="120"
                        cy="80"
                        r="8"
                        stroke="#A3704C"
                        strokeWidth="2.5"
                      />

                      {/* Lock inside central node */}
                      <rect
                        x="74"
                        y="36"
                        width="12"
                        height="10"
                        rx="1.5"
                        fill="#7A1C1C"
                      />
                      <path
                        d="M 77 36 L 77 32 C 77 29 83 29 83 32 L 83 36"
                        stroke="#7A1C1C"
                        strokeWidth="1.5"
                      />

                      {/* Connections */}
                      <line x1="50" y1="75" x2="70" y2="48" strokeWidth="1.5" />
                      <line
                        x1="110"
                        y1="75"
                        x2="90"
                        y2="48"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="48"
                        y1="80"
                        x2="112"
                        y2="80"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                      />

                      {/* Encryption shield boundary */}
                      <path
                        d="M 80 15 C 80 15 110 20 110 50 C 110 80 80 100 80 100 C 80 100 50 80 50 50 C 50 20 80 15 80 15 Z"
                        stroke="#7A1C1C"
                        strokeWidth="1.2"
                        className="opacity-20"
                      />
                    </svg>
                  </div>

                  <h4 className="text-sm font-black uppercase text-charcoal-900 tracking-wider">
                    2. Secure AI & Cybersecurity
                  </h4>
                  <p className="text-xs text-charcoal-500 leading-relaxed mt-2">
                    Federated learning architectures (SECURE-FL), decentralized
                    node integrity, cryptographic protection layers, and robust
                    cyber-physical defence frameworks.
                  </p>
                </motion.div>

                {/* Pillar 3: Cognitive Sciences */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-charcoal-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -z-10 opacity-60 group-hover:bg-primary-100 transition-colors" />

                  {/* Vector Graphic: Neural Brain network */}
                  <div className="w-full h-40 bg-charcoal-50/50 rounded-lg flex items-center justify-center mb-5 border border-charcoal-100 group-hover:border-primary-100 transition-colors relative overflow-hidden">
                    <svg
                      viewBox="0 0 160 120"
                      className="w-32 h-24 stroke-primary-700 fill-none"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {/* Brain outline stylized */}
                      <path
                        d="M 60 60 C 50 60 40 50 40 40 C 40 25 55 20 70 24 C 75 12 95 12 100 24 C 115 20 130 25 130 40 C 130 50 120 60 110 60 C 105 65 100 70 100 80 C 100 90 90 95 80 95 C 70 95 60 90 60 80 C 60 70 55 65 60 60 Z"
                        strokeWidth="1.5"
                        className="opacity-40"
                      />

                      {/* Neural Interface nodes */}
                      <circle cx="65" cy="40" r="4.5" fill="#7A1C1C" />
                      <circle cx="95" cy="35" r="4.5" fill="#7A1C1C" />
                      <circle cx="80" cy="55" r="4.5" fill="#A3704C" />
                      <circle cx="110" cy="50" r="4.5" fill="#7A1C1C" />
                      <circle cx="75" cy="80" r="4.5" fill="#A3704C" />

                      {/* Neural connections */}
                      <line x1="65" y1="40" x2="80" y2="55" strokeWidth="1.5" />
                      <line x1="95" y1="35" x2="80" y2="55" strokeWidth="1.5" />
                      <line
                        x1="95"
                        y1="35"
                        x2="110"
                        y2="50"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="80"
                        y1="55"
                        x2="110"
                        y2="50"
                        strokeWidth="1.5"
                      />
                      <line x1="80" y1="55" x2="75" y2="80" strokeWidth="1.5" />

                      {/* Signal pulses */}
                      <circle
                        cx="80"
                        cy="55"
                        r="9"
                        stroke="#A3704C"
                        strokeWidth="1"
                        className="animate-ping opacity-60"
                      />
                    </svg>
                  </div>

                  <h4 className="text-sm font-black uppercase text-charcoal-900 tracking-wider">
                    3. Cognitive Sciences & Human-AI
                  </h4>
                  <p className="text-xs text-charcoal-500 leading-relaxed mt-2">
                    Human-machine interfaces, brain-computer networks, cognitive
                    feedback systems, and ethical AI architectures aligning
                    system decisions with human values.
                  </p>
                </motion.div>

                {/* Pillar 4: AI for Social Impact */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-charcoal-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -z-10 opacity-60 group-hover:bg-primary-100 transition-colors" />

                  {/* Vector Graphic: Agri Drone */}
                  <div className="w-full h-40 bg-charcoal-50/50 rounded-lg flex items-center justify-center mb-5 border border-charcoal-100 group-hover:border-primary-100 transition-colors relative overflow-hidden">
                    <svg
                      viewBox="0 0 160 120"
                      className="w-32 h-24 stroke-primary-700 fill-none"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {/* Terrain Grid below */}
                      <path
                        d="M 20 100 L 140 100 L 120 115 L 40 115 Z"
                        fill="#A3704C"
                        className="opacity-15"
                      />
                      <line
                        x1="50"
                        y1="100"
                        x2="60"
                        y2="115"
                        stroke="#A3704C"
                        strokeWidth="1"
                      />
                      <line
                        x1="80"
                        y1="100"
                        x2="80"
                        y2="115"
                        stroke="#A3704C"
                        strokeWidth="1"
                      />
                      <line
                        x1="110"
                        y1="100"
                        x2="100"
                        y2="115"
                        stroke="#A3704C"
                        strokeWidth="1"
                      />

                      {/* Drone Body */}
                      <rect
                        x="70"
                        y="38"
                        width="20"
                        height="8"
                        rx="2"
                        fill="#7A1C1C"
                        strokeWidth="1"
                      />
                      <circle cx="80" cy="42" r="2.5" fill="#A3704C" />

                      {/* Arms */}
                      <line
                        x1="50"
                        y1="34"
                        x2="110"
                        y2="50"
                        strokeWidth="2.5"
                      />
                      <line
                        x1="50"
                        y1="50"
                        x2="110"
                        y2="34"
                        strokeWidth="2.5"
                      />

                      {/* Rotors */}
                      <line x1="46" y1="32" x2="54" y2="32" strokeWidth="3" />
                      <line x1="106" y1="32" x2="114" y2="32" strokeWidth="3" />
                      <line x1="46" y1="52" x2="54" y2="52" strokeWidth="3" />
                      <line x1="106" y1="52" x2="114" y2="52" strokeWidth="3" />

                      {/* Spraying sensor beams */}
                      <line
                        x1="80"
                        y1="46"
                        x2="60"
                        y2="100"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        className="opacity-50"
                      />
                      <line
                        x1="80"
                        y1="46"
                        x2="100"
                        y2="100"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        className="opacity-50"
                      />
                    </svg>
                  </div>

                  <h4 className="text-sm font-black uppercase text-charcoal-900 tracking-wider">
                    4. AI for Social Impact & Agri-Tech
                  </h4>
                  <p className="text-xs text-charcoal-500 leading-relaxed mt-2">
                    Autonomous agricultural drone systems (CAR-AGRI-DRONE),
                    precision terrain mapping, resource optimization models, and
                    AI for environmental monitoring.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* 2. Research & Projects Registry */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black tracking-widest uppercase text-charcoal-400">
                  {publications.length > 0 ? "Latest Research & Publications" : "Active Projects Registry"}
                </h3>
                <Link
                  href="/research"
                  className="text-[10px] font-black uppercase tracking-widest text-primary-700 hover:text-primary-800 transition-colors flex items-center gap-1"
                >
                  View All Research ({publications.length}) <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="space-y-4">
                {/* Dynamically render top research from DatoCMS */}
                {publications.slice(0, 3).map((pub: any) => (
                  <div
                    key={pub.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-charcoal-200/60 rounded-xl shadow-sm hover:shadow-md transition-all gap-4 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary-50 text-primary-700 group-hover:bg-primary-700 group-hover:text-white transition-colors">
                        {pub.type === "Journal" ? <BookText size={20} /> : <FileText size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-bold text-accent-700 bg-accent-50 px-2 py-0.5 rounded uppercase">
                            {pub.type || "Research"}
                          </span>
                          <span className="text-[10px] font-mono text-charcoal-400">
                            {pub.year}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-charcoal-900 tracking-wide mt-1 leading-snug">
                          {pub.title}
                        </h4>
                        <p className="text-xs text-charcoal-500 mt-1 max-w-2xl">
                          <span className="font-semibold text-charcoal-700">{pub.authors}</span> — <span className="italic">{pub.venue}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-xs font-bold text-charcoal-600 flex-shrink-0">
                      <a
                        href={pub.link || "/research"}
                        target={pub.link ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-700 hover:text-primary-800 gap-0.5 text-xs font-black uppercase tracking-widest bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded transition-colors"
                      >
                        {pub.link ? "View PDF" : "Registry"} <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}

                {/* Project 1: SECURE-FL */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-charcoal-200/60 rounded-xl shadow-sm hover:shadow-md transition-all gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary-50 text-primary-700">
                      <Shield size={20} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-black text-charcoal-900 tracking-wider">
                          SECURE-FL
                        </span>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                          Running
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-500 mt-1 max-w-xl">
                        Federated Learning Infrastructure: Developing secure,
                        decentralized, cross-border model training frameworks
                        that guarantee user data privacy while maintaining high
                        collaborative accuracy.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs font-bold text-charcoal-600">
                    <span className="font-mono bg-charcoal-50 px-2.5 py-1 rounded">
                      V1.2.0-Alpha
                    </span>
                    <a
                      href="/research"
                      className="flex items-center text-primary-700 hover:text-primary-800 gap-0.5"
                    >
                      Registry <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Project 2: CAR-AGRI-DRONE */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-charcoal-200/60 rounded-xl shadow-sm hover:shadow-md transition-all gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-accent-50 text-accent-700">
                      <Cpu size={20} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-black text-charcoal-900 tracking-wider">
                          CAR-AGRI-DRONE
                        </span>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                          Running
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-500 mt-1 max-w-xl">
                        Autonomous agricultural UAV: Integrating onboard
                        edge-computing neural models for real-time crop disease
                        detection and automated multi-drone swarm resource
                        coordination.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs font-bold text-charcoal-600">
                    <span className="font-mono bg-charcoal-50 px-2.5 py-1 rounded">
                      V2.4.0-Beta
                    </span>
                    <a
                      href="/research"
                      className="flex items-center text-primary-700 hover:text-primary-800 gap-0.5"
                    >
                      Registry <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Upcoming Projects & Registry Updates */}
            <div id="projects" className="scroll-mt-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black tracking-widest uppercase text-charcoal-400">
                  Upcoming Projects & Registry Updates
                </h3>
                <Link
                  href="/updates"
                  className="text-[10px] font-black uppercase tracking-widest text-primary-700 hover:text-primary-800 transition-colors flex items-center gap-1"
                >
                  All Updates ({updates.length}) <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dynamically render top updates from DatoCMS */}
                {updates.slice(0, 2).map((item: any) => (
                  <div
                    key={item.id}
                    className="p-6 bg-white border border-charcoal-200/60 rounded-xl shadow-sm relative overflow-hidden group hover:border-primary-200 transition-all flex flex-col justify-between"
                  >
                    <div className="absolute top-4 right-4 text-[9px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <Calendar size={10} /> {item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Live Update"}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-charcoal-900 uppercase tracking-wider pr-24">
                        {item.title}
                      </h4>
                      <p className="text-xs text-charcoal-500 leading-relaxed mt-2 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase text-[9px]">DatoCMS Verified</span>
                      <Link href="/updates" className="text-primary-700 hover:text-primary-800 uppercase tracking-wider flex items-center gap-1">
                        Read Announcement <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Fallback to roadmap projects if fewer updates */}
                {updates.length < 2 && (
                  <div className="p-6 bg-white border border-charcoal-200/60 rounded-xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <Calendar size={10} /> Pre-Launch
                    </div>
                    <h4 className="text-sm font-black text-charcoal-900 uppercase tracking-wider">
                      AI-ETHICS-SIM
                    </h4>
                    <p className="text-xs text-charcoal-500 leading-relaxed mt-2">
                      Large-scale simulation platforms evaluating decision vectors
                      of automated highway driving models in simulated ethically
                      complex socio-technical contexts.
                    </p>
                    <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center justify-between text-[10px] font-bold text-charcoal-500">
                      <span>Target: Q4 2026</span>
                      <span className="text-primary-700">Proposal Pending</span>
                    </div>
                  </div>
                )}

                {updates.length < 1 && (
                  <div className="p-6 bg-white border border-charcoal-200/60 rounded-xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <Calendar size={10} /> Pre-Launch
                    </div>
                    <h4 className="text-sm font-black text-charcoal-900 uppercase tracking-wider">
                      SAFE-AUTONOMY-TESTBED
                    </h4>
                    <p className="text-xs text-charcoal-500 leading-relaxed mt-2">
                      Building DTU's hardware-in-the-loop physical validation
                      sandbox for evaluating drone collision avoidance and sensor
                      noise resilience under rigorous weather emulation.
                    </p>
                    <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center justify-between text-[10px] font-bold text-charcoal-500">
                      <span>Target: Q1 2027</span>
                      <span className="text-primary-700">Funding Approved</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
