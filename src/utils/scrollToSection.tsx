export const scrollToSection = (id: string) => {
  if (typeof window === "undefined") return; // avoids errors during SSR
  const section = document.getElementById(id);
  if (!section) return;
  const top = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
};
