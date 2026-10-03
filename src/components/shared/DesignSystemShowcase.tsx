"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Play, Calendar, Smartphone, ArrowRight } from "lucide-react";

export function DesignSystemShowcase() {
  return (
    <div className="max-w-4xl w-full flex flex-col gap-12">
      {/* Header & Typography Showcase */}
      <div className="text-center space-y-4">
        <span className="font-script text-4xl sm:text-5xl text-accent block">
          Get Ready for the Overflow!
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
          Design System & Foundation Verification
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          High-contrast Royal Purple & Metallic Gold aesthetic built on Next.js
          App Router, Tailwind CSS, Google Fonts (Montserrat & Great Vibes), and
          customized shadcn/ui components.
        </p>
      </div>

      {/* Buttons Showcase */}
      <section className="bg-secondary/40 border border-border p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-semibold text-primary">Buttons & CTAs</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="accent" size="lg">
            <Heart className="mr-1 h-5 w-5 fill-current" />
            Give / Donate (Gold CTA)
          </Button>
          <Button variant="default" size="lg">
            <Play className="mr-1 h-5 w-5" />
            Watch Live (Royal Purple)
          </Button>
          <Button variant="secondary">Connect</Button>
          <Button variant="outline">Learn More</Button>
          <Button variant="ghost">
            Quick Link <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Cards Showcase */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Style A: Light with Gold Top Border */}
        <Card variant="lightAccent">
          <CardHeader>
            <div className="flex items-center gap-2 text-accent mb-1">
              <Calendar className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Weekly Schedule (Style A)
              </span>
            </div>
            <CardTitle className="text-xl text-primary">
              Sunday Celebration Service
            </CardTitle>
            <CardDescription>
              Main Sanctuary & Global Broadcast
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Join thousands of believers every Sunday at 10:00 AM for dynamic
              praise, deep worship, and an anointed message of overflow.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Add to Calendar
            </Button>
          </CardFooter>
        </Card>

        {/* Style B: Dark Royal Purple */}
        <Card variant="dark">
          <CardHeader>
            <div className="flex items-center gap-2 text-accent mb-1">
              <Smartphone className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Digital Giving (Style B)
              </span>
            </div>
            <CardTitle className="text-xl text-primary-foreground">
              M-Pesa STK Push Express
            </CardTitle>
            <CardDescription className="text-primary-foreground/70">
              Frictionless Tithes & Offerings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-primary-foreground/90 leading-relaxed">
              Enter your Safaricom mobile number to receive an instant PIN prompt
              directly on your phone.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="accent" size="sm" className="w-full">
              Initiate Offering
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Form Input Showcase */}
      <section className="bg-card border border-border p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-primary">
          High-Contrast Form Input (Gold Focus Ring)
        </h2>
        <div className="max-w-md space-y-2">
          <label
            htmlFor="phone-test"
            className="text-sm font-medium text-foreground"
          >
            M-Pesa Phone Number
          </label>
          <Input
            id="phone-test"
            type="tel"
            placeholder="e.g. 254712345678"
            defaultValue="254700000000"
          />
          <p className="text-xs text-muted-foreground">
            Click the input above to verify the metallic gold focus ring.
          </p>
        </div>
      </section>
    </div>
  );
}
