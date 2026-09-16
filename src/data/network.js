export const networkSummary = [
  { label: "Shipments", value: "1,284", tone: "text-white" },
  { label: "Vehicles", value: "428", tone: "text-white" },
  { label: "Warehouses", value: "36", tone: "text-white" },
  { label: "Alerts", value: "21", tone: "text-[#F87171]" },
];

export const warehouses = [
  { id: "delhi-hub", name: "Delhi Hub", city: "Delhi", coordinates: [28.6139, 77.2090], status: "healthy", activeShipments: 84, vehicles: 27, onTimeRate: "96.4%", alerts: 3 },
  { id: "jaipur-hub", name: "Jaipur Hub", city: "Jaipur", coordinates: [26.9124, 75.7873], status: "active", activeShipments: 52, vehicles: 19, onTimeRate: "94.8%", alerts: 1 },
  { id: "ahmedabad-hub", name: "Ahmedabad Hub", city: "Ahmedabad", coordinates: [23.0225, 72.5714], status: "healthy", activeShipments: 47, vehicles: 16, onTimeRate: "95.7%", alerts: 0 },
  { id: "mumbai-hub", name: "Mumbai Hub", city: "Mumbai", coordinates: [19.0760, 72.8777], status: "warning", activeShipments: 68, vehicles: 22, onTimeRate: "91.2%", alerts: 4 },
  { id: "hyderabad-hub", name: "Hyderabad Hub", city: "Hyderabad", coordinates: [17.3850, 78.4867], status: "healthy", activeShipments: 39, vehicles: 15, onTimeRate: "95.1%", alerts: 1 },
  { id: "bengaluru-hub", name: "Bengaluru Hub", city: "Bengaluru", coordinates: [12.9716, 77.5946], status: "active", activeShipments: 43, vehicles: 18, onTimeRate: "94.6%", alerts: 1 },
  { id: "chennai-hub", name: "Chennai Hub", city: "Chennai", coordinates: [13.0827, 80.2707], status: "healthy", activeShipments: 41, vehicles: 17, onTimeRate: "96.1%", alerts: 0 },
  { id: "kolkata-hub", name: "Kolkata Hub", city: "Kolkata", coordinates: [22.5726, 88.3639], status: "critical", activeShipments: 55, vehicles: 21, onTimeRate: "87.9%", alerts: 6 },
];

export const routes = [
  { id: "delhi-jaipur", name: "Delhi → Jaipur", origin: "Delhi", destination: "Jaipur", status: "active", distance: "280 km", activeVehicles: 8, shipments: 31, onTimeRate: "95.6%", atRisk: 1 },
  { id: "delhi-kolkata", name: "Delhi → Kolkata", origin: "Delhi", destination: "Kolkata", status: "warning", distance: "1,530 km", activeVehicles: 14, shipments: 48, onTimeRate: "89.4%", atRisk: 6 },
  { id: "delhi-ahmedabad", name: "Delhi → Ahmedabad", origin: "Delhi", destination: "Ahmedabad", status: "active", distance: "940 km", activeVehicles: 11, shipments: 42, onTimeRate: "94.6%", atRisk: 1 },
  { id: "ahmedabad-mumbai", name: "Ahmedabad → Mumbai", origin: "Ahmedabad", destination: "Mumbai", status: "healthy", distance: "530 km", activeVehicles: 10, shipments: 35, onTimeRate: "96.2%", atRisk: 1 },
  { id: "mumbai-hyderabad", name: "Mumbai → Hyderabad", origin: "Mumbai", destination: "Hyderabad", status: "active", distance: "710 km", activeVehicles: 13, shipments: 44, onTimeRate: "94.8%", atRisk: 2 },
  { id: "hyderabad-bengaluru", name: "Hyderabad → Bengaluru", origin: "Hyderabad", destination: "Bengaluru", status: "healthy", distance: "570 km", activeVehicles: 9, shipments: 32, onTimeRate: "96.6%", atRisk: 1 },
  { id: "bengaluru-chennai", name: "Bengaluru → Chennai", origin: "Bengaluru", destination: "Chennai", status: "healthy", distance: "350 km", activeVehicles: 9, shipments: 29, onTimeRate: "97.1%", atRisk: 1 },
  { id: "delhi-mumbai", name: "Delhi → Mumbai", origin: "Delhi", destination: "Mumbai", status: "critical", distance: "1,420 km", activeVehicles: 18, shipments: 64, onTimeRate: "91.2%", atRisk: 4 },
];

export const vehicles = [
  { id: "MH-2048", registration: "MH-2048", driver: "Rahul Sharma", status: "In Transit", routeId: "delhi-mumbai", shipmentId: "SHP-2048", eta: "18:40", progress: 0.58 },
  { id: "RJ-182", registration: "RJ-182", driver: "Aarav Mehta", status: "In Transit", routeId: "delhi-kolkata", shipmentId: "SHP-0182", eta: "20:15", progress: 0.62 },
  { id: "KA-7712", registration: "KA-7712", driver: "Nisha Rao", status: "In Transit", routeId: "mumbai-hyderabad", shipmentId: "SHP-7712", eta: "16:55", progress: 0.48 },
  { id: "GJ-4401", registration: "GJ-4401", driver: "Vikram Singh", status: "Delayed", routeId: "delhi-ahmedabad", shipmentId: "SHP-4401", eta: "22:10", progress: 0.64 },
];

export const shipments = [
  { id: "SHP-2048", name: "Delhi → Mumbai", status: "In Transit", vehicleId: "MH-2048", eta: "18:40", routeId: "delhi-mumbai", progress: 0.62 },
  { id: "SHP-7842", name: "Delhi → Mumbai", status: "Delayed", vehicleId: "MH-2048", eta: "+1h 45m", routeId: "delhi-mumbai", progress: 0.76 },
  { id: "SHP-0182", name: "Delhi → Kolkata", status: "In Transit", vehicleId: "RJ-182", eta: "20:15", routeId: "delhi-kolkata", progress: 0.68 },
  { id: "SHP-7712", name: "Mumbai → Bengaluru", status: "In Transit", vehicleId: "KA-7712", eta: "16:55", routeId: "mumbai-hyderabad", progress: 0.54 },
];

export const networkActivity = [
  { id: "activity-1", object: "SHP-2048", location: "Delhi → Mumbai", event: "Vehicle reassigned", time: "2 min ago", tone: "blue" },
  { id: "activity-2", object: "VH-182", location: "Jaipur Hub", event: "Entered route", time: "4 min ago", tone: "green" },
  { id: "activity-3", object: "SHP-7842", location: "Delhi → Mumbai", event: "ETA delayed by 1h 45m", time: "8 min ago", tone: "red" },
];

export const networkTimeline = {
  start: Date.parse("2026-09-14T18:00:00"),
  end: Date.parse("2026-09-14T21:42:00"),
};

export const networkEvents = [
  { id: "event-vehicle", timestamp: Date.parse("2026-09-14T20:10:00"), type: "vehicle", entityId: "VH-182", title: "Vehicle reassigned", description: "VH-182 entered the Jaipur route.", location: "Jaipur Hub" },
  { id: "event-shipment", timestamp: Date.parse("2026-09-14T20:38:00"), type: "shipment", entityId: "SHP-7842", title: "Shipment delayed", description: "ETA delayed by 1h 45m.", location: "Delhi → Mumbai" },
  { id: "event-route", timestamp: Date.parse("2026-09-14T21:05:00"), type: "route", entityId: "delhi-mumbai", title: "Route congestion detected", description: "Traffic conditions increased risk on the route.", location: "Delhi → Mumbai" },
  { id: "event-reassign", timestamp: Date.parse("2026-09-14T21:18:00"), type: "vehicle", entityId: "MH-2048", title: "Vehicle reassigned", description: "MH-2048 was reassigned to protect delivery time.", location: "Delhi → Mumbai" },
];

export const vehicleHistory = {
  "MH-2048": [
    { timestamp: Date.parse("2026-09-14T18:00:00"), progress: 0.28, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T20:10:00"), progress: 0.46, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T21:42:00"), progress: 0.58, status: "In Transit" },
  ],
  "RJ-182": [
    { timestamp: Date.parse("2026-09-14T18:00:00"), progress: 0.35, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T20:10:00"), progress: 0.52, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T21:42:00"), progress: 0.62, status: "In Transit" },
  ],
  "KA-7712": [
    { timestamp: Date.parse("2026-09-14T18:00:00"), progress: 0.29, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T20:10:00"), progress: 0.41, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T21:42:00"), progress: 0.48, status: "In Transit" },
  ],
  "GJ-4401": [
    { timestamp: Date.parse("2026-09-14T18:00:00"), progress: 0.43, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T20:10:00"), progress: 0.57, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T21:42:00"), progress: 0.64, status: "Delayed" },
  ],
};

export const shipmentHistory = {
  "SHP-2048": [
    { timestamp: Date.parse("2026-09-14T18:00:00"), progress: 0.38, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T21:42:00"), progress: 0.62, status: "In Transit" },
  ],
  "SHP-7842": [
    { timestamp: Date.parse("2026-09-14T18:00:00"), progress: 0.52, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T20:38:00"), progress: 0.68, status: "Delayed" },
    { timestamp: Date.parse("2026-09-14T21:42:00"), progress: 0.76, status: "Delayed" },
  ],
  "SHP-0182": [
    { timestamp: Date.parse("2026-09-14T18:00:00"), progress: 0.4, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T21:42:00"), progress: 0.68, status: "In Transit" },
  ],
  "SHP-7712": [
    { timestamp: Date.parse("2026-09-14T18:00:00"), progress: 0.35, status: "In Transit" },
    { timestamp: Date.parse("2026-09-14T21:42:00"), progress: 0.54, status: "In Transit" },
  ],
};

const historicalMetrics = [
  { timestamp: networkTimeline.start, activeRoutes: 82, activeVehicles: 324, inTransit: 790, alerts: 12, health: "95.6%" },
  { timestamp: Date.parse("2026-09-14T20:10:00"), activeRoutes: 84, activeVehicles: 318, inTransit: 821, alerts: 18, health: "95.1%" },
  { timestamp: Date.parse("2026-09-14T20:38:00"), activeRoutes: 84, activeVehicles: 316, inTransit: 829, alerts: 19, health: "94.8%" },
  { timestamp: Date.parse("2026-09-14T21:05:00"), activeRoutes: 85, activeVehicles: 314, inTransit: 840, alerts: 20, health: "94.5%" },
  { timestamp: networkTimeline.end, activeRoutes: 86, activeVehicles: 312, inTransit: 847, alerts: 21, health: "94.2%" },
];

function stateAt(history, timestamp) {
  return history.reduce((current, entry) => (entry.timestamp <= timestamp ? entry : current), history[0]);
}

export function getNetworkSnapshot(timestamp) {
  const metrics = historicalMetrics.reduce((current, entry) => (entry.timestamp <= timestamp ? entry : current), historicalMetrics[0]);
  const historicalVehicles = vehicles.map((vehicle) => ({ ...vehicle, ...stateAt(vehicleHistory[vehicle.id], timestamp) }));
  const historicalShipments = shipments.map((shipment) => ({ ...shipment, ...stateAt(shipmentHistory[shipment.id], timestamp) }));
  const historicalRoutes = routes.map((route) => ({ ...route, status: route.id === "delhi-mumbai" && timestamp < Date.parse("2026-09-14T21:05:00") ? "healthy" : route.status }));
  const activity = networkEvents.filter((event) => event.timestamp <= timestamp).map((event) => ({ id: event.id, object: event.entityId, location: event.location, event: event.title, time: `${Math.max(1, Math.round((timestamp - event.timestamp) / 60000))} min ago`, tone: event.type === "shipment" ? "red" : event.type === "route" ? "yellow" : "blue" }));
  return { metrics, vehicles: historicalVehicles, shipments: historicalShipments, routes: historicalRoutes, activity };
}
