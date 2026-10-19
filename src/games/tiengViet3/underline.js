/**
 * ✏️ Gạch chân bằng thước: mỗi hàng chữ có sẵn một thước 📏 bên dưới, bé kéo bút chì dọc thước để kẻ.
 * Các chữ có tâm nằm trong đoạn vừa kẻ được gạch (1 gạch hoặc 2 gạch theo bút đang chọn).
 * Chạm vào chữ đã gạch → xoá nét gạch đó.
 *
 * Đáp án: q.ans = { 1: ['cụm từ', …], 2: […] } (số = số gạch), q.ok = cụm gạch hay không đều được.
 * Cụm lặp lại trong bài: thêm '#2' để chỉ lần xuất hiện thứ hai (vd. 'xinh#2').
 * Câu trả lời của bé: { [chỉ số chữ]: số gạch }.
 */

import { WORD_KINDS } from './rules.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const key = (w) => w.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}-]/gu, '');

/** Tách các dòng thành chữ (tiếng), đánh số liên tục. */
export function tokensOf(q) {
  const out = [];
  q.lines.forEach((line, li) => {
    line.split(/\s+/).filter(Boolean).forEach(w => out.push({ w, k: key(w), line: li }));
  });
  return out;
}

/** Đáp án theo từng chữ: { expect: {i: n}, ok: Set(i), phrases: [{n, idx:[…], text}] }. */
export function expectedMarks(q) {
  const toks = tokensOf(q);
  const used = new Set();
  const find = (phrase) => {
    const [text, occ] = phrase.split('#');
    const want = text.split(/\s+/).map(key).filter(Boolean);
    let seen = 0;
    for (let i = 0; i + want.length <= toks.length; i++) {
      if (want.every((k, j) => toks[i + j].k === k)) {
        seen++;
        const idx = want.map((_, j) => i + j);
        if (occ ? seen === Number(occ) : !idx.some(x => used.has(x))) return idx;
      }
    }
    return null;
  };
  const expect = {};
  const phrases = [];
  for (const [n, list] of Object.entries(q.ans || {})) {
    for (const p of list) {
      const idx = find(p);
      if (!idx) { console.warn('[tv3] không thấy cụm gạch chân:', p); continue; }
      idx.forEach(i => { expect[i] = Number(n); used.add(i); });
      phrases.push({ n: Number(n), idx, text: p.split('#')[0] });
    }
  }
  const ok = new Set();
  for (const p of q.ok || []) (find(p) || []).forEach(i => ok.add(i));
  return { toks, expect, ok, phrases };
}

export function gradeUnderline(q, a = {}) {
  const { toks, expect, ok, phrases } = expectedMarks(q);
  const items = phrases.map(p => p.idx.every(i => Number(a[i]) === p.n));
  // chữ gạch thừa (không có trong đáp án): đếm theo từng cụm liền nhau
  let extra = 0;
  let prev = false;
  toks.forEach((_, i) => {
    const wrong = a[i] && !expect[i] && !ok.has(i);
    if (wrong && !prev) extra++;
    prev = wrong;
  });
  const good = items.filter(Boolean).length;
  const score = phrases.length ? Math.max(0, (good - extra) / phrases.length) : 0;
  return { score, items, extra, full: good === phrases.length && extra === 0 };
}

export function underlineAnswered(q, a) {
  return Object.values(a || {}).some(Boolean);
}

const PEN_COLOR = { 1: '#2563EB', 2: '#EA580C' };

function penLabel(m) {
  const lines = m.n === 2 ? '2 gạch' : '1 gạch';
  return `${lines}: ${WORD_KINDS[m.kind]?.name || m.label || ''}`;
}

/**
 * Vẽ câu gạch chân vào el.
 * mode 'do': bé gạch; 'show': xem bài của bé (đúng xanh, sai đỏ); 'key': đáp án đúng.
 */
export function mountUnderline(el, q, { a = {}, set, mode = 'do', hint } = {}) {
  const marks = q.marks || [{ n: 1, kind: q.kind }];
  const { toks, expect, ok } = expectedMarks(q);
  let state = { ...a };
  let pen = marks[0].n;
  const editable = mode === 'do';

  let i = 0;
  const linesHtml = q.lines.map((line, li) => {
    const words = line.split(/\s+/).filter(Boolean).map(w => `<span class="tvu-w" data-i="${i++}">${esc(w)}</span>`);
    return `<div class="tvu-line${q.prose ? ' is-prose' : ''}" data-line="${li}">${words.join(' ')}</div>`;
  }).join('');

  el.innerHTML = `
    <div class="tvu${editable ? ' is-do' : ''}">
      ${editable ? `
      <div class="tvu-tools">
        ${marks.map(m => `<button type="button" class="tvu-pen${m.n === pen ? ' is-on' : ''}" data-pen="${m.n}" style="--pen:${PEN_COLOR[m.n]}">
          <span class="tvu-pen-ico">✏️</span><span class="tvu-pen-sample n${m.n}"></span><span>${esc(penLabel(m))}</span></button>`).join('')}
        <button type="button" class="tvu-clear">↺ Xoá hết</button>
      </div>` : ''}
      <div class="tvu-text">
        ${linesHtml}
        <div class="tvu-layer"></div>
        ${editable ? '<div class="tvu-rulers"></div><div class="tvu-pencil" hidden>✏️</div>' : ''}
      </div>
    </div>`;

  const text = el.querySelector('.tvu-text');
  const layer = el.querySelector('.tvu-layer');
  const rulers = el.querySelector('.tvu-rulers');
  const pencil = el.querySelector('.tvu-pencil');
  const spans = [...el.querySelectorAll('.tvu-w')];

  // ── Đo vị trí chữ, chia hàng (một dòng thơ dài có thể xuống hàng) ──
  let rects = [];
  let rows = [];
  function measure() {
    const box = text.getBoundingClientRect();
    rects = spans.map(s => {
      const r = s.getBoundingClientRect();
      return { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top };
    });
    rows = [];
    rects.forEach((r, k) => {
      let row = rows.find(x => Math.abs(x.t - r.t) < 6);
      if (!row) rows.push(row = { t: r.t, b: r.b, l: r.l, r: r.r, idx: [] });
      row.l = Math.min(row.l, r.l); row.r = Math.max(row.r, r.r); row.b = Math.max(row.b, r.b);
      row.idx.push(k);
    });
    rows.sort((x, y) => x.t - y.t);
  }
  const rowOf = (k) => rows.findIndex(r => r.idx.includes(k));

  // ── Vẽ nét gạch ──
  function runs(map) {
    const out = [];
    let cur = null;
    toks.forEach((_, k) => {
      const n = Number(map[k]) || 0;
      if (n && cur && cur.n === n && rowOf(k) === cur.row && cur.to === k - 1) { cur.to = k; return; }
      if (cur) out.push(cur);
      cur = n ? { n, from: k, to: k, row: rowOf(k) } : null;
    });
    if (cur) out.push(cur);
    return out;
  }
  function bar(run, cls, color) {
    const l = rects[run.from].l - 2;
    const r = rects[run.to].r + 2;
    const y = rects[run.from].b + 1;
    const one = `<i class="tvu-bar ${cls}" style="left:${l}px;width:${r - l}px;top:${y}px;--c:${color}"></i>`;
    return run.n === 2 ? one + `<i class="tvu-bar ${cls}" style="left:${l}px;width:${r - l}px;top:${y + 5}px;--c:${color}"></i>` : one;
  }
  function paint() {
    measure();
    let html = '';
    if (mode === 'key') {
      html = runs(expect).map(r => bar(r, 'is-key', '#16A34A')).join('');
    } else {
      html = runs(state).map(r => {
        if (mode !== 'show') return bar(r, '', PEN_COLOR[r.n]);
        let right = true;
        for (let k = r.from; k <= r.to; k++) if (!(expect[k] === r.n || (ok.has(k) && !expect[k]))) right = false;
        return bar(r, right ? 'is-right' : 'is-wrong', right ? '#16A34A' : '#DC2626');
      }).join('');
      if (mode === 'show') {
        // chữ cần gạch mà bé bỏ sót: nét đứt
        const missed = {};
        toks.forEach((_, k) => { if (expect[k] && Number(state[k]) !== expect[k]) missed[k] = expect[k]; });
        html += runs(missed).map(r => bar(r, 'is-missed', '#16A34A')).join('');
      }
    }
    layer.innerHTML = html;
    // mỗi hàng chữ một thước đặt sẵn; nét gạch (kể cả gạch đôi) nằm ngay trên mép thước
    if (rulers) {
      rulers.innerHTML = rows.map(row => `<div class="tvu-ruler" style="left:${Math.max(0, row.l - 10)}px;width:${row.r - row.l + 20}px;top:${row.b + 10}px"><span class="tvu-ticks"></span></div>`).join('');
    }
  }

  const ro = new ResizeObserver(() => paint());
  ro.observe(text);
  requestAnimationFrame(paint);
  if (!editable) return { destroy: () => ro.disconnect() };

  const save = () => { set?.({ ...state }); paint(); };

  el.querySelectorAll('.tvu-pen').forEach(b => b.addEventListener('click', () => {
    pen = Number(b.dataset.pen);
    el.querySelectorAll('.tvu-pen').forEach(x => x.classList.toggle('is-on', x === b));
  }));
  el.querySelector('.tvu-clear').addEventListener('click', () => { state = {}; save(); });

  // ── Kẻ bằng bút chì dọc thước ──
  text.addEventListener('pointerdown', (e) => {
    measure();
    const box = text.getBoundingClientRect();
    const y = e.clientY - box.top;
    const x0 = e.clientX - box.left;
    // hàng bé chạm vào: theo chữ hoặc theo thước của hàng
    const r = rows.findIndex(row => y >= row.t - 4 && y <= row.b + 22);
    if (r < 0) return;
    const word = e.target.closest('.tvu-w');
    e.preventDefault();
    text.setPointerCapture?.(e.pointerId);
    const row = rows[r];
    const preview = document.createElement('i');
    preview.className = `tvu-bar is-preview${pen === 2 ? ' is-double' : ''}`;
    preview.style.setProperty('--c', PEN_COLOR[pen]);
    preview.style.top = `${row.b + 1}px`;
    layer.appendChild(preview);
    pencil.hidden = false;
    let x1 = x0;
    const draw = () => {
      const l = Math.max(row.l - 4, Math.min(x0, x1));
      const rr = Math.min(row.r + 4, Math.max(x0, x1));
      preview.style.left = `${l}px`;
      preview.style.width = `${Math.max(2, rr - l)}px`;
      pencil.style.left = `${Math.max(row.l - 4, Math.min(row.r + 4, x1))}px`;
      pencil.style.top = `${row.b - 22}px`;
    };
    draw();
    const move = (ev) => { x1 = ev.clientX - text.getBoundingClientRect().left; draw(); };
    const up = () => {
      text.removeEventListener('pointermove', move);
      text.removeEventListener('pointerup', up);
      text.removeEventListener('pointercancel', up);
      preview.remove();
      pencil.hidden = true;
      const lo = Math.min(x0, x1);
      const hi = Math.max(x0, x1);
      if (hi - lo < 8) { // chỉ chạm: xoá nét gạch ở chữ đó
        if (word && state[word.dataset.i]) eraseAt(Number(word.dataset.i));
        return;
      }
      const hit = row.idx.filter(k => { const c = (rects[k].l + rects[k].r) / 2; return c >= lo && c <= hi; });
      if (!hit.length) return;
      hit.forEach(k => { state[k] = pen; });
      save();
    };
    text.addEventListener('pointermove', move);
    text.addEventListener('pointerup', up);
    text.addEventListener('pointercancel', up);
  });

  function eraseAt(k) {
    const n = state[k];
    const row = rowOf(k);
    let a = k; while (a - 1 >= 0 && state[a - 1] === n && rowOf(a - 1) === row) a--;
    let b = k; while (b + 1 < toks.length && state[b + 1] === n && rowOf(b + 1) === row) b++;
    for (let j = a; j <= b; j++) delete state[j];
    save();
  }

  return { destroy: () => ro.disconnect() };
}
