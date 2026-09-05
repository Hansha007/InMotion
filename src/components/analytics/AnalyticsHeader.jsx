import { useState } from "react";
import { Download, RefreshCw, Check } from "lucide-react";
import DateRangeFilter from "./DateRangeFilter";
import { useAnalytics } from "./AnalyticsContext";

export default function AnalyticsHeader({
  title = "Analytics",
  subtitle = "Understand the performance of your logistics network."
}) {
  const { retryLoad, isLoading } = useAnalytics();
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <header className="analytics-header">
      <div className="analytics-header-left">
        <div className="analytics-title-row">
          <h1 className="analytics-main-title">{title}</h1>
          <div className="telemetry-badge">
            <span className="telemetry-dot"></span>
            <span>Live Telemetry</span>
          </div>
        </div>
        <p className="analytics-header-subtitle">{subtitle}</p>
      </div>

      <div className="analytics-header-right">
        <DateRangeFilter />

        <button
          type="button"
          className={`header-action-btn ${exported ? "active-action" : ""}`}
          onClick={handleExport}
          title="Export analytics dataset as CSV / JSON"
        >
          {exported ? <Check size={13} color="var(--accent)" /> : <Download size={13} />}
          <span>{exported ? "Exported" : "Export"}</span>
        </button>

        <button
          type="button"
          className="header-action-btn"
          onClick={retryLoad}
          disabled={isLoading}
          title="Refresh logistics telemetry data"
        >
          <RefreshCw
            size={13}
            style={{
              animation: isLoading ? "spin 0.8s linear infinite" : "none"
            }}
          />
          <span>Refresh</span>
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
}
