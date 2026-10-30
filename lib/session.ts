import crypto from 'crypto';

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.ADMIN_PASSWORD ||
  'aroma-coffee-secure-session-key-2026';

export const SESSION_COOKIE_NAME = 'aroma_admin_session';
export const SESSION_DURATION_SECONDS = 24 * 60 * 60; // 24 hours

export interface SessionPayload {
  role: 'admin';
  iat: number;
  exp: number;
}

export function createSessionToken(): string {
  const now = Date.now();
  const payload: SessionPayload = {
    role: 'admin',
    iat: now,
    exp: now + SESSION_DURATION_SECONDS * 1000,
  };

  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(data)
    .digest('base64url');

  return `${data}.${signature}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [data, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(data)
    .digest('base64url');

  if (signature !== expectedSignature) return false;

  try {
    const payload: SessionPayload = JSON.parse(
      Buffer.from(data, 'base64url').toString('utf-8')
    );
    if (!payload.exp || Date.now() > payload.exp) {
      return false; // Expired (> 24 hours)
    }
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
