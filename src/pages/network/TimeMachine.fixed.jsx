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
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="absolute bottom-4 left-1/2 z-[1100] flex h-9 -translate-x-1/2 items-center gap-2 rounded-md border border-[#18304A] bg-[#07111F]/90 px-3.5 text-[10px] font-semibold tracking-[0.12em] text-[#A7B3C2] shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:border-[#2196F3]/55 hover:text-white"
      >
        <History size={14} className="text-[#38BDF8]" />
        TIME MACHINE
      </button>
    );
  }

  return (
    <div className="absolute bottom-3 left-1/2 z-[1100] w-[calc(100%-24px)] max-w-[720px] -translate-x-1/2 rounded-[11px] border border-[#285074] bg-[#07111F]/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History size={14} className="text-[#38BDF8]" />
          <span className="text-[10px] font-semibold tracking-[0.1em] text-white">
            TIME MACHINE
          </span>
          <span className="text-[10px] text-[#6F7D8E]">
            {isLive ? formatClock(networkTimeline.end) : formatCompactTimestamp(selectedTime)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.08em] ${
              isLive ? "text-[#22C55E]" : "text-[#FACC15]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLive ? "bg-[#22C55E]" : "bg-[#FACC15]"
              }`}
            />
            {isLive ? "LIVE" : "VIEWING HISTORY"}
          </span>

          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            aria-label="Collapse time machine"
            className="text-[#6F7D8E] transition-colors hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="relative mt-3">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#18304A]" />
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#2196F3]"
          style={{ width: `${progress}%` }}
        />

        {networkEvents.map((event) => {
          const left =
            ((event.timestamp - networkTimeline.start) /
              (networkTimeline.end - networkTimeline.start)) *
            100;

          const isSelected = selectedEvent?.id === event.id;

          return (
            <div
              key={event.id}
              className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%` }}
            >
              <button
                type="button"
                aria-label={`View ${event.title}`}
                onClick={() => handleEventClick(event)}
                className={`block h-2.5 w-2.5 rounded-full border-2 border-[#07111F] ${
                  event.type === "shipment"
                    ? "bg-[#EF4444]"
                    : event.type === "route"
                    ? "bg-[#FACC15]"
                    : "bg-[#2196F3]"
                } ${isSelected ? "ring-2 ring-[#FACC15]/80" : ""}`}
                title={`${event.title} · ${formatClock(event.timestamp)}`}
              />

              {isSelected && (
                <div className="absolute bottom-5 left-1/2 w-[180px] -translate-x-1/2 rounded-md border border-[#18304A] bg-[#07111F]/95 p-2 text-left shadow-lg">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-[#7F91A5]">
                    {formatClock(event.timestamp)}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-white">
                    {event.title}
                  </p>
                  <p className="mt-1 text-[10px] text-[#A7B3C2]">
                    {event.entityId}
                  </p>
                  <p className="mt-2 text-[10px] text-[#DCE7F7]">
                    {event.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        <input
          type="range"
          min={networkTimeline.start}
          max={networkTimeline.end}
          step={60 * 1000}
          value={selectedTime}
          onChange={handleTimelineChange}
          className="relative z-20 mt-2 h-6 w-full cursor-pointer appearance-none bg-transparent accent-[#2196F3]"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlayingState((current) => !current)}
            className="flex items-center gap-2 rounded-md border border-[#18304A] bg-[#07111F] px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-white transition-colors hover:border-[#2196F3]/60"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>

          <button
            type="button"
            onClick={cycleSpeed}
            className="rounded-md border border-[#18304A] bg-[#07111F] px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-[#A7B3C2] transition-colors hover:border-[#2196F3]/60 hover:text-white"
          >
            {speed}×
          </button>
        </div>

        <button
          type="button"
          onClick={handleReturnToLive}
          className="flex items-center gap-1.5 rounded-md border border-[#18304A] bg-[#07111F] px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-[#A7B3C2] transition-colors hover:border-[#22C55E]/50 hover:text-[#22C55E]"
        >
          <RotateCcw size={12} />
          RETURN TO LIVE
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-[#6F7D8E]">
        <span>{formatDayOnly(networkTimeline.start)}</span>
        <span>{formatDayOnly(selectedTime)}</span>
        <span>{formatDayOnly(networkTimeline.end)}</span>
      </div>
    </div>
  );
}

export default TimeMachine;
