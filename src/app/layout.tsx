import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { getSiteProfile } from "@/app/actions/profile";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { Providers } from "@/components/providers/Providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfile();
  return {
    title: profile?.siteTitle || "Silvin Lanka - Explore Sri Lanka",
    description: profile?.siteDescription || "Discover the beauty of Sri Lanka with Silvin Lanka's curated tours.",
    keywords: profile?.keywords?.split(",") || ["travel", "sri lanka", "tours"],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <AnalyticsTracker />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
