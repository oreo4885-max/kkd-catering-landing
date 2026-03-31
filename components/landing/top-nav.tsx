"use client";

import { useEffect, useMemo, useState } from "react";
import { siteContent } from "@/app/content";

const navItems = [
  { label: "소개", href: "#hero" },
  { label: "활용", href: "#use-cases" },
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[24px] border px-3.5 py-2.5 backdrop-blur transition-all sm:gap-4 sm:rounded-[28px] sm:px-6 sm:py-3 ${
          scrolled
            ? "border-forest-900/12 bg-white/95 shadow-[0_18px_45px_rgba(22,34,19,0.12)]"
            : "border-forest-900/10 bg-white/82 shadow-card"
        }`}
      >
        <a href="#hero" className="shrink-0">
          <div className="ko-heading text-[15px] font-semibold tracking-[-0.02em] text-forest-900 sm:text-lg">
            크리스피크림도넛
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-forest-700/70 sm:text-[11px]">
            DonutsTruck
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const targetId = item.href.replace("#", "");
            const active = activeSection === targetId;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
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

        <div className="flex items-center gap-2">
          <a
            href="#inquiry-contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-white px-3.5 py-2 text-[13px] font-semibold text-forest-900 transition hover:bg-forest-50 sm:px-4 sm:text-sm"
          >
            상담 정보
          </a>
          <a
            href="#inquiry"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-forest-800 px-3.5 py-2 text-[13px] font-semibold text-cream transition hover:bg-forest-900 sm:px-4 sm:text-sm"
          >
            문의하기
          </a>
        </div>
      </div>

      <div className="mx-auto mt-3 flex max-w-7xl gap-2 overflow-x-auto pb-1 lg:hidden">
        {navItems.map((item) => {
          const targetId = item.href.replace("#", "");
          const active = activeSection === targetId;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`ko-chip shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium shadow-card transition ${
                active
                  ? "border-forest-800 bg-forest-800 text-cream"
                  : "border-forest-900/10 bg-white/92 text-forest-800"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </header>
  );
}
