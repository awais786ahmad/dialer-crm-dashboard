import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/crm/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Quality Dial" },
      { name: "description", content: "Follow-ups, callbacks and to-dos assigned across your team." },
      { property: "og:title", content: "Tasks — Quality Dial" },
      { property: "og:description", content: "Follow-ups, callbacks and to-dos assigned across your team." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Tasks" description="Follow-ups, callbacks and to-dos assigned across your team." entity="task" />;
}
