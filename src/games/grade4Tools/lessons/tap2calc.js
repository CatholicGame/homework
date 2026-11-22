/**
 * Toán 4 Tập Hai, Bài 38, 39, 41, 43, 44, 45: Nhân, chia số nhiều chữ số; nhân chia với 10, 100, 1 000; ước lượng.
 * Khám phá bám mục Khám phá của SGK (cùng ví dụ, cùng cách nói từng bước), thầy làm mẫu rồi em làm tiếp:
 *   Bài 38: ✍️ đặt tính 160 140 × 7 (colview.js), Bài 43: ✍️ 34 × 12 tích riêng lùi một cột (longcalc.js createLongMul),
 *   Bài 39: ➗ 125 730 : 5 viết gọn như sách (longcalc.js createLongDiv short), Bài 44: ➗ 216 : 12, 218 : 18 viết đầy đủ,
 *   Bài 41: 🔟 bảng hàng, chữ số trượt khi × 10, : 10 (zeroshift.js), Bài 45: 🎯 thước làm tròn (estimate.js).
 * Thực hành: đặt tính giao cả màn cho Luyện Tính (MUL_GAME, DIVISION_GAME qua task.stage) + các dạng câu của Hoạt động,
 * Luyện tập (Đ/S, chọn đáp án, bài toán có lời văn, tìm thành phần, tính nhẩm, ước lượng).
 */

import { createColumn } from '../colview.js';
import { createLongMul, createLongDiv, autoDiv, autoMul } from '../longcalc.js';
import { createShift } from '../zeroshift.js';
import { createEstimate, roundU } from '../estimate.js';
import { createCanvas } from '../canvas.js';
import { BOX } from '../practice.js';
import { css, INK, sfx } from '../frame.js';
import { fmt, readVN } from '../num.js';
import { MUL_GAME } from '../../grade4Drills/mul.js';
import { DIVISION_GAME, estimate as estQ } from '../../grade3Drills/division.js';
import { columnSteps } from '../../grade3Drills/column.js';
import { sleep } from '../../grade3Drills/kit.js';

/** Số đọc cho giọng: số lớn đọc bằng chữ (giọng máy hay đọc sai số có dấu cách). */
const R = (n) => (Math.abs(n) >= 1000 ? readVN(n) : String(n));
const len = (n) => String(n).length;
const DS = [{ html: 'Đúng', value: true }, { html: 'Sai', value: false }];
const P10 = { 1: '10', 2: '100', 3: '1 000' };
const P10R = { 1: 'mười', 2: 'một trăm', 3: 'một nghìn' };
const ZR = { 1: 'một', 2: 'hai', 3: 'ba' };

/** Ba lựa chọn quanh chữ số / số đúng (chuỗi), sắp tăng dần. */
function digitOpts(right) {
  const opts = new Set([right]);
  const n = +right;
  for (const w of [n + 1, n - 1, n + 10, (n + 5) % 10, n + 2]) if (opts.size < 3 && w >= 0 && String(w) !== right) opts.add(String(w));
  return [...opts].sort((x, y) => x - y).map(x => ({ html: x, value: x }));
}
/** Lựa chọn số (đáp án + các số nhiễu khác nhau, dương), sắp tăng dần. */
function numOpts(right, wrongs) {
  const set = new Set([right]);
  for (const w of wrongs) if (set.size < 3 && w > 0 && w !== right) set.add(w);
  for (let k = 1; set.size < 3; k++) set.add(right + k * 10);
  return [...set].sort((x, y) => x - y).map(v => ({ html: fmt(v), value: v }));
}
/** Ba nút chọn phép tính với hai số a, b. */
const opPick = (a, b) => [
  { html: `${fmt(a)} + ${fmt(b)}`, value: '+' }, { html: `${fmt(a)} × ${fmt(b)}`, value: '×' }, { html: `${fmt(a)} : ${fmt(b)}`, value: ':' },
];

// ── Chạy đặt tính trong Khám phá ──────────────────────────────────────────────────────────────────────
/** Nhân với số có một chữ số trên colview: thầy làm `demo` chữ số đầu, sau đó em chọn chữ số. */
async function runCol1(c, t, a, b, { demo = 2 } = {}) {
  let no = 0, carry = 0;
  const A = String(a);
  for (const s of t.steps) {
    if (s.kind === 'carry') { await t.carry(s); carry = +s.write; continue; }
    t.glow(s.i);
    const ai = A[A.length - 1 - s.i];
    if (no < demo) {
      await c.say(s.say);
      t.write(s);
    } else {
      c.show(`<b>${b} × ${ai}</b>${carry ? `, thêm <b>${carry}</b>` : ''}: viết ${s.write.length > 1 ? 'số' : 'chữ số'} nào?`);
      await c.choose(digitOpts(s.write), s.write, { hint: `${b} nhân ${ai} bằng ${b * ai}${carry ? `, nhớ cộng thêm ${carry}` : ''}.` });
      t.write(s);
      await c.say(s.say);
    }
    carry = 0; // số nhớ của bước sau (nếu có) do bước 'carry' ngay sau ghi lại
    no++;
  }
  t.glow(null);
}

const ORD = ['thứ nhất', 'thứ hai', 'thứ ba'];

/** Nhân với số có hai chữ số (createLongMul): tích riêng thứ j < demoParts thầy làm, còn lại và bước cộng em chọn. */
async function runLongMul(c, t, { demoParts = 1, demoSum = false } = {}) {
  const { a, b } = t;
  const nb = len(b);
  let carry = 0;
  for (let k = 0; k < t.steps.length; k++) {
    const s = t.steps[k];
    if (s.kind === 'part') {
      t.clearCarry(); carry = 0;
      t.glow([['b', s.j]]);
      if (!s.j) { await c.say(`Tích riêng thứ nhất: lấy ${s.bj} nhân lần lượt từng chữ số của ${R(a)}, từ hàng đơn vị.`, `Tích riêng ${ORD[0]}: <b>${s.bj} × ${fmt(a)}</b>`); continue; }
      c.show(`Tích riêng ${ORD[s.j]}: <b>${s.bj} × ${fmt(a)}</b>. Chữ số đầu tiên viết ở cột nào?`);
      await c.choose([{ html: 'Thẳng cột đơn vị', value: 0 }, { html: 'Lùi sang trái một cột', value: s.j }], s.j,
        { hint: `Chữ số ${s.bj} ở hàng chục, nên tích riêng ${ORD[s.j]} là ${s.bj} chục nhân ${R(a)}: viết lùi sang trái một cột.` });
      t.skip(s.j);
      if (s.j === nb - 1) t.plus();
      await c.say(`${s.bj} ở hàng chục, nên tích riêng ${ORD[s.j]} viết lùi sang trái một cột so với tích riêng thứ nhất.`, `Viết <b>lùi sang trái một cột</b>`);
      continue;
    }
    if (s.kind === 'carry' || s.kind === 'scarry') { await t.carry(s); carry = +s.write; continue; }
    if (s.kind === 'add') {
      t.clearCarry(); carry = 0; t.glow(null);
      await c.say('Cộng các tích riêng, từ hàng đơn vị.', '<b>Cộng</b> các tích riêng');
      continue;
    }
    if (s.kind === 'digit') {
      t.glow([['b', s.j], ['a', s.i]]);
      if (s.j < demoParts) { await c.say(s.say); t.write(s); }
      else {
        c.show(`<b>${s.bj} × ${s.ai}</b>${carry ? `, thêm <b>${carry}</b>` : ''}: viết ${s.write.length > 1 ? 'số' : 'chữ số'} nào?`);
        await c.choose(digitOpts(s.write), s.write, { hint: s.say });
        t.write(s);
        c.show(s.say);
        await c.sleep(500);
      }
    } else if (s.kind === 'sum') {
      t.glow(t.parts.map((_, j) => [`p${j}`, s.i]).filter(([r, i]) => t.at(r, i)?.textContent));
      if (demoSum) { await c.say(s.say); t.sum(s); }
      else {
        c.show(`Cộng cột <b>${['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn'][s.i] || ''}</b>${carry ? `, thêm nhớ <b>${carry}</b>` : ''}: viết ${s.write.length > 1 ? 'số' : 'chữ số'} nào?`);
        await c.choose(digitOpts(s.write), s.write, { hint: s.say });
        t.sum(s);
        c.show(s.say);
        await c.sleep(500);
      }
    }
    carry = 0;
  }
  t.glow(null);
  t.clearCarry();
}

/** Lời nhân số chia với chữ số thương, từng chữ số như sách: "8 nhân 2 bằng 16, viết 6 nhớ 1. 8 nhân 1 bằng 8, thêm 1 bằng 9, viết 9." */
function mulPhrase(q, d) {
  if (d < 10) return `${q} nhân ${d} bằng ${q * d}`;
  return columnSteps('*', d, q).filter(s => s.kind === 'digit').map(s => s.say.replace(/\.$/, '')).join('. ');
}

/** Chia đặt tính (createLongDiv): vòng < demoRounds thầy làm; sau đó em chọn chữ số thương, từ vòng tapFrom em bấm chữ số để hạ. */
async function runLongDiv(c, t, { demoRounds = 1, tapFrom = 2, fast = 0 } = {}) {
  const { d, D } = t;
  const S = String(D);
  let round = 0;
  for (let k = 0; k < t.steps.length; k++) {
    const s = t.steps[k];
    // fast: các vòng đầu viết nhanh, không đọc (đã làm ở ví dụ trước)
    const idx = s.kind === 'q' || s.kind === 'down' ? round : round - 1;
    if (idx < fast && s.kind !== 'take') {
      if (s.kind === 'q') { t.writeQ(s.qi, s.q); round++; }
      else if (s.kind === 'mul' && !t.short) t.writeAt(s.vr, s.end, s.p, { sign: true, line: true });
      else if (s.kind === 'sub') t.writeAt(s.vr, s.end, s.r);
      else if (s.kind === 'down') await t.bringDown(s.vr, s.col);
      await c.sleep(300);
      continue;
    }
    if (s.kind === 'take') {
      t.mark(t.cells(0, s.end, s.end + 1));
      await c.say(s.end === 0 ? `Lấy ${s.partial} chia ${d}.` : `${S.slice(0, s.end)} bé hơn ${d}, lấy ${s.partial} chia ${d}.`,
        s.end === 0 ? `Lấy <b>${s.partial}</b> chia ${d}` : `${S.slice(0, s.end)} &lt; ${d} → lấy <b>${s.partial}</b> chia ${d}`);
    } else if (s.kind === 'q') {
      const pw = len(s.partial);
      const row = k > 1 ? (t.steps[k - 1].vr ?? 0) : 0;
      const end = k > 1 && t.steps[k - 1].kind === 'down' ? t.steps[k - 1].col : t.steps[0].end;
      t.mark([...t.cells(row, end, pw), t.dvEl, t.qEl(s.qi)]);
      const said = s.q ? `${s.partial} chia ${d} được ${s.q}, viết ${s.q}.` : `${s.partial} bé hơn ${d}, được 0, viết 0.`;
      if (round < demoRounds) { await c.say(said); t.writeQ(s.qi, s.q); }
      else {
        c.show(`<b>${s.partial} : ${d}</b> được mấy?`);
        const set = new Set([s.q]);
        for (const w of [s.q + 1, s.q - 1, s.q + 2]) if (set.size < 3 && w >= 0 && w <= 9) set.add(w);
        let hint = `${d} nhân mấy gần ${s.partial} nhất mà không quá ${s.partial}?`;
        if (d >= 10 && s.q) { const e = estQ(s.partial, d); hint = `Nhẩm ${e.a} chia ${e.b} được ${e.est}. Thử ${e.est} nhân ${d} bằng ${e.est * d}${e.est * d > s.partial ? `, lớn hơn ${s.partial}, giảm dần` : ''}.`; }
        await c.choose([...set].sort((x, y) => x - y).map(v => ({ html: String(v), value: v })), s.q, { hint });
        t.writeQ(s.qi, s.q);
        await c.say(said);
      }
      round++;
    } else if (s.kind === 'mul') {
      if (t.short) continue;
      t.writeAt(s.vr, s.end, s.p, { sign: true, line: true });
      await c.say(`${mulPhrase(s.q, d)}. Viết ${s.p} dưới ${s.partial}.`, `${s.q} × ${d} = <b>${s.p}</b>`);
    } else if (s.kind === 'sub') {
      t.writeAt(s.vr, s.end, s.r);
      const q = s.p / d;
      await c.say(t.short ? `${mulPhrase(q, d)}; ${s.partial} trừ ${s.p} bằng ${s.r}, viết ${s.r}.` : `${s.partial} trừ ${s.p} bằng ${s.r}, viết ${s.r}.`,
        t.short ? `${q} × ${d} = ${s.p} · ${s.partial} − ${s.p} = <b>${s.r}</b>` : `${s.partial} − ${s.p} = <b>${s.r}</b>`);
    } else if (s.kind === 'down') {
      const src = t.at(0, s.col);
      t.mark([src]);
      if (round >= tapFrom) {
        c.show(`Bấm chữ số <b>${S[s.col]}</b> để hạ xuống.`);
        await c.tap(src);
      }
      await t.bringDown(s.vr, s.col);
      const p = t.steps[k + 1]?.partial;
      t.mark(t.cells(s.vr, s.col, len(p)));
      await c.say(`Hạ ${s.dig}, được ${p}.`, `Hạ <b>${s.dig}</b> → ${p}`);
    }
  }
  t.mark([]);
}

// ── Hình phụ: phép tính dọc tĩnh (Đ/S), chuỗi phép tính ────────────────────────────────────────────────
/** Phép tính dọc tĩnh: lines [{ v, shift = 0, sign, line, cls }] canh phải, mỗi chữ số một ô. */
function staticCol(lines) {
  injectStyles();
  const L = Math.max(...lines.map(l => len(l.v) + (l.shift || 0)));
  const rows = lines.map((l) => {
    const s = String(l.v), sh = l.shift || 0;
    const cells = Array.from({ length: L }, (_, k) => { const i = L - 1 - k - sh; return i >= 0 && i < s.length ? s[s.length - 1 - i] : ''; });
    return `<div class="g4c2-sc-s${l.line ? ' g4c2-sc-line' : ''}">${l.sign || ''}</div>${cells.map(ch => `<div class="g4c2-sc-c${l.line ? ' g4c2-sc-line' : ''} ${l.cls || ''}">${ch}</div>`).join('')}`;
  }).join('');
  return `<div class="g4c2-sc" style="--n:${L + 1};--rows:${lines.length}"><div class="g4c2-sc-g">${rows}</div></div>`;
}

/** Các dạng câu của một bài: nạp kiểu riêng (g4c2-) trước khi dựng câu. */
const styled2 = (list) => list.map(t => (t.mount ? { ...t, mount(f, m) { injectStyles(); return t.mount(f, m); } } : t));

/** Đặt tính ở Thực hành: giao cả màn cho Luyện Tính. */
const stageTask = (id, game, gen) => ({ id, make: (rng) => gen(rng), stage(stage, m, api) { game.mountMission(stage, m, null, api); } });

// ═══ Bài 38: Nhân với số có một chữ số ══════════════════════════════════════════════════════════════
const colSvg = (a, b, res, color = '#DC2626') => {
  const A = fmt(a), Rr = fmt(res);
  return `<g font-family="Baloo 2, sans-serif" font-weight="800" text-anchor="end" font-size="76" fill="#1E293B">
    <text x="640" y="120">${A}</text><text x="370" y="200" fill="#64748B" text-anchor="start">×</text><text x="640" y="200">${b}</text>
    <line x1="360" y1="226" x2="650" y2="226" stroke="${INK}" stroke-width="6"/><text x="640" y="310" fill="${color}">${Rr}</text></g>`;
};

const B38 = {
  explore: {
    setup: (board) => createColumn(board, '*', 160140, 7),
    steps: [
      async (c) => {
        await c.say('Mỗi ngày nhà máy sản xuất được 160 140 chiếc khẩu trang. Trong 7 ngày, nhà máy đó sản xuất được bao nhiêu chiếc khẩu trang?',
          'Mỗi ngày <b>160 140</b> chiếc. <b>7 ngày</b>: ? chiếc');
        c.show('Em chọn phép tính:');
        await c.choose(opPick(160140, 7), '×', { hint: '7 ngày, mỗi ngày đều 160 140 chiếc: lấy 160 140 nhân 7.' });
        await c.say('Ta tính 160 140 nhân 7. Thực hiện tương tự như phép nhân đã học: đặt tính thẳng cột, nhân lần lượt từ hàng đơn vị, từ phải sang trái.',
          '<b>160 140 × 7</b>: nhân từ <b>hàng đơn vị</b>, phải sang trái');
      },
      async (c) => { await runCol1(c, c.t, 160140, 7, { demo: 2 }); },
      async (c) => {
        await c.say('Vậy 160 140 nhân 7 bằng 1 120 980. Trong 7 ngày nhà máy sản xuất được 1 120 980 chiếc khẩu trang.', '160 140 × 7 = <b>1 120 980</b>');
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        t.frame(210, 20, 600, 440);
        t.draw(colSvg(250000, 3, 650000));
        t.caption('Đúng hay sai?');
        t.anim('text', [{ opacity: 0 }, { opacity: 1 }], 300, { stagger: 120 }); await c.sleep(500); // không chờ .finished (máy tắt hiệu ứng)
        await c.say('Bạn Nam tính 250 000 nhân 3 bằng 650 000. Đúng hay sai?', '250 000 × 3 = 650 000: <b>Đ</b> hay <b>S</b>?');
        await c.choose(DS, false, { hint: '3 nhân 5 bằng 15, viết 5 nhớ 1. 3 nhân 2 bằng 6, thêm 1 bằng 7.' });
        t.draw(colSvg(250000, 3, 750000, '#15803D') + '<text x="640" y="400" font-size="50" font-weight="800" fill="#DC2626" text-anchor="end" font-family="Baloo 2, sans-serif" text-decoration="line-through">650 000</text>');
        t.anim('text:last-child', [{ opacity: 0 }, { opacity: 1 }], 400); await c.sleep(500); // không chờ .finished (máy tắt hiệu ứng)
        await c.say('Sai. 3 nhân 5 bằng 15, viết 5 nhớ 1. 3 nhân 2 bằng 6, thêm 1 bằng 7. Đúng phải là 750 000. Nhớ cộng số nhớ.', '250 000 × 3 = <b>750 000</b>');
      },
    ],
  },
  tasks: () => styled2([
    stageTask('m1col', MUL_GAME, (rng) => { const b = rng.int(2, 9); return { a: rng.int(10234, Math.min(499999, Math.floor(1999999 / b))), b }; }),
    taskMulDS(), taskMulWord(), taskMoney(), taskExpr(),
  ]),
};

/** Đ/S phép nhân một chữ số: kết quả đúng, quên số nhớ, hoặc đổi chỗ hai chữ số. */
function taskMulDS() {
  return {
    id: 'm1ds',
    make: (rng) => {
      for (;;) {
        const b = rng.int(2, 9), a = rng.int(11, 999) * rng.pick([10, 100, 1000]) + (rng() < 0.4 ? rng.int(1, 9) : 0);
        if (a < 10000 || a * b > 9999999) continue;
        const ok = rng() < 0.45, kind = rng.int(0, 1);
        const right = a * b;
        let shown = right;
        if (!ok) {
          if (kind === 0) { const A = String(a); let s = ''; for (let i = A.length - 1; i >= 0; i--) s = (i ? String((+A[i] * b) % 10) : String(+A[i] * b)) + s; shown = +s; }
          else { const s = [...String(right)]; const i = rng.int(0, s.length - 2); if (s[i] === s[i + 1]) continue; [s[i], s[i + 1]] = [s[i + 1], s[i]]; shown = +s.join(''); }
          if (shown === right || len(shown) < len(right) - 1) continue;
        }
        return { a, b, shown };
      }
    },
    async mount(f, { a, b, shown }) {
      const right = a * b, ok = shown === right;
      f.q.innerHTML = 'Đúng hay sai?';
      f.tool.innerHTML = staticCol([{ v: a }, { v: b, sign: '×', line: true }, { v: shown, cls: 'g4c2-blue' }]);
      await f.choose({ options: DS, answer: ok, cls: 'g4-choice-big', say: `${R(a)} nhân ${b} bằng ${R(shown)}. Đúng hay sai?`,
        hint: 'Nhân lần lượt từ hàng đơn vị, nhớ cộng thêm số nhớ ở hàng bên trái.' });
      if (!ok) {
        f.tool.innerHTML = staticCol([{ v: a }, { v: b, sign: '×', line: true }, { v: right, cls: 'g4c2-ok' }]);
        f.tool.querySelectorAll('.g4c2-ok').forEach((e, i) => e.animate([{ opacity: 0, transform: 'scale(1.4)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: i * 60, fill: 'both' }));
      }
      f.finish({ ok: ok ? `${fmt(a)} × ${b} = ${fmt(right)}: đúng.` : `Sai. ${fmt(a)} × ${b} = ${fmt(right)}.` });
    },
  };
}

/** Bài toán có lời văn nhân với số có một chữ số (bóng đèn, nhà máy, hạt thóc gấp đôi). */
function taskMulWord() {
  return {
    id: 'm1word',
    make: (rng) => {
      const k = rng.int(0, 2);
      if (k === 0) return { k, x: rng.int(30, 80) * 250, n: rng.int(2, 5) };
      if (k === 1) return { k, x: rng.int(102, 989) * 100 + rng.int(0, 9) * 10, n: rng.int(3, 9) };
      const c = rng.int(10, 17);
      return { k, x: 2 ** (c - 1), n: c };
    },
    async mount(f, { k, x, n }) {
      let text, ans, unit, hint, spoken;
      if (k === 0) { text = `Bóng đèn trong nhà có tuổi thọ <b>${fmt(x)} giờ</b>. Bóng đèn đường có tuổi thọ gấp <b>${n} lần</b>. Tuổi thọ bóng đèn đường là`; ans = x * n; unit = 'giờ'; hint = `Gấp ${n} lần: lấy ${fmt(x)} nhân ${n}.`; spoken = 'Tuổi thọ của bóng đèn đường là bao nhiêu giờ?'; }
      else if (k === 1) { text = `Mỗi ngày nhà máy sản xuất <b>${fmt(x)}</b> chiếc khẩu trang. Trong <b>${n} ngày</b> nhà máy sản xuất được`; ans = x * n; unit = 'chiếc'; hint = `Lấy số chiếc một ngày nhân ${n}.`; spoken = `Trong ${n} ngày nhà máy sản xuất được bao nhiêu chiếc?`; }
      else { text = `Bàn cờ: ô sau gấp đôi số thóc ô trước. Ô thứ ${n} có <b>${fmt(x)}</b> hạt. Ô thứ ${n + 2} có`; ans = x * 4; unit = 'hạt'; hint = `Ô thứ ${n + 1} có ${fmt(x)} × 2 = ${fmt(x * 2)} hạt, ô thứ ${n + 2} gấp đôi ô thứ ${n + 1}.`; spoken = `Ô thứ ${n + 2} có bao nhiêu hạt thóc?`; }
      f.q.innerHTML = `${text} ${BOX} ${unit}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len(ans) + 1, say: spoken, hint });
      f.finish({ ok: `Đáp số: ${fmt(ans)} ${unit}.` });
    },
  };
}

/** Chọn câu trả lời đúng: có M đồng, mua n món giá p, còn lại bao nhiêu. */
function taskMoney() {
  const ITEMS = [['bộ cờ vua', '♟️'], ['hộp bút màu', '🖍️'], ['quyển truyện', '📕'], ['quả bóng', '⚽']];
  return {
    id: 'm1money',
    make: (rng) => {
      for (;;) {
        const p = rng.int(3, 9) * 10000, n = rng.int(2, 4), M = (Math.ceil((p * n) / 100000) + rng.int(0, 1)) * 100000;
        if (M > p * n && M - p * n !== p) return { p, n, M, i: rng.int(0, ITEMS.length - 1) };
      }
    },
    async mount(f, { p, n, M, i }) {
      const [name, ic] = ITEMS[i], ans = M - p * n;
      f.q.innerHTML = `<span style="font-size:1.6em">${ic.repeat(n)}</span><br>Rô-bốt có <b>${fmt(M)} đồng</b>, mua ${n} ${name}, mỗi ${name.split(' ')[0]} giá <b>${fmt(p)} đồng</b>. Rô-bốt còn lại:`;
      await f.choose({ options: numOpts(ans, [M - p, p * n, ans + p]).map(o => ({ ...o, html: `${o.html} đồng` })), answer: ans,
        say: `Rô-bốt có ${R(M)} đồng, mua ${n} ${name}, mỗi ${name.split(' ')[0]} giá ${R(p)} đồng. Rô-bốt còn lại bao nhiêu tiền?`,
        hint: `Tiền mua: ${fmt(p)} × ${n} = ${fmt(p * n)} đồng. Rồi lấy ${fmt(M)} trừ đi.` });
      f.finish({ ok: `${fmt(M)} − ${fmt(p)} × ${n} = ${fmt(ans)} đồng.` });
    },
  };
}

/** Tính giá trị biểu thức a ± b × k: nhân trước, cộng trừ sau. */
function taskExpr() {
  return {
    id: 'm1expr',
    make: (rng) => {
      const plus = rng() < 0.5, k = rng.int(2, 6), b = rng.int(1021, 39999);
      const a = plus ? rng.int(100000, 699999) : rng.int(b * k + 10000, Math.max(b * k + 20000, 899999));
      return { a, b, k, plus };
    },
    async mount(f, { a, b, k, plus }) {
      const sg = plus ? '+' : '−', mid = b * k, ans = plus ? a + mid : a - mid;
      f.q.innerHTML = `<div>${fmt(a)} ${sg} ${fmt(b)} × ${k}</div><div class="g4c2-lines"><span>= ${fmt(a)} ${sg} ${BOX}</span><span>= ${BOX}</span></div>`;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: mid, max: len(mid) + 1, say: 'Tính giá trị của biểu thức. Phép nhân làm trước.', hint: `Nhân trước: ${fmt(b)} × ${k}.` });
      await f.ask({ box: b2, answer: ans, max: len(ans) + 1, hint: `${fmt(a)} ${sg} ${fmt(mid)}.` });
      f.finish({ ok: `${fmt(a)} ${sg} ${fmt(b)} × ${k} = ${fmt(ans)}` });
    },
  };
}

// ═══ Bài 39: Chia cho số có một chữ số ══════════════════════════════════════════════════════════════
const B39 = {
  explore: {
    setup: (board) => createLongDiv(board, 125730, 5, { short: true }),
    steps: [
      async (c) => {
        await c.say('Trong tổ có 125 730 kiến thợ. Cứ 5 kiến thợ khênh được một hạt gạo. Tất cả kiến thợ trong tổ khênh được bao nhiêu hạt gạo?',
          '<b>125 730</b> kiến thợ, cứ <b>5</b> kiến một hạt gạo');
        c.show('Em chọn phép tính:');
        await c.choose(opPick(125730, 5), ':', { hint: 'Chia 125 730 kiến thành từng nhóm 5 kiến: mỗi nhóm một hạt gạo.' });
        await c.say('Ta tính 125 730 chia 5. Thực hiện tương tự như phép chia đã học: chia từ trái sang phải. Nhẩm tích rồi trừ luôn, chỉ viết số dư.',
          '<b>125 730 : 5</b> · chia từ <b>trái sang phải</b>');
      },
      async (c) => { await runLongDiv(c, c.t, { demoRounds: 1, tapFrom: 2 }); },
      async (c) => {
        await c.say('Vậy 125 730 chia 5 bằng 25 146. Các kiến thợ khênh được 25 146 hạt gạo.', '125 730 : 5 = <b>25 146</b>');
      },
      async (c) => {
        const t = c.use((b) => createLongDiv(b, 125734, 5, { short: true }));
        await c.say('Thử với 125 734 chia 5. Các vòng đầu giống hệt phép chia vừa rồi, thầy viết nhanh. Em làm vòng cuối.', '<b>125 734 : 5</b>');
        await runLongDiv(c, t, { fast: 4, demoRounds: 4, tapFrom: 4 });
      },
      async (c) => {
        await c.say('125 734 chia 5 được 25 146, dư 4. Số dư 4 bé hơn số chia 5.', '125 734 : 5 = <b>25 146</b> (dư 4) · 4 &lt; 5');
        c.show('Số dư có thể bằng 5 không?');
        await c.choose([{ html: 'Có', value: 1 }, { html: 'Không', value: 0 }], 0, { hint: 'Còn 5 thì chia tiếp được 1 lần nữa.' });
        await c.say('Không. Số dư luôn bé hơn số chia.');
      },
    ],
  },
  tasks: () => styled2([
    stageTask('d1col', DIVISION_GAME, (rng) => { const d = rng.int(2, 9); return { D: rng.int(Math.max(10234, d * 2000), 899999), d }; }),
    taskDivFix(), taskPacks(), taskUnitPrice(), taskTrucks(), taskShare(),
  ]),
};

/** Bạn Nam tính đúng hay sai: kết quả đúng, số dư lớn hơn số chia, hoặc quên chữ số 0 ở thương. Lời giải hiện dần. */
function taskDivFix() {
  return {
    id: 'd1fix',
    make: (rng) => {
      for (;;) {
        const d = rng.int(3, 9), kind = rng.int(0, 2);
        let q = rng.int(1203, 39999);
        if (kind === 2 && !/[1-9]0+[1-9]/.test(String(q))) { const s = [...String(q)]; s[2] = '0'; q = +s.join(''); }
        const r = kind === 1 ? rng.int(0, d - 1) : rng() < 0.5 ? 0 : rng.int(1, d - 1);
        const D = q * d + r;
        if (D > 999999 || D < 10000) continue;
        let Q = q, Rm = r;
        if (kind === 1) { Q = q - 1; Rm = r + d; }
        if (kind === 2) { Q = +String(q).replace(/0/g, ''); if (Q === q) continue; Rm = r; }
        return { D, d, Q, Rm, kind };
      }
    },
    async mount(f, { D, d, Q, Rm, kind }) {
      const q = Math.floor(D / d), r = D % d, ok = Q === q && Rm === r;
      f.q.innerHTML = `Bạn Nam tính: <b>${fmt(D)} : ${d} = ${fmt(Q)}${Rm ? ` (dư ${Rm})` : ''}</b>. Đúng hay sai?`;
      const t = createLongDiv(f.tool, D, d, { short: true, pad: false });
      const hint = kind === 1 ? `Số dư ${Rm} không bé hơn số chia ${d}: còn chia tiếp được.` : kind === 2 ? 'Hạ chữ số mà vẫn bé hơn số chia thì phải viết 0 vào thương.' : 'Em thử chia lại từng bước.';
      await f.choose({ options: DS, answer: ok, cls: 'g4-choice-big', say: `Bạn Nam tính ${R(D)} chia ${d} bằng ${R(Q)}${Rm ? `, dư ${Rm}` : ''}. Nam tính đúng hay sai?`, hint });
      await autoDiv(t, 200);
      f.finish({ ok: `${ok ? 'Đúng' : 'Sai'}: ${fmt(D)} : ${d} = ${fmt(q)}${r ? ` (dư ${r})` : ''}.`, tip: kind === 1 ? 'Số dư luôn bé hơn số chia.' : kind === 2 ? 'Đừng quên chữ số 0 ở thương.' : '' });
    },
  };
}

/** Cứ k hộp đóng một vỉ: được nhiều nhất bao nhiêu vỉ, thừa mấy hộp. */
function taskPacks() {
  const KIND = [['hộp sữa', 'vỉ sữa', 'vỉ'], ['quả trứng', 'khay trứng', 'khay'], ['cái bánh', 'hộp bánh', 'hộp']];
  return {
    id: 'd1rem',
    make: (rng) => { const k = rng.int(4, 9); let N; do N = rng.int(12345, 899999); while (N % k === 0); return { k, N, i: rng.int(0, KIND.length - 1) }; },
    async mount(f, { k, N, i }) {
      const [item, pack, pk] = KIND[i], q = Math.floor(N / k), r = N % k;
      f.q.innerHTML = `Cứ <b>${k} ${item}</b> đóng được một ${pack}. Có <b>${fmt(N)} ${item}</b>.<div class="g4c2-lines"><span>Đóng được nhiều nhất ${BOX} ${pk}</span><span>còn thừa ${BOX} ${item.split(' ')[0]} ${item.split(' ')[1]}</span></div>`;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: q, max: len(q) + 1, say: `Cứ ${k} ${item} đóng được một ${pack}. ${R(N)} ${item} đóng được nhiều nhất bao nhiêu ${pk}, còn thừa mấy ${item}?`,
        hint: `Lấy ${fmt(N)} chia ${k}: thương là số ${pk}.` });
      await f.ask({ box: b2, answer: r, max: 1, hint: `Số dư là số ${item} còn thừa, bé hơn ${k}.` });
      f.finish({ ok: `${fmt(N)} : ${k} = ${fmt(q)} (dư ${r}): ${fmt(q)} ${pk}, thừa ${r} ${item}.` });
    },
  };
}

/** Có M đồng, mua n kg còn L đồng: mỗi ki-lô-gam giá bao nhiêu. */
function taskUnitPrice() {
  const FRUIT = [['xoài', '🥭'], ['cam', '🍊'], ['nho', '🍇'], ['táo', '🍎']];
  return {
    id: 'd1money',
    make: (rng) => { const p = rng.int(18, 65) * 1000, n = rng.int(2, 5), L = rng.int(1, 30) * 1000; return { p, n, L, M: Math.ceil((p * n + L) / 10000) * 10000, i: rng.int(0, 3) }; },
    async mount(f, { p, n, M, i }) {
      const L = M - p * n, [name, ic] = FRUIT[i];
      f.q.innerHTML = `<span style="font-size:1.5em">${ic.repeat(n)}</span><br>Cô Lan có <b>${fmt(M)} đồng</b>. Mua <b>${n} kg ${name}</b> thì còn <b>${fmt(L)} đồng</b>. Mỗi ki-lô-gam ${name} giá ${BOX} đồng`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: p, max: 6, say: `Cô Lan có ${R(M)} đồng. Mua ${n} ki-lô-gam ${name} thì còn ${R(L)} đồng. Mỗi ki-lô-gam ${name} giá bao nhiêu tiền?`,
        hint: `Tiền mua ${name}: ${fmt(M)} − ${fmt(L)} = ${fmt(M - L)} đồng, rồi chia cho ${n}.` });
      f.finish({ ok: `(${fmt(M)} − ${fmt(L)}) : ${n} = ${fmt(p)} đồng.` });
    },
  };
}

/** Ba xe tải ghi phép chia (tổng cân nặng, kg); xe nào qua được cầu tối đa 20 tấn. */
function taskTrucks() {
  return {
    id: 'd1truck',
    make: (rng) => {
      const mk = (lo, hi) => { for (;;) { const d = rng.int(2, 9), v = rng.int(lo, hi); if (v * d <= 999999) return { D: v * d, d }; } };
      const ok = mk(15000, 19950), bad = [mk(20050, 23999), mk(20050, 25999)];
      const all = rng.shuffle([ok, ...bad]);
      return { trucks: all, ok: all.indexOf(ok) };
    },
    async mount(f, { trucks, ok }) {
      injectStyles();
      f.q.innerHTML = 'Biển cầu: tối đa <b>20 tấn</b>. Xe nào đi qua được cầu?<small>Phép tính trên xe là tổng cân nặng (kg) của xe và hàng.</small>';
      const COL = ['#60A5FA', '#4ADE80', '#FACC15'];
      await f.choose({
        options: trucks.map((x, i) => ({ html: `<span class="g4c2-truck">${truckSvg(COL[i])}</span><span>${fmt(x.D)} : ${x.d}</span>`, value: i })),
        answer: ok, cls: 'g4c2-tbtn', say: 'Những xe nặng hơn 20 tấn không được đi qua cầu. Xe nào đi qua được cầu?',
        hint: (i) => `${fmt(trucks[i].D)} : ${trucks[i].d} = ${fmt(trucks[i].D / trucks[i].d)} kg, nặng hơn 20 000 kg.`,
      });
      const x = trucks[ok];
      f.finish({ ok: `${fmt(x.D)} : ${x.d} = ${fmt(x.D / x.d)} kg, nhẹ hơn 20 tấn = 20 000 kg.` });
    },
  };
}
const truckSvg = (c) => `<svg viewBox="0 0 160 80" aria-hidden="true"><rect x="40" y="10" width="112" height="48" rx="4" fill="#fff" stroke="${INK}" stroke-width="4"/>
  <path d="M6 58 V34 L18 20 H40 V58 Z" fill="${c}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><rect x="14" y="26" width="16" height="12" rx="2" fill="#E0F2FE" stroke="${INK}" stroke-width="3"/>
  <g fill="#475569" stroke="${INK}" stroke-width="3"><circle cx="26" cy="64" r="10"/><circle cx="96" cy="64" r="10"/><circle cx="126" cy="64" r="10"/></g></svg>`;

/** Chia thành n phần bằng nhau, cho đi một phần: còn lại bao nhiêu. */
function taskShare() {
  return {
    id: 'd1part',
    make: (rng) => { const n = rng.int(3, 8); return { n, T: n * rng.int(12, 90) * 1000 }; },
    async mount(f, { n, T }) {
      const one = T / n, ans = T - one;
      f.q.innerHTML = `A-li-ba-ba có <b>${fmt(T)} đồng</b> tiền vàng, chia thành <b>${n} phần bằng nhau</b> rồi lấy một phần cho người dân nghèo. A-li-ba-ba còn lại:`;
      await f.choose({ options: numOpts(ans, [one, T - 2 * one, T + one]).map(o => ({ ...o, html: `${o.html} đồng` })), answer: ans,
        say: `A-li-ba-ba có ${R(T)} đồng tiền vàng, chia thành ${n} phần bằng nhau rồi lấy một phần cho người dân nghèo. A-li-ba-ba còn lại bao nhiêu?`,
        hint: `Một phần: ${fmt(T)} : ${n} = ${fmt(one)} đồng. Còn lại là ${fmt(T)} trừ một phần.` });
      f.finish({ ok: `${fmt(T)} − ${fmt(T)} : ${n} = ${fmt(ans)} đồng.` });
    },
  };
}

// ═══ Bài 41: Nhân, chia với 10, 100, 1 000 ═══════════════════════════════════════════════════════════
/** Em bấm nút op trên bảng hàng (chỉ nút đó sáng), chờ kết quả `want`. */
async function shiftOnce(c, t, op, want, say) {
  t.enable([op]);
  const btn = t.btn(op);
  btn.classList.add('g4-tapme');
  await c.until(t, () => t.value === want, { nudge: say, el: btn });
  btn.classList.remove('g4-tapme');
  t.enable([]); // chờ thầy nói xong, không bấm lung tung làm lệch số
}

const B41 = {
  explore: {
    setup: (board) => createShift(board, 36),
    steps: [
      async (c) => {
        const t = c.t;
        t.enable([]);
        t.eq('36 × 10 = ?');
        await c.say('Có 10 dây cờ, mỗi dây có 36 lá cờ. Có tất cả bao nhiêu lá cờ? Ta tính 36 nhân 10.', '10 dây, mỗi dây 36 lá: <b>36 × 10</b>');
        await c.say('36 nhân 10 bằng 10 nhân 36. Nhẩm: 1 chục nhân 36 bằng 36 chục, tức là 360.', '1 chục × 36 = <b>36 chục</b> = 360');
        c.show('Bấm <b>× 10</b> xem các chữ số đi đâu.');
        await shiftOnce(c, t, '*10', 360, 'Bấm nút nhân 10.');
        t.eq('36 × 10 = <b>360</b>');
        await c.say('Các chữ số lùi sang trái một hàng: 3 chục thành 3 trăm, 6 đơn vị thành 6 chục. Hàng đơn vị thêm chữ số 0. Vậy 36 nhân 10 bằng 360.',
          'Thêm <b>một chữ số 0</b> bên phải: 36 × 10 = 360');
      },
      async (c) => {
        const t = c.use((b) => createShift(b, 360));
        t.enable([]);
        t.eq('360 : 10 = ?');
        await c.say('Ngược lại, từ 36 nhân 10 bằng 360, ta có 360 chia 10 bằng 36. Bấm chia 10.', 'Ngược lại: <b>360 : 10</b>');
        await shiftOnce(c, t, ':10', 36, 'Bấm nút chia 10.');
        t.eq('360 : 10 = <b>36</b>');
        await c.say('Chữ số 0 ở hàng đơn vị bỏ đi, các chữ số lùi sang phải một hàng. 360 chia 10 bằng 36.', 'Bỏ <b>một chữ số 0</b>: 360 : 10 = 36');
      },
      async (c) => {
        const t = c.use((b) => createShift(b, 36));
        t.enable([]);
        t.eq('36 × 100 = ?');
        await c.say('36 nhân 100 bằng 36 nhân 10 nhân 10, tức là 360 nhân 10, bằng 3 600. Bấm nhân 100.', '36 × 100 = 36 × 10 × 10 = 360 × 10');
        await shiftOnce(c, t, '*100', 3600, 'Bấm nút nhân 100.');
        t.eq('36 × 100 = <b>3 600</b>');
        await c.say('Nhân 100: các chữ số lùi sang trái hai hàng, thêm hai chữ số 0. Ngược lại, 3 600 chia 100 bằng 36. Bấm chia 100.', 'Ngược lại: <b>3 600 : 100</b>');
        t.eq('3 600 : 100 = ?');
        await shiftOnce(c, t, ':100', 36, 'Bấm nút chia 100.');
        t.eq('3 600 : 100 = <b>36</b>');
      },
      async (c) => {
        const t = c.use((b) => createShift(b, 36));
        t.enable([]);
        t.eq('36 × 1 000 = ?');
        await c.say('Tương tự, 36 nhân 1 000 thì sao? Bấm nhân 1 000.', 'Tương tự: <b>36 × 1 000</b>');
        await shiftOnce(c, t, '*1000', 36000, 'Bấm nút nhân 1 000.');
        t.eq('36 × 1 000 = <b>36 000</b>');
        await c.say('36 nhân 1 000 bằng 36 000: thêm ba chữ số 0. Ngược lại, 36 000 chia 1 000 bằng 36.', 'Ngược lại: <b>36 000 : 1 000</b>');
        t.eq('36 000 : 1 000 = ?');
        await shiftOnce(c, t, ':1000', 36, 'Bấm nút chia 1 000.');
        t.eq('36 000 : 1 000 = <b>36</b>');
      },
      async (c) => {
        const t = c.use((b) => createShift(b, 36));
        t.enable([]);
        t.showOps(false);
        await c.say('Khi nhân một số tự nhiên với 10, 100, 1 000, ta viết thêm một, hai, ba chữ số 0 vào bên phải số đó.', 'Nhân với 10, 100, 1 000: <b>thêm</b> 1, 2, 3 chữ số 0');
        t.set(470); t.eq('470 : 10 = ?');
        await c.say('Khi chia số tròn chục, tròn trăm, tròn nghìn cho 10, 100, 1 000, ta bỏ bớt đi một, hai, ba chữ số 0 ở bên phải số đó. Em tính nhẩm 470 chia 10.',
          'Chia cho 10, 100, 1 000: <b>bỏ bớt</b> 1, 2, 3 chữ số 0');
        await c.choose(numOpts(47, [4700, 407]), 47, { hint: 'Chia 10: bỏ bớt một chữ số 0 ở bên phải.' });
        await t.apply(':10');
        t.eq('470 : 10 = <b>47</b>');
        t.set(35); t.eq('35 × 100 = ?');
        await c.say('Còn 35 nhân 100?', '35 × 100 = ?');
        await c.choose(numOpts(3500, [350, 35000]), 3500, { hint: 'Nhân 100: thêm hai chữ số 0.' });
        await t.apply('*100');
        t.eq('35 × 100 = <b>3 500</b>');
        await c.say('Đúng rồi. 35 nhân 100 bằng 3 500.');
      },
    ],
  },
  tasks: () => styled2([taskShiftMul(), taskShiftDiv(), taskFindDividend(), taskFindDivisor(), taskMassUnit(), taskTimesTen(), taskShiftWord()]),
};

/** Bảng hàng ở Thực hành (không có nút), hiện số n. */
const shiftTool = (f, n) => createShift(f.tool, n, { ops: false, eq: false });

function taskShiftMul() {
  return {
    id: 'sh-mul',
    make: (rng) => { const k = rng.int(1, 3); const a = rng.int(k === 3 ? 12 : 11, k === 3 ? 6999 : 9999); return { a, k }; },
    async mount(f, { a, k }) {
      const ans = a * 10 ** k;
      f.q.innerHTML = `Tính nhẩm: <b>${fmt(a)} × ${P10[k]} = ${BOX}</b>`;
      const t = shiftTool(f, a);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len(ans) + 1, say: `Tính nhẩm ${R(a)} nhân ${P10R[k]}.`, hint: `Nhân với ${P10[k]}: viết thêm ${ZR[k]} chữ số 0 vào bên phải.` });
      await t.apply(`*${P10[k].replace(' ', '')}`);
      f.finish({ ok: `${fmt(a)} × ${P10[k]} = ${fmt(ans)}: thêm ${ZR[k]} chữ số 0.` });
    },
  };
}

function taskShiftDiv() {
  return {
    id: 'sh-div',
    make: (rng) => { const k = rng.int(1, 3); let b; do b = rng.int(11, k === 1 ? 99999 : 9999); while (b % 10 === 0); return { b, k, extra: rng.int(0, 1) && k < 3 ? 1 : 0 }; },
    async mount(f, { b, k, extra }) {
      const n = b * 10 ** (k + extra), ans = n / 10 ** k;
      f.q.innerHTML = `Tính nhẩm: <b>${fmt(n)} : ${P10[k]} = ${BOX}</b>`;
      const t = shiftTool(f, n);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len(ans) + 1, say: `Tính nhẩm ${R(n)} chia ${P10R[k]}.`, hint: `Chia cho ${P10[k]}: bỏ bớt ${ZR[k]} chữ số 0 ở bên phải.` });
      await t.apply(`:${P10[k].replace(' ', '')}`);
      f.finish({ ok: `${fmt(n)} : ${P10[k]} = ${fmt(ans)}: bỏ bớt ${ZR[k]} chữ số 0.` });
    },
  };
}

/** Tìm số bị chia: ? : 35 = 1 000 (lấy thương nhân số chia). */
function taskFindDividend() {
  return {
    id: 'sh-findD',
    make: (rng) => ({ d: rng.pick([rng.int(12, 99), rng.int(11, 99) * 10, rng.int(101, 999)]), k: rng.int(1, 3) }),
    async mount(f, { d, k }) {
      const D = d * 10 ** k;
      f.q.innerHTML = `<b>${BOX} : ${fmt(d)} = ${P10[k]}</b><small>Số bị chia · số chia · thương</small>`;
      const t = shiftTool(f, d);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: D, max: len(D) + 1, say: `Số nào chia cho ${R(d)} được ${P10R[k]}?`,
        hint: `Số bị chia bằng thương nhân số chia: ${fmt(d)} × ${P10[k]}.` });
      await t.apply(`*${P10[k].replace(' ', '')}`);
      f.finish({ ok: `${fmt(D)} : ${fmt(d)} = ${P10[k]}, vì ${fmt(d)} × ${P10[k]} = ${fmt(D)}.` });
    },
  };
}

/** Tìm số chia: 57 000 : ? = 1 000 (chọn 10, 100, 1 000). */
function taskFindDivisor() {
  return {
    id: 'sh-findd',
    make: (rng) => { let q; do q = rng.int(11, 999); while (q % 10 === 0); return { q, k: rng.int(1, 3), flip: rng.int(0, 1) }; },
    async mount(f, { q, k, flip }) {
      // flip: thương là q, số chia cần tìm là 10^k; không flip: thương là 10^k, số chia cần tìm là q
      const D = q * 10 ** k;
      const ans = flip ? 10 ** k : q, shownQ = flip ? q : 10 ** k;
      f.q.innerHTML = `<b>${fmt(D)} : ${BOX} = ${fmt(shownQ)}</b>`;
      const t = shiftTool(f, D);
      const opts = flip ? [10, 100, 1000] : numOpts(q, [q * 10, Math.max(1, Math.floor(q / 10))]).map(o => o.value);
      await f.choose({ options: opts.map(v => ({ html: fmt(v), value: v })), answer: ans, say: `${R(D)} chia cho số nào thì được ${R(shownQ)}?`,
        hint: flip ? `${fmt(D)} còn ${fmt(q)}: bỏ bớt ${ZR[k]} chữ số 0.` : `Số chia bằng số bị chia chia cho thương: ${fmt(D)} : ${fmt(shownQ)}.` });
      const box = f.q.querySelector('.g4-box');
      box.textContent = fmt(ans); box.classList.add('g4-box-ok');
      await t.apply(`:${P10[k].replace(' ', '')}`);
      f.finish({ ok: `${fmt(D)} : ${fmt(ans)} = ${fmt(shownQ)}` });
    },
  };
}

/** Đổi đơn vị đo khối lượng bằng chia cho 10, 100, 1 000: 500 kg = ? tạ. */
function taskMassUnit() {
  const PAIRS = [['kg', 'yến', 1], ['kg', 'tạ', 2], ['kg', 'tấn', 3], ['yến', 'tạ', 1], ['yến', 'tấn', 2], ['tạ', 'tấn', 1]];
  return {
    id: 'sh-unit',
    make: (rng) => ({ p: rng.int(0, PAIRS.length - 1), x: rng.int(2, 60) }),
    async mount(f, { p, x }) {
      const [u1, u2, k] = PAIRS[p], n = x * 10 ** k;
      f.q.innerHTML = `<b>${fmt(n)} ${u1} = ${BOX} ${u2}</b><small>1 ${u2} = ${fmt(10 ** k)} ${u1}</small>`;
      const t = shiftTool(f, n);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: x, max: 3, say: `${R(n)} ${u1} bằng bao nhiêu ${u2}?`, hint: `1 ${u2} bằng ${fmt(10 ** k)} ${u1}: lấy ${fmt(n)} chia ${P10[k]}.` });
      await t.apply(`:${P10[k].replace(' ', '')}`);
      f.finish({ ok: `${fmt(n)} ${u1} = ${x} ${u2}` });
    },
  };
}

/** Tính thuận tiện: a × 5 × 2 = a × 10. */
function taskTimesTen() {
  const FORMS = [(a) => `${fmt(a)} × 5 × 2`, (a) => `5 × 2 × ${fmt(a)}`, (a) => `2 × ${fmt(a)} × 5`, (a) => `5 × ${fmt(a)} × 2`, (a) => `${fmt(a)} × 2 × 50`, (a) => `25 × ${fmt(a)} × 4`];
  return {
    id: 'sh-conv',
    make: (rng) => ({ a: rng.int(101, 39999), k: rng.int(0, FORMS.length - 1) }),
    async mount(f, { a, k }) {
      const m = k === 4 ? 100 : k === 5 ? 100 : 10, ans = a * m;
      f.q.innerHTML = `Tính bằng cách thuận tiện:<br><b>${FORMS[k](a)} = ${BOX}</b>`;
      const t = shiftTool(f, a);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len(ans) + 1, say: 'Tính bằng cách thuận tiện.',
        hint: k === 4 ? '2 × 50 = 100, nhân 100 thì thêm hai chữ số 0.' : k === 5 ? '25 × 4 = 100, nhân 100 thì thêm hai chữ số 0.' : '5 × 2 = 10, nhân 10 thì thêm một chữ số 0.' });
      await t.apply(m === 10 ? '*10' : '*100');
      f.finish({ ok: `${FORMS[k](a)} = ${fmt(a)} × ${m} = ${fmt(ans)}` });
    },
  };
}

/** Bài toán: chạy 10 vòng sân, hội trường 10 hàng ghế hai bên lối đi, cột đèn cứ 10 m một cột. */
function taskShiftWord() {
  return {
    id: 'sh-word',
    make: (rng) => {
      const k = rng.int(0, 2);
      if (k === 0) return { k, x: rng.int(21, 99) * 5, n: rng.pick([10, 100]) };
      if (k === 1) return { k, x: rng.int(5, 12), n: 10 };
      return { k, x: rng.int(2, 12) * 100, n: 10 };
    },
    async mount(f, { k, x, n }) {
      let text, ans, unit, hint, spoken, start;
      if (k === 0) { ans = x * n; unit = 'm'; start = x; text = `Rô-bốt chạy <b>${n} vòng</b> quanh sân, mỗi vòng dài <b>${x} m</b>. Rô-bốt đã chạy`; hint = `${x} × ${n}: thêm ${n === 10 ? 'một' : 'hai'} chữ số 0.`; spoken = `Rô-bốt chạy ${n} vòng quanh sân, mỗi vòng ${x} mét. Rô-bốt đã chạy bao nhiêu mét?`; }
      else if (k === 1) { ans = x * 2 * 10; unit = 'chỗ ngồi'; start = x * 2; text = `Hội trường có <b>10 hàng ghế</b>. Mỗi hàng có hai bên lối đi, mỗi bên <b>${x} chỗ</b>. Hội trường có`; hint = `Mỗi hàng có ${x} × 2 = ${x * 2} chỗ. 10 hàng: ${x * 2} × 10.`; spoken = `Hội trường có 10 hàng ghế, mỗi hàng hai bên lối đi, mỗi bên ${x} chỗ ngồi. Hội trường có tất cả bao nhiêu chỗ ngồi?`; }
      else { ans = x / 10 + 1; unit = 'cột đèn'; start = x; text = `Đoạn đường dài <b>${fmt(x)} m</b>, cứ <b>10 m</b> có một cột đèn, cả hai đầu đường đều có cột. Có tất cả`; hint = `${fmt(x)} : 10 = ${x / 10} khoảng. Số cột nhiều hơn số khoảng 1.`; spoken = `Đoạn đường dài ${x} mét, cứ 10 mét có một cột đèn, hai đầu đều có cột. Có tất cả bao nhiêu cột đèn?`; }
      f.q.innerHTML = `${text} ${BOX} ${unit}`;
      const t = shiftTool(f, start);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len(ans) + 1, say: spoken, hint });
      if (k === 2) await t.apply(':10'); else await t.apply(n === 100 ? '*100' : '*10');
      f.finish({ ok: `Đáp số: ${fmt(ans)} ${unit}.` });
    },
  };
}

// ═══ Bài 43: Nhân với số có hai chữ số ══════════════════════════════════════════════════════════════
/** Xe buýt nhỏ (Khám phá Bài 43). */
const bus = (x, y, c) => `<g class="g4c2-bus"><g transform="translate(${x} ${y})"><rect x="0" y="0" width="70" height="40" rx="8" fill="${c}" stroke="${INK}" stroke-width="3"/>
  <rect x="8" y="7" width="15" height="12" rx="2" fill="#E0F2FE"/><rect x="28" y="7" width="15" height="12" rx="2" fill="#E0F2FE"/><rect x="48" y="7" width="15" height="12" rx="2" fill="#E0F2FE"/>
  <circle cx="16" cy="42" r="7" fill="#475569" stroke="${INK}" stroke-width="2.5"/><circle cx="54" cy="42" r="7" fill="#475569" stroke="${INK}" stroke-width="2.5"/>
  <text x="35" y="34" font-size="15" font-weight="800" text-anchor="middle" fill="${INK}" font-family="Baloo 2, sans-serif">34</text></g></g>`;

const B43 = {
  explore: {
    setup: (board) => createCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        let g = '';
        for (let i = 0; i < 10; i++) g += bus(30 + i * 94, 20, '#60A5FA');
        for (let i = 0; i < 2; i++) g += bus(30 + i * 94, 92, '#FB923C');
        g += `<text x="966" y="128" class="g4v-t" font-size="34" style="text-anchor:end" fill="#1D4ED8">10 xe xanh</text>`;
        g += `<text x="226" y="128" class="g4v-t" font-size="34" style="text-anchor:start" fill="#C2410C">2 xe cam</text>`;
        const L = ['34 × 12 = 34 × (10 + 2)', '= 34 × 10 + 34 × 2', '= 340 + 68', '= 408'];
        g += L.map((s, i) => `<text class="g4c2-eq" data-l="${i}" x="${i ? 420 : 140}" y="${215 + i * 62}" font-size="52" font-weight="800" fill="#1E293B" font-family="Baloo 2, sans-serif" opacity="0">${s}</text>`).join('');
        t.draw(g);
        t.caption('Mỗi ô tô chở <b>34</b> học sinh. <b>12</b> ô tô?');
        t.anim('.g4c2-bus', [{ opacity: 0 }, { opacity: 1 }], 300, { stagger: 60 }); await c.sleep(500); // không chờ .finished (máy tắt hiệu ứng)
        const line = (i) => { const e = t.q(`[data-l="${i}"]`); e.setAttribute('opacity', 1); t.anim(e, [{ opacity: 0 }, { opacity: 1 }], 350); return c.sleep(400); };
        await c.say('Mỗi ô tô chở 34 học sinh. 12 ô tô như thế chở bao nhiêu học sinh? Ta tính 34 nhân 12. 12 xe gồm 10 xe và 2 xe.', '<b>34 × 12</b> = 34 × (10 + 2)');
        await line(0); await line(1);
        await c.say('34 nhân 12 bằng 34 nhân 10, cộng 34 nhân 2. 10 xe chở bao nhiêu học sinh?', '10 xe: 34 × 10 = ?');
        await c.choose(numOpts(340, [44, 3400]), 340, { hint: 'Nhân với 10: thêm một chữ số 0 vào bên phải.' });
        c.show('2 xe: 34 × 2 = ?');
        await c.choose(numOpts(68, [36, 64]), 68, { hint: '34 nhân 2: 2 nhân 4 bằng 8, 2 nhân 3 bằng 6.' });
        await line(2);
        c.show('340 + 68 = ?');
        await c.choose(numOpts(408, [398, 418]), 408, { hint: '340 cộng 68.' });
        await line(3);
        await c.say('34 nhân 12 bằng 340 cộng 68, bằng 408.', '34 × 12 = 340 + 68 = <b>408</b>');
      },
      async (c) => {
        const t = c.use((b) => createLongMul(b, 34, 12));
        await c.say('Thông thường, ta đặt tính rồi tính như sau. Nhân lần lượt với từng chữ số của 12, bắt đầu từ hàng đơn vị.', 'Đặt tính: <b>34 × 12</b>');
        await runLongMul(c, t, { demoParts: 1 });
        await c.say('Vậy 34 nhân 12 bằng 408.', '34 × 12 = <b>408</b>');
      },
      async (c) => {
        await c.say('Lưu ý: 68 là tích riêng thứ nhất, là 68 đơn vị. 34 là tích riêng thứ hai, là 34 chục hay 340 đơn vị. Vì vậy tích riêng thứ hai viết lùi sang trái một cột.',
          '<span style="color:#2563EB">68</span>: tích riêng thứ nhất · <span style="color:#DC2626">34</span> chục = 340: viết <b>lùi một cột</b>');
        await c.say('Cộng hai tích riêng: 68 cộng 340 bằng 408, đúng như cách tính 340 cộng 68 ở trên.');
      },
      async (c) => {
        const t = c.use((b) => createLongMul(b, 87, 23));
        await c.say('Đến lượt em: đặt tính rồi tính 87 nhân 23. Thầy làm tích riêng thứ nhất, em làm tiếp.', 'Em tính: <b>87 × 23</b>');
        await runLongMul(c, t, { demoParts: 1 });
        await c.say('87 nhân 23 bằng 2 001. Giỏi lắm!', '87 × 23 = <b>2 001</b>');
      },
    ],
  },
  tasks: () => styled2([
    stageTask('m2col', MUL_GAME, (rng) => {
      for (;;) { const b = rng.int(12, 98), a = rng.pick([rng.int(13, 98), rng.int(102, 999), rng.int(1012, 2999)]); if (b % 10 && !/0/.test(String(b))) return { a, b }; }
    }),
    taskPickProduct(), taskTens(), taskMulDS2(), taskChain(), taskMulWord2(),
  ]),
};

/** Chọn kết quả thích hợp cho phép tính (áo ↔ mũ). */
function taskPickProduct() {
  return {
    id: 'm2pick',
    make: (rng) => {
      for (;;) {
        const ex = [0, 1, 2].map(() => [rng.int(12, 49), rng.int(12, 19)]);
        const res = ex.map(([a, b]) => a * b);
        if (new Set(res).size === 3 && Math.max(...res) - Math.min(...res) < 400) return { ex, k: rng.int(0, 2) };
      }
    },
    async mount(f, { ex, k }) {
      const [a, b] = ex[k];
      f.q.innerHTML = `<span style="font-size:1.2em">👕 <b>${a} × ${b}</b></span><br>Chọn mũ có kết quả đúng:`;
      await f.choose({ options: ex.map(([x, y]) => ({ html: `🧢 ${fmt(x * y)}`, value: x * y })).sort((p, q) => p.value - q.value), answer: a * b,
        say: `Chiếc áo ghi ${a} nhân ${b}. Chọn chiếc mũ có kết quả đúng.`, hint: (v) => `${fmt(v)} là kết quả của phép tính khác. Thử: ${a} × ${b % 10} = ${a * (b % 10)}, ${a} × ${Math.floor(b / 10)} chục = ${a * Math.floor(b / 10) * 10}.` });
      f.finish({ ok: `${a} × ${b} = ${fmt(a * b)}` });
    },
  };
}

/** Nhân với số tròn chục: 24 × 30 = (24 × 3) × 10; 130 × 20 = (13 × 2) × 100. */
function taskTens() {
  return {
    id: 'm2tens',
    make: (rng) => {
      const k = rng.int(0, 2), m = rng.int(2, 9);
      if (k === 0) return { k, a: rng.int(12, 99), m };
      if (k === 1) { let a; do a = rng.int(11, 99); while (a % 10 === 0); return { k, a: a * 10, m }; }
      let a; do a = rng.int(11, 59); while (a % 10 === 0); return { k, a: a * 100, m };
    },
    async mount(f, { k, a, m }) {
      const b = m * 10, ans = a * b, base = k === 0 ? a : k === 1 ? a / 10 : a / 100, zeros = k === 0 ? 1 : k === 1 ? 2 : 3;
      const mau = k === 0 ? `(${a} × ${m}) × 10` : `(${base} × ${m}) × ${P10[zeros]}`;
      f.q.innerHTML = `Tính: <b>${fmt(a)} × ${b} = ${BOX}</b><small>Mẫu: ${fmt(a)} × ${b} = ${mau}</small>`;
      const t = createShift(f.tool, base * m, { ops: false, eq: false });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len(ans) + 1, say: `Tính ${R(a)} nhân ${b}.`, hint: `${base} × ${m} = ${base * m}, rồi thêm ${ZR[zeros]} chữ số 0.` });
      await t.apply(`*${P10[zeros].replace(' ', '')}`);
      f.finish({ ok: `${fmt(a)} × ${b} = ${mau} = ${fmt(ans)}` });
    },
  };
}

/** Đ/S: hai tích riêng đặt thẳng cột (sai) hay lùi một cột (đúng). */
function taskMulDS2() {
  return {
    id: 'm2ds',
    make: (rng) => ({ a: rng.int(12, 89), b: rng.pick([11, rng.int(12, 39)]), ok: rng() < 0.5 }),
    async mount(f, { a, b, ok }) {
      const p0 = a * (b % 10), p1 = a * Math.floor(b / 10);
      const res = ok ? a * b : p0 + p1;
      f.q.innerHTML = 'Đúng hay sai?';
      f.tool.innerHTML = staticCol([{ v: a }, { v: b, sign: '×', line: true }, { v: p0, cls: 'g4c2-blue' }, { v: p1, shift: ok ? 1 : 0, sign: '+', line: true, cls: 'g4c2-red' }, { v: res }]);
      await f.choose({ options: DS, answer: ok, cls: 'g4-choice-big', say: `Đặt tính ${a} nhân ${b} được ${R(res)}. Đúng hay sai?`,
        hint: 'Tích riêng thứ hai phải viết lùi sang trái một cột so với tích riêng thứ nhất.' });
      if (!ok) {
        f.tool.innerHTML = staticCol([{ v: a }, { v: b, sign: '×', line: true }, { v: p0, cls: 'g4c2-blue' }, { v: p1, shift: 1, sign: '+', line: true, cls: 'g4c2-red' }, { v: a * b, cls: 'g4c2-ok' }]);
        f.tool.querySelectorAll('.g4c2-red, .g4c2-ok').forEach((e, i) => e.animate([{ opacity: 0, transform: 'translateX(40%)' }, { opacity: 1, transform: 'none' }], { duration: 350, delay: i * 40, fill: 'both' }));
      }
      f.finish({ ok: ok ? `Đúng: ${a} × ${b} = ${fmt(a * b)}.` : `Sai: tích riêng thứ hai phải lùi một cột. ${a} × ${b} = ${fmt(a * b)}.` });
    },
  };
}

/** Chuỗi phép tính: x, nhân b được ?, trừ c được ? */
function taskChain() {
  return {
    id: 'm2chain',
    make: (rng) => { const x = rng.int(21, 89), b = rng.int(11, 29); const p = x * b; return { x, b, c: rng.int(101, p - 50) }; },
    async mount(f, { x, b, c }) {
      injectStyles();
      const p = x * b, r = p - c;
      f.q.innerHTML = 'Số?';
      f.tool.innerHTML = `<div class="g4c2-chain"><span class="g4c2-ch g4c2-ch-c">${x}</span><span class="g4c2-ar"><i>× ${b}</i></span>
        <span class="g4c2-ch g4c2-ch-s"><span class="g4-box"></span></span><span class="g4c2-ar"><i>− ${c}</i></span><span class="g4c2-ch g4c2-ch-t"><span class="g4-box"></span></span></div>`;
      const [b1, b2] = f.tool.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: p, max: len(p) + 1, say: `${x} nhân ${b} được bao nhiêu? Rồi trừ ${c}.`, hint: `Đặt tính ${x} × ${b}: hai tích riêng, tích riêng thứ hai lùi một cột.` });
      await f.ask({ box: b2, answer: r, max: len(r) + 1, hint: `${fmt(p)} − ${c}.` });
      f.finish({ ok: `${x} × ${b} = ${fmt(p)}; ${fmt(p)} − ${c} = ${fmt(r)}` });
    },
  };
}

/** Bài toán nhân với số có hai chữ số: bao ngô, diện tích hình chữ nhật, hai hộp kẹo, bán hoa quả. */
function taskMulWord2() {
  return {
    id: 'm2word',
    make: (rng) => {
      const k = rng.int(0, 3);
      if (k === 0) return { k, a: rng.int(12, 39), b: rng.int(25, 60) };
      if (k === 1) { const a = rng.int(21, 60); return { k, a, b: rng.int(12, a - 5), u: rng.pick(['cm', 'm']) }; }
      if (k === 2) { for (;;) { const a = rng.int(12, 25), b = rng.int(15, 30), c = rng.int(12, 25), d = rng.int(15, 30); if (a * b !== c * d) return { k, a, b, c, d }; } }
      return { k, a: rng.int(11, 25), b: rng.int(20, 40) * 1000, c: rng.int(11, 25), d: rng.int(15, 35) * 1000 };
    },
    async mount(f, { k, a, b, c, d, u }) {
      let text, ans, unit, hint, spoken;
      if (k === 0) { ans = a * b; unit = 'kg'; text = `Cửa hàng có <b>${a} bao ngô</b>, mỗi bao nặng <b>${b} kg</b>. Có tất cả`; hint = `${a} × ${b}.`; spoken = `Cửa hàng có ${a} bao ngô, mỗi bao nặng ${b} ki-lô-gam. Cửa hàng có tất cả bao nhiêu ki-lô-gam ngô?`; }
      else if (k === 1) { ans = a * b; unit = `${u}²`; text = `Hình chữ nhật dài <b>${a} ${u}</b>, rộng <b>${b} ${u}</b>. Diện tích S = a × b =`; hint = `S = ${a} × ${b}.`; spoken = `Tính diện tích hình chữ nhật dài ${a} ${u === 'm' ? 'mét' : 'xăng-ti-mét'}, rộng ${b} ${u === 'm' ? 'mét' : 'xăng-ti-mét'}.`; }
      else if (k === 2) { ans = Math.abs(a * b - c * d); unit = 'cái kẹo'; text = `Hộp A: <b>${a} gói</b>, mỗi gói <b>${b} cái</b>. Hộp B: <b>${c} gói</b>, mỗi gói <b>${d} cái</b>. Hai hộp hơn kém nhau`; hint = `Hộp A: ${a} × ${b} = ${a * b}. Hộp B: ${c} × ${d} = ${c * d}. Lấy số lớn trừ số bé.`; spoken = 'Số kẹo ở hai hộp hơn kém nhau bao nhiêu cái?'; }
      else { ans = a * b + c * d; unit = 'đồng'; text = `Bán <b>${a} kg xoài</b> giá <b>${fmt(b)} đồng</b>/kg và <b>${c} kg cam</b> giá <b>${fmt(d)} đồng</b>/kg. Được tất cả`; hint = `Xoài: ${a} × ${fmt(b)} = ${fmt(a * b)}. Cam: ${c} × ${fmt(d)} = ${fmt(c * d)}. Cộng lại.`; spoken = 'Cửa hàng bán xoài và cam được bao nhiêu tiền?'; }
      f.q.innerHTML = `${text} ${BOX} ${unit}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len(ans) + 1, say: spoken, hint });
      f.finish({ ok: `Đáp số: ${fmt(ans)} ${unit}.` });
    },
  };
}

// ═══ Bài 44: Chia cho số có hai chữ số ══════════════════════════════════════════════════════════════
const B44 = {
  explore: {
    setup: (board) => createLongDiv(board, 216, 12),
    steps: [
      async (c) => {
        await c.say('Xếp đều 216 khách du lịch lên 12 thuyền. Hỏi mỗi thuyền có bao nhiêu khách du lịch?', '<b>216</b> khách, xếp đều lên <b>12</b> thuyền');
        c.show('Em chọn phép tính:');
        await c.choose(opPick(216, 12), ':', { hint: 'Xếp đều: chia 216 thành 12 phần bằng nhau.' });
        await c.say('Ta đặt tính rồi tính 216 chia 12. Chia từ trái sang phải, mỗi lượt: chia, nhân, trừ, rồi hạ.', 'Đặt tính: <b>216 : 12</b>');
      },
      async (c) => { await runLongDiv(c, c.t, { demoRounds: 1, tapFrom: 1 }); },
      async (c) => {
        await c.say('Vậy 216 chia 12 bằng 18. Mỗi thuyền có 18 khách du lịch.', '216 : 12 = <b>18</b>');
        await c.say('Mẹo ước lượng thương: 96 chia 12, bỏ chữ số cuối của hai số, nhẩm 9 chia 1 được 9. Thử 9 nhân 12 bằng 108, lớn hơn 96, nên giảm còn 8.',
          '96 : 12 → nhẩm 9 : 1 = 9 → 9 × 12 = 108 > 96 → <b>8</b>');
      },
      async (c) => {
        const t = c.use((b) => createLongDiv(b, 218, 18));
        await c.say('Xếp 218 áo phao lên các thuyền, mỗi thuyền 18 áo phao. Xếp được nhiều nhất bao nhiêu thuyền và còn thừa mấy áo phao? Ta tính 218 chia 18. Em làm từng bước.',
          '<b>218 : 18</b> = ?');
        await runLongDiv(c, t, { demoRounds: 0, tapFrom: 1 });
      },
      async (c) => {
        await c.say('218 chia 18 được 12, dư 2. Xếp được nhiều nhất 12 thuyền và còn thừa 2 áo phao.', '218 : 18 = <b>12</b> (dư 2)');
        c.show('Số dư 2 so với số chia 18:');
        await c.choose([{ html: '2 &lt; 18', value: '<' }, { html: '2 = 18', value: '=' }, { html: '2 &gt; 18', value: '>' }], '<', { hint: 'Số dư luôn bé hơn số chia.' });
        await c.say('Số dư luôn bé hơn số chia.');
      },
    ],
  },
  tasks: () => styled2([
    stageTask('d2col', DIVISION_GAME, (rng) => {
      const k = rng.int(0, 2), d = rng.int(12, 89);
      const q = k === 0 ? rng.int(12, 39) : k === 1 ? rng.int(21, 99) : rng.int(102, 899);
      return { D: q * d + (rng() < 0.5 ? 0 : rng.int(1, d - 1)), d };
    }),
    taskZeroDiv(), taskDivRem2(), taskFactor(), taskDivWord2(), taskParade(),
  ]),
};

/** Chia hai số tận cùng là chữ số 0: cùng xoá chữ số 0 rồi chia (450 : 90 = 45 : 9). */
function taskZeroDiv() {
  return {
    id: 'd2zero',
    make: (rng) => { const k = rng.int(1, 2), b = rng.int(2, 9); const q = k === 1 ? rng.int(2, 9) : rng.pick([rng.int(2, 9) * 10, rng.int(11, 99), rng.int(101, 250)]); return { k, b, q }; },
    async mount(f, { k, b, q }) {
      injectStyles();
      const d = b * 10 ** k, D = q * d;
      // viết tách lớp như sách, k chữ số 0 cuối bị gạch
      const strike = (n) => { let left = k; return [...fmt(n)].reverse().map(ch => (/\d/.test(ch) && left-- > 0 ? `<s>${ch}</s>` : ch)).reverse().join(''); };
      f.q.innerHTML = `Tính: <b>${fmt(D)} : ${fmt(d)} = ${BOX}</b>`;
      f.tool.innerHTML = `<div class="g4c2-zero"><div>${strike(D)} : ${strike(d)}</div><div class="g4c2-zero2">= ${fmt(D / 10 ** k)} : ${b}</div></div>`;
      await sleep(500);
      f.tool.querySelector('.g4c2-zero').classList.add('g4c2-zero-on');
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: q, max: len(q) + 1, say: `Tính ${R(D)} chia ${R(d)}. Cùng xoá ${ZR[k]} chữ số 0 ở tận cùng của số bị chia và số chia, rồi chia.`,
        hint: `Cùng xoá ${ZR[k]} chữ số 0: ${fmt(D / 10 ** k)} : ${b}.` });
      f.finish({ ok: `${fmt(D)} : ${fmt(d)} = ${fmt(D / 10 ** k)} : ${b} = ${fmt(q)}` });
    },
  };
}

/** Thương và số dư: 2 920 : 62 = ? (dư ?). Lời giải viết dần trên tờ đặt tính. */
function taskDivRem2() {
  return {
    id: 'd2rem',
    make: (rng) => { const d = rng.int(21, 89), q = rng.int(12, 99); return { d, D: q * d + rng.int(1, d - 1) }; },
    async mount(f, { D, d }) {
      const q = Math.floor(D / d), r = D % d;
      f.q.innerHTML = `<b>${fmt(D)} : ${d} = ${BOX}</b> (dư <b>${BOX}</b>)`;
      const t = createLongDiv(f.tool, D, d, { pad: false });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: q, max: len(q) + 1, say: `${R(D)} chia ${d} được bao nhiêu, dư bao nhiêu?`, hint: 'Đặt tính rồi chia từ trái sang phải. Ước lượng thương: bỏ chữ số cuối của số đem chia và số chia rồi nhẩm.' });
      await f.ask({ box: b2, answer: r, max: 2, hint: `${fmt(q)} × ${d} = ${fmt(q * d)}. Số dư = ${fmt(D)} − ${fmt(q * d)}, bé hơn ${d}.` });
      await autoDiv(t, 180);
      f.finish({ ok: `${fmt(D)} : ${d} = ${fmt(q)} (dư ${r})` });
    },
  };
}

/** Tìm thừa số chưa biết: 37 × ? = 1 998. */
function taskFactor() {
  return {
    id: 'd2factor',
    make: (rng) => ({ a: rng.pick([rng.int(12, 99), rng.int(101, 199)]), b: rng.int(12, 99), left: rng.int(0, 1) }),
    async mount(f, { a, b, left }) {
      const p = a * b;
      f.q.innerHTML = `<b>${left ? `${BOX} × ${b}` : `${a} × ${BOX}`} = ${fmt(p)}</b><small>Thừa số · thừa số · tích</small>`;
      const known = left ? b : a, ans = left ? a : b;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len(ans) + 1, say: `Tìm thừa số chưa biết. Tích là ${R(p)}.`, hint: `Lấy tích chia cho thừa số đã biết: ${fmt(p)} : ${known}.` });
      f.finish({ ok: `${fmt(p)} : ${known} = ${ans}` });
    },
  };
}

/** Bài toán chia cho số có hai chữ số: xếp ghế, áo phao lên thuyền (có dư), sân bóng (diện tích → chiều dài → chu vi). */
function taskDivWord2() {
  return {
    id: 'd2word',
    make: (rng) => {
      const k = rng.int(0, 2);
      if (k === 0) { const d = rng.int(12, 36); return { k, d, q: rng.int(11, 40) }; }
      if (k === 1) { const d = rng.int(12, 25); return { k, d, q: rng.int(8, 30), r: rng.int(1, d - 1) }; }
      return { k, d: rng.int(45, 75), q: rng.int(90, 120) };
    },
    async mount(f, { k, d, q, r }) {
      if (k === 0) {
        const N = q * d;
        f.q.innerHTML = `Xếp <b>${fmt(N)} cái ghế</b> vào các dãy, mỗi dãy <b>${d} ghế</b>. Xếp được ${BOX} dãy ghế`;
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: q, max: 3, say: `Xếp ${R(N)} cái ghế vào các dãy, mỗi dãy ${d} ghế. Xếp được bao nhiêu dãy ghế?`, hint: `${fmt(N)} : ${d}.` });
        f.finish({ ok: `${fmt(N)} : ${d} = ${q} dãy ghế.` });
      } else if (k === 1) {
        const N = q * d + r;
        f.q.innerHTML = `Xếp <b>${fmt(N)} áo phao</b> lên các thuyền, mỗi thuyền <b>${d} áo</b>.<div class="g4c2-lines"><span>Nhiều nhất ${BOX} thuyền</span><span>thừa ${BOX} áo phao</span></div>`;
        const [b1, b2] = f.q.querySelectorAll('.g4-box');
        await f.ask({ box: b1, answer: q, max: 3, say: `Xếp ${R(N)} áo phao lên các thuyền, mỗi thuyền ${d} áo. Xếp được nhiều nhất bao nhiêu thuyền, còn thừa mấy áo phao?`, hint: `${fmt(N)} : ${d}: thương là số thuyền.` });
        await f.ask({ box: b2, answer: r, max: 2, hint: `Số dư là số áo thừa: ${fmt(N)} − ${q} × ${d}.` });
        f.finish({ ok: `${fmt(N)} : ${d} = ${q} (dư ${r}): ${q} thuyền, thừa ${r} áo phao.` });
      } else {
        const S = q * d, P = (q + d) * 2;
        f.q.innerHTML = `Sân bóng hình chữ nhật có diện tích <b>${fmt(S)} m²</b>, chiều rộng <b>${d} m</b>.<div class="g4c2-lines"><span>Chiều dài: ${BOX} m</span><span>Chu vi: ${BOX} m</span></div>`;
        const [b1, b2] = f.q.querySelectorAll('.g4-box');
        await f.ask({ box: b1, answer: q, max: 3, say: `Sân bóng hình chữ nhật có diện tích ${R(S)} mét vuông, chiều rộng ${d} mét. Tính chiều dài, rồi tính chu vi.`, hint: `Chiều dài = diện tích : chiều rộng = ${fmt(S)} : ${d}.` });
        await f.ask({ box: b2, answer: P, max: 3, hint: `Chu vi = (dài + rộng) × 2 = (${q} + ${d}) × 2.` });
        f.finish({ ok: `Chiều dài ${q} m, chu vi (${q} + ${d}) × 2 = ${P} m.` });
      }
    },
  };
}

/** Chọn câu trả lời đúng: đội đồng diễn xếp lại hàng. */
function taskParade() {
  return {
    id: 'd2parade',
    make: (rng) => { for (;;) { const n = rng.int(12, 40), k = rng.int(12, 30), m = rng.pick([15, 20, 24, 25, 30, 35, 40]); if (m !== k && (n * k) % m === 0 && (n * k) / m !== n && (n * k) / m !== k) return { n, k, m }; } },
    async mount(f, { n, k, m }) {
      const N = n * k, ans = N / m;
      f.q.innerHTML = `Đội đồng diễn xếp <b>${n} hàng</b>, mỗi hàng <b>${k} người</b>. Nếu mỗi hàng <b>${m} người</b> thì xếp được:`;
      const opts = [...new Set([ans, n, k, m])].sort((x, y) => x - y);
      await f.choose({ options: opts.map(v => ({ html: `${v} hàng`, value: v })), answer: ans,
        say: `Một đội đồng diễn xếp thành ${n} hàng, mỗi hàng ${k} người. Nếu xếp mỗi hàng ${m} người thì xếp được bao nhiêu hàng?`,
        hint: `Cả đội có ${n} × ${k} = ${fmt(N)} người. Rồi chia cho ${m}.` });
      f.finish({ ok: `${n} × ${k} = ${fmt(N)} người; ${fmt(N)} : ${m} = ${ans} hàng.` });
    },
  };
}

// ═══ Bài 45: Ước lượng ══════════════════════════════════════════════════════════════════════════════
/** Em làm tròn từng hàng của thước (chạm mốc gần hơn). */
async function roundAll(c, t, unitWord) {
  t.onWrong = (k, v) => c.hint(`${fmt(t.rows[k].n)} gần ${fmt(t.rows[k].ans)} hơn ${fmt(v)}.`);
  for (let k = 0; k < t.rows.length; k++) {
    const row = t.rowEl(k);
    row.classList.add('g4es-now');
    c.show(`Làm tròn <b>${fmt(t.rows[k].n)}</b> đến hàng ${unitWord}: chạm mốc gần hơn.`);
    await c.until(t, () => t.rounded(k), { nudge: `Mốc nào gần ${fmt(t.rows[k].n)} hơn?`, el: row.querySelector('.g4es-end') });
    row.classList.remove('g4es-now');
  }
}

/** Một cảnh ước lượng cộng / trừ: hai thước, em làm tròn, chọn kết quả ước lượng. */
function estStep(a, b, op, unit, { intro, shown, after } = {}) {
  return async (c) => {
    const t = c.use((bd) => createEstimate(bd, [{ n: a, unit }, { n: b, unit }], { title: `${fmt(a)} ${op} ${fmt(b)}: khoảng mấy ${unit === 1000 ? 'nghìn' : 'chục nghìn'}?` }));
    const w = unit === 1000 ? 'nghìn' : 'chục nghìn';
    await c.say(intro, shown);
    await roundAll(c, t, w);
    const ra = roundU(a, unit), rb = roundU(b, unit), est = op === '+' ? ra + rb : ra - rb;
    t.sum(`${fmt(ra)} ${op} ${fmt(rb)} = ?`);
    await c.choose(numOpts(est, [est - unit, est + unit]), est, { hint: `${fmt(ra)} ${op === '+' ? 'cộng' : 'trừ'} ${fmt(rb)}.` });
    t.sum(`${fmt(a)} ${op} ${fmt(b)} ≈ ${fmt(ra)} ${op} ${fmt(rb)} = <b>${fmt(est)}</b>`);
    await c.say(after(est), `Khoảng <b>${fmt(est)}</b>`);
  };
}

/** Mảnh vườn hình chữ nhật thật (nền nâu) và hình làm tròn (khung đỏ đứt nét), kích thước tỉ lệ. */
function gardenSvg(w, h, W, H, label, s = 16) {
  const x0 = 500 - (W * s) / 2, y0 = 70;
  return `<rect x="${x0}" y="${y0}" width="${W * s}" height="${H * s}" fill="none" stroke="#DC2626" stroke-width="5" stroke-dasharray="16 10" class="g4c2-round" opacity="0"/>
    <rect x="${x0}" y="${y0}" width="${w * s}" height="${h * s}" fill="#B08968" stroke="${INK}" stroke-width="4" rx="4"/>
    <text x="${x0 + (w * s) / 2}" y="${y0 - 14}" class="g4v-t" font-size="38">${w} m</text>
    <text x="${x0 - 14}" y="${y0 + (h * s) / 2 + 12}" class="g4v-t" font-size="38" style="text-anchor:end">${h} m</text>
    <text x="${x0 + (w * s) / 2}" y="${y0 + (h * s) / 2 + 14}" class="g4v-t" font-size="44" fill="#fff">${label}</text>
    <text class="g4c2-round" x="${x0 + W * s + 14}" y="${y0 + (H * s) / 2 + 12}" font-size="36" font-weight="800" fill="#DC2626" font-family="Baloo 2, sans-serif" opacity="0">${W} × ${H}</text>`;
}

const B45 = {
  explore: {
    setup: (board) => createEstimate(board, [{ n: 5978, unit: 1000 }, { n: 2967, unit: 1000 }], { title: 'Sáng 5 978 · chiều 2 967 lượt khách' }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Hôm qua, buổi sáng và buổi chiều lần lượt có 5 978 và 2 967 lượt khách tham quan công viên. Cả ngày hôm qua có khoảng mấy nghìn lượt khách?',
          'Sáng <b>5 978</b>, chiều <b>2 967</b>: khoảng mấy nghìn?');
        await c.say('Rô-bốt ước lượng: làm tròn từng số đến hàng nghìn, rồi cộng. Em chạm mốc gần hơn trên mỗi thước.', 'Làm tròn đến <b>hàng nghìn</b>');
        await roundAll(c, t, 'nghìn');
        t.sum('6 000 + 3 000 = ?');
        await c.choose(numOpts(9000, [8000, 10000]), 9000, { hint: '6 nghìn cộng 3 nghìn.' });
        t.sum('5 978 + 2 967 ≈ 6 000 + 3 000 = <b>9 000</b>');
        await c.say('Vậy cả ngày hôm qua có khoảng 9 000 lượt khách tham quan công viên.', 'Khoảng <b>9 000</b> lượt khách');
      },
      estStep(5985, 3897, '−', 1000, { intro: 'Em ước lượng tiếp: 5 985 trừ 3 897 khoảng mấy nghìn?', shown: '<b>5 985 − 3 897</b>: khoảng mấy nghìn?', after: (e) => `5 985 trừ 3 897 khoảng ${R(e)}.` }),
      estStep(19870, 30480, '+', 10000, { intro: 'Bây giờ làm tròn đến hàng chục nghìn: 19 870 cộng 30 480 khoảng mấy chục nghìn?', shown: '<b>19 870 + 30 480</b>: khoảng mấy chục nghìn?', after: (e) => `19 870 cộng 30 480 khoảng ${R(e)}.` }),
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        t.draw(gardenSvg(39, 19, 40, 20, 'A'));
        t.caption('Nam: "Diện tích mảnh vườn A lớn hơn 800 m²"');
        await c.say('Mảnh vườn A dài 39 mét, rộng 19 mét. Bạn Nam nói: diện tích mảnh vườn A lớn hơn 800 mét vuông. Em ước lượng xem. Làm tròn 39 thành bao nhiêu?', 'Làm tròn <b>39</b> thành?');
        await c.choose([{ html: '30', value: 30 }, { html: '40', value: 40 }], 40, { hint: '39 gần 40 hơn 30.' });
        c.show('Làm tròn <b>19</b> thành?');
        await c.choose([{ html: '10', value: 10 }, { html: '20', value: 20 }], 20, { hint: '19 gần 20 hơn 10.' });
        t.qa('.g4c2-round').forEach(e => e.setAttribute('opacity', 1));
        t.anim('.g4c2-round', [{ opacity: 0 }, { opacity: 1 }], 500); await c.sleep(500); // không chờ .finished (máy tắt hiệu ứng)
        await c.say('Làm tròn lên: mảnh vườn 40 mét nhân 20 mét có diện tích 800 mét vuông. Mảnh vườn A nằm gọn bên trong, nhỏ hơn. Vậy Nam nói đúng hay sai?', '40 × 20 = 800 (m²): vườn A <b>nhỏ hơn</b>');
        await c.choose(DS, false, { hint: 'Vườn A nằm trong hình 40 × 20 nên diện tích bé hơn 800 mét vuông.' });
        await c.say('Nam sai rồi. Diện tích mảnh vườn A không thể lớn hơn 40 nhân 20 bằng 800 mét vuông.', 'Nam <b>sai</b>: diện tích A &lt; 800 m²');
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        t.draw(`<rect x="250" y="80" width="500" height="210" fill="#B08968" stroke="${INK}" stroke-width="4" rx="4"/>
          <text x="500" y="62" class="g4v-t" font-size="40">50 m</text><text x="500" y="200" class="g4v-t" font-size="52" fill="#fff">1 050 m²</text>
          <text x="790" y="200" class="g4v-t" font-size="52" fill="#DC2626">?</text><text x="500" y="350" class="g4v-t" font-size="46">B</text>
          <text class="g4c2-round" x="500" y="440" font-size="50" font-weight="800" fill="#DC2626" text-anchor="middle" font-family="Baloo 2, sans-serif" opacity="0">1 000 : 50 = 20 (m)</text>`);
        t.caption('Mai: "Chiều rộng mảnh vườn B bé hơn 20 m"');
        await c.say('Mảnh vườn B có diện tích 1 050 mét vuông, chiều dài 50 mét. Bạn Mai nói: chiều rộng bé hơn 20 mét. Làm tròn 1 050 thành bao nhiêu?', 'Làm tròn <b>1 050</b> thành?');
        await c.choose([{ html: '1 000', value: 1000 }, { html: '1 100', value: 1100 }], 1000, { hint: 'Rô-bốt làm tròn xuống thành 1 000 cho dễ chia cho 50.' });
        t.qa('.g4c2-round').forEach(e => e.setAttribute('opacity', 1));
        t.anim('.g4c2-round', [{ opacity: 0 }, { opacity: 1 }], 500); await c.sleep(500); // không chờ .finished (máy tắt hiệu ứng)
        await c.say('1 000 chia 50 bằng 20. Diện tích thật 1 050 lớn hơn 1 000, nên chiều rộng thật lớn hơn 20 mét. Mai nói đúng hay sai?', '1 050 &gt; 1 000 → chiều rộng &gt; 20 m');
        await c.choose(DS, false, { hint: 'Diện tích lớn hơn 1 000 mét vuông thì chiều rộng lớn hơn 20 mét.' });
        await c.say('Mai cũng sai. Chiều rộng mảnh vườn B không thể bé hơn 1 000 chia 50 bằng 20 mét.', 'Mai <b>sai</b>: chiều rộng &gt; 20 m');
      },
    ],
  },
  tasks: () => styled2([taskEstAdd(1000), taskEstAdd(10000), taskEstCompare(), taskRace(), taskEnoughMoney(), taskEstPick()]),
};

/** Khoảng mấy nghìn / chục nghìn: em làm tròn hai số trên thước rồi chọn kết quả. */
function taskEstAdd(unit) {
  return {
    id: unit === 1000 ? 'e-thou' : 'e-tenk',
    make: (rng) => {
      for (;;) {
        const op = rng.pick(['+', '−']);
        const near = () => { const k = rng.int(1, 8) * unit; const off = rng.int(Math.floor(unit * 0.03), Math.floor(unit * 0.3)); return rng() < 0.5 ? k + off : k - off; };
        const a = near(), b = near();
        if (op === '−' && roundU(a, unit) <= roundU(b, unit)) continue;
        if (op === '+' && roundU(a, unit) + roundU(b, unit) > 9 * unit && unit === 1000) continue;
        return { a, b, op };
      }
    },
    async mount(f, { a, b, op }) {
      const w = unit === 1000 ? 'nghìn' : 'chục nghìn';
      f.q.innerHTML = `<b>${fmt(a)} ${op} ${fmt(b)}</b> khoảng mấy ${w}?`;
      const t = createEstimate(f.tool, [{ n: a, unit }, { n: b, unit }]);
      let warned = false;
      t.onWrong = (k, v) => { if (!warned) { f.mistakes++; warned = true; } f.hint(`${fmt(t.rows[k].n)} gần ${fmt(t.rows[k].ans)} hơn ${fmt(v)}.`); };
      f.say(`${R(a)} ${op === '+' ? 'cộng' : 'trừ'} ${R(b)} khoảng mấy ${w}? Làm tròn từng số đến hàng ${w}: chạm mốc gần hơn.`, `Làm tròn đến hàng ${w}: chạm mốc gần hơn`);
      if (import.meta.env.DEV) window.__g4ans = { kind: 'est', t };
      await t.ask(0); await t.ask(1);
      const ra = roundU(a, unit), rb = roundU(b, unit), est = op === '+' ? ra + rb : ra - rb;
      t.sum(`${fmt(ra)} ${op} ${fmt(rb)} = ?`);
      await f.choose({ options: numOpts(est, [est - unit, est + unit, est + 2 * unit]), answer: est, say: `Vậy khoảng bao nhiêu?`, hint: `${fmt(ra)} ${op} ${fmt(rb)}.` });
      t.sum(`≈ ${fmt(ra)} ${op} ${fmt(rb)} = <b>${fmt(est)}</b>`);
      f.finish({ ok: `${fmt(a)} ${op} ${fmt(b)} ≈ ${fmt(est)}` });
    },
  };
}

/** Dựa vào ước lượng, khẳng định đúng hay sai: 89 × 26 > 2 700; 9 170 : 30 < 300. */
function taskEstCompare() {
  return {
    id: 'e-cmp',
    make: (rng) => {
      if (rng() < 0.5) {
        const A = rng.int(3, 9) * 10, B = rng.int(2, 9) * 10;
        return { mul: true, a: A - rng.int(1, 4), b: B - rng.int(1, 4), A, B, claimGreater: rng() < 0.5 };
      }
      const d = rng.pick([20, 30, 40, 50, 60]), q = rng.pick([100, 200, 300]);
      return { mul: false, a: q * d + rng.int(1, 9) * 10 + (d === 30 ? 0 : 0), d, q, claimGreater: rng() < 0.5 };
    },
    async mount(f, m) {
      let claim, truth, hint, spoken;
      if (m.mul) {
        const X = m.A * m.B, real = m.a * m.b;
        claim = `${m.a} × ${m.b} ${m.claimGreater ? '&gt;' : '&lt;'} ${fmt(X)}`;
        truth = m.claimGreater ? real > X : real < X;
        hint = `Làm tròn lên: ${m.a} thành ${m.A}, ${m.b} thành ${m.B}. ${m.A} × ${m.B} = ${fmt(X)}, nên ${m.a} × ${m.b} bé hơn ${fmt(X)}.`;
        spoken = `${m.a} nhân ${m.b} ${m.claimGreater ? 'lớn hơn' : 'bé hơn'} ${R(X)}. Đúng hay sai?`;
      } else {
        const base = m.q * m.d, real = m.a / m.d;
        claim = `${fmt(m.a)} : ${m.d} ${m.claimGreater ? '&gt;' : '&lt;'} ${m.q}`;
        truth = m.claimGreater ? real > m.q : real < m.q;
        hint = `Làm tròn xuống: ${fmt(m.a)} thành ${fmt(base)}. ${fmt(base)} : ${m.d} = ${m.q}, số bị chia lớn hơn nên thương lớn hơn ${m.q}.`;
        spoken = `${R(m.a)} chia ${m.d} ${m.claimGreater ? 'lớn hơn' : 'bé hơn'} ${m.q}. Đúng hay sai?`;
      }
      f.q.innerHTML = `Dựa vào ước lượng:<br><b style="white-space:nowrap">${claim}</b>`;
      await f.choose({ options: DS, answer: truth, say: spoken, hint, cls: 'g4-choice-big' });
      f.finish({ ok: `${truth ? 'Đúng' : 'Sai'}. ${hint}` });
    },
  };
}

/** Trò chơi Đường đua: trọng tài giơ phép tính, đúng giơ cờ xanh, sai giơ cờ đỏ; đúng thì ngựa tiến một ô. */
function taskRace() {
  return {
    id: 'e-race',
    make: (rng) => {
      const op = rng.pick(['+', '−', '×', ':']);
      let a, b, r;
      if (op === '+') { a = rng.int(10, 69) * 100 + rng.pick([0, 10, 20, 50, 70, 80]); b = rng.int(10, 29) * 100 + rng.pick([0, 10, 30, 80]); r = a + b; }
      else if (op === '−') { a = rng.int(50, 99) * 100 + rng.pick([0, 20, 40, 90]); b = rng.int(10, 40) * 100 + rng.pick([0, 10, 70]); r = a - b; }
      else if (op === '×') { a = rng.int(12, 59); b = rng.int(3, 9) * (rng() < 0.5 ? 1 : 11); r = a * b; }
      else { b = rng.int(2, 9); r = rng.int(11, 99) * 100; a = r * b; }
      const ok = rng() < 0.5;
      let shown = r;
      if (!ok) shown = op === '+' || op === '−' ? r + rng.pick([-1, 1]) * rng.int(8, 15) * 100 : Math.round(r * rng.pick([0.6, 0.7, 1.4, 1.6]) / 10) * 10;
      return { op, a, b, shown, cell: rng.int(0, 3) };
    },
    async mount(f, { op, a, b, shown, cell }) {
      injectStyles();
      const r = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b, ok = shown === r;
      const ex = `${fmt(a)} ${op} ${fmt(b)} = ${fmt(shown)}`;
      f.q.innerHTML = 'Đúng hay sai? Giơ cờ!';
      const t = createCanvas(f.tool, { w: 1000, h: 380 });
      let cells = '';
      for (let i = 0; i < 6; i++) cells += `<rect x="${60 + i * 140}" y="250" width="140" height="80" fill="${i === 5 ? '#FEF3C7' : '#86EFAC'}" stroke="#C2410C" stroke-width="4"/>`;
      t.draw(`<rect x="0" y="0" width="1000" height="380" fill="#E0F2FE"/><rect x="0" y="230" width="1000" height="150" fill="#4ADE80"/>
        ${cells}<text x="${60 + 5 * 140 + 70}" y="300" class="g4v-t" font-size="30" fill="#B45309">ĐÍCH</text>
        <rect x="70" y="30" width="860" height="110" rx="14" fill="#FEF9C3" stroke="#A16207" stroke-width="5"/><line x1="500" y1="140" x2="500" y2="230" stroke="#A16207" stroke-width="8"/>
        <text x="500" y="105" class="g4v-t" font-size="${Math.min(60, Math.floor(1500 / ex.length))}">${ex}</text>
        <g class="g4c2-horse" style="transform: translate(${60 + cell * 140 + 70}px, 300px)"><text x="0" y="0" font-size="76" text-anchor="middle" dominant-baseline="middle" transform="scale(-1 1)">🐎</text></g>`);
      const est = op === '+' || op === '−' ? `${fmt(Math.round(a / 1000) * 1000)} ${op} ${fmt(Math.round(b / 1000) * 1000)}` : '';
      await f.choose({
        options: [{ html: '🟦 Cờ xanh: Đúng', value: true }, { html: '🟥 Cờ đỏ: Sai', value: false }], answer: ok,
        say: `${R(a)} ${op === '+' ? 'cộng' : op === '−' ? 'trừ' : op === '×' ? 'nhân' : 'chia'} ${R(b)} bằng ${R(shown)}. Đúng hay sai?`,
        hint: est ? `Ước lượng: ${est} = ${fmt(op === '+' ? Math.round(a / 1000) * 1000 + Math.round(b / 1000) * 1000 : Math.round(a / 1000) * 1000 - Math.round(b / 1000) * 1000)}. Kết quả phải gần số này.` : `Ước lượng bằng cách làm tròn rồi tính nhẩm. Kết quả đúng là ${fmt(r)}.`,
      });
      const horse = t.q('.g4c2-horse');
      const x1 = 60 + cell * 140 + 70, x2 = x1 + 140;
      await horse.animate([{ transform: `translate(${x1}px, 300px)` }, { transform: `translate(${(x1 + x2) / 2}px, 270px)` }, { transform: `translate(${x2}px, 300px)` }], { duration: 650, easing: 'ease-in-out', fill: 'forwards' }).finished;
      horse.style.transform = `translate(${x2}px, 300px)`;
      sfx.pop(3);
      f.finish({ ok: `${fmt(a)} ${op} ${fmt(b)} = ${fmt(r)}: ${ok ? 'đúng, giơ cờ xanh' : 'sai, giơ cờ đỏ'}.` });
    },
  };
}

/** Mang M đồng có đủ mua ba món không (ước lượng tổng tiền). */
function taskEnoughMoney() {
  const SHOP = [['🎒', 'cặp sách'], ['📚', 'bộ sách'], ['👟', 'đôi giày'], ['🧸', 'gấu bông'], ['⚽', 'quả bóng'], ['🖍️', 'hộp bút màu']];
  return {
    id: 'e-real',
    make: (rng) => {
      const idx = rng.shuffle([0, 1, 2, 3, 4, 5]).slice(0, 3);
      const prices = idx.map(() => rng.int(2, 9) * 10000 + rng.pick([-1, 1]) * rng.int(1, 4) * 100);
      const est = prices.reduce((s, p) => s + roundU(p, 10000), 0);
      const enough = rng() < 0.5;
      return { idx, prices, M: est + (enough ? rng.int(1, 3) : -rng.int(1, 3)) * 10000 };
    },
    async mount(f, { idx, prices, M }) {
      injectStyles();
      const sum = prices.reduce((s, p) => s + p, 0), ok = M >= sum;
      const est = prices.reduce((s, p) => s + roundU(p, 10000), 0);
      f.q.innerHTML = `Mẹ mang <b>${fmt(M)} đồng</b>. Có đủ tiền mua cả ba món không?`;
      f.tool.innerHTML = `<div class="g4c2-shop">${idx.map((k, i) => `<div class="g4c2-item"><span class="g4c2-ic">${SHOP[k][0]}</span><span>${SHOP[k][1]}</span><b>${fmt(prices[i])} đ</b></div>`).join('')}</div>`;
      await f.choose({ options: [{ html: 'Đủ', value: true }, { html: 'Không đủ', value: false }], answer: ok, cls: 'g4-choice-big',
        say: `Mẹ mang ${R(M)} đồng. Có đủ tiền mua cả ba món không? Em ước lượng nhanh.`,
        hint: `Làm tròn đến chục nghìn: ${prices.map(p => fmt(roundU(p, 10000))).join(' + ')} = ${fmt(est)} đồng.` });
      f.finish({ ok: `Khoảng ${fmt(est)} đồng (đúng là ${fmt(sum)} đồng): ${ok ? 'đủ' : 'không đủ'} với ${fmt(M)} đồng.` });
    },
  };
}

/** Kết quả nào gần đúng nhất (nhân, chia): làm tròn rồi nhẩm. */
function taskEstPick() {
  return {
    id: 'e-pick',
    make: (rng) => {
      if (rng() < 0.5) { const A = rng.int(2, 9) * 10, B = rng.int(2, 9) * 10; return { mul: true, a: A + rng.int(-3, 3), b: B + rng.int(-3, 3) }; }
      const d = rng.int(2, 9) * 10, q = rng.int(2, 9) * 10;
      return { mul: false, a: q * d + rng.int(-2, 2) * d + rng.int(1, 9), d };
    },
    async mount(f, m) {
      let ex, est, hint;
      if (m.mul) { const A = roundU(m.a, 10), B = roundU(m.b, 10); est = A * B; ex = `${m.a} × ${m.b}`; hint = `${m.a} ≈ ${A}, ${m.b} ≈ ${B}: ${A} × ${B} = ${fmt(est)}.`; }
      else { const A = roundU(m.a, 100); est = Math.round(A / m.d); ex = `${fmt(m.a)} : ${m.d}`; hint = `${fmt(m.a)} ≈ ${fmt(A)}: ${fmt(A)} : ${m.d} ≈ ${est}.`; }
      f.q.innerHTML = `<b>${ex}</b> khoảng bao nhiêu?`;
      await f.choose({ options: (m.mul ? [est / 10, est, est * 10] : [est, est * 10, est * 100]).map(v => ({ html: `≈ ${fmt(v)}`, value: v })), answer: est, cls: 'g4-choice-big',
        say: `${m.mul ? `${m.a} nhân ${m.b}` : `${R(m.a)} chia ${m.d}`} khoảng bao nhiêu? Làm tròn rồi tính nhẩm.`, hint });
      f.finish({ ok: `${ex} ≈ ${fmt(est)}. ${hint}` });
    },
  };
}

// ── Kiểu riêng (g4c2-) ────────────────────────────────────────────────────────────────────────────────
let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  css('g4-tap2calc', `
    .g4c2-sc { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', sans-serif;
      --cw: min(calc(88cqh / (var(--rows) * 1.15)), calc(60cqi / var(--n))); }
    .g4c2-sc-g { display: grid; grid-template-columns: repeat(var(--n), var(--cw)); grid-auto-rows: calc(var(--cw) * 1.15); }
    .g4c2-sc-c, .g4c2-sc-s { display: grid; place-items: center; font-weight: 800; color: #1E293B; font-size: calc(var(--cw) * 0.95); line-height: 1; }
    .g4c2-sc-s { color: #64748B; font-size: calc(var(--cw) * 0.75); }
    .g4c2-sc-line { box-shadow: inset 0 calc(var(--cw) * -0.05) 0 ${INK}; }
    .g4c2-red { color: #DC2626; } .g4c2-blue { color: #2563EB; } .g4c2-ok { color: #15803D; }
    .g4c2-lines { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.2em 1.2em; margin-top: 0.2em; }
    .g4c2-lines > span { white-space: nowrap; }
    .g4c2-tbtn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.1em; }
    .g4c2-truck { display: block; width: 80%; max-height: 60%; }
    .g4c2-truck svg { width: 100%; height: 100%; }
    .g4c2-chain { flex: 1; display: flex; align-items: center; justify-content: center; gap: 1.5cqi; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(14cqh, 5.4cqi); color: #1E293B; }
    .g4c2-ch { display: grid; place-items: center; min-width: 2.4em; height: 2.4em; padding: 0 0.3em; }
    .g4c2-ch-c { background: #99F6E4; border-radius: 50%; }
    .g4c2-ch-s { background: #99F6E4; border-radius: 0.2em; }
    .g4c2-ch-t { background: linear-gradient(to top, #99F6E4 0 70%, transparent 70%); clip-path: polygon(50% 0, 100% 100%, 0 100%); min-width: 3.4em; height: 2.8em; align-content: end; padding-bottom: 0.25em; }
    .g4c2-ch .g4-box { font-size: 0.8em; min-width: 2.2em; height: 1.25em; }
    .g4c2-ar { display: flex; flex-direction: column; align-items: center; font-size: 0.6em; color: #475569; }
    .g4c2-ar::after { content: '⟶'; font-size: 1.6em; line-height: 0.8; }
    .g4c2-ar i { font-style: normal; }
    .g4c2-zero { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2cqh; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(20cqh, 9cqi); color: #1E293B; }
    .g4c2-zero s { text-decoration: none; position: relative; color: #94A3B8; }
    .g4c2-zero s::after { content: ''; position: absolute; left: -5%; right: -5%; top: 52%; height: 0.08em; background: #DC2626; border-radius: 1em; transform: scaleX(0); transform-origin: left; transition: transform .5s ease; }
    .g4c2-zero-on s::after { transform: scaleX(1); }
    .g4c2-zero2 { color: #15803D; font-size: 0.75em; opacity: 0; transition: opacity .5s ease .4s; }
    .g4c2-zero-on .g4c2-zero2 { opacity: 1; }
    .g4c2-horse { transition: none; }
    .g4c2-shop { flex: 1; display: flex; gap: 2cqi; align-items: stretch; justify-content: center; padding: 1cqh 0; font-family: 'Baloo 2', sans-serif; }
    .g4c2-item { flex: 1 1 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.1em; background: #FFF7ED; border: 2px solid #FED7AA; border-radius: 0.8em;
      font-weight: 800; color: #7C2D12; font-size: min(7cqh, 3.6cqi); }
    .g4c2-ic { font-size: 2.4em; line-height: 1; }
    .g4c2-item b { color: #C2410C; font-size: 1.15em; }
    @container (orientation: portrait) {
      .g4c2-shop { flex-direction: column; gap: 1.2cqh; }
      .g4c2-item { flex-direction: row; gap: 0.5em; font-size: min(5cqh, 6cqi); }
      .g4c2-ic { font-size: 1.8em; }
      .g4c2-chain { font-size: min(10cqh, 7.6cqi); gap: 1cqi; }
      .g4c2-zero { font-size: min(11cqh, 14cqi); }
      .g4c2-sc { --cw: min(calc(88cqh / (var(--rows) * 1.15)), calc(86cqi / var(--n))); }
    }
    @media (prefers-reduced-motion: reduce) { .g4c2-zero s::after { transition-duration: .4s; } }
  `);
}

export const CALC2_LESSONS = { 38: B38, 39: B39, 41: B41, 43: B43, 44: B44, 45: B45 };
