import { siteContent } from "@/app/content";

export function BottomCtaSection() {
  const { contact, legal } = siteContent;

  return (
    <section className="py-16 sm:py-24">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[36px] bg-forest-800 px-6 py-10 text-cream shadow-soft sm:px-10 sm:py-14">
          <p className="text-sm font-semibold tracking-[0.12em] text-[#ffd8d1]">크리스피크림도넛 케이터링 트럭</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {siteContent.bottomCta.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-cream/80 sm:text-lg">
            {siteContent.bottomCta.description}
          </p>
          <div className="mt-6 grid gap-3 text-sm text-cream/85 sm:grid-cols-2 xl:grid-cols-3">
            {contact.contacts.map((item) => (
              <div
                key={item.phone}
                className="rounded-[20px] border border-white/15 bg-white/8 px-4 py-3 transition hover:bg-white/12"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ffd8d1]">{item.label}</p>
                <a href={item.href} className="ko-heading mt-1 block text-lg font-semibold text-white hover:text-[#ffd8d1]">
                  {item.phone}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-cream/76">{contact.metroNotice}</p>
          <p className="mt-4 text-sm text-cream/72">
            상담 가능 시간(평일 기준) {contact.consultHours} | 점심시간 {contact.lunchBreak}
          </p>
          <div className="mt-4 space-y-1 text-sm text-cream/76">
            <p>{legal.pageNotice}</p>
            <p>운영주체: {legal.operator}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteContent.bottomCta.primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-forest-900 transition hover:bg-blush"
            >
              {siteContent.bottomCta.primaryCta.label}
            </a>
            <a
              href={siteContent.bottomCta.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-cream transition hover:bg-white/10"
            >
              {siteContent.bottomCta.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
