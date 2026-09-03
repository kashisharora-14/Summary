import {
  Phone,
  Fingerprint,
  Banknote,
  Instagram,
  MapPin,
  Eye,
  FileSearch,
  Upload,
  CheckCircle2,
  Clock3,
  Loader2,
} from 'lucide-react';
import type { DataSource, DataSourceType } from '@/types/case';

interface DataSourcesPanelProps {
  sources: DataSource[];
  isExpanded: boolean;
  onToggle: () => void;
}

const sourceConfig: Record<DataSourceType, { icon: typeof Phone; color: string; bg: string }> = {
  cdr: { icon: Phone, color: '#7c3aed', bg: '#f5f3ff' },
  idpr: { icon: Fingerprint, color: '#2563eb', bg: '#eff6ff' },
  bank: { icon: Banknote, color: '#059669', bg: '#ecfdf5' },
  social: { icon: Instagram, color: '#db2777', bg: '#fdf2f8' },
  location: { icon: MapPin, color: '#0891b2', bg: '#ecfeff' },
  surveillance: { icon: Eye, color: '#d97706', bg: '#fffbeb' },
  forensic: { icon: FileSearch, color: '#dc2626', bg: '#fef2f2' },
};

const statusConfig: Record<DataSource['status'], { icon: typeof CheckCircle2; label: string; color: string }> = {
  processed: { icon: CheckCircle2, label: 'Processed', color: '#059669' },
  pending: { icon: Clock3, label: 'Pending', color: '#d97706' },
  reviewing: { icon: Loader2, label: 'Reviewing', color: '#2563eb' },
};

export function DataSourcesPanel({ sources, isExpanded, onToggle }: DataSourcesPanelProps) {
  return (
    <div className={`absolute left-3 right-3 top-16 z-10 transition-all duration-300 sm:left-auto sm:right-4 sm:top-4 ${isExpanded ? 'w-auto sm:w-72' : 'w-52'}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition-all hover:shadow-md"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
            <Upload size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-700">Data Sources</span>
          <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-500">{sources.length}</span>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-2 flex max-h-[30vh] flex-col gap-1.5 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2.5 shadow-sm sm:max-h-[60vh]">
          {sources.map((source) => {
            const config = sourceConfig[source.type];
            const Icon = config.icon;
            const status = statusConfig[source.status];
            const StatusIcon = status.icon;

            return (
              <div key={source.id} className="flex items-start gap-2.5 rounded-lg border border-gray-100 px-2.5 py-2 transition-colors hover:bg-gray-50">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: config.bg }}>
                  <Icon size={15} style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{source.label}</p>
                  <p className="text-[10px] text-gray-400 truncate">{source.fileName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400">{source.recordCount} records</span>
                    <span className="text-[10px] text-gray-300">·</span>
                    <span className="text-[10px] text-gray-400">{source.uploadedAt}</span>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <StatusIcon
                    size={12}
                    style={{ color: status.color }}
                    className={source.status === 'reviewing' ? 'animate-spin' : ''}
                  />
                  <span className="text-[9px] font-medium" style={{ color: status.color }}>{status.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
