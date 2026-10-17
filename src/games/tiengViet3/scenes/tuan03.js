// Phim truyện "Khu vườn trên sân thượng", Tuần 3 Tiếng Việt 3: 4 cảnh, mỗi cảnh một nhóm đoạn văn.
// data-l="n": hiện từ đoạn thứ n của cảnh (đếm từ 1); data-off: ẩn từ đoạn đó; data-talk: nhân vật nói ở đoạn đó thì nhún.
import { person } from '../cast.js';
import { W, H, svg, at, talkAt, sky, cloud, sun, cityRow, heart, sparkles, thought, LINE } from '../sceneKit.js';

/** Sân thượng: tường lan can phía sau, sàn gạch. */
const roof = () => `
  ${cityRow(200, [[40, 60, 120, '#CBD5E1'], [110, 46, 90, '#E2E8F0'], [300, 54, 130, '#CBD5E1'], [362, 70, 96, '#E2E8F0'], [440, 50, 116, '#CBD5E1']])}
  <rect y="186" width="${W}" height="${H - 186}" fill="#E7D3B8"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 60} 210 L${i * 60 - 30} 300" stroke="#D6BC98" stroke-width="1.4"/>`).join('')}
  <path d="M0 236 H${W} M0 268 H${W}" stroke="#D6BC98" stroke-width="1.4"/>
  <rect y="168" width="${W}" height="24" fill="#F5F5F4" stroke="${LINE}" stroke-width="1"/>
  <rect y="164" width="${W}" height="6" fill="#A8A29E"/>`;

/** Chậu cây làm từ chai nhựa nằm ngang, khoét miệng, có đất và cây (size 0: mới gieo, 1: mầm, 2: rau lớn, 3: cà chua). */
function bottlePot(x, y, size = 1, i = 0) {
  const plant = [
    `${[-8, 0, 8].map(dx => `<circle cx="${dx}" cy="-8" r="1.6" fill="#78350F"/>`).join('')}`,
    `${[-10, 2, 12].map(dx => `<path d="M${dx} -8 v-8" stroke="#16A34A" stroke-width="1.6"/><ellipse cx="${dx - 3}" cy="-17" rx="3.6" ry="2" fill="#4ADE80"/><ellipse cx="${dx + 3}" cy="-17" rx="3.6" ry="2" fill="#22C55E"/>`).join('')}`,
    `${[-12, -2, 9].map((dx, k) => `<ellipse cx="${dx}" cy="-18" rx="9" ry="12" fill="${k % 2 ? '#22C55E' : '#4ADE80'}"/><path d="M${dx} -8 V-26" stroke="#15803D" stroke-width="1.2"/>`).join('')}`,
    `<path d="M-6 -8 Q-8 -30 -2 -44 M8 -8 Q10 -30 4 -42" stroke="#15803D" stroke-width="2" fill="none"/>
     ${[[-14, -24], [12, -30], [-6, -38], [10, -18]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="6" ry="3.4" fill="#22C55E"/>`).join('')}
     ${[[-8, -20], [6, -34], [10, -22]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="4.4" fill="#EF4444" stroke="#B91C1C" stroke-width="0.6"/>`).join('')}`,
  ][size];
  return `<g transform="translate(${x} ${y})"><g class="sc-sway" style="--d:${(i * 0.7) % 3}s">${plant}</g>
    <path d="M-24 -8 H20 Q26 -8 26 0 Q26 8 20 8 H-24 Q-28 8 -28 0 Q-28 -8 -24 -8Z" fill="#BAE6FD" fill-opacity="0.85" stroke="#0284C7" stroke-width="1"/>
    <path d="M-22 -7 H19 V-2 H-22Z" fill="#92400E"/>
    <rect x="26" y="-3.4" width="6" height="7" rx="1.5" fill="#0EA5E9"/>
    <path d="M-20 4 H16" stroke="#fff" stroke-width="1.6" opacity="0.7"/></g>`;
}

/** Con sâu xanh trên lá. */
const caterpillar = (x, y) => `<g transform="translate(${x} ${y})"><g class="sc-walk">${[0, 5, 10, 15].map((dx, k) => `<circle cx="${dx}" cy="0" r="${k === 3 ? 4 : 3.4}" fill="#84CC16" stroke="#4D7C0F" stroke-width="0.7"/>`).join('')}
  <circle cx="16.4" cy="-1" r="0.9" fill="#1F2937"/></g></g>`;

/** Mấy khay rau xếp hàng trên sân thượng. */
const garden = (size, line) => `<g ${line ? `data-l="${line}"` : ''}>
  ${[[110, 222], [168, 216], [226, 222], [284, 216], [342, 222], [400, 216]].map(([x, y], i) => bottlePot(x, y, i === 2 || i === 5 ? Math.max(size, size === 2 ? 3 : size) : size, i)).join('')}</g>`;

export default {
  groups: [[0, 1], [2, 3, 4, 5], [6, 7, 8], [9]],
  scenes: [
    // Cảnh 1: bố và Bon mang chai nhựa lên sân thượng làm chậu, đổ đất gieo hạt; Bon reo "tuyệt vời quá bố ạ!"
    () => svg('Bố và Bon làm vườn rau bằng chai nhựa trên sân thượng', `
      ${sky('t03s1sky')}
      ${sun(400, 52, 20)}${cloud(150, 50, 0.8, 0)}${cloud(300, 34, 0.7, 2)}
      ${roof()}
      ${at(1, garden(0))}
      ${at(1, `<g transform="translate(250 280)"><path d="M-14 0 L-10 -24 H10 L14 0Z" fill="#A16207" stroke="${LINE}" stroke-width="1"/><path d="M-12 -24 Q0 -34 12 -24Z" fill="#78350F"/></g>`)}
      ${at(1, person(352, 282, 'bo', 'dig', { s: 0.86, prop: 'shovel' }), { talk: '' })}
      ${at(1, person(176, 282, 'bon', 'hold', { s: 0.95, prop: 'gift' }), { off: 2 })}
      ${at(2, person(176, 282, 'bon', 'cheer', { s: 0.95, mood: 'joy' }), { talk: '2' })}
      ${at(2, sparkles([[120, 120, 8], [232, 106, 10], [150, 150, 6]]))}`),

    // Cảnh 2: ngày ngày chăm vườn; Bon nhổ cỏ, bắt sâu, ngạc nhiên thấy bố tưới bằng chai nhựa; bố giải thích
    () => svg('Bon nhổ cỏ bắt sâu, bố tưới cây bằng chai nhựa', `
      ${sky('t03s2sky', '#93C5FD', '#E0F2FE')}
      ${sun(110, 50, 18)}${cloud(330, 44, 0.8, 1)}
      ${roof()}
      ${garden(2)}
      ${at(2, caterpillar(282, 196))}
      ${at(1, person(170, 280, 'bon', 'sit', { s: 0.95 }), { off: 2 })}
      ${at(2, person(170, 280, 'bon', 'sit', { s: 0.95, mood: 'wow' }))}
      ${at(2, `<g transform="translate(150 272)"><path d="M0 0 l-4 -14 M0 0 l1 -16 M0 0 l6 -12" stroke="#65A30D" stroke-width="2" stroke-linecap="round"/></g>`)}
      ${at(1, person(352, 282, 'bo', 'give', { s: 0.86, prop: 'bottle' }), { talk: '3,4' })}
      ${at(4, thought(300, 82, 160, 86, 342, 138, `
        <g transform="translate(-44 6)"><path d="M-14 -10 H10 Q16 -10 16 -2 V14 H-14Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="1"/><rect x="-6" y="-16" width="8" height="6" fill="#0EA5E9"/></g>
        <path d="M-18 4 H4 M-2 -2 L6 4 L-2 10" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/>
        <g transform="translate(40 6)"><circle r="22" fill="#38BDF8"/><path d="M-14 -8 Q-4 -16 4 -8 Q2 0 -8 2Z M4 6 Q14 0 16 10 Q8 18 2 12Z" fill="#4ADE80"/>
          <path d="M-6 -2 a2 2 0 0 1 0 0" /><circle cx="-6" cy="-2" r="1.6" fill="#1E293B"/><circle cx="6" cy="-2" r="1.6" fill="#1E293B"/><path d="M-5 5 Q0 9 5 5" stroke="#1E293B" stroke-width="1.4" fill="none"/></g>`))}`),

    // Cảnh 3: bố và Bon dắt mẹ (nhắm mắt) lên sân thượng; mẹ mở mắt; "Khu vườn này bố và con dành tặng mẹ đấy!"
    () => svg('Bố và Bon dắt mẹ lên xem khu vườn', `
      ${sky('t03s3sky', '#7DD3FC', '#FEF3C7')}
      ${sun(392, 56, 22)}${cloud(120, 40, 0.8, 0)}
      ${roof()}
      ${garden(2)}
      ${at(1, person(240, 282, 'me', 'stand', { s: 0.88, mood: 'shut' }), { off: 2 })}
      ${at(2, person(240, 282, 'me', 'clap', { s: 0.88, mood: 'wow' }))}
      ${at(1, person(160, 284, 'bon', 'point', { s: 0.95, flip: true }), { talk: '2' })}
      ${at(1, person(326, 282, 'bo', 'give', { s: 0.86 }), { talk: '3' })}
      ${at(3, `${heart(200, 120, 1.2, '#F43F5E', 0)}${heart(240, 100, 1.5, '#FB7185', 0.6)}${heart(282, 124, 1.1, '#F43F5E', 1.2)}`)}`),

    // Cảnh 4: từ hôm đó mẹ thường lên hái rau sạch nấu cho cả nhà
    () => svg('Mẹ hái rau sạch trên sân thượng nấu ăn cho cả nhà', `
      ${sky('t03s4sky', '#FDBA74', '#FEF3C7')}
      ${sun(110, 70, 22, false)}${cloud(330, 40, 0.7, 1, '#FFF7ED')}
      ${roof()}
      ${garden(2)}
      ${at(1, person(220, 282, 'me', 'hold', { s: 0.9, prop: 'basket', mood: 'joy' }))}
      ${at(1, thought(352, 92, 120, 84, 262, 150, `
        <ellipse cx="0" cy="14" rx="44" ry="8" fill="#B45309"/>
        <path d="M-22 4 H22 Q20 20 0 21 Q-20 20 -22 4Z" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/>
        ${[-12, -4, 6, 14].map((x, i) => `<ellipse cx="${x}" cy="4" rx="5" ry="2.6" fill="${i % 2 ? '#22C55E' : '#4ADE80'}"/>`).join('')}
        ${[-10, 0, 10].map((x, i) => `<path class="sc-rise" style="--d:${i * 0.6}s" d="M${x} -4 q-4 -6 0 -12 q4 -6 0 -12" stroke="#CBD5E1" stroke-width="2" fill="none"/>`).join('')}`))}`),
  ],
};
