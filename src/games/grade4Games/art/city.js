/**
 * Hình vẽ trò 🏙️ Bản đồ dân số (lớp 4): bản đồ Việt Nam tự vẽ (đường nét giản lược theo kinh độ, vĩ độ, có quần đảo
 * Hoàng Sa, Trường Sa), 34 tỉnh, thành sau ngày 1/7/2025 là các chấm; cảnh phòng tin tức phía sau.
 *
 * Số dân: chỉ 23 tỉnh, thành có số dân ghi trong Nghị quyết 202/2025/QH15 (quy mô dân số khi sắp xếp đơn vị hành
 * chính cấp tỉnh, đối chiếu trên xaydungchinhsach.chinhphu.vn ngày 2026-10-10). 11 tỉnh, thành không sắp xếp
 * (Hà Nội, Huế, Thanh Hóa…) không có số trong Nghị quyết, các nguồn khác ghi lệch nhau nên không dùng số của chúng.
 */

export const INK = '#3F3A40';
export const SOURCE = 'Nghị quyết 202/2025/QH15';

// [mã, tên, số dân | null, vĩ độ, kinh độ] — toạ độ là vị trí đặt chấm (gần trung tâm tỉnh), không cần chính xác.
const RAW = [
  ['hcm', 'Thành phố Hồ Chí Minh', 14002598, 10.85, 106.75],
  ['angiang', 'An Giang', 4952238, 10.25, 105.0],
  ['haiphong', 'Hải Phòng', 4664124, 20.85, 106.6],
  ['dongnai', 'Đồng Nai', 4491408, 11.35, 107.05],
  ['ninhbinh', 'Ninh Bình', 4412264, 20.3, 106.05],
  ['dongthap', 'Đồng Tháp', 4370046, 10.45, 105.85],
  ['vinhlong', 'Vĩnh Long', 4257581, 9.95, 106.25],
  ['cantho', 'Cần Thơ', 4199824, 9.75, 105.7],
  ['phutho', 'Phú Thọ', 4022638, 21.05, 105.2],
  ['lamdong', 'Lâm Đồng', 3872999, 11.6, 108.0],
  ['bacninh', 'Bắc Ninh', 3619433, 21.3, 106.25],
  ['gialai', 'Gia Lai', 3583693, 14.0, 108.5],
  ['hungyen', 'Hưng Yên', 3567943, 20.6, 106.25],
  ['daklak', 'Đắk Lắk', 3346853, 12.85, 108.55],
  ['tayninh', 'Tây Ninh', 3254170, 10.95, 106.15],
  ['danang', 'Đà Nẵng', 3065628, 15.75, 108.05],
  ['camau', 'Cà Mau', 2606672, 9.15, 105.25],
  ['khanhhoa', 'Khánh Hòa', 2243554, 12.0, 109.0],
  ['quangngai', 'Quảng Ngãi', 2161755, 14.85, 108.15],
  ['quangtri', 'Quảng Trị', 1870845, 17.15, 106.55],
  ['tuyenquang', 'Tuyên Quang', 1865270, 22.35, 105.1],
  ['thainguyen', 'Thái Nguyên', 1799489, 21.85, 105.85],
  ['laocai', 'Lào Cai', 1778785, 22.0, 104.3],
  // Không sắp xếp: không có số dân trong Nghị quyết — chỉ vẽ chấm.
  ['hanoi', 'Hà Nội', null, 21.03, 105.85],
  ['hue', 'Huế', null, 16.35, 107.55],
  ['thanhhoa', 'Thanh Hóa', null, 19.95, 105.45],
  ['nghean', 'Nghệ An', null, 19.2, 104.95],
  ['hatinh', 'Hà Tĩnh', null, 18.3, 105.8],
  ['quangninh', 'Quảng Ninh', null, 21.15, 107.35],
  ['langson', 'Lạng Sơn', null, 21.85, 106.65],
  ['caobang', 'Cao Bằng', null, 22.65, 106.25],
  ['sonla', 'Sơn La', null, 21.2, 104.0],
  ['dienbien', 'Điện Biên', null, 21.6, 103.05],
  ['laichau', 'Lai Châu', null, 22.3, 103.35],
];
export const PROVINCES = RAW.map(([id, name, pop, lat, lon]) => ({ id, name, pop, lat, lon }));
export const WITH_POP = PROVINCES.filter(p => p.pop);
export const byId = (id) => PROVINCES.find(p => p.id === id);

// ── Phép chiếu: kinh độ 101.8–114.8, vĩ độ 7.8–23.6 → viewBox 500 × 632 ─────────────────────────────
const LON0 = 101.8, LAT0 = 23.6, KX = 38.4, KY = 40;
export const MAP_W = 500, MAP_H = 632;
export const proj = (lat, lon) => ({ x: (lon - LON0) * KX, y: (LAT0 - lat) * KY });
const path = (pts, close = true) => pts.map(([lon, lat], i) => { const p = proj(lat, lon); return `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`; }).join(' ') + (close ? ' Z' : '');

// Biên giới phía tây (từ Móng Cái ngược lên, vòng qua tây bắc, xuống Hà Tiên) và bờ biển (Hà Tiên → Cà Mau → Móng Cái).
const BORDER = [
  [108.0, 21.55], [107.5, 21.65], [107.0, 22.0], [106.6, 22.3], [106.7, 22.85], [105.9, 22.95], [105.33, 23.39],
  [105.0, 23.2], [104.4, 22.85], [104.0, 22.75], [103.5, 22.7], [103.0, 22.6], [102.5, 22.75], [102.14, 22.4],
  [102.2, 21.9], [102.85, 21.7], [102.9, 21.3], [103.3, 20.8], [104.2, 20.6], [104.7, 20.1], [104.0, 19.5],
  [103.9, 19.3], [104.4, 18.8], [105.2, 18.2], [105.8, 17.6], [106.5, 16.9], [106.8, 16.4], [107.2, 16.0],
  [107.4, 15.4], [107.6, 14.6], [107.5, 14.0], [107.6, 13.0], [107.5, 12.3], [106.8, 12.0], [106.4, 11.9],
  [106.2, 11.4], [105.8, 11.0], [105.1, 10.9], [104.5, 10.4],
];
const COAST = [
  [104.5, 10.4], [105.0, 10.0], [104.85, 9.6], [104.8, 8.65], [105.3, 8.6], [105.8, 9.2], [106.4, 9.5],
  [106.8, 9.9], [107.1, 10.35], [108.1, 10.9], [109.0, 11.5], [109.2, 12.2], [109.45, 12.9], [109.2, 14.0],
  [108.8, 15.2], [108.25, 16.05], [107.8, 16.3], [107.2, 16.8], [106.7, 17.4], [106.3, 18.1], [105.7, 18.9],
  [105.8, 19.4], [106.0, 19.9], [106.5, 20.3], [106.8, 20.8], [107.4, 21.2], [108.0, 21.55],
];
// Biển: phía đông (vịnh Bắc Bộ, Biển Đông) và vịnh Thái Lan phía tây nam.
const SEA_EAST = [...COAST.slice(3), [109.5, 21.5], [114.8, 21.5], [114.8, 7.8], [104.9, 7.8]];
const SEA_WEST = [[104.5, 10.4], [105.0, 10.0], [104.85, 9.6], [104.8, 8.65], [104.9, 7.8], [101.8, 7.8], [101.8, 12.0], [103.0, 11.3], [103.6, 10.6]];
const HAINAN = [[108.6, 19.2], [109.2, 18.3], [110.0, 18.2], [111.0, 19.6], [110.6, 20.1], [109.6, 20.0], [108.7, 19.8]];
const PHUQUOC = [[103.85, 10.45], [104.08, 10.4], [104.05, 10.0], [103.92, 10.1]];
const HOANGSA = [[111.6, 16.5], [112.3, 16.8], [111.9, 16.95], [111.2, 16.45], [112.0, 16.25], [112.6, 16.55], [111.75, 16.05]];
const TRUONGSA = [[114.3, 11.4], [113.9, 10.8], [114.4, 10.2], [113.5, 9.6], [114.2, 9.0], [112.9, 9.4], [114.7, 10.9], [113.2, 10.3], [111.9, 8.65]];

/** Bản đồ nền (không có chấm tỉnh): đất nước ngoài nhạt, biển xanh, Việt Nam xanh lá, hai quần đảo. */
export function mapBaseSvg() {
  const isl = (pts, r) => pts.map(([lon, lat]) => { const p = proj(lat, lon); return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="#86C96E" stroke="${INK}" stroke-width="1.2"/>`; }).join('');
  const hs = proj(17.75, 112.0), ts = proj(11.95, 113.6), sea = proj(14.2, 112.4);
  return `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" rx="14" fill="#EFE6D2"/>
    <path d="${path(SEA_EAST)}" fill="#BFE6F7"/><path d="${path(SEA_WEST)}" fill="#BFE6F7"/>
    <path d="${path(HAINAN)}" fill="#EFE6D2" stroke="#C9BBA0" stroke-width="1.5"/>
    <path d="${path([...BORDER, ...COAST.slice(1)])}" fill="#A7E3A0" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="${path(PHUQUOC)}" fill="#A7E3A0" stroke="${INK}" stroke-width="1.5"/>
    ${isl([[106.6, 8.7]], 2.6)}${isl(HOANGSA, 2.6)}${isl(TRUONGSA, 2.4)}
    <text x="${hs.x}" y="${hs.y}" class="g4c-isl" text-anchor="middle">QĐ. Hoàng Sa</text>
    <text x="${hs.x}" y="${hs.y + 15}" class="g4c-isl2" text-anchor="middle">(Đà Nẵng)</text>
    <text x="${ts.x}" y="${ts.y}" class="g4c-isl" text-anchor="middle">QĐ. Trường Sa</text>
    <text x="${ts.x}" y="${ts.y + 15}" class="g4c-isl2" text-anchor="middle">(Khánh Hòa)</text>
    <text x="${sea.x}" y="${sea.y}" class="g4c-sea" text-anchor="middle">BIỂN ĐÔNG</text>`;
}

/** Chấm 34 tỉnh, thành; Hà Nội là ngôi sao đỏ (thủ đô). */
export function mapDotsSvg() {
  return PROVINCES.map(p => {
    const { x, y } = proj(p.lat, p.lon);
    if (p.id === 'hanoi') {
      const s = Array.from({ length: 10 }, (_, i) => { const r = i % 2 ? 4 : 9.5, a = (i * 36 - 90) * Math.PI / 180; return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`; }).join(' ');
      return `<g data-prov="hanoi"><polygon points="${s}" fill="#EF4444" stroke="${INK}" stroke-width="1.5"/><text x="${x - 12}" y="${y + 4}" class="g4c-cap" text-anchor="end">Hà Nội</text></g>`;
    }
    return `<circle data-prov="${p.id}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#fff" stroke="${INK}" stroke-width="1.6"/>`;
  }).join('');
}

/**
 * Ghim các tỉnh đang nói tới: vòng sáng + nhãn tên. Nhãn đặt bên phải chấm (tỉnh ven biển) hoặc bên trái, không ra
 * ngoài khung và không đè nhãn khác (thử dời lên / xuống, đổi bên).
 */
export function pinsSvg(list, { color = '#F97316' } = {}) {
  const boxes = [];
  const hit = (b) => b.x < 4 || b.x + b.w > MAP_W - 4 || boxes.some(o => b.x < o.x + o.w + 4 && o.x < b.x + b.w + 4 && b.y < o.y + o.h + 4 && o.y < b.y + b.h + 4);
  return list.map(p => {
    const { x, y } = proj(p.lat, p.lon);
    const w = Math.max(60, p.name.length * 10.5 + 18), h = 28;
    const pref = p.lon > 106.4 ? [true, false] : [false, true];
    let best = null;
    for (const dy of [0, -34, 34, -68, 68]) {
      for (const right of pref) {
        const b = { x: right ? x + 16 : x - 16 - w, y: y + dy - h / 2, w, h, right };
        if (!hit(b)) { best = b; break; }
      }
      if (best) break;
    }
    best ||= { x: pref[0] ? x + 16 : x - 16 - w, y: y - h / 2, w, h, right: pref[0] };
    boxes.push(best);
    const ax = best.right ? best.x : best.x + w, ay = best.y + h / 2;
    return `<g class="g4c-pin"><circle class="g4c-pulse" cx="${x}" cy="${y}" r="13" fill="none" stroke="${color}" stroke-width="4"/>
      <circle cx="${x}" cy="${y}" r="8" fill="${color}" stroke="${INK}" stroke-width="2"/>
      <path d="M${x + (best.right ? 8 : -8)} ${y} L${ax} ${ay}" stroke="${INK}" stroke-width="2"/>
      <rect x="${best.x}" y="${best.y}" width="${w}" height="${h}" rx="8" fill="#fff" stroke="${color}" stroke-width="3"/>
      <text x="${best.x + w / 2}" y="${best.y + 20}" class="g4c-pinlab" text-anchor="middle">${p.name}</text></g>`;
  }).join('');
}

/** Cảnh phòng tin tức (viewBox 1200 × 400, neo đáy): cửa kính nhìn ra phố, đèn studio, bàn dẫn chương trình. */
export function studioSvg() {
  const bld = [[40, 170, 90], [140, 120, 70], [220, 200, 100], [330, 90, 80], [420, 150, 90], [760, 140, 80], [850, 80, 70], [930, 180, 110], [1050, 110, 90], [1150, 160, 60]];
  const win = (x, y, w, h) => { let s = ''; for (let yy = y + 14; yy < 300; yy += 24) for (let xx = x + 12; xx < x + w - 14; xx += 22) s += `<rect x="${xx}" y="${yy}" width="10" height="12" fill="#FDE68A" opacity=".85"/>`; return s; };
  return `<svg class="g4c-back" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    ${bld.map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${300 - y}" fill="#5B7DB1" stroke="${INK}" stroke-width="3"/>${win(x, y, w)}`).join('')}
    <circle cx="600" cy="120" r="46" fill="#FDE047" stroke="${INK}" stroke-width="3"/>
    <path d="M0 300 H1200 V400 H0 Z" fill="#334155"/>
    ${[0, 300, 600, 900, 1200].map(x => `<rect x="${x - 12}" y="0" width="24" height="300" fill="#1E293B"/>`).join('')}
    <rect x="0" y="292" width="1200" height="16" fill="#1E293B"/>
    <path d="M0 400 L200 330 H1000 L1200 400 Z" fill="#475569" stroke="${INK}" stroke-width="3"/>
    <path d="M320 400 L380 342 H820 L880 400 Z" fill="#2563EB" stroke="${INK}" stroke-width="3"/>
    <rect x="500" y="352" width="200" height="26" rx="6" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
    <text x="600" y="372" text-anchor="middle" font-size="20" font-weight="900" fill="#DC2626" font-family="'Baloo 2', sans-serif">BẢN TIN</text>
  </svg>`;
}

/** Biểu tượng trò: bản đồ nhỏ có ghim. */
export function cityIcon(size = 56) {
  const p = proj(10.85, 106.75);
  return `<svg viewBox="70 -10 380 560" width="${size}" height="${size}" aria-hidden="true">
    <path d="${path([...BORDER, ...COAST.slice(1)])}" fill="#A7E3A0" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
    <circle cx="${p.x}" cy="${p.y}" r="30" fill="#F97316" stroke="${INK}" stroke-width="8"/></svg>`;
}
