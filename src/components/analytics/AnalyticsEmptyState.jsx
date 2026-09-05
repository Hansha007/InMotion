import { AlertCircle, RotateCcw } from "lucide-react";

export default function AnalyticsEmptyState({
  title = "No analytics data available",
  description = "No telemetry signals were detected for the selected filter criteria.",
  onReset
}) {
  return (
    <div className="analytics-state-card">
      <div className="state-icon-circle">
        <AlertCircle size={20} />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-desc">{description}</p>
      {onReset && (
        <button type="button" className="state-btn" onClick={onReset}>
          <RotateCcw size={13} style={{ marginRight: 6, display: "inline" }} />
          Reset Filter Window
        </button>
      )}
    </div>
  );
}
