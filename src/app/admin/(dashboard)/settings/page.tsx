import React from "react";
import { getSiteSettingsAction } from "@/actions/admin-settings";
import { SettingsManagerView } from "@/components/admin/settings-manager-view";

export const metadata = {
  title: "Altar & Bank Settings | Church Admin Portal",
  description: "Configure church remittance coordinates, M-Pesa paybill, and communication channels.",
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettingsAction();

  return <SettingsManagerView initialSettings={settings} />;
}
