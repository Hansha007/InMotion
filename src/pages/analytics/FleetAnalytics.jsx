import {
  Truck,
  CheckCircle2,
  PauseCircle,
  Wrench,
  Fuel,
  Percent
} from "lucide-react";
import { useAnalytics } from "../../components/analytics/AnalyticsContext";
import AnalyticsKpiCard from "../../components/analytics/AnalyticsKpiCard";
import AnalyticsLoading from "../../components/analytics/AnalyticsLoading";
import AnalyticsEmptyState from "../../components/analytics/AnalyticsEmptyState";
import LineChart from "../../components/analytics/charts/LineChart";
import BarChart from "../../components/analytics/charts/BarChart";
import DonutChart from "../../components/analytics/charts/DonutChart";

export default function FleetAnalytics() {
  const { data, isLoading, setTimeRange } = useAnalytics();

  if (isLoading) {
    return <AnalyticsLoading kpiCount={6} chartCount={4} />;
  }

  if (!data) {
    return <AnalyticsEmptyState onReset={() => setTimeRange("7days")} />;
  }

  const { kpis, series, distributions, tables } = data;

  const fuelByCategory = [
    { category: "Heavy Trucks", avgFuel: 68 },
    { category: "Medium Cargo", avgFuel: 58 },
    { category: "Electric Vans", avgFuel: 90 },
    { category: "Light Delivery", avgFuel: 77 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
      {/* 6 Fleet KPI Cards */}
      <section aria-label="Fleet KPIs">
        <div className="kpi-grid cols-6">
          <AnalyticsKpiCard
            title="TOTAL VEHICLES"
            value={kpis.totalVehicles}
            description="Active vehicle fleet registry"
            icon={Truck}
          />
          <AnalyticsKpiCard
            title="ACTIVE VEHICLES"
            value={kpis.activeVehicles}
            change="+1"
            trend="up"
            description="Currently in transit"
            icon={CheckCircle2}
          />
          <AnalyticsKpiCard
            title="IDLE VEHICLES"
            value={kpis.idleVehicles}
            change="-1"
            trend="up"
            description="Depot standby reserves"
            icon={PauseCircle}
          />
          <AnalyticsKpiCard
            title="IN MAINTENANCE"
            value={kpis.maintenanceVehicles}
            change="0"
            trend="neutral"
            description="Service bay diagnostics"
            icon={Wrench}
          />
          <AnalyticsKpiCard
            title="FLEET UTILIZATION"
            value={kpis.fleetUtilization}
            change="+4.1%"
            trend="up"
            description="Capacity load efficiency"
            icon={Percent}
          />
          <AnalyticsKpiCard
            title="AVG FUEL / BATTERY"
            value={kpis.avgFuel}
            change="+2%"
            trend="up"
            description="Fleet energy readiness"
            icon={Fuel}
          />
        </div>
      </section>

      {/* Row 1: Fleet Utilization Over Time & Vehicle Status Distribution */}
      <div className="charts-grid-2-1">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Fleet Utilization Over Time</h2>
              <p className="chart-card-subtitle">
                Operating capacity percentage across time window
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Percentage %</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <LineChart
              data={series.fleetUtilization}
              xKey="timestamp"
              dataKey="rate"
              unit="%"
              strokeColor="#9BEF35"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Vehicle Status Distribution</h2>
              <p className="chart-card-subtitle">
                Fleet operational readiness
              </p>
            </div>
          </div>
          <div className="chart-content-wrap" style={{ display: "flex", alignItems: "center" }}>
            <DonutChart
              data={distributions.fleet}
              unit=" units"
              centerValue={`${kpis.activeVehicles}/${kpis.totalVehicles}`}
              centerLabel="Active"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Distance Travelled & Fuel by Category */}
      <div className="charts-grid-2col">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Distance Travelled</h2>
              <p className="chart-card-subtitle">
                Total accumulated kilometers across active fleet routes
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Kilometers (km)</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <LineChart
              data={series.distanceTravelled}
              xKey="timestamp"
              dataKey="distance"
              unit=" km"
              strokeColor="#9BEF35"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <h2 className="chart-card-title">Fuel & Energy Reserves by Category</h2>
              <p className="chart-card-subtitle">
                Average battery or tank level percentage
              </p>
            </div>
            <div className="chart-card-meta">
              <span className="chart-badge">Level %</span>
            </div>
          </div>
          <div className="chart-content-wrap">
            <BarChart
              data={fuelByCategory}
              xKey="category"
              dataKey="avgFuel"
              unit="%"
              barColor="#9BEF35"
            />
          </div>
        </div>
      </div>

      {/* Fleet Asset Status Table */}
      <div className="data-table-card">
        <div className="chart-card-header">
          <div className="chart-card-title-group">
            <h2 className="chart-card-title">Fleet Vehicles Status</h2>
            <p className="chart-card-subtitle">
              Live vehicle metrics feeding fleet utilization algorithms
            </p>
          </div>
          <span className="chart-badge">{tables.fleet.length} Tracked</span>
        </div>

        <div className="table-responsive-wrap">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Model / Class</th>
                <th>Category</th>
                <th>Status</th>
                <th>Fuel / SOC</th>
                <th>Trip Distance</th>
                <th>Utilization</th>
                <th>Assigned Driver</th>
              </tr>
            </thead>
            <tbody>
              {tables.fleet.map((vehicle) => (
                <tr key={vehicle.vehicleId}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                    {vehicle.vehicleId}
                  </td>
                  <td>{vehicle.model}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{vehicle.type}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        vehicle.status === "Active"
                          ? "active"
                          : vehicle.status === "Idle"
                          ? "idle"
                          : "maintenance"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td>{vehicle.fuel}%</td>
                  <td>{vehicle.distance} km</td>
                  <td style={{ fontWeight: 600 }}>{vehicle.utilization}%</td>
                  <td style={{ color: "var(--text-secondary)" }}>{vehicle.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
