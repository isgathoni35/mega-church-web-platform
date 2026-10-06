"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
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
  phone = "0112656123",
  recipientName = "Pastor Caesar O. Nyandwaro",
  accountName = "Sugutta Fellowship church",
  bankName = "KCB Bank Kenya",
  accountNumber = "1356891853",
  swiftCode = "KCBLKENX",
  mode = "bank",
}: SendwaveQRProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const displayName = accountName || recipientName;

  useEffect(() => {
    let active = true;
    QRCode.toDataURL("https://www.sendwave.com", {
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
        }
      })
      .catch((err) => {
        console.error("Error generating Sendwave QR code:", err);
      });

    return () => {
      active = false;
    };
  }, []);

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

      {/* Styled High-Precision Scannable QR Code */}
      <div className="relative p-2.5 sm:p-3 rounded-2xl bg-white border-2 border-slate-200 shadow-md">
        <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Sendwave QR Code for International Payments"
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
