"use client";

import { useMemo, useState } from "react";
import { siteContent } from "@/app/content";
import { DonutCoffeeIcon, DonutIcon } from "../brand-icons";

type MenuOption = {
  id: "donut" | "combo";
  label: string;
  description: string;
  minimum: number;
  perHead: number;
};

type RegionOption = {
  id: string;
  label: string;
  surcharge: number;
  note: string;
};

const menuOptions: MenuOption[] = [
  {
    id: "donut",
    label: "도넛 단품",
    description: "도넛 중심의 간결한 운영형",
    minimum: 520000,
    perHead: 7800,
  },
  {
    id: "combo",
    label: "도넛 + 커피",
    description: "도넛과 커피를 함께 운영하는 기본형",
    minimum: 690000,
    perHead: 10800,
  },
];

const regionOptions: RegionOption[] = [
  {
    id: "yeonsan",
    label: "부산 연산점 인근",
    surcharge: 0,
    note: "기본 출동 권역",
  },
  {
    id: "busan",
    label: "부산 타 권역",
    surcharge: 70000,
    note: "도심 외 이동 포함",
  },
  {
    id: "gimhae",
    label: "김해",
    surcharge: 100000,
    note: "근거리 외곽 이동",
  },
  {
    id: "changwon",
    label: "창원",
    surcharge: 150000,
    note: "권역 외 출동 기준",
  },
  {
    id: "ulsan",
    label: "울산",
    surcharge: 190000,
    note: "장거리 이동 포함",
  },
  {
    id: "daegu",
    label: "대구",
    surcharge: 230000,
    note: "장거리 이동 포함",
  },
];

const recommendedPackageCopy = {
  reference: {
    label: "Reference Collaboration",
    note: "100~120명 전후 행사에서 가볍게 시작하기 좋은 협업형 운영 흐름입니다.",
  },
  standard: {
    label: "Standard Corporate Package",
    note: "가장 문의가 많은 기본 운영형으로, 도넛과 커피를 안정적으로 제안하기 좋습니다.",
  },
  premium: {
    label: "Premium Brand Event",
    note: "대형 행사나 브랜딩 밀도가 높은 현장에서 권장되는 상위 운영형입니다.",
  },
} as const;

function formatCurrency(value: number) {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

function roundToNearestTenThousand(value: number) {
  return Math.round(value / 10000) * 10000;
}

export function QuickQuoteSection() {
  const [menu, setMenu] = useState<MenuOption["id"]>("combo");
  const [attendees, setAttendees] = useState(120);
  const [region, setRegion] = useState(regionOptions[0].id);

  const activeMenu = useMemo(() => menuOptions.find((item) => item.id === menu) ?? menuOptions[0], [menu]);
  const activeRegion = useMemo(() => regionOptions.find((item) => item.id === region) ?? regionOptions[0], [region]);
  const callTarget = siteContent.contact.contacts[0]?.href ?? "#inquiry-contact";
  const callNumber = siteContent.contact.contacts[0]?.phone ?? "";

  const attendeeTier = attendees <= 120 ? "reference" : attendees >= 250 ? "premium" : "standard";
  const recommendedPackage = recommendedPackageCopy[attendeeTier];

  const estimatedTotal = useMemo(() => {
    const baseCost = Math.max(activeMenu.minimum, attendees * activeMenu.perHead);
    const volumeDiscount = attendees >= 250 ? 0.94 : attendees >= 160 ? 0.97 : 1;
    return roundToNearestTenThousand(baseCost * volumeDiscount + activeRegion.surcharge);
  }, [activeMenu, activeRegion.surcharge, attendees]);

  const perHeadPrice = roundToNearestTenThousand(activeMenu.perHead * 10) / 10;

  return (
    <section className="-mt-2 pb-14 sm:pb-24" id="quick-quote">
      <div className="section-shell">
        <div className="rounded-[28px] border border-forest-900/8 bg-white p-4 shadow-card sm:rounded-[32px] sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <span className="section-label">Estimate Calculator</span>
              <h2 className="ko-heading mt-4 max-w-[12ch] text-[1.9rem] font-semibold tracking-tight text-forest-900 sm:max-w-[15ch] sm:text-3xl">
                예상 견적 계산기
              </h2>
              <p className="ko-body mt-4 max-w-[34rem] text-[15px] leading-7 text-forest-800/86 sm:text-base sm:leading-8">
                행사 인원, 지역, 운영 메뉴만 고르면 참고 견적을 바로 확인할 수 있습니다.
              </p>

              <div className="mt-5 rounded-[24px] bg-forest-800 px-5 py-5 text-cream shadow-soft sm:mt-6 sm:px-6 sm:py-6">
                <div className="flex items-center gap-3">
                  {activeMenu.id === "combo" ? (
                    <DonutCoffeeIcon className="h-12 w-12 drop-shadow-[0_10px_12px_rgba(17,9,5,0.24)]" />
                  ) : (
                    <DonutIcon className="h-12 w-12 drop-shadow-[0_10px_12px_rgba(17,9,5,0.24)]" />
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd8d1]">Estimated Total</p>
                    <p className="mt-1 text-lg font-semibold text-white">{activeMenu.label}</p>
                  </div>
                </div>

                <p className="ko-heading mt-5 text-[2rem] font-semibold leading-none text-white sm:text-[2.4rem]">
                  {formatCurrency(estimatedTotal)}
                </p>
                <p className="mt-3 text-sm leading-7 text-cream/80">
                  {attendees}명 기준, {activeRegion.label} 운영 예상 견적입니다. 현장 동선, 운영 시간, 전기 지원 여부에 따라 실제 제안은
                  달라질 수 있습니다.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-white/15 bg-white/8 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">추천 패키지</p>
                    <p className="mt-2 text-base font-semibold text-white">{recommendedPackage.label}</p>
                    <p className="mt-1 text-sm leading-6 text-cream/76">{recommendedPackage.note}</p>
                  </div>
                  <div className="rounded-[18px] border border-white/15 bg-white/8 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">계산 기준</p>
                    <p className="mt-2 text-base font-semibold text-white">1인 기준 약 {formatCurrency(perHeadPrice)}</p>
                    <p className="mt-1 text-sm leading-6 text-cream/76">
                      {activeRegion.note}
                      {activeRegion.surcharge > 0 ? ` · 지역 가산 ${formatCurrency(activeRegion.surcharge)}` : " · 기본 출동 범위"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={callTarget}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-forest-900 transition hover:bg-blush"
                  >
                    예상 견적 그대로 전화 상담하기
                  </a>
                  <a
                    href="#packages"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/24 px-6 text-sm font-semibold text-cream transition hover:bg-white/10"
                  >
                    추천 패키지 더 보기
                  </a>
                </div>
                {callNumber ? <p className="mt-3 text-xs text-cream/62">상담 연결: {callNumber}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 sm:gap-5">
              <div className="rounded-[24px] border border-forest-900/8 bg-cream px-3.5 py-3.5 sm:rounded-[28px] sm:px-5 sm:py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-forest-900">메뉴 선택</p>
                  <p className="text-xs font-medium text-forest-700/70">도넛 단품 / 도넛+커피</p>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {menuOptions.map((option) => {
                    const active = option.id === menu;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setMenu(option.id)}
                        className={`rounded-[20px] border px-4 py-4 text-left transition ${
                          active
                            ? "border-forest-800 bg-forest-800 text-cream shadow-soft"
                            : "border-forest-900/10 bg-white text-forest-900 hover:border-forest-700/20 hover:bg-forest-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {option.id === "combo" ? (
                            <DonutCoffeeIcon className="h-11 w-11 shrink-0" />
                          ) : (
                            <DonutIcon className="h-11 w-11 shrink-0" />
                          )}
                          <div>
                            <p className="text-sm font-semibold">{option.label}</p>
                            <p className={`mt-1 text-xs leading-5 ${active ? "text-cream/76" : "text-forest-700/72"}`}>
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[24px] border border-forest-900/8 bg-cream px-3.5 py-3.5 sm:rounded-[28px] sm:px-5 sm:py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-forest-900">예상 인원</p>
                  <div className="flex items-center gap-2 rounded-full border border-forest-900/10 bg-white px-3 py-1.5">
                    <span className="text-xs font-medium text-forest-700/72">직접 입력</span>
                    <input
                      type="number"
                      min={50}
                      max={300}
                      step={10}
                      value={attendees}
                      onChange={(event) => {
                        const nextValue = Number(event.target.value);

                        if (Number.isNaN(nextValue)) return;
                        setAttendees(Math.max(50, Math.min(300, nextValue)));
                      }}
                      className="w-16 border-0 bg-transparent p-0 text-right text-sm font-semibold text-forest-900 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="range"
                    min={50}
                    max={300}
                    step={10}
                    value={attendees}
                    onChange={(event) => setAttendees(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-forest-100 accent-forest-800"
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-forest-700/65">
                    <span>50명</span>
                    <span className="font-semibold text-forest-900">{attendees}명</span>
                    <span>300명</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-forest-900/8 bg-cream px-3.5 py-3.5 sm:rounded-[28px] sm:px-5 sm:py-4">
                <p className="text-sm font-semibold text-forest-900">행사 지역</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {regionOptions.map((option) => {
                    const active = option.id === region;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setRegion(option.id)}
                        className={`rounded-[18px] border px-4 py-3 text-left transition ${
                          active
                            ? "border-forest-800 bg-forest-800 text-cream shadow-soft"
                            : "border-forest-900/10 bg-white text-forest-900 hover:border-forest-700/20 hover:bg-forest-50"
                        }`}
                      >
                        <p className="text-sm font-semibold">{option.label}</p>
                        <p className={`mt-1 text-xs leading-5 ${active ? "text-cream/76" : "text-forest-700/72"}`}>
                          {option.note}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
