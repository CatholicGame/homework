/**
 * Hướng màn hình trên điện thoại (người dùng 2026-11-06): vào Gặp gỡ online (nhà thờ, Vatican, trường quay) là xoay ngang,
 * về trang chủ là xoay dọc ngay; xem phim thì để máy tự xoay (chế độ phim cần màn hình ngang), đóng phim về trang chủ lại dọc.
 *  - landscapeOn(): xin toàn màn hình (trình duyệt chỉ cho khoá hướng khi toàn màn hình, trừ app đã cài) rồi khoá ngang.
 *    Gọi ngay trong lúc chạm (cử chỉ của người dùng), không thì trình duyệt từ chối toàn màn hình.
 *  - landscapeOff(): rời nơi ấy: khoá dọc. App đã cài giữ khoá dọc; tab trình duyệt khoá dọc rồi mới thoát toàn màn hình
 *    (thoát là mất khoá: máy bật xoay tự động mà đang cầm ngang thì trình duyệt xoay lại theo cách cầm, web không chặn được).
 *  - rotateFree() / portraitOn(): trình phim gọi lúc mở / đóng phim (bỏ qua khi đang ở Gặp gỡ online: phim nổi trên nhà thờ).
 * iPhone (Safari) không có khoá hướng: không làm gì, người xem tự xoay máy.
 */
let entered = false;   // toàn màn hình do landscapeOn bật (thoát thì tắt)
let mode = '';         // 'land': đang khoá ngang cho Gặp gỡ online; 'port': khoá dọc; '': tự xoay

const phone = () => matchMedia('(pointer: coarse)').matches;
const standalone = () => matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches;
const canLock = () => phone() && !!screen.orientation?.lock;
const lockTo = (o) => screen.orientation.lock(o).then(() => true, () => false);

export function landscapeOn() {
  if (!canLock() || mode === 'land') return;
  mode = 'land';
  const lock = () => lockTo('landscape').then(ok => { if (!ok && mode === 'land') mode = ''; });
  if (document.fullscreenElement) { lock(); return; }
  const el = document.documentElement;
  // app đã cài vẫn còn thanh trạng thái: cũng xin toàn màn hình; bị từ chối thì vẫn khoá ngang được (standalone)
  if (!el.requestFullscreen) { if (standalone()) lock(); else mode = ''; return; }
  el.requestFullscreen({ navigationUI: 'hide' }).then(() => { entered = true; lock(); }, () => { if (standalone()) lock(); else mode = ''; });
}

export function landscapeOff() {
  if (mode !== 'land') { entered = false; return; }
  mode = '';
  const leave = () => {
    if (entered && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    entered = false;
  };
  if (!canLock()) { leave(); return; }
  // khoá dọc trước (đang toàn màn hình nên được phép), đợi máy xoay xong mới thoát toàn màn hình
  lockTo('portrait').then(ok => {
    if (ok) mode = 'port';
    if (!entered) return;
    setTimeout(() => { leave(); if (!standalone() && mode === 'port') mode = ''; }, ok ? 700 : 0);
  });
}

/** Mở phim: để máy tự xoay (chế độ phim cần ngang). Đang ở Gặp gỡ online thì giữ khoá ngang. */
export function rotateFree() {
  if (mode !== 'port') return;
  try { screen.orientation.unlock(); } catch { /* chưa khoá */ }
  mode = '';
}

/** Đóng phim về trang chủ: khoá dọc (chỉ được khi app đã cài hoặc còn toàn màn hình). */
export function portraitOn() {
  if (!canLock() || mode || (!standalone() && !document.fullscreenElement)) return;
  lockTo('portrait').then(ok => { if (ok && !mode) mode = 'port'; });
}

// người xem tự thoát toàn màn hình (nút Back của Android): trình duyệt bỏ luôn khoá hướng
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) return;
  entered = false;
  if (!standalone()) mode = '';
});
