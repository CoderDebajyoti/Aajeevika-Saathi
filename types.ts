export type ProblemCategory = 'Software' | 'Hardware' | string;

export type RetrievalStatus = 'live_official' | 'official_cached' | 'third_party' | 'unverified';

export interface ProblemStatement {
  id: string; // Problem statement ID
  title: string;
  description: string;
  organization: string;
  department: string;
  category: ProblemCategory;
  theme: string;
  submittedIdeas: number | null;
  submissionLimit: number | null;
  officialDetailUrl: string;
  dataRetrievalTimestamp: string;
  sourceUrl: string;
  retrievalStatus: RetrievalStatus;
}
