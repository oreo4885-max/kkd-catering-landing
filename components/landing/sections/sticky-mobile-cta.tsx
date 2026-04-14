const kakaoInquiryUrl = process.env.NEXT_PUBLIC_KAKAO_INQUIRY_URL ?? "";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-900/10 bg-cream/98 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_24px_rgba(16,34,23,0.08)] sm:hidden">
      <div className="mx-auto flex max-w-[34rem] items-center gap-2.5">
        <a
          href="#quick-quote"
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-forest-800 px-5 text-sm font-semibold text-cream shadow-card"
        >
          빠른 견적 내기
        </a>

        {kakaoInquiryUrl ? (
          <a
            href={kakaoInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-[#E6CB00] bg-[#FEE500] px-4 text-sm font-semibold text-[#191919] shadow-card"
            aria-label="카카오톡 실시간 문의"
          >
            카톡 문의
          </a>
        ) : (
          <a
            href="#inquiry-contact"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-white px-4 text-sm font-semibold text-forest-900 shadow-card"
          >
            전화 상담
          </a>
        )}
      </div>
    </div>
  );
}
