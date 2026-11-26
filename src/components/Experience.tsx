"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

export const Experience: React.FC = () => {
  const { language, t } = useLanguage();
  const { experiences } = portfolioData;

  const [activeTab, setActiveTab] = useState<"all" | "work" | "education">("all");

  const filteredExperiences = activeTab === "all"
    ? experiences
    : experiences.filter((item) => item.type === activeTab);

  return (
    <section id="experience" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest text-cyan-500 mb-2">
            // {t("REKAM JEJAK", "CAREER & EDUCATION")}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("Perjalanan Karir & Pendidikan", "Experience & Education")}
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {t(
              "Pengalaman kerja profesional dan latar belakang akademis di bidang teknologi.",
              "Professional work milestones and academic background in technology."
            )}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "all"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {t("Semua", "All")}
          </button>
          <button
            onClick={() => setActiveTab("work")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "work"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t("Pekerjaan", "Work Experience")}</span>
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "education"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t("Pendidikan", "Education")}</span>
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 dark:border-cyan-500/20 space-y-12 ml-4 sm:ml-8">
          {filteredExperiences.map((item) => (
            <div key={item.id} className="relative group">
              {/* Glowing timeline node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-md group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                {item.type === "work" ? (
                  <Briefcase className="w-3.5 h-3.5" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Card content */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 transition-all hover:-translate-y-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {item.role[language]}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    <Calendar className="w-3 h-3" />
                    <span>{item.period[language]}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mb-4">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.company}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {item.location}
                  </span>
                </div>

                {/* Achievement Bullets */}
                <ul className="space-y-2 mb-4 text-sm text-slate-600 dark:text-slate-300">
                  {item.description[language].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  {item.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
