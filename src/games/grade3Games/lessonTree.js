/**
 * 🌳 Cây "Bài nào có công cụ nào" cho bố mẹ, đặt bên phải danh sách công cụ Luyện Tính (renderGamesHub, tuỳ chọn lessonTree).
 * Gốc: Tập Một / Tập Hai → Bài N (tên bài + biểu tượng các công cụ, trò chơi) → mở ra: từng công cụ / trò chơi với các Cấp
 * luyện bài đó, chạm Cấp là vào thẳng màn giới thiệu cấp. Lấy từ `lessons[book]` + `also[book]` của từng cấp.
 *
 * opts: { book, split (số bài cuối của Tập Một), titleOf(n) → tên bài hoặc '',
 *         games?: { stalls, book, open({ stall, level, unit }) } — 🎮 trò chơi tăng cường của lớp: chỉ đọc danh mục nhẹ
 *         (grade*Games/catalog.js), code trò chơi tải khi bé chạm Cấp (open). }
 */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const numOf = (id) => Number(String(id).match(/-(\d+)$/)?.[1]);

/**
 * Map số bài → các dòng [{ kind: 'tool'|'game', key, icon, title, tool?, levels }]: công cụ trước (theo thứ tự danh sách),
 * trò chơi sau. `src` = [{ kind, book, stalls: [{ tool?, game }] }], game = { id, icon, title, levels }.
 */
function lessonIndex(srcs) {
  const byNum = new Map();
  srcs.forEach(({ kind, book, stalls }) => stalls.forEach(({ tool, game }) => game.levels.forEach((l) => {
    [...(l.lessons?.[book] || []), ...(l.also?.[book] || [])].forEach((id) => {
      const n = numOf(id);
      if (!n) return;
      if (!byNum.has(n)) byNum.set(n, []);
      const rows = byNum.get(n);
      const key = `${kind}:${game.id}`;
      let row = rows.find((r) => r.key === key);
      if (!row) rows.push(row = { kind, key, tool, stall: game.id, icon: game.icon, title: game.title, levels: [] });
      if (!row.levels.includes(l)) row.levels.push(l);
    });
  })));
  byNum.forEach((rows) => {
    rows.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'tool' ? -1 : 1));
    rows.forEach((r) => r.levels.sort((a, b) => a.n - b.n));
  });
  return new Map([...byNum].sort((a, b) => a[0] - b[0]));
}

export function lessonTreeHtml(tools, { book, split, titleOf, games }) {
  const srcs = [{ kind: 'tool', book, stalls: tools.flatMap((g) => g.stalls.filter((st) => st.game).map((st) => ({ tool: g.id, game: st.game }))) }];
  if (games) srcs.push({ kind: 'game', book: games.book || book, stalls: games.stalls.map((game) => ({ game })) });
  const index = lessonIndex(srcs);
  if (!index.size) return '';
  const nodes = [];
  index.forEach((rows, n) => nodes.push({ n, rows }));
  const parts = [
    { name: '📗 Tập Một', list: nodes.filter((x) => !split || x.n <= split) },
    { name: '📕 Tập Hai', list: nodes.filter((x) => split && x.n > split) },
  ].filter((p) => p.list.length);
  const count = (kind) => new Set(nodes.flatMap((x) => x.rows.filter((r) => r.kind === kind).map((r) => r.key))).size;
  const nGames = count('game');
  const lesson = ({ n, rows }) => `
      <details class="g3g-lt-bai" data-n="${n}">
        <summary>
          <b class="g3g-lt-num">Bài ${n}</b>
          <span class="g3g-lt-name">${esc(titleOf?.(n) || '')}</span>
          <span class="g3g-lt-icons">${rows.map((r) => `<i title="${esc(r.title)}"${r.kind === 'game' ? ' class="is-game"' : ''}>${r.icon}</i>`).join('')}</span>
        </summary>
        <ul>${rows.map((r) => `
          <li${r.kind === 'game' ? ' class="is-game"' : ''}><span class="g3g-lt-tool">${r.icon} ${esc(r.title)}${r.kind === 'game' ? ' <em>🎮 Trò chơi</em>' : ''}</span>
            <span class="g3g-lt-lvls">${r.levels.map((l) => `<button type="button" class="g3g-lt-lv" data-kind="${r.kind}" data-tool="${r.tool || ''}" data-stall="${r.stall}" data-level="${l.id}" data-unit="bai-${n}" title="${esc(l.title || '')}">Cấp ${l.n}</button>`).join('')}</span>
          </li>`).join('')}
        </ul>
      </details>`;
  return `
    <details class="g3g-ltree" data-book="${esc(book)}" open>
      <summary class="g3g-lt-head">🌳 Bài nào có công cụ nào?</summary>
      <p class="g3g-lt-sub">Dành cho bố mẹ: ${nodes.length} bài có ${count('tool')} công cụ luyện${nGames ? ` và ${nGames} trò chơi 🎮` : ''}. Chạm tên bài để xem, chạm Cấp để vào luyện.</p>
      <div class="g3g-lt-body">
        ${parts.map((p) => `
          <details class="g3g-lt-tap" open>
            <summary>${p.name} <small>${p.list.length} bài</small></summary>
            <div class="g3g-lt-list">${p.list.map(lesson).join('')}</div>
          </details>`).join('')}
      </div>
    </details>`;
}

// Bài vừa chọn trong cây, theo sách: quay lại Luyện Tính (từ màn cấp, từ trò chơi) thì cây mở sẵn đúng bài đó,
// cuộn tới bài, tô sáng; màn hẹp: mở lại ngăn kéo một lần ngay sau khi quay về.
const lastPick = new Map(); // book → { n, reopen }

/** Cuộn vùng cuộn `box` để `el` nằm khoảng một phần ba từ trên xuống. */
function scrollToIn(box, el) {
  const r = box.getBoundingClientRect();
  const z = box.offsetHeight ? r.height / box.offsetHeight : 1; // khối menu phóng to bằng CSS zoom (fitMenu): đổi px màn hình ra px cuộn
  const d = (el.getBoundingClientRect().top - r.top) / z;
  box.scrollTop += d - box.clientHeight / 3;
}

/**
 * Gắn sự kiện: chạm Cấp của công cụ → onLevel(g, game, level); của trò chơi → opts.games.open({ stall, level, unit }).
 * Màn ngang rộng: cây nằm bên phải danh sách. Màn hẹp (điện thoại, iPad dọc): cây vào ngăn kéo trượt từ cạnh phải,
 * mở / đóng bằng nút nổi 🌳 góc dưới (đặt trong .g3g-wrap, ngoài khối zoom, để position: fixed đúng chỗ).
 */
export function mountLessonTree(root, games, onLevel, opts = {}) {
  const tree = root.querySelector('.g3g-ltree');
  const split = tree?.parentElement;
  const wrap = root.querySelector('.g3g-wrap');
  if (!tree || !wrap) return;
  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'g3g-lt-fab';
  fab.setAttribute('aria-label', 'Bài nào có công cụ nào?');
  fab.innerHTML = '<span aria-hidden="true">🌳</span><b>Theo bài</b>';
  const drawer = document.createElement('div');
  drawer.className = 'g3g-lt-drawer';
  drawer.innerHTML = '<div class="g3g-lt-shade" data-close></div><div class="g3g-lt-panel" role="dialog" aria-modal="true"><button type="button" class="g3g-lt-close" data-close aria-label="Đóng">✕</button></div>';
  wrap.append(fab, drawer);
  const panel = drawer.querySelector('.g3g-lt-panel');
  const setOpen = (on) => {
    drawer.classList.toggle('is-open', on);
    fab.classList.toggle('is-hidden', on);
    fab.setAttribute('aria-expanded', on);
  };
  fab.onclick = () => setOpen(true);
  drawer.querySelectorAll('[data-close]').forEach((el) => { el.onclick = () => setOpen(false); });
  const mq = window.matchMedia('(orientation: landscape) and (min-width: 820px)');
  const place = () => {
    if (!tree.isConnected) { mq.removeEventListener('change', place); document.removeEventListener('keydown', onKey); return; }
    tree.open = true;
    tree.classList.toggle('in-drawer', !mq.matches);
    if (mq.matches) { split.append(tree); setOpen(false); fab.hidden = true; }
    else { panel.append(tree); fab.hidden = false; }
  };
  const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
  document.addEventListener('keydown', onKey);
  mq.addEventListener('change', place);
  place();
  const book = tree.dataset.book;
  const memo = lastPick.get(book);
  const bai = memo && tree.querySelector(`.g3g-lt-bai[data-n="${memo.n}"]`);
  if (bai) {
    bai.open = true;
    bai.classList.add('is-last');
    const tap = bai.closest('.g3g-lt-tap');
    if (tap) tap.open = true;
    if (!mq.matches && memo.reopen) setOpen(true);
    memo.reopen = false;
    requestAnimationFrame(() => scrollToIn(mq.matches ? tree : panel, bai));
  }
  tree.querySelectorAll('.g3g-lt-lv').forEach((b) => {
    b.onclick = () => {
      tree.querySelectorAll('.g3g-lt-bai.is-last').forEach((x) => x.classList.remove('is-last'));
      lastPick.set(book, { n: Number(b.closest('.g3g-lt-bai').dataset.n), reopen: true });
      if (b.dataset.kind === 'game') { opts.games?.open({ stall: b.dataset.stall, level: b.dataset.level, unit: b.dataset.unit }); return; }
      const g = games.find((x) => x.id === b.dataset.tool);
      const game = g?.stalls.find((st) => st.game?.id === b.dataset.stall)?.game;
      const l = game?.levels.find((x) => x.id === b.dataset.level);
      if (l) onLevel(g, game, l);
    };
  });
}

export const LESSON_TREE_CSS = `
  .g3g-hub-split { display: grid; grid-template-columns: 1fr; gap: 1rem; align-items: start; padding-bottom: 7.5rem; /* chừa chỗ nút nổi + nút ⤢, không che thẻ cuối */ }
  /* Nút nổi + ngăn kéo (màn hẹp) */
  .g3g-lt-fab { position: fixed; right: 16px; bottom: calc(66px + env(safe-area-inset-bottom, 0px)); /* trên nút ⤢ toàn màn hình (#global-fullscreen-btn, góc dưới phải) */ z-index: 40; display: flex; align-items: center; gap: 0.35rem; padding: 0.55rem 1rem 0.55rem 0.8rem; border: 3px solid #fff; border-radius: 999px; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 1rem/1 var(--g3g-font); cursor: pointer; box-shadow: 0 5px 0 #15803D, 0 10px 20px rgba(21,128,61,0.35); transition: transform .15s, opacity .15s; }
  .g3g-lt-fab[hidden] { display: none; }
  .g3g-lt-fab span { font-size: 1.5rem; line-height: 1; }
  .g3g-lt-fab:active { transform: translateY(3px); box-shadow: 0 2px 0 #15803D; }
  .g3g-lt-fab.is-hidden { opacity: 0; pointer-events: none; transform: scale(0.8); }
  .g3g-lt-drawer { position: fixed; inset: 0; z-index: 1300; /* đè cả nút ⤢ (z 1200) khi mở */ pointer-events: none; }
  .g3g-lt-shade { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.35); opacity: 0; transition: opacity .2s; }
  .g3g-lt-panel { position: absolute; top: 0; right: 0; bottom: 0; width: min(420px, 88vw); box-sizing: border-box; overflow: auto; padding: 0.8rem 0.7rem calc(1rem + env(safe-area-inset-bottom, 0px)); background: #F0F9FF; box-shadow: -8px 0 24px rgba(2,132,199,0.25); transform: translateX(100%); transition: transform .22s ease-out; }
  .g3g-lt-drawer.is-open { pointer-events: auto; }
  .g3g-lt-drawer.is-open .g3g-lt-shade { opacity: 1; }
  .g3g-lt-drawer.is-open .g3g-lt-panel { transform: none; }
  .g3g-lt-close { position: absolute; top: 1.15rem; right: 1.1rem; z-index: 1; width: 2.2rem; height: 2.2rem; border-radius: 50%; border: 0; background: #E0F2FE; color: #0369A1; font: 800 1rem/1 var(--g3g-font); cursor: pointer; }
  .g3g-ltree.in-drawer { box-shadow: none; }
  .g3g-ltree.in-drawer > .g3g-lt-head { pointer-events: none; padding-right: 2.6rem; }
  .g3g-ltree.in-drawer > .g3g-lt-head::after { display: none; }
  @media (prefers-reduced-motion: reduce) { .g3g-lt-panel, .g3g-lt-shade { transition: none; } }
  @media (orientation: landscape) and (min-width: 820px) {
    .g3g-hub-split { grid-template-columns: minmax(0, 1fr) minmax(280px, 30%); padding-bottom: 0; }
    .g3g-hub-split > .g3g-ltree { order: 0; position: sticky; top: 0.5rem; max-height: calc(100vh / var(--z, 1) - 1rem); overflow: auto; }
    .g3g-hub-split .g3g-list { grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); }
  }
  .g3g-ltree { box-sizing: border-box; background: #fff; border: 1.5px solid #D6EEF9; border-radius: 1.2rem; padding: 0.7rem 0.8rem 0.8rem; box-shadow: 0 6px 0 #BAE6FD, 0 10px 18px rgba(2,132,199,0.12); color: var(--g3g-ink); }
  .g3g-ltree summary { cursor: pointer; list-style: none; }
  .g3g-ltree summary::-webkit-details-marker { display: none; }
  .g3g-lt-head { font-weight: 800; font-size: 1.2rem; color: #0C4A6E; display: flex; align-items: center; gap: 0.4rem; }
  .g3g-lt-head::after, .g3g-lt-tap > summary::before, .g3g-lt-bai > summary::before { content: '▸'; color: #0EA5E9; transition: transform .15s; display: inline-block; }
  .g3g-lt-head::after { margin-left: auto; }
  .g3g-ltree[open] > .g3g-lt-head::after, .g3g-lt-tap[open] > summary::before, .g3g-lt-bai[open] > summary::before { transform: rotate(90deg); }
  .g3g-lt-sub { margin: 0.3rem 0 0.5rem; font-size: 0.88rem; line-height: 1.35; color: #64748B; font-weight: 600; }
  .g3g-lt-tap { margin-top: 0.3rem; }
  .g3g-lt-tap > summary { font-weight: 800; color: #1E3A5F; padding: 0.25rem 0.2rem; display: flex; align-items: center; gap: 0.35rem; }
  .g3g-lt-tap > summary small { font-weight: 700; color: #94A3B8; font-size: 0.8rem; }
  .g3g-lt-list { margin-left: 0.55rem; padding-left: 0.6rem; border-left: 2px solid #E0F2FE; display: flex; flex-direction: column; }
  .g3g-lt-bai > summary { display: grid; grid-template-columns: auto auto 1fr; grid-template-areas: 'm n x' 'm t t'; align-items: baseline; column-gap: 0.35rem; padding: 0.3rem 0.35rem; border-radius: 0.6rem; }
  .g3g-lt-bai > summary::before { grid-area: m; }
  .g3g-lt-bai > summary:hover { background: #F0F9FF; }
  .g3g-lt-bai.is-last { background: #FEF9C3; border-radius: 0.7rem; box-shadow: inset 3px 0 0 #FACC15; }
  .g3g-lt-bai.is-last > summary:hover { background: #FEF08A; }
  .g3g-lt-num { grid-area: n; color: #0369A1; white-space: nowrap; font-size: 0.95rem; }
  .g3g-lt-icons { grid-area: x; justify-self: end; display: flex; gap: 0.1rem; font-style: normal; }
  .g3g-lt-icons i { font-style: normal; font-size: 0.95rem; line-height: 1; }
  .g3g-lt-name { grid-area: t; font-size: 0.86rem; line-height: 1.3; color: #475569; font-weight: 600; }
  .g3g-lt-bai ul { list-style: none; margin: 0.1rem 0 0.4rem 1.1rem; padding: 0 0 0 0.6rem; border-left: 2px dashed #BAE6FD; display: flex; flex-direction: column; gap: 0.35rem; }
  .g3g-lt-bai li { display: flex; flex-direction: column; gap: 0.2rem; }
  .g3g-lt-tool { font-weight: 700; font-size: 0.9rem; color: #1E3A5F; }
  .g3g-lt-lvls { display: flex; flex-wrap: wrap; gap: 0.25rem; }
  .g3g-lt-lv { border: 1.5px solid #BAE6FD; background: #F0F9FF; color: #075985; border-radius: 999px; padding: 0.05rem 0.6rem; font: 700 0.82rem/1.5 var(--g3g-font); cursor: pointer; }
  .g3g-lt-lv:hover { background: #E0F2FE; border-color: #38BDF8; }
  .g3g-lt-tool em { font-style: normal; font-size: 0.72rem; font-weight: 800; color: #7C2D12; background: #FFEDD5; border-radius: 999px; padding: 0.02rem 0.45rem; margin-left: 0.2rem; white-space: nowrap; }
  .g3g-lt-bai li.is-game .g3g-lt-lv { border-color: #FDBA74; background: #FFF7ED; color: #9A3412; }
  .g3g-lt-bai li.is-game .g3g-lt-lv:hover { background: #FFEDD5; border-color: #FB923C; }
  .g3g-lt-icons i:not(.is-game) + i.is-game { margin-left: 0.3rem; padding-left: 0.3rem; border-left: 1.5px solid #FED7AA; }
`;
