import { Link, NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Network", path: "/app/network" },
  { name: "Control Center", path: "/app/dashboard" },
  { name: "Analytics", path: "/app/analytics" },
  { name: "About", path: "/about" },
];

function LandingNavbar({ onLogin, onSignup }) {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 border-b border-[#18304A]/50 bg-[#020812]/50 backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-8">
        
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center">
            {/* Geometric Glowing X Logo */}
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 drop-shadow-[0_0_12px_rgba(33,150,243,0.7)] transition-transform duration-300 group-hover:scale-105"
            >
              <defs>
                <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#0066FF" />
                </linearGradient>
                <linearGradient id="logoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#29B6F6" />
                  <stop offset="100%" stopColor="#1565C0" />
                </linearGradient>
              </defs>
              <path
                d="M6 8L14 18L6 28H11.5L16.5 21.5L21.5 28H27L19 18L27 8H21.5L16.5 14.5L11.5 8H6Z"
                fill="url(#logoGrad1)"
              />
              <path
                d="M23 8L30 18L23 28H28L35 18L28 8H23Z"
                fill="url(#logoGrad2)"
                opacity="0.9"
              />
            </svg>
          </div>

          <span className="text-[17px] font-bold tracking-[0.14em] text-white">
            INMOTION
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => {
            const isHome = item.path === "/";
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "relative py-1 text-[13px] font-medium transition-colors duration-200",
                    (isHome ? true : isActive)
                      ? "text-white"
                      : "text-[#8B9AAF] hover:text-white",
                  ].join(" ")
                }
              >
                {item.name}
                {/* Active Indicator Underline */}
                {isHome && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-[#2196F3] shadow-[0_0_8px_#2196F3]" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Network Live status */}
          <div className="hidden items-center gap-2 rounded-full border border-[#18304A]/60 bg-[#07111F]/60 px-3 py-1.5 backdrop-blur-sm sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
            </span>
            <span className="text-[11px] font-medium text-[#22C55E]">
              Network Live
            </span>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={onLogin}
            className="rounded-lg border border-[#1F334D] bg-[#07111F]/70 px-4 py-2 text-[12px] font-medium text-[#F5F7FA] backdrop-blur-sm transition-all duration-200 hover:border-[#2196F3]/50 hover:bg-[#0B182B]"
          >
            Login
          </button>

          {/* Get Started Button */}
          <button
            type="button"
            onClick={onSignup}
            className="rounded-lg bg-[#1877F2] px-5 py-2 text-[12px] font-semibold text-white shadow-[0_0_22px_rgba(24,119,242,0.35)] transition-all duration-200 hover:bg-[#166FE5] hover:shadow-[0_0_28px_rgba(24,119,242,0.55)]"
          >
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}

export default LandingNavbar;