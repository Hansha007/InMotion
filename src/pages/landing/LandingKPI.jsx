const stats = [
  {
    icon: "◇",
    value: "1,284",
    label: "SHIPMENTS",
    trend: "↑ 12%",
    trendColor: "#22C55E",
  },
  {
    icon: "▣",
    value: "428",
    label: "VEHICLES",
    trend: "↑ 8%",
    trendColor: "#22C55E",
  },
  {
    icon: "◷",
    value: "94.2%",
    label: "ON-TIME",
    trend: "↑ 3%",
    trendColor: "#22C55E",
  },
  {
    icon: "△",
    value: "21",
    label: "ALERTS",
    trend: "↓ 5%",
    trendColor: "#EF4444",
  },
];

function LandingKPI() {
  return (
    <div className="absolute bottom-0 left-8 right-8 z-20 rounded-xl border border-[#18304A] bg-[#07111F]/80 px-6 py-4 backdrop-blur-md">
      <div className="grid grid-cols-4 divide-x divide-[#18304A]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-center gap-4 px-6"
          >
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#2196F3]/30 bg-[#0B1728] text-[20px] text-[#2196F3]">
              {stat.icon}
            </div>

            {/* Information */}
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-[22px] font-semibold tracking-tight text-[#F5F7FA]">
                  {stat.value}
                </p>

                <p className="text-[9px] font-medium tracking-[0.08em] text-[#6F7D8E]">
                  {stat.label}
                </p>
              </div>

              <p
                className="mt-1 text-[10px] font-medium"
                style={{ color: stat.trendColor }}
              >
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingKPI;