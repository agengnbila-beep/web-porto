export type Language = "id" | "en";

export interface Project {
  id: string;
  title: string;
  category: "fullstack" | "frontend" | "backend" | "mobile";
  summary: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  features: {
    id: string[];
    en: string[];
  };
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
}

export interface SkillCategory {
  title: {
    id: string;
    en: string;
  };
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: {
    id: string;
    en: string;
  };
  company: string;
  location: string;
  period: {
    id: string;
    en: string;
  };
  description: {
    id: string[];
    en: string[];
  };
  technologies: string[];
  type: "work" | "education";
}

export interface PortfolioData {
  personal: {
    name: string;
    nickname: string;
    role: {
      id: string;
      en: string;
    };
    titles: {
      id: string[];
      en: string[];
    };
    bio: {
      id: string;
      en: string;
    };
    about: {
      id: string[];
      en: string[];
    };
    stats: {
      yearsExp: number;
      projectsDone: number;
      satisfiedClients: number;
      coffeeCups: string;
    };
    avatar: string;
    resumeUrl: string;
    location: string;
    email: string;
    whatsapp: string;
    whatsappUrl: string;
    github: string;
    linkedin: string;
    instagram?: string;
  };
  skills: SkillCategory[];
  projects: Project[];
  experiences: ExperienceItem[];
}
