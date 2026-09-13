function DelayedShipmentCard() {
  return (
    <div className="absolute right-[17%] top-[18%] z-30 w-[180px] rounded-lg border border-[#EF4444]/70 bg-[#07111F]/90 px-3.5 py-2.5 shadow-[0_0_25px_rgba(239,68,68,0.12)] backdrop-blur-md">
      <div className="flex items-start gap-2.5">
        {/* Warning Icon */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#EF4444]/10 text-[#EF4444]">
          <span className="text-[15px]">⚠</span>
        </div>

        <div className="min-w-0 flex-1">
          {/* Shipment ID */}
          <p className="text-[11px] font-semibold text-[#F5F7FA]">
            SHP-7842
          </p>

          {/* Status */}
          <p className="mt-0.5 text-[9px] font-medium text-[#EF4444]">
            Delayed <span className="text-[#6F7D8E]">•</span> +1h 45m
          </p>

          {/* Route */}
          <p className="mt-1 text-[9px] text-[#A7B3C2]">
            Delhi <span className="text-[#6F7D8E]">→</span> Mumbai
          </p>
        </div>
      </div>
    </div>
  );
}

export default DelayedShipmentCard;