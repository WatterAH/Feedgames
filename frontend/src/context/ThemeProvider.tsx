"use client";

import { useEffect } from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "theme-default";
    document.body.classList.add(theme);
  }, []);

  return children;
};
