const kakaoInquiryUrl = process.env.NEXT_PUBLIC_KAKAO_INQUIRY_URL ?? "";

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
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#191919] text-xs font-black text-[#FEE500]">
        톡
      </span>
      <span>카카오톡 실시간 문의</span>
    </a>
  );
}
