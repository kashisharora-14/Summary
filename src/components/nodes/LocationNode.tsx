import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { MapPin } from 'lucide-react';
import type { LocationEntity } from '@/types/case';

interface LocationNodeData {
  entity: LocationEntity;
  isSelected: boolean;
  isHighlighted: boolean;
  isFaded: boolean;
  isSearchMatch: boolean;
  onClick: (id: string) => void;
}

function LocationNodeBase({ data }: { data: LocationNodeData }) {
  const { entity, isSelected, isHighlighted, isFaded, isSearchMatch, onClick } = data;

  return (
    <div
      onClick={() => onClick(entity.id)}
      className={[
        'relative flex flex-col gap-1.5 rounded-xl border bg-white px-3 py-2.5 shadow-sm transition-all duration-200 cursor-pointer',
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

      <div
        className="flex h-12 items-center justify-center rounded-lg border border-emerald-100"
        style={{
          background:
            'repeating-linear-gradient(45deg, #ecfdf5, #ecfdf5 6px, #f0fdf4 6px, #f0fdf4 12px)',
        }}
      >
        <MapPin size={20} className="text-emerald-600" />
      </div>

      <p className="text-xs font-semibold text-gray-800 truncate leading-tight">{entity.name}</p>
      <p className="text-[10px] text-gray-400 truncate">{entity.address}</p>
    </div>
  );
}

export const LocationNode = memo(LocationNodeBase);
