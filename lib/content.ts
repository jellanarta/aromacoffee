import fs from 'fs';
import path from 'path';
import { SiteData } from './types';

export * from './types';

export async function getSiteContent(): Promise<SiteData> {
  const owner = process.env.GITHUB_OWNER || 'jellanarta';
  const repo = process.env.GITHUB_REPO || 'aromacoffee';
  const branch = process.env.GITHUB_BRANCH || 'main';

  // If in production and FETCH_FROM_GITHUB is true, fetch from GitHub raw API
  if (process.env.NODE_ENV === 'production' && process.env.FETCH_FROM_GITHUB === 'true') {
    try {
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/data/content.json?ref=${branch}`;
      const res = await fetch(apiUrl, {
        next: { tags: ['site-content'], revalidate: 0 },
        headers: {
          Accept: 'application/vnd.github.raw+json',
          'User-Agent': 'aromacoffee-app',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
      });

      if (res.ok) {
        const rawJson = await res.json();
        return rawJson as SiteData;
      }
    } catch (e) {
      console.warn('Failed to fetch content from GitHub API raw, falling back to local file', e);
    }
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData) as SiteData;
  } catch (error) {
    console.error('Error reading local content.json:', error);
    throw error;
  }
}
