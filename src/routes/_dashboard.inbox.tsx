import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/inbox")({
  head: () => ({
    meta: [
      { title: "Inbox — Quality Dial" },
      { name: "description", content: "Unified conversations across calls, SMS, email and chat." },
      { property: "og:title", content: "Inbox — Quality Dial" },
      { property: "og:description", content: "Unified conversations across calls, SMS, email and chat." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Inbox" description="Unified conversations across calls, SMS, email and chat." entity="conversation" />;
}
