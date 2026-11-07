/**
 * Hàng chip cuộn ngang (nhóm của Vật phẩm, ô đồ của Tủ đồ): lăn chuột dọc thì cuộn ngang, kéo bằng chuột cũng cuộn (một cú
 * kéo thật thì không tính là bấm chip), mép còn nội dung thì mờ dần (class is-l / is-r), chip đang chọn luôn được cuộn vào tầm nhìn.
 * Ngón tay vuốt ngang tự nhiên (touch-action: pan-x pan-y trong church.css).
 */
export function hScroll(el) {
  if (el.dataset.hs) return;
  el.dataset.hs = '1';
  const edges = () => {
    el.classList.toggle('is-l', el.scrollLeft > 2);
    el.classList.toggle('is-r', el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };
  el.addEventListener('scroll', edges, { passive: true });
  el.addEventListener('wheel', (e) => {
    if (el.scrollWidth <= el.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, { passive: false });
  let drag = null;
  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button) return;
    drag = { id: e.pointerId, x: e.clientX, left: el.scrollLeft, moved: false };
  });
  el.addEventListener('pointermove', (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 5) {
      drag.moved = true;
      try { el.setPointerCapture(e.pointerId); } catch { /* đã nhả */ }   // chỉ bắt khi kéo thật, kẻo chip không nhận được cú bấm
    }
    if (drag.moved) el.scrollLeft = drag.left - dx;
  });
  const end = () => {
    if (drag?.moved) el.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); }, { capture: true, once: true });
    drag = null;
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', () => { drag = null; });
  requestAnimationFrame(edges);
  return { edges, show() { el.querySelector('.is-on, [aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' }); edges(); } };
}
