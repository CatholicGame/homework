// GET /api/device → { net } — mã băm của mạng đang dùng (IPv4 đủ 4 số, IPv6 lấy /64), không trả địa chỉ IP.
// src/engine/deviceKey.js trộn vào mã máy để mỗi máy chỉ có một tài khoản khách dùng thử.
import { createHash } from 'node:crypto';
import { sendJson } from './_lib/google.js';

function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || String(req.headers['x-real-ip'] || '') || req.socket?.remoteAddress || '';
}

export default function handler(req, res) {
  let ip = clientIp(req).replace(/^::ffff:/, '');
  if (ip.includes(':')) ip = ip.split(':').slice(0, 4).join(':'); // IPv6: mạng /64, máy đổi đuôi vẫn giữ mã
  const net = ip ? createHash('sha256').update(`tth-device:${ip}`).digest('hex').slice(0, 16) : '';
  sendJson(res, 200, { net });
}
