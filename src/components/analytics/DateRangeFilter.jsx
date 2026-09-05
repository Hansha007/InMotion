import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, ArrowRight } from "lucide-react";
import { useAnalytics } from "./AnalyticsContext";

export default function DateRangeFilter() {
  const { timeRange, setTimeRange, customDates, applyCustomDates } = useAnalytics();
  const [showCustomPopover, setShowCustomPopover] = useState(false);
  const [localStart, setLocalStart] = useState(customDates.startDate);
  const [localEnd, setLocalEnd] = useState(customDates.endDate);
  const popoverRef = useRef(null);

  const filterOptions = [
    { label: "Today", value: "today" },
    { label: "7 Days", value: "7days" },
    { label: "30 Days", value: "30days" },
    { label: "Custom", value: "custom" }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowCustomPopover(false);
      }
    }
    if (showCustomPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCustomPopover]);

  const handleSelect = (val) => {
    if (val === "custom") {
      setShowCustomPopover((prev) => !prev);
    } else {
      setShowCustomPopover(false);
      setTimeRange(val);
    }
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    applyCustomDates({ startDate: localStart, endDate: localEnd });
    setShowCustomPopover(false);
  };

  return (
    <div className="date-range-filter-wrapper" ref={popoverRef}>
      {filterOptions.map((opt) => {
        const isActive = timeRange === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`date-filter-btn ${isActive ? "active" : ""}`}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.value === "custom" && <Calendar size={12} />}
            <span>{opt.label}</span>
            {opt.value === "custom" && <ChevronDown size={11} />}
          </button>
        );
      })}

      {showCustomPopover && (
        <div className="custom-date-popover">
          <div className="custom-date-popover-title">
            <Calendar size={14} color="var(--accent)" />
            <span>Custom Date Range</span>
          </div>

          <form onSubmit={handleApplyCustom} className="custom-date-inputs">
            <div className="custom-date-field">
              <label htmlFor="custom-start">Start Date</label>
              <input
                id="custom-start"
                type="date"
                value={localStart}
                onChange={(e) => setLocalStart(e.target.value)}
                required
              />
            </div>

            <div className="custom-date-field">
              <label htmlFor="custom-end">End Date</label>
              <input
                id="custom-end"
                type="date"
                value={localEnd}
                onChange={(e) => setLocalEnd(e.target.value)}
                required
              />
            </div>

            <div style={{ gridColumn: "1 / -1", marginTop: "6px" }}>
              <button
                type="submit"
                className="custom-date-apply-btn"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
              >
                <span>Apply Window</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
