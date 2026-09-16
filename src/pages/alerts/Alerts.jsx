import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Bell, Check, Package, Route, Search, SlidersHorizontal, Truck, Warehouse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { alerts, priorityOrder } from "../../data/alerts";

const priorityColors = { critical: "#EF4444", high: "#F97316", medium: "#FACC15", low: "#2196F3" };
const typeIcons = { shipment: Package, vehicle: Truck, route: Route, warehouse: Warehouse, system: AlertTriangle };
const priorities = ["all", "critical", "high", "medium", "low"];
const statuses = ["all", "active", "acknowledged", "resolved"];
const types = ["all", "shipment", "vehicle", "route", "warehouse", "system"];

function PageHeader() {
  return <div className="flex flex-col gap-5 border-b border-[#18304A] pb-5 xl:flex-row xl:items-end xl:justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">Operations / Exceptions</p><h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">ALERTS</h1><p className="mt-1 text-[13px] text-[#7F91A5]">Monitor exceptions across your logistics network.</p></div><div className="flex items-center gap-2 text-[11px] font-medium text-[#22C55E]"><span className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]" /> NETWORK LIVE</div></div>;
}

function Telemetry() {
  return <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#18304A] py-4 text-[10px] font-semibold tracking-[0.12em]"><span className="text-[#F5F7FA]"><strong className="mr-1.5 text-base">21</strong>TOTAL</span><span className="text-[#38516B]">·</span><span className="text-[#EF4444]"><strong className="mr-1.5 text-base">3</strong>CRITICAL</span><span className="text-[#38516B]">·</span><span className="text-[#F97316]"><strong className="mr-1.5 text-base">7</strong>AT RISK</span><span className="text-[#38516B]">·</span><span className="text-[#7F91A5]"><strong className="mr-1.5 text-base text-white">11</strong>RESOLVED</span></div>;
}

function PrioritySummary() {
  return <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-[#18304A] py-4">{[["critical", "CRITICAL", "3"], ["high", "HIGH", "7"], ["medium", "MEDIUM", "8"], ["low", "LOW", "3"]].map(([key, label, count]) => <div key={key} className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] text-[#8B9AAF]"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: priorityColors[key] }} />{label}<span className="text-[13px] text-white">{count}</span></div>)}</div>;
}

function AlertFilters({ search, setSearch, priority, setPriority, type, setType, status, setStatus, sort, setSort, onClear }) {
  const selectClass = "rounded-md border border-[#18304A] bg-[#07111F] px-2.5 py-2 text-[11px] text-[#A7B3C2] outline-none focus:border-[#2196F3]/60";
  return <div className="flex flex-col gap-3 border-b border-[#18304A] py-4 xl:flex-row xl:items-center"><label className="flex min-w-[210px] flex-1 items-center gap-2 border-b border-[#18304A] px-2 py-2 focus-within:border-[#2196F3]"><Search size={14} className="text-[#6F7D8E]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search alerts..." className="w-full bg-transparent text-[12px] text-white outline-none placeholder:text-[#6F7D8E]" /></label><div className="flex flex-wrap gap-2"><select aria-label="Priority" value={priority} onChange={(event) => setPriority(event.target.value)} className={selectClass}>{priorities.map((item) => <option key={item} value={item}>{item === "all" ? "Priority" : item.toUpperCase()}</option>)}</select><select aria-label="Type" value={type} onChange={(event) => setType(event.target.value)} className={selectClass}>{types.map((item) => <option key={item} value={item}>{item === "all" ? "TYPE" : item.toUpperCase()}</option>)}</select><select aria-label="Status" value={status} onChange={(event) => setStatus(event.target.value)} className={selectClass}>{statuses.map((item) => <option key={item} value={item}>{item === "all" ? "STATUS" : item.toUpperCase()}</option>)}</select><select aria-label="Sort" value={sort} onChange={(event) => setSort(event.target.value)} className={selectClass}><option value="newest">NEWEST</option><option value="oldest">OLDEST</option><option value="priority">PRIORITY</option></select><button type="button" onClick={onClear} className="flex items-center gap-1.5 px-2 text-[10px] text-[#7F91A5] hover:text-white"><SlidersHorizontal size={13} /> CLEAR</button></div></div>;
}

function AlertRow({ alert, selected, onSelect }) {
  const Icon = typeIcons[alert.type] || Bell;
  return <button type="button" onClick={() => onSelect(alert)} className={`group relative flex w-full gap-3 border-b border-[#18304A] px-3 py-4 text-left transition-colors ${selected ? "bg-[#2196F3]/[0.08]" : "hover:bg-[#07111F]/80"}`}><span className={`absolute bottom-0 left-0 top-0 w-[2px] transition-colors ${selected ? "bg-[#2196F3]" : "bg-transparent"}`} /><span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#18304A] bg-[#07111F]" style={{ color: priorityColors[alert.priority] }}><Icon size={15} strokeWidth={1.8} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: priorityColors[alert.priority] }}>{alert.priority}</span><span className="text-[12px] font-semibold text-white">{alert.title}</span>{alert.status === "resolved" && <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#22C55E]"><Check size={12} /> resolved</span>}</div><p className={`mt-1 text-[12px] font-medium ${alert.status === "resolved" ? "text-[#7F91A5]" : "text-[#C5D1DE]"}`}>{alert.entityLabel} <span className="font-normal text-[#6F7D8E]">· {alert.location}</span></p><p className="mt-1 text-[11px] text-[#7F91A5]">{alert.description}</p></div><div className="flex shrink-0 flex-col items-end gap-1 text-right"><span className="text-[10px] text-[#6F7D8E]">{alert.timeLabel}</span><span className="text-[9px] uppercase tracking-[0.08em] text-[#6F7D8E]">{alert.status}</span></div></button>;
}

function LoadingRows() {
  return <div className="space-y-3 p-3">{[1, 2, 3, 4, 5].map((item) => <div key={item} className="flex gap-3 border-b border-[#18304A] pb-4"><div className="h-7 w-7 animate-pulse rounded-md bg-[#0F1D30]" /><div className="flex-1 space-y-2"><div className="h-3 w-32 animate-pulse rounded bg-[#0F1D30]" /><div className="h-3 w-48 animate-pulse rounded bg-[#0F1D30]" /><div className="h-2 w-64 animate-pulse rounded bg-[#0F1D30]" /></div></div>)}</div>;
}

function DetailPanel({ alert, onAction }) {
  const navigate = useNavigate();
  const Icon = typeIcons[alert.type] || Bell;
  const entityPath = alert.affectedEntity.type === "shipment" ? `/app/shipments/${alert.affectedEntity.id}` : alert.affectedEntity.type === "vehicle" ? `/app/fleet/${alert.affectedEntity.id}` : alert.affectedEntity.type === "warehouse" ? `/app/warehouses/${alert.affectedEntity.id}` : `/app/network/routes/${alert.affectedEntity.id}`;
  const entityLabel = alert.affectedEntity.type === "shipment" ? "SHIPMENT" : alert.affectedEntity.type === "vehicle" ? "VEHICLE" : alert.affectedEntity.type === "warehouse" ? "WAREHOUSE" : "ROUTE";
  return <aside className="border-l border-[#18304A] bg-[#07111F]/70 p-5 xl:sticky xl:top-[92px] xl:h-[calc(100vh-115px)] xl:overflow-y-auto"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: priorityColors[alert.priority] }}>{alert.priority}</p><div className="mt-2 flex items-center gap-2"><Icon size={16} style={{ color: priorityColors[alert.priority] }} /><h2 className="text-lg font-semibold text-white">{alert.title}</h2></div><p className="mt-2 text-[12px] font-medium text-[#C5D1DE]">{alert.entityLabel} <span className="text-[#6F7D8E]">· {alert.location}</span></p></div><span className="text-[10px] uppercase tracking-[0.1em] text-[#7F91A5]">{alert.status}</span></div><div className="mt-6 border-t border-[#18304A] pt-4"><p className="text-[10px] font-semibold tracking-[0.15em] text-[#6F7D8E]">ALERT DETAILS</p><dl className="mt-3 grid grid-cols-2 gap-y-3 text-[11px]"><dt className="text-[#7F91A5]">Alert ID</dt><dd className="text-right text-[#E5EDF6]">{alert.id}</dd><dt className="text-[#7F91A5]">Created</dt><dd className="text-right text-[#E5EDF6]">Sep 14, 2026</dd><dt className="text-[#7F91A5]">Detected</dt><dd className="text-right text-[#E5EDF6]">Automatic monitoring</dd><dt className="text-[#7F91A5]">Priority</dt><dd className="text-right capitalize" style={{ color: priorityColors[alert.priority] }}>{alert.priority}</dd></dl></div><div className="mt-6 border-t border-[#18304A] pt-4"><p className="text-[10px] font-semibold tracking-[0.15em] text-[#6F7D8E]">ISSUE</p><p className="mt-3 text-[13px] leading-6 text-[#C5D1DE]">{alert.description}</p></div><div className="mt-6 border-t border-[#18304A] pt-4"><p className="text-[10px] font-semibold tracking-[0.15em] text-[#6F7D8E]">AFFECTED {entityLabel}</p><p className="mt-3 text-[13px] font-semibold text-white">{alert.entityLabel}</p><p className="mt-1 text-[11px] text-[#9AAABD]">{alert.location}</p><div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">{Object.entries(alert.metadata).map(([key, value]) => <div key={key}><p className="text-[#6F7D8E]">{key.replace(/([A-Z])/g, " $1")}</p><p className="mt-1 text-[#E5EDF6]">{value}</p></div>)}</div><button type="button" onClick={() => navigate(entityPath)} className="mt-4 text-[10px] font-semibold tracking-[0.1em] text-[#38BDF8] hover:text-white">VIEW {entityLabel} →</button></div><div className="mt-6 border-t border-[#18304A] pt-4"><p className="text-[10px] font-semibold tracking-[0.15em] text-[#6F7D8E]">ALERT TIMELINE</p><div className="mt-3 space-y-3">{alert.timeline.map(([time, event]) => <div key={`${time}-${event}`} className="flex gap-3 text-[11px]"><span className="w-9 shrink-0 text-[#6F7D8E]">{time}</span><span className="relative border-l border-[#38516B] pl-3 text-[#C5D1DE] before:absolute before:-left-[4px] before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#2196F3]">{event}</span></div>)}</div></div><div className="mt-6 border-t border-[#18304A] pt-4"><p className="text-[10px] font-semibold tracking-[0.15em] text-[#6F7D8E]">RECOMMENDED ACTION</p><p className="mt-3 text-[12px] leading-5 text-[#C5D1DE]">{alert.recommendedAction}</p>{alert.status === "resolved" ? <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#22C55E]"><Check size={14} /> Resolved</p> : <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={onAction} className="rounded-md bg-[#087CF0] px-3 py-2 text-[10px] font-bold tracking-[0.08em] text-white hover:bg-[#1686F5]">{alert.actionLabel}</button><button type="button" onClick={onAction} className="rounded-md border border-[#38516B] px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-[#A7B3C2] hover:border-[#2196F3] hover:text-white">ACKNOWLEDGE</button></div>}</div></aside>;
}

function Alerts() {
  const [selected, setSelected] = useState(alerts[0]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredAlerts = useMemo(() => {
    const query = search.toLowerCase();
    return alerts.filter((alert) => (priority === "all" || alert.priority === priority) && (type === "all" || alert.type === type) && (status === "all" || alert.status === status) && (!query || `${alert.title} ${alert.entityId} ${alert.entityLabel} ${alert.location} ${alert.description}`.toLowerCase().includes(query))).sort((a, b) => sort === "priority" ? priorityOrder[a.priority] - priorityOrder[b.priority] : sort === "oldest" ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt));
  }, [priority, search, sort, status, type]);

  const clearFilters = () => { setSearch(""); setPriority("all"); setType("all"); setStatus("all"); setSort("newest"); };
  const handleAction = () => { setActionMessage("Action queued for operations."); setTimeout(() => setActionMessage(""), 2200); };

  return <main className="min-h-screen bg-[#020812] px-5 pb-12 pt-[98px] text-[#F5F7FA] lg:ml-[248px] lg:px-7"><div className="mx-auto max-w-[1600px]"><PageHeader /><Telemetry /><PrioritySummary /><AlertFilters search={search} setSearch={setSearch} priority={priority} setPriority={setPriority} type={type} setType={setType} status={status} setStatus={setStatus} sort={sort} setSort={setSort} onClear={clearFilters} /><div className="mt-4 grid grid-cols-1 border-y border-[#18304A] xl:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]"><section className="min-h-[520px] border-r border-[#18304A]" aria-label="Alert list">{loading ? <LoadingRows /> : filteredAlerts.length ? filteredAlerts.map((alert) => <AlertRow key={alert.id} alert={alert} selected={selected?.id === alert.id} onSelect={setSelected} />) : <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><AlertTriangle size={22} className="text-[#6F7D8E]" /><h2 className="mt-4 text-sm font-semibold text-white">NO ALERTS FOUND</h2><p className="mt-2 text-[12px] text-[#7F91A5]">No alerts match your current filters.</p><button type="button" onClick={clearFilters} className="mt-4 text-[11px] font-semibold text-[#38BDF8] hover:text-white">CLEAR FILTERS</button></div>}</section>{selected && <DetailPanel alert={selected} onAction={handleAction} />}</div>{actionMessage && <div className="fixed bottom-6 right-6 z-50 rounded-md border border-[#22C55E]/40 bg-[#07111F] px-4 py-3 text-[12px] text-[#B7E5C5] shadow-[0_12px_30px_rgba(0,0,0,0.4)]"><Check size={14} className="mr-2 inline" />{actionMessage}</div>}</div></main>;
}

export default Alerts;
