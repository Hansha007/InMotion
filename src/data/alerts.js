export const alerts = [
  {
    id: "ALT-0021", type: "shipment", priority: "critical", status: "active", title: "Shipment Delay", entityId: "SHP-7842", entityLabel: "SHP-7842", location: "Delhi → Mumbai", description: "ETA exceeded by 1h 45m.", createdAt: "2026-09-14T14:24:00", timeLabel: "8 min ago", affectedEntity: { type: "shipment", id: "SHP-7842" }, recommendedAction: "Reassign vehicle to reduce delay.", actionLabel: "REASSIGN VEHICLE", timeline: [["14:02", "Shipment departed Delhi Hub"], ["14:18", "Unexpected route congestion detected"], ["14:24", "ETA threshold exceeded"], ["14:27", "Alert generated"]], metadata: { vehicle: "MH-2048", currentEta: "20:25", expectedEta: "18:40" },
  },
  {
    id: "ALT-0020", type: "vehicle", priority: "critical", status: "active", title: "Vehicle Breakdown", entityId: "VH-182", entityLabel: "VH-182", location: "Jaipur Hub", description: "Vehicle stopped unexpectedly.", createdAt: "2026-09-14T14:18:00", timeLabel: "14 min ago", affectedEntity: { type: "vehicle", id: "VH-182" }, recommendedAction: "Dispatch replacement vehicle.", actionLabel: "DISPATCH VEHICLE", timeline: [["13:54", "Vehicle entered Jaipur route"], ["14:10", "Speed dropped below threshold"], ["14:18", "Breakdown detected"]], metadata: { driver: "Aarav Mehta", route: "Delhi → Kolkata", eta: "20:15" },
  },
  {
    id: "ALT-0019", type: "route", priority: "high", status: "active", title: "Route Disruption", entityId: "DEL-JAI", entityLabel: "DEL → JAI", location: "Delhi → Jaipur", description: "Severe congestion detected.", createdAt: "2026-09-14T13:58:00", timeLabel: "34 min ago", affectedEntity: { type: "route", id: "delhi-jaipur" }, recommendedAction: "Review alternate route.", actionLabel: "VIEW ROUTE", timeline: [["13:32", "Traffic density increased"], ["13:48", "Route speed degraded"], ["13:58", "Disruption detected"]], metadata: { activeVehicles: "8", shipments: "31", onTime: "95.6%" },
  },
  {
    id: "ALT-0018", type: "shipment", priority: "high", status: "active", title: "SLA Risk", entityId: "SHP-7911", entityLabel: "SHP-7911", location: "Ahmedabad → Mumbai", description: "Delivery window is at risk.", createdAt: "2026-09-14T13:42:00", timeLabel: "50 min ago", affectedEntity: { type: "shipment", id: "SHP-7911" }, recommendedAction: "Prioritize shipment handling.", actionLabel: "VIEW SHIPMENT", timeline: [["13:20", "Shipment picked up"], ["13:36", "SLA buffer reduced"], ["13:42", "Delivery window at risk"]], metadata: { vehicle: "GJ-4401", currentEta: "19:10", expectedEta: "18:30" },
  },
  {
    id: "ALT-0017", type: "warehouse", priority: "medium", status: "active", title: "Warehouse Capacity", entityId: "DEL-HUB", entityLabel: "Delhi Hub", location: "Delhi", description: "Capacity reached 86%.", createdAt: "2026-09-14T13:10:00", timeLabel: "1h ago", affectedEntity: { type: "warehouse", id: "delhi-hub" }, recommendedAction: "Redirect incoming shipments.", actionLabel: "REDIRECT SHIPMENTS", timeline: [["12:30", "Capacity reached 78%"], ["12:56", "Inbound volume increased"], ["13:10", "Capacity warning raised"]], metadata: { capacity: "86%", activeShipments: "84", vehicles: "27" },
  },
  {
    id: "ALT-0016", type: "vehicle", priority: "medium", status: "active", title: "Vehicle Idle", entityId: "VH-204", entityLabel: "VH-204", location: "Mumbai Hub", description: "No movement detected for 27 minutes.", createdAt: "2026-09-14T12:40:00", timeLabel: "2h ago", affectedEntity: { type: "vehicle", id: "VH-204" }, recommendedAction: "Contact driver and verify vehicle status.", actionLabel: "VIEW VEHICLE", timeline: [["12:05", "Vehicle arrived at Mumbai Hub"], ["12:13", "Loading window opened"], ["12:40", "Idle threshold exceeded"]], metadata: { driver: "Karan Patel", route: "Mumbai → Hyderabad", eta: "17:30" },
  },
  {
    id: "ALT-0015", type: "warehouse", priority: "medium", status: "active", title: "Warehouse Offline", entityId: "KOL-HUB", entityLabel: "Kolkata Hub", location: "Kolkata", description: "Hub telemetry has not reported for 9 minutes.", createdAt: "2026-09-14T12:12:00", timeLabel: "2h ago", affectedEntity: { type: "warehouse", id: "kolkata-hub" }, recommendedAction: "Check hub connectivity.", actionLabel: "VIEW WAREHOUSE", timeline: [["11:58", "Last telemetry received"], ["12:06", "Heartbeat delayed"], ["12:12", "Warehouse marked offline"]], metadata: { capacity: "62%", activeShipments: "55", vehicles: "21" },
  },
  {
    id: "ALT-0014", type: "system", priority: "low", status: "active", title: "Temperature Warning", entityId: "SHP-7780", entityLabel: "SHP-7780", location: "Hyderabad → Bengaluru", description: "Cargo temperature moved outside preferred range.", createdAt: "2026-09-14T11:48:00", timeLabel: "3h ago", affectedEntity: { type: "shipment", id: "SHP-7780" }, recommendedAction: "Review temperature controls.", actionLabel: "VIEW SHIPMENT", timeline: [["11:30", "Temperature stable"], ["11:44", "Temperature variance detected"], ["11:48", "Warning raised"]], metadata: { vehicle: "KA-7712", currentEta: "16:55", expectedEta: "16:40" },
  },
  {
    id: "ALT-0013", type: "vehicle", priority: "low", status: "active", title: "Maintenance Due", entityId: "VH-118", entityLabel: "VH-118", location: "Bengaluru Hub", description: "Scheduled maintenance approaching.", createdAt: "2026-09-14T10:22:00", timeLabel: "4h ago", affectedEntity: { type: "vehicle", id: "VH-118" }, recommendedAction: "Schedule maintenance window.", actionLabel: "VIEW VEHICLE", timeline: [["10:00", "Maintenance threshold reached"], ["10:22", "Reminder generated"]], metadata: { driver: "Sanjay Kumar", route: "Bengaluru → Chennai", eta: "18:05" },
  },
  {
    id: "ALT-0012", type: "shipment", priority: "high", status: "acknowledged", title: "Delivery Risk", entityId: "SHP-7720", entityLabel: "SHP-7720", location: "Mumbai → Hyderabad", description: "Delivery window at risk after route slowdown.", createdAt: "2026-09-14T09:54:00", timeLabel: "5h ago", affectedEntity: { type: "shipment", id: "SHP-7720" }, recommendedAction: "Review alternate route.", actionLabel: "VIEW SHIPMENT", timeline: [["09:25", "Shipment departed Mumbai"], ["09:48", "Route slowdown detected"], ["09:54", "Risk acknowledged"]], metadata: { vehicle: "KA-7712", currentEta: "18:20", expectedEta: "17:45" },
  },
  {
    id: "ALT-0011", type: "route", priority: "medium", status: "resolved", title: "Route Congestion", entityId: "MUM-HYD", entityLabel: "MUM → HYD", location: "Mumbai → Hyderabad", description: "Congestion cleared and route normalized.", createdAt: "2026-09-14T09:20:00", timeLabel: "6h ago", affectedEntity: { type: "route", id: "mumbai-hyderabad" }, recommendedAction: "Continue monitoring route.", actionLabel: "VIEW ROUTE", timeline: [["08:42", "Congestion detected"], ["09:02", "Alternate routing applied"], ["09:20", "Route resolved"]], metadata: { activeVehicles: "13", shipments: "44", onTime: "94.8%" },
  },
  {
    id: "ALT-0010", type: "warehouse", priority: "low", status: "resolved", title: "Capacity Warning", entityId: "BOM-HUB", entityLabel: "Mumbai Hub", location: "Mumbai", description: "Inbound volume returned to normal.", createdAt: "2026-09-14T08:40:00", timeLabel: "7h ago", affectedEntity: { type: "warehouse", id: "mumbai-hub" }, recommendedAction: "Continue monitoring capacity.", actionLabel: "VIEW WAREHOUSE", timeline: [["08:12", "Capacity reached 82%"], ["08:40", "Capacity normalized"]], metadata: { capacity: "68%", activeShipments: "68", vehicles: "22" },
  },
  {
    id: "ALT-0009", type: "system", priority: "low", status: "resolved", title: "Tracking Delay", entityId: "SHP-7601", entityLabel: "SHP-7601", location: "Delhi → Jaipur", description: "Tracking signal restored.", createdAt: "2026-09-14T08:15:00", timeLabel: "8h ago", affectedEntity: { type: "shipment", id: "SHP-7601" }, recommendedAction: "Continue monitoring shipment.", actionLabel: "VIEW SHIPMENT", timeline: [["07:58", "Signal interrupted"], ["08:15", "Tracking restored"]], metadata: { vehicle: "RJ-182", currentEta: "15:40", expectedEta: "15:40" },
  },
  {
    id: "ALT-0008", type: "vehicle", priority: "medium", status: "resolved", title: "Fuel Level Low", entityId: "MH-1980", entityLabel: "MH-1980", location: "Ahmedabad Hub", description: "Fuel level returned to operating range.", createdAt: "2026-09-14T07:30:00", timeLabel: "9h ago", affectedEntity: { type: "vehicle", id: "MH-1980" }, recommendedAction: "Continue monitoring vehicle.", actionLabel: "VIEW VEHICLE", timeline: [["07:12", "Fuel level low"], ["07:30", "Refuel confirmed"]], metadata: { driver: "Rohan Shah", route: "Ahmedabad → Mumbai", eta: "14:50" },
  },
  {
    id: "ALT-0007", type: "route", priority: "high", status: "resolved", title: "Route Disruption", entityId: "DEL-KOL", entityLabel: "DEL → KOL", location: "Delhi → Kolkata", description: "Route reopened after congestion cleared.", createdAt: "2026-09-14T06:48:00", timeLabel: "10h ago", affectedEntity: { type: "route", id: "delhi-kolkata" }, recommendedAction: "Continue monitoring route.", actionLabel: "VIEW ROUTE", timeline: [["06:12", "Congestion detected"], ["06:48", "Route reopened"]], metadata: { activeVehicles: "14", shipments: "48", onTime: "89.4%" },
  },
];

export const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
