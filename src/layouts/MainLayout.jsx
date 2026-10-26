import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function MainLayout() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  useEffect(() => {
    if (!isSidebarOpen) return undefined;

    const mainElement = mainRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousMainOverflow = mainElement?.style.overflowY;
    const previouslyFocusedElement = document.activeElement;
    document.body.style.overflow = "hidden";
    if (mainElement) mainElement.style.overflowY = "hidden";

    document.querySelector("#primary-navigation a")?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableLinks = document.querySelectorAll(
        "#primary-navigation a[href]"
      );
      const firstLink = focusableLinks[0];
      const lastLink = focusableLinks[focusableLinks.length - 1];

      if (event.shiftKey && document.activeElement === firstLink) {
        event.preventDefault();
        lastLink?.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        firstLink?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (mainElement) {
        mainElement.style.overflowY = previousMainOverflow ?? "";
      }
      previouslyFocusedElement?.focus?.({ preventScroll: true });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const desktopLayout = window.matchMedia("(min-width: 1024px)");
    const closeDrawer = (event) => {
      if (event.matches) setIsSidebarOpen(false);
    };

    desktopLayout.addEventListener("change", closeDrawer);
    return () => desktopLayout.removeEventListener("change", closeDrawer);
  }, []);

  return (
    <div className="h-dvh overflow-hidden bg-[#020812] text-[#F5F7FA]">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-[#000814]/70 backdrop-blur-[2px] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
      />

      <div className="ml-[var(--sidebar-width)] h-dvh min-w-0 overflow-hidden">
        <Topbar
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen((open) => !open)}
        />

        <div
          ref={mainRef}
          className="h-dvh min-w-0 overflow-y-auto overflow-x-hidden pt-[var(--topbar-height)]"
        >
          <div className="mx-auto w-full max-w-[1600px] min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;