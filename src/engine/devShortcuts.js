/**
 * Phím tắt thử nghiệm — CHỈ nạp ở bản dev (`npm run dev`), không có trong bản build.
 *
 *   Ctrl+Alt+1  +1 bài giải đúng (đủ số bài sẽ hiện thông báo lượt quay)
 *   Ctrl+Alt+5  +1 lượt quay sticker
 *   Ctrl+Alt+0  Xoá hết lượt quay và sticker
 *   Ctrl+Alt+G  Đổi vòng quay bạn trai ⇄ bạn gái (chỉ trong tab này)
 *   Ctrl+Alt+S  Mở trang sticker
 *   Ctrl+Alt+H  Hiện danh sách phím tắt
 */

import { devAddSpins, devReset, recordSolveForSpin, showSpinToast, getGender, getSpinStatus } from './stickers.js';

const HELP = [
  ['Ctrl+Alt+1', '+1 bài giải đúng'],
  ['Ctrl+Alt+5', '+1 lượt quay sticker'],
  ['Ctrl+Alt+0', 'Xoá lượt quay và sticker'],
  ['Ctrl+Alt+G', 'Đổi vòng bạn trai ⇄ bạn gái'],
  ['Ctrl+Alt+S', 'Mở trang sticker'],
  ['Ctrl+Alt+H', 'Danh sách phím tắt'],
];

function toast(html, ms = 2200) {
  document.querySelector('.dev-toast')?.remove();
  const el = document.createElement('div');
  el.className = 'dev-toast';
  el.innerHTML = html;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), ms);
}

const status = () => {
  const { spins, progress, need } = getSpinStatus();
  return `lượt quay: <b>${spins}</b> · tiến độ: <b>${progress}/${need}</b>`;
};

/**
 * `refresh()` vẽ lại màn đang mở nếu đó là trang chủ hoặc trang sticker
 * (không làm mất bài đang làm dở).
 */
export function initDevShortcuts({ navigate, refresh }) {
  document.addEventListener('keydown', (e) => {
    if (!e.ctrlKey || !e.altKey || e.shiftKey || e.metaKey) return;
    let msg;
    switch (e.code) {
      case 'Digit1':
        if (recordSolveForSpin()) setTimeout(showSpinToast, 300);
        msg = `+1 bài · ${status()}`;
        break;
      case 'Digit5':
        devAddSpins(1);
        msg = `+1 lượt quay · ${status()}`;
        break;
      case 'Digit0':
        devReset();
        msg = 'Đã xoá lượt quay và sticker';
        break;
      case 'KeyG': {
        const next = getGender() === 'boy' ? 'girl' : 'boy';
        sessionStorage.setItem('tth_dev_gender', next);
        msg = `Vòng quay: ${next === 'girl' ? 'bạn gái' : 'bạn trai'}`;
        break;
      }
      case 'KeyS':
        e.preventDefault();
        navigate('stickers');
        return;
      case 'KeyH':
        toast(`<b>🛠️ Phím tắt dev</b>${HELP.map(([k, t]) => `<div><kbd>${k}</kbd> ${t}</div>`).join('')}`, 6000);
        e.preventDefault();
        return;
      default:
        return;
    }
    e.preventDefault();
    toast(`🛠️ ${msg}`);
    refresh();
  });

  const style = document.createElement('style');
  style.textContent = `
    .dev-toast { position: fixed; left: 12px; bottom: 12px; z-index: 5000; padding: 10px 14px;
      border-radius: 10px; background: #1E293B; color: #F8FAFC; font: 600 13px/1.6 system-ui, sans-serif;
      box-shadow: 0 6px 20px rgba(0,0,0,.3); pointer-events: none; }
    .dev-toast kbd { display: inline-block; min-width: 92px; color: #FDE68A; font-family: ui-monospace, monospace; }
  `;
  document.head.appendChild(style);
  console.info('[dev] Phím tắt sticker: Ctrl+Alt+H để xem danh sách');
}
