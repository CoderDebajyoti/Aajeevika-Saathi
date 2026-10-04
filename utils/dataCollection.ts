import { ProblemStatement, RetrievalStatus } from '../types';

export const OFFICIAL_SIH_URL = 'https://www.sih.gov.in/';

/**
 * Normalizes submission count parsing
 */
export function parseSubmissionCount(countRaw: any): number | null {
  if (countRaw === null || countRaw === undefined || countRaw === '') {
    return null;
  }
  const parsed = parseInt(String(countRaw).replace(/[^0-9]/g, ''), 10);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Normalizes category to either Software, Hardware, or raw if unknown
 */
export function normalizeCategory(categoryRaw: string): string {
  if (!categoryRaw) return 'Unknown';
  const lower = categoryRaw.toLowerCase();
  if (lower.includes('software')) return 'Software';
  if (lower.includes('hardware')) return 'Hardware';
  return categoryRaw;
}

/**
 * Processes raw JSON fallback data into the expected format
 */
export function processFallbackData(
  rawData: any[],
  status: RetrievalStatus = 'third_party'
): ProblemStatement[] {
  const processed: Record<string, ProblemStatement> = {};

  for (const item of rawData) {
    // Basic validation
    const id = item.id || item.psId || item.Problem_Statement_ID || item.PS_ID;
    if (!id) continue;

    // Deduplication - prefer more complete records if duplicate exists
    if (!processed[id]) {
      processed[id] = {
        id: String(id),
        title: item.title || item.Problem_Title || 'Unknown Title',
        description: item.description || item.Description || '',
        organization: item.organization || item.Ministry || item.Organization || 'Unknown Organization',
        department: item.department || item.Department || '',
        category: normalizeCategory(item.category || item.Category),
        theme: item.theme || item.Theme || 'Unknown Theme',
        submittedIdeas: parseSubmissionCount(item.submittedIdeas || item.Submitted_Ideas),
        submissionLimit: parseSubmissionCount(item.submissionLimit || item.Submission_Limit),
        officialDetailUrl: item.officialDetailUrl || `${OFFICIAL_SIH_URL}sih2026PS/${id}`,
        dataRetrievalTimestamp: new Date().toISOString(),
        sourceUrl: item.sourceUrl || 'Fallback/Manual Import',
        retrievalStatus: status,
      };
    }
  }

  return Object.values(processed);
}
