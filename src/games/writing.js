/**
 * ✍️ Luyện Viết Văn (lớp 2–5): bé tạo bài, nhập yêu cầu (đề) và viết đoạn văn ≤ 300 từ, nộp để cô giáo
 * DeepSeek chấm (api/writing/review.js): điểm theo 4 tiêu chí, lỗi chính tả gạch chân đỏ, từ dùng chưa hay,
 * câu, dấu câu kèm gợi ý sửa, từ ngữ hay nên dùng, gợi ý viết hay hơn. Bé tự sửa bài rồi nộp lại.
 * Ba màn: danh sách bài · viết / sửa bài · cô nhận xét. Dữ liệu: engine/writing.js.
 */

import {
  MAX_WORDS, MAX_PROMPT, countWords, listEssays, listOtherGradeEssays, getEssay, createEssay, updateEssay, deleteEssay,
  isStale, requestReview, requestVocab, markRanges,
} from '../engine/writing.js';
import { getProfileGrade } from '../engine/profile.js';
import { connectLeaderboard } from '../engine/leaderboard.js';
import { getCurrentUser } from '../engine/auth.js';
import { getCloudStatus, syncNow } from '../engine/cloudSync.js';
import '../styles/writing.css';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtDate = (ms) => new Date(ms).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });

const TYPES = {
  chinh_ta: { label: 'Chính tả', icon: '🔴' },
  dung_tu: { label: 'Dùng từ', icon: '🟠' },
  cau: { label: 'Câu', icon: '🟣' },
  dau_cau: { label: 'Dấu câu', icon: '🔵' },
};

const CRITERIA = [
  ['yeu_cau', 'Đúng yêu cầu đề', 3],
  ['noi_dung', 'Nội dung, ý', 3],
  ['dung_tu', 'Dùng từ, đặt câu', 2],
  ['chinh_ta', 'Chính tả, dấu câu', 2],
];

/** Đề mẫu hiện mờ trong ô yêu cầu: lớp 2 viết 3 đến 4 câu, theo kiểu bài sách Tiếng Việt 2. */
const PROMPT_EXAMPLE = {
  2: 'Viết 3 đến 4 câu tả một đồ chơi mà em thích.',
  3: 'Viết đoạn văn (4 đến 5 câu) kể về một buổi đi chơi cùng gia đình em.',
};

const ERRORS = {
  net: 'Không gửi được bài. Em kiểm tra kết nối mạng rồi thử lại.',
  limit: 'Hôm nay em đã nộp nhiều bài rồi. Ngày mai em nộp tiếp nha!',
  'too-long': `Bài dài quá ${MAX_WORDS} từ. Em rút gọn lại rồi nộp.`,
  'not-configured': 'Cô giáo chấm bài chưa sẵn sàng. Em thử lại sau.',
  ai: 'Cô chưa chấm được bài lúc này. Em bấm nộp lại sau một chút.',
};

/** Bài có lỗi được tô màu; tap vào lỗi → chi tiết. */
function markedHtml(text, ranges) {
  let out = '';
  let at = 0;
  for (const r of ranges) {
    out += esc(text.slice(at, r.start));
    // span (không phải button): nằm trong dòng chữ, xuống dòng được, gạch chân không bị cắt.
    out += `<span role="button" tabindex="0" class="wr-mark wr-mark-${r.issue.type}" data-n="${r.n}">${esc(text.slice(r.start, r.end))}<sup>${r.n}</sup></span>`;
    at = r.end;
  }
  return out + esc(text.slice(at));
}

/** Chữ viết tay của lời phê: cùng font với Luyện Đề (grade3Worksheet.js, id 'ws-font'). */
function loadHandFont() {
  if (document.getElementById('ws-font')) return;
  const link = document.createElement('link');
  link.id = 'ws-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap';
  document.head.appendChild(link);
}

export function render(app, onBack) {
  app.setAttribute('data-no-i18n', ''); // văn tiếng Việt, không dịch
  loadHandFont();
  const grade = Math.min(5, Math.max(2, getProfileGrade() || 3));
  let saveTimer = null;
  let busy = false; // đang chờ cô chấm
  let view = null; // màn đang mở, để vẽ lại khi bài từ máy khác vừa tải về

  showList();

  // Bài viết ở máy khác vừa tải về từ Drive → vẽ lại danh sách / lời nhận xét (không đụng màn bé đang gõ).
  const onPulled = () => {
    if (!app.querySelector('.wr-page')) return window.removeEventListener('tth:cloud-pulled', onPulled); // đã rời trang
    if (view === 'list') showList();
    else if (view?.startsWith('review:')) showReview(view.slice(7));
  };
  window.addEventListener('tth:cloud-pulled', onPulled);
  // Trạng thái lưu lên Google Drive ở danh sách bài (bố mẹ xem bài đã sang máy khác chưa).
  const onCloud = () => {
    const el = app.querySelector('.wr-cloud');
    if (!el) return window.removeEventListener('tth:cloud-status', onCloud);
    paintCloud(el);
  };
  window.addEventListener('tth:cloud-status', onCloud);
  syncNow(); // vào trang: lấy ngay bài viết ở máy khác

  function paintCloud(el) {
    const { state, lastSync } = getCloudStatus();
    const time = lastSync ? new Date(lastSync).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';
    const [text, action] = {
      guest: ['Đăng nhập Google để mở bài viết trên máy khác.', ''],
      syncing: ['☁️ Đang đồng bộ với Google Drive…', ''],
      ok: [`☁️ Đã đồng bộ với Google Drive lúc ${time}.`, 'Đồng bộ lại'],
      idle: ['☁️ Bài viết được lưu vào Google Drive của bạn.', 'Đồng bộ ngay'],
      'needs-auth': ['⚠️ Bài mới chưa lưu lên Google Drive.', 'Lưu lên Drive'],
      'needs-permission': ['⚠️ Cần cho phép app lưu vào Google Drive.', 'Cho phép'],
      offline: ['⚠️ Mất mạng: bài vẫn lưu trên máy, có mạng sẽ lưu lên Drive.', ''],
      error: ['⚠️ Chưa lưu được lên Google Drive.', 'Thử lại'],
    }[state] || ['', ''];
    el.classList.toggle('is-warn', text.startsWith('⚠️'));
    el.innerHTML = `<span>${text}</span>${action ? `<button type="button" class="wr-cloud-btn">${action}</button>` : ''}`;
    const btn = el.querySelector('.wr-cloud-btn');
    if (btn) btn.onclick = () => syncNow({ interactive: true }); // trong click: được mở popup Google
  }

  // ── Khung trang: thanh trên cùng đứng yên khi cuộn ─────────────────────────
  function frame({ back, backLabel, title, right = '', wide = false }, bodyHtml) {
    clearTimeout(saveTimer);
    view = null;
    app.innerHTML = `
      <div class="wr-page${wide ? ' wr-page-wide' : ''}">
        <div class="wr-top">
          <button type="button" class="btn btn-ghost wr-back">${backLabel}</button>
          <h1 class="wr-title">${title}</h1>
          <div class="wr-top-right">${right}</div>
        </div>
        <div class="wr-body">${bodyHtml}</div>
      </div>`;
    app.querySelector('.wr-back').onclick = back;
    app.scrollTop = 0;
    return app.querySelector('.wr-body');
  }

  // ── 1. Danh sách bài ──────────────────────────────────────────────────────
  function showList() {
    const essays = listEssays(grade);
    const others = listOtherGradeEssays(grade);
    const body = frame({
      back: onBack, backLabel: '← Trang chủ', title: '✍️ Luyện Viết Văn',
      right: '<button type="button" class="btn btn-primary wr-new">＋ Bài mới</button>',
    }, `<div class="wr-cloud" aria-live="polite"></div>`
      + (essays.length ? `<div class="wr-list">${essays.map(itemHtml).join('')}</div>` : emptyHtml())
      + (others.length ? `<h2 class="wr-other-h">Bài viết ở lớp khác</h2><div class="wr-list">${others.map(itemHtml).join('')}</div>` : ''));
    view = 'list';
    paintCloud(body.querySelector('.wr-cloud'));

    app.querySelector('.wr-new').onclick = () => openEditor(createEssay(grade).id);
    body.querySelectorAll('.wr-item').forEach(item => {
      const id = item.dataset.id;
      item.querySelector('.wr-item-main').onclick = () => {
        const e = getEssay(id);
        if (e?.review) showReview(id); else openEditor(id);
      };
      item.querySelector('[data-edit]').onclick = () => openEditor(id);
      item.querySelector('[data-del]').onclick = () => askDelete(item, id);
    });
  }

  function itemHtml(e) {
    const words = countWords(e.text);
    let chip = '<span class="wr-chip">Chưa nộp</span>';
    if (e.review) {
      chip = isStale(e)
        ? `<span class="wr-chip is-stale">Đã sửa, chưa chấm lại · ${e.review.total}/10</span>`
        : `<span class="wr-chip is-done">⭐ ${e.review.total}/10</span>`;
    }
    return `
      <article class="wr-item" data-id="${e.id}">
        <button type="button" class="wr-item-main">
          <span class="wr-item-prompt">${esc(e.prompt) || '<i>Chưa có đề bài</i>'}</span>
          <span class="wr-item-text">${esc(e.text.slice(0, 140)) || '<i>Chưa viết bài</i>'}</span>
          <span class="wr-item-meta">${chip}${e.grade && e.grade !== grade ? `<span>Lớp ${e.grade}</span>` : ''}<span>${words} từ</span><span>${fmtDate(e.updatedAt)}</span></span>
        </button>
        <div class="wr-item-actions">
          <button type="button" class="wr-icon-btn" data-edit>✏️ Sửa</button>
          <button type="button" class="wr-icon-btn is-danger" data-del>🗑️ Xoá</button>
        </div>
      </article>`;
  }

  function emptyHtml() {
    return `
      <div class="wr-card wr-empty">
        <div class="wr-empty-icon">📝</div>
        <p>Em chưa có bài viết nào. Bấm <b>＋ Bài mới</b> rồi nhập đề bài cô giao.</p>
      </div>`;
  }

  function askDelete(item, id) {
    const actions = item.querySelector('.wr-item-actions');
    actions.innerHTML = `
      <span class="wr-confirm-text">Xoá bài này?</span>
      <button type="button" class="wr-icon-btn is-danger" data-yes>Xoá</button>
      <button type="button" class="wr-icon-btn" data-no>Không</button>`;
    actions.querySelector('[data-yes]').onclick = () => { deleteEssay(id); showList(); };
    actions.querySelector('[data-no]').onclick = () => showList();
  }

  // ── 2. Viết / sửa bài ─────────────────────────────────────────────────────
  function openEditor(id, { focusText = false, error = '' } = {}) {
    const essay = getEssay(id);
    if (!essay) return showList();
    const leave = () => {
      flush();
      const e = getEssay(id);
      if (e && !e.prompt.trim() && !e.text.trim() && !e.review) deleteEssay(id); // bài mới bỏ trống
      showList();
      syncNow(); // rời bài: đưa lên Drive ngay, không chờ
    };
    const body = frame({
      back: leave, backLabel: '← Danh sách', title: '✏️ Bài viết',
      right: '<span class="wr-saved" aria-live="polite"></span>', wide: true,
    }, `
      <div class="wr-edit-grid">
      <div class="wr-edit-main">
      <div class="wr-card">
        <label class="wr-label" for="wr-prompt">📋 Yêu cầu (đề bài)</label>
        <textarea id="wr-prompt" class="wr-prompt" rows="2" maxlength="${MAX_PROMPT}"
          placeholder="Ví dụ: ${esc(PROMPT_EXAMPLE[grade] || PROMPT_EXAMPLE[3])}">${esc(essay.prompt)}</textarea>

        <label class="wr-label" for="wr-text">✍️ Bài làm</label>
        <textarea id="wr-text" class="wr-text" spellcheck="false" placeholder="Em viết bài ở đây…">${esc(essay.text)}</textarea>
        <div class="wr-under">
          <span class="wr-limit-msg" hidden>Bài tối đa ${MAX_WORDS} từ.</span>
          <span class="wr-count"><b class="wr-words">0</b>/${MAX_WORDS} từ</span>
        </div>
        <p class="wr-error" ${error ? '' : 'hidden'}>${esc(error)}</p>
        <div class="wr-actions">
          ${essay.review ? '<button type="button" class="btn btn-ghost wr-see-review">👀 Xem lời cô nhận xét</button>' : ''}
          <button type="button" class="btn btn-primary wr-submit">📨 Nộp bài cho cô chấm</button>
        </div>
      </div>
      ${essay.review ? '<div class="wr-card wr-fixes"></div>' : ''}
      </div>
      <aside class="wr-card wr-bank" aria-label="Bộ từ ngữ gợi ý"></aside>
      </div>`);

    const promptEl = body.querySelector('#wr-prompt');
    const textEl = body.querySelector('#wr-text');
    const savedEl = app.querySelector('.wr-saved');
    const wordsEl = body.querySelector('.wr-words');
    const countEl = body.querySelector('.wr-count');
    const limitMsg = body.querySelector('.wr-limit-msg');
    const submit = body.querySelector('.wr-submit');
    const bank = body.querySelector('.wr-bank');
    let bankBusy = false;
    let bankError = '';
    const fixes = body.querySelector('.wr-fixes');
    let lastText = textEl.value;

    function refresh() {
      const n = countWords(textEl.value);
      wordsEl.textContent = n;
      countEl.classList.toggle('is-over', n > MAX_WORDS);
      countEl.classList.toggle('is-near', n > MAX_WORDS - 30 && n <= MAX_WORDS);
      submit.disabled = !promptEl.value.trim() || n < 5 || n > MAX_WORDS;
      submit.title = !promptEl.value.trim() ? 'Em nhập yêu cầu (đề bài) trước' : n < 5 ? 'Em viết thêm rồi nộp' : '';
      if (fixes) drawFixes(fixes, getEssay(id), textEl.value);
      markUsedWords();
    }

    // ── Bộ từ ngữ gợi ý: bé bấm khi chưa biết dùng từ gì; chạm từ → chèn vào bài ở chỗ con trỏ ──
    function drawBank() {
      const wb = getEssay(id)?.wordBank;
      const hasPrompt = !!promptEl.value.trim();
      const changed = wb && wb.prompt.trim() !== promptEl.value.trim();
      const ask = (label) => `<button type="button" class="btn btn-primary wr-bank-ask" ${hasPrompt ? '' : 'disabled'}>${label}</button>`;
      let inner;
      if (bankBusy) {
        inner = '<div class="wr-bank-wait" role="status"><div class="page-loading-spinner"></div><p>Cô đang tìm từ ngữ hay cho đề này…</p></div>';
      } else if (wb?.groups?.length) {
        inner = `
          <p class="wr-bank-hint">Chạm vào từ để thêm vào bài.</p>
          ${wb.groups.map(g => `
            <div class="wr-bank-group">
              <h3>${esc(g.title)}</h3>
              <div class="wr-bank-words">${g.words.map(w => `<button type="button" class="wr-chip-word" data-word="${esc(w)}">${esc(w)}</button>`).join('')}</div>
            </div>`).join('')}
          ${changed ? `<p class="wr-bank-note">Em đã đổi đề bài.</p>${ask('🔄 Gợi ý lại theo đề mới')}` : ''}`;
      } else {
        inner = `
          <p class="wr-bank-hint">${hasPrompt ? 'Em chưa biết dùng từ gì? Cô gợi ý từ ngữ hay hợp với đề bài.' : 'Em nhập yêu cầu (đề bài) trước, cô sẽ gợi ý từ ngữ hay hợp với đề.'}</p>
          ${ask('📚 Gợi ý từ ngữ')}`;
      }
      bank.innerHTML = `<h2 class="wr-h2">📚 Bộ từ ngữ gợi ý</h2>${inner}${bankError ? `<p class="wr-error">${esc(bankError)}</p>` : ''}`;
      bank.querySelector('.wr-bank-ask')?.addEventListener('click', askWords);
      bank.querySelectorAll('[data-word]').forEach(b => {
        // pointerdown giữ con trỏ trong ô bài làm (không để nút lấy focus)
        b.onpointerdown = (e) => e.preventDefault();
        b.onclick = () => insertWord(b.dataset.word);
      });
      markUsedWords();
    }

    async function askWords() {
      const prompt = promptEl.value.trim();
      if (!prompt || bankBusy) return;
      flush();
      bankBusy = true;
      bankError = '';
      drawBank();
      try {
        const vocab = await requestVocab({ prompt, grade: essay.grade || grade });
        if (!bank.isConnected) return;
        updateEssay(id, { wordBank: { prompt, groups: vocab.groups, at: Date.now() } });
      } catch (e) {
        if (!bank.isConnected) return;
        if (e.code === 'auth') { bankBusy = false; return showConnect(id); }
        bankError = ERRORS[e.code] === ERRORS.ai || !ERRORS[e.code] ? 'Cô chưa gợi ý được lúc này. Em bấm lại sau một chút.' : ERRORS[e.code];
      }
      bankBusy = false;
      drawBank();
    }

    /** Chèn từ vào chỗ con trỏ, tự thêm dấu cách hai bên. */
    function insertWord(word) {
      const v = textEl.value;
      // Bé chưa đặt con trỏ vào bài (đang 0) → thêm vào cuối bài.
      const placed = document.activeElement === textEl || textEl.selectionEnd > 0;
      const at = placed ? textEl.selectionStart : v.length;
      const end = placed ? textEl.selectionEnd : v.length;
      const before = v.slice(0, at);
      const after = v.slice(end);
      const piece = `${before && !/\s$/.test(before) ? ' ' : ''}${word}${after && !/^[\s.,!?;:]/.test(after) ? ' ' : ''}`;
      textEl.value = before + piece + after;
      const caret = (before + piece).length;
      textEl.focus({ preventScroll: true });
      textEl.setSelectionRange(caret, caret);
      textEl.oninput();
    }

    /** Từ đã có trong bài: chip xanh có dấu ✓. */
    function markUsedWords() {
      const t = textEl.value.toLowerCase();
      bank.querySelectorAll('[data-word]').forEach(b => b.classList.toggle('is-used', t.includes(b.dataset.word.toLowerCase())));
    }

    function scheduleSave() {
      savedEl.textContent = '';
      clearTimeout(saveTimer);
      saveTimer = setTimeout(flush, 500);
    }
    function flush() {
      clearTimeout(saveTimer);
      const e = getEssay(id);
      if (!e || (e.prompt === promptEl.value && e.text === textEl.value)) return;
      updateEssay(id, { prompt: promptEl.value, text: textEl.value });
      savedEl.textContent = '✓ Đã lưu';
    }

    promptEl.oninput = () => {
      drawBankSoon(); // nút gợi ý bật / tắt, báo đề đã đổi
      refresh();
      scheduleSave();
    };
    textEl.oninput = () => {
      // Quá 300 từ: không nhận chữ mới (bài cũ đã dài sẵn thì vẫn cho sửa, nút nộp tắt).
      if (countWords(textEl.value) > MAX_WORDS && countWords(lastText) <= MAX_WORDS) {
        const caret = Math.max(0, textEl.selectionStart - (textEl.value.length - lastText.length));
        textEl.value = lastText;
        textEl.setSelectionRange(caret, caret);
        limitMsg.hidden = false;
        limitMsg.classList.remove('is-shake');
        void limitMsg.offsetWidth;
        limitMsg.classList.add('is-shake');
      } else {
        limitMsg.hidden = countWords(textEl.value) < MAX_WORDS;
      }
      lastText = textEl.value;
      refresh();
      scheduleSave();
    };
    let bankTimer = null;
    function drawBankSoon() { clearTimeout(bankTimer); bankTimer = setTimeout(() => { if (bank.isConnected && !bankBusy) drawBank(); }, 400); }
    body.querySelector('.wr-see-review')?.addEventListener('click', () => { flush(); showReview(id); });
    submit.onclick = () => { flush(); submitEssay(id); };

    drawBank();
    refresh();
    limitMsg.hidden = countWords(textEl.value) < MAX_WORDS;
    if (focusText || essay.prompt.trim()) textEl.focus({ preventScroll: true });
    else promptEl.focus({ preventScroll: true });
  }

  /** Lỗi cô đã chỉ ra ở lần chấm trước: lỗi nào không còn trong bài thì đánh dấu đã sửa. */
  function drawFixes(box, essay, text) {
    const issues = markRanges(essay.review.text, essay.review.issues);
    if (!issues.length) { box.hidden = true; return; }
    const fixed = issues.filter(r => !text.includes(r.issue.text)).length;
    box.innerHTML = `
      <h2 class="wr-h2">🔎 Lỗi cô đã chỉ ra <span class="wr-h2-sub">Đã sửa ${fixed}/${issues.length}</span></h2>
      <ol class="wr-fix-list">
        ${issues.map(r => {
          const done = !text.includes(r.issue.text);
          return `<li class="wr-fix ${done ? 'is-fixed' : ''}">
            <span class="wr-fix-type wr-type-${r.issue.type}">${TYPES[r.issue.type].label}</span>
            <span class="wr-fix-what"><s class="wr-wrong wr-wrong-${r.issue.type}">${esc(r.issue.text)}</s>
              ${r.issue.suggestions.length ? `→ <b>${r.issue.suggestions.map(esc).join(' / ')}</b>` : ''}</span>
            ${done ? '<span class="wr-fix-ok">✓ Đã sửa</span>' : ''}
          </li>`;
        }).join('')}
      </ol>`;
  }

  // ── Nộp bài ───────────────────────────────────────────────────────────────
  async function submitEssay(id) {
    if (busy) return;
    const essay = getEssay(id);
    if (!essay) return showList();
    busy = true;
    frame({ back: () => { busy = false; openEditor(id); }, backLabel: '← Bài viết', title: '📨 Nộp bài' }, `
      <div class="wr-card wr-waiting" role="status">
        <div class="wr-teacher">👩‍🏫</div>
        <div class="page-loading-spinner"></div>
        <p>Cô đang đọc bài của em…</p>
      </div>`);
    try {
      const review = await requestReview({ prompt: essay.prompt.trim(), text: essay.text, grade: essay.grade || grade });
      if (!busy) return; // bé đã quay lại
      const history = [...(essay.history || []), { at: Date.now(), total: review.total }].slice(-10);
      updateEssay(id, { review: { ...review, at: Date.now(), text: essay.text }, history });
      busy = false;
      showReview(id);
    } catch (e) {
      if (!busy) return;
      busy = false;
      if (e.code === 'auth') return showConnect(id);
      openEditor(id, { error: ERRORS[e.code] || ERRORS.ai });
    }
  }

  function showConnect(id) {
    const body = frame({ back: () => openEditor(id), backLabel: '← Bài viết', title: '📨 Nộp bài' }, `
      <div class="wr-card wr-waiting">
        <div class="wr-teacher">🔗</div>
        <p>${getCurrentUser() ? 'Em bấm Kết nối để cô nhận được bài.' : 'Cô chưa nhận được bài. Em thử lại sau một chút.'}</p>
        <div class="wr-actions">
          ${getCurrentUser() ? '<button type="button" class="btn btn-primary wr-connect">🔗 Kết nối</button>' : ''}
          <button type="button" class="btn btn-ghost wr-retry">🔄 Nộp lại</button>
        </div>
        <p class="wr-error" hidden></p>
      </div>`);
    body.querySelector('.wr-retry').onclick = () => submitEssay(id);
    const btn = body.querySelector('.wr-connect');
    if (btn) {
      btn.onclick = () => {
        btn.disabled = true;
        // Gọi ngay trong click để Safari (iPad) cho mở popup Google.
        connectLeaderboard().then(() => submitEssay(id)).catch(() => {
          btn.disabled = false;
          const err = body.querySelector('.wr-error');
          err.textContent = 'Kết nối chưa được, em thử lại.';
          err.hidden = false;
        });
      };
    }
  }

  // ── 3. Cô nhận xét ────────────────────────────────────────────────────────
  function showReview(id) {
    const essay = getEssay(id);
    if (!essay?.review) return openEditor(id);
    const rv = essay.review;
    const ranges = markRanges(rv.text, rv.issues);
    const prev = (essay.history || []).at(-2);
    const usedTypes = [...new Set(ranges.map(r => r.issue.type))];
    const stale = isStale(essay);

    const body = frame({ back: showList, backLabel: '← Danh sách', title: '👩‍🏫 Cô nhận xét' }, `
      <div class="wr-card wr-score-card">
        <div class="wr-score">
          <div class="wr-score-num"><b>${rv.total}</b><span>/10</span></div>
          ${prev ? `<div class="wr-score-prev">Lần trước ${prev.total}/10 ${rv.total > prev.total ? '📈' : ''}</div>` : ''}
        </div>
        <div class="wr-paper wr-criteria">
          ${CRITERIA.map(([k, label, max]) => `
            <div class="wr-crit">
              <span class="wr-crit-label">${label} <small>(tối đa ${max})</small></span>
              <span class="wr-crit-val">${rv.scores[k]} điểm</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="wr-card">
        <h2 class="wr-h2">✍️ Lời phê của cô</h2>
        <div class="wr-paper">
          ${rv.summary ? `<p class="wr-hand">${esc(rv.summary)}</p>` : ''}
          ${rv.strengths.length ? `
            <p class="wr-hand wr-hand-head">Em làm tốt:</p>
            <ul class="wr-hand-list">${rv.strengths.map(s => `<li class="wr-hand">${esc(s)}</li>`).join('')}</ul>` : ''}
        </div>
      </div>

      <div class="wr-card">
        <h2 class="wr-h2">📝 Bài của em ${ranges.length ? `<span class="wr-h2-sub">${ranges.length} chỗ cần sửa, chạm vào để xem</span>` : ''}</h2>
        ${stale ? '<p class="wr-note">Em đã sửa bài sau lần chấm này. Đây là bài lúc cô chấm, nộp lại để cô chấm bài mới.</p>' : ''}
        <div class="wr-prompt-view">📋 ${esc(essay.prompt)}</div>
        ${usedTypes.length ? `<div class="wr-legend">${usedTypes.map(t => `<span class="wr-legend-item"><span class="wr-mark wr-mark-${t}">abc</span> ${TYPES[t].label}</span>`).join('')}</div>` : ''}
        <div class="wr-essay-wrap">
          <div class="wr-essay">${markedHtml(rv.text, ranges)}</div>
          <div class="wr-bubble" role="dialog" hidden></div>
        </div>
        ${!ranges.length ? '<p class="wr-note is-good">🎉 Cô không thấy lỗi chính tả hay dùng từ nào. Giỏi lắm!</p>' : ''}
      </div>

      ${ranges.length ? `
        <div class="wr-card">
          <h2 class="wr-h2">🔎 Các chỗ cần sửa</h2>
          <ol class="wr-issue-list">
            ${ranges.map(r => `
              <li><button type="button" class="wr-issue" data-n="${r.n}">
                <span class="wr-issue-n">${r.n}</span>
                <span class="wr-issue-body">
                  <span class="wr-fix-type wr-type-${r.issue.type}">${TYPES[r.issue.type].label}</span>
                  <s class="wr-wrong wr-wrong-${r.issue.type}">${esc(r.issue.text)}</s>
                  ${r.issue.suggestions.length ? `→ <b class="wr-sugg">${r.issue.suggestions.map(esc).join(' / ')}</b>` : ''}
                  ${r.issue.explain ? `<span class="wr-explain">${esc(r.issue.explain)}</span>` : ''}
                </span>
              </button></li>`).join('')}
          </ol>
        </div>` : ''}

      ${rv.vocab.length ? `
        <div class="wr-card">
          <h2 class="wr-h2">💡 Từ ngữ hay em có thể dùng</h2>
          <div class="wr-vocab">
            ${rv.vocab.map(v => `<div class="wr-word"><b>${esc(v.word)}</b>${v.example ? `<span>${esc(v.example)}</span>` : ''}</div>`).join('')}
          </div>
        </div>` : ''}

      ${rv.tips.length ? `
        <div class="wr-card">
          <h2 class="wr-h2">🚀 Để bài hay hơn</h2>
          <ul class="wr-bullets">${rv.tips.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>` : ''}

      <div class="wr-bottom">
        <button type="button" class="btn btn-primary wr-edit">✏️ Sửa bài</button>
        ${stale ? '<button type="button" class="btn btn-green wr-resubmit">📨 Nộp lại</button>' : ''}
      </div>`);
    view = `review:${id}`;

    // Bấm vào một lỗi: bong bóng giải thích hiện ngay trên chỗ lỗi (không phải cuộn xuống tìm).
    const bubble = body.querySelector('.wr-bubble');
    let openMark = null;
    function closeBubble() {
      bubble.hidden = true;
      openMark?.classList.remove('is-on');
      openMark = null;
    }
    function placeBubble() {
      if (!openMark || !openMark.isConnected) return;
      const wrap = bubble.parentElement.getBoundingClientRect();
      const lines = openMark.getClientRects();
      const first = lines[0];
      const last = lines[lines.length - 1];
      const bw = bubble.offsetWidth;
      const bh = bubble.offsetHeight;
      const GAP = 12;
      // Thanh trên cùng đứng yên che mất phần trên: không đủ chỗ thì hiện bên dưới chỗ lỗi.
      const topLimit = app.querySelector('.wr-top')?.getBoundingClientRect().bottom || 0;
      const below = first.top - bh - GAP < topLimit + 4;
      const line = below ? last : first;
      const cx = line.left + line.width / 2 - wrap.left;
      const left = Math.max(0, Math.min(cx - bw / 2, wrap.width - bw));
      bubble.style.left = `${left}px`;
      bubble.style.top = `${below ? line.bottom - wrap.top + GAP : line.top - wrap.top - bh - GAP}px`;
      bubble.style.setProperty('--arrow-x', `${Math.max(18, Math.min(cx - left, bw - 18))}px`);
      bubble.classList.toggle('is-below', below);
    }
    function select(n) {
      const r = ranges.find(x => x.n === Number(n));
      const mark = body.querySelector(`.wr-essay .wr-mark[data-n="${n}"]`);
      if (!r || !mark) return;
      if (openMark === mark && !bubble.hidden) { closeBubble(); return; } // bấm lại thì đóng
      closeBubble();
      openMark = mark;
      mark.classList.add('is-on');
      bubble.className = `wr-bubble wr-bubble-${r.issue.type}`;
      bubble.innerHTML = `
        <button type="button" class="wr-bubble-x" aria-label="Đóng">✕</button>
        <div class="wr-detail-head"><span class="wr-fix-type wr-type-${r.issue.type}">${TYPES[r.issue.type].icon} ${TYPES[r.issue.type].label}</span>
          <s class="wr-wrong wr-wrong-${r.issue.type}">${esc(r.issue.text)}</s>
          ${r.issue.suggestions.length ? `→ ${r.issue.suggestions.map(s => `<b class="wr-sugg-chip">${esc(s)}</b>`).join(' ')}` : ''}</div>
        ${r.issue.explain ? `<p>${esc(r.issue.explain)}</p>` : ''}`;
      bubble.querySelector('.wr-bubble-x').onclick = closeBubble;
      bubble.hidden = false;
      placeBubble();
      return mark;
    }
    body.querySelectorAll('.wr-essay .wr-mark').forEach(m => {
      m.onclick = () => select(m.dataset.n);
      m.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(m.dataset.n); } };
    });
    body.querySelectorAll('.wr-issue').forEach(b => {
      b.onclick = () => {
        if (openMark?.dataset.n === b.dataset.n) closeBubble(); // luôn mở lại, không đóng
        const mark = select(b.dataset.n);
        if (!mark) return;
        mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(placeBubble, 450); // cuộn xong mới biết còn chỗ phía trên không
      };
    });
    // Chạm chỗ khác thì đóng bong bóng; đổi cỡ màn hình thì đặt lại cho đúng chỗ lỗi.
    body.addEventListener('click', (e) => {
      if (!bubble.hidden && !e.target.closest('.wr-mark, .wr-bubble, .wr-issue')) closeBubble();
    });
    body.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBubble(); });
    new ResizeObserver(placeBubble).observe(bubble.parentElement);
    body.querySelector('.wr-edit').onclick = () => openEditor(id);
    body.querySelector('.wr-resubmit')?.addEventListener('click', () => submitEssay(id));
  }
}
