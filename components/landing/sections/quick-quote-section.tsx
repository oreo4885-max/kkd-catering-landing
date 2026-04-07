"use client";

import { useEffect, useMemo, useState } from "react";
import { siteContent } from "@/app/content";
import { DonutCoffeeIcon } from "../brand-icons";

function AutoPackageIcon({ active }: { active: boolean }) {
  return (
    <DonutCoffeeIcon
      className={`h-5 w-5 transition-transform duration-300 ${active ? "scale-100" : "scale-90 opacity-70"}`}
    />
  );
}

export function QuickQuoteSection() {
  const { quickQuote } = siteContent;
  const [attendees, setAttendees] = useState("150명 이상");
  const [eventType, setEventType] = useState(quickQuote.eventOptions[0]);

  const isReferenceTier = attendees === "100~120명";
  const isPremiumTier = attendees === "250명 이상";
  const brandCollabDisabled = isReferenceTier;

  useEffect(() => {
    if (brandCollabDisabled && eventType === "브랜드 협업") {
      setEventType("기업 행사");
    }
  }, [brandCollabDisabled, eventType]);

  const desiredPackage = useMemo(() => {
    if (isReferenceTier) return "Reference Collaboration";
    if (isPremiumTier) return "Premium Brand Event";
    return "Standard Corporate Package";
  }, [isPremiumTier, isReferenceTier]);

  const summaryByPackage: Record<string, string> = {
    "Reference Collaboration":
      "100~120명 규모에서는 레퍼런스 협업형으로 진입 장벽을 낮추고, 현장 사진과 운영 톤을 함께 맞춰보는 흐름이 가장 자연스럽습니다.",
    "Standard Corporate Package":
      "150명 이상 운영이라면 가장 안정적인 동선과 만족도를 만들 수 있는 Standard Corporate Package 중심 검토가 적합합니다.",
    "Premium Brand Event":
      "250명 이상 대규모 행사라면 현장 존재감과 브랜드 연출 밀도를 함께 살릴 수 있는 Premium Brand Event가 가장 잘 맞습니다.",
  };

  return (
    <section className="-mt-2 pb-14 sm:pb-24" id="quick-quote">
      <div className="section-shell">
        <div className="rounded-[28px] border border-forest-900/8 bg-white p-4 shadow-card sm:rounded-[32px] sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <span className="section-label">{quickQuote.eyebrow}</span>
              <h2 className="ko-heading mt-4 max-w-[12ch] text-[1.9rem] font-semibold tracking-tight text-forest-900 sm:max-w-[14ch] sm:text-3xl">
                {quickQuote.title}
              </h2>
              <div className="mt-5 rounded-[22px] bg-forest-50 px-4 py-4 sm:mt-6 sm:rounded-[24px] sm:px-5 sm:py-5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-forest-700">
                  <DonutCoffeeIcon className="h-7 w-7 drop-shadow-[0_5px_6px_rgba(132,52,22,0.16)]" />
                  Quick Summary
                </div>
                <p className="ko-body mt-3 text-[15px] leading-7 text-forest-900 sm:text-base sm:leading-8">{summaryByPackage[desiredPackage]}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:gap-5">
              <div className="rounded-[24px] border border-forest-900/8 bg-cream px-3.5 py-3.5 sm:rounded-[28px] sm:px-5 sm:py-4">
                <p className="text-sm font-semibold text-forest-900">예상 인원</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickQuote.attendeeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAttendees(option)}
                      className={`ko-chip rounded-full px-3.5 py-1.5 text-[13px] font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                        attendees === option
                          ? "bg-forest-800 text-cream"
                          : "border border-forest-900/10 bg-white text-forest-800"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-forest-900/8 bg-cream px-3.5 py-3.5 sm:rounded-[28px] sm:px-5 sm:py-4">
                <p className="text-sm font-semibold text-forest-900">행사 유형</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickQuote.eventOptions.map((option) => {
                    const disabled = brandCollabDisabled && option === "브랜드 협업";

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          if (!disabled) setEventType(option);
                        }}
                        disabled={disabled}
                        className={`ko-chip rounded-full px-3.5 py-1.5 text-[13px] font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                          disabled
                            ? "cursor-not-allowed border border-forest-900/6 bg-[#e7ebe8] text-forest-700/35"
                            : eventType === option
                              ? "bg-forest-800 text-cream"
                              : "border border-forest-900/10 bg-white text-forest-800"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {brandCollabDisabled ? (
                  <p className="ko-body mt-3 text-[11px] leading-5 text-forest-700/65 sm:text-xs sm:leading-6">
                    100~120명 기준에서는 브랜드 협업 유형을 제외한 행사만 레퍼런스 협업형으로 자동 추천됩니다.
                  </p>
                ) : null}
              </div>

              <div className="rounded-[24px] border border-forest-900/8 bg-cream px-3.5 py-3.5 sm:rounded-[28px] sm:px-5 sm:py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-forest-900">희망 패키지</p>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-700/65">Auto Matched</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickQuote.packageOptions.map((option) => {
                    const active = desiredPackage === option;

                    return (
                      <div
                        key={option}
                        className={`ko-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                          active
                            ? "soft-pulse bg-forest-800 text-cream shadow-soft"
                            : "border border-forest-900/10 bg-white text-forest-800"
                        }`}
                      >
                        <AutoPackageIcon active={active} />
                        <span>{option}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="ko-body mt-3 text-[11px] leading-5 text-forest-700/65 sm:text-xs sm:leading-6">
                  예상 인원과 행사 유형을 기준으로 가장 적합한 패키지가 자동 선택됩니다.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                <a
                  href={quickQuote.primaryCta.href}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-forest-800 px-5 text-[13px] font-semibold text-cream transition hover:bg-forest-900 sm:h-12 sm:px-6 sm:text-sm"
                >
                  {quickQuote.primaryCta.label}
                </a>
                <a
                  href={quickQuote.secondaryCta.href}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-forest-900/10 bg-white px-5 text-[13px] font-semibold text-forest-900 transition hover:bg-forest-50 sm:h-12 sm:px-6 sm:text-sm"
                >
                  {quickQuote.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
