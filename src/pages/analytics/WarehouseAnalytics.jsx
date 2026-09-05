import {
  Building2,
  PieChart,
  AlertOctagon,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { useAnalytics } from "../../components/analytics/AnalyticsContext";
import AnalyticsKpiCard from "../../components/analytics/AnalyticsKpiCard";
import AnalyticsLoading from "../../components/analytics/AnalyticsLoading";
import AnalyticsEmptyState from "../../components/analytics/AnalyticsEmptyState";
import LineChart from "../../components/analytics/charts/LineChart";
import BarChart from "../../components/analytics/charts/BarChart";
import StackedAreaChart from "../../components/analytics/charts/StackedAreaChart";

export default function WarehouseAnalytics() {
  const { data, isLoading, setTimeRange } = useAnalytics();

  if (isLoading) {
    return <AnalyticsLoading kpiCount={6} chartCount={4} />;
  }

  if (!data) {
    return <AnalyticsEmptyState onReset={() => setTimeRange("7days")} />;
  }

  const { kpis, series, tables } = data;

  const warehouseUtilizationData = tables.warehouses.map((w) => ({
    hub: w.name.split(" ")[0],
    utilization: w.utilization
  }));

  const warehouseEfficiencyData = tables.warehouses.map((w) => ({
    hub: w.name.split(" ")[0],
    efficiency: w.efficiency
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
      {/* 6 Warehouse KPI Cards */}
      <section aria-label="Warehouse KPIs">
        <div className="kpi-grid cols-6">
          <AnalyticsKpiCard
            title="TOTAL WAREHOUSES"
            value={kpis.totalWarehouses}
            description="Active regional fulfillment hubs"
            icon={Building2}
          />
          <AnalyticsKpiCard
            title="CAPACITY UTILIZATION"
            value={kpis.warehouseUtilization}
            change="+1.1%"
            trend="up"
            description="Average network fill rate"
            icon={PieChart}
          />
          <AnalyticsKpiCard
            title="CRITICAL HUBS (>90%)"
            value={kpis.criticalWarehouses}
            change="0"
            trend="neutral"
            description="Delhi Central (92% full)"
            icon={AlertOctagon}
          />
          <AnalyticsKpiCard
            title="INCOMING SHIPMENTS"
            value={kpis.incomingShipments.toLocaleString()}
            change="+8.4%"
            trend="up"
            description="Inbound reception volume"
            icon={ArrowDownLeft}
          />
          <AnalyticsKpiCard
            title="OUTGOING SHIPMENTS"
            value={kpis.outgoingShipments.toLocaleString()}
            change="+6.2%"
            trend="up"
            description="Consignments dispatched"
            icon={ArrowUpRight}
          />
          <AnalyticsKpiCard
            title="WAREHOUSE EFFICIENCY"
            value={kpis.avgWarehouseEfficiency}
            change="+1.5%"
            trend="up"
            description="Dock turn & putaway SLA"
            icon={ShieldCheck}
          />
        </div>
      </section>

      {/* Row 1: Capacity Utilization & Inventory Trend */}
      <div className="charts-grid-2col">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Warehouse Capacity Utilization</h2>
              <p className="chart-card-subtitle">
                Occupied storage percentage by regional facility
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Occupancy %</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <BarChart
              data={warehouseUtilizationData}
              xKey="hub"
              dataKey="utilization"
              unit="%"
              barColor="#9BEF35"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Network Inventory Accumulation</h2>
              <p className="chart-card-subtitle">
                Total pallet storage trend over time
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Pallets</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <LineChart
              data={series.warehouseInventory}
              xKey="timestamp"
              lines={[
                { dataKey: "inventory", name: "Occupied Pallets", color: "#9BEF35" },
                { dataKey: "capacity", name: "Max Capacity", color: "#353E4A" }
              ]}
              unit=" pallets"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Dock Throughput & Warehouse Efficiency */}
      <div className="charts-grid-2col">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Dock Throughput (Inbound vs Outbound)</h2>
              <p className="chart-card-subtitle">
                Flow balance across regional cross-docks
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Throughput Units</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <StackedAreaChart
              data={series.warehouseFlow}
              xKey="timestamp"
              areas={[
                { dataKey: "incoming", name: "Inbound Received", color: "#7FA8C9" },
                { dataKey: "outgoing", name: "Outbound Dispatched", color: "#9BEF35" }
              ]}
              unit=" units"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Warehouse Operational Efficiency</h2>
              <p className="chart-card-subtitle">
                Fulfillment and staging speed score
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Efficiency Index</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <BarChart
              data={warehouseEfficiencyData}
              xKey="hub"
              dataKey="efficiency"
              unit="%"
              barColor="#9BEF35"
            />
          </div>
        </div>
      </div>

      {/* Regional Facilities Status Table */}
      <div className="data-table-card">
        <div className="chart-card-header">
          <div className="chart-card-title-group">
            <h2 className="chart-card-title">Regional Fulfillment Hubs Status</h2>
            <p className="chart-card-subtitle">
              Live capacity telemetry feeding network allocation algorithms
            </p>
          </div>
          <span className="chart-badge">{tables.warehouses.length} Active Hubs</span>
        </div>

        <div className="table-responsive-wrap">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Hub ID</th>
                <th>Facility Name</th>
                <th>Total Capacity</th>
                <th>Current Stock</th>
                <th>Utilization</th>
                <th>Inbound / hr</th>
                <th>Outbound / hr</th>
                <th>Efficiency</th>
                <th>Alert Status</th>
              </tr>
            </thead>
            <tbody>
              {tables.warehouses.map((node) => (
                <tr key={node.warehouseId}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                    {node.warehouseId}
                  </td>
                  <td style={{ fontWeight: 500 }}>{node.name}</td>
                  <td>{node.capacity.toLocaleString()}</td>
                  <td>{node.inventory.toLocaleString()}</td>
                  <td style={{ fontWeight: 600 }}>{node.utilization}%</td>
                  <td>+{node.incoming}</td>
                  <td>-{node.outgoing}</td>
                  <td style={{ color: "var(--accent)" }}>{node.efficiency}%</td>
                  <td>
                    <span
                      className={`status-badge ${
                        node.status === "Good"
                          ? "good"
                          : node.status === "Warning"
                          ? "warning"
                          : "critical"
                      }`}
                    >
                      {node.status}
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
