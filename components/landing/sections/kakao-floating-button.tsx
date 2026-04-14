const kakaoInquiryUrl = process.env.NEXT_PUBLIC_KAKAO_INQUIRY_URL ?? "";

function KakaoMark() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#191919] shadow-[0_8px_14px_rgba(25,25,25,0.18)]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-[#FEE500]">
        <path d="M12 4C6.477 4 2 7.515 2 11.851c0 2.722 1.773 5.118 4.465 6.54l-.907 3.34c-.08.294.248.53.507.366l4.001-2.534c.628.09 1.273.138 1.934.138 5.523 0 10-3.515 10-7.85S17.523 4 12 4Z" />
      </svg>
    </span>
  );
}

export function KakaoFloatingButton() {
  if (!kakaoInquiryUrl) return null;

  return (
    <a
      href={kakaoInquiryUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-[#E6CB00] bg-[#FEE500] px-4 py-3 text-sm font-semibold text-[#191919] shadow-[0_18px_30px_rgba(25,25,25,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_38px_rgba(25,25,25,0.2)] sm:inline-flex"
      aria-label="카카오톡 실시간 문의"
    >
      <KakaoMark />
      <span>카카오톡 실시간 문의</span>
    </a>
  );
}
