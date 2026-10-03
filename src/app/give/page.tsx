import { Metadata } from "next";
import { Suspense } from "react";
import { DirectGivingPortal } from "@/components/giving/direct-giving-portal";
import { ShieldCheck, Heart, Sparkles, BookOpen, Lock, Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Give Online | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Partner with Heavens Gates Sugutta Fellowship Church International. Give your tithes, offerings, and kingdom seeds securely via M-Pesa Send Money, Paybill 174379, international remittance apps (Sendwave, Remitly, Lemfi, Taptap Send), Cash App, or PayPal.",
};

export default function GivePage() {
  return (
    <div className="min-h-screen bg-[#fbf8f3] text-slate-900 pb-10 sm:pb-20 w-full overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] border-b border-slate-200/80 py-8 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative warm ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sow into the Kingdom</span>
          </div>

          <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#ff6b35] tracking-tight leading-tight max-w-3xl mx-auto">
            Give &amp; Support the Ministry
          </h1>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-lg leading-relaxed">
            Your generous financial partnership empowers crusades across nations, sustains deliverance ministration, and spreads the gospel of Jesus Christ.
          </p>

          {/* Scripture Anchor Card */}
          <div className="mt-4 sm:mt-8 max-w-2xl mx-auto p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-orange-200/80 shadow-md text-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-[#ff6b35] text-[11px] sm:text-xs uppercase font-bold tracking-widest mb-1 sm:mb-2">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Biblical Foundation</span>
            </div>
            <blockquote className="font-serif italic text-xs sm:text-lg text-slate-900 leading-relaxed">
              &ldquo;Look at the nations and watch—and be utterly amazed. For I am going to do something in your days that you would not believe, even if you were told.&rdquo;
            </blockquote>
            <div className="text-[#ff6b35] text-[11px] sm:text-xs font-bold mt-1.5 sm:mt-2">
              — Habakkuk 1:5 (NIV)
            </div>
          </div>
        </div>
      </section>

      {/* ================= GIVING PORTAL INTERFACE ================= */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-6 sm:py-12 relative z-10">
        <Suspense
          fallback={
            <div className="p-8 sm:p-12 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#ff6b35]" />
              Loading Giving Portal...
            </div>
          }
        >
          <DirectGivingPortal />
        </Suspense>

        {/* ================= TRUST & SCRIPTURAL FOOTER ================= */}
        <div className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 text-center">
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white shadow-sm space-y-2 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto text-[#ff6b35]">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">Secure &amp; Encrypted</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              All transactions are processed through authenticated SSL connections and Safaricom Daraja protocols.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white shadow-sm space-y-2 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto text-[#ff6b35]">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">Kingdom Seed Sowing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion.&rdquo; (2 Cor 9:7)
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white shadow-sm space-y-2 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto text-[#ff6b35]">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">Apostolic Stewardship</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every coin is stewarded with supreme transparency under the spiritual oversight of Apostle Dr. J. Taylor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
