import * as React from "react";
import { TopBar } from "./top-bar";
import { Navbar } from "./navbar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full flex flex-col shadow-sm backdrop-blur">
      <TopBar />
      <Navbar />
    </header>
  );
}
