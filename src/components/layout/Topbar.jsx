import {
  Search,
  Bell,
  ChevronDown,
  Circle,
} from "lucide-react";

function Topbar() {
  return (
    <header className="fixed left-[248px] right-0 top-0 z-30 flex h-[72px] items-center border-b border-[#18304A] bg-[#020812]/95 px-6 backdrop-blur-md">
      {/* Search */}
      <div className="flex w-[430px] items-center gap-3 rounded-lg border border-[#18304A] bg-[#07111F] px-3.5 py-2.5 transition-all duration-200 focus-within:border-[#2196F3]/60 focus-within:shadow-[0_0_20px_rgba(33,150,243,0.06)]">
        <Search
          size={17}
          strokeWidth={1.8}
          className="shrink-0 text-[#7F91A8]"
        />

        <input
          type="text"
          placeholder="Search shipments, vehicles, warehouses, routes..."
          className="min-w-0 flex-1 bg-transparent text-[12px] text-[#F5F7FA] outline-none placeholder:text-[#6F7D8E]"
        />

        <div className="flex items-center gap-1 rounded-md border border-[#18304A] bg-[#0B1728] px-2 py-1 text-[9px] text-[#6F7D8E]">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* Right side */}
      <div className="ml-auto flex h-full items-center">
        {/* Network Live */}
        <div className="flex items-center gap-2 px-5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-30" />

            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E] shadow-[0_0_9px_rgba(34,197,94,0.65)]" />
          </span>

          <span className="text-[11px] font-medium text-[#22C55E]">
            Network Live
          </span>
        </div>

        <div className="h-8 w-px bg-[#18304A]" />

        {/* Last updated */}
        <div className="px-5">
          <p className="text-[9px] leading-3 text-[#6F7D8E]">
            Last updated
          </p>

          <p className="mt-1 text-[10px] font-medium text-[#A7B3C2]">
            Sep 13, 2026&nbsp;&nbsp;14:32
          </p>
        </div>

        <div className="h-8 w-px bg-[#18304A]" />

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="group relative mx-3 flex h-10 w-10 items-center justify-center rounded-lg text-[#8B9AAF] transition-all duration-200 hover:bg-[#0B1728] hover:text-[#F5F7FA]"
        >
          <Bell
            size={19}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />

          <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#EF4444] px-1 text-[9px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]">
            3
          </span>
        </button>

        <div className="h-8 w-px bg-[#18304A]" />

        {/* Admin */}
        <button
          type="button"
          className="group flex h-full items-center gap-3 px-4 transition-colors duration-200 hover:bg-[#07111F]"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#18304A] bg-[#0B1728] text-[10px] font-semibold text-[#2196F3] transition-all duration-200 group-hover:border-[#2196F3]/40 group-hover:shadow-[0_0_14px_rgba(33,150,243,0.15)]">
            HM

            <span className="absolute bottom-[-1px] right-[-1px] h-2.5 w-2.5 rounded-full border-2 border-[#020812] bg-[#22C55E]" />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-[11px] font-medium leading-4 text-[#F5F7FA]">
              Hansha Malik
            </p>

            <p className="text-[9px] leading-3 text-[#6F7D8E]">
              Admin
            </p>
          </div>

          <ChevronDown
            size={14}
            strokeWidth={1.8}
            className="ml-2 text-[#6F7D8E] transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </button>
      </div>
    </header>
  );
}

export default Topbar;