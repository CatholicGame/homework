/**
 * 🎮 Trò chơi tăng cường Toán 3 — mở từ nút trong Vở bài tập / Luyện tập (grade3Workbook.js).
 * Bật / tắt bằng cờ GRADE3_GAMES (src/data/features.js).
 * Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md.
 *
 * ctx = { book: 'workbook'|'practice', units, unitName, storageKey, openUnit(unitId), onBack }
 *
 * Lớp khác dùng lại hub này với danh sách trò riêng: renderGamesHub(app, ctx, start, { games, kicker }) —
 * xem grade2Games.js.
 */

import { FRUIT_GAME } from './grade3Games/market/fruit.js';
import { EGG_GAME } from './grade3Games/market/eggs.js';
import { LEMON_GAME } from './grade3Games/market/lemonade.js';
import { CAKE_GAME } from './grade3Games/market/bakery.js';
import { RIBBON_GAME } from './grade3Games/market/ribbon.js';
import { TRUCK_GAME } from './grade3Games/trucks.js';
import { MACHINE_GAME } from './grade3Games/machine.js';
import { DETECTIVE_GAME } from './grade3Games/detective.js';
import { ROBOT_GAME } from './grade3Games/robot.js';
import { PIN_GAME } from './grade3Games/pinboard.js';
import { TRAIN_GAME } from './grade3Games/train.js';
import { playRound, bestFor } from './grade3Games/loop.js';
import { lessonText, stallLessonText, hasDoneAny, lessonUnits, bookName } from './grade3Games/lessons.js';
import { NPCS, npcPic, cap, preloadNpcs } from './grade3Games/npc.js';
import { injectGameStyles, menuBackdrop, fitMenu } from './grade3Games/styles.js';
import { getTotalStars } from '../engine/stars.js';
import { tablesForUnit } from './grade3Games/catalog.js';

export const GRADE3_LIST = [
  {
    id: 'market', icon: '🏪', title: 'Chợ phiên của bé',
    desc: 'Làm chủ quầy hàng: cân, đong, đếm và tính tiền cho khách!',
    tags: ['Khối lượng', 'Nhân', 'Tiền'],
    purpose: 'Giúp em thực hành kiến thức về khối lượng, mi-li-lít, mi-li-mét, phép nhân, phép chia và một phần mấy đã học trong bài. Em làm chủ quầy hàng ở chợ: cân, đong, đo, đếm, chia phần và tính tiền cho khách. Mỗi quầy luyện một nhóm kiến thức.',
    stalls: [
      { game: FRUIT_GAME, tags: 'kg · g · tính tiền' },
      { game: EGG_GAME, tags: 'nhân · chia · chia có dư' },
      { game: LEMON_GAME, tags: 'mi-li-lít · lít' },
      { game: CAKE_GAME, tags: 'một phần mấy · hình tròn' },
      { game: RIBBON_GAME, tags: 'mi-li-mét · xăng-ti-mét' },
    ],
  },
  // single: trò chỉ có một phần chơi — bấm thẻ là tới thẳng danh sách cấp (không có màn chọn quầy).
  {
    id: 'trucks', icon: '🚚', title: 'Xe chở hàng', single: true,
    desc: 'Điều phối kho hàng: tính cần mấy xe, xếp thùng lên xe cho xe chạy!',
    tags: ['Chia có dư', 'Hai bước tính'],
    stalls: [{ game: TRUCK_GAME }],
  },
  {
    id: 'machine', icon: '🔍', title: 'Máy phóng to – thu nhỏ', single: true,
    desc: 'Cỗ máy biến hình: gấp lên, giảm đi, đoán xem máy ra bao nhiêu!',
    tags: ['Gấp lên', 'Giảm đi', 'Gấp mấy lần'],
    stalls: [{ game: MACHINE_GAME }],
  },
  {
    id: 'detective', icon: '📐', title: 'Thám tử góc vuông', single: true,
    desc: 'Làm thám tử: áp ê-ke tìm góc vuông, điều tra hình chữ nhật, hình vuông, đếm hình ẩn!',
    tags: ['Góc vuông', 'Ê-ke', 'Hình tứ giác'],
    stalls: [{ game: DETECTIVE_GAME }],
  },
  {
    id: 'robot', icon: '🤖', title: 'Rô-bốt biểu thức', single: true,
    desc: 'Nạp mã năng lượng: tính giá trị biểu thức đúng thứ tự, lắp biểu thức ra đúng mã!',
    tags: ['Biểu thức', 'Thứ tự tính', 'Dấu ngoặc'],
    stalls: [{ game: ROBOT_GAME }],
  },
  {
    id: 'pinboard', icon: '🏗️', title: 'Kiến trúc sư bảng ghim', single: true,
    desc: 'Nhận đơn thiết kế: cắm ghim tìm trung điểm, căng dây tạo hình, vẽ đường tròn bằng compa, tô hình trang trí!',
    tags: ['Trung điểm', 'Hình chữ nhật', 'Compa'],
    stalls: [{ game: PIN_GAME }],
  },
  {
    id: 'train', icon: '🚆', title: 'Chuyến tàu Bắc – Nam', single: true,
    desc: 'Làm phụ tàu: đếm khách lên, xuống theo nhóm trăm, chục, tìm số người lên, xuống, lúc đầu!',
    tags: ['Cộng, trừ đến 1 000', 'Tìm thành phần'],
    stalls: [{ game: TRAIN_GAME }],
  },
];

/** "ki-lô-gam (lớp 2) và bảng nhân 2, bảng nhân 5" → ['ki-lô-gam (lớp 2)', 'bảng nhân 2', 'bảng nhân 5'] */
function knowledgeChips(text) {
  return text.split(/, | và /).map(s => s.trim()).filter(Boolean);
}

/**
 * start = { stall, level } (id trong catalog.js): mở thẳng màn giới thiệu cấp đó — từ biểu tượng trò chơi ở
 * menu bài hoặc nút gợi ý ở màn kết quả của một bài. Khi đó nút quay lại (màn giới thiệu, ✕ trong màn chơi)
 * về thẳng bài học (ctx.onBack) thay vì đi qua danh sách cấp → quầy → trò; chỉ khi em bấm "Chọn cấp khác"
 * mới vào luồng danh sách như bình thường.
 * start.unit = bài đang mở: cấp gắn với bài đó chỉ ra phép tính của bài — game.focus(level, focus) với
 * focus = unitFocus(book, unit) (lớp 3 Bài 4 → { tables: [2, 5] }; lớp 2: grade2Games/catalog.js unitFocus). Vào từ nút "Trò chơi tăng cường" / "Chọn cấp khác" thì đủ mọi bảng.
 * stallLessons: thẻ chọn quầy ghi thêm bài học của quầy ("📚 Bài 39, 40") — lớp 2 (mỗi quầy ít cấp, dòng ngắn).
 */
export function renderGamesHub(app, ctx, start = null, { games: GAMES = GRADE3_LIST, kicker = '🎮 Toán 3', stallLessons = false, unitFocus = tablesForUnit } = {}) {
  injectGameStyles();
  preloadNpcs();
  const found = start && GAMES.map(g => ({ g, s: g.stalls.find(s => s.game?.id === start.stall) })).find(x => x.s);
  const lv = found && found.s.game.levels.find(l => l.id === start.level);
  let fromLesson = !!lv;
  const unit = start?.unit;
  const unitFocused = unit && unitFocus ? unitFocus(ctx.book, unit) : null;
  // Chỉ các cấp luyện đúng bài đó (lessons / also) — "Cấp tiếp theo" sang bảng khác thì chơi như thường.
  const linked = (l) => l.lessons?.[ctx.book]?.includes(unit) || l.also?.[ctx.book]?.includes(unit);
  const focused = (game, l) => (fromLesson && unitFocused && game.focus && linked(l) ? game.focus(l, unitFocused) : l);
  if (lv) showIntro(found.g, found.s.game, lv);
  else showGames();

  const stallLesson = (game) => {
    const text = stallLessonText(game.levels, ctx);
    return text ? `<span class="g3g-stall-lesson">📚 ${text}</span>` : '';
  };

  function shell(inner) {
    app.innerHTML = `<div class="g3g-wrap g3g-menu">${menuBackdrop()}<div class="g3g-screen animate-fadeIn">${inner}</div></div>`;
    fitMenu(app);
    app.scrollTop = 0;
  }

  /** Thanh trên kiểu game: nút tròn quay lại + tiêu đề chữ nổi + (tuỳ chọn) số sao. */
  function topbar(title, { kicker = '', stars = false } = {}) {
    return `
      <div class="g3g-top">
        <button type="button" class="g3g-round-btn" data-act="back" aria-label="Quay lại">←</button>
        <div class="g3g-title">
          ${kicker ? `<span class="g3g-kicker">${kicker}</span>` : ''}
          <h1>${title}</h1>
        </div>
        ${stars ? `<span class="g3g-stars">⭐ ${getTotalStars()}</span>` : '<span class="g3g-top-spacer"></span>'}
      </div>`;
  }

  function showGames() {
    shell(`
      ${topbar('Trò chơi tăng cường', { kicker, stars: true })}
      <p class="g3g-lead">Mỗi lần chơi là một lượt mới: số mới, khách mới!</p>
      <div class="g3g-list">
        ${GAMES.map(g => `
          <button type="button" class="g3g-tile" data-game="${g.id}">
            <span class="g3g-tile-icon">${g.icon}</span>
            <span class="g3g-tile-info"><strong>${g.title}</strong><span>${g.desc}</span>
              <span class="g3g-tags">${g.tags.map(t => `<i>${t}</i>`).join('')}</span></span>
            <span class="g3g-go">▶</span>
          </button>`).join('')}
      </div>`);
    app.querySelector('[data-act="back"]').onclick = ctx.onBack;
    app.querySelectorAll('[data-game]').forEach(b => {
      const g = GAMES.find(x => x.id === b.dataset.game);
      b.onclick = () => (g.single ? showLevels(g, g.stalls[0].game) : showStalls(g));
    });
  }

  function showStalls(g) {
    shell(`
      ${topbar(g.title, { kicker: `${g.icon} Chọn quầy` })}
      ${g.purpose ? `<p class="g3g-purpose">🎯 ${g.purpose}</p>` : ''}
      <p class="g3g-lead">Hôm nay em mở quầy nào?</p>
      <div class="g3g-stalls">
        ${g.stalls.map((s, i) => s.soon ? `
          <div class="g3g-stall g3g-stall-soon"><span class="g3g-stall-icon">${s.icon}</span><strong>${s.title}</strong><span>${s.tags}</span><em>Sắp mở</em></div>` : `
          <button type="button" class="g3g-stall" data-stall="${i}"><span class="g3g-stall-icon">${s.game.stallIcon()}</span><strong>${s.game.title}</strong><span>${s.tags}</span>${stallLessons ? stallLesson(s.game) : ''}<em class="g3g-stall-open">Đang mở</em></button>`).join('')}
      </div>`);
    app.querySelector('[data-act="back"]').onclick = showGames;
    app.querySelectorAll('[data-stall]').forEach(b => { b.onclick = () => showLevels(g, g.stalls[b.dataset.stall].game); });
  }

  function showLevels(g, game) {
    fromLesson = false;
    shell(`
      ${topbar(`${game.icon} ${game.title}`, { kicker: g.single ? '🎮 Trò chơi tăng cường' : `${g.icon} ${g.title}` })}
      ${game.purpose ? `<p class="g3g-purpose">🎯 ${game.purpose}</p>` : ''}
      <p class="g3g-lead">Chọn cấp. Cấp nào cũng chơi được!</p>
      <div class="g3g-list">
        ${game.levels.map(lv => {
          const best = bestFor(lv.id);
          const done = hasDoneAny(lv, ctx);
          return `
            <button type="button" class="g3g-tile g3g-level" data-level="${lv.id}">
              <span class="g3g-level-num">${lv.n}</span>
              <span class="g3g-tile-info"><strong>${lv.title}</strong><span>${lv.desc}</span>
                <span class="g3g-tags"><i>📚 ${lessonText(lv, ctx, { short: true }) || lv.knowledge}</i>${done ? '<i class="g3g-tag-done">✓ Đã học</i>' : ''}${best ? `<i class="g3g-tag-best">🏆 ${best.ok}/${best.total}</i>` : ''}</span></span>
              <span class="g3g-go">▶</span>
            </button>`;
        }).join('')}
      </div>
      ${game.note ? `<aside class="g3g-note">${game.note}</aside>` : ''}`);
    app.querySelector('[data-act="back"]').onclick = () => (g.single ? showGames() : showStalls(g));
    app.querySelectorAll('[data-level]').forEach(b => { b.onclick = () => showIntro(g, game, game.levels.find(l => l.id === b.dataset.level)); });
  }

  function showIntro(g, game, baseLv) {
    const lv = focused(game, baseLv);
    const units = lessonUnits(lv, ctx);
    const done = hasDoneAny(lv, ctx);
    const lesson = lessonText(lv, ctx, { short: true });
    const best = bestFor(lv.id);
    // Mỗi cấp một vị khách "giao nhiệm vụ" cố định — cùng bộ NPC gặp lại trong màn chơi.
    const pool = game.npcs || NPCS;
    const npc = pool[(lv.n - 1) % pool.length];
    const lastUnit = units[units.length - 1];
    // Ít chữ: khách nói một câu ngắn, cách chơi là dãy hình (Cân → Tính tiền → …), nút Chơi to ngay bên dưới.
    // "Cần biết" / bài học dành cho bố mẹ — một dòng nhỏ ở cuối.
    shell(`
      ${topbar(lv.title, { kicker: `${game.icon} Cấp ${lv.n}`, stars: true })}
      <div class="g3g-hero">
        <div class="g3g-hero-npc">
          <div class="g3g-say"><b class="g3g-say-name">${npc.name}</b>${cap(npc.you)} ơi! ${lv.ask(npc)}</div>
          <div class="g3g-npc-pic">${npcPic(npc, 'happy')}</div>
        </div>
        <div class="g3g-hero-main">
          <div class="g3g-how" aria-label="Cách chơi">
            ${game.howTo(lv).map((s, i) => `${i ? '<span class="g3g-how-arrow" aria-hidden="true">➜</span>' : ''}
              <span class="g3g-how-step"><span class="g3g-how-pic">${s.pic}</span><b>${s.label}</b></span>`).join('')}
          </div>
          <div class="g3g-goal-row">
            <span class="g3g-goal-faces" aria-label="${lv.missions} ${game.unitWord}">${'<i>😊</i>'.repeat(lv.missions)}</span>
            ${best ? `<span class="g3g-goal-best">🏆 ${best.ok}/${best.total}</span>` : ''}
          </div>
          <button type="button" class="g3g-btn g3g-btn-primary g3g-btn-big" data-act="play">▶ Chơi ngay!</button>
          <div class="g3g-need-row">
            <span class="g3g-need-label">🎒 Cần biết:</span>
            ${knowledgeChips(lv.knowledge).map(k => `<i>${k}</i>`).join('')}
            ${lesson ? `<span class="g3g-need-book">📘 ${lesson}${done ? ' <span class="g3g-stamp">✓ Đã học</span>' : ''}</span>` : ''}
            ${lastUnit ? `<button type="button" class="g3g-link-btn" data-act="lesson" title="${cap(bookName(ctx))}">📖 Ôn lại ${ctx.book === 'practice' ? `Tuần ${lastUnit.number}` : `Bài ${lastUnit.number}`}</button>` : ''}
          </div>
        </div>
      </div>`);
    app.querySelector('[data-act="back"]').onclick = fromLesson ? ctx.onBack : () => showLevels(g, game);
    app.querySelector('[data-act="lesson"]')?.addEventListener('click', () => ctx.openUnit(lastUnit.id));
    app.querySelector('[data-act="play"]').onclick = () => play(g, game, baseLv, lv);
  }

  function play(g, game, baseLv, lv) {
    const idx = game.levels.indexOf(baseLv);
    const nextLv = game.levels[idx + 1];
    playRound(app, {
      game, level: lv,
      onExit: () => showLevels(g, game),
      onQuit: fromLesson ? ctx.onBack : null,
      onNextLevel: nextLv ? () => showIntro(g, game, nextLv) : null,
    });
  }
}
