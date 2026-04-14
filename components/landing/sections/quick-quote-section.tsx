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

  const handlePrintEstimate = () => {
    const issuedAt = new Date();
    const estimateHtml = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>크리스피크림도넛 케이터링 트럭 간이 견적서</title>
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
      <h1 class="title">크리스피크림도넛 케이터링 트럭 간이 견적서</h1>
      <p class="subtitle">내부 품의용으로 바로 공유할 수 있도록 행사 정보 기준의 참고 견적을 정리한 문서입니다.</p>

      <section class="hero">
        <div class="hero-label">Estimated Total</div>
        <p class="hero-price">${escapeHtml(formatCurrency(estimatedTotal))}</p>
        <p class="hero-note">
          ${escapeHtml(activeMenu.label)} / ${escapeHtml(`${attendees}명`)} / ${escapeHtml(activeRegion.label)} 기준 참고 견적입니다.
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
              <th>1인 기준</th>
              <td>${escapeHtml(formatCurrency(perHeadPrice))}</td>
            </tr>
            <tr>
              <th>지역 가산</th>
              <td>${escapeHtml(activeRegion.surcharge > 0 ? formatCurrency(activeRegion.surcharge) : "없음")}</td>
            </tr>
            <tr>
              <th>출력 일시</th>
              <td>${escapeHtml(formatTimestamp(issuedAt))}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <p class="footer">
        본 문서는 익명 행사 정보 기준의 간이 견적서이며, 실제 운영 제안은 행사 일정, 동선, 설치 조건, 운영 시간에 따라 조정될 수 있습니다.
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

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <a
                    href={callTarget}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-forest-900 transition hover:bg-blush"
                  >
                    예상 견적 그대로 전화 상담하기
                  </a>
                  <button
                    type="button"
                    onClick={handlePrintEstimate}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/24 px-6 text-sm font-semibold text-cream transition hover:bg-white/10"
                  >
                    간이 견적서 PDF 저장
                  </button>
                  <a
                    href="#packages"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/24 px-6 text-sm font-semibold text-cream transition hover:bg-white/10"
                  >
                    추천 패키지 더 보기
                  </a>
                </div>
                <div className="mt-4 rounded-[18px] border border-white/12 bg-white/7 px-4 py-3 text-sm leading-6 text-cream/84">
                  고객사 예산에 맞춘 메뉴 및 수량 조정이 가능합니다. 우선 상담을 남겨주시면 운영 가능한 방향으로 함께 조율해드립니다.
                </div>
                <p className="mt-3 text-xs text-cream/62">출력 창에서 PDF 저장 또는 인쇄로 바로 공유할 수 있습니다.</p>
                {callNumber ? <p className="mt-1 text-xs text-cream/62">상담 연결: {callNumber}</p> : null}
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
