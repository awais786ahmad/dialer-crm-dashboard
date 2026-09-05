"use client";

import Link from "next/link";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const useCases = ["Outbound sales", "Inbound support", "Appointment setting", "Collections"];

export default function WorkspaceStep() {
  return (
    <OnboardingLayout
      step={1}
      title="Set up your workspace"
      description="This shapes your dashboard defaults, dialer settings and AI agent tone."
      actions={
        <>
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Back</Link>
          </Button>
          <Button asChild>
            <Link href="/onboarding/leads">Continue</Link>
          </Button>
        </>
      }
    >
      <form className="grid gap-6 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="workspace">Workspace name</Label>
          <Input id="workspace" placeholder="Northwind Revenue" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Team size</Label>
          <Select>
            <SelectTrigger id="size">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {["1–5", "6–25", "26–100", "100+"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s} agents
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tz">Time zone</Label>
          <Select>
            <SelectTrigger id="tz">
              <SelectValue placeholder="Select time zone" />
            </SelectTrigger>
            <SelectContent>
              {["UTC−08:00 Pacific", "UTC−05:00 Eastern", "UTC+00:00 London", "UTC+05:00 Karachi"].map(
                (tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3 sm:col-span-2">
          <Label>Primary use case</Label>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {useCases.map((uc) => (
              <label
                key={uc}
                className="cursor-pointer rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-ring has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
              >
                <input type="radio" name="usecase" className="sr-only" />
                {uc}
              </label>
            ))}
          </div>
        </div>
      </form>
    </OnboardingLayout>
  );
}
