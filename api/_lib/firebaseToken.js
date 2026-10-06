/**
 * Kiểm tra Firebase ID token (phiên Google hoặc khách ẩn danh của app) mà không cần firebase-admin:
 * chữ ký RS256 theo chứng chỉ công khai của Google, aud/iss đúng project, còn hạn.
 * Trả về payload ({ sub, firebase.sign_in_provider, … }) hoặc null.
 */

import { createVerify } from 'node:crypto';

const CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
export const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'mathtieuhoc';

let cache = { until: 0, certs: null };

async function certs() {
  if (cache.certs && Date.now() < cache.until) return cache.certs;
  const res = await fetch(CERTS_URL);
  if (!res.ok) throw new Error(`certs ${res.status}`);
  const age = Number((res.headers.get('cache-control') || '').match(/max-age=(\d+)/)?.[1]) || 3600;
  cache = { until: Date.now() + age * 1000, certs: await res.json() };
  return cache.certs;
}

const part = (s) => JSON.parse(Buffer.from(s, 'base64url').toString('utf8'));

export async function verifyIdToken(token) {
  try {
    const [h, p, sig] = String(token || '').split('.');
    if (!sig) return null;
    const header = part(h);
    const payload = part(p);
    if (header.alg !== 'RS256') return null;
    const cert = (await certs())[header.kid];
    if (!cert) return null;
    const ok = createVerify('RSA-SHA256').update(`${h}.${p}`).verify(cert, Buffer.from(sig, 'base64url'));
    const now = Date.now() / 1000;
    if (!ok || payload.aud !== PROJECT_ID || payload.iss !== `https://securetoken.google.com/${PROJECT_ID}`) return null;
    if (!(payload.exp > now) || payload.iat > now + 300 || !payload.sub) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Token trong header `Authorization: Bearer …`. */
export function bearer(req) {
  return String(req.headers.authorization || '').match(/^Bearer\s+(.+)$/i)?.[1] || '';
}
