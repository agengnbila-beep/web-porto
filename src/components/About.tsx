"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePortfolio } from "@/context/PortfolioContext";
import { Zap, Code, ShieldCheck, Coffee } from "lucide-react";

export const About: React.FC = () => {
  const { language, t } = useLanguage();
  const { personal } = usePortfolio();

  const highlights = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: t("Performa Tinggi", "High Performance"),
      desc: t(
        "Mengoptimalkan bundle size dan Core Web Vitals untuk pengalaman pengguna secepat kilat.",
        "Optimizing bundle size and Core Web Vitals for lightning-fast user experiences."
      ),
    },
    {
      icon: <Code className="w-5 h-5 text-cyan-500" />,
      title: t("Arsitektur Kode Bersih", "Clean Code Architecture"),
      desc: t(
        "Struktur modular berbasis TypeScript yang mudah di-maintain dan di-scale ke depannya.",
        "Modular, TypeScript-based architecture built for maintainability and seamless scaling."
      ),
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: t("Aman & Teruji", "Secure & Reliable"),
      desc: t(
        "Menerapkan praktik keamanan terbaik (OAuth, sanitized inputs, rate limiting) pada aplikasi.",
        "Applying security best practices (OAuth, sanitized inputs, rate limits) on all web products."
      ),
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest text-cyan-500 mb-2">
            // {t("TENTANG SAYA", "ABOUT ME")}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("Mengenal Saya Lebih Dekat", "Behind the Code")}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Card & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm">
              {/* Glow backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase font-mono text-cyan-400 font-semibold">
                    {personal.location}
                  </p>
                  <p className="text-lg font-bold">{personal.name}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-6">
              <div className="glass-panel p-4 rounded-xl text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-500 font-mono">
                  {personal.stats.yearsExp}+
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {t("Tahun Pengalaman", "Years Experience")}
                </span>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-500 font-mono">
                  {personal.stats.projectsDone}+
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {t("Proyek Selesai", "Completed Projects")}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Prose & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {personal.about[language].map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Core Values / Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="mb-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 w-fit">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
