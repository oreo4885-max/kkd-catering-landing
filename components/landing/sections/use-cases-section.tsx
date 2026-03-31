"use client";

import Image from "next/image";
import { useState } from "react";
import { siteContent } from "@/app/content";
import { SectionIntro } from "../section-intro";

const useCaseImages = [
  "/media/web-ready/event-overview-wide.jpg",
  "/media/web-ready/queue-side-view.jpg",
  "/media/web-ready/truck-closeup-square.jpg",
  "/media/web-ready/serving-scene-square.jpg",
  "/media/web-ready/hero-truck-front.jpg",
];

export function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = siteContent.useCases[activeIndex];

  return (
    <section className="py-14 sm:py-24" id="use-cases">
      <div className="section-shell">
        <SectionIntro {...siteContent.sections.useCases} />
        <div className="mt-6 text-sm text-forest-700/75">{siteContent.ui.useCasePrompt}</div>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {siteContent.useCases.map((item, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`interactive-card min-w-[190px] rounded-[22px] border px-4 py-3.5 text-left transition lg:min-w-0 lg:rounded-[24px] lg:px-5 lg:py-4 ${
                    active
                      ? "border-forest-700 bg-forest-800 text-cream shadow-soft"
                      : "border-forest-900/8 bg-white text-forest-900 hover:border-forest-700/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[15px] font-semibold sm:text-base ${active ? "text-cream" : "text-forest-900"}`}>
                      {item.title}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] ${
                        active ? "bg-white/10 text-cream" : "bg-blush text-kkdred"
                      }`}
                    >
                      {siteContent.ui.useCaseBadge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <article className="card-surface interactive-card rounded-[28px] p-4 sm:rounded-[32px] sm:p-8">
            <div className="overflow-hidden rounded-[24px] border border-forest-900/8 bg-forest-50 sm:rounded-[28px]">
              <Image
                key={useCaseImages[activeIndex]}
                src={useCaseImages[activeIndex]}
                alt={`${activeItem.title} 도넛트럭 사용 예시`}
                width={1200}
                height={900}
                className="fade-rise image-shift h-[220px] w-full object-cover sm:h-[360px]"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 sm:mt-4">
              <span className="section-label">{activeItem.title}</span>
              <div className="hidden items-center gap-2 sm:flex">
                {siteContent.useCases.map((item, index) => (
                  <span
                    key={item.title}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex ? "w-10 bg-kkdred" : "w-2 bg-forest-900/12"
                    }`}
                  />
                ))}
              </div>
            </div>
            <h3 className="ko-heading mt-4 text-[1.7rem] font-semibold text-forest-900 sm:mt-5 sm:text-3xl">
              {activeItem.title}
            </h3>
            <p className="ko-body mt-3 max-w-2xl text-[15px] leading-7 text-forest-800/80 sm:mt-4 sm:text-lg sm:leading-8">
              {activeItem.description}
            </p>
            <div className="mt-5 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
              {siteContent.ui.useCaseDetailPoints.map((point) => (
                <div
                  key={point}
                  className="interactive-card rounded-[20px] bg-forest-50 px-4 py-3.5 text-[13px] leading-5 text-forest-800 sm:rounded-[24px] sm:py-4 sm:text-sm sm:leading-6"
                >
                  {point}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
