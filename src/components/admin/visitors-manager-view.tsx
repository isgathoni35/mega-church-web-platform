"use client";

import React, { useState, useTransition } from "react";
import {
  Users,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Trash2,
  HelpCircle,
} from "lucide-react";
import { updatePrayerStatusAction, deletePrayerAction } from "@/actions/admin-prayers";
import { PrayerRequest } from "@/types/database.types";

interface VisitorsManagerViewProps {
  initialSubmissions: PrayerRequest[];
}

export function VisitorsManagerView({ initialSubmissions }: VisitorsManagerViewProps) {
  const [items, setItems] = useState<PrayerRequest[]>(initialSubmissions);
  const [activeTab, setActiveTab] = useState<"all" | "visits" | "inquiries">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = (id: string, newStatus: "pending" | "prayed_for") => {
    startTransition(async () => {
      await updatePrayerStatusAction(id, newStatus);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this record?")) return;
    startTransition(async () => {
      await deletePrayerAction(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const getWhatsAppLink = (item: PrayerRequest) => {
    if (!item.phone) return null;
    const cleanDigits = item.phone.replace(/[^0-9]/g, "");
    const formattedNum = cleanDigits.startsWith("0")
      ? `254${cleanDigits.slice(1)}`
      : cleanDigits;

    const isVisit = item.request.includes("[Visit Plan]");
    const text = isVisit
      ? `Shalom ${item.full_name}, this is the Hospitality Ministry at Heavens Gates Sugutta Fellowship Church. We are thrilled you plan to worship with us! Please let us know if you need directions to our Main Sanctuary.`
      : `Shalom ${item.full_name}, thank you for contacting Heavens Gates Sugutta Fellowship Church. We have received your inquiry and our pastoral team is ready to assist you.`;

    return `https://wa.me/${formattedNum}?text=${encodeURIComponent(text)}`;
  };

  const filtered = items.filter((item) => {
    const isVisit = item.request.includes("[Visit Plan]");
    const isInquiry = item.request.includes("[Inquiry:");

    // Only show visit plans or inquiries
    if (!isVisit && !isInquiry) return false;

    if (activeTab === "visits" && !isVisit) return false;
    if (activeTab === "inquiries" && !isInquiry) return false;

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        item.full_name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.request.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const visitCount = items.filter((i) => i.request.includes("[Visit Plan]")).length;
  const inquiryCount = items.filter((i) => i.request.includes("[Inquiry:")).length;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2240] tracking-tight">
            Sanctuary Visitors &amp; Inquiries Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Coordinate hospitality for incoming first-time visitors and answer ministry inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs shrink-0">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 font-bold">
            {visitCount} Planned Visits
          </span>
          <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-800 font-bold">
            {inquiryCount} Inquiries
          </span>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-[#0A2240] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Submissions ({visitCount + inquiryCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("visits")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "visits"
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Planned Visits ({visitCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("inquiries")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "inquiries"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Ministry Inquiries ({inquiryCount})
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by visitor name or contact..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
          />
        </div>
      </div>

      {/* List Feed */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No visitor records found</p>
            <p className="text-xs text-slate-500">
              When someone registers to visit or sends an inquiry on the Connect page, it appears here.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const isVisit = item.request.includes("[Visit Plan]");
            const isFollowedUp = item.status === "prayed_for";
            const waLink = getWhatsAppLink(item);

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-900">
                      {item.full_name}
                    </h3>

                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        isVisit
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {isVisit ? "Planned Sanctuary Visit" : "Ministry Inquiry"}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isFollowedUp
                          ? "bg-slate-100 text-slate-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {isFollowedUp ? "Followed Up" : "New Awaiting Follow-up"}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Received: {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-mono">
                  {item.request}
                </div>

                {/* Footer Contact & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${item.email}`} className="hover:underline">
                        {item.email}
                      </a>
                    </span>
                    {item.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${item.phone}`} className="hover:underline font-mono">
                          {item.phone}
                        </a>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Visitor</span>
                      </a>
                    )}

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleUpdateStatus(item.id, isFollowedUp ? "pending" : "prayed_for")
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        isFollowedUp
                          ? "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                          : "bg-[#0A2240] text-white border-[#0A2240] hover:bg-[#07162c]"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isFollowedUp ? "Mark Pending" : "Mark Followed Up"}</span>
                    </button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
