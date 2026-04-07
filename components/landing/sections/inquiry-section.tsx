import { siteContent } from "@/app/content";

export function InquirySection() {
  const { contact, legal } = siteContent;

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
              <div className="mt-4 rounded-[20px] border border-forest-900/8 bg-forest-50 px-4 py-3.5 text-[13px] leading-6 text-forest-800/88 sm:rounded-[22px] sm:py-4 sm:text-sm sm:leading-7">
                <p className="font-semibold text-forest-900">{legal.pageNotice}</p>
                <p className="mt-2">
                  운영주체: <span className="font-medium text-forest-900">{legal.operator}</span>
                </p>
                <a href={`mailto:${legal.operatorEmail}`} className="underline underline-offset-4">
                  {legal.operatorEmail}
                </a>
              </div>
            </div>
          </div>
          <div className="card-surface rounded-[28px] p-5 sm:rounded-[32px] sm:p-8" id="inquiry-contact">
            <div className="rounded-[24px] bg-forest-900 px-5 py-5 text-cream sm:px-6 sm:py-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffd8d1]">Direct Call Guide</p>
              <h3 className="ko-heading mt-3 text-2xl font-semibold leading-tight text-white sm:text-[2rem]">전화로 바로 상담하실 수 있습니다</h3>
              <p className="mt-3 text-sm leading-7 text-cream/80 sm:text-base">
                지역 담당 번호로 직접 연결해 행사일, 지역, 예상 인원만 말씀해 주시면 운영 가능 여부와 추천 패키지를 빠르게 안내드립니다.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {contact.contacts.map((item) => (
                <a
                  key={item.phone}
                  href={item.href}
                  className="rounded-[24px] border border-forest-900/10 bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:border-forest-700/25 hover:bg-forest-50"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-700/70">{item.label}</p>
                  <p className="ko-heading mt-3 text-2xl font-semibold text-forest-900 sm:text-[1.9rem]">{item.phone}</p>
                  <p className="mt-3 inline-flex rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800">
                    전화 바로 연결
                  </p>
                </a>
              ))}
            </div>

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
                  상담 가능 시간: <span className="font-semibold text-forest-900">{contact.consultHours}</span>
                </p>
                <p>
                  점심시간: <span className="font-semibold text-forest-900">{contact.lunchBreak}</span>
                </p>
                <p className="mt-2 text-forest-700/80">문의가 몰리는 시간대에는 순차적으로 연결될 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
