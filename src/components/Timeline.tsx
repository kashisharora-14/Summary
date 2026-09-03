import { Play } from 'lucide-react';
import type { TimelineEvent } from '@/types/case';

interface TimelineProps {
  timeline: TimelineEvent[];
  activeEventId: string | null;
  onEventClick: (event: TimelineEvent) => void;
}

export function Timeline({ timeline, activeEventId, onEventClick }: TimelineProps) {
  return (
    <div className="flex h-20 items-center border-t border-gray-200 bg-white px-5 gap-4">
      <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition-all hover:scale-110 hover:bg-gray-700 shadow-sm">
        <Play size={15} fill="white" />
      </button>

      <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-400 flex-shrink-0">
        Case Timeline
      </div>

      <div className="relative flex flex-1 items-center justify-between px-2">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gray-200" />

        {timeline.map((event) => {
          const isActive = activeEventId === event.id;
          return (
            <div
              key={event.id}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
              onClick={() => onEventClick(event)}
            >
              <div
                className={[
                  'absolute -top-9 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-gray-900 text-white opacity-100'
                    : 'bg-gray-100 text-gray-500 opacity-0 group-hover:opacity-100',
                ].join(' ')}
              >
                {event.label}
              </div>
              <div
                className={[
                  'h-3 w-3 rounded-full border-2 transition-all duration-200',
                  isActive
                    ? 'border-blue-500 bg-blue-500 scale-150 shadow-md'
                    : 'border-gray-300 bg-white group-hover:border-blue-400 group-hover:scale-125',
                ].join(' ')}
              />
              <span
                className={[
                  'mt-2 text-[10px] font-medium transition-colors',
                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600',
                ].join(' ')}
              >
                {event.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
