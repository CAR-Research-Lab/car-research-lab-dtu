"use client";

import React, { useState, useEffect } from "react";
import UniversityLogo from "./UniversityLogo";
import LogoCAR from "./LogoCAR";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: "Our Vision", href: "/#vision", id: "vision" },
    { label: "Research", href: "/publications", id: "research" },
    { label: "People", href: "/people", id: "people" },
    { label: "Collaboration", href: "/#collaboration", id: "collaboration" },
    { label: "Projects & Updates", href: "/#projects", id: "projects" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Only do section active detection if on homepage
      if (pathname !== "/") return;

      // Detect active section on scroll
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        if (link.href.startsWith("/#")) {
          const el = document.getElementById(link.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(link.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If not on homepage and trying to access an anchor, navigate to home first
    if (href.startsWith("/#") && pathname !== "/") {
       router.push(href);
       setMobileMenuOpen(false);
       return;
    }
    
    // If it's a direct page link
    if (!href.startsWith("/#")) {
      router.push(href);
      setMobileMenuOpen(false);
      return;
    }

    // Scroll behavior for anchors on the same page
    const id = href.replace("/#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glassmorphism shadow-sm py-2"
          : "bg-white/40 backdrop-blur-sm py-4 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Left Section: Logos and text branding */}
          <a href="#" className="flex items-center space-x-3 group" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
            <div className="flex items-center space-x-2">
              <UniversityLogo size={70} className="group-hover:scale-105 transition-transform duration-300" />
              <div className="h-12 w-[1px] bg-charcoal-300/60 mx-2" />
              <LogoCAR size={80} className="hidden sm:block opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-black text-primary-700 text-sm tracking-widest uppercase">
                  CAR
                </span>
                <span className="text-[10px] text-charcoal-500 font-bold uppercase tracking-wider ml-1">
                  | Lab
                </span>
              </div>
              <span className="text-[10px] text-charcoal-900 font-semibold tracking-tight leading-none">
                Delhi Technological University
              </span>
            </div>
          </a>

          {/* Right Section: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 relative py-1 ${
                  activeSection === link.id
                    ? "text-primary-700"
                    : "text-charcoal-500 hover:text-primary-600"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-700 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal-500 hover:text-primary-700 hover:bg-charcoal-100/50 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-charcoal-100 shadow-lg py-4 px-6 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs font-bold tracking-widest uppercase transition-colors py-2 border-b border-charcoal-50 ${
                  activeSection === link.id
                    ? "text-primary-700 pl-2 border-l-2 border-l-primary-700"
                    : "text-charcoal-500 hover:text-primary-700"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
