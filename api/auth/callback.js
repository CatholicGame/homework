// GET /api/auth/callback?code&state — Google quay về: đổi code lấy token, cất refresh token vào cookie, về app.
import { STATE_COOKIE, cookie, cookies, idTokenClaims, query, redirect, redirectUri, sessionCookie, tokenRequest } from '../_lib/google.js';

export default async function handler(req, res) {
  const q = query(req);
  const clearState = cookie(STATE_COOKIE, '', {});
  const fail = (why) => redirect(res, `/?login_error=${encodeURIComponent(why)}`, [clearState]);

  if (q.get('error')) return fail(q.get('error')); // vd. access_denied: bấm Huỷ
  const state = cookies(req)[STATE_COOKIE];
  if (!state || state !== q.get('state')) return fail('state');

  const { ok, body } = await tokenRequest({
    grant_type: 'authorization_code',
    code: q.get('code') || '',
    redirect_uri: redirectUri(req),
  });
  if (!ok || !body.refresh_token) {
    console.warn('[auth] đổi code thất bại', body.error || 'no refresh_token');
    return fail(body.error || 'no-refresh-token');
  }
  const c = idTokenClaims(body.id_token);
  const user = { id: c.sub, name: c.name || c.email, email: c.email, picture: c.picture };
  redirect(res, '/?login=ok', [clearState, sessionCookie({ rt: body.refresh_token, user })]);
}
