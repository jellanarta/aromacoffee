// Client-side image validation & WebP compression helper for Aroma Coffee & Eatery

export const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024; // 4MB maximum
export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'bmp'];
export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/bmp',
];

/**
 * Validate image file on frontend:
 * 1. Size <= 4MB
 * 2. Supported extension (.jpg, .jpeg, .png, .webp, .avif, .gif, .bmp)
 * 3. Valid MIME type
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'Tidak ada file yang dipilih.' };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `Ukuran file melebihi batas 4MB (${sizeInMB} MB). Silakan gunakan gambar di bawah 4MB.`,
    };
  }

  if (file.size <= 0) {
    return {
      valid: false,
      error: 'File gambar kosong atau korup.',
    };
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  if (!extension || !ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Format file (.${extension || 'unknown'}) tidak didukung! Format yang diizinkan: ${ALLOWED_IMAGE_EXTENSIONS.map(
        (ext) => `.${ext}`
      ).join(', ')}`,
    };
  }

  if (file.type && !ALLOWED_IMAGE_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Tipe file "${file.type}" bukan format gambar yang valid.`,
    };
  }

  return { valid: true };
}

/**
 * Compress & convert image to WebP format in browser
 */
export async function compressImageToWebP(
  file: File,
  maxWidth = 2048,
  maxHeight = 2048
): Promise<File> {
  if (file.type === 'image/gif' || file.name.toLowerCase().endsWith('.gif')) {
    return file;
  }

  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = async () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const renderBlob = (w: number, h: number, q: number): Promise<Blob | null> => {
        return new Promise((res) => {
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;

          const ctx = canvas.getContext('2d', { alpha: true });
          if (!ctx) {
            res(null);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, w, h);

          canvas.toBlob((blob) => res(blob), 'image/webp', q);
        });
      };

      try {
        const targetMaxBytes = Math.round(file.size * 0.5);
        let blob = await renderBlob(width, height, 0.85);

        if (blob && blob.size > targetMaxBytes && file.size > 80 * 1024) {
          const secondPassBlob = await renderBlob(
            Math.round(width * 0.9),
            Math.round(height * 0.9),
            0.8
          );
          if (secondPassBlob && secondPassBlob.size < blob.size) {
            blob = secondPassBlob;
          }
        }

        if (blob) {
          const cleanBase = file.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .toLowerCase();

          const compressedFile = new File([blob], `${cleanBase}.webp`, {
            type: 'image/webp',
            lastModified: Date.now(),
          });

          resolve(compressedFile);
        } else {
          resolve(file);
        }
      } catch (err) {
        console.warn('Gagal memproses canvas WebP, gunakan file awal:', err);
        resolve(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Main function to upload image to /api/upload-image
 */
export async function uploadImageFile(file: File): Promise<string> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'File gambar tidak memenuhi syarat.');
  }

  const compressed = await compressImageToWebP(file);

  if (compressed.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('Ukuran file setelah konversi masih melebihi batas maksimal 4MB.');
  }

  const formData = new FormData();
  formData.append('file', compressed);

  const res = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal mengunggah gambar ke server.');
  }

  return data.imageUrl;
}
