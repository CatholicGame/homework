/**
 * Tranh của 29 thẻ chữ cái, vẽ riêng (không lấy hình của sách). Khoá = `pic` trong cards.js.
 * Mỗi hình chia thành các phần cử động (g.p-…) và có một động tác riêng (CSS của từng tệp art*.js):
 * động tác chạy một lần khi khối cha có class `is-play` — playArt() thêm lại class để chạy lại.
 */
import * as A1 from './art1.js';
import * as A2 from './art2.js';
import * as A3 from './art3.js';
import * as A4 from './art4.js';
import * as A5 from './art5.js';
import * as A6 from './art6.js';

const FILES = [A1, A2, A3, A4, A5, A6];
export const ART = Object.assign({}, ...FILES.map(f => f.ART));

/** Gắn CSS động tác của các hình (một lần). */
export function injectArtCss() {
  if (document.getElementById('pk6-art-css')) return;
  const st = document.createElement('style');
  st.id = 'pk6-art-css';
  st.textContent = FILES.map(f => f.CSS || '').join('\n');
  document.head.appendChild(st);
}

/** Cho hình trong `el` làm động tác của nó (chạy lại từ đầu nếu đang chạy). */
export function playArt(el) {
  if (!el) return;
  el.classList.remove('is-play');
  void el.getBoundingClientRect();
  el.classList.add('is-play');
}
