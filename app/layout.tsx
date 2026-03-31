import type { Metadata } from "next";
import { Gothic_A1, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { siteContent } from "./content";

const bodyFont = Gothic_A1({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const displayFont = Noto_Sans_KR({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  keywords: siteContent.seo.keywords,
  metadataBase: new URL("https://kkd-catering.example.com"),
  openGraph: {
    title: siteContent.seo.ogTitle,
    description: siteContent.seo.ogDescription,
    url: "https://kkd-catering.example.com",
    siteName: "크리스피크림도넛 케이터링 트럭",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: siteContent.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "크리스피크림 도넛 케이터링 트럭 랜딩 페이지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.ogTitle,
    description: siteContent.seo.ogDescription,
    images: [siteContent.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
