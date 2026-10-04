"use client";

import React, { useState } from "react";
import { QrCode, Smartphone, Copy, Check } from "lucide-react";

interface SendwaveQRProps {
  phone?: string;
  recipientName?: string;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  swiftCode?: string;
  mode?: "bank" | "phone";
}

export function SendwaveQR({
  phone = "+254 700 000 001",
  recipientName = "Heavens Gates Sugutta Fellowship Church",
  accountName,
  bankName = "Kenya Commercial Bank (KCB)",
  accountNumber = "1234567890",
  swiftCode = "KCBLKENX",
  mode = "bank",
}: SendwaveQRProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const displayName = accountName || recipientName;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-3 sm:space-y-4">
      {/* Header Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
        <QrCode className="h-3.5 w-3.5" />
        <span>Scan with Phone Camera</span>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
          {mode === "bank" ? "Direct KCB Deposit via Sendwave" : "Fast Transfer via Sendwave"}
        </h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Point your phone camera at this QR code to launch or download the Sendwave app with 0% transfer fee.
        </p>
      </div>

      {/* Styled QR Code Box with Brand Framing */}
      <div className="relative p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-md">
        <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27 27"
            shapeRendering="crispEdges"
            className="w-full h-full"
            aria-label="Sendwave QR Code for International Payments"
          >
            <path fill="#ffffff" d="M0 0h27v27H0z" />
            <path
              stroke="#0f172a"
              d="M1 1.5h7m4 0h1m4 0h1m1 0h7M1 2.5h1m5 0h1m8 0h2m1 0h1m5 0h1M1 3.5h1m1 0h3m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h1m1 0h3m1 0h1M1 4.5h1m1 0h3m1 0h1m1 0h1m3 0h5m1 0h1m1 0h3m1 0h1M1 5.5h1m1 0h3m1 0h1m1 0h1m5 0h1m1 0h1m1 0h1m1 0h3m1 0h1M1 6.5h1m5 0h1m1 0h1m1 0h6m2 0h1m5 0h1M1 7.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M9 8.5h1m2 0h2m2 0h2M1 9.5h1m1 0h5m4 0h5m2 0h5M1 10.5h3m2 0h1m2 0h1m3 0h1m3 0h2m1 0h1m3 0h1M3 11.5h3m1 0h2m2 0h1m1 0h1m1 0h2m1 0h5m1 0h2M1 12.5h2m3 0h1m2 0h1m1 0h1m3 0h1m1 0h2m1 0h1m4 0h1M1 13.5h2m1 0h1m2 0h1m2 0h3m1 0h1m3 0h4m1 0h3M1 14.5h1m1 0h2m5 0h2m1 0h2m2 0h2m1 0h1m1 0h1m1 0h1M1 15.5h1m1 0h2m1 0h2m2 0h2m2 0h9m1 0h2M1 16.5h1m1 0h2m1 0h1m1 0h3m2 0h1m2 0h3m1 0h2m3 0h1M1 17.5h1m1 0h5m2 0h1m2 0h9m1 0h1M9 18.5h1m6 0h2m3 0h2M1 19.5h7m2 0h1m1 0h3m2 0h1m1 0h1m1 0h1m1 0h3M1 20.5h1m5 0h1m1 0h1m2 0h1m2 0h1m1 0h1m3 0h2m2 0h1M1 21.5h1m1 0h3m1 0h1m1 0h13m1 0h1M1 22.5h1m1 0h3m1 0h1m1 0h2m2 0h2m2 0h1m1 0h1m1 0h5M1 23.5h1m1 0h3m1 0h1m1 0h2m3 0h3m5 0h2m1 0h1M1 24.5h1m5 0h1m3 0h1m3 0h1m1 0h2m1 0h3m2 0h1M1 25.5h7m1 0h2m1 0h4m4 0h6"
            />
          </svg>
        </div>

        {/* Center Sendwave W Icon Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border border-slate-200">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-[11px] sm:text-xs">
            W
          </div>
        </div>
      </div>

      {/* Recipient Quick Copy Strip */}
      {mode === "bank" ? (
        <div className="w-full p-2.5 sm:p-3 rounded-xl bg-[#fffaf5] border border-orange-100 flex items-center justify-between gap-2 text-left">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              {bankName}
            </span>
            <span className="font-mono text-xs sm:text-sm font-black text-slate-900 block truncate">
              Acc: {accountNumber}
            </span>
            <span className="text-[10px] text-slate-500 block truncate">
              {displayName}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(accountNumber, "acc")}
            className="px-2.5 py-1.5 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white text-[11px] font-bold shrink-0 shadow-sm transition-all"
          >
            {copied === "acc" ? (
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3" /> Copied
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy className="h-3 w-3" /> Copy Acc
              </span>
            )}
          </button>
        </div>
      ) : (
        <div className="w-full p-2.5 sm:p-3 rounded-xl bg-[#fffaf5] border border-orange-100 flex items-center justify-between gap-2 text-left">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Recipient in Sendwave
            </span>
            <span className="font-mono text-xs sm:text-sm font-black text-slate-900 block">
              {phone}
            </span>
            <span className="text-[10px] text-slate-500 block truncate">
              {displayName}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(phone.replace(/\s+/g, ""), "phone")}
            className="px-2.5 py-1.5 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white text-[11px] font-bold shrink-0 shadow-sm transition-all"
          >
            {copied === "phone" ? (
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3" /> Copied
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy className="h-3 w-3" /> Copy
              </span>
            )}
          </button>
        </div>
      )}

      <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-center gap-1">
        <Smartphone className="h-3 w-3 text-emerald-600" />
        <span>Compatible with iOS &amp; Android Cameras</span>
      </div>
    </div>
  );
}

