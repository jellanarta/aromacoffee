import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const MIME_MAP: Record<string, string> = {
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  avif: 'image/avif',
  ico: 'image/x-icon',
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    if (!slug || slug.length === 0) {
      return new NextResponse('File path not provided', { status: 400 });
    }

    const fileName = path.basename(slug[slug.length - 1]);
    const ext = path.extname(fileName).toLowerCase().replace('.', '');
    const contentType = MIME_MAP[ext] || 'application/octet-stream';

    // 1. Check local public/uploads directory
    const localFilePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    if (fs.existsSync(localFilePath)) {
      const fileBuffer = fs.readFileSync(localFilePath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // 2. Fetch directly from GitHub API if on serverless
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'jellanarta';
    const repo = process.env.GITHUB_REPO || 'aromacoffee';
    const branch = process.env.GITHUB_BRANCH || 'main';

    const ghFilePath = `public/uploads/${fileName}`;
    const ghApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${ghFilePath}?ref=${branch}`;

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3.raw',
      'User-Agent': 'AromaCoffee-MediaProxy',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const ghRes = await fetch(ghApiUrl, {
      headers,
    });

    if (ghRes.ok) {
      const arrayBuffer = await ghRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        fs.writeFileSync(path.join(uploadDir, fileName), buffer);
      } catch {
        // Ignore on read-only serverless
      }

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
        },
      });
    }

    return new NextResponse('Media not found on server or GitHub', { status: 404 });
  } catch (error: any) {
    console.error('Media proxy error:', error);
    return new NextResponse(error.message || 'Internal Server Error', { status: 500 });
  }
}
