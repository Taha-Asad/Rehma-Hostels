"use client";
import { useEffect, useRef } from "react";

export default function useSectionTracking() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const sections = Array.from(document.querySelectorAll("section[id]"));
      if (!sections.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (!visible.length) return;

          const best = visible.reduce((a, b) =>
            a.intersectionRatio >= b.intersectionRatio ? a : b
          );

          const id = best.target.getAttribute("id");
          if (!id) return;

          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => {
            const newUrl = `${window.location.pathname}#${id}`;
            if (window.location.hash !== `#${id}`) {
              history.replaceState(null, "", newUrl);
            }
          });
        },
        {
          threshold: 0.4,
          rootMargin: "0px 0px -40% 0px",
        }
      );

      sections.forEach((s) => observer.observe(s));

      return () => observer.disconnect();
    };

    const cleanup = update();

    // If sections are lazy-loaded, re-attach on next frame
    const timeout = setTimeout(update, 1000);

    return () => {
      cleanup && cleanup();
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
}
