import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Network,
  Truck,
  Warehouse,
  Route,
  TriangleAlert,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    path: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Shipments",
    path: "/app/shipments",
    icon: Package,
  },
  {
    name: "Network",
    path: "/app/network",
    icon: Network,
    end: true,
  },
  {
    name: "Fleet",
    path: "/app/fleet",
    icon: Truck,
  },
  {
    name: "Warehouses",
    path: "/app/warehouses",
    icon: Warehouse,
  },
  {
    name: "Routes",
    path: "/app/network/routes",
    icon: Route,
  },
  {
    name: "Alerts",
    path: "/app/alerts",
    icon: TriangleAlert,
    badge: "21",
  },
  {
    name: "Analytics",
    path: "/app/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Settings",
    path: "/app/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[248px] flex-col overflow-hidden border-r border-[#18304A] bg-[#07111F]">
      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[260px] w-[260px] rounded-full bg-[#2196F3]/[0.07] blur-[90px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-full bg-gradient-to-t from-[#2196F3]/[0.025] to-transparent" />

      {/* Brand */}
      <div className="relative flex h-[72px] shrink-0 items-center border-b border-[#18304A] px-5">
        <div className="group mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#2196F3] text-white shadow-[0_0_22px_rgba(33,150,243,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(33,150,243,0.4)]">
          <Route
            size={19}
            strokeWidth={2.4}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        <div>
          <h1 className="text-[17px] font-bold tracking-[0.08em] text-[#F5F7FA]">
            INMOTION
          </h1>

          <p className="mt-0.5 text-[8px] tracking-[0.18em] text-[#6F7D8E]">
            LOGISTICS CONTROL
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "group relative flex h-[42px] items-center gap-3 overflow-hidden rounded-lg px-3.5 transition-all duration-200",
                    isActive
                      ? "bg-[#2196F3]/20 text-[#F5F7FA] shadow-[0_0_18px_rgba(33,150,243,0.10)]"
                      : "text-[#A7B3C2] hover:bg-[#0F1D30] hover:text-[#F5F7FA]",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    <span
                      className={[
                        "absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full transition-all duration-200",
                        isActive
                          ? "bg-[#2196F3] shadow-[0_0_10px_rgba(33,150,243,0.8)]"
                          : "bg-transparent",
                      ].join(" ")}
                    />

                    {/* Subtle glow */}
                    <span
                      className={[
                        "pointer-events-none absolute left-5 top-1/2 h-8 w-16 -translate-y-1/2 rounded-full bg-[#2196F3]/10 blur-xl transition-opacity duration-200",
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-40",
                      ].join(" ")}
                    />

                    {/* Icon */}
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className={[
                        "relative z-10 shrink-0 transition-all duration-200",
                        isActive
                          ? "text-[#2196F3] drop-shadow-[0_0_7px_rgba(33,150,243,0.55)]"
                          : "text-[#8B9AAF] group-hover:translate-x-0.5 group-hover:text-[#C7D0DB]",
                      ].join(" ")}
                    />

                    {/* Label */}
                    <span className="relative z-10 flex-1 text-[13px] font-medium">
                      {item.name}
                    </span>

                    {/* Alert badge */}
                    {item.badge && (
                      <span className="relative z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#EF4444] px-1.5 text-[9px] font-semibold text-white shadow-[0_0_10px_rgba(239,68,68,0.25)]">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Brand slogan */}
      <div className="relative shrink-0 px-5 pb-6 pt-4">
        <div className="mb-3 h-px w-8 bg-[#2196F3] shadow-[0_0_8px_rgba(33,150,243,0.5)]" />

        <p className="text-[10px] leading-4 text-[#5F88B2]">
          Smarter Logistics.
          <br />
          A More Connected World.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;