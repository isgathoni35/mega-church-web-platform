import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isServiceLive = false;

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("sermons")
      .select("is_live")
      .eq("is_live", true)
      .limit(1);

    if (data && data.length > 0) {
      isServiceLive = true;
    }
  } catch (err) {
    console.error("[Admin Layout Live Status Error]:", err);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col flex-1 min-w-0">
        <AdminHeader isServiceLive={isServiceLive} />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
