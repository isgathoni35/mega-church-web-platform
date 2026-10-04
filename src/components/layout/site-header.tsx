import * as React from "react";
import { TopBar } from "./top-bar";
import { Navbar } from "./navbar";
import { SiteSettingsData } from "@/types/settings";

interface SiteHeaderProps {
  settings?: SiteSettingsData;
}

export function SiteHeader({ settings }: SiteHeaderProps = {}) {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-md shadow-slate-900/5 bg-white transition-shadow duration-300">
      <TopBar settings={settings} />
      <Navbar />
    </header>
  );
}
