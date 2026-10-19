/**
 * 💯 Số đến 100 000 (Toán 3 KNTT Tập 2: Bài 45, 46, 48, 59, 60, 61, 76).
 * Mỗi lượt là một dạng (m.kind), mỗi dạng có bố cục riêng nhưng mọi vùng dựng sẵn từ đầu lượt (ẩn bằng visibility):
 *   write   nghe / đọc chữ "bốn mươi lăm nghìn ba trăm mười hai" → gõ số; đúng thì các chữ số bay vào bảng hàng.
 *   read    nhìn số → chọn cách đọc đúng trong ba nút to (nhiễu: thiếu "nghìn", thiếu "không trăm", sai "linh", đảo chữ số).
 *   split   45 312: chữ số bay vào bảng hàng, rồi gõ từng số hạng 40 000 + 5 000 + 300 + 10 + 2 (chữ số 0 bỏ qua như sách).
 *   join    60 000 + 400 + 7 hoặc "Số gồm 6 chục nghìn, 4 trăm và 7 đơn vị" → gõ số; hàng trống viết 0.
 *   cmp     hai số xếp thẳng hàng theo cột: chạm cột đầu tiên (từ trái) có hai chữ số khác nhau, rồi chọn dấu > < =.
 *   round   làm tròn: chạm chữ số cần nhìn, chọn làm tròn xuống / lên trên tia số (số đặt đúng tỉ lệ), số tròn bay vào ô.
 *   next    số liền trước, số liền sau (hay gặp 39 999, 10 000).
 *   maxmin  bốn thẻ số: chọn số lớn nhất rồi số bé nhất.
 * Cách đọc số dùng docSo (engine/numberWords.js), cùng cách đọc với sách: "linh", "mốt", "lăm", "không trăm".
 */

import { mountDrill, shake, setActive, setUse, flyOne, flyDigit, fmt as fmtSp, fresh, sfx, sleep, how, cap, TEACHER, INK, MINUS } from './kit.js';
import { docSo, foldReading } from '../../engine/numberWords.js';

// Dấu cách tách lớp nghìn không ngắt dòng (bong bóng lời, thẻ kết quả: "75 660" không bị tách hai dòng).
const fmt = (n) => fmtSp(n).replace(/ /g, ' ');
const PL = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn'];
const PLC = ['Đơn vị', 'Chục', 'Trăm', 'Nghìn', 'Chục nghìn'];
// Màu từng hàng (đậm cho chữ, nhạt cho nền ô đầu bảng)
const PC = ['#BE185D', '#B45309', '#15803D', '#1D4ED8', '#7C3AED'];
const PB = ['#FCE7F3', '#FEF3C7', '#DCFCE7', '#DBEAFE', '#EDE9FE'];
const RULE_CMP = 'Số nào có nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so sánh từng cặp chữ số từ trái sang phải.';

const Read = (n) => cap(docSo(n));
const digitsOf = (n) => String(n).split('').map(Number);
const boxW = (n) => `${fmt(n).length * 0.52 + 0.55}em`;
const signWord = (s) => (s === '>' ? 'lớn hơn' : s === '<' ? 'bé hơn' : 'bằng');

/** Số có len chữ số; zeroP: xác suất cài một hai chữ số 0 ở giữa (chỗ hay đọc, viết sai). */
function num(rng, len, zeroP = 0) {
  const d = [rng.int(1, 9)];
  for (let i = 1; i < len; i++) d.push(rng.int(0, 9));
  if (rng() < zeroP) {
    const k = rng.int(1, Math.min(2, len - 1));
    for (let j = 0; j < k; j++) d[rng.int(1, len - 1)] = 0;
  } else {
    for (let i = 1; i < len; i++) if (d[i] === 0 && rng() < 0.7) d[i] = rng.int(1, 9);
  }
  return Number(d.join(''));
}

/** Hai cách đọc sai hay gặp của n (không trùng cách đọc đúng, không trùng nhau). */
export function readingOptions(rng, n) {
  const R = docSo(n);
  const ds = digitsOf(n), len = ds.length;
  const u = n % 10, t = Math.floor(n / 10) % 10;
  const structural = [], numeric = [];
  const zeroErr = [];
  if (R.includes('không trăm ')) zeroErr.push(R.replace('không trăm ', '')); // quên "không trăm"
  if (R.includes(' linh ')) zeroErr.push(R.replace(' linh ', ' '));         // quên "linh"
  if (zeroErr.length && rng() < 0.75) structural.push(...zeroErr);
  else {
    structural.push(...zeroErr);
    if (n % 1000) structural.push(R.replace(' nghìn', ''));                  // quên chữ "nghìn"
  }
  if (t === 0 && u) numeric.push(docSo(n - u + u * 10));                     // "linh năm" đọc thành "năm mươi"
  for (let i = 0; i + 1 < len; i++) {                                        // đảo hai chữ số cạnh nhau
    if (ds[i] === ds[i + 1] || (i === 0 && ds[1] === 0)) continue;
    const e = [...ds];
    [e[i], e[i + 1]] = [e[i + 1], e[i]];
    numeric.push(docSo(Number(e.join(''))));
  }
  for (let i = 1; i < len; i++) {                                            // một chữ số lệch 1
    const e = [...ds];
    e[i] = (e[i] + (rng() < 0.5 ? 1 : 9)) % 10;
    numeric.push(docSo(Number(e.join(''))));
  }
  const seen = new Set([foldReading(R)]);
  const take = (list) => {
    for (const s of rng.shuffle(list)) { const f = foldReading(s); if (!seen.has(f)) { seen.add(f); return s; } }
    return null;
  };
  const picks = [take(structural), take(numeric)].filter(Boolean);
  while (picks.length < 2) picks.push(take(numeric));
  const opts = rng.shuffle([R, ...picks]).map(cap);
  return { opts, ans: opts.indexOf(cap(R)) };
}

// ── Sinh đề từng dạng ─────────────────────────────────────────────────────────────────────────────
const mk = {
  write: (rng, len, z) => ({ kind: 'write', n: num(rng, len, z) }),
  read: (rng, len, z) => { const n = num(rng, len, z); return { kind: 'read', n, ...readingOptions(rng, n) }; },
  split: (rng, len, z) => ({ kind: 'split', n: num(rng, len, z) }),
  join: (rng, len, form) => {
    let n = num(rng, len, 0.85);
    if (!digitsOf(n).slice(1).includes(0)) n = Number(String(n).slice(0, len - 2) + '0' + String(n).slice(-1));
    return { kind: 'join', n, form };
  },
  cmp: (rng, type) => {
    let a, b;
    if (type === 'diff') {           // 5 chữ số bắt đầu bằng 1 với 4 chữ số "to" (9 876)
      a = Number(`1${rng.int(0, 2)}${rng.int(0, 9)}${rng.int(0, 9)}${rng.int(0, 9)}`);
      b = Number(`${rng.int(8, 9)}${rng.int(5, 9)}${rng.int(0, 9)}${rng.int(0, 9)}`);
    } else if (type === 'equal') {
      a = b = num(rng, 5, 0.3);
    } else {                          // cùng số chữ số, khác nhau ở một hàng (late: hàng chục / đơn vị)
      const len = type === 'same4' ? 4 : 5;
      a = num(rng, len, 0.2);
      const ds = digitsOf(a);
      const i = type === 'late' ? rng.int(len - 2, len - 1) : rng.int(1, len - 2);
      const e = [...ds];
      do { e[i] = rng.int(0, 9); } while (e[i] === ds[i]);
      // Sau hàng khác nhau: chữ số của số bé thường to hơn (bẫy nhìn chữ số cuối)
      for (let j = i + 1; j < len; j++) e[j] = rng.int(0, 9);
      b = Number(e.join(''));
    }
    return rng() < 0.5 ? { kind: 'cmp', a, b } : { kind: 'cmp', a: b, b: a };
  },
  round: (rng, p, len) => {
    const ds = digitsOf(num(rng, len, 0.15));
    ds[len - p] = rng.pick([rng.int(0, 9), rng.int(0, 9), 4, 5, 6]);
    return { kind: 'round', n: Number(ds.join('')), p };
  },
  next: (rng) => {
    const len = rng() < 0.4 ? 4 : 5;
    const base = num(rng, len, 0.2);
    const tail = rng.pick(['9', '99', '999', '0', '00', '000', '', '']);
    let n = Number(String(base).slice(0, len - tail.length) + tail);
    if (n >= 99999) n = 99998;
    if (n < 1001) n = 1001;
    return { kind: 'next', n };
  },
  maxmin: (rng) => {
    const base = num(rng, 5, 0.1);
    const set = new Set([base]);
    if (rng() < 0.5) set.add(Number(`9${rng.int(6, 9)}${rng.int(0, 9)}${rng.int(0, 9)}`)); // bẫy: số 4 chữ số "to"
    while (set.size < 4) {
      const e = digitsOf(base);
      const i = rng.int(1, 4);
      if (rng() < 0.5) e[i] = rng.int(0, 9); else { const j = rng.int(1, 4); [e[i], e[j]] = [e[j], e[i]]; }
      set.add(Number(e.join('')));
    }
    return { kind: 'maxmin', list: rng.shuffle([...set]) };
  },
};
const ROUND_LEN = { 1: 4, 2: 4, 3: 5, 4: 5 };

const LV = (id, n, title, desc, knowledge, lessons, missions, ask, plan) => ({ id, n, title, desc, knowledge, lessons: { workbook: lessons }, missions, ask: () => ask, plan });

export const NUMBERS_LEVELS = [
  LV('drill-num-1', 1, 'Đọc, viết số', 'Vd. 45 312 đọc là bốn mươi lăm nghìn ba trăm mười hai.', 'đọc, viết số có bốn, năm chữ số',
    ['bai-45', 'bai-59'], 4, 'Đọc từ hàng cao nhất: phần nghìn trước, ba chữ số sau!',
    (rng, k) => [() => mk.write(rng, 4, 0.3), () => mk.read(rng, 5, 0.5), () => mk.write(rng, 5, 0.6), () => mk.read(rng, 4, 0.6)][k % 4]()),
  LV('drill-num-2', 2, 'Cấu tạo số', 'Vd. 45 312 = 40 000 + 5 000 + 300 + 10 + 2.', 'hàng chục nghìn, nghìn, trăm, chục, đơn vị',
    ['bai-45', 'bai-59'], 4, 'Mỗi chữ số đứng ở một hàng. Hàng nào không có thì viết 0!',
    (rng, k) => [() => mk.split(rng, 4, 0.2), () => mk.join(rng, 5, 'sum'), () => mk.split(rng, 5, 0.4), () => mk.join(rng, 4, 'gom')][k % 4]()),
  LV('drill-num-3', 3, 'So sánh số', 'Vd. 45 312 > 45 289.', 'so sánh các số trong phạm vi 100 000',
    ['bai-46', 'bai-60'], 5, 'Đếm chữ số trước, rồi so sánh từ hàng cao nhất!',
    (rng, k) => mk.cmp(rng, ['same4', 'diff', 'same5', 'equal', 'late'][k % 5])),
  LV('drill-num-4', 4, 'Làm tròn số', 'Vd. làm tròn 4 538 đến hàng trăm được 4 500.', 'làm tròn đến hàng chục, trăm, nghìn, chục nghìn',
    ['bai-48', 'bai-61'], 4, 'Nhìn chữ số ở hàng ngay bên phải: bé hơn 5 thì xuống, từ 5 trở lên thì lên!',
    (rng, k) => { const p = (k % 4) + 1; return mk.round(rng, p, ROUND_LEN[p]); }),
  LV('drill-num-5', 5, 'Trộn các dạng', 'Số liền trước, liền sau, lớn nhất, bé nhất, đọc, so sánh, làm tròn.', 'các số trong phạm vi 100 000',
    ['bai-76'], 6, 'Mỗi bài một dạng: đọc kĩ thầy hỏi gì!',
    (rng, k) => {
      const p = rng.int(1, 4);
      return [() => mk.next(rng), () => mk.maxmin(rng), () => (rng() < 0.5 ? mk.read(rng, 5, 0.6) : mk.write(rng, 5, 0.6)),
        () => mk.cmp(rng, rng.pick(['same5', 'diff', 'late'])), () => mk.round(rng, p, ROUND_LEN[p]),
        () => (rng() < 0.5 ? mk.split(rng, 5, 0.4) : mk.join(rng, 5, rng.pick(['sum', 'gom'])))][k % 6]();
    }),
];

export const NUMBERS_GAME = {
  id: 'drill-num', icon: '💯', title: 'Số đến 100 000',
  purpose: 'Giúp em đọc, viết, phân tích, so sánh và làm tròn các số có bốn, năm chữ số như trong sách.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: NUMBERS_LEVELS,
  stallIcon: () => '💯',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['🔊', 'Đọc, viết số'], ['🧱', 'Bảng hàng'], ['⚖️', 'So sánh'], ['🎯', 'Làm tròn']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.plan(rng, k), (m) => `${m.kind}:${m.n ?? ''}:${m.a ?? ''}:${m.b ?? ''}:${m.p ?? ''}:${(m.list || []).join(',')}`);
  },

  mountMission(stage, m, level, api) {
    injectNumStyles();
    MOUNT[m.kind](stage, m, api);
  },
};

// ── Phần dùng chung ───────────────────────────────────────────────────────────────────────────────
/** Số thành các ô chữ số (data-i: vị trí từ trái), giữ dấu cách tách lớp nghìn. */
function numHtml(n, tag = 'span', cls = 'g3n-d') {
  let i = 0;
  return fmt(n).split('').map(ch => (ch === ' ' ? '<span class="g3n-sp"> </span>'
    : `<${tag}${tag === 'button' ? ' type="button"' : ''} class="${cls}" data-i="${i++}">${ch}</${tag}>`)).join('');
}

/** Bảng hàng: len cột (hàng cao nhất bên trái), ô chữ số data-p = hàng (0 = đơn vị). */
function tableHtml(len) {
  const ps = Array.from({ length: len }, (_, j) => len - 1 - j);
  return `<div class="g3n-table" style="--n:${len}">
    ${ps.map(p => `<div class="g3n-th" style="--pc:${PC[p]};--pb:${PB[p]}">${PLC[p]}</div>`).join('')}
    ${ps.map(p => `<div class="g3n-cell" data-p="${p}" style="--pc:${PC[p]}"></div>`).join('')}
  </div>`;
}

/**
 * Cỡ chữ to nhất vừa khung cho mọi vùng [data-fit] (vùng có cỡ cố định từ lưới): đo thật, tìm nhị phân.
 * data-fit="" : con đầu tiên (.g3n-in) phải nằm gọn; data-fit="kids": mọi .g3n-fk (nút) nằm gọn chữ của mình.
 * data-max: cỡ tối đa = tỉ lệ chiều cao tờ vở. Đo lại khi tờ vở đổi cỡ (xoay máy) và khi phông chữ nạp xong.
 */
function autoFit(paper) {
  const fitOne = (el) => {
    const kids = el.dataset.fit === 'kids';
    const fits = () => {
      if (kids) {
        return [...el.querySelectorAll('.g3n-fk')].every(k => k.scrollWidth <= k.clientWidth + 1 && k.scrollHeight <= k.clientHeight + 1)
          && el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1;
      }
      const inn = el.firstElementChild;
      return inn.scrollWidth <= el.clientWidth + 1 && inn.offsetHeight <= el.clientHeight + 1;
    };
    let lo = 6, hi = Math.max(8, paper.clientHeight * Number(el.dataset.max || 0.3));
    for (let i = 0; i < 11; i++) {
      const mid = (lo + hi) / 2;
      el.style.fontSize = `${mid}px`;
      if (fits()) lo = mid; else hi = mid;
    }
    el.style.fontSize = `${Math.floor(lo)}px`;
  };
  const run = () => { if (paper.clientHeight) paper.querySelectorAll('[data-fit]').forEach(fitOne); };
  run();
  document.fonts?.ready?.then(() => { if (paper.isConnected) run(); });
  let last = '';
  const ro = new ResizeObserver(() => {
    if (!paper.isConnected) { ro.disconnect(); return; }
    const sz = `${paper.clientWidth}x${paper.clientHeight}`;
    if (sz !== last) { last = sz; run(); }
  });
  ro.observe(paper);
}

/** Bay một dòng chữ (cùng cỡ chữ của chỗ đi) tới chỗ đến. */
function flyText(html, from, to, opts = {}) {
  const fs = parseFloat(getComputedStyle(from).fontSize) || 24;
  return flyOne(`<div class="g3n-fly" style="font-size:${fs}px">${html}</div>`, from.getBoundingClientRect(), to.getBoundingClientRect(), { minMs: 450, maxMs: 760, ...opts });
}

/** Khung chung một lượt: dựng cảnh, đếm lỗi, lời nhắc khi sai. */
function frame(stage, api, board, cls) {
  const d = mountDrill(stage, { api, board, cls: `g3n-scene ${cls}` });
  autoFit(d.paper);
  const st = { mistakes: 0, tip: '' };
  st.wrong = (el, text, shown) => { st.mistakes++; st.tip ||= shown || text; if (el) shake(el); d.hint(text, shown); };
  return { ...d, st };
}

/** Các chữ số trong ô `from` (đã thành .g3n-d) bay lần lượt vào bảng hàng. */
async function digitsToTable(paper, from, n, show, { only } = {}) {
  const ds = digitsOf(n), len = ds.length;
  const parts = [];
  let last = 0;
  for (let i = 0; i < len; i++) {
    const p = len - 1 - i;
    const cell = paper.querySelector(`.g3n-cell[data-p="${p}"]`);
    if (!cell || (only && !only(p, cell))) continue;
    const src = from.querySelector(`[data-i="${i}"]`) || from;
    if (ds[i] || p < len - 1) parts.push(`${ds[i]} ${PL[p]}`);
    show?.(parts.join(', '));
    last = flyDigit(String(ds[i]), src, cell, { onLand: () => { cell.textContent = ds[i]; cell.classList.add('g3d-ok-flash'); sfx.pop(i); } });
    await sleep(260);
  }
  await sleep(last + 120);
}

// ── write: đọc chữ → viết số ──────────────────────────────────────────────────────────────────────
function mountWrite(stage, m, api) {
  const { n } = m, len = String(n).length;
  const board = `<div class="g3n g3n-write">
    <div class="g3n-z" data-fit data-max=".1"><div class="g3n-in g3n-colw"><span class="g3n-tag">✍️ Viết số</span><span class="g3n-quote">${Read(n)}</span></div></div>
    <div class="g3n-z" data-fit data-max=".2"><div class="g3n-in"><span class="g3d-box g3n-ans" style="--boxw:${boxW(n)}" data-ans></span></div></div>
    <div class="g3n-tz">${tableHtml(len)}</div>
  </div>`;
  const { paper, say, show, pad, done, st } = frame(stage, api, board, 'g3n-k-write');
  const ansEl = paper.querySelector('[data-ans]');
  const th = Math.floor(n / 1000), rest = n % 1000;
  const thW = `${docSo(th)} nghìn`;
  const restW = docSo(n).slice(thW.length).trim();
  const tipText = rest
    ? `“${cap(thW)}” viết là ${th}, “${restW}” viết là ${String(rest).padStart(3, '0')}. Hàng nào không có thì viết 0.`
    : `“${cap(thW)}” viết là ${th}, rồi viết thêm ba chữ số 0.`;
  let stepNow = 'type';

  say(`Viết số: ${docSo(n)}.`, '✍️ Nghe thầy đọc, <b>viết số</b> bằng bàn phím.');
  setActive(paper, ansEl);
  const opts = {
    max: len + 1,
    onType: (t) => { ansEl.textContent = t ? fmt(t) : ''; },
    onSubmit: async (t) => {
      if (Number(t) !== n) { ansEl.textContent = ''; st.wrong(ansEl, tipText); pad.want(opts); return; }
      stepNow = 'fly';
      pad.off();
      setActive(paper, null);
      ansEl.innerHTML = numHtml(n);
      ansEl.classList.add('g3d-box-ok');
      say('Đúng rồi! Xem các chữ số vào bảng hàng.', 'Các chữ số vào <b>bảng hàng</b>.');
      await digitsToTable(paper, ansEl, n, (s) => show(`${fmt(n)} gồm <b>${s}</b>.`));
      await sleep(400);
      done(st.mistakes, { ok: `${Read(n)} viết là ${fmt(n)}.`, tip: st.tip ? tipText : '' });
    },
  };
  pad.want(opts);
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => { if (stepNow === 'type') pad.type(String(n)); }, wrong: () => pad.type(String(n + 1)) };
}

// ── read: nhìn số → chọn cách đọc ─────────────────────────────────────────────────────────────────
function mountRead(stage, m, api) {
  const { n, opts, ans } = m;
  const board = `<div class="g3n g3n-read">
    <div class="g3n-z" data-fit data-max=".26"><div class="g3n-in g3n-colw"><span class="g3n-tag">🔊 Đọc số</span><span class="g3n-big">${numHtml(n)}</span></div></div>
    <div class="g3n-z g3n-opts" data-fit="kids" data-max=".075">${opts.map((o, i) => `<button type="button" class="g3g-btn g3d-choice g3n-fk g3n-opt" data-o="${i}">${o}</button>`).join('')}</div>
  </div>`;
  const { paper, say, done, st } = frame(stage, api, board, 'g3n-k-read');
  const th = Math.floor(n / 1000), rest = n % 1000;
  const tipText = `Đọc từ trái sang phải: ${th} nghìn đọc là “${docSo(th)} nghìn”${rest ? `, ${String(rest).padStart(3, '0')} đọc là “${docSo(n).slice(docSo(th).length + 7).trim()}”` : ''}.`;
  let stepNow = 'pick';
  say('Số này đọc là gì? Chọn cách đọc đúng.', '🔊 Chọn <b>cách đọc đúng</b>.');
  paper.querySelectorAll('[data-o]').forEach(btn => {
    btn.onclick = async () => {
      if (stepNow !== 'pick' || btn.disabled) return;
      sfx.tap();
      if (Number(btn.dataset.o) !== ans) { btn.disabled = true; btn.classList.add('g3n-opt-x'); st.wrong(btn, tipText); return; }
      stepNow = 'done';
      paper.querySelectorAll('[data-o]').forEach(b => { b.disabled = true; });
      // Số bay xuống nút cách đọc đúng: số này đọc như thế
      const big = paper.querySelector('.g3n-big');
      await sleep(flyText(fmt(n), big, btn, { onLand: () => { btn.classList.add('g3d-choice-ok'); sfx.pop(3); } }) + 150);
      api.say(docSo(n));
      await sleep(900);
      done(st.mistakes, { ok: `${fmt(n)} đọc là: ${docSo(n)}.`, tip: st.tip ? tipText : '' });
    };
  });
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => paper.querySelector(`[data-o="${ans}"]`)?.click(), wrong: () => paper.querySelector(`[data-o]:not([data-o="${ans}"]):not(:disabled)`)?.click() };
}

// ── split / join: cấu tạo số ──────────────────────────────────────────────────────────────────────
const termsOf = (n) => digitsOf(n).map((d, i, a) => ({ d, p: a.length - 1 - i, v: d * 10 ** (a.length - 1 - i) })).filter(t => t.d);

function mountSplit(stage, m, api) {
  const { n } = m, len = String(n).length;
  const terms = termsOf(n);
  const eq = `<span class="g3n-num" data-num>${numHtml(n)}</span>${terms.map((t, i) =>
    `<span class="g3n-grp">${i ? '+' : '='} <span class="g3d-box g3n-term" data-t="${i}" style="--boxw:${boxW(t.v)}"></span></span>`).join('')}`;
  const board = `<div class="g3n g3n-pv">
    <div class="g3n-z g3n-head" data-fit data-max=".06"><div class="g3n-in"><span class="g3n-tag">🧱 Viết thành tổng</span></div></div>
    <div class="g3n-tz">${tableHtml(len)}</div>
    <div class="g3n-z" data-fit data-max=".15"><div class="g3n-in g3n-eq">${eq}</div></div>
  </div>`;
  const { paper, say, show, pad, done, st } = frame(stage, api, board, 'g3n-k-split');
  const numEl = paper.querySelector('[data-num]');
  let stepNow = 'fly', ti = 0;
  const hasZero = terms.length < len;

  (async () => {
    say(`Viết số ${fmt(n)} vào bảng hàng.`, `Viết <b>${fmt(n)}</b> vào bảng hàng.`);
    setActive(paper, numEl);
    await sleep(500);
    await digitsToTable(paper, numEl, n, (s) => show(`${fmt(n)} gồm <b>${s}</b>.`));
    setActive(paper, null);
    stepNow = 'term';
    askTerm(true);
  })();

  function askTerm(first) {
    const t = terms[ti];
    const box = paper.querySelector(`[data-t="${ti}"]`);
    const cell = paper.querySelector(`.g3n-cell[data-p="${t.p}"]`);
    setUse(paper, cell);
    setActive(paper, box);
    const q = `Chữ số ${t.d} ở hàng ${PL[t.p]} có giá trị bao nhiêu?`;
    if (first) say(`${hasZero ? 'Chữ số 0 thì không cần viết vào tổng. ' : ''}${q}`, `${hasZero ? 'Chữ số 0 không viết vào tổng. ' : ''}Chữ số <b>${t.d}</b> ở hàng <b>${PL[t.p]}</b>: giá trị là bao nhiêu?`);
    else show(`Chữ số <b>${t.d}</b> ở hàng <b>${PL[t.p]}</b>: giá trị là bao nhiêu?`);
    const opts = {
      max: String(t.v).length + 1,
      onType: (s) => { box.textContent = s ? fmt(s) : ''; },
      onSubmit: (s) => {
        if (Number(s) !== t.v) { box.textContent = ''; st.wrong(box, `Chữ số ${t.d} ở hàng ${PL[t.p]} nên có giá trị ${fmt(t.v)}.`); pad.want(opts); return; }
        box.classList.add('g3d-box-ok');
        sfx.pop(ti);
        ti++;
        if (ti < terms.length) { pad.want(opts); askTerm(false); return; }
        stepNow = 'done';
        pad.off();
        setActive(paper, null);
        setUse(paper, null);
        setTimeout(() => done(st.mistakes, { ok: `${fmt(n)} = ${terms.map(x => fmt(x.v)).join(' + ')}.`, tip: st.tip ? 'Chữ số ở hàng nào thì giá trị là chữ số đó với số chữ số 0 bằng số hàng bên phải nó.' : '' }), 400);
      },
    };
    pad.want(opts);
  }
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => { if (stepNow === 'term') pad.type(String(terms[ti].v)); }, wrong: () => { if (stepNow === 'term') pad.type(String(terms[ti].d)); } };
}

function mountJoin(stage, m, api) {
  const { n, form } = m, len = String(n).length;
  const terms = termsOf(n);
  const ansBox = `<span class="g3d-box g3n-ans2" style="--boxw:${boxW(n)}" data-ans></span>`;
  const eq = form === 'sum'
    ? `${terms.map((t, i) => `<span class="g3n-grp">${i ? '+ ' : ''}<span class="g3n-part" data-p="${t.p}">${fmt(t.v)}</span></span>`).join('')}<span class="g3n-grp">= ${ansBox}</span>`
    : `<span>Số gồm</span>${terms.map((t, i) => `<span class="g3n-grp">${i === terms.length - 1 && i ? 'và ' : ''}<span class="g3n-part" data-p="${t.p}">${t.d} ${PL[t.p]}</span>${i < terms.length - 2 ? ',' : ''}</span>`).join('')}<span class="g3n-grp">viết là ${ansBox}</span>`;
  const board = `<div class="g3n g3n-pv">
    <div class="g3n-z g3n-head" data-fit data-max=".06"><div class="g3n-in"><span class="g3n-tag">🧱 Viết số</span></div></div>
    <div class="g3n-tz">${tableHtml(len)}</div>
    <div class="g3n-z" data-fit data-max=".13"><div class="g3n-in g3n-eq${form === 'sum' ? '' : ' g3n-eq-words'}">${eq}</div></div>
  </div>`;
  const { paper, say, show, pad, done, st } = frame(stage, api, board, 'g3n-k-join');
  const ansEl = paper.querySelector('[data-ans]');
  let stepNow = 'type', helped = false;
  const zeros = Array.from({ length: len }, (_, j) => len - 1 - j).filter(p => !terms.some(t => t.p === p));
  const tipText = `Hàng ${zeros.map(p => PL[p]).join(', ')} không có nên viết chữ số 0 ở ${zeros.length > 1 ? 'các hàng' : 'hàng'} đó.`;

  say(form === 'sum' ? 'Tổng này là số nào? Gõ số.' : 'Số này viết thế nào? Gõ số.', '🧱 <b>Viết số</b> bằng bàn phím.');
  setActive(paper, ansEl);
  // Sai lần đầu: các phần bay vào bảng hàng, hàng trống nhấp nháy (gợi ý viết 0).
  const help = async () => {
    if (helped) return;
    helped = true;
    for (const t of terms) {
      const src = paper.querySelector(`.g3n-part[data-p="${t.p}"]`), cell = paper.querySelector(`.g3n-cell[data-p="${t.p}"]`);
      flyDigit(String(t.d), src, cell, { onLand: () => { cell.textContent = t.d; sfx.pop(t.p); } });
      await sleep(240);
    }
    await sleep(500);
    zeros.forEach(p => paper.querySelector(`.g3n-cell[data-p="${p}"]`).classList.add('g3n-cell-empty'));
  };
  const opts = {
    max: len + 1,
    onType: (t) => { ansEl.textContent = t ? fmt(t) : ''; },
    onSubmit: async (t) => {
      if (Number(t) !== n) { ansEl.textContent = ''; st.wrong(ansEl, tipText); pad.want(opts); help(); return; }
      stepNow = 'fly';
      pad.off();
      setActive(paper, null);
      ansEl.innerHTML = numHtml(n);
      ansEl.classList.add('g3d-box-ok');
      paper.querySelectorAll('.g3n-cell-empty').forEach(c => c.classList.remove('g3n-cell-empty'));
      await digitsToTable(paper, ansEl, n, (s) => show(`${fmt(n)} gồm <b>${s}</b>.`), { only: (p, cell) => !cell.textContent });
      await sleep(400);
      done(st.mistakes, { ok: `${form === 'sum' ? terms.map(x => fmt(x.v)).join(' + ') : 'Số đó'} = ${fmt(n)}.`, tip: st.tip ? tipText : '' });
    },
  };
  pad.want(opts);
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => { if (stepNow === 'type') pad.type(String(n)); }, wrong: () => pad.type(String(terms.map(x => x.d).join(''))) };
}

// ── cmp: so sánh ──────────────────────────────────────────────────────────────────────────────────
function mountCmp(stage, m, api) {
  const { a, b } = m;
  const la = String(a).length, lb = String(b).length, L = Math.max(la, lb);
  const digitAt = (x, p) => { const s = String(x); return p < s.length ? s[s.length - 1 - p] : ''; };
  const cols = Array.from({ length: L }, (_, j) => L - 1 - j);
  const fd = cols.findIndex(p => digitAt(a, p) !== digitAt(b, p)); // cột đầu tiên khác nhau (-1: bằng nhau)
  const sign = a > b ? '>' : a < b ? '<' : '=';
  const board = `<div class="g3n g3n-cmp">
    <div class="g3n-cz"><div class="g3n-cols" style="--n:${L}">${cols.map((p, j) => `
      <button type="button" class="g3n-col" data-c="${j}" style="--pc:${PC[p]};--pb:${PB[p]}">
        <span class="g3n-ch">${PLC[p]}</span><span class="g3n-cd" data-r="a">${digitAt(a, p)}</span><span class="g3n-cd" data-r="b">${digitAt(b, p)}</span><span class="g3n-cm" data-m>&nbsp;</span>
      </button>`).join('')}</div></div>
    <div class="g3n-z" data-fit data-max=".14"><div class="g3n-in g3n-eq"><span>${fmt(a)}</span><span class="g3n-signbox" data-sign></span><span>${fmt(b)}</span></div></div>
    <div class="g3n-z g3n-signs" data-fit="kids" data-max=".13">${['>', '<', '='].map(s => `<button type="button" class="g3g-btn g3d-choice g3n-fk g3n-sbtn g3n-wait" data-s="${s}">${s}</button>`).join('')}</div>
  </div>`;
  const { paper, say, show, done, st } = frame(stage, api, board, 'g3n-k-cmp');
  const colEl = (j) => paper.querySelector(`[data-c="${j}"]`);
  let stepNow = 'col';
  const markEq = (upto) => { for (let j = 0; j <= upto; j++) { const c = colEl(j); if (!c.classList.contains('g3n-col-eq')) { c.classList.add('g3n-col-eq'); c.querySelector('[data-m]').textContent = '='; } } };
  const reason = () => {
    if (fd < 0) return `Mọi cặp chữ số đều giống nhau nên ${fmt(a)} = ${fmt(b)}.`;
    if (la !== lb) return `${fmt(la > lb ? a : b)} có ${Math.max(la, lb)} chữ số, ${fmt(la > lb ? b : a)} có ${Math.min(la, lb)} chữ số nên ${fmt(a)} ${sign} ${fmt(b)}.`;
    const p = cols[fd];
    return `Hàng ${PL[p]}: ${digitAt(a, p)} ${sign} ${digitAt(b, p)} nên ${fmt(a)} ${sign} ${fmt(b)}.`;
  };

  say('So sánh từ hàng cao nhất. Chạm vào hàng đầu tiên có hai chữ số khác nhau.', '👆 Chạm vào <b>hàng đầu tiên</b> (từ trái) có hai chữ số <b>khác nhau</b>.');
  setActive(paper, colEl(0));
  paper.querySelectorAll('[data-c]').forEach(c => {
    c.onclick = () => {
      if (stepNow !== 'col') return;
      sfx.tap();
      const j = Number(c.dataset.c);
      if (fd < 0 || j < fd) {
        markEq(j);
        if (fd < 0 && j === L - 1) { toSign(); return; }
        show(`Hàng ${PL[cols[j]]}: hai chữ số <b>giống nhau</b>. Xét hàng tiếp theo.`);
        setActive(paper, colEl(j + 1));
        return;
      }
      if (j > fd) { st.wrong(c, la !== lb ? 'Nhìn hàng cao nhất (bên trái) trước: số nào có nhiều chữ số hơn thì lớn hơn.' : 'So sánh lần lượt từ hàng cao nhất, từ trái sang phải. Có hàng ở bên trái đã khác nhau rồi.'); return; }
      if (fd > 0) markEq(fd - 1);
      c.classList.add('g3n-col-diff');
      c.querySelector('[data-m]').textContent = '≠';
      const big = a > b ? 'a' : 'b';
      if (c.querySelector(`[data-r="${big}"]`).textContent) c.querySelector(`[data-r="${big}"]`).classList.add('g3n-cd-big');
      toSign();
    };
  });
  function toSign() {
    stepNow = 'sign';
    setActive(paper, paper.querySelector('[data-sign]'));
    paper.querySelectorAll('[data-s]').forEach(x => x.classList.remove('g3n-wait'));
    const r = reason().replace(/ nên .*$/, '.');
    say(`${r.replace(/[<>=]/g, (s) => signWord(s))} Chọn dấu.`, `${r} Chọn <b>dấu</b>.`);
  }
  paper.querySelectorAll('[data-s]').forEach(btn => {
    btn.onclick = async () => {
      if (stepNow === 'col') { sfx.boing(); show('👆 Trước hết, chạm vào <b>hàng đầu tiên</b> có hai chữ số khác nhau.'); return; }
      if (stepNow !== 'sign') return;
      sfx.tap();
      if (btn.dataset.s !== sign) { st.wrong(btn, reason().replace(/[<>=]/g, (s) => signWord(s)), reason()); return; }
      stepNow = 'done';
      btn.classList.add('g3d-choice-ok');
      setActive(paper, null);
      const box = paper.querySelector('[data-sign]');
      await sleep(flyText(sign, btn, box, { onLand: () => { box.textContent = sign; box.classList.add('g3n-signbox-ok'); sfx.pop(3); } }) + 300);
      done(st.mistakes, { ok: `${fmt(a)} ${sign} ${fmt(b)}.`, tip: st.tip ? RULE_CMP : '' });
    };
  });
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => { if (stepNow === 'col') colEl(fd < 0 ? L - 1 : fd).click(); else if (stepNow === 'sign') paper.querySelector(`[data-s="${sign}"]`).click(); },
    wrong: () => { if (stepNow === 'col' && fd >= 0 && fd < L - 1) colEl(L - 1).click(); else paper.querySelector(`[data-s]:not([data-s="${sign}"])`).click(); } };
}

// ── round: làm tròn ───────────────────────────────────────────────────────────────────────────────
const X0 = 90, X1 = 910;
function lineSvg(n, lo, hi) {
  const P = hi - lo;
  const xv = X0 + ((n - lo) / P) * (X1 - X0);
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const x = X0 + i * (X1 - X0) / 10, h = i === 0 || i === 10 ? 34 : i === 5 ? 26 : 14;
    return `<path d="M${x} ${150 - h} V${150 + h}" stroke="${INK}" stroke-width="${i % 5 ? 3 : 5}" stroke-linecap="round"/>`;
  }).join('');
  return `<svg class="g3n-line" viewBox="0 0 1000 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <rect x="${X0}" y="141" width="${(X1 - X0) / 2}" height="18" fill="#BFDBFE" data-half="lo"/>
    <rect x="${(X0 + X1) / 2}" y="141" width="${(X1 - X0) / 2}" height="18" fill="#FED7AA" data-half="hi"/>
    <path d="M${X0 - 30} 150 H${X1 + 30}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    ${ticks}
    <text x="${X0}" y="225" text-anchor="middle" class="g3n-lt" data-end="lo">${fmt(lo)}</text>
    <text x="${X1}" y="225" text-anchor="middle" class="g3n-lt" data-end="hi">${fmt(hi)}</text>
    <text x="${(X0 + X1) / 2}" y="215" text-anchor="middle" class="g3n-lm">${fmt(lo + P / 2)}</text>
    <g class="g3n-mk" data-mk style="transform: translateX(0px)">
      <g transform="translate(${xv} 0)">
        <text x="0" y="62" text-anchor="middle" class="g3n-lv">${fmt(n)}</text>
        <path d="M-16 80 H16 L0 104 Z" fill="#EF4444" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="0" cy="150" r="15" fill="#EF4444" stroke="${INK}" stroke-width="4"/>
      </g>
    </g>
  </svg>`;
}

function mountRound(stage, m, api) {
  const { n, p } = m;
  const P = 10 ** p, lo = Math.floor(n / P) * P, hi = lo + P;
  const d = Math.floor(n / 10 ** (p - 1)) % 10;
  const up = d >= 5, r = up ? hi : lo;
  const len = String(n).length, di = len - p; // vị trí (từ trái) của chữ số cần nhìn
  const xv = X0 + ((n - lo) / P) * (X1 - X0);
  const board = `<div class="g3n g3n-round">
    <div class="g3n-z" data-fit data-max=".2"><div class="g3n-in g3n-colw">
      <span class="g3n-tag">🎯 Làm tròn đến hàng ${PL[p]}</span>
      <span class="g3n-rline"><span class="g3n-digs">${numHtml(n, 'button', 'g3n-dig')}</span><span class="g3n-arrow">→</span><span class="g3d-box g3n-ans2" style="--boxw:${boxW(hi)}" data-ans></span></span>
    </div></div>
    <div class="g3n-lz">${lineSvg(n, lo, hi)}</div>
    <div class="g3n-z g3n-ends" data-fit="kids" data-max=".07">
      <button type="button" class="g3g-btn g3d-choice g3n-fk g3n-end g3n-wait" data-e="lo"><span>⬇️ Làm tròn xuống</span><b>${fmt(lo)}</b></button>
      <button type="button" class="g3g-btn g3d-choice g3n-fk g3n-end g3n-wait" data-e="hi"><span>Làm tròn lên ⬆️</span><b>${fmt(hi)}</b></button>
    </div>
  </div>`;
  const { paper, say, show, done, st } = frame(stage, api, board, 'g3n-k-round');
  const ansEl = paper.querySelector('[data-ans]');
  const digs = paper.querySelectorAll('.g3n-dig');
  let stepNow = 'digit';
  const tipText = `Làm tròn đến hàng ${PL[p]}: nhìn chữ số hàng ${PL[p - 1]}. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`;

  say(`Làm tròn ${fmt(n)} đến hàng ${PL[p]}. Em nhìn chữ số nào?`, `Làm tròn đến <b>hàng ${PL[p]}</b>: chạm vào <b>chữ số cần nhìn</b>.`);
  digs.forEach(btn => btn.classList.add('g3n-dig-on'));
  digs.forEach(btn => {
    btn.onclick = () => {
      if (stepNow !== 'digit') return;
      sfx.tap();
      if (Number(btn.dataset.i) !== di) { st.wrong(btn, `Làm tròn đến hàng ${PL[p]} thì nhìn chữ số hàng ${PL[p - 1]}, ngay bên phải hàng ${PL[p]}.`); return; }
      stepNow = 'end';
      digs.forEach(x => x.classList.remove('g3n-dig-on'));
      setUse(paper, btn);
      paper.querySelectorAll('[data-e]').forEach(x => x.classList.remove('g3n-wait'));
      say(`Chữ số hàng ${PL[p - 1]} là ${d}. Làm tròn xuống hay làm tròn lên?`, `Chữ số hàng ${PL[p - 1]} là <b>${d}</b>. Làm tròn <b>xuống</b> hay <b>lên</b>?`);
    };
  });
  paper.querySelectorAll('[data-e]').forEach(btn => {
    btn.onclick = async () => {
      if (stepNow === 'digit') { sfx.boing(); show(`👆 Trước hết, chạm vào <b>chữ số cần nhìn</b> trong số ${fmt(n)}.`); return; }
      if (stepNow !== 'end') return;
      sfx.tap();
      const pickUp = btn.dataset.e === 'hi';
      if (pickUp !== up) { st.wrong(btn, `Chữ số ${d} ${up ? 'từ 5 trở lên' : 'bé hơn 5'} nên làm tròn ${up ? 'lên' : 'xuống'}.`); return; }
      stepNow = 'done';
      btn.classList.add('g3d-choice-ok');
      setUse(paper, null);
      // Chấm đỏ lăn về đầu mút gần hơn (bản êm: trượt chậm, không nảy)
      const mk = paper.querySelector('[data-mk]');
      mk.style.transform = `translateX(${(up ? X1 : X0) - xv}px)`;
      paper.querySelector(`[data-half="${up ? 'hi' : 'lo'}"]`).classList.add('g3n-half-on');
      sfx.pop(2);
      await sleep(900);
      const end = paper.querySelector(`[data-end="${up ? 'hi' : 'lo'}"]`);
      await sleep(flyDigit(fmt(r), end, ansEl, { onLand: () => { ansEl.textContent = fmt(r); ansEl.classList.add('g3d-box-ok'); sfx.pop(4); } }) + 300);
      done(st.mistakes, { ok: `Làm tròn ${fmt(n)} đến hàng ${PL[p]} được ${fmt(r)}.`, tip: st.tip ? tipText : '' });
    };
  });
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => { if (stepNow === 'digit') digs[di].click(); else if (stepNow === 'end') paper.querySelector(`[data-e="${up ? 'hi' : 'lo'}"]`).click(); },
    wrong: () => { if (stepNow === 'digit') digs[di === 0 ? 1 : 0].click(); else paper.querySelector(`[data-e="${up ? 'lo' : 'hi'}"]`).click(); } };
}

// ── next: số liền trước, liền sau ─────────────────────────────────────────────────────────────────
function mountNext(stage, m, api) {
  const { n } = m;
  const w = boxW(n + 1);
  const board = `<div class="g3n g3n-next">
    <div class="g3n-z g3n-head" data-fit data-max=".06"><div class="g3n-in"><span class="g3n-tag">🔢 Số liền trước, số liền sau</span></div></div>
    <div class="g3n-z g3n-trio" data-fit="kids" data-max=".16">
      <div class="g3n-arc g3n-arc-l"><span class="g3n-arcl" data-arc="prev">${MINUS} 1</span></div>
      <div class="g3n-arc g3n-arc-r"><span class="g3n-arcl" data-arc="next">+ 1</span></div>
      <div class="g3n-card g3n-fk"><span class="g3d-box g3n-nb" style="--boxw:${w}" data-b="prev"></span></div>
      <div class="g3n-card g3n-card-n g3n-fk" data-n>${fmt(n)}</div>
      <div class="g3n-card g3n-fk"><span class="g3d-box g3n-nb" style="--boxw:${w}" data-b="next"></span></div>
      <div class="g3n-lab g3n-fk">Số liền trước</div><div class="g3n-lab g3n-fk">Số đã cho</div><div class="g3n-lab g3n-fk">Số liền sau</div>
    </div>
  </div>`;
  const { paper, say, show, pad, done, st } = frame(stage, api, board, 'g3n-k-next');
  const nEl = paper.querySelector('[data-n]');
  const steps = [{ id: 'prev', v: n - 1, q: 'Số liền trước', rule: `Số liền trước bé hơn 1 đơn vị: ${fmt(n)} ${MINUS} 1 = ${fmt(n - 1)}.` },
    { id: 'next', v: n + 1, q: 'Số liền sau', rule: `Số liền sau lớn hơn 1 đơn vị: ${fmt(n)} + 1 = ${fmt(n + 1)}.` }];
  let s = 0, stepNow = 'type';
  const ask = (first) => {
    const S = steps[s], box = paper.querySelector(`[data-b="${S.id}"]`);
    setActive(paper, box);
    if (first) say(`${S.q} của ${fmt(n)} là số nào?`, `<b>${S.q}</b> của ${fmt(n)} là số nào?`);
    else show(`<b>${S.q}</b> của ${fmt(n)} là số nào?`);
    const opts = {
      max: String(S.v).length + 1,
      onType: (t) => { box.textContent = t ? fmt(t) : ''; },
      onSubmit: async (t) => {
        if (Number(t) !== S.v) { box.textContent = ''; st.wrong(box, S.rule); pad.want(opts); return; }
        pad.off();
        stepNow = 'fly';
        box.classList.add('g3d-box-ok');
        const arc = paper.querySelector(`[data-arc="${S.id}"]`);
        await sleep(flyText(S.id === 'prev' ? `${MINUS} 1` : '+ 1', nEl, arc, { onLand: () => { arc.classList.add('g3n-arc-ok'); sfx.pop(s + 2); } }) + 150);
        s++;
        if (s < steps.length) { stepNow = 'type'; ask(true); return; }
        stepNow = 'done';
        setActive(paper, null);
        done(st.mistakes, { ok: `${fmt(n - 1)}, ${fmt(n)}, ${fmt(n + 1)} là ba số liên tiếp.`, tip: st.tip ? 'Số liền trước: bớt 1. Số liền sau: thêm 1. Nhớ đổi các chữ số 9 thành 0 khi thêm 1.' : '' });
      },
    };
    pad.want(opts);
  };
  ask(true);
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => { if (stepNow === 'type') pad.type(String(steps[s].v)); }, wrong: () => { if (stepNow === 'type') pad.type(String(steps[s].v + 10)); } };
}

// ── maxmin: lớn nhất, bé nhất ─────────────────────────────────────────────────────────────────────
function mountMaxMin(stage, m, api) {
  const { list } = m;
  const max = Math.max(...list), min = Math.min(...list);
  const w = boxW(max);
  const board = `<div class="g3n g3n-mm">
    <div class="g3n-z g3n-head" data-fit data-max=".06"><div class="g3n-in"><span class="g3n-tag">🏆 Số lớn nhất, số bé nhất</span></div></div>
    <div class="g3n-z g3n-cards" data-fit="kids" data-max=".16">${list.map((x, i) => `<button type="button" class="g3g-btn g3d-choice g3n-fk g3n-pick" data-v="${x}" data-k="${i}">${fmt(x)}</button>`).join('')}</div>
    <div class="g3n-z" data-fit data-max=".1"><div class="g3n-in g3n-mmans">
      <span class="g3n-mmrow"><span>Số lớn nhất:</span><span class="g3d-box" style="--boxw:${w}" data-a="max"></span></span>
      <span class="g3n-mmrow"><span>Số bé nhất:</span><span class="g3d-box" style="--boxw:${w}" data-a="min"></span></span>
    </div></div>
  </div>`;
  const { paper, say, done, st } = frame(stage, api, board, 'g3n-k-mm');
  const steps = [{ id: 'max', v: max, q: 'số lớn nhất' }, { id: 'min', v: min, q: 'số bé nhất' }];
  let s = 0, stepNow = 'pick';
  const ask = () => {
    setActive(paper, paper.querySelector(`[data-a="${steps[s].id}"]`));
    say(`Chạm vào ${steps[s].q}.`, `👆 Chạm vào <b>${steps[s].q}</b>.`);
  };
  paper.querySelectorAll('[data-v]').forEach(btn => {
    btn.onclick = async () => {
      if (stepNow !== 'pick' || btn.disabled) return;
      sfx.tap();
      const S = steps[s];
      if (Number(btn.dataset.v) !== S.v) { st.wrong(btn, RULE_CMP); return; }
      stepNow = 'fly';
      btn.disabled = true;
      btn.classList.add(S.id === 'max' ? 'g3d-choice-ok' : 'g3n-pick-min');
      const box = paper.querySelector(`[data-a="${S.id}"]`);
      await sleep(flyText(fmt(S.v), btn, box, { onLand: () => { box.textContent = fmt(S.v); box.classList.add('g3d-box-ok'); sfx.pop(s + 2); } }) + 200);
      s++;
      if (s < steps.length) { stepNow = 'pick'; ask(); return; }
      stepNow = 'done';
      setActive(paper, null);
      done(st.mistakes, { ok: `Số lớn nhất là ${fmt(max)}, số bé nhất là ${fmt(min)}.`, tip: st.tip ? RULE_CMP : '' });
    };
  });
  ask();
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => { if (stepNow === 'pick') paper.querySelector(`[data-v="${steps[s].v}"]`).click(); },
    wrong: () => paper.querySelector(`[data-v]:not([data-v="${steps[s].v}"]):not(:disabled)`)?.click() };
}

const MOUNT = { write: mountWrite, read: mountRead, split: mountSplit, join: mountJoin, cmp: mountCmp, round: mountRound, next: mountNext, maxmin: mountMaxMin };

// ── Kiểu dáng ─────────────────────────────────────────────────────────────────────────────────────
let numStyles = false;
function injectNumStyles() {
  if (numStyles) return;
  numStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3n { flex: 1; min-height: 0; display: grid; gap: 2.2cqh; padding: 2.4cqh 3cqi 2.6cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3n > * { min-height: 0; min-width: 0; }
    .g3n-z { overflow: hidden; display: flex; align-items: center; justify-content: center; line-height: 1.15; }
    .g3n-in { max-width: 100%; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.15em 0.28em; text-align: center; }
    .g3n-colw { flex-direction: column; flex-wrap: nowrap; gap: 0.12em; }
    .g3n-tag { display: inline-block; font-size: min(0.5em, 4.4cqh, 3.4cqi); color: #7C3AED; background: #F3E8FF; border-radius: 999px; padding: 0.05em 0.8em; white-space: nowrap; }
    .g3n-head .g3n-tag { font-size: 1em; }
    .g3n-quote { color: #1E3A8A; }
    .g3n-quote::before { content: '“'; color: #94A3B8; } .g3n-quote::after { content: '”'; color: #94A3B8; }
    .g3n-sp { display: inline-block; width: 0.28em; }
    .g3n-d { display: inline-block; }
    .g3n-ans, .g3n-ans2, .g3n-term, .g3n-nb { height: 1.25em; white-space: nowrap; }
    .g3n-fly { width: 100%; height: 100%; display: grid; place-items: center; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #DC2626; line-height: 1.15; }
    .g3n-show { visibility: visible !important; }

    /* Bảng hàng: cột chia đều, chữ số to hết ô */
    .g3n-tz { container-type: size; display: flex; }
    .g3n-table { flex: 1; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); grid-template-rows: minmax(0, 0.38fr) minmax(0, 1fr);
      border: 2px solid #CBD5E1; border-radius: 0.9rem; overflow: hidden; background: #fff; }
    .g3n-th { display: grid; place-items: center; text-align: center; padding: 0 0.2em; line-height: 1.05; background: var(--pb); color: var(--pc); border-right: 2px solid #fff;
      font-size: min(11cqh, calc(19cqi / var(--n))); }
    .g3n-cell { display: grid; place-items: center; color: var(--pc); border-right: 2px dashed #E2E8F0; border-top: 2px solid #E2E8F0; line-height: 1;
      font-size: min(52cqh, calc(52cqi / var(--n))); }
    .g3n-th:last-of-type, .g3n-cell:last-child { border-right: none; }
    .g3n-cell-empty { background: #FEF9C3; box-shadow: inset 0 0 0 3px #F59E0B; animation: g3dBlink 1.1s ease-in-out infinite; }
    .g3n-cell.g3d-use { background: #FEF3C7; box-shadow: inset 0 0 0 4px #F59E0B; }
    @media (prefers-reduced-motion: reduce) { .g3n-cell-empty { animation: none; } }

    /* write / read */
    .g3n-write { grid-template-rows: minmax(0, 1.05fr) minmax(0, 0.95fr) minmax(0, 1.5fr); }
    .g3n-read { grid-template-rows: minmax(0, 1.2fr) minmax(0, 2fr); }
    .g3n-big { color: #1E293B; letter-spacing: 0.02em; }
    .g3n-opts { flex-direction: column; align-items: stretch; gap: 1.6cqh; }
    .g3n-opt { flex: 1 1 0; min-height: 0; font-size: 1em; line-height: 1.15; padding: 0.15em 0.6em; overflow: hidden; }
    .g3n-opt-x { text-decoration: line-through; text-decoration-color: #F87171; }

    /* split / join */
    .g3n-pv { grid-template-rows: auto minmax(0, 1.6fr) minmax(0, 1fr); }
    .g3n-head { min-height: 4cqh; }
    .g3n-eq { flex-wrap: wrap; white-space: nowrap; }
    .g3n-eq > span { white-space: nowrap; }
    .g3n-grp { display: inline-flex; align-items: center; gap: 0.28em; }
    .g3n-num { color: #1E293B; }
    .g3n-part { color: #1E3A8A; }
    .g3n-eq-words { font-size: 0.8em; }

    /* cmp: cột hàng là nút to */
    .g3n-cmp { grid-template-rows: minmax(0, 2fr) minmax(0, 0.75fr) minmax(0, 0.85fr); }
    .g3n-cz { container-type: size; display: flex; justify-content: center; }
    .g3n-cols { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 2cqi; width: min(100%, calc(var(--n) * 64cqh)); padding-bottom: 6px; box-sizing: border-box; }
    .g3n-col { display: grid; grid-template-rows: minmax(0, 0.5fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.45fr); padding: 0; border: 2px solid #CBD5E1; border-radius: 0.9rem; background: #fff; cursor: pointer;
      box-shadow: 0 5px 0 #CBD5E1; font-family: 'Baloo 2', sans-serif; font-weight: 800; overflow: hidden; touch-action: manipulation; }
    .g3n-col:active { transform: translateY(3px); box-shadow: 0 2px 0 #CBD5E1; }
    .g3n-ch { display: grid; place-items: center; background: var(--pb); color: var(--pc); font-size: min(8cqh, calc(16cqi / var(--n))); line-height: 1.05; padding: 0 0.2em; }
    .g3n-cd { display: grid; place-items: center; color: #1E293B; font-size: min(30cqh, calc(42cqi / var(--n))); line-height: 1; }
    .g3n-cd + .g3n-cd { border-top: 2px dashed #E2E8F0; }
    .g3n-cm { display: grid; place-items: center; font-size: min(10cqh, calc(20cqi / var(--n))); color: #94A3B8; line-height: 1; }
    .g3n-col.g3d-on { animation: none; box-shadow: 0 5px 0 #F59E0B, inset 0 0 0 3px #FDE68A; background: #FFFBEB; border-color: #F59E0B; }
    .g3n-col-eq { background: #F8FAFC; }
    .g3n-col-eq .g3n-cd { color: #94A3B8; }
    .g3n-col-diff { border-color: #F97316; box-shadow: 0 5px 0 #F97316; background: #FFF7ED; }
    .g3n-col-diff .g3n-cm { color: #EA580C; }
    .g3n-cd-big { color: #15803D; }
    .g3n-cd-big::after { content: ''; }
    .g3n-col-diff .g3n-cd-big { background: radial-gradient(circle, #DCFCE7 0 46%, transparent 48%); }
    .g3n-signbox { display: inline-grid; place-items: center; min-width: 1.15em; height: 1.2em; border: 3px dashed #93C5FD; border-radius: 0.2em; color: #1D4ED8; }
    .g3n-signbox-ok { border: 3px solid #86EFAC; background: #F0FDF4; color: #15803D; }
    .g3n-signs, .g3n-ends { gap: 3cqi; align-items: stretch; }
    .g3n-sbtn { flex: 1 1 0; max-width: 24cqi; font-size: 1em; line-height: 1; padding: 0; }
    .g3n-wait { opacity: 0.55; }

    /* round */
    .g3n-round { grid-template-rows: minmax(0, 1.25fr) minmax(0, 1.3fr) minmax(0, 0.8fr); }
    .g3n-rline { display: inline-flex; align-items: center; gap: 0.25em; white-space: nowrap; }
    .g3n-digs { display: inline-flex; align-items: center; }
    .g3n-digs .g3n-sp { width: 0.12em; }
    .g3n-dig { font: inherit; color: inherit; background: transparent; border: 0.04em solid transparent; border-radius: 0.18em; padding: 0 0.02em; margin: 0 0.015em; line-height: 1.1; cursor: default; }
    .g3n-dig-on { cursor: pointer; background: #EFF6FF; border: 0.05em dashed #60A5FA; box-shadow: 0 0.06em 0 #93C5FD; }
    .g3n-dig-on:active { transform: translateY(0.04em); box-shadow: none; }
    .g3n-dig.g3d-use { color: #C2410C; background: #FFEDD5; border: 0.05em solid #F97316; }
    .g3n-arrow { color: #94A3B8; }
    .g3n-lz { display: flex; min-height: 0; }
    .g3n-line { flex: 1; width: 100%; height: 100%; }
    .g3n-lt { font: 800 46px 'Baloo 2', sans-serif; fill: #1E293B; }
    .g3n-lm { font: 700 30px 'Baloo 2', sans-serif; fill: #94A3B8; }
    .g3n-lv { font: 800 46px 'Baloo 2', sans-serif; fill: #DC2626; }
    @container (aspect-ratio < 1.1) { .g3n-lt, .g3n-lv { font-size: 58px; } .g3n-lm { font-size: 36px; } }
    .g3n-mk { transition: transform .8s cubic-bezier(.3,1.25,.5,1); }
    .g3n-half-on { animation: g3nHalf 0.9s ease 1; }
    @keyframes g3nHalf { 50% { opacity: 0.4; } }
    @media (prefers-reduced-motion: reduce) { .g3n-mk { transition: transform 1.1s ease-in-out; } .g3n-half-on { animation: none; } }
    .g3n-end { flex: 1 1 0; max-width: 40cqi; font-size: 1em; display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.1; padding: 0.1em 0.4em; gap: 0.05em; }
    .g3n-end span { font-size: 0.75em; font-weight: 700; color: #475569; }
    .g3n-end b { font-size: 1.25em; }

    /* next */
    .g3n-next { grid-template-rows: auto minmax(0, 1fr); }
    .g3n-trio { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-template-rows: minmax(0, 0.7fr) minmax(0, 1.2fr) minmax(0, 0.5fr); column-gap: 1.5cqi; row-gap: 1.5cqh; align-items: stretch; }
    .g3n-arc { position: relative; display: flex; align-items: flex-start; justify-content: center; border: 0.09em solid #CBD5E1; border-bottom: none; border-radius: 50% 50% 0 0 / 100% 100% 0 0; margin: 0.75em 6% -0.1em; }
    .g3n-arc-l { grid-column: 2 / 4; grid-row: 1; }
    .g3n-arc-r { grid-column: 4 / 6; grid-row: 1; }
    .g3n-arc::after { content: ''; position: absolute; bottom: -0.1em; border: 0.22em solid transparent; border-top: 0.32em solid #CBD5E1; border-bottom: 0; }
    .g3n-arc-l::after { left: -0.27em; } .g3n-arc-r::after { right: -0.27em; }
    .g3n-arcl { margin-top: -0.55em; background: #fff; color: #94A3B8; padding: 0 0.3em; border-radius: 0.4em; font-size: 0.8em; white-space: nowrap; }
    .g3n-arc-ok { color: #15803D; background: #DCFCE7; }
    .g3n-card { grid-row: 2; display: flex; align-items: center; justify-content: center; background: #fff; border: 2px solid #CBD5E1; border-radius: 0.5em; white-space: nowrap; overflow: hidden; }
    .g3n-card:nth-of-type(3) { grid-column: 1 / 3; } .g3n-card-n { grid-column: 3 / 5; background: #EFF6FF; border-color: #93C5FD; color: #1E3A8A; } .g3n-card:nth-of-type(5) { grid-column: 5 / 7; }
    .g3n-card .g3d-box { border-width: 3px; }
    .g3n-lab { grid-row: 3; grid-column: span 2; display: flex; align-items: flex-start; justify-content: center; font-size: 0.42em; color: #64748B; white-space: nowrap; overflow: hidden; }

    /* maxmin */
    .g3n-mm { grid-template-rows: auto minmax(0, 2fr) minmax(0, 0.8fr); }
    .g3n-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 2.5cqh 3cqi; align-items: stretch; }
    @container (aspect-ratio > 1.6) { .g3n-cards { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: minmax(0, 0.8fr); align-content: center; } }
    .g3n-pick { font-size: 1em; line-height: 1; padding: 0; white-space: nowrap; overflow: hidden; }
    .g3d-choice.g3n-pick-min, .g3d-choice.g3n-pick-min:disabled { background: #E0F2FE; border-color: #0EA5E9; box-shadow: 0 6px 0 #0284C7; color: #075985; }
    .g3n-mmans { gap: 0.2em 1.4em; }
    .g3n-mmrow { display: inline-flex; align-items: center; gap: 0.3em; white-space: nowrap; }
    .g3n-mmrow > span:first-child { color: #475569; font-weight: 600; }
    .g3n-mmrow .g3d-box { height: 1.25em; }
  `;
  document.head.appendChild(st);
}
