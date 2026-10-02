import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { FALLBACK_BRANCHES } from "@/lib/data/branches";
import { BranchList } from "@/components/community/branch-list";
import { Globe, Church, Compass } from "lucide-react";
import { Branch } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Global Campuses & Branches | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Find a Heavens Gates Sugutta Fellowship Church campus near you. Locate our international headquarters in Nairobi and regional revival centers across Kenya.",
};

// Revalidate branches every hour
export const revalidate = 3600;

async function getBranches(): Promise<Branch[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .order("is_hq", { ascending: false })
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("[Branches Page] Using fallback branch data:", error?.message);
      return FALLBACK_BRANCHES;
    }

    return data as Branch[];
  } catch (err) {
    console.error("[Branches Page] Unexpected fetch error:", err);
    return FALLBACK_BRANCHES;
  }
}

export default async function BranchesPage() {
  const branches = await getBranches();

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Banner */}
      <section className="relative bg-primary text-primary-foreground py-20 px-4 sm:px-8 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-primary/50 to-primary pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Globe className="h-3.5 w-3.5 fill-current" />
            <span>Kingdom Territorial Expansion</span>
          </div>

          <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent">
            Expanding Across Nations
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Our Global Campuses & Ministries
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Find a family of believers and experience the transformative anointing near you.
            Every campus shares the same heartbeat of revival, deliverance, and kingdom excellence.
          </p>
        </div>
      </section>

      {/* Main Directory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-10">
        <BranchList initialBranches={branches} />
      </section>

      {/* Plant a Branch / Contact Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 mt-16 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-secondary/60 border border-border space-y-4">
          <Church className="h-10 w-10 mx-auto text-accent" />
          <h3 className="text-xl sm:text-2xl font-bold text-primary">
            Looking for a Fellowship in Your City?
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Heavens Gates Sugutta Fellowship Church is actively expanding home cell fellowships
            and regional campuses. If there is no campus currently near you, join our live
            broadcasts or reach out to our apostolic missions desk.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-md"
            >
              <Compass className="h-4 w-4 text-accent" />
              Contact Church Administration
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
