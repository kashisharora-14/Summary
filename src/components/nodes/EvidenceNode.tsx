import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { FileText, Calendar, Package, Fingerprint } from 'lucide-react';
import type { EvidenceEntity } from '@/types/case';

type EvidenceSubType = 'document' | 'physical' | 'forensic' | 'event';

interface EvidenceNodeData {
  entity: EvidenceEntity;
  isSelected: boolean;
  isHighlighted: boolean;
  isFaded: boolean;
  isSearchMatch: boolean;
  onClick: (id: string) => void;
}

const typeConfig: Record<EvidenceSubType, { icon: typeof FileText; color: string; bg: string; label: string }> = {
  document: { icon: FileText, color: '#2563eb', bg: '#eff6ff', label: 'Document' },
  event: { icon: Calendar, color: '#d97706', bg: '#fffbeb', label: 'Event' },
  physical: { icon: Package, color: '#dc2626', bg: '#fef2f2', label: 'Physical' },
  forensic: { icon: Fingerprint, color: '#7c3aed', bg: '#f5f3ff', label: 'Forensic' },
};

function EvidenceNodeBase({ data }: { data: EvidenceNodeData }) {
  const { entity, isSelected, isHighlighted, isFaded, isSearchMatch, onClick } = data;
  const config = typeConfig[entity.evidenceType];
  const Icon = config.icon;

  return (
    <div
      onClick={() => onClick(entity.id)}
      className={[
        'relative flex flex-col gap-2 rounded-xl border bg-white px-3 py-2.5 shadow-sm transition-all duration-200 cursor-pointer',
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-300 shadow-lg scale-105'
          : isHighlighted
          ? 'border-blue-400 shadow-md scale-[1.03]'
          : 'border-gray-200 hover:shadow-md hover:scale-[1.03]',
        isFaded ? 'opacity-30' : 'opacity-100',
        isSearchMatch ? 'ring-2 ring-green-400 ring-offset-1' : '',
      ].join(' ')}
      style={{ width: 160 }}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-gray-300 !border-none" />

      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: config.bg }}
        >
          <Icon size={16} style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate leading-tight">{entity.name}</p>
          <p className="text-[10px] text-gray-400">{entity.date}</p>
        </div>
      </div>

      <div
        className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
        style={{ backgroundColor: config.bg, color: config.color, alignSelf: 'flex-start' }}
      >
        {config.label}
      </div>

      <div
        className="h-12 rounded-lg border border-gray-100 overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: config.bg }}
      >
        <Icon size={28} style={{ color: config.color, opacity: 0.3 }} />
      </div>
    </div>
  );
}

export const EvidenceNode = memo(EvidenceNodeBase);
