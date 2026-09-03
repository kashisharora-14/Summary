import { useState, useCallback, useEffect, useRef } from 'react';
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
      <div className="flex h-[100dvh] items-center justify-center bg-gray-50 text-sm text-gray-500">
        Loading case data...
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
