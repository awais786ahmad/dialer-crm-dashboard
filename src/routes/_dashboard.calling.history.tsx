import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/calling/history")({
  head: () => ({
    meta: [
      { title: "Call history — Quality Dial" },
      { name: "description", content: "Recordings, transcripts and outcomes for every call." },
      { property: "og:title", content: "Call history — Quality Dial" },
      { property: "og:description", content: "Recordings, transcripts and outcomes for every call." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Call history" description="Recordings, transcripts and outcomes for every call." entity="filter" />;
}
