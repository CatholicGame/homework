/**
 * 🏅 Thành tích của em (Đấu Trường Nhí): danh sách mọi lần được giấy chứng nhận (awards.js), mới nhất trước, mỗi lần một thẻ
 * có ảnh thu nhỏ của tờ giấy; đầu trang đếm số lần theo hạng. Chạm một thẻ → xem dạng slide (openSlides): từng tờ to giữa màn
 * hình, mũi tên / vuốt / phím ← → để chuyển, dải ảnh nhỏ bên dưới để nhảy tới tờ bất kỳ, nút Tự chạy (5 giây một tờ) và In
 * (hộp thoại in của trình duyệt, chọn "Lưu dạng PDF" để lưu file).
 */
import { certSvg, loadCertFonts, CERT_CSS, CERT_KINDS } from './cert.js';
import { loadAwards } from './awards.js';

const ICON = { champ: '🥇', rank2: '🥈', rank3: '🥉', rank4: '🎖️', aud: '⭐' };
const ORDER = ['champ', 'rank2', 'rank3', 'rank4', 'aud'];
const pad = (n) => String(n).padStart(2, '0');
const when = (at) => { const d = new Date(at); return `${pad(d.getHours())}:${pad(d.getMinutes())}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`; };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const svgOf = (a, sign = 'done') => certSvg({ ...a, sign });

const CSS = `
${CERT_CSS}
.aw { --aw-bg: #f4f6fb; --aw-card: #fff; --aw-ink: #1c2a5c; --aw-muted: #5d6785; --aw-edge: rgba(28, 42, 92, 0.12); --aw-acc: #2f6fe0;
  min-height: 100%; background: var(--aw-bg); color: var(--aw-ink); font-family: 'Be Vietnam Pro', Nunito, system-ui, sans-serif; }
@media (prefers-color-scheme: dark) {
  .aw { --aw-bg: #0e1430; --aw-card: #182046; --aw-ink: #eef2ff; --aw-muted: #a8b2d6; --aw-edge: rgba(255, 255, 255, 0.12); --aw-acc: #7fb0ff; }
}
.aw-top { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: var(--aw-bg);
  border-bottom: 1px solid var(--aw-edge); }
.aw-top button { width: 42px; height: 42px; border-radius: 12px; border: 1px solid var(--aw-edge); background: var(--aw-card); color: inherit; font-size: 20px; cursor: pointer; }
.aw-top h2 { margin: 0; font-size: 20px; }
.aw-body { max-width: 1100px; margin: 0 auto; padding: 16px; }
.aw-sum { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.aw-sum span { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: var(--aw-card); border: 1px solid var(--aw-edge);
  font-weight: 700; font-size: 15px; }
.aw-sum span b { font-variant-numeric: tabular-nums; }
.aw-actions { display: flex; gap: 8px; margin-bottom: 16px; }
.aw-actions button { padding: 10px 16px; border-radius: 12px; border: 0; background: var(--aw-acc); color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
.aw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
.aw-item { display: grid; gap: 8px; padding: 10px; border-radius: 16px; border: 1px solid var(--aw-edge); background: var(--aw-card); color: inherit; font: inherit;
  text-align: left; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; }
.aw-item:hover, .aw-item:focus-visible { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); outline: none; }
.aw-item .dc-svg { border-radius: 8px; }
.aw-item-t { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.aw-item-t b { font-size: 16px; }
.aw-item-t span, .aw-item small { color: var(--aw-muted); font-size: 13px; }
.aw-item i { font-style: normal; font-size: 11px; font-weight: 800; padding: 1px 6px; border-radius: 6px; background: var(--aw-edge); margin-left: 6px; }
.aw-empty { display: grid; justify-items: center; gap: 10px; padding: 48px 16px; text-align: center; color: var(--aw-muted); }
.aw-empty b { font-size: 56px; }

/* Xem dạng slide */
.aw-sl { position: fixed; inset: 0; z-index: 1000; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; grid-template-columns: minmax(0, 1fr); background: #0a0f2a; color: #fff;
  font-family: 'Be Vietnam Pro', Nunito, system-ui, sans-serif; }
.aw-sl-top { display: flex; align-items: center; gap: 8px; padding: 10px 16px; }
.aw-sl-top .aw-sl-n { flex: 1; font-weight: 700; font-variant-numeric: tabular-nums; }
.aw-sl button { border: 1px solid rgba(255, 255, 255, 0.22); background: rgba(255, 255, 255, 0.08); color: #fff; font: inherit; font-weight: 700; border-radius: 12px; cursor: pointer; }
.aw-sl-top button { min-height: 42px; padding: 0 14px; }
.aw-sl-top button[aria-pressed="true"] { background: #2f6fe0; border-color: #2f6fe0; }
.aw-sl-stage { position: relative; min-height: 0; overflow: hidden; touch-action: pan-y; }
.aw-sl-track { display: flex; width: 100%; height: 100%; transition: transform 0.45s cubic-bezier(.2, .8, .2, 1); }
.aw-sl-page { flex: 0 0 100%; display: grid; place-items: center; padding: 8px 72px; box-sizing: border-box; min-height: 0; }
/* tờ giấy to hết cỡ trong ô (giữ tỉ lệ 1200 × 850): đo bằng container query */
.aw-sl-fit { container-type: size; width: 100%; height: 100%; display: grid; place-items: center; }
.aw-sl-page .dc-svg { width: min(100cqw, 100cqh * 1.4118); height: auto; box-shadow: 0 16px 50px rgba(0, 0, 0, 0.55); border-radius: 14px; }
.aw-sl-cap { text-align: center; padding: 4px 16px 0; font-size: 15px; color: #c8d2f2; }
.aw-sl-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 56px; height: 56px; font-size: 26px !important; border-radius: 50% !important; z-index: 1; }
.aw-sl-arrow[disabled] { opacity: 0.25; cursor: default; }
.aw-sl-prev { left: 10px; } .aw-sl-next { right: 10px; }
.aw-sl-strip { display: flex; gap: 8px; padding: 10px 16px 16px; overflow-x: auto; scrollbar-width: thin; }
.aw-sl-strip button { flex: 0 0 auto; width: 104px; padding: 3px; border-radius: 10px; opacity: 0.55; }
.aw-sl-strip button[aria-current="true"] { opacity: 1; border-color: #ffd45c; box-shadow: 0 0 0 2px #ffd45c; }
.aw-sl-strip .dc-svg { border-radius: 6px; }
@media (max-width: 640px) {
  .aw-sl-page { padding: 8px 12px; }
  .aw-sl-arrow { top: auto; bottom: 8px; transform: none; width: 46px; height: 46px; }
  .aw-sl-top .aw-sl-print span { display: none; }
}
@media (orientation: portrait) and (max-width: 640px) { .aw-sl-stage { padding-bottom: 56px; } }
@media (prefers-reduced-motion: reduce) { .aw-sl-track { transition-duration: 0.9s; transition-timing-function: ease; } }
`;
function ensureCss() {
  if (document.getElementById('aw-css')) return;
  const st = document.createElement('style'); st.id = 'aw-css'; st.textContent = CSS; document.head.appendChild(st);
}

/** Trang Thành tích của em. Trả hàm dọn. */
export function renderAwards(app, onBack, { title = 'Thành tích của em' } = {}) {
  ensureCss(); loadCertFonts();
  let closeSl = null;
  const paint = () => {
    const list = loadAwards();
    const count = Object.fromEntries(ORDER.map(k => [k, list.filter(a => a.kind === k).length]));
    app.innerHTML = `<div class="aw">
      <div class="aw-top"><button type="button" class="aw-back" aria-label="Quay lại">←</button><h2>🏅 ${esc(title)}</h2></div>
      <div class="aw-body">
        ${list.length ? `
          <div class="aw-sum" aria-label="Số lần theo hạng">${ORDER.filter(k => count[k]).map(k => `<span>${ICON[k]} ${CERT_KINDS[k].label} <b>${count[k]}</b></span>`).join('')}</div>
          <div class="aw-actions"><button type="button" class="aw-play">▶ Xem tất cả dạng slide</button></div>
          <div class="aw-grid">${list.map((a, i) => `<button type="button" class="aw-item" data-i="${i}" aria-label="${esc(CERT_KINDS[a.kind]?.label)}, ${a.score} điểm, ${when(a.at)}">
            ${svgOf(a)}
            <span class="aw-item-t"><b>${ICON[a.kind] || '🏅'} ${esc(CERT_KINDS[a.kind]?.label || '')}${a.demo ? '<i>thử</i>' : ''}</b><span>${a.score} điểm</span></span>
            <small>Lớp ${a.grade} · ${when(a.at)}</small>
          </button>`).join('')}</div>`
        : `<div class="aw-empty"><b>🏆</b><p>Em chưa có giấy chứng nhận nào.<br>Lên bục thi Đấu Trường Nhí hoặc trả lời đúng nhiều nhất khán phòng để nhận giấy.</p></div>`}
      </div>
    </div>`;
    app.querySelector('.aw-back').onclick = () => { closeSl?.(); onBack(); };
    app.querySelector('.aw-play')?.addEventListener('click', () => { closeSl = openSlides(list, 0, { auto: true }); });
    app.querySelector('.aw-grid')?.addEventListener('click', (e) => {
      const b = e.target.closest('.aw-item');
      if (b) closeSl = openSlides(list, +b.dataset.i, { from: b });
    });
  };
  paint();
  const onSync = () => { if (!document.querySelector('.aw-sl')) paint(); };   // tải từ tài khoản về: vẽ lại
  window.addEventListener('tth:data-changed', onSync);
  return () => { closeSl?.(); window.removeEventListener('tth:data-changed', onSync); };
}

/**
 * Xem các tờ giấy dạng slide, mở ở tờ `start`. opts.auto: tự chạy ngay; opts.from: nút để trả focus khi đóng.
 * Trả hàm đóng.
 */
export function openSlides(list, start = 0, opts = {}) {
  ensureCss(); loadCertFonts();
  if (!list.length) return () => {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = document.createElement('div');
  el.className = 'aw-sl'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Giấy chứng nhận');
  el.innerHTML = `
    <div class="aw-sl-top">
      <span class="aw-sl-n" aria-live="polite"></span>
      <button type="button" class="aw-sl-auto" aria-pressed="false">▶ Tự chạy</button>
      <button type="button" class="aw-sl-print">🖨️ <span>In / Lưu PDF</span></button>
      <button type="button" class="aw-sl-x" aria-label="Đóng">✕</button>
    </div>
    <div class="aw-sl-stage">
      <button type="button" class="aw-sl-arrow aw-sl-prev" aria-label="Tờ trước">‹</button>
      <div class="aw-sl-track">${list.map(a => `<div class="aw-sl-page"><div class="aw-sl-fit">${svgOf(a)}</div></div>`).join('')}</div>
      <button type="button" class="aw-sl-arrow aw-sl-next" aria-label="Tờ sau">›</button>
    </div>
    <div>
      <p class="aw-sl-cap"></p>
      <div class="aw-sl-strip" role="tablist" aria-label="Chọn tờ">${list.map((a, i) => `<button type="button" role="tab" data-i="${i}" aria-label="Tờ ${i + 1}: ${esc(CERT_KINDS[a.kind]?.label)}">${svgOf(a, 'none')}</button>`).join('')}</div>
    </div>`;
  document.body.appendChild(el);
  const track = el.querySelector('.aw-sl-track'), prev = el.querySelector('.aw-sl-prev'), next = el.querySelector('.aw-sl-next');
  const strip = [...el.querySelectorAll('.aw-sl-strip button')], autoBtn = el.querySelector('.aw-sl-auto');
  let i = Math.max(0, Math.min(list.length - 1, start)), timer = 0;

  function go(k, instant = false) {
    i = (k + list.length) % list.length;
    if (instant) { track.style.transition = 'none'; requestAnimationFrame(() => { track.style.transition = ''; }); }
    track.style.transform = `translateX(${-100 * i}%)`;
    const a = list[i];
    el.querySelector('.aw-sl-n').textContent = `${i + 1} / ${list.length}`;
    el.querySelector('.aw-sl-cap').textContent = `${ICON[a.kind] || '🏅'} ${CERT_KINDS[a.kind]?.label || ''} · ${a.score} điểm · ${when(a.at)}${a.demo ? ' · sân khấu thử' : ''}`;
    prev.disabled = next.disabled = list.length < 2;
    strip.forEach((b, j) => b.setAttribute('aria-current', String(j === i)));
    strip[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce || instant ? 'auto' : 'smooth' });
  }
  function setAuto(on) {
    clearInterval(timer);
    autoBtn.setAttribute('aria-pressed', String(on));
    autoBtn.textContent = on ? '⏸ Dừng' : '▶ Tự chạy';
    if (on) timer = setInterval(() => go(i + 1), reduce ? 7000 : 5000);
  }
  const user = (k) => { setAuto(false); go(k); };   // tự chuyển tay thì dừng tự chạy
  prev.onclick = () => user(i - 1);
  next.onclick = () => user(i + 1);
  autoBtn.onclick = () => setAuto(autoBtn.getAttribute('aria-pressed') !== 'true');
  el.querySelector('.aw-sl-strip').onclick = (e) => { const b = e.target.closest('[data-i]'); if (b) user(+b.dataset.i); };
  el.querySelector('.aw-sl-print').onclick = () => printCert(list[i]);

  // vuốt ngang trên tờ giấy
  const stage = el.querySelector('.aw-sl-stage');
  let sx = null, sy = 0;
  stage.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; sx = e.clientX; sy = e.clientY; });
  stage.addEventListener('pointerup', (e) => {
    if (sx == null) return;
    const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) user(i + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', () => { sx = null; });

  const onKey = (e) => {
    if (e.key === 'ArrowRight') user(i + 1);
    else if (e.key === 'ArrowLeft') user(i - 1);
    else if (e.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);
  function close() {
    setAuto(false);
    document.removeEventListener('keydown', onKey);
    el.remove();
    opts.from?.focus?.();
  }
  el.querySelector('.aw-sl-x').onclick = close;
  go(i, true);
  if (opts.auto) setAuto(true);
  el.querySelector('.aw-sl-x').focus();
  return close;
}

/** In một tờ (khổ A4 ngang) qua khung ẩn: hộp thoại in của trình duyệt, chọn "Lưu dạng PDF" để lưu file. */
export function printCert(a) {
  const f = document.createElement('iframe');
  Object.assign(f.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0' });
  document.body.appendChild(f);
  const fonts = document.querySelector('link[data-cheque-fonts]')?.href || '';
  f.srcdoc = `<!doctype html><html><head><meta charset="utf-8">${fonts ? `<link rel="stylesheet" href="${fonts}">` : ''}
    <style>@page { size: A4 landscape; margin: 8mm; } html, body { margin: 0; } svg { width: 100%; height: auto; display: block; }</style></head>
    <body>${svgOf(a)}</body></html>`;
  f.onload = async () => {
    try { await f.contentDocument.fonts?.ready; } catch { /* in luôn */ }
    f.contentWindow.focus(); f.contentWindow.print();
    setTimeout(() => f.remove(), 60000);
  };
}
