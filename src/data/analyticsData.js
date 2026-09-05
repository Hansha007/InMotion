/**
 * IN MOTION — Logistics Control & Intelligence Platform
 * Mock Logistics Data & Calculations Engine
 * Dark Charcoal + Soft Lime-Green (#9BEF35)
 */

// Master Shipments Dataset
export const mockShipments = [
  { id: "SHP-8801", tracking: "INM-98214", origin: "Delhi Central Hub", destination: "Jaipur Logistics Park", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 5.2, etaAccuracy: 98, weightKg: 1250, date: "2026-03-01" },
  { id: "SHP-8802", tracking: "INM-98215", origin: "Mumbai Gateway", destination: "Pune Metro Hub", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 3.1, etaAccuracy: 95, weightKg: 850, date: "2026-03-01" },
  { id: "SHP-8803", tracking: "INM-98216", origin: "Bengaluru South", destination: "Chennai Port Depot", status: "Delayed", onTime: false, delayMinutes: 48, deliveryHours: 7.8, etaAccuracy: 78, weightKg: 2400, date: "2026-03-01" },
  { id: "SHP-8804", tracking: "INM-98217", origin: "Hyderabad Air Hub", destination: "Nagpur Express Terminal", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 6.4, etaAccuracy: 94, weightKg: 1100, date: "2026-03-02" },
  { id: "SHP-8805", tracking: "INM-98218", origin: "Kolkata River Hub", destination: "Patna Cargo Depo", status: "Delayed", onTime: false, delayMinutes: 72, deliveryHours: 9.1, etaAccuracy: 72, weightKg: 3100, date: "2026-03-02" },
  { id: "SHP-8806", tracking: "INM-98219", origin: "Ahmedabad Western", destination: "Surat Commercial Hub", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 4.2, etaAccuracy: 96, weightKg: 940, date: "2026-03-02" },
  { id: "SHP-8807", tracking: "INM-98220", origin: "Delhi Central Hub", destination: "Chandigarh Depot", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 4.5, etaAccuracy: 97, weightKg: 1400, date: "2026-03-03" },
  { id: "SHP-8808", tracking: "INM-98221", origin: "Mumbai Gateway", destination: "Goa Logistics Node", status: "Delayed", onTime: false, delayMinutes: 35, deliveryHours: 8.0, etaAccuracy: 81, weightKg: 1800, date: "2026-03-03" },
  { id: "SHP-8809", tracking: "INM-98222", origin: "Bengaluru South", destination: "Kochi Marine Depo", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 7.2, etaAccuracy: 92, weightKg: 2200, date: "2026-03-03" },
  { id: "SHP-8810", tracking: "INM-98223", origin: "Lucknow Regional", destination: "Varanasi Depot", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 5.0, etaAccuracy: 93, weightKg: 780, date: "2026-03-04" },
  { id: "SHP-8811", tracking: "INM-98224", origin: "Indore Central", destination: "Bhopal Terminal", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 3.8, etaAccuracy: 99, weightKg: 620, date: "2026-03-04" },
  { id: "SHP-8812", tracking: "INM-98225", origin: "Delhi Central Hub", destination: "Agra Logistics Hub", status: "Delayed", onTime: false, delayMinutes: 25, deliveryHours: 4.8, etaAccuracy: 84, weightKg: 1550, date: "2026-03-04" },
  { id: "SHP-8813", tracking: "INM-98226", origin: "Chennai Port Depot", destination: "Coimbatore Depot", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 6.9, etaAccuracy: 91, weightKg: 1950, date: "2026-03-05" },
  { id: "SHP-8814", tracking: "INM-98227", origin: "Hyderabad Air Hub", destination: "Vijayawada Hub", status: "Delivered", onTime: true, delayMinutes: 0, deliveryHours: 4.7, etaAccuracy: 95, weightKg: 1300, date: "2026-03-05" }
];

// Master Fleet Vehicles Dataset
export const mockFleet = [
  { vehicleId: "VH-101", model: "Volvo FH16", type: "Heavy Truck", status: "Active", fuel: 84, distance: 540, utilization: 91, driver: "Vikram Malhotra", maintenance: "Optimal" },
  { vehicleId: "VH-102", model: "Tata Prima 5530", type: "Heavy Truck", status: "Active", fuel: 72, distance: 420, utilization: 86, driver: "Harpreet Singh", maintenance: "Optimal" },
  { vehicleId: "VH-103", model: "Eicher Pro 6028", type: "Medium Cargo", status: "Active", fuel: 65, distance: 380, utilization: 82, driver: "Ramesh Pawar", maintenance: "Optimal" },
  { vehicleId: "VH-104", model: "Tata Ultra EV", type: "Electric Van", status: "Active", fuel: 92, distance: 290, utilization: 94, driver: "Arun Nair", maintenance: "Optimal" },
  { vehicleId: "VH-105", model: "Mahindra Blazo X", type: "Heavy Truck", status: "Idle", fuel: 45, distance: 110, utilization: 32, driver: "Standby Depot 2", maintenance: "Scheduled" },
  { vehicleId: "VH-106", model: "Ashok Leyland Captain", type: "Heavy Truck", status: "Maintenance", fuel: 18, distance: 40, utilization: 0, driver: "Service Center", maintenance: "Critical" },
  { vehicleId: "VH-107", model: "Eicher Pro 2049", type: "Light Delivery", status: "Active", fuel: 79, distance: 340, utilization: 88, driver: "Mohd. Tariq", maintenance: "Optimal" },
  { vehicleId: "VH-108", model: "Tata Ace EV", type: "Electric Van", status: "Active", fuel: 88, distance: 260, utilization: 89, driver: "Sunil Verma", maintenance: "Optimal" },
  { vehicleId: "VH-109", model: "BharatBenz 3528", type: "Heavy Truck", status: "Active", fuel: 61, distance: 490, utilization: 84, driver: "Sanjay Joshi", maintenance: "Optimal" },
  { vehicleId: "VH-110", model: "Mahindra Furio 14", type: "Medium Cargo", status: "Idle", fuel: 52, distance: 80, utilization: 25, driver: "Standby Depot 1", maintenance: "Scheduled" },
  { vehicleId: "VH-111", model: "Ashok Leyland Dost", type: "Light Delivery", status: "Active", fuel: 76, distance: 310, utilization: 85, driver: "Amit Das", maintenance: "Optimal" },
  { vehicleId: "VH-112", model: "Volvo FMX 460", type: "Heavy Truck", status: "Maintenance", fuel: 24, distance: 0, utilization: 0, driver: "Tech Bay B", maintenance: "Critical" }
];

// Master Routes Dataset
export const mockRoutes = [
  { routeId: "R-101", origin: "Delhi Hub", destination: "Jaipur Express", distance: 280, averageDelay: 14, health: "Good", speedKmH: 64, onTimeRate: 95.5, activeTrucks: 8 },
  { routeId: "R-102", origin: "Mumbai Gateway", destination: "Pune Expressway", distance: 150, averageDelay: 12, health: "Good", speedKmH: 68, onTimeRate: 96.2, activeTrucks: 14 },
  { routeId: "R-103", origin: "Bengaluru South", destination: "Chennai Highway", distance: 345, averageDelay: 42, health: "Critical", speedKmH: 48, onTimeRate: 74.0, activeTrucks: 11 },
  { routeId: "R-104", origin: "Delhi Central", destination: "Chandigarh Corridor", distance: 245, averageDelay: 18, health: "Good", speedKmH: 62, onTimeRate: 93.8, activeTrucks: 9 },
  { routeId: "R-105", origin: "Ahmedabad West", destination: "Surat Coastal", distance: 260, averageDelay: 16, health: "Good", speedKmH: 66, onTimeRate: 94.6, activeTrucks: 7 },
  { routeId: "R-106", origin: "Kolkata River", destination: "Patna Highway", distance: 580, averageDelay: 68, health: "Critical", speedKmH: 42, onTimeRate: 68.4, activeTrucks: 6 },
  { routeId: "R-107", origin: "Hyderabad Central", destination: "Nagpur Line", distance: 500, averageDelay: 28, health: "Fair", speedKmH: 58, onTimeRate: 88.0, activeTrucks: 8 },
  { routeId: "R-108", origin: "Indore Depot", destination: "Bhopal Link", distance: 195, averageDelay: 11, health: "Good", speedKmH: 70, onTimeRate: 97.4, activeTrucks: 5 }
];

// Master Warehouses Dataset
export const mockWarehouses = [
  { warehouseId: "DEL-01", name: "Delhi Central Hub", capacity: 15000, inventory: 13800, utilization: 92.0, incoming: 480, outgoing: 430, efficiency: 94.2, status: "Critical" },
  { warehouseId: "MUM-02", name: "Mumbai Gateway Terminal", capacity: 22000, inventory: 18260, utilization: 83.0, incoming: 620, outgoing: 590, efficiency: 96.0, status: "Good" },
  { warehouseId: "BLR-03", name: "Bengaluru South Hub", capacity: 18000, inventory: 14760, utilization: 82.0, incoming: 510, outgoing: 470, efficiency: 93.8, status: "Good" },
  { warehouseId: "HYD-04", name: "Hyderabad Air Terminal", capacity: 12000, inventory: 8880, utilization: 74.0, incoming: 310, outgoing: 305, efficiency: 95.1, status: "Good" },
  { warehouseId: "CCU-05", name: "Kolkata Logistics Yard", capacity: 14000, inventory: 12460, utilization: 89.0, incoming: 390, outgoing: 310, efficiency: 86.4, status: "Warning" },
  { warehouseId: "AMD-06", name: "Ahmedabad Industrial Park", capacity: 10000, inventory: 7800, utilization: 78.0, incoming: 280, outgoing: 275, efficiency: 92.5, status: "Good" },
  { warehouseId: "MAA-07", name: "Chennai Port Facility", capacity: 16000, inventory: 13920, utilization: 87.0, incoming: 440, outgoing: 410, efficiency: 90.1, status: "Warning" }
];

// Time Series Data
export const timeSeriesData = {
  today: {
    deliveryTrend: [
      { timestamp: "04:00", delivered: 42, onTime: 40, delayed: 2, volume: 42 },
      { timestamp: "08:00", delivered: 98, onTime: 92, delayed: 6, volume: 98 },
      { timestamp: "12:00", delivered: 165, onTime: 153, delayed: 12, volume: 165 },
      { timestamp: "16:00", delivered: 142, onTime: 135, delayed: 7, volume: 142 },
      { timestamp: "20:00", delivered: 110, onTime: 106, delayed: 4, volume: 110 },
      { timestamp: "24:00", delivered: 64, onTime: 62, delayed: 2, volume: 64 }
    ],
    deliveryStatus: [
      { timestamp: "04:00", delivered: 42, inTransit: 140, delayed: 2 },
      { timestamp: "08:00", delivered: 98, inTransit: 260, delayed: 6 },
      { timestamp: "12:00", delivered: 165, inTransit: 310, delayed: 12 },
      { timestamp: "16:00", delivered: 142, inTransit: 280, delayed: 7 },
      { timestamp: "20:00", delivered: 110, inTransit: 190, delayed: 4 },
      { timestamp: "24:00", delivered: 64, inTransit: 120, delayed: 2 }
    ],
    fleetUtilization: [
      { timestamp: "04:00", rate: 58, active: 7, idle: 3, maintenance: 2 },
      { timestamp: "08:00", rate: 82, active: 10, idle: 0, maintenance: 2 },
      { timestamp: "12:00", rate: 89, active: 10, idle: 0, maintenance: 2 },
      { timestamp: "16:00", rate: 84, active: 9, idle: 1, maintenance: 2 },
      { timestamp: "20:00", rate: 76, active: 8, idle: 2, maintenance: 2 },
      { timestamp: "24:00", rate: 64, active: 7, idle: 3, maintenance: 2 }
    ],
    distanceTravelled: [
      { timestamp: "04:00", distance: 480 },
      { timestamp: "08:00", distance: 1420 },
      { timestamp: "12:00", distance: 2840 },
      { timestamp: "16:00", distance: 2310 },
      { timestamp: "20:00", distance: 1640 },
      { timestamp: "24:00", distance: 920 }
    ],
    routeDelayTrend: [
      { timestamp: "04:00", delayMinutes: 12 },
      { timestamp: "08:00", delayMinutes: 28 },
      { timestamp: "12:00", delayMinutes: 24 },
      { timestamp: "16:00", delayMinutes: 32 },
      { timestamp: "20:00", delayMinutes: 18 },
      { timestamp: "24:00", delayMinutes: 10 }
    ],
    warehouseInventory: [
      { timestamp: "04:00", inventory: 89400, capacity: 107000 },
      { timestamp: "08:00", inventory: 90200, capacity: 107000 },
      { timestamp: "12:00", inventory: 92100, capacity: 107000 },
      { timestamp: "16:00", inventory: 91400, capacity: 107000 },
      { timestamp: "20:00", inventory: 89900, capacity: 107000 },
      { timestamp: "24:00", inventory: 88700, capacity: 107000 }
    ],
    warehouseFlow: [
      { timestamp: "04:00", incoming: 120, outgoing: 90 },
      { timestamp: "08:00", incoming: 480, outgoing: 390 },
      { timestamp: "12:00", incoming: 760, outgoing: 680 },
      { timestamp: "16:00", incoming: 620, outgoing: 610 },
      { timestamp: "20:00", incoming: 410, outgoing: 450 },
      { timestamp: "24:00", incoming: 220, outgoing: 240 }
    ],
    performanceTrend: [
      { timestamp: "04:00", score: 94.8, delivery: 96, fleet: 91, warehouse: 93 },
      { timestamp: "08:00", score: 91.2, delivery: 92, fleet: 89, warehouse: 90 },
      { timestamp: "12:00", score: 92.6, delivery: 94, fleet: 93, warehouse: 91 },
      { timestamp: "16:00", score: 93.4, delivery: 95, fleet: 92, warehouse: 92 },
      { timestamp: "20:00", score: 94.0, delivery: 95, fleet: 90, warehouse: 94 },
      { timestamp: "24:00", score: 95.1, delivery: 97, fleet: 92, warehouse: 95 }
    ]
  },
  "7days": {
    deliveryTrend: [
      { timestamp: "Mon", delivered: 320, onTime: 302, delayed: 18, volume: 320 },
      { timestamp: "Tue", delivered: 350, onTime: 334, delayed: 16, volume: 350 },
      { timestamp: "Wed", delivered: 382, onTime: 360, delayed: 22, volume: 382 },
      { timestamp: "Thu", delivered: 410, onTime: 388, delayed: 22, volume: 410 },
      { timestamp: "Fri", delivered: 440, onTime: 414, delayed: 26, volume: 440 },
      { timestamp: "Sat", delivered: 390, onTime: 372, delayed: 18, volume: 390 },
      { timestamp: "Sun", delivered: 280, onTime: 271, delayed: 9, volume: 280 }
    ],
    deliveryStatus: [
      { timestamp: "Mon", delivered: 320, inTransit: 140, delayed: 18 },
      { timestamp: "Tue", delivered: 350, inTransit: 160, delayed: 16 },
      { timestamp: "Wed", delivered: 382, inTransit: 190, delayed: 22 },
      { timestamp: "Thu", delivered: 410, inTransit: 210, delayed: 22 },
      { timestamp: "Fri", delivered: 440, inTransit: 230, delayed: 26 },
      { timestamp: "Sat", delivered: 390, inTransit: 180, delayed: 18 },
      { timestamp: "Sun", delivered: 280, inTransit: 110, delayed: 9 }
    ],
    fleetUtilization: [
      { timestamp: "Mon", rate: 81.2, active: 10, idle: 1, maintenance: 1 },
      { timestamp: "Tue", rate: 83.5, active: 10, idle: 1, maintenance: 1 },
      { timestamp: "Wed", rate: 86.0, active: 11, idle: 0, maintenance: 1 },
      { timestamp: "Thu", rate: 84.8, active: 10, idle: 1, maintenance: 1 },
      { timestamp: "Fri", rate: 88.4, active: 11, idle: 0, maintenance: 1 },
      { timestamp: "Sat", rate: 79.2, active: 9, idle: 2, maintenance: 1 },
      { timestamp: "Sun", rate: 68.5, active: 8, idle: 3, maintenance: 1 }
    ],
    distanceTravelled: [
      { timestamp: "Mon", distance: 4120 },
      { timestamp: "Tue", distance: 4580 },
      { timestamp: "Wed", distance: 4890 },
      { timestamp: "Thu", distance: 5120 },
      { timestamp: "Fri", distance: 5460 },
      { timestamp: "Sat", distance: 4620 },
      { timestamp: "Sun", distance: 3410 }
    ],
    routeDelayTrend: [
      { timestamp: "Mon", delayMinutes: 21 },
      { timestamp: "Tue", delayMinutes: 19 },
      { timestamp: "Wed", delayMinutes: 25 },
      { timestamp: "Thu", delayMinutes: 22 },
      { timestamp: "Fri", delayMinutes: 28 },
      { timestamp: "Sat", delayMinutes: 18 },
      { timestamp: "Sun", delayMinutes: 14 }
    ],
    warehouseInventory: [
      { timestamp: "Mon", inventory: 86500, capacity: 107000 },
      { timestamp: "Tue", inventory: 88200, capacity: 107000 },
      { timestamp: "Wed", inventory: 91400, capacity: 107000 },
      { timestamp: "Thu", inventory: 93800, capacity: 107000 },
      { timestamp: "Fri", inventory: 94600, capacity: 107000 },
      { timestamp: "Sat", inventory: 90200, capacity: 107000 },
      { timestamp: "Sun", inventory: 87800, capacity: 107000 }
    ],
    warehouseFlow: [
      { timestamp: "Mon", incoming: 2200, outgoing: 1980 },
      { timestamp: "Tue", incoming: 2450, outgoing: 2310 },
      { timestamp: "Wed", incoming: 2890, outgoing: 2640 },
      { timestamp: "Thu", incoming: 2940, outgoing: 2820 },
      { timestamp: "Fri", incoming: 3120, outgoing: 2990 },
      { timestamp: "Sat", incoming: 2340, outgoing: 2450 },
      { timestamp: "Sun", incoming: 1720, outgoing: 1910 }
    ],
    performanceTrend: [
      { timestamp: "Mon", score: 92.4, delivery: 94, fleet: 81, warehouse: 86 },
      { timestamp: "Tue", score: 93.1, delivery: 95, fleet: 83, warehouse: 87 },
      { timestamp: "Wed", score: 91.8, delivery: 93, fleet: 86, warehouse: 89 },
      { timestamp: "Thu", score: 93.5, delivery: 94, fleet: 85, warehouse: 90 },
      { timestamp: "Fri", score: 92.9, delivery: 93, fleet: 88, warehouse: 91 },
      { timestamp: "Sat", score: 94.2, delivery: 95, fleet: 79, warehouse: 88 },
      { timestamp: "Sun", score: 95.6, delivery: 97, fleet: 69, warehouse: 86 }
    ]
  },
  "30days": {
    deliveryTrend: [
      { timestamp: "Week 1", delivered: 2410, onTime: 2275, delayed: 135, volume: 2410 },
      { timestamp: "Week 2", delivered: 2680, onTime: 2525, delayed: 155, volume: 2680 },
      { timestamp: "Week 3", delivered: 2850, onTime: 2690, delayed: 160, volume: 2850 },
      { timestamp: "Week 4", delivered: 2920, onTime: 2760, delayed: 160, volume: 2920 }
    ],
    deliveryStatus: [
      { timestamp: "Week 1", delivered: 2410, inTransit: 420, delayed: 135 },
      { timestamp: "Week 2", delivered: 2680, inTransit: 480, delayed: 155 },
      { timestamp: "Week 3", delivered: 2850, inTransit: 510, delayed: 160 },
      { timestamp: "Week 4", delivered: 2920, inTransit: 540, delayed: 160 }
    ],
    fleetUtilization: [
      { timestamp: "Week 1", rate: 79.8, active: 10, idle: 1, maintenance: 1 },
      { timestamp: "Week 2", rate: 82.4, active: 10, idle: 1, maintenance: 1 },
      { timestamp: "Week 3", rate: 85.1, active: 11, idle: 0, maintenance: 1 },
      { timestamp: "Week 4", rate: 84.2, active: 10, idle: 1, maintenance: 1 }
    ],
    distanceTravelled: [
      { timestamp: "Week 1", distance: 29800 },
      { timestamp: "Week 2", distance: 32400 },
      { timestamp: "Week 3", distance: 34900 },
      { timestamp: "Week 4", distance: 35800 }
    ],
    routeDelayTrend: [
      { timestamp: "Week 1", delayMinutes: 24 },
      { timestamp: "Week 2", delayMinutes: 22 },
      { timestamp: "Week 3", delayMinutes: 25 },
      { timestamp: "Week 4", delayMinutes: 21 }
    ],
    warehouseInventory: [
      { timestamp: "Week 1", inventory: 84200, capacity: 107000 },
      { timestamp: "Week 2", inventory: 89400, capacity: 107000 },
      { timestamp: "Week 3", inventory: 93200, capacity: 107000 },
      { timestamp: "Week 4", inventory: 91800, capacity: 107000 }
    ],
    warehouseFlow: [
      { timestamp: "Week 1", incoming: 16800, outgoing: 15900 },
      { timestamp: "Week 2", incoming: 18400, outgoing: 17200 },
      { timestamp: "Week 3", incoming: 19800, outgoing: 18600 },
      { timestamp: "Week 4", incoming: 20100, outgoing: 19400 }
    ],
    performanceTrend: [
      { timestamp: "Week 1", score: 91.8, delivery: 93, fleet: 80, warehouse: 84 },
      { timestamp: "Week 2", score: 92.9, delivery: 94, fleet: 82, warehouse: 87 },
      { timestamp: "Week 3", score: 93.8, delivery: 94, fleet: 85, warehouse: 90 },
      { timestamp: "Week 4", score: 94.6, delivery: 95, fleet: 84, warehouse: 89 }
    ]
  },
  custom: {
    deliveryTrend: [
      { timestamp: "Phase A", delivered: 640, onTime: 610, delayed: 30, volume: 640 },
      { timestamp: "Phase B", delivered: 780, onTime: 738, delayed: 42, volume: 780 },
      { timestamp: "Phase C", delivered: 810, onTime: 772, delayed: 38, volume: 810 },
      { timestamp: "Phase D", delivered: 890, onTime: 846, delayed: 44, volume: 890 }
    ],
    deliveryStatus: [
      { timestamp: "Phase A", delivered: 640, inTransit: 210, delayed: 30 },
      { timestamp: "Phase B", delivered: 780, inTransit: 240, delayed: 42 },
      { timestamp: "Phase C", delivered: 810, inTransit: 260, delayed: 38 },
      { timestamp: "Phase D", delivered: 890, inTransit: 280, delayed: 44 }
    ],
    fleetUtilization: [
      { timestamp: "Phase A", rate: 80.5, active: 10, idle: 1, maintenance: 1 },
      { timestamp: "Phase B", rate: 84.1, active: 10, idle: 1, maintenance: 1 },
      { timestamp: "Phase C", rate: 86.8, active: 11, idle: 0, maintenance: 1 },
      { timestamp: "Phase D", rate: 83.2, active: 10, idle: 1, maintenance: 1 }
    ],
    distanceTravelled: [
      { timestamp: "Phase A", distance: 8900 },
      { timestamp: "Phase B", distance: 10800 },
      { timestamp: "Phase C", distance: 11400 },
      { timestamp: "Phase D", distance: 12100 }
    ],
    routeDelayTrend: [
      { timestamp: "Phase A", delayMinutes: 22 },
      { timestamp: "Phase B", delayMinutes: 20 },
      { timestamp: "Phase C", delayMinutes: 24 },
      { timestamp: "Phase D", delayMinutes: 19 }
    ],
    warehouseInventory: [
      { timestamp: "Phase A", inventory: 87100, capacity: 107000 },
      { timestamp: "Phase B", inventory: 90400, capacity: 107000 },
      { timestamp: "Phase C", inventory: 92800, capacity: 107000 },
      { timestamp: "Phase D", inventory: 91100, capacity: 107000 }
    ],
    warehouseFlow: [
      { timestamp: "Phase A", incoming: 4800, outgoing: 4400 },
      { timestamp: "Phase B", incoming: 5600, outgoing: 5200 },
      { timestamp: "Phase C", incoming: 6100, outgoing: 5700 },
      { timestamp: "Phase D", incoming: 6400, outgoing: 6100 }
    ],
    performanceTrend: [
      { timestamp: "Phase A", score: 92.5, delivery: 94, fleet: 81, warehouse: 87 },
      { timestamp: "Phase B", score: 93.4, delivery: 95, fleet: 84, warehouse: 89 },
      { timestamp: "Phase C", score: 94.1, delivery: 95, fleet: 87, warehouse: 91 },
      { timestamp: "Phase D", score: 94.8, delivery: 96, fleet: 83, warehouse: 90 }
    ]
  }
};

// Calculation helpers
export function getAnalyticsData(timeRange = "7days") {
  const selectedKey = timeSeriesData[timeRange] ? timeRange : "7days";
  const series = timeSeriesData[selectedKey];

  const totalShipments = mockShipments.length;
  const onTimeShipments = mockShipments.filter(s => s.onTime);
  const delayedShipments = mockShipments.filter(s => !s.onTime);
  const onTimeRate = ((onTimeShipments.length / totalShipments) * 100).toFixed(1);
  const delayedRate = ((delayedShipments.length / totalShipments) * 100).toFixed(1);
  
  const avgDeliveryTimeVal = (
    mockShipments.reduce((acc, curr) => acc + curr.deliveryHours, 0) / totalShipments
  ).toFixed(1);

  const avgEtaAccuracy = (
    mockShipments.reduce((acc, curr) => acc + curr.etaAccuracy, 0) / totalShipments
  ).toFixed(1);

  const totalVehicles = mockFleet.length;
  const activeVehicles = mockFleet.filter(v => v.status === "Active").length;
  const idleVehicles = mockFleet.filter(v => v.status === "Idle").length;
  const maintenanceVehicles = mockFleet.filter(v => v.status === "Maintenance").length;
  
  const fleetUtilizationRate = (
    mockFleet.reduce((acc, curr) => acc + curr.utilization, 0) / totalVehicles
  ).toFixed(1);

  const avgFuelLevel = (
    mockFleet.reduce((acc, curr) => acc + curr.fuel, 0) / totalVehicles
  ).toFixed(0);

  const totalRoutes = mockRoutes.length;
  const healthyRoutes = mockRoutes.filter(r => r.health === "Good").length;
  const delayedRoutes = mockRoutes.filter(r => r.health === "Critical" || r.averageDelay > 20).length;
  
  const avgRouteDelay = (
    mockRoutes.reduce((acc, curr) => acc + curr.averageDelay, 0) / totalRoutes
  ).toFixed(0);

  const sortedRoutesByDelay = [...mockRoutes].sort((a, b) => a.averageDelay - b.averageDelay);
  const bestRoute = sortedRoutesByDelay[0];
  const worstRoute = sortedRoutesByDelay[sortedRoutesByDelay.length - 1];

  const totalWarehouses = mockWarehouses.length;
  const totalCapacity = mockWarehouses.reduce((acc, curr) => acc + curr.capacity, 0);
  const totalInventory = mockWarehouses.reduce((acc, curr) => acc + curr.inventory, 0);
  const avgWarehouseUtil = ((totalInventory / totalCapacity) * 100).toFixed(1);
  const criticalWarehouses = mockWarehouses.filter(w => w.status === "Critical").length;
  const totalIncoming = mockWarehouses.reduce((acc, curr) => acc + curr.incoming, 0);
  const totalOutgoing = mockWarehouses.reduce((acc, curr) => acc + curr.outgoing, 0);
  const avgWarehouseEfficiency = (
    mockWarehouses.reduce((acc, curr) => acc + curr.efficiency, 0) / totalWarehouses
  ).toFixed(1);

  const networkHealthScore = (
    parseFloat(onTimeRate) * 0.35 +
    parseFloat(fleetUtilizationRate) * 0.25 +
    (healthyRoutes / totalRoutes * 100) * 0.20 +
    parseFloat(avgWarehouseEfficiency) * 0.20
  ).toFixed(1);

  // Status distributions for Donut charts
  const deliveryStatusDistribution = [
    { name: "On-Time", value: onTimeShipments.length, color: "#9BEF35" },
    { name: "Delayed", value: delayedShipments.length, color: "#C97979" },
    { name: "In Transit", value: 5, color: "#7FA8C9" }
  ];

  const vehicleStatusDistribution = [
    { name: "Active", value: activeVehicles, color: "#9BEF35" },
    { name: "Idle", value: idleVehicles, color: "#D6B76A" },
    { name: "Maintenance", value: maintenanceVehicles, color: "#C97979" }
  ];

  const networkHealthDistribution = [
    { name: "Optimal (SLA Met)", value: 74, color: "#9BEF35" },
    { name: "Monitored / Minor Lag", value: 20, color: "#D6B76A" },
    { name: "Critical Bottleneck", value: 6, color: "#C97979" }
  ];

  const performanceByCategory = [
    { category: "Delivery SLA", score: parseFloat(onTimeRate), target: 95 },
    { category: "Fleet Utilization", score: parseFloat(fleetUtilizationRate), target: 85 },
    { category: "Route Health", score: Math.round((healthyRoutes / totalRoutes) * 100), target: 90 },
    { category: "Warehouse Flow", score: parseFloat(avgWarehouseEfficiency), target: 92 }
  ];

  return {
    timeRange: selectedKey,
    series,
    kpis: {
      networkHealth: `${networkHealthScore}%`,
      onTimeDelivery: `${onTimeRate}%`,
      avgDeliveryTime: `${avgDeliveryTimeVal}h`,
      fleetUtilization: `${fleetUtilizationRate}%`,
      routeHealth: `${Math.round((healthyRoutes / totalRoutes) * 100)}%`,
      warehouseUtilization: `${avgWarehouseUtil}%`,
      delayedShipments: delayedShipments.length,
      criticalIncidents: maintenanceVehicles + criticalWarehouses + 1,
      totalDeliveries: series.deliveryTrend.reduce((acc, curr) => acc + curr.delivered, 0),
      etaAccuracy: `${avgEtaAccuracy}%`,
      delayedRate: `${delayedRate}%`,
      totalVehicles,
      activeVehicles,
      idleVehicles,
      maintenanceVehicles,
      avgFuel: `${avgFuelLevel}%`,
      activeRoutes: totalRoutes,
      healthyRoutes,
      delayedRoutes,
      avgRouteDelay: `${avgRouteDelay}m`,
      bestRouteName: `${bestRoute.origin} → ${bestRoute.destination}`,
      worstRouteName: `${worstRoute.origin} → ${worstRoute.destination}`,
      totalWarehouses,
      criticalWarehouses,
      incomingShipments: totalIncoming,
      outgoingShipments: totalOutgoing,
      avgWarehouseEfficiency: `${avgWarehouseEfficiency}%`
    },
    distributions: {
      delivery: deliveryStatusDistribution,
      fleet: vehicleStatusDistribution,
      network: networkHealthDistribution
    },
    categoryPerformance: performanceByCategory,
    tables: {
      shipments: mockShipments,
      fleet: mockFleet,
      routes: mockRoutes,
      warehouses: mockWarehouses
    }
  };
}
