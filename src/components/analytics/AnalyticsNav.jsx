import { NavLink } from "react-router-dom";
import { LayoutDashboard, Truck, Car, Navigation, Building2, Gauge } from "lucide-react";

export default function AnalyticsNav() {
  const tabs = [
    { label: "Overview", to: "/analytics", icon: LayoutDashboard, end: true },
    { label: "Delivery", to: "/analytics/delivery", icon: Truck },
    { label: "Fleet", to: "/analytics/fleet", icon: Car },
    { label: "Routes", to: "/analytics/routes", icon: Navigation },
    { label: "Warehouses", to: "/analytics/warehouses", icon: Building2 },
    { label: "Performance", to: "/analytics/performance", icon: Gauge }
  ];

  return (
    <nav className="analytics-nav-bar" aria-label="Analytics Navigation">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `analytics-nav-tab ${isActive ? "active" : ""}`
            }
          >
            <IconComponent className="tab-icon" />
            <span>{tab.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
