import { AlertOctagon, RotateCw } from "lucide-react";

export default function AnalyticsErrorState({
  title = "Telemetry Stream Error",
  message = "Failed to synchronize operational metrics from the logistics edge nodes.",
  onRetry
}) {
  return (
    <div className="analytics-state-card" style={{ borderColor: "rgba(184, 120, 120, 0.3)" }}>
      <div className="state-icon-circle" style={{ color: "var(--status-danger)", borderColor: "rgba(184, 120, 120, 0.3)" }}>
        <AlertOctagon size={20} />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-desc">{message}</p>
      {onRetry && (
        <button type="button" className="state-btn" onClick={onRetry}>
          <RotateCw size={13} style={{ marginRight: 6, display: "inline" }} />
          Retry Connection
        </button>
      )}
    </div>
  );
}
