import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/crm/data-table")({
  head: () => ({
    meta: [
      { title: "Data table — Quality Dial" },
      { name: "description", content: "Browse, filter and bulk-edit raw CRM records." },
      { property: "og:title", content: "Data table — Quality Dial" },
      { property: "og:description", content: "Browse, filter and bulk-edit raw CRM records." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Data table" description="Browse, filter and bulk-edit raw CRM records." entity="view" />;
}
