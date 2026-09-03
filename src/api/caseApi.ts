import type { CaseData } from '@/types/case';

/**
 * Fake API adapter backed by a local JSON endpoint.
 *
 * To connect a real backend later, replace only the URL with your API URL:
 * const response = await fetch(`${API_BASE_URL}/cases/${caseId}`);
 * if (!response.ok) throw new Error('Unable to load case');
 * return response.json() as Promise<CaseData>;
 */
export async function fetchCaseData(caseId: string): Promise<CaseData> {
  const response = await fetch(`/api/cases/${caseId}.json`);
  if (!response.ok) {
    throw new Error(`Unable to load case ${caseId}`);
  }
  return response.json() as Promise<CaseData>;
}
