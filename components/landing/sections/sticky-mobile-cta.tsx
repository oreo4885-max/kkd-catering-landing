const kakaoInquiryUrl = process.env.NEXT_PUBLIC_KAKAO_INQUIRY_URL ?? "";

function KakaoMark() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#191919] shadow-[0_6px_12px_rgba(25,25,25,0.18)]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#FEE500]">
        <path d="M12 4C6.477 4 2 7.515 2 11.851c0 2.722 1.773 5.118 4.465 6.54l-.907 3.34c-.08.294.248.53.507.366l4.001-2.534c.628.09 1.273.138 1.934.138 5.523 0 10-3.515 10-7.85S17.523 4 12 4Z" />
      </svg>
    </span>
  );
}

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
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-[#E6CB00] bg-[#FEE500] px-4 text-[13px] font-semibold text-[#191919] shadow-card"
              aria-label="카카오톡 실시간 문의"
            >
              <KakaoMark />
              <span>카카오 문의</span>
            </a>
          ) : (
            <a
              href="#inquiry-contact"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-white px-4 text-[13px] font-semibold text-forest-900 shadow-card"
            >
              즉시 상담
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
