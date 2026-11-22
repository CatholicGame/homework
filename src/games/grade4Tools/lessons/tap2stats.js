/**
 * Toán 4 Tập Hai, chủ đề 9 Làm quen với yếu tố thống kê, xác suất.
 *   Bài 49 Dãy số liệu thống kê (tr. 36–38): 📋 thẻ số liệu (stats.js): ghi chép, số thứ mấy, lớn nhất / bé nhất, sắp xếp, trung bình.
 *   Bài 50 Biểu đồ cột (tr. 39–42): 📊 biểu đồ (chart.js): đọc cột theo trục, kéo cột cho đúng bảng, so sánh, tổng, trung bình.
 *   Bài 51 Số lần xuất hiện của một sự kiện (tr. 43–46): 🎲 thí nghiệm + bảng kiểm đếm (chance.js), đua thỏ Chẵn / Lẻ, đua rùa 2–12.
 * Bài 52 Luyện tập chung (catalog: mix 49, 50, 51) dùng lại các dạng câu ở đây.
 */

import { createStats, ordName, ORD } from '../stats.js';
import { createChart } from '../chart.js';
import { createChance, createRace, rabbitLanes, turtleLanes, EVART, tallySvg, dieFace, deviceSvg } from '../chance.js';
import { BOX } from '../practice.js';
import { css, sfx } from '../frame.js';
import { shake } from '../../grade3Drills/kit.js';
import { makeRng } from '../../grade3Games/loop.js';
import { fmt, fmtSp } from '../num.js';

const sum = (a) => a.reduce((x, y) => x + y, 0);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const DAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
const KIDS = ['Nam', 'Việt', 'Rô-bốt', 'Dũng', 'Mai', 'Lan', 'Minh', 'Hà', 'An', 'Khoa'];

/** Giữ chỗ vùng nút chọn từ đầu lượt (nút hiện sau, bố cục không nhảy). */
function reserveChoices(f, n) {
  f.choicesBox.innerHTML = Array.from({ length: n }, () => '<button type="button" class="g4-choice" disabled style="visibility:hidden">&nbsp;</button>').join('');
  f.choicesBox.classList.add('g4-choices-on');
}
/** Một nút to "Kiểm tra" trong vùng nút chọn; trả về hàm chờ bấm. */
function checkButton(f, label = '✔ Kiểm tra') {
  f.choicesBox.innerHTML = `<button type="button" class="g4-choice g4-choice-go">${label}</button>`;
  f.choicesBox.classList.add('g4-choices-on');
  const b = f.choicesBox.firstElementChild;
  return {
    el: b,
    next: () => new Promise((res) => { b.onclick = () => { sfx.tap(); res(); }; if (import.meta.env.DEV) window.__g4check = b; }),
    done() { b.disabled = true; b.textContent = '✔'; },
  };
}
/** Một lỗi của bước (đếm một lần cho mỗi bước). */
const miss = (f, st) => { if (!st.missed) { st.missed = true; f.mistakes++; } };

// ════ Bài 49: Dãy số liệu thống kê ═══════════════════════════════════════════════════════════════════

const B49 = {
  explore: {
    setup: (board) => createStats(board, DAYS.slice(0, 5).map((d, i) => ({ label: d, value: [1, 2, 2, 2, 3][i] })), { unit: 'km', hidden: true, explore: true }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('🚲 Quãng đường Rô-bốt đạp xe mỗi buổi sáng');
        await c.say('Mỗi buổi sáng trong tuần, Rô-bốt đều đạp xe quanh một công viên gần nhà, và ghi lại quãng đường đi được, đơn vị ki-lô-mét.', 'Rô-bốt ghi quãng đường mỗi buổi (km).');
        await c.say('Chạm lần lượt từng thẻ, từ thứ Hai đến thứ Sáu, để ghi số ki-lô-mét.', 'Chạm từng thẻ, từ <b>Thứ Hai</b> đến <b>Thứ Sáu</b>.');
        let next = 0;
        const off = t.on((ev, i) => {
          if (ev !== 'tap') return;
          if (i === next) { t.reveal(i); t.mark(i, 'ok'); next++; } else c.hint(`Ghi theo thứ tự: chạm thẻ ${DAYS[next]} trước.`);
        });
        await c.until(t, () => next >= 5, { nudge: () => `Chạm thẻ ${DAYS[Math.min(next, 4)]}.`, el: () => t.cards[Math.min(next, 4)] });
        off();
        t.revealAll();
        t.clearMarks();
        await c.say('Rô-bốt ghi được dãy số liệu: 1, 2, 2, 2, 3.', 'Dãy số liệu: <b>1, 2, 2, 2, 3</b>');
      },
      async (c) => {
        const t = c.t;
        t.ordinals(true);
        await c.say('Số thứ nhất là 1, số thứ hai là 2, số thứ ba là 2, số thứ tư là 2, số thứ năm là 3.', 'Số thứ nhất là 1, số thứ hai là 2 …');
        await c.say('Chạm vào số thứ năm của dãy.', 'Chạm vào <b>số thứ năm</b>.');
        const off = t.on((ev, i) => { if (ev === 'tap' && i !== 4) c.hint(`Đây là ${ordName(i)}. Đếm từ trái sang: thứ nhất, thứ hai, … thứ năm.`); });
        let hit = false;
        const off2 = t.on((ev, i) => { if (ev === 'tap' && i === 4) { hit = true; t.mark(4, 'sel'); } });
        await c.until(t, () => hit, { nudge: 'Đếm từ trái sang tới thẻ thứ năm.', el: () => t.cards[4] });
        off(); off2();
        await c.say('Số thứ năm là 3: thứ Sáu, Rô-bốt đi được 3 ki-lô-mét.', 'Số thứ năm là <b>3</b>: Thứ Sáu đi <b>3 km</b>.');
        await c.say('Dãy số liệu này có mấy số?');
        await c.choose([{ html: '3 số', value: 3 }, { html: '5 số', value: 5 }, { html: '10 số', value: 10 }], 5, { hint: 'Đếm số thẻ: mỗi thẻ là một số của dãy.' });
        await c.say('Dãy số liệu có 5 số, ứng với 5 buổi tập từ thứ Hai đến thứ Sáu.', 'Dãy số liệu có <b>5 số</b>.');
      },
      async (c) => {
        const t = c.t;
        t.clearMarks();
        t.ordinals(false);
        await c.say('Quãng đường dài nhất Rô-bốt đi được trong một buổi là bao nhiêu? Chạm vào số lớn nhất.', 'Chạm vào số <b>lớn nhất</b>.');
        let got = -1;
        const off = t.on((ev, i) => { if (ev !== 'tap') return; if (t.values()[i] === 3) { got = i; t.mark(i, 'max'); } else c.hint(`${t.values()[i]} ki-lô-mét chưa phải dài nhất. Tìm số lớn nhất trong dãy.`); });
        await c.until(t, () => got >= 0, { el: () => t.cards[4] });
        off();
        await c.say('Chạm vào số bé nhất: quãng đường ngắn nhất.', 'Chạm vào số <b>bé nhất</b>.');
        got = -1;
        const off2 = t.on((ev, i) => { if (ev !== 'tap') return; if (t.values()[i] === 1) { got = i; t.mark(i, 'min'); } else if (i !== 4) c.hint('Tìm số bé nhất trong dãy.'); });
        await c.until(t, () => got >= 0, { el: () => t.cards[0] });
        off2();
        await c.say('Quãng đường dài nhất là 3 ki-lô-mét, ngắn nhất là 1 ki-lô-mét.', 'Dài nhất <b>3 km</b> · ngắn nhất <b>1 km</b>');
      },
      async (c) => {
        const t = c.t;
        t.clearMarks();
        t.caption('(1 + 2 + 2 + 2 + 3) : 5 = ?');
        await c.say('Trung bình mỗi ngày Rô-bốt đi được bao nhiêu ki-lô-mét? Cộng cả năm số rồi chia cho 5.', 'Trung bình mỗi ngày: <b>(1 + 2 + 2 + 2 + 3) : 5</b>');
        await c.choose([{ html: '10 km', value: 10 }, { html: '2 km', value: 2 }, { html: '3 km', value: 3 }], 2, { hint: '1 + 2 + 2 + 2 + 3 = 10. Lấy 10 chia cho 5.' });
        t.caption('(1 + 2 + 2 + 2 + 3) : 5 = 10 : 5 = <b>2</b> (km)');
        await c.say('1 cộng 2 cộng 2 cộng 2 cộng 3 bằng 10. 10 chia 5 bằng 2. Trung bình mỗi ngày Rô-bốt đi được 2 ki-lô-mét.', 'Trung bình mỗi ngày: <b>2 km</b>');
        await c.say('Nhìn vào dãy số liệu, ta biết dãy có mấy số, số thứ mấy là số nào, số lớn nhất, bé nhất, và tính được trung bình.');
      },
    ],
  },
  tasks: () => [taskSRead(), taskSOrder(), taskSExtreme(), taskSSort(), taskSMore(), taskSAvg(), taskSTrend()],
};

/** Chủ đề dãy số liệu (theo sách: bàn thắng, sách đọc, dâu tây, phút tập, giờ ngủ, chữ cái trong tên). */
const SERIES = [
  { id: 'goal', unit: 'bàn', noun: 'bàn thắng', verb: 'ghi được', labels: 'kids', lo: 0, hi: 9, n: [4, 6], intro: 'Số bàn thắng của mỗi bạn' },
  { id: 'book', unit: 'cuốn', noun: 'cuốn sách', verb: 'đọc được', labels: 'kids', lo: 1, hi: 15, n: [4, 6], intro: 'Số cuốn sách mỗi bạn đọc trong tháng' },
  { id: 'sleep', unit: 'giờ', noun: 'giờ', verb: 'ngủ', labels: 'kids', lo: 7, hi: 11, n: [5, 7], intro: 'Số giờ ngủ mỗi ngày của các bạn' },
  { id: 'run', unit: 'phút', noun: 'phút', verb: 'tập thể dục', labels: 'family', lo: 10, hi: 60, mul: 5, n: [4, 5], intro: 'Thời gian tập thể dục mỗi ngày' },
  { id: 'fruit', unit: 'quả', noun: 'quả dâu tây', verb: 'hái được', labels: 'days', lo: 2, hi: 20, n: [5, 7], intro: 'Số quả dâu tây Việt hái được mỗi ngày', who: 'Việt' },
  { id: 'letters', unit: 'chữ cái', noun: 'chữ cái', verb: 'có', labels: 'kids', lo: 2, hi: 6, n: [6, 8], intro: 'Số chữ cái trong tên các bạn tổ 1' },
];
const FAMILY = ['Ông', 'Bà', 'Bố', 'Mẹ', 'Mai', 'Em Mi'];
function makeSeries(rng, { ids = null, n = null } = {}) {
  const s = rng.pick(ids ? SERIES.filter(x => ids.includes(x.id)) : SERIES);
  const N = n || rng.int(s.n[0], s.n[1]);
  const mul = s.mul || 1;
  const values = Array.from({ length: N }, () => rng.int(Math.ceil(s.lo / mul), Math.floor(s.hi / mul)) * mul);
  const labels = s.labels === 'kids' ? rng.shuffle(KIDS).slice(0, N) : s.labels === 'family' ? FAMILY.slice(0, N) : ['Chủ nhật', ...DAYS.slice(0, 6)].slice(0, N);
  if (s.id === 'letters') labels.forEach((_, i) => { labels[i] = `Bạn ${i + 1}`; });
  return { s: s.id, labels, values };
}
const serOf = (m) => SERIES.find(x => x.id === m.s);
/** "Dũng ghi được", "Thứ Ba, Việt hái được", "Bố tập thể dục". */
const subj = (S, label) => (S.labels === 'days' ? `${label}, ${S.who} ${S.verb}` : `${label} ${S.verb}`);
const itemsOf = (m) => m.labels.map((label, i) => ({ label, value: m.values[i] }));

/** HĐ1: đọc số liệu của một bạn (dãy ghi theo thứ tự tên). */
function taskSRead() {
  return {
    id: 'sread',
    make: (rng) => { const m = makeSeries(rng, { ids: ['goal', 'book', 'run', 'fruit'] }); return { ...m, k: rng.int(0, m.values.length - 1) }; },
    async mount(f, m) {
      const S = serOf(m);
      const t = createStats(f.tool, itemsOf(m), { unit: S.unit, hidden: true });
      t.caption(`${S.intro}: ${m.labels.join(', ')} lần lượt là:`);
      t.seq(true);
      // dãy số liệu viết đủ (thẻ úp): em đếm vị trí để biết số của từng người
      t.root.querySelector('.g4st-seq').innerHTML = `<span class="g4st-sl">Dãy số liệu:</span> ${m.values.map(v => `<span class="g4st-sv">${fmt(v)}</span>`).join('<span class="g4st-cm">,</span> ')}`;
      t.lock(true);
      t.mark(m.k, 'sel');
      const L = m.labels[m.k];
      f.q.innerHTML = `${subj(S, L)} ${BOX} ${S.unit}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: m.values[m.k], max: 3, say: `${subj(S, L)} bao nhiêu ${S.noun}?`,
        hint: `${L} đứng thứ ${ORD[m.k]} trong danh sách, nên ứng với ${ordName(m.k)} của dãy số liệu.` });
      t.reveal(m.k);
      for (let i = 0; i < m.values.length; i++) if (i !== m.k) t.reveal(i);
      f.finish({ ok: `${L}: ${m.values[m.k]} ${S.unit} (${ordName(m.k)} của dãy).` });
    },
  };
}

/** HĐ3a: dãy có bao nhiêu số, số thứ k là số mấy. */
function taskSOrder() {
  return {
    id: 'sorder',
    make: (rng) => { const m = makeSeries(rng, { ids: ['letters', 'sleep', 'fruit'] }); return { ...m, k: rng.int(1, m.values.length - 1) }; },
    async mount(f, m) {
      const S = serOf(m);
      const t = createStats(f.tool, itemsOf(m).map(it => ({ ...it, label: '' })), { unit: S.unit });
      t.cards.forEach(c => { c.querySelector('.g4st-lab').style.visibility = 'hidden'; });
      t.caption(S.intro);
      t.lock(true);
      f.q.innerHTML = `Dãy có ${BOX} số. Số thứ ${ORD[m.k]} là ${BOX}`;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: m.values.length, max: 2, say: 'Dãy số liệu có tất cả bao nhiêu số?', hint: 'Đếm số thẻ trong dãy.' });
      t.ordinals(true);
      await f.ask({ box: b2, answer: m.values[m.k], max: 3, say: `Số thứ ${ORD[m.k]} trong dãy là số mấy?`, hint: `Đếm từ trái sang: thứ nhất, thứ hai, … tới thứ ${ORD[m.k]}.` });
      t.mark(m.k, 'ok');
      f.finish({ ok: `Dãy có ${m.values.length} số, ${ordName(m.k)} là ${m.values[m.k]}.` });
    },
  };
}

/** HĐ1b, LT1b: chạm số liệu lớn nhất / bé nhất. */
function taskSExtreme() {
  return {
    id: 'sext',
    make: (rng) => {
      for (;;) {
        const m = makeSeries(rng, { ids: ['goal', 'book', 'fruit', 'run', 'sleep'] });
        const big = rng() < 0.5, ext = big ? Math.max(...m.values) : Math.min(...m.values);
        if (m.values.filter(v => v === ext).length === 1) return { ...m, big };
      }
    },
    async mount(f, m) {
      const S = serOf(m);
      const t = createStats(f.tool, itemsOf(m), { unit: S.unit, seq: true });
      t.caption(S.intro);
      const ext = m.big ? Math.max(...m.values) : Math.min(...m.values);
      const k = m.values.indexOf(ext);
      const who = S.labels === 'days' ? 'Ngày nào' : S.labels === 'family' ? 'Ai' : 'Bạn nào';
      const more = m.big ? 'nhiều' : 'ít';
      const q = S.id === 'sleep' ? `${who} ngủ ${m.big ? 'nhiều' : 'ít'} giờ nhất?` : S.id === 'run' ? `${who} tập thể dục ${m.big ? 'lâu' : 'ít phút'} nhất?`
        : S.labels === 'days' ? `${who}, ${S.who} ${S.verb} ${more} ${S.noun} nhất?` : `${who} ${S.verb} ${more} ${S.noun} nhất?`;
      f.q.innerHTML = `${q} <small>Chạm vào thẻ</small>`;
      f.say(q);
      const st = {};
      await new Promise((res) => {
        t.on((ev, i) => {
          if (ev !== 'tap') return;
          if (i === k) { t.mark(i, m.big ? 'max' : 'min'); t.lock(true); sfx.ding(); res(); return; }
          miss(f, st);
          shake(t.cards[i]);
          f.hint(`${m.labels[i]}: ${m.values[i]} ${S.unit}. Còn số ${m.big ? 'lớn' : 'bé'} hơn nữa. Tìm số ${m.big ? 'lớn' : 'bé'} nhất trong dãy.`);
        });
        if (import.meta.env.DEV) window.__g4ans = { kind: 'tap', index: k, tap: () => t.tap(k) };
      });
      f.finish({ ok: `${m.labels[k]}: ${ext} ${S.unit}, ${m.big ? 'nhiều' : 'ít'} nhất.` });
    },
  };
}

/** HĐ2: sắp xếp dãy số liệu từ bé đến lớn / từ lớn đến bé (kéo thẻ hoặc chạm hai thẻ để đổi chỗ). */
function taskSSort() {
  return {
    id: 'ssort',
    make: (rng) => {
      const N = rng.int(4, 6);
      const pool = rng.shuffle([...Array(15)].map((_, i) => i + 1)).slice(0, N);
      const labels = rng.shuffle(KIDS).slice(0, N);
      return { values: pool, labels, asc: rng() < 0.5 };
    },
    async mount(f, m) {
      const t = createStats(f.tool, m.labels.map((label, i) => ({ label, value: m.values[i] })), { unit: 'cuốn', sortable: true, signs: true, seqLabel: 'Dãy' });
      const dir = m.asc ? 'asc' : 'desc';
      t.signs(true, dir);
      t.caption('📚 Số cuốn sách mỗi bạn đọc trong tháng');
      const order = m.asc ? 'từ bé đến lớn' : 'từ lớn đến bé';
      f.q.innerHTML = `Xếp các thẻ <b>${order}</b><small>Kéo thẻ, hoặc chạm hai thẻ để đổi chỗ</small>`;
      f.say(`Sắp xếp số cuốn sách theo thứ tự ${order}. Kéo một thẻ thả lên thẻ khác để đổi chỗ.`);
      const chk = checkButton(f);
      const st = {};
      if (import.meta.env.DEV) window.__g4ans = { kind: 'sort', solve: () => { const want = [...m.values].sort((a, b) => (m.asc ? a - b : b - a)); for (let i = 0; i < want.length; i++) { const j = t.values().indexOf(want[i], i); if (j !== i) t.swap(i, j); } } };
      for (;;) {
        await chk.next();
        if (t.sorted(dir)) break;
        miss(f, st);
        const vs = t.values();
        const bad = vs.findIndex((v, i) => i > 0 && (m.asc ? vs[i - 1] > v : vs[i - 1] < v));
        shake([t.cards[bad - 1], t.cards[bad]]);
        f.hint(`${vs[bad - 1]} và ${vs[bad]} chưa đúng thứ tự ${order}. Chỗ có dấu màu đỏ cần đổi.`);
      }
      chk.done();
      t.lock(true);
      t.cards.forEach((_, i) => t.mark(i, 'ok'));
      sfx.ding();
      f.finish({ ok: `${t.values().join(', ')}: ${order}.` });
    },
  };
}

/** HĐ1c, Bài 52 câu 1: có bao nhiêu số liệu lớn hơn k (chạm các thẻ đó rồi đếm). */
function taskSMore() {
  return {
    id: 'smore',
    make: (rng) => {
      for (;;) {
        const m = makeSeries(rng, { ids: ['goal', 'book', 'fruit', 'run'] });
        const sorted = [...new Set(m.values)].sort((a, b) => a - b);
        if (sorted.length < 3) continue;
        const k = sorted[rng.int(0, sorted.length - 2)];
        const cnt = m.values.filter(v => v > k).length;
        if (cnt >= 1 && cnt < m.values.length) return { ...m, k };
      }
    },
    async mount(f, m) {
      const S = serOf(m);
      const t = createStats(f.tool, itemsOf(m), { unit: S.unit });
      t.caption(S.intro);
      const want = m.values.map((v, i) => (v > m.k ? i : -1)).filter(i => i >= 0);
      const who = S.labels === 'days' ? 'ngày' : S.labels === 'family' ? 'người' : 'bạn';
      const phr = S.labels === 'days' ? `${S.who} ${S.verb} nhiều hơn ${m.k} ${S.noun}` : S.id === 'run' ? `tập nhiều hơn ${m.k} phút` : `${S.verb} nhiều hơn ${m.k} ${S.noun}`;
      f.q.innerHTML = `Có ${BOX} ${who} ${phr}`;
      f.say(`Có bao nhiêu ${who} ${phr}? Chạm vào các thẻ có số lớn hơn ${m.k}.`, `👆 Chạm các thẻ có số <b>lớn hơn ${m.k}</b>.`);
      const found = new Set(), st = {};
      await new Promise((res) => {
        t.on((ev, i) => {
          if (ev !== 'tap' || found.has(i)) return;
          if (m.values[i] > m.k) { found.add(i); t.mark(i, 'ok'); sfx.pop(found.size); if (found.size === want.length) { t.lock(true); res(); } return; }
          miss(f, st);
          shake(t.cards[i]);
          f.hint(`${m.values[i]} ${m.values[i] === m.k ? 'bằng' : 'bé hơn'} ${m.k}, không phải nhiều hơn ${m.k}.`);
        });
        if (import.meta.env.DEV) window.__g4ans = { kind: 'tap', index: want, tap: () => want.forEach(i => t.tap(i)) };
      });
      t.cards.forEach((_, i) => { if (!found.has(i)) t.mark(i, 'dim'); });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: want.length, max: 2, say: 'Đếm các thẻ vừa chọn.', hint: 'Đếm các thẻ màu xanh.' });
      f.finish({ ok: `Có ${want.length} ${who} ${phr}.` });
    },
  };
}

/** LT2b, Bài 52 câu 3b: trung bình mỗi người (tổng rồi chia). */
function taskSAvg() {
  return {
    id: 'savg',
    make: (rng) => {
      const pick = rng.int(0, 2);
      if (pick === 0) { // phút tập thể dục, bội của 10
        const n = 5, a = rng.int(2, 4) * 10;
        for (;;) { const v = Array.from({ length: n - 1 }, () => rng.int(1, 6) * 10); const last = a * n - sum(v); if (last >= 10 && last <= 60) return { s: 'run', labels: FAMILY.slice(0, n), values: rng.shuffle([...v, last]) }; }
      }
      if (pick === 1) { // dâu tây
        const n = rng.int(4, 6), a = rng.int(4, 9);
        for (;;) { const v = Array.from({ length: n - 1 }, () => rng.int(2, 14)); const last = a * n - sum(v); if (last >= 1 && last <= 15) return { s: 'fruit', labels: ['Chủ nhật', ...DAYS].slice(0, n), values: [...v, last] }; }
      }
      const n = 4, a = rng.int(3, 8);
      for (;;) { const v = Array.from({ length: n - 1 }, () => rng.int(1, 12)); const last = a * n - sum(v); if (last >= 0 && last <= 12) return { s: 'book', labels: rng.shuffle(KIDS).slice(0, n), values: [...v, last] }; }
    },
    async mount(f, m) {
      const S = serOf(m);
      const t = createStats(f.tool, itemsOf(m), { unit: S.unit });
      t.caption(S.intro);
      t.lock(true);
      const n = m.values.length, tot = sum(m.values);
      const per = S.labels === 'days' ? 'mỗi ngày' : S.labels === 'family' ? 'mỗi người' : 'mỗi bạn';
      f.q.innerHTML = `Tổng: ${BOX} ${S.unit}<br>Trung bình ${per}: ${BOX} ${S.unit}`;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: tot, max: 4, say: `Trung bình ${per} bao nhiêu ${S.noun}? Trước hết, tính tổng các số của dãy.`, hint: `Cộng tất cả ${n} số: ${m.values.join(' + ')}.` });
      t.caption(`${m.values.join(' + ')} = ${tot}`);
      await f.ask({ box: b2, answer: tot / n, max: 3, say: `Dãy có ${n} số. Lấy tổng chia cho ${n}.`, hint: `${tot} : ${n} = ?` });
      t.caption(`(${m.values.join(' + ')}) : ${n} = <b>${tot / n}</b>`);
      f.finish({ ok: `Trung bình ${per}: ${tot} : ${n} = ${tot / n} ${S.unit}.` });
    },
  };
}

/** LT1c: số liệu tăng hay giảm sau mỗi ngày. */
function taskSTrend() {
  return {
    id: 'strend',
    make: (rng) => {
      const n = rng.int(5, 8), kind = rng.pick(['up', 'down', 'mix']);
      let v = rng.shuffle([...Array(20)].map((_, i) => i + 1)).slice(0, n).sort((a, b) => a - b);
      if (kind === 'down') v = v.reverse();
      if (kind === 'mix') { const i = rng.int(1, n - 2); [v[i], v[i + 1]] = [v[i + 1], v[i]]; }
      return { s: 'fruit', labels: ['Chủ nhật', ...DAYS].slice(0, n), values: v, kind };
    },
    async mount(f, m) {
      const t = createStats(f.tool, itemsOf(m), { unit: 'quả' });
      t.caption('🍓 Số quả dâu tây Việt hái mỗi ngày');
      t.lock(true);
      f.q.textContent = 'Số dâu hái được thay đổi thế nào sau mỗi ngày?';
      await f.choose({ options: [{ html: '📈 Tăng dần', value: 'up' }, { html: '📉 Giảm dần', value: 'down' }, { html: '〰️ Lúc tăng lúc giảm', value: 'mix' }], answer: m.kind,
        say: 'Số quả dâu tây Việt hái được thay đổi thế nào sau mỗi ngày?', hint: 'So sánh từng số với số liền trước nó: lớn hơn là tăng, bé hơn là giảm.' });
      t.signs(true, m.kind === 'down' ? 'desc' : 'asc');
      f.finish({ ok: m.kind === 'up' ? 'Mỗi ngày hái được nhiều hơn ngày trước: tăng dần.' : m.kind === 'down' ? 'Mỗi ngày hái được ít hơn ngày trước: giảm dần.' : 'Có ngày tăng, có ngày giảm.' });
    },
  };
}

// ════ Bài 50: Biểu đồ cột ════════════════════════════════════════════════════════════════════════════

/**
 * Chủ đề biểu đồ (theo sách). step: một vạch chia; read: số liệu đọc được trên vạch; snap: độ mịn số liệu khi có ghi số.
 * subj(c): "Lớp 4A", "Tháng 2"; verb, noun: "đóng góp" … "cuốn sách"; who: "lớp"; whoQ: "Lớp nào".
 */
const CHARTS = [
  { id: 'book', title: 'SỐ CUỐN SÁCH KHỐI LỚP 4 ĐÃ ĐÓNG GÓP', yUnit: 'Cuốn', xUnit: 'Lớp', cats: ['4A', '4B', '4C', '4D', '4E'], step: 10, max: 90, lo: 30, hi: 80, snap: 2,
    color: '#4ADE80', ink: '#16A34A', subj: c => `Lớp ${c}`, verb: 'đóng góp', noun: 'cuốn sách', who: 'lớp', whoQ: 'Lớp nào' },
  { id: 'rain', title: 'SỐ NGÀY CÓ MƯA TRONG BA THÁNG ĐẦU NĂM', yUnit: 'Ngày', xUnit: 'Tháng', cats: ['Tháng 1', 'Tháng 2', 'Tháng 3'], step: 5, max: 30, lo: 5, hi: 25, snap: 1,
    color: '#F97316', ink: '#EA580C', subj: c => c, verb: 'có', noun: 'ngày mưa', who: 'tháng', whoQ: 'Tháng nào' },
  { id: 'lib', title: 'SỐ HỌC SINH ĐẾN THƯ VIỆN MƯỢN SÁCH', yUnit: 'Học sinh', xUnit: 'Ngày', cats: DAYS.slice(0, 5), step: 20, max: 140, lo: 20, hi: 120, snap: 5,
    color: '#38BDF8', ink: '#0284C7', subj: c => c, verb: 'có', noun: 'học sinh đến mượn sách', who: 'ngày', whoQ: 'Ngày nào' },
  { id: 'run', title: 'ĐỘ DÀI QUÃNG ĐƯỜNG CHẠY CỦA RÔ-BỐT', yUnit: 'm', xUnit: 'Ngày', cats: ['1', '2', '3', '4', '5'], step: 200, max: 1800, lo: 400, hi: 1700, snap: 100,
    color: '#FB923C', ink: '#EA580C', subj: c => `Ngày ${c}, Rô-bốt`, verb: 'chạy được', noun: 'mét', who: 'ngày', whoQ: 'Ngày nào Rô-bốt', short: c => `ngày ${c}` },
  { id: 'film', title: 'SỐ VÉ XEM PHIM BÁN ĐƯỢC TRONG TUẦN', yUnit: 'Vé', xUnit: 'Ngày', cats: DAYS, step: 200, max: 2200, lo: 200, hi: 2100, snap: 5,
    color: '#22C55E', ink: '#15803D', subj: c => `${c}, rạp`, verb: 'bán được', noun: 'vé', who: 'ngày', whoQ: 'Ngày nào rạp', short: c => c },
  { id: 'quiz', title: 'SỐ CÂU ĐỐ MỖI BẠN GIẢI ĐƯỢC', yUnit: 'Câu đố', xUnit: 'Bạn', cats: ['Lan', 'Rô-bốt', 'Việt', 'Nam', 'Mai', 'Lâm'], step: 1, max: 10, lo: 2, hi: 9, snap: 1,
    color: '#F59E0B', ink: '#EA580C', subj: c => c, verb: 'giải được', noun: 'câu đố', who: 'bạn', whoQ: 'Bạn nào' },
  { id: 'tree', title: 'SỐ CÂY CÁC LỚP ĐÃ TRỒNG', yUnit: 'Cây', xUnit: 'Lớp', cats: ['4A', '4B', '4C', '4D'], step: 5, max: 40, lo: 10, hi: 35, snap: 1,
    color: '#86EFAC', ink: '#15803D', subj: c => `Lớp ${c}`, verb: 'trồng được', noun: 'cây', who: 'lớp', whoQ: 'Lớp nào' },
];
const chartOf = (m) => CHARTS.find(x => x.id === m.c);
/** Số liệu ngẫu nhiên: onGrid = đúng vạch chia (đọc theo trục). */
function chartData(rng, { ids = null, onGrid = false, distinct = false } = {}) {
  const C = rng.pick(ids ? CHARTS.filter(x => ids.includes(x.id)) : CHARTS);
  const g = onGrid ? C.step : C.snap;
  for (;;) {
    const values = C.cats.map(() => rng.int(Math.ceil(C.lo / g), Math.floor(C.hi / g)) * g);
    if (distinct && new Set(values).size < values.length) continue;
    return { c: C.id, values };
  }
}
const chartFor = (host, C, values, extra = {}) => createChart(host, { cats: C.cats, values, max: C.max, step: C.step, yUnit: C.yUnit, xUnit: C.xUnit, title: C.title, color: C.color, ink: C.ink, ...extra });
const shortOf = (C, c) => (C.short ? C.short(c) : C.subj(c).replace(/^Lớp/, 'lớp'));

const B50 = {
  explore: {
    setup: (board) => createChart(board, {
      cats: ['Bóng đá', 'Bóng rổ', 'Bơi'], values: [0, 0, 0], max: 6, step: 1, yUnit: 'Bạn', xUnit: 'Môn thể thao', title: 'SỐ BẠN YÊU THÍCH MỖI MÔN THỂ THAO',
      color: '#F59E0B', ink: '#EA580C', show: '', explore: true, table: { head: ['Môn thể thao', 'Số bạn'], tally: true, values: [4, 6, 2] },
    }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Mai khảo sát môn thể thao yêu thích nhất của mỗi bạn trong nhóm, và ghi kết quả vào bảng số liệu.', 'Bảng số liệu của Mai');
        t.rowHl(0);
        await c.say('Bóng đá có 4 bạn, bóng rổ có 6 bạn, bơi có 2 bạn. Rô-bốt vẽ biểu đồ cột để biểu diễn số liệu này.', 'Bóng đá <b>4</b> · Bóng rổ <b>6</b> · Bơi <b>2</b>');
        t.rowHl(-1);
        t.focus('x');
        await c.say('Hàng dưới của biểu đồ ghi tên các môn thể thao.', 'Hàng dưới: <b>tên các môn thể thao</b>');
        t.focus('y');
        await c.say('Các số ghi ở bên trái biểu đồ chỉ số bạn: 0, 1, 2, 3, 4, 5, 6.', 'Các số bên trái: <b>số bạn</b>');
        t.focus('');
      },
      async (c) => {
        const t = c.t;
        t.rowHl(0);
        t.edit([0]);
        t.show(0, 'v');
        await c.say('Mỗi cột biểu diễn số bạn yêu thích môn thể thao đó. Bóng đá có 4 bạn: kéo đỉnh cột bóng đá lên tới vạch số 4.', 'Kéo cột <b>Bóng đá</b> lên vạch <b>4</b>.');
        await waitCols(c, t, { 0: 4 }, 'Kéo nút tròn trên cột bóng đá. Dừng ở vạch ngang có số 4 bên trái.');
        t.edit([]); t.mark(0, 'ok');
        await c.say('Số ghi ở đỉnh cột chỉ số bạn của cột đó: 4 bạn.', 'Số ở đỉnh cột: <b>4</b> bạn');
      },
      async (c) => {
        const t = c.t;
        t.rowHl(-1);
        t.edit([1, 2]);
        t.show(1, 'v'); t.show(2, 'v');
        await c.say('Em vẽ tiếp: cột bóng rổ 6 bạn, cột bơi 2 bạn.', 'Kéo cột <b>Bóng rổ</b> tới <b>6</b>, cột <b>Bơi</b> tới <b>2</b>.');
        await waitCols(c, t, { 1: 6, 2: 2 }, 'Nhìn bảng số liệu: bóng rổ 6 bạn, bơi 2 bạn.');
        t.edit([]); t.mark(1, 'ok'); t.mark(2, 'ok');
        await c.say('Biểu đồ cột đã xong!', 'Biểu đồ cột đã xong!');
        t.clearMarks();
      },
      async (c) => {
        const t = c.t;
        await c.say('Môn nào được nhiều bạn yêu thích nhất? Chạm vào cột đó.', 'Chạm cột <b>nhiều bạn thích nhất</b>.');
        let hit = false;
        const off = t.on((ev, i) => { if (ev !== 'tap') return; if (i === 1) { hit = true; t.mark(1, 'sel'); } else c.hint('Tìm cột cao nhất.'); });
        await c.until(t, () => hit);
        off();
        await c.say('Bóng rổ có cột cao nhất: 6 bạn. Cột cao hơn biểu diễn số bạn nhiều hơn, cột thấp hơn biểu diễn số bạn ít hơn.', 'Cột <b>cao hơn</b>: nhiều hơn · cột <b>thấp hơn</b>: ít hơn');
        await c.say('Số bạn thích bóng rổ nhiều hơn số bạn thích bơi bao nhiêu bạn?');
        await c.choose([{ html: '8 bạn', value: 8 }, { html: '4 bạn', value: 4 }, { html: '2 bạn', value: 2 }], 4, { hint: 'Lấy số bạn bóng rổ trừ số bạn bơi: 6 − 2.' });
        t.mark(1, ''); t.hline(6, { to: 1, color: '#0EA5E9' }); t.hline(2, { to: 2, color: '#0EA5E9' });
        await c.say('6 trừ 2 bằng 4. Bóng rổ nhiều hơn bơi 4 bạn.', '6 − 2 = <b>4</b> (bạn)');
      },
    ],
  },
  tasks: () => [taskKFill(), taskKMost(), taskKMore(), taskKDiff(), taskKAvg(), taskKDraw(), taskKTrend()],
};

/** Chờ các cột đạt số liệu (sau khi thả tay). want: { i: v }. */
async function waitCols(c, t, want, nudge) {
  let ok = false;
  const off = t.on((ev, i, v) => {
    if (ev !== 'drop') return;
    if (want[i] !== undefined && v !== want[i]) c.hint(`Cột này đang ở ${v}. Cần ${want[i]}.`);
    ok = Object.entries(want).every(([k, x]) => t.values[k] === x);
  });
  await c.until(t, () => ok, { nudge, el: () => t.svg.querySelector('.g4ch-ed .g4ch-grip') });
  off();
  for (const [k, x] of Object.entries(want)) if (t.values[k] !== x) t.set(+k, x);
}

/** HĐ2a, LT3a "Số?": đọc số ở đỉnh các cột còn ô trống, gióng theo trục. */
function taskKFill() {
  return {
    id: 'kfill',
    make: (rng) => {
      const m = chartData(rng, { ids: ['book', 'rain', 'lib', 'run', 'film', 'tree'], onGrid: true });
      const n = m.values.length;
      const q = rng.shuffle([...Array(n)].map((_, i) => i)).slice(0, Math.min(3, n - 1)).sort((a, b) => a - b);
      return { ...m, q };
    },
    async mount(f, m) {
      const C = chartOf(m);
      const show = m.values.map((_, i) => (m.q.includes(i) ? '?' : 'v'));
      const t = chartFor(f.tool, C, m.values, { show });
      f.q.innerHTML = 'Số? <small>Gióng đỉnh cột sang trục bên trái</small>';
      f.say('Hoàn thành biểu đồ: đọc số của các cột có dấu hỏi.');
      for (const i of m.q) {
        const v = m.values[i];
        t.mark(i, 'sel');
        let hinted = false;
        await f.ask({ box: t.box(i), answer: v, max: 5, say: '', hint: () => { if (!hinted) { hinted = true; t.hline(v, { to: i, label: false, color: '#F59E0B' }); } return `Đỉnh cột ${shortOf(C, C.cats[i])} nằm ngang vạch nào? Gióng theo đường nét đứt sang trục bên trái.`; } });
        t.mark(i, 'ok');
      }
      f.finish({ ok: m.q.map(i => `${C.cats[i]}: ${fmt(m.values[i])}`).join(', ') + '.' });
    },
  };
}

/** HĐ1b, Bài 52 câu 2a: chạm cột cao nhất / thấp nhất. */
function taskKMost() {
  return {
    id: 'kmost',
    make: (rng) => ({ ...chartData(rng, { distinct: true }), big: rng() < 0.5 }),
    async mount(f, m) {
      const C = chartOf(m);
      const t = chartFor(f.tool, C, m.values, { show: 'v' });
      const ext = m.big ? Math.max(...m.values) : Math.min(...m.values), k = m.values.indexOf(ext);
      const q = `${C.whoQ} ${C.verb} ${m.big ? 'nhiều' : 'ít'} ${C.noun} nhất?`;
      f.q.innerHTML = `${q} <small>Chạm vào cột</small>`;
      f.say(q);
      const st = {};
      await new Promise((res) => {
        t.on((ev, i) => {
          if (ev !== 'tap') return;
          if (i === k) { t.mark(i, 'ok'); sfx.ding(); res(); return; }
          miss(f, st);
          f.hint(`Cột ${C.cats[i]} chưa ${m.big ? 'cao' : 'thấp'} nhất. Cột ${m.big ? 'cao' : 'thấp'} nhất biểu diễn số ${m.big ? 'lớn' : 'bé'} nhất.`);
        });
        if (import.meta.env.DEV) window.__g4ans = { kind: 'tap', index: k, tap: () => t.emit('tap', k) };
      });
      f.finish({ ok: `${cap(shortOf(C, C.cats[k]))}: ${fmt(ext)}, ${m.big ? 'nhiều' : 'ít'} nhất.` });
    },
  };
}

/** HĐ1c, LT3b: có bao nhiêu cột nhiều hơn k (đường gióng nét đứt ở k). */
function taskKMore() {
  return {
    id: 'kmore',
    make: (rng) => {
      for (;;) {
        const m = chartData(rng, { ids: ['book', 'lib', 'film', 'run', 'quiz'] });
        const C = chartOf(m);
        const k = rng.int(Math.ceil(C.lo / C.step) + 1, Math.floor(C.hi / C.step)) * C.step;
        const cnt = m.values.filter(v => v > k).length;
        if (cnt >= 1 && cnt < m.values.length && !m.values.includes(k)) return { ...m, k };
      }
    },
    async mount(f, m) {
      const C = chartOf(m);
      const t = chartFor(f.tool, C, m.values, { show: 'v' });
      t.hline(m.k, { color: '#DC2626' });
      const cnt = m.values.filter(v => v > m.k).length;
      const phr = `${C.verb} nhiều hơn ${fmt(m.k)} ${C.noun}`;
      f.q.innerHTML = `Có ${BOX} ${C.who} ${phr}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: cnt, max: 2, say: `Có bao nhiêu ${C.who} ${phr}?`, hint: `Đếm các cột có đỉnh cao hơn đường nét đứt màu đỏ ở ${fmt(m.k)}.` });
      m.values.forEach((v, i) => t.mark(i, v > m.k ? 'ok' : 'dim'));
      f.finish({ ok: `Có ${cnt} cột cao hơn vạch ${fmt(m.k)}.` });
    },
  };
}

/** LT1b: cột này nhiều hơn cột kia bao nhiêu. */
function taskKDiff() {
  return {
    id: 'kdiff',
    make: (rng) => {
      const m = chartData(rng, { distinct: true });
      const [a, b] = rng.shuffle([...Array(m.values.length)].map((_, i) => i)).slice(0, 2);
      return m.values[a] > m.values[b] ? { ...m, a, b } : { ...m, a: b, b: a };
    },
    async mount(f, m) {
      const C = chartOf(m);
      const t = chartFor(f.tool, C, m.values, { show: 'v' });
      t.mark(m.a, 'sel'); t.mark(m.b, 'sel');
      const d = m.values[m.a] - m.values[m.b];
      const q = `${C.subj(C.cats[m.a])} ${C.verb} nhiều hơn ${shortOf(C, C.cats[m.b])} bao nhiêu ${C.noun}?`;
      f.q.innerHTML = `${q.replace(' bao nhiêu', '')}: ${BOX}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: d, max: 5, say: q, hint: `Lấy số lớn trừ số bé: ${fmt(m.values[m.a])} − ${fmt(m.values[m.b])}.` });
      t.hline(m.values[m.a], { to: m.a, label: false }); t.hline(m.values[m.b], { to: m.b, label: false });
      f.finish({ ok: `${fmt(m.values[m.a])} − ${fmt(m.values[m.b])} = ${fmt(d)}.` });
    },
  };
}

/** HĐ2c, LT1c, LT2b, Bài 52 câu 2b–c: tổng rồi trung bình. */
function taskKAvg() {
  return {
    id: 'kavg',
    make: (rng) => {
      const C = rng.pick(CHARTS.filter(x => ['rain', 'quiz', 'tree', 'book', 'lib', 'run'].includes(x.id)));
      const n = C.cats.length, g = C.snap;
      for (;;) {
        const a = rng.int(Math.ceil((C.lo + C.step) / g), Math.floor((C.hi - C.step) / g)) * g;
        const v = Array.from({ length: n - 1 }, () => rng.int(Math.ceil(C.lo / g), Math.floor(C.hi / g)) * g);
        const last = a * n - sum(v);
        if (last >= C.lo && last <= C.hi && last % g === 0) return { c: C.id, values: rng.shuffle([...v, last]) };
      }
    },
    async mount(f, m) {
      const C = chartOf(m);
      const t = chartFor(f.tool, C, m.values, { show: 'v' });
      const n = m.values.length, tot = sum(m.values);
      f.q.innerHTML = `Tổng: ${BOX} · Trung bình mỗi ${C.who}: ${BOX}`;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: tot, max: 5, say: `Trung bình mỗi ${C.who} ${C.verb} bao nhiêu ${C.noun}? Trước hết tính tổng ${n} cột.`, hint: `Cộng số ở đỉnh ${n} cột: ${m.values.map(fmtSp).join(' + ')}.` });
      await f.ask({ box: b2, answer: tot / n, max: 5, say: `Lấy tổng chia cho ${n}.`, hint: `${fmtSp(tot)} : ${n} = ?` });
      t.hline(tot / n, { color: '#7C3AED' });
      f.finish({ ok: `(${m.values.map(fmt).join(' + ')}) : ${n} = ${fmt(tot / n)}.` });
    },
  };
}

/** HĐ2a, LT3a: hoàn thành biểu đồ: kéo các cột còn thiếu cho đúng bảng số liệu. */
function taskKDraw() {
  return {
    id: 'kdraw',
    make: (rng) => {
      const m = chartData(rng, { ids: ['rain', 'lib', 'quiz', 'tree', 'book'], onGrid: true });
      const n = m.values.length;
      const e = rng.shuffle([...Array(n)].map((_, i) => i)).slice(0, Math.min(n, rng.int(2, 3))).sort((a, b) => a - b);
      return { ...m, e };
    },
    async mount(f, m) {
      const C = chartOf(m);
      const start = m.values.map((v, i) => (m.e.includes(i) ? 0 : v));
      const t = chartFor(f.tool, C, start, { show: 'v', edit: m.e, snap: C.step, table: { head: [C.xUnit, C.yUnit === 'm' ? 'Mét' : `Số ${C.yUnit.toLowerCase()}`], values: m.values } });
      f.q.innerHTML = 'Kéo các cột cho đúng bảng';
      f.say('Hoàn thành biểu đồ: kéo đỉnh các cột còn thiếu cho đúng số liệu trong bảng.', '👆 Kéo nút tròn trên đỉnh cột cho đúng bảng.');
      const chk = checkButton(f);
      if (import.meta.env.DEV) window.__g4ans = { kind: 'draw', solve: () => m.e.forEach(i => t.drag(i, m.values[i])) };
      const st = {};
      for (;;) {
        await chk.next();
        const bad = m.e.filter(i => t.values[i] !== m.values[i]);
        if (!bad.length) break;
        miss(f, st);
        bad.forEach(i => t.mark(i, 'bad'));
        sfx.boing();
        const i = bad[0];
        f.hint(`Cột ${C.cats[i]} đang ở ${fmt(t.values[i])}, trong bảng là ${fmt(m.values[i])}.`);
        const off = t.on((ev, j) => { if (ev === 'change') t.mark(j, ''); });
        setTimeout(off, 8000);
      }
      chk.done();
      t.edit([]);
      m.e.forEach(i => t.mark(i, 'ok'));
      sfx.ding();
      f.finish({ ok: 'Biểu đồ đã đúng với bảng số liệu.' });
    },
  };
}

/** LT2c: quãng đường mỗi ngày tăng / giảm so với ngày trước. */
function taskKTrend() {
  return {
    id: 'ktrend',
    make: (rng) => {
      const kind = rng.pick(['up', 'down', 'mix']);
      let v = rng.shuffle([...Array(13)].map((_, i) => (i + 4) * 100)).slice(0, 5).sort((a, b) => a - b);
      if (kind === 'down') v = v.reverse();
      if (kind === 'mix') { const i = rng.int(1, 3); [v[i], v[i + 1]] = [v[i + 1], v[i]]; }
      return { c: 'run', values: v, kind };
    },
    async mount(f, m) {
      const C = chartOf(m);
      chartFor(f.tool, C, m.values, { show: 'v' });
      f.q.textContent = 'Mỗi ngày, Rô-bốt chạy được so với ngày trước đó thế nào?';
      await f.choose({ options: [{ html: '📈 Nhiều hơn', value: 'up' }, { html: '📉 Ít hơn', value: 'down' }, { html: '〰️ Lúc nhiều lúc ít', value: 'mix' }], answer: m.kind,
        say: 'Độ dài quãng đường Rô-bốt chạy được mỗi ngày thay đổi thế nào so với ngày trước đó?', hint: 'So sánh từng cột với cột ngay bên trái nó.' });
      f.finish({ ok: m.kind === 'up' ? 'Cột sau cao hơn cột trước: mỗi ngày chạy nhiều hơn.' : m.kind === 'down' ? 'Cột sau thấp hơn cột trước: mỗi ngày chạy ít hơn.' : 'Có ngày nhiều hơn, có ngày ít hơn ngày trước.' });
    },
  };
}

// ════ Bài 51: Số lần xuất hiện của một sự kiện ═══════════════════════════════════════════════════════

const EV = {
  red: { label: 'Phần màu đỏ', art: EVART.wheel('red'), test: d => d.color === 'red' },
  yellow: { label: 'Phần màu vàng', art: EVART.wheel('yellow'), test: d => d.color === 'yellow' },
};

const B51 = {
  explore: {
    setup: (board) => {
      // 20 lần quay như sách: 9 lần đỏ, 11 lần vàng (thứ tự xáo)
      const rig = [...Array(9).fill(0), ...Array(11).fill(1)];
      for (let i = rig.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rig[i], rig[j]] = [rig[j], rig[i]]; }
      return createChance(board, { device: 'wheel', events: [EV.red, EV.yellow], trials: 20, manual: 4, style: 'classic', rig, explore: true });
    },
    steps: [
      async (c) => {
        await c.say('Hai bạn chơi vòng quay có các phần màu đỏ và màu vàng. Khi vòng quay dừng, mũi tên có thể chỉ vào đâu?', 'Mũi tên có thể dừng ở đâu?');
        await c.choose([{ html: 'Chỉ màu đỏ', value: 1 }, { html: 'Màu đỏ hoặc màu vàng', value: 2 }, { html: 'Màu xanh', value: 3 }], 2, { hint: 'Vòng quay có cả phần màu đỏ và phần màu vàng.' });
        await c.say('Có 2 sự kiện có thể xảy ra: mũi tên dừng lại ở phần màu vàng, và mũi tên dừng lại ở phần màu đỏ.', '2 sự kiện: dừng ở <b>màu vàng</b>, dừng ở <b>màu đỏ</b>.');
      },
      async (c) => {
        const t = c.t;
        await c.say('Bấm Quay. Mũi tên dừng ở màu nào thì em chạm vào hàng đó để gạch một vạch kiểm đếm.', '🎡 Quay rồi chạm đúng <b>hàng</b> để gạch.');
        const off = t.on((ev, k, want) => {
          if (ev === 'wrong') c.hint(`Mũi tên đang chỉ vào ${t.events[want].label.toLowerCase()}. Chạm hàng ${t.events[want].label}.`);
          if (ev === 'early') c.hint('Bấm nút Quay trước.');
        });
        await c.until(t, () => t.done >= 4, { nudge: () => (t.cur >= 0 ? 'Chạm hàng có màu mũi tên đang chỉ.' : 'Bấm nút Quay.'), el: () => (t.cur >= 0 ? t.row(t.cur) : t.actBtn) });
        off();
        await c.say('Mỗi lần quay gạch một vạch. Đủ 5 lần thì vạch thứ năm gạch chéo qua bốn vạch, để đếm theo nhóm 5 cho nhanh.', 'Mỗi lần: <b>1 vạch</b> · lần thứ năm gạch chéo');
      },
      async (c) => {
        const t = c.t;
        await c.say('Hai bạn quay tất cả 20 lần. Bấm Làm nhanh để quay nốt.', 'Bấm <b>⏩ Làm nhanh</b> cho đủ <b>20 lần</b>.');
        const off = t.on((ev, k, want) => { if (ev === 'wrong') c.hint(`Chạm hàng ${t.events[want].label}.`); });
        await c.until(t, () => t.done >= 20, { nudge: 'Bấm nút Làm nhanh.', el: () => t.fastBtn });
        off();
        await c.say('Đếm số vạch mỗi hàng. Mũi tên dừng ở phần màu đỏ bao nhiêu lần?', 'Màu đỏ: bao nhiêu lần?');
        t.hl(0);
        await c.choose([{ html: '9 lần', value: 9 }, { html: '11 lần', value: 11 }, { html: '5 lần', value: 5 }], t.counts[0], { hint: 'Một nhóm gạch chéo là 5. Đếm 5, rồi đếm thêm các vạch lẻ.' });
        t.showCount(0);
        t.hl(1);
        await c.say('Còn phần màu vàng?', 'Màu vàng: bao nhiêu lần?');
        await c.choose([{ html: '9 lần', value: 9 }, { html: '10 lần', value: 10 }, { html: '11 lần', value: 11 }], t.counts[1], { hint: 'Hai nhóm gạch chéo là 10, đếm thêm vạch lẻ.' });
        t.showCount(1);
        t.hl(-1);
        await c.say('Như vậy, có 9 lần mũi tên dừng lại ở phần màu đỏ, và 11 lần mũi tên dừng lại ở phần màu vàng.', '<b>9 lần</b> màu đỏ · <b>11 lần</b> màu vàng');
      },
      async (c) => {
        const t = c.t;
        await c.say('Sự kiện nào xuất hiện nhiều lần hơn?');
        await c.choose([{ html: 'Dừng ở màu đỏ', value: 0 }, { html: 'Dừng ở màu vàng', value: 1 }], 1, { hint: 'So sánh 9 lần và 11 lần.' });
        t.hl(1);
        await c.say('Mũi tên dừng ở màu vàng 11 lần, nhiều hơn màu đỏ 9 lần.', 'Màu vàng xuất hiện <b>nhiều lần hơn</b>.');
        t.hl(-1);
        t.setStyle('square');
        await c.say('Sách lớp 4 còn kiểm đếm bằng ô vuông: bốn cạnh là 4 lần, thêm một đường chéo là 5 lần.', 'Kiểm đếm ô vuông: 4 cạnh + 1 đường chéo = <b>5 lần</b>');
      },
    ],
  },
  tasks: () => [taskCExp(), taskCRead(), taskCEvents(), taskCRabbit(), taskCTurtle()],
};

/** Các thí nghiệm của bài (HĐ1 hộp bóng, LT2 túi bút, Bài 52 câu 4 bốn hộp, thêm đồng xu, vòng quay). */
const EXPS = [
  { id: 'box', device: 'box', dev: { balls: ['blue', 'blue', 'blue', 'yellow'] }, trials: 10, short: 'Hộp: 3 bóng xanh, 1 bóng vàng. Lấy 1 bóng.', intro: 'Hộp có 3 bóng xanh, 1 bóng vàng. Lấy 1 bóng, xem màu rồi trả lại.',
    events: [{ label: 'Bóng xanh', art: EVART.ball('blue'), test: d => d.color === 'blue' }, { label: 'Bóng vàng', art: EVART.ball('yellow'), test: d => d.color === 'yellow' }], what: 'lấy được' },
  { id: 'box2', device: 'box', dev: { balls: ['red', 'red', 'blue', 'blue', 'blue'] }, trials: 10, short: 'Hộp: 2 bóng đỏ, 3 bóng xanh. Lấy 1 bóng.', intro: 'Hộp có 2 bóng đỏ, 3 bóng xanh. Lấy 1 bóng, xem màu rồi trả lại.',
    events: [{ label: 'Bóng đỏ', art: EVART.ball('red'), test: d => d.color === 'red' }, { label: 'Bóng xanh', art: EVART.ball('blue'), test: d => d.color === 'blue' }], what: 'lấy được' },
  { id: 'pens', device: 'pens', dev: { pens: ['blue', 'blue', 'yellow'] }, trials: 20, short: 'Túi: 2 bút xanh, 1 bút vàng. Lấy 2 bút.', intro: 'Túi có 2 bút xanh, 1 bút vàng. Lấy 2 bút, xem màu rồi trả lại.',
    events: [{ label: '1 vàng, 1 xanh', art: EVART.pens('yellow', 'blue'), test: d => d.colors.includes('yellow') }, { label: '2 bút xanh', art: EVART.pens('blue', 'blue'), test: d => !d.colors.includes('yellow') }], what: 'lấy được' },
  { id: 'boxes', device: 'boxes', dev: { items: ['candy', 'eraser', 'eraser', 'eraser'] }, trials: 10, short: '1 hộp kẹo, 3 hộp tẩy. Chọn 1 hộp.', intro: '1 hộp đựng kẹo, 3 hộp đựng tẩy. Xáo các hộp rồi chọn 1 hộp.',
    events: [{ label: 'Hộp kẹo', art: EVART.candy(), test: d => d.item === 'candy' }, { label: 'Hộp tẩy', art: EVART.eraser(), test: d => d.item === 'eraser' }], what: 'chọn được' },
  { id: 'coin', device: 'coin', trials: 10, short: 'Tung đồng xu.', intro: 'Tung đồng xu, xem mặt trên là mặt sấp hay mặt ngửa.',
    events: [{ label: 'Mặt sấp', art: EVART.coin(0), test: d => d.side === 0 }, { label: 'Mặt ngửa', art: EVART.coin(1), test: d => d.side === 1 }], what: 'được' },
  { id: 'wheel', device: 'wheel', dev: { sectors: ['red', 'yellow', 'yellow'] }, trials: 10, short: 'Vòng quay: 1 phần đỏ, 2 phần vàng.', intro: 'Vòng quay có 1 phần màu đỏ, 2 phần màu vàng.',
    events: [EV.red, EV.yellow], what: 'dừng ở' },
];

/** HĐ1b–c, LT2b–c, Bài 52 câu 4: làm thí nghiệm, kiểm đếm, ghi số lần, so sánh. */
function taskCExp() {
  return {
    id: 'cexp',
    make: (rng) => ({ x: rng.pick(EXPS).id, seed: rng.int(1, 1e9) }),
    async mount(f, m) {
      const X = EXPS.find(e => e.id === m.x);
      const t = createChance(f.tool, { device: X.device, dev: X.dev, events: X.events, trials: X.trials, manual: 3, rng: makeRng(m.seed) });
      reserveChoices(f, 3);
      f.q.innerHTML = `${X.short} <small>Làm ${X.trials} lần, kiểm đếm</small>`;
      f.say(`${X.intro} Bấm nút, rồi chạm đúng hàng để gạch một vạch.`, `👆 Bấm <b>${t.actBtn.textContent}</b>, rồi chạm đúng <b>hàng</b>.`);
      const st = { missed: false };
      t.on((ev, k, want) => {
        if (ev === 'rolled') { st.missed = false; f.show('👆 Chạm đúng <b>hàng</b> để gạch một vạch.'); }
        if (ev === 'wrong') { miss(f, st); f.hint(`Kết quả là: ${X.events[want].label.toLowerCase()}. Chạm hàng ${X.events[want].label}.`); }
        if (ev === 'early') f.hint(`Bấm nút ${t.actBtn.textContent.replace(/^\S+ /, '')} trước.`);
        if (ev === 'mark' && t.done === 3) f.say('Bấm Làm nhanh để làm nốt các lần còn lại.', `Bấm <b>⏩ Làm nhanh</b> cho đủ <b>${X.trials} lần</b>.`);
      });
      if (import.meta.env.DEV) window.__g4ans = { kind: 'exp', t };
      await new Promise((res) => t.on((ev) => { if (ev === 'done') res(); }));
      // ghi số lần
      for (let k = 0; k < X.events.length; k++) {
        t.hl(k);
        await f.ask({ box: t.countBox(k), answer: t.counts[k], max: 2, say: k === 0 ? `Đếm vạch, ghi số lần ${X.what} ${X.events[k].label.toLowerCase()}.` : `Còn ${X.events[k].label.toLowerCase()}?`,
          hint: 'Mỗi ô vuông có đường chéo là 5 lần. Đếm 5, 10, rồi đếm thêm các vạch lẻ.' });
      }
      t.hl(-1);
      const [a, b] = t.counts;
      const ans = a > b ? 0 : b > a ? 1 : 2;
      await f.choose({ options: [{ html: X.events[0].label, value: 0 }, { html: X.events[1].label, value: 1 }, { html: 'Bằng nhau', value: 2 }], answer: ans,
        say: 'Sự kiện nào xuất hiện nhiều lần hơn?', hint: `So sánh ${a} lần và ${b} lần.` });
      f.finish({ ok: `${X.events[0].label}: ${a} lần, ${X.events[1].label.toLowerCase()}: ${b} lần.` });
    },
  };
}

/** LT1: đọc bảng kiểm đếm ô vuông (xúc xắc), mặt k chấm xuất hiện bao nhiêu lần. */
function taskCRead() {
  return {
    id: 'cread',
    make: (rng) => ({ counts: [...Array(6)].map(() => rng.int(1, 12)), k: rng.int(1, 6) }),
    async mount(f, m) {
      injectReadStyles();
      const G = Math.ceil(Math.max(...m.counts) / 5);
      f.tool.innerHTML = `<div class="g4cr"><div class="g4cr-tbl">${m.counts.map((n, i) => `<div class="g4cr-col ${i + 1 === m.k ? 'g4cr-on' : ''}">
          <svg viewBox="0 0 40 40" class="g4cr-die">${dieFace(i + 1, 20, 20, 32)}</svg><div class="g4cr-t">${tallySvg(n, { groups: G })}</div></div>`).join('')}</div></div>`;
      f.q.innerHTML = `Nam gieo xúc xắc nhiều lần. Mặt ${m.k} chấm xuất hiện ${BOX} lần`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: m.counts[m.k - 1], max: 2, say: `Nam gieo một xúc xắc nhiều lần và kiểm đếm. Mặt ${m.k} chấm đã xuất hiện bao nhiêu lần?`,
        hint: 'Mỗi ô vuông có đường chéo là 5 lần. Mỗi cạnh lẻ là 1 lần.' });
      f.finish({ ok: `Mặt ${m.k} chấm: ${m.counts[m.k - 1]} lần.` });
    },
  };
}

/** HĐ1a, LT2a, Bài 52 câu 4a: nêu các sự kiện có thể xảy ra (chọn tất cả, rồi kiểm tra). */
const SCEN = [
  { device: 'box', dev: { balls: ['blue', 'blue', 'blue', 'yellow'] }, q: 'Hộp có 3 bóng xanh, 1 bóng vàng. Lấy 1 quả bóng.',
    opts: [['Lấy được bóng xanh', 1], ['Lấy được bóng vàng', 1], ['Lấy được bóng đỏ', 0]] },
  { device: 'pens', dev: { pens: ['blue', 'blue', 'yellow'] }, q: 'Túi có 2 bút xanh, 1 bút vàng. Lấy 2 chiếc bút.',
    opts: [['1 bút vàng và 1 bút xanh', 1], ['2 bút xanh', 1], ['2 bút vàng', 0]] },
  { device: 'boxes', dev: { items: ['candy', 'eraser', 'eraser', 'eraser'] }, q: '1 hộp đựng kẹo, 3 hộp đựng tẩy bút chì. Chọn 1 hộp.',
    opts: [['Chọn được hộp đựng kẹo', 1], ['Chọn được hộp đựng tẩy', 1], ['Chọn được hộp đựng bút mực', 0]] },
  { device: 'box', dev: { balls: ['red', 'red', 'red', 'red'] }, q: 'Hộp có 4 bóng đỏ. Lấy 1 quả bóng.',
    opts: [['Lấy được bóng đỏ', 1], ['Lấy được bóng xanh', 0], ['Lấy được bóng vàng', 0]] },
  { device: 'wheel', dev: { sectors: ['red', 'yellow', 'red', 'yellow'] }, q: 'Quay vòng quay có phần màu đỏ và phần màu vàng.',
    opts: [['Mũi tên dừng ở màu đỏ', 1], ['Mũi tên dừng ở màu vàng', 1], ['Mũi tên dừng ở màu xanh', 0]] },
  { device: 'coin', q: 'Tung một đồng xu.', opts: [['Mặt sấp', 1], ['Mặt ngửa', 1], ['Cả hai mặt cùng lúc', 0]] },
];
function taskCEvents() {
  return {
    id: 'cevents',
    make: (rng) => ({ s: rng.int(0, SCEN.length - 1), perm: rng.shuffle([0, 1, 2]) }),
    async mount(f, m) {
      injectReadStyles();
      const S = SCEN[m.s];
      f.tool.innerHTML = `<div class="g4cv"><div class="g4cv-pic">${deviceSvg(S.device, S.dev)}</div>
        <div class="g4cv-opts">${m.perm.map(i => `<button type="button" class="g4cv-opt" data-i="${i}"><span class="g4cv-ck"></span><span>${S.opts[i][0]}</span></button>`).join('')}</div></div>`;
      f.q.innerHTML = `${S.q} <small>Chạm <b>tất cả</b> sự kiện có thể xảy ra</small>`;
      f.say(`${S.q} Chạm vào tất cả các sự kiện có thể xảy ra, rồi bấm Kiểm tra.`);
      const btns = [...f.tool.querySelectorAll('.g4cv-opt')];
      const on = new Set();
      btns.forEach(b => b.addEventListener('click', () => { const i = +b.dataset.i; if (b.disabled) return; sfx.tap(); if (on.has(i)) on.delete(i); else on.add(i); b.classList.toggle('g4cv-on', on.has(i)); }));
      const want = S.opts.map((o, i) => (o[1] ? i : -1)).filter(i => i >= 0);
      if (import.meta.env.DEV) window.__g4ans = { kind: 'multi', solve: () => btns.forEach(b => { const i = +b.dataset.i; if (want.includes(i) !== on.has(i)) b.click(); }) };
      const chk = checkButton(f);
      const st = {};
      for (;;) {
        await chk.next();
        const extra = [...on].filter(i => !S.opts[i][1]), lack = want.filter(i => !on.has(i));
        if (!extra.length && !lack.length) break;
        miss(f, st);
        if (extra.length) { const b = btns.find(x => +x.dataset.i === extra[0]); shake(b); f.hint(`"${S.opts[extra[0]][0]}" không thể xảy ra.`); }
        else f.hint(want.length > 1 ? `Còn sự kiện khác cũng có thể xảy ra. Có ${want.length} sự kiện.` : 'Chỉ có 1 sự kiện có thể xảy ra.');
      }
      chk.done();
      btns.forEach(b => { b.disabled = true; if (on.has(+b.dataset.i)) b.classList.add('g4cv-ok'); });
      sfx.ding();
      f.finish({ ok: `Có ${want.length} sự kiện có thể xảy ra: ${want.map(i => S.opts[i][0].toLowerCase()).join('; ')}.` });
    },
  };
}

/** HĐ2: thỏ Chẵn, thỏ Lẻ: gieo hai xúc xắc, tích chẵn thì thỏ Chẵn tiến, lẻ thì thỏ Lẻ tiến. */
function taskCRabbit() {
  return {
    id: 'crabbit',
    make: (rng) => ({ seed: rng.int(1, 1e9) }),
    async mount(f, m) {
      const t = createRace(f.tool, { lanes: rabbitLanes(), len: 7, rule: (a, b) => ((a * b) % 2 === 0 ? 0 : 1), stopAfter: 1, manual: 3, rng: makeRng(m.seed), op: '×' });
      reserveChoices(f, 2);
      f.q.innerHTML = 'Tích số chấm <b>chẵn</b>: thỏ Chẵn tiến 1 ô. <b>Lẻ</b>: thỏ Lẻ tiến.';
      f.say('Gieo hai xúc xắc, tính tích số chấm. Tích là số chẵn thì thỏ Chẵn tiến 1 ô, số lẻ thì thỏ Lẻ tiến 1 ô. Chạm vào chú thỏ được tiến.', '🎲 Gieo, tính tích, chạm thỏ được tiến.');
      const st = {};
      t.on((ev, i, want) => {
        if (ev === 'rolled') st.missed = false;
        if (ev === 'wrong') { miss(f, st); const [a, b] = t.dice(); f.hint(`${a} × ${b} = ${a * b} là số ${want === 0 ? 'chẵn' : 'lẻ'}: thỏ ${want === 0 ? 'Chẵn' : 'Lẻ'} tiến.`); }
        if (ev === 'early') f.hint('Bấm Gieo trước.');
        if (ev === 'move' && t.rolls === 3) f.say('Bấm Làm nhanh để gieo tiếp tới khi có thỏ về đích.', 'Bấm <b>⏩ Làm nhanh</b>.');
      });
      if (import.meta.env.DEV) window.__g4ans = { kind: 'race', t };
      await new Promise((res) => t.on((ev) => { if (ev === 'done') res(); }));
      const win = t.order[0];
      await f.choose({ options: [{ html: '🐰 Thỏ Chẵn', value: 0 }, { html: '🐇 Thỏ Lẻ', value: 1 }], answer: win, say: 'Chú thỏ nào về đích trước?', hint: 'Nhìn chú thỏ có số 1 ở đích.' });
      f.finish({ ok: `Thỏ ${win ? 'Lẻ' : 'Chẵn'} về đích trước.`, tip: 'Tích hai số là số lẻ chỉ khi cả hai số đều lẻ, nên thỏ Chẵn thường về trước.' });
    },
  };
}

/** LT3: 11 chú rùa số 2–12, gieo hai xúc xắc, tổng là số nào thì rùa số đó tiến. */
function taskCTurtle() {
  return {
    id: 'cturtle',
    make: (rng) => ({ seed: rng.int(1, 1e9) }),
    async mount(f, m) {
      const t = createRace(f.tool, { lanes: turtleLanes(), len: 6, rule: (a, b) => a + b - 2, stopAfter: 3, manual: 3, rng: makeRng(m.seed), op: '+' });
      f.q.innerHTML = `Tổng số chấm là số nào, rùa số đó tiến 1 ô. Rùa về nhất: số ${BOX}`;
      f.say('Gieo hai xúc xắc, tính tổng số chấm. Tổng là số nào thì chú rùa mang số đó được tiến 1 ô. Chạm vào chú rùa đó.', '🎲 Gieo, tính tổng, chạm rùa được tiến.');
      const st = {};
      t.on((ev, i, want) => {
        if (ev === 'rolled') st.missed = false;
        if (ev === 'wrong') { miss(f, st); const [a, b] = t.dice(); f.hint(`${a} + ${b} = ${a + b}: rùa số ${a + b} tiến.`); }
        if (ev === 'early') f.hint('Bấm Gieo trước.');
        if (ev === 'move' && t.rolls === 3) f.say('Bấm Làm nhanh để gieo tiếp tới khi ba chú rùa về đích.', 'Bấm <b>⏩ Làm nhanh</b>.');
      });
      if (import.meta.env.DEV) window.__g4ans = { kind: 'race', t };
      await new Promise((res) => t.on((ev) => { if (ev === 'done') res(); }));
      const first = t.order[0] + 2;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: first, max: 2, say: 'Chú rùa nào về đích đầu tiên? Gõ số của chú rùa đó.', hint: 'Tìm chú rùa có huy hiệu số 1 ở đích.' });
      f.finish({ ok: `Về nhất, nhì, ba: rùa số ${t.order.map(i => i + 2).join(', ')}.`, tip: 'Tổng 6, 7, 8 có nhiều cách gieo ra nhất, rùa 2 và 12 chỉ có 1 cách.' });
    },
  };
}

let readStyled = false;
function injectReadStyles() {
  if (readStyled) return;
  readStyled = true;
  css('g4-tap2stats', `
    .g4cr { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; container-type: size; }
    .g4cr-tbl { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); width: 100%; max-height: 100%; border: 2px solid #7DD3FC; border-radius: 0.6rem; overflow: hidden; }
    .g4cr-col { display: grid; grid-template-rows: auto auto; border-right: 2px solid #7DD3FC; }
    .g4cr-col:last-child { border-right: none; }
    .g4cr-die { width: 70%; max-height: 36cqh; margin: 1.2cqh auto; display: block; aspect-ratio: 1; }
    .g4cr-t { border-top: 2px solid #7DD3FC; padding: 1.4cqh 0.6cqi; height: min(22cqh, 9cqi); }
    .g4cr-t svg { width: 100%; height: 100%; }
    .g4cr-on { background: #FEF9C3; }
    @container (aspect-ratio < 1.6) {
      .g4cr-tbl { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .g4cr-col:nth-child(3) { border-right: none; }
      .g4cr-col:nth-child(-n+3) { border-bottom: 2px solid #7DD3FC; }
      .g4cr-die { max-height: 18cqh; }
      .g4cr-t { height: min(12cqh, 18cqi); }
    }
    .g4cv { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 2cqi; container-type: size; }
    .g4cv-pic { min-height: 0; display: flex; background: linear-gradient(180deg, #EFF6FF, #F8FAFC); border: 1.5px solid #D6E2F0; border-radius: 1rem; padding: 1cqh; }
    .g4cv-pic svg { flex: 1; width: 100%; height: 100%; min-height: 0; }
    .g4cv-opts { min-height: 0; display: grid; grid-template-rows: repeat(3, minmax(0, 1fr)); gap: 1.6cqh; }
    .g4cv-opt { display: flex; align-items: center; gap: 0.5em; text-align: left; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(7cqh, 3.6cqi); line-height: 1.15;
      background: #fff; border: 2px solid #D6E2F0; border-radius: 0.8rem; box-shadow: 0 5px 0 #D6E2F0; padding: 0.2em 0.6em; cursor: pointer; touch-action: manipulation; }
    .g4cv-opt:active { transform: translateY(3px); box-shadow: 0 2px 0 #D6E2F0; }
    .g4cv-ck { flex: none; width: 1.1em; height: 1.1em; border: 2.5px solid #94A3B8; border-radius: 0.25em; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9em; }
    .g4cv-on { background: #FEF9C3; border-color: #F59E0B; box-shadow: 0 5px 0 #D97706; }
    .g4cv-on .g4cv-ck { background: #F59E0B; border-color: #D97706; }
    .g4cv-on .g4cv-ck::before { content: '✓'; }
    .g4cv-ok { background: #DCFCE7; border-color: #4ADE80; box-shadow: 0 5px 0 #16A34A; }
    .g4cv-ok .g4cv-ck { background: #22C55E; border-color: #16A34A; }
    @container (aspect-ratio < 1.6) {
      .g4cv { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 1.4cqh; }
      .g4cv-opt { font-size: min(4.4cqh, 6cqi); }
    }
  `);
}

export const STATS_LESSONS = { 49: B49, 50: B50, 51: B51 };
