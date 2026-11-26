"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle,
  Copy,
  ExternalLink,
} from "lucide-react";

export const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const { personal } = usePortfolio();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending with nice feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest text-cyan-500 mb-2">
            // {t("KONTAK & KOLABORASI", "GET IN TOUCH")}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("Mari Memulai Proyek Bersama", "Let's Build Something Great")}
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {t(
              "Punya ide proyek, tawaran pekerjaan, atau ingin berdiskusi seputar teknologi? Pintu saya selalu terbuka.",
              "Have a project idea, job opportunity, or just want to discuss tech? My inbox is always open."
            )}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                {t("Informasi Kontak Langsung", "Direct Reach")}
              </h4>

              {/* Email Card */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {t("Email Resmi", "Email Address")}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {personal.email}
                  </p>
                  <button
                    onClick={copyEmailToClipboard}
                    className="mt-1 inline-flex items-center gap-1.5 text-xs text-cyan-500 hover:text-cyan-400 font-medium"
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">
                          {t("Berhasil disalin!", "Copied to clipboard!")}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t("Salin Email", "Copy Email")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    WhatsApp Chat
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                    {personal.whatsapp}
                  </p>
                  <a
                    href={personal.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                  >
                    <span>{t("Kirim Pesan WhatsApp Langsung", "Chat via WhatsApp")}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {t("Lokasi", "Location")}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                    {personal.location}
                  </p>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {t("Tersedia untuk remote / hybrid", "Open for remote / hybrid work")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("Kirim Pesan Formulir", "Send a Direct Message")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                {t(
                  "Isi formulir di bawah ini dan saya akan membalas ke email Anda dalam waktu 24 jam.",
                  "Fill out the form below and I will get back to you within 24 hours."
                )}
              </p>

              {/* Success Feedback Alert */}
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-600 dark:text-emerald-400 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <p className="text-xs sm:text-sm font-medium">
                    {t(
                      "Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda kembali.",
                      "Thank you! Your message has been sent successfully. I will get back to you shortly."
                    )}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {t("Nama Lengkap", "Your Name")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("cth: Budi Santoso", "e.g. John Doe")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {t("Alamat Email", "Email Address")} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t("Subjek / Keperluan", "Subject")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t(
                      "cth: Tawaran Proyek Website / Kolaborasi",
                      "e.g. Project Opportunity / Collaboration"
                    )}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t("Pesan Anda", "Message")} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t(
                      "Tuliskan detail rencana proyek, kebutuhan teknologi, atau pesan Anda di sini...",
                      "Write your project details, timeline, or inquiry here..."
                    )}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{t("Mengirim Pesan...", "Sending Message...")}</span>
                  ) : (
                    <>
                      <span>{t("Kirim Pesan Sekarang", "Send Message Now")}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
