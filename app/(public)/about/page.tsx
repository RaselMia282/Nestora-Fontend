"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Home,
  Users,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function AboutContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          About & Contact
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl leading-tight">
          Simplifying Room Finding with Complete Transparency
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Nestora connects tenants and verified landlords seamlessly. Our mission is to remove hidden fees, enforce identity verification, and deliver a smooth room-booking experience.
        </p>
      </section>

      {/* 2. PLATFORM FEATURES / ABOUT HIGHLIGHTS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center space-y-3 hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Verified Users</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tenants complete NID identity verification prior to submitting booking applications, ensuring high safety.
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center space-y-3 hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <Home className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Direct Listings</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Direct room and property listings from owners with full pricing clarity and zero hidden costs.
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center space-y-3 hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Smart Management</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Effortless application tracking for tenants and simple property administration tools for landlords.
          </p>
        </div>
      </section>

      {/* 3. CONTACT SECTION */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Get in Touch with Support
          </h2>
          <p className="text-xs text-slate-500">
            Have questions about room availability, identity verification, or booking? Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          {/* Contact Details Card */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Contact Info
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Email Support</p>
                  <p className="text-xs font-semibold text-slate-800">support@nestora.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Line</p>
                  <p className="text-xs font-semibold text-slate-800">+880 1700-000000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Office Location</p>
                  <p className="text-xs font-semibold text-slate-800">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-4">
            {submitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Message sent successfully! Our team will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Inquiry regarding room booking process"
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your message or inquiry here..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          Ready to Find Your Desired Room?
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Explore single rooms, apartments, and shared living spaces with fast booking approvals.
        </p>
        <div>
          <Link
            href="/find-rooms"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition cursor-pointer"
          >
            Browse Available Rooms <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}