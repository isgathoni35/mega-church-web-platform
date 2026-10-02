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
import { MapPin, Phone, Clock, ArrowRight, Building2 } from "lucide-react";

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
  return (
    <section id="branches" className="py-20 sm:py-28 bg-secondary/20 text-foreground border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
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

        {/* Campuses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {campuses.map((campus) => (
            <Card
              key={campus.name}
              variant={campus.isHq ? "lightAccent" : "default"}
              className={`flex flex-col justify-between transition-all duration-300 hover:shadow-xl bg-card ${
                campus.isHq ? "ring-2 ring-accent/30" : ""
              }`}
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/15 px-2.5 py-0.5 rounded-full">
                    {campus.tag}
                  </span>
                  <Building2 className="h-4 w-4 text-primary/60" />
                </div>
                <CardTitle className="text-xl font-extrabold text-primary">
                  {campus.name}
                </CardTitle>
                <CardDescription className="text-xs font-semibold text-foreground/75">
                  Resident Pastor: {campus.pastor}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 text-xs text-foreground/80">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{campus.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{campus.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                  <a
                    href={`tel:${campus.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-accent transition-colors font-medium"
                  >
                    {campus.phone}
                  </a>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-border/40">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
                  asChild
                >
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${campus.name} ${campus.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-accent" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA to View All Branches */}
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
