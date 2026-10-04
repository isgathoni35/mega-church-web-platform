"use client";

import React, { useState, useTransition } from "react";
import {
  HeartHandshake,
  Search,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  ShieldAlert,
  Trash2,
  Filter,
} from "lucide-react";
import { updatePrayerStatusAction, deletePrayerAction } from "@/actions/admin-prayers";
import { PrayerRequest } from "@/types/database.types";

interface PrayerManagerViewProps {
  initialPrayers: PrayerRequest[];
}

export function PrayerManagerView({ initialPrayers }: PrayerManagerViewProps) {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(initialPrayers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "prayed_for">("all");
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = (id: string, newStatus: "pending" | "prayed_for") => {
    startTransition(async () => {
      await updatePrayerStatusAction(id, newStatus);
      setPrayers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this petition from the altar?")) return;
    startTransition(async () => {
      await deletePrayerAction(id);
      setPrayers((prev) => prev.filter((p) => p.id !== id));
    });
  };

  // Format clean WhatsApp phone link
  const getWhatsAppLink = (prayer: PrayerRequest) => {
    if (!prayer.phone) return null;
    const cleanDigits = prayer.phone.replace(/[^0-9]/g, "");
    const formattedNum = cleanDigits.startsWith("0")
      ? `254${cleanDigits.slice(1)}`
      : cleanDigits;

    const message = encodeURIComponent(
      `Praise the Lord ${prayer.full_name}, this is the Pastoral Care Ministry at Heavens Gates Sugutta Fellowship Church. Apostle Jeannette and our prayer intercessors have received your petition and are standing with you in faith.`
    );
    return `https://wa.me/${formattedNum}?text=${message}`;
  };

  // Filtered prayers
  const filtered = prayers.filter((p) => {
    // Only show actual prayer requests (not visit plans)
    const isVisit = p.request.includes("[Visit Plan]");
    if (isVisit) return false;

    if (activeFilter === "pending" && p.status !== "pending") return false;
    if (activeFilter === "prayed_for" && p.status !== "prayed_for") return false;

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchName = p.full_name.toLowerCase().includes(q);
      const matchEmail = p.email.toLowerCase().includes(q);
      const matchText = p.request.toLowerCase().includes(q);
      return matchName || matchEmail || matchText;
    }
    return true;
  });

  const pendingCount = prayers.filter((p) => !p.request.includes("[Visit Plan]") && p.status === "pending").length;
  const answeredCount = prayers.filter((p) => !p.request.includes("[Visit Plan]") && p.status === "prayed_for").length;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2240] tracking-tight">
            Pastoral Altar &amp; Prayer Petitions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Review prayer requests, initiate pastoral WhatsApp contacts, and record intercession.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-2 text-xs shrink-0">
          <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 font-bold">
            {pendingCount} Awaiting Prayer
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 font-bold">
            {answeredCount} Covered
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === "all"
                ? "bg-[#0A2240] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Petitions
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("pending")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === "pending"
                ? "bg-amber-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Pending Intercession ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("prayed_for")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === "prayed_for"
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Covered in Prayer ({answeredCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or need..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
          />
        </div>
      </div>

      {/* Petitions Feed */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <HeartHandshake className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No prayer petitions found</p>
            <p className="text-xs text-slate-500">
              When church members submit requests on the prayer altar, they will appear here.
            </p>
          </div>
        ) : (
          filtered.map((prayer) => {
            const waLink = getWhatsAppLink(prayer);
            const isCovered = prayer.status === "prayed_for";

            return (
              <div
                key={prayer.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all space-y-3.5"
              >
                {/* Header: Name, Status, Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-900">
                      {prayer.full_name}
                    </h3>

                    {prayer.is_confidential && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Confidential Altar</span>
                      </span>
                    )}

                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        isCovered
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {isCovered ? "Covered in Prayer" : "Pending Prayer"}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Received: {new Date(prayer.created_at).toLocaleDateString()} at{" "}
                    {new Date(prayer.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Petition Content */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif">
                  {prayer.request}
                </div>

                {/* Contact Strip & Pastoral Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${prayer.email}`} className="hover:underline">
                        {prayer.email}
                      </a>
                    </span>
                    {prayer.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${prayer.phone}`} className="hover:underline font-mono">
                          {prayer.phone}
                        </a>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
                    {/* WhatsApp Action */}
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Member</span>
                      </a>
                    )}

                    {/* Toggle Status */}
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleUpdateStatus(prayer.id, isCovered ? "pending" : "prayed_for")
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        isCovered
                          ? "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                          : "bg-[#0A2240] text-white border-[#0A2240] hover:bg-[#07162c]"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCovered ? "Mark Pending" : "Mark as Prayed"}</span>
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(prayer.id)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete petition"
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
