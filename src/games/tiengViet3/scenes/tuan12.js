// Phim truyện "Cha sẽ luôn ở bên con" (theo Mark V. Hansen), Tuần 12 Tiếng Việt 3: 6 cảnh, đọc từng câu.
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: người cha (bo), cậu con trai (conTrai), người đến giúp (hangXom, khach, baoVe, linhLe), các bạn nhỏ.
// Động đất vẽ nhẹ nhàng cho bé: nhà nghiêng nứt, bụi bay, đống gạch vỡ; mọi người đều an toàn.
import { person, headOnly } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, moon, stars, heart, sparkles, speech, thought, word, soundWaves, LINE } from '../sceneKit.js';

/** Nhà cao tầng: đứng thẳng, hoặc nghiêng nứt (tilt độ). */
function building(x, y, w, h, c, tilt = 0) {
  const win = Array.from({ length: Math.floor((h - 16) / 22) }, (_, r) => Array.from({ length: Math.floor((w - 8) / 16) }, (_, k) =>
    `<rect x="${x + 8 + k * 16}" y="${y - h + 10 + r * 22}" width="9" height="12" fill="${tilt ? '#94A3B8' : '#E0F2FE'}"/>`).join('')).join('');
  const crack = tilt ? `<path d="M${x + w * 0.3} ${y - h} l8 ${h * 0.25} l-10 ${h * 0.2} l12 ${h * 0.2}" stroke="#44403C" stroke-width="2" fill="none"/>` : '';
  return `<g transform="rotate(${tilt} ${x + w / 2} ${y})"><rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" stroke="${LINE}" stroke-width="0.9"/>${win}${crack}</g>`;
}

/** Hàng nhà phía sau: thẳng (trước động đất) hoặc nghiêng đổ. */
const city = (y, broken) => [[66, 50, 110, '#CBD5E1', -7], [122, 44, 80, '#E2E8F0', 5], [176, 56, 126, '#D6D3D1', -4], [244, 46, 92, '#CBD5E1', 8], [300, 60, 118, '#E2E8F0', -6], [370, 52, 96, '#D6D3D1', 6]]
  .map(([x, w, h, c, t]) => broken ? building(x, y + 6, w, h * 0.72, c, t) : building(x, y, w, h, c)).join('');

/** Bụi bay nhẹ. */
const dust = (list) => list.map(([x, y, r], i) => `<g class="sc-drift" style="--d:${i * 1.3}s"><circle cx="${x}" cy="${y}" r="${r}" fill="#E7E5E4" opacity="0.75"/><circle cx="${x + r * 0.8}" cy="${y + 4}" r="${r * 0.7}" fill="#D6D3D1" opacity="0.7"/></g>`).join('');

/** Vạch rung (mặt đất rung). */
const shake = (x, y) => [0, 1].map(i => `<path class="sc-walk" style="--d:${i * 0.3}s" d="M${x - 10 - i * 8} ${y - 14 - i * 8} q-6 8 0 16 M${x + 10 + i * 8} ${y - 14 - i * 8} q6 8 0 16" stroke="#78716C" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('');

/** Đống đổ nát của ngôi trường (x giữa, y chân), mảng mái đỏ, mảng tường, gạch. */
const rubble = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-90 0 Q-70 -40 -30 -52 Q0 -64 30 -50 Q72 -40 90 0Z" fill="#A8A29E" stroke="${LINE}" stroke-width="1"/>
  <path d="M-60 -28 L-20 -60 L4 -54 L-30 -22Z" fill="#DC2626" stroke="${LINE}" stroke-width="1"/>
  <path d="M10 -40 L62 -54 L70 -26 L18 -18Z" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/><rect x="30" y="-46" width="14" height="12" fill="#7DD3FC" stroke="#fff" stroke-width="2" transform="rotate(-14 37 -40)"/>
  <path d="M-80 -6 L-50 -20 L-40 -4Z M40 -10 L74 -16 L78 -2Z M-20 -14 L8 -24 L14 -6Z" fill="#78716C"/>
  ${[[-70, -12], [-36, -8], [-6, -30], [52, -8], [24, -4], [66, -34]].map(([a, b], i) => `<rect x="${a}" y="${b}" width="12" height="6" rx="1" fill="${i % 2 ? '#C2410C' : '#EA580C'}" stroke="${LINE}" stroke-width="0.6" transform="rotate(${i * 23 - 30} ${a + 6} ${b + 3})"/>`).join('')}
  <path d="M-10 -56 l-6 -16 M-4 -58 l2 -14" stroke="#57534E" stroke-width="1.6"/></g>`;

/** Mảng tường lớn dựng nghiêng tạo khoảng trống nhỏ (x giữa, y chân); kids: thấy các bạn trong khoảng trống. */
const gap = (x, y, kids = false) => `<g>
  <path d="M${x - 44} ${y} L${x - 10} ${y - 54} L${x + 40} ${y}Z" fill="#292524"/>
  ${kids ? `<g transform="translate(${x - 18} ${y - 18})">${headOnly('minh', { s: 0.62, mood: 'wow' })}</g><g transform="translate(${x + 6} ${y - 14})">${headOnly('linh', { s: 0.6, mood: 'wow' })}</g>
    <g transform="translate(${x - 2} ${y - 30})">${headOnly('conTrai', { s: 0.62, mood: 'joy' })}</g>` : ''}
  <path d="M${x - 50} ${y + 2} L${x - 12} ${y - 62} L${x - 2} ${y - 56} L${x - 38} ${y + 4}Z" fill="#A8A29E" stroke="${LINE}" stroke-width="1"/></g>`;

/** Phông chung: trời, thành phố đổ, đất. */
const ruins = (id, top, bottom) => `${sky(id, top, bottom)}
  ${city(196, true)}
  <rect y="196" width="${W}" height="${H - 196}" fill="#D6C3A5"/>
  ${[[100, 230], [180, 260], [360, 236], [300, 280]].map(([a, b]) => `<path d="M${a} ${b} l10 4 l-4 8 l12 4" stroke="#A8906F" stroke-width="1.6" fill="none"/>`).join('')}`;

export default {
  sentences: true,
  groups: [[0, 1, 2, 3], [4, 5, 6], [7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17], [18, 19, 20], [21, 22, 23]],
  scenes: [
    // Cảnh 1: động đất lớn, bốn phút san bằng thành phố; người cha chạy vội đến trường; trường chỉ còn đống đổ nát
    () => svg('Động đất, người cha chạy vội đến trường của con', `
      ${sky('t12s1sky', '#CBD5E1', '#F1F5F9')}
      ${cloud(140, 40, 0.7, 0, '#E2E8F0')}${cloud(330, 30, 0.6, 2, '#E2E8F0')}
      ${at(1, city(196, false), { off: 2 })}
      ${at(2, city(196, true))}
      <rect y="196" width="${W}" height="${H - 196}" fill="#D6C3A5"/>
      ${at(1, `${shake(150, 260)}${shake(330, 250)}<path d="M120 220 l14 10 l-6 12 l16 8 M300 230 l-10 10 l12 6" stroke="#8B7355" stroke-width="2" fill="none"/>`)}
      ${at(2, dust([[100, 150, 16], [300, 132, 18], [380, 160, 16], [140, 190, 12]]))}
      ${at(2, rubble(330, 262, 0.9))}
      ${at(3, person(170, 272, 'bo', 'run', { s: 0.86 }), { off: 4 })}
      ${at(4, person(206, 272, 'bo', 'stand', { s: 0.86, mood: 'wow' }))}
      ${at(4, word('!', 26, '#DC2626', 230, 90))}`),

    // Cảnh 2: ông nhớ lời hứa "Dù có chuyện gì xảy ra, cha cũng sẽ luôn ở bên con"; ông tìm chỗ lớp học của con và ra sức đào bới
    () => svg('Người cha nhớ lời hứa với con rồi ra sức đào bới', `
      ${ruins('t12s2sky', '#CBD5E1', '#F1F5F9')}
      ${dust([[120, 170, 14], [360, 160, 16]])}
      ${rubble(306, 274, 1.1)}
      ${at(1, person(178, 274, 'bo', 'clap', { s: 0.88, mood: 'sad' }), { off: 3 })}
      ${at(1, thought(150, 70, 150, 86, 160, 126, `
        <g transform="translate(-40 34)">${person(0, 0, 'bo', 'clap', { s: 0.4, mood: 'joy' })}</g>
        <g transform="translate(-18 34)">${person(0, 0, 'conTrai', 'cheer', { s: 0.45, flip: true, mood: 'joy' })}</g>
        <g data-l="2">${heart(30, -6, 2, '#F43F5E', 0)}${heart(54, 16, 1.2, '#FB7185', 0.6)}</g>`), { off: 3 })}
      ${at(3, `${person(234, 278, 'bo', 'dig', { s: 0.88 })}${dust([[272, 230, 10], [214, 236, 8]])}`)}`),

    // Cảnh 3: mọi người kéo ông ra, an ủi "Muộn quá rồi!"; ông chỉ hỏi "Bác có giúp tôi không?" rồi tiếp tục đào; nhiều người đào cùng ông
    () => svg('Mọi người cùng đào bới với người cha', `
      ${ruins('t12s3sky', '#CBD5E1', '#F1F5F9')}
      ${rubble(250, 236, 1.2)}
      ${at(1, person(240, 278, 'bo', 'dig', { s: 0.88 }), { off: 4 })}
      ${at(4, person(240, 278, 'bo', 'give', { s: 0.88, flip: true, mood: 'sad' }), { talk: '4,5', off: 6 })}
      ${at(6, person(240, 278, 'bo', 'dig', { s: 0.88 }))}
      ${at(1, person(136, 280, 'hangXom', 'point', { s: 0.82 }), { talk: '2,3', off: 6 })}
      ${at(1, person(344, 280, 'khach', 'point', { s: 0.8, flip: true }), { talk: '2,3', off: 6 })}
      ${at(2, speech(156, 84, 50, 40, 140, 140, word('!', 24, '#475569')), { off: 4 })}
      ${at(2, speech(330, 84, 50, 40, 344, 140, word('!', 24, '#475569')), { off: 4 })}
      ${at(4, speech(226, 74, 96, 50, 236, 130, `<g transform="translate(-22 0)"><path d="M-10 6 Q-12 -8 0 -10 Q12 -8 10 6Z" fill="#FADCC4" stroke="${LINE}" stroke-width="1"/></g>${word('?', 26, '#2563EB', 20, 0)}`), { off: 6 })}
      ${at(6, `${person(120, 280, 'hangXom', 'dig', { s: 0.82, prop: 'shovel' })}${person(362, 280, 'khach', 'dig', { s: 0.8, flip: true })}
        ${person(304, 282, 'baoVe', 'dig', { s: 0.78, prop: 'shovel', flip: true })}${person(184, 282, 'linhLe', 'dig', { s: 0.78, prop: 'hoe' })}
        ${dust([[210, 150, 10], [300, 156, 12]])}`)}`),

    // Cảnh 4: nhiều giờ trôi qua; lật mảng tường lớn, người cha nghe tiếng con; ông gọi to; có tiếng đáp "Cha ơi, con ở đây!"
    () => svg('Người cha lật mảng tường và nghe tiếng con gọi', `
      ${ruins('t12s4sky', '#FB923C', '#FDE68A')}
      ${at(1, sun(390, 120, 16, false))}
      ${rubble(160, 250, 1.1)}
      ${gap(300, 268, false)}
      ${at(1, `${person(110, 282, 'hangXom', 'stand', { s: 0.76 })}${person(150, 286, 'baoVe', 'stand', { s: 0.76, prop: 'shovel' })}`)}
      ${at(1, person(232, 278, 'bo', 'dig', { s: 0.88 }), { off: 2 })}
      ${at(2, person(232, 278, 'bo', 'hold', { s: 0.88, prop: 'slab', mood: 'wow' }), { off: 3 })}
      ${at(3, person(232, 278, 'bo', 'wave', { s: 0.88 }), { talk: '3' })}
      ${at(3, soundWaves(260, 140, 1, '#F59E0B'))}
      ${at(4, speech(334, 92, 78, 50, 300, 230, `${word('!', 26, '#DC2626', -16, 0)}${heart(16, 0, 1.4, '#F43F5E', 0)}`))}
      ${at(5, `<g transform="translate(298 252)">${headOnly('conTrai', { s: 0.58, mood: 'joy' })}</g>${sparkles([[330, 230, 6], [276, 216, 5]], '#FFFFFF')}`)}`),

    // Cảnh 5: mọi người ào đến; bức tường đổ tạo khoảng trống nhỏ nên bọn trẻ còn sống; bọn trẻ được cứu thoát
    () => svg('Mọi người ào đến cứu các bạn nhỏ trong khoảng trống', `
      ${ruins('t12s5sky', '#FDBA74', '#FEF3C7')}
      ${rubble(190, 236, 1)}
      ${at(1, gap(300, 268, false), { off: 2 })}
      ${at(2, gap(300, 268, true), { off: 3 })}
      ${at(1, `${person(126, 284, 'hangXom', 'run', { s: 0.76 })}${person(180, 286, 'baoVe', 'run', { s: 0.78 })}`, { off: 3 })}
      ${at(1, person(236, 280, 'bo', 'run', { s: 0.84 }), { off: 3 })}
      ${at(2, sparkles([[300, 200, 7], [340, 220, 6], [262, 214, 5]], '#FFFFFF'), { off: 3 })}
      ${at(3, `${gap(330, 268, false)}
        ${person(126, 284, 'hangXom', 'clap', { s: 0.76, mood: 'joy' })}${person(176, 284, 'minh', 'cheer', { s: 0.78, mood: 'joy' })}
        ${person(224, 286, 'linh', 'cheer', { s: 0.78, mood: 'joy' })}${person(272, 284, 'baoVe', 'clap', { s: 0.78, mood: 'joy' })}
        ${heart(200, 140, 1.2, '#F43F5E', 0)}${heart(250, 126, 1, '#FB7185', 0.7)}${sparkles([[150, 150, 6], [290, 150, 7]])}`)}`),

    // Cảnh 6: cậu con trai ôm chầm lấy cha: "Con đã bảo các bạn là nhất định cha sẽ cứu con và các bạn mà!"
    () => svg('Cậu con trai ôm chầm lấy cha', `
      ${ruins('t12s6sky', '#7DD3FC', '#FEF3C7')}
      ${sun(380, 70, 18)}${cloud(150, 44, 0.7, 1)}
      ${rubble(150, 240, 0.9)}
      ${at(1, person(256, 280, 'bo', 'hold', { s: 0.9, prop: 'calf', mood: 'joy' }))}
      ${at(1, person(244, 284, 'conTrai', 'hold', { s: 0.86, prop: 'calf', mood: 'joy' }), { talk: '2,3' })}
      ${at(1, `${heart(250, 104, 1.6, '#F43F5E', 0)}${heart(214, 124, 1, '#FB7185', 0.6)}${heart(290, 120, 1.1, '#FB7185', 1.2)}`)}
      ${at(2, talkAtKid())}
      ${at(3, thought(312, 78, 124, 76, 278, 190, `
        <g transform="translate(-40 34)">${person(0, 0, 'minh', 'stand', { s: 0.36 })}</g><g transform="translate(-16 34)">${person(0, 0, 'linh', 'stand', { s: 0.36 })}</g>
        <g transform="translate(20 34)">${person(0, 0, 'conTrai', 'point', { s: 0.4, flip: true })}</g>${heart(44, -16, 1.2, '#F43F5E', 0)}`))}
      ${person(360, 284, 'hangXom', 'clap', { s: 0.76, flip: true, mood: 'joy' })}`),
  ],
};

/** Lời con nói: bong bóng có trái tim (đuôi chỉ về miệng con). */
function talkAtKid() {
  return speech(160, 96, 66, 46, 232, 186, `${heart(0, 0, 1.6, '#F43F5E', 0)}`);
}
