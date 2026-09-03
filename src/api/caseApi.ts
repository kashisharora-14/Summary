import { caseData } from '@/data/caseData';
import type { CaseData } from '@/types/case';

/**
 * Fake API adapter. It intentionally returns a Promise and a cloned payload
 * so the UI consumes data exactly as it would from `response.json()`.
 *
 * To connect a real backend later, replace the function body with:
 * const response = await fetch(`/api/cases/${caseId}`);
 * if (!response.ok) throw new Error('Unable to load case');
 * return response.json() as Promise<CaseData>;
 */
export async function fetchCaseData(caseId: string): Promise<CaseData> {
  await new Promise((resolve) => window.setTimeout(resolve, 350));

  if (caseId !== caseData.case.id) {
    throw new Error(`Case ${caseId} was not found`);
  }

  return JSON.parse(JSON.stringify(caseData)) as CaseData;
}
