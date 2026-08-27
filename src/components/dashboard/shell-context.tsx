import * as React from "react";
import { toast } from "sonner";

export type AlertKind = "notification" | "alert" | "reminder";

export type ShellNotification = {
  id: string;
  kind: AlertKind;
  title: string;
  description: string;
  time: string;
  read?: boolean;
};

type ShellContextValue = {
  sidebarPinned: boolean;
  setSidebarPinned: (v: boolean) => void;
  openRightDrawers: number;
  registerRightDrawer: (open: boolean) => void;
  notifications: ShellNotification[];
  counts: Record<AlertKind, number>;
  totalUnread: number;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  push: (n: Omit<ShellNotification, "id" | "time" | "read">) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ShellContext = React.createContext<ShellContextValue | null>(null);

export function useShell() {
  const ctx = React.useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used within DashboardShellProvider");
  return ctx;
}

/** Registers an open right-side drawer so the copilot button hides while it is visible. */
export function useRightDrawerRegistration(open: boolean) {
  const { registerRightDrawer } = useShell();
  React.useEffect(() => {
    registerRightDrawer(open);
    if (open) return () => registerRightDrawer(false);
  }, [open, registerRightDrawer]);
}

const seed: ShellNotification[] = [
  {
    id: "n1",
    kind: "notification",
    title: "New lead assigned",
    description: "Priya Raman was routed to you from the Website Demo segment.",
    time: "2m ago",
  },
  {
    id: "n2",
    kind: "notification",
    title: "Campaign finished",
    description: "Q3 Renewal Outreach completed with a 34% connect rate.",
    time: "1h ago",
  },
  {
    id: "a1",
    kind: "alert",
    title: "Dialer capacity at 92%",
    description: "Concurrency is close to the plan limit for this workspace.",
    time: "5m ago",
  },
  {
    id: "a2",
    kind: "alert",
    title: "Failed number verification",
    description: "+1 415 555 0134 could not be verified with the carrier.",
    time: "22m ago",
  },
  {
    id: "a3",
    kind: "alert",
    title: "AI agent error rate rising",
    description: "Agent 'Nova' returned 6 tool errors in the last 10 minutes.",
    time: "40m ago",
  },
  {
    id: "r1",
    kind: "reminder",
    title: "Follow-up call: Northwind Retail",
    description: "Call Daniel Okafor about the pilot rollout and pricing tier.",
    time: "Today 16:30",
  },
  {
    id: "r2",
    kind: "reminder",
    title: "Weekly pipeline review",
    description: "Review stalled leads with the SDR team before the standup.",
    time: "Tomorrow 09:00",
  },
];

export function fireAlertToast(n: Pick<ShellNotification, "title" | "description">) {
  toast.warning(n.title, { description: n.description, duration: 10_000 });
}

export function fireReminderToast(n: Pick<ShellNotification, "title" | "description" | "time">) {
  toast(n.title, {
    description: (
      <div className="mt-1 space-y-2">
        <p className="text-sm text-muted-foreground">{n.description}</p>
        <p className="text-xs font-medium text-foreground">Scheduled for {n.time}</p>
      </div>
    ),
    duration: Infinity,
    closeButton: true,
    className: "w-[26rem] items-start",
  });
}

export function DashboardShellProvider({ children }: { children: React.ReactNode }) {
  const [sidebarPinned, setSidebarPinned] = React.useState(false);
  const [openRightDrawers, setOpenRightDrawers] = React.useState(0);
  const [notifications, setNotifications] = React.useState<ShellNotification[]>(seed);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const stored = window.localStorage.getItem("qd-theme");
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("qd-theme", theme);
  }, [theme]);

  const registerRightDrawer = React.useCallback((open: boolean) => {
    setOpenRightDrawers((c) => Math.max(0, c + (open ? 1 : -1)));
  }, []);

  const push = React.useCallback((n: Omit<ShellNotification, "id" | "time" | "read">) => {
    const item: ShellNotification = { ...n, id: crypto.randomUUID(), time: "just now" };
    setNotifications((list) => [item, ...list]);
    if (item.kind === "alert") fireAlertToast(item);
    if (item.kind === "reminder") fireReminderToast(item);
  }, []);

  const counts = React.useMemo(() => {
    const base: Record<AlertKind, number> = { notification: 0, alert: 0, reminder: 0 };
    for (const n of notifications) if (!n.read) base[n.kind] += 1;
    return base;
  }, [notifications]);

  const value: ShellContextValue = {
    sidebarPinned,
    setSidebarPinned,
    openRightDrawers,
    registerRightDrawer,
    notifications,
    counts,
    totalUnread: counts.notification + counts.alert + counts.reminder,
    markAllRead: () => setNotifications((l) => l.map((n) => ({ ...n, read: true }))),
    dismiss: (id) => setNotifications((l) => l.filter((n) => n.id !== id)),
    push,
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}
