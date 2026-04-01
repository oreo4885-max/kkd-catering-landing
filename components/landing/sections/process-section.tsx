"use client";

import { useState } from "react";
import { siteContent } from "@/app/content";
import { DonutCoffeeIcon } from "../brand-icons";
import { SectionIntro } from "../section-intro";

const processMeta = [
  {
    phase: "첫 접수",
    summary: "필수 정보만 먼저 받아도 1차 가능 여부를 빠르게 확인하는 단계입니다.",
    checklist: ["행사일과 운영 시간", "지역 / 장소 / 기본 동선", "예상 인원과 행사 목적"],
    note: "빠르게 검토가 필요한 경우 `업체명`, `연락처`, `행사일`만 남겨도 출발할 수 있습니다.",
  },
  {
    phase: "현장 검토",
    summary: "실제 운영이 가능한지 현장 조건을 압축해서 확인하는 단계입니다.",
    checklist: ["주차 위치와 진입 동선", "전기 지원 가능 여부", "운영 가능 시간대"],
    note: "현장 사진이나 위치 정보가 있으면 검토 속도와 정확도가 더 올라갑니다.",
  },
  {
    phase: "운영 제안",
    summary: "인원과 목적에 맞는 패키지, 운영 흐름, 견적 기준을 제안하는 단계입니다.",
    checklist: ["추천 패키지 매칭", "운영 시간 / 범위 정리", "견적 조정 기준 안내"],
    note: "레퍼런스형, 기본형, 상위 연출형 중 어디가 맞는지 이 단계에서 선명해집니다.",
  },
  {
    phase: "표현 확정",
    summary: "현장에 노출될 메시지와 브랜딩 표현을 정리하는 단계입니다.",
    checklist: ["응원 문구 / 안내 문구", "브랜드명 / 지점명 표기", "사진 활용 범위 협의"],
    note: "브랜드 톤을 해치지 않으면서도 현장 목적에 맞는 표현으로 맞춰갑니다.",
  },
  {
    phase: "운영 실행",
    summary: "현장 목적에 맞는 톤으로 안정적으로 운영을 마무리하는 단계입니다.",
    checklist: ["현장 세팅과 동선 운영", "배포 흐름과 응대 톤 유지", "후기용 사진 컷 확보"],
    note: "행사 당일엔 준비보다 운영 흐름이 중요해서, 현장 체감이 자연스럽게 이어지도록 잡습니다.",
  },
];

function ProcessIcon() {
  return <DonutCoffeeIcon className="h-7 w-7 drop-shadow-[0_5px_6px_rgba(132,52,22,0.16)]" />;
}

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = siteContent.process[activeIndex];
  const activeMeta = processMeta[activeIndex] ?? processMeta[0];

  return (
    <section className="py-14 sm:py-24" id="process">
      <div className="section-shell">
        <SectionIntro {...siteContent.sections.process} />

        <div className="card-surface mt-6 overflow-hidden rounded-[28px] p-4 sm:mt-8 sm:rounded-[32px] sm:p-6">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
            {siteContent.process.map((item, index) => {
              const active = index === activeIndex;
              const meta = processMeta[index] ?? processMeta[0];

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`interactive-card group relative min-w-[170px] overflow-hidden rounded-[22px] border px-4 py-3 text-left transition-all duration-300 lg:min-w-0 ${
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
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${active ? "text-white/72" : "text-forest-700"}`}>
                    Step {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="ko-heading mt-2 text-[1rem] font-semibold leading-6">{item.title}</p>
                  <p className={`ko-body mt-2 text-[13px] leading-5 ${active ? "text-white/78" : "text-forest-700/72"}`}>
                    {meta.phase}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="relative mt-5">
            <div className="pointer-events-none absolute -inset-x-4 -top-4 h-[16rem] rounded-[36px] bg-[#1d6a4e]/14 blur-3xl sm:-inset-x-8 sm:h-[20rem]" />
            <article
              key={activeStep.title}
              className="fade-rise relative overflow-hidden rounded-[26px] bg-white p-4 shadow-card transition-all duration-500 sm:rounded-[30px] sm:p-5"
            >
              <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div className="rounded-[24px] bg-forest-800 px-5 py-5 text-cream">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    Process {(activeIndex + 1).toString().padStart(2, "0")} / {siteContent.process.length.toString().padStart(2, "0")}
                  </p>
                  <h3 className="ko-heading mt-3 text-[1.9rem] font-semibold leading-[1.16] sm:text-[2.2rem]">
                    {activeStep.title}
                  </h3>
                  <p className="ko-body mt-3 text-[15px] leading-7 text-white/84">{activeStep.description}</p>
                  <p className="ko-body mt-4 text-[13px] leading-6 text-white/72">{activeMeta.summary}</p>

                  <div className="mt-5 flex gap-2">
                    {siteContent.process.map((item, index) => (
                      <span
                        key={item.title}
                        className={`h-2 rounded-full transition-all ${
                          index === activeIndex ? "w-10 bg-[#c9eedc]" : "w-2 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {activeMeta.checklist.map((item) => (
                    <div
                      key={`${activeStep.title}-${item}`}
                      className="rounded-[20px] border border-forest-900/8 bg-forest-50 px-4 py-3.5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#c9eedc] shadow-[0_10px_18px_rgba(18,38,25,0.08)]">
                          <ProcessIcon />
                        </span>
                        <p className="ko-body text-[13px] leading-5 text-forest-900 sm:text-sm sm:leading-6">{item}</p>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-[22px] border border-forest-900/8 bg-white px-4 py-4 sm:col-span-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-700">진행 포인트</p>
                    <p className="ko-body mt-2 text-[14px] leading-6 text-forest-800/84 sm:text-sm sm:leading-7">{activeMeta.note}</p>
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
