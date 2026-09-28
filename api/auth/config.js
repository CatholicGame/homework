// GET /api/auth/config → { offline: true } khi máy chủ đã có GOOGLE_CLIENT_SECRET (đăng nhập có refresh token).
import { clientSecret, sendJson } from '../_lib/google.js';

export default function handler(req, res) {
  sendJson(res, 200, { offline: !!clientSecret() });
}
