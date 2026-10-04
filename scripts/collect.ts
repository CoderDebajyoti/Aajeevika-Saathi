import fs from 'fs';
import path from 'path';
import { ProblemStatement } from '../types';
import { processFallbackData, OFFICIAL_SIH_URL } from '../utils/dataCollection';

// This script simulates a collection engine.
// Note: As of checking, sih.gov.in blocks automated requests via 403 Forbidden (Azure WAF).
// If access becomes available, this skeleton can be hooked up to `fetch` with pagination.

const DELAY_BETWEEN_PAGES_MS = 2000;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchOfficialData() {
  console.log(`Checking access to ${OFFICIAL_SIH_URL}...`);
  try {
    const response = await fetch(OFFICIAL_SIH_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SIHDataCollector/1.0)',
      }
    });

    if (response.status === 403) {
      console.warn('Official SIH portal returned 403 Forbidden. Automated collection is currently blocked.');
      return null;
    }

    if (!response.ok) {
      console.error(`Failed to fetch from SIH portal: ${response.status} ${response.statusText}`);
      return null;
    }

    console.log('Access granted. (Implementation for parsing HTML/API would go here based on the site structure)');
    // Implementation would:
    // 1. Discover pagination (e.g., total pages from DOM or API response)
    // 2. Loop through pages with sleep(DELAY_BETWEEN_PAGES_MS)
    // 3. Handle rate limits and retries
    // 4. Return processed live_official data.
    return []; // Return empty array to represent no data parsed yet since we can't see the structure

  } catch (error) {
    console.error('Error attempting to fetch official data:', error);
    return null;
  }
}

async function runCollection() {
  console.log('Starting SIH 2026 Data Collection...');

  // Try official first
  const liveData = await fetchOfficialData();

  if (liveData) {
     console.log('Successfully collected live data.');
     // Save live data
     fs.writeFileSync(path.join(__dirname, '../data/sih_data.json'), JSON.stringify(liveData, null, 2));
     return;
  }

  console.log('Falling back to local cached/fallback data if available...');

  const fallbackPath = path.join(__dirname, '../data/fallback_export.json');
  if (fs.existsSync(fallbackPath)) {
    try {
      const rawFallback = JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
      const processed = processFallbackData(rawFallback, 'third_party');

      console.log(`Processed ${processed.length} records from fallback data.`);

      const outputPath = path.join(__dirname, '../data/sih_data.json');
      fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2));
      console.log(`Saved processed data to ${outputPath}`);

    } catch (e) {
      console.error('Failed to process fallback data:', e);
    }
  } else {
    console.log(`No fallback data found at ${fallbackPath}. Please provide a JSON export to use the fallback mechanism.`);
  }
}

runCollection();
