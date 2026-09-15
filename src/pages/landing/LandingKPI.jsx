import { Package, Truck, Clock, AlertTriangle } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: "1,284",
    label: "SHIPMENTS",
    trend: "↑ 12%",
    trendColor: "#22C55E",
    iconBg: "bg-[#07243F]",
    iconBorder: "border-[#10487A]",
    iconColor: "text-[#38BDF8]",
  },
  {
    icon: Truck,
    value: "428",
    label: "VEHICLES",
    trend: "↑ 8%",
    trendColor: "#22C55E",
    iconBg: "bg-[#07243F]",
    iconBorder: "border-[#10487A]",
    iconColor: "text-[#38BDF8]",
  },
  {
    icon: Clock,
    value: "94.2%",
    label: "ON-TIME",
    trend: "↑ 3%",
    trendColor: "#22C55E",
    iconBg: "bg-[#07243F]",
    iconBorder: "border-[#10487A]",
    iconColor: "text-[#38BDF8]",
  },
  {
    icon: AlertTriangle,
    value: "21",
    label: "ALERTS",
    trend: "↓ 5%",
    trendColor: "#EF4444",
    iconBg: "bg-[#331118]",
    iconBorder: "border-[#6E1C27]",
    iconColor: "text-[#EF4444]",
  },
];

function LandingKPI() {
  return (
    <div className="w-full rounded-2xl border border-[#18304A] bg-[#07111F]/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-[#2196F3]/40">
      <div className="grid grid-cols-2 gap-4 divide-y divide-[#18304A] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-3 py-1.5 sm:px-5 sm:py-0"
            >
              {/* Icon Container */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${stat.iconBorder} ${stat.iconBg} ${stat.iconColor} shadow-[0_0_15px_rgba(33,150,243,0.1)] transition-transform duration-200 hover:scale-105`}
              >
                <Icon size={20} strokeWidth={2} />
              </div>

              {/* Information */}
              <div>
                <div className="flex items-baseline gap-2">
                    <p className="text-[20px] font-bold tracking-tight text-white lg:text-[22px]">
                    {stat.value}
                  </p>
                </div>

                <p className="text-[10px] font-semibold tracking-[0.08em] text-[#6F7D8E]">
                  {stat.label}
                </p>

                <p
                  className="mt-0.5 text-[11px] font-semibold"
                  style={{ color: stat.trendColor }}
                >
                  {stat.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LandingKPI;