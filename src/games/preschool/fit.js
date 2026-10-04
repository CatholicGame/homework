/**
 * Màn hình nằm ngang: phóng to cả vùng chơi (hình, ô, nút số…) cho lấp khoảng trống còn lại, để bé
 * (và bàn tay trước camera) chạm được vật to. Đo phần nội dung thật sự đang hiện rồi phóng đều
 * (transform: scale), căn giữa; chạm, kéo, tô và bàn tay ảo vẫn đúng vì đều lấy toạ độ trên màn hình.
 * Không thu nhỏ (nội dung đã tràn thì giữ nguyên, cuộn như cũ).
 */

const MAX_SCALE = 2.2;
const SIDE = 16; // chừa mép trái / phải (px)
const GAP = 12; // chừa trên / dưới trong vùng chơi (px)

// Không tính vào khung nội dung: gợi ý nhún nhảy, số đếm gắn ở góc đồ vật (thò ra ngoài hình),
// đàn chim đang bay (play5.js: bay ra ngoài mép cảnh).
const SKIP = '.pk-tap-hint, .pk-tap-hint *, .pk-mark, .pk5-flock, .pk5-flock *';

const landscape = () => innerWidth > innerHeight && innerWidth >= 900;

/** Gắn phóng to cho `stage`; gọi sau khi lượt chơi vẽ xong. Trả về hàm gỡ. */
export function fitStage(stage) {
  let raf = 0;
  let last = null; // { s, cx, cy, transform, origin } lần phóng trước
  const root = document.documentElement;

  const apply = () => {
    raf = 0;
    if (!stage.isConnected) return;
    stage.style.transform = '';
    root.style.setProperty('--pk-fit', '1');
    if (!landscape()) { last = null; return; }
    const box = stage.getBoundingClientRect();
    // Khung nội dung: gộp các phần tử lá đang hiện (khối bao rộng 100% không tính, chỉ phần nhìn thấy).
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    for (const el of stage.querySelectorAll('*')) {
      if (el.children.length && el.tagName !== 'svg' && el.tagName !== 'BUTTON') continue;
      if (el.matches(SKIP)) continue;
      const q = el.getBoundingClientRect();
      if (!q.width || !q.height) continue;
      l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom);
    }
    if (!(r > l && b > t)) { last = null; return; }
    const w = r - l, h = b - t;
    const availW = innerWidth - 2 * SIDE;
    const availH = box.height - 2 * GAP;
    const s = Math.min(MAX_SCALE, availW / w, availH / h);
    if (s <= 1.02) { last = null; return; }
    const cx = (l + r) / 2, cy = (t + b) / 2;
    // Nội dung chỉ đổi chút ít (bé vừa đếm, thẻ số vừa đặt vào ô): giữ nguyên cách phóng cũ để
    // cả khối không giật. Vẫn không cho tràn ra ngoài vùng chơi.
    if (last && Math.abs(s - last.s) / last.s < 0.08 && s >= last.s * 0.97
      && Math.hypot(cx - last.cx, cy - last.cy) < 24) {
      stage.style.transformOrigin = last.origin;
      stage.style.transform = last.transform;
      root.style.setProperty('--pk-fit', String(last.s));
      return;
    }
    // Đưa tâm nội dung về giữa màn hình (ngang) và giữa vùng chơi (dọc), phóng quanh tâm đó.
    const dx = innerWidth / 2 - cx, dy = box.top + box.height / 2 - cy;
    const origin = `${cx - box.left}px ${cy - box.top}px`;
    const transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    stage.style.transformOrigin = origin;
    stage.style.transform = transform;
    root.style.setProperty('--pk-fit', String(s));
    last = { s, cx, cy, origin, transform };
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };

  // Đo lại khi: đổi cỡ cửa sổ / xoay máy, vùng chơi đổi cỡ (nút ➜ hiện ra), nội dung đổi (sang
  // bước khác trong lượt), hình tải xong. Transform không đổi bố cục nên không đo lặp vô tận.
  const ro = new ResizeObserver(schedule);
  ro.observe(stage);
  const mo = new MutationObserver(schedule);
  mo.observe(stage, { childList: true, subtree: true });
  stage.addEventListener('load', schedule, true);
  addEventListener('resize', schedule);
  schedule();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    mo.disconnect();
    stage.removeEventListener('load', schedule, true);
    removeEventListener('resize', schedule);
    stage.style.transform = '';
    root.style.setProperty('--pk-fit', '1');
  };
}
