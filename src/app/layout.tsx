import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Ageng Prasetyo | Full Stack Web Developer & Software Engineer",
  description: "Portfolio website of Ageng Prasetyo - Full Stack Web Developer specializing in Next.js, React, Node.js, and modern cloud technologies.",
  keywords: ["Ageng", "Web Developer", "Software Engineer", "React", "Next.js", "Portfolio", "Indonesia"],
  authors: [{ name: "Ageng Prasetyo" }],
  openGraph: {
    title: "Ageng Prasetyo | Full Stack Web Developer",
    description: "Building modern, fast, and scalable web applications with clean code architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <body className="min-h-screen transition-colors duration-300 selection:bg-cyan-500/30 selection:text-cyan-300">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
