# SIH 2026 Problem Statement Explorer

A reliable, production-quality Expo web application to collect, organize, filter, and rank Smart India Hackathon (SIH) 2026 problem statements.

## Features
- **Smart Filtering:** Find software problem statements with the lowest number of submitted ideas.
- **Dynamic Sorting:** Sort numerically by submission count, bypassing alphabetical issues.
- **Fallback Engine:** A built-in mechanism to gracefully handle instances when the official SIH portal blocks automated access (like Azure WAF 403 Forbidden).
- **Data Transparency:** Clear indicators distinguishing between `live_official`, `official_cached`, and `third_party` fallback data.
- **Suitability Analysis:** Evaluate technical feasibility based on user-provided skills (AI, Web, Backend, etc.).
- **Export Ready:** Export the filtered results directly to CSV.

## Project Architecture
This project is built on Expo (React Native for Web/Mobile). The original architecture was modified to support an in-memory data store with local JSON integration (simulating the requested fallback database without adding unnecessary overhead).
- **UI:** Expo, React Native Web, Lucide Icons.
- **Data Collection Engine:** Located in `scripts/collect.ts`.
- **Filters/Utils:** Found in `utils/filters.ts` and `utils/dataCollection.ts`.

## Requirements
- Node.js (v18+)
- npm or bun

## Installation
1. Clone the repository
2. Run `npm install`
3. (Optional) Run `npx ts-node scripts/collect.ts` to execute the data collection engine.

## Development Commands
- `npm start` - Starts the Expo development server.
- `npm run web` - Starts the Expo dev server directly on Web.
- `npx jest` - Runs the automated test suite (filters, sorts, missing counts).
- `npx expo lint` - Lints the codebase.
- `npx tsc --noEmit` - Checks types.

## Production Build Instructions
- Run `npx expo export -p web` to generate a production-ready static web bundle in the `dist` folder.
- Deploy the `dist` folder to Vercel, Netlify, or any static host.

## Data Collection Workflow & Supported Sources
The primary data source is the official portal: `https://www.sih.gov.in/`.

**Known Limitation & Handling:**
Currently, the SIH portal blocks automated requests via an Azure Web Application Firewall, returning HTTP `403 Forbidden`. The script in `scripts/collect.ts` attempts to fetch data but detects this block.

To overcome this compliant to rules, a **fallback mechanism** is implemented:
1. Users or admins can manually export a snapshot of the official SIH JSON/CSV data.
2. Place this export at `data/fallback_export.json`.
3. Run `npx ts-node scripts/collect.ts`. The script will parse, deduplicate, normalize categories (Hardware/Software), and save the structured data to `data/sih_data.json` marked clearly as `third_party` or `official_cached`.

**Pagination:** The theoretical implementation supports fetching pages with delays to respect the server, but cannot execute until the WAF allows standard agents.

## Testing
Run `npx jest` to execute tests. Tests prove that:
- Numeric sorting is accurate.
- Unknown counts (`null`) are placed at the end and never interpreted as zero.
- Historical submission counts have distinct retrieval status types and are not incorrectly presented as live counts.
