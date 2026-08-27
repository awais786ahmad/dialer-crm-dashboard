import { Bell, BellRing, CalendarClock, Check, TriangleAlert, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShell, type AlertKind, type ShellNotification } from "@/components/dashboard/shell-context";

const kindMeta: Record<AlertKind, { label: string; dot: string; badge: string; icon: typeof Bell }> =
  {
    notification: {
      label: "Notifications",
      dot: "bg-primary",
      badge: "bg-primary text-primary-foreground",
      icon: BellRing,
    },
    alert: {
      label: "Alerts",
      dot: "bg-destructive",
      badge: "bg-destructive text-destructive-foreground",
      icon: TriangleAlert,
    },
    reminder: {
      label: "Reminders",
      dot: "bg-accent",
      badge: "bg-accent text-accent-foreground",
      icon: CalendarClock,
    },
  };

export function NotificationsMenu() {
  const { notifications, counts, totalUnread, markAllRead, dismiss } = useShell();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-5" />
          {totalUnread > 0 ? (
            <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              {totalUnread}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Inbox</p>
            <div className="mt-1 flex items-center gap-1.5">
              {(Object.keys(kindMeta) as AlertKind[]).map((kind) => (
                <span
                  key={kind}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    kindMeta[kind].badge,
                  )}
                >
                  {counts[kind]} {kindMeta[kind].label.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs">
            <Check className="mr-1 size-3.5" />
            Mark read
          </Button>
        </div>

        <ScrollArea className="max-h-96">
          <div className="divide-y divide-border">
            {(Object.keys(kindMeta) as AlertKind[]).map((kind) => {
              const items = notifications.filter((n) => n.kind === kind);
              if (items.length === 0) return null;
              return (
                <div key={kind} className="py-2">
                  <p className="px-4 pb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    {kindMeta[kind].label}
                  </p>
                  {items.map((item) => (
                    <Row key={item.id} item={item} onDismiss={() => dismiss(item.id)} />
                  ))}
                </div>
              );
            })}
            {notifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                You are all caught up.
              </p>
            ) : null}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Row({ item, onDismiss }: { item: ShellNotification; onDismiss: () => void }) {
  const meta = kindMeta[item.kind];
  const Icon = meta.icon;
  return (
    <div className="group flex items-start gap-3 px-4 py-2.5 hover:bg-muted/60">
      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", meta.dot)} />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "flex items-center gap-1.5 text-sm",
            item.read ? "text-muted-foreground" : "font-medium text-foreground",
          )}
        >
          <Icon className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">{item.title}</span>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
        <p className="mt-1 text-[11px] text-muted-foreground/80">{item.time}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="rounded-md p-1 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:bg-muted"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
