"use client";

import { useState } from "react";
import { siteContent } from "@/app/content";
import { SectionIntro } from "../section-intro";

const brandingVisuals = [
  {
    image: "/media/web-ready/serving-scene-square.jpg",
    context: "임직원 웰컴형",
    mood: "환영 메시지와 출근길 경험 강화 중심",
  },
  {
    image: "/media/web-ready/hero-truck-front.jpg",
    context: "지점 프로모션형",
    mood: "방문 고객 접점과 브랜드 노출 강화 중심",
  },
  {
    image: "/media/web-ready/event-overview-wide.jpg",
    context: "캠퍼스 응원형",
    mood: "밝고 참여감 있는 현장 분위기 중심",
  },
  {
    image: "/media/web-ready/truck-closeup-square.jpg",
    context: "촬영장 서포트형",
    mood: "응원 메시지와 휴식 타이밍 연계 중심",
  },
  {
    image: "/media/web-ready/queue-side-view.jpg",
    context: "팝업 유입형",
    mood: "대기 구간 참여 유도와 주목도 강화 중심",
  },
];

function BrandingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-kkdred" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4.5 14 9l4.5 2-4.5 2-2 4.5-2-4.5-4.5-2L10 9l2-4.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function CoBrandingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExample = siteContent.brandingExamples[activeIndex];
  const activeVisual = brandingVisuals[activeIndex];

  return (
    <section className="py-14 sm:py-24" id="branding">
      <div className="section-shell">
        <div className="card-surface overflow-hidden rounded-[30px] p-5 sm:rounded-[36px] sm:p-8 lg:p-10">
          <SectionIntro {...siteContent.sections.branding} />

          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:mt-8">
            {siteContent.brandingExamples.map((example, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={example.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`interactive-card group relative min-w-[220px] overflow-hidden rounded-[22px] border px-4 py-3.5 text-left transition-all duration-300 sm:min-w-[250px] sm:rounded-[24px] sm:px-5 sm:py-4 ${
                    active
                      ? "border-[#a9523f] bg-[#a9523f] text-cream shadow-soft"
                      : "border-forest-900/8 bg-white text-forest-900 hover:border-forest-700/30 hover:bg-forest-50/60"
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 transition-all duration-300 ${
                      active ? "bg-[#ffd6c9]" : "bg-transparent group-hover:bg-forest-700/15"
                    }`}
                  />
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs ${active ? "text-white/75" : "text-kkdred"}`}>
                    {siteContent.ui.brandingBadge}
                  </p>
                  <p className="ko-heading mt-3 line-clamp-2 text-[1.02rem] font-semibold leading-6 sm:text-lg sm:leading-7">
                    {example.title}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-[13px] sm:text-sm ${active ? "text-cream/78" : "text-forest-700/70"}`}>브랜딩 보기</span>
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300 sm:h-9 sm:w-9 ${
                        active
                          ? "translate-x-1 bg-white/12 text-cream"
                          : "bg-forest-50 text-forest-800 group-hover:translate-x-1 group-hover:bg-white"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative mt-5">
            <div className="pointer-events-none absolute -inset-x-4 -top-4 h-[18rem] rounded-[40px] bg-[#a9523f]/18 blur-3xl sm:-inset-x-8 sm:h-[22rem]" />
            <article
              key={activeExample.title}
              className="fade-rise relative overflow-hidden rounded-[28px] bg-[#a9523f] p-5 text-cream shadow-soft transition-all duration-500 sm:rounded-[32px] sm:p-8 lg:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_26%)]" />

              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72 sm:text-sm">
                    {activeVisual.context}
                  </p>
                  <h3 className="ko-heading mt-3 max-w-[18ch] text-[1.9rem] font-semibold leading-[1.2] sm:mt-4 sm:text-[2.3rem]">
                    {activeExample.title}
                  </h3>
                  <p className="ko-body mt-3 max-w-3xl text-[15px] leading-7 text-white/82 sm:mt-4 sm:text-lg sm:leading-8">
                    {activeExample.description}
                  </p>

                  <div className="mt-5 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
                    <div className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3.5 backdrop-blur sm:rounded-[24px] sm:py-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffd6c9]">
                          <BrandingIcon />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">활용 포인트</p>
                          <p className="ko-body mt-1 text-[13px] font-medium leading-5 text-white sm:text-sm sm:leading-6">{activeVisual.mood}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3.5 backdrop-blur sm:rounded-[24px] sm:py-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffd6c9]">
                          <BrandingIcon />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">적합 행사</p>
                          <p className="ko-body mt-1 text-[13px] font-medium leading-5 text-white sm:text-sm sm:leading-6">{activeVisual.context}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-white/12 bg-white/8 sm:rounded-[28px]">
                  <div className="relative min-h-[240px] overflow-hidden lg:min-h-[420px]">
                    <img
                      key={activeVisual.image}
                      src={activeVisual.image}
                      alt={`${activeExample.title} 브랜딩 예시 이미지`}
                      className="fade-rise h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                        Branding Mood
                      </p>
                      <p className="ko-heading mt-2 text-[1.05rem] font-semibold text-white sm:text-2xl">{activeVisual.context}</p>
                      <p className="ko-body mt-2 text-[13px] leading-5 text-white/82 sm:text-sm sm:leading-6">{activeVisual.mood}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
