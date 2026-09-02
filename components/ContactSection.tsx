"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

      // We use 'no-cors' mode since Google Apps Script often requires it for simple POSTs
      // without setting up full CORS headers on the Google side, though standard CORS is preferred if configured.
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Because of no-cors, response.ok is false and status is 0, so we just assume success if no throw
      setStatus("success");
      setFormData({ name: "", email: "", interest: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact-us"
      className="w-full bg-charcoal-50/50 py-24 border-t border-charcoal-200/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-wider text-charcoal-900">
            Contact Us
          </h2>
          <div className="w-16 h-1 bg-primary-700 mx-auto my-4 rounded-full" />
          <p className="text-sm text-charcoal-500 font-medium max-w-2xl mx-auto">
            Reach out to our lab for research opportunities, collaboration
            inquiries, or to learn more about our ongoing projects.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-charcoal-100 p-8 md:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wide text-charcoal-900">
                Message Sent!
              </h3>
              <p className="text-charcoal-500 mt-2 text-sm">
                Thank you for reaching out. We have received your inquiry and
                will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2 bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-800 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-black uppercase tracking-widest text-charcoal-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-charcoal-200 bg-charcoal-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm outline-none"
                    placeholder="Ashish Kumar"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-black uppercase tracking-widest text-charcoal-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-charcoal-200 bg-charcoal-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm outline-none"
                    placeholder="ashish@university.edu"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="interest"
                  className="block text-[11px] font-black uppercase tracking-widest text-charcoal-700"
                >
                  Primary Research Interest
                </label>
                <input
                  type="text"
                  id="interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-charcoal-200 bg-charcoal-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm outline-none"
                  placeholder="e.g. Swarm Robotics, Security, etc."
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-[11px] font-black uppercase tracking-widest text-charcoal-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-charcoal-200 bg-charcoal-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm outline-none resize-y"
                  placeholder="Tell us about your research background or inquiry..."
                ></textarea>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                  <AlertCircle size={16} />
                  <span>
                    An error occurred while sending your message. Please try
                    again.
                  </span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-8 py-3 bg-primary-700 hover:bg-primary-600 text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-lg hover:shadow-primary-700/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
