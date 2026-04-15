"use client";

import Image from "next/image";
import { useState } from "react";
import { siteContent } from "@/app/content";
import { DonutCoffeeIcon } from "../brand-icons";
import { SectionIntro } from "../section-intro";

const referenceVisuals = [
  {
    image: "/media/web-ready/queue-side-view.jpg",
    label: "광장 유입형",
    summary: "지나가는 고객의 시선이 자연스럽게 머무르는 오픈형 운영 장면",
    usage: "야외 프로모션 / 오픈 행사",
    scale: "100~150명 전후",
    purpose: "유입 확대 / 대기열 분위기 연출",
    points: ["대기열이 부담 아닌 분위기로 보임", "현장 유입이 자연스럽게 생김", "브랜드 존재감이 눈에 띔"],
  },
  {
    image: "/media/web-ready/serving-scene-square.jpg",
    label: "응원 메시지형",
    summary: "참여자 반응과 사진 결과물이 함께 살아나는 응원형 현장 장면",
    usage: "학교 행사 / 사내 응원 이벤트",
    scale: "60~120명 전후",
    purpose: "응원 메시지 전달 / 참여 반응 강화",
    points: ["사진 반응이 자연스럽게 생김", "메시지 톤 전달이 쉬움", "참여 흐름이 자연스럽게 올라감"],
  },
  {
    image: "/media/web-ready/truck-closeup-square.jpg",
    label: "비주얼 포인트형",
    summary: "트럭 자체가 현장 포인트가 되어 별도 장식 부담을 줄이는 장면",
    usage: "브랜드 협업 / 팝업 연계",
    scale: "120명 이상",
    purpose: "브랜드 노출 / 비주얼 포인트 확보",
    points: ["세팅이 과하지 않아도 눈에 띔", "브랜드 사진 컷 확보가 쉬움", "대기 동선이 깔끔하게 잡힘"],
  },
];

function ReferenceIcon() {
  return <DonutCoffeeIcon className="h-7 w-7 drop-shadow-[0_5px_6px_rgba(132,52,22,0.16)]" />;
}

export function ReferencesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReference = siteContent.references[activeIndex];
  const activeVisual = referenceVisuals[activeIndex] ?? referenceVisuals[0];

  return (
    <section className="py-14 sm:py-24" id="references">
      <div className="section-shell">
        <SectionIntro {...siteContent.sections.references} />
        <p className="ko-body mt-6 text-sm text-forest-700/75">{siteContent.ui.referencePrompt}</p>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:mt-8">
          {siteContent.references.map((reference, index) => {
            const active = index === activeIndex;
            const visual = referenceVisuals[index] ?? referenceVisuals[0];

            return (
              <button
                key={reference.author}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`interactive-card group relative min-w-[220px] overflow-hidden rounded-[22px] border px-4 py-3.5 text-left transition-all duration-300 sm:min-w-[250px] sm:rounded-[24px] sm:px-5 sm:py-4 ${
                  active
                    ? "border-[#205f48] bg-[#1d6a4e] text-cream shadow-soft"
                    : "border-forest-900/8 bg-white text-forest-900 hover:border-forest-700/30 hover:bg-forest-50/60"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 transition-all duration-300 ${
                    active ? "bg-[#c9eedc]" : "bg-transparent group-hover:bg-forest-700/15"
                  }`}
                />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs ${active ? "text-white/72" : "text-forest-700"}`}>
                  {visual.label}
                </p>
                <p className="ko-body mt-3 line-clamp-3 text-[14px] leading-6 sm:text-sm sm:leading-6">
                  “{reference.quote}”
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className={`text-[13px] font-medium sm:text-sm ${active ? "text-cream/78" : "text-forest-700/70"}`}>
                    {reference.author}
                  </span>
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
          <div className="pointer-events-none absolute -inset-x-4 -top-4 h-[18rem] rounded-[40px] bg-[#1d6a4e]/18 blur-3xl sm:-inset-x-8 sm:h-[22rem]" />
          <article
            key={activeReference.author}
            className="fade-rise relative overflow-hidden rounded-[28px] bg-[#1d6a4e] p-5 text-cream shadow-soft transition-all duration-500 sm:rounded-[32px] sm:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%)]" />

            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72 sm:text-sm">
                  {activeVisual.label}
                </p>
                <blockquote className="ko-heading mt-3 max-w-[15ch] text-[1.9rem] font-semibold leading-[1.18] sm:text-[2.35rem]">
                  “{activeReference.quote}”
                </blockquote>
                <p className="ko-body mt-4 text-[14px] font-medium text-white/78 sm:text-base">{activeReference.author}</p>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
                  <div className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3.5 backdrop-blur sm:rounded-[24px] sm:py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">현장 인상</p>
                    <p className="ko-body mt-2 text-[13px] leading-5 text-white sm:text-sm sm:leading-6">{activeVisual.summary}</p>
                  </div>
                  <div className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3.5 backdrop-blur sm:rounded-[24px] sm:py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">추천 활용</p>
                    <p className="ko-body mt-2 text-[13px] leading-5 text-white sm:text-sm sm:leading-6">{activeVisual.usage}</p>
                  </div>
                  <div className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3.5 backdrop-blur sm:rounded-[24px] sm:py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">추천 규모 / 목적</p>
                    <p className="ko-body mt-2 text-[13px] leading-5 text-white sm:text-sm sm:leading-6">
                      {activeVisual.scale}
                      <br />
                      {activeVisual.purpose}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="overflow-hidden rounded-[24px] border border-white/12 bg-white/8 sm:rounded-[28px]">
                  <div className="relative h-[230px] overflow-hidden sm:h-[320px]">
                    <Image
                      key={activeVisual.image}
                      src={activeVisual.image}
                      alt={`${activeReference.author} 후기 대표 이미지`}
                      fill
                      className="fade-rise object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/8 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">Reference Mood</p>
                      <p className="ko-heading mt-2 text-[1.05rem] font-semibold text-white sm:text-2xl">{activeVisual.label}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {activeVisual.points.map((point) => (
                    <div
                      key={`${activeReference.author}-${point}`}
                      className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3.5 backdrop-blur sm:rounded-[22px]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#c9eedc] shadow-[0_10px_18px_rgba(18,38,25,0.08)]">
                          <ReferenceIcon />
                        </span>
                        <p className="ko-body text-[13px] leading-5 text-white sm:text-sm sm:leading-6">{point}</p>
                      </div>
                    </div>
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
