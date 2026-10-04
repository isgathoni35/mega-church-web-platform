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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://heavensgatesugutta.org"
  ),
  title: {
    default: "Sugutta Fellowship Church — Growing Together in Christ",
    template: "%s | Sugutta Fellowship Church",
  },
  description:
    "Official platform for Heavens Gates Sugutta Fellowship Church International. Growing Together in Christ (Matthew 18:20). Experience divine deliverance, live worship, apostolic teachings, and digital giving.",
  icons: {
    icon: [
      { url: "/images/sugutta-logo.png", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/images/sugutta-logo.png",
    shortcut: "/images/sugutta-logo.png",
  },
  openGraph: {
    title: "Sugutta Fellowship Church — Growing Together in Christ",
    description:
      "Official platform for Heavens Gates Sugutta Fellowship Church International. Growing Together in Christ (Matthew 18:20).",
    images: [{ url: "/images/sugutta-logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${greatVibes.variable} h-full antialiased overflow-x-clip`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent selection:text-accent-foreground overflow-x-clip w-full max-w-full">
        <SiteHeader />
        <main className="flex-1 flex flex-col w-full max-w-full overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
