"use client";

import { useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "소개", href: "#hero" },
  { label: "패키지", href: "#packages" },
  { label: "브랜딩", href: "#branding" },
  { label: "후기", href: "#references" },
  { label: "진행", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "문의", href: "#inquiry" },
];

export function TopNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = useMemo(() => navItems.map((item) => item.href.replace("#", "")), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    const syncActiveSection = () => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

      if (sections.length === 0) return;

      const offset = window.innerWidth < 1024 ? 180 : 128;
      const current =
        sections.findLast((section) => section.getBoundingClientRect().top - offset <= 0) ?? sections[0];

      if (current?.id) {
        setActiveSection(current.id);
      }
    };

    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
      }
    };

    onScroll();
    onHashChange();
    syncActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [sectionIds]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 px-4 pt-2 transition-transform duration-300 sm:px-6 sm:pt-3 ${
          scrolled ? "-translate-y-[120%] lg:translate-y-0" : "translate-y-0"
        }`}
      >
      <div
        className={`mx-auto max-w-7xl rounded-[20px] border px-3 py-1.5 backdrop-blur-none transition-all sm:rounded-[24px] sm:px-5 sm:py-2.5 sm:backdrop-blur ${
          scrolled
            ? "border-forest-900/12 bg-white/98 shadow-[0_18px_45px_rgba(22,34,19,0.14)]"
            : "border-forest-900/10 bg-white/94 shadow-card"
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <a href="#hero" className="min-w-0 shrink">
            <div className="ko-heading text-[14px] font-semibold tracking-[-0.02em] text-forest-900 sm:text-[17px]">
              크리스피크림도넛
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-forest-700/70 sm:text-[10px]">
              DonutsTruck
            </div>
          </a>
        </div>

        <nav className="hidden items-center gap-1 pt-3 lg:flex">
          {navItems.map((item) => {
            const targetId = item.href.replace("#", "");
            const active = activeSection === targetId;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(targetId)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-forest-800 text-cream shadow-soft"
                    : "text-forest-800 hover:bg-forest-50 hover:text-forest-900"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <nav className="grid grid-cols-7 gap-1 border-t border-forest-900/8 pt-2 lg:hidden">
          {navItems.map((item) => {
            const targetId = item.href.replace("#", "");
            const active = activeSection === targetId;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(targetId)}
                className={`ko-chip inline-flex min-h-[30px] items-center justify-center rounded-[12px] border px-1 py-1 text-center text-[10px] font-semibold tracking-[-0.02em] transition-colors ${
                  active
                    ? "border-forest-800 bg-forest-800 text-cream shadow-soft"
                    : "border-forest-900/10 bg-white text-forest-900"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
      </header>

      <a
        href="#hero"
        aria-label="페이지 상단으로 이동"
        className={`fixed left-3 top-3 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/10 bg-white/96 text-forest-900 shadow-card transition-all duration-300 lg:hidden ${
          scrolled ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 4.5 4 10.8v8.2c0 .55.45 1 1 1h4.5v-5.5h5V20H19c.55 0 1-.45 1-1v-8.2L12 4.5Zm0-2.5 10 7.8-1.23 1.58L19 10.05V19a2 2 0 0 1-2 2h-4.5v-5.5h-1V21H7a2 2 0 0 1-2-2v-8.95l-1.77 1.33L2 9.8 12 2Z" />
        </svg>
      </a>
    </>
  );
}
