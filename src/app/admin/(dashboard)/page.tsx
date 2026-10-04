import React from "react";
import Link from "next/link";
import {
  Video,
  HeartHandshake,
  Users,
  Radio,
  PlusCircle,
  ExternalLink,
  ArrowRight,
  Flame,
  Sparkles,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { MINISTRY_VIDEOS } from "@/data/ministry-videos";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const supabase = createAdminClient();

  // Fetch quick metrics
  let totalSermons = 0;
  let liveSermon: { title: string; id: string } | null = null;
  let totalPrayers = 0;
  let pendingPrayers = 0;
  let recentPrayers: Array<{
    id: string;
    full_name: string;
    request: string;
    created_at: string;
    status: string;
  }> = [];

  try {
    const [sermonsRes, liveRes, prayersCountRes, prayersPendingRes, recentPrayersRes] =
      await Promise.all([
        supabase.from("sermons").select("*", { count: "exact", head: true }),
        supabase.from("sermons").select("id, title").eq("is_live", true).limit(1),
        supabase.from("prayer_requests").select("*", { count: "exact", head: true }),
        supabase.from("prayer_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("prayer_requests").select("id, full_name, request, created_at, status").order("created_at", { ascending: false }).limit(4),
      ]);

    totalSermons = sermonsRes.count || 0;
    if (liveRes.data && liveRes.data.length > 0) {
      liveSermon = liveRes.data[0];
    }
    totalPrayers = prayersCountRes.count || 0;
    pendingPrayers = prayersPendingRes.count || 0;
    if (recentPrayersRes.data) {
      recentPrayers = recentPrayersRes.data;
    }
  } catch (err) {
    console.error("[Admin Overview Fetch Error]:", err);
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* ================= HERO WELCOME BANNER ================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0A2240] text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/30 text-[#C59B27] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apostolic Executive Dashboard</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome to the Pastoral Command Altar
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Manage YouTube broadcasts, review incoming prayer petitions, coordinate Sunday visitor hospitality, and update church contact &amp; banking records.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/admin/sermons"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Video / Sermon</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-colors border border-white/20"
            >
              <span>View Public Sanctuary</span>
              <ExternalLink className="w-4 h-4 text-[#C59B27]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= 4 METRICS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Broadcast / Live Status */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
              Live Broadcast
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                liveSermon ? "bg-red-500/10 text-red-600" : "bg-slate-100 text-slate-400"
              }`}
            >
              <Radio className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block">
              {liveSermon ? "LIVE NOW" : "OFFLINE"}
            </span>
            <span className="text-xs text-slate-500 block truncate">
              {liveSermon ? liveSermon.title : "Sunday Celebration 10:00 AM"}
            </span>
          </div>
          <Link
            href="/admin/sermons"
            className="text-xs font-bold text-[#ff6b35] hover:underline flex items-center gap-1 pt-1 border-t border-slate-100"
          >
            <span>Manage Live Broadcast Switch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Sermons In Library */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
              Sermons in Library
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#0A2240]/10 text-[#0A2240] flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block font-mono">
              {totalSermons} Videos
            </span>
            <span className="text-xs text-slate-500 block">
              Dynamic YouTube Archive
            </span>
          </div>
          <Link
            href="/admin/sermons"
            className="text-xs font-bold text-[#0A2240] hover:underline flex items-center gap-1 pt-1 border-t border-slate-100"
          >
            <span>Browse Video Database</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Prayer Petitions */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
              Prayer Petitions
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#ff6b35] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block font-mono">
              {pendingPrayers}{" "}
              <span className="text-xs font-normal text-slate-500">
                unanswered ({totalPrayers} total)
              </span>
            </span>
            <span className="text-xs text-slate-500 block">
              Awaiting Pastoral Intercession
            </span>
          </div>
          <Link
            href="/admin/prayers"
            className="text-xs font-bold text-[#ff6b35] hover:underline flex items-center gap-1 pt-1 border-t border-slate-100"
          >
            <span>Open Prayer Altar Inbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 4: Authentic Outdoor Clips */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
              Praise Highlights
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#C59B27]/10 text-[#C59B27] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block font-mono">
              {MINISTRY_VIDEOS.length} Clips
            </span>
            <span className="text-xs text-slate-500 block">
              Outdoor Praise &amp; Crusades
            </span>
          </div>
          <Link
            href="/#ministry-videos"
            target="_blank"
            className="text-xs font-bold text-[#C59B27] hover:underline flex items-center gap-1 pt-1 border-t border-slate-100"
          >
            <span>View on Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ================= QUICK ACTION & RECENT FEED GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Quick Pastoral Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-500 px-1">
            Altar Operations Shortcuts
          </h3>

          <div className="space-y-3">
            <Link
              href="/admin/sermons"
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#ff6b35] hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff6b35] flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#ff6b35] transition-colors">
                    Add YouTube Sermon / Short
                  </h4>
                  <p className="text-xs text-slate-500">
                    Paste video link with auto-thumbnail preview
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#ff6b35] transition-all" />
            </Link>

            <Link
              href="/admin/prayers"
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#ff6b35] hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    Answer Prayer Petitions
                  </h4>
                  <p className="text-xs text-slate-500">
                    Respond to members via 1-click WhatsApp
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
            </Link>

            <Link
              href="/admin/visitors"
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#ff6b35] hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Sanctuary Visitors Log
                  </h4>
                  <p className="text-xs text-slate-500">
                    View new families planning to visit Sunday
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
            </Link>

            <Link
              href="/admin/settings"
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#ff6b35] hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C59B27] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#C59B27] transition-colors">
                    Update KCB Bank &amp; M-Pesa
                  </h4>
                  <p className="text-xs text-slate-500">
                    Change church bank credentials &amp; contact lines
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#C59B27] transition-all" />
            </Link>
          </div>
        </div>

        {/* Right Column: Recent Incoming Prayer Petitions (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-500">
              Recent Prayer Petitions &amp; Inquiries
            </h3>
            <Link
              href="/admin/prayers"
              className="text-xs font-bold text-[#ff6b35] hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
            {recentPrayers.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No prayer requests received yet. Petitions submitted on the website will appear here in real-time.
              </div>
            ) : (
              recentPrayers.map((prayer) => (
                <div key={prayer.id} className="p-4 hover:bg-slate-50 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {prayer.full_name}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        prayer.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {prayer.status === "pending" ? "Pending Prayer" : "Covered in Prayer"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prayer.request}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{new Date(prayer.created_at).toLocaleDateString()}</span>
                    <Link
                      href="/admin/prayers"
                      className="text-[#ff6b35] font-bold hover:underline"
                    >
                      Open in Altar &rarr;
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
