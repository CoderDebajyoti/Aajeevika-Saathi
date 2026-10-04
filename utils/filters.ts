import { ProblemStatement } from '../types';

export type SortBy = 'lowest_submissions' | 'highest_submissions' | 'ps_id' | 'title' | 'organization';
export type CategoryFilter = 'All' | 'Software' | 'Hardware';

export interface FilterOptions {
  category: CategoryFilter;
  maxSubmissions?: number;
  minSubmissions?: number;
  organization?: string;
  theme?: string;
  searchQuery?: string; // Search by ID or title
}

export function filterAndSort(
  data: ProblemStatement[],
  options: FilterOptions,
  sortBy: SortBy
): ProblemStatement[] {
  // 1. Filter
  let filtered = data.filter((item) => {
    // Category filter
    if (options.category !== 'All' && item.category !== options.category) {
      return false;
    }

    // Min submissions
    if (options.minSubmissions !== undefined) {
      if (item.submittedIdeas === null || item.submittedIdeas < options.minSubmissions) {
        return false;
      }
    }

    // Max submissions
    if (options.maxSubmissions !== undefined) {
      if (item.submittedIdeas === null || item.submittedIdeas >= options.maxSubmissions) {
        return false;
      }
    }

    // Organization filter
    if (options.organization && item.organization !== options.organization) {
      return false;
    }

    // Theme filter
    if (options.theme && item.theme !== options.theme) {
      return false;
    }

    // Search query (ID or Title)
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      const matchId = item.id.toLowerCase().includes(query);
      const matchTitle = item.title.toLowerCase().includes(query);
      if (!matchId && !matchTitle) {
        return false;
      }
    }

    return true;
  });

  // 2. Sort
  filtered.sort((a, b) => {
    if (sortBy === 'lowest_submissions') {
      // Unknown counts should be treated separately, put them at the end
      if (a.submittedIdeas === null && b.submittedIdeas !== null) return 1;
      if (a.submittedIdeas !== null && b.submittedIdeas === null) return -1;
      if (a.submittedIdeas === null && b.submittedIdeas === null) return 0;
      return (a.submittedIdeas as number) - (b.submittedIdeas as number);
    }

    if (sortBy === 'highest_submissions') {
      if (a.submittedIdeas === null && b.submittedIdeas !== null) return 1;
      if (a.submittedIdeas !== null && b.submittedIdeas === null) return -1;
      if (a.submittedIdeas === null && b.submittedIdeas === null) return 0;
      return (b.submittedIdeas as number) - (a.submittedIdeas as number);
    }

    if (sortBy === 'ps_id') {
      return a.id.localeCompare(b.id, undefined, { numeric: true });
    }

    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === 'organization') {
      return a.organization.localeCompare(b.organization);
    }

    return 0;
  });

  return filtered;
}
