"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

interface Campus {
  name: string;
  tag: string;
  pastor: string;
  schedule: string;
  phone: string;
  address: string;
  isHq?: boolean;
}

const campuses: Campus[] = [
  {
    name: "Sugutta Sanctuary (Headquarters)",
    tag: "International Headquarters & Global Altar",
    pastor: "Senior Apostolic Team",
    schedule: "Sun: 10:00 AM | Mon: 7:00 PM | Wed: 7:00 PM",
    phone: "+254 700 000 001",
    address: "Sugutta Main Sanctuary, Nairobi, Kenya",
    isHq: true,
  },
  {
    name: "Mombasa Coastal Sanctuary",
    tag: "Regional Revival Center",
    pastor: "Pastor David M. & Ministry Team",
    schedule: "Sun: 9:30 AM & 11:30 AM | Wed: 6:30 PM",
    phone: "+254 700 000 002",
    address: "Nyali Road, Near Links Plaza, Mombasa, Kenya",
  },
  {
    name: "Nakuru Great Rift Tabernacle",
    tag: "Rift Valley Hub",
    pastor: "Pastor Grace K. & Team",
    schedule: "Sun: 10:00 AM | Wed: 6:00 PM",
    phone: "+254 700 000 003",
    address: "Kenyatta Avenue Extension, Nakuru, Kenya",
  },
  {
    name: "Eldoret Anointed Center",
    tag: "Western Outreach",
    pastor: "Pastor Samuel O. & Team",
    schedule: "Sun: 9:00 AM & 11:00 AM | Wed: 6:00 PM",
    phone: "+254 700 000 004",
    address: "Uganda Road, Central Eldoret, Kenya",
  },
  {
    name: "St. Louis Global Campus (USA)",
    tag: "Diaspora Mission Altar",
    pastor: "Pastor John & Deborah Evans",
    schedule: "Sun: 10:30 AM CST | Wed: 7:00 PM CST",
    phone: "+1 (314) 555-0199",
    address: "Grand Blvd, St. Louis, MO, United States",
  },
];

export function BranchPreview() {
  const hq = campuses.find((c) => c.isHq);
  const branches = campuses.filter((c) => !c.isHq);

  return (
    <section id="branches" className="py-20 sm:py-28 bg-cream text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-script text-accent text-3xl sm:text-4xl block font-normal">
            Global Fellowship Network
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-primary tracking-tight">
            Find a Campus Near You
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Connect with our thriving physical congregations across East Africa,
            the United States, and international outreach centers.
          </p>
        </div>

        {/* Ornamental divider */}
        <div className="divider-ornament mb-12">
          <span className="cross-icon">✝</span>
        </div>

        {/* HQ Hero Card — distinct from the grid */}
        {hq && (
          <div className="mb-10 bg-primary rounded-xl p-6 sm:p-8 text-white shadow-lg border border-accent/30">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  {hq.tag}
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  {hq.name}
                </h3>
                <p className="text-sm text-white/70">
                  Resident Pastor: {hq.pastor}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                    {hq.address}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                    {hq.schedule}
                  </span>
                  <a
                    href={`tel:${hq.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-1.5 hover:text-accent transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                    {hq.phone}
                  </a>
                </div>
              </div>
              <Button
                variant="accent"
                size="default"
                className="w-full sm:w-auto font-bold shadow-md shrink-0"
                asChild
              >
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${hq.name} ${hq.address}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Branch Grid — smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {branches.map((campus) => (
            <Card
              key={campus.name}
              className="flex flex-col justify-between hover-warm-glow bg-card"
            >
              <CardHeader className="space-y-1.5 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  {campus.tag}
                </span>
                <CardTitle className="text-base font-extrabold text-primary leading-snug">
                  {campus.name}
                </CardTitle>
                <CardDescription className="text-xs text-foreground/65">
                  {campus.pastor}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 text-xs text-foreground/75 pb-3">
                <div className="flex items-start gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  <span>{campus.address}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  <span>{campus.schedule}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-accent shrink-0" />
                  <a
                    href={`tel:${campus.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-accent transition-colors font-medium"
                  >
                    {campus.phone}
                  </a>
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-border/40">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${campus.name} ${campus.address}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-accent hover:text-primary transition-colors flex items-center gap-1"
                >
                  Get Directions
                  <ArrowRight className="h-3 w-3" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <Button
            variant="accent"
            size="lg"
            className="text-base font-bold shadow-xl hover:scale-[1.02] px-10 py-6"
            asChild
          >
            <Link href="/branches">
              View All 50+ Global Branches
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
