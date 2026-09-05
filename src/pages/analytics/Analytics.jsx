import {
  Activity,
  CheckCircle,
  Clock,
  Truck,
  Navigation,
  Building2,
  AlertTriangle,
  AlertOctagon,
  Sparkles
} from "lucide-react";
import { useAnalytics } from "../../components/analytics/AnalyticsContext";
import AnalyticsKpiCard from "../../components/analytics/AnalyticsKpiCard";
import AnalyticsLoading from "../../components/analytics/AnalyticsLoading";
import AnalyticsEmptyState from "../../components/analytics/AnalyticsEmptyState";
import LineChart from "../../components/analytics/charts/LineChart";
import BarChart from "../../components/analytics/charts/BarChart";
import DonutChart from "../../components/analytics/charts/DonutChart";
import StackedAreaChart from "../../components/analytics/charts/StackedAreaChart";

export default function Analytics() {
  const { data, isLoading, setTimeRange } = useAnalytics();

  if (isLoading) {
    return <AnalyticsLoading kpiCount={8} chartCount={4} />;
  }

  if (!data) {
    return <AnalyticsEmptyState onReset={() => setTimeRange("7days")} />;
  }

  const { kpis, series, distributions, categoryPerformance } = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
      {/* 8 Primary KPI Cards with Uppercase Tracking & Lime-Green Accents */}
      <section aria-label="Executive Overview KPIs">
        <div className="kpi-grid">
          <AnalyticsKpiCard
            title="NETWORK HEALTH"
            value={kpis.networkHealth}
            change="+1.8%"
            trend="up"
            description="Compared with previous period"
            icon={Activity}
          />
          <AnalyticsKpiCard
            title="ON-TIME DELIVERY"
            value={kpis.onTimeDelivery}
            change="+3.2%"
            trend="up"
            description="Target threshold ≥ 95.0%"
            icon={CheckCircle}
          />
          <AnalyticsKpiCard
            title="AVG DELIVERY TIME"
            value={kpis.avgDeliveryTime}
            change="-14m"
            trend="up"
            description="Across all regional routes"
            icon={Clock}
          />
          <AnalyticsKpiCard
            title="FLEET UTILIZATION"
            value={kpis.fleetUtilization}
            change="+4.1%"
            trend="up"
            description="Active linehaul capacity"
            icon={Truck}
          />
          <AnalyticsKpiCard
            title="ROUTE HEALTH"
            value={kpis.routeHealth}
            change="+2.8%"
            trend="up"
            description="Corridors operating clear"
            icon={Navigation}
          />
          <AnalyticsKpiCard
            title="WAREHOUSE UTILIZATION"
            value={kpis.warehouseUtilization}
            change="+1.1%"
            trend="up"
            description="Consolidated network fill rate"
            icon={Building2}
          />
          <AnalyticsKpiCard
            title="DELAYED SHIPMENTS"
            value={kpis.delayedShipments}
            change="-8.7%"
            trend="up"
            description="Active delayed consignments"
            icon={AlertTriangle}
          />
          <AnalyticsKpiCard
            title="CRITICAL INCIDENTS"
            value={kpis.criticalIncidents}
            change="-1"
            trend="up"
            description="Maintenance & alert triggers"
            icon={AlertOctagon}
          />
        </div>
      </section>

      {/* Row 1: Delivery Performance (Line Chart) & Delivery Status (Donut Chart) */}
      <div className="charts-grid-2-1">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Delivery Performance</h2>
              <p className="chart-card-subtitle">
                On-time completed consignments over selected interval
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Volume / Interval</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <LineChart
              data={series.deliveryTrend}
              xKey="timestamp"
              dataKey="onTime"
              unit=" units"
              strokeColor="#9BEF35"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Delivery Status</h2>
              <p className="chart-card-subtitle">
                On-time compliance ratio
              </p>
            </div>
          </div>
          <div className="chart-content-wrap" style={{ display: "flex", alignItems: "center" }}>
            <DonutChart
              data={distributions.delivery}
              unit=" units"
              centerValue={kpis.onTimeDelivery}
              centerLabel="On-Time"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Performance by Operational Category & Network Composition */}
      <div className="charts-grid-2col">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Performance by Operational Category</h2>
              <p className="chart-card-subtitle">
                Core domain efficiency versus enterprise targets
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">SLA Score %</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <BarChart
              data={categoryPerformance}
              xKey="category"
              bars={[
                { dataKey: "score", name: "Current Score", color: "#9BEF35" },
                { dataKey: "target", name: "Target Goal", color: "#242A31" }
              ]}
              unit="%"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Network Operational Flow Over Time</h2>
              <p className="chart-card-subtitle">
                Delivered throughput vs in-transit and delayed cargo
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Real-time telemetry</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <StackedAreaChart
              data={series.deliveryStatus}
              xKey="timestamp"
              areas={[
                { dataKey: "delivered", name: "Delivered", color: "#9BEF35" },
                { dataKey: "inTransit", name: "In Transit", color: "#7FA8C9" },
                { dataKey: "delayed", name: "Delayed", color: "#C97979" }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Intelligence Signal Strip */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-card)",
          padding: "16px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Sparkles size={16} color="var(--accent)" />
          <span style={{ fontSize: "13.5px", color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Intelligence Signal:</strong>{" "}
            Network on-time fulfillment is running <span style={{ color: "var(--accent)", fontWeight: 600 }}>+3.2%</span> ahead of target. High utilization detected at Delhi Central Hub (92%).
          </span>
        </div>
        <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          AUTO-SYNCED: LIVE
        </span>
      </div>
    </div>
  );
}
