// Phim truyện "Hoa tặng mẹ" (theo Truyện hay cho thiếu nhi), Tuần 11 Tiếng Việt 3: 6 cảnh, đọc từng câu.
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: người đàn ông (chu), bé gái (beGai), mẹ của anh (ba). Nghĩa trang vẽ nhẹ nhàng: đồi cỏ, ụ đất nhỏ có hoa.
import { person, headOnly, rose } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, tree, flowers, tufts, heart, sparkles, speech, thought, word, LINE } from '../sceneKit.js';

/** Ô tô con nhìn ngang (x giữa, y mặt đường); flip: đầu xe quay trái. */
const car = (x, y, s = 1, flip = false, color = '#EF4444') => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <path d="M-52 -12 Q-54 -30 -38 -32 L-24 -50 Q-20 -54 -12 -54 H16 Q24 -54 28 -48 L40 -32 Q56 -30 56 -16 V-10 H-52Z" fill="${color}" stroke="${LINE}" stroke-width="1.1"/>
  <path d="M-20 -48 H-4 V-34 H-30Z M2 -48 H18 Q22 -48 24 -44 L32 -34 H2Z" fill="#BAE6FD" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M-8 -26 h8" stroke="${LINE}" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="52" cy="-24" r="3" fill="#FEF08A"/><rect x="-54" y="-24" width="5" height="5" fill="#FCA5A5"/>
  ${[-32, 34].map(cx => `<circle cx="${cx}" cy="-10" r="10" fill="#1F2937"/><circle cx="${cx}" cy="-10" r="4.4" fill="#D1D5DB"/>`).join('')}</g>`;

/** Xô hoa trước cửa hàng (x giữa, y đáy). */
const bucket = (x, y, c, i = 0) => `<g transform="translate(${x} ${y})">
  <g class="sc-sway" style="--d:${i * 0.6}s">${[-8, 0, 8, -4, 4].map((dx, k) => `<path d="M${dx * 0.5} -18 L${dx} ${-30 - (k % 3) * 5}" stroke="#16A34A" stroke-width="1.4"/><circle cx="${dx}" cy="${-32 - (k % 3) * 5}" r="4.6" fill="${c}" stroke="${LINE}" stroke-width="0.5"/>`).join('')}</g>
  <path d="M-12 -20 H12 L9 0 H-9Z" fill="#94A3B8" stroke="${LINE}" stroke-width="0.9"/><path d="M-11 -14 H11" stroke="#CBD5E1" stroke-width="1.4"/></g>`;

/** Cửa hàng hoa: tường, mái bạt sọc, tủ kính đầy hoa, cửa, các xô hoa (x trái, y chân tường, w rộng). */
function shop(x, y, w = 190) {
  return `<g>
    <rect x="${x}" y="${y - 140}" width="${w}" height="140" fill="#FEF3C7" stroke="${LINE}" stroke-width="1"/>
    <rect x="${x - 4}" y="${y - 150}" width="${w + 8}" height="14" fill="#F9A8D4" stroke="${LINE}" stroke-width="1"/>
    ${heart(x + w / 2, y - 143, 0.8, '#E11D48', 0)}
    <path d="M${x - 8} ${y - 132} H${x + w + 8} L${x + w + 14} ${y - 106} H${x - 14}Z" fill="#fff" stroke="${LINE}" stroke-width="1"/>
    ${Array.from({ length: Math.ceil(w / 22) }, (_, i) => `<path d="M${x - 8 + i * 22} ${y - 132} H${x + 3 + i * 22} L${x + 4 + i * 22.8} ${y - 106} H${x - 10 + i * 23.2}Z" fill="#22C55E"/>`).join('')}
    <path d="M${x - 14} ${y - 106} ${Array.from({ length: Math.ceil((w + 28) / 14) }, () => 'q7 8 14 0').join(' ')}" fill="#22C55E" stroke="${LINE}" stroke-width="0.8"/>
    <rect x="${x + 14}" y="${y - 94}" width="${w * 0.48}" height="64" fill="#E0F2FE" stroke="#92400E" stroke-width="4"/>
    ${[0, 1, 2, 3].map(i => rose(x + 30 + i * (w * 0.48 - 28) / 3, y - 60 + (i % 2) * 6, 1, ['#E11D48', '#F472B6', '#FACC15', '#E11D48'][i])).join('')}
    <rect x="${x + w * 0.62}" y="${y - 96}" width="${w * 0.3}" height="96" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
    <rect x="${x + w * 0.62 + 6}" y="${y - 88}" width="${w * 0.3 - 12}" height="40" fill="#BAE6FD"/>
    ${bucket(x + 20, y + 18, '#E11D48', 0)}${bucket(x + 50, y + 22, '#F472B6', 1)}${bucket(x + 80, y + 18, '#FACC15', 2)}${bucket(x + 108, y + 22, '#A78BFA', 3)}</g>`;
}

/** Phố: trời, cây, vỉa hè lát gạch (y 208…268), lòng đường. */
const street = (id) => `${sky(id)}
  ${cloud(320, 40, 0.7, 0)}${cloud(150, 28, 0.6, 2)}
  <rect y="200" width="${W}" height="70" fill="#E7E5E4"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${i * 40} 200 L${i * 40 - 16} 268" stroke="#D6D3D1" stroke-width="1.2"/>`).join('')}
  <path d="M0 234 H${W}" stroke="#D6D3D1" stroke-width="1.2"/>
  <rect y="266" width="${W}" height="6" fill="#A8A29E"/>
  <rect y="272" width="${W}" height="28" fill="#57534E"/>
  <path d="M0 290 H${W}" stroke="#FDE047" stroke-width="2.4" stroke-dasharray="18 14"/>`;

/** Đồng xu nhỏ. */
const coins = (x, y) => [[0, 0], [10, -4], [5, 6]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="6" fill="#FCD34D" stroke="#B45309" stroke-width="1"/>`).join('');

/** Ngôi mộ nhỏ đắp đất, cỏ và hoa (x giữa, y chân); fresh: mộ mới đắp. */
const mound = (x, y, s = 1, fresh = false) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-40 0 Q-36 -30 0 -32 Q36 -30 40 0Z" fill="${fresh ? '#B07A4F' : '#65A30D'}" stroke="${LINE}" stroke-width="1"/>
  ${fresh ? `<path d="M-26 -14 q6 -4 12 0 M6 -22 q6 -4 12 0 M10 -8 q6 -4 12 0" stroke="#8B5A35" stroke-width="1.2" fill="none"/>` : `<path d="M-30 -10 Q0 -30 30 -10" stroke="#84CC16" stroke-width="2" fill="none"/>`}
  ${flowers([[-34, 2, '#F9A8D4'], [-26, 4, '#FDE047'], [30, 3, '#FFFFFF'], [36, 2, '#F9A8D4']])}</g>`;

/** Cây bách / tùng thon cao ở nghĩa trang. */
const cypress = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="-14" width="6" height="14" fill="#78350F"/>
  <g class="sc-sway" style="--d:${(x % 5) / 2}s"><path d="M0 -96 Q16 -60 14 -26 Q0 -10 -14 -26 Q-16 -60 0 -96Z" fill="#15803D"/><path d="M0 -86 Q8 -60 6 -30" stroke="#22C55E" stroke-width="3" fill="none"/></g></g>`;

/** Ngôi nhà nhỏ mái ngói của mẹ (x giữa, y nền). */
const home = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-56" y="-76" width="112" height="76" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/>
  <path d="M-68 -72 L0 -118 L68 -72Z" fill="#DC2626" stroke="${LINE}" stroke-width="1"/>
  <rect x="-18" y="-52" width="36" height="52" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
  <rect x="-48" y="-56" width="22" height="22" fill="#BAE6FD" stroke="#fff" stroke-width="3"/><rect x="26" y="-56" width="22" height="22" fill="#BAE6FD" stroke="#fff" stroke-width="3"/></g>`;

export default {
  sentences: true,
  groups: [[0, 1], [2, 3, 4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15], [16, 17, 18]],
  scenes: [
    // Cảnh 1: người đàn ông dừng xe trước cửa hàng hoa, định gửi hoa tặng mẹ qua bưu điện; mẹ anh ở xa hơn trăm ki-lô-mét
    () => svg('Người đàn ông dừng xe trước cửa hàng hoa', `
      ${street('t11s1sky')}
      ${shop(96, 204, 190)}
      ${tree(400, 206, 0.9)}
      ${at(1, car(370, 290, 0.95))}
      ${at(1, person(290, 268, 'chu', 'stand', { s: 0.86, flip: true }))}
      ${at(2, thought(220, 66, 170, 74, 290, 128, `
        <path d="M-74 22 Q-20 4 20 14 T70 4" stroke="#D6D3D1" stroke-width="6" fill="none" stroke-dasharray="8 6"/>
        <g transform="translate(-62 18) scale(0.3)">${home(0, 0)}</g>
        <g transform="translate(46 0) scale(0.4)">${home(0, 0)}</g>
        <g transform="translate(46 -14)">${headOnly('ba', { s: 0.45 })}</g>
        ${heart(4, -18, 1, '#F43F5E', 0)}`))}`),

    // Cảnh 2: anh thấy bé gái lặng lẽ khóc bên vỉa hè; anh hỏi vì sao; bé muốn mua tặng mẹ bông hồng, nhưng chỉ có 75 xu mà hoa giá 2 đô la
    () => svg('Bé gái khóc bên vỉa hè vì không đủ tiền mua hoa', `
      ${street('t11s2sky')}
      ${shop(96, 204, 190)}
      ${tree(400, 206, 0.9)}
      ${car(390, 290, 0.95)}
      ${at(1, person(172, 268, 'beGai', 'stand', { s: 0.92, mood: 'cry' }), { talk: '3,4,5' })}
      ${at(1, person(330, 266, 'chu', 'stand', { s: 0.86, flip: true, mood: 'wow' }), { off: 2 })}
      ${at(2, person(262, 266, 'chu', 'stand', { s: 0.86, flip: true }), { talk: '2' })}
      ${at(2, speech(300, 78, 54, 40, 270, 126, word('?', 24, '#475569')), { off: 3 })}
      ${at(4, speech(150, 72, 76, 52, 166, 136, `${rose(-14, -6, 1.1)}${heart(16, -4, 1.3, '#F43F5E', 0)}`), { off: 5 })}
      ${at(5, speech(200, 66, 176, 60, 176, 136, `${coins(-80, -2)}${word('75 xu', 15, '#B45309', -40, 0)}${word('&lt;', 22, '#DC2626', 4, 0)}${rose(30, -8, 1)}${word('2 $', 16, '#15803D', 62, 0)}`))}`),

    // Cảnh 3: người đàn ông mỉm cười: "Đừng khóc nữa! Chú sẽ mua cho cháu một bông."
    () => svg('Người đàn ông mỉm cười hứa mua hoa cho bé', `
      ${street('t11s3sky')}
      ${shop(96, 204, 190)}
      ${tree(400, 206, 0.9)}
      ${car(390, 290, 0.95)}
      ${at(1, person(172, 268, 'beGai', 'stand', { s: 0.92, mood: 'sad' }), { off: 3 })}
      ${at(3, person(172, 268, 'beGai', 'clap', { s: 0.92, mood: 'joy' }))}
      ${at(1, person(260, 266, 'chu', 'give', { s: 0.86, flip: true, mood: 'joy' }), { talk: '1,2,3' })}
      ${at(3, speech(290, 72, 66, 50, 262, 128, `${rose(0, -6, 1.2)}`))}
      ${at(3, `${heart(148, 112, 1.2, '#F43F5E', 0)}${sparkles([[196, 108, 7], [120, 140, 5]])}`)}`),

    // Cảnh 4: anh mua cho bé một bông hồng, đặt bó hồng gửi mẹ; anh mời bé đi nhờ xe; bé chỉ đường tới nghĩa trang
    () => svg('Người đàn ông mua hoa cho bé, mời bé đi nhờ xe', `
      ${street('t11s4sky')}
      ${shop(96, 204, 190)}
      ${tree(400, 206, 0.9)}
      ${car(340, 290, 0.95)}
      ${at(1, person(158, 268, 'beGai', 'raise', { s: 0.92, prop: 'rose', mood: 'joy' }), { off: 3 })}
      ${at(3, person(158, 268, 'beGai', 'point', { s: 0.92, mood: 'sad' }), { talk: '3' })}
      ${at(1, person(240, 266, 'chu', 'give', { s: 0.86, flip: true, prop: 'bouquet' }), { off: 2 })}
      ${at(1, thought(296, 66, 116, 58, 262, 120, `<g transform="translate(-30 0)"><path d="M-8 -10 L0 14 L8 -10Z" fill="#FDF2F8" stroke="#F9A8D4" stroke-width="1"/>${[-5, 0, 5].map((dx, i) => `<circle cx="${dx}" cy="${-12 - (i % 2) * 4}" r="4" fill="#E11D48"/>`).join('')}</g>
        <path d="M-12 2 H8 M2 -4 L8 2 L2 8" stroke="#16A34A" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <g transform="translate(32 2)"><rect x="-14" y="-10" width="28" height="20" rx="2" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><path d="M-14 -10 L0 2 L14 -10" stroke="#3B82F6" stroke-width="1.4" fill="none"/></g>`), { off: 2 })}
      ${at(2, person(240, 266, 'chu', 'point', { s: 0.86 }), { talk: '2' })}
      ${at(3, `<g transform="translate(134 120)"><rect x="-2" y="0" width="4" height="84" fill="#78716C"/><path d="M-26 -18 H18 L28 -6 L18 6 H-26Z" fill="#22C55E" stroke="${LINE}" stroke-width="1"/>${cypress(-4, 2, 0.16).replace('translate(-4 2)', 'translate(-8 4)')}</g>`)}`),

    // Cảnh 5: nghĩa trang, ngôi mộ mới đắp; bé chỉ ngôi mộ: "Đây là nhà của mẹ cháu."; bé nhẹ nhàng đặt bông hồng lên mộ mẹ
    () => svg('Bé gái đặt bông hồng lên mộ mẹ', `
      ${sky('t11s5sky', '#FDBA74', '#FEF3C7')}
      ${sun(140, 80, 18, false)}${cloud(330, 44, 0.7, 1, '#FFF7ED')}
      <path d="M0 170 Q140 140 280 160 T480 150 V300 H0Z" fill="#A3E635"/>
      <path d="M0 210 Q160 190 300 206 T480 200 V300 H0Z" fill="#84CC16"/>
      ${cypress(96, 176, 0.9)}${cypress(400, 172, 1)}${cypress(250, 160, 0.6)}${cypress(330, 160, 0.55)}
      ${mound(170, 182, 0.5)}${mound(300, 176, 0.45)}${mound(370, 186, 0.5)}
      ${car(136, 214, 0.5)}
      ${tufts([[120, 270], [200, 280], [360, 276], [400, 262]])}
      ${at(1, mound(306, 270, 1.15, true))}
      ${at(1, person(180, 270, 'chu', 'stand', { s: 0.86 }), { off: 2 })}
      ${at(2, person(180, 270, 'chu', 'clap', { s: 0.86, mood: 'sad' }))}
      ${at(1, person(236, 276, 'beGai', 'point', { s: 0.92, mood: 'sad' }), { off: 2 })}
      ${at(2, person(236, 276, 'beGai', 'stand', { s: 0.92, mood: 'sad' }), { off: 3, talk: '2' })}
      ${at(3, person(240, 276, 'beGai', 'give', { s: 0.92, mood: 'shut' }))}
      ${at(3, `<g transform="translate(300 238) rotate(-70)">${rose(0, 0, 1.2)}</g>${heart(306, 196, 1.3, '#FB7185', 0)}${sparkles([[276, 214, 6], [336, 206, 7]], '#FFFFFF')}`)}`),

    // Cảnh 6: anh quay lại cửa hàng hoa, huỷ dịch vụ gửi hoa, mua một bó hồng thật đẹp, lái xe về trao tận tay mẹ
    () => svg('Người đàn ông mang bó hồng về tận tay mẹ', `
      ${street('t11s6sky')}
      ${shop(70, 204, 140)}
      ${home(338, 204, 0.95)}
      ${tree(250, 206, 0.8)}
      ${at(1, car(260, 290, 0.9))}
      ${at(1, person(196, 268, 'chu', 'walk', { s: 0.86, flip: true }), { off: 2 })}
      ${at(2, person(196, 268, 'chu', 'give', { s: 0.86, prop: 'bouquet', mood: 'joy' }), { off: 3 })}
      ${at(3, person(290, 268, 'chu', 'give', { s: 0.86, prop: 'bouquet', mood: 'joy' }))}
      ${at(1, person(358, 268, 'ba', 'stand', { s: 0.82, flip: true }), { off: 3 })}
      ${at(3, person(358, 268, 'ba', 'clap', { s: 0.82, flip: true, mood: 'joy' }))}
      ${at(3, `${heart(326, 104, 1.3, '#F43F5E', 0)}${heart(350, 86, 1, '#FB7185', 0.6)}${sparkles([[320, 130, 6], [384, 120, 7]])}`)}`),
  ],
};
