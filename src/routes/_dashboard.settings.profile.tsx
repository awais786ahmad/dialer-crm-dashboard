import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/settings/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Quality Dial" },
      { name: "description", content: "Your personal details, availability and notification prefs." },
      { property: "og:title", content: "Profile — Quality Dial" },
      { property: "og:description", content: "Your personal details, availability and notification prefs." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Profile" description="Your personal details, availability and notification prefs." entity="profile" />;
}
