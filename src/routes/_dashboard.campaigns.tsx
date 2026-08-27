import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns — Quality Dial" },
      { name: "description", content: "Plan, launch and measure multichannel outreach campaigns." },
      { property: "og:title", content: "Campaigns — Quality Dial" },
      { property: "og:description", content: "Plan, launch and measure multichannel outreach campaigns." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Campaigns" description="Plan, launch and measure multichannel outreach campaigns." entity="campaign" />;
}
