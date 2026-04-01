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
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto max-w-7xl rounded-[24px] border px-3.5 py-3 backdrop-blur transition-all sm:rounded-[28px] sm:px-6 sm:py-3.5 ${
          scrolled
            ? "border-forest-900/12 bg-white/98 shadow-[0_18px_45px_rgba(22,34,19,0.14)]"
            : "border-forest-900/10 bg-white/94 shadow-card"
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <a href="#hero" className="min-w-0 shrink">
            <div className="ko-heading text-[15px] font-semibold tracking-[-0.02em] text-forest-900 sm:text-lg">
              크리스피크림도넛
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-forest-700/70 sm:text-[11px]">
              DonutsTruck
            </div>
          </a>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#inquiry-contact"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-white px-4 text-[13px] font-semibold text-forest-900 transition hover:bg-forest-50 sm:h-10 sm:px-4 sm:text-sm"
            >
              상담 정보
            </a>
            <a
              href="#inquiry"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-forest-800 px-4 text-[13px] font-semibold text-cream transition hover:bg-forest-900 sm:h-10 sm:px-4 sm:text-sm"
            >
              문의하기
            </a>
          </div>
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

        <nav className="grid grid-cols-4 gap-2 border-t border-forest-900/8 pt-3 lg:hidden">
          {navItems.map((item) => {
            const targetId = item.href.replace("#", "");
            const active = activeSection === targetId;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(targetId)}
                className={`ko-chip inline-flex min-h-[42px] items-center justify-center rounded-[18px] border px-2 py-2 text-center text-[13px] font-semibold transition-colors ${
                  active
                    ? "border-forest-800 bg-forest-800 text-cream shadow-soft"
                    : "border-forest-900/10 bg-forest-50/85 text-forest-900"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
