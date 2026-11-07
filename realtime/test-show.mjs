/**
 * Kiểm thử chương trình đố vui do máy chủ cầm (show.js), không cần mạng: chạy nhanh (speed), giả người chơi / khán giả.
 * `node test-show.mjs` (npm test chạy cả tệp này).
 */
import assert from 'node:assert/strict';
import { Show } from './show.js';
import { HOT, LIMIT, STEP } from '../src/thanDong/quiz/rules.js';

const SPEED = 400;   // 35 giây của một bước còn chưa tới 0,1 giây
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

function make(extra = {}) {
  const log = [], events = [];
  let done = null;
  const sh = new Show({
    hot: 1, name: 'Nam', first: true, speed: SPEED, rand, seen: new Set(),
    emit: () => log.push(sh ? sh.pub() : null),
    open: (n) => events.push(['open', n]), close: () => events.push(['close']), score: (a) => events.push(['score', a]),
    ask: (id, name) => events.push(['ask', id, name]), unask: (id) => events.push(['unask', id]),
    person: (id) => (id === 2 ? { name: 'Lan', seat: 'C4' } : null),
    done: (r) => { done = r; },
    ...extra,
  });
  sh.start();
  const until = async (f, ms = 3000) => {
    const end = Date.now() + ms;
    while (!f()) { if (Date.now() > end) throw new Error(`chờ quá lâu ở bước ${sh.k}`); await sleep(2); }
  };
  return { sh, log, events, until, result: () => done };
}

// 1. Máy người chơi chết hẳn (không báo gì, không chọn gì): chương trình vẫn tự đi tới hết giờ rồi hết lượt, không treo
{
  const { sh, log, until, result } = make();
  await until(() => result(), 5000);
  const steps = [...new Set(log.filter(Boolean).map(s => s.k))];
  assert.deepEqual(steps, ['invite', 'greet', 'ask', 'answer', 'timeup', 'end']);
  assert.equal(result().passed, 0);
  assert.equal(result().keep, 0);
  assert.equal(sh.dead, true);
  console.log('ok 1: người chơi im lặng, chương trình tự hết lượt');
}

// 2. Trả lời đúng cả 15 câu: thắng, 100 hạt; đáp án không lộ trước khi lật
{
  const { sh, log, until, result } = make();
  for (let n = 1; n <= 15; n++) {
    await until(() => sh.k === 'answer' && sh.n === n);
    const st = sh.pub();
    assert.equal(st.q.a, undefined, 'lúc hỏi không mang đáp án');
    assert.equal(st.q.ex, undefined);
    assert.equal(st.clock.total, LIMIT(n));
    sh.choose(sh.q.a);
    assert.equal(sh.k, 'lock');
    await until(() => sh.k === 'reveal');
    assert.equal(sh.pub().q.a, sh.q.a, 'lật thì có đáp án');
    sh.ack(sh.seq);
  }
  await until(() => result());
  assert.deepEqual(result(), { ...result(), passed: 15, keep: HOT[15], win: true, stop: false });
  assert.ok(log.some(s => s?.k === 'end' && s.result?.win));
  console.log('ok 2: thắng 15 câu, đáp án chỉ lộ khi lật');
}

// 3. Sai ở câu 7 (đã qua mốc 5): mang về hạt mốc 5; bấm chọn khi chưa tới lượt chọn thì bỏ qua
{
  const { sh, until, result } = make();
  await until(() => sh.k === 'ask');
  sh.choose(0);
  assert.equal(sh.k, 'ask', 'đang đọc câu hỏi: chưa chọn được');
  for (let n = 1; n <= 7; n++) {
    await until(() => sh.k === 'answer' && sh.n === n);
    sh.choose(n === 7 ? (sh.q.a + 1) % 4 : sh.q.a);
    await until(() => sh.k === 'reveal');
    sh.ack(sh.seq);
  }
  await until(() => result());
  assert.equal(result().passed, 6);
  assert.equal(result().keep, HOT[5]);
  console.log('ok 3: sai câu 7 giữ mốc 5');
}

// 4. Dừng chơi giữa câu 4 (đã qua 3 câu): giữ hạt câu 3, cho xem đáp án
{
  const { sh, until, result } = make();
  for (let n = 1; n <= 3; n++) {
    await until(() => sh.k === 'answer' && sh.n === n);
    sh.choose(sh.q.a);
    await until(() => sh.k === 'reveal');
    sh.ack(sh.seq);
  }
  await until(() => sh.k === 'answer' && sh.n === 4);
  sh.stop();
  assert.equal(sh.k, 'quit');
  assert.equal(sh.pub().q.a, sh.q.a);
  await until(() => result());
  assert.equal(result().stop, true);
  assert.equal(result().keep, HOT[3]);
  console.log('ok 4: dừng chơi giữ câu vừa vượt');
}

// 5. Trợ giúp: 50:50 chỉ bỏ phương án sai; khán giả bầu (người chơi không bầu được, mỗi người một phiếu); bỏ qua tính là đã vượt;
//    người thân trong phòng trả lời; người thân rời phòng giữa chừng; đồng hồ dừng khi dùng trợ giúp
{
  const { sh, until, events } = make();
  await until(() => sh.k === 'answer' && sh.n === 1);
  const a = sh.q.a;
  sh.help('fifty');
  const left = sh.clock.left;
  await until(() => sh.k === 'answer' && sh.hide.length === 2);
  assert.ok(!sh.hide.includes(a), '50:50 không bỏ đáp án đúng');
  assert.ok(sh.clock.left <= left && sh.clock.left > left - 200, 'đồng hồ dừng trong lúc trợ giúp');
  sh.help('fifty');
  assert.equal(sh.k, 'answer', 'mỗi quyền một lần');
  sh.help('audience');
  await until(() => sh.k === 'vote');
  sh.vote(1, a);            // người chơi: không tính
  sh.vote(5, a); sh.vote(5, a); sh.vote(6, a); sh.vote(7, sh.hide[0]);   // phiếu lặp, phiếu vào ô đã loại: không tính
  await until(() => sh.k === 'voteResult');
  assert.equal(sh.poll[a], 100);
  await until(() => sh.k === 'answer');
  sh.help('skip');
  assert.equal(sh.k, 'skip');
  assert.equal(sh.passed, 1);
  await until(() => sh.k === 'answer' && sh.n === 2);
  sh.help('friend');
  sh.friend({ id: 1 });     // không tự hỏi mình
  sh.friend({ id: 9 });     // người không có trong phòng
  assert.equal(sh.k, 'friend');
  sh.friend({ id: 2 });
  assert.equal(sh.k, 'friendAsk');
  assert.ok(events.some(e => e[0] === 'ask' && e[1] === 2 && e[2] === 'Nam'));
  sh.friendPick(3, 1);      // người khác trả lời thay: không tính
  sh.friendPick(2, sh.q.a);
  assert.equal(sh.k, 'friendSaid');
  assert.equal(sh.fr.pick, sh.q.a);
  await until(() => sh.k === 'answer');
  assert.deepEqual(sh.used, ['fifty', 'audience', 'skip', 'friend']);
  sh.help('friend');
  assert.equal(sh.k, 'answer');
  sh.dispose();
  console.log('ok 5: bốn quyền trợ giúp');
}

// 6. Người thân rời phòng / không trả lời; người chơi rời phòng giữa câu: hết lượt ngay, vẫn có thẻ kết quả
{
  const { sh, until, result, events } = make();
  await until(() => sh.k === 'answer');
  sh.help('friend');
  sh.friend({ id: 2 });
  sh.gone(2);
  assert.equal(sh.k, 'friendSaid');
  assert.equal(sh.fr.pick, -1);
  await until(() => sh.k === 'answer');
  sh.abort();
  assert.equal(sh.k, 'end');
  assert.ok(events.some(e => e[0] === 'close'));
  await until(() => result());
  console.log('ok 6: người thân rời phòng, người chơi rời phòng');
}

// 7. Báo "MC nói xong" sớm không sang bước trước thời gian tối thiểu; báo của bước cũ không có tác dụng; bỏ qua luật chơi
{
  const { sh, until } = make({ speed: 20 });
  await until(() => sh.k === 'greet');
  const s0 = sh.seq;
  sh.skipRules();
  assert.equal(sh.k, 'ask');
  sh.ack(s0);
  assert.equal(sh.k, 'ask', 'báo của bước cũ');
  const t0 = Date.now();
  sh.ack(sh.seq);
  await until(() => sh.k === 'answer');
  assert.ok(Date.now() - t0 >= STEP.ask[0] * 1000 / 20 - 5, 'không sang trước min');
  sh.dispose();
  console.log('ok 7: báo sớm, báo cũ, bỏ qua luật');
}

console.log('show.js: tất cả đều qua');
