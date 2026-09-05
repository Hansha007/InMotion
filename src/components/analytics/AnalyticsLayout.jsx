import { Outlet } from "react-router-dom";
import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsNav from "./AnalyticsNav";
import { AnalyticsProvider } from "./AnalyticsContext";
import "../../styles/analytics.css";

export default function AnalyticsLayout() {
  return (
    <AnalyticsProvider>
      <div className="analytics-container">
        <AnalyticsHeader />
        <AnalyticsNav />
        <main className="analytics-content">
          <Outlet />
        </main>
      </div>
    </AnalyticsProvider>
  );
}
