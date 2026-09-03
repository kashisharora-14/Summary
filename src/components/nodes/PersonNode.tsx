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
  const role = entity.role.toLowerCase();
  const isSuspect = role.includes('suspect') || role.includes('accomplice');
  const isWitness = role.includes('witness');

  const roleCardColors = isSuspect
    ? 'border-red-200 bg-red-50 hover:shadow-md hover:scale-[1.03]'
    : isWitness
    ? 'border-blue-200 bg-blue-50 hover:shadow-md hover:scale-[1.03]'
    : 'border-gray-200 bg-white hover:shadow-md hover:scale-[1.03]';

  return (
    <div
      onClick={() => onClick(entity.id)}
      className={[
        'relative flex flex-col items-center gap-2 rounded-2xl border px-4 py-3 shadow-sm transition-all duration-200 cursor-pointer',
        isSelected
          ? 'border-blue-500 bg-white ring-2 ring-blue-300 shadow-lg scale-105'
          : isHighlighted
          ? 'border-blue-400 bg-white shadow-md scale-[1.03]'
          : roleCardColors,
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
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-gray-800 leading-tight">{entity.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{entity.role}</p>
      </div>

    </div>
  );
}

export const PersonNode = memo(PersonNodeBase);
