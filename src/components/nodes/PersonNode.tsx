import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { PersonEntity } from '@/types/case';

interface PersonNodeData {
  entity: PersonEntity;
  isSelected: boolean;
  isHighlighted: boolean;
  isFaded: boolean;
  isSearchMatch: boolean;
  onClick: (id: string) => void;
}

function PersonNodeBase({ data }: { data: PersonNodeData }) {
  const { entity, isSelected, isHighlighted, isFaded, isSearchMatch, onClick } = data;

  const riskColors: Record<string, string> = {
    high: 'bg-red-500 text-white',
    medium: 'bg-amber-500 text-white',
    low: 'bg-blue-500 text-white',
  };

  return (
    <div
      onClick={() => onClick(entity.id)}
      className={[
        'relative flex flex-col items-center gap-2 rounded-2xl border bg-white px-4 py-3 shadow-sm transition-all duration-200 cursor-pointer',
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-300 shadow-lg scale-105'
          : isHighlighted
          ? 'border-blue-400 shadow-md scale-[1.03]'
          : 'border-gray-200 hover:shadow-md hover:scale-[1.03]',
        isFaded ? 'opacity-30' : 'opacity-100',
        isSearchMatch ? 'ring-2 ring-green-400 ring-offset-1' : '',
      ].join(' ')}
      style={{ width: 168 }}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-gray-300 !border-none" />

      <div className="relative">
        <div className="h-14 w-14 overflow-hidden rounded-full shadow-sm ring-2 ring-gray-100">
          <img
            src={entity.photoUrl}
            alt={entity.name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div
            className="hidden h-full w-full items-center justify-center text-lg font-bold text-white"
            style={{ backgroundColor: entity.avatarColor }}
          >
            {entity.initials}
          </div>
        </div>
        <span
          className={[
            'absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow-sm',
            riskColors[entity.riskLevel],
          ].join(' ')}
        >
          {entity.riskLevel}
        </span>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-gray-800 leading-tight">{entity.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{entity.role}</p>
      </div>

      <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5">
        <div className="h-1.5 w-16 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${entity.riskScore}%`,
              backgroundColor: entity.avatarColor,
            }}
          />
        </div>
        <span className="text-[10px] font-semibold text-gray-500">{entity.riskScore}</span>
      </div>
    </div>
  );
}

export const PersonNode = memo(PersonNodeBase);
