/**
 * Máy chủ phòng chạy trên máy dev: `npm run dev` trong realtime/ (cổng 8787, như `wrangler dev`).
 * Cùng logic phòng với worker.js (room.js), chỉ khác lớp nối: Node http + ws. Client lúc dev tự nối tới ws://<máy>:8787.
 */
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { Room } from './room.js';
import { roomKey, statusKey, EMPTY_STATUS } from './keys.js';

const PORT = +process.env.PORT || 8787;
// trường quay: số người thật cần để bắt đầu ván và giây đếm ngược; máy dev mặc định 1 người, 3 giây (Worker: 5 người, 10 giây)
const NEED = process.env.MIN_PLAYERS != null ? +process.env.MIN_PLAYERS : 1;
const START = process.env.START_MS != null ? +process.env.START_MS : 3000;
const SPEED = +process.env.SHOW_SPEED || 1;
// Đấu Trường Nhí: máy dev không theo lịch, phòng bắt đầu 90 giây sau người đầu tiên (ARENA_DEMO=0: theo lịch thật)
const ARENA_DEMO = process.env.ARENA_DEMO !== '0';   // kiểm thử: chương trình đố vui chạy nhanh hơn (test.mjs)
const rooms = new Map();
const http = createServer((req, res) => {
  // GET /status/<khoá>: số người của phòng cho trang chủ (dải báo trường quay đang chờ)
  const sk = statusKey(new URL(req.url, 'http://x').pathname);
  if (sk) {
    res.writeHead(200, { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'cache-control': 'no-store' });
    res.end(JSON.stringify(rooms.get(sk)?.status() || { ...EMPTY_STATUS, need: NEED }));
    return;
  }
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('kinh-thanh rooms (dev)\n');
});
const wss = new WebSocketServer({ noServer: true, maxPayload: 16384 });

http.on('upgrade', (req, socket, head) => {
  const key = roomKey(new URL(req.url, 'http://x').pathname);
  if (!key) { socket.destroy(); return; }
  wss.handleUpgrade(req, socket, head, (ws) => {
    let room = rooms.get(key);
    if (!room) {
      room = new Room(key, { onEmpty: () => { rooms.delete(key); log(); }, need: NEED, start: START, speed: SPEED, arenaDemo: ARENA_DEMO });
      rooms.set(key, room);
    }
    const conn = room.connect({ send: (t) => ws.send(t), close: (c, r) => ws.close(c, r) });
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });
    ws.on('message', (data, binary) => { if (!binary) room.message(conn, data.toString()); });
    ws.on('close', () => { room.leave(conn); log(); });
    ws.on('error', () => {});
    setTimeout(log, 50);
  });
});

// máy rớt mạng không báo đóng: ping mỗi 20 s, không trả lời thì ngắt
setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) { ws.terminate(); continue; }
    ws.isAlive = false;
    ws.ping();
  }
}, 20000);

function log() {
  console.log(`[rooms] ${[...rooms].map(([k, r]) => `${k}: ${r.peers.size}`).join(', ') || '(trống)'}`);
}

http.listen(PORT, () => console.log(`Phòng Gặp gỡ online (dev): ws://localhost:${PORT}/room/<khoá>`));
