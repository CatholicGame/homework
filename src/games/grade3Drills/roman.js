/**
 * 🏛️ Số La Mã (Toán 3 KNTT Tập 2, Bài 47 "Làm quen với chữ số La Mã"): I là 1, V là 5, X là 10, các số từ I đến XX.
 * Các dạng đề (mỗi lượt một dạng, bố cục cố định trong lượt):
 *   read   Đọc số: số La Mã to trên bia đá, em gõ số bằng bàn phím. Đúng thì các chữ bay xuống tách thành từng phần
 *          X + IV với giá trị bên dưới (10, 5 − 1) và "= 14".
 *   clock  Đồng hồ số La Mã: kim chỉ giờ (cấp 1: giờ đúng; cấp 4: thêm 15, 30, 45 phút), em gõ giờ, phút.
 *   write  Viết số: cho số 14, em chạm thẻ I, V, X (vùng bàn phím đổi thành ba thẻ chữ to), thẻ bay vào ô.
 *   rm / add / mv  Que diêm: bớt một que, thêm một que (que bay về / bay ra từ hộp diêm), hoặc chuyển que sáng màu
 *          tới chỗ mũi tên rồi chọn số được (ba nút to ở vùng bàn phím).
 *   sort   Xếp bốn số La Mã từ bé đến lớn lên bậc thềm đá: thẻ ở vùng bàn phím bay lên từng bậc.
 * Sai: rung đỏ, thầy nhắc quy tắc (I đứng trước V, X thì bớt 1; không viết một chữ quá ba lần liền nhau).
 */

import { mountDrill, shake, setActive, flyOne, fresh, sfx, sleep, how, popIn, weightedPick, TEACHER, INK } from './kit.js';

// ── Số La Mã ───────────────────────────────────────────────────────────────────────────────────────
const VAL = { I: 1, V: 5, X: 10 };
const STEPS = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
export function toRoman(n) {
  let s = '';
  for (const [v, t] of STEPS) while (n >= v) { s += t; n -= v; }
  return s;
}
function rawValue(s) {
  let t = 0;
  for (let i = 0; i < s.length; i++) { const a = VAL[s[i]], b = VAL[s[i + 1]] || 0; t += a < b ? -a : a; }
  return t;
}
/** Giá trị nếu s là cách viết đúng của một số từ 1 đến 20, không thì 0. */
export function romanValue(s) {
  if (!/^[IVX]+$/.test(s)) return 0;
  const v = rawValue(s);
  return v >= 1 && v <= 20 && toRoman(v) === s ? v : 0;
}
/** "XIV" → [{ t: 'X', v: 10, at: 0 }, { t: 'IV', v: 4, sub: '5 − 1', at: 1 }] */
function groupsOf(s) {
  const out = [];
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2);
    if (two === 'IV' || two === 'IX') { out.push({ t: two, v: VAL[two[1]] - 1, sub: `${VAL[two[1]]} − 1`, at: i }); i++; }
    else out.push({ t: s[i], v: VAL[s[i]], at: i });
  }
  return out;
}
/** Gộp các chữ giống nhau liền nhau: XVIII → X, V, III. */
function runsOf(s) {
  const out = [];
  for (const g of groupsOf(s)) {
    const last = out[out.length - 1];
    if (last && !g.sub && !last.sub && last.t[0] === g.t) { last.t += g.t; last.v += g.v; } else out.push({ ...g });
  }
  return out;
}
const RULE_SUB = 'I đứng trước V hoặc X thì bớt đi 1: IV là 4, IX là 9.';
const RULE_3 = 'Không viết một chữ quá ba lần liền nhau.';
/** "X là 10, IV là 5 bớt 1 bằng 4. Vậy XIV là 14." */
function readRule(s) {
  const n = rawValue(s), rs = runsOf(s);
  if (rs.length === 1 && !rs[0].sub) return s.length === 1 ? `${s} là ${n}.` : `${s} là ${s.length} chữ ${s[0]}, mỗi chữ là ${VAL[s[0]]}. Vậy ${s} là ${n}.`;
  const parts = rs.map(g => (g.sub ? `${g.t} là ${VAL[g.t[1]]} bớt 1 bằng ${g.v}` : `${g.t} là ${g.v}`));
  return `${parts.join(', ')}. Vậy ${s} là ${n}.`;
}
/** "14 là 10 và 4: viết X rồi viết IV." */
function writeRule(n) {
  const rs = runsOf(toRoman(n));
  if (rs.length === 1) return `${n} viết là ${rs[0].t}.`;
  const vs = rs.map(g => g.v), ts = rs.map(g => g.t);
  const join = (a, w) => `${a.slice(0, -1).join(', ')} ${w} ${a[a.length - 1]}`;
  return `${n} là ${join(vs, 'và')}: viết ${join(ts, 'rồi')}.`;
}
const four = (s) => /(I{4}|V{2,}|X{4})/.test(s);

// ── Câu đố que diêm (tính sẵn, mỗi câu chỉ có một số đúng) ──────────────────────────────────────────────
const RM = [], ADD = [], MV = [];
for (let n = 1; n <= 20; n++) {
  const s = toRoman(n);
  const rm = {}, add = {};
  [...s].forEach((c, i) => {
    if (c !== 'I') return;
    const t = s.slice(0, i) + s.slice(i + 1), v = romanValue(t);
    if (v && v !== n) (rm[v] ||= { kind: 'rm', from: n, s, to: v, t }).ok = [...(rm[v].ok || []), i];
    // Chuyển que này sang chỗ khác
    for (let g = 0; g <= t.length; g++) {
      const u = t.slice(0, g) + 'I' + t.slice(g), w = romanValue(u);
      if (w && w !== n && !MV.some(x => x.from === n && x.to === w)) {
        MV.push({ kind: 'mv', from: n, s, to: w, t: u, src: i, gap: g <= i ? g : g + 1, opts: [w, n, v || rawValue(t)].sort((a, b) => a - b) });
      }
    }
  });
  for (let g = 0; g <= s.length; g++) {
    const t = s.slice(0, g) + 'I' + s.slice(g), v = romanValue(t);
    if (v && v !== n) (add[v] ||= { kind: 'add', from: n, s, to: v, t, ok: [] }).ok.push(g);
  }
  RM.push(...Object.values(rm));
  ADD.push(...Object.values(add));
}
// Bỏ câu quá dễ (II, III thành I, II…): từ IV trở lên mới có V, X để nghĩ. mv: ba lựa chọn phải khác nhau.
for (const list of [RM, ADD]) for (let i = list.length - 1; i >= 0; i--) if (list[i].from < 4) list.splice(i, 1);
for (let i = MV.length - 1; i >= 0; i--) if (new Set(MV[i].opts).size < 3) MV.splice(i, 1);

// ── Đề ───────────────────────────────────────────────────────────────────────────────────────────────
const R12 = Array.from({ length: 12 }, (_, i) => i + 1);
const R20 = Array.from({ length: 20 }, (_, i) => i + 1);
const wRead = (n) => ([4, 9].includes(n) ? 3 : [6, 7, 8, 11, 12].includes(n) ? 2 : 1);
const wAll = (n) => ([4, 9, 14, 19].includes(n) ? 3 : [1, 2, 3, 5, 10].includes(n) ? 1 : 2);
const SORT_PAIRS = [[4, 6], [9, 11], [14, 16], [4, 9], [6, 9], [9, 11], [14, 19], [16, 19], [11, 19]];

function makeKind(rng, kind) {
  if (kind === 'stick') kind = rng.pick(['rm', 'add', 'mv']);
  if (kind === 'read') { const n = weightedPick(rng, R12, wRead); return { kind, n, s: toRoman(n) }; }
  if (kind === 'read20') { const n = weightedPick(rng, R20, (x) => (x > 12 ? 2 : 1) * wAll(x)); return { kind: 'read', n, s: toRoman(n) }; }
  if (kind === 'clock1') return { kind: 'clock', H: rng.int(1, 11), M: 0 };
  if (kind === 'clock') { const H = rng.int(1, 12); const M = rng.pick([0, 15, 30, 45]); return { kind, H, M: H === 12 && !M ? 30 : M }; }
  if (kind === 'write') return { kind, n: weightedPick(rng, R20, wAll) };
  if (kind === 'rm') return { ...rng.pick(rng() < 0.5 ? RM.filter(p => p.to > p.from) : RM) };
  if (kind === 'add') return { ...rng.pick(rng() < 0.5 ? ADD.filter(p => p.to < p.from) : ADD) };
  if (kind === 'mv') return { ...rng.pick(MV) };
  // sort: một cặp hay nhầm (IV / VI, IX / XI…) và hai số khác
  const vals = [...rng.pick(SORT_PAIRS)];
  while (vals.length < 4) { const v = rng.int(1, 20); if (!vals.includes(v)) vals.push(v); }
  return { kind: 'sort', vals: rng.shuffle(vals) };
}
const keyOf = (m) => `${m.kind}:${m.n ?? ''}:${m.H ?? ''}-${m.M ?? ''}:${m.s ?? ''}>${m.t ?? ''}:${(m.vals || []).join(',')}`;

export const ROMAN_LEVELS = [
  {
    id: 'drill-roman-1', n: 1, title: 'Đọc số La Mã', missions: 5, kinds: ['read', 'read', 'clock1', 'read', 'read'],
    desc: 'Vd. VI là 6, IV là 4, đồng hồ chỉ số VIII.', knowledge: 'chữ số La Mã I, V, X; đọc các số từ I đến XII', lessons: { workbook: ['bai-47'] },
    ask: () => 'I là 1, V là 5, X là 10. I đứng sau thì thêm, đứng trước thì bớt!',
  },
  {
    id: 'drill-roman-2', n: 2, title: 'Viết số La Mã', missions: 5, kinds: ['write'],
    desc: 'Vd. 14 viết là XIV, 19 viết là XIX.', knowledge: 'viết các số từ 1 đến 20 bằng chữ số La Mã', lessons: { workbook: ['bai-47'] },
    ask: () => 'Chạm thẻ I, V, X để viết số. Không viết một chữ quá ba lần liền nhau!',
  },
  {
    id: 'drill-roman-3', n: 3, title: 'Que diêm', missions: 4, kinds: ['rm', 'add', 'mv', 'rm'],
    desc: 'Vd. bớt một que ở XIV để được 15.', knowledge: 'đọc, viết số La Mã; I đứng trước hay đứng sau', lessons: { workbook: ['bai-47'] },
    ask: () => 'Một que diêm đặt trước hay sau chữ V, X là khác hẳn đấy!',
  },
  {
    id: 'drill-roman-4', n: 4, title: 'Trộn', missions: 5, kinds: ['sort', 'clock', 'read20', 'write', 'stick'],
    desc: 'Xếp từ bé đến lớn, đồng hồ số La Mã, đọc, viết, que diêm.', knowledge: 'các số từ I đến XX, xem đồng hồ số La Mã', lessons: { workbook: ['bai-47'] },
    ask: () => 'Đủ các dạng: đọc, viết, xếp số, xem đồng hồ, que diêm!',
  },
];

// ── Hình ─────────────────────────────────────────────────────────────────────────────────────────────
const SERIF = "'Times New Roman', Georgia, serif";
const PILLAR = `<svg class="g3r-pillar" viewBox="0 0 60 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g stroke="${INK}" stroke-width="3" stroke-linejoin="round">
  <rect x="3" y="5" width="54" height="16" rx="3" fill="#F5F5F4"/>
  <path d="M7 21 Q1 29 9 33 H51 Q59 29 53 21 Z" fill="#E7E5E4"/>
  <rect x="12" y="33" width="36" height="233" fill="#FAFAF9"/>
  <path d="M21 42 V258 M30 42 V258 M39 42 V258" stroke="#D6D3D1" stroke-width="3"/>
  <rect x="8" y="266" width="44" height="12" rx="2" fill="#E7E5E4"/>
  <rect x="2" y="278" width="56" height="17" rx="3" fill="#D6D3D1"/></g></svg>`;

// Hộp diêm mở trên bàn gỗ: khay (que nằm) kéo ra khỏi vỏ đỏ. Khung đứng thì vẽ hộp dựng đứng (xoay 90°).
const MATCHBOX_ART = `<g stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <rect x="14" y="68" width="210" height="112" rx="8" fill="#FDE68A"/>
    ${[0, 1, 2, 3, 4].map(i => { const y = 88 + i * 19; return `<line x1="40" y1="${y}" x2="210" y2="${y}" stroke-width="13" stroke-linecap="round"/><line x1="40" y1="${y}" x2="210" y2="${y}" stroke="#F8CF8C" stroke-width="7" stroke-linecap="round"/><circle cx="36" cy="${y}" r="8.5" fill="#E5484D" stroke-width="3"/>`; }).join('')}
    <rect x="150" y="52" width="160" height="142" rx="10" fill="#DC2626"/>
    <rect x="150" y="96" width="160" height="56" fill="#FEF3C7"/>
    <path d="M230 142 Q206 128 222 108 Q224 120 232 118 Q228 104 240 96 Q240 112 250 120 Q256 134 230 142 Z" fill="#F97316" stroke-width="3"/>
  </g>
  <rect data-tray x="14" y="68" width="136" height="112" fill="transparent"/>`;
const MATCHBOX = `<svg class="g3r-mbox g3r-mbox-h" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g transform="translate(0 0)">${MATCHBOX_ART}</g></svg>
  <svg class="g3r-mbox g3r-mbox-v" viewBox="0 0 210 330" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g transform="translate(212 6) rotate(90)">${MATCHBOX_ART}</g></svg>`;

// Que diêm: chữ I một que đứng, V hai que chụm đáy, X hai que bắt chéo; đầu que đỏ ở phía trên.
const SW = { I: 46, V: 124, X: 124 }, GAP = 30, SLOT = 80, PADX = 26, LEN = 220;
function sticksOf(c, x, top) {
  const b = top + LEN, w = SW[c];
  if (c === 'I') return [[x + w / 2, top, x + w / 2, b]];
  if (c === 'V') return [[x + 14, top, x + w / 2, b], [x + w - 14, top, x + w / 2, b]];
  return [[x + 16, top, x + w - 16, b], [x + w - 16, top, x + 16, b]];
}
const ln = ([x1, y1, x2, y2], extra) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
const stickInner = (p) => `${ln(p, `class="g3r-hit" stroke="transparent" stroke-width="64"`)}
  ${ln(p, `stroke="${INK}" stroke-width="21" stroke-linecap="round"`)}
  ${ln(p, `stroke="#F8CF8C" stroke-width="12" stroke-linecap="round"`)}
  <circle cx="${p[0]}" cy="${p[1]}" r="13.5" fill="#E5484D" stroke="${INK}" stroke-width="3.5"/>`;
/** Một que đứng vẽ riêng (bay từ hộp ra / về hộp). */
const FLY_STICK = `<svg viewBox="0 0 46 250" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible">${stickInner([23, 14, 23, 234])}</svg>`;

/**
 * Hình que diêm của s. slots: các khe (0 … s.length) chừa chỗ một que và có nút "+"; ghost: khe đích (chuyển que);
 * glow: chỉ số chữ I đang chuyển. Mọi khe chừa chỗ từ đầu: thêm, bớt, chuyển que không làm hình đổi cỡ.
 */
function sticksSvg(s, { slots = [], ghost = -1, glow = -1, top = 22 }) {
  let x = PADX, body = '', front = '';
  const gapAt = {};
  for (let g = 0; g <= s.length; g++) {
    if (slots.includes(g) || g === ghost) { gapAt[g] = x; x += SLOT; } else if (g > 0 && g < s.length) x += GAP;
    if (g < s.length) {
      const c = s[g];
      sticksOf(c, x, top).forEach((p, j) => {
        body += `<g class="g3r-st${g === glow ? ' g3r-glow' : ''}" data-i="${g}" data-l="${c}" data-j="${j}">${stickInner(p)}</g>`;
      });
      x += SW[c];
    }
  }
  const W = x + PADX, H = top + LEN + 24;
  for (const [gs, gx] of Object.entries(gapAt)) {
    const g = Number(gs), cx = gx + SLOT / 2;
    const ghostCls = g === ghost ? ' g3r-ghost' : '';
    front += `<g class="g3r-gap${ghostCls}" data-g="${g}">
      <rect x="${gx + 9}" y="${top - 10}" width="${SLOT - 18}" height="${LEN + 20}" rx="16"/>
      ${g === ghost ? '' : `<text x="${cx}" y="${top + LEN / 2 + 20}" text-anchor="middle">+</text>`}
      <g class="g3r-new" data-new>${stickInner([cx, top, cx, top + LEN])}</g></g>`;
  }
  let arrow = '';
  if (ghost >= 0 && glow >= 0) {
    const sx = sticksOf('I', 0, top)[0][0] + xOfLetter(s, glow, slots, ghost), gx = gapAt[ghost] + SLOT / 2;
    const y = top - 26, cy = top - 92;
    const dir = gx > sx ? 1 : -1;
    arrow = `<path class="g3r-arrow" d="M${sx} ${y} Q${(sx + gx) / 2} ${cy} ${gx - dir * 4} ${y - 6}" />
      <path class="g3r-arrow-head" d="M${gx} ${y + 2} l${-dir * 22} -8 l${dir * 4} -22 Z"/>`;
  }
  return `<svg class="g3r-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${arrow}${body}${front}</svg>`;
}
/** Hoành độ mép trái của chữ thứ i trong hình (cùng cách xếp như sticksSvg). */
function xOfLetter(s, i, slots, ghost) {
  let x = PADX;
  for (let g = 0; g <= i; g++) {
    if (slots.includes(g) || g === ghost) x += SLOT; else if (g > 0 && g < s.length) x += GAP;
    if (g < i) x += SW[s[g]];
  }
  return x;
}

// Đồng hồ số La Mã (vỏ gỗ, mặt kem). Kim ngắn dừng trước vòng số, không che số nào.
const C = 150, NUM_R = 88, NUM_FS = 22;
const rad = (d) => (d * Math.PI) / 180;
const f1 = (n) => Math.round(n * 10) / 10;
function clockSvg(H, M) {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = rad(i * 6), r1 = i % 5 ? 119 : 113, r2 = 124;
    return `<line x1="${f1(C + r1 * Math.sin(a))}" y1="${f1(C - r1 * Math.cos(a))}" x2="${f1(C + r2 * Math.sin(a))}" y2="${f1(C - r2 * Math.cos(a))}" stroke="${INK}" stroke-width="${i % 5 ? 1.4 : 3}" stroke-linecap="round"/>`;
  }).join('');
  const nums = R12.map(n => {
    const a = rad(n * 30), x = f1(C + NUM_R * Math.sin(a)), y = f1(C - NUM_R * Math.cos(a));
    const t = toRoman(n), w = f1(t.replace(/I/g, '').length * 16 + (t.match(/I/g) || []).length * 8.6 + 14);
    return `<rect class="g3r-ring" data-ring="${n}" x="${f1(x - w / 2)}" y="${f1(y - 15)}" width="${w}" height="30" rx="12"/>
      <text data-num="${n}" x="${x}" y="${f1(y + NUM_FS * 0.35)}" text-anchor="middle" font-family="${SERIF}" font-weight="700" font-size="${NUM_FS}" fill="${INK}">${t}</text>`;
  }).join('');
  const hand = (deg, len, w, col) => `<g transform="rotate(${f1(deg)} ${C} ${C})"><path d="M${C - w / 2} ${C + 12} L${C - w / 2} ${C - len + w / 2} Q${C} ${C - len - w / 2} ${C + w / 2} ${C - len + w / 2} L${C + w / 2} ${C + 12} Z" fill="${col}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/></g>`;
  return `<svg class="g3r-clk" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <circle cx="${C}" cy="${C}" r="146" fill="#B45309" stroke="${INK}" stroke-width="4"/>
    <circle cx="${C}" cy="${C}" r="136" fill="#FCD34D" stroke="${INK}" stroke-width="3"/>
    <circle cx="${C}" cy="${C}" r="128" fill="#FFFBEB" stroke="${INK}" stroke-width="2.5"/>
    ${ticks}${nums}
    ${hand(((H % 12) + M / 60) * 30, 46, 11, INK)}
    ${hand(M * 6, 64, 7, '#E5484D')}
    <circle cx="${C}" cy="${C}" r="8" fill="${INK}"/><circle cx="${C}" cy="${C}" r="3" fill="#FCD34D"/>
  </svg>`;
}

/** Hàng tách số: X + IV = 14, mỗi phần một thẻ, giá trị bên dưới. Giữ chỗ từ đầu (ẩn), hiện dần khi kiểm tra. */
function breakHtml(s) {
  const gs = groupsOf(s);
  return gs.map((g, i) => `${i ? '<span class="g3r-op g3r-wait" data-gp>+</span>' : ''}<span class="g3r-grp">
      <span class="g3r-tile${g.sub ? ' g3r-tile-sub' : ''} g3r-wait" data-gt>${g.t}</span><span class="g3r-val g3r-wait" data-gv>${g.sub || g.v}</span></span>`).join('')
    + `<span class="g3r-op g3r-wait" data-gp>=</span><span class="g3r-grp"><span class="g3r-sum g3r-wait" data-gs>${rawValue(s)}</span><span class="g3r-val g3r-ph">0</span></span>`;
}
const union = (els) => {
  const rs = els.filter(Boolean).map(e => e.getBoundingClientRect());
  const l = Math.min(...rs.map(r => r.left)), t = Math.min(...rs.map(r => r.top));
  const r = Math.max(...rs.map(x => x.right)), b = Math.max(...rs.map(x => x.bottom));
  return { left: l, top: t, width: r - l, height: b - t, right: r, bottom: b };
};
/** Khung cùng tâm với `box`, cùng tỉ lệ với `like`, vừa trong box (que bay giữ đúng hình dáng). */
function fitIn(box, aspect) {
  let h = box.height * 0.9, w = h * aspect;
  if (w > box.width * 0.9) { w = box.width * 0.9; h = w / aspect; }
  return { left: box.left + (box.width - w) / 2, top: box.top + (box.height - h) / 2, width: w, height: h };
}
const flyText = (txt, fs, from, to, opts = {}) =>
  flyOne(`<div class="g3r-flyl" style="font-size:${fs}px">${txt}</div>`, from, to, { minMs: 380, maxMs: 650, ...opts });

/** Các chữ bay xuống hàng tách số, từng phần một; rectOf(at, len) = chỗ bay lên của phần đó. */
async function revealBreak(brk, s, rectOf, fs) {
  brk.classList.add('g3r-show');
  const gs = groupsOf(s);
  const tiles = brk.querySelectorAll('[data-gt]'), vals = brk.querySelectorAll('[data-gv]'), ops = brk.querySelectorAll('[data-gp]');
  for (let i = 0; i < gs.length; i++) {
    if (i) ops[i - 1].classList.remove('g3r-wait');
    await sleep(flyText(gs[i].t, fs, rectOf(gs[i].at, gs[i].t.length), tiles[i].getBoundingClientRect(), {
      onLand: () => { tiles[i].classList.remove('g3r-wait'); vals[i].classList.remove('g3r-wait'); popIn(vals[i], vals[i].textContent); },
    }) + 160);
  }
  ops[ops.length - 1].classList.remove('g3r-wait');
  const sum = brk.querySelector('[data-gs]');
  sum.classList.remove('g3r-wait');
  popIn(sum, sum.textContent);
  sfx.ding();
  await sleep(700);
}

// ── Trò ──────────────────────────────────────────────────────────────────────────────────────────────
export const ROMAN_GAME = {
  id: 'drill-roman', icon: '🏛️', title: 'Số La Mã',
  purpose: 'Giúp em đọc, viết các số từ I đến XX bằng chữ số La Mã, xem đồng hồ số La Mã và giải đố que diêm.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: ROMAN_LEVELS,
  stallIcon: () => '🏛️',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['🏛️', 'I = 1, V = 5, X = 10'], ['➕', 'VI = V + I'], ['➖', 'IV = V − I'], ['🔥', 'Que diêm']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => makeKind(rng, level.kinds[k % level.kinds.length]), keyOf);
  },

  mountMission(stage, m, level, api) {
    injectRomanStyles();
    const mount = { read: mountRead, clock: mountClock, write: mountWrite, rm: mountSticks, add: mountSticks, mv: mountSticks, sort: mountSort }[m.kind];
    mount(stage, m, level, api);
  },
};

/** Khung chung: tờ vở + (tuỳ dạng) thay bàn phím số bằng bảng riêng (thẻ chữ, hộp diêm, nút chọn, thẻ xếp). */
function frame(stage, api, board, padHtml) {
  const d = mountDrill(stage, { api, board, cls: 'g3r-scene' });
  const padzone = d.scene.querySelector('.g3d-padzone');
  if (padHtml) padzone.innerHTML = padHtml;
  let mistakes = 0, tip = '';
  const wrong = (els, text, shown) => { mistakes++; tip ||= shown || text; shake(els); d.hint(text, shown); };
  const finish = (ok) => d.done(mistakes, { ok, tip });
  return { ...d, padzone, wrong, finish };
}

// ── Đọc số ───────────────────────────────────────────────────────────────────────────────────────────
function mountRead(stage, m, level, api) {
  const { n, s } = m;
  const board = `
    <div class="g3r g3r-rows">
      <div class="g3r-hero">${PILLAR}<div class="g3r-plaque"><span class="g3r-big">${[...s].map((c, i) => `<span data-li="${i}">${c}</span>`).join('')}</span></div>${PILLAR}</div>
      <div class="g3r-break" style="--ng:${groupsOf(s).length}">${breakHtml(s)}</div>
      <div class="g3r-line"><span class="g3r-rm">${s}</span> = <span class="g3d-box g3r-box" data-ans></span></div>
    </div>`;
  const { paper, say, pad, wrong, finish } = frame(stage, api, board);
  const ansEl = paper.querySelector('[data-ans]');
  const letters = [...paper.querySelectorAll('[data-li]')];
  let stepNow = 'type';
  say('Số La Mã này là số mấy?', `Số La Mã <b>${s}</b> là số mấy?`);
  setActive(paper, ansEl);
  const opts = {
    max: 2,
    onType: (t) => { ansEl.textContent = t; },
    onSubmit: async (t) => {
      if (Number(t) !== n) { ansEl.textContent = ''; wrong(ansEl, readRule(s)); pad.want(opts); return; }
      pad.off();
      stepNow = 'check';
      setActive(paper, null);
      ansEl.classList.add('g3d-box-ok');
      say(`Đúng rồi! ${s} là ${n}.`, `<b>${s}</b> = ${groupsOf(s).map(g => g.t).join(' + ')}`);
      const fs = parseFloat(getComputedStyle(letters[0]).fontSize);
      await revealBreak(paper.querySelector('.g3r-break'), s, (at, len) => union(letters.slice(at, at + len)), fs);
      finish(`${s} là ${n}.`);
    },
  };
  pad.want(opts);
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { if (stepNow === 'type') pad.type(String(n)); }, wrong: () => pad.type(String(n === 1 ? 2 : n - 1)) };
  }
}

// ── Đồng hồ ──────────────────────────────────────────────────────────────────────────────────────────
function mountClock(stage, m, level, api) {
  const { H, M } = m;
  const hs = toRoman(H);
  const board = `
    <div class="g3r g3r-clockwrap">
      <div class="g3r-clockbox">${clockSvg(H, M)}</div>
      <div class="g3r-side">
        <div class="g3r-break g3r-break-side">${breakHtml(hs)}</div>
        <div class="g3r-line g3r-line-clk"><span class="g3d-box g3r-box" data-h></span> giờ${M ? ` <span class="g3d-box g3r-box" data-m></span> phút` : ''}</div>
      </div>
    </div>`;
  const { paper, say, pad, wrong, finish } = frame(stage, api, board);
  const hEl = paper.querySelector('[data-h]'), mEl = paper.querySelector('[data-m]');
  const svg = paper.querySelector('.g3r-clk');
  let stepNow = 'h';
  const next = toRoman((H % 12) + 1);
  const hourRule = M ? `Kim ngắn đã qua số ${hs}, chưa tới số ${next}: ${H} giờ.` : `Kim ngắn chỉ số ${hs}, kim dài chỉ số XII: ${H} giờ đúng.`;
  say('Đồng hồ chỉ mấy giờ?', M ? 'Đồng hồ chỉ <b>mấy giờ, mấy phút</b>?' : 'Đồng hồ chỉ <b>mấy giờ</b>?');
  setActive(paper, hEl);
  const ring = (k, cls) => svg.querySelector(`[data-ring="${k}"]`)?.classList.add(cls);
  const hourOpts = {
    max: 2,
    onType: (t) => { hEl.textContent = t; },
    onSubmit: async (t) => {
      if (Number(t) !== H) { hEl.textContent = ''; wrong(hEl, hourRule); pad.want(hourOpts); return; }
      pad.off();
      stepNow = 'wait';
      setActive(paper, null);
      hEl.classList.add('g3d-box-ok');
      ring(H, 'g3r-ring-on');
      sfx.pop(2);
      const numEl = svg.querySelector(`[data-num="${H}"]`);
      const nr = numEl.getBoundingClientRect();
      await revealBreak(paper.querySelector('.g3r-break'), hs, () => nr, nr.height * 0.95);
      if (!M) { finish(`Đồng hồ chỉ ${H} giờ.`); return; }
      stepNow = 'm';
      setActive(paper, mEl);
      say('Kim dài chỉ số mấy? Đó là bao nhiêu phút?', `Kim dài chỉ số <b>${toRoman(M / 5)}</b>: mấy phút?`);
      pad.want(minOpts);
    },
  };
  const minOpts = {
    max: 2,
    onType: (t) => { mEl.textContent = t; },
    onSubmit: async (t) => {
      if (Number(t) !== M) { mEl.textContent = ''; wrong(mEl, `Kim dài chỉ số ${toRoman(M / 5)} là ${M} phút. Mỗi số cách nhau 5 phút.`); pad.want(minOpts); return; }
      pad.off();
      stepNow = 'end';
      setActive(paper, null);
      mEl.classList.add('g3d-box-ok');
      ring(M / 5, 'g3r-ring-min');
      sfx.ding();
      await sleep(700);
      finish(`Đồng hồ chỉ ${H} giờ ${M} phút.`);
    },
  };
  pad.want(hourOpts);
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { if (stepNow === 'h') pad.type(String(H)); else if (stepNow === 'm') pad.type(String(M)); },
      wrong: () => pad.type(String(stepNow === 'm' ? M + 5 : (H % 12) + 1)) };
  }
}

// ── Viết số ──────────────────────────────────────────────────────────────────────────────────────────
const NSLOT = 5; // XVIII dài nhất (5 chữ)
function mountWrite(stage, m, level, api) {
  const { n } = m;
  const want = toRoman(n);
  const board = `
    <div class="g3r g3r-rows g3r-write">
      <div class="g3r-hero">${PILLAR}<div class="g3r-plaque g3r-plaque-num"><span class="g3r-num">${n}</span></div>${PILLAR}</div>
      <div class="g3r-slots">${Array.from({ length: NSLOT }, (_, i) => `<span class="g3r-slot" data-slot="${i}"></span>`).join('')}</div>
      <div class="g3r-break" style="--ng:${groupsOf(want).length}">${breakHtml(want)}</div>
    </div>`;
  const tilesPad = `<div class="g3r-pad g3r-tiles">
      ${['I', 'V', 'X'].map(c => `<button type="button" class="g3r-key" data-t="${c}">${c}</button>`).join('')}
      <button type="button" class="g3r-key g3r-key-del" data-t="del" aria-label="Xoá">⌫</button>
      <button type="button" class="g3r-key g3r-key-ok" data-t="ok" disabled>OK</button></div>`;
  const { scene, paper, padzone, say, wrong, finish } = frame(stage, api, board, tilesPad);
  const slots = [...paper.querySelectorAll('[data-slot]')];
  const slotRow = paper.querySelector('.g3r-slots');
  const okBtn = padzone.querySelector('[data-t="ok"]');
  let typed = '', shown = [], landAt = 0, locked = false, stepNow = 'write';
  const render = () => {
    slots.forEach((el, i) => {
      const on = i < typed.length && shown[i];
      el.textContent = on ? typed[i] : '';
      el.classList.toggle('g3r-slot-full', on);
    });
    okBtn.disabled = !typed || locked;
    setActive(paper, locked ? null : slots[typed.length] || null);
  };
  say(`Viết số ${n} bằng chữ số La Mã.`, `Viết số <b>${n}</b> bằng chữ số La Mã: chạm <b>I, V, X</b>.`);
  render();

  async function press(t) {
    if (locked || stepNow !== 'write') return;
    if (t === 'del') { if (!typed) return; sfx.tap(); typed = typed.slice(0, -1); render(); return; }
    if (t === 'ok') { if (typed) check(); return; }
    if (typed.length >= NSLOT) { shake(slotRow); return; }
    sfx.tap();
    const i = typed.length;
    typed += t;
    shown[i] = false;
    const btn = padzone.querySelector(`[data-t="${t}"]`);
    const fs = parseFloat(getComputedStyle(btn).fontSize);
    const ms = flyText(t, fs, fitIn(btn.getBoundingClientRect(), 0.8), slots[i].getBoundingClientRect(), {
      minMs: 300, maxMs: 520, onLand: () => { if (typed[i] === t) { shown[i] = true; render(); sfx.pop(i); } },
    });
    landAt = Math.max(landAt, performance.now() + ms);
    render();
  }
  async function check() {
    locked = true;
    render();
    await sleep(Math.max(0, landAt - performance.now()) + 80);
    const t = typed;
    if (t !== want) {
      const v = romanValue(t);
      let text;
      if (four(t)) text = `${RULE_3} ${writeRule(n)}`;
      else if (v && /I[VX]/.test(want) && !/I[VX]/.test(t)) text = `Em viết ${t} là ${v}. ${RULE_SUB} ${writeRule(n)}`;
      else if (v) text = `Em viết ${t} là ${v}, chưa phải ${n}. ${writeRule(n)}`;
      else text = writeRule(n);
      wrong(slotRow, text);
      await sleep(650);
      typed = ''; shown = []; locked = false;
      render();
      return;
    }
    stepNow = 'check';
    slotRow.classList.add('g3r-ok');
    sfx.ding();
    say(`Đúng rồi! ${n} viết là ${want}.`, `<b>${n}</b> viết là <b>${want}</b>`);
    const fs = parseFloat(getComputedStyle(slots[0]).fontSize);
    await revealBreak(paper.querySelector('.g3r-break'), want, (at, len) => union(slots.slice(at, at + len)), fs);
    finish(`${n} viết là ${want}.`);
  }
  padzone.querySelector('.g3r-tiles').addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (b && !b.disabled) press(b.dataset.t); });
  const onKey = (e) => {
    if (!scene.isConnected) { document.removeEventListener('keydown', onKey); return; }
    if (scene.closest('.g3g-has-result')) return;
    const k = e.key.toUpperCase();
    if (k === 'I' || k === 'V' || k === 'X') press(k);
    else if (e.key === 'Backspace') press('del');
    else if (e.key === 'Enter') press('ok');
    else return;
    e.preventDefault();
  };
  document.addEventListener('keydown', onKey);
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { if (stepNow !== 'write') return; typed = ''; shown = []; for (const c of want) press(c); press('ok'); },
      wrong: () => { typed = ''; shown = []; for (const c of (n === 4 ? 'IIII' : n === 9 ? 'VIIII' : 'VX')) press(c); press('ok'); } };
  }
}

// ── Que diêm ─────────────────────────────────────────────────────────────────────────────────────────
function mountSticks(stage, m, level, api) {
  const { kind, s, t, to } = m;
  const mv = kind === 'mv';
  const svg = sticksSvg(s, kind === 'add' ? { slots: [...Array(s.length + 1).keys()] } : mv ? { ghost: m.gap, glow: m.src, top: 112 } : {});
  const task = kind === 'rm' ? `Bớt <b>1 que</b> để được số <b class="g3r-target">${to}</b>`
    : kind === 'add' ? `Thêm <b>1 que</b> để được số <b class="g3r-target">${to}</b>`
      : 'Chuyển que <b class="g3r-hl">sáng màu</b> tới chỗ mũi tên: được số mấy?';
  const board = `
    <div class="g3r g3r-stick">
      <div class="g3r-task">${task}</div>
      <div class="g3r-sticks">${svg}</div>
      <div class="g3r-res"><span class="g3r-rm" data-res>${t}</span> = <span>${to}</span></div>
    </div>`;
  const padHtml = mv
    ? `<div class="g3r-pad g3r-ch">${m.opts.map(v => `<button type="button" class="g3r-key g3r-key-num" data-v="${v}">${v}</button>`).join('')}</div>`
    : `<div class="g3r-pad g3r-boxpad">${MATCHBOX}</div>`;
  const { paper, padzone, say, wrong, finish } = frame(stage, api, board, padHtml);
  const pic = paper.querySelector('.g3r-svg');
  const res = paper.querySelector('.g3r-res');
  let stepNow = 'play';
  const trayRect = () => [...padzone.querySelectorAll('[data-tray]')].map(e => e.getBoundingClientRect()).find(r => r.width);
  const stickAspect = 46 / 250;

  if (kind === 'rm') say(`Bớt một que diêm để được số ${to}.`, `Bớt <b>1 que</b> để được số <b>${to}</b>. Chạm vào que cần bớt.`);
  else if (kind === 'add') say(`Thêm một que diêm để được số ${to}.`, `Thêm <b>1 que</b> để được số <b>${to}</b>. Chạm vào chỗ <b>+</b>.`);
  else say('Chuyển que diêm sáng màu tới chỗ mũi tên thì được số mấy?', `Chuyển que <b>sáng màu</b> tới chỗ mũi tên: được <b>số mấy</b>?`);

  const win = async (text) => {
    stepNow = 'end';
    pic.classList.add('g3r-locked');
    res.classList.add('g3r-show');
    popIn(res, '');
    res.innerHTML = `<span class="g3r-rm">${t}</span> = <span>${to}</span>`;
    sfx.ding();
    await sleep(900);
    finish(text);
  };

  if (kind === 'rm') {
    pic.addEventListener('click', (e) => {
      const st = e.target.closest('.g3r-st');
      if (!st || stepNow !== 'play') return;
      sfx.tap();
      const i = Number(st.dataset.i), c = st.dataset.l;
      if (c !== 'I') { wrong(st, `Que này là một nét của chữ ${c}. Bớt nó đi thì chữ ${c} không còn nữa. Hãy tìm que chữ I.`); return; }
      const u = s.slice(0, i) + s.slice(i + 1), v = romanValue(u);
      if (u !== t) { wrong(st, v ? `Bớt que này thì còn ${u}, là ${v}. Cần số ${to}.` : `Bớt que này thì còn ${u}: chưa phải số La Mã đúng.`); return; }
      stepNow = 'fly';
      const r = st.getBoundingClientRect();
      st.classList.add('g3r-out');
      flyOne(FLY_STICK, r, fitIn(trayRect(), stickAspect), { minMs: 450, maxMs: 750, onLand: () => sfx.pop(1) });
      say(`Đúng rồi! Bớt một que, ${s} thành ${t}, là ${to}.`, `<b>${s}</b> bớt 1 que thành <b>${t}</b>`);
      setTimeout(() => win(`Bớt một que, ${s} thành ${t}, là ${to}.`), 800);
    });
  } else if (kind === 'add') {
    pic.addEventListener('click', (e) => {
      const gp = e.target.closest('.g3r-gap');
      if (!gp || stepNow !== 'play') return;
      sfx.tap();
      const g = Number(gp.dataset.g);
      const u = s.slice(0, g) + 'I' + s.slice(g), v = romanValue(u);
      if (u !== t) {
        wrong(gp, four(u) ? `Thêm vào đây thì thành ${u}. ${RULE_3}` : v ? `Thêm vào đây thì thành ${u}, là ${v}. Cần số ${to}.` : `Thêm vào đây thì thành ${u}: chưa phải số La Mã đúng.`);
        return;
      }
      stepNow = 'fly';
      pic.querySelectorAll('.g3r-gap').forEach(x => { if (x !== gp) x.classList.add('g3r-gone'); });
      gp.classList.add('g3r-gap-used');
      const nw = gp.querySelector('[data-new]');
      const target = nw.getBoundingClientRect();
      const ms = flyOne(FLY_STICK, fitIn(trayRect(), stickAspect), target, { minMs: 450, maxMs: 750, onLand: () => { gp.classList.add('g3r-gap-filled'); sfx.pop(2); } });
      say(`Đúng rồi! Thêm một que, ${s} thành ${t}, là ${to}.`, `<b>${s}</b> thêm 1 que thành <b>${t}</b>`);
      setTimeout(() => win(`Thêm một que, ${s} thành ${t}, là ${to}.`), ms + 300);
    });
  } else {
    padzone.querySelector('.g3r-ch').addEventListener('click', (e) => {
      const b = e.target.closest('[data-v]');
      if (!b || stepNow !== 'play') return;
      sfx.tap();
      const v = Number(b.dataset.v);
      if (v !== to) { wrong(b, `Chuyển xong: ${readRule(t)}`); return; }
      stepNow = 'fly';
      b.classList.add('g3r-key-good');
      padzone.querySelectorAll('[data-v]').forEach(x => { x.disabled = true; });
      const src = pic.querySelector(`.g3r-st[data-i="${m.src}"]`);
      const gp = pic.querySelector('.g3r-gap');
      const from = src.getBoundingClientRect();
      src.classList.add('g3r-out');
      pic.querySelectorAll('.g3r-arrow, .g3r-arrow-head').forEach(x => x.classList.add('g3r-gone'));
      const ms = flyOne(FLY_STICK, from, gp.querySelector('[data-new]').getBoundingClientRect(), { minMs: 500, maxMs: 800, onLand: () => { gp.classList.add('g3r-gap-filled'); sfx.pop(2); } });
      say(`Đúng rồi! ${s} thành ${t}, là ${to}.`, `<b>${s}</b> thành <b>${t}</b>`);
      setTimeout(() => win(`Chuyển một que, ${s} thành ${t}, là ${to}.`), ms + 300);
    });
  }

  if (import.meta.env.DEV) {
    const okEl = () => (kind === 'rm' ? pic.querySelector(`.g3r-st[data-i="${m.ok[0]}"]`)
      : kind === 'add' ? pic.querySelector(`.g3r-gap[data-g="${m.ok[0]}"]`) : padzone.querySelector(`[data-v="${to}"]`));
    const badEl = () => (kind === 'rm' ? pic.querySelector('.g3r-st:not([data-l="I"])') || pic.querySelector('.g3r-st')
      : kind === 'add' ? [...pic.querySelectorAll('.g3r-gap')].find(x => !m.ok.includes(Number(x.dataset.g))) : padzone.querySelector(`[data-v]:not([data-v="${to}"])`));
    const click = (el) => el?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    window.__g3drill = { m, step: () => { if (stepNow === 'play') click(okEl()); }, wrong: () => click(badEl()) };
  }
}

// ── Xếp từ bé đến lớn ────────────────────────────────────────────────────────────────────────────────
function mountSort(stage, m, level, api) {
  const { vals } = m;
  const sorted = [...vals].sort((a, b) => a - b);
  const board = `
    <div class="g3r g3r-sort">
      <div class="g3r-task">Xếp các số La Mã <b>từ bé đến lớn</b></div>
      <div class="g3r-stairs">${sorted.map((_, i) => `<div class="g3r-step" style="--h:${46 + i * 18}%">
        <div class="g3r-card" data-slot="${i}"></div>
        <div class="g3r-stone"><span class="g3r-val g3r-wait" data-sv="${i}">${sorted[i]}</span></div></div>`).join('')}</div>
    </div>`;
  const padHtml = `<div class="g3r-pad g3r-cards">${vals.map((v, i) => `<button type="button" class="g3r-key g3r-key-card" data-c="${i}">${toRoman(v)}</button>`).join('')}</div>`;
  const { paper, padzone, say, wrong, finish } = frame(stage, api, board, padHtml);
  const cards = [...paper.querySelectorAll('[data-slot]')];
  let p = 0, stepNow = 'pick';
  say('Xếp các số La Mã theo thứ tự từ bé đến lớn.', 'Chạm số <b>bé nhất</b> trước, rồi lần lượt tới số <b>lớn nhất</b>.');
  setActive(paper, cards[0]);
  padzone.querySelector('.g3r-cards').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-c]');
    if (!b || b.disabled || stepNow !== 'pick') return;
    sfx.tap();
    const v = vals[Number(b.dataset.c)];
    if (v !== sorted[p]) { wrong(b, `${toRoman(v)} là ${v}, chưa phải số bé nhất còn lại.`); return; }
    const slot = cards[p], k = p;
    p++;
    b.disabled = true;
    b.classList.add('g3r-used');
    const fs = parseFloat(getComputedStyle(b).fontSize);
    const ms = flyText(toRoman(v), fs, fitIn(b.getBoundingClientRect(), 1.6), slot.getBoundingClientRect(), {
      onLand: () => { slot.textContent = toRoman(v); slot.classList.add('g3r-card-full'); sfx.pop(k); },
    });
    setActive(paper, cards[p] || null);
    if (p < sorted.length) return;
    stepNow = 'end';
    await sleep(ms + 250);
    say(`Đúng rồi! ${sorted.map(toRoman).join(', ')}.`, sorted.map(x => `<b>${toRoman(x)}</b>`).join(' &lt; '));
    for (let i = 0; i < sorted.length; i++) {
      const el = paper.querySelector(`[data-sv="${i}"]`);
      el.classList.remove('g3r-wait');
      popIn(el, el.textContent);
      await sleep(260);
    }
    sfx.ding();
    await sleep(600);
    finish(`${sorted.map(toRoman).join(' < ')}.`);
  });
  if (import.meta.env.DEV) {
    const click = (el) => el?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    window.__g3drill = { m, step: () => click(padzone.querySelector(`[data-c="${vals.indexOf(sorted[p])}"]`)),
      wrong: () => click(padzone.querySelector(`[data-c="${vals.indexOf(sorted[sorted.length - 1])}"]`)) };
  }
}

// ── Kiểu ─────────────────────────────────────────────────────────────────────────────────────────────
let romanStyles = false;
function injectRomanStyles() {
  if (romanStyles) return;
  romanStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3r { flex: 1; min-height: 0; display: grid; gap: 2cqh; padding: 2.4cqh 3cqi 2.4cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3r > * { min-height: 0; min-width: 0; }
    .g3r-wait { visibility: hidden; }
    .g3r-rows { grid-template-rows: minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 0.7fr); }
    .g3r-write { grid-template-rows: minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 1fr); }

    /* Bia đá giữa hai cột đền */
    .g3r-hero { display: flex; align-items: stretch; justify-content: center; gap: 1.6cqi; }
    .g3r-pillar { flex: none; height: 100%; width: auto; aspect-ratio: 60 / 300; }
    .g3r-plaque { flex: 0 1 62cqi; min-width: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(#FAFAF9, #E7E5E4); border: 3px solid #A8A29E;
      border-radius: 1.2rem; box-shadow: inset 0 0 0 6px #F5F5F4, inset 0 0 0 8px #D6D3D1, 0 6px 0 #A8A29E; }
    .g3r-big { font-family: ${SERIF}; font-weight: 700; font-size: min(30cqh, 15cqi); line-height: 1; color: #44403C; letter-spacing: 0.04em; text-shadow: 0 3px 0 #fff; }
    .g3r-num { font-size: min(27cqh, 17cqi); line-height: 1; color: #1D4ED8; }

    /* Hàng tách số */
    .g3r-break { display: flex; align-items: center; justify-content: center; gap: 0.22em; font-size: min(14cqh, 7.5cqi); visibility: hidden; white-space: nowrap; }
    .g3r-break.g3r-show { visibility: visible; }
    .g3r-grp { display: flex; flex-direction: column; align-items: center; gap: 0.1em; }
    .g3r-tile { font-family: ${SERIF}; line-height: 1; padding: 0.06em 0.2em; min-width: 0.7em; text-align: center; color: #44403C; background: #FEF3C7; border: 3px solid #F59E0B; border-radius: 0.18em; }
    .g3r-tile-sub { background: #FFE4E6; border-color: #F43F5E; }
    .g3r-val { font-size: 0.48em; line-height: 1.2; color: #6D28D9; background: #F3E8FF; border-radius: 999px; padding: 0.04em 0.5em; }
    .g3r-ph { visibility: hidden; }
    .g3r-op { color: #64748B; padding-bottom: 0.62em; }
    .g3r-sum { line-height: 1; padding: 0.06em 0.1em; color: #15803D; border: 3px solid transparent; }
    .g3r-line { display: flex; align-items: center; justify-content: center; gap: 0.3em; font-size: min(12cqh, 6.4cqi); line-height: 1; white-space: nowrap; }
    .g3r-rm { font-family: ${SERIF}; color: #44403C; }
    .g3r-box.g3d-box { --boxw: 2em; height: 1.25em; }
    /* Tờ vở đứng: hàng tách số và dòng "IV = 4" to theo bề ngang (--ng: số nhóm chữ). */
    @container (aspect-ratio < 1) {
      .g3r-break { font-size: min(11cqh, calc(84cqi / (var(--ng, 3) * 2.1 + 1.6))); }
      .g3r-line { font-size: min(10cqh, 9cqi); }
    }

    /* Viết số: 5 ô chữ */
    .g3r-slots { display: flex; align-items: center; justify-content: center; gap: 1.4cqi; }
    .g3r-slot { height: min(26cqh, 15cqi); aspect-ratio: 0.82; display: grid; place-items: center; box-sizing: border-box; border: 3px dashed #93C5FD; border-radius: 0.6rem; background: #F8FAFC;
      font-family: ${SERIF}; font-weight: 700; font-size: min(20cqh, 11.5cqi); line-height: 1; color: #1D4ED8; }
    .g3r-slot-full { border-style: solid; background: #EFF6FF; }
    .g3r-slots.g3r-ok .g3r-slot-full { border-color: #22C55E; background: #F0FDF4; color: #15803D; }
    .g3r-slots.g3d-bad { background: none !important; }

    /* Đồng hồ: đồng hồ | hàng tách số + dòng giờ; tờ vở đứng thì xếp trên dưới */
    .g3r-clockwrap { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); }
    .g3r-clockbox { display: flex; }
    .g3r-clk { flex: 1; width: 100%; height: 100%; }
    .g3r-ring { fill: transparent; stroke: transparent; stroke-width: 3; }
    .g3r-ring-on { fill: #FEF08A; stroke: #F59E0B; }
    .g3r-ring-min { fill: #FFE4E6; stroke: #E5484D; }
    .g3r-side { display: grid; grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); gap: 2cqh; }
    .g3r-break-side { font-size: min(13cqh, 5.6cqi); }
    .g3r-line-clk { font-size: min(12cqh, 5.4cqi); }
    @container (aspect-ratio < 1.4) {
      .g3r-clockwrap { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1.5fr) minmax(0, 1fr); }
      .g3r-side { gap: 1cqh; }
      .g3r-break-side { font-size: min(9cqh, 7.5cqi); }
      .g3r-line-clk { font-size: min(8cqh, 7.5cqi); }
    }

    /* Que diêm */
    .g3r-stick { grid-template-rows: auto minmax(0, 1fr) auto; }
    .g3r-task { text-align: center; font-size: min(6.5cqh, 3.6cqi); line-height: 1.25; }
    @container (aspect-ratio < 1) { .g3r-task { font-size: min(4.6cqh, 5.8cqi); } }
    .g3r-task b { color: #C2410C; }
    .g3r-target { font-size: 1.3em; }
    .g3r-hl { background: #FEF08A; border-radius: 0.3em; padding: 0 0.2em; }
    .g3r-sticks { display: flex; }
    .g3r-svg { flex: 1; width: 100%; height: 100%; overflow: visible; }
    .g3r-st { cursor: pointer; }
    .g3r-hit { pointer-events: stroke; }
    .g3r-locked .g3r-st, .g3r-locked .g3r-gap { pointer-events: none; }
    .g3r-out { visibility: hidden; }
    .g3r-glow { filter: drop-shadow(0 0 6px #FACC15) drop-shadow(0 0 12px #FACC15); animation: g3rGlow 1.2s ease-in-out infinite; }
    @keyframes g3rGlow { 50% { filter: drop-shadow(0 0 2px #FACC15) drop-shadow(0 0 5px #FACC15); } }
    .g3r-gap { cursor: pointer; }
    .g3r-gap > rect { fill: #EFF6FF; stroke: #60A5FA; stroke-width: 4; stroke-dasharray: 12 9; }
    .g3r-gap > text { font: 800 64px 'Baloo 2', sans-serif; fill: #3B82F6; }
    .g3r-ghost { cursor: default; pointer-events: none; }
    .g3r-ghost > rect { fill: #FFF7ED; stroke: #F97316; }
    .g3r-new { visibility: hidden; pointer-events: none; }
    .g3r-gap-filled .g3r-new { visibility: visible; }
    .g3r-gap-used > rect, .g3r-gap-used > text, .g3r-gap-filled > rect { opacity: 0; transition: opacity .3s; }
    .g3r-gone { opacity: 0; transition: opacity .35s; pointer-events: none; }
    .g3r-arrow { fill: none; stroke: #F97316; stroke-width: 7; stroke-linecap: round; stroke-dasharray: 16 12; }
    .g3r-arrow-head { fill: #F97316; stroke: #F97316; stroke-width: 3; stroke-linejoin: round; }
    .g3r-res { text-align: center; font-size: min(10cqh, 6cqi); line-height: 1.1; visibility: hidden; color: #15803D; }
    .g3r-res.g3r-show { visibility: visible; }

    /* Xếp từ bé đến lớn: bậc thềm đá */
    .g3r-sort { grid-template-rows: auto minmax(0, 1fr); }
    .g3r-stairs { display: flex; align-items: flex-end; gap: 1.6cqi; }
    .g3r-step { flex: 1 1 0; min-width: 0; height: var(--h); display: flex; flex-direction: column; }
    .g3r-card { flex: none; height: min(22cqh, 15cqi); display: grid; place-items: center; box-sizing: border-box; border: 3px dashed #94A3B8; border-radius: 0.7rem; background: #F8FAFC;
      font-family: ${SERIF}; font-weight: 700; font-size: min(13cqh, 6cqi); line-height: 1; color: #44403C; }
    .g3r-card-full { border: 3px solid #F59E0B; background: #FEF3C7; box-shadow: 0 5px 0 #D97706; }
    .g3r-stone { flex: 1; margin-top: 1.4cqh; display: flex; justify-content: center; align-items: flex-start; padding-top: 2cqh; box-sizing: border-box;
      background: linear-gradient(#F5F5F4, #D6D3D1); border: 3px solid ${INK}; border-bottom: none; border-radius: 0.5rem 0.5rem 0 0; font-size: min(18cqh, 10cqi); }
    @container (aspect-ratio < 1.3) { .g3r-card { font-size: min(13cqh, 6.4cqi); } }

    /* Bảng thay bàn phím số (cùng chỗ, cùng cỡ) */
    .g3r-pad { height: 100%; box-sizing: border-box; display: grid; gap: min(3cqh, 3cqi); padding: min(3cqh, 3cqi); background: #334155; border-radius: 1.1rem; }
    .g3g-has-result .g3r-pad { visibility: hidden; }
    .g3r-pad .g3r-key { border: none; border-radius: 0.8rem; background: #FFFBEB; color: #44403C; font-family: ${SERIF}; font-weight: 700; line-height: 1; cursor: pointer; padding: 0; min-height: 0; min-width: 0;
      touch-action: manipulation; box-shadow: 0 6px 0 #D6A15B; font-size: min(30cqh, 26cqi, 7rem); }
    .g3r-pad .g3r-key:active { transform: translateY(4px); box-shadow: 0 2px 0 #D6A15B; }
    .g3r-pad .g3r-key:disabled { cursor: default; }
    .g3r-pad .g3r-key-del { background: #FEE2E2; color: #B91C1C; box-shadow: 0 6px 0 #FCA5A5; font-family: 'Baloo 2', sans-serif; font-size: min(16cqh, 11cqi, 3rem); }
    .g3r-pad .g3r-key-ok { background: #22C55E; color: #fff; box-shadow: 0 6px 0 #15803D; font-family: 'Baloo 2', sans-serif; font-size: min(16cqh, 11cqi, 3rem); }
    .g3r-pad .g3r-key-ok:disabled { opacity: 0.45; }
    .g3r-tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: minmax(0, 1.7fr) minmax(0, 1fr); }
    .g3r-tiles .g3r-key-ok { grid-column: span 2; }
    .g3r-boxpad { place-items: center; background-color: #C98A4B; border: 3px solid ${INK};
      background-image: repeating-linear-gradient(180deg, transparent 0 calc(25% - 3px), #A86A32 calc(25% - 3px) 25%); }
    .g3r-mbox { width: 100%; height: 100%; filter: drop-shadow(0 8px 0 rgba(63,58,64,0.25)); }
    .g3r-mbox-v { display: none; }
    @container (aspect-ratio < 0.95) { .g3r-mbox-h { display: none; } .g3r-mbox-v { display: block; } }
    .g3r-ch { grid-template-columns: minmax(0, 1fr); grid-template-rows: repeat(3, minmax(0, 1fr)); }
    .g3r-pad .g3r-key-num { font-family: 'Baloo 2', sans-serif; color: #1E3A8A; background: #fff; box-shadow: 0 6px 0 #60A5FA; font-size: min(20cqh, 24cqi, 5rem); }
    .g3r-pad .g3r-key-good, .g3r-pad .g3r-key-good:disabled { background: #DCFCE7; color: #166534; box-shadow: 0 6px 0 #16A34A; }
    .g3r-pad .g3r-key-num:disabled:not(.g3r-key-good) { opacity: 0.5; }
    .g3r-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
    .g3r-pad .g3r-key-card { font-size: min(18cqh, 14cqi, 5rem); }
    .g3r-pad .g3r-used, .g3r-pad .g3r-used:disabled { background: transparent; box-shadow: none; color: transparent; outline: 3px dashed #64748B; outline-offset: -3px; }
    @container (aspect-ratio > 1.7) {
      .g3r-tiles { grid-template-columns: repeat(3, minmax(0, 1.3fr)) repeat(2, minmax(0, 1fr)); grid-template-rows: minmax(0, 1fr); }
      .g3r-tiles .g3r-key-ok { grid-column: auto; }
      .g3r-pad .g3r-key { font-size: min(62cqh, 11cqi, 6rem); }
      .g3r-pad .g3r-key-del, .g3r-pad .g3r-key-ok { font-size: min(34cqh, 7cqi, 3rem); }
      .g3r-ch { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: minmax(0, 1fr); }
      .g3r-pad .g3r-key-num { font-size: min(55cqh, 14cqi, 5rem); }
      .g3r-cards { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: minmax(0, 1fr); }
      .g3r-pad .g3r-key-card { font-size: min(40cqh, 6cqi, 5rem); }
    }
    .g3r-flyl { width: 100%; height: 100%; display: grid; place-items: center; font-family: ${SERIF}; font-weight: 700; color: #C2410C; line-height: 1; white-space: nowrap; }
    @media (prefers-reduced-motion: reduce) {
      .g3r-glow { animation: none; }
    }
  `;
  document.head.appendChild(st);
}
