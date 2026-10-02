"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Search,
  Building2,
  Crown,
  User,
  ExternalLink,
  Mail,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Branch, ServiceTime } from "@/types/database.types";
import { cn } from "@/lib/utils";

interface BranchListProps {
  initialBranches: Branch[];
}

export function BranchList({ initialBranches }: BranchListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  // Extract unique cities
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    initialBranches.forEach((b) => {
      if (b.city) citySet.add(b.city);
    });
    return ["All", ...Array.from(citySet).sort()];
  }, [initialBranches]);

  // Filter branches
  const filteredBranches = useMemo(() => {
    return initialBranches.filter((branch) => {
      const matchesCity =
        selectedCity === "All" ||
        branch.city.toLowerCase() === selectedCity.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        branch.name.toLowerCase().includes(query) ||
        branch.city.toLowerCase().includes(query) ||
        branch.resident_pastor.toLowerCase().includes(query) ||
        branch.address.toLowerCase().includes(query);

      return matchesCity && matchesSearch;
    });
  }, [initialBranches, searchQuery, selectedCity]);

  // Helper to parse service times cleanly
  const renderServiceTimes = (times: Branch["service_times"]) => {
    if (!times) return null;
    let list: ServiceTime[] = [];

    if (Array.isArray(times)) {
      list = times as ServiceTime[];
    } else if (typeof times === "string") {
      try {
        list = JSON.parse(times);
      } catch {
        return <p className="text-xs text-muted-foreground">{String(times)}</p>;
      }
    }

    if (list.length === 0) return null;

    return (
      <div className="space-y-1.5 pt-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-accent" />
          Weekly Service Schedule
        </span>
        <div className="grid grid-cols-1 gap-1">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-1 px-2 rounded bg-muted/40"
            >
              <span className="font-semibold text-foreground">{item.service}</span>
              <span className="text-accent font-medium">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Search & City Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border shadow-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by campus name, resident pastor, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-5 bg-background text-sm focus-visible:ring-accent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results Badge */}
          <div className="text-xs font-semibold text-muted-foreground shrink-0 self-center">
            Showing <span className="text-accent font-bold">{filteredBranches.length}</span>{" "}
            {filteredBranches.length === 1 ? "campus" : "campuses"}
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
            Region:
          </span>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                selectedCity === city
                  ? "bg-accent text-accent-foreground font-bold shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Campus Grid */}
      {filteredBranches.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card space-y-4">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground/60" />
          <h3 className="text-lg font-bold text-foreground">No campuses found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We couldn&apos;t find any church branch matching &ldquo;{searchQuery}&rdquo;. Try
            adjusting your search terms or view our international headquarters.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setSelectedCity("All");
            }}
            variant="outline"
            className="border-accent text-accent hover:bg-accent/10"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => {
            const isHq = branch.is_hq;
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${branch.name} ${branch.address}`
            )}`;

            return (
              <Card
                key={branch.id}
                className={cn(
                  "relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl",
                  isHq
                    ? "bg-primary text-primary-foreground border-2 border-accent shadow-lg md:col-span-2 lg:col-span-3"
                    : "bg-card text-card-foreground border-t-4 border-t-accent shadow-md"
                )}
              >
                {/* Headquarters Ribbon */}
                {isHq && (
                  <div className="bg-gradient-to-r from-accent via-accent/90 to-amber-500 text-accent-foreground py-1.5 px-4 text-xs font-black uppercase tracking-widest flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Crown className="h-4 w-4 fill-current" />
                      Global Mother Church & Apostolic Seat
                    </span>
                    <span className="hidden sm:inline text-[11px] font-bold">
                      Sugutta Headquarters
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1">
                  {/* Title & Pastor */}
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={cn(
                          "font-extrabold tracking-tight",
                          isHq ? "text-xl sm:text-2xl text-white" : "text-lg text-primary"
                        )}
                      >
                        {branch.name}
                      </h3>
                      {!isHq && (
                        <span className="text-[11px] font-semibold text-accent uppercase tracking-wider shrink-0 bg-accent/10 px-2 py-0.5 rounded">
                          {branch.city}
                        </span>
                      )}
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-medium",
                        isHq ? "text-accent" : "text-muted-foreground"
                      )}
                    >
                      <User className="h-3.5 w-3.5 shrink-0" />
                      <span>Resident Leadership: {branch.resident_pastor}</span>
                    </div>
                  </div>

                  {/* Location & Address */}
                  <div
                    className={cn(
                      "flex items-start gap-2 text-xs leading-relaxed",
                      isHq ? "text-white/80" : "text-muted-foreground"
                    )}
                  >
                    <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <a
                      href={`tel:${branch.phone}`}
                      className={cn(
                        "flex items-center gap-1.5 hover:underline font-semibold",
                        isHq ? "text-white hover:text-accent" : "text-primary hover:text-accent"
                      )}
                    >
                      <Phone className="h-3.5 w-3.5 text-accent" />
                      <span>{branch.phone}</span>
                    </a>
                    {branch.email && (
                      <a
                        href={`mailto:${branch.email}`}
                        className={cn(
                          "flex items-center gap-1.5 hover:underline",
                          isHq ? "text-white/80 hover:text-accent" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Mail className="h-3.5 w-3.5 text-accent" />
                        <span className="truncate max-w-[200px]">{branch.email}</span>
                      </a>
                    )}
                  </div>

                  {/* Service Times */}
                  {renderServiceTimes(branch.service_times)}
                </div>

                {/* Footer Action Buttons */}
                <div
                  className={cn(
                    "p-4 border-t flex flex-wrap items-center gap-3",
                    isHq ? "border-white/10 bg-black/20" : "border-border bg-muted/20"
                  )}
                >
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-md bg-accent text-accent-foreground text-xs font-bold hover:brightness-105 transition-all shadow-sm"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    Get Directions
                    <ExternalLink className="h-3 w-3 ml-0.5 opacity-80" />
                  </a>

                  <a
                    href={`tel:${branch.phone}`}
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-md text-xs font-semibold border transition-all",
                      isHq
                        ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    )}
                  >
                    <Phone className="h-3.5 w-3.5 text-accent" />
                    Call
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
