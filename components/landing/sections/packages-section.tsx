"use client";

import { useState } from "react";
import { siteContent } from "@/app/content";
import { DonutCoffeeIcon, DonutIcon } from "../brand-icons";
import { SectionIntro } from "../section-intro";

function PackageIcon({
  type,
  accentClass,
}: {
  type: "badge" | "attendees" | "signal" | "check";
  accentClass: string;
}) {
  if (type === "badge") {
    return <DonutIcon className={`h-6 w-6 ${accentClass}`} />;
  }

  if (type === "attendees") {
    return <DonutIcon className={`h-6 w-6 ${accentClass}`} />;
  }

  if (type === "signal") {
    return <DonutCoffeeIcon className={`h-7 w-7 ${accentClass}`} />;
  }

  return <DonutIcon className={`h-5 w-5 ${accentClass}`} />;
}

export function PackagesSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activePackage = siteContent.packages[activeIndex];
  const packageImages = {
    reference: "/media/web-ready/truck-closeup-square.jpg",
    standard: "/media/web-ready/hero-truck-front.jpg",
    premium: "/media/web-ready/event-overview-wide.jpg",
  } as const;

  const paletteById = {
    reference: {
      tabActive: "border-forest-700 bg-forest-800 text-cream shadow-soft",
      tabBar: "bg-[#ffd8d1]",
      badge: "bg-white/10 text-cream",
      card: "bg-forest-800 text-cream",
      accentBg: "bg-[#ffd8d1]",
      accentText: "text-kkdred",
      subtleCard: "border-white/12 bg-white/8",
      chip: "border-white/15 bg-white/10 text-cream",
      checkBg: "bg-white/10",
      checkText: "text-[#ffd8d1]",
    },
    standard: {
      tabActive: "border-[#205f48] bg-[#1d6a4e] text-cream shadow-soft",
      tabBar: "bg-[#c9eedc]",
      badge: "bg-white/12 text-cream",
      card: "bg-[#1d6a4e] text-cream",
      accentBg: "bg-[#c9eedc]",
      accentText: "text-[#1d6a4e]",
      subtleCard: "border-white/12 bg-white/8",
      chip: "border-white/15 bg-white/10 text-cream",
      checkBg: "bg-white/10",
      checkText: "text-[#c9eedc]",
    },
    premium: {
      tabActive: "border-[#934737] bg-[#a9523f] text-cream shadow-soft",
      tabBar: "bg-[#ffd6c9]",
      badge: "bg-white/12 text-cream",
      card: "bg-[#a9523f] text-cream",
      accentBg: "bg-[#ffd6c9]",
      accentText: "text-[#a9523f]",
      subtleCard: "border-white/12 bg-white/8",
      chip: "border-white/15 bg-white/10 text-cream",
      checkBg: "bg-white/10",
      checkText: "text-[#ffe0d7]",
    },
  } as const;

  const palette = paletteById[activePackage.id as keyof typeof paletteById] ?? paletteById.standard;
  const activeImage = packageImages[activePackage.id as keyof typeof packageImages] ?? packageImages.standard;
  const pricingGuideById = {
    reference: {
      label: "견적 가이드",
      headline: "레퍼런스 협업형 우선 검토",
      description: "첫 협업과 레퍼런스 확보 목적에 적합한 진입형 운영입니다.",
      note: "행사일, 지역, 활용 범위 기준으로 견적 조정",
    },
    standard: {
      label: "견적 가이드",
      headline: "가장 문의가 많은 기본 운영형",
      description: "기업 행사에서 가장 안정적인 동선과 만족도를 만드는 기본 운영형입니다.",
      note: "인원, 운영 시간, 전기 지원 기준으로 견적 조정",
    },
    premium: {
      label: "견적 가이드",
      headline: "브랜드 연출 비중이 큰 상위 운영형",
      description: "대형 행사에서 현장 존재감과 브랜드 연출 밀도를 높이는 상위 운영형입니다.",
      note: "현장 규모, 브랜딩 범위, 동선 기준 맞춤 견적",
    },
  } as const;
  const pricingGuide =
    pricingGuideById[activePackage.id as keyof typeof pricingGuideById] ?? pricingGuideById.standard;

  const packageSignals = [
    {
      title: "운영 유형",
      value: activePackage.badge,
      icon: "badge" as const,
    },
    {
      title: "추천 규모",
      value: activePackage.attendees,
      icon: "attendees" as const,
    },
    {
      title: "운영 포인트",
      value: activePackage.highlights[0],
      icon: "signal" as const,
    },
  ];

  return (
    <section className="py-14 sm:py-24" id="packages">
      <div className="section-shell">
        <SectionIntro {...siteContent.sections.packages} />
        <div className="ko-body mt-6 text-sm text-forest-700/75">{siteContent.ui.packagePrompt}</div>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {siteContent.packages.map((item, index) => {
            const active = index === activeIndex;
            const itemPalette = paletteById[item.id as keyof typeof paletteById] ?? paletteById.standard;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`interactive-card group relative min-w-[198px] overflow-hidden rounded-[22px] border px-4 py-3 text-left transition-all duration-300 sm:min-w-[220px] sm:rounded-[24px] sm:px-5 sm:py-3.5 ${
                  active
                    ? itemPalette.tabActive
                    : "border-forest-900/8 bg-white text-forest-900 hover:border-forest-700/30 hover:bg-forest-50/60"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 transition-all duration-300 ${
                    active ? itemPalette.tabBar : "bg-transparent group-hover:bg-forest-700/15"
                  }`}
                />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs ${active ? "text-white/78" : "text-forest-700"}`}>
                  {item.attendees}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="ko-heading max-w-[12rem] text-[1.05rem] font-semibold leading-6 sm:text-lg">{item.name}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold sm:text-[11px] ${
                      active ? itemPalette.badge : "bg-blush text-kkdred"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-[13px] transition sm:text-sm ${active ? "text-cream/78" : "text-forest-700/70"}`}>상세 보기</span>
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

        <div className="relative mt-4">
          <div
            className={`pointer-events-none absolute -inset-x-4 -top-4 h-[18rem] rounded-[40px] blur-3xl sm:-inset-x-8 sm:h-[22rem] ${
              activePackage.id === "premium"
                ? "bg-[#a9523f]/24"
                : activePackage.id === "reference"
                  ? "bg-[#1f6a49]/22"
                  : "bg-[#1d6a4e]/20"
            }`}
          />
          <article
            key={activePackage.id}
            className={`fade-rise relative overflow-hidden rounded-[28px] p-4 shadow-soft transition-all duration-500 sm:rounded-[32px] sm:p-6 lg:p-7 ${palette.card}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%)]" />
            <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72 sm:text-sm">{activePackage.attendees}</p>
                <h3 className="ko-heading mt-3 max-w-[18ch] text-[1.85rem] font-semibold leading-[1.12] sm:text-[2.2rem]">
                  {activePackage.name}
                </h3>
                <p className="ko-body mt-3 max-w-3xl text-sm leading-6 text-white/82 sm:text-base sm:leading-7">
                  {activePackage.summary}
                </p>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
                {packageSignals.map((signal) => (
                  <div
                    key={`${activePackage.id}-${signal.title}`}
                    className={`fade-rise rounded-[20px] border px-4 py-3 backdrop-blur sm:rounded-[22px] ${palette.subtleCard}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-[18px] shadow-[0_10px_18px_rgba(18,38,25,0.08)] ${palette.accentBg}`}>
                        <PackageIcon type={signal.icon} accentClass={palette.accentText} />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">{signal.title}</p>
                        <p className="ko-body mt-1 text-[13px] font-medium leading-5 text-white sm:text-[15px]">{signal.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-[28px] border border-white/12 bg-white/8">
              <div className="grid gap-3 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="relative min-h-[146px] overflow-hidden lg:min-h-[180px]">
                  <img
                    key={activeImage}
                    src={activeImage}
                    alt={`${activePackage.name} 대표 이미지`}
                    className="fade-rise h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/10 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                      Package Visual
                    </p>
                    <p className="ko-heading mt-1 text-[15px] font-semibold text-white sm:text-lg">
                      {activePackage.name}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-4 lg:p-4">
                <div className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-3 sm:rounded-[24px] sm:py-3.5">
                    <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                      <DonutCoffeeIcon className="h-7 w-7 drop-shadow-[0_5px_6px_rgba(132,52,22,0.18)]" />
                      {pricingGuide.label}
                    </div>
                    <p className="ko-heading mt-1.5 text-[1.02rem] font-semibold text-white sm:text-xl">{pricingGuide.headline}</p>
                    <p className="ko-body mt-1.5 text-[13px] leading-5 text-white/82 sm:text-sm sm:leading-6">
                      {pricingGuide.description}
                    </p>
                    <div className="mt-2.5 rounded-[16px] border border-white/10 bg-black/10 px-3.5 py-2.5 sm:mt-3 sm:rounded-[18px]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/62">견적 기준</p>
                      <p className="ko-body mt-1.5 text-[13px] leading-5 text-white/88 sm:text-sm">{pricingGuide.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  {siteContent.ui.packageHighlightsLabel}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {activePackage.highlights.map((feature) => (
                    <li key={`${activePackage.id}-${feature}`} className="fade-rise flex gap-3 text-[13px] leading-5 text-white/90 sm:text-[15px] sm:leading-6">
                      <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${palette.checkBg}`}>
                        <PackageIcon type="check" accentClass={palette.checkText} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  {siteContent.ui.packageRecommendedLabel}
                </p>
                <div className="mt-3 flex max-h-[74px] flex-wrap gap-2 overflow-hidden">
                  {activePackage.recommendedFor.map((target) => (
                    <span key={`${activePackage.id}-${target}`} className={`rounded-full border px-3 py-1.5 text-[11px] font-medium sm:text-sm ${palette.chip}`}>
                      {target}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
