import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/settings/knowledge-base")({
  head: () => ({
    meta: [
      { title: "Knowledge base — Quality Dial" },
      { name: "description", content: "Documents and FAQs your AI agents can ground answers in." },
      { property: "og:title", content: "Knowledge base — Quality Dial" },
      { property: "og:description", content: "Documents and FAQs your AI agents can ground answers in." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Knowledge base" description="Documents and FAQs your AI agents can ground answers in." entity="article" />;
}
