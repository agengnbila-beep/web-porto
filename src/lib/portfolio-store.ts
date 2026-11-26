import fs from "fs";
import path from "path";
import { PortfolioData } from "@/types/portfolio";
import { portfolioData as defaultData } from "@/data/portfolio";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio.json");

export function getPortfolioData(): PortfolioData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error("Error reading portfolio.json, using default data:", error);
  }

  // If file doesn't exist or error, write default data and return it
  try {
    savePortfolioData(defaultData);
  } catch (err) {
    console.error("Could not write initial portfolio.json:", err);
  }
  return defaultData;
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving portfolio.json:", error);
    return false;
  }
}
