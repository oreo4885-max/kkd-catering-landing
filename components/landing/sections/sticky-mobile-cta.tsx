import { siteContent } from "@/app/content";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-900/10 bg-cream/95 p-4 backdrop-blur sm:hidden">
      <a
        href={siteContent.hero.primaryCta.href}
        className="flex h-12 items-center justify-center rounded-full bg-forest-800 px-5 text-sm font-semibold text-cream shadow-card"
      >
        {siteContent.hero.primaryCta.label}
      </a>
    </div>
  );
}
