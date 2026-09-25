/**
 * Trang "Đánh giá ứng dụng": điểm trung bình + phân bố sao, form gửi/sửa đánh giá
 * của mình, và danh sách tất cả đánh giá (kèm phản hồi của admin nếu có).
 */

import { isLeaderboardConfigured, needsConnect, connectLeaderboard } from '../engine/leaderboard.js';
import { preloadAuth } from '../engine/auth.js';
import { avatarUrl, displayName } from '../engine/profile.js';
import { fetchReviews, submitReview, reviewStats, NAME_MAX, COMMENT_MAX } from '../engine/reviews.js';
import '../styles/reviews.css';

const CAPTIONS = ['', 'Rất tệ 😢', 'Chưa tốt 😕', 'Bình thường 😐', 'Tốt 🙂', 'Tuyệt vời! 🤩'];

export function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Hàng sao nhỏ (hiển thị), làm tròn nửa sao cho điểm trung bình. */
export function starsHtml(value, cls = '') {
  const full = Math.round(value * 2) / 2;
  return `<span class="rv-stars ${cls}" role="img" aria-label="${value.toFixed(1)} sao">${
    [1, 2, 3, 4, 5].map(i => `<span class="rv-star${i <= full ? ' is-on' : i - 0.5 === full ? ' is-half' : ''}">★</span>`).join('')
  }</span>`;
}

export function reviewerHtml(r) {
  const label = r.name || 'Ẩn danh';
  const img = avatarUrl(r.avatar);
  const avatar = img
    ? `<img class="rv-avatar" src="${img}" alt="">`
    : `<span class="rv-avatar rv-avatar-fallback">${escapeHtml(label.charAt(0).toUpperCase())}</span>`;
  return `<span class="rv-who">${avatar}<strong>${escapeHtml(label)}</strong></span>`;
}

const fmtDate = (ms) => new Date(ms).toLocaleDateString('vi-VN');

export function render(app, onBack) {
  const state = { reviews: null, mine: null, editing: true, rating: 0 };

  preloadAuth();

  app.innerHTML = `
    <div class="rv-page animate-fadeIn">
      <div class="lb-top">
        <button type="button" class="btn btn-ghost" id="rv-back">← Trang chủ</button>
      </div>
      <div id="rv-body"></div>
    </div>
  `;
  const body = app.querySelector('#rv-body');
  app.querySelector('#rv-back').onclick = onBack;

  if (!isLeaderboardConfigured()) {
    showMessage('🛠️', 'Chưa bật được tính năng đánh giá.');
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
    body.innerHTML = '<div class="lb-loading" role="status"><div class="page-loading-spinner"></div><p>Đang tải đánh giá…</p></div>';
    try {
      if (await needsConnect()) return showConnect();
      const { reviews, mine } = await fetchReviews();
      state.reviews = reviews;
      state.mine = mine;
      state.editing = !mine;
      state.rating = mine?.rating || 0;
      draw();
    } catch (e) {
      if (e?.message === 'need-connect') return showConnect();
      showMessage('📡', 'Không tải được đánh giá. Kiểm tra kết nối mạng rồi thử lại nhé.',
        '<button type="button" class="btn btn-primary" id="rv-retry">🔄 Thử lại</button>');
      body.querySelector('#rv-retry').onclick = () => load();
    }
  }

  function showConnect() {
    showMessage('🔗', 'Kết nối để xem và gửi đánh giá.',
      '<button type="button" class="btn btn-primary" id="rv-connect">🔗 Kết nối</button><p class="lb-error" id="rv-connect-err" hidden></p>');
    const btn = body.querySelector('#rv-connect');
    btn.onclick = () => {
      btn.disabled = true;
      // Gọi ngay trong click để Safari (iPad) cho mở popup Google.
      connectLeaderboard().then(() => load()).catch((e) => {
        btn.disabled = false;
        const err = body.querySelector('#rv-connect-err');
        err.textContent = e?.message || 'Kết nối thất bại, thử lại nhé.';
        err.hidden = false;
      });
    };
  }

  function draw() {
    const stats = reviewStats(state.reviews);
    body.innerHTML = `
      <div class="lb-card rv-card">
        <h1 class="rv-title">⭐ Đánh giá ứng dụng</h1>

        <section class="rv-summary">
          <div class="rv-score">
            <div class="rv-score-value">${stats.count ? stats.average.toFixed(1) : '–'}</div>
            ${starsHtml(stats.average)}
            <div class="rv-score-count">${stats.count} đánh giá</div>
          </div>
          <div class="rv-bars">
            ${[5, 4, 3, 2, 1].map((n) => {
              const c = stats.distribution[n];
              const pct = stats.count ? (c / stats.count) * 100 : 0;
              return `
                <div class="rv-bar-row">
                  <span class="rv-bar-label">${n}★</span>
                  <span class="rv-bar"><span class="rv-bar-fill" style="width:${pct}%"></span></span>
                  <span class="rv-bar-count">${c}</span>
                </div>`;
            }).join('')}
          </div>
        </section>

        <section class="rv-form-wrap" id="rv-form-wrap"></section>

        <section class="rv-list-wrap">
          <h2 class="rv-h2">Tất cả đánh giá</h2>
          ${state.reviews.length ? `<div class="rv-list">${state.reviews.map(itemHtml).join('')}</div>`
            : '<p class="rv-empty">Chưa có đánh giá nào. Hãy là người đầu tiên nhé!</p>'}
        </section>
      </div>
    `;
    drawForm();
  }

  function itemHtml(r) {
    return `
      <article class="rv-item${r.id === state.mine?.id ? ' is-mine' : ''}">
        <div class="rv-item-head">
          ${reviewerHtml(r)}
          <span class="rv-date">${fmtDate(r.updatedAt)}</span>
        </div>
        ${starsHtml(r.rating, 'rv-stars-sm')}
        ${r.comment ? `<p class="rv-comment">${escapeHtml(r.comment)}</p>` : ''}
        ${r.reply ? `
          <div class="rv-reply">
            <span class="rv-reply-from">💬 Phản hồi từ Toán Tiểu Học</span>
            <p>${escapeHtml(r.reply.message)}</p>
          </div>` : ''}
      </article>`;
  }

  function drawForm() {
    const wrap = body.querySelector('#rv-form-wrap');
    if (!state.editing) {
      wrap.innerHTML = `
        <div class="rv-thanks">
          <p>Cảm ơn em đã đánh giá! 🙏</p>
          <button type="button" class="btn btn-ghost" id="rv-edit">✏️ Sửa đánh giá</button>
        </div>`;
      wrap.querySelector('#rv-edit').onclick = () => { state.editing = true; drawForm(); };
      return;
    }

    const mine = state.mine;
    wrap.innerHTML = `
      <div class="rv-form">
        <div class="rv-picker" role="radiogroup" aria-label="Chọn số sao đánh giá">
          ${[1, 2, 3, 4, 5].map(s => `<button type="button" class="rv-pick" role="radio" data-s="${s}" aria-label="${s} sao">★</button>`).join('')}
        </div>
        <p class="rv-caption" id="rv-caption"></p>
        <input class="rv-input" id="rv-name" maxlength="${NAME_MAX}" placeholder="Tên hiển thị (không bắt buộc)"
          value="${escapeHtml(mine ? mine.name : displayName())}">
        <textarea class="rv-input rv-textarea" id="rv-comment" rows="3" maxlength="${COMMENT_MAX}"
          placeholder="Viết cảm nhận của em (không bắt buộc)…">${escapeHtml(mine?.comment || '')}</textarea>
        <p class="lb-error" id="rv-err" hidden></p>
        <button type="button" class="btn btn-primary rv-submit" id="rv-submit">${mine ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}</button>
      </div>`;

    const picks = [...wrap.querySelectorAll('.rv-pick')];
    const caption = wrap.querySelector('#rv-caption');
    const submit = wrap.querySelector('#rv-submit');
    const paint = (shown) => {
      picks.forEach((p, i) => {
        p.classList.toggle('is-on', i < shown);
        p.setAttribute('aria-checked', String(i + 1 === state.rating));
      });
      caption.textContent = shown ? CAPTIONS[shown] : 'Chạm vào sao để đánh giá';
      caption.classList.toggle('is-set', !!shown);
      submit.disabled = !state.rating;
    };
    picks.forEach((p) => {
      const s = Number(p.dataset.s);
      p.onmouseenter = () => paint(s);
      p.onmouseleave = () => paint(state.rating);
      p.onclick = () => { state.rating = s; paint(s); };
    });
    paint(state.rating);

    submit.onclick = async () => {
      if (!state.rating) return;
      const err = wrap.querySelector('#rv-err');
      err.hidden = true;
      submit.disabled = true;
      submit.textContent = 'Đang gửi…';
      const name = wrap.querySelector('#rv-name').value;
      const comment = wrap.querySelector('#rv-comment').value;
      try {
        await submitReview({ rating: state.rating, name, comment });
        await load(); // tải lại để thấy đánh giá của mình trong danh sách (form chuyển sang "Cảm ơn")
      } catch {
        err.textContent = 'Gửi đánh giá thất bại, thử lại sau nhé.';
        err.hidden = false;
        submit.disabled = false;
        submit.textContent = mine ? 'Cập nhật đánh giá' : 'Gửi đánh giá';
      }
    };
  }
}
