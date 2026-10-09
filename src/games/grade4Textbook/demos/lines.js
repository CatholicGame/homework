/**
 * Ví dụ dãy tính (📘 Kiến thức SGK Toán 4): mỗi dòng là một biểu thức, mỗi bước viết thêm "= …" như sách
 * (2 + 3 + 4 = 5 + 4 = 9). Phần vừa tính được tô xanh, phần đem tính gạch chân cam.
 *
 *   { kind: 'expr', rows: [{ expr: '(5 + 4) + 6' }, { expr: '5 + (4 + 6)' }], same: true }
 *   { kind: 'expr', rows: [{ expr: '3 + a' }], vars: { a: 1 }, then: (v) => `${v} là một giá trị của biểu thức 3 + a.` }
 *   { kind: 'expr', rows: [{ segs: ['35 × 10', '10 × 35', '35 chục', '350'], caps: [mở đầu, …mỗi bước] }] }
 * Dòng có thể có label ("Cách 1:"), caps (lời từng bước, thay lời tự sinh). Tuỳ chọn của cả ví dụ:
 *   vars  thay chữ bằng số trước khi tính; same  cuối cùng nêu các dòng bằng nhau; outro/result  lời và kết quả cuối;
 *   ask   false: không hỏi; mặc định hỏi kết quả phép tính cuối của dòng đầu (dòng có expr).
 */

import { fmt, numAsk } from './util.js';

const OPS = { '+': '+', '-': '−', '−': '−', '×': '×', 'x': '×', '*': '×', ':': ':', '/': ':' };

function tokenize(s) {
  const out = [];
  const re = /\s*(\d+|[a-z]|[-+−×x*:/()])/gy;
  let m;
  while ((m = re.exec(s))) {
    const t = m[1];
    if (/\d/.test(t)) out.push({ k: 'n', v: Number(t) });
    else if (t === '(' || t === ')') out.push({ k: t });
    else if (/[a-z]/.test(t) && t !== 'x') out.push({ k: 'v', name: t });
    else out.push({ k: 'op', v: OPS[t] });
  }
  return out;
}

const apply = (x, op, y) => (op === '+' ? x + y : op === '−' ? x - y : op === '×' ? x * y : x / y);
const WORD = { '+': 'cộng', '−': 'trừ', '×': 'nhân', ':': 'chia' };

/**
 * Một bước tính: trong mỗi cặp ngoặc trong cùng (hoặc cả biểu thức nếu không còn ngoặc) tính một phép:
 * mỗi nhóm nhân chia (giữa các dấu +, −) tính phép nhân/chia đầu tiên; không còn nhân chia thì tính phép cộng/trừ đầu tiên.
 * Trả về { toks, done: [[vị trí đầu, cuối] ở biểu thức cũ], made: [vị trí ở biểu thức mới], why, parts }.
 */
function step(toks) {
  // tìm các đoạn cần tính: các ngoặc trong cùng, hoặc cả biểu thức
  const ranges = [];
  const stack = [];
  toks.forEach((t, i) => {
    if (t.k === '(') stack.push(i);
    if (t.k === ')') {
      const s = stack.pop();
      if (!toks.slice(s + 1, i).some(x => x.k === '(')) ranges.push([s + 1, i - 1, true]);
    }
  });
  const inParen = ranges.length > 0;
  if (!inParen) ranges.push([0, toks.length - 1, false]);
  const jobs = []; // [i của toán hạng trái]
  ranges.forEach(([a, b]) => {
    const md = [];
    for (let i = a + 1; i < b; i += 2) if (toks[i].v === '×' || toks[i].v === ':') md.push(i);
    if (md.length) {
      // phép nhân/chia đầu tiên của mỗi nhóm (nhóm ngăn bởi + −)
      let lastGroup = -1;
      md.forEach(i => {
        let g = 0;
        for (let j = a + 1; j < i; j += 2) if (toks[j].v === '+' || toks[j].v === '−') g++;
        if (g !== lastGroup) { jobs.push(i); lastGroup = g; }
      });
    } else if (b > a) jobs.push(a + 1);
  });
  const mixed = ranges.some(([a, b]) => {
    let md = false, pm = false;
    for (let i = a + 1; i < b; i += 2) { if (toks[i].v === '×' || toks[i].v === ':') md = true; else pm = true; }
    return md && pm;
  });
  const parts = jobs.map(i => ({ x: toks[i - 1].v, op: toks[i].v, y: toks[i + 1].v, r: apply(toks[i - 1].v, toks[i].v, toks[i + 1].v) }));
  // dựng biểu thức mới
  const out = [], made = [], done = [];
  for (let i = 0; i < toks.length; i++) {
    if (jobs.includes(i + 1)) {
      const p = parts[jobs.indexOf(i + 1)];
      done.push([i, i + 2]);
      made.push(out.length);
      out.push({ k: 'n', v: p.r });
      i += 2;
      continue;
    }
    out.push(toks[i]);
  }
  // bỏ ngoặc chỉ còn một số
  for (let i = 0; i < out.length; i++) {
    if (out[i].k === '(' && out[i + 2]?.k === ')' && out[i + 1].k === 'n') {
      out.splice(i + 2, 1); out.splice(i, 1);
      for (let k = 0; k < made.length; k++) if (made[k] > i) made[k] -= made[k] > i + 1 ? 2 : 1;
    }
  }
  const why = inParen ? 'Tính trong ngoặc trước' : mixed ? 'Nhân, chia trước; cộng, trừ sau' : toks.length > 3 ? 'Tính từ trái sang phải' : 'Tính';
  return { toks: out, done, made, why, parts };
}

function tokHtml(toks, { src = [], made = [] } = {}) {
  let h = '';
  toks.forEach((t, i) => {
    const startSrc = src.some(([a]) => i === a), endSrc = src.some(([, b]) => i === b);
    if (startSrc) h += '<span class="kx-src">';
    if (t.k === 'n') h += `<span class="${made.includes(i) ? 'kx-nw' : ''}">${fmt(t.v)}</span>`;
    else if (t.k === 'v') h += `<span class="kx-var">${t.name}</span>`;
    else if (t.k === '(') h += '(';
    else if (t.k === ')') h += ')';
    else h += ` ${t.v} `;
    if (endSrc) h += '</span>';
  });
  return h.replace(/\( /g, '(').replace(/ \)/g, ')');
}

const tokStr = (toks) => tokHtml(toks).replace(/<[^>]+>/g, '');

/** Các đoạn của một dòng: đoạn đầu là biểu thức, mỗi đoạn sau là "= …" (một bước tính). */
function rowSegmentsWithSrc(row, vars) {
  if (row.segs) return { segs: row.segs.map(() => ({})), value: null };
  let toks = tokenize(row.expr);
  const segs = [{ toks, made: [] }];
  if (vars && toks.some(t => t.k === 'v')) {
    const names = [...new Set(toks.filter(t => t.k === 'v').map(t => t.name))];
    const made = [];
    toks = toks.map((t, i) => { if (t.k === 'v') { made.push(i); return { k: 'n', v: vars[t.name] }; } return t; });
    segs.push({ toks, made, cap: `Thay ${names.map(nm => `<b>${nm} = ${vars[nm]}</b>`).join(', ')} vào biểu thức.` });
  }
  let guard = 0;
  while (toks.length > 1 && guard++ < 20) {
    const s = step(toks);
    segs[segs.length - 1].src = s.done;
    const calc = s.parts.map(p => `${fmt(p.x)} ${WORD[p.op]} ${fmt(p.y)} bằng ${fmt(p.r)}`).join('; ');
    segs.push({ toks: s.toks, made: s.made, cap: `${s.why}: <b>${calc}</b>.`, parts: s.parts });
    toks = s.toks;
  }
  return {
    segs: segs.map(g => ({ g, cap: g.cap, parts: g.parts })),
    value: toks[0]?.v,
    render: (g, live) => tokHtml(g.toks, { made: live ? g.made : [], src: live ? g.src || [] : [] }),
  };
}

function expr(spec) {
  const { rows, vars, same, outro, result, then } = spec;
  const built = rows.map(r => rowSegmentsWithSrc(r, vars));
  // kế hoạch các bước: [hàng, số đoạn hiện của hàng đó]
  const frames = [];
  const shown = rows.map(() => 0);
  const html = (cur, curSeg, srcSeg) => {
    let h = '<div class="kx">';
    rows.forEach((r, ri) => {
      const b = built[ri];
      h += `<div class="kx-row${ri === cur ? ' on' : ''}">${r.label ? `<span class="kx-label">${r.label}</span>` : ''}`;
      b.segs.forEach((s, si) => {
        const vis = si < shown[ri];
        const isNew = ri === cur && si === curSeg;
        const live = ri === cur && (si === curSeg || si === srcSeg);
        const content = r.segs ? r.segs[si] : b.render({ ...s.g, src: si === srcSeg && ri === cur ? s.g.src : null, made: si === curSeg && ri === cur ? s.g.made : [] }, live);
        h += `<span class="kx-seg${vis ? '' : ' kd-ghost'}${isNew ? ' is-new' : ''}${live && r.segs && si === curSeg ? ' kx-nwseg' : ''}">${si ? '<em>=</em> ' : ''}${content}</span>`;
      });
      h += '</div>';
    });
    return `${h}</div>`;
  };
  // đoạn đầu của mọi dòng hiện từ bước đầu
  rows.forEach((_, ri) => { shown[ri] = 1; });
  frames.push({ html: html(-1, -1, -1), caption: spec.intro || (vars ? `Tính giá trị của biểu thức khi ${Object.entries(vars).map(([k, v]) => `${k} = ${v}`).join(', ')}.` : rows.length > 1 ? 'Tính giá trị từng biểu thức, bước nào làm trước?' : 'Tính từng bước như sách.') });
  let asked = spec.ask === false;
  built.forEach((b, ri) => {
    const r = rows[ri];
    for (let si = 1; si < b.segs.length; si++) {
      const s = b.segs[si];
      const cap = r.segs ? r.caps?.[si] || '' : s.cap;
      const lastStep = si === b.segs.length - 1;
      if (!asked && !r.segs && lastStep && s.parts?.length === 1) {
        asked = true;
        const p = s.parts[0];
        frames.push({ html: html(ri, -1, si - 1), caption: `${fmt(p.x)} ${p.op} ${fmt(p.y)} = ?`, ask: numAsk(p.r, { near: p.op === '×' ? [p.x, -p.x, 10] : [1, -1, 10] }) });
      }
      shown[ri] = si + 1;
      frames.push({ html: html(ri, si, si - 1), caption: cap });
    }
    if (r.note) frames.push({ html: html(ri, -1, -1), caption: r.note });
  });
  const values = built.map(b => b.value);
  let res = result;
  if (!res && same && rows.every(r => r.expr)) res = `${rows.map(r => tokStr(tokenize(r.expr))).join(' = ')}`;
  if (!res && vars && rows[0].expr) res = `${tokStr(tokenize(rows[0].expr))} = ${fmt(values[0])}`;
  const fin = outro || (then ? then(values[0]) : same ? `Hai biểu thức có giá trị <b>bằng nhau</b> (cùng bằng ${fmt(values[0])}).` : res ? `Vậy <b>${res}</b>.` : '');
  if (fin || res) frames.push({ html: html(-1, -1, -1).replace(/class="kx"/, `class="kx${same ? ' is-same' : ''}"`), caption: fin, result: res || '' });
  return { title: spec.title || rows.map(r => (r.expr ? tokStr(tokenize(r.expr)) : r.segs[0].replace(/<[^>]+>/g, ''))).join(' và '), frames };
}

export const LINES = { expr };

export const LINES_CSS = `
  .kx { display: flex; flex-direction: column; align-items: flex-start; gap: 0.45em; font: 800 clamp(1.05rem, 5cqi, 1.75rem)/1.35 Quicksand, sans-serif; color: #1E293B; width: 100%; }
  .kx-row { display: flex; flex-wrap: wrap; align-items: center; column-gap: 0.35em; row-gap: 0.15em; padding: 0.15em 0.4em; border-radius: 0.5em; }
  .kx-row.on { background: #F0F9FF; }
  .kx.is-same .kx-row .kx-seg:last-child { color: #16A34A; }
  .kx-label { font-size: 0.75em; color: #7C3AED; margin-right: 0.2em; }
  .kx-seg { white-space: nowrap; }
  .kx-seg em { font-style: normal; color: #64748B; }
  .kx-nw, .kx-nwseg { color: #2563EB; }
  .kx-src { text-decoration: underline 0.12em #F97316; text-underline-offset: 0.18em; }
  .kx-var { color: #EA580C; background: #FFEDD5; border-radius: 0.3em; padding: 0 0.15em; }
  .kx .gw-frac { font-size: 0.8em; }
  .kx-x { text-decoration: line-through 0.12em #DC2626; color: #94A3B8; }
  .kx-flip { display: inline-block; color: #EA580C; }
  .is-new .kx-flip { animation: kxFlip 0.9s ease-out both; }
  @keyframes kxFlip { from { transform: rotateX(180deg); opacity: 0.3; } }
`;
