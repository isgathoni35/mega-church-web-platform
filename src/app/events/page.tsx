import { Metadata } from "next";
import { EventsView } from "@/components/events/events-view";
import { getSiteSettingsAction } from "@/actions/admin-settings";

export const metadata: Metadata = {
  title: "Events & Mission Calendar | Sugutta Fellowship Church",
  description:
    "Join Pastor Caesar O. Nyandwaro for upcoming crusades, prayer retreats, and Sunday programmes. Reaching out, growing together, impacting our world.",
  openGraph: {
    title: "Events & Mission Calendar | Sugutta Fellowship Church",
    description:
      "Join Pastor Caesar O. Nyandwaro for upcoming crusades, prayer retreats, and Sunday programmes.",
    type: "website",
  },
};

export default async function EventsPage() {
  const settings = await getSiteSettingsAction();
  return <EventsView settings={settings} />;
}
