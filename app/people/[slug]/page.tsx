import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Mail, BookOpen } from "lucide-react";
import { getPeople } from "@/lib/datocms";
import { notFound } from "next/navigation";

export default async function PersonProfile({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const generateSlug = (name: string) => name.toLowerCase().replace(/[\s.]+/g, '-');
  
  const allPeople = await getPeople();
  const person = allPeople.find((p: any) => generateSlug(p.name) === slug);

  if (!person) {
    notFound();
  }

  // Parse HTML-like content if bio contains tags (DatoCMS multi-paragraph text often returns HTML or raw text)
  const renderBio = (bio: string) => {
    if (!bio) return <p className="text-sm text-charcoal-500 leading-relaxed font-medium">No biography available yet.</p>;
    return <div className="text-sm text-charcoal-500 leading-relaxed font-medium whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: bio }} />;
  };

  return (
    <>
      <Header />
      
      <main className="flex-grow pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/people" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-charcoal-500 hover:text-primary-700 transition-colors mb-12 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Directory
          </Link>

          <div className="bg-white rounded-2xl shadow-xl border border-charcoal-100 p-8 md:p-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-bl-full -z-10 opacity-60" />

            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              
              {/* Avatar Hexagon */}
              <div className="flex-shrink-0">
                <div
                  className="w-48 h-56 bg-gradient-to-br from-primary-800 to-primary-950 shadow-2xl flex items-center justify-center text-white relative group"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <div className="absolute inset-2 border-2 border-white/20 group-hover:border-accent-200/50 transition-colors" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                  {person.image?.url ? (
                    <img
                      src={person.image.url}
                      alt={person.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-5xl font-black font-mono tracking-widest text-accent-100">
                        {person.initials || person.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                      </span>
                      <p className="text-[10px] uppercase tracking-widest font-black text-accent-200 mt-3">CAR Lab</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow text-center md:text-left pt-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full inline-block mb-4">
                  {person.category === "leads" || person.category === "heads" || person.category === "first"
                    ? "Lab Lead"
                    : person.category === "phd" || person.category === "second"
                    ? "PhD Scholar"
                    : person.category === "postgrad" || person.category === "third"
                    ? "MTech Student"
                    : person.category === "undergrad" || person.category === "fourth"
                    ? "Undergraduate Student"
                    : person.category === "alumni" || person.category === "fifth"
                    ? "Alumni Profile"
                    : "Researcher Profile"}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-charcoal-900 tracking-wider uppercase">
                  {person.name}
                </h1>
                <p className="text-sm font-bold text-accent-700 uppercase tracking-widest mt-2">
                  {person.role} {person.focus ? `| ${person.focus}` : ''}
                </p>
                
                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="flex items-center text-xs font-bold text-charcoal-600 hover:text-primary-700 transition-colors">
                      <Mail size={16} className="mr-2" />
                      {person.email}
                    </a>
                  )}
                  {/* Google Scholar could be added to DatoCMS in the future, hardcoded link removed */}
                </div>

                <div className="mt-8 pt-8 border-t border-charcoal-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-charcoal-900 mb-4">Biography & Research</h3>
                  {renderBio(person.bio)}
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
