"use client";

import { createContext, useContext, useCallback } from "react";

type ScrollContextType = {
  scrollToSection: (id: string) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ClientScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollToSection = useCallback((id: string) => {
    if (typeof window === "undefined") return;

    const section = document.getElementById(id);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    const newUrl = `${window.location.pathname}#${id}`;
    window.history.replaceState(null, "", newUrl);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollActions() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error(
      "useScrollActions must be used inside ClientScrollProvider."
    );
  }
  return ctx;
}
