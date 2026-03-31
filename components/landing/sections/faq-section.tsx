import { siteContent } from "@/app/content";
import { FaqAccordion } from "../faq-accordion";
import { SectionIntro } from "../section-intro";

export function FaqSection() {
  return (
    <section className="py-16 sm:py-24" id="faq">
      <div className="section-shell">
        <SectionIntro {...siteContent.sections.faq} />
        <div className="mt-10">
          <FaqAccordion items={siteContent.faq} />
        </div>
      </div>
    </section>
  );
}
