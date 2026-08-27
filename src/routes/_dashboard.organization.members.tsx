import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/organization/members")({
  head: () => ({
    meta: [
      { title: "Members — Quality Dial" },
      { name: "description", content: "Invite teammates and manage seats across the workspace." },
      { property: "og:title", content: "Members — Quality Dial" },
      { property: "og:description", content: "Invite teammates and manage seats across the workspace." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Members" description="Invite teammates and manage seats across the workspace." entity="member" />;
}
