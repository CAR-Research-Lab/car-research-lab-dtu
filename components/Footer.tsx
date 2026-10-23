"use client";

import React from "react";
import UniversityLogo from "./UniversityLogo";

export default function Footer() {
  const partners = [
    { name: "Stanford SAIL", abbrev: "Stanford SAIL" },
    { name: "MIT CSAIL", abbrev: "MIT CSAIL" },
    { name: "UC Berkeley", abbrev: "UC Berkeley" },
    { name: "IIT Delhi", abbrev: "IIT Delhi" },
    { name: "IISc Bangalore", abbrev: "IISc Bangalore" },
    { name: "Tsinghua University", abbrev: "Tsinghua" },
    { name: "Google Research", abbrev: "Google Research" },
    { name: "Microsoft Research", abbrev: "Microsoft" },
    { name: "ISRO", abbrev: "ISRO" },
  ];

  return (
    <footer id="contact" className="w-full bg-primary-900 text-white pt-16 pb-6 relative overflow-hidden">
      {/* Background graphic elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-800/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-900/40 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center pb-12 border-b border-primary-800">
          {/* Logo container with white background circle */}
          <div className="p-3 bg-white rounded-full inline-block shadow-xl mb-6">
            <UniversityLogo size={95} />
          </div>

          <h3 className="text-lg md:text-xl font-black tracking-widest uppercase text-accent-100">
            CAR | DELHI TECHNOLOGICAL UNIVERSITY (DTU)
          </h3>
          <p className="text-xs md:text-sm tracking-wider font-semibold text-primary-200 mt-2">
            In Service of Humanity Since 1941
          </p>

          <p className="max-w-xl text-xs text-primary-300/80 leading-relaxed mt-4 font-medium">
            Computing Automation and Research Laboratory (CAR) is a premier academic research center driving secure, ethical, and human-centric artificial intelligence and automated systems.
          </p>
        </div>

        {/* Strategic Collaborative Badges Footer Strip */}
        <div className="py-10 text-center">
          <h4 className="text-[10px] tracking-widest font-black uppercase text-accent-300 mb-6">
            Strategic Global Collaborations & Industry Partners
          </h4>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 max-w-4xl mx-auto opacity-70">
            {partners.map((partner) => (
              <span
                key={partner.name}
                className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-primary-100 px-3 py-1.5 border border-primary-800 bg-primary-950/60 rounded"
              >
                {partner.abbrev}
              </span>
            ))}
          </div>
        </div>

        {/* Developer Signature Bar */}
        <div className="pt-8 border-t border-primary-800/60 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-primary-300 font-medium tracking-wide">
            © {new Date().getFullYear()} Computing Automation and Research Laboratory. All rights reserved.
          </span>
          <span className="text-[10px] font-bold text-accent-200 tracking-wider">
            Website Developed by: <a href="https://www.linkedin.com/in/ravi-kumar-srivastava" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-100 transition-colors">Ravi Kumar Srivastava</a>, Computing Automation and Research Laboratory (CAR)
          </span>
        </div>

      </div>
    </footer>
  );
}
