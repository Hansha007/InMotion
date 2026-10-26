import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

function formatFilterValue(value) {
  if (value === null || value === undefined || value === "") return "";
  return String(value);
}

function getCellValue(row, accessor) {
  if (typeof accessor === "function") {
    return accessor(row);
  }

  if (accessor.includes(".")) {
    return accessor
      .split(".")
      .reduce((current, key) => (current == null ? "" : current[key]), row);
  }

  return row[accessor] ?? "";
}

function DataTable({
  data = [],
  columns = [],
  searchFields = ["id", "origin", "destination", "vehicle", "driver"],
  filterFields = ["status", "priority", "vehicle"],
  selectable = false,
  onSelectionChange,
  emptyMessage = "No records found.",
}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const pageSize = 8;

  const filterOptions = useMemo(() => {
    const options = {};

    filterFields.forEach((key) => {
      const values = data
        .map((row) => getCellValue(row, key))
        .filter((value) => value !== "" && value !== null && value !== undefined)
        .map((value) => formatFilterValue(value));

      const uniqueValues = [...new Set(values)];
      if (uniqueValues.length > 0) {
        options[key] = uniqueValues;
      }
    });

    return options;
  }, [data, filterFields]);

  const filteredData = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const rows = data.filter((row) => {
      const matchesQuery =
        !normalizedQuery ||
        searchFields.some((field) =>
          String(getCellValue(row, field) ?? "")
            .toLowerCase()
            .includes(normalizedQuery)
        );

      if (!matchesQuery) return false;

      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const rowValue = getCellValue(row, key);
        const normalizedRowValue = formatFilterValue(rowValue).toLowerCase();

        if (key === "lastUpdated" || key === "date") {
          return normalizedRowValue.startsWith(String(value).toLowerCase());
        }

        return normalizedRowValue === String(value).toLowerCase();
      });
    });

    if (sortConfig.key) {
      rows.sort((a, b) => {
        const aValue = getCellValue(a, sortConfig.key);
        const bValue = getCellValue(b, sortConfig.key);

        const parsedA = isNaN(Number(aValue)) ? aValue : Number(aValue);
        const parsedB = isNaN(Number(bValue)) ? bValue : Number(bValue);

        if (parsedA < parsedB) return sortConfig.direction === "asc" ? -1 : 1;
        if (parsedA > parsedB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return rows;
  }, [data, filters, query, searchFields, sortConfig]);

  useEffect(() => {
    onSelectionChange?.(selectedIds);
  }, [onSelectionChange, selectedIds]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current.key !== key) {
        return { key, direction: "asc" };
      }

      return {
        key,
        direction: current.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  const toggleSelection = (id) => {
    setSelectedIds((current) => {
      const exists = current.includes(id);
      const next = exists ? current.filter((item) => item !== id) : [...current, id];
      return next;
    });
  };

  const toggleAll = () => {
    const visibleIds = currentPageData.map((row) => row.id);
    const allVisibleSelected = visibleIds.every((id) => selectedIds.includes(id));

    setSelectedIds((current) => {
      if (allVisibleSelected) {
        return current.filter((id) => !visibleIds.includes(id));
      }

      return [...new Set([...current, ...visibleIds])];
    });
  };

  const hasAnyRows = filteredData.length > 0;
  const hasActiveFilters =
    Object.values(filters).some(Boolean) || Boolean(query.trim());

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F7D8E]" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search shipments, vehicles, drivers..."
            aria-label="Search shipments by ID, origin, destination, vehicle, or driver"
            className="w-full rounded-lg border border-[#18304A] bg-[#07111F] py-2.5 pl-9 pr-3 text-sm text-[#F5F7FA] placeholder-[#6F7D8E] outline-none transition focus:border-[#2196F3]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filterFields.map((filterKey) => {
            const options = filterOptions[filterKey] || [];
            if (options.length === 0) return null;

            const value = filters[filterKey] || "";
            const label = filterKey.replace(/([A-Z])/g, " $1");

            return (
              <div key={filterKey} className="relative">
                <select
                  value={value}
                  onChange={(event) => {
                    setFilters((current) => ({
                      ...current,
                      [filterKey]: event.target.value,
                    }));
                    setPage(1);
                  }}
                  aria-label={`Filter by ${label}`}
                  className="appearance-none rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2 pr-8 text-xs font-medium uppercase tracking-[0.12em] text-[#A7B3C2] outline-none transition focus:border-[#2196F3]"
                >
                  <option value="">{label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6F7D8E]" />
              </div>
            );
          })}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setFilters({});
                setQuery("");
                setPage(1);
              }}
              className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2 text-xs font-medium text-[#A7B3C2] transition hover:border-[#2196F3] hover:text-white"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#18304A] bg-[#07111F]">
        <div className="overflow-x-auto">
          <table className="min-w-[1050px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#0B1728] text-left text-[11px] uppercase tracking-[0.14em] text-[#6F7D8E]">
                {selectable && (
                  <th className="border-b border-[#18304A] px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={
                        currentPageData.length > 0 &&
                        currentPageData.every((row) => selectedIds.includes(row.id))
                      }
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-[#18304A] bg-[#07111F] text-[#2196F3]"
                    />
                  </th>
                )}

                {columns.map((column) => {
                  const isSortable = column.sortable !== false;
                  const hasSort = sortConfig.key === column.accessor;

                  return (
                    <th
                      key={column.id ?? String(column.accessor)}
                      className="border-b border-[#18304A] px-4 py-3 font-medium"
                    >
                      {isSortable ? (
                        <button
                          type="button"
                          onClick={() => handleSort(column.accessor)}
                          className="inline-flex items-center gap-2 text-left transition hover:text-[#F5F7FA]"
                        >
                          {column.header}
                          {hasSort ? (
                            sortConfig.direction === "asc" ? (
                              <ArrowUp className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowDown className="h-3.5 w-3.5" />
                            )
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-70" />
                          )}
                        </button>
                      ) : (
                        <span>{column.header}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {currentPageData.length > 0 ? (
                currentPageData.map((row) => (
                  <tr key={row.id} className="border-b border-[#18304A] bg-[#07111F] transition hover:bg-[#0B1728]">
                    {selectable && (
                      <td className="border-b border-[#18304A] px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => toggleSelection(row.id)}
                          className="h-4 w-4 rounded border-[#18304A] bg-[#07111F] text-[#2196F3]"
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={`${row.id}-${column.id ?? String(column.accessor)}`}
                        className="border-b border-[#18304A] px-4 py-3 text-sm text-[#F5F7FA]"
                      >
                        {column.cell ? column.cell(row) : formatFilterValue(getCellValue(row, column.accessor))}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-4 py-10 text-center text-sm text-[#A7B3C2]"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {hasAnyRows && (
        <div className="flex flex-col gap-3 border-t border-[#18304A] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#A7B3C2]">
            Showing {filteredData.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + pageSize, filteredData.length)} of {filteredData.length} shipments
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2 text-sm text-[#F5F7FA] transition hover:border-[#2196F3] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-[#A7B3C2]">
              Page {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="rounded-lg border border-[#18304A] bg-[#07111F] px-3 py-2 text-sm text-[#F5F7FA] transition hover:border-[#2196F3] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
