export const kpiData = [
  {
    id: "shipments",
    label: "Total Shipments",
    value: "12,486",
    change: "12%",
    direction: "up",
    color: "blue",
    icon: "box",
  },
  {
    id: "delivery",
    label: "On-Time Delivery",
    value: "93.1%",
    change: "3%",
    direction: "up",
    color: "green",
    icon: "clock",
  },
  {
    id: "vehicles",
    label: "Active Vehicles",
    value: "68",
    change: "8%",
    direction: "up",
    color: "blue",
    icon: "truck",
  },
  {
    id: "delayed",
    label: "Delayed Shipments",
    value: "27",
    change: "18%",
    direction: "down",
    color: "yellow",
    icon: "warning",
  },
  {
    id: "alerts",
    label: "Active Alerts",
    value: "12",
    change: "25%",
    direction: "down",
    color: "red",
    icon: "bell",
  },
];

export const deliveryPerformance = [
  {
    date: "Apr 20",
    onTime: 61,
    delayed: 18,
  },
  {
    date: "Apr 21",
    onTime: 78,
    delayed: 12,
  },
  {
    date: "Apr 22",
    onTime: 76,
    delayed: 20,
  },
  {
    date: "Apr 23",
    onTime: 79,
    delayed: 17,
  },
  {
    date: "Apr 24",
    onTime: 81,
    delayed: 23,
  },
  {
    date: "Apr 25",
    onTime: 80,
    delayed: 21,
  },
  {
    date: "Apr 26",
    onTime: 84,
    delayed: 19,
  },
];

export const fleetData = [
  {
    name: "Active",
    value: 52,
    percentage: "76%",
    color: "#22C55E",
  },
  {
    name: "Idle",
    value: 9,
    percentage: "13%",
    color: "#2196F3",
  },
  {
    name: "Maintenance",
    value: 4,
    percentage: "6%",
    color: "#FACC15",
  },
  {
    name: "Issue / Delayed",
    value: 3,
    percentage: "4%",
    color: "#EF4444",
  },
];

export const alerts = [
  {
    id: 1,
    severity: "Critical",
    title: "Shipment SHP-7842 delayed",
    entity: "Shipment",
    location: "Delhi → Mumbai",
    time: "1h ago",
  },
  {
    id: 2,
    severity: "High",
    title: "Vehicle VH-204 requires attention",
    entity: "Vehicle",
    location: "Bengaluru",
    time: "2h ago",
  },
  {
    id: 3,
    severity: "Medium",
    title: "Warehouse DEL-01 nearing capacity",
    entity: "Warehouse",
    location: "Delhi",
    time: "3h ago",
  },
  {
    id: 4,
    severity: "High",
    title: "Route RT-306 traffic disruption",
    entity: "Route",
    location: "Kolkata → Guwahati",
    time: "4h ago",
  },
  {
    id: 5,
    severity: "Critical",
    title: "Shipment SHP-7710 delayed",
    entity: "Shipment",
    location: "Mumbai",
    time: "5h ago",
  },
];

export const recentActivity = [
  {
    id: 1,
    type: "shipment",
    time: "14:28",
    title: "Shipment SHP-8921 reassigned",
    description: "From WH-03 to WH-04 • Mumbai",
  },
  {
    id: 2,
    type: "vehicle",
    time: "13:56",
    title: "Vehicle VH-204 delayed",
    description: "ETA +2h • Bengaluru",
  },
  {
    id: 3,
    type: "route",
    time: "12:43",
    title: "Route RT-118 updated",
    description: "New ETA 16:20 • Delhi → Kolkata",
  },
  {
    id: 4,
    type: "resolved",
    time: "11:32",
    title: "Alert resolved",
    description: "Warehouse DEL-02 capacity normal • Delhi",
  },
  {
    id: 5,
    type: "warehouse",
    time: "10:17",
    title: "Warehouse capacity changed",
    description: "WH-01 at 78% • Bengaluru",
  },
];

export const networkData = {
  cities: [
    { id: "delhi", name: "Delhi", x: 50, y: 22 },
    { id: "mumbai", name: "Mumbai", x: 37, y: 62 },
    { id: "bengaluru", name: "Bengaluru", x: 45, y: 88 },
    { id: "kolkata", name: "Kolkata", x: 78, y: 48 },
  ],

  warehouses: [
    { id: "WH-03", x: 53, y: 15 },
    { id: "WH-02", x: 28, y: 56 },
    { id: "WH-04", x: 84, y: 46 },
    { id: "WH-01", x: 48, y: 91 },
  ],

  vehicles: [
    { id: "VH-204", x: 64, y: 34 },
    { id: "VH-118", x: 58, y: 65 },
    { id: "VH-302", x: 32, y: 77 },
  ],

  routes: [
    {
      id: "RT-101",
      points: "50,22 37,62 45,88",
      status: "active",
    },
    {
      id: "RT-204",
      points: "50,22 78,48",
      status: "active",
    },
    {
      id: "RT-306",
      points: "78,48 45,88",
      status: "risk",
    },
    {
      id: "RT-118",
      points: "37,62 50,22",
      status: "delayed",
    },
  ],
};