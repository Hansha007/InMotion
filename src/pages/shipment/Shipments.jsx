import { useMemo, useState } from "react";
import { ArrowUpRight, CheckCheck, MapPinned, PackageSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/table/DataTable";
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

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
        statusStyles[status] || "border-[#18304A] bg-[#07111F] text-[#A7B3C2]"
      }`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span
      className={`text-xs font-semibold ${
        priorityStyles[priority] || "text-[#A7B3C2]"
      }`}
    >
      {priority}
    </span>
  );
}

function Shipments() {
  const navigate = useNavigate();
  const shipments = useShipmentStore((state) => state.shipments);
  const markPriority = useShipmentStore((state) => state.markPriority);

  const [selectedIds, setSelectedIds] = useState([]);

  const summary = useMemo(() => {
    return {
      total: shipments.length,
      onTime: shipments.filter((shipment) => shipment.status === "ON TIME")
        .length,
      inTransit: shipments.filter(
        (shipment) => shipment.status === "IN TRANSIT"
      ).length,
      atRisk: shipments.filter(
        (shipment) =>
          shipment.status === "AT RISK" ||
          shipment.status === "ATTENTION"
      ).length,
      delayed: shipments.filter(
        (shipment) => shipment.status === "DELAYED"
      ).length,
    };
  }, [shipments]);

  const columns = useMemo(
    () => [
      {
        header: "Shipment ID",
        accessor: "id",
        sortable: true,
        cell: (row) => (
          <button
            onClick={() => navigate(`/app/shipments/${row.id}`)}
            className="font-semibold text-[#2196F3] transition hover:text-[#6ab6ff]"
          >
            {row.id}
          </button>
        ),
      },
      {
        header: "Route",
        accessor: "route",
        sortable: true,
        cell: (row) => (
          <span className="text-[#F5F7FA]">
            {row.origin} → {row.destination}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        sortable: true,
        cell: (row) => <StatusBadge status={row.status} />,
      },
      {
        header: "ETA",
        accessor: "eta",
        sortable: true,
      },
      {
        header: "Priority",
        accessor: "priority",
        sortable: true,
        cell: (row) => <PriorityBadge priority={row.priority} />,
      },
      {
        header: "Vehicle",
        accessor: "vehicle",
        sortable: true,
      },
      {
        header: "Driver",
        accessor: "driver",
        sortable: true,
      },
      {
        header: "Last Updated",
        accessor: "lastUpdated",
        sortable: true,
      },
      {
        header: "Actions",
        accessor: "id",
        cell: (row) => (
          <button
            onClick={() => navigate(`/app/shipments/${row.id}`)}
            className="inline-flex items-center gap-2 rounded-md border border-[#18304A] bg-[#07111F] px-3 py-1.5 text-xs font-medium text-[#A7B3C2] transition hover:border-[#2196F3] hover:text-white"
          >
            View
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        ),
      },
    ],
    [navigate]
  );

  const handleMarkPriority = () => {
    if (selectedIds.length === 0) return;

    markPriority(selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2196F3]">
            Operations
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F7FA]">
            SHIPMENTS
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#A7B3C2]">
            Monitor and manage every shipment across the logistics network.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleMarkPriority}
            disabled={selectedIds.length === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-[#18304A] bg-[#07111F] px-4 py-2.5 text-sm font-medium text-[#F5F7FA] transition hover:border-[#2196F3] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCheck className="h-4 w-4" />
            Bulk Priority
          </button>

          <button
            onClick={() => navigate("/app/network")}
            className="inline-flex items-center gap-2 rounded-lg border border-[#18304A] bg-[#07111F] px-4 py-2.5 text-sm font-medium text-[#F5F7FA] transition hover:border-[#2196F3]"
          >
            <MapPinned className="h-4 w-4" />
            Network View
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total", summary.total, "text-[#F5F7FA]", "#2196F3"],
          ["On Time", summary.onTime, "text-[#22C55E]", "#22C55E"],
          ["At Risk", summary.atRisk, "text-[#FACC15]", "#FACC15"],
          ["Delayed", summary.delayed, "text-[#EF4444]", "#EF4444"],
        ].map(([label, value, color, accent]) => (
          <div
            key={label}
            className="rounded-xl border border-[#18304A] bg-[#0B1728] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#6F7D8E]">
                {label}
              </p>
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
            </div>
            <p className={`mt-3 text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-[#18304A] bg-[#0B1728]">
        <div className="border-b border-[#18304A] px-5 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#F5F7FA]">
                Shipment Overview
              </h2>
              <p className="mt-1 text-sm text-[#6F7D8E]">
                Active routes, exception handling and delivery performance.
              </p>
            </div>

            {selectedIds.length > 0 && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2196F3]/30 bg-[#2196F3]/10 px-2.5 py-1 text-xs font-semibold text-[#2196F3]">
                <PackageSearch className="h-3.5 w-3.5" />
                {selectedIds.length} selected
              </span>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <DataTable
            data={shipments}
            columns={columns}
            selectable
            onSelectionChange={setSelectedIds}
            emptyMessage="No shipments match the current filters."
          />
        </div>
      </section>
    </div>
  );
}

export default Shipments;
