import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function DataTable({
  data,
  columns,
  selectable = true,
  onSelectionChange,
  rowsPerPage = 5,
  searchPlaceholder = "Search records...",
  emptyMessage = "No records found.",
}) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = columns.some((column) => {
        if (!column.accessor) return false;

        return String(row[column.accessor] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());
      });

      const matchesStatus =
        statusFilter === "ALL" || row.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" || row.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [columns, data, priorityFilter, search, statusFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    if (!sortConfig.key) {
      return sorted;
    }

    sorted.sort((a, b) => {
      const first = String(a[sortConfig.key] ?? "");
      const second = String(b[sortConfig.key] ?? "");

      return sortConfig.direction === "asc"
        ? first.localeCompare(second)
        : second.localeCompare(first);
    });

    return sorted;
  }, [filteredData, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));

  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const visibleRows = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleSort = (accessor) => {
    setSortConfig((previous) => ({
      key: accessor,
      direction:
        previous.key === accessor && previous.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const toggleRow = (id) => {
    setSelectedRows((previous) => {
      const next = previous.includes(id)
        ? previous.filter((rowId) => rowId !== id)
        : [...previous, id];

      onSelectionChange?.(next);
      return next;
    });
  };

  const toggleAll = () => {
    const visibleIds = visibleRows.map((row) => row.id);

    const allSelected = visibleIds.every((id) =>
      selectedRows.includes(id)
    );

    const next = allSelected
      ? selectedRows.filter((id) => !visibleIds.includes(id))
      : [...new Set([...selectedRows, ...visibleIds])];

    setSelectedRows(next);
    onSelectionChange?.(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F7D8E]" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-[#18304A] bg-[#07111F] py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#6F7D8E] focus:border-[#2196F3]"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2.5 text-sm text-white outline-none focus:border-[#2196F3]"
          >
            <option value="ALL">All Statuses</option>
            <option value="ON TIME">On Time</option>
            <option value="IN TRANSIT">In Transit</option>
            <option value="AT RISK">At Risk</option>
            <option value="ATTENTION">Attention</option>
            <option value="DELAYED">Delayed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => {
              setPriorityFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2.5 text-sm text-white outline-none focus:border-[#2196F3]"
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#18304A] bg-[#0B1728]">
        <table className="min-w-[980px] w-full border-collapse text-left">
          <thead className="bg-[#0F1D30]">
            <tr>
              {selectable && (
                <th className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      visibleRows.length > 0 &&
                      visibleRows.every((row) =>
                        selectedRows.includes(row.id)
                      )
                    }
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-[#18304A] bg-[#07111F] accent-[#2196F3]"
                  />
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={column.accessor || column.header}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#A7B3C2]"
                >
                  {column.sortable ? (
                    <button
                      onClick={() => toggleSort(column.accessor)}
                      className="inline-flex items-center gap-2 text-left"
                    >
                      {column.header}
                      <ArrowUpDown className="h-3.5 w-3.5 text-[#6F7D8E]" />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleRows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[#18304A] bg-[#0B1728] transition hover:bg-[#0F1D30]"
              >
                {selectable && (
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="h-4 w-4 rounded border-[#18304A] bg-[#07111F] accent-[#2196F3]"
                    />
                  </td>
                )}

                {columns.map((column) => (
                  <td
                    key={column.accessor || column.header}
                    className="px-4 py-4 align-middle text-sm text-[#F5F7FA]"
                  >
                    {column.cell ? column.cell(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}

            {visibleRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-10 text-center text-sm text-[#6F7D8E]"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 text-sm text-[#A7B3C2] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {visibleRows.length} of {sortedData.length} records
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="inline-flex items-center gap-2 rounded-md border border-[#18304A] bg-[#07111F] px-3 py-1.5 text-sm text-[#F5F7FA] transition hover:border-[#2196F3] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="min-w-[100px] text-center text-[#F5F7FA]">
            Page {currentPage} of {Math.max(totalPages, 1)}
          </span>

          <button
            disabled={currentPage >= totalPages || sortedData.length === 0}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="inline-flex items-center gap-2 rounded-md border border-[#18304A] bg-[#07111F] px-3 py-1.5 text-sm text-[#F5F7FA] transition hover:border-[#2196F3] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}