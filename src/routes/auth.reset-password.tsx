"use client";

import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const rules = ["At least 8 characters", "One number", "One symbol"];

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Set a new password" description="Choose a strong password you haven't used before.">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" type="password" placeholder="••••••••" />
        </div>
        <ul className="space-y-1.5">
          {rules.map((rule) => (
            <li key={rule} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex size-4 items-center justify-center rounded-full bg-muted">
                <Check className="size-2.5" />
              </span>
              {rule}
            </li>
          ))}
        </ul>
        <Button type="submit" className="w-full" size="lg" asChild>
          <Link href="/auth/login">Update password</Link>
        </Button>
      </form>
    </AuthShell>
  );
}
