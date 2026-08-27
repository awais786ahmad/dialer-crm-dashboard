import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/calling/live")({
  head: () => ({
    meta: [
      { title: "Live calls — Quality Dial" },
      { name: "description", content: "Monitor active calls, whisper and barge in real time." },
      { property: "og:title", content: "Live calls — Quality Dial" },
      { property: "og:description", content: "Monitor active calls, whisper and barge in real time." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Live calls" description="Monitor active calls, whisper and barge in real time." entity="monitor" />;
}
