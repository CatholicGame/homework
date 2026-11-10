/**
 * Bài đọc tiếng Anh: bấm vào một từ → bong bóng IPA + nghĩa tiếng Việt đúng ngữ cảnh bài + đọc to từ đó.
 *
 * Dữ liệu: src/data/englishReading/gloss/levelN.js, mỗi bài { words, phrases } (docs/tieng-anh/thiet-ke-bai-doc.md §6).
 * Từ nằm trong một cụm của bài ("get up", "lucky money") → bong bóng ghi nghĩa cả cụm trước, rồi nghĩa riêng của từ.
 * Dùng chung kiểu bong bóng .wh-bubble của engine/wordHint.js (global.css) và giọng đọc engine/speakEn.js.
 *
 *   const off = renderGlossText(el, lesson, gloss, { onWord })   // trả về hàm gỡ; off.sentences, off.mark(k) để đọc cả bài
 */
import { sayEn, stopEn, unlockSpeech, prefetchEn } from './speakEn.js';

const WORD_RE = /[A-Za-z]+(?:['’-][A-Za-z]+)*/g;
const keyOf = (w) => w.toLowerCase().replace(/’/g, "'");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

let styled = false;
function addStyle() {
  if (styled) return;
  styled = true;
  const s = document.createElement('style');
  s.textContent = `
.rg-text { font-size: clamp(1.1rem, 2.6vw, 1.45rem); line-height: 1.75; color: #0F172A; }
.rg-text p { margin: 0 0 0.7em; }
.rg-w { cursor: pointer; border-radius: 5px; padding: 0 1px; margin: 0 -1px; -webkit-tap-highlight-color: transparent; }
@media (hover: hover) { .rg-w:hover { background: #E0F2FE; } }
.rg-w.rg-on { background: #FDE68A; box-shadow: 0 0 0 2px #F59E0B; }
.rg-w.rg-ph { background: #FEF3C7; }
.rg-s { border-radius: 6px; transition: background .2s; }
.rg-s.rg-reading { background: #DBEAFE; box-shadow: 0 0 0 3px #DBEAFE; }
.wh-bubble .rg-form { margin-top: 2px; font-size: 0.9rem; color: #CBD5E1; }
.wh-bubble .rg-ph-head { padding-bottom: 6px; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,.18); }
.wh-bubble .rg-ph-head .wh-w { font-size: 1.05rem; }
.wh-bubble .rg-ph-head .wh-mean { font-size: 1.05rem; }
`;
  document.head.appendChild(s);
}

/** Tách text thành đoạn → câu → các mẩu chữ / từ. Trả về { html, toks, sentences } với toks[i] = { w, k }. */
function tokenize(text) {
  const toks = [], sentences = [];
  const words = (str) => {
    let out = '', last = 0;
    for (const m of str.matchAll(WORD_RE)) {
      out += esc(str.slice(last, m.index)).replace(/\n/g, '<br>');
      out += `<span class="rg-w" data-i="${toks.length}">${esc(m[0])}</span>`;
      toks.push({ w: m[0], k: keyOf(m[0]) });
      last = m.index + m[0].length;
    }
    return out + esc(str.slice(last)).replace(/\n/g, '<br>');
  };
  const paras = text.split(/\n{2,}/).map((p) => {
    const parts = p.match(/[^.!?]+(?:[.!?]+["”']?|$)\s*/g) || [p];
    return `<p>${parts.map((sen) => {
      const k = sentences.length;
      sentences.push(sen.replace(/\s+/g, ' ').trim());
      return `<span class="rg-s" data-s="${k}">${words(sen)}</span>`;
    }).join('')}</p>`;
  });
  return { html: paras.join(''), toks, sentences };
}

/** Cụm dài nhất của bài chứa từ thứ i: { a, b, key, v } hoặc null. */
function phraseAt(toks, i, phrases) {
  const list = Object.entries(phrases || {}).map(([k, v]) => [k.split(' '), k, v]).sort((x, y) => y[0].length - x[0].length);
  for (const [parts, key, v] of list) {
    for (let a = Math.max(0, i - parts.length + 1); a <= i; a++) {
      if (parts.every((p, j) => toks[a + j]?.k === p)) return { a, b: a + parts.length - 1, key, v };
    }
  }
  return null;
}

export function renderGlossText(el, lesson, gloss, { onWord } = {}) {
  addStyle();
  const { html, toks, sentences } = tokenize(lesson.text);
  el.classList.add('rg-text');
  el.innerHTML = html;
  const spans = [...el.querySelectorAll('.rg-w')];
  let bubble = null, cur = -1;
  // Giọng Azure: tải trước tiếng từng từ (hàng sau, các câu tải trước), bé chạm từ nào cũng phát ngay
  const spokenOf = (t) => { const info = gloss?.words?.[t.k] || {}; return info.name && !info.ipa ? '' : info.say || t.w; };
  const preTimer = setTimeout(() => prefetchEn([...new Set(toks.map(spokenOf).filter(Boolean))], { low: true }), 300);

  const close = () => {
    bubble?.remove(); bubble = null; cur = -1;
    spans.forEach((s) => s.classList.remove('rg-on', 'rg-ph'));
  };

  const open = (i) => {
    close();
    const t = toks[i];
    const info = gloss?.words?.[t.k] || {};
    const ph = phraseAt(toks, i, gloss?.phrases);
    if (ph) for (let j = ph.a; j <= ph.b; j++) spans[j].classList.add('rg-ph');
    spans[i].classList.add('rg-on');

    const canSay = !(info.name && !info.ipa); // tên riêng tiếng Việt: không đọc bằng giọng Anh
    const spoken = spokenOf(t); // từ đọc khác tuỳ nghĩa: read (quá khứ) → "red", used (used to) → "used to"
    const say = (txt) => `<button type="button" class="wh-say" data-say="${esc(txt)}" aria-label="Nghe">🔊</button>`;
    const phHtml = ph ? `<div class="rg-ph-head"><div class="wh-one">${say(ph.key)}<span class="wh-w" lang="en">${esc(ph.key)}</span>${ph.v.ipa ? `<span class="wh-ipa">/${esc(ph.v.ipa)}/</span>` : ''}</div><div class="wh-mean">${esc(ph.v.vi)}</div></div>` : '';
    const form = [info.base && info.base !== t.k ? `từ gốc: <b lang="en">${esc(info.base)}</b>` : '', info.form ? esc(info.form) : ''].filter(Boolean).join(' · ');
    bubble = document.createElement('div');
    bubble.className = 'wh-bubble';
    bubble.setAttribute('role', 'dialog');
    bubble.innerHTML = `<button type="button" class="wh-close" aria-label="Đóng">✕</button>${phHtml}
      <div class="wh-one">${canSay ? say(spoken) : ''}<span class="wh-w" lang="en">${esc(t.w)}</span>${info.ipa ? `<span class="wh-ipa">/${esc(info.ipa)}/</span>` : ''}</div>
      <div class="wh-mean">${esc(info.vi || '…')}</div>${form ? `<div class="rg-form">${form}</div>` : ''}`;
    document.body.appendChild(bubble);
    place(bubble, spans[i]);
    cur = i;
    bubble.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      e.stopPropagation();
      if (b.classList.contains('wh-close')) { close(); stopEn(); }
      else if (b.dataset.say) sayEn(b.dataset.say);
    });
    if (canSay) sayEn(spoken);
    onWord?.(t.k, info);
  };

  const onDown = () => unlockSpeech();
  const onClick = (e) => {
    const s = e.target.closest('.rg-w');
    if (!s || !el.contains(s)) return;
    e.stopPropagation();
    open(Number(s.dataset.i));
  };
  const onDocDown = (e) => { if (bubble && !bubble.contains(e.target) && !e.target.closest?.('.rg-w')) close(); };
  const onScroll = () => close();
  // Đổi cỡ (xoay máy, thanh địa chỉ điện thoại ẩn / hiện): dời bong bóng theo từ, không đóng.
  const onResize = () => { if (bubble && cur >= 0) place(bubble, spans[cur]); };
  el.addEventListener('pointerdown', onDown);
  el.addEventListener('click', onClick);
  document.addEventListener('pointerdown', onDocDown, true);
  addEventListener('scroll', onScroll, true);
  addEventListener('resize', onResize);
  const dispose = () => {
    clearTimeout(preTimer);
    close();
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('click', onClick);
    document.removeEventListener('pointerdown', onDocDown, true);
    removeEventListener('scroll', onScroll, true);
    removeEventListener('resize', onResize);
  };
  // Đọc cả bài: danh sách câu cho giọng đọc, mark(k) tô câu đang đọc (-1: bỏ tô).
  dispose.sentences = sentences;
  dispose.mark = (k) => el.querySelectorAll('.rg-s').forEach((x) => x.classList.toggle('rg-reading', Number(x.dataset.s) === k));
  return dispose;
}

// Đặt bong bóng trên từ (không đủ chỗ thì dưới), mũi nhọn chỉ vào giữa từ, không tràn mép màn hình.
function place(b, target) {
  const r = target.getBoundingClientRect();
  const W = innerWidth, M = 8;
  const bw = b.offsetWidth, bh = b.offsetHeight;
  const cx = r.left + r.width / 2;
  const left = Math.min(Math.max(M, cx - bw / 2), W - bw - M);
  const above = r.top - bh - 12 >= M;
  b.style.left = `${left}px`;
  b.style.top = `${above ? r.top - bh - 12 : r.bottom + 12}px`;
  b.classList.toggle('wh-below', !above);
  b.style.setProperty('--wh-tip', `${Math.min(Math.max(16, cx - left), bw - 16)}px`);
}
