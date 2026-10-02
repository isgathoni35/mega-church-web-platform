"use client";

import React, { useState } from "react";
import {
  Globe2,
  Copy,
  Check,
  ExternalLink,
  DollarSign,
  Heart,
  QrCode,
  ShieldAlert,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GivingChannel {
  id: string;
  name: string;
  handle: string;
  link?: string;
  instructions: string;
  badge: string;
  badgeColor: string;
  iconText: string;
  accentBg: string;
}

const INTERNATIONAL_CHANNELS: GivingChannel[] = [
  {
    id: "cashapp",
    name: "Cash App",
    handle: "$HGSugutta",
    instructions: "Send directly to ministry Cashtag. Tap to copy tag.",
    badge: "USA & UK",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    iconText: "$",
    accentBg: "from-emerald-950/40 to-card",
  },
  {
    id: "paypal",
    name: "PayPal",
    handle: "@hgsugutta",
    link: "https://paypal.me/hgsugutta",
    instructions: "Instant international giving via debit/credit card or PayPal balance.",
    badge: "Worldwide",
    badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/30",
    iconText: "P",
    accentBg: "from-sky-950/40 to-card",
  },
  {
    id: "venmo",
    name: "Venmo",
    handle: "@hgsugutta",
    instructions: "Give seamlessly via your Venmo mobile app.",
    badge: "USA",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    iconText: "V",
    accentBg: "from-blue-950/40 to-card",
  },
  {
    id: "givelify",
    name: "Givelify",
    handle: "Heavens Gates Sugutta Fellowship Church",
    link: "https://www.givelify.com",
    instructions: "Search for 'Heavens Gates Sugutta' on the Givelify App.",
    badge: "Churches Worldwide",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    iconText: "G",
    accentBg: "from-amber-950/40 to-card",
  },
];

export function InternationalGiving() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <Card className="border border-border/80 shadow-xl overflow-hidden bg-card/90 backdrop-blur-sm flex flex-col h-full">
      {/* Header Accent Band */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-hover p-4 text-white border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/40">
            <Globe2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg leading-tight">International & Digital Giving</h3>
            <p className="text-xs text-white/80">Support God&apos;s work globally from anywhere in the world</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {INTERNATIONAL_CHANNELS.map((channel) => (
            <div
              key={channel.id}
              className={`p-3.5 rounded-lg border border-border/70 bg-gradient-to-br ${channel.accentBg} hover:border-accent/40 transition-all duration-200`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-primary/40 border border-primary/60 flex items-center justify-center font-bold text-accent text-sm shrink-0">
                    {channel.iconText}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-sm text-foreground">
                        {channel.name}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${channel.badgeColor}`}
                      >
                        {channel.badge}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-accent text-xs block mt-0.5">
                      {channel.handle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(channel.id, channel.handle)}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-xs border border-transparent hover:border-border"
                    title="Copy Handle"
                  >
                    {copiedId === channel.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-[11px] text-green-500 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>

                  {channel.link && (
                    <a
                      href={channel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md hover:bg-muted text-accent hover:text-accent-hover transition-colors flex items-center gap-1 text-xs"
                      title={`Open ${channel.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Open</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground mt-2 pl-12">
                {channel.instructions}
              </p>
            </div>
          ))}
        </div>

        {/* Global Partnership Assurance */}
        <div className="pt-4 border-t border-border mt-4">
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/25 flex items-start gap-3">
            <Heart className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-[11px] text-foreground/80 leading-relaxed">
              <strong className="text-foreground font-semibold">Kingdom Accountability: </strong>
              All gifts go directly toward evangelistic crusades, global branch expansion, and community outreach as stewarded by Apostle Dr. J. Taylor.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
