"use client";

import Image from "next/image";
import { useState } from "react";
import { siteContent } from "@/app/content";
import { DonutCoffeeIcon, DonutIcon } from "../brand-icons";

const showcaseItems = [
  {
    label: "브랜드 정면 컷",
    image: "/media/web-ready/hero-truck-front.jpg",
    note: "현장 도착 직후 브랜드 존재감이 바로 보이는 대표 장면",
  },
  {
    label: "행사 전경",
    image: "/media/web-ready/event-overview-wide.jpg",
    note: "대기열과 공간 분위기를 함께 보여주는 오프닝용 컷",
  },
  {
    label: "배포 장면",
    image: "/media/web-ready/serving-scene-square.jpg",
    note: "체험과 참여가 살아 있는 운영 순간을 보여주는 컷",
  },
];

export function HeroSection() {
  const { hero } = siteContent;
  const [activeShowcase, setActiveShowcase] = useState(0);
  const currentShowcase = showcaseItems[activeShowcase];
  const kakaoInquiryUrl = process.env.NEXT_PUBLIC_KAKAO_INQUIRY_URL ?? "";

  return (
    <section className="relative overflow-hidden" id="hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,111,60,0.10),transparent_35%)]" />
      <div className="soft-float absolute right-[8%] top-24 hidden h-28 w-28 rounded-full bg-[#f7d7a2]/30 blur-3xl lg:block" />
      <div className="soft-float absolute bottom-12 left-[52%] hidden h-36 w-36 rounded-full bg-[#d64032]/10 blur-3xl lg:block" />
      <div className="section-shell relative grid gap-8 pb-12 pt-4 sm:pb-20 sm:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pt-12">
        <div>
          <span className="section-label">{hero.eyebrow}</span>
          <h1 className="ko-heading mt-4 max-w-3xl whitespace-pre-line text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-forest-900 sm:mt-5 sm:text-[3.6rem]">
            {hero.title}
          </h1>
          <p className="ko-body mt-4 max-w-2xl text-[15px] leading-7 text-forest-800/80 sm:mt-5 sm:text-lg sm:leading-8">{hero.subtitle}</p>
          <div className="mt-6 grid gap-2.5 sm:mt-7 sm:max-w-[34rem] sm:grid-cols-[1.15fr_0.85fr] sm:gap-3">
            {kakaoInquiryUrl ? (
              <a
                href={kakaoInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#E6CB00] bg-[#FEE500] px-5 text-[13px] font-semibold text-[#191919] shadow-[0_12px_24px_rgba(25,25,25,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(25,25,25,0.16)] sm:h-12 sm:px-7 sm:text-sm"
              >
                카카오톡 문의
              </a>
            ) : (
              <a
                href={hero.primaryCta.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-forest-800 px-5 text-[13px] font-semibold text-cream transition hover:bg-forest-900 sm:h-12 sm:px-7 sm:text-sm"
              >
                {hero.primaryCta.label}
              </a>
            )}
            <a
              href={hero.primaryCta.href}
              className="inline-flex h-11 items-center justify-center rounded-full border border-forest-900/10 bg-white/78 px-5 text-[13px] font-semibold text-forest-900 transition hover:border-forest-700/30 hover:bg-white sm:h-12 sm:px-7 sm:text-sm"
            >
              전화 상담
            </a>
          </div>
          <div className="mt-4 max-w-[35rem] rounded-[22px] border border-forest-900/8 bg-white/72 px-4 py-3.5 text-[13px] leading-6 text-forest-800/84 sm:px-5 sm:py-4 sm:text-sm sm:leading-7">
            <p className="font-semibold text-forest-900">개인정보 입력 없이 빠른 상담 가능</p>
            <p className="mt-1">행사일 / 지역 / 인원만 알려주시면 빠르게 안내드립니다.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["행사일", "행사 지역", "예상 인원"].map((item) => (
                <span
                  key={item}
                  className="inline-flex rounded-full border border-forest-900/8 bg-forest-50 px-3 py-1 text-[12px] font-medium text-forest-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm text-forest-800/80 sm:mt-8">
            {hero.badges.map((badge) => (
              <li
                key={badge}
                className="interactive-card ko-chip inline-flex items-center gap-2.5 rounded-full border border-forest-900/8 bg-white px-3.5 py-1.5 text-[13px] font-medium text-forest-800 sm:px-4 sm:py-2 sm:text-sm"
              >
                <DonutIcon className="h-6 w-6 shrink-0 drop-shadow-[0_5px_6px_rgba(191,104,39,0.24)]" />
                {badge}
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3">
            {hero.proofPoints.map((item, index) => (
              <div
                key={item}
                className="card-surface interactive-card flex min-h-[98px] flex-col justify-between rounded-[22px] px-4 py-3.5 sm:min-h-[112px] sm:rounded-[24px] sm:py-4"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-forest-50 text-[13px] font-semibold text-forest-800 sm:h-9 sm:w-9 sm:text-sm">
                  {`0${index + 1}`}
                </div>
                <p className="ko-body mt-3 text-[13px] leading-5 text-forest-800/85 sm:mt-4 sm:text-sm sm:leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-forest-300/16 via-blush/30 to-transparent blur-2xl" />
          <div className="card-surface relative overflow-hidden rounded-[30px] border border-white/70 p-3 sm:rounded-[36px] sm:p-5">
            <div className="grid-pattern absolute inset-0 opacity-40" />
            <div className="relative rounded-[24px] bg-gradient-to-br from-white via-[#f6fbf7] to-[#e7f3ea] p-3.5 shadow-soft sm:rounded-[28px] sm:p-6">
              <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest-700">
                    {siteContent.ui.heroCardEyebrow}
                  </p>
                  <p className="ko-heading mt-2 whitespace-pre-line text-[1.7rem] font-semibold leading-[1.18] text-forest-900 sm:text-2xl">
                    {siteContent.ui.heroCardTitle}
                  </p>
                </div>
                <div className="inline-flex items-center gap-3 rounded-full border border-kkdred/20 bg-white px-3.5 py-1.5 text-[11px] font-medium text-kkdred sm:text-xs">
                  <DonutCoffeeIcon className="h-9 w-9 drop-shadow-[0_5px_6px_rgba(132,52,22,0.24)]" />
                  {siteContent.ui.heroCardBadge}
                </div>
              </div>
              <div className="overflow-hidden rounded-[22px] border border-forest-700/10 bg-[#f9fcf8] sm:rounded-[26px]">
                <Image
                  key={currentShowcase.image}
                  src={currentShowcase.image}
                  alt="크리스피크림도넛 도넛트럭 현장 예시 이미지"
                  width={900}
                  height={760}
                  className="fade-rise image-shift h-auto w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                {showcaseItems.map((item, index) => {
                  const active = index === activeShowcase;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActiveShowcase(index)}
                      className={`interactive-card ko-chip rounded-full px-3.5 py-1.5 text-[13px] font-medium sm:px-4 sm:py-2 sm:text-sm ${
                        active
                          ? "soft-pulse bg-forest-800 text-cream"
                          : "border border-forest-900/10 bg-white text-forest-800"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 inline-flex items-center gap-3 rounded-full bg-white/78 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-800 sm:mt-4 sm:text-xs">
                <DonutCoffeeIcon className="h-9 w-9 drop-shadow-[0_5px_6px_rgba(132,52,22,0.24)]" />
                Donuts + Coffee Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
