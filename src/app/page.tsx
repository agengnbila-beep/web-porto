import { getPortfolioData } from "@/lib/portfolio-store";
import { PortfolioDataProvider } from "@/context/PortfolioContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Force dynamic rendering so edits in /admin immediately appear on refresh
export const dynamic = "force-dynamic";

export default async function Home() {
  const initialData = await getPortfolioData();

  return (
    <PortfolioDataProvider initialData={initialData}>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
        <Footer />
      </main>
    </PortfolioDataProvider>
  );
}
