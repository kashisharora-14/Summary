import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Flag } from 'lucide-react';
import type { ClueEntity } from '@/types/case';

interface ClueNodeData {
  entity: ClueEntity;
  isSelected: boolean;
  isHighlighted: boolean;
  isFaded: boolean;
  isSearchMatch: boolean;
  onClick: (id: string) => void;
}

function ClueNodeBase({ data }: { data: ClueNodeData }) {
  const { entity, isSelected, isHighlighted, isFaded, isSearchMatch, onClick } = data;

  return (
    <div
      onClick={() => onClick(entity.id)}
      className={[
        'relative flex items-start gap-2.5 rounded-xl border bg-white px-3 py-2.5 shadow-sm transition-all duration-200 cursor-pointer',
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
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${entity.flagColor}15` }}
      >
        <Flag size={15} style={{ color: entity.flagColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800 truncate leading-tight">{entity.name}</p>
        <p className="text-[9px] text-gray-400 mt-0.5 line-clamp-2 leading-snug">{entity.description}</p>
      </div>
    </div>
  );
}

export const ClueNode = memo(ClueNodeBase);
