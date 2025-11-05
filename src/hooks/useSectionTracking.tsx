"use client";
import { useEffect } from "react";

export default function useSectionTracking() {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20% 0px" }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);
}
