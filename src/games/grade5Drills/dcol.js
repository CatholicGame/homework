/**
 * ➕ ✖️ Đặt tính số thập phân (Toán 5, Bài 19, 20, 21), như trong vở và đúng quy tắc của sách:
 *
 * Cộng, trừ (DADD_GAME): viết số này dưới số kia sao cho các chữ số cùng hàng thẳng cột và các dấu phẩy thẳng cột
 *   (lưới có riêng một cột dấu phẩy, hẹp). Em bấm chọn cột của chữ số hàng đơn vị số thứ hai (chống lỗi "căn phải"),
 *   kẻ vạch bằng thước, rồi tính như số tự nhiên từ phải sang trái (nhớ, mượn như Luyện Tính lớp 3). Ô phần thập phân
 *   bỏ trống hiện chữ số 0 mờ khi tới cột đó (25,9 − 13,84: coi 25,9 là 25,90). Bước cuối em bấm chỗ viết dấu phẩy ở
 *   tổng / hiệu: phải đúng cột dấu phẩy. Phần nguyên bằng 0 vẫn viết 0 (0,27).
 * Nhân (DMUL_GAME): đặt tính căn phải (chữ số cuối thẳng cột, dấu phẩy không cần thẳng), nhân như số tự nhiên (tích
 *   riêng lùi cột như Luyện Tính lớp 4), rồi em đếm các chữ số ở phần thập phân của hai thừa số (bấm từng chữ số, hiện
 *   1, 2, 3), bấm chỗ đặt dấu phẩy ở tích: dấu phẩy nhảy từ phải sang trái đúng bấy nhiêu chữ số; thiếu chữ số thì
 *   viết thêm 0 (0,2 × 0,3 = 0,06); chữ số 0 ở cuối phần thập phân thì gạch bỏ (10,0 = 10).
 * Sai bước nào: ô rung, thầy nhắc câu của lớp học, em làm lại; lượt đúng khi không phải sửa bước nào.
 * Khung: grade3Drills/kit.js (lớp học, tờ vở, bàn phím có dấu phẩy). Dùng lại ở bài học: grade5Tools/lessons/calc.js
 * (decSheet cho Khám phá, mountMission cho Thực hành).
 */

import { mountDrill, shake, setActive, setUse, arrowLayer, traceRule, popIn, flyDigit, fmt, PLACE, MINUS, fresh, sfx, sleep, how, TEACHER, INK, calmMotion } from '../grade3Drills/kit.js';
import { injectColumnStyles } from '../grade3Drills/column.js';
import { mulSteps } from '../grade4Drills/mul.js';
import { readDec } from '../grade5Tools/num.js';

// ── Số dạng chuỗi "24,5" ────────────────────────────────────────────────────────────────────────────
/** "24,5" → { s, int: '24', dec: '5', dp: 1 }. */
export const num = (s) => { const [int, d = ''] = String(s).split(','); return { s: String(s), int, dec: d, dp: d.length }; };
const valOf = (s) => Number(String(s).replace(',', '.'));
/** Số nguyên n viết với dp chữ số thập phân: sOf(245, 1) = "24,5", sOf(6, 2) = "0,06". */
export const sOf = (n, dp) => {
  if (!dp) return String(n);
  const t = String(n).padStart(dp + 1, '0');
  return `${t.slice(0, -dp)},${t.slice(-dp)}`;
};
/** Bỏ chữ số 0 ở cuối phần thập phân: "10,0" → "10", "3,60" → "3,6". */
export const trimS = (s) => (s.includes(',') ? s.replace(/0+$/, '').replace(/,$/, '') : s);
/** Hiển thị: tách lớp phần nguyên ("1 548,5"). */
export const showS = (s) => { const x = num(s); return fmt(+x.int) + (x.dp ? `,${x.dec}` : ''); };
const PLACE_DEC = ['Hàng phần mười', 'Hàng phần trăm', 'Hàng phần nghìn'];
const NAME = { '+': 'cộng', '-': 'trừ', '*': 'nhân' };
const SIGN = { '+': '+', '-': MINUS, '*': '×' };
const hasDigit = (el) => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());

// ── Các bước cộng, trừ theo cột (vị trí p: 0 = hàng thấp nhất của phần thập phân) ─────────────────────
/**
 * Trả về { steps, R, D }: R = kết quả viết đủ D chữ số thập phân ("28,34", "0,27", "3,60").
 * Bước: { kind: 'digit', p, write, say, faint: [hàng có ô thập phân trống → 0 mờ] } | { kind: 'carry', p, write, say }.
 */
export function addSubSteps(op, A, B) {
  const D = Math.max(A.dp, B.dp);
  const digitAt = (X, p) => {
    if (p < D) { const k = D - 1 - p; return k < X.dp ? { d: +X.dec[k] } : { d: 0, empty: true }; }
    const q = p - D;
    return q < X.int.length ? { d: +X.int[X.int.length - 1 - q] } : null;
  };
  const top = D + Math.max(A.int.length, B.int.length) - 1;
  const steps = [];
  let carry = 0;
  for (let p = 0; p <= top; p++) {
    const ai = digitAt(A, p), bi = digitAt(B, p);
    const x = ai?.d ?? 0, y = bi?.d ?? 0;
    const faint = [ai?.empty && 1, bi?.empty && 2].filter(Boolean);
    const aReal = ai && !ai.empty, bReal = bi && !bi.empty;
    const last = p === top;
    let write, nc = 0, say;
    if (op === '+') {
      const s = x + y + carry;
      write = last ? String(s) : String(s % 10);
      nc = last ? 0 : (s >= 10 ? 1 : 0);
      const solo = aReal && !bReal ? x : !aReal && bReal ? y : null;
      if (solo != null) say = carry ? `${solo} thêm 1 bằng ${s}, viết ${write}${nc ? ', nhớ 1' : ''}.` : `Hạ ${solo}, viết ${write}.`;
      else say = `${x} cộng ${y} bằng ${x + y}${carry ? `, thêm 1 bằng ${s}` : ''}, viết ${write}${nc ? ', nhớ 1' : ''}.`;
    } else {
      const sub = y + carry;
      const d = x < sub ? x + 10 - sub : x - sub;
      nc = x < sub ? 1 : 0;
      write = String(d);
      if (!bReal && !carry) say = `Hạ ${x}, viết ${x}.`;
      else {
        const pre = carry && bReal ? `${y} thêm 1 bằng ${sub}. ` : '';
        say = pre + (nc ? `${x} không trừ được ${sub}, lấy 1${x} trừ ${sub} bằng ${d}, viết ${d}, nhớ 1.` : `${x} trừ ${sub} bằng ${d}, viết ${d}.`);
      }
    }
    steps.push({ kind: 'digit', p, write, say, faint });
    if (nc) steps.push({ kind: 'carry', p: p + 1, write: String(nc), say });
    carry = nc;
  }
  const sc = 10 ** D;
  const ri = Math.round(valOf(A.s) * sc) + (op === '+' ? 1 : -1) * Math.round(valOf(B.s) * sc);
  return { steps, R: sOf(ri, D), D };
}

/** Phép trừ không để chữ số 0 vô nghĩa ở đầu phần nguyên (52,3 − 48,7: chỉ cho khi số bị trừ có phần nguyên một chữ số). */
export function validSub(a, b) {
  const A = num(a), B = num(b);
  if (valOf(a) <= valOf(b)) return false;
  const { R } = addSubSteps('-', A, B);
  return A.int.length === 1 || num(R).int.length === A.int.length;
}

// ── Tờ vở: lưới đặt tính (dùng chung cho Luyện Tính và Khám phá) ───────────────────────────────────────
const cellSize = (weff, rowsH, explore) => (explore === 'full'
  ? `min(calc((100cqi - 4rem) / ${weff + 0.8}), calc((100cqh - 6rem) / ${rowsH}), 190px)`
  : explore
  ? `min(calc((100cqi - 4rem) / ${weff + 0.8}), calc((80cqh - 5.5rem) / ${rowsH}), 190px)`
  : `min(calc((100cqi - 4.5rem) / ${weff + 0.8}), calc((100cqh - 6.5rem) / ${rowsH}), 220px)`);

/** Chữ số của đề, mỗi chữ số / dấu phẩy một thẻ để bay xuống lưới (data-d = "a3", "acm"). */
function numSpans(X, name, D) {
  const out = [];
  [...X.int].forEach((ch, idx) => out.push(`<span data-d="${name}${D + X.int.length - 1 - idx}">${ch}</span>`));
  if (X.dp) {
    out.push(`<span data-d="${name}cm">,</span>`);
    [...X.dec].forEach((ch, k) => out.push(`<span data-d="${name}${D - 1 - k}">${ch}</span>`));
  }
  return out.join('');
}
const headHtml = (m, A, B, Da, Db) => `<div class="g3c-head"><span>Đặt tính rồi tính:</span> <b class="g3c-expr">${numSpans(A, 'a', Da)} <span data-d="op">${SIGN[m.op]}</span> ${numSpans(B, 'b', Db)}</b> <b class="g3c-eq">= <span class="g3c-ans">?</span></b></div>`;

/** Một chữ số mờ bật ra (chữ số 0 giữ chỗ, chữ số 0 thêm vào tích). */
function popDigit(el, ch, cls) {
  el.prepend(ch);
  if (cls) el.classList.add(cls);
  el.classList.remove('g3d-popin');
  void el.offsetWidth;
  el.classList.add('g3d-popin');
}

/** Vạch kẻ tự chạy (Khám phá: thầy kẻ). */
function autoRule(grid, row) {
  grid.insertAdjacentHTML('beforeend', `<div class="g3d-rule" style="grid-row:${row + 1} / span 1;grid-column:1 / -1"></div>`);
  const line = grid.lastElementChild;
  line.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: calmMotion() ? 600 : 450, easing: 'ease-out', fill: 'forwards' });
  sfx.pop(2);
  return 500;
}

/**
 * Lưới đặt tính cho đề m = { op, a, b } (chuỗi). Trả về { html, bind(root) → S } với S là các thao tác vẽ (không chấm).
 * explore: cỡ ô chừa đáy tờ giấy cho nút chọn của Khám phá ('full': không có nút chọn, dùng hết chiều cao).
 */
export function decSheet(m, { explore = false } = {}) {
  return m.op === '*' ? mulSheet(m, explore) : addSheet(m, explore);
}

function addSheet(m, explore) {
  const { op } = m;
  const A = num(m.a), B = num(m.b);
  const { steps, R, D } = addSubSteps(op, A, B);
  const RN = num(R);
  const I = Math.max(A.int.length, B.int.length, RN.int.length);
  const CC = I + 2; // cột dấu phẩy
  const colOf = (p) => (p >= D ? I + 1 - (p - D) : I + 3 + (D - 1 - p));
  const NP = I + D;
  const cells = [];
  const cell = (row, c, cls = '') => cells.push(`<div class="g3d-c ${cls}" style="grid-row:${row + 1};grid-column:${c}" data-r="${row}" data-c="${c}"></div>`);
  for (let p = 0; p < NP; p++) {
    cell(0, colOf(p), 'g3c-carry');
    cell(1, colOf(p), 'g3c-a dcol-ln');
    cell(2, colOf(p), 'g3c-b dcol-ln');
    cell(3, colOf(p), 'g3c-res g3d-in dcol-ln');
  }
  for (const r of [1, 2, 3]) cell(r, CC, `dcol-cm${r === 3 ? ' g3d-in' : ''}`);
  cell(2, 1, 'g3c-sign');
  const html = `${headHtml(m, A, B, D, D)}
    <div class="g3d-grid g3c-grid dcol-g" style="--cell:${cellSize(I + D + 1.5, 3.9, explore)};grid-template-columns:var(--cell) repeat(${I}, var(--cell)) calc(var(--cell) * 0.5) repeat(${D}, var(--cell));grid-template-rows:calc(var(--cell) * 0.55) repeat(3, var(--cell))">${cells.join('')}</div>`;

  function bind(root) {
    injectColumnStyles();
    injectStyles();
    const grid = root.querySelector('.dcol-g');
    const at = (row, p) => grid.querySelector(`[data-r="${row}"][data-c="${colOf(p)}"]`);
    const cm = (row) => grid.querySelector(`[data-r="${row}"][data-c="${CC}"]`);
    const src = (k) => root.querySelector(`[data-d="${k}"]`);
    const X = { a: A, b: B };
    const borrowEl = (p) => {
      const host = at(2, p);
      let s = host.querySelector('.g3c-borrow');
      if (!s) { s = document.createElement('span'); s.className = 'g3c-borrow'; host.appendChild(s); }
      return s;
    };
    const carryEl = (p) => (op === '-' ? borrowEl(p) : at(0, p));
    const S = {
      grid, at, cm, steps, R, D, A, B, op, carryEl,
      onesCell: (row) => at(row, D),
      /** Số `name` ('a' | 'b') bay từ đề xuống hàng `row`, dấu phẩy vào cột dấu phẩy. Trả về thời gian bay (ms). */
      putNum(name, row) {
        const N = X[name];
        const list = [...N.int].map((ch, idx) => ({ ch, key: `${name}${D + N.int.length - 1 - idx}`, el: at(row, D + N.int.length - 1 - idx) }));
        if (N.dp) {
          list.push({ ch: ',', key: `${name}cm`, el: cm(row) });
          [...N.dec].forEach((ch, k) => list.push({ ch, key: `${name}${D - 1 - k}`, el: at(row, D - 1 - k) }));
        }
        return Math.max(...list.map((it, j) => flyDigit(it.ch, src(it.key), it.el, {
          delay: j * 110, onLand: () => { it.el.prepend(it.ch); sfx.pop(j); },
        })));
      },
      putSign() {
        const el = grid.querySelector('[data-r="2"][data-c="1"]');
        return flyDigit(SIGN[op], src('op'), el, { onLand: () => { el.textContent = SIGN[op]; sfx.pop(3); } });
      },
      /** Ô thập phân để trống của cột đang tính: hiện 0 mờ (số tự nhiên: cả dấu phẩy mờ). */
      faint(s) {
        for (const r of s.faint || []) {
          const el = at(r, s.p);
          if (!hasDigit(el)) popDigit(el, '0', 'dcol-faint');
          const c = cm(r);
          if (!X[r === 1 ? 'a' : 'b'].dp && !c.textContent) popDigit(c, ',', 'dcol-faint');
        }
      },
      /** Các ô phần thập phân còn trống (0 mờ hiện ngay, Khám phá "coi 25,9 là 25,90"). */
      faintAll() { steps.forEach(s => s.kind === 'digit' && S.faint(s)); },
      emptyCells() { return steps.filter(s => s.kind === 'digit' && s.faint.length).flatMap(s => s.faint.map(r => at(r, s.p))); },
      digitEls(s) { return Array.from({ length: s.write.length }, (_, j) => at(3, s.p + s.write.length - 1 - j)); },
      use(s, withCarry) {
        const A1 = at(1, s.p), B1 = at(2, s.p);
        setUse(grid, [hasDigit(A1) && A1, hasDigit(B1) && B1, withCarry && carryEl(s.p)]);
      },
      write(s) { S.digitEls(s).forEach((el, j) => { el.textContent = s.write[j]; }); sfx.pop(s.p % 6); },
      /** Số nhớ bay từ chữ số vừa viết tới chỗ nhớ (cộng: trên đầu cột trái; trừ: cạnh chữ số số trừ cột trái). */
      carry(s) {
        const el = carryEl(s.p);
        el.textContent = '';
        return new Promise(res => {
          const ms = flyDigit(s.write, at(3, s.p - 1), el, { onLand: () => { el.textContent = s.write; res(); } });
          if (!ms) res();
        });
      },
      putComma() {
        popIn(cm(3), ',');
        [1, 2, 3].forEach((r, j) => setTimeout(() => cm(r).classList.add('dcol-colok'), j * 120));
      },
      rule: () => autoRule(grid, 2),
      /** Kết quả cuối có chữ số 0 ở cuối phần thập phân: gạch mờ. Trả về chuỗi gọn. */
      dropZeros() { return dropZeros(R, (k) => at(3, k), cm(3)); },
    };
    return S;
  }
  return { html, bind, steps, R };
}

function dropZeros(full, cellAtPlace, commaEl) {
  const x = num(full);
  const short = trimS(full);
  const tz = x.dp - num(short).dp;
  for (let k = 0; k < tz; k++) cellAtPlace(k)?.classList.add('dcol-drop');
  if (tz && tz === x.dp) commaEl?.classList.add('dcol-drop');
  return short;
}

function mulSheet(m, explore) {
  const A = num(m.a), B = num(m.b);
  const dispA = A.int + A.dec, dispB = B.int + B.dec;
  const Ai = Number(dispA), Bi = Number(dispB);
  const { steps, parts } = mulSteps(Ai, Bi);
  const nb = String(Bi).length, multi = nb > 1;
  const P = Ai * Bi, PS = String(P);
  const N = A.dp + B.dp;
  const L = Math.max(dispA.length, dispB.length, ...parts.map((p, j) => String(p).length + j), PS.length, N + 1);
  const W = L + 1;
  const partRow = (j) => 3 + j;
  const resRow = multi ? 3 + nb : 3;
  const rowsN = resRow + 1;
  const col = (i) => W - i;
  const cells = [];
  const cell = (row, c, cls = '') => cells.push(`<div class="g3d-c ${cls}" style="grid-row:${row + 1};grid-column:${c}" data-r="${row}" data-c="${c}"></div>`);
  for (let i = 0; i < L; i++) {
    cell(0, col(i), 'g3c-carry');
    cell(1, col(i), 'g3c-a');
    cell(2, col(i), 'g3c-b');
    if (multi) parts.forEach((_, j) => cell(partRow(j), col(i), 'g4m-part g3d-in'));
    cell(resRow, col(i), 'g3c-res g3d-in');
  }
  cell(2, 1, 'g3c-sign');
  if (multi) cell(partRow(nb - 1), 1, 'g3c-sign');
  // Hai số căn phải: chữ số cuối thẳng cột → vị trí của mỗi chữ số tính từ phải (0 = chữ số cuối), không theo hàng.
  const html = `${headHtml(m, A, B, A.dp, B.dp)}
    <div class="g3d-grid g3c-grid dcol-mg" style="--cell:${cellSize(W, rowsN - 0.05, explore)};grid-template-columns:repeat(${W}, var(--cell));grid-template-rows:calc(var(--cell) * 0.55) repeat(${rowsN - 1}, var(--cell))">${cells.join('')}</div>`;

  function bind(root) {
    injectColumnStyles();
    injectStyles();
    const grid = root.querySelector('.dcol-mg');
    const at = (row, i) => grid.querySelector(`[data-r="${row}"][data-c="${col(i)}"]`);
    const signAt = (row) => grid.querySelector(`[data-r="${row}"][data-c="1"]`);
    const src = (k) => root.querySelector(`[data-d="${k}"]`);
    const X = { a: A, b: B };
    let phase = 0;
    const S = {
      grid, at, signAt, steps, parts, nb, multi, partRow, resRow, N, P, PS, A, B, Ai, Bi, L,
      /** Thừa số bay xuống hàng `row`, căn phải; dấu phẩy viết sát sau chữ số hàng đơn vị của nó. */
      putNum(name, row) {
        const Xn = X[name];
        const list = [...Xn.int].map((ch, idx) => ({ ch, key: `${name}${Xn.dp + Xn.int.length - 1 - idx}`, el: at(row, Xn.dp + Xn.int.length - 1 - idx) }));
        if (Xn.dp) {
          list.push({ ch: ',', key: `${name}cm`, el: at(row, Xn.dp), comma: true });
          [...Xn.dec].forEach((ch, k) => list.push({ ch, key: `${name}${Xn.dp - 1 - k}`, el: at(row, Xn.dp - 1 - k) }));
        }
        return Math.max(...list.map((it, j) => flyDigit(it.ch, src(it.key), it.el, {
          delay: j * 110,
          onLand: () => {
            if (it.comma) it.el.insertAdjacentHTML('beforeend', '<span class="dcol-cmk">,</span>');
            else it.el.prepend(it.ch);
            sfx.pop(j);
          },
        })));
      },
      putSign() {
        const el = signAt(2);
        return flyDigit('×', src('op'), el, { onLand: () => { el.textContent = '×'; sfx.pop(3); } });
      },
      clearCarries() { phase++; grid.querySelectorAll('[data-r="0"]').forEach(el => { el.textContent = ''; }); },
      /** Ô của một bước (trái → phải) và có phải ô số nhớ không. */
      target(s) {
        if (s.kind === 'digit') {
          const n = s.write.length, row = multi ? partRow(s.j) : resRow;
          return { els: Array.from({ length: n }, (_, t) => at(row, s.i + s.j + n - 1 - t)), carry: false };
        }
        if (s.kind === 'carry') return { els: [at(0, s.i + s.j)], carry: true };
        if (s.kind === 'sum') {
          const n = s.write.length;
          return { els: Array.from({ length: n }, (_, t) => at(resRow, s.i + n - 1 - t)), carry: false };
        }
        return { els: [at(0, s.i)], carry: true }; // scarry
      },
      /** Viết kết quả đúng của bước (số nhớ bay từ chữ số vừa viết lên). */
      write(s) {
        const { els, carry } = S.target(s);
        if (carry) {
          const src2 = s.kind === 'carry' ? (multi ? at(partRow(s.j), s.i + s.j - 1) : at(resRow, s.i - 1)) : at(resRow, s.i - 1);
          const ph = phase;
          els[0].textContent = '';
          flyDigit(s.write, src2, els[0], { onLand: () => { if (ph === phase) els[0].textContent = s.write; } });
        } else els.forEach((el, j) => { el.textContent = s.write[j]; });
        sfx.pop(1);
      },
      /** Cả một tích riêng (Khám phá: thầy viết nhanh). */
      writePart(j) {
        const row = multi ? partRow(j) : resRow;
        const ds = String(parts[j]);
        [...ds].forEach((ch, t) => setTimeout(() => { popDigit(at(row, j + ds.length - 1 - t), ch); sfx.pop(t); }, t * 140));
        return ds.length * 140 + 200;
      },
      writeSum() {
        [...PS].forEach((ch, t) => setTimeout(() => { popDigit(at(resRow, PS.length - 1 - t), ch); sfx.pop(t); }, t * 140));
        return PS.length * 140 + 200;
      },
      skipMarks(j) { for (let t = 0; t < j; t++) at(partRow(j), t).classList.add('g4m-skip'); },
      plus(j) { popIn(signAt(partRow(j)), '+'); },
      rule: (row) => autoRule(grid, row),
      /** Các chữ số ở phần thập phân của hai thừa số (để đếm) và các chữ số còn lại. */
      decCells() {
        return [...Array.from({ length: A.dp }, (_, k) => at(1, A.dp - 1 - k)), ...Array.from({ length: B.dp }, (_, k) => at(2, B.dp - 1 - k))];
      },
      intCells() {
        const out = [];
        for (let i = A.dp; i < dispA.length; i++) out.push(at(1, i));
        for (let i = B.dp; i < dispB.length; i++) out.push(at(2, i));
        return out;
      },
      badge(el, n) { el.insertAdjacentHTML('beforeend', `<span class="dcol-badge">${n}</span>`); sfx.pop(n); },
      /** Chỗ đặt dấu phẩy ở tích: khe giữa hai ô (k = số chữ số tính từ phải). */
      gaps() {
        const out = [];
        for (let k = 1; k < L; k++) {
          const host = at(resRow, k);
          let g = host.querySelector('.dcol-gap');
          if (!g) { g = document.createElement('span'); g.className = 'dcol-gap'; g.dataset.k = k; host.appendChild(g); }
          out.push(g);
        }
        return out;
      },
      clearGaps() { grid.querySelectorAll('.dcol-gap').forEach(g => g.remove()); },
      /** Dấu phẩy nhảy từ bên phải tích sang trái N chữ số; thiếu chữ số thì viết thêm 0. Trả về Promise. */
      async hop() {
        const calm = calmMotion();
        const g = grid.getBoundingClientRect();
        const cellW = at(resRow, 0).offsetWidth;
        const xOf = (k) => at(resRow, k).getBoundingClientRect().right - g.left;
        const y = at(resRow, 0).getBoundingClientRect().bottom - g.top - cellW * 0.42;
        const el = document.createElement('div');
        el.className = 'dcol-hopc';
        el.textContent = ',';
        grid.appendChild(el);
        const pos = (x, dy = 0) => `translate(${x}px, ${y + dy}px) translate(-50%, -50%)`;
        el.style.transform = pos(xOf(0));
        await sleep(250);
        for (let k = 1; k <= N; k++) {
          const x0 = xOf(k - 1), x1 = xOf(k);
          const frames = calm ? [{ transform: pos(x0), opacity: 1 }, { transform: pos((x0 + x1) / 2), opacity: 0.4 }, { transform: pos(x1), opacity: 1 }]
            : [{ transform: pos(x0) }, { transform: pos((x0 + x1) / 2, -cellW * 0.7) }, { transform: pos(x1) }];
          const an = el.animate(frames, { duration: calm ? 520 : 380, easing: 'ease-in-out', fill: 'forwards' });
          await an.finished.catch(() => {});
          el.style.transform = pos(x1);
          const c = at(resRow, k - 1);
          if (!hasDigit(c)) popDigit(c, '0', 'dcol-zero');
          c.insertAdjacentHTML('beforeend', `<span class="dcol-hopn">${k}</span>`);
          sfx.pop(k);
          await sleep(calm ? 200 : 120);
        }
        el.remove();
        const host = at(resRow, N);
        if (!hasDigit(host)) { popDigit(host, '0', 'dcol-zero'); await sleep(300); }
        host.insertAdjacentHTML('beforeend', '<span class="dcol-cmk dcol-cmk-new">,</span>');
        sfx.ding();
      },
      /** Tích đầy đủ (chuỗi), vd. "0,06", "10,0". */
      full: sOf(P, N),
      dropZeros() { return dropZeros(sOf(P, N), (k) => at(resRow, k), at(resRow, N).querySelector('.dcol-cmk')); },
    };
    return S;
  }
  return { html, bind, steps, parts, N, full: sOf(P, N) };
}

// ── Chọn ô trên tờ vở bằng cách bấm ──────────────────────────────────────────────────────────────────
/** Đánh dấu các ô có thể bấm; bấm đúng `right` thì xong (Promise), bấm ô khác thì onWrong(el). */
function pickOne(cands, right, onWrong) {
  return new Promise((res) => {
    const off = () => cands.forEach(x => { x.classList.remove('dcol-pick'); x.removeEventListener('click', h); });
    function h(e) {
      e.stopPropagation();
      const el = e.currentTarget;
      if (el === right) { off(); sfx.tap(); res(); } else { shake(el); onWrong(el); }
    }
    cands.forEach(el => { el.classList.add('dcol-pick'); el.addEventListener('click', h); });
  });
}

// ── Cộng, trừ ─────────────────────────────────────────────────────────────────────────────────────────
function mountAddSub(stage, m, api) {
  const { op } = m;
  const sheet = decSheet(m);
  const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board: sheet.html, cls: 'g3c-scene dcol-scene', comma: true });
  const S = sheet.bind(paper);
  const { steps, R, A, B, grid } = S;
  const word = op === '+' ? 'tổng' : 'hiệu';
  const RULE = op === '+'
    ? 'Viết dấu phẩy ở tổng thẳng cột với các dấu phẩy ở hai số hạng.'
    : 'Viết dấu phẩy ở hiệu thẳng cột với dấu phẩy của số bị trừ và số trừ.';
  const ALIGN = `Viết các chữ số cùng hàng thẳng cột: hàng đơn vị dưới hàng đơn vị, dấu phẩy dưới dấu phẩy.`;
  let phase = 'busy';
  let tracing = null, mistakes = 0, firstWrong = null, k = -1;
  let rightEl = null, wrongEl = null;
  const miss = (text) => { mistakes++; firstWrong ??= text; };

  async function start() {
    say(`Em đặt tính rồi tính ${readDec(m.a)} ${NAME[op]} ${readDec(m.b)}. Các dấu phẩy phải thẳng cột.`,
      'Viết các số <b>thẳng cột</b>, <b>dấu phẩy thẳng dấu phẩy</b>…');
    await sleep(S.putNum('a', 1) + 150);
    await sleep(S.putSign() + 150);
    // Em chọn cột cho chữ số hàng đơn vị của số thứ hai (lỗi hay gặp: căn phải như số tự nhiên).
    phase = 'place';
    const ones = B.int[B.int.length - 1];
    show(`Viết <b>${showS(m.b)}</b> dưới ${showS(m.a)}: chữ số hàng đơn vị <b>${ones}</b> viết ở ô nào? Bấm vào ô.`);
    const cands = [...grid.querySelectorAll('[data-r="2"]')].filter(el => +el.dataset.c > 1);
    rightEl = S.onesCell(2);
    wrongEl = cands[cands.length - 1] === rightEl ? cands[0] : cands[cands.length - 1];
    let told = false;
    await pickOne(cands, rightEl, () => {
      if (!told) { miss(ALIGN); told = true; } else mistakes++;
      hint(`${ALIGN}`, `Chữ số hàng đơn vị <b>${ones}</b> thẳng cột với chữ số hàng đơn vị <b>${A.int[A.int.length - 1]}</b> của ${showS(m.a)}, dấu phẩy dưới dấu phẩy.`);
    });
    phase = 'busy';
    await sleep(S.putNum('b', 2) + 200);
    phase = 'trace';
    tracing = traceRule(grid, 2, { say, show, hint });
    await tracing.done;
    tracing = null;
    phase = 'busy';
    show('Tính như số tự nhiên, <b>từ phải sang trái</b>.');
    await sleep(700);
    next();
  }

  function next() {
    k++;
    if (k >= steps.length) return commaStep();
    const s = steps[k];
    if (s.kind === 'digit') {
      S.faint(s);
      const els = S.digitEls(s);
      setActive(paper, els);
      S.use(s, steps[k - 1]?.kind === 'carry');
      const name = s.p >= S.D ? PLACE[s.p - S.D] : PLACE_DEC[S.D - 1 - s.p];
      show(`<b>${name}</b>: viết ${els.length > 1 ? 'số' : 'chữ số'} nào?`);
      want(els, false);
    } else {
      const el = S.carryEl(s.p);
      setUse(grid, null);
      setActive(paper, el);
      show('Nhớ mấy? Viết số nhớ nhỏ ở cột bên trái.');
      want([el], true);
    }
    phase = 'pad';
  }

  function want(els, isCarry) {
    pad.want({
      max: els.length, auto: true,
      onType: isCarry ? () => {} : (t) => els.forEach((el, j) => { el.textContent = (t[j] || '').replace(',', ''); }),
      onSubmit: (t) => check(t, els, isCarry),
    });
  }

  function check(t, els, isCarry) {
    const s = steps[k];
    if (t.includes(',')) { // dấu phẩy viết sau cùng, không tính là sai
      if (!isCarry) els.forEach(el => { el.textContent = ''; });
      hint('Bước này viết chữ số. Dấu phẩy viết sau cùng.', 'Bước này viết <b>chữ số</b>. Dấu phẩy viết sau cùng.');
      want(els, isCarry);
      return;
    }
    if (t === s.write) {
      phase = 'busy';
      if (isCarry) S.carry(s);
      else els.forEach((el, j) => { el.textContent = t[j]; });
      sfx.pop(k % 6);
      setActive(paper, null);
      next();
      return;
    }
    miss(s.say);
    if (!isCarry) els.forEach(el => { el.textContent = ''; });
    shake(els);
    hint(s.say);
    want(els, isCarry);
  }

  async function commaStep() {
    pad.off();
    setActive(paper, null);
    setUse(grid, null);
    await sleep(350);
    phase = 'comma';
    say(`Bây giờ viết dấu phẩy ở ${word}.`, `Viết <b>dấu phẩy</b> ở ${word}: bấm vào chỗ viết dấu phẩy.`);
    const cands = [...grid.querySelectorAll('[data-r="3"]')];
    rightEl = S.cm(3);
    wrongEl = S.at(3, 0);
    let told = false;
    await pickOne(cands, rightEl, () => {
      if (!told) { miss(RULE); told = true; } else mistakes++;
      hint(RULE);
    });
    phase = 'busy';
    S.putComma();
    await sleep(700);
    finish();
  }

  async function finish() {
    const short = S.dropZeros();
    if (short !== R) {
      say(`${readDec(R)} bằng ${readDec(short)}. Chữ số 0 ở cuối phần thập phân có thể bỏ đi.`, `<b>${showS(R)} = ${showS(short)}</b>: bỏ chữ số 0 ở cuối phần thập phân.`);
      await sleep(1800);
    }
    paper.querySelector('.g3c-ans').textContent = showS(short);
    paper.querySelector('.g3c-eq').classList.add('g3c-eq-done');
    grid.querySelectorAll('[data-r="3"]').forEach((el, j) => setTimeout(() => el.classList.add('g3d-ok-flash'), j * 70));
    await sleep(500);
    done(mistakes, { ok: `${showS(m.a)} ${SIGN[op]} ${showS(m.b)} = ${showS(short)}.`, tip: firstWrong ? `Nhớ: ${firstWrong}` : '' });
  }

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m, steps, phase: () => phase,
      step() {
        if (phase === 'trace' && tracing) tracing.finish();
        else if ((phase === 'place' || phase === 'comma') && rightEl) rightEl.click();
        else if (phase === 'pad') pad.type(steps[k]?.write ?? '');
      },
      wrong() {
        if ((phase === 'place' || phase === 'comma') && wrongEl) wrongEl.click();
        else if (phase === 'pad') pad.type([...(steps[k]?.write ?? '')].map(c => (Number(c) + 1) % 10).join(''));
      },
    };
  }
  start();
}

// ── Nhân ──────────────────────────────────────────────────────────────────────────────────────────────
const ORD = ['thứ nhất', 'thứ hai', 'thứ ba'];

function mountMul(stage, m, api) {
  const sheet = decSheet(m);
  const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board: sheet.html, cls: 'g3c-scene dcol-scene', comma: true });
  const S = sheet.bind(paper);
  const { steps, parts, nb, multi, partRow, resRow, at, signAt, grid, A, B, N, Ai, Bi } = S;
  const arrows = arrowLayer(grid);
  const focus = (ai, j, { carry = null, arrow = false } = {}) => {
    setUse(paper, [j != null && at(2, j), ai != null && at(1, ai), carry]);
    if (arrow) arrows.draw([{ from: at(2, j), to: at(1, ai) }]);
    else arrows.clear();
  };
  const COUNT_RULE = 'Chỉ đếm các chữ số ở phần thập phân, bên phải dấu phẩy, của cả hai thừa số.';
  const HOP_RULE = `Phần thập phân của hai thừa số có tất cả ${N} chữ số, ta dùng dấu phẩy tách ở tích ra ${N} chữ số kể từ phải sang trái.`;
  let phase = 'busy';
  let tracing = null, mistakes = 0, firstWrong = null, k = -1;
  let rightEl = null, wrongEl = null, countLeft = [];
  const miss = (text) => { mistakes++; firstWrong ??= text; };
  const rule = async (row) => {
    pad.off();
    setActive(paper, null);
    phase = 'trace';
    tracing = traceRule(grid, row, { say, show, hint });
    await tracing.done;
    tracing = null;
    phase = 'busy';
  };

  async function start() {
    say(`Em đặt tính rồi tính ${readDec(m.a)} nhân ${readDec(m.b)}. Đặt tính như nhân số tự nhiên: các chữ số cuối thẳng cột.`,
      'Viết các số <b>thẳng cột bên phải</b> (chữ số cuối dưới chữ số cuối)…');
    await sleep(S.putNum('a', 1) + 150);
    await sleep(S.putSign() + 150);
    await sleep(S.putNum('b', 2) + 200);
    await rule(2);
    show(`Nhân như nhân hai số tự nhiên <b>${fmt(Ai)} × ${fmt(Bi)}</b>, chưa cần để ý dấu phẩy.`);
    await sleep(1300);
    next();
  }

  async function startPart(s) {
    if (!s.j) {
      show(`Tích riêng ${ORD[0]}: nhân <b>${s.bj}</b> với ${fmt(Ai)}.`);
      setTimeout(next, 900);
      return;
    }
    pad.off();
    setActive(paper, null);
    const row = partRow(s.j);
    show(`Tích riêng ${ORD[s.j]}: nhân <b>${s.bj}</b> với ${fmt(Ai)}. Viết <b>lùi sang trái ${s.j} cột</b>.`);
    for (let t = 0; t < s.j; t++) {
      await sleep(t ? 250 : 350);
      at(row, t).classList.add('g4m-skip');
      sfx.pop(t);
    }
    arrows.draw([{ from: at(row, 0), to: at(row, s.j) }]);
    await sleep(1500);
    arrows.clear();
    if (s.j === nb - 1) {
      show(`${nb === 2 ? 'Hai' : 'Các'} tích riêng sẽ <b>cộng</b> lại: viết dấu <b>+</b>.`);
      S.plus(s.j);
      await sleep(900);
      await rule(row);
    }
    focus(null, s.j);
    next();
  }

  function next() {
    k++;
    const s = steps[k];
    if (!s) return countStep();
    if (s.kind === 'part') {
      S.clearCarries();
      focus(null, s.j);
      if (multi) startPart(s);
      else next();
      return;
    }
    if (s.kind === 'add') {
      S.clearCarries();
      focus(null, null);
      grid.querySelectorAll('.g4m-part').forEach(el => el.classList.add('g4m-sumrow'));
      show('Cộng các tích riêng, từ phải sang trái.');
      setTimeout(next, 900);
      return;
    }
    const { els, carry } = S.target(s);
    const prev = steps[k - 1];
    const cWrite = (s.kind === 'digit' && prev?.kind === 'carry') || (s.kind === 'sum' && prev?.kind === 'scarry') ? prev.write : '';
    const cIn = cWrite ? at(0, s.kind === 'digit' ? s.i + s.j : s.i) : null;
    if (s.kind === 'digit') focus(s.i, multi ? s.j : 0, { carry: cIn, arrow: true });
    else if (s.kind === 'carry') focus(s.i - 1, multi ? s.j : 0);
    else if (s.kind === 'sum') setUse(paper, [...parts.map((_, j) => at(partRow(j), s.i)).filter(el => el && hasDigit(el)), cIn]);
    setActive(paper, els);
    if (carry) show('Nhớ mấy? Viết số nhớ nhỏ ở cột bên trái.');
    else if (s.kind === 'digit') show(`<b>${s.bj} × ${s.ai}</b>${cIn ? `, thêm nhớ <b>${cWrite}</b>` : ''}: viết ${els.length > 1 ? 'số' : 'chữ số'} nào?`);
    else show(`Cộng cột thứ <b>${s.i + 1}</b> từ phải sang: viết ${els.length > 1 ? 'số' : 'chữ số'} nào?`);
    want(els, carry);
    phase = 'pad';
  }

  function want(els, carry) {
    pad.want({
      max: els.length, auto: true,
      onType: carry ? () => {} : (t) => els.forEach((el, j) => { el.textContent = (t[j] || '').replace(',', ''); }),
      onSubmit: (t) => check(t, els, carry),
    });
  }

  function check(t, els, carry) {
    const s = steps[k];
    if (t.includes(',')) {
      if (!carry) els.forEach(el => { el.textContent = ''; });
      hint('Nhân như số tự nhiên trước. Dấu phẩy viết sau cùng.', 'Nhân như số tự nhiên trước. <b>Dấu phẩy viết sau cùng.</b>');
      want(els, carry);
      return;
    }
    if (t === s.write) {
      phase = 'busy';
      S.write(s);
      sfx.pop(k % 6);
      setActive(paper, null);
      next();
      return;
    }
    miss(s.say);
    if (!carry) els.forEach(el => { el.textContent = ''; });
    shake(els);
    const shift = multi && s.kind === 'digit' && s.i === 0 && s.j ? ` Tích riêng ${ORD[s.j]} viết lùi sang trái ${s.j} cột.` : '';
    hint(s.say + shift);
    want(els, carry);
  }

  /** Em bấm từng chữ số ở phần thập phân của hai thừa số: hiện số đếm 1, 2, 3. */
  async function countStep() {
    pad.off();
    setActive(paper, null);
    focus(null, null);
    S.clearCarries();
    await sleep(400);
    say(`Được ${fmt(S.P)}. Bây giờ đếm các chữ số ở phần thập phân của hai thừa số.`,
      `${fmt(Ai)} × ${fmt(Bi)} = <b>${fmt(S.P)}</b>. Đếm các chữ số ở <b>phần thập phân</b> của ${B.dp ? 'hai thừa số' : `thừa số ${showS(m.a)}`}: bấm vào từng chữ số.`);
    phase = 'count';
    const decs = S.decCells();
    const ints = S.intCells();
    countLeft = [...decs];
    wrongEl = ints[0] || null;
    let n = 0, told = false;
    await new Promise((res) => {
      const all = [...decs, ...ints];
      const off = () => all.forEach(el => { el.classList.remove('dcol-pick'); el.removeEventListener('click', h); });
      function h(e) {
        const el = e.currentTarget;
        if (decs.includes(el)) {
          if (!countLeft.includes(el)) return;
          countLeft = countLeft.filter(x => x !== el);
          el.classList.remove('dcol-pick');
          S.badge(el, ++n);
          if (!countLeft.length) { off(); res(); }
          return;
        }
        shake(el);
        if (!told) { miss(COUNT_RULE); told = true; } else mistakes++;
        hint(COUNT_RULE);
      }
      all.forEach(el => { el.classList.add('dcol-pick'); el.addEventListener('click', h); });
    });
    phase = 'busy';
    const parts2 = [`${showS(m.a)} có ${A.dp} chữ số`, B.dp ? `${showS(m.b)} có ${B.dp} chữ số` : `${showS(m.b)} là số tự nhiên`];
    say(`${readDec(m.a)} có ${A.dp} chữ số ở phần thập phân${B.dp ? `, ${readDec(m.b)} có ${B.dp} chữ số` : ''}. Tất cả ${N} chữ số.`,
      `${parts2.join(', ')} ở phần thập phân: tất cả <b>${N} chữ số</b>.`);
    await sleep(1600);
    commaStep();
  }

  async function commaStep() {
    phase = 'comma';
    const short = String(S.P).length <= N;
    // Tích có đúng N chữ số: chỉ thiếu phần nguyên (480 → 0,480). Ít hơn N: thiếu cả chữ số phần thập phân (6 → 0,06).
    const exact = String(S.P).length === N;
    const why = exact ? `tích có ${N} chữ số, phần nguyên chưa có chữ số nào` : `tích chưa đủ ${N} chữ số`;
    say(`Dùng dấu phẩy tách ở tích ra ${N} chữ số kể từ phải sang trái.${short ? ' Thiếu chữ số thì viết thêm chữ số 0.' : ''}`,
      `Tách ở tích ra <b>${N} chữ số</b> kể từ phải sang trái: bấm vào chỗ đặt dấu phẩy.`);
    const gaps = S.gaps();
    rightEl = gaps[N - 1];
    wrongEl = gaps.find(g => +g.dataset.k !== N) || null;
    let told = false;
    await pickOne(gaps, rightEl, () => {
      if (!told) { miss(HOP_RULE); told = true; } else mistakes++;
      hint(HOP_RULE);
    });
    phase = 'busy';
    S.clearGaps();
    if (short) show(`Đếm từ phải sang trái: ${why} nên viết thêm chữ số <b>0</b>.`);
    await S.hop();
    if (short) {
      say(`${exact ? `Tích có ${N} chữ số, phần nguyên chưa có chữ số nào` : `Tích chưa đủ ${N} chữ số`}, ta viết thêm chữ số 0 vào bên trái: ${readDec(S.full)}.`, `Viết thêm <b>0</b>: tích là <b>${showS(S.full)}</b>.`);
      await sleep(2000);
    } else await sleep(500);
    finish();
  }

  async function finish() {
    const short = S.dropZeros();
    if (short !== S.full) {
      say(`${readDec(S.full)} bằng ${readDec(short)}. Chữ số 0 ở cuối phần thập phân có thể bỏ đi.`, `<b>${showS(S.full)} = ${showS(short)}</b>: bỏ chữ số 0 ở cuối phần thập phân.`);
      await sleep(2000);
    }
    paper.querySelector('.g3c-ans').textContent = showS(short);
    paper.querySelector('.g3c-eq').classList.add('g3c-eq-done');
    grid.querySelectorAll(`[data-r="${resRow}"]`).forEach((el, j) => setTimeout(() => el.classList.add('g3d-ok-flash'), j * 70));
    await sleep(500);
    done(mistakes, { ok: `${showS(m.a)} × ${showS(m.b)} = ${showS(short)}.`, tip: firstWrong ? `Nhớ: ${firstWrong}` : '' });
  }

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m, steps, phase: () => phase,
      step() {
        if (phase === 'trace' && tracing) tracing.finish();
        else if (phase === 'comma' && rightEl) rightEl.click();
        else if (phase === 'count' && countLeft.length) countLeft[0].click();
        else if (phase === 'pad') pad.type(steps[k]?.write ?? '');
      },
      wrong() {
        if ((phase === 'comma' || phase === 'count') && wrongEl) wrongEl.click();
        else if (phase === 'pad') pad.type([...(steps[k]?.write ?? '')].map(c => (Number(c) + 1) % 10).join(''));
      },
    };
  }
  start();
}

// ── Sinh đề ───────────────────────────────────────────────────────────────────────────────────────────
/** Số có dp chữ số thập phân, phần nguyên lo..hi, chữ số thập phân cuối khác 0. */
function rnd(rng, lo, hi, dp) {
  const sc = 10 ** dp;
  for (;;) {
    const n = rng.int(lo * sc + (dp ? 1 : 0), hi * sc + sc - 1);
    if (!dp || n % 10) return sOf(n, dp);
  }
}
const carriesOf = (op, a, b) => addSubSteps(op, num(a), num(b)).steps.filter(s => s.kind === 'carry').length;

function genAdd(rng, { dpa, dpb, aInt = [1, 89], bInt = [1, 89], minCarry = 1 }) {
  for (let t = 0; ; t++) {
    const a = dpa == null ? String(rng.int(aInt[0], aInt[1])) : rnd(rng, aInt[0], aInt[1], dpa);
    const b = dpb == null ? String(rng.int(bInt[0], bInt[1])) : rnd(rng, bInt[0], bInt[1], dpb);
    if (valOf(a) + valOf(b) >= 1000) continue;
    if (carriesOf('+', a, b) >= minCarry || t > 50) return { op: '+', a, b };
  }
}
function genSub(rng, { dpa, dpb, aInt = [10, 99], zeroInt = false }) {
  for (let t = 0; ; t++) {
    const a = dpa == null ? String(rng.int(Math.max(aInt[0], 2), aInt[1])) : rnd(rng, aInt[0], aInt[1], dpa);
    const ai = Math.floor(valOf(a));
    const b = zeroInt
      ? rnd(rng, ai, ai, dpb)
      : (dpb == null ? String(rng.int(1, Math.max(1, ai - 1))) : rnd(rng, ai >= 10 ? Math.max(1, Math.floor(ai / 4)) : 0, Math.max(0, ai - 1), dpb));
    if (!validSub(a, b)) continue;
    if (zeroInt && Math.floor(valOf(a) - valOf(b) + 1e-9) !== 0) continue;
    if (carriesOf('-', a, b) >= 1 || t > 60) return { op: '-', a, b };
  }
}

/** Thừa số: chữ số thứ hai (dạng số tự nhiên của các chữ số) không có 0, 1 (mỗi tích riêng là một phép nhân thật). */
function genMul(rng, mkA, mkB, ok = () => true) {
  for (let t = 0; ; t++) {
    const a = mkA(), b = mkB();
    const Bi = Number(num(b).int + num(b).dec), Ai = Number(num(a).int + num(a).dec);
    if (/[01]/.test(String(Bi)) || /0{2}/.test(String(Ai)) || Ai < 2) continue;
    if (ok(a, b) || t > 80) return { op: '*', a, b };
  }
}

export const DADD_LEVELS = [
  {
    id: 'd5-add-1', n: 1, title: 'Cộng cùng số chữ số thập phân', missions: 5,
    desc: 'Vd. 1,65 + 1,26; 35,47 + 28,96. Các dấu phẩy thẳng cột.',
    knowledge: 'cộng có nhớ số tự nhiên, hàng của số thập phân', lessons: { sgk5: ['bai-19'] },
    ask: () => 'Viết dấu phẩy thẳng dấu phẩy, cộng như số tự nhiên rồi viết dấu phẩy ở tổng!',
    gen: (rng, k) => { const dp = k % 3 === 2 ? 1 : 2; return genAdd(rng, { dpa: dp, dpb: dp, aInt: k % 2 ? [10, 89] : [1, 9], bInt: k % 2 ? [10, 89] : [1, 9] }); },
  },
  {
    id: 'd5-add-2', n: 2, title: 'Cộng khác số chữ số thập phân', missions: 5,
    desc: 'Vd. 24,5 + 3,84. Ô trống ở phần thập phân coi như chữ số 0.',
    knowledge: 'cộng hai số thập phân', lessons: { sgk5: ['bai-19'] },
    ask: () => 'Chữ số cùng hàng thẳng cột: số nào ít chữ số thập phân thì để trống ô bên phải!',
    gen: (rng, k) => {
      const [dpa, dpb] = [[1, 2], [2, 1], [1, 2], [2, 3], [3, 1]][k % 5];
      return genAdd(rng, { dpa, dpb, aInt: [1, 89], bInt: [1, 49] });
    },
  },
  {
    id: 'd5-add-3', n: 3, title: 'Cộng với số tự nhiên', missions: 5,
    desc: 'Vd. 4,61 + 8; 15 + 3,7. Số tự nhiên viết thẳng cột hàng đơn vị.',
    knowledge: 'cộng hai số thập phân', lessons: { sgk5: ['bai-19'] },
    ask: () => 'Số tự nhiên: chữ số hàng đơn vị thẳng cột với hàng đơn vị, không viết dưới phần thập phân!',
    gen: (rng, k) => {
      const dp = rng.pick([1, 2]);
      return k % 2
        ? genAdd(rng, { dpa: null, dpb: dp, aInt: [5, 99], bInt: [1, 29], minCarry: 0 })
        : genAdd(rng, { dpa: dp, dpb: null, aInt: [1, 49], bInt: [2, 39], minCarry: 1 });
    },
  },
  {
    id: 'd5-add-4', n: 4, title: 'Trừ số thập phân', missions: 5,
    desc: 'Vd. 4,43 − 4,16 = 0,27; 63,49 − 1,8. Phần nguyên bằng 0 vẫn viết 0.',
    knowledge: 'trừ có nhớ số tự nhiên, cộng số thập phân', lessons: { sgk5: ['bai-20'] },
    ask: () => 'Trừ như số tự nhiên từ phải sang trái, rồi viết dấu phẩy ở hiệu thẳng cột!',
    gen: (rng, k) => {
      if (k % 3 === 0) return genSub(rng, { dpa: 2, dpb: 2, aInt: [1, 9], zeroInt: true });
      if (k % 3 === 1) return genSub(rng, { dpa: 2, dpb: rng.pick([1, 2]), aInt: [10, 99] });
      return genSub(rng, { dpa: 1, dpb: 1, aInt: [10, 99] });
    },
  },
  {
    id: 'd5-add-5', n: 5, title: 'Số bị trừ ít chữ số thập phân hơn', missions: 5,
    desc: 'Vd. 25,9 − 13,84 (coi 25,9 là 25,90); 9 − 3,5.',
    knowledge: 'trừ số thập phân', lessons: { sgk5: ['bai-20'] },
    ask: () => 'Ô trống ở số bị trừ coi như chữ số 0, rồi trừ như thường!',
    gen: (rng, k) => {
      if (k % 3 === 1) return genSub(rng, { dpa: null, dpb: rng.pick([1, 2]), aInt: [3, 9] });
      if (k % 3 === 2) return genSub(rng, { dpa: null, dpb: rng.pick([1, 2]), aInt: [12, 60] });
      return genSub(rng, { dpa: 1, dpb: 2, aInt: [10, 99] });
    },
  },
];

const dig = (rng) => rng.int(2, 9);
export const DMUL_LEVELS = [
  {
    id: 'd5-mul-1', n: 1, title: 'Nhân với số tự nhiên có một chữ số', missions: 5,
    desc: 'Vd. 3,2 × 8 = 25,6; 12,35 × 4.',
    knowledge: 'nhân số tự nhiên với số có một chữ số', lessons: { sgk5: ['bai-21'] },
    ask: () => 'Nhân như số tự nhiên, rồi đếm chữ số ở phần thập phân để đặt dấu phẩy!',
    gen: (rng, k) => genMul(rng, () => (k % 2 ? rnd(rng, 1, 29, 2) : rnd(rng, 1, 99, 1)), () => String(dig(rng))),
  },
  {
    id: 'd5-mul-2', n: 2, title: 'Nhân với số có hai chữ số', missions: 5,
    desc: 'Vd. 1,51 × 25 = 37,75. Tích riêng thứ hai lùi sang trái một cột.',
    knowledge: 'nhân với số có hai chữ số (lớp 4)', lessons: { sgk5: ['bai-21'] },
    ask: () => 'Hai tích riêng, lùi một cột, cộng lại; rồi tách phần thập phân ở tích!',
    gen: (rng, k) => genMul(rng, () => (k % 2 ? rnd(rng, 1, 9, 2) : rnd(rng, 1, 49, 1)), () => String(rng.int(22, 98))),
  },
  {
    id: 'd5-mul-3', n: 3, title: 'Nhân hai số thập phân', missions: 5,
    desc: 'Vd. 4,3 × 3,6 = 15,48; 6,8 × 0,52 = 3,536. Đếm chữ số thập phân của cả hai thừa số.',
    knowledge: 'nhân số thập phân với số tự nhiên', lessons: { sgk5: ['bai-21'] },
    ask: () => 'Đếm phần thập phân của cả hai thừa số rồi tách ở tích bấy nhiêu chữ số!',
    gen: (rng, k) => (k % 2
      ? genMul(rng, () => rnd(rng, 1, 9, 1), () => sOf(rng.int(22, 98), 2))
      : genMul(rng, () => rnd(rng, 1, k % 3 ? 29 : 9, 1), () => rnd(rng, 2, 9, 1))),
  },
  {
    id: 'd5-mul-4', n: 4, title: 'Tích phải thêm chữ số 0', missions: 5,
    desc: 'Vd. 0,2 × 0,3 = 0,06; 2,5 × 4 = 10,0 = 10. Thiếu chữ số thì thêm 0, chữ số 0 ở cuối thì bỏ đi.',
    knowledge: 'nhân hai số thập phân', lessons: { sgk5: ['bai-21'] },
    ask: () => 'Tích chưa đủ chữ số thì viết thêm 0 bên trái; chữ số 0 ở cuối phần thập phân thì bỏ đi!',
    gen: (rng, k) => {
      if (k % 2 === 0) {
        // Tích ngắn: 0,2 × 0,3 = 0,06; 0,05 × 7 = 0,35.
        return genMul(rng, () => sOf(dig(rng), rng.pick([1, 1, 2])), () => sOf(dig(rng), rng.pick([0, 1, 1])),
          (a, b) => {
            const A = num(a), B = num(b), N = A.dp + B.dp, len = String(Number(A.int + A.dec) * Number(B.int + B.dec)).length;
            return N >= 2 && (k % 4 === 0 ? len < N : len <= N);
          });
      }
      // Tích có chữ số 0 ở cuối: 2,5 × 4 = 10,0; 1,25 × 8 = 10,00; 0,75 × 4 = 3,00.
      return genMul(rng, () => (rng() < 0.5 ? rnd(rng, 0, 9, 1) : sOf(rng.int(1, 19) * 10 + 5, 2)), () => (rng() < 0.7 ? String(rng.pick([2, 4, 6, 8])) : sOf(rng.pick([2, 4, 6, 8]), 1)),
        (a, b) => { const A = num(a), B = num(b); const P = Number(A.int + A.dec) * Number(B.int + B.dec); return P % 10 === 0 && A.dp + B.dp >= 1; });
    },
  },
];

const base = {
  npcs: [TEACHER], starPrefix: 'drill5', againText: 'Làm lượt mới',
  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.a}${m.op}${m.b}`);
  },
};

export const DADD_GAME = {
  ...base,
  id: 'd5-add', icon: '➕', title: 'Cộng, trừ số thập phân',
  purpose: 'Giúp em đặt tính cộng, trừ số thập phân như trong vở: chữ số cùng hàng thẳng cột, dấu phẩy thẳng dấu phẩy, tính như số tự nhiên rồi viết dấu phẩy ở kết quả.',
  unitWord: 'phép tính', levels: DADD_LEVELS,
  stallIcon: () => '➕',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> phép tính.`,
  howTo: how(['📝', 'Dấu phẩy thẳng cột'], ['➡️', 'Tính từ phải sang trái'], ['🔴', 'Số nhớ'], ['👆', 'Đặt dấu phẩy']),
  mountMission(stage, m, level, api) { mountAddSub(stage, m, api); },
};

export const DMUL_GAME = {
  ...base,
  id: 'd5-mul', icon: '✖️', title: 'Nhân số thập phân',
  purpose: 'Giúp em nhân số thập phân như trong vở: đặt tính thẳng cột bên phải, nhân như số tự nhiên, đếm chữ số ở phần thập phân của hai thừa số rồi đặt dấu phẩy ở tích.',
  unitWord: 'phép nhân', levels: DMUL_LEVELS,
  stallIcon: () => '✖️',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> phép nhân.`,
  howTo: how(['📝', 'Căn phải'], ['✖️', 'Nhân như số tự nhiên'], ['🔢', 'Đếm chữ số thập phân'], ['👆', 'Đặt dấu phẩy']),
  mountMission(stage, m, level, api) { mountMul(stage, m, api); },
};

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  const st = document.createElement('style');
  st.id = 'dcol-styles';
  st.textContent = `
    /* Lưới có cột dấu phẩy hẹp: ô li vẽ trên từng ô (nền lưới chung sẽ lệch sau cột hẹp) */
    .g3d-grid.dcol-g { background-image: none; }
    .dcol-ln { background-image: linear-gradient(#DBEAFE 1.5px, transparent 1.5px), linear-gradient(90deg, #DBEAFE 1.5px, transparent 1.5px); }
    .dcol-g .dcol-cm { width: calc(var(--cell) * 0.5); background-image: linear-gradient(#DBEAFE 1.5px, transparent 1.5px); }
    .dcol-faint { color: #A8B5C7 !important; }
    .dcol-colok { background: #DCFCE7; border-radius: 0.2em; }
    .dcol-pick { cursor: pointer; outline: 3px dashed #F59E0B; outline-offset: -5px; border-radius: 0.25em; animation: dcolPick 1.4s ease-in-out infinite; }
    .dcol-pick:hover { background: #FEF9C3; }
    @keyframes dcolPick { 50% { outline-color: #FDE68A; } }
    /* Dấu phẩy trong thừa số / tích của phép nhân: sát mép phải ô chữ số hàng đơn vị */
    .dcol-cmk { position: absolute; right: -0.17em; bottom: 0.06em; line-height: 1; color: inherit; pointer-events: none; }
    .dcol-cmk-new { color: #DC2626; animation: g3dPopIn .35s cubic-bezier(.2,1.5,.4,1); }
    .dcol-badge, .dcol-hopn { position: absolute; font-size: 0.34em; min-width: 1.35em; height: 1.35em; padding: 0 0.15em; box-sizing: border-box; border-radius: 999px; display: grid; place-items: center;
      font-weight: 800; color: #fff; line-height: 1; z-index: 2; border: 2px solid ${INK}; }
    .dcol-badge { right: -0.1em; top: -0.25em; background: #F97316; animation: g3dPopIn .35s cubic-bezier(.2,1.5,.4,1); }
    .dcol-hopn { left: 50%; bottom: -0.55em; transform: translateX(-50%); background: #0EA5E9; }
    .dcol-zero { color: #16A34A; }
    /* Khe đặt dấu phẩy ở tích */
    .dcol-gap { position: absolute; top: 0; bottom: 0; right: calc(var(--cell) * -0.2); width: calc(var(--cell) * 0.4); z-index: 3; cursor: pointer; }
    .dcol-gap::after { content: ''; position: absolute; left: 50%; bottom: 10%; width: 0.22em; height: 0.22em; margin-left: -0.11em; border-radius: 50%; background: #F59E0B;
      box-shadow: 0 0 0 0.06em #fff; animation: dcolDot 1.2s ease-in-out infinite; }
    .dcol-gap:hover::after { background: #DC2626; transform: scale(1.4); }
    @keyframes dcolDot { 50% { opacity: 0.35; } }
    .dcol-hopc { position: absolute; left: 0; top: 0; z-index: 4; color: #DC2626; font-size: calc(var(--cell) * 0.95); font-weight: 800; line-height: 1; pointer-events: none; }
    .dcol-drop { color: #CBD5E1 !important; }
    .dcol-drop::after { content: ''; position: absolute; left: 18%; right: 18%; top: 48%; height: max(3px, calc(var(--cell) * 0.06)); background: #DC2626; border-radius: 9px; transform: rotate(-24deg); }
    span.dcol-drop::after { left: -0.1em; right: -0.1em; }
    @media (prefers-reduced-motion: reduce) {
      .dcol-pick, .dcol-gap::after { animation: none; }
    }
  `;
  document.head.appendChild(st);
}
