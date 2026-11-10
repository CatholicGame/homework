/**
 * Kiểm thử phòng Đấu Trường Nhí (`arena-g<lớp>`, realtime/room.js + src/dauTruong/rules.js): lịch, vào phòng, ghế, nối lại giữ ghế,
 * "Em muốn lên bục", phòng thử bắt đầu ngay, trang cũ, chương trình chung (máy chủ trò, ảnh chụp, thao tác, đổi chủ trò).
 * `npm test` trong realtime/.
 */
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { ARENA_PROTO, LIVE_MS, OPEN_BEFORE, SEAT_IDS, TEST_LEAD, clockText, nextStart, pupilOfLook, stepAt, whenText } from '../src/dauTruong/rules.js';

// ---- lịch (hàm thuần): 19:30 giờ VN = 12:30 UTC
const day = Date.UTC(2026, 10, 7);                                   // 7/11/2026, thứ Bảy
const s1 = nextStart(3, day + 5 * 3600e3);                           // 12:00 VN
assert.equal(s1, day + 12.5 * 3600e3);
assert.equal(stepAt(s1, s1 - OPEN_BEFORE - 1000), 'closed');
assert.equal(stepAt(s1, s1 - 60e3), 'lobby');
assert.equal(stepAt(s1, s1 + 60e3), 'live');
assert.equal(nextStart(3, s1 + 60e3), s1);                           // đang diễn: vẫn là lượt này
assert.equal(nextStart(3, s1 + LIVE_MS + 1), s1 + 86400e3);          // đã xong: lượt ngày mai
assert.equal(whenText(s1, s1 - 3600e3), '19:30 hôm nay');
assert.equal(whenText(s1 + 86400e3, s1), '19:30 ngày mai');
assert.equal(whenText(s1 + 2 * 86400e3, s1), '19:30 thứ Hai');
assert.equal(clockText(65e3), '1:05');
assert.equal(clockText(3725e3), '1:02:05');
assert.equal(pupilOfLook('p:3'), 3);
assert.equal(pupilOfLook('x:1,p:9'), -1);
assert.equal(SEAT_IDS.length, 50);

// ---- phòng cuốn chiếu: chương trình đang diễn không bị cắt vì quá LIVE_MS, phòng dựng lại giữa chương trình vẫn diễn tiếp
{
  const { Room } = await import('./room.js');
  const now = Date.now(), M = 60e3;
  const r = new Room('arena-g3');
  r.created = now - 50 * M - TEST_LEAD;                                // bắt đầu 50 phút trước
  assert.equal(r.arenaState().step, 'closed');                         // không có ảnh chụp: hết lượt như cũ
  r.aSnapAt = now - 10e3;
  assert.equal(r.arenaState().step, 'live');                           // máy chủ trò vừa gửi ảnh chụp: diễn tiếp
  r.aSnapAt = now - 6 * M;
  assert.equal(r.arenaState().step, 'closed');                         // máy chủ trò im quá ARENA_KEEP
  r.aSnapAt = now - 10e3; r.aDone = true;
  assert.equal(r.arenaState().step, 'closed');                         // chương trình đã báo xong ('xe')
  r.aDone = false; r.created = now - 3 * 3600e3;
  assert.equal(r.arenaState().step, 'closed');                         // quá ARENA_MAX
  const created = now - 50 * M;
  let r2 = new Room('arena-g3', { round: { created, forceAt: created + 5000, quick: 1, snapAt: now - 60e3, done: 0 } });
  assert.equal(r2.created, created); assert.equal(r2.forceAt, created + 5000); assert.equal(r2.arenaState().step, 'live');
  r2 = new Room('arena-g3', { round: { created, snapAt: now - 6 * M, done: 0 } });
  assert.equal(r2.arenaState().step, 'lobby');                         // chương trình đã chết lâu: lượt mới
  r2 = new Room('arena-g3', { round: { created, snapAt: now - 60e3, done: 1 } });
  assert.notEqual(r2.created, created);                                // đã xong: lượt mới
  r2 = new Room('arena-g3', { created: now - 30e3 });                  // bản cũ chỉ lưu created, còn sảnh chờ
  assert.equal(r2.created, now - 30e3);
}

// ---- máy chủ dev (ARENA_DEMO: không theo lịch, bắt đầu 90 giây sau người đầu tiên)
const PORT = 8798;
const srv = spawn(process.execPath, ['dev.mjs'], { cwd: import.meta.dirname, env: { ...process.env, PORT: String(PORT), ARENA_DEMO: '1' }, stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise((ok) => srv.stdout.once('data', ok));

function client(key = 'arena-g3') {
  const ws = new WebSocket(`ws://localhost:${PORT}/room/${key}`);
  const inbox = [], waiters = [];
  let closed = null;
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    const i = waiters.findIndex(w => w.type === m[0] && (!w.when || w.when(m)));
    if (i >= 0) waiters.splice(i, 1)[0].ok(m); else inbox.push(m);
  };
  ws.onclose = (e) => { closed = e.code; };
  const next = (type, when = null, ms = 2000) => {
    const i = inbox.findIndex(m => m[0] === type && (!when || when(m)));
    if (i >= 0) return Promise.resolve(inbox.splice(i, 1)[0]);
    return new Promise((ok, no) => { waiters.push({ type, when, ok }); setTimeout(() => no(new Error(`chờ '${type}' quá lâu`)), ms); });
  };
  const open = new Promise((ok) => { ws.onopen = ok; });
  return { ws, next, open, send: (m) => ws.send(JSON.stringify(m)), get closed() { return closed; }, inbox };
}
const hi = (extra = {}) => ['hi', { x: 0, y: 0, z: 0, h: 0, a: 0, k: 0, c: 0, w: 0, v: ARENA_PROTO, ...extra }];
const wait = (ms) => new Promise(r => setTimeout(r, ms));

try {
  // trang cũ (giao thức khác): báo tải lại, đóng 4003
  const old = client();
  await old.open;
  old.send(['hi', { v: 0 }]);
  await old.next('old');

  // vào phòng: nhận bước sảnh chờ, giờ bắt đầu ~90 giây nữa
  const a = client();
  await a.open;
  a.send(hi({ n: 'Bảo Anh', o: 'p:4', seat: 'B5', r: 'phien-cua-a-01' }));
  const [, idA] = await a.next('hi');
  const [, s0] = await a.next('A', (m) => m[1].people === 1);
  assert.equal(s0.step, 'lobby');
  assert.equal(s0.test, 1);
  assert.ok(s0.startAt - s0.now > 60e3 && s0.startAt - s0.now <= 90e3);
  assert.equal(s0.want, 1);                                         // muốn lên bục: bật sẵn

  // người thứ hai: thấy A ngồi B5 với nhân vật số 4; xin ghế B5 bị từ chối, ghế sai mã bị bỏ qua
  const b = client();
  await b.open;
  b.send(hi({ n: 'Minh', o: 'p:1', want: 0, r: 'phien-cua-b-01' }));
  const [, idB, peers] = await b.next('hi');
  assert.deepEqual(peers.map(p => [p.id, p.seat, p.n, pupilOfLook(p.o), p.want]), [[idA, 'B5', 'Bảo Anh', 4, 1]]);
  b.send(['sit', 'B5']);
  await b.next('no');
  b.send(['sit', 'Z99']);
  b.send(['sit', 'C6']);
  const [, sitId, sitSeat] = await a.next('sit');
  assert.deepEqual([sitId, sitSeat], [idB, 'C6']);
  const [, s1b] = await a.next('A', (m) => m[1].people === 2);
  assert.equal(s1b.want, 1);                                        // B tắt "muốn lên bục"
  b.send(['want', 1]);
  await a.next('A', (m) => m[1].want === 2);

  // A rớt mạng rồi nối lại cùng mã phiên: bóng ma cũ bị bỏ, ghế B5 vẫn là của A
  a.ws.close();
  await b.next('out', (m) => m[1] === idA);
  const a2 = client();
  await a2.open;
  a2.send(hi({ n: 'Bảo Anh', o: 'p:4', seat: 'B5', r: 'phien-cua-a-01' }));
  await a2.next('hi');
  const [, back] = await b.next('in');
  assert.equal(back.seat, 'B5');

  // trang chủ hỏi trạng thái: số người, không có tên
  const st = await (await fetch(`http://localhost:${PORT}/status/arena-g3`)).json();
  assert.equal(st.people, 2);
  assert.equal(st.queue, 2);

  // người thử bấm Bắt đầu ngay: 5 giây sau cả phòng sang bước 'live'
  b.send(['start']);
  const [, s2] = await a2.next('A', (m) => m[1].startAt - m[1].now <= 5000);
  assert.equal(s2.step, 'lobby');
  const [, s3] = await b.next('A', (m) => m[1].step === 'live', 8000);
  assert.ok(s3.now >= s3.startAt);

  // chương trình chung: máy chủ trò = người ngồi ghế vào sớm nhất còn trong phòng (A đã nối lại nên mã mới, B có mã nhỏ hơn)
  const [, idA2] = [0, back.id];
  assert.equal(s3.host, idB);
  assert.equal(s3.free, 1);
  assert.ok(s3.round > 0);
  // máy chủ trò gửi ảnh chụp (dài hơn tin thường) và hiệu ứng: người khác nhận; máy không phải chủ trò gửi thì bị bỏ
  const big = { mode: 'khoidong', pad: 'x'.repeat(3000) };
  b.send(['xs', big]);
  const [, gotSnap] = await a2.next('xs');
  assert.equal(gotSnap.pad.length, 3000);
  b.send(['xf', 'say', 'Xin chào', 0]);
  assert.deepEqual((await a2.next('xf')).slice(1), ['say', 'Xin chào', 0]);
  a2.send(['xs', { mode: 'gia' }]);
  await assert.rejects(b.next('xs', null, 600));
  // thao tác của A chuyển tới máy chủ trò kèm mã của A
  a2.send(['xi', 'lock', 1, 2, 3.5, 9]);
  assert.deepEqual(await b.next('xi'), ['xi', idA2, 'lock', 1, 2, 3.5, 9]);
  // người vào giữa chương trình: nhận ngay ảnh chụp cuối
  const d = client();
  await d.open;
  d.send(hi({ n: 'Dũng', r: 'phien-cua-d-01' }));
  await d.next('hi');
  assert.equal((await d.next('xs'))[1].mode, 'khoidong');
  // máy chủ trò rời phòng: người ngồi ghế kế tiếp (A) nhận quyền
  b.ws.close();
  await a2.next('A', (m) => m[1].host === idA2);
  d.ws.close();

  // phòng của lớp khác là phòng riêng
  const c = client('arena-g5');
  await c.open;
  c.send(hi({ n: 'Lan', r: 'phien-cua-c-01' }));
  const [, , peersC] = await c.next('hi');
  assert.equal(peersC.length, 0);

  for (const x of [a2, c]) x.ws.close();
  await wait(100);

  // ẩn tab / rớt mạng lúc phòng chỉ có mình: phòng trống vẫn được giữ, quay lại đúng lượt cũ (mã lượt, giờ bắt đầu không đổi)
  const e = client('arena-g2');
  await e.open;
  e.send(hi({ n: 'Nam', r: 'phien-cua-e-01' }));
  const [, s1e] = await e.next('A');
  e.ws.close();
  await wait(1500);
  const e2 = client('arena-g2');
  await e2.open;
  e2.send(hi({ n: 'Nam', r: 'phien-cua-e-01' }));
  const [, s2e] = await e2.next('A');
  assert.equal(s2e.round, s1e.round);
  assert.equal(s2e.startAt, s1e.startAt);
  e2.ws.close();
  await wait(100);
  console.log('arena: ok');
} finally {
  srv.kill();
}
