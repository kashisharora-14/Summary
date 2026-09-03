import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Phone, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import type { CdrEntity } from '@/types/case';

interface CdrNodeData {
  entity: CdrEntity;
  isSelected: boolean;
  isHighlighted: boolean;
  isFaded: boolean;
  isSearchMatch: boolean;
  onClick: (id: string) => void;
}

function CdrNodeBase({ data }: { data: CdrNodeData }) {
  const { entity, isSelected, isHighlighted, isFaded, isSearchMatch, onClick } = data;

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
      style={{ width: 180 }}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-gray-300 !border-none" />

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-violet-50">
          <Phone size={15} className="text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate leading-tight">{entity.name}</p>
          <p className="text-[10px] text-gray-400 truncate">{entity.number}</p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-2 py-1.5">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-semibold text-gray-400">Calls</span>
          <span className="text-sm font-bold text-gray-700">{entity.totalCalls}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] uppercase font-semibold text-gray-400">Top Contact</span>
          <span className="text-[10px] font-medium text-violet-600 truncate max-w-[100px]">{entity.frequentContact}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <ArrowUpRight size={10} className="text-emerald-500" />
        <ArrowDownLeft size={10} className="text-blue-500" />
        <span className="text-[9px] text-gray-400">Last: {entity.lastActivity}</span>
      </div>
    </div>
  );
}

export const CdrNode = memo(CdrNodeBase);
