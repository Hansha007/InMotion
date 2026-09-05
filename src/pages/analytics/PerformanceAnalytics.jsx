import {
  Activity,
  CheckCircle2,
  Truck,
  Building2,
  AlertTriangle,
  Flame,
  Cpu
} from "lucide-react";
import { useAnalytics } from "../../components/analytics/AnalyticsContext";
import AnalyticsKpiCard from "../../components/analytics/AnalyticsKpiCard";
import AnalyticsLoading from "../../components/analytics/AnalyticsLoading";
import AnalyticsEmptyState from "../../components/analytics/AnalyticsEmptyState";
import LineChart from "../../components/analytics/charts/LineChart";
import BarChart from "../../components/analytics/charts/BarChart";
import DonutChart from "../../components/analytics/charts/DonutChart";
import StackedAreaChart from "../../components/analytics/charts/StackedAreaChart";

export default function PerformanceAnalytics() {
  const { data, isLoading, setTimeRange } = useAnalytics();

  if (isLoading) {
    return <AnalyticsLoading kpiCount={6} chartCount={4} />;
  }

  if (!data) {
    return <AnalyticsEmptyState onReset={() => setTimeRange("7days")} />;
  }

  const { kpis, series, distributions, categoryPerformance } = data;

  const multiDomainPerformance = series.performanceTrend.map((item) => ({
    timestamp: item.timestamp,
    Delivery: item.delivery || 94,
    Warehouse: item.warehouse || 88,
    Fleet: item.fleet || 84
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Executive Storytelling Stepper */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-card)",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Cpu size={18} color="var(--accent)" />
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
              Executive Network Health Briefing
            </h2>
          </div>
          <span className="telemetry-badge">
            <span className="telemetry-dot" />
            PEAK OPERATIONAL RESILIENCE
          </span>
        </div>

        {/* Narrative Flow Stepper */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "12px",
            marginTop: "4px"
          }}
        >
          <div className="story-header">
            <span className="story-step-num">01</span>
            <div>
              <div className="story-step-title">Network</div>
              <div style={{ fontSize: "11.5px", color: "var(--accent)", fontWeight: 600 }}>
                {kpis.networkHealth} Score
              </div>
            </div>
          </div>

          <div className="story-header">
            <span className="story-step-num">02</span>
            <div>
              <div className="story-step-title">Delivery</div>
              <div style={{ fontSize: "11.5px", color: "var(--text-secondary)" }}>
                {kpis.onTimeDelivery} SLA
              </div>
            </div>
          </div>

          <div className="story-header">
            <span className="story-step-num">03</span>
            <div>
              <div className="story-step-title">Fleet</div>
              <div style={{ fontSize: "11.5px", color: "var(--text-secondary)" }}>
                {kpis.fleetUtilization} Active
              </div>
            </div>
          </div>

          <div className="story-header">
            <span className="story-step-num">04</span>
            <div>
              <div className="story-step-title">Routes</div>
              <div style={{ fontSize: "11.5px", color: "var(--text-secondary)" }}>
                {kpis.avgRouteDelay} Lag
              </div>
            </div>
          </div>

          <div className="story-header">
            <span className="story-step-num">05</span>
            <div>
              <div className="story-step-title">Warehouses</div>
              <div style={{ fontSize: "11.5px", color: "var(--text-secondary)" }}>
                {kpis.avgWarehouseEfficiency} Output
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Executive KPI Cards */}
      <section aria-label="Executive Performance KPIs">
        <div className="kpi-grid cols-6">
          <AnalyticsKpiCard
            title="NETWORK HEALTH"
            value={kpis.networkHealth}
            change="+1.8%"
            trend="up"
            description="Weighted composite index"
            icon={Activity}
          />
          <AnalyticsKpiCard
            title="ON-TIME DELIVERY SLA"
            value={kpis.onTimeDelivery}
            change="+3.2%"
            trend="up"
            description="Across all arterial corridors"
            icon={CheckCircle2}
          />
          <AnalyticsKpiCard
            title="FLEET UTILIZATION"
            value={kpis.fleetUtilization}
            change="+4.1%"
            trend="up"
            description="Active revenue cargo capacity"
            icon={Truck}
          />
          <AnalyticsKpiCard
            title="WAREHOUSE UTILIZATION"
            value={kpis.warehouseUtilization}
            change="+1.1%"
            trend="up"
            description="Consolidated storage capacity"
            icon={Building2}
          />
          <AnalyticsKpiCard
            title="DELAYED SHIPMENTS"
            value={kpis.delayedShipments}
            change="-8.7%"
            trend="up"
            description="Active transit exceptions"
            icon={AlertTriangle}
          />
          <AnalyticsKpiCard
            title="CRITICAL INCIDENTS"
            value={kpis.criticalIncidents}
            change="-1"
            trend="up"
            description="Severe network interventions"
            icon={Flame}
          />
        </div>
      </section>

      {/* Row 1: Overall Performance Trend & Performance by Category */}
      <div className="charts-grid-2col">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Overall Performance Trend</h2>
              <p className="chart-card-subtitle">
                Unified operational efficiency score progression
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">SLA Composite</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <LineChart
              data={series.performanceTrend}
              xKey="timestamp"
              dataKey="score"
              unit="%"
              strokeColor="#9BEF35"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Performance by Operational Category</h2>
              <p className="chart-card-subtitle">
                Current performance benchmarked against enterprise goals
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Domain Target</span>
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
      </div>

      {/* Row 2: Network Health Distribution & Multi-Domain Composition */}
      <div className="charts-grid-1-2">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Network Health</h2>
              <p className="chart-card-subtitle">
                Real-time operational condition
              </p>
            </div>
          </div>
          <div className="chart-content-wrap" style={{ display: "flex", alignItems: "center" }}>
            <DonutChart
              data={distributions.network}
              unit="%"
              centerValue={kpis.networkHealth}
              centerLabel="Health Score"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Performance Composition Over Time</h2>
              <p className="chart-card-subtitle">
                Delivery vs Warehouse vs Fleet synchronized output
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Layered SLAs</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <StackedAreaChart
              data={multiDomainPerformance}
              xKey="timestamp"
              areas={[
                { dataKey: "Delivery", name: "Delivery SLA", color: "#9BEF35" },
                { dataKey: "Warehouse", name: "Warehouse Output", color: "#7FA8C9" },
                { dataKey: "Fleet", name: "Fleet Utilization", color: "#D6B76A" }
              ]}
              unit="%"
            />
          </div>
        </div>
      </div>

      {/* Executive Strategic Recommendations */}
      <div className="data-table-card">
        <div className="chart-card-header">
          <div className="chart-card-title-group">
            <h2 className="chart-card-title">Executive Intelligence & Action Matrix</h2>
            <p className="chart-card-subtitle">
              Prioritized algorithmic interventions recommended by IN MOTION AI engine
            </p>
          </div>
          <span className="chart-badge">3 Recommended Actions</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 18px",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-btn)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span className="status-badge critical">Priority 1</span>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                  Corridor Re-routing: Kolkata ↔ Patna Bottleneck
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  Heavy congestion causing 68m average transit lag. Re-dispatch via NH-31 express bypass.
                </div>
              </div>
            </div>
            <span style={{ fontSize: "12px", color: "var(--status-danger)", fontWeight: 600 }}>
              +42m Recovery Potential
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 18px",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-btn)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span className="status-badge warning">Priority 2</span>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                  Capacity Overflow Warning: Delhi Central Hub (92% Fill)
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  Inbound volume exceeds dock turn capacity by 14%. Divert incoming North consignments to Jaipur.
                </div>
              </div>
            </div>
            <span style={{ fontSize: "12px", color: "var(--status-warning)", fontWeight: 600 }}>
              Prevent Dock Gridlock
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 18px",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-btn)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span className="status-badge good">Priority 3</span>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                  Fleet Repositioning: Standby Trucks VH-105 & VH-110
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  Idle assets in Depot 1 & 2 can be dispatched to Mumbai Gateway to capture evening outbound peak.
                </div>
              </div>
            </div>
            <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>
              +6.4% Fleet Utilization
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
