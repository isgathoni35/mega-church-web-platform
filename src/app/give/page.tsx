import { Metadata } from "next";
import { MpesaGivingForm } from "@/components/giving/mpesa-form";
import { InternationalGiving } from "@/components/giving/international-giving";
import { ShieldCheck, Heart, Sparkles, BookOpen, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Give Online | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Partner with Heavens Gates Sugutta Fellowship Church International. Give your tithes, offerings, and kingdom seeds securely via Safaricom M-Pesa STK push, Cash App, PayPal, Venmo, or Givelify.",
};

export default function GivePage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-primary-dark border-b border-border/40 py-16 lg:py-20">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/40 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-script text-base normal-case tracking-normal text-accent font-normal mr-1">
              Sow into the Kingdom
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Get Ready for the Overflow! <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-hover to-amber-200">
              Partner With Us
            </span>
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Your generous financial partnership empowers crusades across nations, sustains deliverance ministration, and spreads the gospel of Jesus Christ.
          </p>

          {/* Scripture Anchor Card */}
          <div className="mt-8 max-w-2xl mx-auto p-4 sm:p-5 rounded-xl bg-white/5 border border-accent/30 backdrop-blur-md text-white/90 shadow-lg">
            <div className="flex items-center justify-center gap-2 text-accent text-xs uppercase font-bold tracking-widest mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Biblical Foundation</span>
            </div>
            <blockquote className="font-serif italic text-sm sm:text-base text-white/95 leading-relaxed">
              &ldquo;Look at the nations and watch—and be utterly amazed. For I am going to do something in your days that you would not believe, even if you were told.&rdquo;
            </blockquote>
            <div className="text-accent text-xs font-semibold mt-2">
              — Habakkuk 1:5 (NIV)
            </div>
          </div>
        </div>
      </section>

      {/* ================= GIVING PORTAL INTERFACE ================= */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Column 1: M-Pesa STK Push */}
          <div>
            <MpesaGivingForm />
          </div>

          {/* Column 2: International Channels */}
          <div>
            <InternationalGiving />
          </div>
        </div>

        {/* ================= TRUST & SCRIPTURAL ACCORDION / FOOTER ================= */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto text-accent">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-foreground">Secure & Encrypted</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All transactions are processed through authenticated SSL connections and Safaricom Daraja protocols.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto text-accent">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-foreground">Kingdom Seed Sowing</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion.&rdquo; (2 Cor 9:7)
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto text-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-foreground">Apostolic Stewardship</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every coin is stewarded with supreme transparency under the spiritual oversight of Apostle Dr. J. Taylor.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
