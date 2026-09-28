/**
 * Dùng chung cho /api/auth/* (Vercel Functions, Node): đăng nhập Google kiểu "authorization code"
 * để có refresh token — app lấy access token mới (lưu Google Drive) mà không cần popup/bấm nút.
 *
 * Refresh token nằm trong cookie `tth_rt` (HttpOnly, mã hoá AES-GCM bằng khoá suy từ
 * GOOGLE_CLIENT_SECRET) — JavaScript trên trang không đọc được.
 *
 * Biến môi trường (Vercel → Settings → Environment Variables; chạy máy: .env.local):
 *   GOOGLE_CLIENT_SECRET  bắt buộc — client secret của OAuth client (project mathtieuhoc)
 *   GOOGLE_CLIENT_ID      tuỳ chọn — mặc định giống src/engine/auth.js
 * Chỉ dùng node:crypto + req/res thuần của Node để chạy được cả trên Vercel lẫn Vite dev (vite.config.js).
 */

import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

export const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  || '500123229695-se84qoeglj63vr8vserhqfmfmcfafia4.apps.googleusercontent.com';
export const clientSecret = () => process.env.GOOGLE_CLIENT_SECRET || '';

export const SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/drive.appdata',
].join(' ');

export const SESSION_COOKIE = 'tth_rt';
export const STATE_COOKIE = 'tth_oauth';
const SESSION_MAX_AGE = 180 * 24 * 3600; // 180 ngày; mỗi lần lấy token lại gia hạn

// ── req / res ────────────────────────────────────────────────────────────────
export function origin(req) {
  const proto = (req.headers['x-forwarded-proto'] || '').split(',')[0]
    || (req.socket?.encrypted ? 'https' : 'http');
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
}
export const redirectUri = (req) => `${origin(req)}/api/auth/callback`;

export function query(req) {
  return new URL(req.url, 'http://x').searchParams;
}

export function cookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

export function cookie(name, value, { maxAge, path = '/api/auth' } = {}) {
  return [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${value ? maxAge : 0}`,
  ].join('; ');
}

export function sendJson(res, status, body, setCookies = []) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (setCookies.length) res.setHeader('Set-Cookie', setCookies);
  res.end(JSON.stringify(body));
}

export function redirect(res, location, setCookies = []) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'no-store');
  if (setCookies.length) res.setHeader('Set-Cookie', setCookies);
  res.end();
}

/** POST từ trang khác (không cùng origin) → từ chối. */
export function sameOrigin(req) {
  const o = req.headers.origin;
  return !o || o === origin(req);
}

// ── mã hoá cookie ────────────────────────────────────────────────────────────
const key = () => createHash('sha256').update(`tth-session:${clientSecret()}`).digest();

export function seal(obj) {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key(), iv);
  const data = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), data]).toString('base64url');
}

export function unseal(str) {
  try {
    const buf = Buffer.from(str, 'base64url');
    const d = createDecipheriv('aes-256-gcm', key(), buf.subarray(0, 12));
    d.setAuthTag(buf.subarray(12, 28));
    return JSON.parse(Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString('utf8'));
  } catch {
    return null;
  }
}

export const sessionCookie = (session) => cookie(SESSION_COOKIE, seal(session), { maxAge: SESSION_MAX_AGE });
export const clearSessionCookie = () => cookie(SESSION_COOKIE, '', {});

// ── Google OAuth ─────────────────────────────────────────────────────────────
export async function tokenRequest(params) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: clientSecret(), ...params }),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, body };
}

/** Phần thân id_token (nhận trực tiếp từ Google qua HTTPS nên không cần kiểm chữ ký). */
export function idTokenClaims(idToken) {
  try { return JSON.parse(Buffer.from(idToken.split('.')[1], 'base64url').toString('utf8')); } catch { return {}; }
}
