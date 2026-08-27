import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/calling/dialer")({
  head: () => ({
    meta: [
      { title: "Dialer — Quality Dial" },
      { name: "description", content: "Power, preview and predictive dialling from one console." },
      { property: "og:title", content: "Dialer — Quality Dial" },
      { property: "og:description", content: "Power, preview and predictive dialling from one console." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Dialer" description="Power, preview and predictive dialling from one console." entity="session" />;
}
