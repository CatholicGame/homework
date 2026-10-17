// Phim truyện cổ tích "Đẽo cày giữa đường", Tuần 25 Tiếng Việt 3: 5 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật (cast.js): bác nông dân (linhLe: nón lá, áo nâu), ba người qua đường (bo, chu, hangXom).
// Cái cày gỗ bé dần qua từng lời góp ý: to → mỏng đi → đầu cày nhỏ lại → ngắn lại → chỉ còn khúc gỗ nhỏ, củi vụn đầy đất.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, grass, tufts, flowers, tree, sparkles, speech, thought, thatchHouse, LINE } from '../sceneKit.js';

const WOOD = '#DDA766', WOOD_D = '#A8713A', BARK = '#8B5A2B';

/** Nét gỗ có viền: đoạn thẳng / cong d, dày t. */
const beam = (d, t) => `<path d="${d}" stroke="${LINE}" stroke-width="${t + 2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${d}" stroke="${WOOD}" stroke-width="${t}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Cái cày gỗ dựng trên đất (x: gót đế cày, y: mặt đất), mũi cày quay sang phải.
 *  L: dài bắp cày, t: dày thân, hd: cỡ đầu (đế) cày. */
function plough(x, y, { L = 110, t = 12, hd = 40 } = {}) {
  const hh = hd * 0.42;
  return `<g>
    <ellipse cx="${x + L * 0.4}" cy="${y + 2}" rx="${L * 0.6}" ry="4" fill="#000" opacity="0.12"/>
    ${beam(`M${x + 6} ${y - hh * 0.6} L${x - 16} ${y - L * 0.72}`, t)}
    ${beam(`M${x - 2} ${y - L * 0.38} Q${x + L * 0.5} ${y - L * 0.5} ${x + L} ${y - L * 0.34}`, t)}
    <path d="M${x - 4} ${y} H${x + hd} L${x + hd + 14} ${y - 4} L${x + hd - 2} ${y - hh} H${x - 4}Z" fill="${WOOD}" stroke="${LINE}" stroke-width="1"/>
    <path d="M${x + 4} ${y - hh * 0.5} H${x + hd - 4}" stroke="${WOOD_D}" stroke-width="1" opacity="0.6"/>
    <path d="M${x - 22} ${y - L * 0.72} H${x - 8}" stroke="${LINE}" stroke-width="${t * 0.7 + 2}" stroke-linecap="round"/>
    <path d="M${x - 22} ${y - L * 0.72} H${x - 8}" stroke="${WOOD_D}" stroke-width="${t * 0.7}" stroke-linecap="round"/></g>`;
}

/** Khúc gỗ tròn nằm ngang (x giữa, y đất). */
const log = (x, y, w = 120, h = 28) => `<g>
  <ellipse cx="${x}" cy="${y + 2}" rx="${w / 2 + 4}" ry="4" fill="#000" opacity="0.12"/>
  <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="${h / 2.4}" fill="${BARK}" stroke="${LINE}" stroke-width="1"/>
  <path d="M${x - w / 2 + 16} ${y - h * 0.6} H${x + w / 4} M${x - w / 4} ${y - h * 0.3} H${x + w / 2 - 20}" stroke="#6B4423" stroke-width="1.4" stroke-linecap="round"/>
  <ellipse cx="${x + w / 2 - 6}" cy="${y - h / 2}" rx="${h * 0.32}" ry="${h / 2 - 1}" fill="${WOOD}" stroke="${LINE}" stroke-width="1"/>
  <ellipse cx="${x + w / 2 - 6}" cy="${y - h / 2}" rx="${h * 0.16}" ry="${h / 4}" fill="none" stroke="${WOOD_D}" stroke-width="1"/></g>`;

/** Vỏ bào, củi vụn rải trên đất (n mảnh quanh x, trải rộng w). */
const chips = (x, y, n, w = 60, seed = 0) => Array.from({ length: n }, (_, i) => {
  const k = (i * 37 + seed * 11) % 100 / 100;
  const cx = x + (k - 0.5) * w + ((i * 13) % 7) - 3, cy = y - ((i * 29 + seed) % 9);
  return `<ellipse cx="${cx.toFixed(1)}" cy="${cy}" rx="${4 + (i % 3)}" ry="2" fill="${i % 3 ? WOOD : '#E8C08A'}" stroke="${WOOD_D}" stroke-width="0.6" transform="rotate(${(i * 47) % 180 - 90} ${cx.toFixed(1)} ${cy})"/>`;
}).join('');

/** Cái rìu trong tay người ngồi (hx, hy: chỗ nắm), giơ lên bổ xuống khúc gỗ bên phải. */
const axe = (hx, hy) => `<g transform="translate(${hx} ${hy})"><g class="sc-sway" style="--d:0.3s">
  <path d="M-2 4 L30 -16" stroke="${LINE}" stroke-width="5" stroke-linecap="round"/><path d="M-2 4 L30 -16" stroke="#C08457" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M24 -14 L30 -30 Q40 -26 42 -14 L32 -10Z" fill="#94A3B8" stroke="#475569" stroke-width="1"/></g></g>`;

/** Mũi tên đỏ hai đầu từ (x1, y1) tới (x2, y2). */
function dbl(x1, y1, x2, y2, c = '#DC2626') {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 6;
  const head = (x, y, b) => `M${(x - Math.cos(b - 0.5) * h).toFixed(1)} ${(y - Math.sin(b - 0.5) * h).toFixed(1)} L${x} ${y} L${(x - Math.cos(b + 0.5) * h).toFixed(1)} ${(y - Math.sin(b + 0.5) * h).toFixed(1)}`;
  return `<path d="M${x1} ${y1} L${x2} ${y2} ${head(x2, y2, a)} ${head(x1, y1, a + Math.PI)}" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** Ruộng lúa xa và con đường đất ven ruộng. */
const roadside = (id, top = '#7DD3FC', bottom = '#ECFCCB') => `
  ${sky(id, top, bottom)}
  <path d="M0 176 Q240 160 480 174 V214 H0Z" fill="#A3E635"/>
  ${[182, 192, 202].map(y => `<path d="M0 ${y} Q240 ${y - 12} 480 ${y}" stroke="#65A30D" stroke-width="1.6" fill="none" opacity="0.6"/>`).join('')}
  <path d="M0 210 Q240 198 480 210 V300 H0Z" fill="#86EFAC"/>
  <path d="M0 246 Q240 228 480 246 V300 H0Z" fill="#E7C9A1"/>
  <path d="M0 250 Q240 233 480 250" stroke="#D6B38A" stroke-width="2" fill="none"/>`;

/** Bác nông dân ngồi đẽo cày bên đường (mood: happy / joy / sad). */
const carver = (mood = 'happy') => `${person(168, 288, 'linhLe', 'sit', { s: 0.9, mood })}${axe(170, 236)}`;

/** Bong bóng lời góp ý của người qua đường: hình cái cày + chỗ bị chê (kind: thick · head · long). */
function advice(kind, tx, ty) {
  const icon = kind === 'thick'
    ? `${plough(-22, 22, { L: 54, t: 9, hd: 20 })}${dbl(10, -24, 18, -6)}${dbl(-40, 2, -30, -14)}`
    : kind === 'head'
      ? `${plough(-22, 22, { L: 54, t: 5, hd: 30 })}<ellipse cx="-4" cy="17" rx="24" ry="13" fill="none" stroke="#DC2626" stroke-width="2.6"/>`
      : `${plough(-12, 18, { L: 60, t: 5, hd: 16 })}${dbl(-34, 28, 50, 28)}`;
  return speech(304, 78, 112, 82, tx, ty, icon);
}

export default {
  sentences: true,
  groups: [[0, 1], [2, 3, 4], [5, 6, 7], [8, 9], [10, 11, 12]],
  scenes: [
    // Cảnh 1: bác nông dân nghèo làm ruộng, mong có cái cày thật tốt; xin được cây gỗ tốt, mang ra ven đường ngồi đẽo
    () => svg('Bác nông dân nghèo mong có cái cày tốt, xin được cây gỗ tốt', `
      ${roadside('t25s1sky')}
      ${sun(392, 44, 18)}${cloud(150, 40, 0.7, 1)}
      ${thatchHouse(392, 200, 120, 46)}
      ${tree(90, 214, 0.8)}
      ${tufts([[120, 236], [330, 232], [420, 238]])}
      ${at(1, `${person(170, 286, 'linhLe', 'stand', { s: 0.92, mood: 'sad' })}
        ${beam('M206 286 L232 214', 6)}${beam('M222 242 Q250 236 266 248', 5)}
        <path d="M204 286 H228 L234 282 L226 276 H204Z" fill="${WOOD_D}" stroke="${LINE}" stroke-width="1"/>`, { off: 2 })}
      ${at(1, thought(278, 82, 120, 76, 212, 146, `${plough(-24, 26, { L: 70, t: 8, hd: 26 })}${sparkles([[40, -22, 7], [-44, -18, 6]])}`), { off: 2 })}
      ${at(2, `${person(158, 286, 'linhLe', 'point', { s: 0.92, mood: 'joy' })}
        ${log(268, 280, 130, 30)}${sparkles([[224, 236, 8], [312, 232, 7], [270, 222, 6]])}`)}
      ${at(2, thought(304, 84, 112, 70, 268, 210, `<path d="M-48 18 Q0 8 48 18" stroke="#D6B38A" stroke-width="10" stroke-linecap="round" fill="none"/>
        ${log(-6, 12, 52, 14)}<path d="M18 -10 L30 -24 Q38 -20 38 -12Z" fill="#94A3B8" stroke="#475569"/><path d="M8 0 L24 -16" stroke="#C08457" stroke-width="3" stroke-linecap="round"/>`))}`),

    // Cảnh 2: người thứ nhất đi qua chê "đẽo to quá"; bác nghe có lí, đẽo mỏng đi
    () => svg('Người qua đường thứ nhất chê bác đẽo to quá', `
      ${roadside('t25s2sky')}
      ${sun(110, 44, 18)}${cloud(330, 36, 0.7, 2)}
      ${tree(400, 212, 0.9)}
      ${at(1, carver(), { off: 3 })}
      ${at(3, carver('joy'))}
      ${at(1, `${plough(226, 280, { L: 100, t: 18, hd: 52 })}${chips(250, 288, 6, 70, 1)}`, { off: 3 })}
      ${at(3, `${plough(226, 280, { L: 100, t: 9, hd: 46 })}${chips(250, 288, 14, 90, 2)}`)}
      ${at(1, person(352, 288, 'bo', 'walk', { s: 0.86, flip: true }), { off: 2 })}
      ${at(2, person(352, 288, 'bo', 'point', { s: 0.86, flip: true }), { talk: '2' })}
      ${at(2, advice('thick', 334, 150), { off: 3 })}
      ${at(3, sparkles([[268, 200, 7], [210, 190, 6]]))}`),

    // Cảnh 3: người thứ hai bảo "đầu cày to quá"; bác lại sửa theo, đầu cày nhỏ lại; lại một người nữa đi qua
    () => svg('Người qua đường thứ hai nói đầu cày to quá, bác lại sửa theo', `
      ${roadside('t25s3sky', '#7DD3FC', '#FEF9C3')}
      ${sun(150, 40, 18)}${cloud(360, 40, 0.6, 1)}
      ${tree(410, 212, 0.8)}
      ${at(1, carver(), { off: 3 })}
      ${at(3, carver('joy'))}
      ${at(1, `${plough(226, 280, { L: 100, t: 9, hd: 46 })}${chips(250, 288, 14, 90, 2)}`, { off: 3 })}
      ${at(3, `${plough(226, 280, { L: 100, t: 9, hd: 26 })}${chips(250, 288, 22, 110, 3)}`)}
      ${at(1, person(352, 288, 'chu', 'walk', { s: 0.86, flip: true }), { off: 2 })}
      ${at(2, person(352, 288, 'chu', 'point', { s: 0.86, flip: true }), { off: 3, talk: '2' })}
      ${at(2, advice('head', 334, 150), { off: 3 })}
      ${at(3, person(330, 288, 'hangXom', 'walk', { s: 0.84, flip: true }))}`),

    // Cảnh 4: người thứ ba nói "cày dài quá không thuận tay"; bác lại sửa theo, cày ngắn cũn
    () => svg('Người qua đường thứ ba chê cày dài quá, bác lại đẽo ngắn đi', `
      ${roadside('t25s4sky', '#93C5FD', '#FED7AA')}
      ${sun(180, 60, 18)}${cloud(380, 44, 0.6, 2)}
      ${tree(410, 212, 0.8)}
      ${at(1, carver(), { off: 2 })}
      ${at(2, carver('joy'))}
      ${at(1, `${plough(226, 280, { L: 100, t: 9, hd: 26 })}${chips(250, 288, 22, 110, 3)}`, { off: 2 })}
      ${at(2, `${plough(240, 280, { L: 58, t: 7, hd: 22 })}${chips(260, 288, 32, 130, 4)}`)}
      ${at(1, person(352, 288, 'hangXom', 'point', { s: 0.84, flip: true }), { talk: '1' })}
      ${at(1, advice('long', 334, 150), { off: 2 })}
      ${at(2, `<g transform="translate(300 214)"><g class="sc-rise">${chips(0, 0, 4, 30, 5)}</g></g>`)}`),

    // Cảnh 5: hết ngày chỉ còn khúc gỗ nhỏ, cây gỗ quý thành đống củi vụn; bác buồn lắm; bác hiểu: phải có chính kiến, kiên trì đường đã chọn
    () => svg('Chiều tối, cây gỗ quý thành đống củi vụn, bác nông dân buồn và hiểu ra bài học', `
      ${sky('t25s5sky', '#FB923C', '#FDE68A')}
      <circle cx="380" cy="176" r="26" fill="#FDBA74"/><circle cx="380" cy="176" r="20" fill="#F97316"/>
      <path d="M0 176 Q240 160 480 174 V214 H0Z" fill="#84A94B"/>
      <path d="M0 210 Q240 198 480 210 V300 H0Z" fill="#6FBF73"/>
      <path d="M0 246 Q240 228 480 246 V300 H0Z" fill="#D9B88E"/>
      ${tree(96, 214, 0.8, '#4D9A48', '#3F7F3B')}
      ${at(1, `${chips(272, 288, 46, 150, 6)}${chips(272, 278, 18, 90, 7)}
        <g><rect x="250" y="264" width="26" height="14" rx="4" fill="${WOOD}" stroke="${LINE}" stroke-width="1"/><path d="M256 271 h14" stroke="${WOOD_D}" stroke-width="1"/></g>`)}
      ${at(1, carver(), { off: 2 })}
      ${at(2, person(168, 288, 'linhLe', 'sit', { s: 0.9, mood: 'cry' }), { off: 3 })}
      ${at(3, person(176, 288, 'linhLe', 'stand', { s: 0.9 }))}
      ${at(3, thought(300, 82, 140, 88, 200, 150, `
        <path d="M-60 34 L-8 -10 H8 L60 34Z" fill="#D9B88E"/>
        <path d="M-2 -10 L-6 34 M2 -10 L6 34" stroke="#F5F5F4" stroke-width="2" stroke-dasharray="5 5"/>
        <path d="M-66 -10 H66 V-4 H-66Z" fill="#A3E635" opacity="0.8"/>
        ${person(-30, 34, 'linhLe', 'walk', { s: 0.32 })}${plough(-14, 30, { L: 34, t: 3, hd: 12 })}
        ${sun(44, -28, 9, false)}`))}
      ${at(3, `${sparkles([[220, 120, 7], [146, 110, 6]])}`)}`),
  ],
};
