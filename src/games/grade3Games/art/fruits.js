/**
 * Trái cây SVG phong cách phẳng. Mỗi hàm vẽ một quả tâm (x, y), cỡ r.
 * basketSvg(): rổ đầy quả đặt trên đĩa cân (gốc = giữa đáy rổ).
 */

const orange = (x, y, r) => `
  <circle cx="${x}" cy="${y}" r="${r}" fill="#FB923C" stroke="#C2410C" stroke-width="1.5"/>
  <circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.22}" fill="#FED7AA" opacity="0.8"/>
  <path d="M${x} ${y - r} q${r * 0.5} ${-r * 0.5} ${r * 0.9} ${-r * 0.2} q${-r * 0.4} ${r * 0.4} ${-r * 0.9} ${r * 0.2}Z" fill="#22C55E" stroke="#15803D" stroke-width="1"/>`;

const apple = (x, y, r) => `
  <path d="M${x} ${y - r * 0.7} C${x - r * 1.3} ${y - r * 1.3} ${x - r * 1.3} ${y + r * 0.9} ${x - r * 0.3} ${y + r * 0.95}
           Q${x} ${y + r * 0.8} ${x + r * 0.3} ${y + r * 0.95} C${x + r * 1.3} ${y + r * 0.9} ${x + r * 1.3} ${y - r * 1.3} ${x} ${y - r * 0.7}Z"
        fill="#EF4444" stroke="#991B1B" stroke-width="1.5"/>
  <circle cx="${x - r * 0.45}" cy="${y - r * 0.15}" r="${r * 0.2}" fill="#FECACA" opacity="0.8"/>
  <path d="M${x} ${y - r * 0.65} l${r * 0.1} ${-r * 0.5}" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>
  <path d="M${x + r * 0.1} ${y - r * 1.05} q${r * 0.6} ${-r * 0.3} ${r * 0.8} ${r * 0.1} q${-r * 0.5} ${r * 0.2} ${-r * 0.8} ${-r * 0.1}Z" fill="#22C55E"/>`;

const mango = (x, y, r) => `
  <ellipse cx="${x}" cy="${y}" rx="${r * 1.15}" ry="${r * 0.82}" transform="rotate(-18 ${x} ${y})" fill="#FBBF24" stroke="#B45309" stroke-width="1.5"/>
  <ellipse cx="${x + r * 0.45}" cy="${y - r * 0.2}" rx="${r * 0.5}" ry="${r * 0.4}" fill="#F97316" opacity="0.45"/>
  <path d="M${x - r * 1} ${y - r * 0.2} l${-r * 0.25} ${-r * 0.3}" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>`;

const grapes = (x, y, r) => {
  const g = r * 0.36;
  const pts = [[-1.5, -1.3], [0, -1.4], [1.5, -1.3], [-0.8, 0], [0.8, 0], [-1.6, 0.1], [1.6, 0.1], [0, 1.2], [-0.8, 1.3], [0.8, 1.3]];
  return pts.map(([dx, dy]) => `<circle cx="${x + dx * g}" cy="${y + dy * g}" r="${g}" fill="#8B5CF6" stroke="#5B21B6" stroke-width="1.2"/>`).join('')
    + `<path d="M${x} ${y - r * 0.8} l${r * 0.15} ${-r * 0.45}" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>`;
};

// Thanh long (theo mẫu người dùng gửi, vẽ lại bằng SVG): vẽ trong hệ toạ độ riêng (thân bán kính ~40), nghiêng như hình mẫu, rồi phóng theo r.
// Lá vảy: bản rộng, hơi cong, gốc xanh đậm, chóp xanh vàng nhạt.
const dragonLeaf = (x, y, rot, L, w, bend = 0.25) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M${-w * 0.45} 0 C${-w} ${-L * 0.35} ${-w * 0.4 + L * bend} ${-L * 0.8} ${L * bend} ${-L} C${w * 0.3 + L * bend * 0.5} ${-L * 0.7} ${w} ${-L * 0.35} ${w * 0.45} 0 Z" fill="#7CB342"/>
  <path d="M${-w * 0.45} 0 C${-w} ${-L * 0.35} ${-w * 0.4 + L * bend} ${-L * 0.8} ${L * bend} ${-L} C${-w * 0.1 + L * bend * 0.6} ${-L * 0.6} 0 ${-L * 0.3} 0 0 Z" fill="#558B2F" opacity=".5"/>
  <path d="M${L * bend * 0.55 - w * 0.35} ${-L * 0.6} C${L * bend * 0.8} ${-L * 0.75} ${L * bend} ${-L * 0.9} ${L * bend} ${-L} C${L * bend * 0.8 + w * 0.3} ${-L * 0.82} ${L * bend * 0.6 + w * 0.45} ${-L * 0.68} ${L * bend * 0.55 + w * 0.3} ${-L * 0.58} Z" fill="#D4E88A"/></g>`;
// [góc trên thân (0 = đỉnh), dài, rộng]: vảy quanh viền, chóp hướng về đỉnh quả.
const DRAGON_RIM = [[-160, 18, 8], [-115, 24, 9], [-68, 25, 9], [68, 25, 9], [115, 24, 9], [160, 18, 8]];
// vảy nằm trên mặt quả [x, y, xoay, dài, rộng]
const DRAGON_FACE = [[-16, 22, -14, 22, 9], [18, 20, 18, 20, 8.5], [-14, -10, -18, 20, 8.5]];
const DRAGON_SEEDS = [[4, -18], [14, -10], [0, 4], [12, 10], [24, 14], [26, -6], [-10, 10]];
const dragonFruit = (x, y, r) => `<g transform="translate(${x} ${y}) scale(${(r / 40).toFixed(3)}) rotate(28)">
  <ellipse cx="0" cy="0" rx="37" ry="42" fill="#D81B60"/>
  <path d="M-37 -2 A37 42 0 0 0 30 24 Q-4 36 -26 12 Q-34 4 -37 -2 Z" fill="#AD1457" opacity=".55"/>
  <path d="M-6 -30 Q20 -30 26 -4 Q28 22 8 26 Q-10 16 -10 -6 Q-10 -24 -6 -30 Z" fill="#EF6A9A" opacity=".7"/>
  ${DRAGON_SEEDS.map(([sx, sy]) => `<ellipse cx="${sx}" cy="${sy}" rx="1.4" ry="2.2" fill="#7B1640" opacity=".85"/>`).join('')}
  ${DRAGON_RIM.map(([t, L, w]) => { const a = t * Math.PI / 180; return dragonLeaf((31 * Math.sin(a)).toFixed(1), (-36 * Math.cos(a)).toFixed(1), t * 0.4, L, w, Math.sign(t) * 0.18); }).join('')}
  ${DRAGON_FACE.map(([fx, fy, rot, L, w]) => dragonLeaf(fx, fy, rot, L, w, 0.15)).join('')}
  ${[[-40, 26, 9], [-12, 34, 10], [14, 32, 10], [42, 25, 9]].map(([rot, L, w]) => dragonLeaf(0, -36, rot, L, w, 0.12)).join('')}
</g>`;

const pomelo = (x, y, r) => `
  <circle cx="${x}" cy="${y + r * 0.05}" r="${r * 1.1}" fill="#A3E635" stroke="#4D7C0F" stroke-width="1.5"/>
  <circle cx="${x - r * 0.4}" cy="${y - r * 0.35}" r="${r * 0.25}" fill="#ECFCCB" opacity="0.8"/>
  <path d="M${x} ${y - r * 1.05} l${r * 0.05} ${-r * 0.3}" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>`;

const strawberry = (x, y, r) => `
  <path d="M${x - r} ${y - r * 0.5} Q${x} ${y - r * 0.9} ${x + r} ${y - r * 0.5} Q${x + r * 0.9} ${y + r * 0.6} ${x} ${y + r * 1.05} Q${x - r * 0.9} ${y + r * 0.6} ${x - r} ${y - r * 0.5}Z"
        fill="#F43F5E" stroke="#9F1239" stroke-width="1.5"/>
  ${[[-0.45, -0.1], [0.4, -0.15], [0, 0.25], [-0.3, 0.55], [0.3, 0.55], [0, -0.35]].map(([dx, dy]) =>
    `<ellipse cx="${x + dx * r}" cy="${y + dy * r}" rx="${r * 0.06}" ry="${r * 0.1}" fill="#FEF08A"/>`).join('')}
  <path d="M${x - r * 0.7} ${y - r * 0.6} L${x - r * 0.2} ${y - r * 0.95} L${x} ${y - r * 0.6} L${x + r * 0.2} ${y - r * 0.95} L${x + r * 0.7} ${y - r * 0.6}Z" fill="#22C55E" stroke="#15803D" stroke-width="1"/>`;

const longan = (x, y, r) => {
  const g = r * 0.42;
  return [[-1, -0.6], [1, -0.6], [0, 0.1], [-1.1, 0.8], [1.1, 0.8], [0, -1.3]].map(([dx, dy]) =>
    `<circle cx="${x + dx * g}" cy="${y + dy * g}" r="${g}" fill="#D6A55C" stroke="#92400E" stroke-width="1.2"/>`).join('')
    + `<path d="M${x} ${y - r * 0.95} l${r * 0.1} ${-r * 0.35}" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>`;
};

const lime = (x, y, r) => `
  <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.85}" fill="#84CC16" stroke="#3F6212" stroke-width="1.5"/>
  <circle cx="${x - r * 0.35}" cy="${y - r * 0.3}" r="${r * 0.2}" fill="#D9F99D" opacity="0.8"/>`;

const watermelon = (x, y, r) => `
  <ellipse cx="${x}" cy="${y}" rx="${r * 1.2}" ry="${r}" fill="#4ADE80" stroke="#166534" stroke-width="1.5"/>
  ${[-0.75, -0.25, 0.25, 0.75].map(k => `<path d="M${x + k * r * 1.2} ${y - r * 0.97 * Math.sqrt(1 - k * k)} Q${x + k * r * 1.2 + r * 0.14} ${y} ${x + k * r * 1.2} ${y + r * 0.97 * Math.sqrt(1 - k * k)}" fill="none" stroke="#166534" stroke-width="${(r * 0.16).toFixed(1)}" stroke-linecap="round" opacity="0.75"/>`).join('')}
  <ellipse cx="${x - r * 0.5}" cy="${y - r * 0.45}" rx="${r * 0.3}" ry="${r * 0.16}" fill="#DCFCE7" opacity="0.7"/>`;

/** Loại quả: tên, hàm vẽ, bán theo kg hay theo gam. */
export const FRUITS = {
  cam: { name: 'cam', draw: orange, unit: 'kg', size: 1 },
  tao: { name: 'táo', draw: apple, unit: 'kg', size: 1 },
  xoai: { name: 'xoài', draw: mango, unit: 'kg', size: 1.1 },
  thanhlong: { name: 'thanh long', draw: dragonFruit, unit: 'kg', size: 1.15 },
  buoi: { name: 'bưởi', draw: pomelo, unit: 'kg', size: 1.55 },
  nho: { name: 'nho', draw: grapes, unit: 'g', size: 1.3 },
  dau: { name: 'dâu tây', draw: strawberry, unit: 'g', size: 0.8 },
  nhan: { name: 'nhãn', draw: longan, unit: 'g', size: 1.15 },
  chanh: { name: 'chanh', draw: lime, unit: 'g', size: 0.8 },
  duahau: { name: 'dưa hấu', draw: watermelon, unit: 'kg', size: 1.9 },
};

// Chỗ đặt quả trong rổ (quả cỡ 1), xếp từ đáy lên; quả to hơn thì giãn chỗ và bớt số chỗ.
// Quả to (bưởi): chỗ đặt cho từng số quả 1–5, quả nào cũng thấy rõ để đếm được.
const BIG_LAYOUTS = [
  [[0, -32]],
  [[-21, -32], [21, -32]],
  [[-21, -32], [21, -32], [0, -60]],
  [[-30, -31], [0, -33], [30, -31], [0, -62]],
  [[-30, -31], [0, -33], [30, -31], [-16, -60], [16, -60]],
];
const MAX_HEAP = 21; // đống 6 + 5 + 4 + 3 + 2 + 1 quả — nhiều hơn thì rổ đã đầy

/**
 * Chỗ đặt `n` quả thành đống (hàng dưới nhiều nhất, lên trên ít dần), vừa miệng rổ rộng 100.
 * Quả càng nhiều thì vẽ càng nhỏ — số quả trong hình là số quả thật, không trùng với số kg.
 */
function heapSpots(n, k) {
  let m = 1;
  while (m * (m + 1) / 2 < n) m++;
  const r = Math.min(13 * k, 49 / m);
  const out = [];
  let left = n;
  for (let row = 0; left > 0; row++) {
    const cnt = Math.min(m - row, left);
    const y = -26 - r * 0.2 - row * r * 1.5;
    for (let i = 0; i < cnt; i++) out.push([(i - (cnt - 1) / 2) * r * 2, y]);
    left -= cnt;
  }
  return { spots: out, r };
}

/**
 * Rổ quả, gốc = giữa đáy rổ. `count` = số quả thật (tối đa MAX_HEAP quả được vẽ).
 * `tag`: chữ trên thẻ treo trước rổ (vd. "? kg" khi chưa cân, "7 kg" khi đã biết).
 */
export function basketSvg(fruitId, count = 5, { tag = '' } = {}) {
  const f = FRUITS[fruitId];
  const k = f.size || 1;
  const n = Math.max(0, Math.min(MAX_HEAP, count));
  let spots = [], r = 13 * k;
  if (n && k >= 1.5 && n <= BIG_LAYOUTS.length) spots = [...BIG_LAYOUTS[n - 1]];
  else if (n) ({ spots, r } = heapSpots(n, k));
  spots.sort((a, b) => a[1] - b[1]);
  const tagW = Math.max(46, tag.length * 7.5 + 12);
  return `
    ${spots.map(([dx, dy]) => f.draw(dx, dy, r)).join('')}
    <path data-basket d="M-50 -26 L50 -26 L42 0 L-42 0 Z" fill="#D97706" stroke="#92400E" stroke-width="2" stroke-linejoin="round"/>
    <path d="M-46 -17 L46 -17 M-44 -9 L44 -9" stroke="#92400E" stroke-width="1.5" opacity="0.6"/>
    ${[-30, -15, 0, 15, 30].map(x => `<line x1="${x}" y1="-26" x2="${x * 0.86}" y2="0" stroke="#92400E" stroke-width="1.2" opacity="0.5"/>`).join('')}
    ${tag ? `<g class="g3-basket-tag">
      <line x1="-8" y1="-24" x2="0" y2="-18" stroke="#92400E" stroke-width="1.5"/>
      <rect x="${-tagW / 2}" y="-19" width="${tagW}" height="18" rx="5" fill="#fff" stroke="#92400E" stroke-width="1.5"/>
      <text x="0" y="-6" text-anchor="middle" font-size="12" font-weight="800" fill="#1E293B" font-family="Quicksand, sans-serif">${tag}</text>
    </g>` : ''}`;
}

/** Một quả đứng riêng (bảng giá, danh sách). */
export function fruitIcon(fruitId, size = 40) {
  const f = FRUITS[fruitId];
  return `<svg viewBox="-20 -24 40 44" width="${size}" height="${size}" aria-hidden="true">${f.draw(0, 0, 14)}</svg>`;
}

// ── Từng quả riêng (quầy trái cây: bé nhặt từng quả lên đĩa cân) ─────────────
// Quả nặng hơn vẽ to hơn (diện tích theo cân nặng) để bé thấy quả to, quả nhỏ;
// `ref` = cân nặng của một quả cỡ trung bình loại đó (gam).

/** Bán kính vẽ một quả nặng `g` gam (loại có quả trung bình nặng `ref` gam). */
export function pieceR(fruitId, g, ref) {
  return 13 * FRUITS[fruitId].size * Math.sqrt(g / ref);
}

/** Một quả đứng riêng, cỡ theo cân nặng — ô trên sạp hàng. Trả về { svg, r }. */
export function pieceIcon(fruitId, g, ref) {
  const r = pieceR(fruitId, g, ref);
  const w = r * 2.6, h = r * 2.9;
  return { r, svg: `<svg viewBox="${(-w / 2).toFixed(1)} ${(-h * 0.56).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}" aria-hidden="true">${FRUITS[fruitId].draw(0, 0, r)}</svg>` };
}

/**
 * Các quả đặt trên mặt đĩa cân (gốc = giữa mặt đĩa, y hướng lên là âm): quả to xếp
 * hàng dưới, đầy hàng rộng `width` thì chồng lên hàng trên. pieces: [{ id, g }].
 * Mỗi quả là một nhóm data-pid để bấm nhấc xuống. Không ghi cân nặng — bé ước chừng bằng mắt và cân.
 */
export function panHeapSvg(fruitId, pieces, ref, width = 140) {
  const f = FRUITS[fruitId];
  const items = pieces.map(p => ({ ...p, r: pieceR(fruitId, p.g, ref) })).sort((a, b) => b.r - a.r);
  const rows = [[]];
  let rowW = 0;
  for (const it of items) {
    const d = it.r * 2.15;
    if (rowW + d > width && rows[rows.length - 1].length) { rows.push([]); rowW = 0; }
    rows[rows.length - 1].push(it);
    rowW += d;
  }
  let base = 0, out = '';
  for (const row of rows) {
    const total = row.reduce((s, it) => s + it.r * 2.15, 0);
    let x = -total / 2;
    for (const it of row) {
      const cx = x + it.r * 1.075;
      const cy = +(base - it.r).toFixed(1);
      out += `<g data-pid="${it.id}" data-cx="${cx.toFixed(1)}" data-cy="${cy}" data-r="${it.r.toFixed(2)}" class="g3-piece-on-pan">${f.draw(+cx.toFixed(1), cy, it.r)}</g>`;
      x += it.r * 2.15;
    }
    base -= Math.max(...row.map(it => it.r)) * 1.6;
  }
  return out;
}

