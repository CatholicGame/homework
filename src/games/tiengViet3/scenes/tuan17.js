// Phim bài đọc "Quê hương", Tuần 17 Tiếng Việt 3: 6 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: Thảo (thao), cái Tí (ti), bà (ba), mẹ (me), các anh chị lớn (cun, conTrai) trong cast.js.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, moon, stars, grass, tufts, flowers, tree, sparkles, heart, thought, speech, word, soundWaves, thatchHouse, cityRow, LINE } from '../sceneKit.js';

/** Cánh đồng lúa nhiều thửa (y mép trên); ripe: lúa chín vàng. */
const fields = (y, ripe = false) => {
  const c = ripe ? ['#FACC15', '#EAB308', '#FDE047'] : ['#86EFAC', '#4ADE80', '#A3E635'];
  return `<path d="M0 ${y} H480 V300 H0Z" fill="${c[0]}"/>
    <path d="M0 ${y + 22} Q240 ${y + 10} 480 ${y + 22} V${y + 50} Q240 ${y + 38} 0 ${y + 50}Z" fill="${c[1]}"/>
    <path d="M0 ${y + 50} H480" stroke="#A16207" stroke-width="2" opacity="0.4"/>
    ${Array.from({ length: 16 }, (_, i) => `<g transform="translate(${i * 31 + 8} ${y + 8 + (i % 3) * 14})"><g class="sc-sway" style="--d:${(i * 0.4) % 3}s">
      <path d="M0 0 l-3 -10 M0 0 l0 -12 M0 0 l3 -10" stroke="${ripe ? '#A16207' : '#16A34A'}" stroke-width="1.6" stroke-linecap="round"/>
      ${ripe ? '<path d="M0 -12 q5 2 6 8" stroke="#CA8A04" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : ''}</g></g>`).join('')}`;
};

/** Lũy tre xanh phía xa. */
const bamboo = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[-14, 0, 14].map((dx, i) => `<g class="sc-sway" style="--d:${i * 0.5}s"><path d="M${dx} 0 Q${dx + 6} -50 ${dx + 14 - i * 6} -90" stroke="#65A30D" stroke-width="3" fill="none"/>
    ${[-30, -50, -70, -86].map((dy, k) => `<ellipse cx="${dx + 8 + (k % 2 ? 8 : -6) - i * 2}" cy="${dy}" rx="10" ry="3.4" fill="${k % 2 ? '#4D7C0F' : '#65A30D'}" transform="rotate(${k % 2 ? 20 : -20} ${dx + 8} ${dy})"/>`).join('')}</g>`).join('')}</g>`;

/** Con trâu hiền (x giữa, y chân), mặt quay sang phải (flip: sang trái). */
const buffalo = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  ${[-30, -16, 14, 28].map(dx => `<rect x="${dx - 6}" y="-30" width="12" height="30" rx="3" fill="${dx === -16 || dx === 14 ? '#3F3F46' : '#52525B'}" stroke="${LINE}" stroke-width="1"/>`).join('')}
  <ellipse cx="0" cy="-42" rx="42" ry="22" fill="#52525B" stroke="${LINE}" stroke-width="1.2"/>
  <path d="M-42 -46 q-10 10 -6 22" stroke="#3F3F46" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="44" cy="-46" rx="16" ry="14" fill="#52525B" stroke="${LINE}" stroke-width="1.2"/>
  <ellipse cx="54" cy="-38" rx="9" ry="7" fill="#A8A29E" stroke="${LINE}" stroke-width="0.9"/>
  <circle cx="51" cy="-38" r="1.2" fill="${LINE}"/><circle cx="57" cy="-38" r="1.2" fill="${LINE}"/>
  <path d="M34 -56 Q20 -74 36 -76 Q30 -66 40 -58Z M50 -58 Q64 -76 72 -64 Q62 -68 54 -56Z" fill="#E7E5E4" stroke="${LINE}" stroke-width="0.9"/>
  <ellipse cx="30" cy="-52" rx="6" ry="3" fill="#3F3F46" transform="rotate(-20 30 -52)"/>
  <circle cx="42" cy="-50" r="2.2" fill="#fff"/><circle cx="42.6" cy="-50" r="1.3" fill="#111827"/>
  <circle cx="54" cy="-50" r="2.2" fill="#fff"/><circle cx="54.6" cy="-50" r="1.3" fill="#111827"/></g>`;

/** Giàn hoa thiên lí: cột tre, dàn ngang, lá xanh và chùm hoa xanh vàng (x trái, y đất, rộng w). */
const thienLi = (x, y, w = 150, scent = false) => `<g>
  <path d="M${x} ${y} V${y - 110} M${x + w} ${y} V${y - 110}" stroke="#A16207" stroke-width="5" stroke-linecap="round"/>
  <path d="M${x - 6} ${y - 110} H${x + w + 6}" stroke="#A16207" stroke-width="4" stroke-linecap="round"/>
  ${Array.from({ length: 9 }, (_, i) => `<g class="sc-sway" style="--d:${i * 0.4}s"><ellipse cx="${x + i * w / 8}" cy="${y - 112 + (i % 2) * 6}" rx="16" ry="9" fill="${i % 2 ? '#16A34A' : '#22C55E'}"/></g>`).join('')}
  ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${x + 14 + i * (w - 28) / 5} ${y - 100})"><g class="sc-sway" style="--d:${i * 0.6}s">
    ${[[0, 0], [-3, 5], [3, 5], [0, 10]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" fill="#BEF264" stroke="#65A30D" stroke-width="0.6"/>`).join('')}</g></g>`).join('')}
  ${scent ? [0, 1, 2].map(i => `<path class="sc-rise" style="--d:${i * 0.8}s" d="M${x + 30 + i * 46} ${y - 84} q-6 -8 0 -16 q6 -8 0 -16" stroke="#F9A8D4" stroke-width="2.2" fill="none" stroke-linecap="round"/>`).join('') : ''}</g>`;

/** Cánh diều bay (x, y), dây xuống tới tay (hx, hy). */
const kite = (x, y, hx, hy) => `<path d="M${x} ${y + 18} Q${(x + hx) / 2 + 30} ${(y + hy) / 2} ${hx} ${hy}" stroke="#78716C" stroke-width="1" fill="none"/>
  <g transform="translate(${x} ${y})"><g class="sc-bob">
    <path d="M0 -24 L18 0 L0 18 L-18 0Z" fill="#F87171" stroke="${LINE}" stroke-width="1"/><path d="M0 -24 V18 M-18 0 H18" stroke="#FDE68A" stroke-width="1.6"/>
    <path d="M0 18 q-8 12 0 20 q8 8 0 18" stroke="#FACC15" stroke-width="2" fill="none"/></g></g>`;

/** Con châu chấu xanh nhỏ nhảy. */
const grasshopper = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <ellipse cx="0" cy="0" rx="12" ry="5" fill="#84CC16" stroke="#3F6212" stroke-width="0.9"/>
  <circle cx="12" cy="-2" r="4.4" fill="#84CC16" stroke="#3F6212" stroke-width="0.9"/><circle cx="13.6" cy="-3" r="1.2" fill="#1F2937"/>
  <path d="M-2 -2 L-10 -12 L-16 4 M4 3 l-2 6 M14 -6 q6 -10 12 -10" stroke="#3F6212" stroke-width="1.4" fill="none" stroke-linecap="round"/></g></g>`;

/** Mái đình cong, cột gỗ, sân gạch (x giữa, y nền). */
const dinh = (x, y, w = 240) => `<g transform="translate(${x} ${y})">
  <rect x="${-w / 2}" y="-8" width="${w}" height="8" fill="#78716C"/>
  <rect x="${-w / 2 + 16}" y="-86" width="${w - 32}" height="78" fill="#7C5A3A" stroke="${LINE}" stroke-width="1"/>
  ${[-0.36, -0.12, 0.12, 0.36].map(k => `<rect x="${k * w - 4}" y="-86" width="8" height="78" fill="#57381F"/>`).join('')}
  ${[-0.24, 0, 0.24].map(k => `<rect x="${k * w - 14}" y="-76" width="28" height="68" fill="#FBBF24" opacity="0.55"/>`).join('')}
  <path d="M${-w / 2 - 24} -82 Q${-w / 2 - 30} -96 ${-w / 2 - 40} -102 Q${-w / 2} -92 ${-w / 2 + 28} -126 H${w / 2 - 28} Q${w / 2} -92 ${w / 2 + 40} -102 Q${w / 2 + 30} -96 ${w / 2 + 24} -82Z" fill="#7F1D1D" stroke="${LINE}" stroke-width="1.2"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${-w / 2 + 32 + i * (w - 64) / 8} -124 L${-w / 2 + 6 + i * (w - 12) / 8} -86" stroke="#450A0A" stroke-width="1.2"/>`).join('')}
  <path d="M${-w / 2 + 28} -126 H${w / 2 - 28}" stroke="#A8A29E" stroke-width="3"/></g>`;

/** Đom đóm sáng nhấp nháy. */
const fireflies = (list) => list.map(([x, y], i) => `<g class="sc-bob" style="--d:${(i * 0.37) % 2}s"><g class="sc-twinkle" style="--d:${(i * 0.53) % 2}s">
  <circle cx="${x}" cy="${y}" r="7" fill="#FEF08A" opacity="0.35"/><circle cx="${x}" cy="${y}" r="2.6" fill="#FDE047"/></g></g>`).join('');

/** Xe ô tô nhỏ, đèn pha sáng (x giữa, y bánh). */
const car = (x, y, c = '#EF4444', flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
  <path d="M30 -14 L90 -24 L90 -4 Z" fill="#FEF9C3" opacity="0.5"/>
  <path d="M-30 -6 V-18 Q-28 -22 -18 -22 L-10 -34 H14 L22 -22 H28 Q32 -22 32 -16 V-6Z" fill="${c}" stroke="${LINE}" stroke-width="1"/>
  <path d="M-7 -31 H0 V-23 H-14Z M4 -31 H12 L18 -23 H4Z" fill="#BAE6FD"/>
  <circle cx="30" cy="-14" r="2.6" fill="#FEF08A"/>
  ${[-18, 18].map(dx => `<circle cx="${dx}" cy="-5" r="6" fill="#1F2937"/><circle cx="${dx}" cy="-5" r="2.4" fill="#94A3B8"/>`).join('')}</g>`;

export default {
  sentences: true,
  groups: [[0, 1], [2, 3], [4], [5, 6, 7], [8, 9, 10], [11, 12, 13]],
  scenes: [
    // Cảnh 1: quê Thảo là vùng nông thôn trù phú; Thảo rất yêu quê hương mình
    () => svg('Quê Thảo là vùng nông thôn trù phú', `
      ${sky('t17s1sky', '#7DD3FC', '#F0FDF4')}
      ${sun(392, 50, 18)}${cloud(140, 42, 0.8, 0)}${cloud(290, 30, 0.6, 2)}
      <path d="M0 150 Q100 120 200 146 Q300 120 480 140 V200 H0Z" fill="#A7F3D0"/>
      ${bamboo(110, 176, 0.9)}${bamboo(390, 172, 0.8)}
      ${thatchHouse(310, 178, 110, 40)}
      ${fields(176)}
      <path d="M0 240 Q240 226 480 244 V300 H0Z" fill="#4ADE80"/>
      ${at(1, buffalo(150, 248, 0.5))}
      ${at(2, person(244, 290, 'thao', 'cheer', { s: 0.92, mood: 'joy' }))}
      ${at(2, `${heart(196, 150, 1.2, '#F43F5E', 0)}${heart(296, 140, 1.4, '#FB7185', 0.6)}${heart(226, 104, 1.1, '#F43F5E', 1.2)}`)}
      ${flowers([[120, 290, '#F472B6'], [360, 286, '#FDE047'], [400, 296, '#A78BFA']])}`),

    // Cảnh 2: nhà tranh của bà, giàn thiên lí thơm ngát, tiếng võng mẹ đưa, đám trẻ tinh nghịch; Thảo lớn lên ở đây
    () => svg('Nhà tranh của bà, giàn thiên lí và cánh võng mẹ đưa', `
      ${sky('t17s2sky', '#93C5FD', '#FEF9C3')}
      ${cloud(120, 36, 0.7, 1)}
      ${tree(410, 210, 0.9)}
      ${thatchHouse(130, 208, 150, 60)}
      <rect y="206" width="${W}" height="${H - 206}" fill="#E7C9A1"/>
      ${grass(270, '#86EFAC')}
      ${at(1, thienLi(250, 262, 150, true))}
      ${at(1, `<g class="sc-sway" style="--d:0.4s"><path d="M250 172 Q325 232 400 172" stroke="#78716C" stroke-width="1.6" fill="none"/>
        <path d="M264 180 Q325 236 386 180 Q325 214 264 180Z" fill="#F87171" stroke="${LINE}" stroke-width="1"/>
        <path d="M276 190 Q325 222 374 190" stroke="#FDE68A" stroke-width="1.4" fill="none"/></g>`)}
      ${at(1, person(232, 288, 'me', 'give', { s: 0.8 }), { talk: '' })}
      ${at(1, person(114, 286, 'ba', 'stand', { s: 0.78, mood: 'joy' }))}
      ${at(1, person(318, 296, 'cun', 'run', { s: 0.6 }))}
      ${at(1, person(380, 296, 'ti', 'run', { s: 0.6, flip: true }))}
      ${at(2, person(170, 290, 'thao', 'wave', { s: 0.72 }))}
      ${at(2, sparkles([[176, 150, 7], [120, 140, 8]]))}`),

    // Cảnh 3: cánh đồng lúa chín, hương gạo mẹ sàng sảy, cánh diều tuổi thơ bay cao mãi
    () => svg('Cánh đồng lúa chín, mẹ sàng gạo, Thảo thả diều', `
      ${sky('t17s3sky', '#7DD3FC', '#FEF3C7')}
      ${sun(110, 52, 18)}${cloud(250, 40, 0.6, 1)}
      ${bamboo(420, 196, 0.8)}
      ${fields(192, true)}
      <path d="M0 250 Q240 238 480 252 V300 H0Z" fill="#D9B77E"/>
      ${at(1, person(150, 288, 'me', 'hold', { s: 0.84, prop: 'calf' }))}
      ${at(1, `<g transform="translate(150 204)"><ellipse rx="30" ry="8" fill="#D6A26B" stroke="#92400E" stroke-width="1.2"/><ellipse rx="23" ry="4.4" fill="#FEF3C7"/>
        ${[-12, -2, 8, 16].map((dx, i) => `<circle class="sc-rise" style="--d:${i * 0.7}s" cx="${dx}" cy="-8" r="1.6" fill="#FEF3C7" stroke="#CA8A04" stroke-width="0.4"/>`).join('')}</g>`)}
      ${at(1, person(316, 290, 'thao', 'raise', { s: 0.86, mood: 'joy' }))}
      ${at(1, kite(372, 64, 340, 200))}
      ${at(1, sparkles([[380, 120, 7], [300, 70, 6]]))}`),

    // Cảnh 4: Thảo nhớ những ngày ở quê; sáng chăn trâu với cái Tí, cười rũ rượi; chiều bắt châu chấu, cào cào
    () => svg('Thảo và cái Tí chăn trâu, chiều theo anh chị bắt châu chấu', `
      ${sky('t17s4sky', '#93C5FD', '#FEF9C3')}
      ${sun(400, 58, 18)}${cloud(150, 40, 0.7, 0)}
      ${bamboo(90, 194, 0.8)}
      ${fields(190)}
      <path d="M0 246 Q240 232 480 248 V300 H0Z" fill="#86EFAC"/>
      ${tufts([[110, 280], [300, 270], [410, 290]])}
      ${at(1, buffalo(150, 278, 0.82))}
      ${at(1, person(236, 290, 'thao', 'walk', { s: 0.86 }), { off: 2 })}
      ${at(1, person(296, 290, 'ti', 'walk', { s: 0.86, flip: true }), { off: 2 })}
      ${at(2, person(236, 290, 'thao', 'clap', { s: 0.86, mood: 'joy' }))}
      ${at(2, person(296, 290, 'ti', 'point', { s: 0.86, flip: true, mood: 'joy' }), { talk: '2' })}
      ${at(2, speech(296, 132, 64, 36, 290, 166, `<circle r="12" fill="#FDE047" stroke="#CA8A04"/><path d="M-7 -3 q3 -4 6 0 M1 -3 q3 -4 6 0" stroke="#78350F" stroke-width="1.4" fill="none"/><path d="M-6 3 Q0 12 6 3Z" fill="#B4363C"/>`))}
      ${at(3, person(356, 292, 'conTrai', 'run', { s: 0.8, flip: true }))}
      ${at(3, `${grasshopper(340, 236, 0.9, 0)}${grasshopper(410, 222, 0.8, 0.7)}${grasshopper(196, 206, 0.8, 1.3)}`)}`),

    // Cảnh 5: tối ra sân đình chơi, xem đom đóm như những ngọn đèn nhỏ; màn đêm như áo nhung đen thêu kim tuyến
    () => svg('Tối ở sân đình, đom đóm bay như những ngọn đèn nhỏ', `
      ${sky('t17s5sky', '#0F172A', '#1E3A5F')}
      ${moon(388, 50, 18)}
      ${dinh(232, 218, 230)}
      ${tree(96, 222, 0.9, '#166534', '#14532D')}
      <rect y="216" width="${W}" height="${H - 216}" fill="#57534E"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 60} 216 L${i * 60 - 40} 300" stroke="#44403C" stroke-width="1.2"/>`).join('')}
      <path d="M0 250 H${W}" stroke="#44403C" stroke-width="1.2"/>
      ${at(1, person(176, 290, 'thao', 'point', { s: 0.82 }))}
      ${at(1, person(246, 290, 'ti', 'cheer', { s: 0.82, mood: 'joy' }))}
      ${at(1, person(316, 290, 'cun', 'lookUp', { s: 0.82 }))}
      ${at(2, fireflies([[150, 150], [210, 170], [260, 140], [300, 180], [350, 150], [380, 200], [130, 200], [230, 110], [330, 110]]))}
      ${at(3, stars([[110, 30], [150, 60], [200, 26], [250, 52], [300, 22], [340, 70], [420, 100], [120, 100], [280, 86]], '#FDE68A'))}
      ${at(3, sparkles([[180, 40, 6], [320, 40, 7], [140, 70, 5], [230, 80, 5]], '#FDE68A'))}`),

    // Cảnh 6: Thảo chuyển về thành phố; đêm thành phố ồn ã; Thảo ngẩng lên đếm sao, mong về quê
    () => svg('Đêm thành phố, Thảo ngẩng lên đếm sao và nhớ quê', `
      ${sky('t17s6sky', '#1E1B4B', '#4338CA')}
      ${cityRow(232, [[40, 70, 150, '#475569'], [116, 54, 110, '#334155'], [176, 64, 170, '#475569'], [246, 50, 120, '#334155'], [302, 70, 150, '#475569'], [378, 60, 120, '#334155'], [444, 50, 140, '#475569']])}
      <rect y="232" width="${W}" height="${H - 232}" fill="#374151"/>
      <path d="M0 262 H${W}" stroke="#FDE68A" stroke-width="3" stroke-dasharray="16 12"/>
      ${at(1, person(160, 292, 'thao', 'walk', { s: 0.86 }), { off: 3 })}
      ${at(2, `${car(250, 256, '#EF4444')}${car(380, 288, '#3B82F6', true)}`)}
      ${at(2, `${soundWaves(300, 200, 1.1, '#FDE68A')}${word('♪', 22, '#FDE68A', 130, 170)}${word('♫', 20, '#F9A8D4', 360, 180)}`)}
      ${at(3, person(160, 292, 'thao', 'lookUp', { s: 0.86 }))}
      ${at(3, stars([[100, 30], [150, 50], [220, 20], [260, 46], [300, 30], [400, 40]], '#FEF9C3'))}
      ${at(3, thought(300, 70, 130, 70, 186, 150, `
        <path d="M-40 26 H40 V12 Q0 4 -40 12Z" fill="#4ADE80"/>
        <g transform="translate(-14 14) scale(0.4)">${thatchHouse(0, 0, 110, 40)}</g>
        <g transform="translate(30 6) scale(0.5)">${buffalo(0, 0, 0.6)}</g>
        ${fireflies([[-30, -18], [10, -22], [34, -12]])}`))}`),
  ],
};
