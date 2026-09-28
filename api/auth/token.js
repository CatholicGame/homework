// POST /api/auth/token → access token mới từ refresh token trong cookie (không popup). 401: cần đăng nhập lại.
import { SESSION_COOKIE, clearSessionCookie, cookies, sameOrigin, sendJson, sessionCookie, tokenRequest, unseal } from '../_lib/google.js';

export default async function handler(req, res) {
  if (req.method !== 'POST' || !sameOrigin(req)) return sendJson(res, 405, { error: 'method' });
  const session = unseal(cookies(req)[SESSION_COOKIE] || '');
  if (!session?.rt) return sendJson(res, 401, { error: 'no-session' }, [clearSessionCookie()]);

  const { ok, body } = await tokenRequest({ grant_type: 'refresh_token', refresh_token: session.rt });
  if (!ok) {
    // invalid_grant: người dùng đã gỡ quyền của app trong tài khoản Google / đổi mật khẩu.
    const gone = body.error === 'invalid_grant';
    return sendJson(res, gone ? 401 : 502, { error: body.error || 'google' }, gone ? [clearSessionCookie()] : []);
  }
  sendJson(res, 200, {
    access_token: body.access_token,
    expires_in: body.expires_in,
    scope: body.scope,
    user: session.user,
  }, [sessionCookie(session)]); // gia hạn cookie
}
