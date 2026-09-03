import { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';

interface CaseSummaryProps {
  summary: string;
  caseId: string;
  caseTitle: string;
}

export function CaseSummary({ summary, caseId, caseTitle }: CaseSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute left-4 top-4 z-10 w-80">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition-all hover:shadow-md"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
            <FileText size={14} className="text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-gray-700">Case Summary</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500">
              CASE #{caseId}
            </span>
            <span className="text-xs font-semibold text-gray-700">{caseTitle}</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
        </div>
      </div>
    </div>
  );
}
