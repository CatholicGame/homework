// Phim truyện "Chiếc gối" (theo Phạm Hải Lê Nguyên), Tuần 13 Tiếng Việt 3: 6 cảnh, đọc từng câu.
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: mẹ (me), "tôi" là Cún (cun).
import { person, lying } from '../cast.js';
import { W, H, svg, at, sun, moon, stars, cloud, heart, sparkles, speech, thought, word, LINE } from '../sceneKit.js';

/** Căn phòng nhỏ: tường, cửa sổ (trời ngày / đêm), kệ vải nhận may, sàn gỗ. */
function room(night = false) {
  return `
    <rect width="${W}" height="${H}" fill="${night ? '#94A3B8' : '#FDE7C7'}"/>
    <rect y="0" width="${W}" height="14" fill="${night ? '#64748B' : '#F5CBA7'}"/>
    <g><rect x="300" y="46" width="84" height="76" rx="3" fill="${night ? '#1E1B4B' : '#BAE6FD'}" stroke="#fff" stroke-width="6"/>
      ${night ? `${moon(360, 74, 12)}${stars([[318, 62], [336, 104], [372, 108]])}` : cloud(334, 84, 0.45, 0)}
      <path d="M342 46 V122 M300 84 H384" stroke="#fff" stroke-width="3"/></g>
    <g transform="translate(108 70)"><rect x="-12" y="0" width="84" height="6" fill="#92400E"/><rect x="-12" y="52" width="84" height="6" fill="#92400E"/>
      ${[['#60A5FA', 0], ['#F472B6', 16], ['#FACC15', 32], ['#34D399', 48]].map(([c, dx]) => `<rect x="${dx - 6}" y="12" width="14" height="40" rx="3" fill="${c}" stroke="${LINE}" stroke-width="0.8"/>`).join('')}
      ${[['#A78BFA', 4], ['#FB923C', 26], ['#93C5FD', 48]].map(([c, dx]) => `<ellipse cx="${dx}" cy="-8" rx="10" ry="8" fill="${c}" stroke="${LINE}" stroke-width="0.8"/>`).join('')}</g>
    <rect y="214" width="${W}" height="${H - 214}" fill="${night ? '#A16207' : '#D6A36C'}"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M0 ${226 + i * 15} H${W}" stroke="${night ? '#854D0E' : '#C08A52'}" stroke-width="1.2"/>`).join('')}
    <path d="M0 214 H${W}" stroke="${night ? '#713F12' : '#B07A44'}" stroke-width="3"/>
    ${night ? `<rect width="${W}" height="${H}" fill="#1E1B4B" opacity="0.22"/>` : ''}`;
}

/** Bóng điện treo, quầng sáng (x, y: bóng đèn). */
const bulb = (x, y, glow = 1) => `<g><path d="M${x} 0 V${y - 10}" stroke="#44403C" stroke-width="1.6"/>
  <circle cx="${x}" cy="${y + 4}" r="${60 * glow}" fill="#FEF9C3" opacity="0.28"/><circle cx="${x}" cy="${y + 4}" r="${30 * glow}" fill="#FEF08A" opacity="0.35"/>
  <path d="M${x - 14} ${y - 4} Q${x} ${y - 16} ${x + 14} ${y - 4}Z" fill="#475569"/>
  <circle cx="${x}" cy="${y + 2}" r="7" fill="#FEF08A" stroke="#CA8A04" stroke-width="1"/></g>`;

/** Bàn may có máy khâu (x giữa, y chân bàn); che phần dưới người ngồi sau. */
const sewTable = (x, y) => `<g>
  <rect x="${x - 62}" y="${y - 58}" width="124" height="10" rx="2" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x - 58}" y="${y - 48}" width="116" height="40" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x - 52}" y="${y - 8}" width="8" height="8" fill="${LINE}"/><rect x="${x + 44}" y="${y - 8}" width="8" height="8" fill="${LINE}"/>
  <g transform="translate(${x + 18} ${y - 58})"><path d="M-30 0 V-12 Q-30 -30 -12 -30 H22 Q30 -30 30 -22 V0" fill="#1F2937" stroke="${LINE}" stroke-width="1"/>
    <rect x="-36" y="-4" width="72" height="4" fill="#374151"/><path d="M-22 -12 V0" stroke="#94A3B8" stroke-width="2"/><circle cx="22" cy="-18" r="7" fill="#9CA3AF" stroke="#4B5563" stroke-width="1"/>
    <path d="M-10 -22 H14" stroke="#FACC15" stroke-width="1.6"/></g></g>`;

/** Hộp các-tông đầy vải vụn (x giữa, y đáy). */
const scrapBox = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[['#60A5FA', -18, -30, -20], ['#F472B6', -4, -34, 14], ['#FACC15', 10, -30, -8], ['#34D399', 18, -34, 24], ['#A78BFA', -10, -26, 40], ['#EF4444', 4, -26, -30]]
    .map(([c, dx, dy, r]) => `<rect x="${dx - 7}" y="${dy}" width="14" height="10" rx="2" fill="${c}" stroke="${LINE}" stroke-width="0.6" transform="rotate(${r} ${dx} ${dy + 5})"/>`).join('')}
  <path d="M-28 -26 H28 L24 0 H-24Z" fill="#D6A26B" stroke="#92400E" stroke-width="1"/>
  <path d="M-28 -26 L-36 -36 M28 -26 L36 -36" stroke="#C08A52" stroke-width="4" stroke-linecap="round"/></g>`;

/** Chiếc gối chắp vải xanh, xen vài miếng đỏ, vàng (x, y: tâm). */
const pillow = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-44" y="-26" width="88" height="52" rx="20" fill="#3B82F6" stroke="${LINE}" stroke-width="1.2"/>
  <path d="M-14 -26 V26 M14 -26 V26 M-44 0 H44" stroke="#1D4ED8" stroke-width="1" stroke-dasharray="3 2"/>
  <rect x="-14" y="-26" width="28" height="26" fill="#60A5FA"/><rect x="14" y="0" width="22" height="26" fill="#93C5FD"/>
  <rect x="-36" y="2" width="22" height="20" rx="3" fill="#EF4444"/><rect x="16" y="-22" width="20" height="20" rx="3" fill="#FACC15"/>
  <rect x="-44" y="-26" width="88" height="52" rx="20" fill="none" stroke="${LINE}" stroke-width="1.2"/></g>`;

/** Miếng vải xanh xếp riêng và một miếng màu khác. */
const bluePieces = (x, y) => `<g transform="translate(${x} ${y})">
  ${[0, 1, 2, 3].map(i => `<rect x="${-18 + i * 2}" y="${-6 - i * 4}" width="30" height="18" rx="2" fill="${i % 2 ? '#3B82F6' : '#60A5FA'}" stroke="${LINE}" stroke-width="0.7"/>`).join('')}
  <rect x="18" y="-8" width="20" height="16" rx="2" fill="#EF4444" stroke="${LINE}" stroke-width="0.7"/><rect x="22" y="-14" width="16" height="10" rx="2" fill="#FACC15" stroke="${LINE}" stroke-width="0.7"/></g>`;

/** Đống vải cắt nhỏ làm ruột gối. */
const bits = (x, y, n = 14) => `<g transform="translate(${x} ${y})">${Array.from({ length: n }, (_, k) => {
  const a = k * 2.3, r = 4 + (k * 5) % 16;
  return `<rect x="${(Math.cos(a) * r).toFixed(1)}" y="${(Math.sin(a) * r * 0.4 - 4).toFixed(1)}" width="6" height="4" rx="1" fill="${['#60A5FA', '#F472B6', '#FACC15', '#34D399', '#A78BFA'][k % 5]}" transform="rotate(${k * 37} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r * 0.4).toFixed(1)})"/>`;
}).join('')}</g>`;

/** Chổi quét nhà cầm chéo (dáng dig), (x, y) chân người cầm. */
const broom = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M20 -84 L-18 -14" stroke="#A16207" stroke-width="3" stroke-linecap="round"/>
  <path d="M-14 -20 L-40 -2 Q-30 4 -12 2 Z" fill="#FCD34D" stroke="#B45309" stroke-width="0.9"/></g>`;

/** Bóng đèn ý tưởng. */
const idea = (x, y) => `<g transform="translate(${x} ${y})"><circle r="22" fill="#FEF9C3"/><circle cy="-2" r="10" fill="#FDE047" stroke="#CA8A04" stroke-width="1.2"/><rect x="-4.6" y="7" width="9.2" height="6" rx="1.5" fill="#94A3B8"/>
  ${[0, 60, 120, 180, 240, 300].map(r => `<path d="M0 -18 V-24" stroke="#FACC15" stroke-width="2.4" stroke-linecap="round" transform="rotate(${r} 0 -2)"/>`).join('')}</g>`;

export default {
  sentences: true,
  groups: [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10], [11, 12, 13], [14, 15], [16, 17, 18, 19]],
  scenes: [
    // Cảnh 1: nhà còn khó khăn, ngoài giờ đi làm mẹ nhận thêm vải về may; dọn nhà, mẹ nhìn hộp vải vụn: "Cái này làm được gì nhỉ?"
    () => svg('Mẹ nhận may thêm, nhìn hộp vải vụn', `
      ${room()}
      ${at(1, person(208, 262, 'me', 'sit', { s: 0.86 }), { off: 2 })}
      ${sewTable(220, 276)}
      ${at(1, `<path d="M184 216 Q200 206 214 218 L206 222Z" fill="#F472B6" stroke="${LINE}" stroke-width="0.7"/>`, { off: 2 })}
      ${at(2, person(220, 280, 'me', 'stand', { s: 0.86, flip: true }), { off: 3 })}
      ${at(3, person(220, 280, 'me', 'clap', { s: 0.86, flip: true, mood: 'wow' }), { talk: '3' })}
      ${at(2, scrapBox(160, 282, 1))}
      ${at(2, `${person(330, 282, 'cun', 'dig', { s: 0.86 })}${broom(330, 282, 0.86)}`)}
      ${at(3, thought(162, 72, 108, 60, 206, 132, `${scrapBox(-18, 20, 0.7)}${word('?', 30, '#64748B', 30, 0)}`))}`),

    // Cảnh 2: mẹ quay sang tôi: "A, phải rồi! Mẹ sẽ làm cho Cún một cái gối."; tôi hớn hở cùng mẹ bắt tay vào làm
    () => svg('Mẹ nghĩ ra cách làm gối cho Cún', `
      ${room()}
      ${sewTable(140, 278)}
      ${scrapBox(196, 284, 1)}
      ${at(1, person(240, 280, 'me', 'point', { s: 0.86 }), { talk: '1,2,3', off: 4 })}
      ${at(2, `${idea(222, 70)}${sparkles([[190, 96, 7], [256, 92, 6]])}`)}
      ${at(3, thought(312, 66, 110, 66, 262, 120, pillow(0, 0, 0.8)))}
      ${at(1, person(330, 282, 'cun', 'stand', { s: 0.9, flip: true }), { off: 4 })}
      ${at(4, `${person(240, 280, 'me', 'clap', { s: 0.86, mood: 'joy' })}${person(330, 282, 'cun', 'cheer', { s: 0.9, flip: true, mood: 'joy' })}${heart(290, 150, 1.2, '#F43F5E', 0)}`)}`),

    // Cảnh 3: mẹ lựa các mảnh vải xanh để riêng cùng một mảnh màu khác; vải vụn cắt nhỏ làm ruột gối; tôi hỏi sao không để cả miếng
    () => svg('Mẹ lựa vải xanh, cắt vải vụn làm ruột gối', `
      ${room()}
      ${at(1, person(180, 262, 'me', 'sit', { s: 0.86 }), { off: 2 })}
      ${at(2, person(180, 262, 'me', 'sit', { s: 0.86, prop: 'scissors' }))}
      <rect x="110" y="218" width="160" height="10" rx="2" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
      <rect x="116" y="228" width="148" height="42" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
      ${at(1, bluePieces(150, 214))}
      ${at(2, bits(236, 216, 16))}
      ${at(1, person(330, 282, 'cun', 'stand', { s: 0.9, flip: true }), { off: 3 })}
      ${at(3, person(330, 282, 'cun', 'stand', { s: 0.9, flip: true, mood: 'wow' }), { talk: '4' })}
      ${at(4, speech(326, 76, 112, 54, 330, 150, `<rect x="-38" y="-10" width="30" height="20" rx="2" fill="#60A5FA" stroke="${LINE}" stroke-width="0.8"/>${word('?', 26, '#2563EB', 4, 0)}<g transform="translate(30 4)" ><path d="M-8 -10 l16 16 M-8 6 l16 -16" stroke="#94A3B8" stroke-width="2.4" stroke-linecap="round"/></g>`))}`),

    // Cảnh 4: "Bởi vì như thế nó sẽ không mềm. Mẹ sợ con không ngủ được."; tôi thức cùng mẹ làm gối
    () => svg('Mẹ giải thích, Cún thức cùng mẹ làm gối', `
      ${room(true)}
      ${bulb(240, 40)}
      <rect x="150" y="226" width="180" height="10" rx="2" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
      <path d="M160 236 V272 M320 236 V272" stroke="#78350F" stroke-width="5"/>
      ${bits(276, 224, 12)}${bluePieces(196, 222)}
      ${at(1, person(146, 278, 'me', 'sit', { s: 0.86, prop: 'needle' }), { talk: '1,2' })}
      ${at(1, speech(170, 82, 104, 60, 150, 140, `<g transform="translate(-4 4)"><path d="M-36 4 Q-36 -14 -18 -14 Q-12 -24 2 -20 Q16 -26 26 -14 Q40 -12 36 4 Q30 14 0 14 Q-30 14 -36 4Z" fill="#E0F2FE" stroke="#93C5FD" stroke-width="1.2"/>
        ${word('z', 14, '#3B82F6', 26, -26)}${word('z', 11, '#3B82F6', 36, -34)}</g>`), { off: 3 })}
      ${at(1, person(336, 282, 'cun', 'sit', { s: 0.9, flip: true }), { off: 3 })}
      ${at(3, `${person(336, 282, 'cun', 'sit', { s: 0.9, flip: true, prop: 'needle', mood: 'joy' })}${heart(250, 150, 1.2, '#F43F5E', 0)}${heart(280, 136, 0.9, '#FB7185', 0.7)}`)}`),

    // Cảnh 5: đêm khuya tôi ngủ lúc nào không hay, chập chờn vẫn thấy ánh điện; chắc mẹ vẫn chưa ngủ
    () => svg('Cún ngủ say, mẹ vẫn thức khâu gối dưới ánh đèn', `
      ${room(true)}
      ${at(1, bulb(300, 40, 1))}
      <rect x="236" y="214" width="150" height="10" rx="2" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
      <path d="M246 224 V262 M376 224 V262" stroke="#78350F" stroke-width="5"/>
      ${at(2, `${person(310, 254, 'me', 'sit', { s: 0.78, prop: 'needle' })}${pillow(352, 208, 0.4)}${sparkles([[340, 150, 6], [270, 120, 5]])}`)}
      <rect x="104" y="248" width="180" height="34" rx="6" fill="#FDE68A" stroke="#CA8A04" stroke-width="1"/>
      ${at(1, lying(212, 270, 'cun', { s: 0.86, blanket: '#A5B4FC' }))}
      ${at(1, `${word('z', 18, '#E0E7FF', 144, 196)}${word('z', 14, '#E0E7FF', 158, 182)}`)}`),

    // Cảnh 6: ba ngày sau chiếc gối hoàn thành, xanh xen đỏ và vàng; mẹ như cho tôi bầu trời xanh đầy mơ ước, vầng thái dương dẫn bước; đó là tình yêu của mẹ
    () => svg('Chiếc gối chắp vải xanh và bầu trời mơ ước', `
      ${room()}
      ${at(1, person(176, 280, 'cun', 'hold', { s: 0.94, prop: 'pillow', mood: 'joy' }))}
      ${at(1, sparkles([[130, 150, 8], [222, 140, 7], [236, 200, 6], [116, 196, 5]]), { off: 3 })}
      ${at(2, `${heart(130, 168, 1.1, '#F43F5E', 0)}${heart(220, 176, 1.2, '#FB7185', 0.6)}`, { off: 3 })}
      ${at(3, `<defs><clipPath id="t13s6dream"><rect x="104" y="30" width="270" height="130" rx="40"/></clipPath><linearGradient id="t13s6sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38BDF8"/><stop offset="1" stop-color="#BAE6FD"/></linearGradient></defs>
        <circle cx="210" cy="170" r="4" fill="#fff" stroke="#94A3B8"/><circle cx="218" cy="162" r="6" fill="#fff" stroke="#94A3B8"/>
        <rect x="104" y="30" width="270" height="130" rx="40" fill="url(#t13s6sky)" stroke="#94A3B8" stroke-width="1.5"/>
        <g clip-path="url(#t13s6dream)">${sun(320, 74, 20)}${cloud(170, 64, 0.6, 0)}${cloud(250, 50, 0.5, 2)}
          <path d="M100 160 Q200 120 280 136 T380 120 V170 H100Z" fill="#86EFAC"/>
          <path d="M150 160 Q240 140 300 120" stroke="#FDE68A" stroke-width="6" fill="none" stroke-linecap="round"/>
          ${person(170, 160, 'cun', 'walk', { s: 0.36 })}
          ${[0, 1, 2].map(i => `<path class="sc-twinkle" style="--d:${i * 0.4}s" d="M${290 - i * 22} ${92 + i * 12} l-14 8" stroke="#FDE047" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>`)}
      ${at(1, person(300, 280, 'me', 'stand', { s: 0.88, flip: true, mood: 'joy' }), { off: 4 })}
      ${at(4, `${person(290, 280, 'me', 'clap', { s: 0.88, flip: true, mood: 'joy' })}${heart(236, 196, 1.4, '#F43F5E', 0)}${heart(264, 176, 1, '#FB7185', 0.6)}${heart(214, 178, 0.9, '#F43F5E', 1.2)}`)}`),
  ],
};
