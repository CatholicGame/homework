/**
 * 🗺️ Bản đồ kiến thức: các kiến thức quan trọng của lớp đang học (hồ sơ), chia theo mạch, mỗi mạch là một con đường
 * đi qua các trạm kiến thức theo thứ tự học. Mỗi trạm tô theo mức đã học, tính từ sổ sao (engine/stars.js):
 *   Chưa học (0 câu) · Đang học (có câu đã giải) · Đã vững (≥ 70% số câu của các Bài dạy kiến thức đó).
 * Chạm một trạm → bảng chi tiết: kiến thức cần nắm + danh sách Bài, chạm Bài để mở thẳng sách ở Bài đó.
 * Dữ liệu: src/data/knowledgeMap.js (kiến thức → Bài), src/data/knowledgeUnits.js (số câu của từng Bài, sinh tự động).
 */

import { KNOWLEDGE_MAP, STRANDS, bookOf } from '../data/knowledgeMap.js';
import { UNIT_INFO } from '../data/knowledgeUnits.js';
import { getEarnedKeys } from '../engine/stars.js';
import { getProfileGrade } from '../engine/profile.js';
import { gradeTitle } from '../data/grades.js';

export const MASTERED = 0.7;

/** Số câu đã giải của từng Bài: { 'workbook:bai-3': 5 }. Sách công cụ (tool4/5) mỗi Bài là một khoá. */
function solvedByUnit() {
  const out = {};
  for (const key of getEarnedKeys()) {
    const [book, unit] = key.split(':');
    if (!unit) continue;
    const k = `${book}:${unit}`;
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

/** Tiến độ từng kiến thức của một lớp: [{ ...concept, done, total, pct, level, units:[{…, done, total, title}] }]. */
export function gradeProgress(grade, solved = solvedByUnit()) {
  return (KNOWLEDGE_MAP[grade] || []).map((c) => {
    const units = c.units.map((u) => {
      const k = `${u.book}:${u.unit}`;
      const [total = 0, title = ''] = UNIT_INFO[k] || [];
      return { ...u, title, total, done: Math.min(solved[k] || 0, total) };
    }).filter((u) => u.total > 0);
    const done = units.reduce((s, u) => s + u.done, 0);
    const total = units.reduce((s, u) => s + u.total, 0);
    const pct = total ? done / total : 0;
    const level = pct >= MASTERED ? 'mastered' : done > 0 ? 'learning' : 'new';
    return { ...c, units, done, total, pct, level };
  });
}

const LEVEL = {
  mastered: { label: 'Đã vững', icon: '✅' },
  learning: { label: 'Đang học', icon: '📖' },
  new: { label: 'Chưa học', icon: '⬜' },
};

export function render(app, onBack, { navigate } = {}) {
  injectStyles();
  const grade = getProfileGrade();
  const items = gradeProgress(grade);
  const byLevel = (lv) => items.filter((c) => c.level === lv).length;
  const overall = items.length ? items.reduce((s, c) => s + Math.min(c.pct / MASTERED, 1), 0) / items.length : 0;
  // Trạm gợi ý học tiếp: kiến thức đang học dở đầu tiên, không có thì kiến thức chưa học đầu tiên.
  const next = items.find((c) => c.level === 'learning') || items.find((c) => c.level === 'new');

  const strands = Object.keys(STRANDS).filter((s) => items.some((c) => c.strand === s));
  const node = (c) => {
    const pctTxt = c.level === 'mastered' ? '✓' : `${Math.round(c.pct * 100)}%`;
    return `
      <button type="button" class="km-node is-${c.level}${c === next ? ' is-next' : ''}" data-id="${c.id}" style="--p:${Math.round(c.pct * 100)}">
        <span class="km-dot"><span class="km-ico">${c.icon}</span><b class="km-pct">${pctTxt}</b></span>
        <span class="km-name">${c.title}</span>
        ${c === next ? '<span class="km-next-tag">▶ Học tiếp</span>' : ''}
      </button>`;
  };

  app.innerHTML = `
    <div class="km-page">
      ${SCENE}
      <header class="km-top">
        <button type="button" class="km-back" data-act="back" aria-label="Quay lại">←</button>
        <div class="km-title"><small>${gradeTitle(grade, 'Chưa chọn lớp')}</small><h1>🗺️ Bản đồ kiến thức</h1></div>
        <div class="km-sum">
          <span class="km-chip is-mastered">✅ <b>${byLevel('mastered')}</b><i> đã vững</i></span>
          <span class="km-chip is-learning">📖 <b>${byLevel('learning')}</b><i> đang học</i></span>
          <span class="km-chip is-new">⬜ <b>${byLevel('new')}</b><i> chưa học</i></span>
        </div>
      </header>
      <main class="km-body">
        ${items.length ? `
        <div class="km-board km-overall">
          <div class="km-bar"><span style="width:${Math.round(overall * 100)}%"></span></div>
          <p>${overallText(byLevel('mastered'), items.length)}</p>
        </div>
        ${strands.map((s) => `
          <section class="km-board km-strand" style="--c:${STRANDS[s].color}; --n:${items.filter((c) => c.strand === s).length}">
            <h2><span>${STRANDS[s].icon}</span>${STRANDS[s].title}</h2>
            <div class="km-road">${items.filter((c) => c.strand === s).map(node).join('')}</div>
          </section>`).join('')}
        <p class="km-legend"><span>✅ Đã vững: làm đúng từ 70% số câu</span><span>📖 Đang học: đã làm đúng ít nhất 1 câu</span></p>`
        : `<div class="km-board km-empty">Bản đồ kiến thức có cho Lớp 1 đến Lớp 5. Em đổi lớp trong ✏️ hồ sơ để xem.</div>`}
      </main>
      <div class="km-sheet" hidden></div>
    </div>`;

  const sheet = app.querySelector('.km-sheet');
  app.querySelector('[data-act="back"]').addEventListener('click', onBack);
  app.querySelectorAll('.km-node').forEach((b) => b.addEventListener('click', () => openSheet(items.find((c) => c.id === b.dataset.id))));
  sheet.addEventListener('click', (e) => {
    if (e.target === sheet || e.target.closest('[data-act="close"]')) { sheet.hidden = true; return; }
    const row = e.target.closest('.km-unit');
    if (row) openUnit(row.dataset.book, row.dataset.unit);
  });

  function openSheet(c) {
    const st = STRANDS[c.strand];
    sheet.innerHTML = `
      <div class="km-panel is-${c.level}" role="dialog" aria-modal="true" aria-label="${c.title}" style="--c:${st.color}">
        <button type="button" class="km-close" data-act="close" aria-label="Đóng">✕</button>
        <div class="km-panel-head">
          <span class="km-dot" style="--p:${Math.round(c.pct * 100)}"><span class="km-ico">${c.icon}</span></span>
          <div><small>${st.icon} ${st.title} · ${LEVEL[c.level].icon} ${LEVEL[c.level].label}</small><h3>${c.title}</h3></div>
        </div>
        <p class="km-know">💡 ${c.know}</p>
        <div class="km-bar"><span style="width:${Math.round(c.pct * 100)}%"></span></div>
        <p class="km-count">Đã làm đúng <b>${c.done}/${c.total}</b> câu</p>
        <h4>Học ở các bài:</h4>
        <div class="km-units">
          ${c.units.map((u) => {
            const b = bookOf(u.book, u.unit);
            const num = u.unit.replace(/^\D+/, '');
            const word = u.unit.startsWith('tuan') ? 'Tuần' : 'Bài';
            const lv = u.done >= u.total ? 'mastered' : u.done ? 'learning' : 'new';
            return `
              <button type="button" class="km-unit is-${lv}" data-book="${u.book}" data-unit="${u.unit}">
                <span class="km-unit-t"><small>${b?.label || ''}</small><b>${word} ${num}. ${u.title}</b></span>
                <span class="km-unit-n">${u.total > 1 ? `${u.done}/${u.total}` : u.done ? '⭐' : ''}</span>
                <span class="km-unit-go">›</span>
              </button>`;
          }).join('')}
        </div>
      </div>`;
    sheet.hidden = false;
    sheet.querySelector('.km-close').focus();
  }

  function openUnit(book, unit) {
    const b = bookOf(book, unit);
    if (!b || !navigate) return;
    navigate(b.card, { open: b.open, back: 'knowledge-map' });
  }
}

function overallText(mastered, total) {
  if (!mastered) return `Lớp này có <b>${total}</b> kiến thức quan trọng. Chạm vào một trạm để bắt đầu!`;
  if (mastered === total) return `Tuyệt vời! Em đã vững cả <b>${total}</b> kiến thức của lớp này.`;
  return `Em đã vững <b>${mastered}/${total}</b> kiến thức. Đi tiếp tới trạm có cờ ▶ Học tiếp!`;
}

const INK = '#3F3A40';
// Cảnh nền: trời, mây, đồi cỏ, cây, lá cờ trên đỉnh đồi (bản đồ đi tới đích).
const SCENE = `
  <svg class="km-scene" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <g fill="#fff" stroke="${INK}" stroke-width="3">
      <path d="M150 90 q20-34 56-18 q26-30 60 0 q34 2 28 30 h-150 q-22-4 6-12z"/>
      <path d="M1180 60 q20-30 52-14 q26-26 56 2 q30 4 24 28 h-138 q-20-4 6-16z"/>
    </g>
    <circle cx="1460" cy="80" r="40" fill="#FDE047" stroke="${INK}" stroke-width="3"/>
    <path d="M0 300 Q300 200 640 280 T1250 250 T1600 270 V420 H0Z" fill="#A7E08A" stroke="${INK}" stroke-width="3"/>
    <path d="M0 350 Q400 290 820 340 T1600 330 V420 H0Z" fill="#7CCB63" stroke="${INK}" stroke-width="3"/>
    <path d="M160 410 Q520 330 860 370 T1500 300" fill="none" stroke="#FFF7D6" stroke-width="22" stroke-linecap="round"/>
    <path d="M160 410 Q520 330 860 370 T1500 300" fill="none" stroke="#E7B95B" stroke-width="4" stroke-dasharray="14 14"/>
    <g stroke="${INK}" stroke-width="3">
      <rect x="92" y="270" width="14" height="50" fill="#A16207"/><circle cx="99" cy="250" r="38" fill="#4ADE80"/>
      <rect x="1040" y="250" width="12" height="44" fill="#A16207"/><circle cx="1046" cy="232" r="32" fill="#22C55E"/>
      <line x1="1500" y1="300" x2="1500" y2="200" stroke-width="5"/><path d="M1502 202 l60 18 l-60 18z" fill="#EF4444"/>
    </g>
  </svg>`;

function injectStyles() {
  if (document.getElementById('km-styles')) return;
  const s = document.createElement('style');
  s.id = 'km-styles';
  s.textContent = `
  .km-page { --ink: ${INK}; --ok: #16A34A; --mid: #F59E0B; --off: #CBD5E1; position: relative; min-height: 100%; background: linear-gradient(#BFE6FF, #E8F7FF 55%, #DDF3CF); color: var(--ink); isolation: isolate; }
  /* Cao ít nhất bằng tỉ lệ viewBox (420/1600 bề ngang): màn rất rộng thì slice không cắt mây, mặt trời ở mép trên; màn hẹp chỉ cắt hai bên. */
  .km-scene { position: fixed; left: 0; right: 0; bottom: 0; width: 100%; height: max(42vh, 26.25vw); z-index: -1; pointer-events: none; }
  .km-top { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 10px 16px; background: #fff; border-bottom: 2px solid #E2E8F0; box-shadow: 0 2px 10px rgba(15,23,42,.08); }
  .km-back { width: 48px; height: 48px; border-radius: 50%; border: 2px solid #E2E8F0; background: #fff; font-size: 24px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 0 #E2E8F0; }
  .km-back:active { transform: translateY(3px); box-shadow: 0 1px 0 #E2E8F0; }
  .km-title { flex: 1 1 auto; min-width: 0; }
  .km-title small { display: block; font-weight: 700; color: #64748B; font-size: 14px; }
  .km-title h1 { margin: 0; font-size: clamp(20px, 3.2vw, 30px); line-height: 1.1; }
  .km-sum { display: flex; gap: 8px; flex-wrap: wrap; }
  .km-chip { display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 999px; font-size: 15px; background: #F1F5F9; border: 1.5px solid #E2E8F0; }
  .km-chip b { font-size: 18px; }
  .km-chip.is-mastered { background: #DCFCE7; border-color: #86EFAC; }
  .km-chip.is-learning { background: #FEF3C7; border-color: #FCD34D; }
  .km-chip i { font-style: normal; }
  /* Mạch nhiều trạm rộng hơn: bảng giãn theo số trạm (--n), mạch ít trạm xếp cạnh nhau, không để bảng to trống. */
  .km-body { max-width: 1280px; margin: 0 auto; padding: 16px 16px 40vh; display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; }
  .km-strand { flex: var(--n) 1 min(100%, calc(min(var(--n), 4) * 128px + 40px)); min-width: 0; }
  .km-board { background: #fff; border-radius: 22px; border: 2px solid #E2E8F0; box-shadow: 0 6px 0 rgba(15,23,42,.08); padding: 14px 16px 16px; }
  .km-overall, .km-legend, .km-empty { flex: 1 1 100%; }
  .km-overall p { margin: 8px 0 0; font-size: 17px; }
  .km-bar { height: 14px; border-radius: 999px; background: #E2E8F0; overflow: hidden; }
  .km-bar span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #FBBF24, #22C55E); }
  .km-strand h2 { display: flex; align-items: center; gap: 8px; margin: 0 0 10px; font-size: 21px; color: var(--c); }
  .km-strand h2 span { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 12px; background: color-mix(in srgb, var(--c) 15%, #fff); }
  /* Con đường: dải đứt nét chạy ngang qua tâm các trạm của từng hàng (trạm cao cố định, khoảng cách 10px). */
  .km-road { --row: 166px; --gap: 10px; display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); grid-auto-rows: var(--row); gap: var(--gap) 8px;
    background: repeating-linear-gradient(to bottom, transparent 0 46px, color-mix(in srgb, var(--c) 22%, #fff) 46px 58px, transparent 58px calc(var(--row) + var(--gap))); }
  .km-node { position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 4px 4px 6px; border: 0; background: none; cursor: pointer; font: inherit; color: inherit; border-radius: 16px; }
  .km-node:hover { background: color-mix(in srgb, var(--c) 8%, transparent); }
  .km-dot { position: relative; display: grid; place-items: center; width: 96px; height: 96px; flex: none; border-radius: 50%;
    background: conic-gradient(var(--ring, var(--mid)) calc(var(--p) * 1%), #E2E8F0 0); box-shadow: 0 5px 0 rgba(15,23,42,.14); transition: transform .15s; }
  .km-dot::before { content: ''; position: absolute; inset: 9px; border-radius: 50%; background: #fff; border: 2px solid #E2E8F0; }
  .km-node:active .km-dot { transform: translateY(4px); box-shadow: 0 1px 0 rgba(15,23,42,.14); }
  .km-ico { position: relative; font-size: 38px; line-height: 1; }
  .km-pct { position: absolute; right: -6px; bottom: -4px; min-width: 38px; padding: 2px 6px; border-radius: 999px; background: #fff; border: 2px solid var(--off); font-size: 14px; text-align: center; }
  .km-name { font-weight: 700; font-size: 15px; line-height: 1.2; text-align: center; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .km-node.is-new .km-ico { opacity: .55; filter: grayscale(.5); }
  .km-node.is-new .km-pct { color: #94A3B8; }
  .km-node.is-learning .km-pct { border-color: var(--mid); color: #B45309; }
  .km-node.is-mastered .km-dot, .km-panel.is-mastered .km-dot { --ring: var(--ok); }
  .km-node.is-mastered .km-dot::before { background: #DCFCE7; border-color: #86EFAC; }
  .km-node.is-mastered .km-pct { background: var(--ok); border-color: var(--ok); color: #fff; }
  .km-next-tag { position: absolute; top: -2px; left: 50%; transform: translateX(-50%); padding: 2px 8px; border-radius: 999px; background: #EF4444; color: #fff; font-size: 12px; font-weight: 800; white-space: nowrap; animation: km-bob 1.4s ease-in-out infinite; }
  .km-node.is-next .km-dot { outline: 4px solid #FCA5A5; outline-offset: 3px; }
  @keyframes km-bob { 50% { transform: translateX(-50%) translateY(-4px); } }
  @media (prefers-reduced-motion: reduce) { .km-next-tag { animation-duration: 3s; } }
  .km-legend { display: flex; flex-wrap: wrap; gap: 8px 18px; justify-content: center; margin: 0; font-size: 14px; color: #475569; }
  .km-legend span { background: #fff; padding: 4px 10px; border-radius: 999px; }
  .km-empty { font-size: 18px; text-align: center; padding: 28px; }
  .km-sheet { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; padding: 16px; background: rgba(15,23,42,.45); }
  .km-sheet[hidden] { display: none; }
  .km-panel { position: relative; width: min(560px, 100%); max-height: 100%; overflow: auto; background: #fff; border-radius: 24px; padding: 18px 18px 20px; border-top: 8px solid var(--c); }
  .km-close { position: absolute; top: 10px; right: 10px; width: 44px; height: 44px; border-radius: 50%; border: 2px solid #E2E8F0; background: #fff; font-size: 20px; cursor: pointer; }
  .km-panel-head { display: flex; align-items: center; gap: 14px; padding-right: 48px; }
  .km-panel-head small { color: #64748B; font-weight: 700; }
  .km-panel-head h3 { margin: 2px 0 0; font-size: 24px; }
  .km-know { margin: 14px 0 12px; padding: 10px 12px; border-radius: 14px; background: #FFFBEB; font-size: 17px; line-height: 1.45; }
  .km-count { margin: 6px 0 12px; font-size: 15px; }
  .km-panel h4 { margin: 0 0 8px; font-size: 16px; }
  .km-units { display: grid; gap: 8px; }
  .km-unit { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; text-align: left; font: inherit; color: inherit; cursor: pointer; background: #fff; border: 2px solid #E2E8F0; border-radius: 14px; box-shadow: 0 4px 0 #E2E8F0; }
  .km-unit:active { transform: translateY(3px); box-shadow: 0 1px 0 #E2E8F0; }
  .km-unit.is-mastered { background: #F0FDF4; border-color: #BBF7D0; }
  .km-unit.is-learning { background: #FFFBEB; border-color: #FDE68A; }
  .km-unit-t { flex: 1; min-width: 0; }
  .km-unit-t small { display: block; color: #64748B; font-size: 13px; }
  .km-unit-t b { font-size: 16px; }
  .km-unit-n { font-weight: 800; font-size: 15px; white-space: nowrap; }
  .km-unit-go { font-size: 26px; color: #94A3B8; }
  @media (max-width: 600px) {
    .km-chip i { display: none; }
    .km-road { --row: 152px; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
      background: repeating-linear-gradient(to bottom, transparent 0 39px, color-mix(in srgb, var(--c) 22%, #fff) 39px 49px, transparent 49px calc(var(--row) + var(--gap))); }
    .km-dot { width: 82px; height: 82px; }
    .km-ico { font-size: 32px; }
    .km-name { font-size: 14px; }
  }`;
  document.head.appendChild(s);
}
