/**
 * Bài 19 (Phép cộng số thập phân), Bài 20 (Phép trừ số thập phân), Bài 21 (Phép nhân số thập phân).
 * Khám phá đi như sách: tình huống thật (dây đồng, nhảy xa, toà nhà, căn phòng) → đổi đơn vị để tính bằng số tự nhiên
 * (1,65 m = 165 cm) → "ta đặt tính rồi tính như sau" trên tờ vở đặt tính số thập phân (grade5Drills/dcol.js: cột dấu
 * phẩy, 0 mờ ở ô trống; phép nhân: đếm chữ số thập phân, dấu phẩy nhảy từ phải sang trái).
 * Thực hành: dùng lại đặt tính của Luyện Tính lớp 5 (task.stage) + câu chọn: Đ/S đặt tính sai cột, tính thuận tiện,
 * tìm x, "biết 64 × 57 = 3 648, tính 6,4 × 0,57".
 */

import { decSheet, DADD_GAME, DMUL_GAME, num, sOf, showS, trimS } from '../../grade5Drills/dcol.js';
import { emitter, css, INK } from '../../grade4Tools/frame.js';
import { BOX } from '../../grade4Tools/practice.js';
import { setActive, setUse } from '../../grade3Drills/kit.js';
import { readDec, fmt } from '../num.js';

const PLACE_ALL = ['Hàng đơn vị', 'Hàng chục', 'Hàng trăm'];
const PLACE_DEC = ['Hàng phần mười', 'Hàng phần trăm', 'Hàng phần nghìn'];
const placeName = (p, D) => (p >= D ? PLACE_ALL[p - D] : PLACE_DEC[D - 1 - p]);
const val = (s) => Number(String(s).replace(',', '.'));
/** Chuỗi số thập phân từ giá trị (bỏ sai số dấu phẩy động). */
const S = (x) => trimS(String(Math.round(x * 1e6) / 1e6).replace('.', ','));

// ── Công cụ Khám phá ──────────────────────────────────────────────────────────────────────────────────
/** Tờ vở đặt tính trong Khám phá (cỡ ô chừa đáy cho nút chọn). */
const column = (m, full = false) => (board) => {
  injectStyles();
  const sheet = decSheet(m, { explore: full ? 'full' : true });
  board.innerHTML = `<div class="g5c-wrap${full ? ' g5c-full' : ''}">${sheet.html}</div>`;
  const t = emitter(sheet.bind(board));
  t.root = board;
  return t;
};

/** Tình huống: hình vẽ + các dòng tính hiện dần (chỗ đã giữ sẵn, không đẩy hình). */
const story = (svg, lines) => (board) => {
  injectStyles();
  board.innerHTML = `<div class="g5c-story"><div class="g5c-pic">${svg}</div>
    <div class="g5c-lines">${lines.map((l, i) => `<div class="g5c-line" data-l="${i}">${l}</div>`).join('')}</div></div>`;
  const t = emitter({});
  t.line = (i) => board.querySelector(`[data-l="${i}"]`).classList.add('g5c-on');
  t.lab = (k, text) => { const el = board.querySelector(`[data-lab="${k}"]`); if (el) { el.textContent = text; el.classList.remove('g5c-pop'); void el.getBoundingClientRect(); el.classList.add('g5c-pop'); } };
  t.el = (k) => board.querySelector(`[data-lab="${k}"]`);
  return t;
};

/** 3 lựa chọn quanh đáp án (số tự nhiên). */
function near(right, deltas = [10, -10, 100, 1, -1]) {
  const opts = new Set([right]);
  for (const d of deltas) if (opts.size < 3 && right + d > 0) opts.add(right + d);
  return [...opts].sort((x, y) => x - y).map(x => ({ html: fmt(x), value: x }));
}

/** Các bước cộng, trừ trên tờ vở: thầy làm `demo` cột đầu, các cột sau em chọn chữ số. */
async function runAddSub(c, t, { demo = 1 } = {}) {
  let n = 0;
  for (let k = 0; k < t.steps.length; k++) {
    const s = t.steps[k];
    if (s.kind === 'carry') { await t.carry(s); continue; }
    t.faint(s);
    t.use(s, t.steps[k - 1]?.kind === 'carry');
    const els = t.digitEls(s);
    setActive(t.grid, els);
    if (n < demo) {
      await c.say(s.say);
      t.write(s);
    } else {
      const right = s.write;
      const opts = new Set([right]);
      const x = +right;
      for (const w of [x + 1, x - 1, x + 2, (x + 5) % 10]) if (opts.size < 3 && w >= 0 && String(w) !== right) opts.add(String(w));
      c.show(`<b>${placeName(s.p, t.D)}</b>: viết ${right.length > 1 ? 'số' : 'chữ số'} nào?`);
      await c.choose([...opts].sort((a, b) => a - b).map(v => ({ html: v, value: v })), right, { hint: s.say });
      t.write(s);
      await c.say(s.say);
    }
    setActive(t.grid, null);
    n++;
  }
  setUse(t.grid, null);
}

/** Đặt tính cộng, trừ: số bay xuống, thầy kẻ vạch, tính, rồi em bấm chỗ viết dấu phẩy. */
async function addSubColumn(c, { intro, emptyNote = '', demo = 1, after = '' }) {
  const t = c.t;
  const word = t.op === '+' ? 'tổng' : 'hiệu';
  await c.say(intro, `Đặt tính: <b>${showS(t.A.s)} ${t.op === '+' ? '+' : '−'} ${showS(t.B.s)}</b>`);
  await c.sleep(t.putNum('a', 1) + 150);
  await c.sleep(t.putSign() + 150);
  await c.sleep(t.putNum('b', 2) + 250);
  await c.say(t.op === '+'
    ? 'Viết số hạng này dưới số hạng kia sao cho các chữ số ở cùng một hàng thẳng cột với nhau, các dấu phẩy thẳng cột.'
    : 'Viết số trừ dưới số bị trừ sao cho các chữ số ở cùng một hàng thẳng cột với nhau, các dấu phẩy thẳng cột.',
  'Chữ số cùng hàng <b>thẳng cột</b>, <b>dấu phẩy thẳng dấu phẩy</b>');
  if (emptyNote) {
    const empties = t.emptyCells();
    empties.forEach(el => el.classList.add('g5c-hl'));
    await c.say(emptyNote);
    t.faintAll();
    await c.sleep(600);
    empties.forEach(el => el.classList.remove('g5c-hl'));
  }
  await c.sleep(t.rule());
  await c.say(`Thực hiện phép ${t.op === '+' ? 'cộng' : 'trừ'} như ${t.op === '+' ? 'cộng' : 'trừ'} các số tự nhiên, từ phải sang trái.`);
  await runAddSub(c, t, { demo });
  const RULE = t.op === '+' ? 'Viết dấu phẩy ở tổng thẳng cột với các dấu phẩy ở hai số hạng.' : 'Viết dấu phẩy ở hiệu thẳng cột với dấu phẩy của số bị trừ và số trừ.';
  await c.say(RULE, `${RULE} Bấm vào chỗ viết dấu phẩy ở ${word}.`);
  await c.tap(t.cm(3));
  t.putComma();
  await c.sleep(700);
  const R = trimS(t.R);
  t.root.querySelector('.g3c-ans').textContent = showS(R);
  t.root.querySelector('.g3c-eq').classList.add('g3c-eq-done');
  await c.say(`Vậy ${readDec(t.A.s)} ${t.op === '+' ? 'cộng' : 'trừ'} ${readDec(t.B.s)} bằng ${readDec(R)}.${after ? ` ${after}` : ''}`,
    `${showS(t.A.s)} ${t.op === '+' ? '+' : '−'} ${showS(t.B.s)} = <b>${showS(R)}</b>`);
}

/** Đặt tính nhân: căn phải, nhân như số tự nhiên (from: chữ số em chọn), đếm chữ số thập phân, em bấm chỗ đặt dấu phẩy. */
async function mulColumn(c, { intro, quick = false }) {
  const t = c.t;
  await c.say(intro, `Đặt tính: <b>${showS(t.A.s)} × ${showS(t.B.s)}</b>`);
  await c.sleep(t.putNum('a', 1) + 150);
  await c.sleep(t.putSign() + 150);
  await c.sleep(t.putNum('b', 2) + 250);
  await c.say('Đặt tính như nhân các số tự nhiên: các chữ số cuối thẳng cột với nhau, chưa cần để ý dấu phẩy.', 'Căn <b>thẳng cột bên phải</b>, nhân như số tự nhiên');
  await c.sleep(t.rule(2));
  if (quick) {
    // Thầy viết nhanh từng tích riêng (đã học ở lớp 4).
    for (let j = 0; j < t.parts.length; j++) {
      if (j) {
        t.skipMarks(j);
        if (j === t.nb - 1) t.plus(j);
      }
      await c.say(`Tích riêng ${j ? 'thứ hai' : 'thứ nhất'}: ${String(t.Bi).at(-1 - j)} nhân ${fmt(t.Ai)} bằng ${fmt(t.parts[j])}${j ? ', viết lùi sang trái một cột' : ''}.`);
      await c.sleep(t.writePart(j));
    }
    if (t.multi) {
      await c.sleep(t.rule(t.partRow(t.nb - 1)));
      await c.say(`Cộng hai tích riêng được ${fmt(t.P)}.`);
      await c.sleep(t.writeSum());
    }
  } else {
    let n = 0;
    for (let k = 0; k < t.steps.length; k++) {
      const s = t.steps[k];
      if (s.kind === 'part' || s.kind === 'add') continue;
      if (s.kind === 'carry' || s.kind === 'scarry') { t.write(s); await c.sleep(650); continue; }
      const { els } = t.target(s);
      setActive(t.grid, els);
      if (s.kind === 'digit') setUse(t.grid, [t.at(2, s.j), t.at(1, s.i)]);
      if (n === 0) { await c.say(s.say); t.write(s); } else {
        const right = s.write, x = +right;
        const opts = new Set([right]);
        for (const w of [x + 1, x - 1, x + 10, x + 2]) if (opts.size < 3 && w >= 0 && String(w) !== right) opts.add(String(w));
        const withCarry = t.steps[k - 1]?.kind === 'carry';
        c.show(`<b>${s.bj} × ${s.ai}</b>${withCarry ? ', thêm nhớ' : ''}: viết ${right.length > 1 ? 'số' : 'chữ số'} nào?`);
        await c.choose([...opts].sort((a, b) => a - b).map(v => ({ html: v, value: v })), right, { hint: s.say });
        t.write(s);
        await c.say(s.say);
      }
      setActive(t.grid, null);
      n++;
    }
    setUse(t.grid, null);
  }
  t.clearCarries();
  // Đếm chữ số ở phần thập phân
  const both = t.B.dp > 0;
  await c.say(both ? 'Đếm các chữ số ở phần thập phân của cả hai thừa số.' : `Đếm các chữ số ở phần thập phân của ${readDec(t.A.s)}.`,
    `Đếm chữ số ở <b>phần thập phân</b>${both ? ' của <b>cả hai thừa số</b>' : ''}: bấm vào từng chữ số.`);
  const decs = t.decCells();
  for (let i = 0; i < decs.length; i++) { await c.tap(decs[i]); t.badge(decs[i], i + 1); }
  const N = t.N;
  const counted = both
    ? `Phần thập phân của ${readDec(t.A.s)} có ${t.A.dp} chữ số, của ${readDec(t.B.s)} có ${t.B.dp} chữ số, tất cả ${N} chữ số.`
    : `Phần thập phân của ${readDec(t.A.s)} có ${N} chữ số.`;
  await c.say(`${counted} Ta dùng dấu phẩy tách ở tích ra ${N} chữ số kể từ phải sang trái.`,
    `Tách ở tích ra <b>${N} chữ số</b> kể từ phải sang trái: bấm vào chỗ đặt dấu phẩy.`);
  const gaps = t.gaps();
  await c.tap(gaps[N - 1]);
  t.clearGaps();
  await t.hop();
  const R = trimS(t.full);
  t.root.querySelector('.g3c-ans').textContent = showS(R);
  t.root.querySelector('.g3c-eq').classList.add('g3c-eq-done');
  await c.say(`Vậy ${readDec(t.A.s)} nhân ${readDec(t.B.s)} bằng ${readDec(R)}.`, `${showS(t.A.s)} × ${showS(t.B.s)} = <b>${showS(R)}</b>`);
}

// ── Hình vẽ tình huống (SVG riêng, nét mực dày) ─────────────────────────────────────────────────────────
const ST = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
const T = (x, y, k, text, size = 26, fill = INK, anchor = 'middle') => `<text x="${x}" y="${y}" data-lab="${k}" text-anchor="${anchor}" font-size="${size}" font-weight="800" fill="${fill}" font-family="'Baloo 2', sans-serif" paint-order="stroke" stroke="#fff" stroke-width="6">${text}</text>`;

const wire = (y, len) => `<g>
  <path d="M40 ${y} H${40 + len}" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
  <path d="M40 ${y} H${40 + len}" stroke="#C2410C" stroke-width="12" stroke-linecap="round"/>
  <path d="M46 ${y - 3} H${34 + len}" stroke="#FDBA74" stroke-width="3" stroke-linecap="round"/>
  ${Array.from({ length: Math.floor(len / 26) }, (_, i) => `<path d="M${52 + i * 26} ${y - 5} l6 10" stroke="#9A3412" stroke-width="2"/>`).join('')}</g>`;
const SVG_WIRES = `<svg viewBox="0 0 640 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="6" y="6" width="628" height="238" rx="18" fill="#FFF7ED" ${ST}/>
  <path d="M40 222 H600" stroke="#94A3B8" stroke-width="3"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${40 + i * 50} 214 V230" stroke="#94A3B8" stroke-width="3"/>`).join('')}
  ${wire(80, 1.65 * 330)}${wire(160, 1.26 * 330)}
  ${T(40 + 1.65 * 165, 56, 'w1', '1,65 m')}${T(40 + 1.26 * 165, 136, 'w2', '1,26 m')}
  ${T(560, 175, 'tot', '? m', 30, '#C2410C')}
</svg>`;

const foot = (x, y, c) => `<g transform="translate(${x} ${y})"><ellipse cx="-6" cy="0" rx="9" ry="5" fill="${c}" ${ST}/><path d="M-6 -2 V-46" stroke="${INK}" stroke-width="3"/><path d="M-6 -46 L22 -38 L-6 -30 Z" fill="${c}" ${ST}/></g>`;
const SVG_JUMP = `<svg viewBox="0 0 640 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="6" y="6" width="628" height="238" rx="18" fill="#BBF7D0" ${ST}/>
  <rect x="6" y="40" width="80" height="170" fill="#FCA5A5" ${ST}/><rect x="78" y="40" width="12" height="170" fill="#fff" ${ST}/>
  <rect x="90" y="40" width="540" height="170" rx="10" fill="#FDE68A" ${ST}/>
  ${Array.from({ length: 30 }, (_, i) => `<circle cx="${110 + (i * 97) % 500}" cy="${55 + (i * 53) % 140}" r="2.5" fill="#D97706" opacity="0.6"/>`).join('')}
  <path d="M90 105 H${90 + 4.43 * 115}" stroke="#DB2777" stroke-width="4" stroke-dasharray="10 7"/>
  <path d="M90 175 H${90 + 4.16 * 115}" stroke="#2563EB" stroke-width="4" stroke-dasharray="10 7"/>
  ${foot(90 + 4.43 * 115, 105, '#F472B6')}${foot(90 + 4.16 * 115, 175, '#60A5FA')}
  ${T(300, 95, 'mai', 'Mai: 4,43 m', 28, '#BE185D')}${T(290, 165, 'nam', 'Nam: 4,16 m', 28, '#1D4ED8')}
  <path d="M${90 + 4.16 * 115} 200 V218 M${90 + 4.43 * 115} 200 V218 M${90 + 4.16 * 115} 212 H${90 + 4.43 * 115}" stroke="#DC2626" stroke-width="3"/>
  ${T(90 + 4.3 * 115, 240, 'gap', '?', 26, '#DC2626')}
</svg>`;

const SVG_HOUSE = `<svg viewBox="0 0 640 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="6" y="6" width="628" height="288" rx="18" fill="#BAE6FD" ${ST}/>
  <circle cx="560" cy="58" r="26" fill="#FDE047" ${ST}/>
  <g fill="#fff"><ellipse cx="110" cy="60" rx="38" ry="14"/><ellipse cx="135" cy="50" rx="24" ry="14"/></g>
  <path d="M6 272 H634 V294 H6 Z" fill="#86EFAC" ${ST}/>
  <rect x="250" y="16" width="150" height="256" fill="#FCA5A5" ${ST}/>
  ${Array.from({ length: 8 }, (_, f) => `<path d="M250 ${16 + f * 32} H400" stroke="${INK}" stroke-width="${f ? 2 : 0}"/>
    ${[268, 312, 356].map(x => `<rect x="${x}" y="${24 + f * 32}" width="26" height="17" rx="2" fill="${f ? '#E0F2FE' : '#FDE68A'}" stroke="${INK}" stroke-width="2"/>`).join('')}`).join('')}
  <path d="M415 240 H430 V272 H415" fill="none" stroke="#DC2626" stroke-width="3"/>
  ${T(436, 266, 'floor', '3,2 m', 26, '#B91C1C', 'start')}
  <path d="M235 16 H220 V272 H235" fill="none" stroke="#1D4ED8" stroke-width="3"/>
  ${T(212, 152, 'h', '? m', 30, '#1D4ED8', 'end')}
  <g transform="translate(520 272)"><rect x="-7" y="-50" width="14" height="50" fill="#92400E" ${ST}/><circle cy="-70" r="34" fill="#22C55E" ${ST}/></g>
  <g transform="translate(110 272)"><rect x="-6" y="-40" width="12" height="40" fill="#92400E" ${ST}/><circle cy="-58" r="28" fill="#4ADE80" ${ST}/></g>
</svg>`;

const SVG_ROOM = `<svg viewBox="0 0 640 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="6" y="6" width="628" height="288" rx="18" fill="#F1F5F9" ${ST}/>
  <rect x="166" y="38" width="${4.3 * 62}" height="${3.6 * 62}" fill="#FCD34D" stroke="${INK}" stroke-width="5"/>
  ${Array.from({ length: 7 }, (_, i) => `<path d="M166 ${38 + (i + 1) * 28} H${166 + 4.3 * 62}" stroke="#D97706" stroke-width="2"/>`).join('')}
  <rect x="200" y="70" width="70" height="44" rx="6" fill="#60A5FA" ${ST}/><rect x="330" y="150" width="54" height="54" rx="8" fill="#F472B6" ${ST}/>
  <path d="M166 ${38 + 3.6 * 62 + 18} H${166 + 4.3 * 62}" stroke="#1D4ED8" stroke-width="3"/><path d="M166 ${38 + 3.6 * 62 + 10} v16 M${166 + 4.3 * 62} ${38 + 3.6 * 62 + 10} v16" stroke="#1D4ED8" stroke-width="3"/>
  ${T(166 + 4.3 * 31, 38 + 3.6 * 62 + 46, 'w', '4,3 m', 28, '#1D4ED8')}
  <path d="M${166 + 4.3 * 62 + 18} 38 V${38 + 3.6 * 62}" stroke="#DC2626" stroke-width="3"/><path d="M${166 + 4.3 * 62 + 10} 38 h16 M${166 + 4.3 * 62 + 10} ${38 + 3.6 * 62} h16" stroke="#DC2626" stroke-width="3"/>
  ${T(166 + 4.3 * 62 + 30, 38 + 3.6 * 31 + 9, 'h', '3,6 m', 28, '#B91C1C', 'start')}
  ${T(166 + 4.3 * 31, 38 + 3.6 * 31 + 10, 's', '? m²', 34, '#7C2D12')}
</svg>`;

const SVG_NOTE = `<svg viewBox="0 0 640 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="120" y="14" width="400" height="222" rx="14" fill="#fff" ${ST}/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M140 ${60 + i * 30} H500" stroke="#BFDBFE" stroke-width="2"/>`).join('')}
  <path d="M170 14 V236" stroke="#FCA5A5" stroke-width="3"/>
  ${Array.from({ length: 6 }, (_, i) => `<circle cx="140" cy="${40 + i * 34}" r="7" fill="#E2E8F0" ${ST}/>`).join('')}
  ${T(340, 110, 'n1', '68 × 52 = 3 536', 40, '#1E293B')}
  ${T(340, 180, 'n2', '6,8 × 0,52 = ?', 40, '#C2410C')}
</svg>`;

// ── Khám phá ──────────────────────────────────────────────────────────────────────────────────────────
const E19 = {
  setup: story(SVG_WIRES, ['1,65 m + 1,26 m = <b>?</b> m', '1,65 m = 165 cm · 1,26 m = 126 cm', '165 + 126 = <b>291</b> (cm)', '291 cm = <b>2,91 m</b>']),
  steps: [
    async (c) => {
      c.t.line(0);
      await c.say('Đoạn dây đồng thứ nhất dài 1,65 m, đoạn thứ hai dài 1,26 m. Cả hai đoạn dây dài bao nhiêu mét?', 'Hai đoạn dây dài bao nhiêu mét?');
      await c.say('Ta đổi ra xăng-ti-mét để cộng như số tự nhiên: 1,65 m bằng 165 cm, 1,26 m bằng 126 cm.');
      c.t.lab('w1', '165 cm'); c.t.lab('w2', '126 cm'); c.t.line(1);
      c.show('165 + 126 = <b>?</b>');
      await c.choose(near(291), 291, { hint: '5 cộng 6 bằng 11, viết 1, nhớ 1. Rồi cộng tiếp hàng chục.' });
      c.t.line(2);
      c.t.lab('tot', '291 cm');
      await c.say('165 cộng 126 bằng 291 xăng-ti-mét. 291 cm bằng 2,91 m.');
      c.t.lab('tot', '2,91 m'); c.t.line(3);
      await c.say('Vậy 1,65 cộng 1,26 bằng 2,91 mét.', '1,65 + 1,26 = <b>2,91</b> (m)');
    },
    async (c) => {
      c.use(column({ op: '+', a: '1,65', b: '1,26' }));
      await addSubColumn(c, { intro: 'Ta đặt tính rồi tính như sau.', demo: 1 });
    },
    async (c) => {
      c.use(column({ op: '+', a: '24,5', b: '3,84' }));
      await addSubColumn(c, {
        intro: 'Thêm một phép cộng: 24,5 cộng 3,84. Số 24,5 chỉ có một chữ số ở phần thập phân.',
        emptyNote: 'Cột phần trăm của 24,5 để trống. Khi cộng, coi ô trống là chữ số 0.', demo: 0,
        after: 'Muốn cộng hai số thập phân: viết thẳng cột, cộng như số tự nhiên, rồi viết dấu phẩy ở tổng thẳng cột với các dấu phẩy.',
      });
    },
  ],
};

const E20 = {
  setup: story(SVG_JUMP, ['4,43 m − 4,16 m = <b>?</b> m', '4,43 m = 443 cm · 4,16 m = 416 cm', '443 − 416 = <b>27</b> (cm)', '27 cm = <b>0,27 m</b>']),
  steps: [
    async (c) => {
      c.t.line(0);
      await c.say('Bạn Mai nhảy xa được 4,43 m, bạn Nam nhảy xa được 4,16 m. Mai nhảy xa hơn Nam bao nhiêu mét?', 'Mai nhảy xa hơn Nam bao nhiêu mét?');
      await c.say('Đổi ra xăng-ti-mét: 4,43 m bằng 443 cm, 4,16 m bằng 416 cm.');
      c.t.lab('mai', 'Mai: 443 cm'); c.t.lab('nam', 'Nam: 416 cm'); c.t.line(1);
      c.show('443 − 416 = <b>?</b>');
      await c.choose(near(27, [10, 6, -10]), 27, { hint: '3 không trừ được 6, lấy 13 trừ 6 bằng 7, viết 7, nhớ 1.' });
      c.t.line(2); c.t.lab('gap', '27 cm');
      await c.say('443 trừ 416 bằng 27 xăng-ti-mét. 27 cm bằng 0,27 m.');
      c.t.lab('gap', '0,27 m'); c.t.line(3);
      await c.say('Vậy 4,43 trừ 4,16 bằng 0,27 mét.', '4,43 − 4,16 = <b>0,27</b> (m)');
    },
    async (c) => {
      c.use(column({ op: '-', a: '4,43', b: '4,16' }));
      await addSubColumn(c, { intro: 'Ta đặt tính rồi tính như sau.', demo: 1, after: 'Phần nguyên bằng 0, ta vẫn viết chữ số 0 trước dấu phẩy.' });
    },
    async (c) => {
      c.use(column({ op: '-', a: '25,9', b: '13,84' }));
      await addSubColumn(c, {
        intro: 'Thêm một phép trừ: 25,9 trừ 13,84. Số bị trừ chỉ có một chữ số ở phần thập phân.',
        emptyNote: 'Coi 25,9 là 25,90: viết thêm chữ số 0 vào ô trống ở cột phần trăm rồi trừ như thường.', demo: 0,
        after: 'Muốn trừ hai số thập phân: viết thẳng cột, trừ như số tự nhiên, rồi viết dấu phẩy ở hiệu thẳng cột với các dấu phẩy.',
      });
    },
  ],
};

const E21 = {
  setup: story(SVG_HOUSE, ['3,2 m × 8 = <b>?</b> m', '3,2 m = 32 dm', '32 × 8 = <b>256</b> (dm)', '256 dm = <b>25,6 m</b>']),
  steps: [
    async (c) => {
      c.t.line(0);
      await c.say('Một toà nhà có 8 tầng, mỗi tầng cao 3,2 m. Toà nhà cao bao nhiêu mét?', 'Toà nhà 8 tầng cao bao nhiêu mét?');
      await c.say('Đổi ra đề-xi-mét để nhân như số tự nhiên: 3,2 m bằng 32 dm.');
      c.t.lab('floor', '32 dm'); c.t.line(1);
      c.show('32 × 8 = <b>?</b>');
      await c.choose(near(256), 256, { hint: '8 nhân 2 bằng 16, viết 6, nhớ 1; 8 nhân 3 bằng 24, thêm 1 bằng 25.' });
      c.t.line(2); c.t.lab('h', '256 dm');
      await c.say('32 nhân 8 bằng 256 đề-xi-mét. 256 dm bằng 25,6 m.');
      c.t.lab('h', '25,6 m'); c.t.line(3);
      await c.say('Vậy 3,2 nhân 8 bằng 25,6 mét.', '3,2 × 8 = <b>25,6</b> (m)');
    },
    async (c) => {
      c.use(column({ op: '*', a: '3,2', b: '8' }));
      await mulColumn(c, { intro: 'Ta đặt tính rồi tính như sau.' });
      await c.say('Muốn nhân một số thập phân với một số tự nhiên: nhân như nhân các số tự nhiên, rồi đếm phần thập phân có bao nhiêu chữ số thì tách ở tích ra bấy nhiêu chữ số kể từ phải sang trái.');
    },
    async (c) => {
      const t = c.use(story(SVG_ROOM, ['4,3 m × 3,6 m = <b>?</b> m²', '4,3 m = 43 dm · 3,6 m = 36 dm', '43 × 36 = <b>1 548</b> (dm²)', '1 548 dm² = <b>15,48 m²</b>']));
      t.line(0);
      await c.say('Một căn phòng hình chữ nhật dài 4,3 m, rộng 3,6 m. Tính diện tích căn phòng.', 'Diện tích căn phòng: 4,3 × 3,6 = <b>?</b> m²');
      await c.say('Đổi ra đề-xi-mét: 4,3 m bằng 43 dm, 3,6 m bằng 36 dm.');
      t.lab('w', '43 dm'); t.lab('h', '36 dm'); t.line(1);
      c.show('43 × 36 = <b>?</b>');
      await c.choose([1448, 1548, 1648].map(x => ({ html: fmt(x), value: x })), 1548, { hint: 'Tích riêng thứ nhất 6 × 43 = 258, tích riêng thứ hai 3 × 43 = 129 viết lùi sang trái một cột.' });
      t.line(2); t.lab('s', '1 548 dm²');
      await c.say('43 nhân 36 bằng 1 548 đề-xi-mét vuông, bằng 15,48 mét vuông.');
      t.lab('s', '15,48 m²'); t.line(3);
    },
    async (c) => {
      c.use(column({ op: '*', a: '4,3', b: '3,6' }, true));
      await mulColumn(c, { intro: 'Ta đặt tính rồi tính 4,3 nhân 3,6.', quick: true });
      await c.say('Muốn nhân hai số thập phân: nhân như nhân các số tự nhiên, rồi đếm xem trong phần thập phân của cả hai thừa số có bao nhiêu chữ số thì tách ở tích ra bấy nhiêu chữ số kể từ phải sang trái.');
    },
    async (c) => {
      const t = c.use(story(SVG_NOTE, ['68 × 52 = 3 536', '6,8 × 0,52 = <b>?</b>', '1 + 2 = <b>3</b> chữ số thập phân', '6,8 × 0,52 = <b>3,536</b>']));
      t.line(0); t.line(1);
      await c.say('Biết 68 nhân 52 bằng 3 536. Vậy 6,8 nhân 0,52 bằng bao nhiêu?', 'Biết 68 × 52 = 3 536. Vậy 6,8 × 0,52 = <b>?</b>');
      t.line(2);
      await c.choose(['353,6', '35,36', '3,536'].map(v => ({ html: v, value: v })), '3,536', { hint: '6,8 có 1 chữ số, 0,52 có 2 chữ số ở phần thập phân: tách ở tích ra 3 chữ số.' });
      t.line(3); t.lab('n2', '6,8 × 0,52 = 3,536');
      await c.say('6,8 có một chữ số, 0,52 có hai chữ số ở phần thập phân, tất cả ba chữ số. Vậy 6,8 nhân 0,52 bằng 3,536.');
    },
  ],
};

// ── Thực hành ─────────────────────────────────────────────────────────────────────────────────────────
/** Đặt tính ở Thực hành: giao cả màn cho đặt tính của Luyện Tính lớp 5 (một cấp của trò). */
function taskDrill(id, game, lv) {
  return {
    id,
    make: (rng) => { const { op, a, b } = game.levels[lv].gen(rng, rng.int(0, 5)); return { op, a, b }; },
    stage(stage, m, api) { game.mountMission(stage, m, null, api); },
  };
}

/** Phép tính dọc vẽ sẵn (không bấm): aligned = đặt đúng (dấu phẩy thẳng cột) hay căn phải như số tự nhiên. */
function staticCol(a, b, sign, res, aligned) {
  const rows = [a, b, res];
  const D = Math.max(...rows.map(r => num(r).dp));
  const pad = (s) => {
    if (!aligned) return [...s];
    const x = num(s);
    return [...s, ...(x.dp ? [] : ['~,']), ...Array(D - x.dp).fill('~0')];
  };
  const cell = (ch) => (ch.startsWith('~') ? `<i class="g5c-ghost">${ch[1]}</i>` : ch === ',' ? '<i class="g5c-cm">,</i>' : `<i>${ch}</i>`);
  return `<div class="g5c-static">
    <div class="g5c-sr">${pad(a).map(cell).join('')}</div>
    <div class="g5c-sr g5c-sb"><span class="g5c-sign">${sign}</span>${pad(b).map(cell).join('')}</div>
    <div class="g5c-sr g5c-res">${pad(res).map(cell).join('')}</div></div>`;
}

const okBtns = [{ html: '✅ Đúng', value: true }, { html: '❌ Sai', value: false }];

/** Đ/S: đặt tính cộng không thẳng dấu phẩy (6,53 + 12,8 = 78,1). */
function taskMisalign() {
  return {
    id: 'misalign',
    make: (rng) => {
      const a = rnd2(rng, 1, 9, 2);
      let b; do { b = sOf(rng.int(101, 299), 1); } while (b.endsWith('0'));
      return { a, b, ok: rng() < 0.35 };
    },
    async mount(f, { a, b, ok }) {
      injectStyles();
      const A = num(a), B = num(b);
      const right = S(val(a) + val(b));
      const wrong = sOf(Number(A.int + A.dec) + Number(B.int + B.dec), B.dp);
      f.q.innerHTML = `<div>Bạn Nam đặt tính rồi tính ${showS(a)} + ${showS(b)}. Đúng hay sai?</div><small class="g5c-q2">Tính lại cho đúng: ${showS(a)} + ${showS(b)} = ${BOX}</small>`;
      f.tool.innerHTML = staticCol(a, b, '+', ok ? sOf(Math.round(val(right) * 10 ** Math.max(A.dp, B.dp)), Math.max(A.dp, B.dp)) : wrong, ok);
      f.say('Bạn Nam đặt tính như thế này. Đúng hay sai?');
      await f.choose({ options: okBtns, answer: ok, hint: ok ? 'Các chữ số cùng hàng thẳng cột, các dấu phẩy thẳng cột: bạn làm đúng.' : 'Các dấu phẩy chưa thẳng cột. Chữ số cùng hàng phải thẳng cột với nhau.' });
      if (!ok) {
        f.q.querySelector('.g5c-q2').classList.add('g5c-on');
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: right, max: right.length + 1, say: 'Tính lại cho đúng.', hint: `Viết dấu phẩy thẳng dấu phẩy: ${showS(a)} + ${showS(b)} = ${showS(right)}.` });
      }
      f.finish({ ok: ok ? 'Bạn đặt tính đúng: dấu phẩy thẳng cột.' : `Dấu phẩy phải thẳng cột: ${showS(a)} + ${showS(b)} = ${showS(right)}.` });
    },
  };
}

/** Tính thuận tiện: 6 + 8,46 + 1,54 = 6 + (8,46 + 1,54) = 6 + 10. */
function taskConvenient() {
  return {
    id: 'conv',
    make: (rng) => {
      let y; do { y = rng.int(101, 899); } while (y % 10 === 0);
      return { x: rng.int(2, 19), y: sOf(y, 2), z: sOf(1000 - y, 2) };
    },
    async mount(f, { x, y, z }) {
      injectStyles();
      f.q.innerHTML = `<div>Tính bằng cách thuận tiện:</div><div><b>${x} + ${showS(y)} + ${showS(z)}</b></div><small class="g5c-q2">= ${x} + (${showS(y)} + ${showS(z)}) = ${x} + 10 = ${BOX}</small>`;
      f.say('Tính bằng cách thuận tiện. Em cộng hai số nào trước?');
      await f.choose({
        options: [{ html: `(${x} + ${showS(y)}) + ${showS(z)}`, value: 1 }, { html: `${x} + (${showS(y)} + ${showS(z)})`, value: 2 }],
        answer: 2, hint: `${showS(y)} + ${showS(z)} = 10: cộng hai số này trước thì dễ hơn.`,
      });
      f.q.querySelector('.g5c-q2').classList.add('g5c-on');
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: x + 10, max: 3, hint: `${x} + 10 = ${x + 10}.` });
      f.finish({ ok: `${x} + ${showS(y)} + ${showS(z)} = ${x} + 10 = ${x + 10}` });
    },
  };
}

/** Đ/S: 9 − 3,5 = 6,5 (kéo chữ số 5 xuống, quên coi 9 là 9,0). */
function taskPullDown() {
  return {
    id: 'pull',
    make: (rng) => {
      const n = rng.int(4, 19);
      const dp = rng.pick([1, 2]);
      let b; do { b = rnd2(rng, 1, n - 1, dp); } while (val(b) >= n);
      return { n, b, ok: rng() < 0.35 };
    },
    async mount(f, { n, b, ok }) {
      injectStyles();
      const B = num(b);
      const right = S(n - val(b));
      const wrong = `${n - +B.int},${B.dec}`;
      f.q.innerHTML = `<div>Bạn Mai tính ${n} − ${showS(b)} như sau. Đúng hay sai?</div><small class="g5c-q2">Tính lại cho đúng: ${n} − ${showS(b)} = ${BOX}</small>`;
      f.tool.innerHTML = staticCol(String(n), b, '−', ok ? sOf(Math.round(val(right) * 10 ** B.dp), B.dp) : wrong, true);
      f.say('Bạn Mai tính như thế này. Đúng hay sai?');
      await f.choose({ options: okBtns, answer: ok, hint: ok ? `Coi ${n} là ${n},${'0'.repeat(B.dp)} rồi trừ: bạn làm đúng.` : `Không kéo chữ số ${B.dec} xuống. Coi ${n} là ${n},${'0'.repeat(B.dp)} rồi mới trừ.` });
      if (!ok) {
        f.q.querySelector('.g5c-q2').classList.add('g5c-on');
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: right, max: right.length + 1, say: 'Tính lại cho đúng.', hint: `${n},${'0'.repeat(B.dp)} − ${showS(b)} = ${showS(right)}.` });
      }
      f.finish({ ok: `${n} − ${showS(b)} = ${showS(right)} (coi ${n} là ${n},${'0'.repeat(B.dp)}).` });
    },
  };
}
function rnd2(rng, lo, hi, dp) {
  const sc = 10 ** dp;
  for (;;) { const k = rng.int(lo * sc + 1, hi * sc + sc - 1); if (k % 10) return sOf(k, dp); }
}

/** Tìm x: x + 2,35 = 7,1 / x − 1,8 = 3,25. */
function taskFindX() {
  return {
    id: 'findx',
    make: (rng) => {
      const plus = rng() < 0.5;
      const x = rnd2(rng, 2, 9, rng.pick([1, 2]));
      const b = plus ? rnd2(rng, 1, 9, rng.pick([1, 2])) : rnd2(rng, 0, Math.floor(val(x)) - 1, rng.pick([1, 2]));
      return { plus, x, b };
    },
    async mount(f, { plus, x, b }) {
      injectStyles();
      const c = S(plus ? val(x) + val(b) : val(x) - val(b));
      const eq = plus ? `x + ${showS(b)} = ${showS(c)}` : `x − ${showS(b)} = ${showS(c)}`;
      f.q.innerHTML = `<div>Tìm x: <b>${eq}</b></div><small class="g5c-q2 g5c-on">x = ${BOX}</small>`;
      await f.ask({
        box: f.q.querySelector('.g4-box'), answer: x, max: x.length + 1, say: 'Tìm x.',
        hint: plus ? `Muốn tìm số hạng chưa biết, lấy tổng trừ đi số hạng đã biết: x = ${showS(c)} − ${showS(b)}.` : `Muốn tìm số bị trừ, lấy hiệu cộng với số trừ: x = ${showS(c)} + ${showS(b)}.`,
      });
      f.finish({ ok: `x = ${showS(x)}` });
    },
  };
}

/** Biết 64 × 57 = 3 648, tính 6,4 × 0,57. */
function taskKnown() {
  return {
    id: 'known',
    make: (rng) => {
      let p, q; do { p = rng.int(12, 98); q = rng.int(12, 98); } while (p % 10 === 0 || q % 10 === 0 || (p * q) % 10 === 0);
      const da = rng.pick([0, 1, 1, 2]), db = rng.pick([1, 2]);
      return { p, q, da, db };
    },
    async mount(f, { p, q, da, db }) {
      const P = p * q, N = da + db;
      const a = sOf(p, da), b = sOf(q, db);
      const right = sOf(P, N);
      const opts = [...new Set([N - 1, N, N + 1, N + 2].filter(n => n >= 0).map(n => trimS(sOf(P, n))))].slice(0, 4);
      f.q.innerHTML = `<div>Biết <b>${p} × ${q} = ${fmt(P)}</b></div><div>Không đặt tính, tính: <b>${showS(a)} × ${showS(b)} = ?</b></div>`;
      f.say(`Biết ${p} nhân ${q} bằng ${fmt(P)}. Tính ${readDec(a)} nhân ${readDec(b)}.`);
      await f.choose({
        options: opts.map(v => ({ html: showS(v), value: v })), answer: right,
        hint: `Đếm chữ số ở phần thập phân của cả hai thừa số: ${da} + ${db} = ${N}. Tách ở tích ra ${N} chữ số kể từ phải sang trái.`,
      });
      f.finish({ ok: `${showS(a)} × ${showS(b)} = ${showS(right)} (tách ra ${N} chữ số).` });
    },
  };
}

/** Đ/S: chỉ đếm chữ số thập phân của một thừa số (4,3 × 3,6 = 154,8). */
function taskCountOne() {
  return {
    id: 'count1',
    make: (rng) => {
      let p, q; do { p = rng.int(12, 98); q = rng.int(12, 98); } while (p % 10 === 0 || q % 10 === 0 || (p * q) % 10 === 0);
      return { p, q, db: rng.pick([1, 2]), ok: rng() < 0.35 };
    },
    async mount(f, { p, q, db, ok }) {
      injectStyles();
      const a = sOf(p, 1), b = sOf(q, db);
      const P = p * q, N = 1 + db;
      const right = sOf(P, N), shown = ok ? right : sOf(P, db);
      f.q.innerHTML = `<div>Bạn Mai tính: <b>${showS(a)} × ${showS(b)} = ${showS(shown)}</b>. Đúng hay sai?</div><small class="g5c-q2">Tính lại cho đúng: ${showS(a)} × ${showS(b)} = ${BOX}</small>`;
      f.say('Bạn Mai đặt dấu phẩy ở tích như thế này. Đúng hay sai?');
      await f.choose({ options: okBtns, answer: ok, hint: ok ? `Hai thừa số có tất cả ${N} chữ số ở phần thập phân, tích tách ra ${N} chữ số: đúng.` : `Phải đếm chữ số thập phân của cả hai thừa số: 1 + ${db} = ${N} chữ số.` });
      if (!ok) {
        f.q.querySelector('.g5c-q2').classList.add('g5c-on');
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: right, max: right.length + 1, say: 'Tính lại cho đúng.', hint: `${p} × ${q} = ${fmt(P)}, tách ra ${N} chữ số: ${showS(right)}.` });
      }
      f.finish({ ok: `${showS(a)} × ${showS(b)} = ${showS(right)}.` });
    },
  };
}

/** Tính thuận tiện: 6,84 × 0,2 × 5 = 6,84 × (0,2 × 5) = 6,84 × 1. */
function taskConvMul() {
  return {
    id: 'convmul',
    make: (rng) => {
      const [u, v, r] = rng.pick([['0,2', '5', 1], ['0,5', '2', 1], ['0,25', '4', 1], ['2,5', '4', 10], ['0,4', '25', 10]]);
      return { x: rnd2(rng, 1, 9, 2), u, v, r };
    },
    async mount(f, { x, u, v, r }) {
      injectStyles();
      const res = S(val(x) * r);
      f.q.innerHTML = `<div>Tính bằng cách thuận tiện:</div><div><b>${showS(x)} × ${u} × ${v}</b></div><small class="g5c-q2">= ${showS(x)} × (${u} × ${v}) = ${showS(x)} × ${r} = ${BOX}</small>`;
      f.say('Tính bằng cách thuận tiện. Em nhân hai số nào trước?');
      await f.choose({
        options: [{ html: `(${showS(x)} × ${u}) × ${v}`, value: 1 }, { html: `${showS(x)} × (${u} × ${v})`, value: 2 }],
        answer: 2, hint: `${u} × ${v} = ${r}: nhân hai số này trước thì dễ hơn.`,
      });
      f.q.querySelector('.g5c-q2').classList.add('g5c-on');
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: res, max: res.length + 1, hint: `${showS(x)} × ${r} = ${showS(res)}.` });
      f.finish({ ok: `${showS(x)} × ${u} × ${v} = ${showS(x)} × ${r} = ${showS(res)}` });
    },
  };
}

const B19 = {
  explore: E19,
  tasks: () => [taskDrill('c19a', DADD_GAME, 0), taskDrill('c19b', DADD_GAME, 1), taskDrill('c19c', DADD_GAME, 2), taskMisalign(), taskConvenient()],
};
const B20 = {
  explore: E20,
  tasks: () => [taskDrill('c20a', DADD_GAME, 3), taskDrill('c20b', DADD_GAME, 4), taskPullDown(), taskFindX(), taskDrill('c20c', DADD_GAME, 3)],
};
const B21 = {
  explore: E21,
  tasks: () => [taskDrill('c21a', DMUL_GAME, 0), taskDrill('c21b', DMUL_GAME, 2), taskKnown(), taskCountOne(), taskDrill('c21c', DMUL_GAME, 1), taskDrill('c21d', DMUL_GAME, 3), taskConvMul()],
};

export const CALC_LESSONS = { 19: B19, 20: B20, 21: B21 };

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  css('g5-calc', `
    /* Tờ vở đặt tính trong Khám phá: chừa đáy cho nút chọn (đè lên, không đẩy) */
    .g5c-wrap { flex: 1; min-height: 0; display: flex; flex-direction: column; padding-bottom: 18cqh; box-sizing: border-box; }
    .g5c-wrap .g3c-head { padding-left: 2cqi; }
    .g5c-wrap.g5c-full { padding-bottom: 1cqh; }
    .g5c-hl { background: #FEF08A; border-radius: 0.2em; box-shadow: inset 0 0 0 3px #F59E0B; }
    /* Tình huống: hình to + 4 dòng tính giữ chỗ sẵn */
    .g5c-story { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 1cqh; padding: 2cqh 2cqi 18cqh; box-sizing: border-box; }
    .g5c-pic { flex: 1 1 0; min-height: 0; display: flex; justify-content: center; }
    .g5c-pic svg { width: 100%; height: 100%; }
    .g5c-lines { flex: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.6cqh 2cqi; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(5.6cqh, 3.4cqi); line-height: 1.25; }
    .g5c-line { visibility: hidden; background: #F8FAFC; border: 3px solid #CBD5E1; border-radius: 0.6em; padding: 0.1em 0.5em; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .g5c-line.g5c-on { visibility: visible; animation: g5cIn .4s ease-out; }
    .g5c-line b { color: #C2410C; }
    @keyframes g5cIn { from { opacity: 0; transform: translateY(0.4em); } }
    @container (orientation: portrait) { .g5c-lines { grid-template-columns: minmax(0, 1fr); font-size: min(4.6cqh, 5.4cqi); } }
    .g5c-pop { animation: g5cPop .45s cubic-bezier(.2,1.5,.4,1); transform-box: fill-box; transform-origin: center; }
    @keyframes g5cPop { from { transform: scale(0.4); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .g5c-line.g5c-on { animation: g5cFade .4s ease; } .g5c-pop { animation: g5cFade .45s ease; }
      @keyframes g5cFade { from { opacity: 0; } }
    }
    /* Dòng thứ hai của câu (tính lại / kết quả) giữ chỗ từ đầu */
    .g5c-q2 { visibility: hidden; margin-top: 0.3em; font-size: 0.85em !important; color: #1E293B !important; font-weight: 800 !important; }
    .g5c-q2.g5c-on { visibility: visible; }
    /* Phép tính dọc vẽ sẵn (Đ/S) */
    .g5c-static { margin: auto; display: inline-flex; flex-direction: column; align-items: flex-end; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; line-height: 1.05;
      font-size: min(22cqh, 13cqi); background: #fff; padding: 0.1em 0.5em; border-radius: 0.3em;
      background-image: linear-gradient(#DBEAFE 1.5px, transparent 1.5px); background-size: 100% 1.05em; }
    .g5c-sr { display: flex; align-items: baseline; position: relative; }
    .g5c-sr i { font-style: normal; width: 0.62em; text-align: center; }
    .g5c-sr i.g5c-cm { width: 0.3em; }
    .g5c-ghost { visibility: hidden; }
    .g5c-sign { position: absolute; right: calc(100% + 0.4em); }
    .g5c-sb { border-bottom: 0.08em solid ${INK}; min-width: 100%; justify-content: flex-end; padding-left: 1em; }
    .g5c-res { color: #1D4ED8; }
  `);
}
