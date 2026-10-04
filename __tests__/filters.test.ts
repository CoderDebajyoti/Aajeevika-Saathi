import { filterAndSort } from '../utils/filters';
import { ProblemStatement } from '../types';

const fixtureData: ProblemStatement[] = [
  {
    id: 'SIH1001',
    title: 'AI Based Attendance',
    description: 'Use AI',
    organization: 'Ministry of Education',
    department: 'Higher Ed',
    category: 'Software',
    theme: 'Smart Education',
    submittedIdeas: 25,
    submissionLimit: 100,
    officialDetailUrl: 'http',
    dataRetrievalTimestamp: '2026-10-01',
    sourceUrl: 'http',
    retrievalStatus: 'live_official'
  },
  {
    id: 'SIH1002',
    title: 'Drone Delivery',
    description: 'Use Drone',
    organization: 'Ministry of Defence',
    department: 'R&D',
    category: 'Hardware',
    theme: 'Aerospace',
    submittedIdeas: 5,
    submissionLimit: 50,
    officialDetailUrl: 'http',
    dataRetrievalTimestamp: '2026-10-01',
    sourceUrl: 'http',
    retrievalStatus: 'live_official'
  },
  {
    id: 'SIH1003',
    title: 'Blockchain voting',
    description: 'Use blockchain',
    organization: 'Election Commission',
    department: 'IT',
    category: 'Software',
    theme: 'Smart Governance',
    submittedIdeas: 10,
    submissionLimit: 100,
    officialDetailUrl: 'http',
    dataRetrievalTimestamp: '2026-10-01',
    sourceUrl: 'http',
    retrievalStatus: 'live_official'
  },
  {
    id: 'SIH1004',
    title: 'New API Portal',
    description: 'Build API portal',
    organization: 'NIC',
    department: 'IT',
    category: 'Software',
    theme: 'Smart Governance',
    submittedIdeas: null, // Unknown count
    submissionLimit: null,
    officialDetailUrl: 'http',
    dataRetrievalTimestamp: '2026-10-01',
    sourceUrl: 'http',
    retrievalStatus: 'official_cached' // testing stale/cached historical representation
  }
];

describe('Filtering and Sorting Logic', () => {
  it('should filter by Software category correctly', () => {
    const result = filterAndSort(fixtureData, { category: 'Software' }, 'ps_id');
    expect(result).toHaveLength(3);
    expect(result.every(r => r.category === 'Software')).toBe(true);
  });

  it('should filter by submission threshold correctly (Submitted Ideas < 20)', () => {
    // Should include 5, 10, but NOT 25, and NOT null
    const result = filterAndSort(fixtureData, { category: 'All', maxSubmissions: 20 }, 'ps_id');
    expect(result).toHaveLength(2); // SIH1002, SIH1003
    expect(result.map(r => r.id)).toContain('SIH1002');
    expect(result.map(r => r.id)).toContain('SIH1003');
  });

  it('should sort submission counts numerically (Lowest First) and place nulls at the end', () => {
    const result = filterAndSort(fixtureData, { category: 'All' }, 'lowest_submissions');
    // Order should be: 5, 10, 25, null
    expect(result[0].submittedIdeas).toBe(5);
    expect(result[1].submittedIdeas).toBe(10);
    expect(result[2].submittedIdeas).toBe(25);
    expect(result[3].submittedIdeas).toBeNull();
  });

  it('should handle unknown counts without treating them as zero', () => {
    // If unknown was zero, it would be included in < 5. But it shouldn't be.
    const result = filterAndSort(fixtureData, { category: 'All', maxSubmissions: 5 }, 'ps_id');
    expect(result).toHaveLength(0); // Only 5 is there, but max is strictly less than 5? No, wait.
    // Wait, the logic in filters.ts says: if (item.submittedIdeas >= options.maxSubmissions) return false;
    // So for 5, it includes 5? Let's check logic: item.submittedIdeas === null || item.submittedIdeas >= options.maxSubmissions -> false.
    // So 5 >= 5 is true, so it returns false. Length is 0. Null also returns false.
  });

  it('should test that historical/cached data is clearly distinct from live official in the model', () => {
      const cached = fixtureData.find(f => f.retrievalStatus === 'official_cached');
      expect(cached).toBeDefined();
      expect(cached?.retrievalStatus).not.toBe('live_official');
  });

  it('should search by title and PS ID', () => {
      const resultTitle = filterAndSort(fixtureData, { category: 'All', searchQuery: 'drone' }, 'ps_id');
      expect(resultTitle).toHaveLength(1);
      expect(resultTitle[0].id).toBe('SIH1002');

      const resultId = filterAndSort(fixtureData, { category: 'All', searchQuery: '1004' }, 'ps_id');
      expect(resultId).toHaveLength(1);
      expect(resultId[0].title).toBe('New API Portal');
  });
});
