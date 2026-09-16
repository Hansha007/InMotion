import LandingNavbar from "./LandingNavbar";
import LandingNetwork from "../../components/map/LandingNetwork";
import DelayedShipmentCard from "./DelayedShipmentCard";
import LandingKPI from "./LandingKPI";

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020812] text-[#F5F7FA]">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#2196F3]/[0.06] blur-[120px]" />
      </div>

      <LandingNavbar />

      <LandingNetwork />

      {/* Hero */}
      <main className="relative z-10 flex min-h-screen items-center">
        <section className="relative mx-auto w-full max-w-[1440px] px-8 pb-20 pt-32">
          <div className="max-w-[650px]">
            {/* Live status */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#18304A] bg-[#07111F]/80 px-3.5 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.7)]" />

              <span className="text-[10px] font-semibold tracking-[0.18em] text-[#A7B3C2]">
                NETWORK LIVE
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-[#F5F7FA] sm:text-6xl lg:text-[76px]">
              KEEP THE WORLD
              <span className="block text-[#2196F3]">
                IN MOTION.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="mt-7 max-w-[540px] text-[16px] leading-7 text-[#A7B3C2]">
              See every shipment, route, vehicle and warehouse in one
              connected logistics network. Detect problems early, take
              action fast, and keep operations moving.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="/login"
                className="group inline-flex items-center gap-3 rounded-lg bg-[#2196F3] px-5 py-3.5 text-[12px] font-semibold text-white shadow-[0_0_30px_rgba(33,150,243,0.18)] transition-all duration-200 hover:bg-[#1E88E5] hover:shadow-[0_0_36px_rgba(33,150,243,0.3)]"
              >
                ENTER CONTROL CENTER

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/app/network"
                className="inline-flex items-center gap-3 rounded-lg border border-[#18304A] bg-[#07111F]/70 px-5 py-3.5 text-[12px] font-medium text-[#F5F7FA] backdrop-blur-sm transition-all duration-200 hover:border-[#2196F3]/60 hover:bg-[#0B1728]"
              >
                EXPLORE NETWORK

                <span className="text-[#6F7D8E]">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Delayed shipment alert */}
          <DelayedShipmentCard />

          {/* KPI strip */}
          <LandingKPI />
        </section>
      </main>
    </div>
  );
}

export default Landing;