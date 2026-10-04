"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { loginAdminAction } from "@/actions/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin";

  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await loginAdminAction(passcode);
      if (res.success) {
        router.push(redirectTo);
        router.refresh();
      } else {
        setError(res.error || "Authentication failed.");
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A2240] via-[#07162c] to-[#040d1a] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-[#0f172a] p-6 sm:p-8 text-center text-white space-y-3 relative overflow-hidden border-b border-slate-800">
          <div className="relative h-20 w-20 rounded-full overflow-hidden ring-4 ring-[#C59B27] shadow-xl shrink-0 bg-white mx-auto">
            <Image
              src="/images/sugutta-logo.png"
              alt="Sugutta Fellowship Church Logo"
              fill
              sizes="80px"
              className="object-contain p-1"
              priority
            />
          </div>

          <div className="space-y-1">
            <h1 className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Church Management Portal
            </h1>
            <p className="text-xs text-[#C59B27] font-bold uppercase tracking-wider">
              Heavens Gates Sugutta Fellowship
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Authorized Pastoral &amp; Media Access</span>
          </div>
        </div>

        {/* Login Form Body */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="passcode"
              className="block text-xs font-extrabold uppercase tracking-wider text-slate-700"
            >
              Administrative Access Passcode
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>

              <input
                id="passcode"
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter church admin passcode"
                disabled={isPending}
                required
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B27] focus:bg-white transition-all font-mono"
              />

              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              Default development passcode: <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[10px]">sugutta_altar_admin_2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-xl bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending ? (
              <span>Authenticating Altar Portal...</span>
            ) : (
              <>
                <span>Enter Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-2 text-center border-t border-slate-100">
            <a
              href="/"
              className="text-xs text-slate-500 hover:text-[#0A2240] transition-colors"
            >
              &larr; Return to Public Sanctuary Website
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
