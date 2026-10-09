"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { QrCode, Copy, Check, Smartphone, ShieldCheck } from "lucide-react";

export type PaymentQrType = "till" | "paybill" | "send_money" | "kcb_bank" | "sendwave";

interface PaymentQrCodeProps {
  type: PaymentQrType;
  customQrImage?: string;
  tillNumber?: string;
  tillName?: string;
  phone?: string;
  recipientName?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  paybillNumber?: string;
  accountRef?: string;
  className?: string;
}

export function PaymentQrCode({
  type,
  customQrImage,
  tillNumber = "8146952",
  tillName = "Suggutta Fellowship Church",
  phone = "0112656123",
  recipientName = "Pastor Caesar O. Nyandwaro",
  bankName = "KCB Bank Kenya",
  accountNumber = "1356891853",
  accountName = "Sugutta Fellowship church",
  paybillNumber = "174379",
  accountRef = "OFFERING",
  className = "",
}: PaymentQrCodeProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    setIsGenerating(true);

    let payload = "";
    if (type === "till") {
      payload = tillNumber || "8146952";
    } else if (type === "paybill") {
      payload = `Safaricom Paybill\nBusiness No: ${paybillNumber || "174379"}\nAccount: ${accountRef || "OFFERING"}`;
    } else if (type === "send_money") {
      payload = phone || "0112656123";
    } else if (type === "kcb_bank") {
      payload = `KCB Bank Deposit\nPaybill: ${paybillNumber}\nAccount: ${accountNumber}\nName: ${accountName}`;
    } else if (type === "sendwave") {
      payload = "https://www.sendwave.com";
    }

    QRCode.toDataURL(payload, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 360,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (active) {
          setQrDataUrl(url);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating payment QR code:", err);
        if (active) {
          setIsGenerating(false);
        }
      });

    return () => {
      active = false;
    };
  }, [type, tillNumber, phone, accountNumber, accountName, paybillNumber, accountRef]);

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
      title: "Lipa na M-Pesa Buy Goods",
      subtitle: "Scan with M-Pesa App or phone camera to pay directly into Church Till",
      primaryLabel: "Till Number",
      primaryValue: tillNumber,
      primaryCopyKey: "till",
      verifiedName: tillName,
      footerInstruction: "Open M-Pesa App → Tap 'Scan QR' → Enter Amount & PIN",
    },
    paybill: {
      badgeText: "M-PESA PAYBILL QR",
      badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
      accentColor: "#00A859",
      title: "Lipa na M-Pesa Paybill",
      subtitle: `Business No. ${paybillNumber || "174379"}${accountRef ? ` — Account: ${accountRef}` : " — Enter Fund Account (e.g. OFFERING, TITHE)"}`,
      primaryLabel: "Paybill Business No",
      primaryValue: paybillNumber || "174379",
      primaryCopyKey: "paybill",
      verifiedName: tillName,
      footerInstruction: `M-Pesa → Paybill ${paybillNumber || "174379"} → Acc: ${accountRef || "OFFERING"} → PIN`,
    },
    send_money: {
      badgeText: "M-PESA SEND MONEY QR",
      badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
      accentColor: "#00A859",
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

      {/* Authentic High-Definition Scannable QR Code */}
      <div className="relative p-2.5 sm:p-3 rounded-2xl bg-white border-2 border-slate-200 shadow-md">
        <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto flex items-center justify-center overflow-hidden">
          {customQrImage ? (
            <img
              src={customQrImage}
              alt={`${config.title} Official QR Poster`}
              className="w-full h-full object-contain rounded-xl select-none"
            />
          ) : qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`${config.title} QR Code`}
              className="w-full h-full object-contain rounded-xl select-none"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-xl text-slate-400">
              <QrCode className="w-8 h-8 animate-pulse text-slate-300" />
              <span className="text-[10px] font-medium">Generating QR...</span>
            </div>
          )}
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
