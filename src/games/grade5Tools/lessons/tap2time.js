/**
 * Chủ đề 10 (Toán 5 Tập Hai): Bài 56–60, số đo thời gian, vận tốc, quãng đường, thời gian.
 *   Bài 56 Các đơn vị đo thời gian (tr. 64–66, đối chiếu sách mẫu): bảng đơn vị, số ngày các tháng, thế kỉ,
 *          đổi phút ⇄ số thập phân của giờ (⏱️ mặt đồng hồ chia 10 phần, mỗi phần 6 phút = 0,1 giờ).
 *   Bài 57 Cộng, trừ số đo thời gian (tr. 67 đối chiếu sách mẫu; tr. 68–70 chưa đối chiếu sách): ⏱️ đặt tính cột.
 *   Bài 58 Nhân, chia số đo thời gian (chưa đối chiếu sách): ⏱️ đặt tính, chia có dư đổi xuống đơn vị bé.
 *   Bài 59 Vận tốc, Bài 60 Quãng đường, thời gian (chưa đối chiếu sách): 🚗 đường chuyển động.
 * Phương án nhiễu là lỗi hay gặp: 1,5 giờ = 1 giờ 50 phút; để nguyên 80 phút; mượn 1 giờ thành 100 phút;
 * km/giờ nhân với số phút; t = 1,25 giờ đọc thành 1 giờ 25 phút.
 */

import { createTimeCol, createDecClock, tstr, toSmall, fromSmall } from '../tcol.js';
import { createMove } from '../move.js';
import { anim } from '../../grade4Tools/canvas.js';
import { roman, centuryOf } from '../../grade4Tools/lessons/time.js';
import { BOX } from '../../grade4Tools/practice.js';
import { css, INK, sfx } from '../../grade4Tools/frame.js';
import { sleep } from '../../grade3Drills/kit.js';
import { dec, decKey, clean, fr } from '../num.js';

/** Chờ em thao tác (c.until); DEV: window.__g5solve làm thay để chạy tự động. */
async function waitDo(c, t, pred, opts, solve) {
  if (import.meta.env.DEV) window.__g5solve = () => { window.__g5solve = null; solve(); };
  try { await c.until(t, pred, opts); } finally { if (import.meta.env.DEV) window.__g5solve = null; }
}
/** Chữ cho giọng đọc: đơn vị, dấu phép tính đọc thành lời (bong bóng vẫn hiện gọn như sách). */
export const spk = (t) => String(t)
  .replace(/km\/giờ/g, 'ki-lô-mét trên giờ').replace(/km\/phút/g, 'ki-lô-mét trên phút').replace(/km\/giây/g, 'ki-lô-mét trên giây')
  .replace(/(\d)\s*m\/giây/g, '$1 mét trên giây').replace(/(\d)\s*m\/phút/g, '$1 mét trên phút').replace(/(^|\s)m\/(giây|phút)/g, '$1mét trên $2')
  .replace(/(\d)\s*km(?![\p{L}])/gu, '$1 ki-lô-mét').replace(/(\d)\s*m(?![\p{L}²³\/])/gu, '$1 mét')
  .replace(/bằng km(?![\p{L}\/])/gu, 'bằng ki-lô-mét').replace(/bằng m(?![\p{L}²³\/])/gu, 'bằng mét')
  .replace(/(\d+)\/(\d+)/g, '$1 phần $2')
  .replace(/ × /g, ' nhân ').replace(/ : /g, ' chia ').replace(/ − /g, ' trừ ').replace(/ \+ /g, ' cộng ').replace(/ = /g, ' bằng ');
/** Thầy đọc câu đã đổi sang lời (f.say, f.hint của câu Thực hành); chữ hiện giữ nguyên. */
function voice(f) {
  const say = f.say, hint = f.hint;
  f.say = (text, shown) => say(spk(text), shown || text);
  f.hint = (text, shown) => hint(spk(text), shown || text);
}
/** Ghi dạng câu đang chạy (DEV, cho kịch bản kiểm thử). */
const mark = (id) => { if (import.meta.env.DEV) window.__g5sh = { task: id }; };
const D = (x) => dec(clean(x));
/** Trộn cố định theo hạt (mount không có rng). */
function shuffleBy(arr, seed) {
  const a = [...arr];
  let s = Math.abs(Math.round(seed)) * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Chừa sẵn hàng nút chọn (cùng cỡ nút thật) để công cụ đo khung hình đúng, không bị co lại khi nút hiện. */
const reserveChoices = (f) => { f.choicesBox.classList.add('g4-choices-on'); f.choicesBox.innerHTML = '<button type="button" class="g4-choice" disabled>&nbsp;</button>'; };
const uniq = (arr) => [...new Map(arr.map(o => [o.value, o])).values()];
const opts = (list, seed) => shuffleBy(uniq(list.map(v => ({ html: v, value: v }))), seed);
const HM = ['giờ', 'phút'], MS = ['phút', 'giây'];

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Hình phụ: bảng đơn vị, dải 12 tháng, trục thế kỉ
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const FACTS = [
  ['1 thế kỉ', 100, 'năm'], ['1 năm', 12, 'tháng'], ['1 năm', 365, 'ngày'], ['1 năm nhuận', 366, 'ngày'],
  ['1 tuần lễ', 7, 'ngày'], ['1 ngày', 24, 'giờ'], ['1 giờ', 60, 'phút'], ['1 phút', 60, 'giây'],
];
/** Bảng 8 dòng đơn vị đo thời gian (như hai khung hồng của sách); số ẩn "?" tới khi t.reveal(i). */
function unitTable(host, { ov = false } = {}) {
  injectT10Styles();
  host.innerHTML = `<div class="g5u ${ov ? 'g5u-ov' : ''}"><div class="g5u-grid">${FACTS.map(([a, v, u], i) =>
    `<div class="g5u-row" data-i="${i}"><span>${a} =</span><b class="g5u-v">?</b><span>${u}</span></div>`).join('')}</div></div>`;
  const t = { on: () => () => {} };
  t.row = (i) => host.querySelector(`.g5u-row[data-i="${i}"]`);
  t.reveal = async (i) => {
    const b = t.row(i).querySelector('.g5u-v');
    b.textContent = FACTS[i][1];
    b.classList.add('g5u-ok');
    b.animate([{ transform: 'scale(1.5)' }, { transform: 'none' }], { duration: anim(400), easing: 'ease-out' });
    sfx.pop?.(i + 1);
    await sleep(anim(300));
  };
  t.focus = (i) => host.querySelectorAll('.g5u-row').forEach(r => r.classList.toggle('g5u-hl', +r.dataset.i === i));
  return t;
}

const MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_NAME = ['Một', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Mười một', 'Mười hai'];
/** 12 thẻ tháng, chiều cao tỉ lệ với số ngày (28–31), số ngày trên đầu; hide: tháng (0–11) có số ngày ẩn. */
function monthStrip(host, { hide = -1, leap = false, ov = false } = {}) {
  injectT10Styles();
  const days = (m) => (m === 1 && leap ? 29 : MONTHS[m]);
  host.innerHTML = `<div class="g5m ${ov ? 'g5u-ov' : ''}"><div class="g5m-row">${MONTHS.map((_, m) =>
    `<div class="g5m-c" data-m="${m}"><b class="g5m-d">${m === hide ? '?' : days(m)}</b><div class="g5m-bar g5m-${days(m)}" style="height:${(days(m) / 31) * 100}%"></div><span class="g5m-n">${m + 1}</span></div>`).join('')}</div>
    <div class="g5m-key"><i class="g5m-31"></i>31 ngày <i class="g5m-30"></i>30 ngày <i class="g5m-28"></i>tháng Hai</div></div>`;
  const t = { on: () => () => {} };
  t.show = (m) => { const b = host.querySelector(`.g5m-c[data-m="${m}"] .g5m-d`); b.textContent = days(m); b.animate([{ transform: 'scale(1.6)' }, { transform: 'none' }], { duration: anim(420) }); sfx.ding?.(); };
  t.focus = (ms) => host.querySelectorAll('.g5m-c').forEach(c => c.classList.toggle('g5m-hl', ms.includes(+c.dataset.m)));
  return t;
}

/** Trục thế kỉ: các khối thế kỉ quanh năm y (số La Mã), vạch đỏ ở năm y. Khung hình theo tỉ lệ ô chứa (kín chỗ). */
function centuryLine(host, y, { ov = false, show = false } = {}) {
  injectT10Styles();
  host.innerHTML = `<div class="g5cl ${ov ? 'g5u-ov' : ''}"><svg class="g5cl-svg" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  const bw = svg.clientWidth || 900, bh = svg.clientHeight || 420;
  const portrait = bh > bw;
  const W = 1000, H = Math.max(300, Math.min(1400, (W * bh) / bw));
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const c = centuryOf(y);
  const n = portrait ? 3 : 5;
  const c0 = Math.max(1, c - (n - 1) / 2), x0 = 30, bwid = (W - 60) / n;
  const k = portrait ? 1.9 : 1.25;
  const bH = Math.min(H * 0.34, 150 * k), by = H / 2 - bH / 2 + 30 * k;
  let g = '';
  for (let i = 0; i < n; i++) {
    const kk = c0 + i, x = x0 + i * bwid;
    g += `<g class="g5cl-b" data-c="${kk}"><rect x="${x}" y="${by}" width="${bwid}" height="${bH}" fill="${i % 2 ? '#BFDBFE' : '#FDE68A'}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + bwid / 2}" y="${by + bH / 2 + 17 * k}" font-size="${48 * k}" class="g5cl-t">${show || kk !== c ? roman(kk) : '?'}</text>
      <text x="${x + 6}" y="${by + bH + 34 * k}" font-size="${26 * k}" class="g5cl-t" style="text-anchor:start" fill="#64748B">${(kk - 1) * 100 + 1}</text></g>`;
  }
  const xy = x0 + ((y - (c0 - 1) * 100 - 0.5) / (n * 100)) * (W - 60);
  g += `<line x1="${xy}" y1="${by - 30 * k}" x2="${xy}" y2="${by + bH + 12}" stroke="#DC2626" stroke-width="${6 * k}"/><circle cx="${xy}" cy="${by - 30 * k}" r="${10 * k}" fill="#DC2626"/>
    <text x="${Math.min(W - 70 * k, Math.max(70 * k, xy))}" y="${by - 50 * k}" font-size="${52 * k}" class="g5cl-t" fill="#DC2626">${y}</text>`;
  svg.innerHTML = g;
  const t = { on: () => () => {} };
  t.reveal = () => {
    const tx = svg.querySelector(`.g5cl-b[data-c="${c}"] text`);
    tx.textContent = roman(c);
    tx.animate([{ opacity: 0 }, { opacity: 1 }], { duration: anim(400) });
    sfx.ding?.();
  };
  return t;
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 56. Các đơn vị đo thời gian (tr. 64–66)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const EVENTS = [
  ['Hai Bà Trưng khởi nghĩa năm', 40], ['Đinh Bộ Lĩnh lên ngôi Hoàng đế năm', 968], ['Lý Công Uẩn dời đô về Thăng Long năm', 1010],
  ['Hội nghị Diên Hồng năm', 1284], ['Chiến thắng Bạch Đằng năm', 938], ['Quang Trung đại phá quân Thanh năm', 1789],
  ['Cách mạng tháng Tám năm', 1945], ['Chiến thắng Điện Biên Phủ năm', 1954], ['Giải phóng miền Nam, thống nhất đất nước năm', 1975],
];

const B56 = {
  explore: {
    setup: (board) => unitTable(board, { ov: true }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Ngày, tháng, năm, giờ, phút, giây là các đơn vị đo thời gian. Cùng điền bảng đơn vị.');
        await t.reveal(0); await t.reveal(1); await t.reveal(2);
        t.focus(3);
        await c.say('Năm nhuận dài hơn năm thường một ngày. Một năm nhuận có bao nhiêu ngày?');
        await c.choose(['365', '366', '360'].map(v => ({ html: `${v} ngày`, value: v })), '366', { hint: 'Năm thường 365 ngày, năm nhuận thêm 1 ngày.' });
        await t.reveal(3);
        await t.reveal(4);
        t.focus(5);
        await c.say('Một ngày có bao nhiêu giờ?');
        await c.choose(['12', '24', '60'].map(v => ({ html: `${v} giờ`, value: v })), '24', { hint: 'Một ngày một đêm, kim giờ quay hai vòng: 12 + 12.' });
        await t.reveal(5);
        t.focus(6);
        await c.say('Một giờ có bao nhiêu phút?');
        await c.choose(['100', '60', '24'].map(v => ({ html: `${v} phút`, value: v })), '60', { hint: 'Kim phút quay một vòng 60 vạch là một giờ.' });
        await t.reveal(6); await t.reveal(7);
        t.focus(-1);
        await c.say('Giờ, phút, giây đổi theo 60, không theo 10 như số thập phân. Cứ 4 năm lại có một năm nhuận.');
      },
      async (c) => {
        const t = c.use((b) => monthStrip(b, { hide: 7, ov: true }));
        await c.say('Mỗi thẻ là một tháng, cao theo số ngày. Tháng màu cam có 31 ngày, màu xanh có 30 ngày.');
        t.focus([7]);
        await c.say('Tháng Bảy có 31 ngày. Tháng Tám liền sau thì sao?');
        await c.choose([{ html: '30 ngày', value: 30 }, { html: '31 ngày', value: 31 }], 31, { hint: 'Tháng Bảy và tháng Tám đứng liền nhau, đều có 31 ngày.' });
        t.show(7);
        t.focus([1]);
        await c.say('Tháng Hai ngắn nhất: 28 ngày. Năm nhuận, tháng Hai có 29 ngày.');
        t.focus([3, 5, 8, 10]);
        await c.say('Tháng Tư, tháng Sáu, tháng Chín, tháng Mười một có 30 ngày. Các tháng còn lại có 31 ngày.');
        t.focus([]);
      },
      async (c) => {
        let t = c.use((b) => centuryLine(b, 1010, { ov: true }));
        await c.say('Từ năm 1 đến năm 100 là thế kỉ một. Từ năm 1001 đến năm 1100 là thế kỉ mười một.');
        await c.say('Lý Công Uẩn dời đô về Thăng Long năm 1010. Năm đó thuộc thế kỉ nào?');
        await c.choose(['X', 'XI', 'XII'].map(v => ({ html: `Thế kỉ ${v}`, value: v })), 'XI', { hint: 'Năm 1010 nằm trong khối từ năm 1001 đến năm 1100.' });
        t.reveal();
        t = c.use((b) => centuryLine(b, 1954, { ov: true }));
        await c.say('Chiến thắng Điện Biên Phủ năm 1954. Thế kỉ nào?');
        await c.choose(['XIX', 'XX', 'XXI'].map(v => ({ html: `Thế kỉ ${v}`, value: v })), 'XX', { hint: 'Từ năm 1901 đến năm 2000 là thế kỉ hai mươi.' });
        t.reveal();
        await c.say('Đúng rồi! Năm 1954 thuộc thế kỉ hai mươi, viết bằng số La Mã là XX.');
      },
      async (c) => {
        const t = c.use((b) => createDecClock(b, { clocks: 2, tap: true, ov: true }));
        await c.say('Mặt đồng hồ chia 10 phần bằng nhau. Mỗi phần là 6 phút, bằng không phẩy một giờ.');
        await c.say('Em hãy tô 72 phút: tô đủ một vòng, rồi tô thêm 2 phần ở mặt thứ hai.', 'Bấm tô <b>72 phút</b>');
        await waitDo(c, t, () => t.count() === 12, { nudge: 'Bấm từng phần của mặt đồng hồ thứ nhất cho đủ vòng, rồi bấm 2 phần ở mặt thứ hai.', el: () => t.face(t.count() < 10 ? 0 : 1) }, () => t.set(12, 60));
        t.sum('72 phút = 72/60 giờ = <b>1,2 giờ</b>');
        await c.say('72 phút là 1 giờ và 2 phần mười giờ. 72 phút bằng một phẩy hai giờ.');
      },
      async (c) => {
        const t = c.use((b) => createDecClock(b, { clocks: 2, ov: true }));
        await t.set(15, 90);
        await c.say('Đây là một phẩy năm giờ. Một phẩy năm giờ là bao nhiêu?');
        await c.choose(['1 giờ 50 phút', '1 giờ 30 phút', '1 giờ 5 phút'].map(v => ({ html: v, value: v })), '1 giờ 30 phút', {
          hint: (v) => (v === '1 giờ 50 phút' ? 'Mỗi phần là 6 phút: 5 phần là 5 × 6 = 30 phút, không phải 50.' : 'Đếm số phần đã tô ở mặt thứ hai: mỗi phần 6 phút.'),
        });
        t.sum('0,5 giờ = 5 × 6 = 30 phút → <b>1,5 giờ = 1 giờ 30 phút</b>');
        await c.say('Đúng rồi! 0,5 giờ là 30 phút. Một phẩy năm giờ là 1 giờ 30 phút.');
      },
    ],
  },
  tasks: () => [taskFact(), taskMonth(), taskCentury(), taskToDec(), taskFromDec(), taskFrac(), taskSpin()],
};

// ── Thực hành Bài 56 ──────────────────────────────────────────────────────────────────────────────────
function taskFact() {
  const BASE = [['thế kỉ', 'năm', 100], ['năm', 'tháng', 12], ['tuần lễ', 'ngày', 7], ['ngày', 'giờ', 24], ['giờ', 'phút', 60], ['phút', 'giây', 60]];
  return {
    id: 't56fact',
    make: (rng) => {
      const [big, small, r] = rng.pick(BASE);
      const n = rng.pick([1, 1, 2, 3, 4, 5]);
      return { big, small, r, n, back: n > 1 && rng.int(0, 1) === 1 && r !== 100 };
    },
    async mount(f, { big, small, r, n, back }) {
      mark('t56fact');
      voice(f);
      const ans = back ? n : n * r;
      f.q.innerHTML = back ? `${n * r} ${small} = ${BOX} ${big}` : `${n} ${big} = ${BOX} ${small}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 4, say: 'Điền số thích hợp.',
        hint: (v) => (r === 60 && (v === n * 100 || v === n * 10) ? `Thời gian đổi theo 60: 1 ${big} = 60 ${small}.` : `Nhớ: 1 ${big} = ${r} ${small}.`) });
      f.finish({ ok: `1 ${big} = ${r} ${small}, nên ${back ? `${n * r} ${small} = ${n} ${big}` : `${n} ${big} = ${n * r} ${small}`}.` });
    },
  };
}

function taskMonth() {
  return {
    id: 't56month',
    make: (rng) => { const m = rng.int(0, 11); return { m, leap: m === 1 ? rng.int(0, 1) : 0, y: rng.pick([2024, 2028, 2032]) }; },
    async mount(f, { m, leap, y }) {
      mark('t56month');
      voice(f);
      const d = m === 1 && leap ? 29 : MONTHS[m];
      const name = `tháng ${MONTH_NAME[m]}${m === 1 ? (leap ? ` năm ${y} (năm nhuận)` : ' năm thường') : ''}`;
      f.q.innerHTML = `Tháng ${MONTH_NAME[m]}${m === 1 ? (leap ? ` năm ${y} <small>năm nhuận</small>` : ' <small>năm thường</small>') : ''} có bao nhiêu ngày?`;
      const t = monthStrip(f.tool, { hide: m, leap: !!leap });
      t.focus([m]);
      await f.choose({ options: [28, 29, 30, 31].map(v => ({ html: `${v} ngày`, value: v })), answer: d, say: `${name} có bao nhiêu ngày?`,
        hint: m === 1 ? 'Tháng Hai có 28 ngày, năm nhuận có 29 ngày.' : m === 7 ? 'Tháng Bảy và tháng Tám liền nhau đều có 31 ngày.' : 'Tháng Tư, Sáu, Chín, Mười một có 30 ngày; các tháng khác (trừ tháng Hai) có 31 ngày.' });
      t.show(m);
      f.finish({ ok: `Tháng ${MONTH_NAME[m]} có ${d} ngày.` });
    },
  };
}

function taskCentury() {
  return {
    id: 't56cent',
    make: (rng) => { const [who, y] = rng.pick(EVENTS); return { who, y }; },
    async mount(f, { who, y }) {
      mark('t56cent');
      voice(f);
      const c = centuryOf(y);
      f.q.innerHTML = `${who} <b>${y}</b>. Năm đó thuộc thế kỉ nào?`;
      reserveChoices(f); // nút chọn có chỗ trước khi đo khung hình
      const t = centuryLine(f.tool, y);
      const list = [c - 1, c, c + 1, Math.floor(y / 100)].filter(x => x >= 1);
      await f.choose({ options: shuffleBy(uniq(list.map(x => ({ html: `Thế kỉ ${roman(x)}`, value: x }))), y), answer: c, say: `${who} ${y}. Năm đó thuộc thế kỉ nào?`,
        hint: (v) => (v === Math.floor(y / 100) && v !== c ? 'Không lấy hai chữ số đầu. Năm 1901 đến năm 2000 là thế kỉ XX.' : 'Tìm khối thế kỉ có vạch đỏ.') });
      t.reveal();
      f.finish({ ok: `Năm ${y} thuộc thế kỉ ${roman(c)}.` });
    },
  };
}

/** Phút → số thập phân của giờ (giây → phút): số phút là bội của 6 để tô đúng trên mặt đồng hồ. */
function taskToDec() {
  return {
    id: 't56dec',
    make: (rng) => { const sec = rng.int(0, 3) === 0; const tenths = rng.int(sec ? 1 : 2, sec ? 9 : 25); return { tenths, sec, whole: !sec && rng.int(0, 2) === 0 && tenths > 10 && tenths % 10 !== 0 }; },
    async mount(f, { tenths, sec, whole }) {
      mark('t56dec');
      voice(f);
      const [big, small] = sec ? MS : HM;
      const n = tenths * 6;
      const left = whole ? tstr([Math.floor(n / 60), n % 60], [big, small]) : `${n} ${small}`;
      f.q.innerHTML = `${left} = ${BOX} ${big}`;
      const t = createDecClock(f.tool, { clocks: Math.max(1, Math.ceil(tenths / 10)), big, small });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(tenths / 10), max: 5, say: `${left} bằng bao nhiêu ${big}? Viết số thập phân.`,
        hint: (v) => (Math.abs(v - (Math.floor(n / 60) + (n % 60) / 100)) < 1e-9 ? `Không ghép số. Mỗi 6 ${small} là 0,1 ${big}.` : `Lấy ${n} chia cho 60. Mỗi 6 ${small} là 0,1 ${big}.`) });
      await t.set(tenths, 70);
      t.sum(`${n} ${small} = ${n}/60 ${big} = <b>${D(tenths / 10)} ${big}</b>`);
      f.finish({ ok: `${left} = ${D(tenths / 10)} ${big}.` });
    },
  };
}

/** Số thập phân của giờ → giờ phút (chọn), nhiễu: đọc phần thập phân như phút. */
function taskFromDec() {
  return {
    id: 't56from',
    make: (rng) => ({ w: rng.int(1, 2), d: rng.pick([1, 2, 3, 4, 6, 7, 8, 9]), sec: rng.int(0, 3) === 0 }),
    async mount(f, { w, d, sec }) {
      mark('t56from');
      voice(f);
      const [big, small] = sec ? MS : HM;
      const ok = `${w} ${big} ${d * 6} ${small}`;
      f.q.innerHTML = `${w},${d} ${big} = ?`;
      const t = createDecClock(f.tool, { clocks: w + 1, big, small });
      const list = [ok, `${w} ${big} ${d * 10} ${small}`, `${w} ${big} ${d} ${small}`];
      await f.choose({ options: opts(list, w * 10 + d), answer: ok, say: `${w} phẩy ${d} ${big} bằng bao nhiêu?`,
        hint: (v) => (v.includes(`${d * 10} ${small}`) ? `0,${d} ${big} không phải ${d * 10} ${small}. Mỗi 0,1 ${big} là 6 ${small}.` : `0,${d} ${big} = ${d} × 6 ${small}.`) });
      await t.set(w * 10 + d, 60);
      t.sum(`0,${d} ${big} = ${d} × 6 = ${d * 6} ${small}`);
      f.finish({ ok: `${w},${d} ${big} = ${ok}.` });
    },
  };
}

function taskFrac() {
  const L = [[1, 2, 'giờ', 'phút', 60], [1, 4, 'giờ', 'phút', 60], [3, 4, 'giờ', 'phút', 60], [1, 3, 'giờ', 'phút', 60], [1, 5, 'giờ', 'phút', 60], [1, 6, 'giờ', 'phút', 60],
    [2, 5, 'phút', 'giây', 60], [1, 2, 'phút', 'giây', 60], [3, 5, 'phút', 'giây', 60], [1, 4, 'ngày', 'giờ', 24], [1, 3, 'ngày', 'giờ', 24], [1, 2, 'năm', 'tháng', 12], [3, 4, 'năm', 'tháng', 12], [1, 2, 'thế kỉ', 'năm', 100]];
  return {
    id: 't56frac',
    make: (rng) => ({ i: rng.int(0, L.length - 1) }),
    async mount(f, { i }) {
      mark('t56frac');
      voice(f);
      const [a, b, big, small, r] = L[i];
      const ans = (r / b) * a;
      f.q.innerHTML = `${fr(a, b)} ${big} = ${BOX} ${small}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 3, say: `${a} phần ${b} ${big} bằng bao nhiêu ${small}?`,
        hint: `1 ${big} = ${r} ${small}. Lấy ${r} chia ${b} rồi nhân ${a}.` });
      f.finish({ ok: `${r} : ${b} × ${a} = ${ans}, nên ${a}/${b} ${big} = ${ans} ${small}.` });
    },
  };
}

/** Con quay của bạn nào quay lâu nhất (sách tr. 66): ba số đo khác đơn vị, đổi về giây để so. */
function taskSpin() {
  const NAMES = ['Việt', 'Nam', 'Mai', 'Rô-bốt', 'Mi'];
  return {
    id: 't56spin',
    make: (rng) => {
      // ba dạng: a phút b giây; phân số của giờ (1/20, 1/30, 1/15, 1/12); số thập phân của giờ (0,05; 0,1; 0,08)
      const fracs = [[1, 20, 180], [1, 30, 120], [1, 15, 240], [1, 12, 300]];
      const decs = [[0.05, 180], [0.1, 360], [0.08, 288], [0.06, 216]];
      for (;;) {
        const fq = rng.pick(fracs), dq = rng.pick(decs);
        const m = rng.int(2, 5), s = rng.pick([0, 10, 20, 30, 40, 50]);
        const vals = [m * 60 + s, fq[2], dq[1]];
        if (new Set(vals).size < 3) continue;
        return { names: rng.shuffle(NAMES).slice(0, 3), m, s, f: [fq[0], fq[1]], d: dq[0], vals, order: rng.shuffle([0, 1, 2]) };
      }
    },
    async mount(f, { names, m, s, f: [fa, fb], d, vals, order }) {
      mark('t56spin');
      voice(f);
      const texts = [`${m} phút${s ? ` ${s} giây` : ''}`, `${fr(fa, fb)} giờ`, `${D(d)} giờ`];
      const best = vals.indexOf(Math.max(...vals));
      f.q.innerHTML = 'Con quay của bạn nào quay lâu nhất?';
      injectT10Styles();
      // mỗi bạn là một nút to: tên, con quay, thời gian; sau khi chọn đúng hiện số giây trong nút
      f.tool.innerHTML = '<div class="g5sp"></div>';
      await f.choose({ host: f.tool.querySelector('.g5sp'), cls: 'g5sp-r',
        options: order.map(i => ({ html: `<span class="g5sp-top">🌀</span><b>${names[i]}</b><span class="g5sp-v">${texts[i]}</span><span class="g5sp-s" data-i="${i}">&nbsp;</span>`, value: i })),
        answer: best, say: 'Con quay của bạn nào quay lâu nhất? Đổi về cùng đơn vị giây rồi so sánh.',
        hint: 'Đổi tất cả ra giây: 1 phút = 60 giây, 1 giờ = 3 600 giây.' });
      for (const i of order) {
        const e = f.tool.querySelector(`.g5sp-s[data-i="${i}"]`);
        e.textContent = `= ${vals[i]} giây`;
        e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: anim(300) });
        await sleep(anim(250));
      }
      f.finish({ ok: `Con quay của ${names[best]} quay lâu nhất: ${vals[best]} giây.` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 57. Cộng, trừ số đo thời gian (tr. 67 đối chiếu sách mẫu; tr. 68–70 chưa đối chiếu sách)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B57 = {
  explore: {
    setup: (board) => createTimeCol(board, { a: [19, 15], b: [1, 30], op: '+', ov: true }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Phim bắt đầu lúc 19 giờ 15 phút, dài 1 giờ 30 phút. Phim kết thúc lúc mấy giờ?');
        await c.say('Đặt tính: giờ thẳng cột giờ, phút thẳng cột phút. Cộng từ cột phút trước.');
        t.mark(1);
        await c.say('15 phút cộng 30 phút bằng bao nhiêu?');
        await c.choose([{ html: '45 phút', value: 45 }, { html: '35 phút', value: 35 }, { html: '16 phút', value: 16 }], 45, { hint: '15 + 30, chỉ cộng các số phút với nhau.' });
        t.put(1, 45); t.clearMarks(); t.mark(0);
        await c.say('19 giờ cộng 1 giờ bằng 20 giờ.');
        t.put(0, 20); t.clearMarks();
        await c.say('Phim kết thúc lúc 20 giờ 45 phút.');
      },
      async (c) => {
        const t = c.use((b) => createTimeCol(b, { a: [3, 45], b: [2, 35], op: '+', ov: true }));
        await c.say('3 giờ 45 phút cộng 2 giờ 35 phút. Cộng từng cột như trước.');
        await t.fill([5, 80]);
        await c.say('Được 5 giờ 80 phút. 80 phút nhiều hơn 60 phút, phải đổi.', 'Đủ <b>60 phút</b> thì đổi thành <b>1 giờ</b>');
        await c.choose([{ html: '🔄 Đổi 60 phút = 1 giờ', value: 1 }], 1);
        const r = await t.carry(1, [5, 80]);
        await t.fill(r, 'x');
        await c.say('80 phút là 1 giờ 20 phút. Kết quả là 6 giờ 20 phút.');
      },
      async (c) => {
        const t = c.use((b) => createTimeCol(b, { a: [15, 55], b: [13, 10], op: '−', x: false, ov: true }));
        await c.say('Trừ số đo thời gian cũng trừ từng cột, từ cột phút. 55 phút trừ 10 phút bằng bao nhiêu?');
        await c.choose([{ html: '45 phút', value: 45 }, { html: '65 phút', value: 65 }], 45, { hint: 'Phép trừ: 55 − 10.' });
        t.put(1, 45);
        t.put(0, 2);
        await c.say('15 giờ trừ 13 giờ bằng 2 giờ. Kết quả 2 giờ 45 phút.');
      },
      async (c) => {
        const t = c.use((b) => createTimeCol(b, { a: [4, 20], b: [2, 45], op: '−', x: false, ov: true }));
        await c.say('4 giờ 20 phút trừ 2 giờ 45 phút. 20 phút có trừ được 45 phút không?');
        await c.choose([{ html: 'Không trừ được', value: 0 }, { html: 'Lấy 45 − 20', value: 1 }], 0, { hint: 'Số bị trừ ở trên là 20, bé hơn 45. Không được đảo ngược.' });
        await c.say('Ta mượn 1 giờ đổi thành 60 phút.', 'Mượn <b>1 giờ = 60 phút</b>');
        await c.choose([{ html: '🔄 Mượn 1 giờ', value: 1 }], 1);
        await t.borrow(1);
        await c.say('Còn 3 giờ 80 phút. 80 phút trừ 45 phút bằng bao nhiêu?');
        await c.choose([{ html: '35 phút', value: 35 }, { html: '75 phút', value: 75 }, { html: '25 phút', value: 25 }], 35, { hint: (v) => (v === 75 ? 'Mượn 1 giờ là 60 phút, không phải 100 phút.' : '20 + 60 = 80 phút, rồi lấy 80 − 45.') });
        t.put(1, 35);
        t.put(0, 1);
        await c.say('3 giờ trừ 2 giờ bằng 1 giờ. Kết quả 1 giờ 35 phút.');
      },
      async (c) => {
        const t = c.use((b) => createTimeCol(b, { a: [14, 30], b: [0, 25], op: '+', x: false, ov: true }));
        await c.say('Một đồng hồ chạy chậm 25 phút. Đồng hồ chỉ 14 giờ 30 phút. Giờ đúng là mấy giờ?');
        await c.choose(['14 giờ 5 phút', '14 giờ 30 phút', '14 giờ 55 phút'].map(v => ({ html: v, value: v })), '14 giờ 55 phút', {
          hint: (v) => (v === '14 giờ 5 phút' ? 'Đồng hồ chậm nghĩa là nó chỉ ít hơn giờ đúng. Phải cộng thêm 25 phút.' : 'Đồng hồ chậm 25 phút: giờ đúng = giờ đồng hồ + 25 phút.'),
        });
        await t.fill([14, 55]);
        await c.say('Đồng hồ chậm thì cộng thêm, đồng hồ nhanh thì trừ bớt. Giờ đúng là 14 giờ 55 phút.');
      },
    ],
  },
  tasks: () => [taskAdd(), taskAddCarry(), taskSub(), taskSubBorrow(), taskEnd(), taskDur(), taskClockFix()],
};

/** Cặp số đo (giờ phút hoặc phút giây) ngẫu nhiên; carry: tổng phần bé ≥ 60; borrow: phần bé số trừ lớn hơn. */
function pairMake(rng, kind) {
  const units = rng.int(0, 3) === 0 ? MS : HM;
  for (;;) {
    const a = [rng.int(kind === 'sub' || kind === 'borrow' ? 3 : 1, 15), rng.int(0, 11) * 5];
    const b = [rng.int(0, kind === 'sub' || kind === 'borrow' ? a[0] - 1 : 10), rng.int(1, 11) * 5];
    if (kind === 'add' && a[1] + b[1] >= 60) continue;
    if (kind === 'carry' && a[1] + b[1] < 61) continue;
    if (kind === 'sub' && a[1] < b[1]) continue;
    if (kind === 'borrow' && (a[1] >= b[1] || a[0] - 1 <= b[0])) continue;
    if (kind === 'sub' && a[0] === b[0]) continue;
    return { units, a, b };
  }
}
const hintSmall = (units, v, want) => (v === want + 40 ? `Mượn 1 ${units[0]} là 60 ${units[1]}, không phải 100.` : `Tính từng cột, cột ${units[1]} trước.`);

function taskAdd() {
  return {
    id: 't57add',
    make: (rng) => pairMake(rng, 'add'),
    async mount(f, { units, a, b }) {
      mark('t57add');
      voice(f);
      const r = [a[0] + b[0], a[1] + b[1]];
      f.q.innerHTML = `${tstr(a, units)} + ${tstr(b, units)} = ?`;
      const t = createTimeCol(f.tool, { units, a, b, op: '+', x: false });
      await f.ask({ box: t.box(1), answer: r[1], max: 2, say: `Cộng cột ${units[1]} trước: ${a[1]} cộng ${b[1]}.`, hint: `${a[1]} + ${b[1]}` });
      await f.ask({ box: t.box(0), answer: r[0], max: 2, say: `Cộng cột ${units[0]}.`, hint: `${a[0]} + ${b[0]}` });
      f.finish({ ok: `${tstr(a, units)} + ${tstr(b, units)} = ${tstr(r, units)}` });
    },
  };
}

function taskAddCarry() {
  return {
    id: 't57carry',
    make: (rng) => pairMake(rng, 'carry'),
    async mount(f, { units, a, b }) {
      mark('t57carry');
      voice(f);
      const raw = [a[0] + b[0], a[1] + b[1]], r = [raw[0] + 1, raw[1] - 60];
      f.q.innerHTML = `${tstr(a, units)} + ${tstr(b, units)} = ?`;
      const t = createTimeCol(f.tool, { units, a, b, op: '+' });
      await f.ask({ box: t.box(1), answer: raw[1], max: 3, say: `Cộng cột ${units[1]}: ${a[1]} cộng ${b[1]}.`, hint: (v) => (v === r[1] ? 'Viết tổng các số trước, rồi mới đổi.' : `${a[1]} + ${b[1]}`) });
      t.put(0, raw[0]);
      f.say(`${raw[1]} ${units[1]} nhiều hơn 60 ${units[1]}, đổi 60 ${units[1]} thành 1 ${units[0]}.`);
      const out = await t.carry(1, raw);
      await f.ask({ box: t.box(1, 'x'), answer: out[1], max: 2, say: `Còn lại bao nhiêu ${units[1]}?`, hint: `${raw[1]} − 60` });
      t.put(0, out[0], 'x');
      f.finish({ ok: `${tstr(raw, units)} = ${tstr(r, units)}` });
    },
  };
}

function taskSub() {
  return {
    id: 't57sub',
    make: (rng) => pairMake(rng, 'sub'),
    async mount(f, { units, a, b }) {
      mark('t57sub');
      voice(f);
      const r = [a[0] - b[0], a[1] - b[1]];
      f.q.innerHTML = `${tstr(a, units)} − ${tstr(b, units)} = ?`;
      const t = createTimeCol(f.tool, { units, a, b, op: '−', x: false });
      await f.ask({ box: t.box(1), answer: r[1], max: 2, say: `Trừ cột ${units[1]} trước: ${a[1]} trừ ${b[1]}.`, hint: `${a[1]} − ${b[1]}` });
      await f.ask({ box: t.box(0), answer: r[0], max: 2, say: `Trừ cột ${units[0]}.`, hint: `${a[0]} − ${b[0]}` });
      f.finish({ ok: `${tstr(a, units)} − ${tstr(b, units)} = ${tstr(r, units)}` });
    },
  };
}

function taskSubBorrow() {
  return {
    id: 't57borrow',
    make: (rng) => pairMake(rng, 'borrow'),
    async mount(f, { units, a, b }) {
      mark('t57borrow');
      voice(f);
      const r = [a[0] - 1 - b[0], a[1] + 60 - b[1]];
      f.q.innerHTML = `${tstr(a, units)} − ${tstr(b, units)} = ?`;
      const t = createTimeCol(f.tool, { units, a, b, op: '−', x: false });
      t.mark(1);
      f.say(`${a[1]} ${units[1]} không trừ được ${b[1]} ${units[1]}. Mượn 1 ${units[0]} bằng 60 ${units[1]}.`);
      await t.borrow(1);
      t.clearMarks();
      await f.ask({ box: t.box(1), answer: r[1], max: 2, say: `${a[1] + 60} trừ ${b[1]} bằng bao nhiêu?`,
        hint: (v) => (v === b[1] - a[1] ? 'Không lấy số dưới trừ số trên. Lấy số mới ở trên trừ đi.' : hintSmall(units, v, r[1])) });
      await f.ask({ box: t.box(0), answer: r[0], max: 2, say: `Cột ${units[0]}: còn ${a[0] - 1} trừ ${b[0]}.`, hint: (v) => (v === a[0] - b[0] ? `Đã mượn 1 ${units[0]}, còn ${a[0] - 1} ${units[0]}.` : `${a[0] - 1} − ${b[0]}`) });
      f.finish({ ok: `${tstr(a, units)} − ${tstr(b, units)} = ${tstr(r, units)}` });
    },
  };
}

const SHOWS = [['Phim', 'chiếu'], ['Buổi hoà nhạc', 'diễn ra'], ['Trận bóng', 'diễn ra'], ['Chuyến xe', 'đi']];
function taskEnd() {
  return {
    id: 't57end',
    make: (rng) => {
      const s = rng.int(0, SHOWS.length - 1);
      for (;;) {
        const a = [rng.int(7, 19), rng.int(0, 11) * 5], b = [rng.int(1, 2), rng.int(1, 11) * 5];
        if (a[1] + b[1] > 60) return { s, a, b };
      }
    },
    async mount(f, { s, a, b }) {
      mark('t57end');
      voice(f);
      const [what, verb] = SHOWS[s];
      const raw = [a[0] + b[0], a[1] + b[1]], r = [raw[0] + 1, raw[1] - 60];
      f.q.innerHTML = `${what} bắt đầu lúc ${tstr(a, HM)}, ${verb} trong ${tstr(b, HM)}. Kết thúc lúc mấy giờ?`;
      const t = createTimeCol(f.tool, { a, b, op: '+' });
      const ok = tstr(r, HM);
      await f.choose({ options: opts([ok, tstr(raw, HM), tstr([raw[0], r[1]], HM), tstr([r[0] + 1, r[1]], HM)], a[0] + b[1]), answer: ok, say: `${what} kết thúc lúc mấy giờ?`,
        hint: (v) => (v === tstr(raw, HM) ? `${raw[1]} phút phải đổi: 60 phút = 1 giờ.` : 'Cộng giờ với giờ, phút với phút, đủ 60 phút thì đổi thành 1 giờ.') });
      await t.fill(raw);
      const out = await t.carry(1, raw);
      await t.fill(out, 'x');
      f.finish({ ok: `${tstr(a, HM)} + ${tstr(b, HM)} = ${ok}` });
    },
  };
}

function taskDur() {
  return {
    id: 't57dur',
    make: (rng) => {
      for (;;) {
        const a = [rng.int(5, 16), rng.int(0, 11) * 5], d = [rng.int(1, 3), rng.int(1, 11) * 5];
        const e = fromSmall(toSmall(a, HM) + toSmall(d, HM), HM);
        if (e[1] < a[1] && e[0] < 24) return { a, e };
      }
    },
    async mount(f, { a, e }) {
      mark('t57dur');
      voice(f);
      const d = fromSmall(toSmall(e, HM) - toSmall(a, HM), HM);
      f.q.innerHTML = `Tàu đi lúc ${tstr(a, HM)}, đến nơi lúc ${tstr(e, HM)}. Tàu đi hết bao lâu?`;
      const t = createTimeCol(f.tool, { a: e, b: a, op: '−', x: false });
      const ok = tstr(d, HM);
      const wrong1 = tstr([e[0] - a[0], a[1] - e[1]], HM);
      await f.choose({ options: opts([ok, wrong1, tstr([d[0] + 1, d[1]], HM), tstr([e[0] - a[0], d[1]], HM)], e[0] + a[1]), answer: ok, say: 'Tàu đi hết bao lâu?',
        hint: (v) => (v === wrong1 ? 'Không lấy số phút bé trừ ngược. Mượn 1 giờ = 60 phút.' : 'Lấy giờ đến trừ giờ đi. Phút không đủ trừ thì mượn 1 giờ.') });
      await t.borrow(1);
      await t.fill(d);
      f.finish({ ok: `${tstr(e, HM)} − ${tstr(a, HM)} = ${ok}` });
    },
  };
}

function taskClockFix() {
  return {
    id: 't57clock',
    make: (rng) => ({ slow: rng.int(0, 1), h: rng.int(7, 16), m: rng.int(2, 9) * 5, d: rng.pick([5, 10, 15, 20, 25]) }),
    async mount(f, { slow, h, m, d }) {
      mark('t57clock');
      voice(f);
      const shown = [h, m];
      const real = fromSmall(toSmall(shown, HM) + (slow ? d : -d), HM), other = fromSmall(toSmall(shown, HM) + (slow ? -d : d), HM);
      f.q.innerHTML = `Đồng hồ chạy ${slow ? 'chậm' : 'nhanh'} ${d} phút, đang chỉ ${tstr(shown, HM)}. Giờ đúng là:`;
      const t = createTimeCol(f.tool, { a: shown, b: [0, d], op: slow ? '+' : '−', x: false });
      const ok = tstr(real, HM);
      await f.choose({ options: opts([ok, tstr(other, HM), tstr(shown, HM)], h + m + d), answer: ok, say: `Đồng hồ chạy ${slow ? 'chậm' : 'nhanh'} ${d} phút. Giờ đúng là mấy giờ?`,
        hint: slow ? 'Đồng hồ chậm chỉ ít hơn giờ đúng: phải cộng thêm.' : 'Đồng hồ nhanh chỉ nhiều hơn giờ đúng: phải trừ bớt.' });
      if (!slow && m < d) await t.borrow(1);
      await t.fill(real);
      f.finish({ ok: `Đồng hồ ${slow ? 'chậm thì cộng' : 'nhanh thì trừ'} ${d} phút: ${ok}.` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 58. Nhân, chia số đo thời gian với một số (chưa đối chiếu sách)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B58 = {
  explore: {
    setup: (board) => createTimeCol(board, { a: [1, 10], op: '×', k: 3, x: false, ov: true }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Làm một chiếc đèn ông sao hết 1 giờ 10 phút. Làm 3 chiếc như thế hết bao lâu?');
        await c.say('Nhân từng cột với 3, từ cột phút. 10 phút nhân 3 bằng bao nhiêu?');
        await c.choose([{ html: '30 phút', value: 30 }, { html: '13 phút', value: 13 }], 30, { hint: '10 × 3, không phải 10 + 3.' });
        t.put(1, 30);
        t.put(0, 3);
        await c.say('1 giờ nhân 3 bằng 3 giờ. Làm 3 chiếc hết 3 giờ 30 phút.');
      },
      async (c) => {
        const t = c.use((b) => createTimeCol(b, { a: [3, 15], op: '×', k: 5, ov: true }));
        await c.say('3 giờ 15 phút nhân 5. Nhân từng cột.');
        await t.fill([15, 75]);
        await c.say('Được 15 giờ 75 phút. 75 phút nhiều hơn 60 phút.', 'Đủ <b>60 phút</b> thì đổi');
        await c.choose([{ html: '🔄 Đổi 60 phút = 1 giờ', value: 1 }], 1);
        const r = await t.carry(1, [15, 75]);
        await t.fill(r, 'x');
        await c.say('75 phút là 1 giờ 15 phút. Kết quả 16 giờ 15 phút.');
      },
      async (c) => {
        const t = c.use((b) => createTimeCol(b, { units: MS, a: [42, 30], op: ':', k: 3, steps: 2, ov: true }));
        await c.say('Ba ván cờ hết 42 phút 30 giây. Mỗi ván hết bao lâu? Chia từng phần, bắt đầu từ đơn vị lớn.');
        await t.step(0, '42 phút : 3 = <b>14 phút</b>');
        await t.step(1, '30 giây : 3 = <b>10 giây</b>');
        await t.fill([14, 10]);
        await c.say('Mỗi ván hết 14 phút 10 giây.');
      },
      async (c) => {
        const t = c.use((b) => createTimeCol(b, { a: [7, 40], op: ':', k: 4, steps: 4, ov: true }));
        await c.say('7 giờ 40 phút chia 4. 7 giờ chia 4 được 1 giờ, còn dư 3 giờ.');
        await t.step(0, '7 giờ : 4 = <b>1 giờ</b>, dư 3 giờ');
        await c.say('Số dư 3 giờ đổi ra phút. 3 giờ bằng bao nhiêu phút?');
        await c.choose([{ html: '30 phút', value: 30 }, { html: '180 phút', value: 180 }, { html: '300 phút', value: 300 }], 180, { hint: '1 giờ = 60 phút, 3 giờ = 3 × 60.' });
        await t.step(1, '3 giờ = <b>180 phút</b>');
        await t.step(2, '180 phút + 40 phút = 220 phút');
        await t.step(3, '220 phút : 4 = <b>55 phút</b>');
        await t.fill([1, 55]);
        await c.say('7 giờ 40 phút chia 4 bằng 1 giờ 55 phút. Số dư không được bỏ đi.');
      },
    ],
  },
  tasks: () => [taskMul(), taskMulCarry(), taskDiv(), taskDivRem(), taskLessons(), taskDivMistake()],
};

function taskMul() {
  return {
    id: 't58mul',
    make: (rng) => {
      for (;;) { const k = rng.int(2, 5), a = [rng.int(1, 6), rng.int(1, 11) * (rng.int(0, 1) ? 5 : 2)]; if (a[1] * k < 60 && a[1] > 0) return { units: rng.int(0, 3) ? HM : MS, a, k }; }
    },
    async mount(f, { units, a, k }) {
      mark('t58mul');
      voice(f);
      f.q.innerHTML = `${tstr(a, units)} × ${k} = ?`;
      const t = createTimeCol(f.tool, { units, a, op: '×', k, x: false });
      await f.ask({ box: t.box(1), answer: a[1] * k, max: 2, say: `Nhân cột ${units[1]} trước: ${a[1]} nhân ${k}.`, hint: `${a[1]} × ${k}` });
      await f.ask({ box: t.box(0), answer: a[0] * k, max: 2, say: `Nhân cột ${units[0]}: ${a[0]} nhân ${k}.`, hint: `${a[0]} × ${k}` });
      f.finish({ ok: `${tstr(a, units)} × ${k} = ${tstr([a[0] * k, a[1] * k], units)}` });
    },
  };
}

function taskMulCarry() {
  return {
    id: 't58mulc',
    make: (rng) => {
      for (;;) { const k = rng.int(2, 6), a = [rng.int(1, 4), rng.int(2, 11) * 5]; if (a[1] * k >= 60 && a[1] * k < 120) return { units: rng.int(0, 3) ? HM : MS, a, k }; }
    },
    async mount(f, { units, a, k }) {
      mark('t58mulc');
      voice(f);
      const raw = [a[0] * k, a[1] * k];
      f.q.innerHTML = `${tstr(a, units)} × ${k} = ?`;
      const t = createTimeCol(f.tool, { units, a, op: '×', k });
      await f.ask({ box: t.box(1), answer: raw[1], max: 3, say: `Nhân cột ${units[1]}: ${a[1]} nhân ${k}.`, hint: `${a[1]} × ${k}` });
      t.put(0, raw[0]);
      f.say(`${raw[1]} ${units[1]} nhiều hơn 60 ${units[1]}, đổi 60 ${units[1]} thành 1 ${units[0]}.`);
      const out = await t.carry(1, raw);
      await f.ask({ box: t.box(1, 'x'), answer: out[1], max: 2, say: `Còn lại bao nhiêu ${units[1]}?`, hint: `${raw[1]} − 60` });
      t.put(0, out[0], 'x');
      f.finish({ ok: `${tstr(a, units)} × ${k} = ${tstr(raw, units)} = ${tstr(out, units)}` });
    },
  };
}

function taskDiv() {
  return {
    id: 't58div',
    make: (rng) => { const k = rng.int(2, 5), q = [rng.int(1, 9), rng.int(1, 11) * 5]; if (q[1] * k >= 60) q[1] = Math.floor(59 / k / 5) * 5 || 5; return { units: rng.int(0, 2) ? MS : HM, q, k }; },
    async mount(f, { units, q, k }) {
      mark('t58div');
      voice(f);
      const a = [q[0] * k, q[1] * k];
      f.q.innerHTML = `${tstr(a, units)} : ${k} = ?`;
      const t = createTimeCol(f.tool, { units, a, op: ':', k, steps: 2 });
      await f.ask({ box: t.box(0), answer: q[0], max: 2, say: `Chia từ đơn vị lớn: ${a[0]} ${units[0]} chia ${k}.`, hint: `${a[0]} : ${k}` });
      await t.step(0, `${a[0]} ${units[0]} : ${k} = <b>${q[0]} ${units[0]}</b>`);
      await f.ask({ box: t.box(1), answer: q[1], max: 2, say: `${a[1]} ${units[1]} chia ${k}.`, hint: `${a[1]} : ${k}` });
      await t.step(1, `${a[1]} ${units[1]} : ${k} = <b>${q[1]} ${units[1]}</b>`);
      f.finish({ ok: `${tstr(a, units)} : ${k} = ${tstr(q, units)}` });
    },
  };
}

function taskDivRem() {
  return {
    id: 't58divr',
    make: (rng) => {
      for (;;) {
        const k = rng.int(2, 5), q = [rng.int(1, 4), rng.int(1, 11) * 5];
        const a = fromSmall(toSmall(q, HM) * k, HM);
        if (a[0] % k !== 0 && a[1] > 0) return { units: rng.int(0, 3) ? HM : MS, a, k };
      }
    },
    async mount(f, { units, a, k }) {
      mark('t58divr');
      voice(f);
      const q0 = Math.floor(a[0] / k), rem = a[0] % k, mins = rem * 60 + a[1], q1 = mins / k;
      f.q.innerHTML = `${tstr(a, units)} : ${k} = ?`;
      const t = createTimeCol(f.tool, { units, a, op: ':', k, steps: 4 });
      await f.ask({ box: t.box(0), answer: q0, max: 2, say: `${a[0]} ${units[0]} chia ${k} được mấy ${units[0]}?`, hint: `${a[0]} : ${k} được ${q0}, dư ${rem}.` });
      await t.step(0, `${a[0]} ${units[0]} : ${k} = <b>${q0} ${units[0]}</b>, dư ${rem} ${units[0]}`);
      await t.step(1, `${rem} ${units[0]} = ${rem * 60} ${units[1]}`);
      await t.step(2, `${rem * 60} ${units[1]} + ${a[1]} ${units[1]} = ${mins} ${units[1]}`);
      await f.ask({ box: t.box(1), answer: q1, max: 3, say: `${mins} ${units[1]} chia ${k} bằng bao nhiêu?`, hint: (v) => (v * k === a[1] || v === Math.floor(a[1] / k) ? `Không bỏ số dư: cộng ${rem * 60} ${units[1]} với ${a[1]} ${units[1]} rồi mới chia.` : `${mins} : ${k}`) });
      await t.step(3, `${mins} ${units[1]} : ${k} = <b>${q1} ${units[1]}</b>`);
      f.finish({ ok: `${tstr(a, units)} : ${k} = ${tstr([q0, q1], units)}` });
    },
  };
}

function taskLessons() {
  const JOBS = [['Mỗi tiết học dài', 'tiết học'], ['Mỗi chặng chạy hết', 'chặng'], ['Mỗi chiếc bánh nướng hết', 'mẻ bánh'], ['Mỗi bài hát dài', 'bài hát']];
  return {
    id: 't58word',
    make: (rng) => {
      for (;;) { const j = rng.int(0, JOBS.length - 1), m = rng.pick([35, 40, 45, 25, 50]), k = rng.int(2, 5); if (m * k >= 60 && m * k % 60) return { j, m, k }; }
    },
    async mount(f, { j, m, k }) {
      mark('t58word');
      voice(f);
      const [lead, item] = JOBS[j];
      const raw = [0, m * k], r = fromSmall(m * k, HM);
      f.q.innerHTML = `${lead} ${m} phút. ${k} ${item} như thế hết bao lâu?`;
      const t = createTimeCol(f.tool, { a: [0, m], op: '×', k });
      const ok = tstr(r, HM);
      await f.choose({ options: opts([ok, `${m * k} giờ`, tstr([r[0] + 1, r[1]], HM), tstr([Math.floor(m * k / 100), m * k % 100], HM)], m + k), answer: ok, say: `${k} ${item} hết bao lâu?`,
        hint: (v) => (v === `${m * k} giờ` ? `${m} × ${k} = ${m * k} phút, không phải giờ.` : `${m} × ${k} = ${m * k} phút. Đổi: 60 phút = 1 giờ.`) });
      await t.fill(raw);
      const out = await t.carry(1, raw);
      await t.fill(out, 'x');
      f.finish({ ok: `${m} phút × ${k} = ${m * k} phút = ${ok}` });
    },
  };
}

function taskDivMistake() {
  return {
    id: 't58mist',
    make: (rng) => {
      for (;;) {
        const k = rng.int(3, 4), q = [rng.int(1, 3), rng.int(5, 11) * 5];
        const a = fromSmall(toSmall(q, HM) * k, HM);
        if (a[0] % k !== 0 && a[1] > 0 && a[0] < 24) return { a, k, q };
      }
    },
    async mount(f, { a, k, q }) {
      mark('t58mist');
      voice(f);
      const ok = tstr(q, HM);
      const drop = tstr([Math.floor(a[0] / k), Math.floor(a[1] / k)], HM);
      const decWrong = `${D((a[0] + a[1] / 100) / k)} giờ`;
      f.q.innerHTML = `${tstr(a, HM)} : ${k} = ?`;
      const t = createTimeCol(f.tool, { a, op: ':', k, steps: 4 });
      await f.choose({ options: opts([ok, drop, decWrong], a[0] + k), answer: ok, say: 'Chọn kết quả đúng.',
        hint: (v) => (v === drop ? 'Số dư không được bỏ đi: đổi số giờ dư ra phút rồi chia tiếp.' : 'Không chia như số thập phân: 1 giờ có 60 phút, không phải 100 phút.') });
      const rem = a[0] % k, mins = rem * 60 + a[1];
      await t.step(0, `${a[0]} giờ : ${k} = <b>${q[0]} giờ</b>, dư ${rem} giờ`);
      await t.step(1, `${rem} giờ = ${rem * 60} phút`);
      await t.step(2, `${rem * 60} phút + ${a[1]} phút = ${mins} phút`);
      await t.step(3, `${mins} phút : ${k} = <b>${q[1]} phút</b>`);
      await t.fill(q);
      f.finish({ ok: `${tstr(a, HM)} : ${k} = ${ok}` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 59. Vận tốc của một chuyển động đều (chưa đối chiếu sách)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
/** Phương tiện với vận tốc thật (km/giờ; người chạy m/giây). */
const MOVERS = [
  { kind: 'walk', who: 'Một người đi bộ', v: [4, 5], t: [2, 3], unit: 'km', tu: 'giờ' },
  { kind: 'bike', who: 'Một bạn đi xe đạp', v: [10, 15], t: [2, 4], unit: 'km', tu: 'giờ' },
  { kind: 'moto', who: 'Một xe máy', v: [30, 45], t: [2, 3], unit: 'km', tu: 'giờ' },
  { kind: 'car', who: 'Một ô tô', v: [40, 60], t: [2, 5], unit: 'km', tu: 'giờ' },
  { kind: 'bus', who: 'Một xe khách', v: [40, 55], t: [2, 4], unit: 'km', tu: 'giờ' },
  { kind: 'boat', who: 'Một ca nô', v: [20, 32], t: [2, 3], unit: 'km', tu: 'giờ' },
  { kind: 'run', who: 'Một vận động viên chạy', v: [5, 9], t: [10, 20], unit: 'm', tu: 'giây' },
];
const vUnit = (m) => `${m.unit}/${m.tu}`;
/** Đường chuyển động có t đoạn bằng nhau, mỗi đoạn v (chỉ hiện sau khi làm đúng). */
async function showSegs(mv, v, n, { tu = 'giờ', unit = 'km', ms = 450, half = false } = {}) {
  const lbl = n <= 6 ? (i) => `${D(v)} ${unit}` : (i) => (i === 0 ? `${D(v)} ${unit}` : '');
  for (let i = 0; i < Math.floor(n); i++) {
    await mv.drive(v * (i + 1), ms, `${i + 1} ${tu}`);
    await mv.seg(v * i, v * (i + 1), lbl(i), i);
  }
  if (half || n % 1) {
    const w = n % 1 || 0.5, s0 = v * Math.floor(n);
    await mv.drive(s0 + v * w, ms * w, `${D(n)} ${tu}`);
    await mv.seg(s0, s0 + v * w, `${D(v * w)} ${unit}`, Math.floor(n));
  }
}

const B59 = {
  explore: {
    setup: (board) => createMove(board, { dist: 170, vehicle: 'car', ov: true, marks: [[0, '0 km'], [170, '170 km']] }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Ô tô đi <b>170 km</b> hết <b>4 giờ</b>');
        await c.say('Một ô tô đi quãng đường 170 ki-lô-mét hết 4 giờ.');
        await t.drive(170, 2400, '4 giờ');
        await c.say('Trung bình mỗi giờ ô tô đi được bao nhiêu ki-lô-mét? Ta chia quãng đường thành 4 phần bằng nhau.');
        await c.choose([{ html: '170 : 4', value: 1 }, { html: '170 × 4', value: 2 }, { html: '4 : 170', value: 3 }], 1, { hint: 'Chia đều 170 km cho 4 giờ.' });
        for (let i = 0; i < 4; i++) { t.flag(42.5 * (i + 1), `${i + 1} giờ`); await t.seg(42.5 * i, 42.5 * (i + 1), '42,5 km', i); }
        t.caption('v = s : t = 170 : 4 = <b>42,5 (km/giờ)</b>');
        await c.say('170 chia 4 bằng 42,5. Mỗi giờ ô tô đi 42,5 ki-lô-mét. Ta nói vận tốc của ô tô là 42,5 ki-lô-mét trên giờ.');
        await c.say('Muốn tính vận tốc, ta lấy quãng đường chia cho thời gian: v bằng s chia t.');
      },
      async (c) => {
        const t = c.use((b) => createMove(b, { dist: 60, unit: 'm', vehicle: 'run', tu: 'giây', ov: true, marks: [[0, '0 m'], [60, '60 m']] }));
        t.caption('Chạy <b>60 m</b> hết <b>10 giây</b>');
        await c.say('Một bạn chạy 60 mét hết 10 giây.');
        await t.drive(60, 1500, '10 giây');
        for (let i = 0; i < 10; i++) await t.seg(6 * i, 6 * (i + 1), i === 0 ? '6 m' : '', i);
        await c.say('Mỗi giây bạn chạy 6 mét. Vận tốc viết thế nào?');
        await c.choose(['6 m/giây', '6 km/giờ', '6 m/phút'].map(v => ({ html: v, value: v })), '6 m/giây', { hint: 'Quãng đường đo bằng mét, thời gian đo bằng giây: đơn vị là mét trên giây.' });
        t.caption('v = 60 : 10 = <b>6 (m/giây)</b>');
        await c.say('Đúng rồi! Đơn vị vận tốc ghép từ đơn vị quãng đường và đơn vị thời gian: ki-lô-mét trên giờ, mét trên phút, mét trên giây.', 'Đơn vị vận tốc: <b>km/giờ, m/phút, m/giây</b>');
      },
      async (c) => {
        const t = c.use((b) => createMove(b, { dist: 60, vehicle: 'moto', ov: true, marks: [[0, '0 km'], [60, '60 km']] }));
        t.caption('Xe máy đi <b>60 km</b> hết <b>1 giờ 30 phút</b>');
        await c.say('Xe máy đi 60 ki-lô-mét hết 1 giờ 30 phút. Trước khi chia, đổi thời gian ra giờ. 1 giờ 30 phút bằng bao nhiêu giờ?');
        await c.choose(['1,3 giờ', '1,5 giờ', '1,30 giờ'].map(v => ({ html: v, value: v })), '1,5 giờ', { hint: '30 phút là nửa giờ, tức 0,5 giờ. 1,3 giờ là 1 giờ 18 phút.' });
        t.flag(40, '1 giờ');
        await t.drive(40, 1000, '1 giờ');
        await t.seg(0, 40, '40 km', 0);
        await t.drive(60, 600, '1,5 giờ');
        await t.seg(40, 60, '20 km', 1);
        t.caption('v = 60 : 1,5 = <b>40 (km/giờ)</b>');
        await c.say('60 chia 1,5 bằng 40. Vận tốc xe máy là 40 ki-lô-mét trên giờ: giờ đầu đi 40 ki-lô-mét, nửa giờ sau đi 20 ki-lô-mét.');
      },
      async (c) => {
        const t = c.use((b) => createMove(b, { dist: 45, vehicle: 'bike', ov: true, marks: [[0, '0 km'], [45, '45 km']] }));
        t.place(15);
        t.caption('Vận tốc nào hợp với <b>xe đạp</b>?');
        await c.say('Vận tốc nào hợp với một bạn đi xe đạp?');
        await c.choose(['1,5 km/giờ', '15 km/giờ', '150 km/giờ'].map(v => ({ html: v, value: v })), '15 km/giờ', { hint: (v) => (v === '150 km/giờ' ? '150 km/giờ nhanh hơn cả ô tô trên đường cao tốc.' : '1,5 km/giờ còn chậm hơn người đi bộ.') });
        await c.say('Đúng rồi! Đi bộ khoảng 4 đến 5 ki-lô-mét trên giờ, xe đạp khoảng 12 đến 15, ô tô khoảng 40 đến 60.');
      },
    ],
  },
  tasks: () => [taskSpeed(), taskSpeedMix(), taskSpeedUnit(), taskSpeedReal(), taskSpeedCmp(), taskSpeedConv()],
};

const pickMover = (rng, kinds) => MOVERS.filter(m => !kinds || kinds.includes(m.kind))[rng.int(0, (kinds ? kinds.length : MOVERS.length) - 1)];

function taskSpeed() {
  return {
    id: 't59v',
    make: (rng) => {
      const i = rng.int(0, MOVERS.length - 1), m = MOVERS[i];
      return { i, v: rng.int(m.v[0], m.v[1]), t: rng.int(m.t[0], m.t[1]) };
    },
    async mount(f, { i, v, t: tt }) {
      mark('t59v');
      voice(f);
      const m = MOVERS[i], s = v * tt;
      f.q.innerHTML = `${m.who} đi ${s} ${m.unit} hết ${tt} ${m.tu}. v = ${BOX} ${vUnit(m)}`;
      const mv = createMove(f.tool, { dist: s, unit: m.unit, vehicle: m.kind, tu: m.tu });
      mv.caption(`s = <b>${s} ${m.unit}</b>, t = <b>${tt} ${m.tu}</b>`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: v, max: 3, say: `${m.who} đi ${s} ${m.unit} hết ${tt} ${m.tu}. Tính vận tốc.`,
        hint: (x) => (x === s * tt ? 'Vận tốc là quãng đường chia cho thời gian, không phải nhân.' : `v = s : t = ${s} : ${tt}`) });
      mv.caption(`v = ${s} : ${tt} = <b>${v} (${vUnit(m)})</b>`);
      await showSegs(mv, v, tt, { tu: m.tu, unit: m.unit, ms: 350 });
      f.finish({ ok: `v = ${s} : ${tt} = ${v} ${vUnit(m)}` });
    },
  };
}

/** Thời gian cho bằng giờ phút: đổi ra giờ (số thập phân) trước khi chia. */
function taskSpeedMix() {
  const TS = [[1, 30, 1.5], [2, 30, 2.5], [1, 15, 1.25], [0, 45, 0.75], [1, 45, 1.75], [0, 30, 0.5], [1, 12, 1.2], [2, 24, 2.4]];
  return {
    id: 't59vmix',
    make: (rng) => {
      const j = rng.int(0, TS.length - 1), m = pickMover(rng, ['bike', 'moto', 'car', 'boat']);
      const k = TS[j][2];
      for (;;) { const v = rng.int(m.v[0], m.v[1]); if (Number.isInteger(clean(v * k * 10))) return { kind: m.kind, v, j }; }
    },
    async mount(f, { kind, v, j }) {
      mark('t59vmix');
      voice(f);
      const m = MOVERS.find(x => x.kind === kind);
      const [h, mi, k] = TS[j], s = clean(v * k);
      const ttxt = tstr([h, mi], HM);
      f.q.innerHTML = `${m.who} đi ${D(s)} km hết ${ttxt}. v = ${BOX} km/giờ`;
      const mv = createMove(f.tool, { dist: s, vehicle: m.kind, marks: [[0, '0 km'], [s, `${D(s)} km`]] });
      mv.caption(`${ttxt} = <b>${D(k)} giờ</b>`);
      const wrongT = h + mi / 100;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: Number.isInteger(v) ? v : decKey(v), max: 4, say: `Đổi ${ttxt} ra giờ rồi tính vận tốc.`,
        hint: (x) => (Math.abs(x * wrongT - s) < 0.05 ? `${ttxt} không phải ${D(wrongT)} giờ. ${mi} phút = ${D(mi / 60)} giờ.` : `${ttxt} = ${D(k)} giờ. v = ${D(s)} : ${D(k)}.`) });
      mv.caption(`v = ${D(s)} : ${D(k)} = <b>${D(v)} (km/giờ)</b>`);
      await showSegs(mv, v, k, { ms: 350 });
      f.finish({ ok: `${ttxt} = ${D(k)} giờ; v = ${D(s)} : ${D(k)} = ${D(v)} km/giờ` });
    },
  };
}

function taskSpeedUnit() {
  const CASES = [['m', 'giây', 'Một con báo chạy', 'run'], ['m', 'phút', 'Một người đi bộ', 'walk'], ['km', 'giờ', 'Một ô tô', 'car'], ['km', 'giờ', 'Một ca nô', 'boat'], ['m', 'phút', 'Một bạn đi xe đạp', 'bike']];
  return {
    id: 't59unit',
    make: (rng) => { const c = rng.int(0, CASES.length - 1); const [u, tu] = CASES[c]; const v = u === 'm' ? (tu === 'giây' ? rng.int(20, 30) : rng.pick([60, 70, 80, 200, 250])) : rng.int(30, 50); return { c, v, t: rng.int(2, 5) }; },
    async mount(f, { c, v, t: tt }) {
      mark('t59unit');
      voice(f);
      const [u, tu, who, kind] = CASES[c], s = v * tt;
      const ok = `${v} ${u}/${tu}`;
      f.q.innerHTML = `${who} đi ${s} ${u} hết ${tt} ${tu}. Vận tốc là:`;
      reserveChoices(f); // nút chọn có chỗ trước khi đo khung hình
      const mv = createMove(f.tool, { dist: s, unit: u, vehicle: kind, tu });
      const alt = [`${v} km/giờ`, `${v} m/giây`, `${v} m/phút`, `${v} km/phút`].filter(x => x !== ok).slice(0, 2);
      await f.choose({ options: opts([ok, ...alt], v + tt), answer: ok, say: 'Chọn vận tốc viết đúng đơn vị.', hint: `Quãng đường đo bằng ${u}, thời gian đo bằng ${tu}: đơn vị vận tốc là ${u}/${tu}.` });
      await showSegs(mv, v, tt, { tu, unit: u, ms: 300 });
      f.finish({ ok: `v = ${s} : ${tt} = ${ok}` });
    },
  };
}

function taskSpeedReal() {
  const R = [['walk', 'người đi bộ', '5 km/giờ', ['50 km/giờ', '0,5 km/giờ']], ['bike', 'bạn đi xe đạp', '14 km/giờ', ['140 km/giờ', '1,4 km/giờ']],
    ['moto', 'xe máy trong thành phố', '35 km/giờ', ['350 km/giờ', '3,5 km/giờ']], ['car', 'ô tô trên đường cao tốc', '90 km/giờ', ['900 km/giờ', '9 km/giờ']],
    ['boat', 'ca nô', '25 km/giờ', ['250 km/giờ', '2,5 km/giờ']], ['run', 'vận động viên chạy nhanh', '9 m/giây', ['90 m/giây', '9 km/giây']]];
  return {
    id: 't59real',
    make: (rng) => ({ i: rng.int(0, R.length - 1) }),
    async mount(f, { i }) {
      mark('t59real');
      voice(f);
      const [kind, who, ok, bad] = R[i];
      f.q.innerHTML = `Vận tốc nào hợp với <b>${who}</b>?`;
      reserveChoices(f); // nút chọn có chỗ trước khi đo khung hình
      const mv = createMove(f.tool, { dist: 10, vehicle: kind, marks: [] });
      mv.place(3);
      await f.choose({ options: opts([ok, ...bad], i + 3), answer: ok, say: `Vận tốc nào hợp với ${who}?`, hint: 'Nghĩ xem trong thực tế đi như vậy nhanh hay chậm. Đi bộ khoảng 5 km/giờ, xe đạp khoảng 15 km/giờ.' });
      await mv.drive(10, 900);
      f.finish({ ok: `${who[0].toUpperCase()}${who.slice(1)} đi với vận tốc khoảng ${ok}.` });
    },
  };
}

function taskSpeedCmp() {
  return {
    id: 't59cmp',
    make: (rng) => {
      for (;;) {
        const v1 = rng.int(30, 50), v2 = rng.int(30, 50), t1 = rng.int(2, 4), t2 = rng.int(2, 4);
        if (v1 !== v2 && t1 !== t2) return { v: [v1, v2], t: [t1, t2], names: rng.shuffle(['Ô tô xanh', 'Ô tô đỏ', 'Xe khách', 'Xe tải']).slice(0, 2) };
      }
    },
    async mount(f, { v, t: tt, names }) {
      mark('t59cmp');
      voice(f);
      const s = [v[0] * tt[0], v[1] * tt[1]];
      const fast = v[0] > v[1] ? 0 : 1;
      f.q.innerHTML = `${names[0]} đi ${s[0]} km hết ${tt[0]} giờ. ${names[1]} đi ${s[1]} km hết ${tt[1]} giờ. Xe nào đi nhanh hơn?`;
      await f.choose({ options: names.map((n, i) => ({ html: n, value: i })), answer: fast, say: 'Xe nào đi nhanh hơn? Tính vận tốc từng xe rồi so sánh.',
        hint: 'Đi được quãng đường dài hơn chưa chắc đã nhanh hơn. Tính mỗi giờ mỗi xe đi bao nhiêu ki-lô-mét.' });
      f.finish({ ok: `${names[0]}: ${s[0]} : ${tt[0]} = ${v[0]} km/giờ. ${names[1]}: ${s[1]} : ${tt[1]} = ${v[1]} km/giờ. ${names[fast]} nhanh hơn.` });
    },
  };
}

function taskSpeedConv() {
  return {
    id: 't59conv',
    make: (rng) => ({ v: rng.int(1, 10) * 6 }),
    async mount(f, { v }) {
      mark('t59conv');
      voice(f);
      const ans = (v * 1000) / 60;
      f.q.innerHTML = `${v} km/giờ = ${BOX} m/phút`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 5, say: `${v} ki-lô-mét trên giờ bằng bao nhiêu mét trên phút?`,
        hint: (x) => (x === v * 1000 ? 'Đó là số mét đi trong 1 giờ. 1 giờ = 60 phút, chia tiếp cho 60.' : `${v} km = ${v * 1000} m; 1 giờ = 60 phút. Lấy ${v * 1000} : 60.`) });
      f.finish({ ok: `${v} km/giờ = ${v * 1000} m : 60 phút = ${ans} m/phút` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 60. Quãng đường, thời gian của một chuyển động đều (chưa đối chiếu sách)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B60 = {
  explore: {
    setup: (board) => createMove(board, { dist: 30, vehicle: 'bike', ov: true }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Xe đạp <b>12 km/giờ</b>, đi <b>2,5 giờ</b>');
        await c.say('Một bạn đi xe đạp với vận tốc 12 ki-lô-mét trên giờ, đi trong 2,5 giờ. Bấm để xe chạy từng giờ.');
        for (let i = 0; i < 2; i++) {
          await c.choose([{ html: '▶ Chạy 1 giờ', value: 1 }], 1);
          await t.drive(12 * (i + 1), 900, `${i + 1} giờ`);
          t.flag(12 * (i + 1), `${i + 1} giờ`);
          await t.seg(12 * i, 12 * (i + 1), '12 km', i);
        }
        await c.say('Còn nửa giờ. Nửa giờ đi được bao nhiêu ki-lô-mét?');
        await c.choose([{ html: '6 km', value: 6 }, { html: '12 km', value: 12 }, { html: '5 km', value: 5 }], 6, { hint: 'Nửa giờ đi được một nửa của 12 km.' });
        await t.drive(30, 600, '2,5 giờ');
        await t.seg(24, 30, '6 km', 2);
        t.caption('s = v × t = 12 × 2,5 = <b>30 (km)</b>');
        await c.say('12 nhân 2,5 bằng 30. Muốn tính quãng đường, ta lấy vận tốc nhân với thời gian.');
      },
      async (c) => {
        const t = c.use((b) => createMove(b, { dist: 12, vehicle: 'bike', ov: true }));
        t.caption('Xe đạp <b>12 km/giờ</b>, đi <b>30 phút</b>');
        await c.say('Vẫn bạn ấy đi với vận tốc 12 ki-lô-mét trên giờ, nhưng chỉ đi 30 phút. Quãng đường là bao nhiêu?');
        await c.choose([{ html: '360 km', value: 360 }, { html: '6 km', value: 6 }], 6, { hint: 'Không nhân 12 với 30: 12 km là đi trong 1 giờ. 30 phút là 0,5 giờ.' });
        await t.drive(6, 900, '30 phút');
        await t.seg(0, 6, '6 km', 0);
        t.caption('30 phút = 0,5 giờ · s = 12 × 0,5 = <b>6 (km)</b>');
        await c.say('Đổi 30 phút bằng 0,5 giờ cho khớp với ki-lô-mét trên giờ. 12 nhân 0,5 bằng 6 ki-lô-mét.');
      },
      async (c) => {
        const t = c.use((b) => createMove(b, { dist: 45, vehicle: 'boat', ov: true }));
        t.caption('Ca nô <b>30 km/giờ</b>, quãng sông <b>45 km</b>');
        await c.say('Một ca nô đi với vận tốc 30 ki-lô-mét trên giờ, đi quãng sông 45 ki-lô-mét. Hết bao lâu?');
        await t.drive(30, 900, '1 giờ');
        t.flag(30, '1 giờ');
        await t.seg(0, 30, '30 km', 0);
        await t.drive(45, 600, '?');
        await t.seg(30, 45, '15 km', 1);
        await c.say('Một giờ đi 30 ki-lô-mét. Còn 15 ki-lô-mét là nửa quãng của một giờ. Phép tính nào cho thời gian?');
        await c.choose([{ html: '45 : 30', value: 1 }, { html: '45 × 30', value: 2 }, { html: '30 : 45', value: 3 }], 1, { hint: 'Thời gian bằng quãng đường chia cho vận tốc.' });
        t.clock('1,5 giờ');
        t.caption('t = s : v = 45 : 30 = <b>1,5 (giờ)</b> = 1 giờ 30 phút');
        await c.say('45 chia 30 bằng 1,5. Ca nô đi hết 1,5 giờ, tức 1 giờ 30 phút. Muốn tính thời gian, ta lấy quãng đường chia cho vận tốc.');
      },
      async (c) => {
        const t = c.use((b) => createMove(b, { dist: 60, vehicle: 'car', ov: true, marks: [[0, '7 giờ 30 phút'], [60, '?']] }));
        t.clock('7 giờ 30 phút');
        t.caption('<b>40 km/giờ</b>, <b>60 km</b>, đi lúc <b>7 giờ 30 phút</b>');
        await c.say('Ô tô xuất phát lúc 7 giờ 30 phút, đi 60 ki-lô-mét với vận tốc 40 ki-lô-mét trên giờ. Thời gian đi là 60 chia 40 bằng 1,5 giờ, tức 1 giờ 30 phút.');
        await t.drive(60, 1800, '?');
        await c.say('Ô tô đến nơi lúc mấy giờ?');
        await c.choose(['8 giờ 60 phút', '9 giờ', '8 giờ 30 phút'].map(v => ({ html: v, value: v })), '9 giờ', { hint: (v) => (v === '8 giờ 60 phút' ? '60 phút là 1 giờ, phải đổi.' : 'Giờ đến = giờ xuất phát + thời gian đi = 7 giờ 30 phút + 1 giờ 30 phút.') });
        t.clock('9 giờ');
        t.caption('7 giờ 30 phút + 1 giờ 30 phút = <b>9 giờ</b>');
        await c.say('Đúng rồi! Giờ đến bằng giờ xuất phát cộng thời gian đi.');
      },
    ],
  },
  tasks: () => [taskDist(), taskDistMin(), taskTime(), taskTimeHM(), taskArrive(), taskFormula()],
};

function taskDist() {
  return {
    id: 't60s',
    make: (rng) => { const i = rng.int(0, MOVERS.length - 1), m = MOVERS[i]; const half = m.tu === 'giờ' && rng.int(0, 2) === 0; return { i, v: rng.int(m.v[0], m.v[1]), t: rng.int(m.t[0], m.t[1]) + (half ? 0.5 : 0) }; },
    async mount(f, { i, v, t: tt }) {
      mark('t60s');
      voice(f);
      const m = MOVERS[i], s = clean(v * tt);
      f.q.innerHTML = `${m.who} đi với vận tốc ${v} ${vUnit(m)} trong ${D(tt)} ${m.tu}. s = ${BOX} ${m.unit}`;
      const mv = createMove(f.tool, { dist: s, unit: m.unit, vehicle: m.kind, tu: m.tu, marks: [[0, `0 ${m.unit}`], [s, '?']] });
      mv.caption(`v = <b>${v} ${vUnit(m)}</b>, t = <b>${D(tt)} ${m.tu}</b>`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: Number.isInteger(s) ? s : decKey(s), max: 5, say: `Tính quãng đường đi được trong ${D(tt)} ${m.tu}.`,
        hint: (x) => (Math.abs(x - v / tt) < 0.01 ? 'Quãng đường là vận tốc nhân thời gian, không phải chia.' : `s = v × t = ${v} × ${D(tt)}`) });
      mv.caption(`s = ${v} × ${D(tt)} = <b>${D(s)} (${m.unit})</b>`);
      await showSegs(mv, v, tt, { tu: m.tu, unit: m.unit, ms: 330 });
      f.finish({ ok: `s = ${v} × ${D(tt)} = ${D(s)} ${m.unit}` });
    },
  };
}

/** km/giờ với thời gian cho bằng phút: nhiễu là nhân thẳng số phút. */
function taskDistMin() {
  const MINS = [[30, 0.5], [15, 0.25], [45, 0.75], [12, 0.2], [6, 0.1], [90, 1.5]];
  return {
    id: 't60smin',
    make: (rng) => { const m = pickMover(rng, ['walk', 'bike', 'moto', 'car']); const j = rng.int(0, MINS.length - 1); for (;;) { const v = rng.int(m.v[0], m.v[1]); if (Number.isInteger(v * MINS[j][1] * 10)) return { kind: m.kind, v, j }; } },
    async mount(f, { kind, v, j }) {
      mark('t60smin');
      voice(f);
      const m = MOVERS.find(x => x.kind === kind), [mi, k] = MINS[j], s = clean(v * k);
      f.q.innerHTML = `${m.who} đi với vận tốc ${v} km/giờ trong ${mi} phút. Quãng đường là:`;
      reserveChoices(f); // nút chọn có chỗ trước khi đo khung hình
      const mv = createMove(f.tool, { dist: Math.max(v, s), vehicle: m.kind, marks: [[0, '0 km'], [v, `${v} km`]] });
      mv.flag(v, '1 giờ');
      const ok = `${D(s)} km`;
      await f.choose({ options: opts([ok, `${v * mi} km`, `${v} km`, `${D(v * mi / 100)} km`], v + mi), answer: ok, say: 'Chọn quãng đường đúng.',
        hint: (x) => (x === `${v * mi} km` ? `${v} km là đi trong 1 giờ. Đổi ${mi} phút ra giờ trước: ${mi} phút = ${D(k)} giờ.` : `${mi} phút = ${D(k)} giờ. s = ${v} × ${D(k)}.`) });
      mv.caption(`${mi} phút = ${D(k)} giờ · s = ${v} × ${D(k)} = <b>${D(s)} km</b>`);
      await mv.drive(s, 900, `${mi} phút`);
      await mv.seg(0, s, ok, 0);
      f.finish({ ok: `${mi} phút = ${D(k)} giờ; s = ${v} × ${D(k)} = ${D(s)} km` });
    },
  };
}

function taskTime() {
  return {
    id: 't60t',
    make: (rng) => { const m = pickMover(rng, ['walk', 'bike', 'moto', 'car', 'bus', 'boat']); const tt = rng.pick([2, 3, 1.5, 2.5, 4, 0.5]); for (;;) { const v = rng.int(m.v[0], m.v[1]); if (Number.isInteger(v * tt)) return { kind: m.kind, v, t: tt }; } },
    async mount(f, { kind, v, t: tt }) {
      mark('t60t');
      voice(f);
      const m = MOVERS.find(x => x.kind === kind), s = v * tt;
      f.q.innerHTML = `${m.who} đi ${s} km với vận tốc ${v} km/giờ. t = ${BOX} giờ`;
      const mv = createMove(f.tool, { dist: s, vehicle: m.kind });
      mv.caption(`s = <b>${s} km</b>, v = <b>${v} km/giờ</b>`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(tt), max: 4, say: 'Tính thời gian đi, viết bằng giờ.',
        hint: (x) => (Math.abs(x - s * v) < 0.01 ? 'Thời gian là quãng đường chia cho vận tốc.' : Math.abs(x - v / s) < 0.01 ? 'Lấy quãng đường chia cho vận tốc, không đảo ngược.' : `t = s : v = ${s} : ${v}`) });
      mv.caption(`t = ${s} : ${v} = <b>${D(tt)} (giờ)</b>`);
      await showSegs(mv, v, tt, { ms: 330 });
      f.finish({ ok: `t = ${s} : ${v} = ${D(tt)} giờ` });
    },
  };
}

/** Thời gian là số thập phân của giờ → giờ phút (nhiễu: đọc 1,25 giờ thành 1 giờ 25 phút). */
function taskTimeHM() {
  const TT = [1.25, 1.5, 2.25, 0.75, 1.75, 2.5, 1.2, 0.4];
  return {
    id: 't60thm',
    make: (rng) => { const k = rng.pick(TT); const m = pickMover(rng, ['bike', 'moto', 'car']); for (;;) { const v = rng.int(m.v[0], m.v[1]); if (Number.isInteger(v * k)) return { kind: m.kind, v, k }; } },
    async mount(f, { kind, v, k }) {
      mark('t60thm');
      voice(f);
      const m = MOVERS.find(x => x.kind === kind), s = v * k;
      const h = Math.floor(k), mi = Math.round((k - h) * 60);
      const ok = tstr([h, mi], HM);
      const frac = String(decKey(k)).split(',')[1] || '0';
      const wrong = tstr([h, +frac], HM);
      f.q.innerHTML = `${m.who} đi ${s} km với vận tốc ${v} km/giờ. Thời gian đi là:`;
      reserveChoices(f); // nút chọn có chỗ trước khi đo khung hình
      const mv = createMove(f.tool, { dist: s, vehicle: m.kind });
      await f.choose({ options: opts([ok, wrong, `${D(k)} phút`], v + h), answer: ok, say: 'Thời gian đi là bao nhiêu? Tính ra giờ rồi đổi ra giờ phút.',
        hint: (x) => (x === wrong ? `${D(k - h)} giờ không phải ${frac} phút. Lấy ${D(k - h)} × 60.` : `t = ${s} : ${v} = ${D(k)} giờ, rồi đổi ra giờ phút.`) });
      mv.caption(`t = ${s} : ${v} = ${D(k)} giờ = <b>${ok}</b>`);
      await showSegs(mv, v, k, { ms: 330 });
      f.finish({ ok: `t = ${s} : ${v} = ${D(k)} giờ = ${ok}` });
    },
  };
}

function taskArrive() {
  return {
    id: 't60arrive',
    make: (rng) => {
      const m = pickMover(rng, ['car', 'bus', 'moto', 'bike']);
      const k = rng.pick([1.5, 2, 2.5, 1.25, 0.75, 3]);
      for (;;) { const v = rng.int(m.v[0], m.v[1]); if (Number.isInteger(v * k)) return { kind: m.kind, v, k, a: [rng.int(6, 14), rng.int(0, 11) * 5] }; }
    },
    async mount(f, { kind, v, k, a }) {
      mark('t60arrive');
      voice(f);
      const m = MOVERS.find(x => x.kind === kind), s = v * k;
      const d = [Math.floor(k), Math.round((k % 1) * 60)];
      const raw = [a[0] + d[0], a[1] + d[1]];
      const e = fromSmall(toSmall(a, HM) + toSmall(d, HM), HM);
      const ok = tstr(e, HM);
      f.q.innerHTML = `Xuất phát lúc ${tstr(a, HM)}, đi ${s} km, vận tốc ${v} km/giờ. Đến nơi lúc mấy giờ?`;
      reserveChoices(f); // nút chọn có chỗ trước khi đo khung hình
      const mv = createMove(f.tool, { dist: s, vehicle: m.kind, marks: [[0, tstr(a, HM)], [s, '?']] });
      mv.clock(tstr(a, HM));
      // nhiễu: đọc phần thập phân của giờ như số phút (1,5 giờ → 1 giờ 50 phút)
      const misread = fromSmall(toSmall(a, HM) + Math.floor(k) * 60 + Math.round((k % 1) * 100), HM);
      const list = [ok, tstr(misread, HM), tstr(d, HM)];
      if (raw[1] >= 60) list.push(tstr(raw, HM));
      await f.choose({ options: opts(list, a[0] + v), answer: ok, say: `${m.who} xuất phát lúc ${tstr(a, HM)}, đi ${s} ki-lô-mét với vận tốc ${v} ki-lô-mét trên giờ. Đến nơi lúc mấy giờ?`,
        hint: (x) => (x === tstr(d, HM) ? 'Đó là thời gian đi. Còn phải cộng với giờ xuất phát.' : `Thời gian đi: ${s} : ${v} = ${D(k)} giờ = ${tstr(d, HM)}. Giờ đến = ${tstr(a, HM)} + ${tstr(d, HM)}.`) });
      mv.caption(`t = ${s} : ${v} = ${D(k)} giờ = ${tstr(d, HM)}`);
      await mv.drive(s, 1300, ok);
      f.finish({ ok: `${tstr(a, HM)} + ${tstr(d, HM)} = ${ok}` });
    },
  };
}

function taskFormula() {
  return {
    id: 't60form',
    make: (rng) => ({ ask: rng.pick(['v', 's', 't']), v: rng.int(4, 12) * 5, t: rng.int(2, 4) }),
    async mount(f, { ask: what, v, t: tt }) {
      mark('t60form');
      voice(f);
      const s = v * tt;
      const given = { v: `s = ${s} km, t = ${tt} giờ`, s: `v = ${v} km/giờ, t = ${tt} giờ`, t: `s = ${s} km, v = ${v} km/giờ` }[what];
      const want = { v: 'vận tốc', s: 'quãng đường', t: 'thời gian' }[what];
      const ok = { v: `${s} : ${tt}`, s: `${v} × ${tt}`, t: `${s} : ${v}` }[what];
      const list = { v: [ok, `${s} × ${tt}`, `${tt} : ${s}`], s: [ok, `${v} : ${tt}`, `${tt} : ${v}`], t: [ok, `${s} × ${v}`, `${v} : ${s}`] }[what];
      f.q.innerHTML = `Biết ${given}. Tính ${want} bằng phép tính nào?`;
      reserveChoices(f); // nút chọn có chỗ trước khi đo khung hình
      const mv = createMove(f.tool, { dist: s, vehicle: 'car' });
      await f.choose({ options: opts(list, v + tt), answer: ok, say: `Tính ${want} bằng phép tính nào?`, hint: 'Nhớ: v = s : t; s = v × t; t = s : v.' });
      await showSegs(mv, v, tt, { ms: 300 });
      const res = { v: `${v} km/giờ`, s: `${s} km`, t: `${tt} giờ` }[what];
      f.finish({ ok: `${what} = ${ok} = ${res}` });
    },
  };
}

export const TIME_LESSONS = { 56: B56, 57: B57, 58: B58, 59: B59, 60: B60 };

// ── Luyện Tính lớp 5: cấp số đo thời gian, chuyển động đều (grade5Drills.js nối vào) ──────────────────────
export const TIME_DRILL_LEVELS = [
  { id: 'd5-time-1', n: 1, title: 'Đổi đơn vị đo thời gian', desc: 'Vd. 72 phút = 1,2 giờ; 1,4 giờ = 1 giờ 24 phút; 3/4 giờ = 45 phút.', knowledge: 'bảng đơn vị đo thời gian, 0,1 giờ = 6 phút', sgk: 56,
    say: 'Giờ, phút, giây đổi theo 60. Mỗi 6 phút là 0,1 giờ!', tasks: [taskFact(), taskToDec(), taskFromDec(), taskFrac()] },
  { id: 'd5-time-2', n: 2, title: 'Cộng, trừ, nhân, chia số đo thời gian', desc: 'Vd. 3 giờ 45 phút + 2 giờ 35 phút; 4 giờ 20 phút − 2 giờ 45 phút; 7 giờ 40 phút : 4.', knowledge: 'tính từng cột, đủ 60 thì đổi, mượn 1 giờ = 60 phút', sgk: 57,
    say: 'Tính từng cột. Đủ 60 phút thì đổi thành 1 giờ!', tasks: [taskAddCarry(), taskSubBorrow(), taskMulCarry(), taskDivRem(), taskSub(), taskMul()] },
  { id: 'd5-move-1', n: 3, title: 'Vận tốc', desc: 'Vd. 170 km hết 4 giờ: v = 42,5 km/giờ; 60 km hết 1 giờ 30 phút.', knowledge: 'v = s : t', sgk: 59,
    say: 'Vận tốc bằng quãng đường chia cho thời gian!', tasks: [taskSpeed(), taskSpeedMix(), taskSpeedUnit(), taskSpeedConv()] },
  { id: 'd5-move-2', n: 4, title: 'Quãng đường, thời gian', desc: 'Vd. 12 km/giờ trong 2,5 giờ; 45 km với 30 km/giờ hết bao lâu.', knowledge: 's = v × t, t = s : v', sgk: 60,
    say: 'Quãng đường bằng vận tốc nhân thời gian. Thời gian bằng quãng đường chia vận tốc!', tasks: [taskDist(), taskDistMin(), taskTime(), taskTimeHM(), taskArrive()] },
];

// ── Kiểu riêng: bảng đơn vị, dải tháng, trục thế kỉ, con quay ─────────────────────────────────────────
let styled = false;
function injectT10Styles() {
  if (styled) return;
  styled = true;
  css('g5-t10', `
    .g5u, .g5m, .g5cl, .g5sp { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; justify-content: center; container-type: size; box-sizing: border-box; }
    .g5u-ov { padding-bottom: 20cqh; }
    .g5cl-svg { flex: 1 1 0; min-height: 0; width: 100%; }
    .g5cl-t { font-family: 'Baloo 2', sans-serif; font-weight: 800; text-anchor: middle; }
    .g5cl-t:not([fill]) { fill: ${INK}; }
    .g5u-grid { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 1fr; gap: 2.4cqh 2cqi; padding: 2cqh 2cqi; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(9cqh, 3.7cqi); }
    .g5u-row { display: flex; align-items: center; justify-content: center; gap: 0.3em; white-space: nowrap; background: #FFE4E6; border: 1.5px solid #FDA4AF; border-radius: 0.5em; padding: 0.1em 0.4em; }
    .g5u-v { min-width: 2em; text-align: center; background: #fff; border-radius: 0.3em; color: #94A3B8; }
    .g5u-v.g5u-ok { color: #DC2626; }
    .g5u-hl { box-shadow: 0 0 0 0.12em #FACC15; background: #FEF9C3; }
    .g5m-row { flex: 1 1 0; min-height: 0; display: flex; gap: 1cqi; align-items: stretch; padding: 1cqh 2cqi 0; }
    .g5m-c { flex: 1 1 0; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; min-width: 0; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
    .g5m-bar { width: 100%; max-height: 72%; border: 1.5px solid ${INK}; border-radius: 0.4em 0.4em 0 0; box-sizing: border-box; }
    .g5m-31 { background: #FDBA74; } .g5m-30 { background: #93C5FD; } .g5m-28, .g5m-29 { background: #F9A8D4; }
    .g5m-d { font-size: min(7cqh, 3.6cqi); color: #1E293B; }
    .g5m-n { font-size: min(6.4cqh, 3.4cqi); color: #475569; }
    .g5m-hl .g5m-bar { box-shadow: 0 0 0 0.3em #FACC15; }
    .g5m-hl .g5m-n { color: #DC2626; }
    .g5m-key { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #475569; font-size: min(5cqh, 3cqi); }
    .g5m-key i { display: inline-block; width: 1em; height: 1em; border-radius: 0.2em; vertical-align: -0.12em; margin: 0 0.25em 0 0.9em; border: 1px solid ${INK}; }
    .g5sp { flex-direction: row; gap: 2cqi; padding: 1cqh 2cqi; align-items: stretch; }
    .g5sp .g5sp-r { flex: 1 1 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.15em; min-width: 0;
      font-size: min(9cqh, 5cqi); }
    .g5sp-top { font-size: 2.2em; line-height: 1; }
    .g5sp-v { color: #1D4ED8; }
    .g5sp-s { color: #15803D; font-size: 0.85em; }
    @container (orientation: portrait) {
      .g5u-grid { grid-template-columns: 1fr; gap: 1.2cqh; font-size: min(6.4cqh, 7.4cqi); }
      .g5m-row { gap: 0.6cqi; padding: 1cqh 1cqi 0; }
      .g5m-d { font-size: min(4.4cqh, 4.4cqi); } .g5m-n { font-size: min(4.4cqh, 4.2cqi); }
      .g5m-key { font-size: min(3.6cqh, 4.4cqi); }
      .g5sp { flex-direction: column; }
      .g5sp .g5sp-r { flex-direction: row; flex-wrap: wrap; gap: 0 0.4em; font-size: min(6.4cqh, 7cqi); }
      .g5sp-top { font-size: 1.3em; }
    }
  `);
}
