import { useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, Gauge, MapPinned, Phone, Route, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useShipmentStore } from "../../store/shipmentStore";

const statusStyles = {
  "ON TIME": "border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]",
  "IN TRANSIT": "border-[#2196F3]/30 bg-[#2196F3]/10 text-[#2196F3]",
  "AT RISK": "border-[#FACC15]/30 bg-[#FACC15]/10 text-[#FACC15]",
  ATTENTION: "border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316]",
  DELAYED: "border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444]",
};

const priorityStyles = {
  High: "text-[#EF4444]",
  Medium: "text-[#FACC15]",
  Low: "text-[#A7B3C2]",
};

function ShipmentDetails() {
  const navigate = useNavigate();
  const { shipmentId } = useParams();
  const [notice, setNotice] = useState("");
  const [showActionPanel, setShowActionPanel] = useState(false);

  const shipment = useShipmentStore(
    (state) => state.shipments.find((item) => item.id === shipmentId)
  );
  const updateShipment = useShipmentStore((state) => state.updateShipment);

  const journeyProgress = useMemo(() => {
    if (!shipment?.journey?.length) return 0;

    const completed = shipment.journey.filter((step) => step.completed).length;

    return Math.round((completed / shipment.journey.length) * 100);
  }, [shipment]);

  const handleAction = (action) => {
    if (!shipment) return;

    switch (action) {
      case "network":
        navigate("/app/network");
        break;
      case "priority":
        updateShipment(shipment.id, { priority: "High" });
        setNotice(`Priority raised for ${shipment.id}.`);
        break;
      case "monitor":
        updateShipment(shipment.id, {
          status: "ATTENTION",
          possibleReason: "Escalated for active monitoring",
        });
        setNotice(`Live monitoring enabled for ${shipment.id}.`);
        break;
      case "vehicle":
        updateShipment(shipment.id, {
          vehicle: shipment.vehicle.includes("-R") ? shipment.vehicle : `${shipment.vehicle}-R`,
        });
        setNotice(`Vehicle reassignment command queued for ${shipment.id}.`);
        break;
      case "driver":
        setNotice(`Driver contact workflow opened for ${shipment.driver}.`);
        break;
      default:
        setNotice("Action queued for operations review.");
        break;
    }
  };

  if (!shipment) {
    return (
      <div className="min-h-[60vh] rounded-xl border border-[#18304A] bg-[#0B1728] p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EF4444]">
          Shipment not found
        </p>

        <h1 className="mt-3 text-2xl font-bold text-[#F5F7FA]">
          No shipment matches {shipmentId}.
        </h1>

        <button
          onClick={() => navigate("/app/shipments")}
          className="mt-6 rounded-lg bg-[#2196F3] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Back to Shipments
        </button>
      </div>
    );
  }

  const isProblem =
    shipment.status === "DELAYED" ||
    shipment.status === "AT RISK" ||
    shipment.status === "ATTENTION";

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <button
            onClick={() => navigate("/app/shipments")}
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#A7B3C2] transition hover:text-[#2196F3]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shipments
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-[#F5F7FA]">
              {shipment.id}
            </h1>

            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                statusStyles[shipment.status] || "border-[#18304A] bg-[#07111F] text-[#A7B3C2]"
              }`}
            >
              {shipment.status}
            </span>

            <span
              className={`text-xs font-semibold ${
                priorityStyles[shipment.priority] || "text-[#A7B3C2]"
              }`}
            >
              {shipment.priority} Priority
            </span>
          </div>

          <p className="mt-2 text-sm text-[#A7B3C2]">
            {shipment.origin} → {shipment.destination}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleAction("network")}
            className="inline-flex items-center gap-2 rounded-lg border border-[#18304A] bg-[#07111F] px-4 py-2.5 text-sm font-medium text-[#F5F7FA] transition hover:border-[#2196F3]"
          >
            <MapPinned className="h-4 w-4" />
            View on Network
          </button>

          <button
            onClick={() => setShowActionPanel((value) => !value)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2196F3] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <ShieldCheck className="h-4 w-4" />
            Take Action
          </button>

          <button
            onClick={() => handleAction("driver")}
            className="inline-flex items-center gap-2 rounded-lg border border-[#18304A] bg-[#07111F] px-4 py-2.5 text-sm font-medium text-[#F5F7FA] transition hover:border-[#2196F3]"
          >
            <Phone className="h-4 w-4" />
            Contact Driver
          </button>
        </div>
      </div>

      {notice && (
        <div className="rounded-lg border border-[#18304A] bg-[#0F1D30] px-4 py-3 text-sm text-[#F5F7FA]">
          {notice}
        </div>
      )}

      {showActionPanel && (
        <div className="rounded-xl border border-[#18304A] bg-[#0B1728] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-[#F5F7FA]">
              Response Options
            </h2>
            <span className="text-xs uppercase tracking-[0.14em] text-[#6F7D8E]">
              ops center
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleAction("vehicle")}
              className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2 text-sm text-[#F5F7FA] transition hover:border-[#2196F3]"
            >
              Reassign Vehicle
            </button>
            <button
              onClick={() => handleAction("priority")}
              className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2 text-sm text-[#F5F7FA] transition hover:border-[#2196F3]"
            >
              Change Priority
            </button>
            <button
              onClick={() => handleAction("monitor")}
              className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2 text-sm text-[#F5F7FA] transition hover:border-[#2196F3]"
            >
              Monitor Closely
            </button>
            <button
              onClick={() => handleAction("driver")}
              className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2 text-sm text-[#F5F7FA] transition hover:border-[#2196F3]"
            >
              Contact Driver
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ["ETA", shipment.eta, Gauge],
          ["Current Location", shipment.currentLocation, MapPinned],
          ["Vehicle", shipment.vehicle, Route],
          ["Driver", shipment.driver, Phone],
          ["Distance Remaining", shipment.distanceRemaining, AlertTriangle],
          ["Last Updated", shipment.lastUpdated, CheckCircle2],
        ].map(([label, value, Icon]) => (
          <div
            key={label}
            className="rounded-xl border border-[#18304A] bg-[#0B1728] p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#6F7D8E]">
                {label}
              </p>
              <Icon className="h-4 w-4 text-[#6F7D8E]" />
            </div>
            <p className="mt-3 text-base font-semibold text-[#F5F7FA]">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-xl border border-[#18304A] bg-[#0B1728] p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#F5F7FA]">
                Journey Timeline
              </h2>
              <p className="mt-1 text-sm text-[#6F7D8E]">
                Current shipment progress from origin to destination.
              </p>
            </div>

            <span className="text-sm font-semibold text-[#2196F3]">
              {journeyProgress}% complete
            </span>
          </div>

          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#07111F]">
            <div
              className="h-full rounded-full bg-[#2196F3] transition-all"
              style={{ width: `${journeyProgress}%` }}
            />
          </div>

          <div className="mt-7 space-y-6">
            {shipment.journey.map((step, index) => (
              <div key={`${step.title}-${index}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      step.completed
                        ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                        : "border-[#18304A] bg-[#07111F] text-[#6F7D8E]"
                    }`}
                  >
                    {step.completed ? "✓" : index + 1}
                  </div>

                  {index < shipment.journey.length - 1 && (
                    <div
                      className={`mt-2 h-10 w-px ${
                        step.completed ? "bg-[#22C55E]/40" : "bg-[#18304A]"
                      }`}
                    />
                  )}
                </div>

                <div className="min-w-0 pb-2">
                  <p className="font-medium text-[#F5F7FA]">{step.title}</p>
                  <p className="mt-1 text-xs text-[#6F7D8E]">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#18304A] bg-[#0B1728] p-5">
          <h2 className="text-lg font-semibold text-[#F5F7FA]">
            Operational Status
          </h2>

          <div
            className={`mt-5 rounded-lg border p-4 ${
              isProblem
                ? "border-[#FACC15]/20 bg-[#FACC15]/5"
                : "border-[#22C55E]/20 bg-[#22C55E]/5"
            }`}
          >
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                isProblem ? "text-[#FACC15]" : "text-[#22C55E]"
              }`}
            >
              {isProblem ? "Attention Required" : "Operating Normally"}
            </p>

            <p className="mt-3 text-sm leading-6 text-[#A7B3C2]">
              {shipment.issue ||
                "No active operational issue has been reported for this shipment."}
            </p>
          </div>

          {shipment.possibleReason && (
            <div className="mt-4 border-t border-[#18304A] pt-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#6F7D8E]">
                Possible Reason
              </p>

              <p className="mt-2 text-sm text-[#F5F7FA]">
                {shipment.possibleReason}
              </p>
            </div>
          )}

          {shipment.delayDuration && (
            <div className="mt-4 border-t border-[#18304A] pt-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#6F7D8E]">
                Delay Duration
              </p>

              <p className="mt-2 text-sm font-semibold text-[#EF4444]">
                {shipment.delayDuration}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ShipmentDetails;
