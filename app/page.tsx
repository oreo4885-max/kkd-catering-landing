import {
  BottomCtaSection,
  CoBrandingSection,
  FaqSection,
  HeroSection,
  InquirySection,
  PackagesSection,
  ProcessSection,
  QuickQuoteSection,
  ReferencesSection,
  StickyMobileCta,
  TopNav,
  UseCasesSection,
  WhySection,
} from "@/components/landing";

export default function Home() {
  return (
    <main className="pb-24 sm:pb-10">
      <TopNav />
      <HeroSection />
      <QuickQuoteSection />
      <WhySection />
      <UseCasesSection />
      <PackagesSection />
      <CoBrandingSection />
      <ReferencesSection />
      <ProcessSection />
      <FaqSection />
      <InquirySection />
      <BottomCtaSection />
      <StickyMobileCta />
    </main>
  );
}
