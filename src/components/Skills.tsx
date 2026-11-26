"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import { Layers, Database, Cpu, CheckCircle2 } from "lucide-react";

export const Skills: React.FC = () => {
  const { language, t } = useLanguage();
  const { skills } = portfolioData;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const categoryIcons = [
    <Layers key="fe" className="w-4 h-4" />,
    <Database key="be" className="w-4 h-4" />,
    <Cpu key="devops" className="w-4 h-4" />,
  ];

  return (
    <section id="skills" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest text-cyan-500 mb-2">
            // {t("KEAHLIAN & TEKNOLOGI", "SKILLS & TECH STACK")}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("Alat & Bahasa yang Saya Kuasai", "Technologies I Work With")}
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {t(
              "Berpengalaman membangun solusi web dari rancangan arsitektur antarmuka hingga backend database.",
              "Experienced in crafting web solutions from interface architecture to resilient databases."
            )}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {skills.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategoryIndex === idx
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-105"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-500"
              }`}
            >
              {categoryIcons[idx] || <Layers className="w-4 h-4" />}
              <span>{category.title[language]}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {skills[activeCategoryIndex].skills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {skill.name}
                    </h4>
                    {skill.level && (
                      <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-medium">
                        {skill.level}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overview Badges Container */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
            {t("INTEGRASI & ALUR KERJA", "INTEGRATIONS & WORKFLOW")}
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {[
              "CI/CD Pipelines",
              "RESTful Architecture",
              "Server-Side Rendering (SSR)",
              "SEO Best Practices",
              "Responsive Web Design",
              "Agile & Scrum",
              "Git Version Control",
              "Clean Architecture",
              "Web Accessibility (a11y)",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
