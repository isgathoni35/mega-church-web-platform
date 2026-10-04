import { Metadata } from "next";
import { OrphanageDonateView } from "@/components/orphanage/orphanage-donate-view";
import { getSiteSettingsAction } from "@/actions/admin-settings";

export const metadata: Metadata = {
  title:
    "Donate to Children's Home & Orphanage | Heavens Gates Sugutta Fellowship Church",
  description:
    "Make a direct, life-changing donation to feed, shelter, and educate over 60 orphaned and vulnerable children at Heavens Gates Children's Home. Give securely via Kenyan M-Pesa or Sendwave.",
  openGraph: {
    title:
      "Donate to Children's Home & Orphanage | Heavens Gates Sugutta Fellowship Church",
    description:
      "Every contribution directly provides daily nutrition, formal education, medical care, and Christian love to vulnerable children.",
    type: "website",
  },
};

export default async function OrphanageDonatePage() {
  const settings = await getSiteSettingsAction();
  return <OrphanageDonateView settings={settings} />;
}
