import type { Metadata } from "next";
import { PrayerForm } from "@/components/community/prayer-form";
import { Flame, Clock, Phone, ShieldCheck, HeartHandshake, Sparkles, MessageCircle } from "lucide-react";
import { getSiteSettingsAction } from "@/actions/admin-settings";

export const metadata: Metadata = {
  title: "Submit Prayer Request | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Place your prayer petition before the altar of God. Our Senior Apostolic Team and intercessory warriors pray over every request with strict pastoral confidentiality.",
};

export default async function PrayerRequestPage() {
  const settings = await getSiteSettingsAction();
  const rawPhone = settings.mpesaPhone;
  const cleanPhone = rawPhone.replace(/[\s\-]/g, "");
  return (
    <div className="min-h-screen bg-[#fbf8f3] text-slate-900 pb-10 sm:pb-20">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] text-slate-900 py-8 sm:py-14 lg:py-16 px-4 sm:px-8 overflow-hidden border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-100 text-[#ff6b35] border border-orange-200 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
            <span>Continual Intercession Altar</span>
          </div>

          <p className="font-script text-2xl sm:text-4xl lg:text-5xl text-[#ff6b35]">
            The Altar of Intercession
          </p>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#ff6b35] leading-tight">
            How Can We Pray for You?
          </h1>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our intercessory prayer warriors and Pastor Caesar pray faithfully over every petition with strict pastoral confidentiality.
          </p>

          <p className="font-serif italic text-xs sm:text-sm text-slate-700 max-w-xl mx-auto">
            &ldquo;The prayer of a righteous person is powerful and effective.&rdquo;
            <span className="block text-[#ff6b35] font-bold text-xs mt-1">
              — James 5:16
            </span>
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-4 sm:mt-8 lg:mt-10 relative z-10 scroll-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
          {/* Main Form (8 Columns) */}
          <div className="lg:col-span-8">
            <PrayerForm />
          </div>

          {/* Side Info & Pastoral Assurance (4 Columns) */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-6">
            {/* Pastoral Commitment Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3 sm:space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35]" />
                Our Pastoral Prayer Covenant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At Heavens Gates Sugutta Fellowship Church International, prayer is not an
                afterthought—it is the foundation of everything we do.
              </p>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Daily Morning Altar:</strong> Every petition is prayed over by our
                    ordained prayer team from 5:30 AM to 7:00 AM.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Privacy:</strong> Your sensitive prayer matters are held in
                    sacred confidence before the throne of grace.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Weekly Wednesday Watch:</strong> Specific deliverance and healing
                    prayers during our Midweek Service.
                  </span>
                </li>
              </ul>
            </div>

            {/* Urgent Pastoral Hotline */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0f172a] text-white border border-slate-800 shadow-md space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 text-[#ff6b35] font-bold text-xs uppercase tracking-wider">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Urgent Pastoral Support</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Need Immediate Prayer Right Now?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you are undergoing an acute spiritual or physical crisis, our pastoral
                intercessory line is open:
              </p>
              <div className="pt-1 sm:pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#ff6b35] text-white font-bold text-xs sm:text-sm hover:bg-[#e05626] transition-all shadow-lg shadow-orange-500/20"
                >
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                  Call {rawPhone}
                </a>
                <a
                  href="https://wa.me/254112656123?text=Shalom%20Pastor%20Caesar,%20I%20need%20urgent%20prayer%20support."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20bd5a] transition-all shadow-md"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 text-center space-y-1.5 sm:space-y-2 shadow-sm">
              <p className="font-script text-xl sm:text-2xl text-[#ff6b35]">Expect the Overflow</p>
              <p className="text-[11px] sm:text-xs italic text-slate-600">
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
