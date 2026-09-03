import { useCallback, useMemo, useEffect, useRef } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  ConnectionLineType,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import type { CaseData, CaseEntity, Relationship } from '@/types/case';
import { PersonNode } from '@/components/nodes/PersonNode';
import { EvidenceNode } from '@/components/nodes/EvidenceNode';
import { LocationNode } from '@/components/nodes/LocationNode';
import { ClueNode } from '@/components/nodes/ClueNode';
import { CdrNode } from '@/components/nodes/CdrNode';
import { FinancialNode } from '@/components/nodes/FinancialNode';
import { SocialNode } from '@/components/nodes/SocialNode';

interface InvestigationBoardProps {
  caseData: CaseData;
  selectedId: string | null;
  searchQuery: string;
  onSelectNode: (id: string | null) => void;
  focusNodeRef: { current: string | null };
}

const nodeTypes = {
  person: PersonNode,
  evidence: EvidenceNode,
  location: LocationNode,
  cdr: CdrNode,
  financial: FinancialNode,
  social: SocialNode,
  clue: ClueNode,
};

const categoryColors: Record<Relationship['category'], string> = {
  suspect: '#dc2626',
  associate: '#d97706',
  witness: '#2563eb',
  financial: '#059669',
  communication: '#7c3aed',
  location: '#0891b2',
  evidence: '#6b7280',
  clue: '#dc2626',
  social: '#db2777',
};

export function InvestigationBoard({
  caseData,
  selectedId,
  searchQuery,
  onSelectNode,
  focusNodeRef,
}: InvestigationBoardProps) {
  const connectedIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const ids = new Set<string>([selectedId]);
    caseData.relationships.forEach((r) => {
      if (r.source === selectedId) ids.add(r.target);
      if (r.target === selectedId) ids.add(r.source);
    });
    return ids;
  }, [selectedId, caseData.relationships]);

  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    const q = searchQuery.toLowerCase();
    const matches = new Set<string>();
    caseData.entities.forEach((e) => {
      const searchable = [e.name, 'role' in e ? e.role : '', 'description' in e ? e.description : ''].join(' ').toLowerCase();
      if (searchable.includes(q)) matches.add(e.id);
    });
    return matches;
  }, [searchQuery, caseData.entities]);

  const initialNodes: Node[] = useMemo(
    () =>
      caseData.entities.map((entity: CaseEntity) => ({
        id: entity.id,
        type: entity.type,
        position: entity.position,
        data: {
          entity,
          isSelected: false,
          isHighlighted: false,
          isFaded: false,
          isSearchMatch: false,
          onClick: (id: string) => onSelectNode(id),
        },
      })),
    [caseData.entities, onSelectNode],
  );

  const relLabelMap = useRef<Map<string, string>>(new Map());
  if (relLabelMap.current.size === 0) {
    caseData.relationships.forEach((r) => relLabelMap.current.set(r.id, r.label));
  }

  const initialEdges: Edge[] = useMemo(
    () =>
      caseData.relationships.map((r: Relationship) => ({
        id: r.id,
        source: r.source,
        target: r.target,
        label: '',
        type: 'default',
        animated: false,
        style: { stroke: categoryColors[r.category], strokeWidth: 1.25, opacity: 0.22 },
        labelStyle: { fontSize: 10, fill: '#6b7280', fontWeight: 500 },
        labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
        labelBgPadding: [4, 2],
        labelBgBorderRadius: 4,
      })),
    [caseData.relationships],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((prev) =>
      prev.map((n) => {
        const isSelected = n.id === selectedId;
        const isHighlighted = !isSelected && connectedIds.has(n.id);
        const isFaded = selectedId !== null && !isSelected && !isHighlighted;
        const isSearchMatch = searchMatches.has(n.id);
        return {
          ...n,
          data: {
            ...n.data,
            isSelected,
            isHighlighted,
            isFaded,
            isSearchMatch,
            onClick: (id: string) => onSelectNode(id),
          },
        };
      }),
    );
  }, [selectedId, connectedIds, searchMatches, setNodes, onSelectNode]);

  useEffect(() => {
    setEdges((prev) =>
      prev.map((e) => {
        const isRelated =
          selectedId !== null && (e.source === selectedId || e.target === selectedId);
        const isFaded = selectedId !== null && !isRelated;
        const relLabel = relLabelMap.current.get(e.id) ?? '';
        return {
          ...e,
          label: isRelated ? relLabel : '',
          animated: isRelated,
          style: {
            ...e.style,
            opacity: isFaded ? 0.035 : isRelated ? 0.95 : 0.22,
            strokeWidth: isRelated ? 2.25 : 1.25,
          },
        };
      }),
    );
  }, [selectedId, setEdges]);

  useEffect(() => {
    if (focusNodeRef.current) {
      const targetId = focusNodeRef.current;
      const node = nodes.find((n) => n.id === targetId);
      if (node) {
        const x = node.position.x + 80;
        const y = node.position.y + 80;
        window.setTimeout(() => {
          (window as unknown as { __reactFlowInstance?: { setCenter: (x: number, y: number, opts?: { zoom?: number; duration?: number }) => void } }).__reactFlowInstance?.setCenter(x, y, { zoom: 1.2, duration: 600 });
        }, 50);
        focusNodeRef.current = null;
      }
    }
  }, [focusNodeRef, nodes]);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      onSelectNode(node.id);
    },
    [onSelectNode],
  );

  const onPaneClick = useCallback(() => {
    onSelectNode(null);
  }, [onSelectNode]);

  const onInit = useCallback((instance: { setCenter: (x: number, y: number, opts?: { zoom?: number; duration?: number }) => void }) => {
    (window as unknown as { __reactFlowInstance?: typeof instance }).__reactFlowInstance = instance;
  }, []);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onInit={onInit}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.Bezier}
        fitView
        fitViewOptions={{ padding: 0.15, maxZoom: 1.2 }}
        minZoom={0.3}
        maxZoom={2.5}
        proOptions={{ hideAttribution: true }}
        className="bg-gray-50"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1.5} color="#d1d5db" />
        <Controls
          className="!shadow-sm !border !border-gray-200 !rounded-lg !overflow-hidden"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
