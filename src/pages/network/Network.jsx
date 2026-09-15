import { useEffect, useState } from "react";
import {
  Activity,
  ChevronDown,
  Crosshair,
  Minus,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Tooltip,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
  getNetworkSnapshot,
  networkTimeline,
  routes,
  warehouses,
} from "../../data/network";

import TimeMachine from "./TimeMachine.fixed";

/* ==========================================================================
   FILTERS
   ========================================================================== */

const filters = [
  "ALL",
  "SHIPMENTS",
  "VEHICLES",
  "WAREHOUSES",
  "ROUTES",
];

const statusOptions = [
  "ALL",
  "Healthy",
  "Active",
  "Warning",
  "Critical",
  "In Transit",
  "Delayed",
];

const regionOptions = [
  "ALL",
  "North",
  "West",
  "South",
  "East",
  "Central",
];

const cityRegions = {
  Delhi: "North",
  Jaipur: "North",
  Ahmedabad: "West",
  Mumbai: "West",
  Hyderabad: "South",
  Bengaluru: "South",
  Chennai: "South",
  Kolkata: "East",
};

function normalizeStatus(value = "") {
  return String(value).trim().toLowerCase();
}

function matchesStatus(item, selectedStatus) {
  if (!selectedStatus || selectedStatus === "ALL") return true;

  const status = normalizeStatus(item?.status);
  const wanted = normalizeStatus(selectedStatus);

  if (status === wanted) return true;

  if (wanted === "healthy" && status === "active") return true;
  if (wanted === "active" && status === "healthy") return true;

  return false;
}

function getRegion(city) {
  return cityRegions[city] || "Central";
}

function matchesRegion(item, selectedRegion) {
  if (!selectedRegion || selectedRegion === "ALL") return true;

  if (item?.city) {
    return getRegion(item.city) === selectedRegion;
  }

  if (item?.origin || item?.destination) {
    const cities = [item.origin, item.destination].filter(Boolean);
    return cities.some((city) => getRegion(city) === selectedRegion);
  }

  return true;
}

/* ==========================================================================
   COLORS
   ========================================================================== */

const statusColors = {
  healthy: "#22C55E",
  active: "#2196F3",
  warning: "#FACC15",
  critical: "#EF4444",
};

const markerColors = {
  shipment: "#38BDF8",
  vehicle: "#FACC15",
  warehouse: "#22C55E",
};

/* ==========================================================================
   REAL GEOGRAPHIC COORDINATES
   ========================================================================== */

const CITY_COORDINATES = {
  Delhi: [28.6139, 77.209],
  Jaipur: [26.9124, 75.7873],
  Ahmedabad: [23.0225, 72.5714],
  Mumbai: [19.076, 72.8777],
  Hyderabad: [17.385, 78.4867],
  Bengaluru: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Kolkata: [22.5726, 88.3639],
};

/*
  These bounds are generated from the actual cities in our network.
  They are only used for viewport framing.
  They do NOT alter geographic positioning.
*/

const NETWORK_BOUNDS = Object.values(CITY_COORDINATES);

/* ==========================================================================
   MAP HELPERS
   ========================================================================== */

function getCityCoordinates(city) {
  return CITY_COORDINATES[city] || null;
}

function getRouteCoordinates(route) {
  if (!route) return [];

  const origin = getCityCoordinates(route.origin);
  const destination = getCityCoordinates(route.destination);

  if (!origin || !destination) return [];

  return [origin, destination];
}

function getRoutePosition(route, progress = 0) {
  if (!route) return null;

  const origin = getCityCoordinates(route.origin);
  const destination = getCityCoordinates(route.destination);

  if (!origin || !destination) return null;

  const safeProgress = Math.max(
    0,
    Math.min(1, progress)
  );

  return [
    origin[0] +
      (destination[0] - origin[0]) *
        safeProgress,

    origin[1] +
      (destination[1] - origin[1]) *
        safeProgress,
  ];
}

/* ==========================================================================
   MAP READY / AUTO FIT
   ========================================================================== */

function MapReady() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();

      map.fitBounds(NETWORK_BOUNDS, {
        padding: [55, 55],
        maxZoom: 5.5,
      });
    }, 120);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

/* ==========================================================================
   LEAFLET CONTROLS
   ========================================================================== */

function LeafletControls() {
  const map = useMap();

  const recenterMap = () => {
    map.flyToBounds(NETWORK_BOUNDS, {
      padding: [55, 55],
      maxZoom: 5.5,
      duration: 0.7,
    });
  };

  return (
    <>
      {/* ZOOM CONTROLS */}
      <div className="absolute right-4 top-4 z-[1000] flex flex-col overflow-hidden rounded-md border border-[#18304A] bg-[#07111F]/95 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => map.zoomIn()}
          className="flex h-9 w-9 items-center justify-center text-[#A7B3C2] transition-colors hover:bg-[#0D1D30] hover:text-white"
          aria-label="Zoom in"
        >
          <Plus size={15} />
        </button>

        <span className="h-px bg-[#18304A]" />

        <button
          type="button"
          onClick={() => map.zoomOut()}
          className="flex h-9 w-9 items-center justify-center text-[#A7B3C2] transition-colors hover:bg-[#0D1D30] hover:text-white"
          aria-label="Zoom out"
        >
          <Minus size={15} />
        </button>
      </div>

      {/* RECENTER */}
      <button
        type="button"
        onClick={recenterMap}
        className="absolute right-4 top-[5.75rem] z-[1000] flex h-9 w-9 items-center justify-center rounded-md border border-[#18304A] bg-[#07111F]/95 text-[#A7B3C2] shadow-lg backdrop-blur-md transition-colors hover:bg-[#0D1D30] hover:text-white"
        aria-label="Recenter network"
      >
        <Crosshair size={13} />
      </button>
    </>
  );
}

/* ==========================================================================
   LEAFLET MAP
   ========================================================================== */

function LeafletNetworkMap({
  filter,
  search,
  statusFilter,
  regionFilter,
  snapshot,
  onSelect,
}) {
  const query = search.trim().toLowerCase();

  const matches = (value = "") =>
    !query ||
    String(value)
      .toLowerCase()
      .includes(query);

  const showRoutes =
    filter === "ALL" ||
    filter === "ROUTES";

  const showVehicles =
    filter === "ALL" ||
    filter === "VEHICLES";

  const showShipments =
    filter === "ALL" ||
    filter === "SHIPMENTS";

  const showWarehouses =
    filter === "ALL" ||
    filter === "WAREHOUSES";

  return (
    <>
      {/* ================================================================
          DARK INMOTION MAP THEME
          ================================================================ */}

      <style>
        {`
          /* -------------------------------------------------------------
             MAIN MAP
             ------------------------------------------------------------- */

          .inmotion-leaflet-map {
            background: #020812 !important;
            font-family: inherit;
          }

          /*
            OpenStreetMap is normally bright.

            We transform ONLY the map tiles into a dark,
            desaturated command-center style.

            Leaflet vectors / markers are NOT affected.
          */

          .inmotion-leaflet-map .leaflet-tile-pane {
            filter:
              grayscale(1)
              invert(1)
              hue-rotate(180deg)
              brightness(0.42)
              contrast(1.22)
              saturate(0.55);
          }

          .inmotion-leaflet-map .leaflet-tile {
            opacity: 0.88;
          }

          /* -------------------------------------------------------------
             MAP BACKGROUND
             ------------------------------------------------------------- */

          .inmotion-leaflet-map .leaflet-map-pane {
            background: #020812;
          }

          /* -------------------------------------------------------------
             ATTRIBUTION
             ------------------------------------------------------------- */

          .inmotion-leaflet-map .leaflet-control-attribution {
            background: rgba(2, 8, 18, 0.88) !important;
            color: rgba(127, 145, 165, 0.7) !important;
            border-top-left-radius: 4px;
            font-size: 8px;
            padding: 2px 5px;
          }

          .inmotion-leaflet-map .leaflet-control-attribution a {
            color: rgba(56, 189, 248, 0.75) !important;
          }

          /* -------------------------------------------------------------
             TOOLTIP
             ------------------------------------------------------------- */

          .inmotion-leaflet-map .leaflet-tooltip {
            background: rgba(7, 17, 31, 0.97);
            border: 1px solid rgba(56, 189, 248, 0.28);
            border-radius: 5px;
            color: #E5EDF6;
            box-shadow:
              0 10px 28px rgba(0, 0, 0, 0.55),
              0 0 18px rgba(33, 150, 243, 0.06);
            font-family: inherit;
            font-size: 11px;
            padding: 7px 9px;
          }

          .inmotion-leaflet-map .leaflet-tooltip-top::before {
            border-top-color: rgba(40, 80, 116, 0.95);
          }

          .inmotion-leaflet-map .leaflet-tooltip-bottom::before {
            border-bottom-color: rgba(40, 80, 116, 0.95);
          }

          .inmotion-leaflet-map .leaflet-tooltip-left::before {
            border-left-color: rgba(40, 80, 116, 0.95);
          }

          .inmotion-leaflet-map .leaflet-tooltip-right::before {
            border-right-color: rgba(40, 80, 116, 0.95);
          }

          /* -------------------------------------------------------------
             REMOVE DEFAULT FOCUS OUTLINE
             ------------------------------------------------------------- */

          .inmotion-leaflet-map .leaflet-interactive:focus {
            outline: none;
          }
        `}
      </style>

      <MapContainer
        center={[22.5, 79.2]}
        zoom={5}
        minZoom={4}
        maxZoom={9}
        zoomSnap={0.5}
        zoomDelta={0.5}
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        className="inmotion-leaflet-map absolute inset-0 z-10 h-full w-full"
      >
        {/* ================================================================
            KEYLESS OPENSTREETMAP BASE
            ================================================================ */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapReady />

        <LeafletControls />

        {/* ================================================================
            ROUTES
            ================================================================ */}

        {showRoutes &&
          snapshot.routes
            .filter((route) => matchesStatus(route, statusFilter))
            .filter((route) => matchesRegion(route, regionFilter))
            .map((route) => {
            const coordinates =
              getRouteCoordinates(route);

            if (coordinates.length !== 2) {
              return null;
            }

            const routeColor =
              statusColors[route.status] ||
              "#2196F3";

            return (
              <Polyline
                key={route.id}
                positions={coordinates}
                pathOptions={{
                  color: routeColor,
                  weight: 3,
                  opacity: 0.9,
                  dashArray:
                    route.status === "warning"
                      ? "7 6"
                      : undefined,
                }}
                eventHandlers={{
                  click: () =>
                    onSelect({
                      type: "route",
                      data: route,
                    }),
                }}
              >
                <Tooltip
                  direction="center"
                  sticky
                  className="inmotion-tooltip"
                >
                  <div>
                    <strong>
                      {route.name}
                    </strong>

                    <br />

                    {route.origin} →{" "}
                    {route.destination}
                  </div>
                </Tooltip>
              </Polyline>
            );
          })}

        {/* ================================================================
            WAREHOUSES
            ================================================================ */}

        {showWarehouses &&
          warehouses
            .filter((warehouse) => matchesStatus(warehouse, statusFilter))
            .filter((warehouse) => matchesRegion(warehouse, regionFilter))
            .filter((warehouse) =>
              matches(
                `${warehouse.name} ${warehouse.city}`
              )
            )
            .map((warehouse) => {
              const position =
                getCityCoordinates(
                  warehouse.city
                );

              if (!position) return null;

              const color =
                statusColors[
                  warehouse.status
                ] ||
                markerColors.warehouse;

              return (
                <CircleMarker
                  key={warehouse.id}
                  center={position}
                  radius={7}
                  pathOptions={{
                    color,
                    fillColor: "#07111F",
                    fillOpacity: 1,
                    weight: 2.5,
                  }}
                  eventHandlers={{
                    click: () =>
                      onSelect({
                        type: "warehouse",
                        data: warehouse,
                      }),
                  }}
                >
                  <Tooltip
                    direction="right"
                    offset={[10, 0]}
                    className="inmotion-tooltip"
                  >
                    <div>
                      <strong>
                        {warehouse.city}
                      </strong>

                      <br />

                      {warehouse.name}
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}

        {/* ================================================================
            VEHICLES
            ================================================================ */}

        {showVehicles &&
          snapshot.vehicles
            .filter((vehicle) => matchesStatus(vehicle, statusFilter))
            .filter((vehicle) => {
              if (!vehicle?.routeId) return matchesRegion(vehicle, regionFilter);

              const route = snapshot.routes.find((item) => item.id === vehicle.routeId);
              return matchesRegion(route || vehicle, regionFilter);
            })
            .filter((vehicle) =>
              matches(
                `${vehicle.id} ${vehicle.registration} ${vehicle.driver}`
              )
            )
            .map((vehicle) => {
              const route =
                snapshot.routes.find(
                  (item) =>
                    item.id ===
                    vehicle.routeId
                );

              const position =
                getRoutePosition(
                  route,
                  vehicle.progress
                );

              if (!position) return null;

              return (
                <CircleMarker
                  key={vehicle.id}
                  center={position}
                  radius={6}
                  pathOptions={{
                    color: "#07111F",
                    fillColor:
                      markerColors.vehicle,
                    fillOpacity: 1,
                    weight: 2,
                  }}
                  eventHandlers={{
                    click: () =>
                      onSelect({
                        type: "vehicle",
                        data: vehicle,
                      }),
                  }}
                >
                  <Tooltip
                    direction="top"
                    className="inmotion-tooltip"
                  >
                    <div>
                      <strong>
                        TRUCK{" "}
                        {vehicle.registration}
                      </strong>

                      <br />

                      {vehicle.driver}
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}

        {/* ================================================================
            SHIPMENTS
            ================================================================ */}

        {showShipments &&
          snapshot.shipments
            .filter((shipment) => matchesStatus(shipment, statusFilter))
            .filter((shipment) => {
              if (!shipment?.routeId) return matchesRegion(shipment, regionFilter);

              const route = snapshot.routes.find((item) => item.id === shipment.routeId);
              return matchesRegion(route || shipment, regionFilter);
            })
            .filter((shipment) =>
              matches(
                `${shipment.id} ${shipment.name} ${shipment.vehicleId}`
              )
            )
            .map((shipment) => {
              const route =
                snapshot.routes.find(
                  (item) =>
                    item.id ===
                    shipment.routeId
                );

              const position =
                getRoutePosition(
                  route,
                  shipment.progress
                );

              if (!position) return null;

              const color =
                shipment.status ===
                "Delayed"
                  ? "#EF4444"
                  : markerColors.shipment;

              return (
                <CircleMarker
                  key={shipment.id}
                  center={position}
                  radius={4}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: 1,
                    weight: 0,
                  }}
                  eventHandlers={{
                    click: () =>
                      onSelect({
                        type: "shipment",
                        data: shipment,
                      }),
                  }}
                >
                  <Tooltip
                    direction="top"
                    className="inmotion-tooltip"
                  >
                    <div>
                      <strong>
                        {shipment.id}
                      </strong>

                      <br />

                      {shipment.name}
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
      </MapContainer>
    </>
  );
}

/* ==========================================================================
   HEADER
   ========================================================================== */

function NetworkHeader({ selectedTime }) {
  const isLive = selectedTime >= networkTimeline.end;

  return (
    <div className="flex flex-col gap-4 border-b border-[#18304A] pb-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">
          Operations / Network
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
          NETWORK
        </h1>

        <p className="mt-1 text-[13px] text-[#7F91A5]">
          {isLive
            ? "Live view of your logistics network"
            : `Historical view · ${new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(new Date(selectedTime))}`}
        </p>
      </div>

      <div
        className={`flex items-center gap-2 text-[11px] font-medium ${
          isLive ? "text-[#22C55E]" : "text-[#FACC15]"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            isLive ? "bg-[#22C55E]" : "bg-[#FACC15]"
          } shadow-[0_0_8px_rgba(34,197,94,0.65)]`}
        />

        {isLive ? "NETWORK LIVE" : "VIEWING HISTORY"}
      </div>
    </div>
  );
}

/* ==========================================================================
   FILTERS
   ========================================================================== */

function NetworkFilters({
  filter,
  setFilter,
  statusFilter,
  setStatusFilter,
  regionFilter,
  setRegionFilter,
  search,
  setSearch,
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-[#18304A] py-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap gap-1">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`border-b-2 px-3 py-2 text-[10px] font-semibold tracking-[0.08em] transition-colors ${
              filter === item
                ? "border-[#2196F3] text-[#38BDF8]"
                : "border-transparent text-[#7F91A5] hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative">
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="appearance-none border-b border-[#18304A] bg-transparent px-3 py-2 pr-7 text-[11px] text-[#A7B3C2] outline-none transition-colors hover:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option} className="bg-[#07111F] text-white">
                {option === "ALL" ? "Status" : option}
              </option>
            ))}
          </select>

          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#A7B3C2]"
          />
        </div>

        <div className="relative">
          <select
            aria-label="Filter by region"
            value={regionFilter}
            onChange={(event) => setRegionFilter(event.target.value)}
            className="appearance-none border-b border-[#18304A] bg-transparent px-3 py-2 pr-7 text-[11px] text-[#A7B3C2] outline-none transition-colors hover:text-white"
          >
            {regionOptions.map((option) => (
              <option key={option} value={option} className="bg-[#07111F] text-white">
                {option === "ALL" ? "Region" : option}
              </option>
            ))}
          </select>

          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#A7B3C2]"
          />
        </div>

        <label className="flex min-w-[190px] items-center gap-2 border-b border-[#18304A] px-3 py-2">
          <Search
            size={14}
            className="text-[#6F7D8E]"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search network..."
            className="w-full bg-transparent text-[11px] text-white outline-none placeholder:text-[#6F7D8E]"
          />
        </label>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAP SECTION
   ========================================================================== */

function NetworkMap({
  filter,
  search,
  statusFilter,
  regionFilter,
  selected,
  onSelect,
  onClose,
  snapshot,
  selectedTime,
  onTimeChange,
  onReturnLive,
}) {
  return (
    <div className="relative h-[460px] overflow-hidden border-y border-[#18304A] bg-[#020812] sm:h-[500px]">
      {/* GRID OVERLAY */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(33,150,243,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(33,150,243,0.055) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* BLUE COMMAND-CENTER GLOW */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_45%,rgba(33,150,243,0.09),transparent_52%)]" />

      {/* EDGE DARKENING */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_bottom,rgba(2,8,18,0.08),transparent_25%,transparent_70%,rgba(2,8,18,0.28))]" />

      {/* TITLE */}
      <div className="absolute left-4 top-4 z-[1100] flex items-center gap-2 rounded-md border border-[#18304A] bg-[#07111F]/92 px-3 py-2 text-[10px] font-semibold tracking-[0.12em] text-[#A7B3C2] shadow-lg backdrop-blur-md">
        <Activity
          size={13}
          className="text-[#38BDF8]"
        />

        INDIA NETWORK
      </div>

      {/* LEAFLET MAP */}
      <LeafletNetworkMap
        filter={filter}
        search={search}
        statusFilter={statusFilter}
        regionFilter={regionFilter}
        snapshot={snapshot}
        onSelect={onSelect}
      />

      {/* LEGEND */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-[1100] flex flex-wrap gap-x-4 gap-y-2 rounded-md border border-[#18304A]/80 bg-[#07111F]/88 px-3 py-2 text-[10px] text-[#8B9AAF] shadow-lg backdrop-blur-md">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          Warehouse
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-px w-4 bg-[#2196F3]" />
          Active route
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
          Vehicle
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />
          Shipment
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
          At risk
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
          Critical
        </span>
      </div>

      {/* DETAILS */}
      {selected && (
        <NetworkDetailsPanel
          selection={selected}
          onClose={onClose}
        />
      )}

      {/* TIME MACHINE */}
      <TimeMachine
        selectedTime={selectedTime}
        onTimeChange={onTimeChange}
        onReturnLive={onReturnLive}
      />
    </div>
  );
}

/* ==========================================================================
   DETAILS PANEL
   ========================================================================== */

function NetworkDetailsPanel({
  selection,
  onClose,
}) {
  const navigate = useNavigate();

  const { type, data } = selection;

  let details = [];

  if (type === "warehouse") {
    details = [
      [
        "Active shipments",
        data.activeShipments,
      ],
      ["Vehicles", data.vehicles],
      ["On-time rate", data.onTimeRate],
      ["Alerts", data.alerts],
    ];
  }

  if (type === "vehicle") {
    const route = routes.find(
      (item) => item.id === data.routeId
    );

    details = [
      ["Driver", data.driver],
      ["Status", data.status],
      ["Current route", route?.name],
      ["ETA", data.eta],
      ["Shipment", data.shipmentId],
    ];
  }

  if (type === "route") {
    details = [
      ["Distance", data.distance],
      [
        "Active vehicles",
        data.activeVehicles,
      ],
      ["Shipments", data.shipments],
      ["On-time", data.onTimeRate],
      [
        "At risk",
        `${data.atRisk} shipments`,
      ],
    ];
  }

  if (type === "shipment") {
    details = [
      ["Route", data.name],
      ["Status", data.status],
      ["Vehicle", data.vehicleId],
      ["ETA", data.eta],
    ];
  }

  let title = data.id;

  if (type === "warehouse") {
    title = data.name;
  }

  if (type === "vehicle") {
    title = `TRUCK ${data.registration}`;
  }

  if (type === "route") {
    title = data.name;
  }

  const path =
    type === "warehouse"
      ? `/app/warehouses/${data.id}`
      : type === "vehicle"
      ? `/app/fleet/${data.id}`
      : type === "route"
      ? `/app/network/routes/${data.id}`
      : `/app/shipments/${data.id}`;

  return (
    <div className="absolute right-4 top-20 z-[1200] w-[250px] rounded-lg border border-[#285074] bg-[#07111F]/96 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-md">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-[#38BDF8]">
            {type.toUpperCase()}
          </p>

          <h3 className="mt-1 text-[14px] font-semibold text-white">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-[#6F7D8E] transition-colors hover:text-white"
          aria-label="Close details"
        >
          <X size={15} />
        </button>
      </div>

      <div className="space-y-2 border-t border-[#18304A] pt-3">
        {details.map(
          ([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-3 text-[11px]"
            >
              <span className="text-[#7F91A5]">
                {label}
              </span>

              <span className="text-right text-[#E5EDF6]">
                {value ?? "—"}
              </span>
            </div>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate(path)}
        className="mt-4 w-full rounded-md border border-[#2196F3]/50 bg-[#2196F3]/10 px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-[#38BDF8] transition-colors hover:bg-[#2196F3]/20"
      >
        VIEW DETAILS →
      </button>
    </div>
  );
}

/* ==========================================================================
   NETWORK STATUS
   ========================================================================== */

function NetworkStatus({ metrics }) {
  const summary = [
    [
      "ACTIVE ROUTES",
      metrics.activeRoutes,
    ],
    [
      "ACTIVE VEHICLES",
      metrics.activeVehicles,
    ],
    [
      "SHIPMENTS IN TRANSIT",
      metrics.inTransit,
    ],
    ["WAREHOUSES ONLINE", "36"],
  ];

  return (
    <section className="border-y border-[#18304A] py-4">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 xl:flex-1">
          {summary.map(
            ([label, value]) => (
              <div
                key={label}
                className="border-l border-[#18304A] pl-4"
              >
                <p className="text-[9px] tracking-[0.12em] text-[#6F7D8E]">
                  {label}
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  {value}
                </p>
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-5 border-t border-[#18304A] pt-4 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
          <div>
            <p className="text-[9px] tracking-[0.12em] text-[#6F7D8E]">
              NETWORK HEALTH
            </p>

            <p className="mt-1 text-2xl font-semibold text-white">
              {metrics.health}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-[11px] text-[#22C55E]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />

              Operational
            </p>

            <p className="mt-2 text-[10px] text-[#7F91A5]">
              Healthy{" "}
              <span className="text-[#22C55E]">
                72
              </span>

              <span className="mx-1">
                /
              </span>

              At Risk{" "}
              <span className="text-[#FACC15]">
                11
              </span>

              <span className="mx-1">
                /
              </span>

              Critical{" "}
              <span className="text-[#EF4444]">
                3
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   ACTIVITY
   ========================================================================== */

function NetworkActivity({ activity }) {
  return (
    <section className="py-6">
      <div className="flex items-end justify-between border-b border-[#18304A] pb-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#38BDF8]">
            LIVE ACTIVITY
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            Network events
          </h2>
        </div>

        <span className="text-[10px] text-[#6F7D8E]">
          Last 10 minutes
        </span>
      </div>

      <div className="divide-y divide-[#18304A]">
        {activity.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                item.tone === "red"
                  ? "bg-[#EF4444]"
                  : item.tone === "yellow"
                  ? "bg-[#FACC15]"
                  : "bg-[#2196F3]"
              }`}
            />

            <div className="flex-1">
              <p className="text-[12px] font-semibold text-white">
                {item.object}{" "}

                <span className="font-normal text-[#7F91A5]">
                  {item.location}
                </span>
              </p>

              <p className="mt-1 text-[11px] text-[#A7B3C2]">
                {item.event}
              </p>
            </div>

            <span className="text-[10px] text-[#6F7D8E]">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   MAIN
   ========================================================================== */

function Network() {
  const [filter, setFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [regionFilter, setRegionFilter] =
    useState("ALL");

  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState(null);

  const [
    selectedTime,
    setSelectedTime,
  ] = useState(networkTimeline.end);

  const snapshot =
    getNetworkSnapshot(selectedTime);

  const topSummary = [
    [
      "Shipments",
      snapshot.metrics.inTransit,
    ],
    [
      "Vehicles",
      snapshot.metrics.activeVehicles,
    ],
    ["Warehouses", "36"],
    [
      "Alerts",
      snapshot.metrics.alerts,
    ],
  ];

  return (
    <main className="min-h-screen bg-[#020812] px-5 pb-12 pt-[98px] text-[#F5F7FA] lg:ml-[248px] lg:px-7">
      <div className="mx-auto max-w-[1600px]">
        <NetworkHeader selectedTime={selectedTime} />

        {/* TOP SUMMARY */}
        <div className="flex flex-wrap border-b border-[#18304A] py-4">
          {topSummary.map(
            ([label, value]) => (
              <div
                key={label}
                className="min-w-[50%] border-l border-[#18304A] py-1 pl-3 sm:min-w-0 sm:flex-1"
              >
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#6F7D8E]">
                  {label}
                </p>

                <p
                  className={`mt-1 text-xl font-semibold ${
                    label === "Alerts"
                      ? "text-[#F87171]"
                      : "text-white"
                  }`}
                >
                  {value}
                </p>
              </div>
            )
          )}
        </div>

        {/* FILTERS */}
        <NetworkFilters
          filter={filter}
          setFilter={setFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          search={search}
          setSearch={setSearch}
        />

        {/* MAP */}
        <NetworkMap
          filter={filter}
          search={search}
          statusFilter={statusFilter}
          regionFilter={regionFilter}
          selected={selected}
          onSelect={setSelected}
          onClose={() =>
            setSelected(null)
          }
          snapshot={snapshot}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
          onReturnLive={() =>
            setSelectedTime(
              networkTimeline.end
            )
          }
        />

        {/* STATUS */}
        <div className="mt-4">
          <NetworkStatus
            metrics={snapshot.metrics}
          />
        </div>

        {/* ACTIVITY */}
        <NetworkActivity
          activity={snapshot.activity}
        />
      </div>
    </main>
  );
}

export default Network;