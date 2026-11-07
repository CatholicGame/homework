/**
 * 🎤 Ai tài năng nhất? (lớp 1–5): đấu trường toán học kiểu game show trong trường quay 3D, chép từ "Ai là môn đệ thông thái?" của
 * kinh-thanh (E:\ManC\kinh-thanh, src/church + realtime). Bộ máy 3D ở src/thanDong/ (world.js, studio.js, Tủ đồ, Vật phẩm, MC,
 * chơi nhiều người qua máy chủ phòng realtime/), bộ câu hỏi toán theo lớp ở src/thanDong/quiz/bank, thưởng SAO vào sổ sao chung.
 *
 * Trang này là sảnh: ảnh trường quay, ba bước chơi bằng hình, nút "Vào trường quay". Bấm nút (cử chỉ của người dùng) thì điện thoại
 * xin toàn màn hình + xoay ngang, rồi mới tải three.js và trường quay. Rời trường quay: xoay dọc, về trang trước.
 * Có máy chủ phòng (VITE_ROOMS_URL lúc build): các bạn cùng lớp vào chung phòng `studio-g<lớp>`, đủ người thì ván bắt đầu.
 * Chưa có: chơi một mình với thầy MC (quizDev solo).
 */
import '../thanDong/thanDong.css';
import { landscapeOn, landscapeOff } from '../thanDong/engine/landscape.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Nunito:wght@500;600;700;800;900&display=swap';
const ONLINE = !!(import.meta.env.VITE_ROOMS_URL || import.meta.env.DEV);
const TAGS = {
  1: 'Cộng trừ phạm vi 100, hình, giờ',
  2: 'Có nhớ, bảng nhân chia 2 và 5, đơn vị đo',
  3: 'Bảng nhân chia, chu vi diện tích, số La Mã',
  4: 'Số lớn, phân số, trung bình cộng, góc',
  5: 'Số thập phân, phần trăm, vận tốc, thể tích',
};

export function thanDongRender(grade) {
  return (app, onBack) => {
    let dispose = null, gone = false, entered = false;
    const cleanup = () => {
      gone = true;
      try { dispose?.(); } catch (e) { console.warn('[thandong] dispose', e); }
      dispose = null;
      if (entered) landscapeOff();
      entered = false;
    };
    const leave = () => { cleanup(); onBack(); };

    // giao diện theo bản mặc định "Tươi sáng" của kinh-thanh (thẻ chỗ trong mục Gặp gỡ online: pages/church.js .chs-card)
    if (!document.querySelector(`link[href="${FONTS}"]`)) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${FONTS}">`);
    app.innerHTML = `<div class="td-lobby">
      <div class="td-top"><button type="button" class="td-back" aria-label="Quay lại">←</button><span class="td-kick">🎤 Toán ${grade}</span></div>
      <article class="td-card" aria-labelledby="td-title">
        <button type="button" class="td-pic-btn" tabindex="-1" aria-hidden="true"><img class="td-pic" src="/thandong/cover-studio.jpg" alt="" width="1600" height="900"></button>
        <div class="td-text">
          <h2 id="td-title">Ai tài năng nhất?</h2>
          <p>Lên ghế nóng trả lời 15 câu toán từ dễ tới khó cùng thầy MC. Các bạn trong khán phòng cũng trả lời từng câu.</p>
          <ul class="td-steps">
            <li><span>🪑</span>Chọn ghế trong khán phòng</li>
            <li><span>🙋</span>${ONLINE ? 'Đăng ký chơi, tới lượt thì lên ghế nóng' : 'Lên ghế nóng, thầy MC hỏi 15 câu'}</li>
            <li><span>⭐</span>Đúng nhiều nhận tới 30 sao, giấy khen từ câu 10</li>
            <li><span>👕</span>Đổi sao lấy trang phục, đôi cánh, thú cưng</li>
          </ul>
          <p class="td-note">Toán ${grade}: ${TAGS[grade] || ''}</p>
          <button type="button" class="td-go">Bước vào</button>
        </div>
      </article>
    </div>`;
    app.querySelector('.td-back').onclick = leave;
    const enter = async (e) => {
      const go = app.querySelector('.td-go');
      if (go.disabled) return;
      go.disabled = true;
      go.textContent = 'Đang bật đèn…';
      entered = true;
      landscapeOn();   // ngay trong lúc chạm (trước mọi await): trình duyệt mới cho toàn màn hình
      const { renderChurch } = await import('../thanDong/church/world.js');
      if (gone) return;
      app.innerHTML = '';
      dispose = renderChurch(app, { onBack: leave, place: 'studio', grade });
    };
    app.querySelector('.td-go').onclick = enter;
    app.querySelector('.td-pic-btn').onclick = enter;
    return cleanup;
  };
}
