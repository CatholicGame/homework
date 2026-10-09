/**
 * 📘 Kiến thức và 🔎 Khám phá trên bài tập của Lớp 1, 2, 3, 5 (như SGK Toán 4, grade4Textbook/related.js).
 *
 * Kiến thức của một sách: { [số bài]: mục }, mục là
 *   { title, page?, points: [quy tắc…], examples?: [ví dụ chữ], demos?: [ví dụ xem từng bước, xem knowledgeDemo.js] }
 *   hoặc { title, see: [số bài…] } cho bài Luyện tập / Ôn tập: hiện kiến thức của các bài đó.
 *
 * Khám phá của một sách: hai tệp để trang bài tập không phải tải công cụ khi chưa bấm:
 *   map.js   EXPLORE_MAP = { [số bài]: [mục…] }, mục là
 *              { key, title, when? }  Khám phá riêng (EXPLORES[key] trong index.js), when: /…/ lọc theo chữ của câu
 *              { reuse: 'g4:N' | 'g5:N', when? }  dùng lại Khám phá của Toán 4 / Toán 5 công cụ
 *              { see: N }  Khám phá của bài N (bài luyện tập)
 *   index.js EXPLORES = { [key]: { setup(board) → công cụ, steps: [async (c) => …] } } (grade4Tools/frame.js runExplore)
 *
 * makeRelated(sách) → cfg.related(unitId, q) cho renderWorkbook: [{ icon, label, open(host, close) }].
 */

import { demoHtml, bindDemos } from './grade4Textbook/knowledgeDemo.js';

const BOOKS = {
  g4: () => import('./grade4Tools.js'),
  g5: () => import('./grade5Tools.js'),
  x1: () => import('./grade1Explore/index.js'),
  x2: () => import('./grade2Explore/index.js'),
  x3: () => import('./grade3Explore/index.js'),
};

const MAX_EXPLORES = 3;
const baiOf = (unitId) => { const m = /^bai-(\d+)/.exec(String(unitId)); return m ? [Number(m[1])] : []; };

/** Chữ của câu (đề, nhãn, lựa chọn) để lọc Khám phá theo nội dung câu. */
export function questionText(q) {
  if (!q) return '';
  const parts = [q.q || '', q.prompt || '', q.text || ''];
  (q.blanks || q.inputs || []).forEach((b) => parts.push(b?.label || b?.before || '', b?.after || ''));
  (q.options || []).forEach((o) => parts.push(typeof o === 'string' ? o : o?.label || ''));
  (q.rows || []).forEach((r) => parts.push(Array.isArray(r) ? r.filter((c) => typeof c === 'string').join(' ') : r?.label || ''));
  return parts.join(' ').replace(/<[^>]+>/g, ' ');
}

/** Các bài có kiến thức để hiện cho danh sách bài ns (bài luyện tập → các bài trong see). */
export function knowledgeBais(knowledge, ns) {
  const out = [];
  const add = (n, depth = 0) => {
    const e = knowledge[n];
    if (!e || out.includes(n)) return;
    if (e.see) { if (depth < 2) e.see.forEach((k) => add(k, depth + 1)); return; }
    if (e.points?.length || e.demos?.length) out.push(n);
  };
  ns.forEach((n) => add(n));
  return out;
}

export function knowledgeSections(knowledge, ns, { book = '' } = {}) {
  return ns.map((n) => {
    const { title = '', page = '', points = [], examples = [], demos = [] } = knowledge[n];
    const ref = page || book;
    return `
      <section class="gw-kn-sec">
        <h3 class="gw-kn-h"><span>Bài ${n}</span>${title}${ref ? `<small>📖 ${ref}</small>` : ''}</h3>
        <ul class="gw-kn-points">${points.map((p) => `<li>${p}</li>`).join('')}</ul>
        ${examples.length || demos.length ? `<div class="gw-kn-ex"><b>Ví dụ</b>${examples.map((e) => `<p>${String(e).replace(/\n/g, '<br>')}</p>`).join('')}${demos.map(demoHtml).join('')}</div>` : ''}
      </section>`;
  }).join('');
}

/** Lớp 📘 Kiến thức: ns = các bài (đã qua knowledgeBais); extra = HTML thêm (vd. mục hình học Lớp 3). */
export function knowledgeItem(knowledge, ns, { book = '', extra = '' } = {}) {
  return {
    icon: '📘', label: 'Kiến thức',
    open(host, close) {
      injectStyles();
      host.innerHTML = `
        <div class="gw-kn">
          <div class="gw-kn-top">
            <button type="button" class="e3-back-icon lh-x" data-act="close" aria-label="Đóng">✕</button>
            <div class="gw-kn-title">📘 Kiến thức</div>
          </div>
          <div class="gw-kn-body">${knowledgeSections(knowledge, ns, { book })}${extra}
            <button type="button" class="e3-btn e3-btn-primary gw-kn-back lh-back" data-act="close">Làm tiếp bài tập ✏️</button>
          </div>
        </div>`;
      host.querySelectorAll('[data-act="close"]').forEach((b) => { b.onclick = close; });
      bindDemos(host);
    },
  };
}

/** Các mục Khám phá ({ ref, title }) của bài ns cho câu có chữ text. */
export function exploreRefs(map, xbook, ns, text = '') {
  const out = [];
  const add = (n, depth = 0) => {
    for (const e of [].concat(map[n] || [])) {
      if (e.when && !e.when.test(text)) continue;
      if (e.see != null) { if (depth < 2) [].concat(e.see).forEach((k) => add(k, depth + 1)); continue; }
      const ref = e.reuse || `${xbook}:${e.key}`;
      if (!out.some((o) => o.ref === ref)) out.push({ ref, title: e.title || '', n });
    }
  };
  ns.forEach((n) => add(n));
  return out.slice(0, MAX_EXPLORES);
}

/** Mở Khám phá ref ('g4:12', 'x2:b48') trong host; close() khi bé bấm ✕. */
export async function openExplore(host, ref, close, { title = '', book = '' } = {}) {
  injectStyles();
  host.innerHTML = '<div class="gw-kn-loading">🔎</div>';
  const [b, key] = ref.split(':');
  const m = await BOOKS[b]();
  if (!host.isConnected) return;
  if (b === 'g4' || b === 'g5') { if (!m.exploreIn(host, Number(key), close)) close(); return; }
  const ex = m.EXPLORES?.[key];
  if (!ex) { close(); return; }
  const [{ runExplore }, { injectGameStyles }, { preloadNpcs }] = await Promise.all([
    import('./grade4Tools/frame.js'), import('./grade3Games/styles.js'), import('./grade3Games/npc.js'),
  ]);
  if (!host.isConnected) return;
  injectGameStyles();
  preloadNpcs();
  runExplore(host, {
    id: `${b}-${key}`,
    title: `${ex.title || title}${book ? ` <small class="lh-ref">📖 ${book}</small>` : ''}`,
    setup: ex.setup, steps: ex.steps, onExit: close, onPractice: null,
  });
}

export function exploreItems(refs, { book = '' } = {}) {
  return refs.map(({ ref, title }, i) => ({
    icon: '🔎', label: refs.length > 1 ? `Khám phá ${i + 1}` : 'Khám phá',
    open(host, close) { openExplore(host, ref, close, { title, book }); },
  }));
}

/**
 * cfg.related cho một sách bài tập.
 *   book: 'Toán 2 Tập Một' (hiện ở 📖), knowledge, exploreMap, xbook ('x1' | 'x2' | 'x3'),
 *   bais(unitId) → [số bài] (mặc định 'bai-N' → [N]), extra(q) → HTML mục kiến thức thêm theo câu.
 */
export function makeRelated({ book = '', knowledge = {}, exploreMap = {}, xbook = '', bais = baiOf, extra = null }) {
  return (unitId, q) => {
    const ns = bais(unitId);
    const items = [];
    const kn = knowledgeBais(knowledge, ns);
    const more = extra ? extra(q) : '';
    if (kn.length || more) items.push(knowledgeItem(knowledge, kn, { book, extra: more }));
    items.push(...exploreItems(exploreRefs(exploreMap, xbook, ns, questionText(q)), { book }));
    return items;
  };
}

// ── Lớp phủ dùng ngoài trang bài tập (Toán 5 công cụ): giống openLayer của grade3Workbook.js ──────────
export function openLayer(item) {
  if (!item) return;
  injectStyles();
  document.activeElement?.blur?.();
  const layer = document.createElement('div');
  layer.className = 'gw-layer lh-solo'; // lh-solo: nút ✕ / Làm tiếp có kiểu riêng (trang không có CSS của vở bài tập)
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', item.label);
  document.body.appendChild(layer);
  let closed = false;
  const onKey = (e) => {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    const x = layer.querySelector('[data-act="quit"], [data-act="close"]');
    if (x) x.click(); else close();
  };
  function close() {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey, true);
    layer.remove();
  }
  document.addEventListener('keydown', onKey, true);
  item.open(layer, close);
}

// Cùng kiểu với lớp phủ của grade3Workbook.js (chèn lại ở đây cho trang không phải vở bài tập).
function injectStyles() {
  if (document.getElementById('lesson-help-css')) return;
  const s = document.createElement('style');
  s.id = 'lesson-help-css';
  s.textContent = `
    .gw-layer { position: fixed; inset: 0; z-index: 4000; display: flex; flex-direction: column; background: #F0F9FF; }
    .gw-layer > .g3g-wrap { flex: 1; min-height: 0; height: 100%; }
    .gw-kn { flex: 1; min-height: 0; display: flex; flex-direction: column; font-family: Quicksand, sans-serif; }
    .gw-kn-top { flex: none; display: flex; align-items: center; gap: 0.7rem; padding: 0.7rem 1rem; }
    .gw-kn-title { font-size: 1.35rem; font-weight: 800; color: #0C4A6E; }
    .gw-kn-body { flex: 1; min-height: 0; overflow-y: auto; padding: 0 1rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; align-items: center; }
    .gw-kn-sec { width: min(760px, 100%); background: #fff; border-radius: 1.2rem; padding: 1.1rem 1.3rem; box-shadow: 0 6px 0 #BAE6FD, 0 10px 24px rgba(2,132,199,0.12); }
    .gw-kn-h { margin: 0 0 0.6rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; font-size: 1.2rem; font-weight: 800; color: #1E293B; line-height: 1.3; }
    .gw-kn-h span { background: #0EA5E9; color: #fff; border-radius: 0.6rem; padding: 0.05rem 0.55rem; font-size: 0.95rem; }
    .gw-kn-h small { font-size: 0.85rem; font-weight: 700; color: #9A3412; background: #FFEDD5; border-radius: 999px; padding: 0.05rem 0.6rem; }
    .gw-kn-points { margin: 0; padding-left: 1.3rem; display: flex; flex-direction: column; gap: 0.45rem; font-size: 1.12rem; line-height: 1.55; color: #1E293B; }
    .gw-kn-points b { color: #0369A1; }
    .gw-kn-ex { margin-top: 0.8rem; background: #FEF9C3; border-left: 5px solid #FACC15; border-radius: 0.8rem; padding: 0.6rem 0.9rem; font-size: 1.08rem; line-height: 1.55; color: #422006; }
    .gw-kn-ex > b { display: block; color: #A16207; margin-bottom: 0.2rem; }
    .gw-kn-ex p { margin: 0.25rem 0; }
    .gw-kn-back { width: min(760px, 100%); }
    .gw-kn-fig { display: block; width: min(100%, 420px); max-height: 220px; margin: 0.2rem auto 0.8rem; }
    .gw-frac { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1.1; margin: 0 0.12em; font-size: 0.95em; }
    .gw-frac > span { padding: 0 0.2em; }
    .gw-frac > span + span { border-top: 2px solid currentColor; }
    .gw-kn-loading { margin: auto; font-size: 3rem; animation: pulse 1s infinite; }
    .lh-solo .lh-x { flex: none; width: 2.8rem; height: 2.8rem; border-radius: 999px; border: 2px solid #BAE6FD; background: #fff; color: #0C4A6E; font-size: 1.2rem; font-weight: 800; cursor: pointer; }
    .lh-solo .lh-back { min-height: 3.2rem; border: none; border-radius: 999px; background: linear-gradient(90deg, #0EA5E9, #0284C7); color: #fff; font: 800 1.15rem Quicksand, sans-serif; cursor: pointer; box-shadow: 0 4px 0 #075985; }
    .lh-ref { font-size: 0.7em; font-weight: 700; color: #9A3412; background: #FFEDD5; border-radius: 999px; padding: 0.05em 0.6em; margin-left: 0.3em; white-space: nowrap; }
    @media (min-width: 720px) {
      .gw-kn-points { font-size: 1.25rem; }
      .gw-kn-ex { font-size: 1.18rem; }
    }
  `;
  document.head.appendChild(s);
}
