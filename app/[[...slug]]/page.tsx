"use client";

import { useParams } from "next/navigation";
import type { ComponentType } from "react";
import DashboardLayout from "@/routes/_dashboard";
import Route0 from "@/routes/_dashboard.calling.dialer";
import Route1 from "@/routes/_dashboard.calling.history";
import Route2 from "@/routes/_dashboard.calling.live";
import Route3 from "@/routes/_dashboard.campaigns";
import Route4 from "@/routes/_dashboard.crm.data-table";
import Route5 from "@/routes/_dashboard.crm.leads";
import Route6 from "@/routes/_dashboard.crm.scripts";
import Route7 from "@/routes/_dashboard.crm.segments";
import Route8 from "@/routes/_dashboard.crm.tags";
import Route9 from "@/routes/_dashboard.crm.tasks";
import Route10 from "@/routes/_dashboard.crm.templates";
import Route11 from "@/routes/_dashboard.dashboard";
import Route12 from "@/routes/_dashboard.inbox";
import Route13 from "@/routes/_dashboard.organization.ai-agents";
import Route14 from "@/routes/_dashboard.organization.members";
import Route15 from "@/routes/_dashboard.organization.roles";
import Route16 from "@/routes/_dashboard.organization.teams";
import Route17 from "@/routes/_dashboard.organization.workspace";
import Route18 from "@/routes/_dashboard.reports";
import Route19 from "@/routes/_dashboard.settings.automations";
import Route20 from "@/routes/_dashboard.settings.calling";
import Route21 from "@/routes/_dashboard.settings.knowledge-base";
import Route22 from "@/routes/_dashboard.settings.profile";
import Route23 from "@/routes/about";
import Route24 from "@/routes/auth.forgot-password";
import Route25 from "@/routes/auth.login";
import Route26 from "@/routes/auth.reset-password";
import Route27 from "@/routes/auth.signup";
import Route28 from "@/routes/auth.verify-email";
import Route29 from "@/routes/contact";
import Route30 from "@/routes/features";
import Route31 from "@/routes/index";
import Route32 from "@/routes/onboarding.leads";
import Route33 from "@/routes/onboarding.phone";
import Route34 from "@/routes/onboarding.ready";
import Route35 from "@/routes/onboarding.workspace";
import Route36 from "@/routes/pricing";
import Route37 from "@/routes/resources";

const routes: Record<string, ComponentType> = {
  "calling/dialer": Route0,
  "calling/history": Route1,
  "calling/live": Route2,
  "campaigns": Route3,
  "crm/data-table": Route4,
  "crm/leads": Route5,
  "crm/scripts": Route6,
  "crm/segments": Route7,
  "crm/tags": Route8,
  "crm/tasks": Route9,
  "crm/templates": Route10,
  "dashboard": Route11,
  "inbox": Route12,
  "organization/ai-agents": Route13,
  "organization/members": Route14,
  "organization/roles": Route15,
  "organization/teams": Route16,
  "organization/workspace": Route17,
  "reports": Route18,
  "settings/automations": Route19,
  "settings/calling": Route20,
  "settings/knowledge-base": Route21,
  "settings/profile": Route22,
  "about": Route23,
  "auth/forgot-password": Route24,
  "auth/login": Route25,
  "auth/reset-password": Route26,
  "auth/signup": Route27,
  "auth/verify-email": Route28,
  "contact": Route29,
  "features": Route30,
  "": Route31,
  "onboarding/leads": Route32,
  "onboarding/phone": Route33,
  "onboarding/ready": Route34,
  "onboarding/workspace": Route35,
  "pricing": Route36,
  "resources": Route37,
};

export default function Page() {
  const params = useParams<{ slug?: string[] }>();
  const slug = params.slug ?? [];
  const key = slug.join("/");
  const Component = routes[key] ?? routes[""];
  if (!Component) return null;
  const content = <Component />;
  const publicRoute = key === "" || key === "about" || key === "features" || key === "pricing" || key === "resources" || key === "contact" || key.startsWith("auth/") || key.startsWith("onboarding/");
  return publicRoute ? content : <DashboardLayout>{content}</DashboardLayout>;
}
