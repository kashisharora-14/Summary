import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Banknote, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import type { FinancialEntity } from '@/types/case';

interface FinancialNodeData {
  entity: FinancialEntity;
  isSelected: boolean;
  isHighlighted: boolean;
  isFaded: boolean;
  isSearchMatch: boolean;
  onClick: (id: string) => void;
}

function FinancialNodeBase({ data }: { data: FinancialNodeData }) {
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
      style={{ width: 190 }}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-300 !border-none" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-gray-300 !border-none" />

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50">
          <Banknote size={15} className="text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate leading-tight">{entity.name}</p>
          <p className="text-[10px] text-gray-400 truncate">{entity.bank}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1">
          <TrendingUp size={11} className="text-emerald-600" />
          <span className="text-[10px] font-semibold text-emerald-700">{entity.totalCredits}</span>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-red-50 px-2 py-1">
          <TrendingDown size={11} className="text-red-500" />
          <span className="text-[10px] font-semibold text-red-600">{entity.totalDebits}</span>
        </div>
      </div>

      {entity.suspiciousTransfers > 0 && (
        <div className="flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1">
          <AlertTriangle size={11} className="text-amber-500" />
          <span className="text-[10px] font-medium text-amber-700">
            {entity.suspiciousTransfers} suspicious transfers
          </span>
        </div>
      )}
    </div>
  );
}

export const FinancialNode = memo(FinancialNodeBase);
