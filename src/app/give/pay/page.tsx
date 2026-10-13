import type { Metadata } from "next";
import { Suspense } from "react";
import { InstantPayView } from "@/components/giving/instant-pay-view";
import { getSiteSettingsAction } from "@/actions/admin-settings";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Instant Giving Portal | Heavens Gates Sugutta Fellowship Church",
  description:
    "Direct and secure digital giving portal for M-Pesa Buy Goods Till, KCB Paybill, Sendwave, and bank wire. Zero intermediary fees.",
};

export const dynamic = "force-dynamic";

export default async function InstantPayPage() {
  const settings = await getSiteSettingsAction();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf8f3] flex flex-col items-center justify-center p-6 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#ff6b35] animate-spin" />
          <p className="text-sm font-bold text-slate-700">Loading Church Payment Portal...</p>
        </div>
      }
    >
      <InstantPayView settings={settings} />
    </Suspense>
  );
}
