"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PortfolioData } from "@/types/portfolio";
import { portfolioData as fallbackData } from "@/data/portfolio";

const PortfolioDataContext = createContext<PortfolioData>(fallbackData);

export const PortfolioDataProvider: React.FC<{
  initialData?: PortfolioData;
  children: React.ReactNode;
}> = ({ initialData, children }) => {
  const [data, setData] = useState<PortfolioData>(initialData || fallbackData);

  useEffect(() => {
    // Fetch latest data from API to ensure instant updates from Admin
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((freshData) => {
        if (freshData && freshData.personal) {
          setData(freshData);
        }
      })
      .catch(() => {
        // Fallback to initialData if API fails
      });
  }, []);

  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioDataContext);
  return context || fallbackData;
};
