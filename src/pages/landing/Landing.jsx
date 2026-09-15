import { useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import LandingNavbar from "./LandingNavbar";
import LandingKPI from "./LandingKPI";
import ModernLogisticsSection from "./ModernLogisticsSection";
import LandingFooter from "./LandingFooter";
import AuthModal from "../../components/auth/AuthModal";
import earthBg from "../../assets/earth-orbit.jpg";

function Landing() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020812] text-[#F5F7FA]">
      {/* Top Fixed/Absolute Navbar */}
      <LandingNavbar
        onLogin={() => openAuth("login")}
        onSignup={() => openAuth("signup")}
      />

      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-screen w-full pt-[72px]">
        
        {/* Background Atmosphere & Planet Earth */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Earth Orbit Satellite Image */}
          <img
            src={earthBg}
            alt="Earth logistics network orbit"
            className="absolute right-[-10%] top-0 h-[105%] w-[85%] object-cover object-left opacity-90 lg:right-0 lg:w-[65%]"
          />

          {/* Gradients blending space and earth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020812] via-[#020812]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020812] via-transparent to-transparent" />
          
          {/* Cyan Glow Effect around upper right */}
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#2196F3]/[0.08] blur-[140px]" />
        </div>

        {/* Hero Interactive Container */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-[1440px] flex-col justify-between px-8 pb-6 pt-10 lg:pb-7 lg:pt-11">
          
          {/* Main Top Grid: Content (Left) & Network Map (Right) */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
            
            {/* Left Column: Heading & CTAs */}
            <div className="z-20 max-w-[650px] lg:col-span-7 xl:col-span-7">
              
              {/* Live Status Pill */}
              <div className="hero-reveal-1 mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#18304A] bg-[#07111F]/75 px-3.5 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-60 live-pulse" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
                </span>

                <span className="text-[10px] font-bold tracking-[0.16em] text-[#22C55E]">
                  NETWORK LIVE
                </span>

                <span className="text-[#3E5268]">|</span>

                <span className="text-[10px] font-medium text-[#8B9AAF]">
                  All systems operational
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="hero-reveal-2 max-w-[620px] text-5xl font-bold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-[64px] xl:text-[68px]">
                <span className="block whitespace-nowrap">KEEP THE WORLD</span>
                <span className="hero-reveal-3 block whitespace-nowrap text-[#2196F3]">
                  IN MOTION.
                </span>
              </h1>

              {/* Subheading Paragraph */}
              <p className="hero-reveal-4 mt-7 max-w-[520px] text-[15px] leading-[1.65] text-[#9AAABD]">
                A connected logistics control center to monitor shipments,
                vehicles, warehouses and routes — and act before small
                disruptions become major delays.
              </p>

              {/* Action Buttons */}
              <div className="hero-reveal-5 mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/app/dashboard"
                  className="group inline-flex items-center gap-3 rounded-md bg-[#087CF0] px-5.5 py-3 text-[12px] font-bold tracking-[0.08em] text-white shadow-[0_0_24px_rgba(0,112,243,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1686F5] hover:shadow-[0_0_30px_rgba(0,112,243,0.4)]"
                >
                  ENTER CONTROL CENTER
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/app/network"
                  className="group inline-flex items-center gap-3 rounded-md border border-[#38516B] bg-[#071322]/65 px-5.5 py-3 text-[12px] font-bold tracking-[0.08em] text-[#E5EDF6] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2196F3]/70 hover:bg-[#0C1E34]"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-transform duration-200 group-hover:scale-110">
                    <Play size={10} fill="white" className="ml-0.5 text-white" />
                  </div>
                  EXPLORE NETWORK
                </Link>
              </div>

            </div>

          </div>

          {/* Floating Glass KPI Strip */}
          <div className="hero-reveal-kpi mt-7 w-full lg:mt-0">
            <LandingKPI />
          </div>

        </div>

      </div>

      {/* ================= LOWER SECTION: BUILT FOR MODERN LOGISTICS ================= */}
      <ModernLogisticsSection />

      <LandingFooter />

      {isAuthOpen && (
        <AuthModal
          mode={authMode}
          onModeChange={setAuthMode}
          onClose={() => setIsAuthOpen(false)}
        />
      )}

    </div>
  );
}

export default Landing;