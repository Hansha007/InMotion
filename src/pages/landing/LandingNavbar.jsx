import { Link, NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Network", path: "/app/network" },
  { name: "Control Center", path: "/app/dashboard" },
  { name: "Analytics", path: "/app/analytics" },
  { name: "About", path: "#" },
];

function LandingNavbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#020812]/40 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center text-2xl font-bold text-[#2196F3]">
            X
          </div>

          <div>
            <p className="text-[17px] font-bold tracking-[0.08em] text-[#F5F7FA]">
              INMOTION
            </p>

            <p className="text-[8px] tracking-[0.18em] text-[#6F7D8E]">
              LOGISTICS CONTROL
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                [
                  "relative py-2 text-[13px] font-medium transition-colors duration-200",
                  isActive
                    ? "text-[#F5F7FA]"
                    : "text-[#A7B3C2] hover:text-[#F5F7FA]",
                ].join(" ")
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          
          {/* Network status */}
          <div className="mr-2 hidden items-center gap-2 xl:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />

            <span className="text-[11px] font-medium text-[#A7B3C2]">
              Network Live
            </span>
          </div>

          {/* Login */}
          <Link
            to="/login"
            className="rounded-lg border border-[#18304A] bg-transparent px-5 py-2.5 text-[12px] font-medium text-[#F5F7FA] transition-all duration-200 hover:border-[#2196F3]/60 hover:bg-[#0B1728]"
          >
            Login
          </Link>

          {/* Get Started */}
          <Link
            to="/login"
            className="rounded-lg bg-[#2196F3] px-5 py-2.5 text-[12px] font-semibold text-white shadow-[0_0_24px_rgba(33,150,243,0.18)] transition-all duration-200 hover:bg-[#1E88E5] hover:shadow-[0_0_30px_rgba(33,150,243,0.28)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;