import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItems = [
    {
      section: "MAIN",
      items: [
        { name: "Overview", path: "/app/dashboard" },
        { name: "Network", path: "/app/network" },
      ],
    },
    {
      section: "OPERATIONS",
      items: [
        { name: "Shipments", path: "/app/shipments" },
        { name: "Fleet", path: "/app/fleet" },
        { name: "Warehouses", path: "/app/warehouses" },
      ],
    },
    {
      section: "CONTROL",
      items: [
        { name: "Alerts", path: "/app/alerts" },
        { name: "Actions", path: "/app/actions" },
        { name: "Monitoring", path: "/app/monitoring" },
      ],
    },
    {
      section: "INSIGHTS",
      items: [
        { name: "Analytics", path: "/app/analytics" },
      ],
    },
    {
      section: "SYSTEM",
      items: [
        { name: "Notifications", path: "/app/notifications" },
        { name: "Settings", path: "/app/settings" },
      ],
    },
  ];

  return (
    <aside>
      <h2>IN MOTION</h2>

      <nav>
        {navItems.map((section) => (
          <div key={section.section}>
            <p>{section.section}</p>

            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;