import { Routes, Route } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import MainLayout from "../layouts/MainLayout";

function Placeholder({ name }) {
  return <h1>{name}</h1>;
}

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Landing />} />

      <Route
        path="/login"
        element={<Placeholder name="Login" />}
      />

      <Route
        path="/forgot-password"
        element={<Placeholder name="Forgot Password" />}
      />

      <Route
        path="/access-denied"
        element={<Placeholder name="Access Denied" />}
      />


      {/* ================= APPLICATION ROUTES ================= */}

      <Route path="/app" element={<MainLayout />}>

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={<Placeholder name="Dashboard" />}
        />


        {/* ================= NETWORK ================= */}

        <Route path="network">

          <Route
            index
            element={<Placeholder name="Network" />}
          />

          <Route
            path="live"
            element={<Placeholder name="Live Network" />}
          />

          <Route
            path="routes"
            element={<Placeholder name="Routes" />}
          />

          <Route
            path="routes/:routeId"
            element={<Placeholder name="Route Details" />}
          />

        </Route>


        {/* ================= SHIPMENTS ================= */}

        <Route path="shipments">

          <Route
            index
            element={<Placeholder name="Shipments" />}
          />

          <Route
            path=":shipmentId"
            element={<Placeholder name="Shipment Details" />}
          />

        </Route>


        {/* ================= FLEET ================= */}

        <Route path="fleet">

          <Route
            index
            element={<Placeholder name="Fleet" />}
          />

          <Route
            path=":vehicleId"
            element={<Placeholder name="Vehicle Details" />}
          />

        </Route>


        {/* ================= WAREHOUSES ================= */}

        <Route path="warehouses">

          <Route
            index
            element={<Placeholder name="Warehouses" />}
          />

          <Route
            path=":warehouseId"
            element={<Placeholder name="Warehouse Details" />}
          />

        </Route>


        {/* ================= OPERATIONS ================= */}

        <Route
          path="alerts"
          element={<Placeholder name="Alerts" />}
        />

        <Route
          path="actions"
          element={<Placeholder name="Actions" />}
        />

        <Route
          path="monitoring"
          element={<Placeholder name="Monitoring" />}
        />


        {/* ================= ANALYTICS ================= */}

        <Route path="analytics">

          <Route
            index
            element={<Placeholder name="Analytics" />}
          />

          <Route
            path="delivery"
            element={<Placeholder name="Delivery Analytics" />}
          />

          <Route
            path="fleet"
            element={<Placeholder name="Fleet Analytics" />}
          />

          <Route
            path="routes"
            element={<Placeholder name="Route Analytics" />}
          />

          <Route
            path="warehouses"
            element={<Placeholder name="Warehouse Analytics" />}
          />

          <Route
            path="performance"
            element={<Placeholder name="Performance Analytics" />}
          />

        </Route>


        {/* ================= SYSTEM ================= */}

        <Route
          path="notifications"
          element={<Placeholder name="Notifications" />}
        />


        {/* Settings */}
        <Route path="settings">

          <Route
            index
            element={<Placeholder name="Settings" />}
          />

          <Route
            path="profile"
            element={<Placeholder name="Profile" />}
          />

          <Route
            path="appearance"
            element={<Placeholder name="Appearance" />}
          />

          <Route
            path="notifications"
            element={<Placeholder name="Notification Settings" />}
          />

          <Route
            path="roles"
            element={<Placeholder name="Roles & Permissions" />}
          />

        </Route>

      </Route>

    </Routes>
  );
}

export default AppRoutes;