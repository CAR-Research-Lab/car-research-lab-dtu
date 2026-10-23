"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type FormField = "name" | "email" | "interest" | "message";

interface FormErrors {
  name?: string;
  email?: string;
  interest?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const validateField = (name: FormField, value: string): string | undefined => {
    const trimmed = value.trim();
    switch (name) {
      case "name":
        if (!trimmed) return "Full name is required.";
        if (trimmed.length < 2) return "Name must be at least 2 characters.";
        return undefined;
      case "email":
        if (!trimmed) return "Email address is required.";
        if (!EMAIL_REGEX.test(trimmed)) {
          return "Please enter a valid email address (e.g. name@university.edu).";
        }
        return undefined;
      case "interest":
        if (!trimmed) return "Research interest is required.";
        if (trimmed.length < 3) return "Please specify at least 3 characters.";
        return undefined;
      case "message":
        if (!trimmed) return "Message is required.";
        if (trimmed.length < 10) return "Message must be at least 10 characters.";
        return undefined;
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as FormField;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Re-validate in real-time once the field has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors: FormErrors = {};
    const fields: FormField[] = ["name", "email", "interest", "message"];
    fields.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, interest: true, message: true });
      const firstErrorField = fields.find((f) => newErrors[f]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setStatus("submitting");

    try {
      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!googleScriptUrl) {
        throw new Error("Contact endpoint is not configured.");
      }

      const params = new URLSearchParams();
      params.append("name", formData.name.trim());
      params.append("email", formData.email.trim());
      params.append("interest", formData.interest.trim());
      params.append("message", formData.message.trim());
      params.append("timestamp", new Date().toISOString());

      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      setStatus("success");
      setFormData({ name: "", email: "", interest: "", message: "" });
      setErrors({});
      setTouched({});
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
                className="mt-6 px-6 py-2 bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-800 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-black uppercase tracking-widest text-charcoal-700"
                  >
                    Full Name <span className="text-primary-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    aria-invalid={!!(touched.name && errors.name)}
                    className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all ${
                      touched.name && errors.name
                        ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-charcoal-900"
                        : "border-charcoal-200 bg-charcoal-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    }`}
                    placeholder="Ashish Kumar"
                  />
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle size={12} className="flex-shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-black uppercase tracking-widest text-charcoal-700"
                  >
                    Email Address <span className="text-primary-700">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    aria-invalid={!!(touched.email && errors.email)}
                    className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all ${
                      touched.email && errors.email
                        ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-charcoal-900"
                        : "border-charcoal-200 bg-charcoal-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    }`}
                    placeholder="ashish@university.edu"
                  />
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle size={12} className="flex-shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="interest"
                  className="block text-[11px] font-black uppercase tracking-widest text-charcoal-700"
                >
                  Primary Research Interest <span className="text-primary-700">*</span>
                </label>
                <input
                  type="text"
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  onBlur={() => handleBlur("interest")}
                  aria-invalid={!!(touched.interest && errors.interest)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all ${
                    touched.interest && errors.interest
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-charcoal-900"
                      : "border-charcoal-200 bg-charcoal-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  }`}
                  placeholder="e.g. Swarm Robotics, Security, LLMs"
                />
                {touched.interest && errors.interest && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="flex-shrink-0" />
                    <span>{errors.interest}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-black uppercase tracking-widest text-charcoal-700"
                  >
                    Message <span className="text-primary-700">*</span>
                  </label>
                  <span className="text-[10px] text-charcoal-400 font-mono">
                    {formData.message.length}/10 min chars
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  aria-invalid={!!(touched.message && errors.message)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm outline-none resize-y transition-all ${
                    touched.message && errors.message
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-charcoal-900"
                      : "border-charcoal-200 bg-charcoal-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  }`}
                  placeholder="Tell us about your research background or collaboration inquiry..."
                ></textarea>
                {touched.message && errors.message && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="flex-shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-200">
                  <AlertCircle size={16} className="flex-shrink-0" />
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
                  className="w-full sm:w-auto px-8 py-3 bg-primary-700 hover:bg-primary-600 text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-lg hover:shadow-primary-700/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
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
