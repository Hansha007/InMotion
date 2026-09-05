import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  BarChart3,
  Package,
  Truck,
  MapPin,
  Warehouse,
  Bell,
  Sun,
  Moon,
  Search,
  Sliders
} from "lucide-react";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="app-sidebar">
        <div>
          <div className="sidebar-header">
            <div className="brand-icon-box">IM</div>
            <div className="brand-info">
              <span className="brand-name">IN MOTION</span>
              <span className="brand-subtitle">Control & Intelligence</span>
            </div>
          </div>

          <div className="sidebar-nav-group">
            <span className="sidebar-nav-label">Intelligence</span>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "active" : ""}`
              }
            >
              <BarChart3 className="nav-icon" />
              <span>Analytics</span>
            </NavLink>

            <span className="sidebar-nav-label" style={{ marginTop: 16 }}>
              Operations (Team)
            </span>
            <div className="sidebar-nav-item" style={{ opacity: 0.6, cursor: "not-allowed" }} title="Team module">
              <Package className="nav-icon" />
              <span>Shipments</span>
            </div>
            <div className="sidebar-nav-item" style={{ opacity: 0.6, cursor: "not-allowed" }} title="Team module">
              <Truck className="nav-icon" />
              <span>Fleet</span>
            </div>
            <div className="sidebar-nav-item" style={{ opacity: 0.6, cursor: "not-allowed" }} title="Team module">
              <MapPin className="nav-icon" />
              <span>Routes</span>
            </div>
            <div className="sidebar-nav-item" style={{ opacity: 0.6, cursor: "not-allowed" }} title="Team module">
              <Warehouse className="nav-icon" />
              <span>Warehouses</span>
            </div>
            <div className="sidebar-nav-item" style={{ opacity: 0.6, cursor: "not-allowed" }} title="Team module">
              <Bell className="nav-icon" />
              <span>Alerts</span>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="system-status-indicator">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="status-dot-active" />
              <span style={{ color: "var(--text-secondary)", fontSize: 11 }}>
                NODE: ASIA-SOUTH-1
              </span>
            </div>
            <span style={{ color: "var(--status-success)", fontWeight: 600, fontSize: 11 }}>
              ACTIVE
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="app-main">
        {/* Topbar */}
        <header className="app-topbar">
          <div className="topbar-left">
            <div className="topbar-search">
              <Search size={14} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search shipment, vehicle, or route..."
                readOnly
              />
            </div>
          </div>

          <div className="topbar-right">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle theme"
            >
              {isLightMode ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <div className="user-profile-badge">
              <div className="user-avatar">OP</div>
              <span className="user-name">Ops Lead</span>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <Outlet />
      </div>
    </div>
  );
}
