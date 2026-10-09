/**
 * Ví dụ trên bảng chữ số xếp thẳng cột theo hàng (📘 Kiến thức SGK Toán 4):
 * so sánh, sắp thứ tự, cộng, trừ, nhân, chia đặt tính, bảng hàng và lớp, bảng đơn vị đo, nhân với 10/100/1000.
 * Mọi hàng của bảng có sẵn từ bước đầu (chữ số chưa viết là ô trống), nên bảng không đổi cỡ giữa các bước.
 */

import { PLACES, CLASSES, esc, fmt, signHtml, numAsk } from './util.js';
import { docSo } from '../../../engine/numberWords.js';

const ROW_H = { head: 'auto', cls: 'auto', carry: '0.6em', borrow: '0.6em', num: '1.25em', sign: '0.95em', line: '0.4em', gap: '0.35em' };

/**
 * Bảng: các hàng (layout) × W cột chữ số; mỗi bước là một bản chụp của bảng.
 * opts.gaps: các cột có khoảng trống nhỏ bên trái (giữa hai lớp); mặc định tách lớp theo hàng (3 cột một lớp).
 */
function board(layout, W, { gaps, heads } = {}) {
  const cells = {};
  layout.forEach(r => { cells[r.k] = Array.from({ length: W }, () => null); });
  const b = { layout, W, cells, bands: [], spans: [], result: '', frames: [] };
  b.gaps = gaps || new Set(Array.from({ length: W }, (_, i) => i).filter(i => i > 0 && (W - 1 - i) % 3 === 2));
  b.put = (k, n, end = W - 1, extra = {}) => {
    const str = String(n);
    for (let j = 0; j < str.length; j++) cells[k][end - str.length + 1 + j] = { t: str[j], ...extra };
  };
  b.snap = (caption, more = {}) => {
    b.frames.push({ html: render(b), caption, result: b.result, ...more });
    Object.values(cells).forEach(row => row.forEach(c => { if (c) c.isNew = false; }));
    b.bands.forEach(x => { x.isNew = false; });
    b.spans.forEach(x => { x.isNew = false; });
  };
  if (cells.head) cells.head = cells.head.map((_, i) => ({ t: heads ? heads[i] : PLACES[W - 1 - i] || '' }));
  return b;
}

function render(B) {
  const cols = ['auto'], colOf = [];
  for (let i = 0; i < B.W; i++) {
    if (B.gaps.has(i)) cols.push('0.3em');
    cols.push('var(--kc)'); colOf[i] = cols.length;
  }
  const rows = B.layout.map(r => ROW_H[r.kind]);
  let h = '';
  B.bands.forEach(x => {
    const r1 = x.rows ? x.rows[0] + 1 : 1, r2 = x.rows ? x.rows[1] + 2 : rows.length + 1;
    const c2 = x.to != null ? colOf[x.to] + 1 : colOf[x.col] + 1;
    h += `<i class="kd-band is-${x.tone}${x.isNew ? ' is-new' : ''}" style="grid-column:${colOf[x.col]}/${c2};grid-row:${r1}/${r2}"></i>`;
  });
  B.spans.forEach(x => {
    h += `<span class="kd-span ${x.cls || ''}${x.isNew ? ' is-new' : ''}" style="grid-row:${x.row + 1};grid-column:${colOf[x.c1]}/${colOf[x.c2] + 1}">${x.t || ''}</span>`;
  });
  B.layout.forEach((r, ri) => {
    const row = ri + 1;
    if (r.lead) h += `<span class="kd-lead" style="grid-row:${row};grid-column:1">${r.lead}</span>`;
    if (r.kind === 'line') {
      const c1 = r.c1 != null ? colOf[r.c1] : 2, c2 = r.c2 != null ? colOf[r.c2] + 1 : cols.length + 1;
      h += `<i class="kd-line${r.show === false ? ' kd-ghost' : ''}" style="grid-row:${row};grid-column:${c1}/${c2}"></i>`;
      return;
    }
    if (!B.cells[r.k]) return;
    B.cells[r.k].forEach((c, i) => {
      if (!c) return;
      const cls = `kd-${r.kind}${c.c ? ` ${c.c}` : ''}${c.isNew ? ' is-new' : ''}`;
      h += `<span class="${cls}"${c.n ? ` data-n="${c.n}"` : ''} style="grid-row:${row};grid-column:${colOf[i]}">${esc(c.t)}</span>`;
    });
  });
  const ems = B.W * 1.3 + B.gaps.size * 0.3 + 1.6; // bề ngang bảng tính theo em: cỡ chữ = khung chia cho số này
  return `<div class="kd-board" style="--n:${ems};grid-template-columns:${cols.join(' ')};grid-template-rows:${rows.join(' ')}">${h}</div>`;
}

const digitAt = (n, W, i) => { const s = String(n); const k = i - (W - s.length); return k >= 0 ? Number(s[k]) : null; };

// ── So sánh hai số ───────────────────────────────────────────────────────────
function compare({ a, b }) {
  const la = String(a).length, lb = String(b).length, W = Math.max(la, lb);
  const B = board([{ k: 'head', kind: 'head' }, { k: 'a', kind: 'num' }, { k: 's', kind: 'sign' }, { k: 'b', kind: 'num' }], W);
  B.put('a', a); B.put('b', b);
  const fa = fmt(a), fb = fmt(b);
  B.snap(`So sánh <b>${fa}</b> và <b>${fb}</b>. Viết hai số thẳng hàng với nhau theo từng hàng.`);
  const count = (on) => ['a', 'b'].forEach(k => { let n = 0; B.cells[k].forEach(c => { if (c) c.n = on ? ++n : 0; }); });
  count(true);
  if (la !== lb) {
    const [small, big] = a < b ? [fa, fb] : [fb, fa];
    for (let i = 0; i < Math.abs(la - lb); i++) B.bands.push({ col: i, tone: 'diff', isNew: true });
    B.snap(`Đếm chữ số: ${fa} có <b>${la} chữ số</b>, ${fb} có <b>${lb} chữ số</b>.`);
    B.snap('Em chọn đi: số nào <b>bé hơn</b>?', { ask: { options: [fa, fb], answer: a < b ? 0 : 1, ok: `Đúng rồi! ${small} có ít chữ số hơn nên bé hơn.` } });
    B.result = `${fa} ${a < b ? '<' : '>'} ${fb}`;
    B.snap(`Số nào có ít chữ số hơn thì bé hơn. Vậy <b>${small} &lt; ${big}</b>, hay ${big} &gt; ${small}.`);
    return { title: `So sánh ${fa} và ${fb}`, frames: B.frames };
  }
  B.snap(`Hai số đều có <b>${W} chữ số</b>. Ta so từng cặp chữ số cùng hàng, bắt đầu từ hàng cao nhất (bên trái).`);
  count(false);
  for (let i = 0; i < W; i++) {
    const da = digitAt(a, W, i), db = digitAt(b, W, i), place = PLACES[W - 1 - i];
    B.bands = B.bands.filter(x => x.tone === 'eq');
    if (da === db) {
      B.cells.s[i] = { t: '=', c: 'eq', isNew: true };
      B.bands.push({ col: i, tone: 'hot', isNew: true });
      B.snap(i < W - 1
        ? `Hàng ${place}: ${da} và ${db} <b>bằng nhau</b>, xét tiếp hàng bên phải.`
        : `Hàng ${place}: ${da} và ${db} <b>bằng nhau</b>. Mọi cặp đều bằng nhau.`);
      B.bands[B.bands.length - 1].tone = 'eq';
      continue;
    }
    const sg = da < db ? '<' : '>';
    B.cells.s[i] = { t: '?', c: 'diff q', isNew: true };
    B.bands.push({ col: i, tone: 'diff', isNew: true });
    B.snap(`Hàng ${place}: ${da} và ${db} khác nhau. Em chọn dấu đúng: ${da} ? ${db}`,
      { ask: { options: [signHtml('<'), signHtml('>')], answer: sg === '<' ? 0 : 1, ok: `Đúng rồi! ${da} ${signHtml(sg)} ${db}.` } });
    B.cells.s[i] = { t: sg, c: 'diff', isNew: true };
    B.snap(`Hàng ${place}: <b>${da} ${signHtml(sg)} ${db}</b>. Đây là cặp đầu tiên khác nhau, cặp này quyết định số nào lớn hơn.`);
    for (let j = i + 1; j < W; j++) ['a', 'b'].forEach(k => { B.cells[k][j].c = 'dim'; });
    B.result = `${fa} ${sg} ${fb}`;
    const rev = sg === '<' ? '&gt;' : '&lt;';
    B.snap(`Vậy <b>${fa} ${signHtml(sg)} ${fb}</b>, hay ${fb} ${rev} ${fa}.${i < W - 1 ? ' Các hàng sau không cần so nữa.' : ''}`);
    return { title: `So sánh ${fa} và ${fb}`, frames: B.frames };
  }
  B.result = `${fa} = ${fb}`;
  B.snap(`Vậy <b>${fa} = ${fb}</b>.`);
  return { title: `So sánh ${fa} và ${fb}`, frames: B.frames };
}

// ── Xếp thứ tự nhiều số ─────────────────────────────────────────────────────
function order({ nums, desc = false }) {
  const W = Math.max(...nums.map(n => String(n).length));
  const keys = nums.map((_, i) => `n${i}`);
  const B = board([{ k: 'head', kind: 'head' }, ...keys.map(k => ({ k, kind: 'num' }))], W);
  nums.forEach((n, i) => B.put(keys[i], n));
  const list = nums.map(fmt).join('; ');
  B.snap(`Xếp các số ${list} theo thứ tự từ ${desc ? 'lớn đến bé' : 'bé đến lớn'}. Viết các số thẳng cột theo hàng.`);
  // nhóm các số còn "hoà" nhau; xét từng hàng từ trái sang phải
  let groups = [nums.map((_, i) => i)];
  const rank = []; // thứ tự đã biết
  const sorted = nums.map((n, i) => i).sort((x, y) => nums[x] - nums[y]);
  for (let col = 0; col < W && groups.some(g => g.length > 1); col++) {
    const place = PLACES[W - 1 - col];
    const parts = [];
    const next = [];
    B.bands = [{ col, tone: 'hot', isNew: true }];
    groups.forEach(g => {
      if (g.length < 2) { next.push(g); return; }
      const byDigit = new Map();
      g.forEach(i => { const d = digitAt(nums[i], W, col); if (!byDigit.has(d)) byDigit.set(d, []); byDigit.get(d).push(i); });
      const ds = [...byDigit.keys()].sort((x, y) => x - y);
      if (ds.length === 1) { parts.push(g.length === nums.length ? `đều là ${ds[0]}` : `${g.map(i => fmt(nums[i])).join(' và ')} đều có ${ds[0]}`); next.push(g); return; }
      parts.push(`${ds.join(' &lt; ')}` + (g.length < nums.length ? ` (${g.map(i => fmt(nums[i])).join(', ')})` : ''));
      ds.forEach(d => next.push(byDigit.get(d)));
      g.forEach(i => { B.cells[keys[i]][col].c = 'pick'; B.cells[keys[i]][col].isNew = true; });
    });
    groups = next;
    groups.forEach(g => { if (g.length === 1 && !rank.includes(g[0])) rank.push(g[0]); });
    // số thứ tự (từ bé đến lớn) cho các số đã rõ vị trí
    sorted.forEach((i, pos) => {
      const g = groups.find(x => x.includes(i));
      if (g.length === 1) { B.cells[keys[i]].forEach(c => { if (c) c.n = 0; }); const first = B.cells[keys[i]].find(Boolean); first.n = desc ? nums.length - pos : pos + 1; }
    });
    B.snap(`Hàng ${place}: ${parts.join('; ')}.`);
  }
  const out = (desc ? [...sorted].reverse() : sorted).map(i => fmt(nums[i]));
  B.bands = [];
  B.result = out.join('; ');
  B.snap(`Xếp theo thứ tự từ ${desc ? 'lớn đến bé' : 'bé đến lớn'}: <b>${out.join('; ')}</b>.`);
  return { title: `Xếp ${list} từ ${desc ? 'lớn đến bé' : 'bé đến lớn'}`, frames: B.frames };
}

// ── Cộng, trừ đặt tính ──────────────────────────────────────────────────────
function addSub({ kind, a, b }) {
  const op = kind === 'add' ? '+' : '−';
  const res = kind === 'add' ? a + b : a - b;
  const la = String(a).length, W = Math.max(la, String(b).length, String(res).length);
  const layout = [{ k: 'head', kind: 'head' }];
  if (kind === 'add') layout.push({ k: 'carry', kind: 'carry' });
  layout.push({ k: 'a', kind: 'num' }, { k: 'b', kind: 'num', lead: op });
  if (kind === 'sub') layout.push({ k: 'borrow', kind: 'borrow' });
  layout.push({ k: 'line', kind: 'line' }, { k: 'r', kind: 'num' });
  const B = board(layout, W);
  B.put('a', a); B.put('b', b);
  const fa = fmt(a), fb = fmt(b), fres = fmt(res);
  B.snap(`Đặt tính: viết ${fb} dưới ${fa}, các chữ số cùng hàng thẳng cột, viết dấu ${op}, kẻ gạch ngang. ${kind === 'add' ? 'Cộng' : 'Trừ'} từ phải sang trái.`);
  const steps = Math.max(la, String(b).length);
  let c = 0, asked = false;
  for (let k = 0; k < steps; k++) {
    const i = W - 1 - k, last = k === steps - 1;
    const x = digitAt(a, W, i) ?? 0, y = digitAt(b, W, i);
    let txt, val, next = 0, q;
    if (kind === 'add') {
      const s = x + (y ?? 0) + c;
      txt = y === null ? (c ? `${x} thêm 1 bằng ${s}` : `hạ ${x}`) : `${x} cộng ${y} bằng ${x + y}${c ? `, thêm 1 bằng ${s}` : ''}`;
      q = y === null ? null : `${x} cộng ${y}${c ? ', thêm 1' : ''} bằng mấy?`;
      if (s >= 10 && !last) { val = s % 10; next = 1; } else val = s;
      var full = s;
    } else {
      const yy = (y ?? 0) + c, parts = [];
      if (c && y !== null) parts.push(`${y} thêm 1 bằng ${yy}`);
      if (x < yy) {
        parts.push(`${x} không trừ được ${yy}, lấy ${x + 10} trừ ${yy} bằng ${x + 10 - yy}`); val = x + 10 - yy; next = 1;
        q = `${x + 10} trừ ${yy} bằng mấy?`;
      } else if (y === null && !c) { parts.push(`hạ ${x}`); val = x; }
      else { parts.push(`${x} trừ ${yy} bằng ${x - yy}`); val = x - yy; q = `${x} trừ ${yy} bằng mấy?`; }
      txt = parts.join(', ');
      full = val;
    }
    const lead0 = kind === 'sub' && last && val === 0 && k > 0;
    B.bands = [{ col: i, tone: 'hot', isNew: true }];
    // hỏi một lần, ở lượt đầu tiên có nhớ (hoặc lượt thứ hai nếu không có nhớ)
    if (!asked && q && (next || k === Math.min(1, steps - 1))) {
      asked = true;
      if (kind === 'sub' && x < (y ?? 0) + c) { B.cells.a[i].c = 'ten'; B.cells.a[i].isNew = true; }
      B.snap(`Hàng ${PLACES[k]}: ${q}`, { ask: numAsk(full, { near: [1, -1, 10, 2] }) });
      B.bands[0].isNew = false;
    } else if (kind === 'sub' && x < (y ?? 0) + c) { B.cells.a[i].c = 'ten'; B.cells.a[i].isNew = true; }
    if (!lead0) String(val).split('').reverse().forEach((d, j) => { B.cells.r[i - j] = { t: d, c: 'res', isNew: true }; });
    if (next) B.cells[kind === 'sub' ? 'borrow' : 'carry'][i - 1] = { t: kind === 'sub' ? '+1' : '1', isNew: true };
    const write = lead0 ? 'không viết chữ số 0 ở đầu' : `viết ${val}${next ? ' nhớ 1' : ''}`;
    B.snap(`Hàng ${PLACES[k]}: ${txt}, <b>${write}</b>.`);
    c = next;
  }
  B.bands = [];
  B.cells.r.forEach(x => { if (x) x.c = 'ok'; });
  B.result = `${fa} ${op} ${fb} = ${fres}`;
  B.snap(`Vậy <b>${fa} ${op} ${fb} = ${fres}</b>.`);
  return { title: `${fa} ${op} ${fb}`, frames: B.frames };
}

// ── Nhân đặt tính ───────────────────────────────────────────────────────────
const tz = (n) => { let z = 0; while (n && n % 10 === 0) { n /= 10; z++; } return [n, z]; };

function mul({ a, b }) {
  const res = a * b;
  const fa = fmt(a), fb = fmt(b), fres = fmt(res);
  const [A, za] = tz(a), [Bn, zb] = tz(b);
  const z = za + zb;
  const W = Math.max(String(res).length, String(a).length, String(b).length);
  const title = `${fa} × ${fb}`;
  if (String(Bn).length === 1) {
    // nhân với số có một chữ số (có thể có chữ số 0 ở tận cùng các thừa số)
    const B = board([{ k: 'head', kind: 'head' }, { k: 'carry', kind: 'carry' }, { k: 'a', kind: 'num' }, { k: 'b', kind: 'num', lead: '×' },
      { k: 'line', kind: 'line' }, { k: 'r', kind: 'num' }], W);
    B.put('a', a); B.put('b', b);
    B.snap(z
      ? `Đặt tính: viết ${fb} dưới ${fa}, các chữ số cùng hàng thẳng cột, viết dấu ×, kẻ gạch ngang.`
      : `Đặt tính: viết ${fb} dưới hàng đơn vị của ${fa}, viết dấu ×, kẻ gạch ngang. Nhân từ phải sang trái.`);
    if (z) {
      for (let j = 0; j < z; j++) B.cells.r[W - 1 - j] = { t: '0', c: 'zero', isNew: true };
      for (let j = 0; j < za; j++) B.cells.a[W - 1 - j].c = 'zero';
      for (let j = 0; j < zb; j++) B.cells.b[W - 1 - j].c = 'zero';
      B.snap(`${fa} và ${fb} có tất cả <b>${z} chữ số 0</b> ở tận cùng. Viết trước ${z === 1 ? 'một chữ số 0' : `${z} chữ số 0`} vào bên phải tích, rồi nhân ${fmt(A)} với ${Bn}.`);
    }
    const la = String(A).length;
    let c = 0, asked = false;
    for (let k = 0; k < la; k++) {
      const i = W - 1 - z - k, last = k === la - 1;
      const x = Number(String(A)[la - 1 - k]);
      const p = Bn * x + c;
      const txt = `${Bn} nhân ${x} bằng ${Bn * x}${c ? `, thêm ${c} bằng ${p}` : ''}`;
      let val, next = 0;
      if (p >= 10 && !last) { val = p % 10; next = Math.floor(p / 10); } else val = p;
      B.bands = [{ col: W - 1 - (k + za), tone: 'hot', isNew: true }];
      if (!asked && (next || k === Math.min(1, la - 1))) {
        asked = true;
        B.snap(`${Bn} nhân ${x}${c ? `, thêm ${c}` : ''} bằng mấy?`, { ask: numAsk(p, { near: [Bn, -Bn, 1, 10] }) });
        B.bands[0].isNew = false;
      }
      String(val).split('').reverse().forEach((d, j) => { B.cells.r[i - j] = { t: d, c: 'res', isNew: true }; });
      if (next) B.cells.carry[W - 2 - (k + za)] = { t: String(next), isNew: true };
      B.snap(`${txt}, <b>viết ${val}${next ? ` nhớ ${next}` : ''}</b>.`);
      c = next;
    }
    B.bands = [];
    B.cells.r.forEach(x => { if (x) x.c = 'ok'; });
    B.result = `${fa} × ${fb} = ${fres}`;
    B.snap(z ? `${fmt(A)} × ${Bn} = ${fmt(A * Bn)}, viết thêm ${z === 1 ? 'một chữ số 0' : `${z} chữ số 0`}: <b>${fa} × ${fb} = ${fres}</b>.` : `Vậy <b>${fa} × ${fb} = ${fres}</b>.`);
    return { title, frames: B.frames };
  }
  // nhân với số có hai, ba chữ số: các tích riêng
  const bd = String(b).split('').reverse().map(Number); // bd[j] = chữ số hàng j
  const parts = bd.map((d, j) => ({ d, j, v: a * d })).filter(p => p.d !== 0);
  const pk = parts.map((_, n) => `p${n}`);
  const layout = [{ k: 'a', kind: 'num' }, { k: 'b', kind: 'num', lead: '×' }, { k: 'line', kind: 'line' }];
  parts.forEach((_, n) => layout.push({ k: pk[n], kind: 'num', lead: n === Math.floor(parts.length / 2) && parts.length > 1 ? '+' : '' }));
  layout.push({ k: 'line2', kind: 'line' }, { k: 'r', kind: 'num' });
  const B = board(layout, W, { gaps: new Set() });
  B.put('a', a); B.put('b', b);
  const fine = bd.length === 2; // hai chữ số: từng chữ số một; ba chữ số: từng tích riêng
  const NAME = ['thứ nhất', 'thứ hai', 'thứ ba', 'thứ tư'];
  B.snap(`Đặt tính: viết ${fb} dưới ${fa}, các chữ số cùng hàng thẳng cột, viết dấu ×, kẻ gạch ngang.`);
  parts.forEach((p, n) => {
    const end = W - 1 - p.j;
    const skipped = p.j > 0 && bd.slice(1, p.j).some(d => d === 0);
    if (n > 0) {
      const cols = p.j === 1 ? 'một cột' : p.j === 2 ? 'hai cột' : `${p.j} cột`;
      B.bands = [{ col: W - 1 - p.j, tone: 'hot', isNew: true, rows: [1, 1] }];
      if (skipped) {
        B.snap(`Chữ số hàng chục của ${fb} là 0: tích riêng thứ hai gồm toàn chữ số 0, <b>không viết</b>.`);
      }
      const opts = p.j === 1 ? ['Thẳng cột với tích riêng thứ nhất', 'Lùi sang trái một cột'] : ['Lùi sang trái một cột', 'Lùi sang trái hai cột'];
      B.snap(`Nhân tiếp với chữ số <b>${p.d}</b> (hàng ${PLACES[p.j]}). Tích riêng này viết ở đâu?`, {
        ask: { options: opts, answer: 1, ok: `Đúng rồi! ${p.d} ở hàng ${PLACES[p.j]} nên tích riêng là số ${PLACES[p.j]}: viết <b>lùi sang trái ${cols}</b>, chữ số đầu tiên thẳng cột với ${p.d}.` },
      });
    }
    if (fine) {
      const la = String(a).length;
      let c = 0;
      for (let k = 0; k < la; k++) {
        const x = Number(String(a)[la - 1 - k]), pr = p.d * x + c, last = k === la - 1;
        let val, next = 0;
        if (pr >= 10 && !last) { val = pr % 10; next = Math.floor(pr / 10); } else val = pr;
        String(val).split('').reverse().forEach((d, jj) => { B.cells[pk[n]][end - k - jj] = { t: d, c: 'res', isNew: true }; });
        B.bands = [{ col: W - 1 - k, tone: 'hot', isNew: true, rows: [0, 0] }, { col: W - 1 - p.j, tone: 'hot', rows: [1, 1] }];
        B.snap(`${p.d} nhân ${x} bằng ${p.d * x}${c ? `, thêm ${c} bằng ${pr}` : ''}, <b>viết ${val}${next ? ` nhớ ${next}` : ''}</b>.`);
        c = next;
      }
    } else {
      B.put(pk[n], p.v, end, { c: 'res', isNew: true });
      B.bands = [{ col: W - 1 - p.j, tone: 'hot', isNew: true, rows: [1, 1] }];
      B.snap(`${fa} × ${p.d} = ${fmt(p.v)}: <b>tích riêng ${NAME[n]}</b> ${n ? `viết lùi sang trái ${p.j === 1 ? 'một' : 'hai'} cột` : 'viết thẳng cột với các thừa số'}.`);
    }
    B.cells[pk[n]].forEach(x => { if (x) x.c = ''; });
  });
  B.bands = [];
  if (fine) {
    // cộng từng cột từ phải sang trái
    let c = 0;
    for (let i = W - 1; i >= 0; i--) {
      const ds = pk.map(k => B.cells[k][i]).filter(Boolean).map(x => Number(x.t));
      if (!ds.length && !c) break;
      const s = ds.reduce((x, y) => x + y, 0) + c;
      const last = !pk.some(k => B.cells[k].slice(0, i).some(Boolean));
      const val = last ? s : s % 10, next = last ? 0 : Math.floor(s / 10);
      String(val).split('').reverse().forEach((d, jj) => { B.cells.r[i - jj] = { t: d, c: 'res', isNew: true }; });
      B.bands = [{ col: i, tone: 'hot', isNew: true }];
      const txt = ds.length === 1 && !c ? `hạ ${ds[0]}` : `${ds.join(' cộng ')} bằng ${s - c}${c ? `, thêm ${c} bằng ${s}` : ''}`;
      B.snap(`Cộng hai tích riêng: ${txt}, <b>viết ${val}${next ? ` nhớ ${next}` : ''}</b>.`);
      c = next;
      if (last) break;
    }
  } else {
    B.put('r', res, W - 1, { c: 'res', isNew: true });
    B.snap(`Cộng các tích riêng: ${parts.map(p => fmt(p.v)).join(' + ')} (thẳng cột như đã viết) được <b>${fres}</b>.`);
  }
  B.bands = [];
  B.cells.r.forEach(x => { if (x) x.c = 'ok'; });
  B.result = `${fa} × ${fb} = ${fres}`;
  B.snap(`Vậy <b>${fa} × ${fb} = ${fres}</b>.${parts.length > 1 ? ` ${parts.map((p, n) => `${fmt(p.v)} là tích riêng ${NAME[n]}`).join('; ')}.` : ''}`);
  return { title, frames: B.frames };
}

// ── Chia đặt tính ───────────────────────────────────────────────────────────
/**
 * mode 'short': chỉ viết số dư mỗi lượt (nhân rồi trừ nhẩm, như sách ở chia cho số có một chữ số và từ Bài 75).
 * mode 'full': viết tích dưới số đem chia, kẻ gạch, viết hiệu (Bài 72, 73).
 */
function div({ a, b, mode = 'short' }) {
  const D = String(a), L = D.length, q = Math.floor(a / b), r = a % b;
  const fa = fmt(a), fb = fmt(b);
  // các lượt chia
  const turns = [];
  let e = 0, cur = Number(D[0]);
  while (cur < b && e < L - 1) { e++; cur = cur * 10 + Number(D[e]); }
  for (;;) {
    const qd = Math.floor(cur / b), prod = qd * b, rem = cur - prod;
    turns.push({ e, cur, qd, prod, rem });
    if (e === L - 1) break;
    e++; cur = rem * 10 + Number(D[e]);
  }
  const Q = String(q), R = Math.max(String(b).length, Q.length);
  // dòng (trái): 0 số bị chia; mỗi lượt 'full': tích, gạch, hiệu; 'short': hiệu
  const rows = [{ kind: 'num' }];
  const at = []; // lượt n: { prod, line, rem } chỉ số dòng
  turns.forEach((t, n) => {
    const last = n === turns.length - 1;
    const x = {};
    if (mode === 'full' && t.qd) { x.prod = rows.length; rows.push({ kind: 'num' }); x.line = rows.length; rows.push({ kind: 'line' }); }
    if (t.qd || last) { x.rem = rows.length; rows.push({ kind: 'num' }); } else x.rem = n ? at[n - 1].rem : null;
    at.push(x);
  });
  const cells = rows.map(() => Array.from({ length: L + 1 + R }, () => null));
  const lines = []; // { row, c1, c2, show }
  const bands = [];
  const frames = [];
  const put = (row, str, end, extra = {}) => { String(str).split('').forEach((d, j) => { cells[row][end - String(str).length + 1 + j] = { t: d, ...extra }; }); };
  put(0, D, L - 1);
  put(0, String(b), L + String(b).length, { c: 'dvs' });
  for (let c = L + 1; c <= L + R; c++) if (!cells[0][c]) cells[0][c] = null;
  turns.forEach((t, n) => { if (at[n].line != null) lines.push({ row: at[n].line, c1: t.e - String(t.prod).length + 1, c2: t.e, show: false }); });
  const html = () => {
    const ncol = L + 1 + R;
    const colsCss = [...Array(L).fill('var(--kc)'), '0.5em', ...Array(R).fill('var(--kc)')].join(' ');
    let h = '';
    bands.forEach(x => { h += `<i class="kd-band is-${x.tone}${x.isNew ? ' is-new' : ''}" style="grid-column:${x.c1 + 1}/${x.c2 + 2};grid-row:${x.row + 1}"></i>`; });
    h += `<i class="kd-dbar" style="grid-column:${L + 2};grid-row:1/3"></i><i class="kd-dline" style="grid-column:${L + 2}/${ncol + 1};grid-row:1"></i>`;
    lines.forEach(x => { h += `<i class="kd-line${x.show ? '' : ' kd-ghost'}" style="grid-row:${x.row + 1};grid-column:${x.c1 + 1}/${x.c2 + 2}"></i>`; });
    cells.forEach((row, ri) => row.forEach((c, i) => {
      if (!c) return;
      h += `<span class="kd-num${c.c ? ` ${c.c}` : ''}${c.isNew ? ' is-new' : ''}" style="grid-row:${ri + 1};grid-column:${i + 1}">${esc(c.t)}</span>`;
    }));
    const rowsCss = rows.map(x => (x.kind === 'line' ? '0.3em' : '1.25em')).join(' ');
    const ems = L * 1.3 + 0.5 + R * 1.3 + 0.6;
    return `<div class="kd-board kd-div" style="--n:${ems};grid-template-columns:${colsCss};grid-template-rows:${rowsCss}">${h}</div>`;
  };
  const snap = (caption, more = {}) => {
    frames.push({ html: html(), caption, result: more.result || '', ...more });
    cells.forEach(row => row.forEach(c => { if (c) c.isNew = false; }));
    bands.forEach(x => { x.isNew = false; });
  };
  const qcol = (n) => L + 1 + n; // chữ số thứ n của thương
  snap(`Đặt tính: viết số bị chia ${fa} bên trái, số chia ${fb} bên phải, kẻ gạch; thương viết dưới số chia. Chia <b>từ trái sang phải</b>.`);
  let asked = false;
  turns.forEach((t, n) => {
    const row = n === 0 ? 0 : at[n - 1].rem;
    const c1 = t.e - String(t.cur).length + 1;
    bands.length = 0;
    bands.push({ row, c1, c2: t.e, tone: 'hot', isNew: true });
    const lead = n === 0
      ? (t.e > 0 && String(t.cur).length > 1 && Number(D.slice(0, t.e)) < b ? `${D.slice(0, t.e)} bé hơn ${fb} nên lấy ${t.cur}. ` : '')
      : '';
    if (!asked && t.qd > 0 && n === 0) {
      asked = true;
      snap(`${lead}${fmt(t.cur)} chia ${fb} được mấy?`, { ask: numAsk(t.qd, { near: [1, -1, 2], ok: `Đúng rồi! ${t.qd} × ${b} = ${t.qd * b}${t.qd * b <= t.cur ? ' không quá' : ''} ${t.cur}${(t.qd + 1) * b > t.cur ? `, còn ${t.qd + 1} × ${b} = ${(t.qd + 1) * b} thì quá ${t.cur}` : ''}.` }) });
    }
    cells[1][qcol(n)] = { t: String(t.qd), c: 'res', isNew: true };
    snap(`${n === 0 ? lead : ''}${fmt(t.cur)} chia ${fb} được <b>${t.qd}</b>, viết ${t.qd} ${n ? 'vào thương' : 'dưới số chia'}.`);
    if (mode === 'full' && t.qd) {
      put(at[n].prod, String(t.prod), t.e, { c: 'prod', isNew: true });
      snap(`${t.qd} nhân ${fb} bằng ${fmt(t.prod)}, <b>viết ${fmt(t.prod)}</b> dưới ${fmt(t.cur)}.`);
      lines.find(x => x.row === at[n].line).show = true;
    }
    const last = n === turns.length - 1;
    const remStr = String(t.rem);
    if (t.qd || last) {
      const rrow = at[n].rem;
      if (t.qd || rrow !== row) put(rrow, remStr, t.e, { c: 'rem', isNew: true });
    }
    const hint = mode === 'short' && t.qd ? `${t.qd} nhân ${fb} bằng ${fmt(t.prod)}; ${fmt(t.cur)} trừ ${fmt(t.prod)} bằng ${t.rem}` : t.qd ? `${fmt(t.cur)} trừ ${fmt(t.prod)} bằng ${t.rem}` : `${fmt(t.cur)} bé hơn ${fb}, còn ${t.rem}`;
    if (last) {
      snap(`${hint}, <b>viết ${t.rem}</b>.`);
    } else {
      const nd = D[t.e + 1];
      const rrow = at[n].rem;
      // hạ chữ số tiếp theo cạnh số dư
      cells[rrow][t.e + 1] = { t: nd, c: 'down', isNew: true };
      if (t.rem === 0 && cells[rrow][t.e] == null) cells[rrow][t.e] = { t: '0', c: 'rem', isNew: true };
      snap(`${hint}, viết ${t.rem}. <b>Hạ ${nd}</b>, được ${fmt(turns[n + 1].cur)}.`);
    }
  });
  bands.length = 0;
  for (let c = L + 1; c < L + 1 + R; c++) if (cells[1][c]) cells[1][c].c = 'ok';
  const result = r ? `${fa} : ${fb} = ${fmt(q)} (dư ${r})` : `${fa} : ${fb} = ${fmt(q)}`;
  snap(r ? `Lượt cuối còn ${r}, mà ${r} &lt; ${fb}: đó là <b>số dư</b>. Vậy <b>${fa} : ${fb} = ${fmt(q)} (dư ${r})</b>.` : `Vậy <b>${fa} : ${fb} = ${fmt(q)}</b>.`, { result });
  return { title: `${fa} : ${fb}`, frames };
}

// ── Bảng hàng và lớp ────────────────────────────────────────────────────────
/**
 * mode 'build': viết số từ số đơn vị mỗi hàng (Bài 6); 'classes': chỉ các lớp (Bài 8, 10);
 * 'read': tách lớp rồi đọc từng lớp (Bài 11); 'value': giá trị của từng chữ số (Bài 15).
 */
function place({ n, mode = 'build', W: Wmin = 0, ask: askDigit }) {
  const S = String(n), W = Math.max(S.length, Wmin);
  const ncls = Math.ceil(W / 3);
  const B = board([{ k: 'cls', kind: 'cls' }, { k: 'head', kind: 'head' }, { k: 'a', kind: 'num' }], W);
  for (let g = 0; g < ncls; g++) {
    const c2 = W - 1 - g * 3, c1 = Math.max(0, c2 - 2);
    B.spans.push({ row: 0, c1, c2, t: CLASSES[g], cls: `kd-clsh g${g}` });
  }
  const fn = fmt(n);
  const digits = S.split('').map(Number);
  const off = W - S.length;
  if (mode === 'build') {
    B.snap(`Số gồm ${digits.map((d, i) => `${d} ${PLACES[S.length - 1 - i]}`).join(', ')}. Viết từng chữ số vào đúng hàng, từ hàng cao nhất.`);
    digits.forEach((d, i) => {
      B.cells.a[off + i] = { t: String(d), c: 'res', isNew: true };
      B.bands = [{ col: off + i, tone: 'hot', isNew: true }];
      B.snap(`<b>${d} ${PLACES[S.length - 1 - i]}</b>: viết ${d} vào hàng ${PLACES[S.length - 1 - i]}.`);
    });
    B.bands = [];
    B.snap('Số này viết thế nào?', { ask: { options: [fmt(n), fmt(Number(S.split('').reverse().join(''))), fmt(Number(S.slice(0, -1)))].filter((v, i, x) => x.indexOf(v) === i), answer: 0, ok: `Đúng rồi! Viết lần lượt các chữ số từ hàng cao đến hàng thấp: <b>${fn}</b>.` } });
    B.result = fn;
    B.snap(`Viết số: <b>${fn}</b>. Đọc số: <b>${docSo(n)}</b>.`);
    return { title: `Viết và đọc số ${fn}`, frames: B.frames };
  }
  B.put('a', n);
  if (mode === 'classes' || mode === 'read') {
    B.snap(`Số <b>${fn}</b>. Tách số thành từng lớp, mỗi lớp ba hàng, tính từ phải sang trái.`);
    const reads = [];
    for (let g = 0; g < ncls; g++) {
      const c2 = W - 1 - g * 3, c1 = Math.max(off, c2 - 2);
      if (c1 > c2) break;
      B.bands = [{ col: c1, to: c2, tone: `cls${g}`, isNew: true }];
      B.spans[g].isNew = true; B.spans[g].cls += ' on';
      const ds = S.slice(c1 - off, c2 - off + 1);
      B.snap(`<b>${CLASSES[g]}</b> gồm các hàng ${PLACES.slice(g * 3, g * 3 + 3).reverse().join(', ')}: các chữ số ${ds.split('').join(', ')}.`);
    }
    if (askDigit != null) {
      const i = S.indexOf(String(askDigit));
      const g = Math.floor((S.length - 1 - i) / 3);
      B.bands = [{ col: off + i, tone: 'hot', isNew: true }];
      B.snap(`Chữ số <b>${askDigit}</b> thuộc lớp nào?`, { ask: { options: CLASSES.slice(0, ncls), answer: g, ok: `Đúng rồi! Chữ số ${askDigit} ở hàng ${PLACES[S.length - 1 - i]}, thuộc <b>${CLASSES[g]}</b>.` } });
    }
    if (mode === 'read') {
      B.bands = [];
      for (let g = ncls - 1; g >= 0; g--) {
        const c2 = W - 1 - g * 3, c1 = Math.max(off, c2 - 2);
        const val = Number(S.slice(c1 - off, c2 - off + 1));
        B.bands = [{ col: c1, to: c2, tone: `cls${g}`, isNew: true }];
        const name = ['', ' nghìn', ' triệu'][g];
        reads.push(val ? `${docSo(val)}${name}` : '');
        B.snap(`Đọc từ trái sang phải. ${CLASSES[g][0].toUpperCase() + CLASSES[g].slice(1)}: <b>${val}</b>${name ? ` → đọc "${docSo(val)}${name}"` : ` → đọc "${docSo(val)}"`}.`);
      }
      B.bands = [];
      B.result = fn;
      B.snap(`Đọc số: <b>${docSo(n)}</b>.`);
    } else {
      B.bands = [];
      B.result = fn;
      B.snap(`Mỗi lớp có ba hàng. Khi viết số, giữa hai lớp để một khoảng trống nhỏ: <b>${fn}</b>.`);
    }
    return { title: `Hàng và lớp của số ${fn}`, frames: B.frames };
  }
  // value: giá trị từng chữ số
  B.snap(`Số <b>${fn}</b>. Mỗi chữ số có giá trị tuỳ theo <b>vị trí</b> (hàng) của nó.`);
  const vals = [];
  for (let i = S.length - 1; i >= 0; i--) {
    const d = digits[i], pl = S.length - 1 - i, v = d * 10 ** pl;
    B.bands = [{ col: off + i, tone: 'hot', isNew: true }];
    vals.unshift(v);
    B.snap(`Chữ số ${d} ở hàng ${PLACES[pl]} có giá trị là <b>${fmt(v)}</b>.`);
  }
  B.bands = [];
  B.result = `${fn} = ${vals.filter(Boolean).map(fmt).join(' + ')}`;
  B.snap(`Viết thành tổng: <b>${fn} = ${vals.filter(Boolean).map(fmt).join(' + ')}</b>.`);
  return { title: `Giá trị các chữ số của ${fn}`, frames: B.frames };
}

// ── Bảng đơn vị đo (mỗi đơn vị một cột, hoặc hai cột với đơn vị diện tích) ──
const sp = (u) => (/^[a-z]+²?$/.test(u) ? '' : ' '); // 5kg, 48dm² viết liền; 5 yến, 2 tấn có khoảng trống

function units({ units: U, parts, to, w = 1, title }) {
  const W = U.length * w;
  const heads = Array(W).fill('');
  const B = board([{ k: 'cls', kind: 'cls' }, { k: 'a', kind: 'num' }], W, { gaps: new Set(U.map((_, i) => i * w).filter(Boolean)) });
  U.forEach((u, i) => B.spans.push({ row: 0, c1: i * w, c2: i * w + w - 1, t: u, cls: 'kd-unith' }));
  const endOf = (u) => U.indexOf(u) * w + w - 1;
  const from = parts.map(([v, u]) => `${fmt(v)}${sp(u)}${u}`).join(' ');
  B.snap(`Mỗi đơn vị gấp ${w === 2 ? '100' : '10'} lần đơn vị bé hơn liền nó, nên mỗi đơn vị có ${w === 2 ? '<b>hai chữ số</b>' : '<b>một chữ số</b>'} trong bảng. Đổi <b>${from}</b> ra ${to}.`);
  let lo = Infinity, hi = -1;
  parts.forEach(([v, u]) => {
    const e = endOf(u);
    B.put('a', v, e, { c: 'res', isNew: true });
    lo = Math.min(lo, e - String(v).length + 1); hi = Math.max(hi, e);
    B.bands = [{ col: e - String(v).length + 1, to: e, tone: 'hot', isNew: true }];
    B.snap(`Viết ${fmt(v)} sao cho chữ số cuối nằm ở cột <b>${u}</b>.`);
  });
  const toEnd = endOf(to);
  const filled = [];
  for (let i = lo; i <= Math.max(hi, toEnd); i++) if (!B.cells.a[i]) { B.cells.a[i] = { t: '0', c: 'zero', isNew: true }; filled.push(i); }
  B.bands = [];
  if (filled.length) B.snap('Các cột trống ở giữa (tới cột cần đổi) viết <b>chữ số 0</b>.');
  // đọc tới cột "to"
  const digits = B.cells.a.slice(lo, toEnd + 1).map(c => (c ? c.t : '0')).join('');
  const val = Number(digits);
  const rest = B.cells.a.slice(toEnd + 1).some(Boolean);
  B.bands = [{ col: lo, to: toEnd, tone: 'eq', isNew: true }];
  B.cells.a.slice(toEnd + 1).forEach(c => { if (c) c.c = 'dim'; });
  B.snap(`Đổi ${from} ra ${to} thì bằng bao nhiêu?`, { ask: numAsk(val, { near: [val * 9, -Math.floor(val * 0.9), val * 99], fmtFn: v => `${fmt(v)}${sp(to)}${to}` }) });
  B.result = `${from} = ${fmt(val)}${sp(to)}${to}`;
  B.snap(`Đọc các chữ số từ cột đầu tới cột <b>${to}</b>${rest ? '' : ''}: <b>${from} = ${fmt(val)}${sp(to)}${to}</b>.`);
  return { title: title || `${from} = ? ${to}`, frames: B.frames };
}

// ── Nhân, chia với 10, 100, 1000 ────────────────────────────────────────────
function shift({ n, by = [10, 100, 1000] }) {
  const max = n * by[by.length - 1];
  const W = String(max).length;
  const keys = ['a', ...by.map((_, i) => `r${i}`)];
  const B = board([{ k: 'head', kind: 'head' }, ...keys.map((k, i) => ({ k, kind: 'num', lead: i ? `×${fmt(by[i - 1])}` : '' }))], W);
  B.put('a', n);
  B.snap(`Số <b>${n}</b>. Nhân ${n} với 10, 100, 1000 thì các chữ số của ${n} dịch sang trái mấy hàng?`);
  by.forEach((k, i) => {
    const z = String(k).length - 1;
    const v = n * k;
    B.put(keys[i + 1], v, W - 1, { c: 'res', isNew: true });
    for (let j = 0; j < z; j++) B.cells[keys[i + 1]][W - 1 - j].c = 'zero';
    if (i === 1) B.snap(`${n} × ${fmt(k)} = ?`, { ask: numAsk(v, { near: [-n * k * 0.9, n * k * 9] }) });
    B.snap(`${n} × ${fmt(k)} = <b>${fmt(v)}</b>: viết thêm <b>${['một', 'hai', 'ba', 'bốn'][z - 1]} chữ số 0</b> vào bên phải ${n}. Mỗi chữ số lên ${z} hàng.`);
  });
  B.cells[keys[1]].forEach(c => { if (c) c.c = c.c === 'zero' ? 'strike' : ''; });
  B.result = `${fmt(n * by[0])} : ${fmt(by[0])} = ${n}`;
  B.snap(`Ngược lại: chia ${fmt(n * by[0])} cho ${by[0]} thì <b>bỏ bớt một chữ số 0</b> ở bên phải: ${fmt(n * by[0])} : ${by[0]} = ${n}.`);
  return { title: `${n} × 10, × 100, × 1000`, frames: B.frames };
}

// ── Nhân nhẩm số có hai chữ số với 11 ───────────────────────────────────────
function eleven({ n }) {
  const [x, y] = String(n).split('').map(Number), s = x + y, res = n * 11;
  const cell = (t, c = '', isNew = false) => `<span class="kd-e11 ${c}${isNew ? ' is-new' : ''}">${t}</span>`;
  const row = (a, mid, b, plus = '') => `<div class="kd-e11row">${a}${mid}${b}</div>${plus}`;
  const frames = [];
  const wrap = (h) => `<div class="kd-e11wrap">${h}</div>`;
  frames.push({ html: wrap(row(cell(x), cell('', 'kd-ghost'), cell(y))), caption: `Tính nhẩm <b>${n} × 11</b>. Tách hai chữ số ${x} và ${y} ra, để một chỗ trống ở giữa.` });
  frames.push({ html: wrap(row(cell(x, 'pick'), cell(s, 'mid', true), cell(y, 'pick'))), caption: `Cộng hai chữ số: <b>${x} + ${y} = ${s}</b>.`, ask: numAsk(s, { near: [1, -1, 10] }) });
  if (s < 10) {
    frames.push({ html: wrap(row(cell(x), cell(s, 'res', true), cell(y))), caption: `Viết ${s} vào giữa hai chữ số của ${n}: được <b>${res}</b>.`, result: `${n} × 11 = ${res}` });
  } else {
    frames.push({ html: wrap(row(cell(x), cell(s % 10, 'res', true), cell(y))), caption: `${s} lớn hơn 9: viết <b>${s % 10}</b> vào giữa, nhớ 1 sang bên trái.` });
    frames.push({ html: wrap(row(cell(x + 1, 'res', true), cell(s % 10, 'res'), cell(y))), caption: `Thêm 1 vào ${x}: ${x} + 1 = ${x + 1}. Được <b>${res}</b>.`, result: `${n} × 11 = ${res}` });
  }
  return { title: `${n} × 11 (nhân nhẩm)`, frames };
}

// ── Dấu hiệu chia hết ───────────────────────────────────────────────────────
function lastDigit({ n, by }) {
  const S = String(n), last = Number(S[S.length - 1]);
  const ok = by === 2 ? last % 2 === 0 : last % 5 === 0;
  const good = by === 2 ? '0; 2; 4; 6; 8' : '0 hoặc 5';
  const digits = (hl) => `<div class="kd-bigdigits">${S.split('').map((d, i) => `<span class="${i === S.length - 1 && hl ? `kd-ring ${ok ? 'yes' : 'no'} is-new` : ''}">${d}</span>`).join('')}</div>`;
  const q = Math.floor(n / by), r = n % by;
  const frames = [
    { html: digits(false), caption: `Số <b>${fmt(n)}</b> có chia hết cho ${by} không? Chỉ cần nhìn <b>chữ số tận cùng</b>.` },
    { html: digits(true), caption: `Chữ số tận cùng là <b>${last}</b>. ${fmt(n)} có chia hết cho ${by} không?`, ask: { options: ['Có', 'Không'], answer: ok ? 0 : 1, ok: ok ? `Đúng rồi! ${last} là một trong các chữ số ${good}.` : `Đúng rồi! ${last} không phải ${good}.` } },
    { html: digits(true), caption: ok ? `Số tận cùng là ${good} thì chia hết cho ${by}: <b>${fmt(n)} : ${by} = ${fmt(q)}</b>.` : `${fmt(n)} không chia hết cho ${by}: <b>${fmt(n)} : ${by} = ${fmt(q)} (dư ${r})</b>.${by === 2 ? ' Số không chia hết cho 2 là số lẻ.' : ''}`, result: ok ? `${fmt(n)} chia hết cho ${by}` : `${fmt(n)} không chia hết cho ${by}` },
  ];
  return { title: `${fmt(n)} có chia hết cho ${by}?`, frames };
}

function digitSum({ n, by }) {
  const ds = String(n).split('').map(Number), s = ds.reduce((x, y) => x + y, 0);
  const ok = s % by === 0;
  const row = (sum) => `<div class="kd-bigdigits">${ds.map((d, i) => `<span class="${sum ? 'pick' : ''}">${d}</span>${i < ds.length - 1 ? `<em class="${st(sum)}">+</em>` : ''}`).join('')}${sum ? '<em class="is-new">=</em><span class="kd-ring is-new ' + (ok ? 'yes' : 'no') + '">' + s + '</span>' : ''}</div>`;
  const st = (on) => (on ? 'is-new' : 'kd-ghost');
  const frames = [
    { html: row(false), caption: `Số <b>${n}</b> có chia hết cho ${by} không? Ta tính <b>tổng các chữ số</b>.` },
    { html: row(true), caption: `Tổng các chữ số: ${ds.join(' + ')} bằng mấy?`, ask: numAsk(s, { near: [1, -1, 2] }) },
    { html: row(true), caption: `Tổng là <b>${s}</b>. ${s} có chia hết cho ${by} không?`, ask: { options: ['Có', 'Không'], answer: ok ? 0 : 1, ok: ok ? `Đúng rồi! ${s} : ${by} = ${s / by}.` : `Đúng rồi! ${s} : ${by} = ${Math.floor(s / by)} (dư ${s % by}).` } },
    { html: row(true), caption: ok ? `Tổng các chữ số chia hết cho ${by}, nên <b>${n} chia hết cho ${by}</b> (${n} : ${by} = ${n / by}).` : `Tổng các chữ số không chia hết cho ${by}, nên <b>${n} không chia hết cho ${by}</b> (${n} : ${by} = ${Math.floor(n / by)}, dư ${n % by}).`, result: ok ? `${n} chia hết cho ${by}` : `${n} không chia hết cho ${by}` },
  ];
  return { title: `${n} có chia hết cho ${by}?`, frames };
}

export const BOARD = {
  compare, order, add: addSub, sub: addSub, mul1: mul, mul, div, place, units, shift, eleven, lastDigit, digitSum,
};

export const BOARD_CSS = `
  .kd-board { --kc: 1.3em; display: grid; justify-items: center; align-items: center; font: 800 clamp(1.05rem, calc(100cqi / var(--n)), 2.3rem)/1 Quicksand, sans-serif; }
  .kd-board > * { z-index: 1; }
  .kd-band { z-index: 0; align-self: stretch; justify-self: stretch; border-radius: 0.3em; margin: 0 0.04em; }
  .kd-band.is-hot { background: #BAE6FD; box-shadow: inset 0 0 0 2px #38BDF8; }
  .kd-band.is-eq { background: #DCFCE7; }
  .kd-band.is-diff { background: #FED7AA; box-shadow: inset 0 0 0 2px #FB923C; }
  .kd-band.is-cls0 { background: #DBEAFE; box-shadow: inset 0 0 0 2px #60A5FA; }
  .kd-band.is-cls1 { background: #FCE7F3; box-shadow: inset 0 0 0 2px #F472B6; }
  .kd-band.is-cls2 { background: #EDE9FE; box-shadow: inset 0 0 0 2px #A78BFA; }
  .kd-head { font-size: clamp(0.58rem, 0.29em, 0.72rem); font-weight: 700; color: #64748B; text-align: center; line-height: 1.15; padding: 0.25em 0.1em 0.5em; align-self: end; }
  .kd-span { justify-self: stretch; text-align: center; font-size: clamp(0.62rem, 0.3em, 0.8rem); font-weight: 800; line-height: 1.2; padding: 0.2em 0.1em; border-radius: 0.4em; margin: 0 0.06em 0.15em; }
  .kd-clsh { color: #94A3B8; border-bottom: 2px solid #E2E8F0; }
  .kd-clsh.on.g0 { color: #1D4ED8; border-color: #60A5FA; }
  .kd-clsh.on.g1 { color: #BE185D; border-color: #F472B6; }
  .kd-clsh.on.g2 { color: #6D28D9; border-color: #A78BFA; }
  .kd-unith { background: #F1F5F9; color: #334155; font-size: clamp(0.72rem, 0.36em, 0.95rem); }
  .kd-num { position: relative; width: var(--kc); text-align: center; color: #1E293B; }
  .kd-num.dim { color: #CBD5E1; }
  .kd-num.res, .kd-num.prod { color: #2563EB; }
  .kd-num.rem { color: #7C3AED; }
  .kd-num.down { color: #EA580C; }
  .kd-num.dvs { color: #0F766E; }
  .kd-num.ok { color: #16A34A; }
  .kd-num.zero { color: #16A34A; text-decoration: underline 0.08em; text-underline-offset: 0.12em; }
  .kd-num.strike { color: #94A3B8; text-decoration: line-through 0.1em #DC2626; }
  .kd-num.pick { color: #C2410C; }
  .kd-num[data-n]::after { content: attr(data-n); position: absolute; top: -0.3em; right: -0.1em; font-size: 0.36em; line-height: 1.4em; min-width: 1.4em;
    border-radius: 999px; background: #F59E0B; color: #fff; }
  .kd-num.ten::before { content: '1'; position: absolute; left: -0.12em; top: -0.12em; font-size: 0.45em; color: #DC2626; }
  .kd-carry, .kd-borrow { font-size: 0.45em; color: #DC2626; }
  .kd-sign { font-size: 0.75em; color: #16A34A; }
  .kd-sign.diff { font-size: 1em; color: #EA580C; }
  .kd-sign.q { color: #94A3B8; }
  .kd-lead { font-size: 0.6em; color: #475569; padding-right: 0.25em; white-space: nowrap; }
  .kd-line { justify-self: stretch; height: 3px; border-radius: 3px; background: #334155; }
  .kd-div .kd-dbar { justify-self: start; align-self: stretch; width: 3px; background: #334155; border-radius: 2px; margin-left: 0.2em; }
  .kd-div .kd-dline { align-self: end; justify-self: stretch; height: 3px; background: #334155; border-radius: 2px; margin-left: 0.2em; }
  .kd-e11wrap, .kd-bigdigits { display: flex; justify-content: center; align-items: center; gap: 0.15em; font: 800 clamp(2rem, 13cqi, 3.6rem)/1.1 Quicksand, sans-serif; color: #1E293B; padding: 0.4em 0; }
  .kd-e11row { display: flex; gap: 0.15em; }
  .kd-e11 { min-width: 1.1em; text-align: center; border-radius: 0.25em; }
  .kd-e11.mid { color: #EA580C; background: #FFEDD5; }
  .kd-e11.res { color: #16A34A; }
  .kd-e11.pick, .kd-bigdigits .pick { color: #C2410C; }
  .kd-bigdigits em { font-style: normal; color: #64748B; font-size: 0.7em; }
  .kd-ring { border-radius: 50%; padding: 0 0.18em; box-shadow: 0 0 0 0.08em currentColor; }
  .kd-ring.yes { color: #16A34A; }
  .kd-ring.no { color: #DC2626; }
`;
