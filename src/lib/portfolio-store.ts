import fs from "fs";
import path from "path";
import { PortfolioData } from "@/types/portfolio";
import { portfolioData as defaultData } from "@/data/portfolio";
import { getSupabase } from "@/lib/supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio.json");

function getLocalFileFallback(): PortfolioData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error("Error reading local portfolio.json:", error);
  }
  return defaultData;
}

function saveLocalFile(data: PortfolioData): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Could not write local portfolio.json:", err);
    return false;
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("portfolio")
        .select("data")
        .eq("id", "main")
        .maybeSingle();

      if (!error && data?.data) {
        return data.data as PortfolioData;
      }

      // If table exists but is empty, seed it with local data!
      if (!error && !data) {
        console.log("Supabase connected but empty. Seeding initial data...");
        const localData = getLocalFileFallback();
        await supabase.from("portfolio").upsert({
          id: "main",
          data: localData,
          updated_at: new Date().toISOString(),
        });
        return localData;
      }
    } catch (err) {
      console.error("Supabase fetch failed, falling back to local file:", err);
    }
  }

  return getLocalFileFallback();
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  // Always update local file as backup when on filesystem
  saveLocalFile(data);

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("portfolio").upsert({
        id: "main",
        data: data,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase upsert error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase save exception:", err);
      return false;
    }
  }

  return true;
}
