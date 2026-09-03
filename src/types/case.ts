export type EntityType = 'person' | 'cdr' | 'financial' | 'social' | 'location' | 'evidence' | 'clue';

export type RiskLevel = 'high' | 'medium' | 'low';

export type DataSourceType = 'cdr' | 'idpr' | 'bank' | 'social' | 'location' | 'surveillance' | 'forensic';

export interface DataSource {
  id: string;
  type: DataSourceType;
  label: string;
  uploadedAt: string;
  status: 'processed' | 'pending' | 'reviewing';
  recordCount: number;
  fileName: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  label: string;
  entityId: string;
  description: string;
}

export interface CallRecord {
  timestamp: string;
  duration: string;
  direction: 'incoming' | 'outgoing';
  contactNumber: string;
  contactName: string;
}

export interface TransactionRecord {
  date: string;
  amount: string;
  type: 'credit' | 'debit';
  counterparty: string;
  note: string;
}

export interface SocialPost {
  platform: string;
  timestamp: string;
  content: string;
  location: string;
}

export interface PersonEntity {
  id: string;
  type: 'person';
  name: string;
  role: string;
  riskScore: number;
  riskLevel: RiskLevel;
  status: string;
  summary: string;
  keyInfo: string[];
  knownConnections: string[];
  relatedEvidence: string[];
  recentActivity: { date: string; action: string }[];
  avatarColor: string;
  initials: string;
  photoUrl: string;
  phone: string;
  address: string;
  aadhaar: string;
  position: { x: number; y: number };
}

export interface CdrEntity {
  id: string;
  type: 'cdr';
  name: string;
  number: string;
  totalCalls: number;
  frequentContact: string;
  callRecords: CallRecord[];
  lastActivity: string;
  position: { x: number; y: number };
}

export interface FinancialEntity {
  id: string;
  type: 'financial';
  name: string;
  bank: string;
  accountNumber: string;
  totalCredits: string;
  totalDebits: string;
  suspiciousTransfers: number;
  transactions: TransactionRecord[];
  position: { x: number; y: number };
}

export interface SocialEntity {
  id: string;
  type: 'social';
  name: string;
  platform: string;
  handle: string;
  followers: number;
  posts: SocialPost[];
  flaggedContent: number;
  position: { x: number; y: number };
}

export interface LocationEntity {
  id: string;
  type: 'location';
  name: string;
  address: string;
  summary: string;
  relatedEvents: string[];
  relatedPeople: string[];
  coordinates: { lat: number; lng: number };
  position: { x: number; y: number };
}

export interface EvidenceEntity {
  id: string;
  type: 'evidence';
  name: string;
  evidenceType: 'document' | 'physical' | 'forensic' | 'event';
  description: string;
  date: string;
  importance: RiskLevel;
  relatedPeople: string[];
  relatedLocations: string[];
  notes: string;
  position: { x: number; y: number };
}

export interface ClueEntity {
  id: string;
  type: 'clue';
  name: string;
  description: string;
  flagColor: string;
  position: { x: number; y: number };
}

export type CaseEntity =
  | PersonEntity
  | CdrEntity
  | FinancialEntity
  | SocialEntity
  | LocationEntity
  | EvidenceEntity
  | ClueEntity;

export type RelationshipCategory =
  | 'suspect'
  | 'associate'
  | 'witness'
  | 'financial'
  | 'communication'
  | 'location'
  | 'evidence'
  | 'clue'
  | 'social';

export interface Relationship {
  id: string;
  source: string;
  target: string;
  label: string;
  category: RelationshipCategory;
}

export interface CaseInfo {
  id: string;
  title: string;
  status: string;
  summary: string;
  assignedTo: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  filedDate: string;
}

export interface CaseData {
  case: CaseInfo;
  entities: CaseEntity[];
  relationships: Relationship[];
  timeline: TimelineEvent[];
  dataSources: DataSource[];
}
