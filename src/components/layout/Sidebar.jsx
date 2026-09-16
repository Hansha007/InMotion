import {
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  LayoutDashboard,
  MonitorCog,
  Network,
  PackageCheck,
  Settings,
  Truck,
  Warehouse,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen = false, onClose }) {
  const navItems = [
    { name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
    { name: "Network", path: "/app/network", icon: Network, exact: true },
    { name: "Shipments", path: "/app/shipments", icon: PackageCheck },
    { name: "Fleet", path: "/app/fleet", icon: Truck },
    { name: "Warehouses", path: "/app/warehouses", icon: Warehouse },
    { name: "Alerts", path: "/app/alerts", icon: AlertTriangle, badge: "3" },
    { name: "Actions", path: "/app/actions", icon: MonitorCog },
    { name: "Monitoring", path: "/app/monitoring", icon: Boxes },
    { name: "Analytics", path: "/app/analytics", icon: BarChart3 },
    { name: "Notifications", path: "/app/notifications", icon: Bell },
    { name: "Settings", path: "/app/settings", icon: Settings },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-[#020812]/60 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[#18304A] bg-[#07111F] transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-64 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col px-3 py-5">
          <div className="mb-5 px-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2196F3]">
              IN MOTION
            </p>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ name, path, icon: Icon, badge, exact }) => (
              <NavLink
                key={path}
                to={path}
                end={exact}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "border-[#2196F3]/30 bg-[#2196F3]/10 text-[#F5F7FA] shadow-[0_0_0_1px_rgba(33,150,243,0.2)]"
                      : "border-transparent text-[#A7B3C2] hover:border-[#18304A] hover:bg-[#0B1728] hover:text-[#F5F7FA]"
                  }`
                }
              >
                {Icon && <Icon className="h-4 w-4 shrink-0" />}

                <span className="flex-1">{name}</span>

                {badge && (
                  <span className="rounded-full bg-[#EF4444]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#EF4444]">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;