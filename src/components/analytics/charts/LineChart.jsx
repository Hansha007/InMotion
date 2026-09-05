import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function CustomLineTooltip({ active, payload, label, unit = "" }) {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-custom-tooltip">
        <div className="tooltip-header">{label}</div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="tooltip-row">
            <div className="tooltip-label-group">
              <span
                className="tooltip-color-dot"
                style={{ backgroundColor: entry.color || entry.stroke }}
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

export default function LineChart({
  data = [],
  xKey = "timestamp",
  dataKey = "value",
  lines = null,
  unit = "",
  height = 260,
  strokeColor = "#9BEF35"
}) {
  const lineConfigs = lines || [
    { dataKey, name: dataKey, color: strokeColor }
  ];

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#20252C"
            strokeDasharray="2 2"
            vertical={false}
          />
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
          <Tooltip content={<CustomLineTooltip unit={unit} />} />
          {lineConfigs.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color || strokeColor}
              strokeWidth={2.2}
              dot={{ r: 2.5, fill: line.color || strokeColor, strokeWidth: 0 }}
              activeDot={{
                r: 5,
                fill: line.color || strokeColor,
                stroke: "#171B21",
                strokeWidth: 2
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
