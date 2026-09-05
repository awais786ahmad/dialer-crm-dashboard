"use client";

import * as React from "react";
import { Search, SlidersHorizontal, LayoutGrid, List, Plus, Phone, Mail, MoreHorizontal, X } from "lucide-react";
import { leadSeed, pipelineStagesSeed, tagClass, type Lead } from "@/data/crm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DetailDrawer, RecordFormModal } from "@/components/dashboard/crud";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function CrmWorkspace() {
  const [leads, setLeads] = React.useState(leadSeed);
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<"board" | "list">("board");
  const [selected, setSelected] = React.useState<Lead | null>(null);
  const [createOpen, setCreateOpen] = React.useState(false);
  const filtered = leads.filter((lead) => [lead.name, lead.company, lead.email, lead.owner].join(" ").toLowerCase().includes(query.toLowerCase()));
  const moveLead = (leadId: string, stage: string) => {
    setLeads((items) => items.map((lead) => lead.id === leadId ? { ...lead, stage } : lead));
    toast.success("Lead stage updated");
  };
  return <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">CRM workspace</p><h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Leads</h1><p className="mt-1 text-sm text-muted-foreground">Manage every conversation from first touch to closed won.</p></div>
      <Button onClick={() => setCreateOpen(true)}><Plus data-icon="inline-start" /> New lead</Button>
    </div>
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card/70 p-3 shadow-sm">
      <div className="relative min-w-[240px] flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search leads, companies, owners..." className="pl-9" /></div>
      <Button variant="outline" size="sm"><SlidersHorizontal data-icon="inline-start" /> Filters <Badge variant="secondary">3</Badge></Button>
      <div className="ml-auto flex items-center rounded-lg border border-border p-1"><Button variant={view === "board" ? "secondary" : "ghost"} size="icon" onClick={() => setView("board")} aria-label="Board view"><LayoutGrid /></Button><Button variant={view === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setView("list")} aria-label="List view"><List /></Button></div>
    </div>
    {view === "board" ? <div className="grid gap-4 xl:grid-cols-5">{pipelineStagesSeed.map((stage) => { const items = filtered.filter((lead) => lead.stage === stage.id); return <section key={stage.id} className="min-h-[420px] rounded-2xl border border-border/80 bg-muted/20 p-3" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const id = event.dataTransfer.getData("lead"); if (id) moveLead(id, stage.id); }}><div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" /><h2 className="text-sm font-semibold">{stage.name}</h2></div><Badge variant="outline">{items.length}</Badge></div><div className="flex flex-col gap-3">{items.map((lead) => <LeadCard key={lead.id} lead={lead} onOpen={() => setSelected(lead)} onDragStart={(event) => event.dataTransfer.setData("lead", lead.id)} />)}</div></section>; })}</div> : <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="px-5 py-4">Lead</th><th className="px-5 py-4">Stage</th><th className="px-5 py-4">Owner</th><th className="px-5 py-4">Last contact</th><th /></tr></thead><tbody>{filtered.map((lead) => <tr key={lead.id} className="border-b border-border/70 last:border-0 hover:bg-muted/20"><td className="px-5 py-4"><button className="text-left" onClick={() => setSelected(lead)}><p className="font-medium">{lead.name}</p><p className="text-xs text-muted-foreground">{lead.company}</p></button></td><td className="px-5 py-4"><Badge variant="secondary">{pipelineStagesSeed.find((item) => item.id === lead.stage)?.name}</Badge></td><td className="px-5 py-4 text-muted-foreground">{lead.owner}</td><td className="px-5 py-4 text-muted-foreground">{lead.lastContacted}</td><td className="px-5 py-4 text-right"><Button variant="ghost" size="icon" onClick={() => setSelected(lead)} aria-label={`Open ${lead.name}`}><MoreHorizontal /></Button></td></tr>)}</tbody></table></div></CardContent></Card>}
    <DetailDrawer open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} title={selected?.name ?? "Lead details"} description={selected ? `${selected.company} · ${selected.email}` : "Lead details"}>{selected && <div className="flex flex-col gap-6"><div className="flex items-center justify-between"><div><Badge variant="secondary">{selected.status}</Badge><p className="mt-2 text-sm text-muted-foreground">Owner: {selected.owner}</p></div><div className="flex gap-2"><Button variant="outline" size="icon" aria-label="Call lead"><Phone /></Button><Button variant="outline" size="icon" aria-label="Email lead"><Mail /></Button></div></div><Separator /><div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">AI summary</p><p className="mt-2 text-sm leading-6">{selected.aiSummary}</p></div><div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tags</p><div className="mt-2 flex flex-wrap gap-2">{selected.tags.length ? selected.tags.map((tag) => <Badge key={tag} variant="outline" className={tagClass(tag === "VIP" ? "amber" : tag === "Interested" ? "emerald" : tag === "Follow-up" ? "sky" : "violet")}>{tag}</Badge>) : <span className="text-sm text-muted-foreground">No tags yet</span>}</div></div><div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Recent activity</p><div className="mt-3 flex flex-col gap-3">{selected.timeline.map((item) => <div key={item.id} className="border-l-2 border-primary/30 pl-3"><p className="text-sm">{item.text}</p><p className="text-xs text-muted-foreground">{item.when}</p></div>)}</div></div></div>}</DetailDrawer>
    <RecordFormModal open={createOpen} onOpenChange={setCreateOpen} title="New lead" description="Add a lead to your CRM pipeline." mode="create" onSubmit={() => { toast.success("Lead created"); setCreateOpen(false); }}><div className="flex flex-col gap-2"><Label htmlFor="lead-name">Name</Label><Input id="lead-name" placeholder="Full name" /></div><div className="flex flex-col gap-2"><Label htmlFor="lead-notes">Notes</Label><Textarea id="lead-notes" placeholder="Add context for your team" /></div></RecordFormModal>
  </div>;
}

function LeadCard({ lead, onOpen, onDragStart }: { lead: Lead; onOpen: () => void; onDragStart: (event: React.DragEvent<HTMLDivElement>) => void }) { return <Card draggable onDragStart={onDragStart} className="cursor-grab border-border/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing"><CardHeader className="gap-1 p-4 pb-2"><div className="flex items-start justify-between gap-2"><button className="text-left" onClick={onOpen}><CardTitle className="text-sm">{lead.name}</CardTitle><p className="mt-1 text-xs text-muted-foreground">{lead.company}</p></button><Button variant="ghost" size="icon" className="size-7" onClick={onOpen} aria-label="Open lead"><MoreHorizontal /></Button></div></CardHeader><CardContent className="flex flex-col gap-3 p-4 pt-2"><p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{lead.aiSummary}</p><div className="flex flex-wrap gap-1.5">{lead.tags.map((tag) => <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>)}</div><div className="flex items-center justify-between text-[11px] text-muted-foreground"><span>{lead.owner}</span><span>{lead.lastContacted}</span></div></CardContent></Card>; }
