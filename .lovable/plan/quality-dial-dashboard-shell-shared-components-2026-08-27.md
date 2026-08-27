# Quality Dial — Dashboard Shell & Shared Components

## Starting point

The `quality-dial-crm` GitHub repo is public and reachable. It already contains the Quality Dial design system (deep ocean ink + amber accent, Space Grotesk / DM Sans, oklch tokens), the marketing site, auth pages, and onboarding flow — but no dashboard yet. This Lovable project is still the blank starter, so step one is to bring the repo code in, then build the dashboard shell on top of it.

## Step 1 — Import the repo

Copy the repo's `src/`, `public/`, config files, and dependency list into this project so the theme, logo, routes, and shadcn components match exactly. No visual changes to existing marketing/auth/onboarding pages.

## Step 2 — AppShell layout

New `_dashboard` layout route wrapping all dashboard modules: sidebar + topbar + content outlet + AI copilot button.

### Sidebar
- Collapsed to an icon rail by default; toggle button at the top expands/collapses it.
- Collapsed + hover: expands as a floating overlay drawer over the content (content does not shift).
- Expanded (pinned): content area resizes to fit.
- Quality Dial logo pinned at the top.
- Navigation, single-open accordion with smooth height/opacity transitions:
  - Dashboard (link)
  - CRM & Leads → Segments, Leads, Tags, Tasks, Data Table, Scripts, Templates
  - Calling → Dialer, Live, History
  - Campaigns (link)
  - Inbox (link)
  - Reports & Analytics (link)
  - Organization → Workspace Settings, Teams, Members, Roles & Permissions, AI Agents
  - Settings → Profile, Automations, Knowledge Base, Calling
- The group containing the active route auto-opens; active item is highlighted.

### Topbar
Left: breadcrumb trail for the current module, then the global search field.
- Clicking search opens a command modal (Cmd/Ctrl+K too) with recent searches and grouped results across leads, campaigns, contacts, settings, etc.

Right: Dialer icon button (opens the dialer drawer), notifications bell with badge, profile dropdown (Profile, Settings, Help & Support, theme toggle, Sign out).

### AI Copilot
- Floating button, bottom-right; opens a right drawer with the agent chat window.
- Chat header: previous-conversations icon button with a dropdown of past chats, plus a "New conversation" button.
- The button hides automatically whenever any right-side drawer is open.

## Step 3 — Shared interaction primitives

- `ConfirmDialog` — required confirmation step for every create and delete action.
- `RecordFormModal` — all create/edit flows run in a modal, each with a "Save as draft" action alongside submit.
- `DetailDrawer` — all record detail views open in a right drawer.
- A shared context so drawers register themselves (used to hide the copilot button).

## Step 4 — Notification system

- Bell badge shows the combined count of notifications + alerts + reminders, with per-type colored badges/segments (e.g. 2 notifications / 3 alerts / 2 reminders).
- Dropdown lists all three types, grouped and color-coded, with mark-as-read and clear actions.
- Alerts additionally fire a toast in the top-right, below the topbar, auto-dismissing after 10 seconds.
- Reminders fire a larger persistent toast with full reminder details that only closes on manual dismiss.

## Step 5 — Route stubs

Create every route listed in the sidebar with a consistent placeholder page (title, breadcrumb, empty-state card) plus per-route head metadata, so navigation is fully working end to end. Module content itself comes later.

## Technical notes

- Stack stays TanStack Start + Tailwind v4; sidebar built on the existing `components/ui/sidebar` primitives, extended with the hover-overlay behavior.
- Accordion via Radix `Accordion` (`type="single"` `collapsible`), search modal via `cmdk` `Command`, drawers via `Sheet`, toasts via `sonner` with custom render for reminders.
- All colors from existing semantic tokens; new tokens (notification/alert/reminder colors) added to `src/styles.css`.
- Notification state and copilot/drawer state kept in React context with mock data, ready to swap for a real backend later.
