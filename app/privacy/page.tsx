import { siteContent } from "@/app/content";

const privacyItems = [
  "업체명, 담당자명, 연락처, 이메일, 행사일, 행사시간, 행사 장소, 예상 인원, 희망 패키지, 전기 지원 가능 여부, 공동 브랜딩 가능 여부, 사진/영상 활용 가능 여부, 추가 요청사항",
];

const purposes = [
  "케이터링 상담 접수 및 운영 가능 여부 확인",
  "행사 규모와 목적에 맞는 패키지, 견적, 제안 안내",
  "문의자와의 상담 회신 및 운영 협의",
];

export default function PrivacyPage() {
  const { legal } = siteContent;

  return (
    <main className="py-12 sm:py-16">
      <div className="section-shell max-w-4xl">
        <div className="card-surface rounded-[28px] p-6 sm:rounded-[32px] sm:p-10">
          <span className="section-label">Privacy Policy</span>
          <h1 className="section-title">개인정보처리방침</h1>
          <p className="section-description">
            {legal.pageNotice}
          </p>

          <div className="mt-8 space-y-6 text-[15px] leading-8 text-forest-800">
            <section>
              <h2 className="ko-heading text-xl font-semibold text-forest-900">1. 운영주체</h2>
              <p className="mt-2">
                운영주체: <span className="font-semibold text-forest-900">{legal.operator}</span>
              </p>
              <p>
                문의:{" "}
                <a href={`mailto:${legal.operatorEmail}`} className="underline underline-offset-4">
                  {legal.operatorEmail}
                </a>
              </p>
            </section>

            <section>
              <h2 className="ko-heading text-xl font-semibold text-forest-900">2. 수집 항목</h2>
              <ul className="mt-2 list-disc pl-5">
                {privacyItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="ko-heading text-xl font-semibold text-forest-900">3. 수집 및 이용 목적</h2>
              <ul className="mt-2 list-disc pl-5">
                {purposes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="ko-heading text-xl font-semibold text-forest-900">4. 보유 및 파기</h2>
              <p className="mt-2">보유기간: {legal.retentionPeriod}</p>
              <p>파기기준: {legal.destructionPolicy}</p>
            </section>

            <section>
              <h2 className="ko-heading text-xl font-semibold text-forest-900">5. 동의 거부 권리</h2>
              <p className="mt-2">
                개인정보 수집 및 이용 동의를 거부하실 수 있으나, 문의 접수와 상담 회신이 제한될 수 있습니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
