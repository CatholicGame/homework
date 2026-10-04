/**
 * ⏰ Xem giờ, tính giờ và 📅 Xem lịch, tính ngày (Luyện Tính lớp 2 và lớp 3). Cùng khung lớp học của kit.js.
 * Mỗi đề là một dãy bước như cách làm ở lớp, viết thành các dòng trên tờ vở:
 *   "40 phút + 20 phút = [60] phút" → "60 phút = 1 giờ [0] phút" → "Xong lúc [8] giờ đúng."
 * Ô số gõ bằng bàn phím, ô chữ (thứ, buổi, đốt tay) chọn bằng nút to. Đúng bước nào thì hình bên cạnh làm theo:
 * kim đồng hồ quay hết khoảng thời gian (phần đã trôi qua tô màu), vòng tròn nhảy trên tờ lịch, đếm từng ngày.
 * Bố cục cố định trong một lượt: tờ vở = dòng đề | hình (đồng hồ, tờ lịch, nắm tay…) bên cạnh các dòng tính
 * (ngang) hoặc ở trên (dọc). Mọi dòng giữ chỗ từ đầu, hiện dần; hàng nút chọn giữ chỗ nếu đề có bước chọn.
 * Lớp 2 bám Vở BT Toán 2 Bài 29–31, lớp 3 bám Vở BT Toán 3 Bài 66–67.
 */

import { mountDrill, shake, setActive, flyDigit, flyOne, fresh, sfx, sleep, how, TEACHER, INK } from './kit.js';
import { alarmClockSvg, CLOCK, clockIcon, calendarIcon } from '../grade2Games/art/clock.js';

const YEAR = new Date().getFullYear();
const daysIn = (m) => new Date(YEAR, m, 0).getDate();
/** 0 = Thứ Hai … 6 = Chủ nhật */
const wdOf = (m, d) => (new Date(YEAR, m - 1, d).getDay() + 6) % 7;
const WD = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
const WD_SHORT = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const BUOI = ['sáng', 'trưa', 'chiều', 'tối'];
const buoiOf = (H24) => (H24 <= 10 ? 'sáng' : H24 <= 12 ? 'trưa' : H24 <= 18 ? 'chiều' : 'tối');
const two = (n) => String(n).padStart(2, '0');
const h12 = (H) => ((H + 11) % 12) + 1;
/** 7, 40 → "7 giờ 40 phút"; 7, 0 → "7 giờ" */
const tm = (H, M) => (M ? `${H} giờ ${M} phút` : `${H} giờ`);
const NAMES = ['Mai', 'Nam', 'Lan', 'Minh', 'An', 'Hà', 'Bình', 'Hoa'];

// ── Hình: đồng hồ kim ───────────────────────────────────────────────────────────────────────────────
const { cx: CX, cy: CY } = CLOCK;
const rad = (d) => (d * Math.PI) / 180;
const f1 = (n) => (Math.round(n * 10) / 10).toString();

function clockHtml(c, { H = 12, M = 0, label = '', q = false }) {
  // Phần thời gian đã trôi qua: hình quạt nằm dưới vạch, số và kim.
  const svg = alarmClockSvg().replace('<line', `<path data-arc d="" fill="#22C55E" fill-opacity="0.32"/><line`);
  return `<div class="g3t-clk${q ? ' g3t-q' : ''}" data-clk="${c}" data-t="${H * 60 + M}">
    <div class="g3t-clk-face">${svg}<b class="g3t-qmark">?</b></div>
    ${label ? `<span class="g3t-clk-lab">${label}</span>` : ''}</div>`;
}
function setHands(el, tot) {
  const set = (id, a) => el.querySelector(`[data-hand="${id}"]`)?.setAttribute('transform', `rotate(${f1(a)} ${CX} ${CY})`);
  set('h', ((tot / 60) % 12) * 30);
  set('m', (tot % 60) * 6);
}
function wedge(a1, a2, r) {
  const lo = Math.min(a1, a2), hi = Math.max(a1, a2);
  if (hi - lo < 0.5) return '';
  if (hi - lo >= 359.5) return `M${CX - r} ${CY} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
  const p = (a) => `${f1(CX + r * Math.sin(rad(a)))} ${f1(CY - r * Math.cos(rad(a)))}`;
  return `M${CX} ${CY} L${p(lo)} A${r} ${r} 0 ${hi - lo > 180 ? 1 : 0} 1 ${p(hi)} Z`;
}
/** Tô phần đã trôi qua: unit 'm' theo kim dài (hình quạt lớn, xanh), 'h' theo kim ngắn (hình quạt nhỏ, cam). */
function setArc(el, from, to, unit) {
  const arc = el.querySelector('[data-arc]');
  if (unit === 'h') { arc.setAttribute('d', wedge(from / 2, to / 2, 74)); arc.setAttribute('fill', '#F97316'); }
  else { arc.setAttribute('d', wedge(from * 6, to * 6, 100)); arc.setAttribute('fill', '#22C55E'); }
}

// ── Hình: tờ lịch tháng ─────────────────────────────────────────────────────────────────────────────
function calHtml(c, { m, blank = false, show = [], marks = {} }) {
  const fc = wdOf(m, 1), dn = daysIn(m), rows = Math.ceil((fc + dn) / 7);
  let cells = WD_SHORT.map((t, i) => `<div class="g3t-wh${i === 6 ? ' g3t-sun' : ''}" data-col="${i}">${t}</div>`).join('');
  for (let i = 0; i < rows * 7; i++) {
    const d = i - fc + 1;
    if (d < 1 || d > dn) { cells += '<div class="g3t-cd g3t-cd-off"></div>'; continue; }
    const hid = blank && !show.includes(d);
    cells += `<div class="g3t-cd${i % 7 === 6 ? ' g3t-sun' : ''}${hid ? ' g3t-cd-hid' : ''}${marks[d] ? ` g3t-${marks[d]}` : ''}" data-d="${d}"><span>${d}</span><i class="g3t-cnt"></i></div>`;
  }
  return `<div class="g3t-cal" data-cal="${c}" data-m="${m}" style="--rows:${rows}">
    <div class="g3t-cal-top"><span>Tháng ${m}</span><small>${YEAR}</small></div>
    <div class="g3t-cal-grid">${cells}</div></div>`;
}

// ── Hình: nắm tay đếm ngày của tháng (đốt nhô lên: 31 ngày, chỗ lõm: 30 ngày) ─────────────────────────────
const FIST_SLOT = ['k0', 'v0', 'k1', 'v1', 'k2', 'v2', 'k3', 'k0', 'v0', 'k1', 'v1', 'k2'];
function fistHtml() {
  const skin = '#FBCB9A';
  const kx = [130, 250, 370, 490], KY = 270;
  // Nhãn đốt nhô lên ở hàng trên, nhãn chỗ lõm ở hàng dưới; mỗi nhãn có que chỉ xuống đúng chỗ trên tay.
  const lab = (id, x, y, toY, text, valley) => `<g class="g3t-slot" data-slot="${id}">
    <path d="M${x} ${y + 24} V${toY}" stroke="${INK}" stroke-width="3" stroke-dasharray="6 5"/>
    <rect x="${x - 56}" y="${y - 24}" width="112" height="48" rx="12" fill="${valley ? '#E0F2FE' : '#FEF3C7'}" stroke="${INK}" stroke-width="3"/>
    <text x="${x}" y="${y + 10}" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="28" fill="${INK}">${text}</text></g>`;
  return `<svg class="g3t-fist" viewBox="0 0 620 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    ${lab('k0', 130, 40, KY - 62, 'T1, T8')}${lab('k1', 250, 40, KY - 62, 'T3, T10')}${lab('k2', 370, 40, KY - 62, 'T5, T12')}${lab('k3', 490, 40, KY - 62, 'T7')}
    ${lab('v0', 190, 120, KY - 26, 'T2, T9', true)}${lab('v1', 310, 120, KY - 26, 'T4, T11', true)}${lab('v2', 430, 120, KY - 26, 'T6', true)}
    <path d="M70 ${KY} Q60 450 200 452 H470 Q560 450 560 350 V${KY} Z" fill="${skin}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    ${kx.map(x => `<circle cx="${x}" cy="${KY}" r="60" fill="${skin}" stroke="${INK}" stroke-width="4"/>`).join('')}
    <rect x="72" y="${KY + 2}" width="486" height="80" fill="${skin}"/>
    ${[190, 310, 430].map(x => `<path d="M${x} ${KY + 30} V${KY + 95}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`).join('')}
    <path d="M40 ${KY + 80} Q20 ${KY + 30} 70 ${KY + 20} Q150 ${KY + 30} 220 ${KY + 80} Q240 ${KY + 120} 200 ${KY + 130} Q120 ${KY + 130} 40 ${KY + 80} Z" fill="#F6B784" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  </svg>`;
}

// ── Hình: tuần lễ (hàng 7 ô) và thẻ (1 ngày, 1 năm) ─────────────────────────────────────────────────────
const weekHtml = (n) => `<div class="g3t-week" style="--rows:${n}">${WD_SHORT.map((t, i) => `<div class="g3t-wh${i === 6 ? ' g3t-sun' : ''}">${t}</div>`).join('')}
  ${Array.from({ length: n * 7 }, (_, i) => `<div class="g3t-cd${i % 7 === 6 ? ' g3t-sun' : ''}" data-wc="${i}"><span>&nbsp;</span></div>`).join('')}</div>`;
const cardsHtml = (n, pic, top, sub) => `<div class="g3t-cards">${Array.from({ length: n }, (_, i) =>
  `<div class="g3t-card" data-card="${i}"><span class="g3t-card-pic">${pic}</span><b>${top}</b><small>${sub}</small></div>`).join('')}</div>`;
const digitalBox = (text) => `<div class="g3t-dig"><span data-dig>${text}</span></div>`;

// ── Hình: bảng 24 giờ trong ngày (1–12 ở trên, 13–24 ở dưới: cùng cột thì hơn kém nhau 12 giờ) ─────────
const BUOI_ICON = ['☀️', '🌞', '🌇', '🌙'];
function dayHtml({ at }) {
  const cells = Array.from({ length: 24 }, (_, i) => {
    const H = i + 1, b = buoiOf(H);
    return `<div class="g3t-hr g3t-b${BUOI.indexOf(b)}${H === at ? ' g3t-today' : ''}" data-hr="${H}"><b>${H}</b><small>${h12(H)} giờ ${b}</small></div>`;
  }).join('');
  return `<div class="g3t-day"><div class="g3t-day-grid">${cells}</div>
    <div class="g3t-day-leg">${BUOI.map((b, i) => `<span class="g3t-b${i}">${BUOI_ICON[i]} ${b}</span>`).join('')}</div></div>`;
}

function picHtml(pic) {
  switch (pic.kind) {
    case 'day': return dayHtml(pic);
    case 'clocks': return `<div class="g3t-row${pic.clocks.length > 2 ? ' g3t-many' : ''}">${pic.dig ? digitalBox(pic.dig) : ''}${pic.clocks.map((c, i) => clockHtml(i, c)).join('')}</div>`;
    case 'cal': return `<div class="g3t-row">${pic.cals.map((c, i) => calHtml(i, c)).join('')}</div>`;
    case 'fist': return fistHtml();
    case 'week': return weekHtml(pic.n);
    case 'cards': return cardsHtml(pic.n, pic.pic, pic.top, pic.sub);
    default: return '';
  }
}

// ── Đề: dòng tính với ô [[id]] và các bước ───────────────────────────────────────────────────────────
// line: { html, at } — dòng hiện khi tới bước thứ `at` (bước = steps.length: hiện khi làm xong).
// step: { box, ans, show, hint, pick?: [lựa chọn], fx?: hiệu ứng sau khi đúng }.
const L = (html, at = 0) => ({ html, at });
const pickKey = (v) => String(v);

// Lớp 2: giờ đúng, giờ rưỡi, 15 phút. Lớp 3: đến từng phút, cả cách đọc "kém".
function genRead(rng, k, g3) {
  const H = rng.int(1, 12);
  const M = g3 ? (k % 3 === 0 ? rng.int(7, 11) * 5 : k % 3 === 1 ? rng.int(1, 11) * 5 : rng.pick([rng.int(1, 29), rng.int(31, 59)]))
    : [0, 30, 15][k % 3];
  const next = h12(H + 1);
  const hHint = M === 0 ? `Kim ngắn chỉ đúng số ${H}: ${H} giờ.` : `Kim ngắn đã qua số ${H}, chưa tới số ${next}: vẫn là ${H} giờ.`;
  const n5 = Math.floor(M / 5);
  const mHint = M % 5 === 0 ? `Kim dài chỉ số ${n5}: ${n5} × 5 = ${M} phút.`
    : `Kim dài đã qua số ${n5 || 12} (${n5 * 5} phút), thêm ${M % 5} vạch nhỏ: ${M} phút.`;
  const steps = [{ box: 'h', ans: H, show: 'Kim ngắn chỉ giờ. Đồng hồ chỉ mấy giờ?', hint: hHint }];
  const lines = [];
  if (M === 0) lines.push(L('Đồng hồ chỉ [[h]] giờ đúng.'));
  else {
    lines.push(L('Đồng hồ chỉ [[h]] giờ [[m]] phút.'));
    steps.push({ box: 'm', ans: M, show: 'Kim dài chỉ phút. Mấy phút?', hint: mHint });
  }
  if (!g3 && M === 30) lines.push(L(`Còn gọi là ${H} giờ rưỡi.`, 2));
  if (g3 && M >= 35 && M % 5 === 0) {
    lines.push(L('Hay [[h2]] giờ kém [[k]] phút.', 2));
    steps.push({ box: 'h2', ans: next, show: 'Sắp đến mấy giờ?', hint: `Kim ngắn sắp tới số ${next}: sắp đến ${next} giờ.` });
    steps.push({
      box: 'k', ans: 60 - M, show: `Còn mấy phút nữa thì đến ${next} giờ?`,
      hint: `60 − ${M} = ${60 - M}. Kim dài còn ${(60 - M) / 5} số nữa là tới số 12.`, fx: { arc: { c: 0, from: M, to: 60 } },
    });
  }
  const ok = `Đồng hồ chỉ ${tm(H, M)}${g3 && M >= 35 && M % 5 === 0 ? `, hay ${next} giờ kém ${60 - M} phút` : ''}.`;
  return { head: 'Đồng hồ chỉ mấy giờ?', pic: { kind: 'clocks', clocks: [{ H, M }] }, lines, steps, ok };
}

// Giờ buổi chiều, buổi tối: 20 giờ là 8 giờ tối, 4 giờ chiều là 16 giờ.
function genDay24(rng, k, g3) {
  const H24 = rng.pick([13, 14, 15, 16, 17, 19, 20, 21, 22]);
  const M = g3 ? rng.int(0, 11) * 5 : rng.pick([0, 30]);
  const h = H24 - 12, b = buoiOf(H24);
  const time = `${two(H24)} : ${two(M)}`;
  const bHint = b === 'chiều' ? 'Từ 13 giờ đến 18 giờ là buổi chiều.' : 'Từ 19 giờ đến 23 giờ là buổi tối.';
  if (k % 2 === 0) {
    return {
      head: `Đồng hồ điện tử chỉ <b>${time}</b>. Đó là mấy giờ, buổi nào?`,
      pic: { kind: 'clocks', dig: time, clocks: [{ H: 12, M: 0, q: true }] },
      lines: [L(`${H24} − 12 = [[a]]`), L(`${time} là ${tm(h, M)} [[b]].`, 1)],
      steps: [
        { box: 'a', ans: h, show: 'Từ 13 giờ trở đi: lấy số giờ trừ đi 12.', hint: `${H24} − 12 = ${h}.`, fx: { set: { c: 0, H: h, M } } },
        { box: 'b', pick: BUOI, ans: b, show: 'Buổi nào trong ngày?', hint: bHint },
      ],
      ok: `${time} là ${tm(h, M)} ${b}.`,
    };
  }
  return {
    head: `Lúc <b>${tm(h, M)} ${b}</b>, đồng hồ điện tử chỉ mấy giờ?`,
    pic: { kind: 'clocks', dig: `-- : ${two(M)}`, clocks: [{ H: h, M }] },
    lines: [L(`${h} + 12 = [[a]]`), L(`${tm(h, M)} ${b} là ${tm(H24, M)}.`, 1)],
    steps: [{ box: 'a', ans: H24, show: `Giờ buổi ${b}: lấy số giờ cộng thêm 12.`, hint: `${h} + 12 = ${H24}.`, fx: { dig: time } }],
    ok: `${tm(h, M)} ${b} là ${H24} giờ, đồng hồ điện tử chỉ ${time}.`,
  };
}

// Đổi giờ: 4 giờ chiều = 16 giờ, 21 giờ = 9 giờ tối, 9 giờ sáng giữ nguyên. Bảng 24 giờ: vòng tròn nhảy sang cột cùng số.
const SWAP_H = [6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
function genSwap(rng, k, g3) {
  const pool = k % 4 < 2 ? SWAP_H.filter(H => H > 12) : SWAP_H;
  const H24 = rng.pick(pool), pm = H24 > 12, h = pm ? H24 - 12 : H24, b = buoiOf(H24);
  const M = g3 && rng() < 0.5 ? rng.int(1, 11) * 5 : 0;
  const mm = M ? ` ${M} phút` : '';
  if (k % 2 === 0) {
    return {
      head: `<b>${h} giờ${mm} ${b}</b> là mấy giờ trong ngày?`,
      pic: { kind: 'day', at: h },
      lines: [L(`${h} giờ${mm} ${b} = [[x]] giờ${mm}`), L(pm ? `Vì ${h} + 12 = ${H24}.` : 'Buổi sáng giữ nguyên số giờ.', 1)],
      steps: [{
        box: 'x', ans: H24, show: 'Buổi sáng giữ nguyên. Buổi chiều, buổi tối thì cộng thêm 12.',
        hint: pm ? `Buổi ${b}: ${h} + 12 = ${H24}.` : `Buổi sáng giữ nguyên: ${h} giờ.`, fx: { day: { from: h, to: H24 } },
      }],
      ok: `${h} giờ${mm} ${b} là ${H24} giờ${mm}.`,
    };
  }
  return {
    head: `<b>${H24} giờ${mm}</b> là mấy giờ, buổi nào?`,
    pic: { kind: 'day', at: H24 },
    lines: [L(`${H24} giờ${mm} = [[x]] giờ${mm} [[b]]`), L(pm ? `Vì ${H24} − 12 = ${h}.` : 'Trước 13 giờ thì giữ nguyên số giờ.', 2)],
    steps: [
      { box: 'x', ans: h, show: 'Từ 13 giờ trở đi thì trừ 12. Trước 13 giờ thì giữ nguyên.', hint: pm ? `${H24} − 12 = ${h}.` : `${H24} giờ chưa tới 13 giờ: vẫn là ${h} giờ.`, fx: { day: { from: H24, to: h } } },
      { box: 'b', pick: BUOI, ans: b, show: 'Buổi nào trong ngày?', hint: `Nhìn màu ô ${H24} trên bảng: buổi ${b}.` },
    ],
    ok: `${H24} giờ${mm} là ${h} giờ${mm} ${b}.`,
  };
}

// Chỉnh đồng hồ: đồng hồ đang chỉ sai, bé kéo kim (hoặc bấm ±) cho đúng giờ cần chỉnh rồi bấm Xong.
// Bước { box: 'set', set: { c, T, snap } }: T = số phút tính từ 12 giờ (0–719).
const handHint = (H, M) => {
  const n5 = Math.floor(M / 5);
  const mh = M % 5 === 0 ? `Kim dài chỉ số ${n5 || 12}` : `Kim dài qua số ${n5 || 12} thêm ${M % 5} vạch nhỏ`;
  const hh = M === 0 ? `kim ngắn chỉ đúng số ${H}` : `kim ngắn nằm giữa số ${H} và số ${h12(H + 1)}`;
  return `${tm(H, M)}: ${mh}, ${hh}.`;
};
function genSet(rng, k, g3) {
  const kind = g3 ? ['plain', 'slow', 'kem', 'h24'][k % 4] : ['plain', 'plain', 'h24'][k % 3];
  const snap = g3 ? 1 : 5;
  let H = rng.int(1, 12);
  let M = g3 ? (rng() < 0.5 ? rng.int(1, 11) * 5 : rng.int(1, 59)) : rng.pick([0, 30, 15]);
  if (kind === 'kem') M = rng.int(8, 11) * 5;
  if (kind === 'h24' && !g3) M = rng.pick([0, 30]);
  const wrongT = ((H * 60 + M + rng.int(2, 8) * 60 + rng.int(2, 9) * 5) % 720);
  const setStep = (show) => ({ box: 'set', set: { c: 0, T: (H * 60 + M) % 720, snap }, show, hint: handHint(H, M) });
  const done = L(`Đồng hồ đã chỉ đúng ${tm(H, M)}.`, kind === 'plain' || kind === 'kem' ? 1 : 2);
  if (kind === 'plain') {
    return {
      head: `Đồng hồ chỉ sai giờ. Bây giờ là <b>${tm(H, M)}</b>. Em hãy chỉnh lại kim!`,
      pic: { kind: 'clocks', clocks: [{ H: 0, M: wrongT }] },
      lines: [L(`Chỉnh kim cho đúng <b>${tm(H, M)}</b>.`), done],
      steps: [setStep('Kéo kim dài cho đúng phút, rồi kéo kim ngắn cho đúng giờ.')],
      ok: `Đồng hồ đã chỉ đúng ${tm(H, M)}.`,
    };
  }
  if (kind === 'kem') {
    const next = h12(H + 1), d = 60 - M;
    return {
      head: `Đồng hồ chỉ sai giờ. Bây giờ là <b>${next} giờ kém ${d} phút</b>. Em hãy chỉnh lại kim!`,
      pic: { kind: 'clocks', clocks: [{ H: 0, M: wrongT }] },
      lines: [L(`${next} giờ kém ${d} phút = [[h]] giờ [[m]] phút`), done],
      steps: [
        { box: 'h', ans: H, show: `Chưa tới ${next} giờ thì vẫn là mấy giờ?`, hint: `Chưa tới ${next} giờ: vẫn là ${H} giờ.` },
        { box: 'm', ans: M, show: `60 − ${d} = ?`, hint: `60 − ${d} = ${M}.` },
        setStep(`Kéo kim cho đúng ${tm(H, M)}.`),
      ],
      ok: `${next} giờ kém ${d} phút là ${tm(H, M)}.`,
    };
  }
  if (kind === 'slow') {
    const slow = k % 8 === 1, d = rng.pick([5, 10, 15, 20]);
    if (slow) M = Math.max(M, d); else M = Math.min(M, 59 - d);
    const shown = slow ? M - d : M + d;
    const setS = { box: 'set', set: { c: 0, T: H * 60 + M, snap }, show: `Kéo kim dài cho đúng ${M} phút.`, hint: handHint(H, M) };
    return {
      head: `Đồng hồ chạy <b>${slow ? 'chậm' : 'nhanh'} ${d} phút</b>. Em hãy chỉnh lại cho đúng giờ!`,
      pic: { kind: 'clocks', clocks: [{ H, M: shown }] },
      lines: [L(`${tm(H, shown)} ${slow ? '+' : '−'} ${d} phút = ${H} giờ [[x]] phút`), L(`Chỉnh kim cho đúng <b>${tm(H, M)}</b>.`, 1), L(`Đồng hồ đã chỉ đúng ${tm(H, M)}.`, 2)],
      steps: [
        { box: 'x', ans: M, show: slow ? `Chạy chậm thì giờ đúng nhiều hơn: cộng ${d} phút.` : `Chạy nhanh thì giờ đúng ít hơn: trừ ${d} phút.`, hint: `${shown} ${slow ? '+' : '−'} ${d} = ${M}.` },
        setS,
      ],
      ok: `Đồng hồ chạy ${slow ? 'chậm' : 'nhanh'} ${d} phút. Giờ đúng là ${tm(H, M)}.`,
    };
  }
  const H24 = H + 12 === 24 ? 12 : H + 12;
  const time = `${two(H24)} : ${two(M)}`;
  return {
    head: `Đồng hồ điện tử chỉ đúng <b>${time}</b>. Em hãy chỉnh đồng hồ kim cho giống!`,
    pic: { kind: 'clocks', dig: time, clocks: [{ H: 0, M: wrongT }] },
    lines: [L(H24 > 12 ? `${H24} − 12 = [[a]]` : `${H24} giờ là [[a]] giờ trưa`), L(`Chỉnh kim cho đúng <b>${tm(H, M)}</b>.`, 1), L(`Đồng hồ đã chỉ đúng ${tm(H, M)}.`, 2)],
    steps: [
      { box: 'a', ans: H, show: H24 > 12 ? 'Từ 13 giờ trở đi thì trừ 12.' : '12 giờ trưa: kim ngắn chỉ số 12.', hint: H24 > 12 ? `${H24} − 12 = ${H}.` : '12 giờ trưa là 12 giờ.' },
      setStep(`Kéo kim cho đúng ${tm(H, M)}.`),
    ],
    ok: `${time} là ${tm(H, M)} ${buoiOf(H24)}.`,
  };
}

// Lớp 2: tính giờ đúng (giờ xong, bao lâu, giờ bắt đầu) trong cùng một buổi.
const ACT2 = [
  ['đi dã ngoại', 7, [7, 8], [2, 3]], ['làm bánh', 8, [8, 9], [1, 2]], ['học bơi', 14, [2, 3], [1, 2]],
  ['học vẽ', 14, [2, 3, 4], [1, 2]], ['đá bóng', 15, [3, 4], [1, 2]], ['đi xem xiếc', 19, [7, 8], [2]], ['đi thăm ông bà', 8, [8, 9], [2, 3]],
];
function genHours(rng, k) {
  const [w, base, Hs, ns] = rng.pick(ACT2);
  const pm = base >= 13;
  const a = rng.pick(Hs), n = rng.pick(ns), b = a + n;
  const ba = buoiOf(pm ? a + 12 : a), bb = buoiOf(pm ? b + 12 : b);
  const who = rng.pick(NAMES);
  const kind = ['end', 'dur', 'start'][k % 3];
  if (kind === 'end') {
    return {
      head: `${who} bắt đầu ${w} lúc <b>${a} giờ ${ba}</b>, ${w} trong <b>${n} giờ</b>. Hỏi ${who} ${w} xong lúc mấy giờ?`,
      pic: { kind: 'clocks', clocks: [{ H: a, label: 'Bắt đầu' }, { H: a, label: 'Xong', q: true }] },
      lines: [L(`${a} giờ + ${n} giờ = [[x]] giờ`), L(`${who} ${w} xong lúc ${b} giờ ${bb}.`, 1)],
      steps: [{ box: 'x', ans: b, show: 'Lấy giờ bắt đầu cộng thêm số giờ.', hint: `${a} + ${n} = ${b}. Kim ngắn đi thêm ${n} số.`, fx: { sweep: { c: 1, from: a * 60, to: b * 60, unit: 'h' } } }],
      ok: `${who} ${w} xong lúc ${b} giờ ${bb}.`,
    };
  }
  if (kind === 'dur') {
    return {
      head: `${who} ${w} từ <b>${a} giờ ${ba}</b> đến <b>${b} giờ ${bb}</b>. Hỏi ${who} ${w} trong mấy giờ?`,
      pic: { kind: 'clocks', clocks: [{ H: a, label: 'Bắt đầu' }, { H: b, label: 'Xong' }] },
      lines: [L(`${b} giờ − ${a} giờ = [[x]] giờ`), L(`${who} ${w} trong ${n} giờ.`, 1)],
      steps: [{ box: 'x', ans: n, show: 'Lấy giờ xong trừ đi giờ bắt đầu.', hint: `${b} − ${a} = ${n}. Kim ngắn đi từ số ${a} đến số ${b}.`, fx: { sweep: { c: 0, from: a * 60, to: b * 60, unit: 'h' } } }],
      ok: `${who} ${w} trong ${n} giờ.`,
    };
  }
  return {
    head: `${who} ${w} xong lúc <b>${b} giờ ${bb}</b>. ${who} đã ${w} trong <b>${n} giờ</b>. Hỏi ${who} bắt đầu lúc mấy giờ?`,
    pic: { kind: 'clocks', clocks: [{ H: b, label: 'Bắt đầu', q: true }, { H: b, label: 'Xong' }] },
    lines: [L(`${b} giờ − ${n} giờ = [[x]] giờ`), L(`${who} bắt đầu lúc ${a} giờ ${ba}.`, 1)],
    steps: [{ box: 'x', ans: a, show: 'Lấy giờ xong trừ đi số giờ.', hint: `${b} − ${n} = ${a}. Kim ngắn lùi lại ${n} số.`, fx: { sweep: { c: 0, from: b * 60, to: a * 60, unit: 'h' } } }],
    ok: `${who} bắt đầu ${w} lúc ${a} giờ ${ba}.`,
  };
}

// Từ buổi sáng sang buổi chiều: đổi giờ chiều sang số giờ trong ngày rồi trừ.
const NOON = [
  ['Bố đi làm', 'Bố làm việc trong mấy giờ?', 'Bố làm việc trong', [7, 8], [4, 5]],
  ['Cửa hàng mở cửa', 'Cửa hàng mở cửa trong mấy giờ?', 'Cửa hàng mở cửa trong', [7, 8, 9], [5, 6]],
  ['Trời mưa', 'Cơn mưa kéo dài mấy giờ?', 'Cơn mưa kéo dài', [10, 11], [1, 2, 3]],
  ['Thư viện mở cửa', 'Thư viện mở cửa trong mấy giờ?', 'Thư viện mở cửa trong', [8, 9], [4, 5]],
  ['Cả lớp đi tham quan', 'Chuyến tham quan kéo dài mấy giờ?', 'Chuyến tham quan kéo dài', [7, 8], [2, 3, 4]],
];
function genNoon(rng) {
  const [subj, ask, tell, As, Bs] = rng.pick(NOON);
  const a = rng.pick(As), b = rng.pick(Bs), B = b + 12, x = B - a;
  return {
    head: `${subj} từ <b>${a} giờ ${buoiOf(a)}</b> đến <b>${b} giờ chiều</b>. ${ask}`,
    pic: { kind: 'clocks', clocks: [{ H: a, label: 'Bắt đầu' }, { H: b, label: 'Kết thúc' }] },
    lines: [L(`${b} giờ chiều là [[p]] giờ.`), L(`${B} giờ − ${a} giờ = [[x]] giờ`, 1)],
    steps: [
      { box: 'p', ans: B, show: `Đổi ${b} giờ chiều ra số giờ trong ngày.`, hint: `Giờ buổi chiều cộng thêm 12: ${b} + 12 = ${B}.` },
      { box: 'x', ans: x, show: 'Lấy giờ kết thúc trừ giờ bắt đầu.', hint: `${B} − ${a} = ${x}.`, fx: { sweep: { c: 0, from: a * 60, to: B * 60, unit: 'h' } } },
    ],
    ok: `${tell} ${x} giờ.`,
  };
}

// Lớp 3: giờ xong, giờ bắt đầu, bao nhiêu phút.
const ACT3 = [
  ['tập thể dục', [5, 6], [15, 20, 25, 30]], ['ăn sáng', [6, 7], [15, 20, 25]], ['làm bánh', [8, 9, 10], [25, 35, 40, 45, 50]],
  ['tưới cây', [4, 5], [10, 15, 20]], ['đá bóng', [3, 4, 5], [30, 40, 45, 50]], ['làm bài tập', [7, 8], [25, 30, 35, 40, 45]],
  ['đọc truyện', [8, 9], [15, 20, 25, 30]], ['dọn nhà', [8, 9], [35, 40, 43, 45]],
];
/** Số phút trong [lo, hi]: một nửa là số tròn 5 phút (như vở), còn lại phút bất kì. */
function pickM(rng, lo, hi) {
  const a = Math.ceil(lo / 5), b = Math.floor(hi / 5);
  return rng() < 0.5 && a <= b ? rng.int(a, b) * 5 : rng.int(lo, hi);
}

function genEnd(rng, k) {
  const [w, Hs, ds] = rng.pick(ACT3);
  const who = rng.pick(NAMES), H = rng.pick(Hs), d = rng.pick(ds);
  const cross = k % 2 === 1;
  const M = Math.min(59, cross ? pickM(rng, 60 - d, 59) : pickM(rng, 0, 59 - d));
  const s = M + d;
  const lines = [L(`${M} phút + ${d} phút = [[s]] phút`)];
  const steps = [{ box: 's', ans: s, show: 'Cộng số phút trước.', hint: `${M} + ${d} = ${s}.` }];
  const end = s >= 60 ? [H + 1, s - 60] : [H, s];
  const sw = { sweep: { c: 1, from: H * 60 + M, to: H * 60 + s, unit: 'm' } };
  if (s >= 60) {
    lines.push(L(`${s} phút = 1 giờ [[r]] phút`, 1));
    steps.push({ box: 'r', ans: s - 60, show: '60 phút là 1 giờ. Còn lại mấy phút?', hint: `${s} − 60 = ${s - 60}.` });
    lines.push(L(s === 60 ? 'Xong lúc [[h]] giờ đúng.' : `Xong lúc [[h]] giờ ${s - 60} phút.`, 2));
    steps.push({ box: 'h', ans: H + 1, show: `Thêm 1 giờ vào ${H} giờ.`, hint: `${H} + 1 = ${H + 1}.`, fx: sw });
  } else {
    lines.push(L(`Xong lúc [[h]] giờ ${s} phút.`, 1));
    steps.push({ box: 'h', ans: H, show: 'Chưa đủ 60 phút thì giờ có đổi không?', hint: `${s} phút chưa đủ 1 giờ: vẫn là ${H} giờ.`, fx: sw });
  }
  return {
    head: `${who} bắt đầu ${w} lúc <b>${tm(H, M)}</b>. Việc này kéo dài <b>${d} phút</b>. Hỏi ${who} ${w} xong lúc mấy giờ?`,
    pic: { kind: 'clocks', clocks: [{ H, M, label: 'Bắt đầu' }, { H, M, label: 'Xong', q: true }] },
    lines, steps, ok: `${who} ${w} xong lúc ${tm(...end)}.`,
  };
}

function genStart(rng, k) {
  const [w, Hs, ds] = rng.pick(ACT3);
  const who = rng.pick(NAMES), d = rng.pick(ds);
  const H = rng.pick(Hs) + 1;
  const borrow = k % 2 === 1;
  const M = borrow ? pickM(rng, 0, d - 1) : pickM(rng, d, 59);
  const lines = [], steps = [];
  const sw = (to) => ({ sweep: { c: 0, from: H * 60 + M, to, unit: 'm' } });
  let start;
  if (!borrow) {
    const x = M - d;
    start = [H, x];
    lines.push(L(`${M} phút − ${d} phút = [[x]] phút`));
    steps.push({ box: 'x', ans: x, show: 'Trừ số phút trước.', hint: `${M} − ${d} = ${x}.` });
    lines.push(L(x ? `Bắt đầu lúc [[h]] giờ ${x} phút.` : 'Bắt đầu lúc [[h]] giờ đúng.', 1));
    steps.push({ box: 'h', ans: H, show: 'Phút đủ trừ thì giờ có đổi không?', hint: `Phút đủ trừ nên giờ giữ nguyên: ${H} giờ.`, fx: sw(H * 60 + x) });
  } else {
    const x = M + 60 - d;
    start = [H - 1, x];
    lines.push(L(`${tm(H, M)} = [[h]] giờ [[m]] phút`));
    steps.push({ box: 'h', ans: H - 1, show: `${M} phút không đủ trừ ${d} phút. Đổi 1 giờ thành 60 phút: còn mấy giờ?`, hint: `Bớt đi 1 giờ: ${H} − 1 = ${H - 1}.` });
    steps.push({ box: 'm', ans: M + 60, show: 'Thêm 60 phút vào số phút.', hint: `${M} + 60 = ${M + 60}.` });
    lines.push(L(`${M + 60} phút − ${d} phút = [[x]] phút`, 2));
    steps.push({ box: 'x', ans: x, show: 'Bây giờ trừ số phút.', hint: `${M + 60} − ${d} = ${x}.`, fx: sw((H - 1) * 60 + x) });
    lines.push(L(`Bắt đầu lúc ${tm(H - 1, x)}.`, 3));
  }
  return {
    head: `${who} ${w} xong lúc <b>${tm(H, M)}</b>. Việc này kéo dài <b>${d} phút</b>. Hỏi ${who} bắt đầu ${w} lúc mấy giờ?`,
    pic: { kind: 'clocks', clocks: [{ H, M, label: 'Bắt đầu', q: true }, { H, M, label: 'Xong' }] },
    lines, steps, ok: `${who} bắt đầu ${w} lúc ${tm(...start)}.`,
  };
}

function genBetween(rng, k) {
  if (k % 3 === 2) return genNoon(rng);
  const [w, Hs] = rng.pick(ACT3);
  const who = rng.pick(NAMES), H = rng.pick(Hs);
  const t0 = H * 60;
  if (k % 3 === 0) {
    const M1 = pickM(rng, 0, 40), x = pickM(rng, 5, 59 - M1), M2 = M1 + x;
    return {
      head: `${who} ${w} từ <b>${tm(H, M1)}</b> đến <b>${tm(H, M2)}</b>. Hỏi ${who} ${w} trong bao nhiêu phút?`,
      pic: { kind: 'clocks', clocks: [{ H, M: M1, label: 'Bắt đầu' }, { H, M: M2, label: 'Xong' }] },
      lines: [L(`${M2} phút − ${M1} phút = [[x]] phút`), L(`${who} ${w} trong ${x} phút.`, 1)],
      steps: [{ box: 'x', ans: x, show: 'Cùng một giờ: lấy phút trừ phút.', hint: `${M2} − ${M1} = ${x}.`, fx: { sweep: { c: 0, from: t0 + M1, to: t0 + M2, unit: 'm' } } }],
      ok: `${who} ${w} trong ${x} phút.`,
    };
  }
  const M1 = pickM(rng, 30, 55), M2 = pickM(rng, 5, 40), a = 60 - M1, x = a + M2;
  return {
    head: `${who} ${w} từ <b>${tm(H, M1)}</b> đến <b>${tm(H + 1, M2)}</b>. Hỏi ${who} ${w} trong bao nhiêu phút?`,
    pic: { kind: 'clocks', clocks: [{ H, M: M1, label: 'Bắt đầu' }, { H: H + 1, M: M2, label: 'Xong' }] },
    lines: [L(`${tm(H, M1)} → ${H + 1} giờ: [[a]] phút`), L(`${H + 1} giờ → ${tm(H + 1, M2)}: [[b]] phút`, 1), L(`${a} + ${M2} = [[x]] phút`, 2)],
    steps: [
      { box: 'a', ans: a, show: `Từ ${tm(H, M1)} đến ${H + 1} giờ là mấy phút?`, hint: `60 − ${M1} = ${a}: kim dài còn ${a} phút nữa mới tới số 12.`, fx: { sweep: { c: 0, from: t0 + M1, to: t0 + 60, unit: 'm' } } },
      { box: 'b', ans: M2, show: `Từ ${H + 1} giờ đến ${tm(H + 1, M2)} là mấy phút?`, hint: `Kim dài đi từ số 12 tới ${M2} phút: ${M2} phút.`, fx: { sweep: { c: 0, from: t0 + M1, to: t0 + 60 + M2, unit: 'm', keep: true } } },
      { box: 'x', ans: x, show: 'Cộng hai khoảng lại.', hint: `${a} + ${M2} = ${x}.` },
    ],
    ok: `${who} ${w} trong ${x} phút.`,
  };
}

// Đổi đơn vị thời gian.
const fullSweeps = (n, unit = 'm', per = 60) => ({ sweepAll: Array.from({ length: n }, (_, c) => ({ c, from: 0, to: per, unit })) });
function genUnit2(rng, k) {
  const kind = ['h60', 'w7', 'half', 'd24', 'w14'][k % 5];
  if (kind === 'h60') return {
    head: '1 giờ bằng bao nhiêu phút?', pic: { kind: 'clocks', clocks: [{ H: 12, M: 0 }] },
    lines: [L('1 giờ = [[x]] phút')],
    steps: [{ box: 'x', ans: 60, show: 'Kim dài đi một vòng là 1 giờ.', hint: 'Kim dài đi một vòng, qua 60 vạch nhỏ: 60 phút.', fx: fullSweeps(1) }], ok: '1 giờ = 60 phút.',
  };
  if (kind === 'half') return {
    head: 'Nửa giờ bằng bao nhiêu phút?', pic: { kind: 'clocks', clocks: [{ H: 12, M: 0 }] },
    lines: [L('Nửa giờ = [[x]] phút'), L('Như 7 giờ 30 phút còn gọi là 7 giờ rưỡi.', 1)],
    steps: [{ box: 'x', ans: 30, show: 'Kim dài đi nửa vòng, từ số 12 đến số 6.', hint: 'Nửa vòng là 30 vạch nhỏ: 30 phút.', fx: fullSweeps(1, 'm', 30) }], ok: 'Nửa giờ = 30 phút.',
  };
  if (kind === 'd24') return {
    head: '1 ngày có bao nhiêu giờ?', pic: { kind: 'clocks', clocks: [{ H: 12, M: 0, label: 'Ban ngày' }, { H: 12, M: 0, label: 'Ban đêm' }] },
    lines: [L('12 giờ + 12 giờ = [[x]] giờ'), L('1 ngày = 24 giờ.', 1)],
    steps: [{ box: 'x', ans: 24, show: 'Kim ngắn đi 2 vòng mỗi ngày, mỗi vòng 12 giờ.', hint: '12 + 12 = 24.', fx: fullSweeps(2, 'h', 720) }], ok: '1 ngày = 24 giờ.',
  };
  if (kind === 'w7') return {
    head: '1 tuần lễ có bao nhiêu ngày?', pic: { kind: 'week', n: 1 },
    lines: [L('1 tuần lễ = [[x]] ngày')],
    steps: [{ box: 'x', ans: 7, show: 'Đếm từ Thứ Hai đến Chủ nhật.', hint: 'Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ nhật: 7 ngày.', fx: { week: 7 } }], ok: '1 tuần lễ = 7 ngày.',
  };
  return {
    head: '2 tuần lễ có bao nhiêu ngày?', pic: { kind: 'week', n: 2 },
    lines: [L('1 tuần lễ = 7 ngày'), L('7 + 7 = [[x]] ngày')],
    steps: [{ box: 'x', ans: 14, show: 'Mỗi tuần lễ có 7 ngày.', hint: '7 + 7 = 14.', fx: { week: 14 } }], ok: '2 tuần lễ = 14 ngày.',
  };
}

function genConv(rng, k) {
  const kind = ['h2m', 'm2hm', 'w2d', 'hm2m', 'd2h', 'y2m'][k % 6];
  if (kind === 'h2m') {
    const n = rng.int(2, 4);
    return {
      head: `<b>${n} giờ</b> bằng bao nhiêu phút?`, pic: { kind: 'clocks', clocks: Array.from({ length: n }, () => ({ H: 12, M: 0 })) },
      lines: [L('1 giờ = 60 phút'), L(`60 × ${n} = [[x]] phút`)],
      steps: [{ box: 'x', ans: 60 * n, show: `${n} giờ là ${n} lần 60 phút.`, hint: `60 × ${n} = ${60 * n}.`, fx: fullSweeps(n) }], ok: `${n} giờ = ${60 * n} phút.`,
    };
  }
  if (kind === 'hm2m') {
    const m = rng.int(1, 11) * 5;
    return {
      head: `<b>1 giờ ${m} phút</b> bằng bao nhiêu phút?`, pic: { kind: 'clocks', clocks: [{ H: 12, M: 0, label: '1 giờ' }, { H: 12, M: 0, label: `${m} phút` }] },
      lines: [L('1 giờ = 60 phút'), L(`60 + ${m} = [[x]] phút`)],
      steps: [{ box: 'x', ans: 60 + m, show: `Đổi 1 giờ ra 60 phút rồi cộng thêm ${m} phút.`, hint: `60 + ${m} = ${60 + m}.`, fx: { sweepAll: [{ c: 0, from: 0, to: 60, unit: 'm' }, { c: 1, from: 0, to: m, unit: 'm' }] } }],
      ok: `1 giờ ${m} phút = ${60 + m} phút.`,
    };
  }
  if (kind === 'm2hm') {
    const x = rng.int(13, 23) * 5, r = x - 60;
    return {
      head: `<b>${x} phút</b> bằng mấy giờ mấy phút?`, pic: { kind: 'clocks', clocks: [{ H: 12, M: 0 }, { H: 12, M: 0 }] },
      lines: [L(`${x} phút = 60 phút + [[r]] phút`), L(`${x} phút = [[g]] giờ ${r} phút`, 1)],
      steps: [
        { box: 'r', ans: r, show: `Tách ${x} phút thành 60 phút và mấy phút?`, hint: `${x} − 60 = ${r}.`, fx: { sweepAll: [{ c: 0, from: 0, to: 60, unit: 'm' }, { c: 1, from: 0, to: r, unit: 'm' }] } },
        { box: 'g', ans: 1, show: '60 phút là mấy giờ?', hint: '60 phút = 1 giờ.' },
      ],
      ok: `${x} phút = 1 giờ ${r} phút.`,
    };
  }
  if (kind === 'w2d') {
    const n = rng.int(2, 4);
    return {
      head: `<b>${n} tuần lễ</b> có bao nhiêu ngày?`, pic: { kind: 'week', n },
      lines: [L('1 tuần lễ = 7 ngày'), L(`7 × ${n} = [[x]] ngày`)],
      steps: [{ box: 'x', ans: 7 * n, show: `${n} tuần lễ là ${n} lần 7 ngày.`, hint: `7 × ${n} = ${7 * n}.`, fx: { week: 7 * n } }], ok: `${n} tuần lễ = ${7 * n} ngày.`,
    };
  }
  if (kind === 'd2h') {
    const n = rng.int(2, 3);
    return {
      head: `<b>${n} ngày</b> có bao nhiêu giờ?`, pic: { kind: 'cards', n, pic: '🌞🌙', top: '1 ngày', sub: '24 giờ' },
      lines: [L('1 ngày = 24 giờ'), L(`24 × ${n} = [[x]] giờ`)],
      steps: [{ box: 'x', ans: 24 * n, show: `${n} ngày là ${n} lần 24 giờ.`, hint: `24 × ${n} = ${24 * n}.`, fx: { cards: n } }], ok: `${n} ngày = ${24 * n} giờ.`,
    };
  }
  const n = rng.int(2, 3);
  return {
    head: `<b>${n} năm</b> có bao nhiêu tháng?`, pic: { kind: 'cards', n, pic: '📅', top: '1 năm', sub: '12 tháng' },
    lines: [L('1 năm = [[a]] tháng'), L(`12 × ${n} = [[x]] tháng`, 1)],
    steps: [
      { box: 'a', ans: 12, show: '1 năm có mấy tháng?', hint: 'Từ tháng 1 đến tháng 12: 12 tháng.' },
      { box: 'x', ans: 12 * n, show: `${n} năm là ${n} lần 12 tháng.`, hint: `12 × ${n} = ${12 * n}.`, fx: { cards: n } },
    ],
    ok: `${n} năm = ${12 * n} tháng.`,
  };
}

// ── Lịch ────────────────────────────────────────────────────────────────────────────────────────────
const EVENTS = ['sinh nhật Lan', 'ngày hội thể thao', 'buổi dã ngoại', 'ngày hội đọc sách', 'buổi biểu diễn văn nghệ'];

function genWeekday(rng, k) {
  const m = rng.int(1, 12), dn = daysIn(m);
  if (k % 3 === 0) {
    const d = rng.int(1, dn), w = wdOf(m, d);
    return {
      head: `Xem tờ lịch. <b>Ngày ${d} tháng ${m}</b> là thứ mấy?`, pic: { kind: 'cal', cals: [{ m }] },
      lines: [L(`Ngày ${d} tháng ${m} là [[w]].`)],
      steps: [{ box: 'w', pick: WD, ans: WD[w], show: `Tìm số ${d} trên tờ lịch rồi nhìn lên đầu cột.`, hint: `Số ${d} nằm ở cột ${WD_SHORT[w]}: ${WD[w]}.`, fx: { mark: { cal: 0, day: d, col: true } } }],
      ok: `Ngày ${d} tháng ${m} là ${WD[w]}.`,
    };
  }
  const c = rng.int(0, 6);
  const days = Array.from({ length: dn }, (_, i) => i + 1).filter(d => wdOf(m, d) === c);
  if (k % 3 === 1) {
    const first = rng() < 0.6, x = first ? days[0] : days[days.length - 1];
    const which = first ? 'đầu tiên' : 'cuối cùng';
    return {
      head: `Xem tờ lịch. <b>${WD[c]} ${which}</b> của tháng ${m} là ngày nào?`, pic: { kind: 'cal', cals: [{ m }] },
      lines: [L(`${WD[c]} ${which} là ngày [[x]].`)],
      steps: [{ box: 'x', ans: x, show: `Nhìn cột ${WD_SHORT[c]}, tìm số ${which} trong cột.`, hint: `Cột ${WD_SHORT[c]} có các ngày ${days.join(', ')}. Số ${which} là ${x}.`, fx: { mark: { cal: 0, day: x, col: true } } }],
      ok: `${WD[c]} ${which} của tháng ${m} là ngày ${x}.`,
    };
  }
  return {
    head: `Xem tờ lịch. Tháng ${m} có mấy ngày <b>${WD[c]}</b>?`, pic: { kind: 'cal', cals: [{ m }] },
    lines: [L(`Tháng ${m} có [[x]] ngày ${WD[c]}.`)],
    steps: [{ box: 'x', ans: days.length, show: `Đếm các số trong cột ${WD_SHORT[c]}.`, hint: `Cột ${WD_SHORT[c]}: ${days.join(', ')}. Có ${days.length} ngày.`, fx: { hop: { cal: 0, days, count: true } } }],
    ok: `Tháng ${m} có ${days.length} ngày ${WD[c]}.`,
  };
}

function genNext(rng, k) {
  const m = rng.int(1, 12), dn = daysIn(m);
  const kind = ['+7', '+1', '-7', '-1', '+14'][k % 5];
  const step = { '+7': 7, '+1': 1, '-7': -7, '-1': -1, '+14': 14 }[kind];
  const d = step > 0 ? rng.int(1, dn - step) : rng.int(-step + 1, dn);
  const w = wdOf(m, d), x = d + step;
  const ask = {
    '+7': `${WD[w]} tuần sau là ngày nào?`, '-7': `${WD[w]} tuần trước là ngày nào?`, '+1': 'Ngày mai là ngày nào?',
    '-1': 'Hôm qua là ngày nào?', '+14': `${WD[w]} hai tuần nữa là ngày nào?`,
  }[kind];
  const tell = {
    '+7': `${WD[w]} tuần sau`, '-7': `${WD[w]} tuần trước`, '+1': 'Ngày mai', '-1': 'Hôm qua', '+14': `${WD[w]} hai tuần nữa`,
  }[kind];
  const pic = { kind: 'cal', cals: [{ m, marks: { [d]: 'today' } }] };
  const head = `Hôm nay là <b>${WD[w]}, ngày ${d}</b> tháng ${m}. ${ask}`;
  const rule = Math.abs(step) === 1 ? (step > 0 ? 'Ngày mai: thêm 1 ngày.' : 'Hôm qua: bớt 1 ngày.') : 'Cùng thứ thì cách nhau 7 ngày.';
  if (kind === '+14') {
    return {
      head, pic, lines: [L(`${d} + 7 = [[a]]`), L(`${d + 7} + 7 = [[x]]`, 1), L(`${tell} là ngày ${x}.`, 2)],
      steps: [
        { box: 'a', ans: d + 7, show: 'Tuần sau: thêm 7 ngày.', hint: `${rule} ${d} + 7 = ${d + 7}.`, fx: { hop: { cal: 0, days: [d, d + 7] } } },
        { box: 'x', ans: x, show: 'Thêm 7 ngày nữa.', hint: `${d + 7} + 7 = ${x}.`, fx: { hop: { cal: 0, days: [d + 7, x] } } },
      ],
      ok: `${tell} là ngày ${x}.`,
    };
  }
  const sign = step > 0 ? '+' : '−';
  return {
    head, pic, lines: [L(`${d} ${sign} ${Math.abs(step)} = [[x]]`), L(`${tell} là ngày ${x}.`, 1)],
    steps: [{ box: 'x', ans: x, show: rule, hint: `${rule} ${d} ${sign} ${Math.abs(step)} = ${x}.`, fx: { hop: { cal: 0, days: [d, x] } } }],
    ok: `${tell} là ngày ${x}.`,
  };
}

function genLeft(rng, k) {
  const m = rng.int(1, 12), dn = daysIn(m);
  if (k % 3 === 2) {
    return {
      head: `Xem tờ lịch. <b>Tháng ${m}</b> có bao nhiêu ngày?`, pic: { kind: 'cal', cals: [{ m }] },
      lines: [L(`Tháng ${m} có [[x]] ngày.`)],
      steps: [{ box: 'x', ans: dn, show: 'Nhìn số cuối cùng trên tờ lịch.', hint: `Ngày cuối cùng của tháng ${m} là ngày ${dn}.`, fx: { mark: { cal: 0, day: dn } } }],
      ok: `Tháng ${m} có ${dn} ngày.`,
    };
  }
  const a = rng.int(1, dn - 3), b = Math.min(dn, a + rng.int(2, 12)), x = b - a;
  const ev = rng.pick(EVENTS);
  const days = Array.from({ length: x }, (_, i) => a + 1 + i);
  return {
    head: `Hôm nay là ngày <b>${a}</b> tháng ${m}. Ngày <b>${b}</b> là ${ev}. Hỏi còn mấy ngày nữa là đến ${ev}?`,
    pic: { kind: 'cal', cals: [{ m, marks: { [a]: 'today', [b]: 'event' } }] },
    lines: [L(`${b} − ${a} = [[x]] ngày`), L(`Còn ${x} ngày nữa.`, 1)],
    steps: [{ box: 'x', ans: x, show: 'Lấy ngày sau trừ đi ngày hôm nay.', hint: `${b} − ${a} = ${x}. Đếm từ ngày ${a + 1} đến ngày ${b}: ${x} ngày.`, fx: { hop: { cal: 0, days, count: true } } }],
    ok: `Còn ${x} ngày nữa là đến ${ev}.`,
  };
}

function genFist(rng) {
  const m = rng.pick([1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), dn = daysIn(m);
  const slot = FIST_SLOT[m - 1], up = slot[0] === 'k';
  const where = up ? 'Đốt nhô lên' : 'Chỗ lõm';
  return {
    head: `Đếm trên nắm tay: <b>tháng ${m}</b> có bao nhiêu ngày?`, pic: { kind: 'fist' },
    lines: [L(`Tháng ${m} ở: [[p]]`), L(`Tháng ${m} có [[x]] ngày.`, 1)],
    steps: [
      { box: 'p', pick: ['Đốt nhô lên', 'Chỗ lõm'], ans: where, show: `Tìm tháng ${m} trên nắm tay.`, hint: `Đếm từ đốt đầu: tháng ${m} ở ${where.toLowerCase()}.`, fx: { fist: slot } },
      { box: 'x', ans: dn, show: 'Đốt nhô lên: 31 ngày. Chỗ lõm: 30 ngày.', hint: up ? 'Tháng ở đốt nhô lên có 31 ngày.' : 'Tháng ở chỗ lõm có 30 ngày (trừ tháng 2).' },
    ],
    ok: `Tháng ${m} có ${dn} ngày.`,
  };
}

function genWd7(rng, k) {
  const m = rng.int(1, 12), dn = daysIn(m);
  const q = k % 2 ? 3 : 2;
  let d0, r, t;
  for (;;) {
    d0 = rng.int(1, 7); r = rng.int(0, 2); t = d0 + 7 * q + r;
    if (t <= dn) break;
  }
  const w0 = wdOf(m, d0), wt = wdOf(m, t);
  const same = Array.from({ length: q }, (_, i) => d0 + 7 * (i + 1));
  const lines = [L(`Các ngày ${WD[w0]}: ${d0}, ${same.map((_, i) => `[[s${i}]]`).join(', ')}`), L(`Ngày ${t} là [[w]].`, q)];
  const steps = same.map((v, i) => ({
    box: `s${i}`, ans: v, show: i ? 'Thêm 7 ngày nữa.' : `${WD[w0]} tuần sau là ngày nào?`,
    hint: `Cùng thứ thì cách nhau 7 ngày: ${v - 7} + 7 = ${v}.`, fx: { hop: { cal: 0, days: [v - 7, v], reveal: true } },
  }));
  steps.push({
    box: 'w', pick: WD, ans: WD[wt], show: r ? `Ngày ${t} ở ngay sau ngày ${t - r}. Đó là thứ mấy?` : `Ngày ${t} có trong cột vừa tìm. Đó là thứ mấy?`,
    hint: r ? `Ngày ${t - r} là ${WD[w0]}, thêm ${r} ngày nữa là ${WD[wt]}.` : `Ngày ${t} cùng cột với ngày ${d0}: ${WD[w0]}.`,
    fx: { mark: { cal: 0, day: t, col: true } },
  });
  return {
    head: `Ngày ${d0} tháng ${m} là <b>${WD[w0]}</b>. Hỏi <b>ngày ${t} tháng ${m}</b> là thứ mấy?`,
    pic: { kind: 'cal', cals: [{ m, blank: true, show: [d0], marks: { [d0]: 'today' } }] },
    lines, steps, ok: `Ngày ${t} tháng ${m} là ${WD[wt]}.`,
  };
}

const SPAN_EV = ['Chuyến tham quan', 'Hội chợ sách', 'Đợt cắm trại', 'Lễ hội hoa', 'Giải bóng đá thiếu nhi'];
function genSpan(rng) {
  const m = rng.int(1, 12), dn = daysIn(m);
  const a = rng.int(1, dn - 9), b = a + rng.int(1, 8), c = b - a, x = c + 1;
  const ev = rng.pick(SPAN_EV);
  const days = Array.from({ length: x }, (_, i) => a + i);
  return {
    head: `${ev} diễn ra từ ngày <b>${a}</b> đến hết ngày <b>${b}</b> tháng ${m}. ${ev} kéo dài mấy ngày?`,
    pic: { kind: 'cal', cals: [{ m, marks: { [a]: 'today', [b]: 'event' } }] },
    lines: [L(`${b} − ${a} = [[c]]`), L(`${c} + 1 = [[x]] ngày`, 1)],
    steps: [
      { box: 'c', ans: c, show: 'Lấy ngày cuối trừ ngày đầu.', hint: `${b} − ${a} = ${c}.` },
      { box: 'x', ans: x, show: 'Tính cả ngày đầu tiên nên cộng thêm 1.', hint: `Đếm từ ${a} đến ${b}: ${days.join(', ')}. Có ${x} ngày.`, fx: { hop: { cal: 0, days, count: true } } },
    ],
    ok: `${ev} kéo dài ${x} ngày.`,
  };
}

function genSpan2(rng) {
  const m = rng.int(1, 11), dn = daysIn(m), n = m + 1;
  const a = rng.int(dn - 3, dn), b = rng.int(1, 4), p = dn - a + 1, x = p + b;
  const ev = rng.pick(SPAN_EV);
  return {
    head: `${ev} từ ngày <b>${a} tháng ${m}</b> đến hết ngày <b>${b} tháng ${n}</b>. ${ev} kéo dài mấy ngày?`,
    pic: { kind: 'cal', cals: [{ m, marks: { [a]: 'today' } }, { m: n, marks: { [b]: 'event' } }] },
    lines: [L(`Tháng ${m} có [[dn]] ngày.`), L(`Tháng ${m}: ${dn} − ${a} + 1 = [[p]] ngày`, 1), L(`Tháng ${n}: [[q]] ngày`, 2), L(`${p} + ${b} = [[x]] ngày`, 3)],
    steps: [
      { box: 'dn', ans: dn, show: `Tháng ${m} có mấy ngày?`, hint: `Nhìn số cuối của tháng ${m}: ${dn}.`, fx: { mark: { cal: 0, day: dn } } },
      { box: 'p', ans: p, show: `Từ ngày ${a} đến hết tháng ${m}, tính cả ngày đầu.`, hint: `${dn} − ${a} + 1 = ${p}.`, fx: { hop: { cal: 0, days: Array.from({ length: p }, (_, i) => a + i), count: true } } },
      { box: 'q', ans: b, show: `Từ ngày 1 đến ngày ${b} tháng ${n}.`, hint: `Ngày 1 đến ngày ${b}: ${b} ngày.`, fx: { hop: { cal: 1, days: Array.from({ length: b }, (_, i) => 1 + i), count: true } } },
      { box: 'x', ans: x, show: 'Cộng số ngày của hai tháng.', hint: `${p} + ${b} = ${x}.` },
    ],
    ok: `${ev} kéo dài ${x} ngày.`,
  };
}

// ── Vẽ và chấm một đề ───────────────────────────────────────────────────────────────────────────────
function boxW(step) {
  if (!step) return '1em';
  if (step.pick) return `${Math.max(...step.pick.map(s => s.length)) * 0.52 + 0.8}em`;
  return `${String(step.ans).length * 0.62 + 0.9}em`;
}

function mountTime(stage, m, level, api) {
  const stepOf = Object.fromEntries(m.steps.map(s => [s.box, s]));
  const lineHtml = (ln) => ln.html.replace(/\[\[(\w+)\]\]/g, (_, id) => `<span class="g3d-box" data-box="${id}" style="--boxw:${boxW(stepOf[id])}"></span>`);
  const firstPick = m.steps.find(s => s.pick || s.set);
  const picks = firstPick ? `<div class="g3t-picks" data-picks style="--n:${firstPick.pick?.length ?? 3}"></div>` : '';
  const board = `
    <div class="g3t">
      <div class="g3c-head g3t-head">${m.head}</div>
      <div class="g3t-body g3t-k-${m.pic.kind}${m.lines.length + (picks ? 1 : 0) <= 2 ? ' g3t-few' : ''}">
        <div class="g3t-pic">${picHtml(m.pic)}</div>
        <div class="g3t-work" style="--rows:${m.lines.length + (picks ? 1.6 : 0)}">
          ${m.lines.map((ln, i) => `<div class="g3t-line" data-line="${i}"><span class="g3t-lt">${lineHtml(ln)}</span></div>`).join('')}
          ${picks}
        </div>
      </div>
    </div>`;
  const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3t-scene' });
  injectTimeStyles();
  paper.querySelectorAll('[data-clk]').forEach(el => setHands(el, +el.dataset.t));
  const picksEl = paper.querySelector('[data-picks]');
  const clk = (c) => paper.querySelector(`[data-clk="${c}"]`);
  const cal = (c) => paper.querySelector(`[data-cal="${c}"]`);
  let i = 0, mistakes = 0, tip = '', busy = false;

  const renderPicks = (s, live) => {
    if (!picksEl) return;
    picksEl.style.setProperty('--n', s.pick?.length ?? 3);
    if (s.set) {
      const n = s.set.snap;
      picksEl.innerHTML = `<button type="button" class="g3g-btn g3d-choice g3t-pick g3t-adj" data-adj="-${n}"${live ? '' : ' disabled'}>⟲ ${n} phút</button>
        <button type="button" class="g3g-btn g3d-choice g3t-pick g3t-adj" data-adj="${n}"${live ? '' : ' disabled'}>⟳ ${n} phút</button>
        <button type="button" class="g3g-btn g3d-choice g3t-pick g3t-adj g3t-go" data-go${live ? '' : ' disabled'}>✓ Xong</button>`;
      return;
    }
    picksEl.innerHTML = s.pick.map(v => `<button type="button" class="g3g-btn g3d-choice g3t-pick" data-v="${pickKey(v)}"${live ? '' : ' disabled'}>${v}</button>`).join('');
  };
  if (firstPick) renderPicks(firstPick, false);

  const revealLines = () => m.lines.forEach((ln, j) => { if (ln.at <= i) paper.querySelector(`[data-line="${j}"]`).classList.add('g3t-show'); });

  async function runFx(fx) {
    if (!fx) return;
    if (fx.set) { const el = clk(fx.set.c); el.classList.remove('g3t-q'); setHands(el, fx.set.H * 60 + fx.set.M); el.classList.add('g3d-ok-flash'); sfx.pop(2); await sleep(500); }
    if (fx.dig) { const d = paper.querySelector('[data-dig]'); d.textContent = fx.dig; d.parentElement.classList.add('g3d-ok-flash'); sfx.pop(3); await sleep(500); }
    if (fx.arc) { setArc(clk(fx.arc.c), fx.arc.from, fx.arc.to, 'm'); sfx.pop(2); await sleep(500); }
    if (fx.sweep) await sweep(fx.sweep);
    if (fx.sweepAll) for (const s of fx.sweepAll) await sweep(s);
    if (fx.mark) {
      const el = cal(fx.mark.cal).querySelector(`[data-d="${fx.mark.day}"]`);
      el.classList.remove('g3t-cd-hid');
      el.classList.add('g3t-mk');
      if (fx.mark.col) cal(fx.mark.cal).querySelector(`[data-col="${wdOf(+cal(fx.mark.cal).dataset.m, fx.mark.day)}"]`)?.classList.add('g3t-colhl');
      sfx.pop(3);
      await sleep(600);
    }
    if (fx.hop) await hop(fx.hop);
    if (fx.day) {
      const cell = (h) => paper.querySelector(`[data-hr="${h}"]`);
      const a = cell(fx.day.from), b = cell(fx.day.to);
      if (a !== b) await sleep(flyOne('<div class="g3t-ring"></div>', a.getBoundingClientRect(), b.getBoundingClientRect(), { minMs: 600, maxMs: 900 }));
      // Nhãn "9 giờ tối" chỉ hiện ở ô giờ chiều, tối (hàng dưới); ô hàng trên chỉ là cột cùng số.
      cell(Math.max(fx.day.from, fx.day.to)).classList.add('g3t-hr-on');
      b.classList.add('g3t-mk');
      sfx.pop(3);
      await sleep(600);
    }
    if (fx.fist) { paper.querySelector(`[data-slot="${fx.fist}"]`)?.classList.add('g3t-slot-on'); sfx.pop(3); await sleep(600); }
    if (fx.week) {
      for (let j = 0; j < fx.week; j++) {
        const c = paper.querySelector(`[data-wc="${j}"]`);
        c.classList.add('g3t-hop'); c.querySelector('span').textContent = j + 1; sfx.pop(Math.min(6, 1 + (j % 7)));
        await sleep(fx.week > 14 ? 90 : 160);
      }
    }
    if (fx.cards) {
      for (let j = 0; j < fx.cards; j++) { paper.querySelector(`[data-card="${j}"]`).classList.add('g3t-card-on'); sfx.pop(2 + j); await sleep(380); }
    }
  }

  function sweep({ c, from, to, unit, keep }) {
    const el = clk(c);
    el.classList.remove('g3t-q');
    const span = Math.abs(to - from);
    const ms = unit === 'h' ? Math.min(3600, Math.max(1200, span * 2.2)) : Math.min(2600, Math.max(900, span * 32));
    const arcFrom = keep ? +el.dataset.arcFrom : from;
    el.dataset.arcFrom = arcFrom;
    sfx.pop(1);
    return new Promise((res) => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / ms);
        const e = p < 0.5 ? 2 * p * p : 1 - ((-2 * p + 2) ** 2) / 2;
        const cur = from + (to - from) * e;
        setHands(el, cur);
        setArc(el, arcFrom, cur, unit);
        if (p < 1) requestAnimationFrame(tick); else { sfx.pop(4); res(); }
      };
      requestAnimationFrame(tick);
    });
  }

  async function hop({ cal: c, days, count, reveal }) {
    const root = cal(c);
    const cell = (d) => root.querySelector(`[data-d="${d}"]`);
    if (!count) {
      // Vòng tròn bay từ ngày này sang ngày kia (cùng cột: cách nhau 7 ngày).
      const [a, b] = days;
      const to = cell(b);
      await sleep(flyOne('<div class="g3t-ring"></div>', cell(a).getBoundingClientRect(), to.getBoundingClientRect(), { minMs: 500, maxMs: 800 }));
      if (reveal) to.classList.remove('g3t-cd-hid');
      to.classList.add('g3t-mk');
      sfx.pop(3);
      await sleep(200);
      return;
    }
    for (let j = 0; j < days.length; j++) {
      const el = cell(days[j]);
      el.classList.remove('g3t-cd-hid');
      el.classList.add('g3t-hop');
      el.querySelector('.g3t-cnt').textContent = j + 1;
      sfx.pop(Math.min(6, 1 + j));
      await sleep(days.length > 8 ? 220 : 320);
    }
  }

  const wrong = (el, s) => { mistakes++; tip ||= s.hint; shake(el); hint(s.hint); };

  // Kéo kim: kim dài kéo kim ngắn đi theo như đồng hồ thật; kim ngắn đổi giờ, giữ phút. Nấc = set.snap phút.
  let grab = null;
  function armClock(s) {
    const el = clk(s.set.c), svg = el.querySelector('svg');
    let t = +el.dataset.t % 720, dragH = null, which = null, last = null;
    const draw = () => {
      setHands(el, t);
      if (dragH != null) el.querySelector('[data-hand="h"]').setAttribute('transform', `rotate(${f1(dragH)} ${CX} ${CY})`);
    };
    const angleAt = (e) => {
      const p = svg.createSVGPoint();
      p.x = e.clientX; p.y = e.clientY;
      const v = p.matrixTransform(svg.getScreenCTM().inverse());
      return ((Math.atan2(v.x - CX, CY - v.y) * 180) / Math.PI + 360) % 360;
    };
    const diff = (a, b) => { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d); };
    const tick = () => { const q = Math.round(t / s.set.snap); if (q !== last) { last = q; sfx.tap(); } };
    const down = (e) => {
      if (!grab || busy) return;
      const a = angleAt(e);
      which = e.target.closest('[data-grab]')?.dataset.grab || (diff(a, (t % 60) * 6) <= diff(a, t * 0.5) ? 'm' : 'h');
      svg.setPointerCapture(e.pointerId);
      el.querySelector(`[data-hand="${which}"]`).classList.add('g2c-hand-on');
      setActive(paper, null);
      move(e);
      e.preventDefault();
    };
    const move = (e) => {
      if (!which) return;
      const a = angleAt(e);
      if (which === 'm') {
        let d = a / 6 - (t % 60);
        if (d > 30) d -= 60; else if (d < -30) d += 60;
        t = (t + d + 720) % 720;
      } else dragH = a;
      draw();
      tick();
    };
    const up = () => {
      if (!which) return;
      if (which === 'h') {
        const mm = t % 60;
        t = ((((Math.round(dragH / 30 - mm / 60) % 12) + 12) % 12) * 60 + mm);
        dragH = null;
      } else t = (Math.round(t / s.set.snap) * s.set.snap) % 720;
      el.querySelector(`[data-hand="${which}"]`).classList.remove('g2c-hand-on');
      which = null;
      draw();
    };
    svg.classList.add('g3t-grab');
    const block = (e) => e.preventDefault();
    for (const ev of ['contextmenu', 'selectstart', 'dragstart']) el.addEventListener(ev, block);
    svg.addEventListener('pointerdown', down);
    svg.addEventListener('pointermove', move);
    svg.addEventListener('pointerup', up);
    svg.addEventListener('pointercancel', up);
    grab = {
      el,
      get t() { return t; },
      set t(v) { t = ((v % 720) + 720) % 720; draw(); },
      off() { grab = null; svg.classList.remove('g3t-grab'); el.dataset.t = t; },
    };
  }

  function runSet(s) {
    const el = clk(s.set.c);
    renderPicks(s, true);
    armClock(s);
    let tries = 0;
    picksEl.querySelectorAll('[data-adj]').forEach(btn => {
      btn.onclick = () => { if (!grab || busy) return; sfx.tap(); grab.t = grab.t + Number(btn.dataset.adj); };
    });
    picksEl.querySelector('[data-go]').onclick = async () => {
      if (!grab || busy || m.steps[i] !== s) return;
      sfx.tap();
      const t = grab.t, T = s.set.T;
      if (t !== T) {
        tries++;
        const minOk = t % 60 === T % 60;
        mistakes++; tip ||= s.hint;
        shake(el);
        hint(minOk ? `Kim dài đúng rồi. Kim ngắn chưa đúng: ${s.hint}` : `Kim dài chưa đúng: ${s.hint}`);
        if (tries >= 2) {
          const g = el.querySelector('[data-ghost]');
          g.querySelector('[data-ghost-hand="h"]').setAttribute('transform', `rotate(${f1(T * 0.5)} ${CX} ${CY})`);
          g.querySelector('[data-ghost-hand="m"]').setAttribute('transform', `rotate(${(T % 60) * 6} ${CX} ${CY})`);
          el.classList.add('g3t-ghosted');
        }
        return;
      }
      busy = true;
      grab.off();
      picksEl.querySelectorAll('button').forEach(b => { b.disabled = true; });
      el.classList.remove('g3t-ghosted');
      el.classList.add('g3d-ok-flash', 'g3t-ring-on');
      sfx.pop(3);
      for (let j = 0; j < 6; j++) setTimeout(() => sfx.pop(j % 2 ? 7 : 9), j * 110);
      await sleep(900);
      el.classList.remove('g3t-ring-on');
      i++;
      busy = false;
      runStep(false);
    };
  }

  function runStep(first) {
    revealLines();
    if (i >= m.steps.length) { finish(); return; }
    const s = m.steps[i];
    const box = s.set ? clk(s.set.c) : paper.querySelector(`[data-box="${s.box}"]`);
    setActive(paper, box);
    if (first) say(`${m.head.replace(/<[^>]*>/g, '')} ${s.show}`, s.show); else show(s.show);
    if (s.set) { pad.off(); runSet(s); return; }
    const ok = async (val, from) => {
      busy = true;
      pad.off();
      if (from) await sleep(flyDigit(val, from, box, { onLand: () => { box.textContent = val; } }) + 50);
      box.textContent = val;
      box.classList.add('g3d-box-ok');
      setActive(paper, null);
      sfx.pop(3);
      await runFx(s.fx);
      i++;
      busy = false;
      runStep(false);
    };
    if (s.pick) {
      renderPicks(s, true);
      picksEl.querySelectorAll('[data-v]').forEach(btn => {
        btn.onclick = () => {
          if (busy || m.steps[i] !== s) return;
          sfx.tap();
          if (btn.dataset.v !== pickKey(s.ans)) { wrong(btn, s); return; }
          btn.classList.add('g3d-choice-ok');
          picksEl.querySelectorAll('button').forEach(b => { b.disabled = true; });
          ok(s.ans, btn);
        };
      });
      return;
    }
    const opts = {
      max: String(s.ans).length + 1,
      onType: (t) => { box.textContent = t; },
      onSubmit: (t) => {
        if (busy) return;
        if (Number(t) !== s.ans) { box.textContent = ''; wrong(box, s); pad.want(opts); return; }
        ok(String(s.ans));
      },
    };
    pad.want(opts);
  }

  function finish() {
    setActive(paper, null);
    done(mistakes, { ok: m.ok, tip: tip ? `Nhớ: ${tip}` : '' });
  }

  runStep(true);

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m,
      step: () => { const s = m.steps[i]; if (!s || busy) return; if (s.set) { grab.t = s.set.T; picksEl.querySelector('[data-go]').click(); return; } if (s.pick) picksEl.querySelector(`[data-v="${pickKey(s.ans)}"]`)?.click(); else pad.type(String(s.ans)); },
      wrong: () => { const s = m.steps[i]; if (!s) return; if (s.set) { grab.t = s.set.T + 65; picksEl.querySelector('[data-go]').click(); return; } if (s.pick) picksEl.querySelector(`[data-v]:not([data-v="${pickKey(s.ans)}"])`)?.click(); else pad.type(String(s.ans + 1)); },
    };
  }
}

// ── Cấp và trò ──────────────────────────────────────────────────────────────────────────────────────
const LV = (id, n, title, missions, desc, knowledge, lessons, gen, ask) => ({ id, n, title, missions, desc, knowledge, lessons, gen, ask: () => ask });

const timeGame = (o) => ({
  icon: '⏰', title: 'Xem giờ, tính giờ', unitWord: 'bài', npcs: [TEACHER],
  purpose: 'Giúp em xem đồng hồ, đổi giờ và tính thời gian theo từng bước như ở lớp, rồi nhìn kim đồng hồ quay để kiểm tra.',
  stallIcon: () => '⏰', againText: 'Làm lượt mới',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  howTo: () => [{ pic: clockIcon(46, 7, 40), label: 'Xem đồng hồ' }, { pic: '⌨️', label: 'Tính từng bước' }, { pic: '🔄', label: 'Kim quay kiểm tra' }],
  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (q) => q.head + q.lines.map(l => l.html).join('|'));
  },
  mountMission: mountTime,
  ...o,
});
const calGame = (o) => ({
  ...timeGame(o), icon: '📅', title: 'Xem lịch, tính ngày', stallIcon: () => '📅',
  purpose: 'Giúp em xem lịch, tìm thứ của một ngày, đếm số ngày theo từng bước như ở lớp.',
  howTo: () => [{ pic: calendarIcon(46, 15), label: 'Xem tờ lịch' }, { pic: '⌨️', label: 'Tính từng bước' }, { pic: '🔵', label: 'Đếm trên lịch' }],
  ...o,
});

// Lớp 3 (Vở BT Toán 3, Bài 66–67)
export const TIME_LEVELS = [
  LV('drill-time-1', 1, 'Xem giờ, phút', 6, 'Kim ngắn chỉ giờ, kim dài chỉ phút. 8 giờ 50 phút hay 9 giờ kém 10 phút.', 'xem đồng hồ chính xác đến từng phút', { workbook: ['bai-66'] }, (rng, k) => genRead(rng, k, true), 'Kim ngắn chỉ giờ, kim dài chỉ phút!'),
  LV('drill-time-8', 2, 'Chỉnh đồng hồ', 5, 'Đồng hồ chạy chậm 10 phút: kéo kim cho đúng giờ.', 'đặt kim đồng hồ đúng giờ, phút', { workbook: ['bai-66'] }, (rng, k) => genSet(rng, k, true), 'Kéo kim dài cho đúng phút, rồi kéo kim ngắn!'),
  LV('drill-time-2', 3, 'Đồng hồ điện tử', 6, '22 : 45 là 10 giờ 45 phút tối. 8 giờ tối là 20 giờ.', 'giờ buổi chiều, buổi tối', { workbook: ['bai-66'] }, (rng, k) => genDay24(rng, k, true), 'Từ 13 giờ trở đi thì trừ 12!'),
  LV('drill-time-7', 4, 'Đổi giờ trong ngày', 6, '4 giờ chiều là 16 giờ. 21 giờ là 9 giờ tối.', 'giờ trong ngày, cộng hoặc trừ 12', { workbook: ['bai-66'] }, (rng, k) => genSwap(rng, k, true), 'Chiều, tối: cộng 12. Từ 13 giờ trở đi: trừ 12!'),
  LV('drill-time-3', 5, 'Mấy giờ xong?', 5, 'Bắt đầu lúc 7 giờ 40 phút, làm trong 20 phút. Xong lúc 8 giờ.', '1 giờ = 60 phút, cộng số phút', { workbook: ['bai-67'] }, genEnd, 'Cộng phút trước. Đủ 60 phút thì thành 1 giờ!'),
  LV('drill-time-4', 6, 'Mấy giờ bắt đầu?', 5, 'Xong lúc 9 giờ 25 phút, làm trong 40 phút. Bắt đầu lúc mấy giờ?', 'trừ số phút, đổi 1 giờ = 60 phút', { workbook: ['bai-67'] }, genStart, 'Phút không đủ trừ thì đổi 1 giờ thành 60 phút!'),
  LV('drill-time-5', 7, 'Kéo dài bao lâu?', 6, 'Từ 7 giờ 45 phút đến 8 giờ 20 phút là 35 phút.', 'khoảng thời gian', { workbook: ['bai-66', 'bai-67'] }, genBetween, 'Đếm đến giờ tròn trước, rồi đếm tiếp!'),
  LV('drill-time-6', 8, 'Đổi giờ, phút, ngày', 6, '2 giờ = 120 phút, 75 phút = 1 giờ 15 phút, 3 tuần lễ = 21 ngày.', '1 giờ = 60 phút, 1 ngày = 24 giờ, 1 tuần = 7 ngày', { workbook: ['bai-66'] }, genConv, 'Nhớ: 1 giờ = 60 phút, 1 ngày = 24 giờ!'),
];
export const CAL_LEVELS = [
  LV('drill-cal-1', 1, 'Tháng có mấy ngày?', 5, 'Đếm trên nắm tay: đốt nhô lên 31 ngày, chỗ lõm 30 ngày.', 'tháng có 30, 31 ngày', { workbook: ['bai-66'] }, genFist, 'Đếm tháng trên các đốt tay!'),
  LV('drill-cal-2', 2, 'Ngày ... là thứ mấy?', 5, 'Ngày 3 là Thứ Hai thì ngày 10, 17, 24 cũng là Thứ Hai.', 'xem lịch, 1 tuần có 7 ngày', { workbook: ['bai-66', 'bai-67'] }, genWd7, 'Cùng thứ thì cách nhau 7 ngày!'),
  LV('drill-cal-3', 3, 'Kéo dài mấy ngày?', 5, 'Từ ngày 26 đến hết ngày 30 là 5 ngày (tính cả ngày đầu).', 'đếm ngày trên lịch', { workbook: ['bai-66'] }, genSpan, 'Tính cả ngày đầu tiên thì cộng thêm 1!'),
  LV('drill-cal-4', 4, 'Sang tháng mới', 4, 'Từ ngày 29 tháng 4 đến hết ngày 2 tháng 5 là 4 ngày.', 'tháng có 30, 31 ngày, đếm ngày qua tháng', { workbook: ['bai-66', 'bai-67'] }, genSpan2, 'Đếm hết tháng này rồi đếm tiếp tháng sau!'),
];
export const TIME_GAME = timeGame({ id: 'drill-time', starPrefix: 'drill', levels: TIME_LEVELS });
export const CAL_GAME = calGame({ id: 'drill-cal', starPrefix: 'drill', levels: CAL_LEVELS });

// Lớp 2 (Vở BT Toán 2, Bài 29–31)
export const TIME2_LEVELS = [
  LV('d2-time-1', 1, 'Xem giờ', 6, '7 giờ 30 phút: kim dài chỉ số 6, kim ngắn ở giữa số 7 và số 8.', 'giờ đúng, giờ rưỡi, 15 phút', { g2: ['bai-29'] }, (rng, k) => genRead(rng, k, false), 'Kim ngắn chỉ giờ, kim dài chỉ phút!'),
  LV('d2-time-6', 2, 'Chỉnh đồng hồ', 5, 'Đồng hồ chỉ sai: kéo kim cho đúng 7 giờ 30 phút.', 'đặt kim đồng hồ đúng giờ', { g2: ['bai-29'] }, (rng, k) => genSet(rng, k, false), 'Kéo kim dài cho đúng phút, rồi kéo kim ngắn!'),
  LV('d2-time-2', 3, 'Giờ chiều, giờ tối', 6, '4 giờ chiều là 16 giờ. 20 giờ là 8 giờ tối.', 'giờ trong ngày, 1 ngày có 24 giờ', { g2: ['bai-29', 'bai-31'] }, (rng, k) => genDay24(rng, k, false), 'Giờ buổi chiều, buổi tối: cộng hoặc trừ 12!'),
  LV('d2-time-7', 4, 'Bảng 24 giờ', 6, '4 giờ chiều là 16 giờ. 9 giờ sáng vẫn là 9 giờ.', 'giờ trong ngày, 1 ngày có 24 giờ', { g2: ['bai-29'] }, (rng, k) => genSwap(rng, k, false), 'Chiều, tối: cộng 12. Từ 13 giờ trở đi: trừ 12!'),
  LV('d2-time-3', 5, 'Tính giờ', 6, 'Bắt đầu lúc 2 giờ chiều, học trong 2 giờ. Xong lúc 4 giờ chiều.', 'cộng, trừ số giờ', { g2: ['bai-29', 'bai-31'] }, genHours, 'Kim ngắn đi mấy số là mấy giờ!'),
  LV('d2-time-4', 6, 'Từ sáng đến chiều', 4, 'Từ 7 giờ sáng đến 5 giờ chiều: 17 − 7 = 10 giờ.', '5 giờ chiều là 17 giờ', { g2: ['bai-31'] }, (rng) => genNoon(rng), 'Đổi giờ chiều ra số giờ trong ngày trước!'),
  LV('d2-time-5', 7, '1 ngày, 1 giờ, 1 tuần', 5, '1 ngày = 24 giờ, 1 giờ = 60 phút, 1 tuần lễ = 7 ngày.', 'ngày, giờ, phút, tuần lễ', { g2: ['bai-29', 'bai-30'] }, genUnit2, 'Nhớ: 1 ngày có 24 giờ, 1 giờ có 60 phút!'),
];
export const CAL2_LEVELS = [
  LV('d2-cal-1', 1, 'Ngày ... là thứ mấy?', 6, 'Tìm ngày trên tờ lịch rồi nhìn lên đầu cột.', 'xem lịch: ngày, thứ', { g2: ['bai-30'] }, genWeekday, 'Tìm số trên tờ lịch, nhìn lên đầu cột!'),
  LV('d2-cal-2', 2, 'Tuần sau, ngày mai', 5, 'Hôm nay Thứ Tư ngày 12. Thứ Tư tuần sau là ngày 19.', 'cùng thứ cách nhau 7 ngày', { g2: ['bai-30', 'bai-31'] }, genNext, 'Tuần sau: thêm 7 ngày. Ngày mai: thêm 1 ngày!'),
  LV('d2-cal-3', 3, 'Còn mấy ngày nữa?', 6, 'Hôm nay ngày 12, sinh nhật ngày 20: còn 8 ngày nữa.', 'tháng có 30, 31 ngày, phép trừ', { g2: ['bai-30', 'bai-31'] }, genLeft, 'Lấy ngày sau trừ đi ngày hôm nay!'),
];
export const TIME2_GAME = timeGame({ id: 'd2-time', starPrefix: 'drill2', levels: TIME2_LEVELS });
export const CAL2_GAME = calGame({ id: 'd2-cal', starPrefix: 'drill2', levels: CAL2_LEVELS });

// ── Kiểu riêng ──────────────────────────────────────────────────────────────────────────────────────
let tStyles = false;
function injectTimeStyles() {
  if (tStyles) return;
  tStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3t { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .g3t-head { font-size: min(5.4cqh, 3.3cqi, 2.2rem); padding-right: 2.5cqi; }
    .g3t-head b { color: #C2410C; }
    .g3t-body { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 2cqi;
      padding: 1.5cqh 2.5cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.2cqi); }
    .g3t-body > * { min-width: 0; min-height: 0; }
    @container (aspect-ratio < 1.25) {
      .g3t-body { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1.15fr) minmax(0, 1fr); }
      .g3t-body.g3t-few { grid-template-rows: minmax(0, 1.8fr) minmax(0, 1fr); }
    }
    .g3t-pic { container-type: size; display: flex; align-items: center; justify-content: center; }
    .g3t-row { width: 100%; height: 100%; display: flex; gap: 3cqi; align-items: stretch; justify-content: center; }
    /* Cột hình hẹp và cao (tờ vở ngang): hai đồng hồ / hai tờ lịch xếp chồng; 3–4 đồng hồ thành lưới 2 cột. */
    @container (aspect-ratio < 0.95) {
      .g3t-row:not(.g3t-many) { flex-direction: column; gap: 2cqh; }
      .g3t-many { flex-wrap: wrap; align-content: stretch; }
      .g3t-many > * { flex: 1 1 40%; min-height: 0; }
      .g3t-row .g3t-dig { flex: none; }
    }

    .g3t-clk { flex: 1 1 0; min-width: 0; min-height: 0; max-width: 100cqh; display: flex; flex-direction: column; align-items: center; gap: 1cqh; }
    .g3t-clk-face { flex: 1; min-height: 0; width: 100%; position: relative; display: flex; }
    .g3t-clk-face svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .g3t-clk:not(.g3t-ghosted) [data-ghost] { display: none; }
    .g3t-clk [data-ghost] { opacity: 1; }
    /* Giữ tay lâu trên điện thoại: không bôi chọn số, không hiện menu chép / lưu ảnh của trình duyệt. */
    .g3t-clk { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; -webkit-tap-highlight-color: transparent; }
    .g3t-grab { touch-action: none; cursor: grab; }
    .g3t-grab .g2c-hand-on line:nth-child(2) { filter: drop-shadow(0 0 4px #FACC15); }
    .g3t-clk.g3d-on { background: none; box-shadow: none; animation: none; }
    .g3t-clk.g3d-on .g3t-clk-face svg { animation: g3tWiggle 1.6s ease-in-out infinite; }
    @keyframes g3tWiggle { 0%, 80%, 100% { transform: rotate(0); } 85% { transform: rotate(-3deg); } 90% { transform: rotate(3deg); } 95% { transform: rotate(-2deg); } }
    .g3t-ring-on .g3t-clk-face svg { animation: g3tWiggle .3s linear 3; }
    .g3t-go { background: #DCFCE7; }
    .g3t-picks .g3t-adj { font-size: min(9cqh, 4.6cqi, 2rem); }

    .g3t-day { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 2cqh; }
    .g3t-day-grid { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr); gap: 1.4cqh 1.4cqi;
      background: #fff; border: 3px solid ${INK}; border-radius: 0.8rem; padding: 1.5cqh 1.5cqi; }
    .g3t-hr { position: relative; min-width: 0; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 0.4em;
      border: 2px solid rgba(63,58,64,0.25); font-family: 'Baloo 2', sans-serif; line-height: 1; }
    .g3t-hr b { font-size: min(11cqh, 8cqi); color: #1E293B; }
    .g3t-hr small { font-size: min(3.6cqh, 2.5cqi); font-weight: 800; color: #9A3412; white-space: nowrap; visibility: hidden; }
    .g3t-hr-on small { visibility: visible; }
    .g3t-b0 { background: #FEF9C3; } .g3t-b1 { background: #FED7AA; } .g3t-b2 { background: #FBCFE8; } .g3t-b3 { background: #C7D2FE; }
    .g3t-day-leg { flex: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4cqi; }
    .g3t-day-leg span { text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(6cqh, 4.4cqi); border: 2px solid ${INK}; border-radius: 999px; }
    @container (aspect-ratio > 1.5) {
      .g3t-day-grid { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2cqh 0.8cqi; }
      .g3t-hr b { font-size: min(16cqh, 4.6cqi); }
      .g3t-hr small { font-size: min(5.5cqh, 1.9cqi); white-space: normal; text-align: center; line-height: 1.05; }
    }
    .g3t-clk-lab { font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #334155; font-size: min(8cqh, 6cqi, 1.8rem); background: #F1F5F9; border-radius: 999px; padding: 0 0.7em; }
    .g3t-qmark { position: absolute; left: 50%; top: 55%; transform: translate(-50%, -50%); display: none; place-items: center; width: 1.5em; height: 1.5em; border-radius: 50%;
      font-family: 'Baloo 2', sans-serif; font-size: min(20cqh, 14cqi); color: #fff; background: #F97316; border: 4px solid ${INK}; line-height: 1; }
    .g3t-q .g3t-qmark { display: grid; }
    .g3t-q [data-hand] { opacity: 0; }
    .g3t-dig { flex: 0.8 1 0; align-self: center; max-height: 40cqh; display: grid; place-items: center; background: #0F766E; border: 4px solid ${INK}; border-radius: 0.5em; padding: 0.25em 0.3em;
      font-size: min(16cqh, 9cqi); box-shadow: 0 6px 0 rgba(63,58,64,0.25); }
    .g3t-dig span { background: #CCFBF1; color: #134E4A; border-radius: 0.2em; padding: 0.05em 0.3em; font-family: 'Courier New', monospace; font-weight: 800; white-space: nowrap; letter-spacing: 0.02em; }

    .g3t-cal { flex: 1 1 0; min-width: 0; max-width: 190cqh; display: flex; flex-direction: column; background: #fff; border: 3px solid ${INK}; border-radius: 0.8rem; overflow: hidden; container-type: size; }
    .g3t-cal-top { flex: none; display: flex; align-items: baseline; justify-content: center; gap: 0.5em; background: #E5484D; color: #fff; font-family: 'Baloo 2', sans-serif; font-weight: 800;
      font-size: min(8cqh, 7cqi); line-height: 1.3; border-bottom: 3px solid ${INK}; }
    .g3t-cal-top small { font-size: 0.6em; opacity: 0.85; }
    .g3t-cal-grid { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); grid-template-rows: 0.7fr repeat(var(--rows), minmax(0, 1fr)); gap: 0.6cqh 0.8cqi; padding: 1cqh 1cqi; }
    .g3t-wh { display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #475569; font-size: min(6.5cqh, 5cqi); border-radius: 0.3em; }
    .g3t-wh.g3t-sun, .g3t-cd.g3t-sun span { color: #DC2626; }
    .g3t-colhl { background: #FEF08A; box-shadow: inset 0 0 0 3px #F59E0B; }
    .g3t-cd { position: relative; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; font-size: min(8cqh, 5.6cqi); border-radius: 0.3em; background: #F8FAFC; }
    .g3t-cd-off { background: none; }
    .g3t-cd-hid span { visibility: hidden; }
    .g3t-cnt { position: absolute; right: 0.08em; top: 0.02em; font-style: normal; font-size: 0.48em; color: #fff; background: #2563EB; border-radius: 999px; min-width: 1.3em; text-align: center; line-height: 1.3; }
    .g3t-cnt:empty { display: none; }
    .g3t-today { box-shadow: inset 0 0 0 3px #2563EB; background: #DBEAFE; }
    .g3t-event { box-shadow: inset 0 0 0 3px #DB2777; background: #FCE7F3; }
    .g3t-event::after { content: '🎉'; position: absolute; left: 0.05em; top: -0.1em; font-size: 0.45em; }
    .g3t-hop { background: #BBF7D0; }
    .g3t-mk { background: #FDE047; box-shadow: inset 0 0 0 4px #EA580C; animation: g3tPop .45s ease; }
    @keyframes g3tPop { 50% { transform: scale(1.18); } }
    .g3t-ring { width: 100%; height: 100%; border-radius: 50%; border: 5px solid #EA580C; box-sizing: border-box; background: rgba(253,224,71,0.5); }

    .g3t-fist { width: 100%; height: 100%; }
    .g3t-slot-on rect { fill: #FDE047; stroke: #EA580C; stroke-width: 6; }

    .g3t-week { width: 100%; height: 100%; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); grid-template-rows: 0.6fr repeat(var(--rows), minmax(0, 1fr)); gap: 1.2cqh 1cqi;
      background: #fff; border: 3px solid ${INK}; border-radius: 0.8rem; padding: 1.5cqh 1.2cqi; box-sizing: border-box; max-height: calc(30cqh + var(--rows) * 20cqh); }
    .g3t-week .g3t-cd { border: 2px solid #CBD5E1; font-size: min(calc(42cqh / (var(--rows) + 0.6)), 6cqi); }
    .g3t-week .g3t-wh { font-size: min(calc(32cqh / (var(--rows) + 0.6)), 4.6cqi); }
    .g3t-cards { width: 100%; height: 100%; display: flex; gap: 3cqi; align-items: center; justify-content: center; }
    .g3t-card { flex: 1 1 0; min-width: 0; min-height: 0; max-width: 60cqh; height: 80cqh; container-type: size; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4cqh;
      background: #fff; border: 3px solid ${INK}; border-radius: 1rem; font-family: 'Baloo 2', sans-serif; box-shadow: 0 6px 0 rgba(63,58,64,0.2); }
    @container (aspect-ratio < 0.95) {
      .g3t-cards { flex-direction: column; gap: 3cqh; }
      .g3t-card { height: auto; width: 100%; max-width: none; flex-direction: row; gap: 6cqi; }
    }
    .g3t-card-pic { font-size: min(28cqh, 30cqi); line-height: 1; white-space: nowrap; }
    .g3t-card b, .g3t-card small { white-space: nowrap; }
    .g3t-card b { font-size: min(16cqh, 16cqi); color: #1E293B; line-height: 1.1; }
    .g3t-card small { font-size: min(14cqh, 13cqi); font-weight: 800; color: #15803D; background: #DCFCE7; border-radius: 999px; padding: 0 0.6em; visibility: hidden; }
    .g3t-card-on { border-color: #16A34A; }
    .g3t-card-on small { visibility: visible; }

    .g3t-work { container-type: size; display: flex; flex-direction: column; justify-content: center; gap: 1.2cqh; }
    .g3t-line { flex: 1 1 0; min-height: 0; max-height: 30cqh; display: flex; align-items: center;
      font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; line-height: 1.15; border-bottom: 2px dashed #BFDBFE; visibility: hidden;
      font-size: min(calc(46cqh / var(--rows)), 6.4cqi, 3rem); }
    .g3t-show { visibility: visible; }
    .g3t-lt { display: block; line-height: 1.5; }
    .g3t-line .g3d-box { min-width: var(--boxw); vertical-align: middle; margin: 0 0.12em; }
    .g3t-picks { flex: 1.6 1 0; min-height: 0; max-height: 40cqh; display: grid; grid-template-columns: repeat(min(var(--n), 4), minmax(0, 1fr)); gap: 1.4cqh 1.6cqi; align-content: center; }
    .g3t-pick { font-size: min(calc(26cqh / var(--rows)), 4.6cqi, 2rem); padding: 0.25em 0.2em; min-height: 0; white-space: nowrap; }
    @media (prefers-reduced-motion: reduce) { .g3t-mk { animation: none; } }
  `;
  document.head.appendChild(st);
}
