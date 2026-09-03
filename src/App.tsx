import { useState, useCallback, useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';
import { Header } from '@/components/Header';
import { InvestigationBoard } from '@/components/InvestigationBoard';
import { DetailsPanel } from '@/components/DetailsPanel';
import { Timeline } from '@/components/Timeline';
import { CaseSummary } from '@/components/CaseSummary';
import { DataSourcesPanel } from '@/components/DataSourcesPanel';
import { fetchCaseData } from '@/api/caseApi';
import type { CaseData, TimelineEvent } from '@/types/case';

function App() {
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTimelineEvent, setActiveTimelineEvent] = useState<string | null>(null);
  const [sourcesExpanded, setSourcesExpanded] = useState(true);
  const focusNodeRef = useRef<string | null>(null);

  useEffect(() => {
    fetchCaseData('8402')
      .then(setCaseData)
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : 'Unable to load case data');
      });
  }, []);

  if (loadError) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-gray-50 p-6 text-center">
        <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-red-600">Unable to load case data</p>
          <p className="mt-1 text-xs text-gray-500">{loadError}</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-gray-50 p-6">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white px-8 py-7 shadow-sm">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 shadow-sm">
            <Shield size={24} className="text-white" />
            <span className="absolute -inset-1 animate-ping rounded-xl border border-blue-300 opacity-30" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800">Loading case data</p>
            <p className="mt-0.5 text-xs text-gray-400">Preparing your investigation board...</p>
          </div>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    );
  }

  const selectedEntity = selectedId
    ? caseData.entities.find((e) => e.id === selectedId) ?? null
    : null;

  const handleSelectNode = useCallback((id: string | null) => {
    setSelectedId(id);
    if (id) {
      const timelineMatch = caseData.timeline.find((t) => t.entityId === id);
      setActiveTimelineEvent(timelineMatch?.id ?? null);
    } else {
      setActiveTimelineEvent(null);
    }
  }, []);

  const handleTimelineClick = useCallback((event: TimelineEvent) => {
    setActiveTimelineEvent(event.id);
    setSelectedId(event.entityId);
    focusNodeRef.current = event.entityId;
  }, []);

  return (
    <div className="flex h-[100dvh] min-w-0 flex-col overflow-hidden bg-gray-50">
      <Header
        caseId={caseData.case.id}
        caseTitle={caseData.case.title}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        <div className="relative min-h-0 min-w-0 flex-1">
          <CaseSummary
            summary={caseData.case.summary}
            caseId={caseData.case.id}
            caseTitle={caseData.case.title}
          />
          <DataSourcesPanel
            sources={caseData.dataSources}
            isExpanded={sourcesExpanded}
            onToggle={() => setSourcesExpanded(!sourcesExpanded)}
          />
          <InvestigationBoard
            caseData={caseData}
            selectedId={selectedId}
            searchQuery={searchQuery}
            onSelectNode={handleSelectNode}
            focusNodeRef={focusNodeRef}
          />
        </div>

        <DetailsPanel entity={selectedEntity} caseData={caseData} />
      </div>

      <Timeline
        timeline={caseData.timeline}
        activeEventId={activeTimelineEvent}
        onEventClick={handleTimelineClick}
      />
    </div>
  );
}

export default App;
