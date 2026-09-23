/**
 * Thiết lập hồ sơ bé: chọn bạn trai/bạn gái → chọn lớp, avatar và đặt biệt danh.
 *
 * mode 'onboard': sau lần đăng nhập đầu, bắt đầu từ bước chọn trai/gái. Lớp là bắt buộc;
 *   avatar và biệt danh có thể "Bỏ qua".
 * mode 'edit': mở từ menu avatar, vào thẳng bước chọn avatar, có nút "Huỷ".
 */

import { AVATARS, NAME_MAX, getProfile, saveProfile, avatarUrl } from '../engine/profile.js';
import { GRADES } from '../data/grades.js';

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const GENDER_LABEL = { boy: 'Bạn trai', girl: 'Bạn gái' };

export function renderProfileSetup(app, { mode = 'onboard', onDone }) {
  const current = getProfile();
  const state = {
    gender: current.gender || null,
    avatar: current.avatar || null,
    // Biệt danh hiện trên bảng xếp hạng — không điền sẵn tên thật từ tài khoản Google.
    name: current.name || '',
    grade: current.grade || null,
  };

  if (mode === 'edit' || state.gender) showAvatarStep();
  else showGenderStep();

  // ── Bước 1: bạn trai hay bạn gái ─────────────────────────────────────────
  function showGenderStep() {
    app.innerHTML = `
      <div class="profile-page">
        <div class="profile-card animate-fadeIn">
          <div class="profile-step">Bước 1/2</div>
          <h1 class="profile-title">Chào mừng bé đến với Toán Tiểu Học! 🎉</h1>
          <p class="profile-sub">Bé là bạn trai hay bạn gái?</p>
          <div class="gender-choices">
            ${['boy', 'girl'].map(g => `
              <button type="button" class="gender-card gender-${g}" data-gender="${g}">
                <img src="${AVATARS[g][0].url}" alt="">
                <span>${GENDER_LABEL[g]}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    app.querySelectorAll('.gender-card').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.gender !== btn.dataset.gender) state.avatar = null;
        state.gender = btn.dataset.gender;
        showAvatarStep();
      });
    });
  }

  // ── Bước 2: chọn lớp, avatar + đặt tên ───────────────────────────────────
  function showAvatarStep() {
    if (!state.gender) state.gender = 'boy';
    const list = AVATARS[state.gender];
    const preview = avatarUrl(state.avatar);

    app.innerHTML = `
      <div class="profile-page">
        <div class="profile-card profile-card-wide animate-fadeIn">
          ${mode === 'onboard' ? '<div class="profile-step">Bước 2/2</div>' : ''}
          <h1 class="profile-title">${mode === 'onboard' ? 'Chọn lớp và hình đại diện cho bé' : 'Đổi lớp, avatar và biệt danh'}</h1>

          <div class="profile-grade">
            <div class="profile-grade-label">Bé học lớp mấy?</div>
            <div class="profile-grade-choices" role="radiogroup" aria-label="Chọn lớp">
              ${GRADES.map(g => {
                const open = g.games.length > 0;
                const on = state.grade === g.num;
                return `
                  <button type="button" role="radio" class="profile-grade-btn${on ? ' is-selected' : ''}" data-grade="${g.num}"
                    aria-checked="${on}" style="--grade-color: ${g.color}" ${open ? '' : 'disabled'}>
                    <span class="profile-grade-num">${g.num}</span>
                    <span class="profile-grade-sub">${open ? `Lớp ${g.num}` : 'Sắp có'}</span>
                  </button>`;
              }).join('')}
            </div>
          </div>

          <div class="profile-preview">
            <div class="profile-preview-avatar${preview ? '' : ' is-empty'}">
              ${preview ? `<img src="${preview}" alt="">` : '?'}
            </div>
            <label class="profile-name-field">
              <span>Biệt danh <small>(hiện trên bảng xếp hạng)</small></span>
              <input type="text" id="profile-name" maxlength="${NAME_MAX}" value="${escapeHtml(state.name)}"
                placeholder="VD: Siêu Nhân Toán" autocomplete="off" enterkeyhint="done">
            </label>
          </div>

          <div class="gender-tabs" role="tablist">
            ${['boy', 'girl'].map(g => `
              <button type="button" role="tab" class="gender-tab gender-tab-${g}${state.gender === g ? ' is-active' : ''}"
                aria-selected="${state.gender === g}" data-gender="${g}">${g === 'boy' ? '👦' : '👧'} ${GENDER_LABEL[g]}</button>
            `).join('')}
          </div>

          <div class="avatar-grid">
            ${list.map(a => `
              <button type="button" class="avatar-option${state.avatar === a.id ? ' is-selected' : ''}" data-avatar="${a.id}" aria-label="Chọn avatar ${a.id}" aria-pressed="${state.avatar === a.id}">
                <img src="${a.url}" alt="" loading="lazy">
              </button>
            `).join('')}
          </div>

          <button type="button" class="btn btn-primary profile-done" id="profile-done" ${canFinish() ? '' : 'disabled'}>Xong ✓</button>
          <p class="profile-need" id="profile-need"${needText() ? '' : ' hidden'}>${needText()}</p>
          <div class="profile-secondary">
            ${mode === 'onboard'
              ? `<button type="button" class="profile-skip" id="profile-back">← Quay lại</button><button type="button" class="profile-skip" id="profile-skip" ${state.grade ? '' : 'disabled'}>Bỏ qua, để sau</button>`
              : '<button type="button" class="profile-skip" id="profile-cancel">Huỷ</button>'}
          </div>
        </div>
      </div>
    `;

    const nameInput = app.querySelector('#profile-name');
    nameInput.addEventListener('input', () => { state.name = nameInput.value; });
    nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') nameInput.blur(); });

    app.querySelectorAll('.gender-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.dataset.gender === state.gender) return;
        state.gender = tab.dataset.gender;
        state.avatar = null;
        showAvatarStep();
      });
    });

    app.querySelectorAll('.avatar-option').forEach(btn => {
      btn.addEventListener('click', () => {
        state.avatar = btn.dataset.avatar;
        app.querySelectorAll('.avatar-option').forEach(b => {
          const on = b === btn;
          b.classList.toggle('is-selected', on);
          b.setAttribute('aria-pressed', String(on));
        });
        const box = app.querySelector('.profile-preview-avatar');
        box.classList.remove('is-empty');
        box.innerHTML = `<img src="${avatarUrl(state.avatar)}" alt="">`;
        syncFinish();
      });
    });

    app.querySelectorAll('.profile-grade-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.grade = Number(btn.dataset.grade);
        app.querySelectorAll('.profile-grade-btn').forEach(b => {
          const on = b === btn;
          b.classList.toggle('is-selected', on);
          b.setAttribute('aria-checked', String(on));
        });
        syncFinish();
      });
    });

    app.querySelector('#profile-done').onclick = () => {
      if (!canFinish()) return;
      const name = state.name.trim().slice(0, NAME_MAX);
      saveProfile({ gender: state.gender, avatar: state.avatar, name, grade: state.grade });
      onDone();
    };
    app.querySelector('#profile-back')?.addEventListener('click', showGenderStep);
    app.querySelector('#profile-skip')?.addEventListener('click', skip);
    app.querySelector('#profile-cancel')?.addEventListener('click', onDone);
  }

  function canFinish() {
    return !!(state.grade && state.avatar);
  }

  function needText() {
    if (!state.grade) return 'Chọn lớp của bé trước nhé 👆';
    if (!state.avatar) return 'Chọn một hình đại diện nhé 👇';
    return '';
  }

  function syncFinish() {
    app.querySelector('#profile-done').disabled = !canFinish();
    const need = app.querySelector('#profile-need');
    need.textContent = needText();
    need.hidden = !need.textContent;
    const skipBtn = app.querySelector('#profile-skip');
    if (skipBtn) skipBtn.disabled = !state.grade;
  }

  // Bỏ qua avatar/biệt danh — nhưng vẫn phải có lớp.
  function skip() {
    if (!state.grade) return;
    saveProfile({ grade: state.grade });
    onDone();
  }
}
