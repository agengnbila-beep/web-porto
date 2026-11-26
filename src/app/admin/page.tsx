"use client";

import React, { useState, useEffect } from "react";
import { PortfolioData, Project, SkillCategory, ExperienceItem } from "@/types/portfolio";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  Layers,
  User,
  Briefcase,
  FolderGit2,
  Settings,
  Download,
  X,
  Sparkles,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "skills" | "experience" | "settings">("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Project Modal State (Create / Edit)
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newTechTag, setNewTechTag] = useState("");
  const [newFeatureId, setNewFeatureId] = useState("");
  const [newFeatureEn, setNewFeatureEn] = useState("");

  // Experience Modal State
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [newExpBulletId, setNewExpBulletId] = useState("");
  const [newExpBulletEn, setNewExpBulletEn] = useState("");
  const [newExpTech, setNewExpTech] = useState("");

  // Check auth status on load
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((res) => {
        setIsAuthenticated(res.authenticated);
        if (res.authenticated) {
          loadPortfolioData();
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadPortfolioData = () => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => showToast("Gagal mengambil data portofolio", "error"));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setIsAuthenticated(true);
        loadPortfolioData();
      } else {
        setLoginError(result.error || "Password salah!");
      }
    } catch {
      setLoginError("Gagal terhubung ke server");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setData(null);
  };

  const handleSaveAll = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        showToast("Perubahan berhasil disimpan dan langsung aktif!");
      } else {
        showToast(result.error || "Gagal menyimpan perubahan", "error");
      }
    } catch {
      showToast("Kesalahan jaringan saat menyimpan", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // ----------------- Project Handlers -----------------
  const openNewProjectModal = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      title: "",
      category: "fullstack",
      date: new Date().getFullYear().toString(),
      featured: false,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      summary: { id: "", en: "" },
      description: { id: "", en: "" },
      features: { id: [], en: [] },
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "",
      githubUrl: "",
    });
    setIsProjectModalOpen(true);
  };

  const saveProjectModal = () => {
    if (!editingProject || !data) return;
    if (!editingProject.title.trim()) {
      alert("Judul proyek tidak boleh kosong");
      return;
    }

    const existingIndex = data.projects.findIndex((p) => p.id === editingProject.id);
    let updatedProjects = [...data.projects];

    if (existingIndex >= 0) {
      updatedProjects[existingIndex] = editingProject;
    } else {
      updatedProjects = [editingProject, ...updatedProjects];
    }

    setData({ ...data, projects: updatedProjects });
    setIsProjectModalOpen(false);
    setEditingProject(null);
    showToast("Proyek diperbarui dalam formulir. Klik 'Simpan Semua' untuk menyimpan permanen.");
  };

  const deleteProject = (id: string) => {
    if (!data) return;
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      const updated = data.projects.filter((p) => p.id !== id);
      setData({ ...data, projects: updated });
      showToast("Proyek dihapus. Klik 'Simpan Semua' untuk menyimpan.");
    }
  };

  // ----------------- Experience Handlers -----------------
  const openNewExperienceModal = () => {
    setEditingExperience({
      id: `exp-${Date.now()}`,
      role: { id: "", en: "" },
      company: "",
      location: "Indonesia",
      period: { id: "2024 - Sekarang", en: "2024 - Present" },
      description: { id: [], en: [] },
      technologies: [],
      type: "work",
    });
    setIsExpModalOpen(true);
  };

  const saveExperienceModal = () => {
    if (!editingExperience || !data) return;
    const existingIndex = data.experiences.findIndex((e) => e.id === editingExperience.id);
    let updated = [...data.experiences];

    if (existingIndex >= 0) {
      updated[existingIndex] = editingExperience;
    } else {
      updated = [editingExperience, ...updated];
    }

    setData({ ...data, experiences: updated });
    setIsExpModalOpen(false);
    setEditingExperience(null);
    showToast("Pengalaman diperbarui. Jangan lupa klik 'Simpan Semua'!");
  };

  const deleteExperience = (id: string) => {
    if (!data) return;
    if (confirm("Hapus item pengalaman ini?")) {
      setData({
        ...data,
        experiences: data.experiences.filter((e) => e.id !== id),
      });
      showToast("Item dihapus dari daftar.");
    }
  };

  const downloadBackupJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ----------------- Loading State -----------------
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span>Memeriksa sesi login...</span>
        </div>
      </div>
    );
  }

  // ----------------- Login Screen -----------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Portal Admin Portofolio
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Masukkan password admin untuk mengelola konten website
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                Password / PIN Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoggingIn ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Masuk ke Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500">
              Default password: <code className="text-cyan-400 bg-slate-800 px-1.5 py-0.5 rounded">admin123</code> (bisa diubah di file <code className="text-slate-400">.env.local</code>)
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated but data still loading
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span>Memuat data portofolio...</span>
        </div>
      </div>
    );
  }

  // ----------------- Authenticated Dashboard -----------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-2 text-sm backdrop-blur-md animate-fadeIn ${
            toastMessage.type === "success"
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/50"
              : "bg-rose-950/90 text-rose-300 border-rose-500/50"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Admin Panel Portofolio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                v1.0
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Kelola data diri, proyek, keahlian, dan konten website
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-500 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Web Utama</span>
          </a>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 disabled:opacity-60 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Menyimpan..." : "Simpan Semua"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar Tabs */}
        <aside className="w-full md:w-60 shrink-0 space-y-1">
          {[
            { id: "profile", label: "Profil & Bio", icon: <User className="w-4 h-4" /> },
            { id: "projects", label: `Proyek (${data.projects.length})`, icon: <FolderGit2 className="w-4 h-4" /> },
            { id: "skills", label: "Keahlian & Stack", icon: <Layers className="w-4 h-4" /> },
            { id: "experience", label: `Pengalaman (${data.experiences.length})`, icon: <Briefcase className="w-4 h-4" /> },
            { id: "settings", label: "Backup & Info", icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                activeTab === tab.id
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 min-w-0 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          {/* ----------------- TAB: PROFIL & BIO ----------------- */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Informasi Profil & Kontak</h2>
                <p className="text-xs text-slate-400">Atur nama, panggilan, kontak, dan tautan sosial media Anda.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={data.personal.name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personal: { ...data.personal, name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={data.personal.nickname}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personal: { ...data.personal, nickname: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Roles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Role / Headline (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    value={data.personal.role.id}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personal: {
                          ...data.personal,
                          role: { ...data.personal.role, id: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Role / Headline (English)</label>
                  <input
                    type="text"
                    value={data.personal.role.en}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personal: {
                          ...data.personal,
                          role: { ...data.personal.role, en: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Bio Short */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Bio Ringkas Hero (Bahasa Indonesia)</label>
                  <textarea
                    rows={2}
                    value={data.personal.bio.id}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personal: {
                          ...data.personal,
                          bio: { ...data.personal.bio, id: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Bio Ringkas Hero (English)</label>
                  <textarea
                    rows={2}
                    value={data.personal.bio.en}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personal: {
                          ...data.personal,
                          bio: { ...data.personal.bio, en: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>

              {/* Kontak & Medsos */}
              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white mb-3">Kontak & Tautan Sosial Media</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Alamat Email</label>
                    <input
                      type="email"
                      value={data.personal.email}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: { ...data.personal, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Nomor WhatsApp</label>
                    <input
                      type="text"
                      value={data.personal.whatsapp}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: { ...data.personal, whatsapp: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">URL Profil GitHub</label>
                    <input
                      type="text"
                      value={data.personal.github}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: { ...data.personal, github: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">URL Profil LinkedIn</label>
                    <input
                      type="text"
                      value={data.personal.linkedin}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: { ...data.personal, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">URL Avatar / Foto Profil</label>
                    <input
                      type="text"
                      value={data.personal.avatar}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: { ...data.personal, avatar: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Lokasi Domisili</label>
                    <input
                      type="text"
                      value={data.personal.location}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: { ...data.personal, location: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white mb-3">Statistik Pencapaian</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Tahun Pengalaman</label>
                    <input
                      type="number"
                      value={data.personal.stats.yearsExp}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: {
                            ...data.personal,
                            stats: { ...data.personal.stats, yearsExp: Number(e.target.value) },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Proyek Selesai</label>
                    <input
                      type="number"
                      value={data.personal.stats.projectsDone}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: {
                            ...data.personal,
                            stats: { ...data.personal.stats, projectsDone: Number(e.target.value) },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Klien Puas</label>
                    <input
                      type="number"
                      value={data.personal.stats.satisfiedClients}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: {
                            ...data.personal,
                            stats: { ...data.personal.stats, satisfiedClients: Number(e.target.value) },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Cangkir Kopi</label>
                    <input
                      type="text"
                      value={data.personal.stats.coffeeCups}
                      onChange={(e) =>
                        setData({
                          ...data,
                          personal: {
                            ...data.personal,
                            stats: { ...data.personal.stats, coffeeCups: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- TAB: PROYEK ----------------- */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Manajemen Proyek Portofolio</h2>
                  <p className="text-xs text-slate-400">Tambah, ubah, atau hapus proyek karya Anda.</p>
                </div>
                <button
                  onClick={openNewProjectModal}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Proyek Baru</span>
                </button>
              </div>

              {/* Projects Grid List */}
              <div className="grid grid-cols-1 gap-4">
                {data.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{project.title}</h3>
                          {project.featured && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold border border-cyan-500/20">
                              Featured
                            </span>
                          )}
                          <span className="text-xs font-mono text-slate-400 uppercase">
                            [{project.category}]
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {project.summary.id || project.summary.en}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 transition-colors"
                        title="Edit Proyek"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500 transition-colors"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------- TAB: KEAHLIAN (SKILLS) ----------------- */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Keahlian & Teknologi (Tech Stack)</h2>
                <p className="text-xs text-slate-400">Atur kategori keahlian dan daftar teknologi yang Anda kuasai.</p>
              </div>

              <div className="space-y-6">
                {data.skills.map((category, catIdx) => (
                  <div key={catIdx} className="p-4 rounded-xl border border-slate-800 bg-slate-850">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-cyan-400 uppercase font-mono">
                        {category.title.id} / {category.title.en}
                      </h3>
                      <button
                        onClick={() => {
                          const skillName = prompt("Nama keahlian baru:");
                          const level = prompt("Level keahlian (cth: Expert, Advanced, Intermediate):", "Advanced");
                          if (skillName && skillName.trim()) {
                            const updatedSkills = [...data.skills];
                            updatedSkills[catIdx].skills.push({ name: skillName.trim(), level: level || "Advanced" });
                            setData({ ...data, skills: updatedSkills });
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg border border-slate-700 hover:border-cyan-500 text-[11px] font-semibold text-slate-300 hover:text-cyan-400"
                      >
                        + Tambah Skill
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-2 text-xs"
                        >
                          <span className="font-medium text-white">{skill.name}</span>
                          {skill.level && (
                            <span className="text-[10px] text-cyan-400 font-mono">({skill.level})</span>
                          )}
                          <button
                            onClick={() => {
                              const updatedSkills = [...data.skills];
                              updatedSkills[catIdx].skills = updatedSkills[catIdx].skills.filter((_, i) => i !== sIdx);
                              setData({ ...data, skills: updatedSkills });
                            }}
                            className="text-slate-500 hover:text-rose-400 ml-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------- TAB: PENGALAMAN ----------------- */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Riwayat Karir & Pendidikan</h2>
                  <p className="text-xs text-slate-400">Atur timeline pengalaman kerja profesional dan latar belakang studi.</p>
                </div>
                <button
                  onClick={openNewExperienceModal}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Riwayat</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.experiences.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-850 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                          {item.type}
                        </span>
                        <h3 className="text-sm font-bold text-white">
                          {item.role.id || item.role.en}
                        </h3>
                        <span className="text-xs text-slate-400">@ {item.company}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        {item.period.id} • {item.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingExperience(item);
                          setIsExpModalOpen(true);
                        }}
                        className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteExperience(item.id)}
                        className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------- TAB: SETTINGS & BACKUP ----------------- */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Backup & Pengaturan Sistem</h2>
                <p className="text-xs text-slate-400">Cadangan data JSON dan petunjuk konfigurasi keamanan.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-850 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Cadangkan Data Portofolio (JSON Backup)</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Unduh seluruh konfigurasi portofolio Anda saat ini sebagai file JSON. File ini dapat Anda simpan atau restore sewaktu-waktu.
                </p>
                <button
                  onClick={downloadBackupJSON}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File portfolio-backup.json</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-850 space-y-2">
                <h3 className="text-sm font-bold text-white">Cara Mengubah Password Admin</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Untuk mengganti password login panel ini, edit baris <code className="text-cyan-400">ADMIN_PASSWORD</code> di file <code className="text-slate-300">.env.local</code> pada komputer Anda, atau pada Environment Variables di dashboard Vercel / Netlify jika sudah di-hosting.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ----------------- PROJECT EDIT/CREATE MODAL ----------------- */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProject.title ? `Edit: ${editingProject.title}` : "Tambah Proyek Baru"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Judul Proyek *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Kategori</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="fullstack">Full Stack</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Tahun / Periode</label>
                  <input
                    type="text"
                    value={editingProject.date}
                    onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-800 border-slate-700"
                  />
                  <label htmlFor="featuredCheckbox" className="text-xs text-slate-300">
                    Jadikan Featured Project (tampil lencana)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">URL Gambar Mockup / Screenshot</label>
                <input
                  type="text"
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Ringkasan Singkat (Bahasa Indonesia)</label>
                <textarea
                  rows={2}
                  value={editingProject.summary.id}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      summary: { ...editingProject.summary, id: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Summary (English)</label>
                <textarea
                  rows={2}
                  value={editingProject.summary.en}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      summary: { ...editingProject.summary, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">URL Live Demo (opsional)</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">URL GitHub (opsional)</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Tech Stack Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editingProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-xs border border-slate-700 flex items-center gap-1"
                    >
                      <span>{tech}</span>
                      <button
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            techStack: editingProject.techStack.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-slate-500 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTechTag}
                    onChange={(e) => setNewTechTag(e.target.value)}
                    placeholder="Tambah teknologi (cth: Docker)..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTechTag.trim()) {
                        setEditingProject({
                          ...editingProject,
                          techStack: [...editingProject.techStack, newTechTag.trim()],
                        });
                        setNewTechTag("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-cyan-400 hover:border-cyan-500"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                onClick={saveProjectModal}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md cursor-pointer"
              >
                Terapkan ke Daftar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- EXPERIENCE EDIT/CREATE MODAL ----------------- */}
      {isExpModalOpen && editingExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingExperience.company ? `Edit: ${editingExperience.company}` : "Tambah Riwayat"}
              </h3>
              <button onClick={() => setIsExpModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Perusahaan / Universitas *</label>
                  <input
                    type="text"
                    required
                    value={editingExperience.company}
                    onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Tipe</label>
                  <select
                    value={editingExperience.type}
                    onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="work">Pekerjaan (Work)</option>
                    <option value="education">Pendidikan (Education)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Posisi / Role (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    value={editingExperience.role.id}
                    onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        role: { ...editingExperience.role, id: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Role / Degree (English)</label>
                  <input
                    type="text"
                    value={editingExperience.role.en}
                    onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        role: { ...editingExperience.role, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Periode (cth: 2023 - Sekarang)</label>
                  <input
                    type="text"
                    value={editingExperience.period.id}
                    onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        period: { id: e.target.value, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={editingExperience.location}
                    onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsExpModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                onClick={saveExperienceModal}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md cursor-pointer"
              >
                Terapkan ke Daftar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
