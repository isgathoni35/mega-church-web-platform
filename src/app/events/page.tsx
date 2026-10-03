import { Metadata } from "next";
import { EventsView } from "@/components/events/events-view";

export const metadata: Metadata = {
  title: "Events & Mission Calendar | Heavens Gates Sugutta Fellowship Church",
  description:
    "Join Pastor Jeannette Taylor for upcoming apostolic crusades, prayer mountain retreats, and deliverance gatherings. Experience signs, wonders, and divine breakthrough.",
  openGraph: {
    title: "Events & Mission Calendar | Heavens Gates Sugutta Fellowship Church",
    description:
      "Join Pastor Jeannette Taylor for upcoming apostolic crusades, prayer mountain retreats, and deliverance gatherings.",
    type: "website",
  },
};

export default function EventsPage() {
  return <EventsView />;
}
