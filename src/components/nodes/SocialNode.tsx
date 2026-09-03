import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Instagram, Facebook, Linkedin, Flag } from 'lucide-react';
import type { SocialEntity } from '@/types/case';

interface SocialNodeData {
  entity: SocialEntity;
  isSelected: boolean;
  isHighlighted: boolean;
  isFaded: boolean;
  isSearchMatch: boolean;
  onClick: (id: string) => void;
}

const platformConfig: Record<string, { icon: typeof Instagram; color: string; bg: string }> = {
  Instagram: { icon: Instagram, color: '#db2777', bg: '#fdf2f8' },
  Facebook: { icon: Facebook, color: '#2563eb', bg: '#eff6ff' },
  LinkedIn: { icon: Linkedin, color: '#0891b2', bg: '#ecfeff' },
};

function SocialNodeBase({ data }: { data: SocialNodeData }) {
  const { entity, isSelected, isHighlighted, isFaded, isSearchMatch, onClick } = data;
  const config = platformConfig[entity.platform] ?? platformConfig.Instagram;
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
      style={{ width: 175 }}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-gray-300 !border-none" />

      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: config.bg }}
        >
          <Icon size={15} style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate leading-tight">{entity.name}</p>
          <p className="text-[10px] text-gray-400 truncate">{entity.handle}</p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-2 py-1.5">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-semibold text-gray-400">Followers</span>
          <span className="text-sm font-bold text-gray-700">
            {entity.followers > 1000 ? `${(entity.followers / 1000).toFixed(1)}K` : entity.followers}
          </span>
        </div>
        {entity.flaggedContent > 0 && (
          <div className="flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5">
            <Flag size={10} className="text-red-500" />
            <span className="text-[10px] font-medium text-red-600">{entity.flaggedContent}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export const SocialNode = memo(SocialNodeBase);
