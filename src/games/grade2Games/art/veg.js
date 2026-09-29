/**
 * Rau củ SVG cho 🥔 Quầy rau củ (lớp 2) — cùng nét phẳng với trái cây của Chợ phiên lớp 3 (grade3Games/art/fruits.js):
 * nền màu, viền đậm cùng tông, một đốm sáng. Mỗi hàm vẽ một củ tâm (x, y), cỡ r; loại nằm ngang (khoai, ngô, cà rốt,
 * bó rau) dài hơn r theo `aw`.
 * vegHeap(): cả nhóm củ đặt trên mặt đĩa cân / trong khay (gốc = giữa mặt đĩa, y hướng lên là âm).
 */

const pumpkin = (x, y, r) => `
  <ellipse cx="${x}" cy="${y}" rx="${r * 1.25}" ry="${r * 0.95}" fill="#F97316" stroke="#9A3412" stroke-width="1.6"/>
  <ellipse cx="${x}" cy="${y}" rx="${r * 0.75}" ry="${r * 0.95}" fill="none" stroke="#9A3412" stroke-width="1.3" opacity=".7"/>
  <ellipse cx="${x}" cy="${y}" rx="${r * 0.28}" ry="${r * 0.95}" fill="none" stroke="#9A3412" stroke-width="1.3" opacity=".7"/>
  <ellipse cx="${x - r * 0.72}" cy="${y - r * 0.4}" rx="${r * 0.2}" ry="${r * 0.14}" fill="#FED7AA" opacity=".85"/>
  <path d="M${x - r * 0.1} ${y - r * 0.9} q${r * 0.05} ${-r * 0.35} ${r * 0.3} ${-r * 0.45}" stroke="#4D7C0F" stroke-width="${(r * 0.16).toFixed(1)}" stroke-linecap="round" fill="none"/>`;

const cabbage = (x, y, r) => `
  <path d="M${x} ${y + r} C${x - r * 1.35} ${y + r} ${x - r * 1.3} ${y - r * 0.55} ${x - r * 0.55} ${y - r * 0.85} Q${x - r * 0.75} ${y - r * 0.1} ${x} ${y + r} Z" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
  <path d="M${x} ${y + r} C${x + r * 1.35} ${y + r} ${x + r * 1.3} ${y - r * 0.55} ${x + r * 0.55} ${y - r * 0.85} Q${x + r * 0.75} ${y - r * 0.1} ${x} ${y + r} Z" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
  <circle cx="${x}" cy="${y - r * 0.08}" r="${r * 0.78}" fill="#BBF7D0" stroke="#15803D" stroke-width="1.5"/>
  <path d="M${x - r * 0.55} ${y + r * 0.35} Q${x - r * 0.1} ${y - r * 0.1} ${x + r * 0.15} ${y - r * 0.8}" fill="none" stroke="#15803D" stroke-width="1.3"/>
  <path d="M${x - r * 1.0} ${y + r * 0.15} Q${x - r * 0.8} ${y + r * 0.55} ${x - r * 0.35} ${y + r * 0.75} M${x + r * 1.0} ${y + r * 0.15} Q${x + r * 0.8} ${y + r * 0.55} ${x + r * 0.35} ${y + r * 0.75}" fill="none" stroke="#15803D" stroke-width="1.1" opacity=".7"/>
  <circle cx="${x + r * 0.25}" cy="${y - r * 0.4}" r="${r * 0.15}" fill="#F0FDF4" opacity=".9"/>`;

const kohlrabi = (x, y, r) => {
  const leaf = (rot) => `<g transform="rotate(${rot} ${x} ${y})">
    <path d="M${x} ${y - r * 0.7} V${y - r * 1.35}" stroke="#65A30D" stroke-width="${(r * 0.16).toFixed(1)}" stroke-linecap="round"/>
    <path d="M${x} ${y - r * 1.2} C${x - r * 0.55} ${y - r * 1.4} ${x - r * 0.45} ${y - r * 2.1} ${x} ${y - r * 2.3} C${x + r * 0.45} ${y - r * 2.1} ${x + r * 0.55} ${y - r * 1.4} ${x} ${y - r * 1.2} Z" fill="#84CC16" stroke="#3F6212" stroke-width="1.2"/>
    <path d="M${x} ${y - r * 1.3} V${y - r * 2.1}" stroke="#3F6212" stroke-width="1" opacity=".6"/></g>`;
  return `${leaf(-38)}${leaf(38)}${leaf(0)}
  <circle cx="${x}" cy="${y}" r="${r}" fill="#D9F99D" stroke="#4D7C0F" stroke-width="1.6"/>
  <path d="M${x - r * 0.95} ${y + r * 0.2} q${-r * 0.2} ${-r * 0.1} ${-r * 0.3} ${-r * 0.35} M${x + r * 0.95} ${y + r * 0.2} q${r * 0.2} ${-r * 0.1} ${r * 0.3} ${-r * 0.35}" stroke="#4D7C0F" stroke-width="1.3" stroke-linecap="round" fill="none"/>
  <circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.2}" fill="#F7FEE7" opacity=".9"/>
  <path d="M${x} ${y + r} v${r * 0.2}" stroke="#4D7C0F" stroke-width="1.6" stroke-linecap="round"/>`;
};

// Khoai lang: củ dài, hai đầu thon, vỏ tím đỏ.
const sweetPotato = (x, y, r) => `
  <path d="M${x - r * 1.6} ${y + r * 0.1} Q${x - r * 1.1} ${y - r * 0.85} ${x} ${y - r * 0.8} Q${x + r * 1.2} ${y - r * 0.75} ${x + r * 1.65} ${y - r * 0.1}
           Q${x + r * 1.2} ${y + r * 0.8} ${x} ${y + r * 0.78} Q${x - r * 1.1} ${y + r * 0.8} ${x - r * 1.6} ${y + r * 0.1} Z" fill="#C2417A" stroke="#831843" stroke-width="1.5"/>
  <path d="M${x - r * 0.9} ${y - r * 0.35} q${r * 0.5} ${-r * 0.2} ${r * 1.1} ${-r * 0.15}" stroke="#F9A8D4" stroke-width="${(r * 0.18).toFixed(1)}" stroke-linecap="round" fill="none" opacity=".7"/>
  <path d="M${x - r * 0.2} ${y + r * 0.35} h${r * 0.25} M${x + r * 0.6} ${y + r * 0.1} h${r * 0.2}" stroke="#831843" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>`;

// Bắp ngô: hạt vàng, bẹ xanh ôm hai bên, nằm ngang.
const corn = (x, y, r) => {
  let grains = '';
  for (let i = -3; i <= 3; i++) for (const j of [-0.3, 0.3]) grains += `<circle cx="${x + i * r * 0.36}" cy="${y + j * r}" r="${r * 0.17}" fill="#FDE047"/>`;
  return `
  <ellipse cx="${x}" cy="${y}" rx="${r * 1.45}" ry="${r * 0.72}" fill="#FACC15" stroke="#A16207" stroke-width="1.5"/>
  ${grains}
  <path d="M${x - r * 2} ${y - r * 0.1} Q${x - r * 0.8} ${y - r * 1.05} ${x + r * 0.6} ${y - r * 0.55} Q${x - r * 0.6} ${y - r * 0.35} ${x - r * 2} ${y - r * 0.1} Z" fill="#4ADE80" stroke="#166534" stroke-width="1.3"/>
  <path d="M${x - r * 2} ${y + r * 0.1} Q${x - r * 0.8} ${y + r * 1.05} ${x + r * 0.9} ${y + r * 0.6} Q${x - r * 0.5} ${y + r * 0.35} ${x - r * 2} ${y + r * 0.1} Z" fill="#22C55E" stroke="#166534" stroke-width="1.3"/>`;
};

// Bó rau muống: nhiều cọng dài, lá nhọn một đầu, buộc lạt ở giữa — to mà nhẹ.
const waterSpinach = (x, y, r) => {
  const L = r * 2.1;
  let s = '';
  [-0.42, -0.2, 0, 0.2, 0.42].forEach((k, i) => {
    const yy = y + k * r;
    s += `<path d="M${x - L} ${yy + k * r * 0.1} Q${x} ${yy} ${x + L * 0.55} ${yy - k * r * 0.2}" stroke="${i % 2 ? '#65A30D' : '#84CC16'}" stroke-width="${(r * 0.16).toFixed(1)}" stroke-linecap="round" fill="none"/>`;
  });
  [[-0.55, -30], [-0.25, -8], [0.05, 10], [0.35, 26], [0.6, 40]].forEach(([k, rot]) => {
    const lx = x + L * 0.62 + Math.abs(k) * r * 0.3, ly = y + k * r;
    s += `<ellipse cx="${lx}" cy="${ly}" rx="${r * 0.62}" ry="${r * 0.2}" transform="rotate(${rot} ${lx} ${ly})" fill="#22C55E" stroke="#166534" stroke-width="1.2"/>`;
  });
  s += `<rect x="${x - r * 0.35}" y="${y - r * 0.62}" width="${r * 0.3}" height="${r * 1.24}" rx="${r * 0.1}" fill="#FDBA74" stroke="#9A3412" stroke-width="1.2"/>`;
  return s;
};

// Cà rốt: nằm ngang, ngọn lá bên trái.
const carrot = (x, y, r) => `
  <path d="M${x - r * 1.3} ${y} q${-r * 0.6} ${-r * 0.7} ${-r * 0.95} ${-r * 0.6} M${x - r * 1.3} ${y} q${-r * 0.8} ${-r * 0.1} ${-r * 1.05} ${r * 0.2} M${x - r * 1.3} ${y} q${-r * 0.5} ${r * 0.5} ${-r * 0.8} ${r * 0.75}" stroke="#16A34A" stroke-width="${(r * 0.22).toFixed(1)}" stroke-linecap="round" fill="none"/>
  <path d="M${x - r * 1.3} ${y - r * 0.55} Q${x - r * 1.5} ${y} ${x - r * 1.3} ${y + r * 0.55} L${x + r * 1.5} ${y + r * 0.08} Q${x + r * 1.62} ${y} ${x + r * 1.5} ${y - r * 0.08} Z" fill="#FB923C" stroke="#C2410C" stroke-width="1.4"/>
  <path d="M${x - r * 0.5} ${y - r * 0.3} v${r * 0.2} M${x + r * 0.3} ${y + r * 0.12} v${r * 0.18}" stroke="#C2410C" stroke-width="1.1" stroke-linecap="round"/>`;

const tomato = (x, y, r) => `
  <ellipse cx="${x}" cy="${y}" rx="${r * 1.05}" ry="${r * 0.92}" fill="#EF4444" stroke="#991B1B" stroke-width="1.5"/>
  <circle cx="${x - r * 0.4}" cy="${y - r * 0.3}" r="${r * 0.2}" fill="#FECACA" opacity=".85"/>
  <path d="M${x} ${y - r * 0.8} l${-r * 0.55} ${-r * 0.05} l${r * 0.35} ${-r * 0.2} l${-r * 0.1} ${-r * 0.35} l${r * 0.3} ${r * 0.2} l${r * 0.3} ${-r * 0.2} l${-r * 0.1} ${r * 0.35} l${r * 0.35} ${r * 0.2} Z" fill="#22C55E" stroke="#15803D" stroke-width="1"/>`;

/**
 * Loại rau củ: tên, loại từ (cls), hàm vẽ, cỡ vẽ r, khung vẽ (aw × ah lần r: nửa bề ngang, nửa bề cao,
 * top: phần nhô lên trên tâm), cân nặng một củ g (gam, sát thực tế — KHÔNG hiện cho bé).
 * Cân nặng chọn tròn để có những cặp nặng bằng nhau: bí đỏ 2 kg = 2 bắp cải = 4 củ su hào = 8 củ khoai…
 * Bó rau muống to mà nhẹ (bằng một củ khoai): bài học "to chưa chắc đã nặng".
 */
export const VEG = {
  bi: { name: 'bí đỏ', cls: 'quả', draw: pumpkin, r: 24, aw: 1.3, ah: 0.97, top: 1.4, g: 2000, max: 2 },
  bapcai: { name: 'bắp cải', cls: '', draw: cabbage, r: 20, aw: 1.12, ah: 1.0, top: 0.9, g: 1000, max: 2 },
  suhao: { name: 'su hào', cls: 'củ', draw: kohlrabi, r: 14, aw: 1.3, ah: 1.2, top: 2.2, g: 500, max: 4 },
  khoai: { name: 'khoai lang', cls: 'củ', draw: sweetPotato, r: 12, aw: 1.68, ah: 0.82, top: 0.82, g: 250, max: 4 },
  ngo: { name: 'bắp ngô', cls: '', draw: corn, r: 11, aw: 2.02, ah: 0.9, top: 0.9, g: 250, max: 4 },
  rau: { name: 'rau muống', cls: 'bó', draw: waterSpinach, r: 17, aw: 2.1, ah: 0.8, top: 0.8, g: 250, max: 2 },
  carot: { name: 'cà rốt', cls: 'củ', draw: carrot, r: 9, aw: 2.4, ah: 0.8, top: 0.8, g: 125, max: 4 },
  cachua: { name: 'cà chua', cls: 'quả', draw: tomato, r: 10, aw: 1.07, ah: 0.94, top: 1.25, g: 125, max: 4 },
};

/** "quả bí đỏ" / "3 củ khoai lang" / "2 bắp ngô" — một củ thì không ghi số (như sách: "quả bưởi", "4 bạn thỏ"). */
export function vegLabel(id, n) {
  const v = VEG[id];
  const word = v.cls ? `${v.cls} ${v.name}` : v.name;
  return n === 1 ? word : `${n} ${word}`;
}

/** Diện tích hình vẽ của nhóm — để biết bên nào "trông to hơn". */
export function vegLooks(id, n) {
  const v = VEG[id];
  return n * v.r * v.r * v.aw * (v.ah + v.top);
}

/**
 * `n` củ loại `id` xếp thành đống trên mặt đĩa rộng `width` (gốc = giữa mặt đĩa, y = 0 là mặt đĩa).
 * Hàng dưới đầy thì chồng hàng trên, lệch nửa củ như xếp thật. Trả về { svg, box: { x, y, w, h } } — box là khung
 * bao cả đống (dùng làm viewBox ở khay và làm đích bay trên đĩa, để hình bay khớp cỡ).
 */
export function vegHeap(id, n, width = 132) {
  const v = VEG[id];
  const w = v.r * v.aw * 2, rowH = v.r * (v.ah + v.top) * 0.78;
  const perRow = Math.max(1, Math.min(n, Math.floor((width + w * 0.08) / (w * 1.04))));
  const spots = [];
  let left = n, row = 0;
  while (left > 0) {
    const cnt = Math.min(row ? Math.max(1, perRow - 1) : perRow, left);
    for (let i = 0; i < cnt; i++) spots.push([(i - (cnt - 1) / 2) * w * 1.04, -v.r * v.ah - row * rowH]);
    left -= cnt;
    row++;
  }
  const svg = spots.map(([x, y]) => v.draw(+x.toFixed(1), +y.toFixed(1), v.r)).join('');
  const xs = spots.map(s => s[0]);
  const minX = Math.min(...xs) - w / 2 - 3, maxX = Math.max(...xs) + w / 2 + 3;
  const top = Math.min(...spots.map(s => s[1])) - v.r * v.top - 3;
  return { svg, box: { x: minX, y: top, w: maxX - minX, h: -top + 2 } };
}

/** Một củ đứng riêng (biểu tượng quầy, dãy cách chơi). */
export function vegIcon(id, size = 40) {
  const { svg, box } = vegHeap(id, 1);
  return `<svg viewBox="${box.x.toFixed(1)} ${box.y.toFixed(1)} ${box.w.toFixed(1)} ${box.h.toFixed(1)}" width="${size}" height="${size}" aria-hidden="true">${svg}</svg>`;
}

// ── Túi hàng cân theo ki-lô-gam (cấp 3, 4): gốc = giữa đáy túi ─────────────────────────────────────
// Túi nặng hơn vẽ to hơn (theo căn bậc hai số kg) để túi 10 kg trông to hơn túi 2 kg, nhưng không ghi số lên túi
// cho tới khi đã cân (cấp 3) — cấp 4 treo thẻ "6 kg" vì bài cho biết trước cân nặng.

const INK = '#3F3A40';
const bagText = (x, y, t, size, fill) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="${size.toFixed(1)}" font-weight="800" fill="${fill}" font-family="Quicksand, sans-serif">${t}</text>`;

// Bao gạo: bao trắng, cổ buộc dây đỏ, băng nhãn xanh.
function riceSack(w, h) {
  const hw = w / 2, neck = h * 0.2;
  return `
    <path d="M${-hw * 0.9} 0 Q${-hw * 1.05} ${-h * 0.45} ${-hw * 0.7} ${-h + neck} L${-hw * 0.28} ${-h + neck * 0.8} Q0 ${-h + neck * 1.1} ${hw * 0.28} ${-h + neck * 0.8}
             L${hw * 0.7} ${-h + neck} Q${hw * 1.05} ${-h * 0.45} ${hw * 0.9} 0 Z" fill="#F8FAFC" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M${-hw * 0.28} ${-h + neck * 0.8} L${-hw * 0.4} ${-h} Q0 ${-h - 3} ${hw * 0.4} ${-h} L${hw * 0.28} ${-h + neck * 0.8}" fill="#F1F5F9" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M${-hw * 0.32} ${-h + neck * 0.85} Q0 ${-h + neck * 1.15} ${hw * 0.32} ${-h + neck * 0.85}" fill="none" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/>
    <rect x="${-hw * 0.78}" y="${-h * 0.56}" width="${hw * 1.56}" height="${h * 0.26}" rx="3" fill="#16A34A"/>
    ${bagText(0, -h * 0.43, 'GẠO', Math.min(14, h * 0.18), '#fff')}
    <path d="M${-hw * 0.6} ${-h * 0.2} q${hw * 0.2} ${h * 0.05} ${hw * 0.35} 0" stroke="#CBD5E1" stroke-width="1.5" fill="none"/>`;
}

// Túi đường: túi giấy nâu, miệng gấp, nhãn trắng.
function sugarBag(w, h) {
  const hw = w / 2;
  return `
    <path d="M${-hw} 0 L${-hw * 0.92} ${-h * 0.86} H${hw * 0.92} L${hw} 0 Z" fill="#E7C9A0" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M${-hw * 0.92} ${-h * 0.86} L${-hw * 0.85} ${-h} H${hw * 0.85} L${hw * 0.92} ${-h * 0.86} Z" fill="#D6B084" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
    <rect x="${-hw * 0.75}" y="${-h * 0.8}" width="${hw * 1.5}" height="${h * 0.28}" rx="4" fill="#fff" stroke="#B45309" stroke-width="1.5"/>
    ${bagText(0, -h * 0.66, 'ĐƯỜNG', Math.min(11, w * 0.18), '#B45309')}`;
}

// Bao khoai lang: bao lưới cam, thấy củ khoai tím bên trong.
function potatoNet(w, h) {
  const hw = w / 2;
  const r = Math.max(6, w * 0.13);
  let spuds = '';
  const rows = [[-0.45, -0.18], [0, -0.2], [0.45, -0.18], [-0.25, -0.5], [0.25, -0.5], [0, -0.75]];
  for (const [dx, dy] of rows) spuds += sweetPotato(dx * hw, dy * h, r * 0.62);
  let net = '';
  for (let k = -3; k <= 3; k++) net += `<path d="M${k * hw * 0.3 - hw * 0.4} 0 L${k * hw * 0.3 + hw * 0.4} ${-h * 0.88}" stroke="#EA580C" stroke-width="1.2" opacity=".75"/>
    <path d="M${k * hw * 0.3 + hw * 0.4} 0 L${k * hw * 0.3 - hw * 0.4} ${-h * 0.88}" stroke="#EA580C" stroke-width="1.2" opacity=".75"/>`;
  return `
    <defs><clipPath id="g2v-net-${Math.round(w * 10)}"><path d="M${-hw} 0 Q${-hw * 1.1} ${-h * 0.5} ${-hw * 0.55} ${-h * 0.88} H${hw * 0.55} Q${hw * 1.1} ${-h * 0.5} ${hw} 0 Z"/></clipPath></defs>
    <path d="M${-hw} 0 Q${-hw * 1.1} ${-h * 0.5} ${-hw * 0.55} ${-h * 0.88} H${hw * 0.55} Q${hw * 1.1} ${-h * 0.5} ${hw} 0 Z" fill="#FFEDD5"/>
    <g clip-path="url(#g2v-net-${Math.round(w * 10)})">${spuds}${net}</g>
    <path d="M${-hw} 0 Q${-hw * 1.1} ${-h * 0.5} ${-hw * 0.55} ${-h * 0.88} H${hw * 0.55} Q${hw * 1.1} ${-h * 0.5} ${hw} 0 Z" fill="none" stroke="#C2410C" stroke-width="2" stroke-linejoin="round"/>
    <path d="M${-hw * 0.5} ${-h * 0.88} Q0 ${-h * 1.02} ${hw * 0.5} ${-h * 0.88}" fill="none" stroke="#C2410C" stroke-width="3" stroke-linecap="round"/>`;
}

/** Túi hàng: tên, cách vẽ, các cân nặng hay gặp ở chợ (kg). */
export const BAGS = {
  gao: { name: 'túi gạo', draw: riceSack, kg: [5, 6, 8, 10], k: 1.08 },
  duong: { name: 'túi đường', draw: sugarBag, kg: [1, 2, 3], k: 0.95 },
  khoai: { name: 'bao khoai lang', draw: potatoNet, kg: [2, 3, 4, 5, 6], k: 1 },
};

/**
 * Một túi hàng nặng `kg` (gốc = giữa đáy). tag: thẻ treo trước túi, vd. "6 kg" (cấp 4) — không có thì không ghi số.
 * Trả về { svg, w, h } (khung vẽ, để xếp trên đĩa cân và làm đích bay).
 */
export function bagArt(type, kg, tag = '') {
  const b = BAGS[type];
  const w = (26 + 10 * Math.sqrt(kg)) * b.k, h = w * 1.12;
  const tw = Math.max(34, tag.length * 8 + 10);
  const tagSvg = tag ? `<g>
      <rect x="${-tw / 2}" y="-21" width="${tw}" height="18" rx="5" fill="#FEF3C7" stroke="#92400E" stroke-width="1.6"/>
      ${bagText(0, -12, tag, 12.5, '#78350F')}</g>` : '';
  return { svg: b.draw(w, h) + tagSvg, w, h: h + 4 };
}

/** Biểu tượng túi hàng (bảng giá, hoá đơn). */
export function bagIcon(type, kg = 3, size = 30) {
  const { svg, w, h } = bagArt(type, kg);
  const s = Math.max(w, h) + 4;
  return `<svg viewBox="${(-s / 2).toFixed(1)} ${(-h - 2).toFixed(1)} ${s.toFixed(1)} ${s.toFixed(1)}" width="${size}" height="${size}" aria-hidden="true">${svg}</svg>`;
}
