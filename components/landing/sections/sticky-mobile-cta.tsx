export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-900/10 bg-cream/98 p-4 sm:hidden">
      <a
        href="#inquiry-contact"
        className="flex h-12 items-center justify-center rounded-full bg-forest-800 px-5 text-sm font-semibold text-cream shadow-card"
      >
        전화 상담 번호 보기
      </a>
    </div>
  );
}
