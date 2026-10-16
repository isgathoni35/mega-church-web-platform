import type { Metadata } from "next";
import { Montserrat, Great_Vibes } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://heavensgatesugutta.org");

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Suggutta Fellowship Church — Growing Together in Christ",
    template: "%s | Suggutta Fellowship Church",
  },
  description:
    "Official platform for Heavens Gates Suggutta Fellowship Church International in Suggutta, Kenya led by Pastor Caesar O. Nyandwaro. Experience divine deliverance, live worship, apostolic teachings, and community compassion.",
  keywords: [
    "Suggutta Fellowship Church",
    "Suguta Fellowship Church",
    "Heavens Gate Suggutta Fellowship Church International",
    "Heavens Gates Suguta Fellowship Church",
    "Pastor Caesar O. Nyandwaro",
    "Pastor Caesar Nyandwaro",
    "Church in Suggutta",
    "Suguta church Kenya",
    "Sugutta church Kisii",
    "Nyatierio crusade",
    "Suggutta Children's Home",
    "Sugutta orphanage donation",
    "Deliverance and healing church Kenya",
    "Suggutta live sermon broadcast",
    "Pastor Caesar Kenya",
    "Apostolic ministry Kenya",
  ],
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/images/sugutta-logo.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/images/sugutta-logo.png?v=2", type: "image/png", sizes: "192x192" },
    ],
    apple: "/images/sugutta-logo.png?v=2",
    shortcut: "/favicon.ico?v=2",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: appUrl,
    siteName: "Suggutta Fellowship Church",
    title: "Suggutta Fellowship Church — Growing Together in Christ",
    description:
      "Official platform for Heavens Gates Suggutta Fellowship Church International in Suggutta, Kenya led by Pastor Caesar O. Nyandwaro.",
    images: [
      {
        url: "/images/sugutta-logo.png",
        width: 800,
        height: 800,
        alt: "Suggutta Fellowship Church Official Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suggutta Fellowship Church — Growing Together in Christ",
    description:
      "Official platform for Heavens Gates Suggutta Fellowship Church International in Suggutta, Kenya led by Pastor Caesar O. Nyandwaro.",
    images: ["/images/sugutta-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google588d0492ff614569",
  },
};

export const dynamic = "force-dynamic";

import { getSiteSettingsAction } from "@/actions/admin-settings";
import { ScrollObserverInit } from "@/components/ui/scroll-reveal";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettingsAction();

  const churchJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Church", "PlaceOfWorship", "Organization"],
        "@id": `${appUrl}/#church`,
        name: "Suggutta Fellowship Church",
        alternateName: [
          "Suguta Fellowship Church",
          "Heavens Gate Suggutta Fellowship Church International",
          "Heavens Gates Suguta Fellowship Church",
          "Suggutta Fellowship",
          "Suguta Church Kenya",
        ],
        url: appUrl,
        logo: `${appUrl}/images/sugutta-logo.png`,
        image: [
          `${appUrl}/images/sugutta-logo.png`,
          `${appUrl}/images/pastor-caesar-hero.jpg`,
          `${appUrl}/images/community-outreach.jpg`,
          `${appUrl}/images/orphanage-hero.png`,
        ],
        description:
          "Official platform for Heavens Gates Suggutta Fellowship Church International in Suggutta, Kenya led by Pastor Caesar O. Nyandwaro. Divine deliverance, apostolic word, Sunday services, and compassion outreach.",
        telephone: settings.mpesaPhone || "+254112656123",
        email: settings.contactEmail || "sugutafellowshipchurch@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.physicalLocation || "Suggutta Sanctuary",
          addressLocality: "Suggutta",
          addressRegion: "Kisii County",
          postalCode: settings.postalAddress || "405-40211",
          addressCountry: "KE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -0.803,
          longitude: 34.805,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday"],
            opens: "06:00",
            closes: "13:00",
            description: "5 Anointed Sunday Services (Dawn to Midday)",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Wednesday"],
            opens: "17:00",
            closes: "19:30",
            description: "Midweek Deliverance & Bible Exposition",
          },
        ],
        founder: {
          "@type": "Person",
          name: settings.pastorName || "Pastor Caesar O. Nyandwaro",
          jobTitle: settings.pastorTitle || "Resident Pastor & Visionary Leader",
          image: `${appUrl}${settings.pastorImageUrl || "/images/pastor-caesar.jpg"}`,
        },
        sameAs: [
          settings.youtubeChannelUrl || "https://www.youtube.com/@Brianmbera",
          settings.facebookUrl || "https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH",
          settings.instagramUrl || "https://instagram.com/suggutta",
        ].filter(Boolean),
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${greatVibes.variable} h-full antialiased overflow-x-clip`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent selection:text-accent-foreground overflow-x-clip w-full max-w-full">
        <ScrollObserverInit />
        <SiteHeader settings={settings} />
        <main className="flex-1 flex flex-col w-full max-w-full overflow-x-clip">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
