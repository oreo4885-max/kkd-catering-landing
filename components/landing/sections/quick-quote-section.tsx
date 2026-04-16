"use client";

import { useEffect, useMemo, useState } from "react";
import { siteContent } from "@/app/content";
import { DonutCoffeeIcon, DonutIcon } from "../brand-icons";

type MenuOption = {
  id: "donut" | "combo";
  label: string;
  description: string;
  minimum: number;
  perHead: number;
  minAttendees: number;
  maxAttendees: number;
};

type RegionOption = {
  id: string;
  label: string;
  surcharge: number;
  note: string;
};

type PowerOption = {
  id: "available" | "unavailable";
  label: string;
  surcharge: number;
};

const menuOptions: MenuOption[] = [
  {
    id: "donut",
    label: "도넛 단품",
    description: "도넛 중심의 간결한 운영형",
    minimum: 800000,
    perHead: 5000,
    minAttendees: 100,
    maxAttendees: 250,
  },
  {
    id: "combo",
    label: "도넛+커피세트",
    description: "도넛과 커피를 함께 운영하는 기본형",
    minimum: 800000,
    perHead: 8000,
    minAttendees: 60,
    maxAttendees: 200,
  },
];

const regionOptions: RegionOption[] = [
  {
    id: "busan",
    label: "부산",
    surcharge: 0,
    note: "기본 포함",
  },
  {
    id: "gijang",
    label: "기장",
    surcharge: 0,
    note: "기본 포함",
  },
  {
    id: "gimhae",
    label: "김해",
    surcharge: 50000,
    note: "+5만 원",
  },
  {
    id: "yangsan",
    label: "양산",
    surcharge: 50000,
    note: "+5만 원",
  },
  {
    id: "changwon",
    label: "창원",
    surcharge: 100000,
    note: "+10만 원",
  },
  {
    id: "ulsan",
    label: "울산",
    surcharge: 100000,
    note: "+10만 원",
  },
  {
    id: "miryang",
    label: "밀양",
    surcharge: 100000,
    note: "+10만 원",
  },
  {
    id: "daegu-gyeongbuk",
    label: "대구경북",
    surcharge: 150000,
    note: "+15만 원 / 협의",
  },
];

const powerOptions: PowerOption[] = [
  {
    id: "available",
    label: "가능",
    surcharge: 0,
  },
  {
    id: "unavailable",
    label: "불가능",
    surcharge: 100000,
  },
];

const recommendedPackageCopy = {
  reference: {
    label: "소규모 프로모션형",
    note: "100~120명 전후 행사에서 가볍게 시작하기 좋은 협업형 운영 흐름입니다.",
  },
  standard: {
    label: "기본 기업행사형",
    note: "가장 문의가 많은 기본 운영형으로, 도넛과 커피를 안정적으로 제안하기 좋습니다.",
  },
  premium: {
    label: "대형 브랜드 이벤트형",
    note: "대형 행사나 브랜딩 밀도가 높은 현장에서 권장되는 상위 운영형입니다.",
  },
} as const;

function formatCurrency(value: number) {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

function roundToNearestTenThousand(value: number) {
  return Math.round(value / 10000) * 10000;
}

function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function QuickQuoteSection() {
  const [menu, setMenu] = useState<MenuOption["id"]>("combo");
  const [attendees, setAttendees] = useState(60);
  const [region, setRegion] = useState(regionOptions[0].id);
  const [power, setPower] = useState<PowerOption["id"]>("available");
  const kakaoInquiryUrl = process.env.NEXT_PUBLIC_KAKAO_INQUIRY_URL ?? "";

  const activeMenu = useMemo(() => menuOptions.find((item) => item.id === menu) ?? menuOptions[0], [menu]);
  const activeRegion = useMemo(() => regionOptions.find((item) => item.id === region) ?? regionOptions[0], [region]);
  const activePower = useMemo(() => powerOptions.find((item) => item.id === power) ?? powerOptions[0], [power]);
  const callTarget = siteContent.contact.contacts[0]?.href ?? "#inquiry-contact";
  const callNumber = siteContent.contact.contacts[0]?.phone ?? "";

  const attendeeTier = attendees <= 120 ? "reference" : attendees >= 250 ? "premium" : "standard";
  const recommendedPackage = recommendedPackageCopy[attendeeTier];

  useEffect(() => {
    setAttendees((current) => {
      if (current < activeMenu.minAttendees) return activeMenu.minAttendees;
      if (current > activeMenu.maxAttendees) return activeMenu.maxAttendees;
      return current;
    });
  }, [activeMenu.maxAttendees, activeMenu.minAttendees]);

  const updateAttendees = (nextValue: number) => {
    setAttendees(Math.max(activeMenu.minAttendees, Math.min(activeMenu.maxAttendees, nextValue)));
  };

  const estimatedTotal = useMemo(() => {
    const extraAttendees = Math.max(attendees - activeMenu.minAttendees, 0);
    const baseCost = activeMenu.minimum + extraAttendees * activeMenu.perHead;
    const transportSurcharge =
      (activeMenu.id === "donut" && attendees > 200) || (activeMenu.id === "combo" && attendees > 120) ? 100000 : 0;
    return roundToNearestTenThousand(baseCost + activeRegion.surcharge + activePower.surcharge + transportSurcharge);
  }, [activeMenu, activePower.surcharge, activeRegion.surcharge, attendees]);

  const transportSurcharge =
    (activeMenu.id === "donut" && attendees > 200) || (activeMenu.id === "combo" && attendees > 120) ? 100000 : 0;

  const handlePrintEstimate = () => {
    const issuedAt = new Date();
    const estimateHtml = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>크리스피크림도넛 케이터링 트럭 견적서</title>
    <style>
      :root {
        color-scheme: light;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        background: #f5f6f3;
        color: #113522;
        font-family: "Segoe UI", "Malgun Gothic", sans-serif;
      }
      .sheet {
        width: 820px;
        margin: 0 auto;
        padding: 40px 36px 48px;
        background: white;
      }
      .eyebrow {
        font-size: 12px;
        letter-spacing: 0.28em;
        font-weight: 700;
        color: #7c8d84;
        text-transform: uppercase;
      }
      .title {
        margin: 14px 0 10px;
        font-size: 34px;
        line-height: 1.15;
        font-weight: 800;
        color: #123b28;
      }
      .subtitle {
        margin: 0;
        font-size: 15px;
        line-height: 1.8;
        color: #476050;
      }
      .hero {
        margin-top: 28px;
        padding: 24px 28px;
        border-radius: 24px;
        background: linear-gradient(135deg, #13492f 0%, #1b5b3a 100%);
        color: white;
      }
      .hero-label {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #ffd8d1;
      }
      .hero-price {
        margin: 12px 0 0;
        font-size: 40px;
        line-height: 1;
        font-weight: 800;
      }
      .hero-note {
        margin: 14px 0 0;
        font-size: 14px;
        line-height: 1.75;
        color: rgba(255, 255, 255, 0.82);
      }
      .grid {
        margin-top: 24px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }
      .box {
        border: 1px solid rgba(17, 53, 34, 0.12);
        border-radius: 18px;
        padding: 18px 18px 16px;
        background: #f9fbf8;
      }
      .box-label {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #557161;
      }
      .box-value {
        margin-top: 8px;
        font-size: 22px;
        font-weight: 800;
        line-height: 1.25;
        color: #123b28;
      }
      .box-text {
        margin-top: 6px;
        font-size: 14px;
        line-height: 1.7;
        color: #4a6555;
      }
      .meta-table {
        width: 100%;
        border-collapse: collapse;
      }
      .meta-table th,
      .meta-table td {
        border-top: 1px solid rgba(17, 53, 34, 0.08);
        padding: 14px 0;
        text-align: left;
        vertical-align: top;
      }
      .meta-table th {
        width: 148px;
        font-size: 13px;
        font-weight: 700;
        color: #56705f;
      }
      .meta-table td {
        font-size: 15px;
        line-height: 1.7;
        color: #183c2a;
      }
      .footer {
        margin-top: 28px;
        padding-top: 18px;
        border-top: 1px solid rgba(17, 53, 34, 0.12);
        font-size: 12px;
        line-height: 1.8;
        color: #6e8178;
      }
      @media print {
        body {
          background: white;
        }
        .sheet {
          width: auto;
          margin: 0;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <p class="eyebrow">Simple Estimate Sheet</p>
      <h1 class="title">크리스피크림도넛 케이터링 트럭 견적서</h1>
      <p class="subtitle">내부 공유용으로 바로 확인할 수 있도록 행사 정보 기준의 참고 견적을 정리한 문서입니다.</p>

      <section class="hero">
        <div class="hero-label">Estimated Total (VAT 포함)</div>
        <p class="hero-price">${escapeHtml(formatCurrency(estimatedTotal))}</p>
        <p class="hero-note">
          ${escapeHtml(activeMenu.label)} / ${escapeHtml(`${attendees}명`)} / ${escapeHtml(activeRegion.label)} / ${escapeHtml(`전력 사용 ${activePower.label}`)} 기준 VAT 포함 참고 견적입니다.
          현장 동선, 운영 시간, 전기 지원 여부에 따라 실제 제안은 달라질 수 있습니다.
        </p>
      </section>

      <section class="grid">
        <article class="box">
          <div class="box-label">운영 메뉴</div>
          <div class="box-value">${escapeHtml(activeMenu.label)}</div>
          <div class="box-text">${escapeHtml(activeMenu.description)}</div>
        </article>
        <article class="box">
          <div class="box-label">추천 패키지</div>
          <div class="box-value">${escapeHtml(recommendedPackage.label)}</div>
          <div class="box-text">${escapeHtml(recommendedPackage.note)}</div>
        </article>
      </section>

      <section class="box" style="margin-top: 14px;">
        <table class="meta-table">
          <tbody>
            <tr>
              <th>예상 인원</th>
              <td>${escapeHtml(`${attendees}명`)}</td>
            </tr>
            <tr>
              <th>행사 지역</th>
              <td>${escapeHtml(activeRegion.label)}<br />${escapeHtml(activeRegion.note)}</td>
            </tr>
            <tr>
              <th>전력 사용 가능 여부</th>
              <td>${escapeHtml(activePower.label)}</td>
            </tr>
            <tr>
              <th>지역 가산</th>
              <td>${escapeHtml(activeRegion.surcharge > 0 ? formatCurrency(activeRegion.surcharge) : "없음")}</td>
            </tr>
            <tr>
              <th>발전기 사용 비용</th>
              <td>${escapeHtml(activePower.surcharge > 0 ? "100,000원 추가발생" : "없음")}</td>
            </tr>
            <tr>
              <th>수량추가 운반비</th>
              <td>${escapeHtml(transportSurcharge > 0 ? "100,000원 추가발생" : "없음")}</td>
            </tr>
            <tr>
              <th>추가 단가</th>
              <td>${escapeHtml(`기준 인원 초과 시 1인당 ${formatCurrency(activeMenu.perHead)} 추가`)}</td>
            </tr>
            <tr>
              <th>출력 일시</th>
              <td>${escapeHtml(formatTimestamp(issuedAt))}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <p class="footer">
        본 문서는 익명 행사 정보 기준의 VAT 포함 견적서이며, 실제 운영 제안은 행사 일정, 동선, 설치 조건, 운영 시간에 따라 조정될 수 있습니다.
        전화 상담 시 이 금액을 기준으로 빠르게 논의하실 수 있습니다.
      </p>
    </main>
  </body>
</html>`;

    const printWindow = window.open("", "_blank", "width=980,height=900");
    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(estimateHtml);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <section className="-mt-2 pb-14 sm:pb-24" id="quick-quote">
      <div className="section-shell">
        <div className="rounded-[28px] border border-forest-900/8 bg-white p-4 shadow-card sm:rounded-[32px] sm:p-8">
          <div className="mx-auto max-w-4xl">
            <div>
              <span className="section-label">Estimate Calculator</span>
              <h2 className="ko-heading mt-4 max-w-[12ch] text-[1.9rem] font-semibold tracking-tight text-forest-900 sm:max-w-[15ch] sm:text-3xl">
                예상 견적 계산기
              </h2>
              <p className="ko-body mt-4 max-w-[34rem] text-[15px] leading-7 text-forest-800/86 sm:text-base sm:leading-8">
                행사 인원, 지역, 운영 메뉴만 고르면 참고 견적을 바로 확인할 수 있습니다.
              </p>

              <div className="mt-5 rounded-[24px] bg-forest-800 px-5 py-5 text-cream shadow-soft sm:mt-6 sm:px-6 sm:py-6">
                <div className="overflow-hidden rounded-[20px] border border-white/12 bg-white/7 px-4 py-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">메뉴 선택</p>
                    <div className="mt-2 rounded-full border border-white/12 bg-white/8 p-1">
                      <div className="grid grid-cols-2 gap-1">
                        {menuOptions.map((option) => {
                          const active = option.id === menu;

                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => setMenu(option.id)}
                              className={`inline-flex min-h-[40px] items-center justify-center rounded-full px-3 text-[13px] font-semibold transition ${
                                active ? "bg-white text-forest-900 shadow-soft" : "text-cream/78"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">예상 인원</p>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-2 py-1 text-xs text-white">
                          <button
                            type="button"
                            onClick={() => updateAttendees(attendees - 1)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white transition hover:bg-white/16"
                            aria-label="인원 1명 감소"
                          >
                            -
                          </button>
                          <span className="min-w-[48px] text-center text-sm font-semibold text-white">{attendees}</span>
                          <button
                            type="button"
                            onClick={() => updateAttendees(attendees + 1)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white transition hover:bg-white/16"
                            aria-label="인원 1명 증가"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <input
                          type="range"
                          min={activeMenu.minAttendees}
                          max={activeMenu.maxAttendees}
                          step={1}
                          value={attendees}
                          onChange={(event) => updateAttendees(Number(event.target.value))}
                          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#ffd8d1]"
                        />
                        <div className="mt-2 flex items-center justify-between text-[11px] text-cream/68">
                          <span>{activeMenu.minAttendees}명</span>
                          <span className="font-semibold text-white">{attendees}명</span>
                          <span>{activeMenu.maxAttendees}명</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">행사 지역</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {regionOptions.map((option) => {
                          const active = option.id === region;

                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => setRegion(option.id)}
                              className={`inline-flex min-h-[40px] items-center justify-center rounded-[14px] border px-3 py-2 text-center text-[12px] font-semibold transition ${
                                active
                                  ? "border-white bg-white text-forest-900 shadow-soft"
                                  : "border-white/20 bg-transparent text-cream/82"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">전력 사용 가능 여부</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {powerOptions.map((option) => {
                          const active = option.id === power;

                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => setPower(option.id)}
                              className={`inline-flex min-h-[40px] items-center justify-center rounded-[14px] border px-3 py-2 text-center text-[12px] font-semibold transition ${
                                active
                                  ? "border-white bg-white text-forest-900 shadow-soft"
                                  : "border-white/20 bg-transparent text-cream/82"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                  <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd8d1]">Estimate Total · VAT 포함</p>
                    <p className="mt-2 text-sm font-medium text-cream/78">{activeMenu.label}</p>
                  </div>
                  {activeMenu.id === "combo" ? (
                    <DonutCoffeeIcon className="h-12 w-12 shrink-0 drop-shadow-[0_10px_12px_rgba(17,9,5,0.24)]" />
                  ) : (
                    <DonutIcon className="h-12 w-12 shrink-0 drop-shadow-[0_10px_12px_rgba(17,9,5,0.24)]" />
                  )}
                </div>

                <p className="ko-heading mt-4 text-[2rem] font-semibold leading-none text-white sm:text-[2.4rem]">
                  {formatCurrency(estimatedTotal)}
                </p>
                <p className="mt-3 text-sm leading-7 text-cream/80">
                  {attendees}명 기준, {activeRegion.label} {activeRegion.note}, 전력 사용 {activePower.label} 조건의 VAT 포함 예상 견적입니다.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-[12px] font-medium text-cream/84">
                    예상 인원 {attendees}명
                  </span>
                  <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-[12px] font-medium text-cream/84">
                    지역 {activeRegion.label}
                  </span>
                  <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-[12px] font-medium text-cream/84">
                    전력 사용 {activePower.label}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-white/15 bg-white/8 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">지역 가산 비용</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {activeRegion.surcharge > 0 ? formatCurrency(activeRegion.surcharge) : "무료 / 기본 포함"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-cream/76">{activeRegion.note}</p>
                  </div>
                  <div className="rounded-[18px] border border-white/15 bg-white/8 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">인당 추가금액 비용</p>
                    <p className="mt-2 text-base font-semibold text-white">{formatCurrency(activeMenu.perHead)}</p>
                    <p className="mt-1 text-sm leading-6 text-cream/76">
                      {activeMenu.minAttendees}명 초과 시 1인당 추가 적용
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-white/15 bg-white/8 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">발전기 사용비용</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {activePower.surcharge > 0 ? formatCurrency(activePower.surcharge) : "0원"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-cream/76">
                      {activePower.surcharge > 0 ? "발전기 사용비용 10만원 추가발생" : "전력 사용 가능 시 추가 비용 없음"}
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-white/15 bg-white/8 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">수량추가 운반비</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {transportSurcharge > 0 ? formatCurrency(transportSurcharge) : "0원"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-cream/76">
                      {transportSurcharge > 0
                        ? "기준 인원 초과로 수량추가 운반비 10만원 추가발생"
                        : "기준 인원 범위 내에서는 추가 없음"}
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-[18px] border border-white/15 bg-white/8 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd8d1]">추천 패키지</p>
                  <p className="mt-2 text-base font-semibold text-white">{recommendedPackage.label}</p>
                  <p className="mt-1 text-sm leading-6 text-cream/76">{recommendedPackage.note}</p>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  {kakaoInquiryUrl ? (
                    <a
                      href={kakaoInquiryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-[#E6CB00] bg-[#FEE500] px-6 text-sm font-semibold text-[#191919] shadow-[0_14px_26px_rgba(25,25,25,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(25,25,25,0.18)]"
                    >
                      예상 견적으로 카톡 상담하기
                    </a>
                  ) : null}
                  <a
                    href={callTarget}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-forest-900 transition hover:bg-blush"
                  >
                    예상 견적으로 전화 상담하기
                  </a>
                  <button
                    type="button"
                    onClick={handlePrintEstimate}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/24 px-6 text-sm font-semibold text-cream transition hover:bg-white/10"
                  >
                    견적서 PDF 저장
                  </button>
                  <a
                    href="#packages"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/24 px-6 text-sm font-semibold text-cream transition hover:bg-white/10"
                  >
                    추천 패키지 더 보기
                  </a>
                </div>
                {kakaoInquiryUrl ? (
                  <p className="mt-3 text-xs leading-6 text-cream/68">
                    카카오톡 상담 시 예: 안녕하세요. {activeRegion.label} / {attendees}명 / {activeMenu.label} 견적 문의드립니다.
                  </p>
                ) : null}
                <p className="mt-3 text-xs text-cream/62">출력 창에서 PDF 저장 또는 인쇄로 바로 공유할 수 있습니다.</p>
                {callNumber ? <p className="mt-1 text-xs text-cream/62">상담 연결: {callNumber}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
