import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function CustomBarTooltip({ active, payload, label, unit = "" }) {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-custom-tooltip">
        <div className="tooltip-header">{label}</div>
        {payload.map((entry, index) => (
          <div key={`bar-${index}`} className="tooltip-row">
            <div className="tooltip-label-group">
              <span
                className="tooltip-color-dot"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span>{entry.name || entry.dataKey}:</span>
            </div>
            <span className="tooltip-value">
              {entry.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function BarChart({
  data = [],
  xKey = "name",
  dataKey = "value",
  bars = null,
  unit = "",
  height = 260,
  barColor = "#9BEF35",
  layout = "horizontal"
}) {
  const barConfigs = bars || [{ dataKey, name: dataKey, color: barColor }];

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{ top: 12, right: 12, left: layout === "vertical" ? 10 : -20, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#20252C"
            strokeDasharray="2 2"
            horizontal={true}
            vertical={false}
          />
          {layout === "horizontal" ? (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fill: "#70767E", fontSize: 11 }}
                axisLine={{ stroke: "#2B3138" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#70767E", fontSize: 11 }}
                axisLine={{ stroke: "#2B3138" }}
                tickLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tick={{ fill: "#70767E", fontSize: 11 }}
                axisLine={{ stroke: "#2B3138" }}
                tickLine={false}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                tick={{ fill: "#70767E", fontSize: 11 }}
                axisLine={{ stroke: "#2B3138" }}
                tickLine={false}
                width={85}
              />
            </>
          )}
          <Tooltip content={<CustomBarTooltip unit={unit} />} />
          {barConfigs.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name || bar.dataKey}
              fill={bar.color || barColor}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
