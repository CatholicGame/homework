/**
 * Bảng xếp hạng sao của các bạn cùng lớp (lớp bé chọn trong hồ sơ).
 * Chỉ tính sao ở sách của lớp đó, theo bốn khoảng: Mọi lúc / Hôm nay / Tuần này / Tháng này.
 */

import {
  isLeaderboardConfigured, needsConnect, connectLeaderboard, fetchLeaderboard,
} from '../engine/leaderboard.js';
import { preloadAuth } from '../engine/auth.js';
import { getProfile, getProfileGrade, avatarUrl } from '../engine/profile.js';
import { dayKey, weekKey, monthKey } from '../engine/activity.js';
import { gradeTitle } from '../data/grades.js';

const TOP_N = 100;
const MEDALS = ['🥇', '🥈', '🥉'];
const ANON = 'Bạn nhỏ ẩn danh';

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const ddmm = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;

/** Các khoảng thời gian của bảng; điểm của một bạn trong khoảng đó (0 nếu khoá đã cũ). */
function periods(grade) {
  const now = new Date();
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
  const inPeriod = (name, key) => (r) => (r[`${name}Key`] === key ? r[`${name}Stars`] || 0 : 0);
  return [
    { id: 'all', label: '🏅 Mọi lúc', range: 'Tổng số sao từ trước tới nay',
      score: (r) => r.gradeStars?.[`g${grade}`] || 0,
      empty: 'Chưa có bạn nào nhận sao. Làm bài để đứng đầu bảng nhé! 🚀' },
    { id: 'day', label: '☀️ Hôm nay', range: `Hôm nay, ${ddmm(now)}`,
      score: inPeriod('day', dayKey(now)),
      empty: 'Hôm nay chưa có bạn nào nhận sao. Làm bài để đứng đầu bảng nhé! 🚀' },
    { id: 'week', label: '📅 Tuần này', range: `Tuần này: ${ddmm(monday)} – ${ddmm(sunday)}`,
      score: inPeriod('week', weekKey(now)),
      empty: 'Tuần này chưa có bạn nào nhận sao. Làm bài để đứng đầu bảng nhé! 🚀' },
    { id: 'month', label: '🗓️ Tháng này', range: `Tháng ${now.getMonth() + 1}/${now.getFullYear()}`,
      score: inPeriod('month', monthKey(now)),
      empty: 'Tháng này chưa có bạn nào nhận sao. Làm bài để đứng đầu bảng nhé! 🚀' },
  ];
}

/** Gắn thứ hạng kiểu thi đấu: bằng sao thì cùng hạng (1, 1, 3…). */
function withRanks(list, score) {
  let rank = 0, prev = null;
  return list.map((item, i) => {
    const s = score(item);
    if (s !== prev) { rank = i + 1; prev = s; }
    return { ...item, rank, score: s };
  });
}

function rankBadge(rank) {
  return rank <= 3
    ? `<span class="lb-rank lb-rank-medal" aria-label="Hạng ${rank}">${MEDALS[rank - 1]}</span>`
    : `<span class="lb-rank">${rank}</span>`;
}

export function render(app, onBack, { onEditProfile } = {}) {
  const grade = getProfileGrade();
  const PERIODS = periods(grade);
  const state = { tab: 'all', data: null };

  preloadAuth();

  app.innerHTML = `
    <div class="lb-page animate-fadeIn">
      <div class="lb-top">
        <button type="button" class="btn btn-ghost" id="lb-back">← Trang chủ</button>
        <button type="button" class="lb-refresh" id="lb-refresh" title="Tải lại" aria-label="Tải lại bảng xếp hạng" hidden>🔄</button>
      </div>
      <div class="lb-card">
        <h1 class="lb-title">🏆 Bảng xếp hạng ${gradeTitle(grade)}</h1>
        <p class="lb-subtitle">Các bạn cùng học ${gradeTitle(grade).toLowerCase()} · <button type="button" class="lb-link" data-act="edit-profile">Đổi lớp</button></p>
        <div class="lb-tabs" role="tablist">
          ${PERIODS.map((p) => {
            const [icon, ...words] = p.label.split(' ');
            return `<button type="button" role="tab" class="lb-tab" data-tab="${p.id}"><span class="lb-tab-icon">${icon}</span><span>${words.join(' ')}</span></button>`;
          }).join('')}
        </div>
        <div class="lb-body" id="lb-body"></div>
      </div>
    </div>
  `;

  const body = app.querySelector('#lb-body');
  const refreshBtn = app.querySelector('#lb-refresh');
  app.querySelector('#lb-back').onclick = onBack;
  refreshBtn.onclick = () => load(true);
  app.querySelector('.lb-subtitle [data-act="edit-profile"]').onclick = () => onEditProfile?.();
  app.querySelectorAll('.lb-tab').forEach(t => {
    t.onclick = () => { state.tab = t.dataset.tab; draw(); };
  });
  syncTabs();

  if (!isLeaderboardConfigured()) {
    showMessage('🛠️', 'Bảng xếp hạng chưa được bật. Nhờ bố mẹ hoặc thầy cô cài đặt nhé!');
    return;
  }
  load(false);

  function syncTabs() {
    app.querySelectorAll('.lb-tab').forEach(t => {
      const on = t.dataset.tab === state.tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
  }

  function showMessage(icon, text, actionsHtml = '') {
    body.innerHTML = `
      <div class="lb-empty">
        <div class="lb-empty-icon">${icon}</div>
        <p>${text}</p>
        ${actionsHtml}
      </div>`;
  }

  async function load(force) {
    refreshBtn.hidden = true;
    body.innerHTML = '<div class="lb-loading" role="status"><div class="page-loading-spinner"></div><p>Đang tải bảng xếp hạng…</p></div>';
    try {
      if (await needsConnect()) return showConnect();
      state.data = await fetchLeaderboard({ force });
      refreshBtn.hidden = false;
      draw();
    } catch (e) {
      if (e?.message === 'need-connect') return showConnect();
      showMessage('📡', 'Không tải được bảng xếp hạng. Kiểm tra kết nối mạng rồi thử lại nhé.',
        '<button type="button" class="btn btn-primary" id="lb-retry">🔄 Thử lại</button>');
      body.querySelector('#lb-retry').onclick = () => load(true);
    }
  }

  function showConnect() {
    showMessage('🔗', 'Bấm nút bên dưới để vào bảng xếp hạng cùng các bạn.',
      '<button type="button" class="btn btn-primary" id="lb-connect">🏆 Vào bảng xếp hạng</button><p class="lb-error" id="lb-connect-err" hidden></p>');
    const btn = body.querySelector('#lb-connect');
    btn.onclick = () => {
      btn.disabled = true;
      // Gọi ngay trong click để Safari (iPad) cho mở popup Google.
      connectLeaderboard().then(() => load(true)).catch((e) => {
        btn.disabled = false;
        const err = body.querySelector('#lb-connect-err');
        err.textContent = e?.message || 'Kết nối thất bại, thử lại nhé.';
        err.hidden = false;
      });
    };
  }

  function draw() {
    syncTabs();
    if (!state.data) return;
    const p = PERIODS.find(x => x.id === state.tab);
    const rows = state.data.rows
      .filter(r => p.score(r) > 0)
      .sort((a, b) => p.score(b) - p.score(a));
    drawStudents(rows, p.score, p.empty, `<p class="lb-period">${p.range}</p>`);
  }

  function drawStudents(rows, score, emptyText, headerHtml = '') {
    const { myUid } = state.data;
    if (!rows.length) {
      showMessage('⭐', emptyText);
      body.insertAdjacentHTML('afterbegin', headerHtml);
      return;
    }
    const ranked = withRanks(rows, score);
    const top = ranked.slice(0, TOP_N);
    const me = ranked.find(r => r.uid === myUid);
    const meOutside = me && !top.includes(me);
    body.innerHTML = `
      ${headerHtml}
      <ol class="lb-list">
        ${top.map(r => studentRow(r, r.uid === myUid)).join('')}
      </ol>
      ${meOutside ? `<div class="lb-me-sep">⋯</div><ol class="lb-list">${studentRow(me, true)}</ol>` : ''}
      ${me ? '' : `<p class="lb-hint">Em chưa có tên trên bảng này — làm bài ${gradeTitle(grade).toLowerCase()} để nhận sao nhé! 💪</p>`}
      ${me && !getProfile().name ? `<div class="lb-note">Em đang hiện là "${ANON}". <button type="button" class="lb-link" data-act="edit-profile">Đặt biệt danh</button></div>` : ''}
    `;
    body.querySelectorAll('[data-act="edit-profile"]').forEach(b => { b.onclick = () => onEditProfile?.(); });
  }

  function studentRow(r, isMe) {
    const name = r.nickname || ANON;
    const img = avatarUrl(r.avatar);
    const avatar = img
      ? `<img class="lb-avatar" src="${img}" alt="">`
      : `<span class="lb-avatar lb-avatar-fallback">${escapeHtml(name.charAt(0).toUpperCase())}</span>`;
    return `
      <li class="lb-row${isMe ? ' is-me' : ''}${r.rank <= 3 ? ` lb-top${r.rank}` : ''}">
        ${rankBadge(r.rank)}
        ${avatar}
        <span class="lb-name">
          <strong>${escapeHtml(name)}${isMe ? ' <span class="lb-me-tag">Em</span>' : ''}</strong>
        </span>
        <span class="lb-stars">⭐ ${r.score}</span>
      </li>`;
  }
}
