import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { SITE_INFO } from "@/src/lib/config/constants";

// The user requested weights up to 800
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_INFO.name}`,
    default: SITE_INFO.name,
  },
  description: SITE_INFO.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || SITE_INFO.domain),
  openGraph: {
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    url: SITE_INFO.domain,
    siteName: SITE_INFO.name,
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className={`${cairo.variable} font-cairo`}>{children}</body>
    </html>
  );
}
