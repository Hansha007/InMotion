import { AlertTriangle } from "lucide-react";

function DelayedShipmentCard() {
  return (
    <div className="cursor-pointer rounded-lg border border-[#EF4444]/55 bg-[#07101E]/90 p-2.5 shadow-[0_0_20px_rgba(239,68,68,0.16)] backdrop-blur-md transition-all duration-300 hover:border-[#EF4444] hover:shadow-[0_0_26px_rgba(239,68,68,0.28)]">
      <div className="flex items-center gap-2.5">
        {/* Warning Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EF4444]/15 text-[#EF4444] shadow-[inset_0_0_10px_rgba(239,68,68,0.25)]">
          <AlertTriangle size={16} strokeWidth={2.4} />
        </div>

        <div className="min-w-0 flex-1">
          {/* Shipment ID */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wide text-white">
              SHP-7842
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
          </div>

          {/* Status badge */}
          <p className="mt-0.5 text-[9.5px] font-semibold text-[#EF4444]">
            Delayed <span className="text-white/40">•</span> +1h 45m
          </p>

          {/* Route path */}
          <p className="mt-0.5 text-[9.5px] font-medium text-[#94A3B8]">
            Delhi <span className="text-[#64748B]">→</span> Mumbai
          </p>
        </div>
      </div>
    </div>
  );
}

export default DelayedShipmentCard;