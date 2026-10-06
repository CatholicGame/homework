/**
 * 🔎 Tìm bài trong "Học bằng công cụ" (Toán 4, Toán 5 dùng chung): tên bài, chủ đề, tên công cụ,
 * trang SGK, và lời thầy trong Khám phá / Thực hành (chữ viết trong các hàm bước, engine/listSearch.js).
 * Bài khớp còn lại trên danh sách (chủ đề không còn bài nào thì ẩn); khớp nhờ lời giảng thì hiện
 * thêm một đoạn ngắn dưới tên bài.
 */

import { searchBox, matcher, pickTest, prep, snippet, textOf, stringsOfFn, resultNote, plain } from '../../engine/listSearch.js';

const INDEX = new WeakMap(); // TOPICS → [{ n, head, body, f }]

function lessonText(n, { exploreOf, tasksOf }) {
  const parts = [];
  const ex = exploreOf(n);
  if (ex) {
    parts.push(stringsOfFn(ex.setup));
    (ex.steps || []).forEach((f) => parts.push(stringsOfFn(f)));
  }
  try {
    tasksOf(n).forEach((t) => {
      if (t.src !== n) return; // bài trộn: chỉ tên các bài gốc, không lặp cả nội dung
      Object.values(t).forEach((v) => parts.push(typeof v === 'function' ? stringsOfFn(v) : textOf(v)));
    });
  } catch { /* bài chưa có Thực hành */ }
  return parts.filter(Boolean).join(' · ');
}

function buildIndex(book) {
  if (INDEX.has(book.TOPICS)) return INDEX.get(book.TOPICS);
  const rows = [];
  book.TOPICS.forEach((t) => t.lessons.forEach((l) => {
    const full = book.lessonByN(l.n);
    const head = plain([
      // không lấy t.sub (dòng tóm tắt chủ đề): mọi bài trong chủ đề sẽ cùng khớp
      `Bài ${l.n}`, l.title, `Chủ đề ${t.num}`, t.title,
      ...l.tools.map((k) => book.TOOLS[k]?.name),
      full?.pages ? `trang ${full.pages.join(' ')}` : '',
      ...(l.mix || []).map((k) => book.lessonByN(k)?.title),
    ].filter(Boolean).join(' · '));
    const body = lessonText(l.n, book);
    rows.push({ n: l.n, head, body, ph: prep(head), pa: prep(`${head} · ${body}`) });
  }));
  INDEX.set(book.TOPICS, rows);
  return rows;
}

/**
 * Gắn ô tìm vào màn danh sách bài (sau p.g3g-lead). state = { q } giữ chữ đang tìm giữa các lần vẽ lại.
 * book = { TOPICS, TOOLS, lessonByN, exploreOf, tasksOf }.
 */
export function mountToolSearch(app, book, state) {
  const lead = app.querySelector('.g3g-lead');
  if (!lead) return;
  const note = document.createElement('div');
  note.className = 'ls-note';
  note.hidden = true;
  const box = searchBox({
    value: state.q,
    placeholder: 'Tìm bài, công cụ, kiến thức (vd. góc tù, ê ke)…',
    onQuery: (q) => { state.q = q; apply(); },
    cls: 'g4h-search',
  });
  lead.after(box, note);

  function apply() {
    app.querySelectorAll('.g4h-tile .ls-snip').forEach((e) => e.remove());
    const m0 = matcher(state.q);
    if (!m0) {
      app.querySelectorAll('.ls-hide').forEach((e) => e.classList.remove('ls-hide'));
      note.hidden = true;
      return;
    }
    const rows = buildIndex(book);
    const m = pickTest(m0, rows.map((r) => r.pa));
    let count = 0;
    rows.forEach(({ n, head, body, ph, pa }) => {
      const tile = app.querySelector(`.g4h-tile[data-n="${n}"]`);
      if (!tile) return;
      const byHead = m(ph);
      const ok = byHead || m(pa);
      tile.classList.toggle('ls-hide', !ok);
      if (!ok) return;
      count++;
      if (!byHead) {
        const snip = snippet(body, state.q, 80) || snippet(head, state.q, 80);
        if (snip) tile.querySelector('.g4h-info')?.insertAdjacentHTML('beforeend', `<span class="ls-snip">💬 ${snip}</span>`);
      }
    });
    app.querySelectorAll('.g4h-topic').forEach((sec) => {
      sec.classList.toggle('ls-hide', !sec.querySelector('.g4h-tile:not(.ls-hide)'));
    });
    resultNote(note, state.q, count, 'bài');
  }
  apply();
}
