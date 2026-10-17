// Phim truyện "Ngày như thế nào là đẹp" (Ô-xê-ê-va), Tuần 2 Tiếng Việt 3: 4 cảnh, mỗi cảnh một nhóm đoạn văn.
// data-l="n": hiện từ đoạn thứ n của cảnh (đếm từ 1); data-off: ẩn từ đoạn đó; data-talk: nhân vật nói ở đoạn đó thì nhún.
// Con vật: critters.js (hình cắt từ tờ nhân vật Châu Chấu, Giun Đất, bác Kiến).
import { critter } from '../critters.js';

const W = 480, H = 300;
const svg = (label, inner) =>
  `<svg viewBox="60 0 360 ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}">${inner}</svg>`;

function sun(x, y, r, line) {
  return `<g ${line ? `data-l="${line}"` : ''}><g transform="translate(${x} ${y})"><g class="sc-spin">
    ${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${-r - 6} V${-r - 16}" stroke="#FACC15" stroke-width="4" stroke-linecap="round" transform="rotate(${i * 30})"/>`).join('')}
  </g><circle r="${r}" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5"/>
  <circle cx="${-r * 0.3}" cy="${-r * 0.1}" r="2" fill="#92400E"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="2" fill="#92400E"/>
  <path d="M${-r * 0.3} ${r * 0.3} Q0 ${r * 0.55} ${r * 0.3} ${r * 0.3}" stroke="#92400E" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></g>`;
}

const grass = (y, c = '#4ADE80') => `<path d="M0 ${y} Q120 ${y - 18} 240 ${y - 6} T480 ${y - 8} V300 H0Z" fill="${c}"/>`;
const tufts = (list) => list.map(([x, y]) => `<path d="M${x} ${y} l-4 -12 M${x} ${y} l0 -15 M${x} ${y} l5 -11" stroke="#16A34A" stroke-width="2" stroke-linecap="round"/>`).join('');
const flowers = (list) => list.map(([x, y, c]) => `<g transform="translate(${x} ${y})"><g class="sc-sway" style="--d:${(x % 5) / 2}s">
  <path d="M0 0 V-16" stroke="#16A34A" stroke-width="2"/>${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-20" rx="2.6" ry="4" fill="${c}" transform="rotate(${r} 0 -16)"/>`).join('')}<circle cy="-16" r="2.4" fill="#FDE047"/></g></g>`).join('');

/** Đất khô nứt nẻ chỗ Giun Đất ở. */
const dryGround = (x, y, w) => `<path d="M${x - w} ${y + 4} Q${x} ${y - 10} ${x + w} ${y + 4} V300 H${x - w}Z" fill="#C89B6D"/>
  <path d="M${x - w * 0.6} ${y + 14} l12 8 l-4 12 M${x + w * 0.2} ${y + 10} l-6 10 l10 8 M${x + w * 0.6} ${y + 20} l-8 6" stroke="#8B6340" stroke-width="1.6" fill="none"/>`;

/** Bong bóng ý nghĩ (đuôi chấm tròn trỏ về (tx, ty)). */
function thought(x, y, w, h, tx, ty, inner) {
  return `<g>
    <circle cx="${tx}" cy="${ty}" r="3" fill="#fff" stroke="#94A3B8"/><circle cx="${(tx * 2 + x) / 3}" cy="${(ty * 2 + y + h / 2) / 3}" r="5" fill="#fff" stroke="#94A3B8"/>
    <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2.4}" fill="#fff" stroke="#94A3B8" stroke-width="1.5"/>
    <g transform="translate(${x} ${y})">${inner}</g></g>`;
}

const pineTree = (x, y) => `<rect x="${x - 4}" y="${y - 30}" width="8" height="30" fill="#8B5A2B"/>
  ${[0, 1, 2].map(i => `<path d="M${x - 30 + i * 6} ${y - 26 - i * 26} L${x} ${y - 70 - i * 26} L${x + 30 - i * 6} ${y - 26 - i * 26}Z" fill="${i % 2 ? '#2F8F4E' : '#257A41'}"/>`).join('')}`;

export default {
  groups: [[0, 1], [2, 3, 4], [5, 6, 7, 8], [9, 10, 11]],
  scenes: [
    // Cảnh 1: Châu Chấu nhảy lên gò phơi nắng, búng chân: "Một ngày tuyệt đẹp!"
    () => svg('Châu Chấu đứng trên gò đất phơi nắng', `
      <rect width="${W}" height="${H}" fill="#7DD3FC"/>
      <rect y="120" width="${W}" height="80" fill="#BAE6FD" opacity="0.6"/>
      ${sun(330, 64, 26)}
      ${grass(214, '#86EFAC')}${grass(246, '#4ADE80')}
      ${tufts([[120, 244], [200, 252], [300, 248], [380, 250], [90, 268], [350, 272]])}
      ${flowers([[100, 262, '#F472B6'], [150, 276, '#FDE047'], [372, 262, '#F472B6'], [400, 282, '#A78BFA'], [300, 282, '#FDE047']])}
      <g data-l="1" data-off="2" data-talk="1">${critter(240, 270, 'grasshopper-stand', { h: 160 })}</g>
      <g data-l="2" data-talk="2"><g class="sc-bob">${critter(240, 236, 'grasshopper-jump', { h: 160 })}</g>
        ${[[300, 96], [190, 104], [312, 140]].map(([x, y], i) => `<path class="sc-twinkle" style="--d:${i * 0.5}s" d="M${x} ${y - 8} L${x + 2} ${y - 2} L${x + 8} ${y} L${x + 2} ${y + 2} L${x} ${y + 8} L${x - 2} ${y + 2} L${x - 8} ${y} L${x - 2} ${y - 2}Z" fill="#FDE047"/>`).join('')}
      </g>`),

    // Cảnh 2: Giun Đất rúc đầu vào đất khô kêu khó chịu; Châu Chấu: trời không gợn mây; Giun Đất: mưa bụi, vũng nước đục
    () => svg('Châu Chấu và Giun Đất cãi nhau thế nào là ngày đẹp', `
      <rect width="${W}" height="${H}" fill="#7DD3FC"/>
      <g data-l="2">${sun(130, 54, 22)}</g>
      ${grass(214, '#86EFAC')}
      ${dryGround(330, 222, 110)}
      ${tufts([[90, 262], [252, 258], [180, 280]])}
      <g data-talk="2">${critter(150, 272, 'grasshopper-talk', { h: 150 })}</g>
      <g data-l="1" data-off="2" data-talk="1">${critter(318, 270, 'worm-dig', { h: 76, flip: true })}</g>
      <g data-l="2" data-talk="3">${critter(318, 270, 'worm-grumpy', { h: 90, flip: true })}</g>
      <g data-l="1"><path class="sc-rise" style="--d:0.3s" d="M290 240 q-6 -10 0 -20 M370 236 q6 -10 0 -20" stroke="#E7C9A1" stroke-width="3" fill="none" stroke-linecap="round"/></g>
      <g data-l="3">${thought(300, 90, 150, 112, 304, 172, `
        <path d="M-56 -26 Q-54 -48 -30 -44 Q-22 -58 -2 -52 Q14 -62 28 -48 Q50 -48 46 -26Z" fill="#CBD5E1"/>
        ${[-44, -28, -12, 4, 20, 36].map((x, i) => `<path class="sc-rain" style="--d:${i * 0.2}s" d="M${x} -20 l-3 8" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>`).join('')}
        ${critter(0, 50, 'worm-happy', { h: 58 })}`)}</g>`),

    // Cảnh 3: bác Kiến tha nhành lá thông đi qua; Châu Chấu hỏi; Kiến lau mồ hôi, ngẫm nghĩ; hẹn trả lời khi mặt trời lặn
    () => svg('Bác Kiến tha nhành lá thông đi qua', `
      <rect width="${W}" height="${H}" fill="#93C5FD"/>
      ${sun(380, 52, 20)}
      ${pineTree(400, 214)}${pineTree(80, 210)}
      ${grass(212, '#86EFAC')}${grass(250, '#4ADE80')}
      <path d="M60 260 Q240 236 480 256" stroke="#D6A26B" stroke-width="18" fill="none" opacity="0.7"/>
      ${tufts([[110, 236], [200, 246], [380, 240]])}
      <g data-talk="2">${critter(156, 272, 'grasshopper-talk', { h: 140 })}</g>
      ${critter(236, 276, 'worm-grumpy', { h: 72 })}
      <g data-l="1" data-off="3"><g class="sc-walk">${critter(330, 274, 'ant-carry', { h: 160, flip: true })}</g></g>
      <g data-l="3" data-off="4">${critter(330, 274, 'ant-wipe', { h: 156, flip: true })}</g>
      <g data-l="4" data-talk="4">${critter(330, 274, 'ant-think', { h: 160, flip: true })}</g>
      <g data-l="3"><g transform="translate(384 270) rotate(-8)"><path d="M-30 0 L30 0" stroke="#8B5A2B" stroke-width="3" stroke-linecap="round"/>
        ${[-22, -8, 6, 20].map(t => `<path d="M${t} 0 l-6 -9 M${t} 0 l2 -11 M${t} 0 l8 -7" stroke="#2F8F4E" stroke-width="1.8" stroke-linecap="round"/>`).join('')}</g></g>
      <g data-l="4">${thought(282, 70, 92, 62, 312, 112, `
        <rect x="-40" y="-26" width="80" height="44" rx="10" fill="#FDBA74"/>
        <circle cx="0" cy="8" r="16" fill="#F97316"/><rect x="-40" y="8" width="80" height="12" fill="#7C2D12" opacity="0.7"/>
        <path d="M0 -4 v-12 M-6 -10 l6 -6 l6 6" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" transform="rotate(180 0 -10)"/>`)}</g>`),

    // Cảnh 4: mặt trời lặn, cả bọn đến tổ kiến; bác Kiến: hôm nay là ngày tuyệt đẹp, làm việc tốt, giờ nghỉ ngơi
    () => svg('Mặt trời lặn, các bạn đến tổ kiến', `
      <defs><linearGradient id="t2dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6D28D9"/><stop offset="0.55" stop-color="#F97316"/><stop offset="1" stop-color="#FDBA74"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#t2dusk)"/>
      <g data-l="1"><circle cx="240" cy="196" r="34" fill="#FDE047" opacity="0.9"/></g>
      ${[[110, 40], [170, 24], [300, 30], [380, 56], [220, 60]].map(([x, y], i) => `<g data-l="3"><circle class="sc-twinkle" style="--d:${i * 0.4}s" cx="${x}" cy="${y}" r="${1.6 + (i % 2)}" fill="#FEF3C7"/></g>`).join('')}
      ${grass(206, '#3F8F4E')}${grass(238, '#2E7D3F')}
      <path d="M262 246 Q300 160 340 160 Q380 160 414 246Z" fill="#9A6B43"/>
      <path d="M276 240 Q306 180 340 176" stroke="#B88A5F" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="338" cy="176" rx="12" ry="7" fill="#3B2414"/>
      ${[[300, 222], [356, 214], [330, 236], [376, 232]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#3B2414"/>`).join('')}
      <g data-l="1" data-talk="2">${critter(146, 274, 'grasshopper-talk', { h: 136 })}</g>
      <g data-l="1" data-talk="2">${critter(212, 280, 'worm-happy', { h: 62 })}</g>
      <g data-l="1" data-off="3">${critter(296, 270, 'ant-think', { h: 150, flip: true })}</g>
      <g data-l="3" data-talk="3">${critter(296, 270, 'ant-talk', { h: 150 })}</g>
      <g data-l="3"><path d="M352 146 l4 -10 M362 150 l8 -6" stroke="#FDE047" stroke-width="2.4" stroke-linecap="round" class="sc-twinkle"/></g>`),
  ],
};
