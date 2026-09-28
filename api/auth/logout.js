// POST /api/auth/logout → thu hồi refresh token ở Google và xoá cookie.
import { SESSION_COOKIE, clearSessionCookie, cookies, sameOrigin, sendJson, unseal } from '../_lib/google.js';

export default async function handler(req, res) {
  if (req.method !== 'POST' || !sameOrigin(req)) return sendJson(res, 405, { error: 'method' });
  const session = unseal(cookies(req)[SESSION_COOKIE] || '');
  if (session?.rt) {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(session.rt)}`, { method: 'POST' })
      .catch(() => {});
  }
  sendJson(res, 200, { ok: true }, [clearSessionCookie()]);
}
