// Phim bài thơ "Kiến và chim bồ câu" (ngụ ngôn), Tuần 26 Tiếng Việt 3: 5 cảnh, mỗi khổ một cảnh.
// data-l="k": hiện từ dòng thứ k của khổ (đếm từ 1); data-off: ẩn từ dòng đó.
// Cảnh chung: bờ sông bên trái có cây với cành lả vươn ra mặt sông, dòng sông chảy xiết bên phải.
// Con vật tự vẽ trong file này: chú Kiến, Bồ Câu, cá, chiếc lá. Người bẫy chim: nhân vật thêm batChim (cùng kiểu cast.js).
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, tufts, flowers, sparkles, word, heart, LINE } from '../sceneKit.js';

// Người bẫy chim: áo nâu sờn, quần xám, ria mép (batChim trong cast.js).

const ANT = '#9A3412', ANT_D = '#6B2410';

/** Chú Kiến nhìn sang phải, (x, y) chỗ chân chạm; mood: happy · panic (giơ chân kêu cứu) · bite (há miệng cắn) · wow. */
function ant(x, y, s = 1, { flip = false, mood = 'happy', tilt = 0 } = {}) {
  const panic = mood === 'panic';
  const legs = [-8, -2, 4].map((lx, i) => panic
    ? `<path d="M${lx} -14 L${lx - 4 + i * 3} -26 L${lx - 2 + i * 5} -32" stroke="${ANT_D}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    : `<path d="M${lx} -12 L${lx - 5 + i * 3} -6 L${lx - 7 + i * 4} 0" stroke="${ANT_D}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  const mouth = mood === 'bite' || mood === 'panic' || mood === 'wow'
    ? `<ellipse cx="17" cy="-16" rx="2.4" ry="${mood === 'bite' ? 3 : 2}" fill="#7F1D1D"/>`
    : `<path d="M13 -16 Q16 -13.5 18.5 -16" stroke="#3B1A10" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${tilt})">
    <ellipse cx="-4" cy="0.5" rx="22" ry="2.6" fill="#000" opacity="${panic ? 0 : 0.12}"/>
    <path d="M10 -27 Q8 -36 2 -40 M14 -27 Q18 -36 24 -38" stroke="${ANT_D}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <circle cx="2" cy="-40" r="1.8" fill="${ANT_D}"/><circle cx="24" cy="-38" r="1.8" fill="${ANT_D}"/>
    ${legs}
    <ellipse cx="-17" cy="-14" rx="11.5" ry="9.5" fill="${ANT}" stroke="${ANT_D}" stroke-width="1"/>
    <ellipse cx="-20" cy="-18" rx="4" ry="2.4" fill="#C2410C" opacity="0.7"/>
    <ellipse cx="-2" cy="-14" rx="6" ry="5" fill="${ANT}" stroke="${ANT_D}" stroke-width="1"/>
    <circle cx="11" cy="-20" r="9.5" fill="${ANT}" stroke="${ANT_D}" stroke-width="1"/>
    <ellipse cx="13" cy="-23" rx="3.4" ry="3.8" fill="#fff"/><circle cx="${mood === 'wow' ? 13.4 : 14}" cy="${mood === 'wow' ? -24 : -22.6}" r="2" fill="#1C1917"/>
    <ellipse cx="7" cy="-17" rx="2.2" ry="1.4" fill="#F87171" opacity="0.7"/>
    ${mouth}
    ${panic ? `<path d="M5 -28 q-2 4 0 5 q2 -1 0 -5Z" fill="#7DD3FC"/>` : ''}</g>`;
}

/** Bồ Câu nhìn sang phải; fly: dang cánh bay; (x, y) chỗ chân đậu. */
function dove(x, y, s = 1, { flip = false, fly = false, leaf = false } = {}) {
  const wing = fly
    ? `<g class="sc-sway" style="--d:0.2s"><path d="M-6 -24 Q-18 -60 -40 -62 Q-30 -44 -22 -26Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
       <path d="M-30 -56 l6 10 M-24 -60 l4 12" stroke="#94A3B8" stroke-width="1"/></g>`
    : `<path d="M-14 -24 Q-2 -30 8 -20 Q-2 -12 -18 -14Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
       <path d="M-10 -20 q6 -2 10 1 M-12 -17 q6 -1 9 1" stroke="#94A3B8" stroke-width="0.8" fill="none"/>`;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    ${fly ? '' : `<path d="M-2 -8 V0 M4 -8 V0 M-5 0 H1 M1 0 H7" stroke="#F97316" stroke-width="1.8" stroke-linecap="round"/>`}
    <path d="M-16 -18 L-34 -14 L-32 -8 L-14 -12Z" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1"/>
    <ellipse cx="-2" cy="-18" rx="17" ry="11" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1"/>
    <circle cx="12" cy="-32" r="8.5" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1"/>
    <path d="M10 -24 Q14 -20 8 -16" stroke="#A78BFA" stroke-width="2.4" fill="none" opacity="0.6"/>
    <path d="M19 -34 L26 -31 L19 -29Z" fill="#F97316"/>
    <circle cx="14" cy="-34" r="1.8" fill="#1C1917"/><circle cx="14.6" cy="-34.6" r="0.6" fill="#fff"/>
    ${wing}
    ${leaf ? `<g transform="translate(26 -30) rotate(40)">${leafShape(0, 0, 0.5)}</g>` : ''}</g>`;
}

/** Chiếc lá xanh nằm ngang (x, y mép trái), s cỡ. */
const leafShape = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0 0 Q22 -16 48 -2 Q26 14 0 0Z" fill="#4ADE80" stroke="#15803D" stroke-width="1.2"/>
  <path d="M0 0 Q24 -2 46 -2 M14 -1 l6 -6 M26 -2 l6 -6 M18 -1 l6 5 M30 -2 l6 5" stroke="#15803D" stroke-width="1" fill="none"/>
  <path d="M0 0 l-6 3" stroke="#15803D" stroke-width="1.6" stroke-linecap="round"/></g>`;

/** Con cá há miệng (nhìn sang trái), x, y tâm. */
const fish = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:0.7s">
  <path d="M14 0 L32 -12 L30 0 L32 12Z" fill="#F97316" stroke="#C2410C" stroke-width="1"/>
  <path d="M-20 -4 Q-6 -18 16 -6 Q20 0 16 6 Q-6 18 -20 4 L-10 0Z" fill="#FB923C" stroke="#C2410C" stroke-width="1"/>
  <path d="M-2 -8 Q4 0 -2 8" stroke="#C2410C" stroke-width="1" fill="none"/>
  <circle cx="-10" cy="-6" r="3" fill="#fff"/><circle cx="-11" cy="-6" r="1.6" fill="#1C1917"/></g></g>`;

/** Hòn đá vôi to (x, y tâm). */
const rock = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-14 4 Q-16 -8 -6 -12 Q4 -16 12 -8 Q17 0 12 8 Q2 14 -8 11 Q-15 9 -14 4Z" fill="#E7E5E4" stroke="#78716C" stroke-width="1.2"/>
  <path d="M-6 -6 q4 -2 8 0 M2 4 q4 0 6 -3" stroke="#A8A29E" stroke-width="1.2" fill="none"/></g>`;

/** Lồng bẫy chim đan tre đặt dưới đất. */
const cage = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M-18 0 V-24 Q-18 -40 0 -40 Q18 -40 18 -24 V0Z" fill="#FEF3C7" fill-opacity="0.4" stroke="#A16207" stroke-width="1.6"/>
  ${[-10, -3, 4, 11].map(dx => `<path d="M${dx} 0 V-${dx > -4 && dx < 5 ? 39 : 34}" stroke="#A16207" stroke-width="1.2"/>`).join('')}
  <path d="M-20 0 H20 M-18 -14 H18" stroke="#92400E" stroke-width="2"/><path d="M0 -40 V-46" stroke="#92400E" stroke-width="2"/></g>`;

/** Gợn nước tròn quanh (x, y). */
const ripples = (x, y, w = 30) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w / 4}" fill="none" stroke="#E0F2FE" stroke-width="2"/>
  <ellipse cx="${x}" cy="${y}" rx="${w * 0.6}" ry="${w / 7}" fill="none" stroke="#F0F9FF" stroke-width="1.6"/>`;

/** Bờ sông bên trái, cây có cành lả vươn ra sông, sông chảy xiết bên phải. */
const riverSide = (id, { top = '#7DD3FC', bottom = '#E0F2FE', branch = true } = {}) => `
  ${sky(id, top, bottom)}
  <path d="M0 150 Q120 130 240 146 T480 140 V176 H0Z" fill="#86B7A0"/>
  <rect y="168" width="${W}" height="${H - 168}" fill="#38BDF8"/>
  <path d="M0 168 Q240 160 480 168 V176 H0Z" fill="#7DD3FC"/>
  ${[192, 214, 238, 262, 284].map((y, i) => `<g class="sc-drift" style="--d:${i * 1.3}s"><path d="M${250 + (i % 2) * 30} ${y} q12 -5 24 0 t24 0 M${360 - (i % 2) * 20} ${y + 8} q12 -5 24 0 t24 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/></g>`).join('')}
  <path d="M0 178 Q120 172 196 186 Q224 194 232 214 Q240 252 262 300 H0Z" fill="#65A30D"/>
  <path d="M0 184 Q120 180 190 192 Q216 200 222 218 Q230 254 250 300 H0Z" fill="#84CC16"/>
  <path d="M190 192 Q216 200 222 218 Q230 254 250 300" stroke="#A16207" stroke-width="4" fill="none" opacity="0.5"/>
  ${tufts([[96, 222], [150, 262], [70, 280]])}
  <g><path d="M92 200 L98 96 H112 L116 200Z" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
    ${branch ? `<path d="M110 120 Q200 92 300 128" stroke="#92400E" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M110 120 Q200 92 300 128" stroke="#A16207" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g class="sc-sway" style="--d:1s">${[[180, 104], [230, 108], [272, 118], [300, 130]].map(([lx, ly], i) => `<g transform="translate(${lx} ${ly}) rotate(${60 + i * 10})">${leafShape(0, 0, 0.4)}</g>`).join('')}</g>` : ''}
    <circle cx="80" cy="96" r="30" fill="#16A34A"/><circle cx="128" cy="86" r="32" fill="#16A34A"/><circle cx="104" cy="66" r="32" fill="#22C55E"/><circle cx="148" cy="104" r="20" fill="#22C55E"/></g>`;

export default [
  // Khổ 1: Kiến ra sông chảy xiết uống nước; sóng cuốn khỏi bờ; ngoi lên chìm xuống, cá chực ăn
  () => svg('Chú Kiến ra sông uống nước thì bị sóng cuốn đi', `
    ${riverSide('t26s1sky')}
    ${sun(392, 40, 18)}${cloud(250, 40, 0.6, 1)}
    ${at(1, `${[[296, 186], [356, 204], [364, 232]].map(([ax, ay]) => `<path d="M${ax} ${ay} h34 l-6 -5 M${ax + 34} ${ay} l-6 5" stroke="#0369A1" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}`)}
    ${at(1, ant(200, 216, 1.3), { off: 2 })}
    ${at(2, `${ant(214, 222, 1.3, { tilt: 24 })}<circle cx="240" cy="222" r="2.4" fill="#E0F2FE"/><circle cx="246" cy="214" r="1.8" fill="#E0F2FE"/>`, { off: 3 })}
    ${at(3, `<path d="M222 236 Q240 196 274 192 Q300 194 304 214 Q290 202 276 210 Q262 222 268 240Z" fill="#BAE6FD" stroke="#0EA5E9" stroke-width="1.6"/>`, { off: 4 })}
    ${at(3, ant(276, 196, 1.2, { mood: 'panic', tilt: -20 }), { off: 4 })}
    ${at(4, `<g class="sc-bob">${ant(318, 246, 1.2, { mood: 'panic' })}</g>${ripples(310, 248, 28)}`)}
    ${at(4, fish(372, 272, 1.1))}`),

  // Khổ 2: Bồ Câu đậu cành lả, ngắt chiếc lá thả rơi; lá trôi tới, Kiến leo lên, trôi vào bờ an toàn
  () => svg('Bồ Câu thả chiếc lá cứu Kiến', `
    ${riverSide('t26s2sky')}
    ${sun(400, 40, 18)}${cloud(200, 36, 0.6, 2)}
    ${at(1, dove(286, 126, 1.1, { flip: true }), { off: 2 })}
    ${at(2, dove(286, 126, 1.1, { flip: true, leaf: true }))}
    ${at(1, `<g class="sc-bob">${ant(330, 246, 1.1, { mood: 'panic' })}</g>${ripples(322, 248, 26)}`, { off: 3 })}
    ${at(2, `<path d="M262 104 Q250 160 300 210" stroke="#15803D" stroke-width="1.6" stroke-dasharray="4 5" fill="none"/>
      <g transform="translate(286 182) rotate(30)">${leafShape(0, 0, 0.9)}</g>`, { off: 3 })}
    ${at(3, `${leafShape(300, 250, 1.1)}${ripples(326, 250, 32)}<g class="sc-bob">${ant(338, 248, 1.1, { mood: 'wow' })}</g>`, { off: 4 })}
    ${at(4, `${leafShape(232, 246, 1.1)}${ant(262, 244, 1.1, { mood: 'happy', flip: true })}
      <path d="M332 252 q-20 -6 -40 0" stroke="#0369A1" stroke-width="2.4" stroke-dasharray="5 5" fill="none"/>
      ${sparkles([[212, 220, 7], [284, 214, 6]])}`)}`),

  // Khổ 3: bất ngờ xuất hiện người bẫy chim cạnh chỗ kiến bò; bác cầm cục đá vôi to, giơ lên nhằm ném Bồ Câu
  () => svg('Người bẫy chim cầm hòn đá định ném Bồ Câu', `
    ${riverSide('t26s3sky', { top: '#93C5FD', bottom: '#F0F9FF' })}
    ${cloud(380, 44, 0.7, 1)}
    ${dove(286, 126, 1.1, { flip: true })}
    ${at(1, `${word('!', 26, '#DC2626', 200, 150)}${word('!', 20, '#DC2626', 214, 140)}`, { off: 2 })}
    ${at(1, person(160, 288, 'batChim', 'stand', { s: 0.86, mood: 'wow' }), { off: 2 })}
    ${at(1, `<g><circle cx="150" cy="262" r="40" fill="#15803D"/><circle cx="190" cy="272" r="32" fill="#16A34A"/></g>`, { off: 2 })}
    ${at(2, cage(110, 284))}
    ${at(2, person(160, 288, 'batChim', 'stand', { s: 0.86 }), { off: 3 })}
    ${at(2, `<g class="sc-walk">${ant(202, 284, 1)}</g>`)}
    ${at(3, `${person(160, 288, 'batChim', 'give', { s: 0.86 })}${rock(160 + 56 * 0.86, 288 - 110 * 0.86 - 4, 1.2)}`, { off: 4 })}
    ${at(4, `${person(160, 288, 'batChim', 'raise', { s: 0.86 })}${rock(160 + 23 * 0.86, 288 - 168 * 0.86 - 6, 1.2)}
      <path d="M196 132 Q240 108 262 112" stroke="#DC2626" stroke-width="2" stroke-dasharray="5 5" fill="none"/>`)}`),

  // Khổ 4: Kiến hiểu chuyện, cắn ngay vào ngón chân người; bác giật mình đánh rơi; đá tòm xuống nước, chim bay đi
  () => svg('Kiến cắn chân người bẫy chim, hòn đá rơi xuống nước, Bồ Câu bay đi', `
    ${riverSide('t26s4sky', { top: '#93C5FD', bottom: '#F0F9FF' })}
    ${cloud(380, 44, 0.7, 1)}
    ${cage(110, 284)}
    ${at(1, dove(286, 126, 1.1, { flip: true }), { off: 4 })}
    ${at(1, `${person(160, 288, 'batChim', 'raise', { s: 0.86 })}${rock(160 + 23 * 0.86, 288 - 168 * 0.86 - 6, 1.2)}`, { off: 3 })}
    ${at(3, person(160, 288, 'batChim', 'cheer', { s: 0.86, mood: 'wow' }))}
    ${at(1, `${ant(208, 286, 1.1, { flip: true, mood: 'wow' })}${word('!', 22, '#DC2626', 196, 230)}`, { off: 2 })}
    ${at(2, `${ant(196, 286, 1.1, { flip: true, mood: 'bite' })}
      <path class="sc-twinkle" d="M176 256 l4 8 l8 -2 l-5 7 l6 5 l-9 0 l-1 8 l-4 -7 l-7 4 l2 -8 l-7 -4 l8 -2Z" fill="#FDE047" stroke="#DC2626" stroke-width="1.2"/>`)}
    ${at(3, `${rock(230, 170, 1.2)}<path d="M214 150 q8 -6 16 0" stroke="#78716C" stroke-width="1.6" fill="none"/>`, { off: 4 })}
    ${at(4, `<g transform="translate(290 222)">${[-22, -10, 0, 10, 22].map((dx, i) => `<path d="M${dx * 0.4} -2 Q${dx} -${18 + (i % 2) * 10} ${dx * 1.4} -${4 + (i % 3) * 4}" stroke="#E0F2FE" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}
      ${[[-20, -26], [16, -30], [0, -40]].map(([dx, dy]) => `<circle cx="${dx}" cy="${dy}" r="3" fill="#E0F2FE"/>`).join('')}</g>${ripples(290, 224, 34)}`)}
    ${at(4, `<g class="sc-bob">${dove(358, 96, 1.1, { fly: true })}</g>`)}`),

  // Khổ 5: Làm điều tốt sẽ thường khi nhận về việc tốt
  () => svg('Kiến và Bồ Câu là bạn tốt của nhau', `
    ${riverSide('t26s5sky', { top: '#7DD3FC', bottom: '#FEF9C3', branch: false })}
    ${sun(396, 44, 20)}${cloud(260, 36, 0.6, 2)}
    ${flowers([[70, 262, '#F472B6'], [120, 286, '#FDE047'], [190, 280, '#A78BFA']])}
    ${at(1, `${ant(150, 262, 1.5)}${dove(230, 264, 1.5, { flip: true })}`)}
    ${at(1, `${heart(186, 196, 1.6, '#F43F5E', 0)}`)}
    ${at(2, `${heart(160, 186, 1.1, '#FB7185', 0.6)}${heart(212, 176, 1.2, '#F472B6', 1.1)}${sparkles([[130, 170, 8], [250, 160, 8], [190, 150, 6]])}`)}`),
];
