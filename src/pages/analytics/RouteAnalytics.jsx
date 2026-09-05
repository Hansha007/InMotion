import {
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  Flame,
  ArrowRight
} from "lucide-react";
import { useAnalytics } from "../../components/analytics/AnalyticsContext";
import AnalyticsKpiCard from "../../components/analytics/AnalyticsKpiCard";
import AnalyticsLoading from "../../components/analytics/AnalyticsLoading";
import AnalyticsEmptyState from "../../components/analytics/AnalyticsEmptyState";
import LineChart from "../../components/analytics/charts/LineChart";
import BarChart from "../../components/analytics/charts/BarChart";

export default function RouteAnalytics() {
  const { data, isLoading, setTimeRange } = useAnalytics();

  if (isLoading) {
    return <AnalyticsLoading kpiCount={6} chartCount={4} />;
  }

  if (!data) {
    return <AnalyticsEmptyState onReset={() => setTimeRange("7days")} />;
  }

  const { kpis, series, tables } = data;

  const fastestRoutes = [...tables.routes]
    .sort((a, b) => a.averageDelay - b.averageDelay)
    .slice(0, 4)
    .map((r) => ({
      corridor: `${r.origin.split(" ")[0]} ↔ ${r.destination.split(" ")[0]}`,
      delay: r.averageDelay
    }));

  const problematicRoutes = [...tables.routes]
    .sort((a, b) => b.averageDelay - a.averageDelay)
    .slice(0, 4)
    .map((r) => ({
      corridor: `${r.origin.split(" ")[0]} ↔ ${r.destination.split(" ")[0]}`,
      delay: r.averageDelay
    }));

  const routePerformanceData = tables.routes.map((r) => ({
    route: r.routeId,
    onTimeRate: r.onTimeRate
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
      {/* 6 Route KPI Cards */}
      <section aria-label="Route KPIs">
        <div className="kpi-grid cols-6">
          <AnalyticsKpiCard
            title="ACTIVE ROUTES"
            value={kpis.activeRoutes}
            description="Monitored arterial corridors"
            icon={Navigation}
          />
          <AnalyticsKpiCard
            title="AVERAGE DELAY"
            value={kpis.avgRouteDelay}
            change="-4m"
            trend="up"
            description="Network-wide transit lag"
            icon={Clock}
          />
          <AnalyticsKpiCard
            title="FASTEST ROUTE"
            value="Indore ↔ Bhopal"
            description="11m delay • 97.4% on-time"
            icon={Zap}
          />
          <AnalyticsKpiCard
            title="PROBLEMATIC ROUTES"
            value="Kolkata ↔ Patna"
            description="68m delay • Monsoon hold"
            icon={Flame}
          />
          <AnalyticsKpiCard
            title="HEALTHY CORRIDORS"
            value={kpis.healthyRoutes}
            change="+1"
            trend="up"
            description="Operating within SLA"
            icon={CheckCircle2}
          />
          <AnalyticsKpiCard
            title="DELAYED CORRIDORS"
            value={kpis.delayedRoutes}
            change="-1"
            trend="up"
            description="Experiencing transit bottleneck"
            icon={AlertTriangle}
          />
        </div>
      </section>

      {/* Row 1: Corridor Performance & Average Delay Trend */}
      <div className="charts-grid-2col">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Corridor On-Time Performance</h2>
              <p className="chart-card-subtitle">
                On-time delivery SLA compliance by route
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">SLA %</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <BarChart
              data={routePerformanceData}
              xKey="route"
              dataKey="onTimeRate"
              unit="%"
              barColor="#9BEF35"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Average Route Delay Trend</h2>
              <p className="chart-card-subtitle">
                Transit lag minutes across active network
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Minutes</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <LineChart
              data={series.routeDelayTrend}
              xKey="timestamp"
              dataKey="delayMinutes"
              unit="m"
              strokeColor="#C97979"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Fastest Corridors vs Most Problematic Corridors */}
      <div className="charts-grid-2col">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Top Fastest Transit Corridors</h2>
              <p className="chart-card-subtitle">
                Routes maintaining lowest transit delay
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Lowest Delay</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <BarChart
              data={fastestRoutes}
              xKey="corridor"
              dataKey="delay"
              unit="m"
              barColor="#9BEF35"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Most Problematic Corridors</h2>
              <p className="chart-card-subtitle">
                Bottlenecks requiring dispatch re-routing
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Highest Delay</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <BarChart
              data={problematicRoutes}
              xKey="corridor"
              dataKey="delay"
              unit="m"
              barColor="#C97979"
            />
          </div>
        </div>
      </div>

      {/* Corridor Table */}
      <div className="data-table-card">
        <div className="chart-card-header">
          <div className="chart-card-title-group">
            <h2 className="chart-card-title">Logistics Corridor Registry</h2>
            <p className="chart-card-subtitle">
              Live highway telemetry and congestion indicators
            </p>
          </div>
          <span className="chart-badge">{tables.routes.length} Corridors</span>
        </div>

        <div className="table-responsive-wrap">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Route ID</th>
                <th>Corridor Path</th>
                <th>Distance</th>
                <th>Transit Speed</th>
                <th>Avg Delay</th>
                <th>On-Time Rate</th>
                <th>Active Trucks</th>
                <th>Health Status</th>
              </tr>
            </thead>
            <tbody>
              {tables.routes.map((route) => (
                <tr key={route.routeId}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                    {route.routeId}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span>{route.origin}</span>
                      <ArrowRight size={13} color="var(--text-muted)" />
                      <span>{route.destination}</span>
                    </div>
                  </td>
                  <td>{route.distance} km</td>
                  <td>{route.speedKmH} km/h</td>
                  <td style={{ fontFamily: "var(--font-mono)" }}>
                    {route.averageDelay} min
                  </td>
                  <td style={{ fontWeight: 600 }}>{route.onTimeRate}%</td>
                  <td>{route.activeTrucks}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        route.health === "Good"
                          ? "good"
                          : route.health === "Fair"
                          ? "warning"
                          : "critical"
                      }`}
                    >
                      {route.health}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
