/**
 * ✍️ Luyện Viết Văn (lớp 3–5): bé tạo bài, nhập yêu cầu (đề) và viết đoạn văn ≤ 300 từ, nộp để cô giáo
 * DeepSeek chấm (api/writing/review.js): điểm theo 4 tiêu chí, lỗi chính tả gạch chân đỏ, từ dùng chưa hay,
 * câu, dấu câu kèm gợi ý sửa, từ ngữ hay nên dùng, gợi ý viết hay hơn. Bé tự sửa bài rồi nộp lại.
 * Ba màn: danh sách bài · viết / sửa bài · cô nhận xét. Dữ liệu: engine/writing.js.
 */

import {
  MAX_WORDS, MAX_PROMPT, countWords, listEssays, getEssay, createEssay, updateEssay, deleteEssay,
  isStale, requestReview, markRanges,
} from '../engine/writing.js';
import { getProfileGrade } from '../engine/profile.js';
import { connectLeaderboard } from '../engine/leaderboard.js';
import { getCurrentUser } from '../engine/auth.js';
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

const SAMPLE_PROMPTS = [
  'Viết đoạn văn (4 đến 5 câu) kể về một buổi đi chơi cùng gia đình em.',
  'Viết đoạn văn ngắn tả một đồ dùng học tập mà em yêu thích.',
  'Viết đoạn văn nêu tình cảm, cảm xúc của em đối với một người thân trong gia đình.',
  'Viết đoạn văn ngắn tả con vật nuôi trong nhà mà em yêu thích.',
  'Viết đoạn văn kể lại một việc tốt em đã làm ở trường hoặc ở nhà.',
  'Viết đoạn văn ngắn tả cảnh sân trường em vào giờ ra chơi.',
];

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
  const grade = Math.min(5, Math.max(3, getProfileGrade() || 3));
  let saveTimer = null;
  let busy = false; // đang chờ cô chấm

  showList();

  // ── Khung trang: thanh trên cùng đứng yên khi cuộn ─────────────────────────
  function frame({ back, backLabel, title, right = '' }, bodyHtml) {
    clearTimeout(saveTimer);
    app.innerHTML = `
      <div class="wr-page">
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
    const essays = listEssays();
    const body = frame({
      back: onBack, backLabel: '← Trang chủ', title: '✍️ Luyện Viết Văn',
      right: '<button type="button" class="btn btn-primary wr-new">＋ Bài mới</button>',
    }, essays.length ? `<div class="wr-list">${essays.map(itemHtml).join('')}</div>` : emptyHtml());

    app.querySelector('.wr-new').onclick = () => openEditor(createEssay().id);
    body.querySelectorAll('[data-sample]').forEach(b => {
      b.onclick = () => openEditor(createEssay(SAMPLE_PROMPTS[b.dataset.sample]).id, { focusText: true });
    });
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
          <span class="wr-item-meta">${chip}<span>${words} từ</span><span>${fmtDate(e.updatedAt)}</span></span>
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
        <p>Em chưa có bài viết nào. Bấm <b>＋ Bài mới</b> rồi nhập đề bài cô giao, hoặc chọn một đề dưới đây.</p>
        <div class="wr-samples">
          ${SAMPLE_PROMPTS.map((p, i) => `<button type="button" class="wr-sample" data-sample="${i}">${esc(p)}</button>`).join('')}
        </div>
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
    };
    const body = frame({
      back: leave, backLabel: '← Danh sách', title: '✏️ Bài viết',
      right: '<span class="wr-saved" aria-live="polite"></span>',
    }, `
      <div class="wr-card">
        <label class="wr-label" for="wr-prompt">📋 Yêu cầu (đề bài)</label>
        <textarea id="wr-prompt" class="wr-prompt" rows="2" maxlength="${MAX_PROMPT}"
          placeholder="Ví dụ: Viết đoạn văn 4 đến 5 câu kể về một buổi đi chơi cùng gia đình em.">${esc(essay.prompt)}</textarea>
        <div class="wr-samples wr-samples-inline" ${essay.prompt.trim() ? 'hidden' : ''}>
          ${SAMPLE_PROMPTS.map((p, i) => `<button type="button" class="wr-sample" data-sample="${i}">${esc(p)}</button>`).join('')}
        </div>

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
      ${essay.review ? '<div class="wr-card wr-fixes"></div>' : ''}`);

    const promptEl = body.querySelector('#wr-prompt');
    const textEl = body.querySelector('#wr-text');
    const savedEl = app.querySelector('.wr-saved');
    const wordsEl = body.querySelector('.wr-words');
    const countEl = body.querySelector('.wr-count');
    const limitMsg = body.querySelector('.wr-limit-msg');
    const submit = body.querySelector('.wr-submit');
    const samples = body.querySelector('.wr-samples-inline');
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
      samples.hidden = !!promptEl.value.trim();
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
    samples.querySelectorAll('[data-sample]').forEach(b => {
      b.onclick = () => { promptEl.value = SAMPLE_PROMPTS[b.dataset.sample]; promptEl.oninput(); textEl.focus(); };
    });
    body.querySelector('.wr-see-review')?.addEventListener('click', () => { flush(); showReview(id); });
    submit.onclick = () => { flush(); submitEssay(id); };

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
      const review = await requestReview({ prompt: essay.prompt.trim(), text: essay.text, grade });
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
              <span class="wr-crit-label">${label}</span>
              <span class="wr-crit-val">${rv.scores[k]}/${max}</span>
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
        <div class="wr-essay">${markedHtml(rv.text, ranges)}</div>
        <div class="wr-detail" hidden></div>
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

    const detail = body.querySelector('.wr-detail');
    function select(n) {
      const r = ranges.find(x => x.n === Number(n));
      body.querySelectorAll('.wr-mark.is-on').forEach(m => m.classList.remove('is-on'));
      const mark = body.querySelector(`.wr-essay .wr-mark[data-n="${n}"]`);
      if (!r || !mark) return;
      mark.classList.add('is-on');
      detail.hidden = false;
      detail.className = `wr-detail wr-detail-${r.issue.type}`;
      detail.innerHTML = `
        <div class="wr-detail-head"><span class="wr-fix-type wr-type-${r.issue.type}">${TYPES[r.issue.type].icon} ${TYPES[r.issue.type].label}</span>
          <s class="wr-wrong wr-wrong-${r.issue.type}">${esc(r.issue.text)}</s>
          ${r.issue.suggestions.length ? `→ ${r.issue.suggestions.map(s => `<b class="wr-sugg-chip">${esc(s)}</b>`).join(' ')}` : ''}</div>
        ${r.issue.explain ? `<p>${esc(r.issue.explain)}</p>` : ''}`;
      return mark;
    }
    body.querySelectorAll('.wr-essay .wr-mark').forEach(m => {
      m.onclick = () => select(m.dataset.n);
      m.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(m.dataset.n); } };
    });
    body.querySelectorAll('.wr-issue').forEach(b => {
      b.onclick = () => select(b.dataset.n)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    body.querySelector('.wr-edit').onclick = () => openEditor(id);
    body.querySelector('.wr-resubmit')?.addEventListener('click', () => submitEssay(id));
  }
}
