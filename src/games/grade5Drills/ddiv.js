/**
 * ➗ Chia số thập phân (Luyện Tính lớp 5, SGK Toán 5 Bài 22). Viết theo LỐI RÚT GỌN như sách: dưới số bị chia chỉ ghi
 * số dư và chữ số hạ xuống (không ghi tích), lời từng bước vẫn đủ "chia, nhân, trừ":
 *   92,8 | 4        bước: lấy 9 → 9 chia 4 được 2 → viết số dư 1 → hạ 2 → 12 chia 4 được 3 → số dư 0
 *   12   | 23,2          → viết dấu phẩy vào bên phải 3 (mốc: chặn bước hạ cho tới khi viết dấu phẩy) → hạ 8 …
 *    0 8
 *      0
 * Thương có chữ số 0: số đem chia bé hơn số chia thì viết 0, hạ tiếp vào CÙNG hàng (19,95 : 19 → "0 95").
 * Số tự nhiên : số tự nhiên còn dư: viết dấu phẩy vào thương, viết thêm 0 vào bên phải số dư, chia tiếp (26 : 8 = 3,25).
 * Phần nguyên bé hơn số chia (6 : 25, 0,36 : 9): thương 0, viết dấu phẩy, lấy thêm chữ số / thêm 0 ngay trên hàng
 * số bị chia ("6,0 | 25").
 * Chia cho số thập phân: bước chuẩn bị (đếm chữ số phần thập phân của số chia, gạch dấu phẩy số chia, dời dấu phẩy số
 * bị chia sang phải, thiếu thì mọc ô 0; số bị chia là số tự nhiên thì viết thêm 0) rồi chia như chia cho số tự nhiên.
 *
 * createDivView: tờ vở phép chia (lưới ô li, dấu phẩy gắn vào ô chữ số) dùng chung cho Luyện Tính và Khám phá Bài 22
 * (grade5Tools/lessons/calcDiv.js).
 */

import { mountDrill, shake, setActive, setUse, arrowLayer, traceRule, popIn, flyDigit, fmt, fresh, sfx, sleep, how, TEACHER, calmMotion, flyOne } from '../grade3Drills/kit.js';
import { estimate } from '../grade3Drills/division.js';

// ── Số ──────────────────────────────────────────────────────────────────────────────────────────────
/** Số nguyên n có dp chữ số phần thập phân → "2,48" (bỏ 0 cuối phần thập phân). */
export function decStr(n, dp) {
  let s = String(n).padStart(dp + 1, '0');
  if (dp) s = `${s.slice(0, -dp)},${s.slice(-dp)}`.replace(/,?0+$/, '');
  return s;
}
/** "1234,5" → "1 234,5" (tách lớp phần nguyên như sách). */
export const showDec = (s) => { const [i, f] = String(s).split(','); return fmt(+i) + (f !== undefined ? `,${f}` : ''); };

/**
 * Chuẩn bị phép chia a : b (chuỗi "2,48", "1,6"): k = số chữ số phần thập phân của số chia; dời dấu phẩy số bị chia
 * sang phải k chữ số (thiếu thì thêm `grow` chữ số 0). G: các chữ số của số bị chia sau khi dời, cp: số chữ số phần
 * nguyên của nó, d: số chia (số tự nhiên).
 */
export function prepPlan(a, b) {
  const [ai, af = ''] = a.split(','), [bi, bf = ''] = b.split(',');
  const k = bf.length, da = af.length;
  const A = ai + af, B = bi + bf;
  const grow = Math.max(0, k - da);
  const G = A + '0'.repeat(grow);
  const cp = ai.length + k;
  const d = Number(B);
  const Dp = cp < G.length ? `${G.slice(0, cp)},${G.slice(cp)}` : G;
  return { a, b, ai, af, bi, bf, k, da, A, B, grow, G, cp, d, Dp, lead: B.length - String(d).length };
}

/**
 * Các bước chia (lối rút gọn) của số có các chữ số G (cp chữ số phần nguyên) cho d.
 *   take {end, partial}                     chạm chữ số cuối của số đem chia lần đầu (chỉ trong phần nguyên)
 *   q {qi, q, partial, row, start, end}     chữ số thứ qi của thương; số đem chia nằm ở hàng row, cột start…end
 *   rem {row, end, r, p, q, partial}        số dư viết ở hàng mới, tận cùng ở cột end
 *   comma {qi, why: 'digit' | 'rem', dig, r} viết dấu phẩy vào bên phải chữ số thứ qi của thương
 *   down {row, col, dig, inPlace, partial}  hạ chữ số tiếp theo (inPlace: còn ở hàng số bị chia, chỉ lấy thêm)
 *   zero {row, col, inPlace, from, partial}  viết thêm 0 vào bên phải số dư
 * Trả về null khi thương có quá nhiều chữ số thập phân (không dùng).
 */
export function ddivSteps(G, cp, d, maxZeros = 4) {
  const n = G.length;
  let end = 0, partial = +G[0];
  while (partial < d && end < cp - 1) { end++; partial = partial * 10 + +G[end]; }
  const steps = [{ kind: 'take', end, partial }];
  let row = 0, start = 0, col = end, qi = 0, qComma = null, zeros = 0;
  const digits = [];
  for (let guard = 0; guard < 40; guard++) {
    const q = Math.floor(partial / d);
    digits.push(q);
    steps.push({ kind: 'q', qi, q, partial, row, start, end: col });
    qi++;
    const last = col + 1 >= n && partial % d === 0;
    if (q > 0 || (last && row > 0)) {
      const p = q * d, r = partial - p;
      row++;
      steps.push({ kind: 'rem', row, end: col, r, p, q, partial });
      partial = r;
      start = col - String(r).length + 1;
    }
    if (col + 1 < n) {
      if (col + 1 === cp && qComma === null) { steps.push({ kind: 'comma', qi: qi - 1, why: 'digit', dig: +G[col + 1], lastQ: q }); qComma = qi; }
      col++;
      const dig = +G[col];
      partial = partial * 10 + dig;
      steps.push({ kind: 'down', row, col, dig, inPlace: row === 0, partial });
    } else {
      if (partial === 0) break;
      if (qComma === null) { steps.push({ kind: 'comma', qi: qi - 1, why: 'rem', r: partial, lastQ: q }); qComma = qi; }
      if (zeros >= maxZeros) return null;
      col++;
      zeros++;
      const from = partial;
      partial *= 10;
      steps.push({ kind: 'zero', row, col, inPlace: row === 0, from, partial });
    }
  }
  const qInt = qComma ?? qi;
  const Q = digits.slice(0, qInt).join('') + (qComma !== null ? `,${digits.slice(qInt).join('')}` : '');
  return { steps, rows: row + 1, qn: qi, qInt, comma: qComma !== null, Z: zeros, Q, qDp: qi - qInt };
}

/** Gói đề: kế hoạch chuẩn bị + các bước. */
export function divPack(a, b) {
  const P = prepPlan(a, b);
  const S = ddivSteps(P.G, P.cp, P.d);
  return S && { a, b, P, S };
}

// ── Tờ vở phép chia ──────────────────────────────────────────────────────────────────────────────────
const T = (el) => el.querySelector('.dd-t');

/**
 * Vẽ phép chia a : b vào host. opts: { title (HTML trước phép tính trên dòng đề), staticSetup (viết sẵn số bị chia,
 * số chia, vạch kẻ: Khám phá), reserve (chừa đáy cho nút chọn của Khám phá) }.
 */
export function createDivView(host, a, b, { title = 'Đặt tính rồi tính:', staticSetup = false, reserve = false, unit = '' } = {}) {
  injectDdivStyles();
  const pack = divPack(a, b);
  const { P, S } = pack;
  const N = P.G.length + S.Z;
  const Qw = Math.max(S.qn, P.B.length);
  const cols = N + Qw;
  const R = Math.max(2, S.rows);
  const lc = (c) => c + 1;
  const rc = (j) => N + 1 + j;
  const cells = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < N; c++) {
    const cls = r === 0 ? (c < P.A.length ? ' dd-dvd' : c < P.G.length ? ' dd-dvd dd-grow' : ' dd-app') : '';
    cells.push(`<div class="g3d-c dd-c${cls}" style="grid-row:${r + 1};grid-column:${lc(c)}" data-r="${r}" data-c="${c}"><span class="dd-t"></span></div>`);
  }
  for (let j = 0; j < Qw; j++) {
    cells.push(`<div class="g3d-c dd-c dd-div" style="grid-row:1;grid-column:${rc(j)}" data-dv="${j}"><span class="dd-t"></span></div>`);
    cells.push(`<div class="g3d-c dd-c dd-q g3d-in" style="grid-row:2;grid-column:${rc(j)}" data-q="${j}"><span class="dd-t"></span></div>`);
  }
  let di = 0, vi = 0;
  const spans = (s, name) => [...showDec(s)].map(ch => (/\d/.test(ch) ? `<span data-d="${name}${name === 'D' ? di++ : vi++}">${ch}</span>` : ch)).join('');
  host.innerHTML = `
    <div class="dd-root${reserve ? ' dd-reserve' : ''}">
      <div class="g3c-head dd-head"><span>${title}</span> <b class="dd-expr">${spans(a, 'D')} : ${spans(b, 'd')}</b> <b class="g3c-eq">= <span class="g3c-ans">?</span>${unit ? ` <span class="dd-unit">${unit}</span>` : ''}</b></div>
      <div class="dd-area">
        <div class="g3d-grid dd-grid" style="--cols:${cols};--rows:${R}">
          ${cells.join('')}
          <svg class="dd-hop" viewBox="0 0 ${cols} ${R}" aria-hidden="true"></svg>
        </div>
      </div>
    </div>`;
  const root = host.querySelector('.dd-root');
  const grid = root.querySelector('.dd-grid');
  const at = (r, c) => grid.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  const qCell = (j) => grid.querySelector(`[data-q="${j}"]`);
  const dvd = Array.from({ length: P.G.length }, (_, c) => at(0, c));
  const divCells = Array.from({ length: P.B.length }, (_, j) => grid.querySelector(`[data-dv="${j}"]`));
  const divEls = divCells.slice(P.lead); // chữ số có nghĩa của số chia (0,25 → 2, 5)
  const addComma = (cell, cls = '') => { const i = document.createElement('i'); i.className = `dd-cm ${cls}`; i.textContent = ','; cell.append(i); return i; };

  // Dấu phẩy ban đầu của số bị chia, số chia (ẩn tới khi chữ số đứng trước nó được viết).
  const dvdComma = P.da ? addComma(at(0, P.ai.length - 1), staticSetup ? '' : 'dd-hide') : null;
  const divComma = P.k ? addComma(divCells[P.bi.length - 1], staticSetup ? '' : 'dd-hide') : null;
  let commaPos = P.ai.length; // dấu phẩy của số bị chia đang đứng sau ô commaPos - 1
  let curComma = dvdComma;

  const v = {
    root, grid, pack, P, S, N, Qw, cols, R, lc, rc, at, qCell, dvd, divCells, divEls,
    T, addComma,
    get commaPos() { return commaPos; },
    write(el, ch) { T(el).textContent = ch; },
    /** Số bị chia, số chia (Khám phá: viết sẵn; Luyện Tính: bay từ dòng đề xuống). */
    put(name, ch, i) {
      const el = name === 'D' ? dvd[i] : divCells[i];
      T(el).textContent = ch;
      if (name === 'D' && dvdComma && i === P.ai.length - 1) dvdComma.classList.remove('dd-hide');
      if (name === 'd' && divComma && i === P.bi.length - 1) divComma.classList.remove('dd-hide');
    },
    src: (name, i) => root.querySelector(`[data-d="${name}${i}"]`),
    /** Vạch dọc (mép trái cột thương) và vạch ngang dưới số chia, vẽ sẵn. */
    rules() {
      grid.insertAdjacentHTML('beforeend', `<div class="g3d-rule g3d-v dd-rule-on" style="grid-row:1 / ${R + 1};grid-column:${rc(0)} / span 1"></div>
        <div class="g3d-rule dd-rule-on" style="grid-row:1 / span 1;grid-column:${rc(0)} / ${rc(Qw - 1) + 1}"></div>`);
    },
    vRule: () => ({ vertical: true, col: rc(0), rows: `1 / ${R + 1}` }),
    hRule: () => ({ row: 1, cols: `${rc(0)} / ${rc(Qw - 1) + 1}` }),
    /** Các ô của số đang đem chia ở bước q. */
    partialEls: (s) => Array.from({ length: s.end - s.start + 1 }, (_, j) => at(s.row, s.start + j)),
    remEls: (s) => { const w = String(s.r).length; return Array.from({ length: w }, (_, j) => at(s.row, s.end - w + 1 + j)); },
    taken(end) { dvd.slice(0, end + 1).forEach(x => x.classList.add('dd-taken')); },
    /** Dấu phẩy ở thương (bên phải chữ số qi). */
    qComma(qi) { const el = addComma(qCell(qi), 'dd-cm-q'); el.classList.add('g3d-popin'); sfx.pop(4); return el; },
    slot(qi, on) {
      grid.querySelectorAll('.dd-slot').forEach(x => x.remove());
      if (on) qCell(qi).insertAdjacentHTML('beforeend', '<i class="dd-slot"></i>');
    },
    /** Viết thêm 0 trên hàng số bị chia (6 → 6,0): hiện dấu phẩy sau chữ số cuối nếu số bị chia là số tự nhiên. */
    inPlaceComma() {
      if (commaPos < P.G.length || grid.querySelector('.dd-cm-end')) return;
      addComma(dvd[P.G.length - 1], 'dd-cm-end g3d-popin');
    },
    // ── Chuẩn bị: chia cho số thập phân ──
    badge(j, n) { divCells[j].insertAdjacentHTML('beforeend', `<i class="dd-badge">${n}</i>`); sfx.pop(n); },
    clearBadges() { grid.querySelectorAll('.dd-badge').forEach(x => x.remove()); },
    crossDivisor() {
      divComma?.classList.add('dd-cm-x');
      divCells.slice(0, P.lead).forEach(x => x.classList.add('dd-faded'));
      sfx.tap();
    },
    /** Dời dấu phẩy số bị chia sang phải một chữ số (thiếu chữ số thì mọc ô 0). */
    async hop() {
      const target = commaPos; // ô mà dấu phẩy nhảy qua
      if (target >= P.A.length) { popIn(T(dvd[target]), '0'); dvd[target].classList.add('dd-grown'); await sleep(450); }
      const from = curComma;
      const fr = (from || dvd[target]).getBoundingClientRect();
      if (from === dvdComma) from.classList.add('dd-cm-x'); else from?.classList.add('dd-hide');
      const to = addComma(dvd[target], 'dd-cm-new dd-hide');
      await new Promise(res => flyOne(`<div class="dd-flycm" style="font-size:${getComputedStyle(dvd[target]).fontSize}">,</div>`, fr, to.getBoundingClientRect(), { minMs: 380, maxMs: 520, onLand: () => { to.classList.remove('dd-hide'); sfx.pop(2); res(); } }));
      if (from && from !== dvdComma) from.remove();
      curComma = to;
      commaPos = target + 1;
    },
    /** Hết dời: mũi tên đỏ cong từ dấu phẩy cũ tới dấu phẩy mới; dấu phẩy ở cuối số thì bỏ (số tự nhiên). */
    async endHop() {
      const x1 = lc(P.ai.length - 1), x2 = lc(commaPos - 1); // mép phải ô (đơn vị ô) = cột lưới
      const svg = grid.querySelector('.dd-hop');
      const y = 0.06, mid = (x1 + x2) / 2;
      svg.innerHTML = `<path d="M${x1 - 0.08} ${y + 0.12} Q${mid} ${-0.32} ${x2 - 0.14} ${y + 0.05}" pathLength="1"/>
        <polygon points="${x2 - 0.08},${y + 0.1} ${x2 - 0.3},${y - 0.02} ${x2 - 0.14},${y + 0.2}"/>`;
      svg.classList.add('dd-hop-in');
      if (commaPos >= P.G.length && curComma) { await sleep(500); curComma.classList.add('dd-gone'); }
    },
    /** Đánh dấu gợi ý: ô chờ chạm (nhấp nháy vàng). */
    tapOn(els) { grid.querySelectorAll('.dd-tap').forEach(x => x.classList.remove('dd-tap')); [].concat(els || []).forEach(x => x?.classList.add('dd-tap')); },
    answer(text) { root.querySelector('.g3c-ans').textContent = text; root.querySelector('.g3c-eq').classList.add('g3c-eq-done'); },
  };
  if (staticSetup) {
    [...P.A].forEach((ch, i) => v.put('D', ch, i));
    [...P.B].forEach((ch, i) => v.put('d', ch, i));
    v.rules();
  }
  return v;
}

/** Câu nhắc chữ số thương (số chia hai chữ số: ước lượng như lớp 4). */
function quotientHint(partial, d, q) {
  if (!q) return `${partial} bé hơn ${d}, được 0, viết 0 vào thương.`;
  if (d < 10) return `${partial} chia ${d} được ${q}, viết ${q}.`;
  const { a, b, est } = estimate(partial, d);
  const head = `Nhẩm ${a} chia ${b} được ${est}.`;
  if (est === q) return `${head} Thử: ${q} nhân ${d} bằng ${q * d}, không quá ${partial}. Viết ${q}.`;
  if (est > q) return `${head} Thử: ${est} nhân ${d} bằng ${est * d}, lớn hơn ${partial}, giảm dần còn ${q}. Viết ${q}.`;
  return `${head} ${est} nhân ${d} bằng ${est * d}, còn thừa nhiều, tăng lên ${q}. Viết ${q}.`;
}

/** Câu sách cho từng bước (Khám phá đọc to; Luyện Tính hiện sau khi em làm đúng). */
export function stepSay(s, d) {
  switch (s.kind) {
    case 'take': return `Lấy ${s.partial} chia cho ${d}.`;
    case 'q': return `${s.partial} chia ${d} được ${s.q}, viết ${s.q}.`;
    case 'rem': return `${s.q} nhân ${d} bằng ${s.p}; ${s.partial} trừ ${s.p} bằng ${s.r}, viết ${s.r}.`;
    case 'comma': return s.why === 'digit' ? `Viết dấu phẩy vào bên phải ${s.lastQ}.` : `Để chia tiếp, viết dấu phẩy vào bên phải ${s.lastQ}.`;
    case 'down': return s.inPlace ? `Lấy thêm ${s.dig} được ${s.partial}.` : `Hạ ${s.dig} được ${s.partial}.`;
    case 'zero': return `Viết thêm chữ số 0 vào bên phải ${s.from} được ${s.partial}.`;
    default: return '';
  }
}

// ── Sinh đề ─────────────────────────────────────────────────────────────────────────────────────────
/** Thử make() tới khi đề hợp lệ (test). */
function pick(make, test) {
  let last = null;
  for (let t = 0; t < 3000; t++) {
    const x = make();
    if (!x) continue;
    const p = divPack(x.a, x.b);
    if (!p) continue;
    last = x;
    if (p.S.qn <= 5 && p.S.rows <= 7 && p.S.qDp <= 3 && test(p)) return x;
  }
  return last || { a: '92,8', b: '4' };
}
const qDigits = (p) => p.S.Q.replace(',', '');

export const DDIV_LEVELS = [
  {
    id: 'd5-div-1', n: 1, title: 'Số thập phân chia cho số tự nhiên', missions: 5,
    desc: 'Vd. 92,8 : 4 = 23,2. Viết dấu phẩy vào thương trước khi hạ chữ số đầu tiên của phần thập phân.',
    knowledge: 'chia số tự nhiên đặt tính', lessons: { sgk5: ['bai-22'] },
    ask: () => 'Chia phần nguyên trước. Viết dấu phẩy vào thương rồi mới hạ chữ số sau dấu phẩy!',
    gen: (rng, k) => {
      const two = k % 5 === 3; // một phép số chia có hai chữ số (95,2 : 68)
      const dp = two ? 1 : (k % 2 ? 2 : 1);
      return pick(() => {
        const d = two ? rng.int(12, 69) : rng.int(2, 9);
        if (d % 10 === 0) return null;
        const Qs = two ? rng.int(11, 99) : rng.int(10 ** dp + 1, 10 ** dp * (dp === 2 ? 12 : 40));
        return { a: decStr(Qs * d, dp), b: String(d) };
      }, (p) => p.P.da === dp && p.S.Z === 0 && !qDigits(p).includes('0'));
    },
  },
  {
    id: 'd5-div-2', n: 2, title: 'Thương có chữ số 0', missions: 5,
    desc: 'Vd. 19,95 : 19 = 1,05; 0,36 : 9 = 0,04. Bé hơn số chia thì viết 0 vào thương.',
    knowledge: 'số thập phân chia cho số tự nhiên', lessons: { sgk5: ['bai-22'] },
    ask: () => 'Số đem chia bé hơn số chia thì viết 0 vào thương rồi hạ tiếp. Đừng quên số 0!',
    gen: (rng, k) => {
      const small = k % 2 === 0; // thương bắt đầu bằng 0 (0,36 : 9)
      return pick(() => {
        const d = small || rng() < 0.6 ? rng.int(2, 9) : rng.int(11, 19);
        let Qs, dp;
        if (small) { dp = 2; Qs = rng.int(2, 99); } // 0,02 … 0,99
        else if (rng() < 0.6) { dp = 2; Qs = rng.int(1, 9) * 100 + rng.int(1, 9); } // 1,05
        else { dp = 1; Qs = rng.int(1, 9) * 100 + rng.int(1, 9); } // 10,4
        return { a: decStr(Qs * d, dp), b: String(d) };
      }, (p) => p.P.da >= 1 && p.S.Z === 0 && qDigits(p).includes('0') && (small ? p.S.Q.startsWith('0,') : !p.S.Q.startsWith('0')) && p.P.A.length <= 4);
    },
  },
  {
    id: 'd5-div-3', n: 3, title: 'Số tự nhiên chia số tự nhiên, thương thập phân', missions: 5,
    desc: 'Vd. 26 : 8 = 3,25; 6 : 25 = 0,24. Còn dư thì viết dấu phẩy vào thương, thêm 0 vào số dư.',
    knowledge: 'số thập phân chia cho số tự nhiên', lessons: { sgk5: ['bai-22'] },
    ask: () => 'Còn dư thì đừng dừng: viết dấu phẩy vào thương, thêm 0 vào bên phải số dư rồi chia tiếp!',
    gen: (rng, k) => {
      const kind = k % 3; // 0: 26 : 8, 1: 6 : 25 (bé hơn số chia), 2: 882 : 36
      return pick(() => {
        if (kind === 1) { const d = rng.pick([4, 5, 8, 12, 16, 25]); return { a: String(rng.int(1, d - 1)), b: String(d) }; }
        if (kind === 2) { const d = rng.pick([12, 14, 15, 16, 24, 25, 28, 32, 35, 36, 45, 48]); return { a: String(rng.int(100, 999)), b: String(d) }; }
        const d = rng.int(2, 9);
        return { a: String(rng.int(10, 99)), b: String(d) };
      }, (p) => p.S.Z >= 1 && p.S.qDp <= (kind === 2 ? 1 : kind === 1 ? 2 : 3) && (kind !== 1 || +p.a < p.P.d) && (kind === 1 || +p.a > p.P.d));
    },
  },
  {
    id: 'd5-div-4', n: 4, title: 'Chia cho số thập phân', missions: 5,
    desc: 'Vd. 57 : 9,5 = 570 : 95; 2,48 : 1,6 = 24,8 : 16; 5,4 : 0,25 = 540 : 25. Bỏ dấu phẩy ở số chia, dời dấu phẩy số bị chia.',
    knowledge: 'chia cho số tự nhiên, thương thập phân', lessons: { sgk5: ['bai-22'] },
    ask: () => 'Đếm chữ số phần thập phân của số chia. Dời dấu phẩy số bị chia sang phải bấy nhiêu chữ số, thiếu thì thêm 0!',
    gen: (rng, k) => {
      const kind = k % 3; // 0: số tự nhiên : số thập phân, 1: số thập phân : số thập phân, 2: phải thêm 0 (5,4 : 0,25)
      return pick(() => {
        const kb = kind === 2 ? 2 : rng.pick([1, 1, 2]);
        const bs = kb === 1 ? (rng() < 0.25 ? rng.int(2, 9) : rng.int(12, 99)) : rng.pick([5, 12, 15, 24, 25, 35, 45, 75, 4, 8]);
        if (bs % 10 === 0) return null;
        const qdp = kind === 0 ? rng.pick([0, 0, 1]) : rng.pick([1, 1, 2]);
        const Qs = rng.int(qdp ? 11 : 2, qdp ? 10 ** qdp * 60 : 600);
        const a = decStr(bs * Qs, kb + qdp);
        return { a, b: decStr(bs, kb) };
      }, (p) => {
        const { da, k: kb, A, d } = p.P;
        const shape = kind === 0 ? da === 0 && A.length <= 3 : kind === 1 ? da >= kb && da >= 1 : da >= 1 && da < kb;
        return shape && kb >= 1 && d >= 2 && d <= 99 && +p.P.ai >= 1 && da <= 2 && A.length <= 4 && p.S.qDp <= 2 && p.S.qn <= 4 && p.S.Z <= 2;
      });
    },
  },
];

// ── Luyện Tính ──────────────────────────────────────────────────────────────────────────────────────
const rev = (s) => [...String(s)].reverse().join('');
const bump = (v) => { const t = String(v); return t.slice(0, -1) + ((Number(t.at(-1)) + 1) % 10); };

export const DDIV_GAME = {
  id: 'd5-div', icon: '➗', title: 'Chia số thập phân',
  purpose: 'Giúp em chia số thập phân đặt tính như trong sách: viết dấu phẩy vào thương đúng lúc, thêm 0 vào số dư để chia tiếp, chia cho số thập phân bằng cách dời dấu phẩy.',
  unitWord: 'phép chia', starPrefix: 'drill5', npcs: [TEACHER], levels: DDIV_LEVELS,
  stallIcon: () => '➗',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> phép chia.`,
  againText: 'Làm lượt mới',
  howTo: how(['🔢', 'Đếm, dời dấu phẩy'], ['➗', 'Chia'], ['📍', 'Dấu phẩy ở thương'], ['0️⃣', 'Thêm 0 vào số dư']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.a}:${m.b}`);
  },

  mountMission(stage, m, level, api) {
    const { a, b } = m;
    const { paper, scene, say, show, hint, pad, done } = mountDrill(stage, { api, board: '<div class="dd-host"></div>', cls: 'g3v-scene dd-scene', comma: true });
    const view = createDivView(paper.querySelector('.dd-host'), a, b);
    const { P, S, grid, at, qCell, dvd, divCells, divEls } = view;
    const { d } = P;
    const steps = S.steps;
    const arrows = arrowLayer(grid);
    const commaKey = scene.querySelector('.g3d-key-comma');

    let mistakes = 0, firstWrong = null;
    let dev = null; // DEV: { ok(), bad() } của bước đang chờ
    let tracing = null;
    let tapHandler = null;
    grid.addEventListener('click', (e) => {
      const el = e.target.closest('[data-r], [data-dv], [data-q]');
      if (el && tapHandler) tapHandler(el);
    });

    const wrong = (els, text) => {
      mistakes++;
      firstWrong ??= text;
      shake([].concat(els).filter(Boolean));
      hint(text);
    };
    const rule = async (spec) => {
      pad.off();
      setActive(paper, null);
      tracing = traceRule(grid, spec, { say, show, hint });
      await tracing.done;
      tracing = null;
    };

    /** Gõ một số vào các ô els (rtl: từ hàng đơn vị sang trái). */
    const typeIn = (els, want, prompt, hintText, { rtl = false } = {}) => new Promise((res) => {
      const n = els.length;
      const cellOf = (j) => (rtl ? els[n - 1 - j] : els[j]);
      const focus = (len) => { if (rtl) setActive(paper, els[n - 1 - Math.min(len, n - 1)]); else setActive(paper, els); };
      show(prompt);
      focus(0);
      const opts = {
        max: want.length, auto: true,
        onType: (t) => { els.forEach(el => { T(el).textContent = ''; }); [...t].forEach((ch, j) => { if (cellOf(j)) T(cellOf(j)).textContent = ch; }); focus(t.length); },
        onSubmit: (raw) => {
          const t = rtl ? rev(raw) : raw;
          if (t === want) { els.forEach((el, j) => { T(el).textContent = want[j]; }); sfx.pop(2); setActive(paper, null); dev = null; res(); return; }
          els.forEach(el => { T(el).textContent = ''; });
          wrong(els, hintText);
          focus(0);
          pad.want(opts);
        },
      };
      pad.want(opts);
      dev = { ok: () => pad.type(rtl ? rev(want) : want), bad: () => pad.type(rtl ? rev(bump(want)) : bump(want)) };
    });

    /** Chờ em chạm: onTap(el) → true (xong) | false (sai, đã nhắc). */
    const tapWait = (prompt, targets, onTap, devOk, devBad) => new Promise((res) => {
      pad.off();
      setActive(paper, null);
      view.tapOn(targets);
      show(prompt);
      tapHandler = (el) => {
        sfx.tap();
        if (onTap(el)) { tapHandler = null; view.tapOn(null); dev = null; res(); }
      };
      dev = { ok: () => tapHandler?.(devOk()), bad: () => tapHandler?.(devBad()) };
    });

    // ── Đặt tính ──
    async function setup() {
      say(`Em đặt tính rồi tính ${showDec(a)} chia ${showDec(b)}.`, `Chia <b>${showDec(a)} : ${showDec(b)}</b>. Viết số bị chia trước.`);
      const put = (str, name) => Math.max(0, ...[...str].map((ch, i) => flyDigit(ch, view.src(name, i), name === 'D' ? dvd[i] : divCells[i], {
        delay: i * 110, onLand: () => { view.put(name, ch, i); sfx.pop(i); },
      })));
      await sleep(put(P.A, 'D') + 250);
      await rule(view.vRule());
      await sleep(put(P.B, 'd') + 250);
      await rule(view.hRule());
    }

    // ── Chuẩn bị: chia cho số thập phân ──
    async function prep() {
      const decCells = divCells.slice(P.bi.length);
      say(`Số chia ${showDec(b)} là số thập phân. Đếm xem phần thập phân của số chia có mấy chữ số.`,
        `Số chia <b>${showDec(b)}</b>: phần thập phân có mấy chữ số? <b>Chạm từng chữ số</b> sau dấu phẩy.`);
      let counted = 0;
      while (counted < P.k) {
        await tapWait(counted ? `Đếm tiếp: <b>chạm</b> chữ số sau dấu phẩy.` : `<b>Chạm từng chữ số</b> ở phần thập phân của <b>${showDec(b)}</b>.`,
          decCells.filter(x => !x.querySelector('.dd-badge')),
          (el) => {
            const j = +el.dataset.dv;
            if (el.dataset.dv === undefined || j >= P.B.length) return false;
            if (j < P.bi.length) { wrong(el, `${T(el).textContent} ở phần nguyên. Chỉ đếm chữ số bên phải dấu phẩy.`); return false; }
            if (el.querySelector('.dd-badge')) return false;
            counted++;
            view.badge(j, counted);
            return true;
          },
          () => decCells.find(x => !x.querySelector('.dd-badge')), () => divCells[0]);
      }
      say(`Phần thập phân của số chia có ${P.k} chữ số. Bỏ dấu phẩy ở số chia: ${showDec(b)} thành ${d}.`,
        `Có <b>${P.k} chữ số</b>. Bỏ dấu phẩy: <b>${showDec(b)}</b> thành <b>${d}</b>.`);
      await sleep(700);
      view.crossDivisor();
      await sleep(1100);
      if (P.da) {
        say(`Chuyển dấu phẩy của ${showDec(a)} sang bên phải ${P.k} chữ số.${P.grow ? ' Thiếu chữ số thì viết thêm 0.' : ''}`,
          `Chuyển dấu phẩy của <b>${showDec(a)}</b> sang phải <b>${P.k} chữ số</b>: chạm vào dấu phẩy.`);
        for (let h = 0; h < P.k; h++) {
          const pos = view.commaPos;
          await tapWait(h ? `Còn ${P.k - h} chữ số nữa: <b>chạm dấu phẩy</b>.` : `<b>Chạm dấu phẩy</b> để chuyển sang phải một chữ số.`,
            [dvd[pos - 1], dvd[pos]],
            (el) => {
              const c = el.dataset.r === '0' ? +el.dataset.c : -1;
              if (c === pos - 1 || c === pos) return true;
              wrong(el, `Chạm vào dấu phẩy sau chữ số ${T(dvd[pos - 1]).textContent} để chuyển nó sang phải.`);
              return false;
            }, () => dvd[pos], () => divCells[0]);
          pad.off();
          await view.hop();
        }
        view.clearBadges();
        await view.endHop();
      } else {
        say(`Số bị chia ${showDec(a)} là số tự nhiên: viết thêm ${P.k} chữ số 0 vào bên phải ${showDec(a)}.`,
          `Viết thêm <b>${P.k} chữ số 0</b> vào bên phải <b>${showDec(a)}</b>.`);
        for (let h = 0; h < P.grow; h++) {
          const el = dvd[P.A.length + h];
          await typeIn([el], '0', `Viết thêm chữ số <b>0</b> vào ô đang sáng.`, `Viết 0 vào bên phải số bị chia.`);
          el.classList.add('dd-grown');
        }
        view.clearBadges();
      }
      say(`Bây giờ chia ${showDec(P.Dp)} cho ${d} như chia cho số tự nhiên.`, `Chia <b>${showDec(P.Dp)} : ${d}</b> như chia cho số tự nhiên.`);
      await sleep(1600);
    }

    // ── Các bước chia ──
    async function doStep(s) {
      if (s.kind === 'take') {
        await tapWait(`Lấy mấy chữ số để chia cho ${d}? <b>Chạm chữ số cuối</b> của số em lấy.`, dvd,
          (el) => {
            if (el.dataset.r !== '0' || !el.classList.contains('dd-dvd')) return false;
            const c = +el.dataset.c;
            if (c === s.end) return true;
            const val = Number(P.G.slice(0, c + 1));
            if (c < s.end) wrong(el, `${val} bé hơn ${d}, chưa chia được. Lấy ${s.partial} chia ${d}.`);
            else if (c >= P.cp) wrong(el, `Chia phần nguyên trước: lấy ${s.partial}.`);
            else wrong(el, `${s.partial} đã chia được cho ${d}, chỉ lấy ${s.partial}.`);
            return false;
          }, () => dvd[s.end], () => dvd[s.end + 1] || dvd[0]);
        view.taken(s.end);
        show(`Lấy <b>${s.partial}</b> chia ${d}.`);
        await sleep(600);
        return;
      }
      if (s.kind === 'q') {
        const pe = view.partialEls(s);
        const est = d >= 10 && s.partial >= d ? estimate(s.partial, d) : null;
        setUse(paper, [...pe, ...divEls]);
        arrows.draw([{ from: pe, to: divEls, bend: -1 }]);
        await typeIn([qCell(s.qi)], String(s.q), `<b>${s.partial}</b> chia ${d} được mấy?${est ? ` <small class="g3v-est">Nhẩm ${est.a} : ${est.b}</small>` : ''}`, quotientHint(s.partial, d, s.q));
        return;
      }
      if (s.kind === 'rem') {
        const prev = steps[steps.indexOf(s) - 1]; // bước q ngay trước
        const qEl = qCell(prev.qi);
        setUse(paper, [...view.partialEls(prev), qEl, ...divEls]);
        arrows.draw([{ from: qEl, to: divEls }]);
        const els = view.remEls(s);
        const Rs = String(s.r);
        await typeIn(els, Rs, d < 10
          ? `Số dư: <b>${s.partial} − ${s.q} × ${d}</b> bằng mấy?${Rs.length > 1 ? ' Viết từ hàng đơn vị.' : ''}`
          : `${s.q} × ${d} = ${s.p}. Số dư: <b>${s.partial} − ${s.p}</b> bằng mấy?${Rs.length > 1 ? ' Viết từ hàng đơn vị.' : ''}`,
        `${s.q} nhân ${d} bằng ${s.p}; ${s.partial} trừ ${s.p} bằng ${s.r}, viết ${s.r}.`, { rtl: Rs.length > 1 });
        arrows.clear();
        setUse(paper, null);
        return;
      }
      if (s.kind === 'comma') { await commaStep(s); return; }
      if (s.kind === 'down') {
        arrows.clear();
        setUse(paper, null);
        const src = dvd[s.col];
        await tapWait(s.inPlace ? '<b>Lấy thêm</b> chữ số tiếp theo: chạm vào nó.' : '<b>Hạ</b> chữ số tiếp theo xuống: chạm vào nó.', [src],
          (el) => {
            if (el === src) return true;
            if (el.dataset.r === '0' && el.classList.contains('dd-dvd')) wrong(el, `${s.inPlace ? 'Lấy thêm' : 'Hạ'} chữ số ngay sau chỗ vừa chia: ${s.dig}.`);
            return false;
          }, () => src, () => dvd.find(x => x !== src));
        if (s.inPlace) { src.classList.add('dd-taken'); sfx.pop(2); show(`Lấy thêm ${s.dig} được <b>${s.partial}</b>.`); await sleep(500); return; }
        const to = at(s.row, s.col);
        src.classList.add('dd-down');
        await new Promise(res => flyDigit(String(s.dig), src, to, { onLand: () => { T(to).textContent = String(s.dig); to.classList.add('g3d-in'); sfx.pop(2); res(); } }));
        return;
      }
      if (s.kind === 'zero') {
        arrows.clear();
        setUse(paper, null);
        const el = at(s.row, s.col);
        await typeIn([el], '0', `Còn dư <b>${s.from}</b>: viết thêm chữ số <b>0</b> vào bên phải ${s.from}.`, `Viết thêm 0 vào bên phải ${s.from} để được ${s.partial}, rồi chia tiếp.`);
        el.classList.add('dd-zero');
        if (s.inPlace) view.inPlaceComma();
        await sleep(250);
      }
    }

    /** Mốc dấu phẩy: chặn bước hạ / thêm 0 cho tới khi em viết dấu phẩy vào thương. */
    function commaStep(s) {
      arrows.clear();
      setUse(paper, null);
      const qEl = qCell(s.qi);
      const why = s.why === 'digit'
        ? `Khoan! Viết dấu phẩy vào bên phải ${s.lastQ} ở thương trước, rồi mới hạ ${s.dig}.`
        : `Còn dư ${s.r} mà hết chữ số: viết dấu phẩy vào bên phải ${s.lastQ} ở thương trước, rồi mới thêm 0.`;
      const prompt = s.why === 'digit'
        ? `<b>Hết phần nguyên.</b> Trước khi hạ ${s.dig}, em viết gì vào thương?`
        : `Còn dư <b>${s.r}</b>. Muốn chia tiếp, em viết gì vào thương?`;
      return new Promise((res) => {
        const ok = () => {
          tapHandler = null;
          view.slot(s.qi, false);
          commaKey?.classList.remove('dd-key-hot');
          pad.off();
          view.qComma(s.qi);
          setActive(paper, null);
          dev = null;
          say(stepSay(s, d));
          setTimeout(res, 900);
        };
        const opts = {
          max: 1, auto: true,
          onSubmit: (raw) => { if (raw.endsWith(',')) { ok(); return; } wrong(qEl, why); view.slot(s.qi, true); pad.want(opts); },
        };
        show(prompt);
        view.slot(s.qi, true);
        commaKey?.classList.add('dd-key-hot');
        setActive(paper, null);
        pad.want(opts);
        // Chạm ô thương (chỗ dấu phẩy) cũng viết được dấu phẩy; chạm số bị chia để hạ thì bị chặn.
        tapHandler = (el) => {
          if (el === qEl) { sfx.tap(); ok(); return; }
          if (el.dataset.r === '0' && el.classList.contains('dd-dvd')) wrong(el, why);
        };
        dev = { ok: () => pad.type(','), bad: () => tapHandler?.(dvd[Math.min(dvd.length - 1, (steps[steps.indexOf(s) + 1]?.col) ?? 0)]) };
      });
    }

    async function finish() {
      pad.off();
      setActive(paper, null);
      setUse(paper, null);
      arrows.clear();
      view.answer(showDec(S.Q));
      paper.querySelectorAll('.dd-q').forEach((el, j) => { if (j < S.qn) setTimeout(() => el.classList.add('g3d-ok-flash'), j * 80); });
      await sleep(600);
      const ok = P.k ? `${showDec(a)} : ${showDec(b)} = ${showDec(P.Dp)} : ${d} = ${showDec(S.Q)}.` : `${showDec(a)} : ${showDec(b)} = ${showDec(S.Q)}.`;
      done(mistakes, { ok, tip: firstWrong ? `Nhớ: ${firstWrong}` : '' });
    }

    if (import.meta.env.DEV) {
      window.__g3drill = {
        m, steps,
        step: () => { if (tracing) return tracing.finish(); dev?.ok(); },
        wrong: () => dev?.bad(),
      };
    }
    (async () => {
      await setup();
      if (P.k) await prep();
      show(`Chia <b>${showDec(P.Dp)} : ${d}</b>. Chia phần nguyên trước.`);
      await sleep(500);
      for (const s of steps) {
        if (!scene.isConnected) return;
        await doStep(s);
      }
      finish();
    })();
  },
};

// ── Kiểu ──────────────────────────────────────────────────────────────────────────────────────────────
let styled = false;
export function injectDdivStyles() {
  if (styled) return;
  styled = true;
  const st = document.createElement('style');
  st.id = 'dd-styles';
  st.textContent = `
    .dd-host { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .dd-root { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .dd-area { flex: 1; min-height: 0; display: flex; container-type: size; padding: 0.4rem 0.6rem 0.6rem calc(clamp(1.4rem, 4cqi, 3rem) + 0.4rem); }
    .dd-reserve .dd-area { margin-bottom: 22cqh; }
    .dd-grid { --cell: min(calc(100cqi / (var(--cols) + 0.8)), calc(100cqh / (var(--rows) + 0.7)), 170px);
      grid-template-columns: repeat(var(--cols), var(--cell)); grid-template-rows: repeat(var(--rows), var(--cell)); }
    .dd-head .dd-expr { color: #1E293B; white-space: nowrap; }
    .dd-unit { color: #64748B; font-weight: 700; }
    .dd-c { overflow: visible; }
    .dd-t { position: relative; z-index: 1; }
    .dd-q { color: #1D4ED8; }
    .dd-c[data-r]:not([data-r="0"]) .dd-t, .dd-app .dd-t, .dd-zero .dd-t { color: #1D4ED8; }
    .dd-grown .dd-t { color: #1D4ED8; }
    .dd-faded .dd-t { color: #CBD5E1; }
    /* Dấu phẩy gắn vào mép phải ô chữ số đứng trước nó (như viết vở) */
    .dd-cm { position: absolute; right: -0.14em; bottom: 0.04em; font-style: normal; line-height: 1; z-index: 2; pointer-events: none; color: inherit; }
    .dd-cm-q { color: #1D4ED8; }
    .dd-cm-new, .dd-cm-end { color: #1D4ED8; }
    .dd-hide { visibility: hidden; }
    .dd-gone { transition: opacity .5s; opacity: 0; }
    .dd-cm-x::after { content: ''; position: absolute; left: -0.1em; top: 0.6em; width: 0.42em; height: 0.07em; background: #DC2626; border-radius: 0.05em; transform: rotate(-40deg); }
    .dd-flycm { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 900; color: #DC2626; line-height: 1; }
    /* Ô chờ dấu phẩy ở thương */
    .dd-slot { position: absolute; right: -0.22em; bottom: -0.02em; width: 0.34em; height: 0.5em; border: 0.06em dashed #F59E0B; border-radius: 0.1em; background: #FEF3C7; z-index: 2; animation: g3dBlink 1.1s ease-in-out infinite; pointer-events: none; }
    .dd-key-hot { animation: ddKeyHot 1.1s ease-in-out infinite; }
    @keyframes ddKeyHot { 50% { background: #FDE68A; color: #92400E; box-shadow: 0 4px 0 #F59E0B; } }
    /* Ô chờ chạm */
    .dd-tap { cursor: pointer; background: #FEF9C3; box-shadow: inset 0 0 0 3px #FCD34D; border-radius: 0.2em; animation: g3dBlink 1.1s ease-in-out infinite; }
    .dd-taken .dd-t { text-decoration: underline; text-decoration-color: #F59E0B; text-decoration-thickness: 0.08em; text-underline-offset: 0.08em; }
    .dd-down .dd-t { color: #94A3B8; }
    .dd-dvd, .dd-div { cursor: pointer; }
    /* Đếm chữ số phần thập phân của số chia */
    .dd-badge { position: absolute; left: 50%; bottom: -0.95em; margin-left: -0.5em; width: 1em; height: 1em; border-radius: 50%; background: #F97316; color: #fff; font-style: normal;
      font-size: 0.45em; display: grid; place-items: center; z-index: 3; border: 2px solid #fff; box-shadow: 0 2px 0 rgba(0,0,0,0.2); animation: g3dPopIn .35s cubic-bezier(.2,1.5,.4,1); }
    /* Mũi tên đỏ cong: dấu phẩy chuyển chỗ */
    .dd-hop { position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; z-index: 3; }
    .dd-hop path { fill: none; stroke: #DC2626; stroke-width: 3px; vector-effect: non-scaling-stroke; stroke-linecap: round; }
    .dd-hop polygon { fill: #DC2626; }
    .dd-hop-in path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: g3dDraw .5s ease-out forwards; }
    .dd-hop-in polygon { opacity: 0; animation: g3dFade .2s .45s forwards; }
    .g3d-rule.dd-rule-on { transform: none; }
    @media (prefers-reduced-motion: reduce) {
      .dd-slot, .dd-tap, .dd-key-hot { animation: none; }
      .dd-hop-in path { stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0; animation: g3dFade .45s ease forwards; }
    }
  `;
  document.head.appendChild(st);
}
