import { siteContent } from "@/app/content";

export function InquirySection() {
  const { contact, legal } = siteContent;
  const kakaoInquiryUrl = process.env.NEXT_PUBLIC_KAKAO_INQUIRY_URL ?? "";

  return (
    <section className="py-14 sm:py-24" id="inquiry">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <div className="card-surface rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
              <div className="rounded-[22px] bg-forest-800 px-5 py-5 text-base font-semibold leading-8 text-cream sm:px-6 sm:py-6 sm:text-[1.08rem] sm:leading-9">
                <span className="text-white">전화 상담 시 업체명, 행사일, 예상 인원</span> 정도만 말씀해 주셔도
                운영 가능 여부와 방향을 빠르게 안내드릴 수 있습니다.
              </div>
              {kakaoInquiryUrl ? (
                <div className="mt-4 rounded-[22px] border border-[#E6CB00] bg-[#FFF6B1] px-4 py-4 text-[13px] leading-6 text-[#3a3110] sm:px-5 sm:text-sm sm:leading-7">
                  <p className="font-semibold text-[#241b00]">카카오톡 문의 예시</p>
                  <p className="mt-2 rounded-[18px] bg-white/65 px-4 py-3 font-medium text-[#3f3211]">
                    “안녕하세요. 부산 / 5월 20일 / 120명 / 기업행사 문의드립니다.”
                  </p>
                </div>
              ) : null}
              <div className="mt-4 rounded-[20px] border border-forest-900/8 bg-white px-4 py-4 text-[13px] leading-6 text-forest-800/88 sm:px-5 sm:text-sm sm:leading-7">
                <p className="font-semibold text-forest-900">일반 간식차와 다른 점</p>
                <ul className="mt-2 space-y-1.5">
                  <li>브랜드 인지도가 바로 보이는 현장 운영</li>
                  <li>도넛 + 커피 조합으로 체감 만족도 강화</li>
                  <li>사진이 남는 비주얼과 행사 분위기 연출</li>
                  <li>공동 브랜딩 협의 가능</li>
                </ul>
              </div>
              <div className="mt-4 rounded-[20px] border border-forest-900/8 bg-forest-50 px-4 py-3.5 text-[13px] leading-6 text-forest-800/88 sm:rounded-[22px] sm:py-4 sm:text-sm sm:leading-7">
                <p className="font-semibold text-forest-900">{legal.pageNotice}</p>
                <p className="mt-2">
                  운영주체: <span className="font-medium text-forest-900">{legal.operator}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="card-surface rounded-[28px] p-5 sm:rounded-[32px] sm:p-8" id="inquiry-contact">
            <div className="rounded-[24px] bg-forest-900 px-5 py-5 text-cream sm:px-6 sm:py-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffd8d1]">Direct Call Guide</p>
              <h3 className="ko-heading mt-3 text-2xl font-semibold leading-tight text-white sm:text-[2rem]">
                문의 방식에 맞게 더 빠르게 연결해드립니다
              </h3>
              <p className="mt-3 text-sm leading-7 text-cream/80 sm:text-base">
                전화는 빠른 일정 확인용, 카카오톡은 조건 정리와 텍스트 문의용으로 활용하시면 더 편하게 상담하실 수 있습니다.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href={contact.contacts[0]?.href ?? "#inquiry-contact"}
                  className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-forest-900 transition hover:bg-blush"
                >
                  전화 상담 바로 연결
                </a>
                {kakaoInquiryUrl ? (
                  <a
                    href={kakaoInquiryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#E6CB00] bg-[#FEE500] px-5 text-sm font-semibold text-[#191919] shadow-[0_14px_26px_rgba(25,25,25,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(25,25,25,0.18)]"
                  >
                    카카오톡 문의
                  </a>
                ) : (
                  <a
                    href="#inquiry-contact"
                    className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/14"
                  >
                    문의 안내 보기
                  </a>
                )}
              </div>
              <div className="mt-4 rounded-[20px] border border-white/12 bg-white/8 px-4 py-3 text-[13px] leading-6 text-cream/86 sm:text-sm sm:leading-7">
                <p className="font-semibold text-white">빠른 상담 안내</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["행사일", "행사 지역", "예상 인원"].map((item) => (
                    <span key={item} className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[12px] font-medium text-white/88">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-cream/76">행사일 / 지역 / 인원만 알려주셔도 추천 메뉴와 운영 방향을 빠르게 안내드립니다.</p>
              </div>
            </div>

            <div className="mt-5 max-w-[420px]">
              {contact.contacts.map((item) => (
                <a
                  key={item.phone}
                  href={item.href}
                  className="block rounded-[24px] border border-forest-900/10 bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:border-forest-700/25 hover:bg-forest-50"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-700/70">{item.label}</p>
                  <p className="ko-heading mt-3 text-2xl font-semibold text-forest-900 sm:text-[1.9rem]">{item.phone}</p>
                  <p className="mt-3 inline-flex rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800">
                    전화 바로 연결
                  </p>
                </a>
              ))}
            </div>
            <p className="mt-3 rounded-[18px] border border-forest-900/8 bg-forest-50 px-4 py-3 text-[13px] leading-6 text-forest-800/82 sm:text-sm sm:leading-7">
              {contact.metroNotice}
            </p>

            <div className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[22px] border border-forest-900/8 bg-forest-50 px-5 py-4 text-[13px] leading-6 text-forest-800/88 sm:text-sm sm:leading-7">
                <p className="font-semibold text-forest-900">통화 전 준비하면 좋은 정보</p>
                <ul className="mt-2 space-y-1.5">
                  <li>업체명 또는 행사명</li>
                  <li>희망 행사일과 지역</li>
                  <li>예상 인원과 원하는 운영 분위기</li>
                </ul>
              </div>
              <div className="rounded-[22px] border border-forest-900/8 bg-white px-5 py-4 text-[13px] leading-6 text-forest-800/88 sm:text-sm sm:leading-7">
                <p className="font-semibold text-forest-900">{contact.title}</p>
                <p className="mt-2">
                  상담 가능 시간(평일 기준): <span className="font-semibold text-forest-900">{contact.consultHours}</span>
                </p>
                <p>
                  점심시간: <span className="font-semibold text-forest-900">{contact.lunchBreak}</span>
                </p>
                <p className="mt-2 text-forest-700/80">문의가 몰리는 시간대에는 순차적으로 연결될 수 있습니다.</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[20px] border border-forest-900/8 bg-white px-4 py-4 text-[13px] leading-6 text-forest-800/86">
                <p className="font-semibold text-forest-900">운영 가능 지역</p>
                <p className="mt-2">부산, 김해, 대구, 창원, 울산 중심으로 상담 가능합니다.</p>
              </div>
              <div className="rounded-[20px] border border-forest-900/8 bg-white px-4 py-4 text-[13px] leading-6 text-forest-800/86">
                <p className="font-semibold text-forest-900">권장 문의 시점</p>
                <p className="mt-2">행사일 기준 최소 2주 전 문의 시 운영 가능성을 더 빠르게 안내드릴 수 있습니다.</p>
              </div>
              <div className="rounded-[20px] border border-forest-900/8 bg-white px-4 py-4 text-[13px] leading-6 text-forest-800/86">
                <p className="font-semibold text-forest-900">전기 필요 여부</p>
                <p className="mt-2">현장 전기 지원 가능 여부를 함께 알려주시면 운영 방식 확인이 더 빨라집니다.</p>
              </div>
              <div className="rounded-[20px] border border-forest-900/8 bg-white px-4 py-4 text-[13px] leading-6 text-forest-800/86">
                <p className="font-semibold text-forest-900">최종 견적 안내</p>
                <p className="mt-2">운영 시간, 동선, 설치 조건에 따라 최종 견적은 달라질 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
