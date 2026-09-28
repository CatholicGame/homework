// GET /api/auth/login?hint=email → chuyển sang trang đăng nhập Google (xin quyền offline để có refresh token).
import { randomBytes } from 'node:crypto';
import { CLIENT_ID, SCOPES, STATE_COOKIE, clientSecret, cookie, query, redirect, redirectUri, sendJson } from '../_lib/google.js';

export default function handler(req, res) {
  if (!clientSecret()) return sendJson(res, 501, { error: 'not-configured' });
  const state = randomBytes(16).toString('base64url');
  const hint = query(req).get('hint') || '';
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUri(req),
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    include_granted_scopes: 'true',
    // consent: Google chỉ cấp refresh token khi màn đồng ý hiện ra; select_account: chọn đúng tài khoản của bé.
    prompt: hint ? 'consent' : 'consent select_account',
    state,
    ...(hint ? { login_hint: hint } : {}),
  });
  redirect(res, `https://accounts.google.com/o/oauth2/v2/auth?${params}`, [
    cookie(STATE_COOKIE, state, { maxAge: 600 }),
  ]);
}
