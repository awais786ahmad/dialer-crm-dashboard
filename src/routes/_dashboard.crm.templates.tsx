import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/crm/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Quality Dial" },
      { name: "description", content: "Email and SMS templates used across campaigns and inbox." },
      { property: "og:title", content: "Templates — Quality Dial" },
      { property: "og:description", content: "Email and SMS templates used across campaigns and inbox." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Templates" description="Email and SMS templates used across campaigns and inbox." entity="template" />;
}
