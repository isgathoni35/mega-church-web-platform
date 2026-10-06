import { Metadata } from "next";
import { Suspense } from "react";
import { CampaignDonationFlow, FlowState } from "@/components/giving/campaign-donation-flow";
import { ShieldCheck, Heart, Sparkles, BookOpen, Lock, Loader2 } from "lucide-react";
import { getSiteSettingsAction } from "@/actions/admin-settings";

export const metadata: Metadata = {
  title: "Give & Support the Ministry | Sugutta Fellowship Church International",
  description:
    "Partner with Sugutta Fellowship Church. Contribute towards the Sanctuary Construction, Children's Home, Tithes, and Kingdom Seeds securely via M-Pesa Till 8146952, Send Money 0112656123, Sendwave, or KCB Bank wire.",
};

interface GivePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GivePage({ searchParams }: GivePageProps) {
  const settings = await getSiteSettingsAction();
  const resolvedParams = await searchParams;
  const initialStep: FlowState =
    resolvedParams?.step === "form" ? "DONATION_FORM" : "CAMPAIGN_VIEW";
  const initialFund =
    typeof resolvedParams?.fund === "string" ? resolvedParams.fund.toUpperCase() : "BUILDING";

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-slate-900 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* ================= HERO BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] border-b border-slate-200/80 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kingdom Giving &bull; Tithes, Offerings &amp; Building Fund</span>
          </div>

          <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#ff6b35] tracking-tight leading-tight max-w-3xl mx-auto">
            We Give Because God First Gave
          </h1>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed">
            Every contribution fuels the proclamation of the Gospel, builds our permanent sanctuary, supports vulnerable children, and touches lives across Kenya and the nations.
          </p>
        </div>
      </section>

      {/* ================= 3-STATE RESPONSIVE DONATION FLOW ================= */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-6 sm:py-10 relative z-10">
        <Suspense
          fallback={
            <div className="p-8 sm:p-12 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#ff6b35]" />
              Loading Donation Flow...
            </div>
          }
        >
          <CampaignDonationFlow
            settings={settings}
            initialState={initialStep}
            initialFund={initialFund}
          />
        </Suspense>

        {/* ================= TRUST & STEWARDSHIP FOOTER ================= */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 text-center">
          <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-white shadow-sm space-y-2 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto text-[#ff6b35]">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">Secure &amp; Encrypted</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              All transactions are processed through authenticated SSL connections and verified Safaricom Daraja protocols.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-white shadow-sm space-y-2 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto text-[#ff6b35]">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">Kingdom Seed Sowing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion.&rdquo; (2 Cor 9:7)
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-white shadow-sm space-y-2 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto text-[#ff6b35]">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">Spiritual Stewardship</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every coin is stewarded with absolute integrity under the pastoral oversight of Pastor Caesar O. Nyandwaro.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
