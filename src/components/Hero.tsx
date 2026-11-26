"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Instagram,
  MessageSquare,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const { personal } = portfolioData;

  const titles = personal.titles[language];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex] || titles[0];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex, titles]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40 backdrop-blur-md mb-6 animate-pulse-slow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 tracking-wide">
            {t("Tersedia untuk Pekerjaan & Proyek Baru", "Available for Projects & Full-time Roles")}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
        </div>

        {/* Introduction */}
        <h2 className="text-sm sm:text-base font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
          {t("Halo, saya", "Hello, I am")}
        </h2>

        {/* Main Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          <span className="text-gradient">{personal.name}</span>
        </h1>

        {/* Dynamic Typing Title */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <p className="text-xl sm:text-2xl md:text-3xl font-mono font-medium text-cyan-600 dark:text-cyan-400">
            {displayText}
            <span className="inline-block w-2.5 h-6 sm:h-8 ml-1 bg-cyan-500 animate-pulse align-middle" />
          </p>
        </div>

        {/* Bio Description */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          {personal.bio[language]}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all text-sm sm:text-base group"
          >
            <span>{t("Eksplorasi Proyek", "View Projects")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400 shadow-sm hover:-translate-y-0.5 transition-all text-sm sm:text-base backdrop-blur-md"
          >
            <MessageSquare className="w-4 h-4 text-cyan-500" />
            <span>{t("Hubungi Saya", "Contact Me")}</span>
          </a>

          <a
            href={personal.resumeUrl}
            onClick={(e) => {
              if (personal.resumeUrl === "#") {
                e.preventDefault();
                alert(
                  language === "id"
                    ? "Tautan CV placeholder. Anda dapat meletakkan file resume/CV asli di data/portfolio.ts!"
                    : "Placeholder CV link. You can link your actual resume file in data/portfolio.ts!"
                );
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm sm:text-base"
          >
            <Download className="w-4 h-4" />
            <span>{t("Unduh CV", "Download Resume")}</span>
          </a>
        </div>

        {/* Social Media Links Bar */}
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          {personal.instagram && (
            <a
              href={personal.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="mt-16 text-slate-400 dark:text-slate-600 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors animate-bounce flex flex-col items-center gap-1 text-xs font-mono"
        >
          <span>{t("GULIR KE BAWAH", "SCROLL DOWN")}</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
