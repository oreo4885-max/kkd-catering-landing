import { siteContent } from "@/app/content";
import { InquiryForm } from "../inquiry-form";
import { SectionIntro } from "../section-intro";

export function InquirySection() {
  const { contact, legal } = siteContent;

  return (
    <section className="py-14 sm:py-24" id="inquiry">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <SectionIntro {...siteContent.sections.inquiry} />
            <div className="mt-6 card-surface rounded-[24px] p-5 sm:mt-8 sm:rounded-[28px] sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">
                {siteContent.inquiryForm.title}
              </p>
              <p className="mt-3 text-[14px] leading-6 text-forest-800/85 sm:mt-4 sm:text-sm sm:leading-7">{siteContent.inquiryForm.description}</p>
              <div className="mt-4 rounded-[20px] bg-forest-800 px-4 py-3.5 text-[13px] leading-6 text-cream/90 sm:rounded-[22px] sm:py-4 sm:text-sm sm:leading-7">
                빠른 확인을 원하시면 `업체명`, `연락처`, `행사일`만 먼저 남겨주셔도 검토를 시작할 수 있습니다.
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
            <div className="mt-4 card-surface rounded-[24px] p-5 sm:rounded-[28px] sm:p-6" id="inquiry-contact">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">{contact.title}</p>
              <div className="mt-4 grid gap-3">
                {contact.contacts.map((item) => (
                  <div
                    key={item.phone}
                    className="rounded-[20px] border border-forest-900/8 bg-white px-4 py-3.5 transition hover:border-forest-700/25 hover:bg-forest-50 sm:rounded-[22px] sm:py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-700/70">{item.label}</p>
                    <a href={item.href} className="ko-heading mt-2 block text-[1.1rem] font-semibold text-forest-900 hover:text-forest-700 sm:text-xl">
                      {item.phone}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-[20px] bg-forest-50 px-4 py-3.5 text-[13px] leading-6 text-forest-800/85 sm:rounded-[22px] sm:py-4 sm:text-sm sm:leading-7">
                <p>
                  상담 가능 시간: <span className="font-semibold text-forest-900">{contact.consultHours}</span>
                </p>
                <p>
                  점심시간: <span className="font-semibold text-forest-900">{contact.lunchBreak}</span>
                </p>
              </div>
            </div>
          </div>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
