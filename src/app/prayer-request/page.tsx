import type { Metadata } from "next";
import { PrayerForm } from "@/components/community/prayer-form";
import { Flame, Clock, Phone, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Submit Prayer Request | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Place your prayer petition before the altar of God. Our Senior Apostolic Team and intercessory warriors pray over every request with strict pastoral confidentiality.",
};

export default function PrayerRequestPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f3] text-slate-900 pb-20">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] text-slate-900 py-16 px-4 sm:px-8 overflow-hidden border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-[#ff6b35] border border-orange-200 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Flame className="h-3.5 w-3.5 fill-current" />
            <span>Continual Intercession Altar</span>
          </div>

          <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#ff6b35]">
            The Altar of Intercession
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Submit Your Prayer Request
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            &ldquo;The prayer of a righteous person is powerful and effective.&rdquo;
            <span className="block text-[#ff6b35] font-semibold text-sm mt-1">
              — James 5:16
            </span>
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Columns) */}
          <div className="lg:col-span-8">
            <PrayerForm />
          </div>

          {/* Side Info & Pastoral Assurance (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Pastoral Commitment Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-[#ff6b35]" />
                Our Pastoral Prayer Covenant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At Heavens Gates Sugutta Fellowship Church International, prayer is not an
                afterthought—it is the foundation of everything we do.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Daily Morning Altar:</strong> Every petition is prayed over by our
                    ordained prayer team from 5:30 AM to 7:00 AM.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Privacy:</strong> Your sensitive prayer matters are held in
                    sacred confidence before the throne of grace.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Weekly Wednesday Watch:</strong> Specific deliverance and healing
                    prayers during our Midweek Service.
                  </span>
                </li>
              </ul>
            </div>

            {/* Urgent Pastoral Hotline */}
            <div className="p-6 rounded-3xl bg-[#0f172a] text-white border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-[#ff6b35] font-bold text-xs uppercase tracking-wider">
                <Phone className="h-4 w-4" />
                <span>Urgent Pastoral Support</span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Need Immediate Prayer Right Now?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you are undergoing an acute spiritual or physical crisis, our pastoral
                intercessory line is open:
              </p>
              <div className="pt-2">
                <a
                  href="tel:+254700000001"
                  className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-[#ff6b35] text-white font-bold text-sm hover:bg-[#e05626] transition-all shadow-lg shadow-orange-500/20"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call +254 700 000 001
                </a>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 text-center space-y-2 shadow-sm">
              <p className="font-script text-2xl text-[#ff6b35]">Expect the Overflow</p>
              <p className="text-xs italic text-slate-600">
                &ldquo;Before they call I will answer; while they are still speaking I will
                hear.&rdquo; — Isaiah 65:24
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
