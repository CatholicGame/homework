/**
 * Đồ nghề vẽ tranh minh hoạ cho Bài tập cuối tuần Tiếng Việt 3 (tiengViet3/pics/*.js).
 * Phong cách: màu phẳng tươi, hình đơn giản, không dùng hình của sách / trang web.
 * Mỗi tranh là một hàm trả về chuỗi <svg viewBox="0 0 W H"> (khung ngang, vd. 200×140 hoặc 320×180).
 */

export const SKIN = '#F8D3B0';
export const HAIR = '#3F2A1D';

/** Một bạn nhỏ đơn giản: đầu, tóc, áo, quần; tay chân theo dáng. */
export function kid(x, y, { shirt = '#3B82F6', pants = '#1E3A8A', girl = false, arms = 'down', legs = 'stand', s = 1 } = {}) {
  const armPath = {
    down: 'M-9 4 L-14 20 M9 4 L14 20',
    up: 'M-9 4 L-16 -12 M9 4 L16 -12',
    side: 'M-9 4 L-24 6 M9 4 L24 6',
    hold: 'M-9 4 L-4 18 M9 4 L4 18',
  }[arms];
  const legPath = {
    stand: 'M-5 30 L-6 50 M5 30 L6 50',
    run: 'M-5 30 L-14 48 M5 30 L12 46',
    jump: 'M-5 30 L-10 44 M5 30 L10 44',
    sit: 'M-5 30 L10 32 L10 48 M5 30 L18 32 L18 48',
  }[legs];
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="${legPath}" stroke="${pants}" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="${armPath}" stroke="${SKIN}" stroke-width="5" stroke-linecap="round" fill="none"/>
    <rect x="-10" y="0" width="20" height="${girl ? 34 : 30}" rx="7" fill="${shirt}"/>
    <circle cx="0" cy="-10" r="11" fill="${SKIN}"/>
    <path d="M-11 -12 Q0 -26 11 -12 Q8 -18 0 -19 Q-8 -18 -11 -12Z" fill="${HAIR}"/>
    ${girl ? `<path d="M-11 -12 Q-15 0 -10 6 M11 -12 Q15 0 10 6" stroke="${HAIR}" stroke-width="4" fill="none" stroke-linecap="round"/>` : ''}
    <circle cx="-4" cy="-10" r="1.4" fill="#1E293B"/><circle cx="4" cy="-10" r="1.4" fill="#1E293B"/>
    <path d="M-3 -5 Q0 -3 3 -5" stroke="#9A3412" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  </g>`;
}

