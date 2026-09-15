import { Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Network from "../pages/network/Network";
import Alerts from "../pages/alerts/Alerts";
import Settings from "../pages/settings/Settings";
import Fleet from "../pages/fleet/Fleet";
import Warehouses from "../pages/warehouse/Warehouses";
import RoutesPage from "../pages/network/Routes";
import About from "../pages/about/About";
import Analytics from "../pages/analytics/Analytics";

function Placeholder({ name }) {
  return <h1>{name}</h1>;
}

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Landing />} />

      <Route path="/about" element={<About />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/access-denied"
        element={<Placeholder name="Access Denied" />}
      />


      {/* ================= APPLICATION ROUTES ================= */}

      <Route path="/app" element={<MainLayout />}>

        {/* ================= DASHBOARD ================= */}

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route path="about" element={<About />} />


        {/* ================= NETWORK ================= */}

        <Route path="network">

          <Route
            index
            element={<Network />}
          />

          <Route
            path="live"
            element={<Placeholder name="Live Network" />}
          />

          <Route
            path="routes"
            element={<RoutesPage />}
          />

          <Route
            path="routes/:routeId"
            element={<RoutesPage />}
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
            element={<Fleet />}
          />

          <Route
            path=":vehicleId"
            element={<Fleet />}
          />

        </Route>


        {/* ================= WAREHOUSES ================= */}

        <Route path="warehouses">

          <Route
            index
            element={<Warehouses />}
          />

          <Route
            path=":warehouseId"
            element={<Warehouses />}
          />

        </Route>


        {/* ================= OPERATIONS ================= */}

        <Route
          path="alerts"
          element={<Alerts />}
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
            element={<Analytics />}
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


        {/* ================= SETTINGS ================= */}

        <Route path="settings">

          <Route
            index
            element={<Settings />}
          />

          <Route
            path="profile"
            element={<Settings />}
          />

          <Route
            path="appearance"
            element={<Settings />}
          />

          <Route
          
            path="notifications"
            element={<Settings />}
          />

          <Route
            path="roles"
            element={<Settings />}
          />

        </Route>

      </Route>

    </Routes>
  );
}

export default AppRoutes;