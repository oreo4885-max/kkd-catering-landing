import { siteContent } from "@/app/content";
import { SectionIntro } from "../section-intro";

export function WhySection() {
  return (
    <section className="py-16 sm:py-24" id="why">
      <div className="section-shell">
        <SectionIntro {...siteContent.sections.why} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.reasons.map((reason) => (
            <article key={reason.title} className="card-surface rounded-[28px] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blush px-2 text-[10px] font-semibold leading-tight text-kkdred">
                크리스피
              </div>
              <h3 className="mt-5 text-xl font-semibold text-forest-900">{reason.title}</h3>
              <p className="mt-3 text-sm leading-7 text-forest-800/80">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
