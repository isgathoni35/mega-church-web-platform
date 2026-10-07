import React from "react";
import Link from "next/link";
import { Compass, Home, Video, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#fbf8f3] px-4 py-16 text-slate-900">
      <div className="max-w-xl mx-auto text-center space-y-6">
        {/* Decorative Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 border border-orange-200/80 text-[#ff6b35] flex items-center justify-center shadow-lg shadow-orange-500/10">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        {/* 404 Badge & Headings */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100/80 text-[#ff6b35] text-xs font-black uppercase tracking-wider">
            Page Not Found • Error 404
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight">
            Seeking the Right Path
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            The page you are looking for has been relocated, renamed, or is no longer available. Let us guide you back to our sanctuary.
          </p>
        </div>

        {/* Scripture Anchor Card */}
        <div className="p-4 rounded-2xl bg-white border border-orange-200/80 shadow-sm max-w-md mx-auto text-center space-y-1">
          <p className="font-serif italic text-xs sm:text-sm text-slate-800 leading-relaxed">
            &ldquo;Your word is a lamp for my feet, a light on my path.&rdquo;
          </p>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff6b35] block">
            Psalm 119:105
          </span>
        </div>

        {/* Recovery Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#ea580c] text-white font-bold rounded-full px-7 py-3 text-xs sm:text-sm shadow-md shadow-orange-500/20"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              <span>Return to Sanctuary</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-slate-200 font-bold rounded-full px-6 py-3 text-xs sm:text-sm"
            asChild
          >
            <Link href="/sermons">
              <Video className="w-4 h-4 mr-2 text-[#ff6b35]" />
              <span>Browse Sermons</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
