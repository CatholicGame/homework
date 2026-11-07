/**
 * Sao bay khi nhận (thẻ kết quả ghế nóng, ladder.js): các ngôi sao toả ra từ chỗ nhận rồi bay lên góc trên phải, nhãn "+n" nổi lên,
 * cuối cùng hiện thẻ sao của homework (stars.js showStarToast). Chuyển động nhẹ: chỉ hiện thẻ sao.
 */
import { showStarToast } from '../../engine/stars.js';

export const GRAIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" fill="currentColor"/></svg>';
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function collect(gain, from = null) {
  if (!(gain > 0)) return;
  if (calm()) { showStarToast(gain); return; }
  const fx = from?.x ?? innerWidth / 2, fy = from?.y ?? innerHeight * 0.6, tx = innerWidth - 40, ty = 34;
  const layer = document.createElement('div');
  layer.className = 'sd-fly';
  document.body.appendChild(layer);
  const tag = document.createElement('b');
  tag.className = 'sd-plus';
  tag.textContent = `+${gain} ⭐`;
  tag.style.left = `${fx}px`; tag.style.top = `${fy}px`;
  layer.appendChild(tag);
  const n = Math.max(5, Math.min(20, Math.round(4 + Math.sqrt(gain) * 3)));
  let last = 0;
  for (let i = 0; i < n; i++) {
    const g = document.createElement('i');
    g.innerHTML = GRAIN;
    layer.appendChild(g);
    const a = Math.random() * Math.PI * 2, burst = 30 + Math.random() * 60;
    const bx = fx + Math.cos(a) * burst, by = fy + Math.sin(a) * burst * 0.7 - 20;
    const delay = 100 + i * (420 / n), spin = (Math.random() - 0.5) * 540;
    const an = g.animate([
      { transform: `translate(${fx}px, ${fy}px) scale(.3)`, opacity: 0 },
      { transform: `translate(${bx}px, ${by}px) scale(1.2) rotate(${spin * 0.3}deg)`, opacity: 1, offset: 0.3 },
      { transform: `translate(${tx}px, ${ty}px) scale(.5) rotate(${spin}deg)`, opacity: 0.3 },
    ], { duration: 1000, delay, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'both' });
    an.onfinish = () => g.remove();
    last = Math.max(last, delay + 1000);
  }
  setTimeout(() => { layer.remove(); showStarToast(gain); }, last + 60);
}
