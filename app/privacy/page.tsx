import { siteContent } from "@/app/content";

export default function PrivacyPage() {
  const { legal } = siteContent;

  return (
    <main className="py-12 sm:py-16">
      <div className="section-shell max-w-4xl">
        <div className="card-surface rounded-[28px] p-6 sm:rounded-[32px] sm:p-10">
          <span className="section-label">Privacy Policy</span>
          <h1 className="section-title">개인정보처리방침</h1>
          <p className="section-description">{legal.pageNotice}</p>

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
              <h2 className="ko-heading text-xl font-semibold text-forest-900">2. 웹페이지 개인정보 수집 여부</h2>
              <p className="mt-2">
                현재 본 랜딩페이지는 웹 문의 폼을 운영하지 않으며, 방문자가 페이지에서 이름, 연락처, 이메일 등 개인정보를 직접 입력해
                전송하도록 구성하지 않았습니다.
              </p>
              <p className="mt-2">
                상담은 페이지에 안내된 번호를 통한 직접 전화 연결 방식으로 진행되며, 웹페이지 자체에서는 별도의 개인정보 저장 기능을
                사용하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="ko-heading text-xl font-semibold text-forest-900">3. 전화 상담 안내</h2>
              <p className="mt-2">
                고객이 공개된 상담 번호로 직접 연락하시는 경우, 실제 상담 과정에서 필요한 범위의 정보는 영업 상담 및 운영 가능 여부
                확인을 위해 별도로 확인될 수 있습니다.
              </p>
              <p className="mt-2">
                전화 상담 이후 전달되는 정보는 상담 목적에 필요한 최소 범위에서만 취급하며, 별도의 내부 운영 기준에 따라 관리합니다.
              </p>
            </section>

            <section>
              <h2 className="ko-heading text-xl font-semibold text-forest-900">4. 운영 방식</h2>
              <p className="mt-2">본 페이지는 크리스피크림도넛 영업 상담을 보다 쉽게 안내하기 위한 랜딩페이지입니다.</p>
              <p className="mt-2">
                문의가 필요한 경우, 공개된 지역 담당 번호로 직접 전화해 상담을 진행해 주시기 바랍니다.
              </p>
            </section>

            <section>
              <h2 className="ko-heading text-xl font-semibold text-forest-900">5. 문의</h2>
              <p className="mt-2">추가 확인이 필요하신 경우 아래 운영 연락처로 문의해 주세요.</p>
              <p className="mt-2">
                <a href={`mailto:${legal.operatorEmail}`} className="underline underline-offset-4">
                  {legal.operatorEmail}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
