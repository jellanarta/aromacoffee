import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024; // 4MB
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file was uploaded' },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        { error: `File size exceeds the 4MB limit (${sizeMB} MB)` },
        { status: 400 }
      );
    }

    if (file.size <= 0) {
      return NextResponse.json(
        { error: 'Uploaded file is empty (0 bytes)' },
        { status: 400 }
      );
    }

    const originalExt = path.extname(file.name).toLowerCase().replace('.', '');
    if (!originalExt || !ALLOWED_EXTENSIONS.includes(originalExt)) {
      return NextResponse.json(
        {
          error: `Extension (.${originalExt || 'unknown'}) is not supported. Only .jpg, .jpeg, .png, .webp, .avif, .gif are allowed.`,
        },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: `MIME type "${file.type}" is not a valid image.` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);

    if (inputBuffer.length > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Buffer size exceeds 4MB limit' },
        { status: 400 }
      );
    }

    // Process image with Sharp to optimal WebP
    let finalBuffer: Buffer;
    let width: number | undefined;
    let height: number | undefined;

    try {
      const isGif = originalExt === 'gif' || file.type === 'image/gif';
      const imageInstance = sharp(inputBuffer, { animated: isGif });
      const metadata = await imageInstance.metadata();

      if (!metadata.format) {
        return NextResponse.json(
          { error: 'File is not a valid image format.' },
          { status: 400 }
        );
      }

      if (metadata.format === 'gif' && (metadata.pages || 1) > 1) {
        finalBuffer = await sharp(inputBuffer, { animated: true })
          .webp({ quality: 82, effort: 4 })
          .toBuffer();
      } else {
        const processed = imageInstance
          .rotate()
          .resize({
            width: 1920,
            height: 1920,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({
            quality: 82,
            effort: 4,
          });

        finalBuffer = await processed.toBuffer();
        const finalMeta = await sharp(finalBuffer).metadata();
        width = finalMeta.width;
        height = finalMeta.height;
      }
    } catch (sharpError: any) {
      console.error('Failed to process image with Sharp:', sharpError);
      return NextResponse.json(
        { error: 'Image file is corrupted or cannot be processed by server.' },
        { status: 400 }
      );
    }

    const baseName = path
      .basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase()
      .substring(0, 50);

    const timestamp = Date.now();
    const fileName = `${timestamp}-${baseName || 'image'}.webp`;
    const filePath = `public/uploads/${fileName}`;

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'jellanarta';
    const repo = process.env.GITHUB_REPO || 'aromacoffee';
    const branch = process.env.GITHUB_BRANCH || 'main';

    // Save to GitHub Repository if GITHUB_TOKEN is available
    if (token) {
      try {
        const base64Content = finalBuffer.toString('base64');
        const ghUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

        const ghRes = await fetch(ghUrl, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'aromacoffee-app',
          },
          body: JSON.stringify({
            message: `Upload image: ${fileName} (WebP compressed)`,
            content: base64Content,
            branch: branch,
          }),
        });

        if (!ghRes.ok) {
          const ghResult = await ghRes.json();
          console.warn('GitHub upload warning:', ghResult);
        }
      } catch (ghErr) {
        console.error('Error committing image to GitHub:', ghErr);
      }
    }

    // Save to local disk
    try {
      const localDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      const fullPath = path.join(localDir, fileName);
      fs.writeFileSync(fullPath, finalBuffer);
    } catch (fsErr) {
      // Ignore if read-only serverless
    }

    const localUrl = `/api/media/${fileName}`;

    return NextResponse.json({
      success: true,
      imageUrl: localUrl,
      fileName: fileName,
      path: `/uploads/${fileName}`,
      size: finalBuffer.length,
      originalSize: file.size,
      width,
      height,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while uploading image' },
      { status: 500 }
    );
  }
}
