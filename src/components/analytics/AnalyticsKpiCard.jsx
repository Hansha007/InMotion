import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function AnalyticsKpiCard({
  title,
  value,
  change,
  trend = "up", // "up" | "down" | "neutral"
  description = "Compared with previous period",
  icon: IconComponent,
  onClick
}) {
  const isClickable = Boolean(onClick);

  return (
    <div
      className="analytics-kpi-card"
      onClick={onClick}
      style={{ cursor: isClickable ? "pointer" : "default" }}
      role={isClickable ? "button" : "region"}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className="kpi-top-row">
        <span className="kpi-title">{title}</span>
        {IconComponent && (
          <div className="kpi-icon-box">
            <IconComponent size={15} />
          </div>
        )}
      </div>

      <div className="kpi-center-row">
        <span className="kpi-value">{value}</span>
        {change && (
          <span className={`kpi-trend-pill ${trend}`}>
            {trend === "up" && <TrendingUp size={12} />}
            {trend === "down" && <TrendingDown size={12} />}
            {trend === "neutral" && <Minus size={12} />}
            <span>{change}</span>
          </span>
        )}
      </div>

      {description && <div className="kpi-desc">{description}</div>}
    </div>
  );
}
