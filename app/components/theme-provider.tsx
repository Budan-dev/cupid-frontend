"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem("theme-preference");

    let shouldBeDark: boolean;

    if (savedTheme) {
      shouldBeDark = savedTheme === "dark";
    } else {
      // Check system preference for dark mode
      shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    applyTheme(shouldBeDark);

    // Listen for changes in system preference (only if no saved preference)
    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        applyTheme(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      setMounted(true);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    setIsDark(shouldBeDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    applyTheme(newDarkMode);
    localStorage.setItem("theme-preference", newDarkMode ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
