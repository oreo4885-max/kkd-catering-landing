import { siteContent } from "@/app/content";
import { DonutIcon } from "../brand-icons";
import { SectionIntro } from "../section-intro";

export function WhySection() {
  return (
    <section className="py-16 sm:py-24" id="why">
      <div className="section-shell">
        <SectionIntro {...siteContent.sections.why} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.reasons.map((reason) => (
            <article key={reason.title} className="card-surface rounded-[28px] p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#fff3ee] shadow-[0_10px_20px_rgba(221,173,133,0.18),inset_0_1px_0_rgba(255,255,255,0.8)]">
                <DonutIcon className="h-11 w-11 drop-shadow-[0_5px_6px_rgba(191,104,39,0.24)]" />
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
