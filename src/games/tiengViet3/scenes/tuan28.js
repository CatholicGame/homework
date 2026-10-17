// Cảnh phim bài thơ "Em yêu Tổ quốc Việt Nam" (Phạm Hổ), Tuần 28 Tiếng Việt 3: 6 khổ, mỗi khổ một cảnh.
// data-l="k": hiện từ dòng thứ k của khổ (đếm từ 1); data-off: ẩn từ dòng đó (đổi dáng nhân vật).
// Nhân vật (cast.js): Linh là "em" của bài thơ; Nam, Minh cùng chào cờ ở khổ cuối; người lái đò: linhLe (nón lá).
// Bản đồ Việt Nam vẽ giản lược hình chữ S (có Hoàng Sa, Trường Sa); vật riêng của tuần vẽ ở các hàm dưới đây.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, grass, tufts, flowers, tree, sparkles, heart, flagPole, thatchHouse, LINE } from '../sceneKit.js';

/** Bản đồ Việt Nam hình chữ S trong hộp 100×200 (gốc trên trái). */
const VN = `M18 4 C30 0 46 2 58 6 C70 4 84 10 92 22 C86 30 74 34 66 42 C60 48 58 56 54 64 C50 72 46 80 48 88
  C54 98 64 106 72 116 C80 128 82 142 76 154 C70 166 58 176 46 184 C38 190 30 196 22 198 C20 190 24 182 30 176
  C38 168 44 160 46 150 C48 140 44 130 38 120 C32 110 30 100 32 92 C34 84 36 76 32 68 C26 58 16 50 8 42 C2 34 4 22 10 12Z`;

/** Sao vàng năm cánh (tâm x, y, bán kính r). */
const star5 = (x, y, r, c = '#FFFF00') => `<polygon points="${Array.from({ length: 10 }, (_, i) => {
  const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.4 : r;
  return `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`;
}).join(' ')}" fill="${c}"/>`;

/** Cờ đỏ sao vàng bay (x, y: đầu cột; w rộng). */
const bigFlag = (x, y, w = 60) => `<g class="sc-sway" style="--d:0.3s">
  <path d="M${x} ${y} Q${x + w * 0.5} ${y - 6} ${x + w} ${y} V${y + w * 0.66} Q${x + w * 0.5} ${y + w * 0.6} ${x} ${y + w * 0.66}Z" fill="#DA251D" stroke="#B91C1C" stroke-width="0.8"/>
  ${star5(x + w / 2, y + w * 0.33, w * 0.2)}</g>`;

/** Dãy núi nhiều lớp (trùng điệp). */
const ranges = (y, c1 = '#A7C7B5', c2 = '#7FAE95') => `<path d="M0 ${y} L50 ${y - 50} L90 ${y - 20} L140 ${y - 70} L200 ${y - 16} L250 ${y - 62} L310 ${y - 18} L360 ${y - 66} L420 ${y - 22} L480 ${y - 54} V${y + 40} H0Z" fill="${c1}"/>
  <path d="M0 ${y + 14} L70 ${y - 26} L120 ${y + 4} L180 ${y - 40} L240 ${y + 6} L300 ${y - 34} L350 ${y + 4} L410 ${y - 36} L480 ${y} V${y + 50} H0Z" fill="${c2}"/>`;

/** Sóng biển: các hàng sóng nhấp nhô (x1…x2, y từ y1, n hàng). */
const waves = (x1, x2, y1, n = 4, c = '#E0F2FE') => Array.from({ length: n }, (_, r) => {
  const y = y1 + r * 18, off = (r % 2) * 14;
  let d = `M${x1 + off} ${y}`;
  for (let x = x1 + off; x < x2; x += 28) d += ` q7 -6 14 0 q7 6 14 0`;
  return `<g class="sc-bob" style="--d:${r * 0.6}s"><path d="${d}" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.85"/></g>`;
}).join('');

/** Ruộng lúa nhìn xa: các ô thửa xen màu xanh / vàng. */
const paddies = (y0, rows = 4) => Array.from({ length: rows }, (_, r) => {
  const y = y0 + r * (14 + r * 4), h = 14 + r * 4;
  return Array.from({ length: 6 + r }, (_, k) => {
    const n = 6 + r, w = W / n;
    return `<rect x="${(k * w).toFixed(1)}" y="${y}" width="${(w - 3).toFixed(1)}" height="${h - 3}" rx="2" fill="${(k + r) % 3 === 0 ? '#FACC15' : (k + r) % 3 === 1 ? '#86EFAC' : '#4ADE80'}"/>`;
  }).join('');
}).join('');

/** Bao thóc (x giữa, y đáy). */
const sack = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-14 0 Q-18 -18 -10 -30 L-6 -34 H6 L10 -30 Q18 -18 14 0Z" fill="#E7C9A1" stroke="${LINE}" stroke-width="1"/>
  <path d="M-7 -34 Q0 -40 7 -34" stroke="#A16207" stroke-width="2" fill="none"/>
  <ellipse cx="0" cy="-34" rx="7" ry="3" fill="#FACC15"/></g>`;

/** Bó lúa chín (x, y chân). */
const sheaf = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-sway" style="--d:${(x % 5) / 2}s">
  ${[-8, -4, 0, 4, 8].map(dx => `<path d="M${dx * 0.4} 0 Q${dx * 0.6} -14 ${dx} -26" stroke="#CA8A04" stroke-width="2" fill="none"/><ellipse cx="${dx * 1.15}" cy="-28" rx="2.4" ry="5" fill="#FACC15" transform="rotate(${dx * 2} ${dx * 1.15} -28)"/>`).join('')}
  <path d="M-4 -10 H4" stroke="#B45309" stroke-width="3"/></g></g>`;

/** Con cá (x, y, hướng phải; c màu). */
const fish = (x, y, s = 1, c = '#F97316', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M-14 0 Q-4 -10 10 0 Q-4 10 -14 0Z" fill="${c}" stroke="${LINE}" stroke-width="0.8"/><path d="M-14 0 L-22 -7 V7Z" fill="${c}" stroke="${LINE}" stroke-width="0.8"/>
  <circle cx="5" cy="-1.5" r="1.4" fill="#1F2937"/></g></g>`;

/** Con tôm (x, y). */
const shrimp = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M10 -4 Q2 -12 -8 -6 Q-14 0 -10 6 L-6 3 Q-8 -2 -3 -5 Q4 -7 8 0Z" fill="#FB7185" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M-10 6 L-16 4 M-10 6 L-14 10" stroke="#FB7185" stroke-width="2" stroke-linecap="round"/>
  <path d="M10 -4 Q20 -14 24 -20 M9 -2 Q20 -8 26 -10" stroke="#BE123C" stroke-width="0.9" fill="none"/><circle cx="7" cy="-5" r="1" fill="#1F2937"/></g></g>`;

/** Đống gỗ tròn (x giữa, y đáy). */
const logs = (x, y) => `<g>${[[-16, 0], [0, 0], [16, 0], [-8, -14], [8, -14], [0, -28]].map(([dx, dy]) =>
  `<circle cx="${x + dx}" cy="${y + dy - 8}" r="8" fill="#B45309" stroke="${LINE}" stroke-width="1"/><circle cx="${x + dx}" cy="${y + dy - 8}" r="4" fill="#FCD9A8"/><circle cx="${x + dx}" cy="${y + dy - 8}" r="1.4" fill="#B45309"/>`).join('')}</g>`;

/** Quặng: tảng đá có vân vàng óng (x giữa, y đáy). */
const ore = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-20 0 L-16 -16 L-4 -24 L12 -20 L20 -6 L18 0Z" fill="#78716C" stroke="${LINE}" stroke-width="1"/>
  <path d="M-12 -12 L-4 -16 L2 -10 M6 -16 L12 -10 M-6 -4 L4 -6" stroke="#FACC15" stroke-width="3" stroke-linecap="round"/></g>`;

/** Khóm tre làng (x gốc, y đất, s). */
const bamboo = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[-14, -6, 2, 10, 16].map((dx, i) => `<g class="sc-sway" style="--d:${i * 0.5}s"><path d="M${dx} 0 Q${dx + (dx - 1) * 0.6} -60 ${dx * 2.4} -${110 + (i % 2) * 14}" stroke="${i % 2 ? '#65A30D' : '#4D7C0F'}" stroke-width="5" fill="none"/>
    ${[30, 55, 80].map(h => `<path d="M${dx + (dx - 1) * 0.3 * h / 60} -${h} h5" stroke="#365314" stroke-width="1.5"/>`).join('')}
    ${[0, 1, 2, 3].map(k => `<path d="M${dx * 2.4 - 2 + k * 2} -${108 + (i % 2) * 14 - k * 16} q${12 - k * 6} -2 ${20 - k * 4} 8 q-12 0 -${20 - k * 4} -8Z" fill="${k % 2 ? '#84CC16' : '#4D7C0F'}"/>
      <path d="M${dx * 2.4 + 2 - k * 2} -${100 + (i % 2) * 14 - k * 16} q-${12 - k * 4} -2 -${20 - k * 4} 8 q12 0 ${20 - k * 4} -8Z" fill="${k % 2 ? '#4D7C0F' : '#84CC16'}"/>`).join('')}</g>`).join('')}</g>`;

/** Con đò mui (x giữa, y mặt nước). */
const ferry = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M-62 -10 Q0 18 62 -10 L54 -2 Q0 12 -54 -2Z" fill="#7C4A21" stroke="${LINE}" stroke-width="1"/>
  <path d="M-62 -10 Q0 4 62 -10" stroke="#A16207" stroke-width="2" fill="none"/>
  <path d="M-30 -8 Q-24 -36 0 -38 Q24 -36 30 -8Z" fill="#D4A54A" stroke="${LINE}" stroke-width="1"/>
  ${[-22, -12, 0, 12, 22].map(dx => `<path d="M${dx} -36 Q${dx * 1.1} -22 ${dx * 1.2} -8" stroke="#A16207" stroke-width="1"/>`).join('')}</g>`;

/** Bến gỗ: sàn ván, cọc. */
const pier = (x, y, w = 70) => `<g><rect x="${x}" y="${y - 6}" width="${w}" height="8" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
  ${[x + 6, x + w / 2, x + w - 8].map(px => `<rect x="${px}" y="${y}" width="6" height="30" fill="#92400E"/>`).join('')}
  ${Array.from({ length: Math.floor(w / 10) }, (_, i) => `<path d="M${x + 10 + i * 10} ${y - 6} v8" stroke="#92400E" stroke-width="1"/>`).join('')}</g>`;

/** Đài tưởng niệm: tháp trắng có sao vàng trên nền đỏ (x giữa, y nền). */
const monument = (x, y) => `<g>
  <rect x="${x - 52}" y="${y - 12}" width="104" height="12" fill="#D6D3D1" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x - 40}" y="${y - 24}" width="80" height="12" fill="#E7E5E4" stroke="${LINE}" stroke-width="1"/>
  <path d="M${x - 18} ${y - 24} L${x - 10} ${y - 168} L${x} ${y - 182} L${x + 10} ${y - 168} L${x + 18} ${y - 24}Z" fill="#F5F5F4" stroke="${LINE}" stroke-width="1"/>
  <path d="M${x} ${y - 182} V${y - 24}" stroke="#D6D3D1" stroke-width="1.4"/>
  <circle cx="${x}" cy="${y - 132}" r="12" fill="#DA251D" stroke="${LINE}" stroke-width="0.8"/>${star5(x, y - 132, 9)}
  ${[-36, 36].map(dx => `<g transform="translate(${x + dx} ${y - 26})"><circle r="11" fill="#16A34A"/>${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${(Math.cos(a * Math.PI / 180) * 8).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 8).toFixed(1)}" r="3.4" fill="${a % 120 ? '#FACC15' : '#EF4444'}"/>`).join('')}<circle r="4" fill="#FEF3C7"/></g>`).join('')}</g>`;

/** Pháo hoa tỏa tròn. */
const firework = (x, y, r, c, d = 0) => `<g class="sc-twinkle" style="--d:${d}s">${Array.from({ length: 12 }, (_, i) => {
  const a = i * Math.PI / 6;
  return `<path d="M${(x + Math.cos(a) * r * 0.35).toFixed(1)} ${(y + Math.sin(a) * r * 0.35).toFixed(1)} L${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
}).join('')}<circle cx="${x}" cy="${y}" r="3" fill="${c}"/></g>`;

export default [
  // Khổ 1: Tổ quốc đẹp, cong cong hình lưỡi liềm; trên núi cao trùng điệp, dưới biển sóng mênh mông
  () => svg('Bản đồ Việt Nam cong hình chữ S, núi cao ở trên, biển rộng ở dưới', `
    ${sky('t28s1sky', '#7DD3FC', '#F0F9FF')}
    ${cloud(120, 36, 0.6, 0)}${cloud(380, 44, 0.5, 2)}
    ${at(3, ranges(150))}
    ${at(4, `<path d="M300 40 Q380 50 480 40 V${H} H0 V236 Q120 222 200 240 Q260 250 290 230 Q330 170 300 40Z" fill="#38BDF8"/>
      ${waves(300, 470, 90, 3)}${waves(0, 480, 250, 3)}
      ${[[352, 96], [358, 104], [348, 106]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#FDE68A" stroke="${LINE}" stroke-width="0.6"/>`).join('')}
      ${[[372, 188], [380, 196], [366, 200], [376, 206]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#FDE68A" stroke="${LINE}" stroke-width="0.6"/>`).join('')}`)}
    <path d="M60 300 V262 Q110 238 160 252 Q190 262 196 300Z" fill="#86EFAC"/>
    ${at(2, `<g transform="translate(196 22) scale(1.25)"><path d="${VN}" fill="#4ADE80" stroke="#15803D" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M30 40 Q48 50 52 62 M40 120 Q50 140 44 160" stroke="#86EFAC" stroke-width="3" fill="none" stroke-linecap="round"/></g>`)}
    ${at(3, `<g transform="translate(196 22) scale(1.25)">${[[24, 16], [40, 12], [56, 18], [72, 16], [16, 30], [34, 30], [36, 104], [42, 132]].map(([x, y], i) =>
      `<path d="M${x - 8} ${y + 8} L${x} ${y - 6} L${x + 8} ${y + 8}Z" fill="${i % 2 ? '#15803D' : '#166534'}"/><path d="M${x - 2.4} ${y - 2} L${x} ${y - 6} L${x + 2.4} ${y - 2}Z" fill="#fff"/>`).join('')}</g>`)}
    ${at(1, person(126, 284, 'linh', 'raise', { s: 0.86, prop: 'flag', mood: 'joy' }))}
    ${at(2, sparkles([[176, 60, 7], [330, 30, 8]]))}`),

  // Khổ 2: những cánh đồng bình yên nằm phơi mình ở giữa; sông xanh, sông hồng uốn quanh như dải lụa
  () => svg('Cánh đồng lúa phơi nắng, những dòng sông xanh, hồng uốn quanh', `
    ${sky('t28s2sky', '#7DD3FC', '#FEF9C3')}
    ${at(2, sun(330, 52, 22))}
    ${cloud(140, 40, 0.6, 1)}
    ${ranges(140, '#B7D7C4', '#93C2A8')}
    <rect y="150" width="${W}" height="${H - 150}" fill="#65A30D"/>
    ${at(1, paddies(152))}
    ${at(2, `<rect y="150" width="${W}" height="${H - 150}" fill="#FEF08A" opacity="0.18"/>${sparkles([[150, 180, 6], [300, 200, 7], [220, 250, 6]], '#FFFBEB')}`)}
    ${at(3, `<path d="M150 150 Q120 190 180 210 Q260 236 200 300" stroke="#38BDF8" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M150 150 Q120 190 180 210 Q260 236 200 300" stroke="#BAE6FD" stroke-width="3" fill="none" stroke-dasharray="10 12"/>
      <path d="M340 150 Q380 180 320 206 Q260 232 340 266 Q380 284 360 300" stroke="#F472B6" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M340 150 Q380 180 320 206 Q260 232 340 266 Q380 284 360 300" stroke="#FBCFE8" stroke-width="3" fill="none" stroke-dasharray="10 12"/>`)}
    ${at(4, `<path d="M60 176 Q100 168 120 186 Q140 204 176 200" stroke="#7DD3FC" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>
      <path d="M420 182 Q390 196 360 186 Q338 178 330 196" stroke="#F9A8D4" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>
      <path d="M90 260 Q130 240 160 256 Q180 268 200 262" stroke="#7DD3FC" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>
      <path d="M420 230 Q400 252 372 240" stroke="#F9A8D4" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>
      ${sparkles([[200, 226, 6], [330, 228, 6], [176, 272, 5], [352, 276, 5]], '#fff')}`)}`),

  // Khổ 3: Tổ quốc giàu: đồng ruộng vựa thóc thơm, biển bạc đầy cá tôm, rừng vàng đầy quặng, gỗ
  () => svg('Đồng ruộng đầy thóc, biển bạc nhiều cá tôm, rừng vàng nhiều gỗ và quặng', `
    ${sky('t28s3sky', '#7DD3FC', '#F0F9FF')}
    ${sun(110, 46, 18)}${cloud(300, 36, 0.55, 1)}
    <path d="M60 196 V148 Q150 136 246 150 V196Z" fill="#FDE047"/>
    ${[160, 172, 184].map(y => `<path d="M60 ${y} Q150 ${y - 8} 246 ${y}" stroke="#EAB308" stroke-width="2" fill="none"/>`).join('')}
    <path d="M240 196 V140 Q320 110 420 128 V196Z" fill="#65A30D"/>
    ${tree(262, 160, 0.5, '#22C55E', '#15803D')}${tree(300, 150, 0.6, '#16A34A', '#166534')}${tree(344, 146, 0.62, '#22C55E', '#15803D')}${tree(392, 150, 0.58, '#16A34A', '#166534')}
    <rect y="196" width="${W}" height="${H - 196}" fill="#93C5FD"/>
    <path d="M0 196 H${W}" stroke="#E2E8F0" stroke-width="3"/>
    ${waves(60, 420, 214, 4, '#F8FAFC')}
    ${at(1, `${flagPole(244, 196, 120)}${sparkles([[220, 96, 7], [290, 92, 6]])}`)}
    ${at(2, `${sheaf(80, 196, 1)}${sheaf(104, 194, 1.1)}${sack(140, 194, 1)}${sack(170, 196, 1.1)}${sack(200, 194, 0.9)}${sparkles([[150, 136, 6]], '#FDE68A')}`)}
    ${at(3, `${sparkles([[120, 222, 6], [330, 264, 6], [250, 230, 5]], '#fff')}
      ${fish(120, 248, 1.1, '#F97316', 0)}${fish(190, 272, 1, '#FACC15', 0.8)}${fish(300, 240, 1.1, '#FB923C', 1.4)}${fish(370, 274, 1, '#F59E0B', 0.4)}
      ${shrimp(240, 262, 1.1, 0.6)}${shrimp(160, 230, 0.9, 1.6)}${shrimp(350, 222, 0.9, 1)}`)}
    ${at(4, `${logs(300, 196)}${ore(358, 194, 1)}${ore(386, 196, 0.8)}${sparkles([[360, 160, 6], [390, 168, 5]], '#FDE047')}`)}`),

  // Khổ 4: Ôi Việt Nam! Tổ quốc bao thương mến; yêu từng khóm tre làng, từng con đò vào bến
  () => svg('Làng quê có khóm tre, con đò vào bến, Linh vẫy cờ', `
    ${sky('t28s4sky', '#93C5FD', '#FEF3C7')}
    ${cloud(150, 40, 0.6, 0)}${cloud(360, 30, 0.5, 2)}
    <path d="M0 178 Q240 164 480 180 V214 H0Z" fill="#86EFAC"/>
    ${thatchHouse(320, 186, 110, 40)}
    <path d="M0 214 Q240 204 480 216 V${H} H0Z" fill="#60A5FA"/>
    ${waves(60, 420, 236, 3, '#DBEAFE')}
    <path d="M60 210 Q90 200 120 214 L120 300 H60Z" fill="#86EFAC"/>
    ${at(3, `${bamboo(206, 190, 0.75)}${bamboo(410, 190, 0.7)}`)}
    ${at(4, `${pier(110, 226, 70)}${ferry(270, 252)}${person(312, 250, 'linhLe', 'stand', { s: 0.42, flip: true })}
      <path d="M296 212 L330 282" stroke="#8B5A2B" stroke-width="2.6" stroke-linecap="round"/>`)}
    ${at(1, person(98, 262, 'linh', 'raise', { s: 0.72, prop: 'flag', mood: 'joy' }))}
    ${at(2, `${heart(132, 118, 1.3, '#F43F5E', 0)}${heart(160, 96, 1, '#FB7185', 0.8)}${heart(110, 92, 0.9, '#F43F5E', 1.4)}`)}`),

  // Khổ 5: càng yêu sông núi sinh ra những anh hùng; em không nói ai biết nhưng em sướng vô cùng
  () => svg('Sông núi quê hương, đài tưởng niệm các anh hùng, Linh vui sướng', `
    ${sky('t28s5sky', '#7DD3FC', '#FFF7ED')}
    ${cloud(130, 36, 0.6, 1)}
    ${at(1, ranges(156))}
    <path d="M0 194 Q240 184 480 196 V300 H0Z" fill="#86EFAC"/>
    ${at(1, `<path d="M300 190 Q270 204 300 220 Q340 240 300 262 Q280 280 310 300 H372 Q344 282 360 262 Q392 236 340 216 Q318 204 320 190Z" fill="#38BDF8"/>
      <path d="M310 194 Q290 206 318 222 Q356 242 322 264 Q300 282 340 300" stroke="#BAE6FD" stroke-width="2.4" fill="none" stroke-dasharray="10 12"/>`)}
    ${at(2, `${monument(150, 228)}${sparkles([[150, 30, 9], [110, 80, 6], [192, 72, 6]], '#FDE047')}`)}
    ${at(3, person(258, 290, 'linh', 'clap', { s: 0.9, mood: 'shy' }), { off: 4 })}
    ${at(4, person(258, 290, 'linh', 'cheer', { s: 0.9, mood: 'joy' }))}
    ${at(3, `${heart(258, 150, 1.4, '#F43F5E', 0)}`)}
    ${at(4, `${heart(222, 136, 1, '#FB7185', 0.6)}${heart(296, 132, 1.1, '#F43F5E', 1.2)}${sparkles([[220, 170, 7], [300, 166, 8], [258, 112, 6]])}`)}
    ${flowers([[90, 296, '#F472B6'], [400, 294, '#FDE047']])}${tufts([[214, 296], [380, 290]])}`),

  // Khổ 6: em là công dân nhỏ của nước Việt Nam anh hùng
  () => svg('Các bạn nhỏ đứng nghiêm chào lá cờ Tổ quốc tung bay', `
    ${sky('t28s6sky', '#60A5FA', '#E0F2FE')}
    ${at(2, `${firework(110, 60, 26, '#FACC15', 0)}${firework(370, 54, 24, '#F87171', 0.6)}${firework(330, 120, 16, '#FDE047', 1.2)}`)}
    ${grass(214, '#86EFAC')}${grass(246, '#4ADE80')}
    ${tree(80, 222, 0.7)}${tree(410, 224, 0.7)}
    <rect x="236" y="70" width="5" height="160" fill="#64748B"/><rect x="226" y="226" width="25" height="10" rx="2" fill="#94A3B8"/>
    ${at(1, `${bigFlag(241, 74, 40)}`, { off: 2 })}
    ${at(2, `${bigFlag(241, 72, 78)}${sparkles([[220, 60, 8], [340, 140, 7]])}`)}
    ${at(1, `${person(150, 290, 'nam', 'stand', { s: 0.86 })}${person(196, 292, 'linh', 'stand', { s: 0.86 })}${person(296, 292, 'minh', 'stand', { s: 0.86, flip: true })}`)}
    ${at(2, `${heart(196, 160, 1.1, '#F43F5E', 0)}${heart(150, 152, 0.9, '#FB7185', 0.7)}${heart(296, 160, 1, '#F43F5E', 1.2)}`)}
    ${flowers([[110, 296, '#F472B6'], [360, 296, '#FDE047'], [400, 286, '#A78BFA']])}`),
];
