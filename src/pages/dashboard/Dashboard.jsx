import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import "./Dashboard.css";

/* =========================================================
   ICON
   ========================================================= */

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    package: (
      <>
        <path d="M21 8.5 12 4 3 8.5v7L12 20l9-4.5v-7Z" />
        <path d="m3 8.5 9 4.5 9-4.5M12 13v7" />
        <path d="M7.5 6.25 16.5 11" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    truck: (
      <>
        <path d="M3 6h11v10H3z" />
        <path d="M14 9h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),

    warning: (
      <>
        <path d="m12 3 9 17H3L12 3Z" />
        <path d="M12 9v5" />
        <circle cx="12" cy="17" r=".7" fill="currentColor" />
      </>
    ),

    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
        <path d="M10 21h4" />
      </>
    ),

    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14-4L4 9" />
        <path d="M4 4v5h5" />
        <path d="M4 13a8 8 0 0 0 14 4l2-2" />
        <path d="M20 20v-5h-5" />
      </>
    ),

    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-5 3 2 4-6" />
      </>
    ),

    activity: (
      <>
        <path d="M4 12h3l2-6 4 12 2-6h5" />
      </>
    ),

    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 7 5 5-5 5" />
      </>
    ),

    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),

    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),

    minus: (
      <>
        <path d="M5 12h14" />
      </>
    ),

    warehouse: (
      <>
        <path d="m3 10 9-6 9 6v10H3V10Z" />
        <path d="M7 20v-6h10v6M8 10h.01M12 10h.01M16 10h.01" />
      </>
    ),

    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h3a5 5 0 0 0 5-5V8" />
      </>
    ),

    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
  };

  return <svg {...common}>{icons[name] || icons.activity}</svg>;
}

/* =========================================================
   DATA
   ========================================================= */

const kpis = [
  {
    title: "Total Shipments",
    value: "12,486",
    change: "↑ 12%",
    comparison: "vs. last 7 days",
    tone: "blue",
    icon: "package",
  },
  {
    title: "On-Time Delivery",
    value: "93.1%",
    change: "↑ 3%",
    comparison: "vs. last 7 days",
    tone: "green",
    icon: "clock",
  },
  {
    title: "Active Vehicles",
    value: "68",
    change: "↑ 8%",
    comparison: "vs. last 7 days",
    tone: "blue",
    icon: "truck",
  },
  {
    title: "Delayed Shipments",
    value: "27",
    change: "↓ 18%",
    comparison: "vs. last 7 days",
    tone: "yellow",
    icon: "warning",
  },
  {
    title: "Active Alerts",
    value: "12",
    change: "↓ 25%",
    comparison: "vs. last 7 days",
    tone: "red",
    icon: "bell",
  },
];

const alerts = [
  {
    severity: "Critical",
    tone: "critical",
    title: "Shipment SHP-7842 delayed",
    entity: "Shipment",
    location: "Delhi → Mumbai",
    time: "1h ago",
  },
  {
    severity: "High",
    tone: "high",
    title: "Vehicle VH-204 requires attention",
    entity: "Vehicle",
    location: "Bengaluru",
    time: "2h ago",
  },
  {
    severity: "Medium",
    tone: "medium",
    title: "Warehouse DEL-01 nearing capacity",
    entity: "Warehouse",
    location: "Delhi",
    time: "3h ago",
  },
  {
    severity: "High",
    tone: "high",
    title: "Route RT-306 traffic disruption",
    entity: "Route",
    location: "Kolkata → Guwahati",
    time: "4h ago",
  },
  {
    severity: "Critical",
    tone: "critical",
    title: "Shipment SHP-7710 delayed",
    entity: "Shipment",
    location: "Mumbai",
    time: "5h ago",
  },
];

const activity = [
  {
    time: "14:28",
    icon: "package",
    tone: "shipment",
    title: "Shipment SHP-8921 reassigned",
    description: "From WH-03 to WH-04 • Mumbai",
  },
  {
    time: "13:56",
    icon: "truck",
    tone: "vehicle",
    title: "Vehicle VH-204 delayed",
    description: "ETA +2h • Bengaluru",
  },
  {
    time: "12:43",
    icon: "route",
    tone: "route",
    title: "Route RT-118 updated",
    description: "New ETA 16:20 • Delhi → Kolkata",
  },
  {
    time: "11:32",
    icon: "check",
    tone: "resolved",
    title: "Alert resolved",
    description: "Warehouse DEL-02 capacity normal • Delhi",
  },
  {
    time: "10:17",
    icon: "warehouse",
    tone: "warehouse",
    title: "Warehouse capacity changed",
    description: "WH-01 at 78% • Bengaluru",
  },
];

const performanceData = [
  { day: "Apr 20", onTime: 61, delayed: 19 },
  { day: "Apr 21", onTime: 77, delayed: 12 },
  { day: "Apr 22", onTime: 74, delayed: 20 },
  { day: "Apr 23", onTime: 78, delayed: 17 },
  { day: "Apr 24", onTime: 79, delayed: 23 },
  { day: "Apr 25", onTime: 79, delayed: 22 },
  { day: "Apr 26", onTime: 84, delayed: 20 },
];

const fleetData = [
  { name: "Active", value: 52, percent: "76%" },
  { name: "Idle", value: 9, percent: "13%" },
  { name: "Maintenance", value: 4, percent: "6%" },
  { name: "Issue / Delayed", value: 3, percent: "4%" },
];

const fleetColors = ["#22C55E", "#2196F3", "#FACC15", "#EF4444"];

/* =========================================================
   MAP DATA
   ========================================================= */

const cities = [
  { name: "Delhi", x: 42, y: 23 },
  { name: "Mumbai", x: 30, y: 64 },
  { name: "Bengaluru", x: 40, y: 88 },
  { name: "Kolkata", x: 68, y: 45 },
];

const warehouses = [
  { name: "WH-03", x: 44, y: 12 },
  { name: "WH-02", x: 19, y: 58 },
  { name: "WH-04", x: 74, y: 58 },
  { name: "WH-01", x: 43, y: 95 },
];

const vehicles = [
  { x: 50, y: 35 },
  { x: 28, y: 70 },
  { x: 56, y: 63 },
  { x: 77, y: 80 },
  { x: 45, y: 77 },
];

/* =========================================================
   MAP
   ========================================================= */

function NetworkMap() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="network-map">
      <div className="map-glow map-glow-one" />
      <div className="map-glow map-glow-two" />
      <div className="map-grid" />

      <svg
        className="network-map-svg"
        viewBox="0 0 900 470"
        preserveAspectRatio="none"
        style={{ transform: `scale(${zoom})` }}
      >
        <defs>
          <filter id="blueGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cityGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="networkLand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#092033" />
            <stop offset="50%" stopColor="#061827" />
            <stop offset="100%" stopColor="#03111d" />
          </linearGradient>
        </defs>

        {/* Stylized geographic landmass */}
        <path
          className="map-land"
          fill="url(#networkLand)"
          d="
            M160 75
            C225 42 315 48 374 70
            C430 42 516 55 573 91
            C642 80 726 112 755 170
            C784 226 748 278 716 318
            C691 350 672 388 631 412
            C586 438 534 419 498 397
            C459 420 404 426 366 397
            C318 415 261 397 238 362
            C199 340 179 304 188 265
            C145 231 133 178 160 75Z
          "
        />

        {/* Faint geographic contour lines */}
        <g className="map-contours">
          <path d="M184 112 C280 85 385 108 470 92 S650 105 720 150" />
          <path d="M164 150 C280 124 358 145 451 126 S625 139 754 184" />
          <path d="M155 190 C250 164 349 182 434 159 S620 177 746 217" />
          <path d="M173 230 C266 204 344 219 430 196 S607 212 731 248" />
          <path d="M196 275 C285 244 357 260 439 235 S599 252 712 286" />
          <path d="M226 322 C310 287 385 302 460 276 S577 292 682 322" />
          <path d="M273 360 C350 327 405 342 477 315 S584 326 650 353" />
        </g>

        {/* Satellite/light clusters */}
        <g className="map-lights">
          <circle cx="252" cy="145" r="2" />
          <circle cx="278" cy="134" r="1.5" />
          <circle cx="312" cy="174" r="2" />
          <circle cx="348" cy="116" r="1.5" />
          <circle cx="399" cy="137" r="2" />
          <circle cx="462" cy="104" r="1.5" />
          <circle cx="520" cy="152" r="2" />
          <circle cx="584" cy="128" r="1.5" />
          <circle cx="635" cy="177" r="2" />
          <circle cx="694" cy="205" r="1.5" />
          <circle cx="227" cy="256" r="1.5" />
          <circle cx="274" cy="290" r="2" />
          <circle cx="321" cy="326" r="1.5" />
          <circle cx="381" cy="300" r="2" />
          <circle cx="446" cy="350" r="1.5" />
          <circle cx="526" cy="329" r="2" />
          <circle cx="607" cy="351" r="1.5" />
          <circle cx="671" cy="300" r="2" />
        </g>

        {/* Network routes */}
        <path
          className="route-line active-route"
          d="M378 108 C405 143 425 180 450 215 C490 246 545 264 612 300"
        />

        <path
          className="route-line delayed-route"
          d="M378 108 C349 166 315 230 270 301"
        />

        <path
          className="route-line active-route"
          d="M270 301 C320 338 360 383 400 414"
        />

        <path
          className="route-line risk-route"
          d="M400 414 C472 377 540 340 612 300"
        />

        <path
          className="route-line active-route"
          d="M450 215 C505 225 558 250 612 300"
        />

        <path
          className="route-line faint-route"
          d="M378 108 C454 120 526 145 602 178 C650 198 690 218 735 250"
        />

        {/* route junctions */}
        <g className="route-junctions">
          <circle cx="450" cy="215" r="4" />
          <circle cx="270" cy="301" r="4" />
          <circle cx="400" cy="414" r="4" />
          <circle cx="612" cy="300" r="4" />
        </g>
      </svg>

      {/* City markers */}
      {cities.map((city) => (
        <div
          className="city-marker"
          key={city.name}
          style={{ left: `${city.x}%`, top: `${city.y}%` }}
        >
          <span className="city-pulse" />
          <span className="city-dot" />
          <span>{city.name}</span>
        </div>
      ))}

      {/* Warehouse markers */}
      {warehouses.map((warehouse) => (
        <div
          className="warehouse-marker"
          key={warehouse.name}
          style={{
            left: `${warehouse.x}%`,
            top: `${warehouse.y}%`,
          }}
        >
          <span className="warehouse-diamond">◇</span>
          <small>{warehouse.name}</small>
        </div>
      ))}

      {/* Vehicle markers */}
      {vehicles.map((vehicle, index) => (
        <div
          className="vehicle-marker"
          key={index}
          style={{
            left: `${vehicle.x}%`,
            top: `${vehicle.y}%`,
          }}
        >
          <Icon name="truck" size={15} />
        </div>
      ))}

      {/* Map title */}
      <div className="map-title">
        <div className="map-title-line">
          <span className="live-dot" />
          <strong>LIVE NETWORK</strong>
        </div>

        <span>Warehouses • Vehicles • Routes • Real-time</span>
      </div>

      {/* Selected route */}
      <div className="selected-route">
        <div className="selected-route-label">
          <Icon name="route" size={12} />
          Selected Route
        </div>

        <h3>Delhi → Mumbai</h3>

        <span className="delayed-badge">DELAYED</span>

        <div className="route-detail-row">
          <span>ETA</span>
          <strong>
            Apr 26, 18:45
            <em>(+4h 30m)</em>
          </strong>
        </div>

        <div className="route-detail-row">
          <span>Shipment</span>
          <strong>SHP-7842</strong>
        </div>

        <div className="route-detail-row">
          <span>Vehicle</span>
          <strong>🚚 VH-204</strong>
        </div>

        <Link to="/app/shipments/SHP-7842" className="route-details-button">
          View Details
          <Icon name="arrow" size={13} />
        </Link>
      </div>

      {/* Controls */}
      <div className="map-controls">
        <span>N</span>

        <button
          type="button"
          onClick={() => setZoom((value) => Math.min(value + 0.1, 1.3))}
        >
          <Icon name="plus" size={14} />
        </button>

        <button
          type="button"
          onClick={() => setZoom((value) => Math.max(value - 0.1, 0.9))}
        >
          <Icon name="minus" size={14} />
        </button>
      </div>

      {/* Legend */}
      <div className="network-legend">
        <span>
          <i className="legend-warehouse" />
          Warehouse
        </span>

        <span>
          <i className="legend-vehicle" />
          Vehicle
        </span>

        <span>
          <i className="legend-active" />
          Active Route
        </span>

        <span>
          <i className="legend-risk" />
          At Risk Route
        </span>

        <span>
          <i className="legend-delayed" />
          Delayed Route
        </span>
      </div>

      <button className="network-close" type="button">
        <Icon name="close" size={17} />
      </button>
    </div>
  );
}

/* =========================================================
   DELIVERY PERFORMANCE
   ========================================================= */

function DeliveryPerformance() {
  return (
    <section className="dashboard-card delivery-card">
      <div className="card-header">
        <div className="card-title-row">
          <span className="header-blue-icon">
            <Icon name="chart" size={16} />
          </span>

          <h2>Delivery Performance</h2>
        </div>

        <select defaultValue="7">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>

      <div className="performance-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={performanceData}
            margin={{
              top: 10,
              right: 12,
              left: -10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="redArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#18304A"
              strokeDasharray="2 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#6F7D8E",
                fontSize: 9,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{
                fill: "#6F7D8E",
                fontSize: 9,
              }}
              axisLine={false}
              tickLine={false}
              width={38}
            />

            <Tooltip
              contentStyle={{
                background: "#07111F",
                border: "1px solid #18304A",
                borderRadius: "6px",
                color: "#F5F7FA",
                fontSize: "10px",
              }}
            />

            <Area
              type="monotone"
              dataKey="onTime"
              stroke="#22C55E"
              strokeWidth={2}
              fill="url(#greenArea)"
              dot={{
                r: 2.5,
                fill: "#22C55E",
                stroke: "#22C55E",
              }}
            />

            <Area
              type="monotone"
              dataKey="delayed"
              stroke="#EF4444"
              strokeWidth={1.8}
              fill="url(#redArea)"
              dot={{
                r: 2.5,
                fill: "#EF4444",
                stroke: "#EF4444",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">
        <span>
          <i className="green-dot" />
          On-Time Delivery
        </span>

        <span>
          <i className="red-dot" />
          Delayed Delivery
        </span>
      </div>
    </section>
  );
}

/* =========================================================
   FLEET STATUS
   ========================================================= */

function FleetStatus() {
  return (
    <section className="dashboard-card fleet-card">
      <div className="card-header">
        <div className="card-title-row">
          <span className="header-blue-icon">
            <Icon name="truck" size={16} />
          </span>

          <h2>Fleet Status</h2>
        </div>
      </div>

      <div className="fleet-content">
        <div className="fleet-donut">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fleetData}
                dataKey="value"
                nameKey="name"
                innerRadius="62%"
                outerRadius="86%"
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
              >
                {fleetData.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={fleetColors[index]}
                    stroke="#07111F"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-center">
            <strong>68</strong>
            <span>Total Vehicles</span>
          </div>
        </div>

        <div className="fleet-legend">
          {fleetData.map((item, index) => (
            <div className="fleet-item" key={item.name}>
              <i
                className="fleet-color"
                style={{ background: fleetColors[index] }}
              />

              <span>{item.name}</span>

              <strong>{item.value}</strong>

              <small>{item.percent}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ALERTS
   ========================================================= */

function ActiveAlerts() {
  return (
    <section className="dashboard-card alerts-card">
      <div className="card-header">
        <div className="card-title-row">
          <span className="header-red-icon">
            <Icon name="warning" size={16} />
          </span>

          <h2>Active Alerts</h2>
        </div>

        <Link to="/app/alerts">View All →</Link>
      </div>

      <div className="alerts-table">
        <div className="alert-table-header">
          <span>SEVERITY</span>
          <span>TITLE</span>
          <span>ENTITY</span>
          <span>LOCATION</span>
          <span>TIME</span>
          <span />
        </div>

        {alerts.map((alert) => (
          <Link
            to="/app/alerts"
            className="alert-row"
            key={`${alert.title}-${alert.time}`}
          >
            <span>
              <b className={`severity ${alert.tone}`}>
                {alert.severity}
              </b>
            </span>

            <span className="alert-title">{alert.title}</span>

            <span>{alert.entity}</span>

            <span>{alert.location}</span>

            <span>{alert.time}</span>

            <span className="alert-arrow">›</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   RECENT ACTIVITY
   ========================================================= */

function RecentActivity() {
  return (
    <section className="dashboard-card activity-card">
      <div className="card-header">
        <div className="card-title-row">
          <span className="header-blue-icon">
            <Icon name="activity" size={16} />
          </span>

          <h2>Recent Activity</h2>
        </div>

        <Link to="/app/monitoring">View All →</Link>
      </div>

      <div className="activity-list">
        {activity.map((item) => (
          <div className="activity-item" key={item.time}>
            <span className="activity-time">{item.time}</span>

            <span className={`activity-symbol ${item.tone}`}>
              <Icon name={item.icon} size={14} />
            </span>

            <div className="activity-text">
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  return (
    <div className="dashboard-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="dashboard-header">
        <div>
          <h1>Overview</h1>
          <p>Real-time logistics network overview</p>
        </div>

        <button
          type="button"
          className="dashboard-refresh"
          onClick={handleRefresh}
        >
          <Icon
            name="refresh"
            size={14}
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {/* =====================================================
          KPI
          ===================================================== */}

      <section className="kpi-grid">
        {kpis.map((kpi) => (
          <div className={`kpi-card ${kpi.tone}`} key={kpi.title}>
            <div className="kpi-icon">
              <Icon name={kpi.icon} size={20} />
            </div>

            <div className="kpi-content">
              <span className="kpi-label">{kpi.title}</span>

              <strong className="kpi-value">{kpi.value}</strong>

              <div className="kpi-change">
                <span
                  className={
                    kpi.tone === "red"
                      ? "negative"
                      : kpi.tone === "yellow"
                        ? "warning"
                        : "positive"
                  }
                >
                  {kpi.change}
                </span>

                <span>{kpi.comparison}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="dashboard-content">

        {/* LEFT / TOP — NETWORK */}

        <section className="dashboard-card network-card">
          <NetworkMap />
        </section>

        {/* RIGHT COLUMN */}

        <aside className="dashboard-side">
          <ActiveAlerts />
          <RecentActivity />
        </aside>

        {/* LOWER LEFT */}

        <section className="dashboard-bottom">
          <DeliveryPerformance />
          <FleetStatus />
        </section>
      </main>

      {/* =====================================================
          FOOTER STATUS
          ===================================================== */}

      <div className="dashboard-footer">
        <span className="network-live-dot" />
        Network operating normally
        <span className="footer-separator" />
        68 vehicles active
        <span className="footer-separator" />
        27 delayed shipments

        <span className="footer-route-info">
          Last synchronized 14:32
        </span>
      </div>
    </div>
  );
}

export default Dashboard;