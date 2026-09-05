import {
  PackageCheck,
  Clock,
  AlertTriangle,
  Target,
  Send
} from "lucide-react";
import { useAnalytics } from "../../components/analytics/AnalyticsContext";
import AnalyticsKpiCard from "../../components/analytics/AnalyticsKpiCard";
import AnalyticsLoading from "../../components/analytics/AnalyticsLoading";
import AnalyticsEmptyState from "../../components/analytics/AnalyticsEmptyState";
import LineChart from "../../components/analytics/charts/LineChart";
import BarChart from "../../components/analytics/charts/BarChart";
import DonutChart from "../../components/analytics/charts/DonutChart";
import StackedAreaChart from "../../components/analytics/charts/StackedAreaChart";

export default function DeliveryAnalytics() {
  const { data, isLoading, setTimeRange } = useAnalytics();

  if (isLoading) {
    return <AnalyticsLoading kpiCount={5} chartCount={4} />;
  }

  if (!data) {
    return <AnalyticsEmptyState onReset={() => setTimeRange("7days")} />;
  }

  const { kpis, series, distributions, tables } = data;

  const regionalDeliveryTimes = [
    { region: "North Hub", avgHours: 4.6 },
    { region: "West Gateway", avgHours: 3.8 },
    { region: "South Depot", avgHours: 5.4 },
    { region: "East River", avgHours: 6.9 },
    { region: "Central Hubs", avgHours: 4.1 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
      {/* 5 Delivery KPI Cards */}
      <section aria-label="Delivery KPIs">
        <div className="kpi-grid cols-5">
          <AnalyticsKpiCard
            title="TOTAL DELIVERIES"
            value={kpis.totalDeliveries.toLocaleString()}
            change="+8.2%"
            trend="up"
            description="Compared with previous period"
            icon={PackageCheck}
          />
          <AnalyticsKpiCard
            title="ON-TIME %"
            value={kpis.onTimeDelivery}
            change="+3.2%"
            trend="up"
            description="Dispatches on schedule"
            icon={Send}
          />
          <AnalyticsKpiCard
            title="DELAYED %"
            value={kpis.delayedRate}
            change="-1.8%"
            trend="up"
            description="Exceptions flagged"
            icon={AlertTriangle}
          />
          <AnalyticsKpiCard
            title="AVG DELIVERY TIME"
            value={kpis.avgDeliveryTime}
            change="-14m"
            trend="up"
            description="Order dispatch to drop-off"
            icon={Clock}
          />
          <AnalyticsKpiCard
            title="ETA ACCURACY"
            value={kpis.etaAccuracy}
            change="+2.4%"
            trend="up"
            description="Predicted vs actual arrival"
            icon={Target}
          />
        </div>
      </section>

      {/* Row 1: Delivery Trend & On-Time vs Delayed Donut */}
      <div className="charts-grid-2-1">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Delivery Trend Over Time</h2>
              <p className="chart-card-subtitle">
                Volume completed vs on-time dispatches
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Volume / Window</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <LineChart
              data={series.deliveryTrend}
              xKey="timestamp"
              lines={[
                { dataKey: "delivered", name: "Total Delivered", color: "#A4A9B0" },
                { dataKey: "onTime", name: "On-Time", color: "#9BEF35" },
                { dataKey: "delayed", name: "Delayed", color: "#C97979" }
              ]}
              unit=" units"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">On-Time vs Delayed</h2>
              <p className="chart-card-subtitle">
                SLA fulfillment ratio
              </p>
            </div>
          </div>
          <div className="chart-content-wrap" style={{ display: "flex", alignItems: "center" }}>
            <DonutChart
              data={distributions.delivery}
              unit=" shipments"
              centerValue={kpis.onTimeDelivery}
              centerLabel="On-Time"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Average Delivery Time by Region & Delivery Status Over Time */}
      <div className="charts-grid-2col">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Average Delivery Time by Region</h2>
              <p className="chart-card-subtitle">
                Hours spent from warehouse gate to customer dock
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Hours</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <BarChart
              data={regionalDeliveryTimes}
              xKey="region"
              dataKey="avgHours"
              unit="h"
              barColor="#9BEF35"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Delivery Status Over Time</h2>
              <p className="chart-card-subtitle">
                Accumulated consignment volume in pipeline
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Cumulative</span>
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

      {/* Monitored Consignments Table */}
      <div className="data-table-card">
        <div className="chart-card-header">
          <div className="chart-card-title-group">
            <h2 className="chart-card-title">Monitored Consignments</h2>
            <p className="chart-card-subtitle">
              Live consignment telemetry contributing to active delivery metrics
            </p>
          </div>
          <span className="chart-badge">{tables.shipments.length} Active</span>
        </div>

        <div className="table-responsive-wrap">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Consignment</th>
                <th>Tracking Code</th>
                <th>Origin Hub</th>
                <th>Destination</th>
                <th>Elapsed Time</th>
                <th>ETA Precision</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tables.shipments.slice(0, 7).map((shipment) => (
                <tr key={shipment.id}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                    {shipment.id}
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>
                    {shipment.tracking}
                  </td>
                  <td>{shipment.origin}</td>
                  <td>{shipment.destination}</td>
                  <td>{shipment.deliveryHours}h</td>
                  <td>{shipment.etaAccuracy}%</td>
                  <td>
                    <span
                      className={`status-badge ${
                        shipment.onTime ? "good" : "delayed"
                      }`}
                    >
                      {shipment.status}
                      {shipment.delayMinutes > 0 && ` (+${shipment.delayMinutes}m)`}
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
