/**
 * Máy chủ phòng trên Cloudflare: Worker nhận wss://…/room/<khoá>, mỗi khoá là một Durable Object `ChurchRoom` (một phòng,
 * một tiến trình giữ mọi WebSocket của phòng đó, logic ở room.js). Triển khai: `npx wrangler deploy` trong realtime/.
 * Chỉ nhận trang của app (ALLOWED_ORIGINS trong wrangler.toml, cách nhau dấu phẩy, `*` thay một phần tên miền; thêm localhost khi thử).
 * GET /status/<khoá>: số người thật, có đang chơi không (trang chủ: dải báo trường quay đang chờ), không có tên ai.
 * MIN_PLAYERS (wrangler.toml [vars], tuỳ chọn): số người thật cần để bắt đầu ván ở trường quay (mặc định room.js MIN_PLAYERS).
 */
import { Room, MIN_PLAYERS } from './room.js';
import { roomKey, statusKey, EMPTY_STATUS } from './keys.js';

export class ChurchRoom {
  constructor(state, env) {
    this.room = null;
    this.need = env.MIN_PLAYERS != null && env.MIN_PLAYERS !== '' ? +env.MIN_PLAYERS : MIN_PLAYERS;
  }

  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (statusKey(path)) return Response.json(this.room?.status() || { ...EMPTY_STATUS, need: this.need });
    const key = roomKey(path);
    this.room ||= new Room(key, { onEmpty: () => { this.room = null; }, need: this.need });
    const room = this.room;
    const [client, server] = Object.values(new WebSocketPair());
    server.accept();
    const conn = room.connect({ send: (t) => server.send(t), close: (c, r) => server.close(c, r) });
    server.addEventListener('message', (e) => { if (typeof e.data === 'string') room.message(conn, e.data); });
    server.addEventListener('close', () => room.leave(conn));
    server.addEventListener('error', () => room.leave(conn));
    return new Response(null, { status: 101, webSocket: client });
  }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    const origin = req.headers.get('Origin') || '';
    const okOrigin = !allowed.length || allowed.some(a => new RegExp(`^${a.replace(/[.]/g, '\\.').replace(/\*/g, '[a-z0-9-]+')}$`).test(origin));
    const sk = statusKey(url.pathname);
    if (sk) {
      const r = await env.ROOMS.get(env.ROOMS.idFromName(sk)).fetch(req);
      return new Response(await r.text(), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store',
        ...(okOrigin && origin ? { 'access-control-allow-origin': origin, vary: 'Origin' } : {}) } });
    }
    const key = roomKey(url.pathname);
    if (!key) return new Response('kinh-thanh rooms\n', { status: url.pathname === '/' ? 200 : 404 });
    if (req.headers.get('Upgrade') !== 'websocket') return new Response('cần WebSocket\n', { status: 426 });
    if (!okOrigin) return new Response('origin không được phép\n', { status: 403 });
    return env.ROOMS.get(env.ROOMS.idFromName(key)).fetch(req);
  },
};
