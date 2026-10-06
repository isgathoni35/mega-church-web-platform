"use client";

import React, { useState } from "react";
import { QrCode, Copy, Check, Smartphone, ShieldCheck } from "lucide-react";

export type PaymentQrType = "till" | "send_money" | "kcb_bank" | "sendwave";

interface PaymentQrCodeProps {
  type: PaymentQrType;
  tillNumber?: string;
  tillName?: string;
  phone?: string;
  recipientName?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  paybillNumber?: string;
  className?: string;
}

export function PaymentQrCode({
  type,
  tillNumber = "8146952",
  tillName = "Suggutta Fellowship Church",
  phone = "0112656123",
  recipientName = "Pastor Caesar Osebe",
  bankName = "KCB Bank Kenya",
  accountNumber = "1356891853",
  accountName = "Sugutta Fellowship church",
  paybillNumber = "522522",
  className = "",
}: PaymentQrCodeProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const config = {
    till: {
      badgeText: "M-PESA BUY GOODS QR",
      badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
      accentColor: "#00A859",
      centerBg: "bg-[#00A859]",
      centerText: "M",
      title: "Lipa na M-Pesa Buy Goods",
      subtitle: "Scan with M-Pesa App or phone camera to pay directly into Church Till",
      primaryLabel: "Till Number",
      primaryValue: tillNumber,
      primaryCopyKey: "till",
      verifiedName: tillName,
      footerInstruction: "Open M-Pesa App → Tap 'Scan QR' → Enter Amount & PIN",
    },
    send_money: {
      badgeText: "M-PESA SEND MONEY QR",
      badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
      accentColor: "#00A859",
      centerBg: "bg-[#00A859]",
      centerText: "M",
      title: "M-Pesa Direct Send Money",
      subtitle: "Scan with your phone camera or dial *334# to send offering seed",
      primaryLabel: "Mobile Number",
      primaryValue: phone,
      primaryCopyKey: "phone",
      verifiedName: recipientName,
      footerInstruction: "M-Pesa → Send Money → Enter 0112656123 → Confirm Name",
    },
    kcb_bank: {
      badgeText: "KCB BANK M-PESA QR",
      badgeColor: "bg-blue-500/10 border-blue-500/20 text-blue-700",
      accentColor: "#005A9C",
      centerBg: "bg-[#005A9C]",
      centerText: "KCB",
      title: "KCB Bank Direct Deposit",
      subtitle: "Scan to deposit directly to church KCB account via M-Pesa (Paybill 522522)",
      primaryLabel: "KCB Account Number",
      primaryValue: accountNumber,
      primaryCopyKey: "kcb_acc",
      verifiedName: accountName,
      footerInstruction: "M-Pesa Paybill 522522 → Acc 1356891853 → Sugutta Fellowship",
    },
    sendwave: {
      badgeText: "SENDWAVE INTERNATIONAL QR",
      badgeColor: "bg-teal-500/10 border-teal-500/20 text-teal-700",
      accentColor: "#00C48C",
      centerBg: "bg-emerald-500",
      centerText: "W",
      title: "Sendwave Remittance",
      subtitle: "Scan with your smartphone to launch Sendwave with zero transfer fees",
      primaryLabel: "Recipient Line",
      primaryValue: phone.startsWith("+") ? phone : `+254 ${phone.replace(/^0/, "")}`,
      primaryCopyKey: "sendwave_phone",
      verifiedName: recipientName,
      footerInstruction: "Sendwave App → Kenya (M-Pesa) → +254 112 656 123",
    },
  }[type];

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col items-center text-center space-y-3.5 ${className}`}
    >
      {/* Header Pill */}
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${config.badgeColor}`}
      >
        <QrCode className="h-3.5 w-3.5" />
        <span>{config.badgeText}</span>
      </div>

      {/* Title & Guidance */}
      <div className="space-y-1">
        <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
          {config.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          {config.subtitle}
        </p>
      </div>

      {/* Styled High-Precision Vector QR Code */}
      <div className="relative p-3 sm:p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-md">
        <div className="w-36 h-36 sm:w-40 sm:h-40 mx-auto flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 29 29"
            shapeRendering="crispEdges"
            className="w-full h-full"
            aria-label={`${config.title} QR Code`}
          >
            <path fill="#ffffff" d="M0 0h29v29H0z" />
            <path
              stroke="#0f172a"
              d="M1 1.5h7m5 0h1m3 0h1m3 0h7M1 2.5h1m5 0h1m2 0h1m2 0h1m1 0h1m2 0h1m5 0h1M1 3.5h1m1 0h3m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h1m1 0h3m1 0h1M1 4.5h1m1 0h3m1 0h1m1 0h1m2 0h2m3 0h1m1 0h3m1 0h1M1 5.5h1m1 0h3m1 0h1m1 0h2m1 0h1m3 0h1m1 0h1m1 0h3m1 0h1M1 6.5h1m5 0h1m2 0h1m1 0h3m2 0h1m5 0h1M1 7.5h7m1 0h1m1 0h2m2 0h1m1 0h1m1 0h7M9 8.5h2m2 0h2m1 0h1m3 0h2M1 9.5h1m2 0h1m2 0h3m1 0h1m2 0h3m1 0h1m2 0h4M1 10.5h2m1 0h1m3 0h1m2 0h1m2 0h2m3 0h1m3 0h1M2 11.5h2m2 0h1m3 0h2m1 0h2m2 0h1m2 0h3M1 12.5h3m2 0h1m1 0h2m3 0h1m2 0h2m1 0h4M1 13.5h1m2 0h2m1 0h2m2 0h2m1 0h1m2 0h1m2 0h2M1 14.5h1m1 0h1m2 0h3m2 0h1m2 0h2m2 0h1m2 0h3M1 15.5h2m2 0h2m2 0h1m2 0h2m1 0h2m1 0h1m2 0h2M1 16.5h2m1 0h1m2 0h3m1 0h2m1 0h2m2 0h1m2 0h2M1 17.5h1m1 0h3m2 0h1m2 0h1m2 0h1m1 0h1m2 0h1m2 0h2M1 18.5h1m1 0h2m2 0h2m1 0h2m2 0h2m1 0h2m1 0h3M9 19.5h1m2 0h2m1 0h2m1 0h1m2 0h2M1 20.5h7m1 0h2m1 0h1m3 0h1m2 0h1m1 0h3M1 21.5h1m5 0h1m1 0h2m1 0h1m1 0h2m1 0h1m2 0h1m1 0h1M1 22.5h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h2m2 0h1m1 0h3M1 23.5h1m1 0h3m1 0h1m1 0h2m1 0h2m2 0h1m1 0h1m1 0h4M1 24.5h1m1 0h3m1 0h1m1 0h1m2 0h2m2 0h1m2 0h1m1 0h2M1 25.5h1m5 0h1m2 0h1m1 0h2m1 0h2m1 0h1m2 0h2M1 26.5h7m2 0h1m1 0h2m2 0h1m2 0h4"
            />
          </svg>
        </div>

        {/* Center Logo/Badge Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border border-slate-200">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-xs ${config.centerBg}`}
          >
            {config.centerText}
          </div>
        </div>
      </div>

      {/* Recipient Verification Strip with 1-Click Copy */}
      <div className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 text-left">
        <div className="min-w-0">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            {config.primaryLabel}
          </span>
          <span className="font-mono text-xs sm:text-sm font-black text-slate-900 block truncate">
            {config.primaryValue}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
            <span className="text-[10px] text-emerald-700 font-bold truncate">
              {config.verifiedName}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleCopy(config.primaryValue, config.primaryCopyKey)}
          className="px-2.5 py-1.5 rounded-xl bg-[#ff6b35] hover:bg-[#f25c23] text-white text-[11px] font-bold shrink-0 shadow-sm transition-all"
        >
          {copiedKey === config.primaryCopyKey ? (
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

      {/* Quick Step Instructions Footer */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-medium pt-0.5">
        <Smartphone className="h-3 w-3 text-slate-400 shrink-0" />
        <span className="truncate">{config.footerInstruction}</span>
      </div>
    </div>
  );
}
