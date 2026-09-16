import { Link } from "react-router-dom";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Network", to: "/app/network" },
  { label: "Control Center", to: "/app/dashboard" },
  { label: "Analytics", to: "/app/analytics" },
  { label: "About", to: "/#about" },
];

const product = [
  { label: "Dashboard", to: "/app/dashboard" },
  { label: "Shipments", to: "/app/shipments" },
  { label: "Fleet", to: "/app/fleet" },
  { label: "Warehouses", to: "/app/warehouses" },
  { label: "Routes", to: "/app/network/routes" },
];

const support = [
  { label: "Alerts", to: "/app/alerts" },
  { label: "Notifications", to: "/app/notifications" },
  { label: "Settings", to: "/app/settings" },
];

function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6F8297]">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-[13px] text-[#9AAABD] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-[#18304A] bg-[#020812]">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-12">
        <div className="relative overflow-hidden border-b border-[#18304A] py-14 text-center lg:py-16">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2196F3]/[0.05] blur-[90px]" />
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
            LOGISTICS, IN MOTION.
          </p>
          <p className="relative mx-auto mt-4 max-w-[680px] text-[21px] font-medium leading-[1.35] tracking-[-0.02em] text-white sm:text-[26px]">
            Connected operations. Clear decisions. Better outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-14">
          <div className="lg:col-span-5">
            <p className="text-[17px] font-bold tracking-[0.14em] text-white">INMOTION</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">
              LOGISTICS CONTROL
            </p>
            <p className="mt-6 max-w-[240px] text-[13px] leading-6 text-[#7F91A5]">
              Keep the world in motion.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:col-span-1 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <FooterLinks title="Navigation" links={navigation} />
            <FooterLinks title="Product" links={product} />
            <FooterLinks title="Support" links={support} />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#18304A] py-5 text-[11px] text-[#53677D] sm:flex-row sm:items-center sm:justify-between">
          <span>INMOTION CONTROL CENTER</span>
          <span>Connected operations, made visible.</span>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
