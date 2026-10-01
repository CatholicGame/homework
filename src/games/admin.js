/**
 * Trang admin (mở bằng #admin), ba tab:
 *   Học sinh — bao nhiêu học sinh đã đăng ký, mới đăng ký / hoạt động gần đây, chia theo lớp, danh sách chi tiết.
 *              Khách dùng thử (guest, không đăng nhập) có số liệu riêng; bạn ảo của bảng xếp hạng (fake)
 *              có trong danh sách với màu riêng. Cả hai không tính vào số liệu học sinh.
 *   Đánh giá — xem đánh giá ứng dụng, trả lời (hiện công khai dưới đánh giá) hoặc xoá.
 *   Giọng đọc — các máy không có giọng đọc tiếng Việt (sách Tiền tiểu học): trình duyệt, thiết bị gì.
 * Chỉ tài khoản trong ADMIN_EMAILS vào được (Firestore rules chặn phần còn lại).
 */

import { isLeaderboardConfigured, needsConnect, connectLeaderboard } from '../engine/leaderboard.js';
import { preloadAuth, getCurrentUser } from '../engine/auth.js';
import { avatarUrl } from '../engine/profile.js';
import { isAdminUser, fetchStudents, deleteStudent } from '../engine/admin.js';
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

const KINDS = [
  { id: 'all', label: 'Tất cả', test: () => true },
  { id: 'real', label: 'Học sinh đăng nhập', test: (r) => !r.fake && !r.guest },
  { id: 'guest', label: 'Khách dùng thử', test: (r) => r.guest },
  { id: 'fake', label: 'Bạn ảo', test: (r) => r.fake },
];

export function render(app, onBack) {
  const state = { tab: 'students', rows: null, search: '', grade: 'all', sort: 'created', kind: 'all', page: 1, selected: new Set(),
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
    const all = state.rows;
    const rows = all.filter(r => !r.fake && !r.guest); // số liệu học sinh: chỉ tài khoản thật
    const guests = all.filter(r => r.guest);
    const fakes = all.filter(r => r.fake).length;
    const today = startOfDay(Date.now());
    const since = (days) => today - (days - 1) * DAY;
    const count = (fn) => rows.filter(fn).length;
    const tiles = [
      { label: 'Tổng số học sinh', value: rows.length, note: `${count(r => r.registered)} có email${fakes ? ` · +${fakes} bạn ảo` : ''}` },
      { label: 'Đăng ký hôm nay', value: count(r => r.createdAt >= today) },
      { label: 'Đăng ký 7 ngày', value: count(r => r.createdAt >= since(7)) },
      { label: 'Đăng ký 30 ngày', value: count(r => r.createdAt >= since(30)) },
      { label: 'Hoạt động hôm nay', value: count(r => r.lastSeenAt >= today) },
      { label: 'Hoạt động 7 ngày', value: count(r => r.lastSeenAt >= since(7)) },
      { label: 'Khách dùng thử', value: guests.length, guest: true,
        note: `${guests.filter(r => r.convertedAt).length} đã đăng nhập sau đó` },
      { label: 'Khách mới 7 ngày', value: guests.filter(r => r.createdAt >= since(7)).length, guest: true },
      { label: 'Khách hoạt động hôm nay', value: guests.filter(r => r.lastSeenAt >= today).length, guest: true },
    ];

    body.innerHTML = `
      <div class="adm-tiles">
        ${tiles.map(t => `
          <div class="adm-tile${t.guest ? ' adm-tile-guest' : ''}">
            <div class="adm-tile-label">${t.label}</div>
            <div class="adm-tile-value">${t.value}</div>
            ${t.note ? `<div class="adm-tile-note">${t.note}</div>` : ''}
          </div>`).join('')}
      </div>

      ${retentionHtml(guests, today)}

      <section class="lb-card adm-section">
        <h2 class="adm-h2">Đăng ký mới ${CHART_DAYS} ngày gần đây</h2>
        ${chartHtml(rows, today)}
      </section>

      <section class="lb-card adm-section">
        <h2 class="adm-h2">Danh sách học sinh</h2>
        <div class="lb-chips adm-chips" id="adm-grades"></div>
        <div class="adm-controls">
          <input type="search" class="adm-input" id="adm-search" placeholder="Tìm theo email, tên, biệt danh, máy…" value="${escapeHtml(state.search)}">
          <select class="adm-input adm-select" id="adm-sort" aria-label="Sắp xếp">
            ${SORTS.map(s => `<option value="${s.id}"${s.id === state.sort ? ' selected' : ''}>${s.label}</option>`).join('')}
          </select>
          ${fakes || guests.length ? `<select class="adm-input adm-select" id="adm-kind" aria-label="Loại học sinh">
            ${KINDS.map(k => `<option value="${k.id}"${k.id === state.kind ? ' selected' : ''}>${k.label}</option>`).join('')}
          </select>` : ''}
          <button type="button" class="btn btn-ghost adm-csv" id="adm-csv">⬇️ CSV</button>
        </div>
        <div id="adm-list"></div>
      </section>
    `;

    body.querySelector('#adm-search').oninput = (e) => { state.search = e.target.value; state.page = 1; drawList(); };
    body.querySelector('#adm-sort').onchange = (e) => { state.sort = e.target.value; state.page = 1; drawList(); };
    const kindSel = body.querySelector('#adm-kind');
    if (kindSel) kindSel.onchange = (e) => { state.kind = e.target.value; state.page = 1; drawList(); };
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
    const kind = KINDS.find(k => k.id === state.kind).test;
    return state.rows
      .filter(kind)
      .filter(r => state.grade === 'all' || String(r.grade || 0) === state.grade)
      .filter(r => !q || [r.email, r.name, r.nickname, r.device || ''].some(v => v.toLowerCase().includes(q)))
      .sort((a, b) => sortKey(b) - sortKey(a));
  }

  /** Chip lớp: đếm theo loại (thật/ảo) đang chọn. */
  function drawGrades() {
    const kind = KINDS.find(k => k.id === state.kind).test;
    const rows = state.rows.filter(kind);
    const counts = [PRESCHOOL, 1, 2, 3, 4, 5, 0].map(g => ({ g, n: rows.filter(r => (r.grade || 0) === g).length }));
    const box = body.querySelector('#adm-grades');
    box.innerHTML = `
      <button type="button" class="lb-chip" data-grade="all">Tất cả <span class="lb-chip-count">${rows.length}</span></button>
      ${counts.filter(x => x.n || x.g).map(x => `
        <button type="button" class="lb-chip" data-grade="${x.g}">${gradeLabel(x.g)} <span class="lb-chip-count">${x.n}</span></button>`).join('')}`;
    box.querySelectorAll('.lb-chip').forEach(c => {
      c.classList.toggle('is-active', c.dataset.grade === state.grade);
      c.onclick = () => { state.grade = c.dataset.grade; state.page = 1; drawList(); };
    });
  }

  function drawList() {
    drawGrades();
    const list = body.querySelector('#adm-list');
    const rows = filtered();
    const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages);
    const items = rows.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

    if (!rows.length) {
      list.innerHTML = '<p class="adm-empty">Không có học sinh nào khớp.</p>';
      return;
    }

    // Chọn để xoá: chỉ giữ các dòng còn trong danh sách đang lọc; bạn ảo không xoá được.
    const visible = new Set(rows.filter(r => !r.fake).map(r => r.uid));
    state.selected.forEach(uid => { if (!visible.has(uid)) state.selected.delete(uid); });
    const pageDeletable = items.filter(r => !r.fake);
    const allOnPage = pageDeletable.length > 0 && pageDeletable.every(r => state.selected.has(r.uid));
    const pick = (r) => (r.fake ? '' : `<input type="checkbox" class="adm-pick" data-pick="${escapeHtml(r.uid)}"${state.selected.has(r.uid) ? ' checked' : ''} aria-label="Chọn để xoá">`);
    const delBtn = (r) => (r.fake ? '' : `<button type="button" class="btn btn-ghost rv-danger adm-vc-del" data-del="${escapeHtml(r.uid)}" title="Xoá dòng này" aria-label="Xoá">🗑</button>`);

    list.innerHTML = `
      <div class="adm-count adm-count-bar">
        <span>${rows.length} học sinh${pages > 1 ? ` · trang ${state.page}/${pages}` : ''}</span>
        <span class="adm-count-actions">
        ${visible.size > pageDeletable.length && state.selected.size < visible.size ? `<button type="button" class="btn btn-ghost" id="adm-pick-all">☑️ Chọn cả ${visible.size} dòng đang lọc</button>` : ''}
        ${state.selected.size ? `<button type="button" class="btn btn-ghost rv-danger" id="adm-del-many">🗑 Xoá ${state.selected.size} dòng đã chọn</button>` : ''}
        </span>
      </div>
      <div class="adm-table-wrap">
        <table class="adm-table">
          <thead><tr>
            <th class="adm-pick-col">${pageDeletable.length ? `<input type="checkbox" class="adm-pick" id="adm-pick-page"${allOnPage ? ' checked' : ''} aria-label="Chọn cả trang">` : ''}</th>
            <th>Học sinh</th><th>Email</th><th>Lớp</th><th class="adm-num">Sao</th><th>Đăng ký</th><th>Lần cuối</th><th></th>
          </tr></thead>
          <tbody>${items.map(r => `
            <tr${r.fake ? ' class="adm-fake"' : r.guest ? ' class="adm-guest"' : ''}>
              <td class="adm-pick-col">${pick(r)}</td>
              <td>${who(r)}</td>
              <td class="adm-email">${r.email ? escapeHtml(r.email) : `<span class="adm-muted">${noEmail(r)}</span>`}</td>
              <td>${gradeLabel(r.grade)}</td>
              <td class="adm-num">⭐ ${r.stars}</td>
              <td>${fmtDate(r.createdAt)}</td>
              <td>${fmtDateTime(r.lastSeenAt)}</td>
              <td>${delBtn(r)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="adm-cards">${items.map(r => `
        <div class="adm-card${r.fake ? ' adm-fake' : r.guest ? ' adm-guest' : ''}">
          <div class="adm-card-head">${pick(r)}${who(r)}${delBtn(r)}</div>
          <div class="adm-card-email">${r.email ? escapeHtml(r.email) : `<span class="adm-muted">${noEmail(r)}</span>`}</div>
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
    list.querySelectorAll('[data-pick]').forEach(c => {
      c.onchange = () => {
        if (c.checked) state.selected.add(c.dataset.pick); else state.selected.delete(c.dataset.pick);
        drawList();
      };
    });
    const pagePick = list.querySelector('#adm-pick-page');
    if (pagePick) {
      pagePick.onchange = () => {
        pageDeletable.forEach(r => (pagePick.checked ? state.selected.add(r.uid) : state.selected.delete(r.uid)));
        drawList();
      };
    }
    list.querySelectorAll('[data-del]').forEach(b => {
      b.onclick = () => removeStudents(state.rows.filter(r => r.uid === b.dataset.del && !r.fake), b);
    });
    const pickAll = list.querySelector('#adm-pick-all');
    if (pickAll) pickAll.onclick = () => { visible.forEach(uid => state.selected.add(uid)); drawList(); };
    const many = list.querySelector('#adm-del-many');
    if (many) many.onclick = () => removeStudents(state.rows.filter(r => state.selected.has(r.uid) && !r.fake), many);
  }

  async function removeStudents(targets, btn) {
    if (!targets.length) return;
    const guests = targets.filter(r => r.guest).length;
    const real = targets.length - guests;
    const what = [real && `${real} học sinh đăng nhập`, guests && `${guests} khách`].filter(Boolean).join(' và ');
    const name = targets.length === 1 ? ` "${targets[0].nickname || targets[0].name || targets[0].email || 'Khách'}"` : '';
    const note = real
      ? '\nHọc sinh: xoá sổ đăng ký, hồ sơ và dòng bảng xếp hạng (bài làm trên Drive của bé vẫn còn). Bé mở app lại sẽ hiện lại.'
      : '';
    if (!confirm(`Xoá ${what}${name}? Không khôi phục được.${note}`)) return;
    btn.disabled = true;
    const done = new Set();
    let failed = null;
    for (const r of targets) {
      try {
        await deleteStudent(r);
        done.add(r.uid);
      } catch (e) {
        failed = e;
      }
    }
    state.rows = state.rows.filter(r => !done.has(r.uid));
    done.forEach(uid => state.selected.delete(uid));
    drawAll();
    if (failed) {
      alert(failed?.code === 'permission-denied'
        ? `Đã xoá ${done.size}/${targets.length}. Firestore từ chối phần còn lại: kiểm tra đã triển khai firestore.rules mới (quyền xoá của admin) chưa.`
        : `Đã xoá ${done.size}/${targets.length}. Phần còn lại xoá thất bại, thử lại.`);
    }
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

  /** Cột email khi không có email: bạn ảo / khách (máy gì, đã đăng nhập chưa) / chưa ghi nhận. */
  function noEmail(r) {
    if (r.fake) return 'bạn ảo';
    if (r.guest) {
      const conv = r.convertedAt ? ` · đã đăng nhập ${fmtDate(r.convertedAt)}` : '';
      return escapeHtml(`${r.device || 'khách'}${conv}`);
    }
    return 'chưa ghi nhận';
  }

  function who(r) {
    const label = r.nickname || r.name || (r.guest ? 'Khách' : 'Ẩn danh');
    const img = avatarUrl(r.avatar);
    const avatar = img
      ? `<img class="lb-avatar adm-avatar" src="${img}" alt="">`
      : `<span class="lb-avatar lb-avatar-fallback adm-avatar">${escapeHtml(label.charAt(0).toUpperCase())}</span>`;
    const sub = r.nickname && r.name && r.nickname !== r.name ? `<small>${escapeHtml(r.name)}</small>` : '';
    const tag = r.fake ? ' <span class="adm-fake-tag">Ảo</span>'
      : r.guest ? ' <span class="adm-fake-tag adm-guest-tag">Khách</span>' : '';
    return `<span class="adm-who">${avatar}<span><strong>${escapeHtml(label)}</strong>${tag}${sub}</span></span>`;
  }
}

// ── Khách có quay lại không ─────────────────────────────────────────────────
// Mỗi khách: các ngày có mở app (guests/{uid}.days, ghi từ 29/09/2026) cộng ngày đầu và ngày gần nhất
// (khách cũ chỉ có hai mốc này). "Ngày thứ n" = n ngày sau ngày đầu tiên.
const dayKeyOf = (ms) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const msOfKey = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).getTime(); };

/** Các ngày (tính từ ngày đầu: 0, 1, 2…) khách có mở app, không trùng, tăng dần. */
function activeOffsets(r) {
  const keys = new Set(r.days || []);
  if (r.createdAt) keys.add(dayKeyOf(r.createdAt));
  if (r.lastSeenAt) keys.add(dayKeyOf(r.lastSeenAt));
  const ms = [...keys].map(msOfKey).filter(Number.isFinite).sort((a, b) => a - b);
  if (!ms.length) return [];
  const first = r.createdAt ? startOfDay(r.createdAt) : ms[0];
  return [...new Set(ms.map(t => Math.round((t - first) / DAY)).filter(n => n >= 0))];
}

const RET_CHECKS = [
  { id: 'd1', label: 'Quay lại hôm sau', minAge: 1, test: (o) => o.includes(1) },
  { id: 'w1', label: 'Quay lại trong 7 ngày', minAge: 7, test: (o) => o.some(n => n >= 1 && n <= 7) },
  { id: 'd7', label: 'Còn dùng sau 7 ngày', minAge: 7, test: (o) => o.some(n => n >= 7) },
  { id: 'd30', label: 'Còn dùng sau 30 ngày', minAge: 30, test: (o) => o.some(n => n >= 30) },
];
const DAY_BUCKETS = [
  { label: '1 ngày', test: (n) => n === 1 },
  { label: '2 ngày', test: (n) => n === 2 },
  { label: '3–4 ngày', test: (n) => n >= 3 && n <= 4 },
  { label: '5–9 ngày', test: (n) => n >= 5 && n <= 9 },
  { label: 'Từ 10 ngày', test: (n) => n >= 10 },
];

/** Tỉ lệ khách đạt một mốc, chỉ tính khách đủ "tuổi" (vd. còn dùng sau 7 ngày: khách đến từ 7 ngày trước). */
function retRate(list, check) {
  const eligible = list.filter(g => g.age >= check.minAge);
  if (!eligible.length) return null;
  const hit = eligible.filter(g => check.test(g.offsets)).length;
  return { hit, n: eligible.length, pct: Math.round((hit / eligible.length) * 100) };
}

function retentionHtml(guests, today) {
  const list = guests.filter(r => r.createdAt).map(r => ({
    offsets: activeOffsets(r),
    age: Math.round((today - startOfDay(r.createdAt)) / DAY),
    createdAt: r.createdAt,
  }));
  if (!list.length) return '';
  const back = list.filter(g => g.offsets.length >= 2).length;
  const avgDays = list.reduce((s, g) => s + g.offsets.length, 0) / list.length;
  const rateTxt = (r, empty = 'chưa có') => (r ? `${r.pct}%` : empty);
  const rateNote = (r) => (r ? `${r.hit}/${r.n} khách` : 'chưa đủ ngày');
  const tiles = [
    { label: 'Quay lại ít nhất 1 lần', value: `${Math.round((back / list.length) * 100)}%`, note: `${back}/${list.length} khách` },
    ...RET_CHECKS.map(c => { const r = retRate(list, c); return { label: c.label, value: rateTxt(r), note: rateNote(r) }; }),
    { label: 'Số ngày dùng trung bình', value: avgDays.toFixed(1).replace('.', ','), note: 'ngày mỗi khách' },
  ];

  // Theo tuần khách đến lần đầu (tuần bắt đầu thứ Hai), 8 tuần gần nhất.
  const weekStart = (ms) => { const t = startOfDay(ms); return t - ((new Date(t).getDay() + 6) % 7) * DAY; };
  const weeks = new Map();
  list.forEach((g) => {
    const w = weekStart(g.createdAt);
    if (!weeks.has(w)) weeks.set(w, []);
    weeks.get(w).push(g);
  });
  const ddmm = (ms) => new Date(ms).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  const cohortRows = [...weeks.entries()].sort((a, b) => b[0] - a[0]).slice(0, 8).map(([w, gs]) => `
    <tr>
      <td>${ddmm(w)} – ${ddmm(w + 6 * DAY)}</td>
      <td>${gs.length}</td>
      ${RET_CHECKS.map((c) => { const r = retRate(gs, c); return `<td title="${rateNote(r)}">${rateTxt(r, '·')}</td>`; }).join('')}
    </tr>`).join('');

  const buckets = DAY_BUCKETS.map(b => ({ ...b, n: list.filter(g => b.test(g.offsets.length)).length }));
  const maxB = Math.max(1, ...buckets.map(b => b.n));

  return `
    <section class="lb-card adm-section adm-ret">
      <h2 class="adm-h2">Khách có quay lại không?</h2>
      <p class="adm-chart-sub">Mỗi tỉ lệ chỉ tính khách đã đến đủ lâu, vd. "sau 7 ngày" chỉ tính khách đến từ 7 ngày trước trở về trước.
        Danh sách ngày dùng ghi từ 29/09/2026, khách trước đó chỉ biết ngày đầu và ngày gần nhất.</p>
      <div class="adm-tiles">
        ${tiles.map(t => `
          <div class="adm-tile adm-tile-guest">
            <div class="adm-tile-label">${t.label}</div>
            <div class="adm-tile-value">${t.value}</div>
            <div class="adm-tile-note">${t.note}</div>
          </div>`).join('')}
      </div>
      <h3 class="adm-h3">Số ngày mỗi khách đã dùng</h3>
      <div class="adm-ret-bars">
        ${buckets.map(b => `
          <div class="adm-ret-row">
            <span class="adm-ret-label">${b.label}</span>
            <span class="adm-ret-track"><span class="adm-ret-fill" style="width:${(b.n / maxB) * 100}%"></span></span>
            <span class="adm-ret-n">${b.n}</span>
          </div>`).join('')}
      </div>
      <h3 class="adm-h3">Theo tuần khách đến lần đầu</h3>
      <div class="adm-table-wrap">
        <table class="adm-table adm-ret-table">
          <thead><tr><th>Tuần</th><th>Khách mới</th>${RET_CHECKS.map(c => `<th>${c.label}</th>`).join('')}</tr></thead>
          <tbody>${cohortRows}</tbody>
        </table>
      </div>
    </section>`;
}

function downloadCsv(rows) {
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [
    ['Biệt danh', 'Tên Google', 'Email', 'Lớp', 'Sao', 'Ngày đăng ký', 'Lần cuối', 'Loại', 'Máy', 'Khách đã đăng nhập', 'Số ngày dùng'],
    ...rows.map(r => [r.nickname, r.name, r.email, r.grade ? gradeLabel(r.grade) : '', r.stars, fmtDate(r.createdAt), fmtDateTime(r.lastSeenAt),
      r.fake ? 'Ảo' : r.guest ? 'Khách' : 'Học sinh', r.device || '', r.convertedAt ? fmtDate(r.convertedAt) : '', r.guest ? activeOffsets(r).length : '']),
  ].map(l => l.map(cell).join(','));
  const blob = new Blob([`﻿${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hoc-sinh-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
