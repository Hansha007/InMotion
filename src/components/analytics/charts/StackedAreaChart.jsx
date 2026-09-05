import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function CustomAreaTooltip({ active, payload, label, unit = "" }) {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-custom-tooltip">
        <div className="tooltip-header">{label}</div>
        {payload.map((entry, index) => (
          <div key={`area-${index}`} className="tooltip-row">
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

export default function StackedAreaChart({
  data = [],
  xKey = "timestamp",
  areas = [
    { dataKey: "delivered", name: "Delivered", color: "#9BEF35" },
    { dataKey: "inTransit", name: "In Transit", color: "#7FA8C9" },
    { dataKey: "delayed", name: "Delayed", color: "#C97979" }
  ],
  unit = "",
  height = 260
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
        >
          <defs>
            {areas.map((area) => (
              <linearGradient
                key={`grad-${area.dataKey}`}
                id={`grad-${area.dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={area.color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={area.color} stopOpacity={0.01} />
              </linearGradient>
            ))}
          </defs>
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
          <Tooltip content={<CustomAreaTooltip unit={unit} />} />
          {areas.map((area) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name || area.dataKey}
              stroke={area.color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#grad-${area.dataKey})`}
              stackId="1"
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
