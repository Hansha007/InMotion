export default function AnalyticsLoading({ kpiCount = 4, chartCount = 2 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      {/* KPI Skeletons */}
      <div className={`kpi-grid cols-${kpiCount > 4 ? 4 : kpiCount}`}>
        {Array.from({ length: kpiCount }).map((_, i) => (
          <div key={i} className="skeleton skeleton-kpi" />
        ))}
      </div>

      {/* Chart Skeletons */}
      <div className="charts-grid-2col">
        {Array.from({ length: chartCount }).map((_, i) => (
          <div key={i} className="skeleton skeleton-chart" />
        ))}
      </div>
    </div>
  );
}
