export const analyticsData = {
  periods: {
    "7d": { onTime: "94.2%", delay: "18 min", shipments: "1,284", utilization: "78.4%", trends: ["2.4%", "5 min", "9.2%", "3.5%"] },
    "30d": { onTime: "93.1%", delay: "21 min", shipments: "5,482", utilization: "76.8%", trends: ["1.8%", "3 min", "7.8%", "2.9%"] },
    "90d": { onTime: "91.8%", delay: "23 min", shipments: "15,920", utilization: "74.9%", trends: ["4.6%", "6 min", "12.1%", "5.4%"] },
  },
  deliveryPerformance: {
    "7d": [{ day: "09 Sep", onTime: 91, delayed: 7 }, { day: "10 Sep", onTime: 92, delayed: 6 }, { day: "11 Sep", onTime: 93, delayed: 5 }, { day: "12 Sep", onTime: 92, delayed: 6 }, { day: "13 Sep", onTime: 95, delayed: 4 }, { day: "14 Sep", onTime: 94, delayed: 4 }, { day: "15 Sep", onTime: 96, delayed: 3 }],
    "30d": [{ day: "W1", onTime: 90, delayed: 8 }, { day: "W2", onTime: 92, delayed: 6 }, { day: "W3", onTime: 93, delayed: 5 }, { day: "W4", onTime: 94, delayed: 4 }],
    "90d": [{ day: "Jun", onTime: 88, delayed: 10 }, { day: "Jul", onTime: 90, delayed: 8 }, { day: "Aug", onTime: 92, delayed: 6 }, { day: "Sep", onTime: 94, delayed: 4 }],
  },
  shipmentPerformance: {
    volume: [{ label: "Completed", value: 1284 }, { label: "In Transit", value: 312 }, { label: "Delayed", value: 21 }, { label: "Cancelled", value: 8 }],
    status: [{ label: "On Time", value: 94.2 }, { label: "Delayed", value: 4.1 }, { label: "Critical", value: 1.7 }],
    delivery: [{ label: "< 12h", value: 42 }, { label: "12–24h", value: 36 }, { label: "24–48h", value: 17 }, { label: "> 48h", value: 5 }],
  },
  routePerformance: [
    { id: "RT-DEL-BOM-01", route: "DEL → MUM", name: "Delhi → Mumbai", onTime: 91.2, delay: 28, vehicles: 18, shipments: 64, status: "AT RISK" },
    { id: "RT-DEL-JAI-01", route: "DEL → JAI", name: "Delhi → Jaipur", onTime: 94.8, delay: 12, vehicles: 14, shipments: 48, status: "HEALTHY" },
    { id: "RT-MUM-BLR-01", route: "MUM → BLR", name: "Mumbai → Bengaluru", onTime: 96.1, delay: 8, vehicles: 11, shipments: 39, status: "HEALTHY" },
    { id: "RT-DEL-AHM-01", route: "DEL → AHM", name: "Delhi → Ahmedabad", onTime: 88.7, delay: 41, vehicles: 9, shipments: 31, status: "DISRUPTED" },
    { id: "RT-HYD-CHE-01", route: "HYD → CHE", name: "Hyderabad → Chennai", onTime: 95.3, delay: 7, vehicles: 11, shipments: 38, status: "HEALTHY" },
  ],
  warehousePerformance: [
    { id: "DEL-001", name: "DELHI HUB", capacity: 86, throughput: 270, onTime: 96.4, processing: 42, status: "ONLINE" },
    { id: "JAI-001", name: "JAIPUR HUB", capacity: 91, throughput: 184, onTime: 91.8, processing: 58, status: "AT RISK" },
    { id: "MUM-001", name: "MUMBAI DC", capacity: 72, throughput: 222, onTime: 97.1, processing: 36, status: "ONLINE" },
    { id: "BLR-001", name: "BENGALURU HUB", capacity: 64, throughput: 176, onTime: 95.6, processing: 31, status: "ONLINE" },
  ],
  fleetPerformance: [{ label: "Heavy Cargo", value: 82 }, { label: "Regional", value: 74 }, { label: "Delivery Vans", value: 68 }, { label: "Express", value: 91 }],
  delayReasons: [{ label: "Traffic", value: 38 }, { label: "Warehouse Congestion", value: 24 }, { label: "Vehicle Issue", value: 17 }, { label: "Weather", value: 11 }, { label: "Route Disruption", value: 7 }, { label: "Other", value: 3 }],
  insights: [
    ["DELHI → AHMEDABAD IS UNDERPERFORMING", "On-time delivery dropped 6.8% over the selected period.", "−6.8%", "#EF4444"],
    ["JAIPUR HUB IS NEAR CAPACITY", "Warehouse utilization reached 91%, increasing average processing time.", "91%", "#FACC15"],
    ["FLEET UTILIZATION IMPROVED", "Vehicle utilization increased compared with the previous period.", "+4.2%", "#22C55E"],
    ["TRAFFIC IS THE PRIMARY DELAY DRIVER", "38% of recorded shipment delays were associated with traffic conditions.", "38%", "#2196F3"],
  ],
};
