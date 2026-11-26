"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import { Project } from "@/types/portfolio";
import { ProjectModal } from "./ProjectModal";
import { ExternalLink, Github, Eye, Sparkles } from "lucide-react";

export const Projects: React.FC = () => {
  const { language, t } = useLanguage();
  const { projects } = portfolioData;

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { id: "all", label: t("Semua Proyek", "All Projects") },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest text-cyan-500 mb-2">
            // {t("PORTFOLIO SHOWCASE", "PORTFOLIO SHOWCASE")}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("Koleksi Proyek Pilihan", "Featured Works & Projects")}
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {t(
              "Aplikasi web yang dibangun dengan fokus pada performa tinggi, UX intuitif, dan arsitektur kode modern.",
              "Web applications engineered with high performance, intuitive UX, and clean architecture."
            )}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-105"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-500"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col"
            >
              {/* Image Container with Overlay */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/90 text-white text-[11px] font-semibold shadow-md backdrop-blur-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                )}

                {/* Hover Quick Action Buttons */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-xs">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-3 rounded-full bg-white text-slate-900 hover:bg-cyan-400 hover:text-white transition-all shadow-lg hover:scale-110"
                    title={t("Lihat Detail", "View Details")}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white text-slate-900 hover:bg-cyan-400 hover:text-white transition-all shadow-lg hover:scale-110"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white text-slate-900 hover:bg-cyan-400 hover:text-white transition-all shadow-lg hover:scale-110"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{project.date}</span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {project.summary[language]}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Open Modal Detail Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-500/5 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>{t("Pelajari Studi Kasus & Detail", "Explore Case Study & Details")}</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal Component */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
