// Phim truyện "Câu chuyện bó đũa" (theo Ngụ ngôn Việt Nam), Tuần 23 Tiếng Việt 3: 6 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật trong cast.js: hai anh em lúc nhỏ (conTrai, beGai); lớn lên: người anh (bo) và vợ (me), người em gái (khach)
// và chồng (chu). Người cha già tóc bạc, râu (ongCu trong cast.js).
// Bó đũa, túi tiền, bàn, nhà gỗ vẽ riêng ở đây.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, grass, tufts, flowers, tree, sparkles, speech, heart, thatchHouse, LINE } from '../sceneKit.js';

const CHA = 'ongCu';

const BAMBOO = '#EBC97A', BAMBOO_D = '#B8892E';

/** Bó đũa: n chiếc dài len, tâm (x, y), nghiêng rot độ; tied: buộc dây đỏ hai đầu. */
function bundle(x, y, len = 70, { rot = 0, n = 9, tied = true } = {}) {
  const sticks = Array.from({ length: n }, (_, i) => {
    const dy = (i - (n - 1) / 2) * 2.2, dx = (i % 3 - 1) * 2;
    return `<rect x="${-len / 2 + dx}" y="${dy - 1.3}" width="${len}" height="2.6" rx="1.3" fill="${BAMBOO}" stroke="${BAMBOO_D}" stroke-width="0.5"/>`;
  }).join('');
  const h = n * 2.2 + 2;
  return `<g transform="translate(${x} ${y}) rotate(${rot})">${sticks}
    ${tied ? [-len * 0.25, len * 0.25].map(tx => `<rect x="${tx - 2.5}" y="${-h / 2}" width="5" height="${h}" rx="1.5" fill="#DC2626" stroke="${LINE}" stroke-width="0.5"/>`).join('') : ''}</g>`;
}

/** Một chiếc đũa (broken: gãy đôi, hai nửa gập lại). */
function stick(x, y, len = 60, { rot = 0, broken = false } = {}) {
  if (!broken) return `<rect x="${x - len / 2}" y="${y - 1.4}" width="${len}" height="2.8" rx="1.4" fill="${BAMBOO}" stroke="${BAMBOO_D}" stroke-width="0.5" transform="rotate(${rot} ${x} ${y})"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="${-len / 2}" y="-1.4" width="${len / 2 - 1}" height="2.8" rx="1.4" fill="${BAMBOO}" stroke="${BAMBOO_D}" stroke-width="0.5" transform="rotate(-22 0 0)"/>
    <rect x="1" y="-1.4" width="${len / 2 - 1}" height="2.8" rx="1.4" fill="${BAMBOO}" stroke="${BAMBOO_D}" stroke-width="0.5" transform="rotate(22 0 0)"/>
    <path d="M-2 -4 l-3 -4 M2 -4 l3 -4 M0 -5 v-5" stroke="#F59E0B" stroke-width="1.4" stroke-linecap="round"/></g>`;
}

/** Túi tiền đỏ buộc miệng, đồng tiền vàng ló ra. */
const purse = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <circle cx="10" cy="-26" r="5" fill="#FACC15" stroke="#CA8A04" stroke-width="0.9"/><rect x="8.6" y="-27.4" width="2.8" height="2.8" fill="#CA8A04"/>
  <path d="M-8 -22 Q-18 -10 -14 -2 Q0 4 14 -2 Q18 -10 8 -22Z" fill="#DC2626" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M-9 -22 Q0 -26 9 -22" stroke="#FACC15" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <circle cx="0" cy="-10" r="4" fill="#FACC15" stroke="#CA8A04" stroke-width="0.8"/></g>`;

/** Bàn gỗ (x giữa, y mặt sàn, w rộng, mặt bàn cao th). Đồ đặt trên mặt bàn ở y - th. */
const table = (x, y, w = 120, th = 52) => `<g>
  <rect x="${x - w / 2 + 6}" y="${y - th + 6}" width="7" height="${th - 6}" fill="#7C4A21" stroke="${LINE}" stroke-width="0.8"/>
  <rect x="${x + w / 2 - 13}" y="${y - th + 6}" width="7" height="${th - 6}" fill="#7C4A21" stroke="${LINE}" stroke-width="0.8"/>
  <rect x="${x - w / 2}" y="${y - th}" width="${w}" height="9" rx="2" fill="#A0602E" stroke="${LINE}" stroke-width="0.9"/>
  <rect x="${x - w / 2 + 8}" y="${y - th + 9}" width="${w - 16}" height="${th - 13}" fill="#8B4E22" stroke="${LINE}" stroke-width="0.6"/></g>`;

/** Gian nhà gỗ xưa: vách ván, cửa sổ chấn song, sàn gạch (floorY). */
const room = (floorY = 236) => `<rect width="${W}" height="${H}" fill="#E8B77E"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 40 + 20} 0 V${floorY}" stroke="#D29A5C" stroke-width="2"/>`).join('')}
  <rect x="0" y="0" width="${W}" height="22" fill="#9A5B2A"/>
  <rect x="110" y="48" width="70" height="64" fill="#BAE6FD" stroke="#7C4A21" stroke-width="5"/>
  ${[0, 1, 2, 3].map(i => `<path d="M${124 + i * 14} 48 V112" stroke="#7C4A21" stroke-width="3"/>`).join('')}
  <rect x="300" y="48" width="70" height="64" fill="#BAE6FD" stroke="#7C4A21" stroke-width="5"/>
  ${[0, 1, 2, 3].map(i => `<path d="M${314 + i * 14} 48 V112" stroke="#7C4A21" stroke-width="3"/>`).join('')}
  <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="#C2410C" opacity="0.75"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${i * 40} ${floorY} l-14 ${H - floorY}" stroke="#9A3412" stroke-width="1" opacity="0.6"/>`).join('')}
  <path d="M0 ${floorY + 30} H${W}" stroke="#9A3412" stroke-width="1" opacity="0.6"/>
  <path d="M0 ${floorY} H${W}" stroke="#7C2D12" stroke-width="3"/>`;

/** Tia giận dỗi (răng cưa đỏ) giữa hai bên cãi nhau. */
const clash = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-twinkle">
  <path d="M-16 -14 L-4 -4 L-12 2 L4 14 M16 -14 L6 -2 L14 4 L0 16" stroke="#DC2626" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;

/** Giọt mồ hôi. */
const sweat = (list) => list.map(([x, y], i) => `<g class="sc-bob" style="--d:${i * 0.4}s"><path d="M${x} ${y - 6} Q${x + 5} ${y + 1} ${x} ${y + 3} Q${x - 5} ${y + 1} ${x} ${y - 6}Z" fill="#7DD3FC" stroke="#0EA5E9" stroke-width="0.7"/></g>`).join('');

/** Nét gắng sức quanh tay (vòng cung). */
const strain = (x, y) => `<g class="sc-twinkle"><path d="M${x - 26} ${y - 10} q-6 10 0 20 M${x + 26} ${y - 10} q6 10 0 20" stroke="#F97316" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;

/** Dấu tích xanh (đồng ý: "Đúng"). */
const tick = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle r="13" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
  <path d="M-6 0 L-1.5 5 L7 -5" stroke="#16A34A" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;

const KIDS = ['bo', 'me', 'khach', 'chu'];

export default {
  sentences: true,
  groups: [[0, 1], [2, 3], [4, 5], [6, 7, 8], [9, 10], [11, 12, 13, 14, 15]],
  scenes: [
    // Cảnh 1: ngày xưa, một gia đình có hai anh em; lúc nhỏ anh em rất hòa thuận
    () => svg('Người cha và hai anh em lúc nhỏ chơi với nhau rất hòa thuận', `
      ${sky('t23s1sky', '#7DD3FC', '#F0FDF4')}
      ${sun(380, 44, 16)}${cloud(150, 40, 0.7, 1)}
      ${grass(206, '#86EFAC')}
      ${thatchHouse(320, 220, 150, 62)}${tree(118, 214, 0.8)}
      <path d="M200 300 Q250 250 320 222 H336 Q290 252 270 300Z" fill="#E7C9A1"/>
      ${tufts([[110, 276], [380, 270], [180, 292]])}
      ${at(1, person(140, 284, CHA, 'cane', { s: 0.8, prop: 'cane' }))}
      ${at(1, `${person(222, 286, 'conTrai', 'stand', { s: 0.82 })}${person(270, 286, 'beGai', 'stand', { s: 0.82, flip: true })}`, { off: 2 })}
      ${at(2, `${person(216, 286, 'conTrai', 'cheer', { s: 0.82, mood: 'joy' })}${person(268, 286, 'beGai', 'cheer', { s: 0.82, mood: 'joy', flip: true })}`)}
      ${at(2, `${heart(242, 150, 1.4, '#F43F5E', 0)}${heart(222, 128, 1, '#FB7185', 0.8)}${heart(264, 124, 1.1, '#F43F5E', 1.4)}`)}
      ${at(2, `<g class="sc-bob" style="--d:0.3s"><circle cx="244" cy="96" r="10" fill="#FACC15" stroke="${LINE}" stroke-width="0.9"/><path d="M234 96 H254 M244 86 V106" stroke="#EF4444" stroke-width="2"/></g>`)}
      ${flowers([[360, 292, '#F472B6'], [100, 296, '#FDE047']])}`),

    // Cảnh 2: lớn lên, anh có vợ, em có chồng, mỗi người một nhà nhưng hay va chạm; người cha rất buồn phiền
    () => svg('Hai anh em lớn lên, mỗi người một nhà, hay cãi nhau; người cha buồn phiền', `
      ${sky('t23s2sky', '#93C5FD', '#F1F5F9')}
      ${cloud(240, 34, 0.7, 0, '#E2E8F0')}
      ${grass(200, '#86EFAC')}
      ${at(1, `${thatchHouse(104, 206, 120, 52)}${thatchHouse(376, 206, 120, 52)}`)}
      ${at(1, `${person(128, 286, 'bo', 'point', { s: 0.76 })}${person(84, 288, 'me', 'stand', { s: 0.74 })}`, { talk: '1' })}
      ${at(1, `${person(352, 286, 'khach', 'point', { s: 0.76, flip: true })}${person(396, 288, 'chu', 'stand', { s: 0.74, flip: true })}`, { talk: '1' })}
      ${at(1, `${clash(240, 132, 1.2)}${clash(196, 176, 0.7)}${clash(286, 172, 0.7)}`)}
      ${at(2, person(240, 270, CHA, 'cane', { s: 0.7, prop: 'cane', mood: 'sad' }))}
      ${at(2, `<g transform="translate(240 64)"><g class="sc-drift"><ellipse rx="34" ry="14" fill="#94A3B8"/><ellipse cx="-14" cy="-8" rx="16" ry="12" fill="#94A3B8"/><ellipse cx="12" cy="-10" rx="18" ry="13" fill="#94A3B8"/>
        ${[-14, 0, 14].map((dx, i) => `<path class="sc-rain" style="--d:${i * 0.3}s" d="M${dx} 16 l-3 8" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"/>`).join('')}</g></g>`)}`),

    // Cảnh 3: ông đặt bó đũa và túi tiền trên bàn, gọi các con, dâu, rể lại: "Ai bẻ gãy được bó đũa này thì cha thưởng túi tiền."
    () => svg('Người cha đặt bó đũa và túi tiền lên bàn, gọi bốn người con lại', `
      ${room()}
      ${at(1, person(240, 250, CHA, 'point', { s: 0.78, flip: true }), { talk: '2' })}
      ${table(240, 284, 140, 54)}
      ${at(1, `${bundle(218, 222, 64)}${purse(276, 230, 0.9)}`)}
      ${at(1, `${person(98, 288, 'chu', 'stand', { s: 0.72 })}${person(142, 290, 'khach', 'stand', { s: 0.72 })}
        ${person(338, 290, 'bo', 'stand', { s: 0.72, flip: true })}${person(382, 288, 'me', 'stand', { s: 0.72, flip: true })}`)}
      ${at(2, speech(128, 70, 120, 58, 214, 140, `${bundle(-30, 0, 44, { n: 7 })}
        <path d="M-2 0 H14 M8 -6 L14 0 L8 6" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${purse(34, 14, 0.8)}`))}
      ${at(2, sparkles([[300, 200, 7], [256, 196, 5]]))}`),

    // Cảnh 4: bốn người con lần lượt bẻ, cố hết sức mà không gãy; người cha cởi bó đũa, bẻ gãy từng chiếc dễ dàng
    () => svg('Các con cố bẻ bó đũa không gãy; người cha cởi ra bẻ từng chiếc', `
      ${room()}
      ${person(320, 250, CHA, 'stand', { s: 0.78, flip: true })}
      ${at(3, person(320, 250, CHA, 'give', { s: 0.78, flip: true, mood: 'joy' }))}
      ${table(320, 284, 130, 54)}
      ${purse(360, 230, 0.8)}
      ${at(1, `${person(90, 290, 'chu', 'stand', { s: 0.72 })}${person(132, 288, 'khach', 'stand', { s: 0.72 })}${person(222, 290, 'me', 'stand', { s: 0.72, flip: true })}`, { off: 2 })}
      ${at(2, `${person(90, 290, 'chu', 'stand', { s: 0.72, mood: 'wow' })}${person(132, 288, 'khach', 'stand', { s: 0.72, mood: 'sad' })}${person(222, 290, 'me', 'stand', { s: 0.72, flip: true, mood: 'wow' })}`)}
      ${at(1, `${person(176, 290, 'bo', 'hold', { s: 0.72 })}${bundle(176, 218, 58, { rot: -6, n: 7 })}`, { off: 3 })}
      ${at(2, `${strain(176, 218)}${sweat([[160, 160], [196, 156]])}${sweat([[124, 168], [84, 170]])}`, { off: 3 })}
      ${at(3, `${person(176, 290, 'bo', 'stand', { s: 0.72, mood: 'wow' })}`)}
      ${at(3, `${[0, 1, 2, 3, 4].map(i => stick(286 + i * 2, 226 - i * 2.4, 52, { rot: -4 + i * 3 })).join('')}
        <path d="M262 232 q-8 -6 -2 -12 M338 232 q8 -6 2 -12" stroke="#DC2626" stroke-width="2" fill="none"/>`)}
      ${at(3, `${stick(274, 144, 46, { broken: true, rot: -10 })}${stick(254, 220, 40, { broken: true, rot: 8 })}${stick(332, 214, 40, { broken: true, rot: -6 })}`)}
      ${at(3, sparkles([[270, 120, 7], [300, 150, 5]]))}`),

    // Cảnh 5: bốn người con cùng nói: "Thưa cha, lấy từng chiếc mà bẻ thì có khó gì!"
    () => svg('Bốn người con cùng nói: lấy từng chiếc mà bẻ thì có khó gì', `
      ${room()}
      ${person(370, 248, CHA, 'stand', { s: 0.76, flip: true })}
      ${table(370, 284, 110, 54)}
      ${[0, 1, 2, 3].map(i => stick(354 + i * 9, 226, 34, { broken: true, rot: (i % 2 ? 8 : -8) })).join('')}
      ${at(1, KIDS.map((k, i) => person(110 + i * 54, 290 - (i % 2) * 2, k, 'stand', { s: 0.74, flip: i > 1 })).join(''), { off: 2 })}
      ${at(2, `<g data-talk="2">${KIDS.map((k, i) => person(110 + i * 54, 290 - (i % 2) * 2, k, 'wave', { s: 0.74, mood: 'joy', flip: i > 1 })).join('')}</g>`)}
      ${at(2, speech(198, 66, 150, 60, 200, 152, `${stick(-40, 0, 46)}
        <path d="M-10 0 H6 M0 -6 L6 0 L0 6" stroke="#64748B" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        ${stick(34, 2, 46, { broken: true })}`))}`),

    // Cảnh 6: người cha bảo: "Đúng. Chia lẻ ra thì yếu, hợp lại thì mạnh. Phải biết yêu thương, đùm bọc lẫn nhau. Có đoàn kết thì mới có sức mạnh."
    () => svg('Người cha dạy: chia lẻ thì yếu, hợp lại thì mạnh; các con đoàn kết yêu thương', `
      ${room()}
      ${at(1, person(360, 284, CHA, 'point', { s: 0.8, flip: true }), { talk: '1,2,3,4,5' })}
      ${at(2, tick(392, 96, 1))}
      ${at(5, `<ellipse cx="185" cy="236" rx="130" ry="80" fill="#FEF08A" opacity="0.45"/>`)}
      ${at(1, KIDS.map((k, i) => person(104 + i * 54, 290 - (i % 2) * 2, k, 'stand', { s: 0.74 })).join(''), { off: 4 })}
      ${at(4, KIDS.map((k, i) => person(104 + i * 54, 290 - (i % 2) * 2, k, 'clap', { s: 0.74, mood: 'joy' })).join(''), { off: 5 })}
      ${at(4, `${heart(131, 150, 1.2, '#F43F5E', 0)}${heart(185, 146, 1.2, '#FB7185', 0.6)}${heart(239, 150, 1.2, '#F43F5E', 1.2)}`, { off: 5 })}
      ${at(5, KIDS.map((k, i) => person(104 + i * 54, 290 - (i % 2) * 2, k, 'cheer', { s: 0.74, mood: 'joy' })).join(''))}
      ${at(3, `<rect x="104" y="34" width="210" height="84" rx="14" fill="#FFFBEB" stroke="${LINE}" stroke-width="1"/>
        <path d="M209 44 V108" stroke="#E7C9A1" stroke-width="2" stroke-dasharray="4 4"/>
        ${[0, 1, 2, 3].map(i => stick(130 + (i % 2) * 34, 58 + Math.floor(i / 2) * 32, 34, { broken: true, rot: i % 2 ? 10 : -10 })).join('')}
        <g transform="translate(262 76)"><circle r="34" fill="#FEF08A" opacity="0.7"/>${bundle(0, 0, 68, { rot: -12 })}</g>`)}
      ${at(3, sparkles([[230, 46, 7], [300, 104, 6]]))}
      ${at(5, sparkles([[110, 140, 8], [260, 136, 8], [184, 160, 6], [84, 190, 6], [290, 190, 6]]))}`),
  ],
};
