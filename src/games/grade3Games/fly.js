/**
 * Đồ vật bay theo đường cong — dùng chung cho mọi quầy Chợ phiên (trứng khay → hộp, quả sạp ↔ đĩa cân,
 * quả cân khay ↔ đĩa cân). Chuyển động là một phần bài học (bé thấy đồ chuyển từ chỗ này sang chỗ kia),
 * nên luôn chạy — kể cả khi máy bật "giảm chuyển động" (Windows tắt Animation effects cũng báo như vậy):
 * khi đó bay êm, không xoay, không phồng lên.
 */

export const calmMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * Bay một bản sao `html` (thường là một <svg> vừa khít khung) từ khung `from` tới khung `to` (toạ độ màn
 * hình, như getBoundingClientRect) theo đường Bézier bậc hai vòng lên. Thời gian bay minMs–maxMs tuỳ
 * quãng đường. onLand() gọi khi tới nơi. Trả về số ms (kể cả delay) tới lúc đáp.
 */
export function flyOne(html, from, to, { delay = 0, minMs = 450, maxMs = 900, spin = 0, className = '', onLand } = {}) {
  if (!from?.width || !to?.width) { onLand?.(); return 0; }
  const calm = calmMotion();
  const el = document.createElement('div');
  el.className = `g3-fly ${className}`;
  el.innerHTML = html;
  Object.assign(el.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` });
  document.body.appendChild(el);
  // Tính theo tâm (transform-origin giữa khung) để phóng to / xoay không làm lệch điểm đáp.
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const sc = to.width / from.width;
  const dist = Math.hypot(dx, dy);
  const lift = Math.min(180, 50 + dist * 0.3);
  const cx = dx * 0.5, cy = Math.min(0, dy) - lift; // điểm điều khiển: giữa đường, nhô cao lên
  const turn = calm ? 0 : spin;
  const frames = [];
  const STEPS = 24;
  for (let f = 0; f <= STEPS; f++) {
    const t = ease(f / STEPS), u = 1 - t;
    const x = 2 * u * t * cx + t * t * dx, y = 2 * u * t * cy + t * t * dy;
    const s = (1 + (sc - 1) * t) * (calm ? 1 : 1 + 0.14 * Math.sin(Math.PI * t));
    frames.push({ offset: f / STEPS, transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${(turn * Math.sin(Math.PI * t)).toFixed(1)}deg) scale(${s.toFixed(3)})` });
  }
  const dur = Math.round(Math.max(minMs, Math.min(maxMs, minMs + dist * 0.9)));
  const anim = el.animate(frames, { duration: dur, delay, easing: 'linear', fill: 'both' });
  anim.finished.then(() => { el.remove(); onLand?.(); }, () => el.remove());
  return delay + dur;
}

/**
 * Khung màn hình của hình chữ nhật (x, y, w, h) tính theo toạ độ riêng của phần tử SVG `el`
 * (đã gồm mọi transform cha — dùng cho đồ nằm trên đĩa cân). Không có xoay (đĩa cân luôn nằm ngang).
 */
export function svgBoxOnScreen(el, x, y, w, h) {
  const m = el?.getScreenCTM?.();
  if (!m) return null;
  return { left: m.a * x + m.c * y + m.e, top: m.b * x + m.d * y + m.f, width: w * m.a, height: h * m.d };
}
