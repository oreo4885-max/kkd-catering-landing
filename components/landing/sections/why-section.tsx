import { siteContent } from "@/app/content";
import { SectionIntro } from "../section-intro";

function DonutBadge() {
  return (
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3ee] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <svg aria-hidden="true" viewBox="0 0 64 64" className="h-9 w-9 drop-shadow-[0_2px_3px_rgba(191,104,39,0.22)]">
        <defs>
          <radialGradient id="donut-hole" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#fffdfa" />
            <stop offset="65%" stopColor="#fff4df" />
            <stop offset="100%" stopColor="#edd5a7" />
          </radialGradient>
          <linearGradient id="donut-glaze" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe2ad" />
            <stop offset="45%" stopColor="#dca05c" />
            <stop offset="100%" stopColor="#b96b2f" />
          </linearGradient>
        </defs>
        <ellipse cx="32" cy="34" rx="24" ry="18" fill="url(#donut-glaze)" />
        <ellipse cx="32" cy="31" rx="22" ry="16" fill="#f7cf95" opacity="0.65" />
        <ellipse cx="32" cy="33" rx="10.5" ry="7.5" fill="url(#donut-hole)" />
        <ellipse cx="24" cy="25" rx="9" ry="4.5" fill="#fff7e8" opacity="0.55" />
        <ellipse cx="44" cy="37" rx="6.5" ry="3.2" fill="#fff0cf" opacity="0.35" />
      </svg>
    </div>
  );
}

export function WhySection() {
  return (
    <section className="py-16 sm:py-24" id="why">
      <div className="section-shell">
        <SectionIntro {...siteContent.sections.why} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.reasons.map((reason) => (
            <article key={reason.title} className="card-surface rounded-[28px] p-6">
              <DonutBadge />
              <h3 className="mt-5 text-xl font-semibold text-forest-900">{reason.title}</h3>
              <p className="mt-3 text-sm leading-7 text-forest-800/80">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
