"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Scale, Heart, Network, ChevronDown } from "lucide-react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import DashboardSection from "@/components/DashboardSection";
import PeopleSection from "@/components/PeopleSection";
import ContactSection from "@/components/ContactSection";
import UpdatesWidget from "@/components/UpdatesWidget";
import Footer from "@/components/Footer";

export default function HomeClient({ 
  updates, 
  people, 
  publications,
  homeBg 
}: { 
  updates: any; 
  people: any; 
  publications?: any[];
  homeBg?: string | null;
}) {
  const coreValues = [
    {
      title: "Safety",
      icon: <Shield className="w-6 h-6 text-white" />,
      description: "Ensuring robustness and mathematical safety guarantees in all automated control loops.",
    },
    {
      title: "Security",
      icon: <Lock className="w-6 h-6 text-white" />,
      description: "Hardening decentralized networks and protecting user privacy through Federated Learning.",
    },
    {
      title: "Ethics",
      icon: <Scale className="w-6 h-6 text-white" />,
      description: "Evaluating decision-making algorithms to match regulatory standards and bias mitigation.",
    },
    {
      title: "Human-Centricity",
      icon: <Heart className="w-6 h-6 text-white" />,
      description: "Designing co-bots and intelligent systems that amplify and assist human potential.",
    },
    {
      title: "Global Collaboration",
      icon: <Network className="w-6 h-6 text-white" />,
      description: "Bridging the gap between premier labs worldwide to foster open-source academic synergy.",
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* 1. Loader Splash State */}
      <Preloader />

      {/* 2. Global Header */}
      <Header />

      <main className="flex-grow pt-20 sm:pt-24">
        
        {/* 3. Hero Section (featuring campus Red-Brick facade image) */}
        <section id="hero" className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Dark Contrast Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-105"
            style={{ backgroundImage: `url('${homeBg || "/dtu_campus_facade.png"}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/75 to-primary-950/45" />

          {/* Technical Grid Accent Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

          {/* Centered Mission Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-primary-700/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary-600 shadow-md">
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-white uppercase">
                  Delhi Technological University
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider leading-tight">
                Pioneering Secure &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-100 font-extrabold">
                  Humane Intelligence
                </span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-charcoal-200 font-medium leading-relaxed">
                Empowering the future of autonomous automation and deep learning research with strict compliance to physical safety, cybersecurity, and societal ethics.
              </p>

              <div className="pt-6 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => scrollToSection("research")}
                  className="px-6 py-3 bg-primary-700 hover:bg-primary-600 text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-lg hover:shadow-primary-700/20 transition-all duration-300 cursor-pointer"
                >
                  Explore Research
                </button>
                <button
                  onClick={() => scrollToSection("people")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-black uppercase tracking-widest rounded-lg backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  Meet Scholars
                </button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-charcoal-300 mb-1">
              Scroll Down
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => scrollToSection("vision")}
              className="cursor-pointer text-white/60 hover:text-white"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>
        </section>

        {/* 4. Core Values & Vision Section */}
        <section id="vision" className="w-full bg-white py-24 border-b border-charcoal-200/50 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Description */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-charcoal-900">
                Our Core Values
              </h2>
              <div className="w-16 h-1 bg-primary-700 mx-auto my-4 rounded-full" />
              <p className="text-xs md:text-sm text-charcoal-500 font-medium leading-relaxed">
                The Computer Automation and Research Laboratory (CAR) at DTU is a premier center dedicated to pioneering secure, efficient, and ethical artificial intelligence, transforming academic research into real-world applications for societal good. We foster global partnerships to align automation with human values.
              </p>
            </div>

            {/* Core Values Badge Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {coreValues.map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex flex-col items-center text-center p-6 bg-charcoal-50/50 border border-charcoal-200/40 rounded-xl transition-all shadow-sm hover:shadow-md hover:bg-white group"
                >
                  {/* Circle Badge Icon */}
                  <div className="w-14 h-14 rounded-full bg-primary-700 flex items-center justify-center shadow-lg group-hover:bg-primary-600 transition-colors glow-maroon">
                    {value.icon}
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-charcoal-900 mt-4">
                    {value.title}
                  </h3>
                  <p className="text-[11px] text-charcoal-500 leading-relaxed mt-2">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. Split-Pane Dashboard (Research Pillars & Active Projects) */}
        <DashboardSection publications={publications} />

        {/* 6. People & Collaborations Section */}
        <PeopleSection people={people} />

        {/* 7. Contact Section */}
        <ContactSection />

      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Floating Updates Widget */}
      <UpdatesWidget updates={updates} />
    </>
  );
}
