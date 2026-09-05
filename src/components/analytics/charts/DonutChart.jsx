import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

function CustomDonutTooltip({ active, payload, unit = "" }) {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div className="recharts-custom-tooltip">
        <div className="tooltip-row">
          <div className="tooltip-label-group">
            <span
              className="tooltip-color-dot"
              style={{ backgroundColor: entry.payload.color || entry.fill }}
            />
            <span>{entry.name}:</span>
          </div>
          <span className="tooltip-value">
            {entry.value}
            {unit}
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export default function DonutChart({
  data = [],
  height = 260,
  innerRadius = 58,
  outerRadius = 82,
  unit = "",
  centerValue = null,
  centerLabel = null,
  showLegend = true
}) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  // Auto determine center display if not passed
  const primaryItem = data[0];
  const displayVal = centerValue || (primaryItem && total > 0 ? `${((primaryItem.value / total) * 100).toFixed(1)}%` : "");
  const displayLbl = centerLabel || (primaryItem ? primaryItem.name : "");

  return (
    <div
      style={{
        width: "100%",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px"
      }}
    >
      <div style={{ width: height, height, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Tooltip content={<CustomDonutTooltip unit={unit} />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={3}
              dataKey="value"
              stroke="#171B21"
              strokeWidth={2.5}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || (index === 0 ? "#9BEF35" : "#2B3138")}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* Central Metric Readout */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--text-primary)",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}
          >
            {displayVal}
          </span>
          <span
            style={{
              fontSize: "10.5px",
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontWeight: 500,
              marginTop: "2px"
            }}
          >
            {displayLbl}
          </span>
        </div>
      </div>

      {showLegend && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "9px",
            minWidth: "140px"
          }}
        >
          {data.map((item, idx) => {
            const pct = total > 0 ? ((item.value / total) * 100).toFixed(0) : 0;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  fontSize: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: item.color || "#2B3138"
                    }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>
                    {item.name}
                  </span>
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-mono)"
                  }}
                >
                  {item.value}
                  {unit || ` (${pct}%)`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
