import { Search, Settings, Bell, Shield } from 'lucide-react';

interface HeaderProps {
  caseId: string;
  caseTitle: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ caseId, caseTitle, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="flex h-14 min-w-0 items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
            <Shield size={18} className="text-white" />
          </div>
          <span className="hidden text-lg font-bold tracking-tight text-gray-900 sm:inline">AEGIS</span>
        </div>
        <div className="hidden h-6 w-px bg-gray-200 sm:block" />
        <div className="flex min-w-0 items-center gap-2">
          <span className="whitespace-nowrap text-[11px] font-medium text-gray-400 sm:text-xs">Case #{caseId}</span>
          <span className="hidden max-w-[180px] truncate text-sm font-semibold text-gray-700 lg:inline">{caseTitle}</span>
        </div>
      </div>

      <div className="relative mx-1 min-w-0 flex-1 sm:mx-4 sm:max-w-md lg:mx-6">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-2 text-xs text-gray-700 placeholder:text-gray-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 sm:pr-4 sm:text-sm"
        />
      </div>

      <div className="flex flex-shrink-0 items-center gap-1 sm:gap-3">
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="hidden text-xs font-medium text-emerald-700 sm:inline">Live</span>
        </div>

        <button className="hidden h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 sm:flex">
          <Bell size={17} />
        </button>
        <button className="hidden h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 sm:flex">
          <Settings size={17} />
        </button>

        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white shadow-sm">
          AK
        </div>
      </div>
    </header>
  );
}
