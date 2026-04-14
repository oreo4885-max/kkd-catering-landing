const kakaoInquiryUrl = process.env.NEXT_PUBLIC_KAKAO_INQUIRY_URL ?? "";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-900/10 bg-cream/98 px-4 pb-[calc(0.7rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_18px_rgba(16,34,23,0.06)] sm:hidden">
      <div className="mx-auto max-w-[34rem]">
        <div className="flex items-center gap-2.5">
        <a
          href="#quick-quote"
          className="flex h-10 flex-1 items-center justify-center rounded-full bg-[#d85f47] px-4 text-[13px] font-semibold text-white shadow-card"
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
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-white px-4 text-[13px] font-semibold text-forest-900 shadow-card"
          >
            전화 상담
          </a>
        )}
        </div>
      </div>
    </div>
  );
}
