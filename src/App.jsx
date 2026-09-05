import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import AnalyticsLayout from "./components/analytics/AnalyticsLayout";

// Analytics Pages
import Analytics from "./pages/analytics/Analytics";
import DeliveryAnalytics from "./pages/analytics/DeliveryAnalytics";
import FleetAnalytics from "./pages/analytics/FleetAnalytics";
import RouteAnalytics from "./pages/analytics/RouteAnalytics";
import WarehouseAnalytics from "./pages/analytics/WarehouseAnalytics";
import PerformanceAnalytics from "./pages/analytics/PerformanceAnalytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route element={<AnalyticsLayout />}>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/delivery" element={<DeliveryAnalytics />} />
            <Route path="/analytics/fleet" element={<FleetAnalytics />} />
            <Route path="/analytics/routes" element={<RouteAnalytics />} />
            <Route path="/analytics/warehouses" element={<WarehouseAnalytics />} />
            <Route path="/analytics/performance" element={<PerformanceAnalytics />} />
          </Route>
          {/* Default redirect to /analytics */}
          <Route path="/" element={<Navigate to="/analytics" replace />} />
          <Route path="*" element={<Navigate to="/analytics" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
