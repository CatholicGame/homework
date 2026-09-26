/**
 * Trang admin (mở bằng #admin), ba tab:
 *   Học sinh — bao nhiêu học sinh đã đăng ký, mới đăng ký / hoạt động gần đây, chia theo lớp, danh sách chi tiết.
 *   Đánh giá — xem đánh giá ứng dụng, trả lời (hiện công khai dưới đánh giá) hoặc xoá.
 *   Giọng đọc — các máy không có giọng đọc tiếng Việt (sách Tiền tiểu học): trình duyệt, thiết bị gì.
 * Chỉ tài khoản trong ADMIN_EMAILS vào được (Firestore rules chặn phần còn lại).
 */

import { isLeaderboardConfigured, needsConnect, connectLeaderboard } from '../engine/leaderboard.js';
import { preloadAuth, getCurrentUser } from '../engine/auth.js';
import { avatarUrl } from '../engine/profile.js';
import { isAdminUser, fetchStudents } from '../engine/admin.js';
import { PRESCHOOL, gradeTitle } from '../data/grades.js';
import { fetchReviews, replyReview, deleteReview, reviewStats, REPLY_MAX } from '../engine/reviews.js';
import { starsHtml, reviewerHtml } from './reviews.js';
import { fetchVoiceIssues, deleteVoiceIssue } from '../engine/voiceReport.js';

const PAGE_SIZE = 20;
const CHART_DAYS = 30;
const DAY = 86_400_000;

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const startOfDay = (ms) => { const d = new Date(ms); d.setHours(0, 0, 0, 0); return d.getTime(); };
const fmtDate = (ms) => (ms ? new Date(ms).toLocaleDateString('vi-VN') : '—');
const fmtDateTime = (ms) => (ms
  ? new Date(ms).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
  : '—');
const gradeLabel = (g) => gradeTitle(g, 'Chưa chọn');

const SORTS = [
  { id: 'created', label: 'Mới đăng ký', key: (r) => r.createdAt },
  { id: 'seen', label: 'Hoạt động gần đây', key: (r) => r.lastSeenAt },
  { id: 'stars', label: 'Nhiều sao nhất', key: (r) => r.stars },
];

export function render(app, onBack) {
  const state = { tab: 'students', rows: null, search: '', grade: 'all', sort: 'created', page: 1,
    reviews: null, rvFilter: 'all', replying: null, voice: null, vcFilter: 'open' };

  preloadAuth();

  app.innerHTML = `
    <div class="adm-page animate-fadeIn">
      <div class="lb-top">
        <button type="button" class="btn btn-ghost" id="adm-back">← Trang chủ</button>
        <button type="button" class="lb-refresh" id="adm-refresh" title="Tải lại" aria-label="Tải lại" hidden>🔄</button>
      </div>
      <h1 class="adm-title">📊 Quản lý</h1>
      <div class="lb-tabs adm-tabs" role="tablist">
        <button type="button" role="tab" class="lb-tab" data-tab="students">👧 Học sinh</button>
        <button type="button" role="tab" class="lb-tab" data-tab="reviews">⭐ Đánh giá</button>
        <button type="button" role="tab" class="lb-tab" data-tab="voice">🔊 Giọng đọc</button>
      </div>
      <div id="adm-body"></div>
    </div>
  `;

  const body = app.querySelector('#adm-body');
  const refreshBtn = app.querySelector('#adm-refresh');
  app.querySelector('#adm-back').onclick = onBack;
  refreshBtn.onclick = () => load();
  const tabs = [...app.querySelectorAll('.adm-tabs .lb-tab')];
  const paintTabs = () => tabs.forEach(t => {
    t.classList.toggle('is-active', t.dataset.tab === state.tab);
    t.setAttribute('aria-selected', String(t.dataset.tab === state.tab));
  });
  tabs.forEach(t => {
    t.onclick = () => {
      if (t.dataset.tab === state.tab) return;
      state.tab = t.dataset.tab;
      paintTabs();
      load();
    };
  });
  paintTabs();

  if (!isAdminUser()) {
    showMessage('🔒', `Tài khoản ${escapeHtml(getCurrentUser()?.email || '')} không có quyền xem trang này.`);
    return;
  }
  if (!isLeaderboardConfigured()) {
    showMessage('🛠️', 'Firebase chưa được cấu hình.');
    return;
  }
  load();

  function showMessage(icon, text, actionsHtml = '') {
    body.innerHTML = `
      <div class="lb-card lb-empty">
        <div class="lb-empty-icon">${icon}</div>
        <p>${text}</p>
        ${actionsHtml}
      </div>`;
  }

  async function load() {
    refreshBtn.hidden = true;
    const tab = state.tab;
    body.innerHTML = `<div class="lb-loading" role="status"><div class="page-loading-spinner"></div><p>${
      tab === 'reviews' ? 'Đang tải đánh giá…' : tab === 'voice' ? 'Đang tải danh sách máy…' : 'Đang tải danh sách học sinh…'}</p></div>`;
    try {
      if (await needsConnect()) return showConnect();
      if (tab === 'reviews') {
        // Ghép email từ sổ đăng ký để admin biết ai viết (đánh giá công khai chỉ có tên hiển thị).
        const [{ reviews }, rows] = await Promise.all([fetchReviews(), fetchStudents().catch(() => [])]);
        const byUid = new Map(rows.map(r => [r.uid, r]));
        state.reviews = reviews.map(r => ({ ...r, email: byUid.get(r.id)?.email || '' }));
      } else if (tab === 'voice') {
        const [issues, rows] = await Promise.all([fetchVoiceIssues(), fetchStudents().catch(() => [])]);
        const byUid = new Map(rows.map(r => [r.uid, r]));
        state.voice = issues.map(v => ({ ...v, student: byUid.get(v.uid) || null }));
      } else {
        state.rows = await fetchStudents();
      }
      if (tab !== state.tab) return; // đã chuyển tab trong lúc tải
      refreshBtn.hidden = false;
      if (tab === 'reviews') drawReviews();
      else if (tab === 'voice') drawVoice();
      else drawAll();
    } catch (e) {
      if (tab !== state.tab) return;
      if (e?.message === 'need-connect') return showConnect();
      const denied = e?.code === 'permission-denied';
      showMessage(denied ? '🔒' : '📡', denied
        ? `Firestore từ chối quyền đọc. Kiểm tra đã triển khai firestore.rules mới (${tab === 'voice' ? 'phần voiceIssues' : 'hàm isAdmin'}) chưa.`
        : 'Không tải được dữ liệu. Kiểm tra kết nối mạng rồi thử lại.',
      '<button type="button" class="btn btn-primary" id="adm-retry">🔄 Thử lại</button>');
      body.querySelector('#adm-retry').onclick = () => load();
    }
  }

  function showConnect() {
    showMessage('🔗', 'Kết nối Firebase để xem dữ liệu.',
      '<button type="button" class="btn btn-primary" id="adm-connect">🔗 Kết nối</button><p class="lb-error" id="adm-connect-err" hidden></p>');
    const btn = body.querySelector('#adm-connect');
    btn.onclick = () => {
      btn.disabled = true;
      // Gọi ngay trong click để Safari (iPad) cho mở popup Google.
      connectLeaderboard().then(() => load()).catch((e) => {
        btn.disabled = false;
        const err = body.querySelector('#adm-connect-err');
        err.textContent = e?.message || 'Kết nối thất bại, thử lại nhé.';
        err.hidden = false;
      });
    };
  }

  // ── Vẽ ────────────────────────────────────────────────────────────────────
  function drawAll() {
    const rows = state.rows;
    const today = startOfDay(Date.now());
    const since = (days) => today - (days - 1) * DAY;
    const count = (fn) => rows.filter(fn).length;
    const tiles = [
      { label: 'Tổng số học sinh', value: rows.length, note: `${count(r => r.registered)} có email` },
      { label: 'Đăng ký hôm nay', value: count(r => r.createdAt >= today) },
      { label: 'Đăng ký 7 ngày', value: count(r => r.createdAt >= since(7)) },
      { label: 'Đăng ký 30 ngày', value: count(r => r.createdAt >= since(30)) },
      { label: 'Hoạt động hôm nay', value: count(r => r.lastSeenAt >= today) },
      { label: 'Hoạt động 7 ngày', value: count(r => r.lastSeenAt >= since(7)) },
    ];
    const gradeCounts = [PRESCHOOL, 1, 2, 3, 4, 5, 0].map(g => ({ g, n: count(r => (r.grade || 0) === g) }));

    body.innerHTML = `
      <div class="adm-tiles">
        ${tiles.map(t => `
          <div class="adm-tile">
            <div class="adm-tile-label">${t.label}</div>
            <div class="adm-tile-value">${t.value}</div>
            ${t.note ? `<div class="adm-tile-note">${t.note}</div>` : ''}
          </div>`).join('')}
      </div>

      <section class="lb-card adm-section">
        <h2 class="adm-h2">Đăng ký mới ${CHART_DAYS} ngày gần đây</h2>
        ${chartHtml(rows, today)}
      </section>

      <section class="lb-card adm-section">
        <h2 class="adm-h2">Danh sách học sinh</h2>
        <div class="lb-chips adm-chips">
          <button type="button" class="lb-chip" data-grade="all">Tất cả <span class="lb-chip-count">${rows.length}</span></button>
          ${gradeCounts.filter(x => x.n || x.g).map(x => `
            <button type="button" class="lb-chip" data-grade="${x.g}">${gradeLabel(x.g)} <span class="lb-chip-count">${x.n}</span></button>`).join('')}
        </div>
        <div class="adm-controls">
          <input type="search" class="adm-input" id="adm-search" placeholder="Tìm theo email, tên, biệt danh…" value="${escapeHtml(state.search)}">
          <select class="adm-input adm-select" id="adm-sort" aria-label="Sắp xếp">
            ${SORTS.map(s => `<option value="${s.id}"${s.id === state.sort ? ' selected' : ''}>${s.label}</option>`).join('')}
          </select>
          <button type="button" class="btn btn-ghost adm-csv" id="adm-csv">⬇️ CSV</button>
        </div>
        <div id="adm-list"></div>
      </section>
    `;

    body.querySelectorAll('.lb-chip').forEach(c => {
      c.onclick = () => { state.grade = c.dataset.grade; state.page = 1; drawList(); };
    });
    body.querySelector('#adm-search').oninput = (e) => { state.search = e.target.value; state.page = 1; drawList(); };
    body.querySelector('#adm-sort').onchange = (e) => { state.sort = e.target.value; state.page = 1; drawList(); };
    body.querySelector('#adm-csv').onclick = () => downloadCsv(filtered());
    wireChart();
    drawList();
  }

  function chartHtml(rows, today) {
    const first = today - (CHART_DAYS - 1) * DAY;
    const days = Array.from({ length: CHART_DAYS }, (_, i) => ({ at: first + i * DAY, n: 0 }));
    rows.forEach((r) => {
      if (r.createdAt >= first) days[Math.floor((startOfDay(r.createdAt) - first) / DAY)].n++;
    });
    const peak = Math.max(...days.map(d => d.n));
    const max = Math.max(1, peak);
    const total = days.reduce((s, d) => s + d.n, 0);
    const ddmm = (ms) => new Date(ms).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    return `
      <p class="adm-chart-sub">${total} học sinh mới · cao nhất ${peak}/ngày</p>
      <div class="adm-chart" role="img" aria-label="Số học sinh đăng ký mỗi ngày trong ${CHART_DAYS} ngày gần đây">
        <div class="adm-chart-max">${max}</div>
        <div class="adm-bars">
          ${days.map(d => `
            <div class="adm-bar-hit" data-tip="${ddmm(d.at)}: ${d.n} học sinh">
              <div class="adm-bar${d.n ? '' : ' is-zero'}" style="height:${d.n ? Math.max(4, (d.n / max) * 100) : 0}%"></div>
            </div>`).join('')}
        </div>
        <div class="adm-chart-axis"><span>${ddmm(first)}</span><span>Hôm nay</span></div>
        <div class="adm-tip" hidden></div>
      </div>
      <details class="adm-table-view">
        <summary>Xem dạng bảng</summary>
        <table class="adm-table adm-table-small">
          <thead><tr><th>Ngày</th><th>Đăng ký mới</th></tr></thead>
          <tbody>${days.filter(d => d.n).reverse().map(d => `<tr><td>${ddmm(d.at)}</td><td>${d.n}</td></tr>`).join('') || '<tr><td colspan="2">Chưa có</td></tr>'}</tbody>
        </table>
      </details>`;
  }

  function wireChart() {
    const chart = body.querySelector('.adm-chart');
    const tip = chart.querySelector('.adm-tip');
    chart.querySelectorAll('.adm-bar-hit').forEach((hit) => {
      const show = () => {
        tip.textContent = hit.dataset.tip;
        tip.hidden = false;
        const c = chart.getBoundingClientRect();
        const h = hit.getBoundingClientRect();
        const x = Math.min(Math.max(h.left + h.width / 2 - c.left, 50), c.width - 50);
        tip.style.left = `${x}px`;
        chart.querySelectorAll('.adm-bar-hit.is-hover').forEach(b => b.classList.remove('is-hover'));
        hit.classList.add('is-hover');
      };
      hit.onmouseenter = show;
      hit.onclick = show;
    });
    chart.onmouseleave = () => {
      tip.hidden = true;
      chart.querySelectorAll('.adm-bar-hit.is-hover').forEach(b => b.classList.remove('is-hover'));
    };
  }

  function filtered() {
    const q = state.search.trim().toLowerCase();
    const sortKey = SORTS.find(s => s.id === state.sort).key;
    return state.rows
      .filter(r => state.grade === 'all' || String(r.grade || 0) === state.grade)
      .filter(r => !q || [r.email, r.name, r.nickname].some(v => v.toLowerCase().includes(q)))
      .sort((a, b) => sortKey(b) - sortKey(a));
  }

  function drawList() {
    body.querySelectorAll('.lb-chip').forEach(c => c.classList.toggle('is-active', c.dataset.grade === state.grade));
    const list = body.querySelector('#adm-list');
    const rows = filtered();
    const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages);
    const items = rows.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

    if (!rows.length) {
      list.innerHTML = '<p class="adm-empty">Không có học sinh nào khớp.</p>';
      return;
    }

    list.innerHTML = `
      <p class="adm-count">${rows.length} học sinh${pages > 1 ? ` · trang ${state.page}/${pages}` : ''}</p>
      <div class="adm-table-wrap">
        <table class="adm-table">
          <thead><tr>
            <th>Học sinh</th><th>Email</th><th>Lớp</th><th class="adm-num">Sao</th><th>Đăng ký</th><th>Lần cuối</th>
          </tr></thead>
          <tbody>${items.map(r => `
            <tr>
              <td>${who(r)}</td>
              <td class="adm-email">${r.email ? escapeHtml(r.email) : '<span class="adm-muted">chưa ghi nhận</span>'}</td>
              <td>${gradeLabel(r.grade)}</td>
              <td class="adm-num">⭐ ${r.stars}</td>
              <td>${fmtDate(r.createdAt)}</td>
              <td>${fmtDateTime(r.lastSeenAt)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="adm-cards">${items.map(r => `
        <div class="adm-card">
          ${who(r)}
          <div class="adm-card-email">${r.email ? escapeHtml(r.email) : '<span class="adm-muted">Email chưa ghi nhận</span>'}</div>
          <div class="adm-card-meta">
            <span>${gradeLabel(r.grade)}</span><span>⭐ ${r.stars}</span>
            <span>Đăng ký: ${fmtDate(r.createdAt)}</span><span>Lần cuối: ${fmtDate(r.lastSeenAt)}</span>
          </div>
        </div>`).join('')}
      </div>
      ${pages > 1 ? `
        <div class="adm-pager">
          <button type="button" class="btn btn-ghost" data-page="${state.page - 1}" ${state.page <= 1 ? 'disabled' : ''}>← Trước</button>
          <span>${state.page}/${pages}</span>
          <button type="button" class="btn btn-ghost" data-page="${state.page + 1}" ${state.page >= pages ? 'disabled' : ''}>Sau →</button>
        </div>` : ''}
    `;
    list.querySelectorAll('[data-page]').forEach(b => {
      b.onclick = () => { state.page = Number(b.dataset.page); drawList(); };
    });
  }

  // ── Tab Đánh giá ──────────────────────────────────────────────────────────
  const RV_FILTERS = [
    { id: 'all', label: 'Tất cả', test: () => true },
    { id: 'noreply', label: 'Chưa trả lời', test: r => !r.reply },
    ...[5, 4, 3, 2, 1].map(n => ({ id: `s${n}`, label: `${n}★`, test: r => r.rating === n })),
  ];

  function drawReviews() {
    const all = state.reviews;
    const stats = reviewStats(all);
    const today = startOfDay(Date.now());
    const tiles = [
      { label: 'Số đánh giá', value: stats.count },
      { label: 'Điểm trung bình', value: stats.count ? `${stats.average.toFixed(1)} ⭐` : '—' },
      { label: 'Chưa trả lời', value: all.filter(r => !r.reply).length },
      { label: 'Mới 7 ngày', value: all.filter(r => r.updatedAt >= today - 6 * DAY).length },
    ];
    const filter = RV_FILTERS.find(f => f.id === state.rvFilter) || RV_FILTERS[0];
    const items = all.filter(filter.test);

    body.innerHTML = `
      <div class="adm-tiles">
        ${tiles.map(t => `
          <div class="adm-tile">
            <div class="adm-tile-label">${t.label}</div>
            <div class="adm-tile-value">${t.value}</div>
          </div>`).join('')}
      </div>
      <section class="lb-card adm-section">
        <h2 class="adm-h2">Đánh giá (bé xem được trong menu ⭐ Đánh giá ứng dụng)</h2>
        <div class="lb-chips adm-chips">
          ${RV_FILTERS.map(f => `
            <button type="button" class="lb-chip${f.id === filter.id ? ' is-active' : ''}" data-rv="${f.id}">${f.label}
              <span class="lb-chip-count">${all.filter(f.test).length}</span></button>`).join('')}
        </div>
        ${items.length ? `<div class="rv-list">${items.map(reviewItemHtml).join('')}</div>`
          : '<p class="adm-empty">Không có đánh giá nào.</p>'}
      </section>
    `;

    body.querySelectorAll('[data-rv]').forEach(c => {
      c.onclick = () => { state.rvFilter = c.dataset.rv; state.replying = null; drawReviews(); };
    });
    body.querySelectorAll('[data-reply]').forEach(b => {
      b.onclick = () => { state.replying = b.dataset.reply; drawReviews(); body.querySelector('#rv-reply-text')?.focus(); };
    });
    body.querySelector('[data-reply-cancel]')?.addEventListener('click', () => { state.replying = null; drawReviews(); });
    body.querySelector('[data-reply-save]')?.addEventListener('click', (e) => {
      saveReply(e.currentTarget.dataset.replySave, body.querySelector('#rv-reply-text').value, e.currentTarget);
    });
    body.querySelector('[data-reply-clear]')?.addEventListener('click', (e) => {
      saveReply(e.currentTarget.dataset.replyClear, '', e.currentTarget);
    });
    body.querySelectorAll('[data-delete]').forEach(b => { b.onclick = () => removeReview(b.dataset.delete, b); });
  }

  function reviewItemHtml(r) {
    const editing = state.replying === r.id;
    const meta = [r.email ? escapeHtml(r.email) : 'Email chưa ghi nhận', r.grade ? gradeLabel(r.grade) : ''].filter(Boolean).join(' · ');
    return `
      <article class="rv-item">
        <div class="rv-item-head">
          ${reviewerHtml(r)}
          <span class="rv-date">${fmtDateTime(r.updatedAt)}</span>
        </div>
        <div class="rv-admin-meta">${meta}</div>
        ${starsHtml(r.rating, 'rv-stars-sm')}
        ${r.comment ? `<p class="rv-comment">${escapeHtml(r.comment)}</p>` : ''}
        ${r.reply && !editing ? `
          <div class="rv-reply">
            <span class="rv-reply-from">💬 Phản hồi từ Toán Tiểu Học · ${fmtDate(r.reply.updatedAt)}</span>
            <p>${escapeHtml(r.reply.message)}</p>
          </div>` : ''}
        ${editing ? `
          <div class="rv-reply-box">
            <textarea class="rv-input rv-textarea" id="rv-reply-text" maxlength="${REPLY_MAX}"
              placeholder="Viết phản hồi (hiện công khai dưới đánh giá này)…">${escapeHtml(r.reply?.message || '')}</textarea>
            <p class="lb-error" id="rv-reply-err" hidden></p>
            <div class="rv-admin-actions">
              <button type="button" class="btn btn-primary" data-reply-save="${r.id}">💾 Lưu phản hồi</button>
              <button type="button" class="btn btn-ghost" data-reply-cancel>Huỷ</button>
              ${r.reply ? `<button type="button" class="btn btn-ghost rv-danger" data-reply-clear="${r.id}">Xoá phản hồi</button>` : ''}
            </div>
          </div>` : `
          <div class="rv-admin-actions">
            <button type="button" class="btn btn-ghost" data-reply="${r.id}">${r.reply ? '✏️ Sửa phản hồi' : '↩ Trả lời'}</button>
            <button type="button" class="btn btn-ghost rv-danger" data-delete="${r.id}">🗑 Xoá đánh giá</button>
          </div>`}
      </article>`;
  }

  const deniedMsg = 'Firestore từ chối. Kiểm tra đã triển khai firestore.rules mới (phần reviews) chưa.';

  async function saveReply(id, message, btn) {
    btn.disabled = true;
    try {
      await replyReview(id, message);
      const r = state.reviews.find(x => x.id === id);
      r.reply = message.trim() ? { message: message.trim(), updatedAt: Date.now() } : null;
      state.replying = null;
      drawReviews();
    } catch (e) {
      btn.disabled = false;
      const err = body.querySelector('#rv-reply-err');
      err.textContent = e?.code === 'permission-denied' ? deniedMsg : 'Lưu thất bại, thử lại nhé.';
      err.hidden = false;
    }
  }

  async function removeReview(id, btn) {
    const r = state.reviews.find(x => x.id === id);
    if (!confirm(`Xoá đánh giá ${r.rating}★ của "${r.name || 'Ẩn danh'}"? Không khôi phục được.`)) return;
    btn.disabled = true;
    try {
      await deleteReview(id);
      state.reviews = state.reviews.filter(x => x.id !== id);
      drawReviews();
    } catch (e) {
      btn.disabled = false;
      alert(e?.code === 'permission-denied' ? deniedMsg : 'Xoá thất bại, thử lại nhé.');
    }
  }

  // ── Tab Giọng đọc ─────────────────────────────────────────────────────────
  const VC_STATUS = {
    none: { label: '🔇 Không đọc được', cls: 'is-bad' },
    online: { label: '🌐 Giọng trực tuyến', cls: 'is-warn' },
    local: { label: '✅ Đã có giọng', cls: 'is-ok' },
  };
  const VC_FILTERS = [
    { id: 'open', label: 'Chưa có giọng', test: v => v.status !== 'local' },
    { id: 'none', label: 'Không đọc được', test: v => v.status === 'none' },
    { id: 'online', label: 'Giọng trực tuyến', test: v => v.status === 'online' },
    { id: 'local', label: 'Đã khắc phục', test: v => v.status === 'local' },
    { id: 'all', label: 'Tất cả', test: () => true },
  ];
  const browserName = (b) => String(b || '—').replace(/\s[\d.]+$/, '');

  function drawVoice() {
    const all = state.voice;
    const count = (fn) => all.filter(fn).length;
    // Máy chưa có giọng, gom theo trình duyệt / hệ điều hành / thiết bị.
    const group = (keyOf) => {
      const m = new Map();
      all.filter(v => v.status !== 'local').forEach(v => { const k = keyOf(v) || '—'; m.set(k, (m.get(k) || 0) + 1); });
      return [...m].sort((a, b) => b[1] - a[1]).slice(0, 6);
    };
    const tiles = [
      { label: 'Số máy đã báo', value: all.length },
      { label: 'Không đọc được', value: count(v => v.status === 'none') },
      { label: 'Dùng giọng trực tuyến', value: count(v => v.status === 'online') },
      { label: 'Đã khắc phục', value: count(v => v.status === 'local') },
    ];
    const filter = VC_FILTERS.find(f => f.id === state.vcFilter) || VC_FILTERS[0];
    const items = all.filter(filter.test);
    const breakdown = (title, rows) => `
      <div class="adm-vc-break"><h3>${title}</h3>${rows.length
        ? `<ul>${rows.map(([k, n]) => `<li><span>${escapeHtml(k)}</span><b>${n}</b></li>`).join('')}</ul>`
        : '<p class="adm-empty">—</p>'}</div>`;

    body.innerHTML = `
      <div class="adm-tiles">
        ${tiles.map(t => `
          <div class="adm-tile">
            <div class="adm-tile-label">${t.label}</div>
            <div class="adm-tile-value">${t.value}</div>
          </div>`).join('')}
      </div>
      <section class="lb-card adm-section">
        <h2 class="adm-h2">Máy chưa có giọng đọc tiếng Việt</h2>
        <div class="adm-vc-breaks">
          ${breakdown('Trình duyệt', group(v => browserName(v.browser)))}
          ${breakdown('Hệ điều hành', group(v => v.os))}
          ${breakdown('Thiết bị', group(v => v.device))}
        </div>
      </section>
      <section class="lb-card adm-section">
        <h2 class="adm-h2">Danh sách máy (mỗi máy của một tài khoản là một dòng)</h2>
        <div class="lb-chips adm-chips">
          ${VC_FILTERS.map(f => `
            <button type="button" class="lb-chip${f.id === filter.id ? ' is-active' : ''}" data-vc="${f.id}">${f.label}
              <span class="lb-chip-count">${count(f.test)}</span></button>`).join('')}
        </div>
        ${items.length ? `
        <div class="adm-table-wrap adm-vc-wrap">
          <table class="adm-table adm-vc-table">
            <thead><tr><th>Học sinh</th><th>Tình trạng</th><th>Trình duyệt</th><th>Hệ điều hành</th><th>Thiết bị</th><th>Giọng trên máy</th><th>Lần cuối</th><th></th></tr></thead>
            <tbody>${items.map(vcRowHtml).join('')}</tbody>
          </table>
        </div>` : '<p class="adm-empty">Chưa có máy nào trong mục này.</p>'}
      </section>
    `;

    body.querySelectorAll('[data-vc]').forEach(c => { c.onclick = () => { state.vcFilter = c.dataset.vc; drawVoice(); }; });
    body.querySelectorAll('[data-vc-del]').forEach(b => { b.onclick = () => removeVoiceIssue(b.dataset.vcDel, b); });
  }

  function vcRowHtml(v) {
    const st = VC_STATUS[v.status] || { label: escapeHtml(v.status), cls: '' };
    const email = v.email || v.student?.email || '';
    return `<tr>
      <td>${v.student ? who(v.student) : ''}${email ? `<small class="adm-vc-sub">${escapeHtml(email)}</small>` : ''}</td>
      <td><span class="adm-vc-status ${st.cls}">${st.label}</span></td>
      <td>${escapeHtml(v.browser)}</td>
      <td>${escapeHtml(v.os)}</td>
      <td>${escapeHtml(v.device)}${v.model ? `<small class="adm-vc-sub">${escapeHtml(v.model)}</small>` : ''}</td>
      <td title="${escapeHtml(v.langs || '')}">${v.voices || 0} giọng${v.online === false ? '<small class="adm-vc-sub">mất mạng</small>' : ''}</td>
      <td title="${escapeHtml(v.ua || '')}">${fmtDateTime(v.lastSeenAt)}<small class="adm-vc-sub">từ ${fmtDate(v.createdAt)}</small></td>
      <td><button type="button" class="btn btn-ghost rv-danger adm-vc-del" data-vc-del="${escapeHtml(v.id)}" title="Xoá dòng này" aria-label="Xoá">🗑</button></td>
    </tr>`;
  }

  async function removeVoiceIssue(id, btn) {
    if (!confirm('Xoá dòng này? Nếu máy vẫn chưa có giọng đọc, lần sau mở sách sẽ báo lại.')) return;
    btn.disabled = true;
    try {
      await deleteVoiceIssue(id);
      state.voice = state.voice.filter(v => v.id !== id);
      drawVoice();
    } catch (e) {
      btn.disabled = false;
      alert(e?.code === 'permission-denied'
        ? 'Firestore từ chối. Kiểm tra đã triển khai firestore.rules mới (phần voiceIssues) chưa.'
        : 'Xoá thất bại, thử lại nhé.');
    }
  }

  function who(r) {
    const label = r.nickname || r.name || 'Ẩn danh';
    const img = avatarUrl(r.avatar);
    const avatar = img
      ? `<img class="lb-avatar adm-avatar" src="${img}" alt="">`
      : `<span class="lb-avatar lb-avatar-fallback adm-avatar">${escapeHtml(label.charAt(0).toUpperCase())}</span>`;
    const sub = r.nickname && r.name && r.nickname !== r.name ? `<small>${escapeHtml(r.name)}</small>` : '';
    return `<span class="adm-who">${avatar}<span><strong>${escapeHtml(label)}</strong>${sub}</span></span>`;
  }
}

function downloadCsv(rows) {
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [
    ['Biệt danh', 'Tên Google', 'Email', 'Lớp', 'Sao', 'Ngày đăng ký', 'Lần cuối'],
    ...rows.map(r => [r.nickname, r.name, r.email, r.grade ? gradeLabel(r.grade) : '', r.stars, fmtDate(r.createdAt), fmtDateTime(r.lastSeenAt)]),
  ].map(l => l.map(cell).join(','));
  const blob = new Blob([`﻿${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hoc-sinh-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
