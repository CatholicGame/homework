/**
 * Trang admin (mở bằng #admin): theo dõi có bao nhiêu học sinh đã đăng ký,
 * mới đăng ký / hoạt động gần đây, chia theo lớp, và danh sách chi tiết.
 * Chỉ tài khoản trong ADMIN_EMAILS vào được (Firestore rules chặn phần còn lại).
 */

import { isLeaderboardConfigured, needsConnect, connectLeaderboard } from '../engine/leaderboard.js';
import { preloadAuth, getCurrentUser } from '../engine/auth.js';
import { avatarUrl } from '../engine/profile.js';
import { isAdminUser, fetchStudents } from '../engine/admin.js';

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
const gradeLabel = (g) => (g ? `Lớp ${g}` : 'Chưa chọn');

const SORTS = [
  { id: 'created', label: 'Mới đăng ký', key: (r) => r.createdAt },
  { id: 'seen', label: 'Hoạt động gần đây', key: (r) => r.lastSeenAt },
  { id: 'stars', label: 'Nhiều sao nhất', key: (r) => r.stars },
];

export function render(app, onBack) {
  const state = { rows: null, search: '', grade: 'all', sort: 'created', page: 1 };

  preloadAuth();

  app.innerHTML = `
    <div class="adm-page animate-fadeIn">
      <div class="lb-top">
        <button type="button" class="btn btn-ghost" id="adm-back">← Trang chủ</button>
        <button type="button" class="lb-refresh" id="adm-refresh" title="Tải lại" aria-label="Tải lại" hidden>🔄</button>
      </div>
      <h1 class="adm-title">📊 Quản lý học sinh</h1>
      <div id="adm-body"></div>
    </div>
  `;

  const body = app.querySelector('#adm-body');
  const refreshBtn = app.querySelector('#adm-refresh');
  app.querySelector('#adm-back').onclick = onBack;
  refreshBtn.onclick = () => load();

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
    body.innerHTML = '<div class="lb-loading" role="status"><div class="page-loading-spinner"></div><p>Đang tải danh sách học sinh…</p></div>';
    try {
      if (await needsConnect()) return showConnect();
      state.rows = await fetchStudents();
      refreshBtn.hidden = false;
      drawAll();
    } catch (e) {
      if (e?.message === 'need-connect') return showConnect();
      const denied = e?.code === 'permission-denied';
      showMessage(denied ? '🔒' : '📡', denied
        ? 'Firestore từ chối quyền đọc. Kiểm tra đã triển khai firestore.rules mới (hàm isAdmin) chưa.'
        : 'Không tải được dữ liệu. Kiểm tra kết nối mạng rồi thử lại.',
      '<button type="button" class="btn btn-primary" id="adm-retry">🔄 Thử lại</button>');
      body.querySelector('#adm-retry').onclick = () => load();
    }
  }

  function showConnect() {
    showMessage('🔗', 'Kết nối Firebase để xem danh sách học sinh.',
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
    const gradeCounts = [1, 2, 3, 4, 5, 0].map(g => ({ g, n: count(r => (r.grade || 0) === g) }));

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
    ...rows.map(r => [r.nickname, r.name, r.email, r.grade || '', r.stars, fmtDate(r.createdAt), fmtDateTime(r.lastSeenAt)]),
  ].map(l => l.map(cell).join(','));
  const blob = new Blob([`﻿${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hoc-sinh-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
