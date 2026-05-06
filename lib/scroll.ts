export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
