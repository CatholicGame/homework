/**
 * Hình câu hỏi (`.e3-q-img`, dùng chung cho grade3Exam.js và grade3Workbook.js), gắn một lần lúc mở app
 * bằng event delegation:
 *   • Chạm hình có hành động thực hành (↔️ Kéo dài, 📐 Ê ke, ⚖️ Thử cân…): vào thực hành luôn.
 *   • Nút "📷 Ảnh gốc" ngay dưới hình vẽ lại (chỉ bản dev).
 * Chạm hình để phóng to đã bỏ: bé chạm nhầm vào hình là mất câu hỏi đang làm.
 */
import ORIGINALS from './origImages.js';

// Hình vẽ lại (SVG) → ảnh scan gốc của sách (thư mục orig/, chỉ tải khi bé bấm "Ảnh gốc").
// ORIGINALS rỗng ở bản production (vite.config.js) nên nút "Ảnh gốc" chỉ có ở bản dev.
const SVG_URLS = import.meta.glob('../assets/grade[23]-*/*.svg', { eager: true, query: '?url', import: 'default' });
const SVG_BY_URL = new Map(Object.entries(SVG_URLS).map(([path, url]) => [url, path]));

function originalLoader(src) {
  const path = SVG_BY_URL.get(src);
  return path ? ORIGINALS[path.replace(/\/([^/]+)\.svg$/, '/orig/$1.png')] : null;
}

export function initLightbox() {
  if (document.getElementById('lightbox-styles')) return;

  const style = document.createElement('style');
  style.id = 'lightbox-styles';
  style.textContent = `
    .e3-question-card:has(> .gp-open, > .cp-open, > .gt-row, > .bal-open:not(.bal-locked), > .pour-open:not(.pour-locked)) > .e3-q-img:not([data-showing-orig="1"]) { cursor: pointer; }
    .e3-orig-toggle {
      display: block; margin: 6px auto 0; padding: 4px 12px;
      border: 1.5px solid #CBD5E1; border-radius: 999px; background: #fff; color: #334155;
      font: 700 0.8rem Quicksand, sans-serif; cursor: pointer;
    }
    .e3-orig-toggle:hover { border-color: #0EA5E9; color: #0369A1; }
    .e3-orig-toggle.is-on { background: #0EA5E9; border-color: #0EA5E9; color: #fff; }
  `;
  document.head.appendChild(style);

  document.addEventListener('click', e => {
    const toggle = e.target.closest('.e3-orig-toggle');
    if (toggle) { toggleInline(toggle); return; }
    const img = e.target.closest('.e3-q-img');
    // 👆 Chạm để đếm (engine/tapCount.js), 🖍️ tô thẳng lên hình (engine/colorPaint.js), 🔤 chạm điểm trên hình (engine/namePlay.js): hình tự xử lý chạm.
    if (!img || img.classList.contains('tc-wrap') || img.classList.contains('cp-inline') || img.classList.contains('np-inline-svg')) return;
    // Hình có hành động thực hành (↔️ Kéo dài, 📐 Ê ke, 📏 Thước, 🔢 Đếm hình, 🟦 Ô vuông, 🖍️ Tô màu, ⚖️ Thử cân, 🫗 Thử rót): chạm hình là vào thực hành luôn.
    actionButtonFor(img)?.click();
  });

  // Nút "📷 Ảnh gốc" ngay dưới mỗi hình vẽ lại trong câu hỏi (trừ hình nhỏ trong ô bảng).
  const addToggles = () => {
    document.querySelectorAll('.e3-q-img:not([data-orig-checked])').forEach(img => {
      img.dataset.origChecked = '1';
      if (img.closest('table') || !originalLoader(img.dataset.i18nSrc || img.getAttribute('src'))) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'e3-orig-toggle';
      btn.textContent = '📷 Ảnh gốc';
      img.after(btn);
    });
  };
  new MutationObserver(addToggles).observe(document.body, { childList: true, subtree: true });
  addToggles();
}

// Nút hành động ngay dưới hình câu hỏi (đã mở khoá). Đang xem "📷 Ảnh gốc" thì chạm hình không làm gì.
const ACTION_BUTTONS = '.gp-open, .cp-open, .gt-open, .np-open-img, .pm-open, .dp-open:not(.dp-locked), .bal-open:not(.bal-locked), .pour-open:not(.pour-locked)';
function actionButtonFor(img) {
  if (img.dataset.showingOrig === '1' || !img.parentElement?.classList.contains('e3-question-card')) return null;
  // .gt-open (geoTools.js) nằm trong hàng .gt-row, .np-open-img (namePlay.js) trong .gt-row hoặc .np-btnrow
  return [...img.parentElement.querySelectorAll(':scope > *, :scope > .gt-row > *, :scope > .np-btnrow > *')].find(el => el.matches(ACTION_BUTTONS)) || null;
}

async function toggleInline(btn) {
  const img = btn.previousElementSibling;
  if (!img?.classList.contains('e3-q-img')) return;
  const svgSrc = img.dataset.svgSrc || img.dataset.i18nSrc || img.getAttribute('src');
  const showOrig = img.dataset.showingOrig !== '1';
  img.dataset.svgSrc = svgSrc;
  img.src = showOrig ? await originalLoader(svgSrc)() : (img.dataset.paintedSrc || svgSrc);
  img.dataset.showingOrig = showOrig ? '1' : '';
  btn.classList.toggle('is-on', showOrig);
  btn.textContent = showOrig ? '✏️ Hình vẽ lại' : '📷 Ảnh gốc';
}
