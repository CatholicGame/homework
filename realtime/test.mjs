/**
 * Kiểm thử máy chủ phòng: chạy dev.mjs trên một cổng riêng, ba người nối vào, kiểm tra vào / ra, trạng thái gom lại,
 * giữ ghế (ai xin trước được), phòng kín. `npm test` trong realtime/.
 */
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { capOf, cleanName, lookOf } from './room.js';
import { PROTO } from '../src/thanDong/quiz/rules.js';

const PORT = 8799;
const srv = spawn(process.execPath, ['dev.mjs'], { cwd: import.meta.dirname, env: { ...process.env, PORT: String(PORT), MIN_PLAYERS: '0', START_MS: '0', SHOW_SPEED: '60' }, stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise((ok) => srv.stdout.once('data', ok));

function client(key) {
  const ws = new WebSocket(`ws://localhost:${PORT}/room/${key}`);
  const inbox = [];
  const waiters = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    const i = waiters.findIndex(w => w.type === m[0]);
    if (i >= 0) waiters.splice(i, 1)[0].ok(m); else inbox.push(m);
  };
  const next = (type, ms = 1500) => {
    const i = inbox.findIndex(m => m[0] === type);
    if (i >= 0) return Promise.resolve(inbox.splice(i, 1)[0]);
    return new Promise((ok, no) => { waiters.push({ type, ok }); setTimeout(() => no(new Error(`chờ '${type}' quá lâu`)), ms); });
  };
  const open = new Promise((ok) => { ws.onopen = ok; });
  const send = (m) => ws.send(JSON.stringify(m));
  return { ws, next, open, send, inbox };
}

try {
  const a = client('saigon');
  await a.open;
  a.send(['hi', { x: 100, y: 0, z: 3150, h: 0, a: 0, k: 0, c: 3, w: 1, o: 'h:long,t:aodai,tc:2', n: 'Ma‮ri​a Ngọc Trâm Anh' }]);
  const [, idA, peers0] = await a.next('hi');
  assert.equal(peers0.length, 0);

  const b = client('saigon');
  await b.open;
  b.send(['hi', { x: -50, y: 0, z: 2000, h: 157, a: 0, k: 0, c: 5, w: 0 }]);
  const [, idB, peers1] = await b.next('hi');
  assert.deepEqual(peers1.map(p => [p.id, p.c, p.w, p.n, p.o]), [[idA, 3, 1, 'Maria Ngọc…', 'h:long,t:aodai,tc:2']]);
  assert.equal(lookOf('t:<b>'), '');
  assert.equal(lookOf('x'.repeat(201)), '');
  assert.equal(cleanName(42), '');
  assert.equal(cleanName('  Nam\n '), 'Nam');
  const [, inB] = await a.next('in');
  assert.equal(inB.id, idB);

  // vị trí: gửi ba lần liên tiếp, bên kia nhận một gói gom lại với lần cuối
  for (const x of [110, 120, 130]) a.send(['s', x, 0, 3100, 10, 1, 0]);
  const [, list] = await b.next('S');
  assert.deepEqual(list, [[idA, 130, 0, 3100, 10, 1, 0]]);

  // ghế: A xin trước, B xin trùng thì bị từ chối
  a.send(['sit', 'B1_R03_S4']);
  assert.deepEqual(await b.next('sit'), ['sit', idA, 'B1_R03_S4']);
  b.send(['sit', 'B1_R03_S4']);
  assert.deepEqual(await b.next('no'), ['no', 'B1_R03_S4']);
  a.send(['up']);
  assert.deepEqual(await b.next('up'), ['up', idA]);
  b.send(['sit', 'B1_R03_S4']);
  assert.deepEqual(await a.next('sit'), ['sit', idB, 'B1_R03_S4']);

  // vào phòng mang theo ghế đã có người: được vào, nhưng nhận 'no' cho ghế đó
  const e = client('saigon');
  await e.open;
  e.send(['hi', { seat: 'B1_R03_S4' }]);
  const [, , peersE] = await e.next('hi');
  assert.deepEqual(await e.next('no'), ['no', 'B1_R03_S4']);
  assert.equal(peersE.find(p => p.id === idB).seat, 'B1_R03_S4');
  e.ws.close();
  await a.next('out');

  // chat: cả phòng nhận (kể cả người nói) bản đã làm sạch; lặp lại / quá nhanh thì bỏ; người vào sau nhận lời gần nhất
  a.send(['say', '  Chào cả nhà, gọi 0912345678 nhé  ']);
  assert.deepEqual(await b.next('say'), ['say', idA, 'Maria Ngọc…', 'Chào cả nhà, gọi ********** nhé']);
  await a.next('say');
  a.send(['say', 'Chào cả nhà, gọi 0912345678 nhé']);   // trùng lời trước: bỏ
  a.send(['say', 'đ.m']);                                // chỉ còn dấu *: bỏ
  a.send(['say', 'lời hai']);
  a.send(['say', 'lời ba']);
  a.send(['say', 'lời bốn']);                            // hết lượt (3 lời dồn): bỏ
  assert.equal((await b.next('say'))[3], 'lời hai');
  assert.equal((await b.next('say'))[3], 'lời ba');
  await assert.rejects(b.next('say', 400));
  const lateC = client('saigon');
  await lateC.open;
  lateC.send(['hi', {}]);
  await lateC.next('hi');
  assert.deepEqual((await lateC.next('says'))[1].map(r => r[2]), ['Chào cả nhà, gọi ********** nhé', 'lời hai', 'lời ba']);
  lateC.ws.close();
  await a.next('out');

  // phòng khác không nghe thấy phòng này
  const c = client('studio');
  await c.open;
  c.send(['hi', { v: PROTO }]);
  const [, , peersC, cap] = await c.next('hi');
  assert.equal(peersC.length, 0);
  assert.equal(cap, capOf('studio'));

  // B rời: A nhận 'out', ghế của B được trả
  b.ws.close();
  assert.deepEqual(await a.next('out'), ['out', idB]);
  a.send(['sit', 'B1_R03_S4']);
  await new Promise(r => setTimeout(r, 150));
  assert.ok(!a.inbox.some(m => m[0] === 'no'));

  // tin rác: bị ngắt
  const d = client('saigon');
  await d.open;
  const closed = new Promise((ok) => { d.ws.onclose = (e) => ok(e.code); });
  d.ws.send('{không phải json');
  assert.equal(await closed, 4002);

  // phòng kín: người thứ cap + 1 nhận 'full'
  const many = [];
  for (let i = 0; i < capOf('vatican'); i++) {
    const m = client('vatican');
    await m.open;
    m.send(['hi', {}]);
    await m.next('hi');
    many.push(m);
  }
  const late = client('vatican');
  await late.open;
  late.send(['hi', {}]);
  await late.next('full');
  for (const m of many) m.ws.close();
  a.ws.close(); c.ws.close();

  // đố vui (trường quay): trang cũ bị báo tải lại; hàng chờ, lượt do máy chủ cầm (show.js), chỉ người chơi chọn được, đáp án chỉ
  // lộ khi lật, khán giả cùng trả lời, bình chọn, người thân, hết lượt, người chơi rời phòng thì người kế lên
  const old = client('studio');
  await old.open;
  const oldClosed = new Promise((ok) => { old.ws.onclose = (e) => ok(e.code); });
  old.send(['hi', { n: 'Cũ' }]);
  await old.next('old');
  assert.equal(await oldClosed, 4003);
  const join = async (n, seat) => { const s = client('studio'); await s.open; s.send(['hi', { n, seat, v: PROTO }]); const [, id] = await s.next('hi'); await s.next('Q'); return { ...s, id }; };
  // chờ trạng thái chương trình thoả f (bỏ qua các bước giữa)
  const G = async (p, f, ms = 4000) => { const end = Date.now() + ms; for (;;) { const [, st] = await p.next('G', Math.max(50, end - Date.now())); if (f(st)) return st; } };
  const Q = async (p, f, ms = 4000) => { const end = Date.now() + ms; for (;;) { const m = await p.next('Q', Math.max(50, end - Date.now())); if (f(m)) return m; } };
  const p1 = await join('An', 'B1_R01_S1'), p2 = await join('Bình', 'B1_R01_S2'), p3 = await join('Chi', 'B1_R01_S3');
  p1.send(['q+']);
  assert.deepEqual((await Q(p2, m => m[1])).slice(0, 4), ['Q', p1.id, [], 1]);
  p2.send(['q+']);
  assert.deepEqual((await Q(p3, m => m[2].length)).slice(0, 4), ['Q', p1.id, [p2.id], 1]);
  let st = await G(p3, s => s?.k === 'answer');
  assert.equal(st.hot, p1.id);
  assert.equal(st.n, 1);
  assert.equal(st.q.a, undefined, 'lúc hỏi không gửi đáp án');
  // vào phòng giữa lượt: nhận ngay trạng thái hiện tại
  const lateQ = client('studio');
  await lateQ.open;
  lateQ.send(['hi', { v: PROTO }]);
  await lateQ.next('hi');
  assert.equal((await lateQ.next('G'))[1].hot, p1.id);
  lateQ.ws.close();
  p2.send(['pick', 0]);   // không ở ghế nóng: bỏ
  // bình chọn: người chơi không bầu, mỗi người một phiếu
  p1.send(['help', 'audience']);
  await G(p2, s => s?.k === 'vote');
  p2.send(['v', 2]); p3.send(['v', 2]); p3.send(['v', 0]); p1.send(['v', 1]);
  st = await G(p1, s => s?.k === 'voteResult');
  assert.deepEqual(st.poll, [0, 0, 100, 0]);
  await G(p1, s => s?.k === 'answer');
  // người thân trong phòng
  p1.send(['help', 'friend']);
  await G(p1, s => s?.k === 'friend');
  p1.send(['friend', { id: p3.id }]);
  assert.deepEqual(await p3.next('fa'), ['fa', 'An']);
  p2.send(['fp', 1]);   // không phải người được hỏi: bỏ
  p3.send(['fp', 3]);
  st = await G(p1, s => s?.k === 'friendSaid');
  assert.equal(st.fr.pick, 3);
  await G(p1, s => s?.k === 'answer');
  // khán giả cùng trả lời (người chơi trả lời cùng thì bỏ), rồi người chơi chốt, lật: máy chủ chấm
  p2.send(['ans', 1]); p2.send(['ans', 3]); p3.send(['ans', 0]); p1.send(['ans', 2]);
  await new Promise(r => setTimeout(r, 60));
  p1.send(['pick', 2]);
  st = await G(p3, s => s?.k === 'reveal');
  assert.ok(Number.isInteger(st.q.a), 'lật thì có đáp án');
  const ar = await p3.next('ar');
  assert.deepEqual(ar.slice(0, 3), ['ar', [1, 1, 0, 0], st.q.a]);
  p3.send(['ans', 1]);   // đã lật: bỏ
  // người chơi dừng (nếu còn chơi) hay đã sai: hết lượt, người kế (p2) lên
  p1.send(['stop']);
  st = await G(p3, s => s?.k === 'end', 8000);
  assert.equal(st.result.name, 'An');
  assert.equal((await G(p3, s => s === null, 8000)), null);
  await Q(p3, m => m[1] === p2.id);
  p3.send(['q+']);
  await G(p3, s => s?.k === 'answer' && s.hot === p2.id, 8000);
  p2.ws.close();   // người ở ghế nóng rời phòng: hết lượt, người kế lên
  st = await G(p3, s => s?.k === 'end');
  await Q(p3, m => m[1] === p3.id);
  p1.ws.close(); p3.ws.close();

  // nối lại cùng mã phiên khi máy chủ chưa biết kết nối cũ đã chết: kết nối cũ bị bỏ (không bóng ma), ghế về người mới
  const g1 = client('studio-ghost');
  await g1.open;
  g1.send(['hi', { seat: 'B1_R02_S5', n: 'Man', r: 'trang-abc-123', v: PROTO }]);
  const [, gid1] = await g1.next('hi');
  const w = client('studio-ghost');
  await w.open;
  w.send(['hi', { n: 'Xem', v: PROTO }]);
  await w.next('hi');
  w.send(['q+']);   // w lên ghế nóng ngay (MIN_PLAYERS 0), g1 xếp hàng
  await w.next('Q');
  g1.send(['q+']);
  await w.next('Q');
  const g2 = client('studio-ghost');
  await g2.open;
  g2.send(['hi', { seat: 'B1_R02_S5', n: 'Man', r: 'trang-abc-123', v: PROTO }]);   // g1 vẫn mở (như kết nối chết chưa báo đóng)
  const [, gid2, gpeers] = await g2.next('hi');
  assert.ok(!gpeers.some(p => p.id === gid1), 'bóng ma của mình không còn trong danh sách');
  assert.ok(!g2.inbox.some(m => m[0] === 'no'), 'ghế mang theo không bị báo có người');
  assert.deepEqual(await w.next('out'), ['out', gid1]);
  const [, wIn] = await w.next('in');
  assert.equal(wIn.id, gid2);
  assert.equal(wIn.seat, 'B1_R02_S5');
  await Q(w, m => m[2].length === 1 && m[2][0] === gid2);   // chỗ trong hàng chờ chuyển sang kết nối mới   // chỗ trong hàng chờ chuyển sang kết nối mới
  g2.ws.close(); w.ws.close(); g1.ws.close();
  console.log('OK: vào / ra, gom trạng thái, giữ ghế (cả ghế mang theo lúc vào), tách phòng, ngắt tin rác, phòng kín, đố vui (trang cũ, hàng chờ, lượt do máy chủ cầm, bình chọn, người thân, chấm khán giả, người chơi rời phòng), nối lại không để bóng ma');
} finally {
  srv.kill();
}
