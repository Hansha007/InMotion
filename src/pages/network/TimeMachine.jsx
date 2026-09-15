import { useEffect, useMemo, useState } from "react";
import { History, Pause, Play, RotateCcw, X } from "lucide-react";
import { networkEvents, networkTimeline } from "../../data/network";

function formatCompactTimestamp(timestamp) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(timestamp))
    .toUpperCase();
}

function formatDayOnly(timestamp) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(timestamp));
}

function formatClock(timestamp) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
}

function TimeMachine({ selectedTime, onTimeChange, onReturnLive }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayingState, setIsPlayingState] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const isLive = selectedTime >= networkTimeline.end;
  const isPlaying = isPlayingState && !isLive;

  const progress = useMemo(() => {
    const total = networkTimeline.end - networkTimeline.start;
    const current = Math.max(0, Math.min(total, selectedTime - networkTimeline.start));
    return (current / total) * 100;
  }, [selectedTime]);

  useEffect(() => {
    if (!isPlayingState || isLive) {
      return undefined;
    }

    const timer = setInterval(() => {
      const next = Math.min(networkTimeline.end, selectedTime + 60 * 1000 * speed);
      onTimeChange(next);

      if (next >= networkTimeline.end) {
        setIsPlayingState(false);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [isLive, isPlayingState, onTimeChange, selectedTime, speed]);

  const handleTimelineChange = (event) => {
    setSelectedEvent(null);
    setIsPlayingState(false);
    onTimeChange(Number(event.target.value));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsPlayingState(false);
    onTimeChange(event.timestamp);
  };

  const cycleSpeed = () => {
    setSpeed((current) => (current === 1 ? 2 : current === 2 ? 4 : 1));
  };

  const handleReturnToLive = () => {
    setSelectedEvent(null);
    setIsPlayingState(false);
    onReturnLive();
  };

  if (!isExpanded) {
    return <button type="button" onClick={() => setIsExpanded(true)} className="absolute bottom-4 left-1/2 z-20 flex h-9 -translate-x-1/2 items-center gap-2 rounded-md border border-[#18304A] bg-[#07111F]/90 px-3.5 text-[10px] font-semibold tracking-[0.1em] text-[#A7B3C2] shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:border-[#2196F3]/60 hover:text-white"><History size={14} className="text-[#38BDF8]" /> TIME MACHINE</button>;
  }

  return <div className="absolute bottom-3 left-1/2 z-20 w-[calc(100%-24px)] max-w-[720px] -translate-x-1/2 rounded-[11px] border border-[#285074] bg-[#07111F]/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-4"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><History size={14} className="text-[#38BDF8]" /><span className="text-[10px] font-semibold tracking-[0.1em] text-white">TIME MACHINE</span><span className="text-[10px] text-[#6F7D8E]">{formatTime(selectedTime)}</span></div><div className="flex items-center gap-3"><span className={`flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.08em] ${isLive ? "text-[#22C55E]" : "text-[#FACC15]"}`}><span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-[#22C55E]" : "bg-[#FACC15]"}`} />{isLive ? "LIVE" : "VIEWING HISTORY"}</span><button type="button" onClick={() => setIsExpanded(false)} aria-label="Collapse time machine" className="text-[#6F7D8E] hover:text-white"><X size={14} /></button></div></div><div className="relative mt-3"><div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#18304A]" /><div className="pointer-events-none absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#2196F3]" style={{ width: `${progress}%` }} />{networkEvents.map((event) => <button key={event.id} type="button" aria-label={`View ${event.title}`} onClick={() => { setSelectedEvent(event); onTimeChange(event.timestamp); }} className={`absolute top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#07111F] ${event.type === "shipment" ? "bg-[#EF4444]" : event.type === "route" ? "bg-[#FACC15]" : "bg-[#2196F3]"}`} style={{ left: `${((event.timestamp - networkTimeline.start) / (networkTimeline.end - networkTimeline.start)) * 100}%` }} />)}<input type="range" min={networkTimeline.start} max={networkTimeline.end} step={60 * 1000} value={selectedTime} onChange={handleTimelineChange} className="relative z-10 h-4 w-full cursor-pointer appearance-none bg-transparent accent-[#2196F3]" /></div><div className="mt-1 flex justify-between text-[9px] text-[#6F7D8E]"><span>18:00</span><span>20:00</span><span>21:00</span><span>{formatClock(selectedTime)}</span><span>NOW</span></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2"><button type="button" onClick={() => onTimeChange(Math.max(networkTimeline.start, selectedTime - 5 * 60 * 1000))} className="text-[#A7B3C2] hover:text-white" aria-label="Step backward"><RotateCcw size={14} /></button><button type="button" onClick={() => { if (isLive) onTimeChange(networkTimeline.start); setIsPlayingState((current) => !current); setSelectedEvent(null); }} className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.08em] text-[#A7B3C2] hover:text-white">{isPlaying ? <Pause size={14} /> : <Play size={14} />}{isPlaying ? "PAUSE" : "PLAY"}</button><button type="button" onClick={cycleSpeed} className="border-l border-[#18304A] pl-2 text-[10px] font-semibold text-[#38BDF8]">{speed}×</button></div>{!isLive && <button type="button" onClick={() => { onReturnLive(); setSelectedEvent(null); }} className="text-[10px] font-semibold tracking-[0.08em] text-[#FACC15] hover:text-white">RETURN TO LIVE</button>}</div>{selectedEvent && <div className="absolute bottom-[76px] left-1/2 w-[220px] -translate-x-1/2 rounded-md border border-[#38516B] bg-[#07111F] p-3 shadow-[0_12px_30px_rgba(0,0,0,0.5)]"><p className="text-[9px] font-semibold tracking-[0.12em] text-[#FACC15]">{formatClock(selectedEvent.timestamp)}</p><p className="mt-1 text-[12px] font-semibold text-white">{selectedEvent.entityId}</p><p className="text-[10px] text-[#7F91A5]">{selectedEvent.location}</p><p className="mt-2 text-[11px] text-[#C5D1DE]">{selectedEvent.description}</p>{selectedEvent.type === "shipment" && <Link to={`/app/shipments/${selectedEvent.entityId}`} className="mt-2 inline-block text-[10px] font-semibold text-[#38BDF8] hover:text-white">VIEW SHIPMENT →</Link>}</div>}</div>;
}

export default TimeMachine;
