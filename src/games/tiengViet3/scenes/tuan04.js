// Phim truyện "Hai mẹ con và bà tiên", Tuần 4 Tiếng Việt 3: 6 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: cô bé (coBe), người mẹ (meNgheo), bà con hàng xóm (hangXom), bà cụ (ba, chống gậy), bà tiên hiện hình (baTien).
import { person, lying, headOnly } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, grass, tufts, flowers, tree, sparkles, speech, thought, word, heart, thatchHouse, path, soundWaves, LINE } from '../sceneKit.js';

/** Tay nải vải xanh nằm trên đất (open: miệng túi mở, thấy thỏi vàng). */
function tayNai(x, y, s = 1, open = false) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="2" rx="22" ry="4" fill="#000" opacity="0.12"/>
    <path d="M-20 0 Q-24 -18 -8 -22 Q0 -24 8 -22 Q24 -18 20 0 Q0 6 -20 0Z" fill="#2563EB" stroke="${LINE}" stroke-width="1"/>
    <path d="M-14 -8 Q0 -12 14 -8" stroke="#FDE68A" stroke-width="1.4" fill="none"/>
    ${open
      ? `<path d="M-10 -22 Q0 -30 10 -22 Q0 -18 -10 -22Z" fill="#1E3A8A"/>${goldBar(-4, -24, 0.7)}${goldBar(5, -25, 0.6)}`
      : `<path d="M-6 -22 Q0 -30 6 -22" stroke="#1E40AF" stroke-width="3" fill="none"/>`}
  </g>`;
}

/** Thỏi vàng nhỏ. */
const goldBar = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-9 4 L-6 -4 H6 L9 4Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1"/><path d="M-5 -2 H3" stroke="#FEF9C3" stroke-width="1.4"/></g>`;

/** Đồng bạc (đồng xu có lỗ vuông). */
const coin = (x, y, r = 7) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#E5E7EB" stroke="#64748B" stroke-width="1"/>
  <rect x="${x - r * 0.25}" y="${y - r * 0.25}" width="${r * 0.5}" height="${r * 0.5}" fill="#94A3B8"/>`;

/** Ấm sắc thuốc bằng đất, khói thuốc bốc lên. */
const thuocPot = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[-6, 4].map((dx, i) => `<path class="sc-rise" style="--d:${i * 0.8}s" d="M${dx} -24 q-4 -6 0 -12 q4 -6 0 -12" stroke="#CBD5E1" stroke-width="2" fill="none"/>`).join('')}
  <path d="M-14 -16 Q-18 0 -10 2 H10 Q18 0 14 -16Z" fill="#9A5B34" stroke="${LINE}" stroke-width="1"/>
  <path d="M14 -10 Q24 -14 24 -22" stroke="#9A5B34" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="-17" rx="12" ry="3.4" fill="#7C4A21" stroke="${LINE}" stroke-width="1"/><circle cx="0" cy="-21" r="2.4" fill="#7C4A21"/></g>`;

/** Chõng tre trước hiên (x giữa, y mặt đất). */
const chong = (x, y, w = 150) => `<g>
  <path d="M${x - w / 2 + 8} ${y} V${y - 20} M${x + w / 2 - 8} ${y} V${y - 20}" stroke="#A16207" stroke-width="5"/>
  <rect x="${x - w / 2}" y="${y - 26}" width="${w}" height="8" rx="2" fill="#D6A85C" stroke="${LINE}" stroke-width="1"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${x - w / 2 + 8 + i * (w - 16) / 8} ${y - 26} v8" stroke="#A16207" stroke-width="0.8"/>`).join('')}</g>`;

/** Ruộng rau sau nhà. */
const field = (y) => `<path d="M0 ${y} H${W} V${y + 26} H0Z" fill="#65A30D"/>
  ${Array.from({ length: 16 }, (_, i) => `<ellipse cx="${i * 32 + 10}" cy="${y + 8}" rx="9" ry="5" fill="${i % 2 ? '#22C55E' : '#4ADE80'}"/>`).join('')}`;

/** Đồi xa và hàng tre cho cảnh đường làng. */
const hills = (y) => `<path d="M0 ${y} Q80 ${y - 50} 170 ${y - 6} Q260 ${y - 60} 340 ${y - 4} Q420 ${y - 46} 480 ${y - 10} V300 H0Z" fill="#A7D98A"/>`;


export default {
  sentences: true,
  groups: [[0, 1, 2, 3, 4, 5], [6, 7, 8], [9, 10, 11, 12, 13], [14, 15, 16, 17, 18, 19], [20, 21, 22, 23, 24, 25], [26, 27]],
  scenes: [
    // Cảnh 1: túp lều, hai mẹ con làm lụng; mẹ ốm nằm chõng, cô bé chăm mẹ; bà con hàng xóm mách thầy thuốc
    () => svg('Hai mẹ con nghèo, mẹ bị ốm, cô bé ngày đêm chăm sóc mẹ', `
      ${sky('t04s1sky', '#93C5FD', '#ECFCCB')}
      ${sun(400, 46, 18)}${cloud(150, 44, 0.8, 0)}${cloud(300, 30, 0.6, 3)}
      ${field(176)}
      ${thatchHouse(150, 214, 170, 66)}
      ${tree(60, 214, 0.9)}${tree(430, 206, 0.8, '#4ADE80', '#22C55E')}
      <rect y="210" width="${W}" height="${H - 210}" fill="#E9D3A8"/>
      <path d="M0 210 H${W}" stroke="#C9A877" stroke-width="2"/>
      ${tufts([[80, 236], [400, 250], [120, 292], [440, 290]])}
      ${at(1, person(196, 280, 'meNgheo', 'stand', { s: 0.82 }), { off: 2 })}
      ${at(1, person(262, 282, 'coBe', 'stand', { s: 0.92, flip: true }), { off: 2 })}
      ${at(2, person(196, 280, 'meNgheo', 'dig', { s: 0.82, prop: 'hoe' }), { off: 3 })}
      ${at(2, person(262, 282, 'coBe', 'hold', { s: 0.92, prop: 'basket' }), { off: 3 })}
      ${at(2, `<g class="sc-bob"><path d="M214 138 q3 6 0 8 q-3 -2 0 -8Z M278 172 q3 6 0 8 q-3 -2 0 -8Z" fill="#7DD3FC"/></g>`, { off: 3 })}
      ${at(3, `${chong(206, 286, 160)}${lying(214, 264, 'meNgheo', { s: 0.82, mood: 'sad', blanket: '#A8A29E', len: 116 })}`)}
      ${at(4, thuocPot(122, 284, 0.9))}
      ${at(3, person(296, 282, 'coBe', 'stand', { s: 0.92, mood: 'sad', flip: true }), { off: 4 })}
      ${at(4, person(296, 282, 'coBe', 'give', { s: 0.92, mood: 'sad', flip: true, prop: 'bowl' }))}
      ${at(5, person(362, 282, 'hangXom', 'point', { s: 0.8, flip: true }), { talk: '5,6' })}
      ${at(6, speech(300, 76, 128, 74, 350, 138, `
        <path d="M-50 18 Q-30 -6 -10 18Z" fill="#A7D98A"/><path d="M-34 18 Q-14 -10 8 18Z" fill="#86C06B"/>
        <path d="M-16 4 H16 M6 -2 L16 4 L6 10" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/>
        <g transform="translate(34 6)">${thuocPot(0, 12, 0.8)}</g>
        ${[[-4, -22], [10, -26], [52, -14]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="6" ry="2.6" fill="#22C55E" transform="rotate(-30 ${a} ${b})"/>`).join('')}`))}`),

    // Cảnh 2: cô bé nhờ hàng xóm trông mẹ rồi lên đường; lo không đủ tiền thuốc; thấy tay nải bên đường
    () => svg('Cô bé lên đường tìm thầy thuốc, thấy chiếc tay nải bên đường', `
      ${sky('t04s2sky', '#7DD3FC', '#F0FDF4')}
      ${cloud(130, 40, 0.8, 1)}${cloud(330, 52, 0.7, 4)}
      ${hills(170)}
      <g transform="translate(110 176) scale(0.42)">${thatchHouse(0, 0, 170, 66)}</g>
      ${at(1, `<g transform="translate(150 178)">${person(0, 0, 'hangXom', 'wave', { s: 0.32, flip: true })}</g>`)}
      ${tree(330, 176, 0.7)}${tree(420, 180, 0.9, '#4ADE80', '#22C55E')}
      ${grass(200, '#86EFAC')}
      ${path(266, 250, 40, '#E7C9A1')}
      ${tufts([[90, 226], [260, 222], [380, 300], [140, 300]])}
      ${flowers([[110, 240, '#F472B6'], [410, 238, '#FDE047'], [230, 296, '#FFFFFF']])}
      ${at(1, `<g class="sc-walk">${person(196, 282, 'coBe', 'walk', { s: 0.92 })}</g>`, { off: 2 })}
      ${at(2, `<g class="sc-walk">${person(196, 282, 'coBe', 'walk', { s: 0.92, mood: 'sad' })}</g>`)}
      ${at(2, thought(190, 82, 140, 70, 200, 150, `
        ${coin(-50, 0, 8)}${coin(-34, 6, 8)}${coin(-42, -12, 8)}
        ${word('?', 26, '#DC2626', -6, 0)}
        <g transform="translate(36 10)">${thuocPot(0, 0, 0.9)}</g>`))}
      ${at(3, tayNai(330, 262, 1.05))}
      ${at(3, sparkles([[312, 230, 6], [352, 226, 7]]))}`),

    // Cảnh 3: nhặt tay nải, miệng túi mở, thấy vàng; mừng rỡ: có tiền mua thuốc cho mẹ rồi
    () => svg('Cô bé nhặt tay nải, thấy những thỏi vàng lấp lánh', `
      ${sky('t04s3sky', '#7DD3FC', '#F0FDF4')}
      ${cloud(110, 40, 0.8, 2)}${cloud(380, 34, 0.6, 0)}
      ${hills(176)}
      ${tree(100, 190, 0.8)}${tree(400, 186, 0.7, '#4ADE80', '#22C55E')}
      ${grass(206, '#86EFAC')}
      ${path(280, 262, 40, '#E7C9A1')}
      ${tufts([[140, 230], [360, 228], [420, 296]])}
      ${at(1, tayNai(282, 280, 0.9), { off: 2 })}
      ${at(1, person(220, 284, 'coBe', 'point', { s: 0.95, mood: 'wow' }), { off: 2 })}
      ${at(2, person(220, 284, 'coBe', 'give', { s: 0.95, mood: 'wow', prop: 'bundle' }), { off: 4 })}
      ${at(2, `<g>
        <circle cx="330" cy="100" r="54" fill="#fff" stroke="#94A3B8" stroke-width="2"/>
        <path d="M296 128 L262 182" stroke="#94A3B8" stroke-width="1.6" stroke-dasharray="4 4"/>
        ${tayNai(330, 124, 2, true)}</g>`)}
      ${at(3, sparkles([[300, 66, 8], [362, 70, 9], [334, 52, 6]]))}
      ${at(4, person(220, 284, 'coBe', 'raise', { s: 0.95, mood: 'joy', prop: 'bundle' }), { talk: '5' })}
      ${at(5, speech(160, 86, 112, 70, 204, 150, `
        ${person(0, 28, 'meNgheo', 'cheer', { s: 0.32, mood: 'joy' })}
        <g transform="translate(-34 12)">${thuocPot(0, 0, 0.7)}</g>
        ${heart(34, 0, 1.4, '#F43F5E', 0)}`))}`),

    // Cảnh 4: phía xa có bà cụ lưng còng; cô bé đoán là tay nải của bà; nghĩ thương bà, không nên lấy; đuổi theo gọi
    () => svg('Cô bé thấy bà cụ lưng còng, nghĩ thương bà và chạy theo trả tay nải', `
      ${sky('t04s4sky', '#93C5FD', '#FEF9C3')}
      ${sun(110, 44, 16)}${cloud(260, 36, 0.7, 1)}
      ${hills(176)}
      ${tree(440, 186, 0.7)}
      ${grass(206, '#86EFAC')}
      <path d="M60 290 Q240 250 480 214" stroke="#E7C9A1" stroke-width="36" fill="none" stroke-linecap="round"/>
      ${tufts([[120, 236], [300, 284], [420, 290]])}
      ${at(1, `<g class="sc-walk" style="--d:0.4s">${person(352, 238, 'ba', 'cane', { s: 0.56, prop: 'cane' })}</g>`)}
      ${at(1, person(160, 282, 'coBe', 'point', { s: 0.95, mood: 'wow', prop: 'bundle' }), { off: 3 })}
      ${at(2, thought(250, 70, 130, 64, 186, 150, `
        ${tayNai(-36, 14, 0.9)}
        <path d="M-12 0 H12 M2 -6 L12 0 L2 6" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/>
        <g transform="translate(38 0)">${headOnly('ba', { s: 0.95 })}</g>`), { off: 3 })}
      ${at(3, person(160, 282, 'coBe', 'stand', { s: 0.95, mood: 'sad', prop: 'bundle' }), { off: 6 })}
      ${at(4, thought(250, 74, 150, 74, 186, 150, `
        <g transform="translate(-38 0)">${headOnly('ba', { mood: 'cry', s: 1.05 })}</g>
        <g data-l="5" transform="translate(30 4)">${goldBar(0, 0, 1.6)}
          <path d="M-16 -14 L16 14 M16 -14 L-16 14" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/></g>`))}
      ${at(6, `<g class="sc-walk">${person(196, 282, 'coBe', 'run', { s: 0.95, prop: 'bundle' })}</g>`, { talk: '6' })}
      ${at(6, soundWaves(236, 168, 1, '#F59E0B'))}`),

    // Cảnh 5: "Bà ơi…"; bà cười hiền hậu, khen cô bé; hiện thành bà tiên; hãy đưa ta về chữa bệnh cho mẹ
    () => svg('Bà cụ hiện thành bà tiên, khen cô bé hiếu thảo thật thà', `
      ${sky('t04s5sky', '#A5B4FC', '#FDF2F8')}
      ${cloud(120, 40, 0.8, 1, '#FDF2F8')}${cloud(380, 30, 0.7, 3, '#FDF2F8')}
      ${hills(180)}
      ${tree(90, 192, 0.8)}${tree(420, 190, 0.8, '#4ADE80', '#22C55E')}
      ${grass(208, '#86EFAC')}
      ${path(284, 270, 40, '#E7C9A1')}
      ${flowers([[110, 260, '#F472B6'], [400, 262, '#FDE047'], [130, 296, '#FFFFFF'], [380, 298, '#F472B6']])}
      ${at(1, person(176, 284, 'coBe', 'give', { s: 0.95, prop: 'bundle' }), { off: 4, talk: '1' })}
      ${at(4, person(176, 284, 'coBe', 'clap', { s: 0.95, mood: 'wow' }))}
      ${at(1, speech(150, 70, 96, 60, 180, 150, `${tayNai(-16, 14, 0.8)}${word('?', 28, '#2563EB', 26, 0)}`), { off: 2 })}
      ${at(1, person(304, 282, 'ba', 'cane', { s: 0.86, flip: true, prop: 'cane' }), { off: 2 })}
      ${at(2, person(304, 282, 'ba', 'cane', { s: 0.86, flip: true, prop: 'cane', mood: 'joy' }), { off: 4, talk: '3' })}
      ${at(3, `${heart(220, 120, 1.2, '#F43F5E', 0)}${heart(250, 100, 1.5, '#FB7185', 0.7)}`)}
      ${at(4, `<circle cx="304" cy="190" r="86" fill="#FEF9C3" opacity="0.55"/>${sparkles([[244, 120, 10], [360, 110, 9], [300, 80, 12], [372, 200, 7], [236, 210, 7]])}`)}
      ${at(4, person(304, 282, 'baTien', 'wave', { s: 0.9, flip: true }), { talk: '4,5,6' })}
      ${at(6, speech(160, 70, 120, 70, 268, 150, `
        <g transform="translate(-26 28) scale(0.34)">${thatchHouse(0, 0, 170, 66)}</g>
        <g transform="translate(34 2)">${person(0, 28, 'meNgheo', 'cheer', { s: 0.32, mood: 'joy' })}</g>`))}`),

    // Cảnh 6: mẹ khỏi bệnh, hai mẹ con sống hạnh phúc bên nhau
    () => svg('Người mẹ khỏi bệnh, hai mẹ con sống hạnh phúc', `
      ${sky('t04s6sky', '#7DD3FC', '#FEF3C7')}
      ${sun(424, 46, 18)}${cloud(150, 40, 0.8, 0)}
      ${field(176)}
      ${thatchHouse(150, 214, 170, 66)}
      ${tree(60, 214, 0.9)}${tree(440, 206, 0.8, '#4ADE80', '#22C55E')}
      <rect y="210" width="${W}" height="${H - 210}" fill="#E9D3A8"/>
      <path d="M0 210 H${W}" stroke="#C9A877" stroke-width="2"/>
      ${flowers([[100, 250, '#F472B6'], [130, 262, '#FDE047'], [420, 252, '#F472B6'], [390, 266, '#FFFFFF']])}
      ${at(1, person(214, 282, 'meNgheo', 'cheer', { s: 0.86, mood: 'joy' }), { off: 2 })}
      ${at(2, person(214, 282, 'meNgheo', 'clap', { s: 0.86, mood: 'joy' }))}
      ${at(1, person(358, 282, 'baTien', 'wave', { s: 0.84, flip: true }), { off: 2 })}
      ${at(1, sparkles([[200, 120, 8], [262, 110, 9], [300, 150, 6]]))}
      ${at(2, `<g class="sc-bob">${person(262, 100, 'baTien', 'float', { s: 0.36 })}</g>${sparkles([[212, 70, 6], [318, 64, 7]])}`)}
      ${at(1, person(284, 284, 'coBe', 'stand', { s: 0.94, mood: 'joy', flip: true }), { off: 2 })}
      ${at(2, person(284, 284, 'coBe', 'cheer', { s: 0.94, mood: 'joy', flip: true }))}
      ${at(2, `${heart(250, 130, 1.3, '#F43F5E', 0)}${heart(270, 108, 1.6, '#FB7185', 0.6)}${heart(292, 134, 1.1, '#F43F5E', 1.2)}`)}`),
  ],
};
