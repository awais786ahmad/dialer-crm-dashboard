import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/crm/segments")({
  head: () => ({
    meta: [
      { title: "Segments — Quality Dial" },
      { name: "description", content: "Group leads into dynamic segments for targeted outreach." },
      { property: "og:title", content: "Segments — Quality Dial" },
      { property: "og:description", content: "Group leads into dynamic segments for targeted outreach." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Segments" description="Group leads into dynamic segments for targeted outreach." entity="segment" />;
}
