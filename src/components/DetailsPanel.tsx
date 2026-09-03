import {
  MapPin,
  FileText,
  Flag,
  User,
  Activity,
  Link2,
  Calendar,
  Shield,
  Fingerprint,
  Phone,
  Home,
  Banknote,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Instagram,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
} from 'lucide-react';
import type { CaseEntity, CaseData } from '@/types/case';

interface DetailsPanelProps {
  entity: CaseEntity | null;
  caseData: CaseData;
}

function getEntityName(caseData: CaseData, id: string): string {
  return caseData.entities.find((e) => e.id === id)?.name ?? id;
}

function Section({ icon: Icon, label, children }: { icon: typeof User; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={12} className="text-gray-400" />
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</span>
      </div>
      {children}
    </div>
  );
}

function PersonDetails({ entity, caseData }: { entity: Extract<CaseEntity, { type: 'person' }>; caseData: CaseData }) {
  const riskColor = entity.riskLevel === 'high' ? '#dc2626' : entity.riskLevel === 'medium' ? '#d97706' : '#2563eb';

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 overflow-hidden rounded-full shadow-sm ring-2 ring-gray-100">
          <img src={entity.photoUrl} alt={entity.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{entity.name}</h2>
          <p className="text-sm text-gray-500">{entity.role}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Threat Score</span>
          <span className="text-sm font-bold" style={{ color: riskColor }}>{entity.riskScore}/100</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${entity.riskScore}%`, backgroundColor: riskColor }} />
        </div>
      </div>

      <Section icon={Shield} label="Status">
        <p className="text-sm text-gray-700">{entity.status}</p>
      </Section>

      <Section icon={FileText} label="Summary">
        <p className="text-sm leading-relaxed text-gray-600">{entity.summary}</p>
      </Section>

      <Section icon={Fingerprint} label="Identity (IDPR)">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm text-gray-600"><Phone size={12} className="text-gray-400" />{entity.phone}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600"><Home size={12} className="text-gray-400" />{entity.address}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600"><Fingerprint size={12} className="text-gray-400" />Aadhaar: {entity.aadhaar}</div>
        </div>
      </Section>

      <Section icon={Fingerprint} label="Key Information">
        <ul className="flex flex-col gap-1.5">
          {entity.keyInfo.map((info, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-300" />{info}
            </li>
          ))}
        </ul>
      </Section>

      <Section icon={Link2} label="Known Connections">
        <div className="flex flex-wrap gap-1.5">
          {entity.knownConnections.map((id) => (
            <span key={id} className="rounded-md bg-gray-50 border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600">{getEntityName(caseData, id)}</span>
          ))}
        </div>
      </Section>

      <Section icon={FileText} label="Related Evidence">
        <div className="flex flex-wrap gap-1.5">
          {entity.relatedEvidence.map((id) => (
            <span key={id} className="rounded-md bg-blue-50 border border-blue-100 px-2 py-1 text-xs font-medium text-blue-600">{getEntityName(caseData, id)}</span>
          ))}
        </div>
      </Section>

      <Section icon={Activity} label="Recent Activity">
        <div className="flex flex-col gap-2">
          {entity.recentActivity.map((act, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-lg bg-gray-50 px-3 py-2">
              <span className="text-xs font-bold text-gray-400 mt-0.5">{act.date}</span>
              <span className="text-sm text-gray-600">{act.action}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function CdrDetails({ entity }: { entity: Extract<CaseEntity, { type: 'cdr' }> }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-violet-50">
          <Phone size={28} className="text-violet-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{entity.name}</h2>
          <p className="text-sm text-gray-500">{entity.number}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 block">Total Calls</span>
          <span className="text-xl font-bold text-gray-800">{entity.totalCalls}</span>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 block">Last Activity</span>
          <span className="text-sm font-bold text-gray-800">{entity.lastActivity}</span>
        </div>
      </div>

      <div className="rounded-lg bg-violet-50 border border-violet-100 p-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-violet-400 block mb-1">Most Frequent Contact</span>
        <span className="text-sm font-semibold text-violet-700">{entity.frequentContact}</span>
      </div>

      <Section icon={Phone} label="Call Records">
        <div className="flex flex-col gap-2">
          {entity.callRecords.map((call, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-lg border border-gray-100 px-3 py-2">
              {call.direction === 'outgoing' ? (
                <ArrowUpRight size={14} className="text-emerald-500 flex-shrink-0" />
              ) : (
                <ArrowDownLeft size={14} className="text-blue-500 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{call.contactName}</p>
                <p className="text-[10px] text-gray-400">{call.contactNumber}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[10px] text-gray-400">{call.timestamp}</p>
                <p className="text-[10px] font-medium text-gray-500 flex items-center gap-0.5 justify-end">
                  <Clock size={9} />{call.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function FinancialDetails({ entity, caseData }: { entity: Extract<CaseEntity, { type: 'financial' }>; caseData: CaseData }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-50">
          <Banknote size={28} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{entity.name}</h2>
          <p className="text-sm text-gray-500">{entity.bank}</p>
          <p className="text-xs text-gray-400">{entity.accountNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-emerald-50 p-3">
          <div className="flex items-center gap-1 mb-1"><TrendingUp size={12} className="text-emerald-600" /><span className="text-xs font-semibold uppercase tracking-wide text-emerald-500">Credits</span></div>
          <span className="text-lg font-bold text-emerald-700">{entity.totalCredits}</span>
        </div>
        <div className="rounded-lg bg-red-50 p-3">
          <div className="flex items-center gap-1 mb-1"><TrendingDown size={12} className="text-red-500" /><span className="text-xs font-semibold uppercase tracking-wide text-red-400">Debits</span></div>
          <span className="text-lg font-bold text-red-600">{entity.totalDebits}</span>
        </div>
      </div>

      {entity.suspiciousTransfers > 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5">
          <AlertTriangle size={16} className="text-amber-500" />
          <span className="text-sm font-medium text-amber-700">{entity.suspiciousTransfers} suspicious transfers flagged</span>
        </div>
      )}

      <Section icon={Banknote} label="Transaction Records">
        <div className="flex flex-col gap-2">
          {entity.transactions.map((tx, i) => (
            <div key={i} className="rounded-lg border border-gray-100 px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-700">{tx.counterparty}</span>
                <span className={`text-sm font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{tx.note}</span>
                <span className="text-[10px] text-gray-400">{tx.date}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Link2} label="Related People">
        <div className="flex flex-wrap gap-1.5">
          {caseData.relationships.filter((r) => r.source === entity.id || r.target === entity.id).map((r) => {
            const otherId = r.source === entity.id ? r.target : r.source;
            return (
              <span key={r.id} className="rounded-md bg-gray-50 border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600">
                {getEntityName(caseData, otherId)}
              </span>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function SocialDetails({ entity }: { entity: Extract<CaseEntity, { type: 'social' }> }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-pink-50">
          <Instagram size={28} className="text-pink-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{entity.name}</h2>
          <p className="text-sm text-gray-500">{entity.handle}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 block">Platform</span>
          <span className="text-sm font-bold text-gray-800">{entity.platform}</span>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 block">Followers</span>
          <span className="text-sm font-bold text-gray-800">{entity.followers.toLocaleString()}</span>
        </div>
      </div>

      {entity.flaggedContent > 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2.5">
          <Flag size={16} className="text-red-500" />
          <span className="text-sm font-medium text-red-600">{entity.flaggedContent} posts flagged for review</span>
        </div>
      )}

      <Section icon={Instagram} label="Posts">
        <div className="flex flex-col gap-2">
          {entity.posts.map((post, i) => (
            <div key={i} className="rounded-lg border border-gray-100 px-3 py-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-pink-500">{post.platform}</span>
                <span className="text-[10px] text-gray-400">{post.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1.5">{post.content}</p>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <MapPin size={10} />{post.location}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function LocationDetails({ entity, caseData }: { entity: Extract<CaseEntity, { type: 'location' }>; caseData: CaseData }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-50">
          <MapPin size={28} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{entity.name}</h2>
          <p className="text-sm text-gray-500">{entity.address}</p>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1">Coordinates</span>
        <span className="text-sm font-mono text-gray-700">{entity.coordinates.lat.toFixed(4)}, {entity.coordinates.lng.toFixed(4)}</span>
      </div>

      <Section icon={FileText} label="Summary">
        <p className="text-sm leading-relaxed text-gray-600">{entity.summary}</p>
      </Section>

      <Section icon={Calendar} label="Related Events">
        <div className="flex flex-col gap-1.5">
          {entity.relatedEvents.map((ev, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
              <Calendar size={12} className="text-gray-400" />{ev}
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Link2} label="Related People">
        <div className="flex flex-wrap gap-1.5">
          {entity.relatedPeople.map((id) => (
            <span key={id} className="rounded-md bg-gray-50 border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600">{getEntityName(caseData, id)}</span>
          ))}
        </div>
      </Section>
    </div>
  );
}

function EvidenceDetails({ entity, caseData }: { entity: Extract<CaseEntity, { type: 'evidence' }>; caseData: CaseData }) {
  const importanceColor = entity.importance === 'high' ? '#dc2626' : entity.importance === 'medium' ? '#d97706' : '#2563eb';

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50">
          <FileText size={28} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{entity.name}</h2>
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{entity.evidenceType} Evidence</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide text-white" style={{ backgroundColor: importanceColor }}>{entity.importance} importance</span>
        <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={12} />{entity.date}</span>
      </div>

      <Section icon={FileText} label="Description">
        <p className="text-sm leading-relaxed text-gray-600">{entity.description}</p>
      </Section>

      <Section icon={Link2} label="Related People">
        <div className="flex flex-wrap gap-1.5">
          {entity.relatedPeople.map((id) => (
            <span key={id} className="rounded-md bg-gray-50 border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600">{getEntityName(caseData, id)}</span>
          ))}
        </div>
      </Section>

      {entity.relatedLocations.length > 0 && (
        <Section icon={MapPin} label="Related Locations">
          <div className="flex flex-wrap gap-1.5">
            {entity.relatedLocations.map((id) => (
              <span key={id} className="rounded-md bg-emerald-50 border border-emerald-100 px-2 py-1 text-xs font-medium text-emerald-600">{getEntityName(caseData, id)}</span>
            ))}
          </div>
        </Section>
      )}

      <Section icon={FileText} label="Notes">
        <p className="text-sm leading-relaxed text-gray-600 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">{entity.notes}</p>
      </Section>
    </div>
  );
}

function ClueDetails({ entity }: { entity: Extract<CaseEntity, { type: 'clue' }> }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl" style={{ backgroundColor: `${entity.flagColor}15` }}>
          <Flag size={28} style={{ color: entity.flagColor }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{entity.name}</h2>
          <span className="text-xs font-semibold uppercase tracking-wide text-red-500">Critical Clue</span>
        </div>
      </div>

      <Section icon={FileText} label="Description">
        <p className="text-sm leading-relaxed text-gray-600">{entity.description}</p>
      </Section>
    </div>
  );
}

export function DetailsPanel({ entity, caseData }: DetailsPanelProps) {
  return (
    <aside className="flex w-80 flex-col border-l border-gray-200 bg-white overflow-y-auto">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700">Dossier</h3>
        {entity && (
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-500">{entity.type}</span>
        )}
      </div>

      <div className="flex-1 px-5 py-4">
        {!entity ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <User size={24} className="text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-400">Select an item on the board</p>
            <p className="text-xs text-gray-300">Click any node to view investigation details</p>
          </div>
        ) : entity.type === 'person' ? (
          <PersonDetails entity={entity} caseData={caseData} />
        ) : entity.type === 'cdr' ? (
          <CdrDetails entity={entity} />
        ) : entity.type === 'financial' ? (
          <FinancialDetails entity={entity} caseData={caseData} />
        ) : entity.type === 'social' ? (
          <SocialDetails entity={entity} />
        ) : entity.type === 'location' ? (
          <LocationDetails entity={entity} caseData={caseData} />
        ) : entity.type === 'evidence' ? (
          <EvidenceDetails entity={entity} caseData={caseData} />
        ) : (
          <ClueDetails entity={entity} />
        )}
      </div>
    </aside>
  );
}
